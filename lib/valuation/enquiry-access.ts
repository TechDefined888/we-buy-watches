
import "server-only";

import type { NextRequest } from "next/server";

const CLOUDFLARE_STAGING_HOST =
  "we-buy-watches.connect-738.workers.dev";

const CLOUDFLARE_PRODUCTION_HOSTS = new Set([
  "webuywatches.com.au",
  "www.webuywatches.com.au",
]);

/**
 * Controls access to enquiry API endpoints.
 *
 * Preserves existing local, Vercel and Netlify
 * behaviour while adding separately controlled
 * Cloudflare staging and production access.
 */
export function isEnquiryAccessEnabled(
  request: NextRequest,
): boolean {
  // Preserve local development access.
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // Preserve Vercel preview access.
  const vercelPreviewEnabled =
    process.env.VERCEL_ENV === "preview" &&
    process.env.ENQUIRY_PREVIEW_ENABLED === "true";

  // Preserve Netlify testing access.
  const netlifyTestEnabled =
    process.env.NETLIFY_ENQUIRY_TEST_ENABLED === "true";

  const hostname =
    request.nextUrl.hostname.toLowerCase();

  // Cloudflare staging access.
  const cloudflareStagingEnabled =
    process.env.CLOUDFLARE_ENQUIRY_ENABLED ===
      "true" &&
    hostname === CLOUDFLARE_STAGING_HOST;

  // Cloudflare production access.
  // This flag remains false until domain cutover.
  const cloudflareProductionEnabled =
    process.env
      .CLOUDFLARE_PRODUCTION_ENQUIRY_ENABLED ===
      "true" &&
    CLOUDFLARE_PRODUCTION_HOSTS.has(hostname);

  return (
    vercelPreviewEnabled ||
    netlifyTestEnabled ||
    cloudflareStagingEnabled ||
    cloudflareProductionEnabled
  );
}
