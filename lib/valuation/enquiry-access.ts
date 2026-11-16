
import "server-only";

import type { NextRequest } from "next/server";

/**
 * Controls access to enquiry API endpoints.
 *
 * Supports:
 * - Local development
 * - Vercel preview deployments
 * - Existing Netlify testing
 * - Cloudflare staging (explicitly enabled)
 */
export function isEnquiryAccessEnabled(
  request: NextRequest,
): boolean {
  // Allow local development.
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // Preserve existing Vercel preview access.
  const vercelPreviewEnabled =
    process.env.VERCEL_ENV === "preview" &&
    process.env.ENQUIRY_PREVIEW_ENABLED === "true";

  // Preserve existing Netlify testing access.
  const netlifyTestEnabled =
    process.env.NETLIFY_ENQUIRY_TEST_ENABLED === "true";

  // Enable Cloudflare staging only when explicitly configured.
  const cloudflareEnabled =
    process.env.CLOUDFLARE_ENQUIRY_ENABLED === "true";

  const cloudflareStagingHostname =
    "we-buy-watches.connect-738.workers.dev";

  const isCloudflareStaging =
    request.nextUrl.hostname.toLowerCase() ===
    cloudflareStagingHostname;

  return (
    vercelPreviewEnabled ||
    netlifyTestEnabled ||
    (cloudflareEnabled && isCloudflareStaging)
  );
}
