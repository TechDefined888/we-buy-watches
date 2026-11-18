
import handler from "vinext/server/fetch-handler";

type WorkerEnv = {
  CRON_SECRET: string;
  ENQUIRY_CLEANUP_ENABLED: string;
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
};

const STAGING_HOSTNAME =
  "we-buy-watches.connect-738.workers.dev";

const VIDEO_PATH = "/videos/hero-watch1.mp4";

// Existing cleanup endpoint — always preview-only.
const CLEANUP_URL =
  `https://${STAGING_HOSTNAME}/api/cron/cleanup-enquiry-uploads?dryRun=true`;

async function serveVideoRange(
  request: Request,
  env: WorkerEnv,
): Promise<Response> {
  // Fetch the complete static asset without a Range header.
  const assetRequest = new Request(request);
  assetRequest.headers.delete("Range");
  assetRequest.headers.delete("If-Range");

  const assetResponse = await env.ASSETS.fetch(assetRequest);

  if (!assetResponse.ok) {
    return assetResponse;
  }

  const range = request.headers.get("Range");

  // Normal requests retain the existing asset response.
  if (!range) {
    return assetResponse;
  }

  // Honour If-Range only when the validator matches.
  const ifRange = request.headers.get("If-Range");

  if (ifRange) {
    const etag = assetResponse.headers.get("ETag");
    const lastModified =
      assetResponse.headers.get("Last-Modified");

    if (ifRange !== etag && ifRange !== lastModified) {
      return assetResponse;
    }
  }

  const data = await assetResponse.arrayBuffer();
  const total = data.byteLength;

  const headers = new Headers(assetResponse.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Type", "video/mp4");
  headers.delete("Content-Encoding");
  headers.delete("Transfer-Encoding");

  const invalidRange = () => {
    headers.set("Content-Range", `bytes */${total}`);
    headers.set("Content-Length", "0");

    return new Response(null, {
      status: 416,
      headers,
    });
  };

  // Support one standard byte range or suffix range.
  const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());

  if (!match || (!match[1] && !match[2])) {
    return invalidRange();
  }

  let start: number;
  let end: number;

  if (!match[1]) {
    const suffixLength = Number(match[2]);

    if (!Number.isSafeInteger(suffixLength) ||
        suffixLength <= 0) {
      return invalidRange();
    }

    start = Math.max(0, total - suffixLength);
    end = total - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : total - 1;
  }

  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    start >= total ||
    start > end ||
    total === 0
  ) {
    return invalidRange();
  }

  end = Math.min(end, total - 1);

  const partialData = data.slice(start, end + 1);

  headers.set(
    "Content-Range",
    `bytes ${start}-${end}/${total}`,
  );
  headers.set(
    "Content-Length",
    String(partialData.byteLength),
  );

  return new Response(partialData, {
    status: 206,
    headers,
  });
}

export default {
  async fetch(
    request: Request,
    env: WorkerEnv,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const hostname = new URL(
      request.url,
    ).hostname.toLowerCase();

    const pathname = new URL(request.url).pathname;

    // Handle only the hero video byte-range requests.
    if (
      request.method === "GET" &&
      pathname === VIDEO_PATH &&
      request.headers.has("Range")
    ) {
      const response = await serveVideoRange(request, env);

      if (hostname === STAGING_HOSTNAME) {
        const stagingResponse =
          new Response(response.body, response);

        stagingResponse.headers.set(
          "X-Robots-Tag",
          "noindex, nofollow",
        );

        return stagingResponse;
      }

      return response;
    }

    // Preserve all existing Vinext application handling.
    const response = await handler.fetch(
      request,
      env,
      ctx,
    );

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

    return response;
  },

  // Existing daily scheduled cleanup — preview only.
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

    const response = await handler.fetch(
      request,
      env,
      ctx,
    );

    if (!response.ok) {
      console.error(
        "Scheduled cleanup preview failed.",
        { status: response.status },
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
