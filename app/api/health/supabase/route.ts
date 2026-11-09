import { NextResponse } from "next/server";

import { createSupabaseAdmin } from "@/lib/supabase/admin";

type StorageDiagnostic = {
  status: number | null;
  contentType: string | null;
  hostname: string | null;
  pageTitle: string | null;
  redirected: boolean;
  requestFailed: boolean;
};

export async function GET() {
  // This endpoint is available only during development.
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse(null, { status: 404 });
  }

  const responseHeaders = {
    "Cache-Control": "no-store",
  };

  try {
    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

    if (!supabaseUrl || !secretKey) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "SUPABASE_URL or SUPABASE_SECRET_KEY is missing.",
        },
        {
          status: 503,
          headers: responseHeaders,
        },
      );
    }

    const supabase = createSupabaseAdmin();

    const [enquiries, photos, bucket] = await Promise.all([
      supabase
        .from("enquiries")
        .select("id", { head: true })
        .limit(1),

      supabase
        .from("enquiry_photos")
        .select("id", { head: true })
        .limit(1),

      supabase.storage.getBucket("watch-enquiry-photos"),
    ]);

    const checks = {
      enquiries: !enquiries.error,
      enquiryPhotos: !photos.error,
      privatePhotoBucket:
        !bucket.error && bucket.data?.public === false,
    };

    const errors = {
      enquiries: enquiries.error?.message ?? null,
      enquiryPhotos: photos.error?.message ?? null,
      bucket: bucket.error?.message ?? null,
    };

    let storageDiagnostic: StorageDiagnostic | null = null;

    if (!checks.privatePhotoBucket) {
      storageDiagnostic = {
        status: null,
        contentType: null,
        hostname: null,
        pageTitle: null,
        redirected: false,
        requestFailed: false,
      };

      try {
        const storageResponse = await fetch(
          `${supabaseUrl.replace(/\/+$/, "")}/storage/v1/bucket/watch-enquiry-photos`,
          {
            headers: {
              apikey: secretKey,
              Accept: "application/json",
            },
            cache: "no-store",
            redirect: "manual",
            signal: AbortSignal.timeout(10000),
          },
        );

        storageDiagnostic.status = storageResponse.status;
        storageDiagnostic.contentType =
          storageResponse.headers.get("content-type");
        storageDiagnostic.hostname = new URL(
          storageResponse.url,
        ).hostname;
        storageDiagnostic.redirected =
          storageResponse.status >= 300 &&
          storageResponse.status < 400;

        const responseBody = await storageResponse.text();

        // Extract only the HTML title, not the full response body.
        storageDiagnostic.pageTitle =
          responseBody
            .match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
            ?.replace(/<[^>]*>/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 160) ?? null;
      } catch {
        storageDiagnostic.requestFailed = true;
      }

      console.log(
        "Storage response details:",
        storageDiagnostic,
      );
    }

    const ok = Object.values(checks).every(Boolean);

    if (!ok) {
      console.error(
        "Supabase connection check failed:",
        errors,
      );
    }

    return NextResponse.json(
      {
        ok,
        checks,
        errors,
        bucket: bucket.data
          ? {
              id: bucket.data.id,
              name: bucket.data.name,
              public: bucket.data.public,
            }
          : null,
        storageDiagnostic,
      },
      {
        status: ok ? 200 : 503,
        headers: responseHeaders,
      },
    );
  } catch {
    console.error(
      "Supabase health check could not complete.",
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          "Health check could not complete. Check the server configuration and connection.",
      },
      {
        status: 503,
        headers: responseHeaders,
      },
    );
  }
}