
import handler from "vinext/server/fetch-handler";

type WorkerEnv = {
  CRON_SECRET: string;
  ENQUIRY_CLEANUP_ENABLED: string;
};

const CLEANUP_URL =
  "https://we-buy-watches.connect-738.workers.dev/api/cron/cleanup-enquiry-uploads?dryRun=true";

export default {
  fetch(
    request: Request,
    env: WorkerEnv,
    ctx: ExecutionContext,
  ): Promise<Response> {
    return handler.fetch(request, env, ctx);
  },

  async scheduled(
    controller: ScheduledController,
    env: WorkerEnv,
    ctx: ExecutionContext,
  ): Promise<void> {
    if (controller.cron !== "0 2 * * *") {
      throw new Error("Unexpected cleanup schedule.");
    }

    if (
      !env.CRON_SECRET ||
      env.CRON_SECRET.length < 32
    ) {
      throw new Error(
        "Cleanup secret is missing or invalid."
      );
    }

    const request = new Request(CLEANUP_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.CRON_SECRET}`,
      },
    });

    // Reuse the existing Next.js cleanup API route.
    // Always dry-run: no images will be deleted.
    const response = await handler.fetch(
      request,
      env,
      ctx,
    );

    if (!response.ok) {
      console.error(
        "Scheduled cleanup preview failed.",
        { status: response.status }
      );

      throw new Error(
        "Scheduled cleanup preview failed."
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
        "Unexpected cleanup preview response."
      );
    }

    console.log(
      "Scheduled cleanup preview completed."
    );
  },
};
