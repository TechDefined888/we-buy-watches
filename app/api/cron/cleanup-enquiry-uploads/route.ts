import {
  createHash,
  timingSafeEqual,
} from "node:crypto";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { z } from "zod";

import {
  createSupabaseAdmin,
} from "@/lib/supabase/admin";

import {
  PHOTO_BUCKET,
} from "@/lib/valuation/config";

const BATCH_SIZE = 50;

const candidateSchema = z
  .array(
    z.object({
      storage_path: z.string().regex(
        /^pending\/[0-9a-f-]{36}\/[1-5]\.(jpg|png|webp|heic|heif)$/,
      ),
      uploaded_at: z
        .string()
        .datetime({ offset: true }),
    }),
  )
  .max(BATCH_SIZE);

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function secretsMatch(
  supplied: string,
  expected: string,
): boolean {
  const suppliedHash = createHash("sha256")
    .update(supplied)
    .digest();

  const expectedHash = createHash("sha256")
    .update(expected)
    .digest();

  return timingSafeEqual(
    suppliedHash,
    expectedHash,
  );
}

export async function GET(
  request: NextRequest,
) {
  const secret =
    process.env.CRON_SECRET?.trim();

  if (!secret || secret.length < 32) {
    console.error(
      "Cleanup secret is missing or invalid.",
    );

    return json(
      {
        ok: false,
        message:
          "Cleanup configuration is unavailable.",
      },
      503,
    );
  }

  const authorization =
    request.headers.get("authorization") ?? "";

  if (
    authorization.length > 512 ||
    !secretsMatch(
      authorization,
      `Bearer ${secret}`,
    )
  ) {
    return json(
      {
        ok: false,
        message: "Unauthorized.",
      },
      401,
    );
  }

  const cleanupEnabled =
    process.env.ENQUIRY_CLEANUP_ENABLED ===
    "true";

  // ?dryRun=true forces preview mode even when
  // cleanup is enabled.
  const dryRun =
    !cleanupEnabled ||
    request.nextUrl.searchParams.get(
      "dryRun",
    ) === "true";

  try {
    const supabase = createSupabaseAdmin();

    const {
      data: candidates,
      error: candidateError,
    } = await supabase.rpc(
      "list_abandoned_enquiry_uploads",
      {
        p_limit: BATCH_SIZE,
      },
    );

    if (candidateError) {
      console.error(
        "Could not list abandoned uploads.",
        { code: candidateError.code },
      );

      return json(
        {
          ok: false,
          message:
            "Could not inspect abandoned uploads.",
        },
        503,
      );
    }

    const parsed =
      candidateSchema.safeParse(candidates);

    if (!parsed.success) {
      return json(
        {
          ok: false,
          message:
            "Unexpected cleanup candidate response.",
        },
        503,
      );
    }

    const cutoff =
      Date.now() - 24 * 60 * 60 * 1000;

    const oldCandidates = parsed.data.filter(
      (candidate) =>
        Date.parse(candidate.uploaded_at) <
        cutoff,
    );

    if (oldCandidates.length === 0) {
      return json({
        ok: true,
        mode: dryRun ? "preview" : "cleanup",
        candidateCount: 0,
        eligibleCount: 0,
        deletedCount: 0,
        paths: [],
      });
    }

    const candidatePaths =
      oldCandidates.map(
        (candidate) =>
          candidate.storage_path,
      );

    // Check references again immediately before
    // any Storage API deletion.
    const {
      data: references,
      error: referenceError,
    } = await supabase
      .from("enquiry_photos")
      .select("storage_path")
      .eq("bucket_id", PHOTO_BUCKET)
      .in("storage_path", candidatePaths);

    if (referenceError) {
      console.error(
        "Could not verify saved photo references.",
        { code: referenceError.code },
      );

      return json(
        {
          ok: false,
          message:
            "Could not verify photo references. No files were deleted.",
        },
        503,
      );
    }

    const referencedPaths = new Set(
      (references ?? []).map(
        (photo) => photo.storage_path,
      ),
    );

    const eligiblePaths =
      candidatePaths.filter(
        (path) =>
          !referencedPaths.has(path),
      );

    if (dryRun || eligiblePaths.length === 0) {
      return json({
        ok: true,
        mode: dryRun ? "preview" : "cleanup",
        candidateCount:
          oldCandidates.length,
        eligibleCount:
          eligiblePaths.length,
        deletedCount: 0,
        paths: eligiblePaths,
      });
    }

    const {
      data: removed,
      error: removalError,
    } = await supabase.storage
      .from(PHOTO_BUCKET)
      .remove(eligiblePaths);

    if (removalError) {
      console.error(
        "Abandoned-upload deletion failed.",
      );

      return json(
        {
          ok: false,
          message:
            "Cleanup could not complete. Inspect the next preview before retrying.",
        },
        503,
      );
    }

    return json({
      ok: true,
      mode: "cleanup",
      candidateCount:
        oldCandidates.length,
      eligibleCount:
        eligiblePaths.length,
      deletedCount:
        removed?.length ?? 0,
    });
  } catch {
    console.error(
      "Enquiry upload cleanup could not complete.",
    );

    return json(
      {
        ok: false,
        message:
          "Cleanup could not complete.",
      },
      500,
    );
  }
}