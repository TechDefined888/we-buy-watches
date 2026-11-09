"use client";

import Script from "next/script";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type TurnstileOptions = {
  sitekey: string;
  action: string;
  theme: "light";
  size: "flexible";
  "response-field": boolean;
  "refresh-expired": "auto";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: TurnstileOptions,
  ) => string | undefined;
  remove: (widgetId: string) => void;
};

type TurnstileWindow = Window & {
  turnstile?: TurnstileApi;
};

type TurnstileWidgetProps = {
  resetKey: number;
  onTokenChange: (token: string) => void;
};

const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function TurnstileWidget({
  resetKey,
  onTokenChange,
}: TurnstileWidgetProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready || !siteKey) {
      return;
    }

    const api = (window as TurnstileWindow)
      .turnstile;

    const container = containerRef.current;

    if (!api || !container) {
      return;
    }

    let active = true;

    onTokenChange("");

    const widgetId = api.render(container, {
      sitekey: siteKey,
      action: "watch_enquiry",
      theme: "light",
      size: "flexible",
      "response-field": false,
      "refresh-expired": "auto",

      callback: (token) => {
        if (!active) {
          return;
        }

        setError("");
        onTokenChange(token);
      },

      "expired-callback": () => {
        if (!active) {
          return;
        }

        onTokenChange("");
      },

      "error-callback": () => {
        if (!active) {
          return;
        }

        onTokenChange("");

        setError(
          "Verification could not complete. Check your connection or reload this page.",
        );
      },
    });

    return () => {
      active = false;

      if (widgetId !== undefined) {
        api.remove(widgetId);
      }

      onTokenChange("");
    };
  }, [ready, resetKey, onTokenChange]);

  if (!siteKey) {
    return (
      <p
        role="alert"
        className="mt-6 text-sm leading-6 text-[#A12626]"
      >
        Verification is unavailable. Please try again
        later.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <Script
        id="watch-enquiry-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => {
          onTokenChange("");

          setError(
            "Verification could not load. Check your connection or reload this page.",
          );
        }}
      />

      <p className="mb-3 text-xs leading-6 text-[#211A26]/75">
        Please complete the verification before
        submitting your enquiry.
      </p>

      <div
        ref={containerRef}
        className="min-h-[65px] w-full"
      />

      {error && (
        <p
          role="alert"
          className="mt-3 text-sm leading-6 text-[#A12626]"
        >
          {error}
        </p>
      )}
    </div>
  );
}