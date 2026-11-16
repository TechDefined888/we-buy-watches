
import {
  bindings,
  defineConfig,
  defineWorker,
} from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "we-buy-watches",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-16",

    // Cloudflare staging URL configuration
    workersDev: true,
    previewUrls: false,

    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: [
        "/*",
        "!/_next/static/*",
        "!/*/_next/static/*",
      ],
    },

    env: {
      // Cloudflare static assets
      ASSETS: bindings.assets(),

      // Reuse the existing Cloudflare KV namespace
      VINEXT_KV_CACHE: bindings.kv({
        id: "6fa3e2a832e641b7ae6e9c1c464634ef",
      }),

      // Supabase project URL (non-secret)
      SUPABASE_URL: bindings.text(
        "https://swtxrlngwlgmsmyegjoa.supabase.co"
      ),

      // Verified Resend sender email (non-secret)
      ENQUIRY_EMAIL_FROM: bindings.text(
        "notifications@webuywatches.com.au"
      ),

      // Public Cloudflare Turnstile site key
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: bindings.text(
        "0x4AAAAAAF4ksszvqcwoAB7m"
      ),

      // Allowed Turnstile verification hostnames
      TURNSTILE_ALLOWED_HOSTNAMES: bindings.text(
        "localhost,we-buy-watches.connect-738.workers.dev,webuywatches.com.au,www.webuywatches.com.au"
      ),

      // Enable enquiry APIs on Cloudflare staging
      CLOUDFLARE_ENQUIRY_ENABLED: bindings.text(
        "true"
      ),
      // Cleanup remains in safe preview mode
      ENQUIRY_CLEANUP_ENABLED: bindings.text("false"),

      // Secret value is managed in Cloudflare Dashboard
      CRON_SECRET: bindings.secret(),

      // Secrets: actual values remain in Cloudflare
      SUPABASE_SECRET_KEY: bindings.secret(),
      RESEND_API_KEY: bindings.secret(),
      ENQUIRY_EMAIL_TO: bindings.secret(),
      TURNSTILE_SECRET_KEY: bindings.secret(),
    },
  }),
});
