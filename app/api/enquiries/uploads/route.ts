import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

import { PHOTO_BUCKET } from "@/lib/valuation/config";
import { enforceEnquiryRateLimit } from "@/lib/valuation/rate-limit";
import { enquirySubmissionSchema } from "@/lib/valuation/schema";
import { verifyTurnstile } from "@/lib/valuation/turnstile";
import { createUploadSession } from "@/lib/valuation/upload-session";

const MAX_BODY_BYTES = 64 * 1024;

const uploadRequestSchema = z
  .object({
    submission: enquirySubmissionSchema,
    turnstileToken: z
      .string()
      .trim()
      .min(1)
      .max(2048),
  })
  .strict();

function json(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

async function readBoundedBody(
  request: NextRequest,
): Promise<string> {
  if (!request.body) {
    throw new Error("EMPTY_BODY");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];

  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;

      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const combined = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(combined);
}

export async function POST(request: NextRequest) {

const previewEnabled =
  process.env.VERCEL_ENV === "preview" &&
  process.env.ENQUIRY_PREVIEW_ENABLED === "true";

if (process.env.NODE_ENV !== "development" && !previewEnabled) {
  return new NextResponse(null, { status: 404 });
}

  // Accept requests from this site's origin only.
  if (
    request.headers.get("origin") !==
    request.nextUrl.origin
  ) {
    return json(
      {
        ok: false,
        message: "This request is not allowed.",
      },
      403,
    );
  }

  // Limit requests before reading the body or
  // contacting Cloudflare and issuing upload URLs.
  const rateLimitResponse =
    await enforceEnquiryRateLimit(
      request,
      "uploads",
    );

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    return json(
      {
        ok: false,
        message: "Expected an application/json request.",
      },
      415,
    );
  }

  let rawBody: string;

  try {
    rawBody = await readBoundedBody(request);
  } catch (error) {
    const tooLarge =
      error instanceof Error &&
      error.message === "BODY_TOO_LARGE";

    return json(
      {
        ok: false,
        message: tooLarge
          ? "The request is too large."
          : "Could not read the request.",
      },
      tooLarge ? 413 : 400,
    );
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return json(
      {
        ok: false,
        message: "The request contains invalid JSON.",
      },
      400,
    );
  }

  const parsed = uploadRequestSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      {
        ok: false,
        message:
          "Please check your enquiry details and complete the verification.",
        issues: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      400,
    );
  }

  const verification = await verifyTurnstile(
    parsed.data.turnstileToken,
  );

  if (!verification.ok) {
    return json(
      {
        ok: false,
        code: verification.unavailable
          ? "TURNSTILE_UNAVAILABLE"
          : "TURNSTILE_FAILED",
        message: verification.unavailable
          ? "Verification is temporarily unavailable. Please try again."
          : "Verification failed or expired. Please complete it again.",
      },
      verification.unavailable ? 503 : 400,
    );
  }

  try {
    const supabase = createSupabaseAdmin();

    const { session, sessionToken } =
      createUploadSession(parsed.data.submission);

    const uploads: {
      position: number;
      path: string;
      signedUrl: string;
      token: string;
    }[] = [];

    for (const photo of session.photos) {
      const { data, error } = await supabase.storage
        .from(PHOTO_BUCKET)
        .createSignedUploadUrl(photo.path, {
          upsert: false,
        });

      if (error || !data) {
        // Do not log credentials, tokens or signed URLs.
        console.error(
          "Could not create a photo upload URL.",
        );

        return json(
          {
            ok: false,
            message:
              "Could not prepare photo uploads. Please try again.",
          },
          502,
        );
      }

      uploads.push({
        position: photo.position,
        path: photo.path,
        signedUrl: data.signedUrl,
        token: data.token,
      });
    }

    return json(
      {
        ok: true,
        sessionToken,
        expiresAt: session.expiresAt,
        uploads,
      },
      200,
    );
  } catch {
    console.error(
      "Could not prepare the enquiry upload session.",
    );

    return json(
      {
        ok: false,
        message:
          "Could not prepare your enquiry. Please try again.",
      },
      500,
    );
  }
}