import { NextRequest, NextResponse } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import { z } from "zod";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

import {
  ALLOWED_PHOTO_TYPES,
  ENQUIRY_SUCCESS_MESSAGE,
  MAX_PHOTO_SIZE_BYTES,
  PHOTO_BUCKET,
  REFERRAL_CONSENT_TEXT,
} from "@/lib/valuation/config";

import {
  enforceEnquiryRateLimit,
} from "@/lib/valuation/rate-limit";

import {
  enquirySubmissionSchema,
} from "@/lib/valuation/schema";

import {
  hashEnquiryPayload,
  verifyUploadSession,
  type UploadSession,
} from "@/lib/valuation/upload-session";

const MAX_BODY_BYTES = 96 * 1024;

const requestSchema = z
  .object({
    submission: enquirySubmissionSchema,
    sessionToken: z.string().min(1).max(20000),
  })
  .strict();

type VerifiedPhotoRecord = {
  storage_path: string;
  mime_type: string;
  file_size_bytes: number;
  position: number;
};

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

function isHeifType(type: string): boolean {
  return (
    type === "image/heic" ||
    type === "image/heif"
  );
}

function photoTypesMatch(
  declaredType: string,
  detectedType: string,
): boolean {
  if (declaredType === detectedType) {
    return true;
  }

  return (
    isHeifType(declaredType) &&
    isHeifType(detectedType)
  );
}

export async function POST(request: NextRequest) {

  const vercelPreviewEnabled =
    process.env.VERCEL_ENV === "preview" &&
    process.env.ENQUIRY_PREVIEW_ENABLED === "true";

  const netlifyTestEnabled =
    process.env.NETLIFY_ENQUIRY_TEST_ENABLED === "true";

  if (
    process.env.NODE_ENV !== "development" &&
    !vercelPreviewEnabled &&
    !netlifyTestEnabled
  ) {
    return new NextResponse(null, { status: 404 });
  }

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

  // Check the final-submission request limit.
  const rateLimitResponse =
    await enforceEnquiryRateLimit(
      request,
      "submit",
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

  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Please check your enquiry details.",
        issues: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      400,
    );
  }

  const { submission, sessionToken } = parsed.data;

  let session: UploadSession;

  try {
    session = verifyUploadSession(sessionToken);
  } catch {
    return json(
      {
        ok: false,
        code: "INVALID_UPLOAD_SESSION",
        message:
          "Your upload session is invalid or expired. Please submit again.",
      },
      400,
    );
  }

  const payloadHash = hashEnquiryPayload(submission);

  if (
    session.submissionKey !== submission.submissionKey ||
    session.payloadHash !== payloadHash
  ) {
    return json(
      {
        ok: false,
        code: "SUBMISSION_CHANGED",
        message:
          "Your enquiry details changed after uploads were prepared. Please submit again.",
      },
      409,
    );
  }

  try {
    const supabase = createSupabaseAdmin();

    // Recover a previously saved submission after a retry.
    const {
      data: existing,
      error: existingError,
    } = await supabase
      .from("enquiries")
      .select("id, submission_payload_hash")
      .eq("submission_key", submission.submissionKey)
      .maybeSingle();

    if (existingError) {
      console.error(
        "Could not check an existing submission.",
        { code: existingError.code },
      );

      return json(
        {
          ok: false,
          message:
            "Could not check your submission. Please try again.",
        },
        503,
      );
    }

    if (existing) {
      if (
        existing.submission_payload_hash !==
        payloadHash
      ) {
        return json(
          {
            ok: false,
            code: "SUBMISSION_KEY_CONFLICT",
            message:
              "This submission reference was already used for different details.",
          },
          409,
        );
      }

      return json(
        {
          ok: true,
          enquiryId: existing.id,
          message: ENQUIRY_SUCCESS_MESSAGE,
        },
        200,
      );
    }

    const verifiedPhotos: VerifiedPhotoRecord[] = [];

    // Check one photograph at a time.
    for (const photo of session.photos) {
      const {
        data: uploadedFile,
        error: downloadError,
      } = await supabase.storage
        .from(PHOTO_BUCKET)
        .download(photo.path);

      if (downloadError || !uploadedFile) {
        return json(
          {
            ok: false,
            code: "PHOTO_UPLOAD_UNAVAILABLE",
            message:
              `Could not verify photograph ${photo.position}. ` +
              "Please try again.",
          },
          502,
        );
      }

      if (
        uploadedFile.size === 0 ||
        uploadedFile.size > MAX_PHOTO_SIZE_BYTES ||
        uploadedFile.size !== photo.size
      ) {
        return json(
          {
            ok: false,
            code: "INVALID_PHOTO",
            message:
              `Photograph ${photo.position} has an invalid size. ` +
              "Please remove it and select the photograph again.",
          },
          422,
        );
      }

      const bytes = new Uint8Array(
        await uploadedFile.arrayBuffer(),
      );

      const detectedType = await fileTypeFromBuffer(
        bytes,
      ).catch(() => undefined);

      const allowedType =
        detectedType !== undefined &&
        ALLOWED_PHOTO_TYPES.some(
          (allowed) =>
            allowed === detectedType.mime,
        );

      if (
        !detectedType ||
        !allowedType ||
        !photoTypesMatch(
          photo.type,
          detectedType.mime,
        )
      ) {
        return json(
          {
            ok: false,
            code: "INVALID_PHOTO",
            message:
              `Photograph ${photo.position} could not be recognised ` +
              "as a supported image. Please remove it and choose another photograph.",
          },
          422,
        );
      }

      verifiedPhotos.push({
        storage_path: photo.path,
        mime_type: detectedType.mime,
        file_size_bytes: uploadedFile.size,
        position: photo.position,
      });
    }

    const {
      data: enquiryId,
      error: saveError,
    } = await supabase.rpc(
      "finalize_watch_enquiry",
      {
        p_submission: submission,
        p_photos: verifiedPhotos,
        p_payload_hash: payloadHash,
        p_consent_text: REFERRAL_CONSENT_TEXT,
        p_consented_at: session.consentedAt,
      },
    );

    if (
      saveError ||
      typeof enquiryId !== "string"
    ) {
      // Never log seller details, credentials or tokens.
      console.error(
        "Could not finalize the enquiry.",
        {
          code:
            saveError?.code ?? "INVALID_RESULT",
        },
      );

      return json(
        {
          ok: false,
          message:
            "Could not complete your submission. Please try again.",
        },
        503,
      );
    }

    return json(
      {
        ok: true,
        enquiryId,
        message: ENQUIRY_SUCCESS_MESSAGE,
      },
      201,
    );
  } catch {
    console.error(
      "The enquiry submission could not complete.",
    );

    return json(
      {
        ok: false,
        message:
          "Could not complete your submission. Please try again.",
      },
      500,
    );
  }
}