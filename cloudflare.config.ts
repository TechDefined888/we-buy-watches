
import {
  bindings,
  defineConfig,
  defineWorker,
  triggers,
} from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "we-buy-watches",

    // Custom Worker entrypoint:
    // Supports both HTTP requests and scheduled events.
    entrypoint: "./worker/index.ts",

    compatibilityDate: "2026-11-16",

    // Keep the Cloudflare staging URL enabled.
    workersDev: true,
    previewUrls: false,

    // Daily cleanup at 02:00 UTC / 07:30 Sri Lanka
    triggers: [
      triggers.scheduled({
        schedule: "0 2 * * *",
      }),
    ],

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

      // Existing KV namespace
      VINEXT_KV_CACHE: bindings.kv({
        id: "6fa3e2a832e641b7ae6e9c1c464634ef",
      }),

      // Supabase project URL
      SUPABASE_URL: bindings.text(
        "https://swtxrlngwlgmsmyegjoa.supabase.co"
      ),

      // Verified email sender
      ENQUIRY_EMAIL_FROM: bindings.text(
        "notifications@webuywatches.com.au"
      ),

      // Public Turnstile site key
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: bindings.text(
        "0x4AAAAAAF4ksszvqcwoAB7m"
      ),

      // Allowed Turnstile hostnames
      TURNSTILE_ALLOWED_HOSTNAMES: bindings.text(
        "localhost,we-buy-watches.connect-738.workers.dev,webuywatches.com.au,www.webuywatches.com.au"
      ),

      // Cloudflare staging enquiry access
      CLOUDFLARE_ENQUIRY_ENABLED: bindings.text(
        "true"
      ),

      // Keep cleanup disabled during verification.
      ENQUIRY_CLEANUP_ENABLED: bindings.text(
        "false"
      ),

      // Secrets managed in Cloudflare Dashboard
      CRON_SECRET: bindings.secret(),
      SUPABASE_SECRET_KEY: bindings.secret(),
      RESEND_API_KEY: bindings.secret(),
      ENQUIRY_EMAIL_TO: bindings.secret(),
      TURNSTILE_SECRET_KEY: bindings.secret(),
    },
  }),
});
