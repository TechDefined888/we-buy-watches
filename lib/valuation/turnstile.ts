import "server-only";

import { z } from "zod";

const verificationSchema = z.object({
  success: z.boolean(),
  hostname: z.string().optional(),
  action: z.string().optional(),
});

type VerificationResult =
  | { ok: true }
  | {
      ok: false;
      unavailable: boolean;
    };

export async function verifyTurnstile(
  token: string,
): Promise<VerificationResult> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY?.trim();

  const allowedHostnames = (
    process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? ""
  )
    .split(",")
    .map((hostname) =>
      hostname.trim().toLowerCase(),
    )
    .filter(Boolean);

  if (!secret || allowedHostnames.length === 0) {
    console.error(
      "Turnstile server configuration is missing.",
    );

    return {
      ok: false,
      unavailable: true,
    };
  }

  if (!token || token.length > 2048) {
    return {
      ok: false,
      unavailable: false,
    };
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret,
          response: token,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!response.ok) {
      return {
        ok: false,
        unavailable: true,
      };
    }

    const body: unknown = await response.json();

    const parsed =
      verificationSchema.safeParse(body);

    if (!parsed.success) {
      return {
        ok: false,
        unavailable: true,
      };
    }

    const result = parsed.data;

    if (
      !result.success ||
      result.action !== "watch_enquiry" ||
      !result.hostname ||
      !allowedHostnames.includes(
        result.hostname.toLowerCase(),
      )
    ) {
      return {
        ok: false,
        unavailable: false,
      };
    }

    return { ok: true };
  } catch {
    console.error(
      "Turnstile verification could not complete.",
    );

    return {
      ok: false,
      unavailable: true,
    };
  }
}