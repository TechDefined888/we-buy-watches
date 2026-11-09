import "server-only";

import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";

import { z } from "zod";

import {
  MAX_PHOTOS,
} from "@/lib/valuation/config";

import {
  photoMetadataSchema,
  type ValidatedEnquirySubmission,
} from "@/lib/valuation/schema";

const SESSION_DURATION_MS = 30 * 60 * 1000;

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
};

const sessionPhotoSchema = photoMetadataSchema.extend({
  path: z
    .string()
    .regex(
      /^pending\/[0-9a-f-]{36}\/[1-5]\.(jpg|png|webp|heic|heif)$/,
    ),

  position: z.number().int().min(1).max(MAX_PHOTOS),
});

const uploadSessionSchema = z
  .object({
    version: z.literal(1),
    sessionId: z.string().uuid(),
    submissionKey: z.string().uuid(),
    payloadHash: z.string().regex(/^[0-9a-f]{64}$/),
    consentedAt: z.string().datetime(),
    expiresAt: z.number().int().positive(),
    photos: z.array(sessionPhotoSchema).max(MAX_PHOTOS),
  })
  .strict();

export type UploadSession = z.infer<
  typeof uploadSessionSchema
>;

function getSigningKey(): Buffer {
  const secret = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!secret) {
    throw new Error("Missing server configuration.");
  }

  // Derive a separate signing key for this purpose.
  return createHmac("sha256", secret)
    .update("we-buy-watches:upload-session:v1")
    .digest();
}

export function hashEnquiryPayload(
  payload: ValidatedEnquirySubmission,
): string {
  return createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
}

export function createUploadSession(
  payload: ValidatedEnquirySubmission,
): {
  session: UploadSession;
  sessionToken: string;
} {
  const sessionId = randomUUID();
  const now = Date.now();

  const session: UploadSession = {
    version: 1,
    sessionId,
    submissionKey: payload.submissionKey,
    payloadHash: hashEnquiryPayload(payload),
    consentedAt: new Date(now).toISOString(),
    expiresAt: now + SESSION_DURATION_MS,

    photos: payload.photos.map((photo, index) => {
      const extension = extensions[photo.type];

      if (!extension) {
        throw new Error("Unsupported photo type.");
      }

      return {
        ...photo,
        position: index + 1,
        path: `pending/${sessionId}/${index + 1}.${extension}`,
      };
    }),
  };

  const encoded = Buffer.from(
    JSON.stringify(session),
    "utf8",
  ).toString("base64url");

  const signature = createHmac(
    "sha256",
    getSigningKey(),
  )
    .update(encoded)
    .digest("base64url");

  return {
    session,
    sessionToken: `${encoded}.${signature}`,
  };
}

export function verifyUploadSession(
  token: string,
): UploadSession {
  if (token.length > 20000) {
    throw new Error("Invalid upload session.");
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    throw new Error("Invalid upload session.");
  }

  const [encoded, suppliedSignature] = parts;

  if (!encoded || !suppliedSignature) {
    throw new Error("Invalid upload session.");
  }

  const expectedSignature = createHmac(
    "sha256",
    getSigningKey(),
  )
    .update(encoded)
    .digest();

  const receivedSignature = Buffer.from(
    suppliedSignature,
    "base64url",
  );

  if (
    receivedSignature.length !==
      expectedSignature.length ||
    !timingSafeEqual(
      receivedSignature,
      expectedSignature,
    )
  ) {
    throw new Error("Invalid upload session.");
  }

  const parsed = uploadSessionSchema.safeParse(
    JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ),
  );

  if (!parsed.success) {
    throw new Error("Invalid upload session.");
  }

  const session = parsed.data;

  if (session.expiresAt <= Date.now()) {
    throw new Error(
      "Your upload session expired. Please submit again.",
    );
  }

  // Every photo must belong to this session and position.
  for (const [index, photo] of session.photos.entries()) {
    const extension = extensions[photo.type];

    const expectedPath =
      `pending/${session.sessionId}/` +
      `${index + 1}.${extension}`;

    if (
      photo.position !== index + 1 ||
      photo.path !== expectedPath
    ) {
      throw new Error("Invalid upload session.");
    }
  }

  return session;
}