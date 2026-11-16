
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

    // Match the current Dashboard URL settings.
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
      ASSETS: bindings.assets(),
      VINEXT_KV_CACHE: bindings.kv(),

      // Non-secret runtime variables
      SUPABASE_URL: bindings.text(
        "https://swtxrlngwlgmsmyegjoa.supabase.co"
      ),

      ENQUIRY_EMAIL_FROM: bindings.text(
        "notifications@webuywatches.com.au"
      ),

      NEXT_PUBLIC_TURNSTILE_SITE_KEY: bindings.text(
        "0x4AAAAAAF4ksszvqcwoAB7m"
      ),

      // Secrets: values remain in Cloudflare.
      SUPABASE_SECRET_KEY: bindings.secret(),
      RESEND_API_KEY: bindings.secret(),
      ENQUIRY_EMAIL_TO: bindings.secret(),
      TURNSTILE_SECRET_KEY: bindings.secret(),
    },
  }),
});
