import handler from "vinext/server/fetch-handler";

type WorkerEnv = {
  CRON_SECRET: string;
  ENQUIRY_CLEANUP_ENABLED: string;
};

const STAGING_HOSTNAME =
  "we-buy-watches.connect-738.workers.dev";

// Existing cleanup endpoint — always preview-only.
const CLEANUP_URL =
  `https://${STAGING_HOSTNAME}/api/cron/cleanup-enquiry-uploads?dryRun=true`;

export default {
  // Handle normal website and API requests.
  async fetch(
    request: Request,
    env: WorkerEnv,
    ctx: ExecutionContext,
  ): Promise<Response> {
    // Preserve existing Vinext application handling.
    const response = await handler.fetch(
      request,
      env,
      ctx,
    );

    const hostname = new URL(
      request.url,
    ).hostname.toLowerCase();

    // Prevent indexing only on the staging hostname.
    if (hostname === STAGING_HOSTNAME) {
      const stagingResponse = new Response(
        response.body,
        response,
      );

      stagingResponse.headers.set(
        "X-Robots-Tag",
        "noindex, nofollow",
      );

      return stagingResponse;
    }

    // Do not modify production response headers.
    return response;
  },

  // Existing daily scheduled cleanup.
  async scheduled(
    controller: ScheduledController,
    env: WorkerEnv,
    ctx: ExecutionContext,
  ): Promise<void> {
    if (controller.cron !== "0 2 * * *") {
      throw new Error(
        "Unexpected cleanup schedule.",
      );
    }

    if (
      !env.CRON_SECRET ||
      env.CRON_SECRET.length < 32
    ) {
      throw new Error(
        "Cleanup secret is missing or invalid.",
      );
    }

    const request = new Request(CLEANUP_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.CRON_SECRET}`,
      },
    });

    // Reuse the existing Next.js cleanup API route.
    // dryRun=true prevents photo deletion.
    const response = await handler.fetch(
      request,
      env,
      ctx,
    );

    if (!response.ok) {
      console.error(
        "Scheduled cleanup preview failed.",
        {
          status: response.status,
        },
      );

      throw new Error(
        "Scheduled cleanup preview failed.",
      );
    }

    const result: unknown = await response.json();

    if (
      typeof result !== "object" ||
      result === null ||
      !("ok" in result) ||
      result.ok !== true ||
      !("mode" in result) ||
      result.mode !== "preview"
    ) {
      throw new Error(
        "Unexpected cleanup preview response.",
      );
    }

    console.log(
      "Scheduled cleanup preview completed.",
    );
  },
};