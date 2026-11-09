import "server-only";

import { createHmac } from "node:crypto";
import { isIP } from "node:net";

import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

type RateLimitScope = "uploads" | "submit";

const resultSchema = z
  .array(
    z.object({
      allowed: z.boolean(),
      retry_after_seconds: z.number().int().min(0),
    }),
  )
  .length(1);

function getClientIdentifier(request: Request): string {
  if (process.env.VERCEL === "1") {
    const ip = request.headers
      .get("x-vercel-forwarded-for")
      ?.trim()
      .toLowerCase();

    if (!ip || !isIP(ip)) {
      throw new Error("Trusted client address is unavailable.");
    }

    return ip;
  }

  if (process.env.NODE_ENV === "development") {
    // Ignore supplied IP headers on the local server.
    return "local-development";
  }

  if (process.env.NETLIFY_ENQUIRY_TEST_ENABLED === "true") {
    const ip = request.headers
      .get("x-nf-client-connection-ip")
      ?.trim()
      .toLowerCase();

    if (!ip || !isIP(ip)) {
      throw new Error("Trusted client address is unavailable.");
    }

    return ip;
  }

  throw new Error("The hosting platform is not configured.");
}

function createRateLimitHash(identifier: string): string {
  const secret = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!secret) {
    throw new Error("Missing server configuration.");
  }

  const signingKey = createHmac("sha256", secret)
    .update("we-buy-watches:rate-limit:v1")
    .digest();

  const netlifyTestEnabled =
    process.env.VERCEL !== "1" &&
    process.env.NODE_ENV !== "development" &&
    process.env.NETLIFY_ENQUIRY_TEST_ENABLED === "true";

  const environment = netlifyTestEnabled
    ? "netlify-test"
    : (process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown");

  return createHmac("sha256", signingKey)
    .update(`${environment}\0${identifier}`)
    .digest("hex");
}

export async function enforceEnquiryRateLimit(
  request: Request,
  scope: RateLimitScope,
): Promise<NextResponse | null> {
  try {
    const identifier = getClientIdentifier(request);
    const keyHash = createRateLimitHash(identifier);
    const supabase = createSupabaseAdmin();

    const { data, error } = await supabase.rpc(
      "consume_enquiry_rate_limit",
      {
        p_scope: scope,
        p_key_hash: keyHash,
      },
    );

    if (error) {
      console.error("Enquiry rate-limit check failed.", {
        code: error.code,
      });

      throw new Error("Rate-limit check unavailable.");
    }

    const parsed = resultSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Invalid rate-limit response.");
    }

    const result = parsed.data[0];

    if (!result) {
      throw new Error("Missing rate-limit response.");
    }

    if (result.allowed) {
      return null;
    }

    const retryAfter = Math.max(1, result.retry_after_seconds);
    const minutes = Math.ceil(retryAfter / 60);

    return NextResponse.json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: `Too many requests. Please try again in about ${minutes} ${
          minutes === 1 ? "minute" : "minutes"
        }.`,
        retryAfterSeconds: retryAfter,
      },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(retryAfter),
        },
      },
    );
  } catch {
    console.error("Enquiry rate limiting is unavailable.");

    return NextResponse.json(
      {
        ok: false,
        code: "RATE_LIMIT_UNAVAILABLE",
        message:
          "Submission is temporarily unavailable. Please try again shortly.",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": "30",
        },
      },
    );
  }
}