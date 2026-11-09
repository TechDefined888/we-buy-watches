"use client";

import {
  useRef,
  useState,
  type FormEvent,
} from "react";

import { z } from "zod";

import type {
  SellerDetails,
  WatchInformation,
} from "@/types/valuation";

import {
  ENQUIRY_SUCCESS_MESSAGE,
  REFERRAL_CONSENT_VERSION,
} from "@/lib/valuation/config";

import {
  enquirySubmissionSchema,
} from "@/lib/valuation/schema";

import ConsentStep from "./ConsentStep";
import PhotoUploadStep from "./PhotoUploadStep";
import SellerDetailsStep from "./SellerDetailsStep";
import TurnstileWidget from "./TurnstileWidget";
import WatchInformationStep from "./WatchInformationStep";

const initialWatchInformation: WatchInformation = {
  brand: "",
  model: "",
  referenceNumber: "",
  year: "",
  condition: "",
  includedItems: "",
  serviceHistory: "",
  knownFaults: "",
  expectedPrice: "",
  additionalDetails: "",
};

const initialSellerDetails: SellerDetails = {
  fullName: "",
  email: "",
  phone: "",
  suburb: "",
  postcode: "",
  stateOrTerritory: "",
  preferredContactMethod: "",
  additionalNotes: "",
};

const steps = [
  { id: "watch", label: "Watch details" },
  { id: "photos", label: "Photographs" },
  { id: "seller", label: "Contact details" },
  { id: "review", label: "Review & consent" },
] as const;

type FormStep = (typeof steps)[number]["id"];

const uploadResponseSchema = z.object({
  ok: z.literal(true),
  sessionToken: z.string().min(1),
  expiresAt: z.number(),
  uploads: z.array(
    z.object({
      position: z.number().int().min(1).max(5),
      path: z.string().min(1),
      signedUrl: z.string().url(),
      token: z.string().min(1),
    }),
  ),
});

const successResponseSchema = z.object({
  ok: z.literal(true),
  enquiryId: z.string().uuid(),
  message: z.string(),
});

type UploadResponse = z.infer<
  typeof uploadResponseSchema
>;

type UploadAttempt = {
  fingerprint: string;
  session: UploadResponse;
  completedPositions: Set<number>;
};

type SubmissionIdentity = {
  key: string;
  landingPage: string;
};

class SubmissionError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "SubmissionError";
    this.code = code;
  }
}

const primaryButtonClassName =
  "inline-flex min-h-12 items-center justify-center gap-4 rounded-md bg-[#30104B] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#452064] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none";

const secondaryButtonClassName =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[#30104B]/25 px-6 py-3 text-xs font-semibold text-[#30104B] transition-colors hover:bg-[#F7F0E3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none";

async function postJson(
  url: string,
  body: unknown,
): Promise<unknown> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "same-origin",
    cache: "no-store",
    signal: AbortSignal.timeout(120000),
  });

  const data: unknown = await response
    .json()
    .catch(() => null);

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new SubmissionError(
      "The server returned an unexpected response. Please try again.",
    );
  }

  const result = data as {
    ok?: unknown;
    message?: unknown;
    code?: unknown;
  };

  if (!response.ok || result.ok !== true) {
    throw new SubmissionError(
      typeof result.message === "string"
        ? result.message
        : "Could not complete the request. Please try again.",
      typeof result.code === "string"
        ? result.code
        : undefined,
    );
  }

  return data;
}

async function uploadPhoto(
  signedUrl: string,
  file: File,
  position: number,
): Promise<void> {
  const body = new FormData();

  body.append("cacheControl", "3600");
  body.append("", file, file.name);

  const response = await fetch(signedUrl, {
    method: "PUT",
    body,
    credentials: "omit",
    signal: AbortSignal.timeout(120000),
  });

  if (response.ok) {
    return;
  }

  const errorBody: unknown = await response
    .json()
    .catch(() => null);

  const storageError =
    errorBody &&
    typeof errorBody === "object" &&
    !Array.isArray(errorBody)
      ? (errorBody as {
          statusCode?: unknown;
          error?: unknown;
        })
      : null;

  // The previous upload might have succeeded even if
  // its response was lost. The final API checks it.
  const alreadyUploaded =
    response.status === 409 ||
    String(storageError?.statusCode) === "409" ||
    storageError?.error === "Duplicate";

  if (alreadyUploaded) {
    return;
  }

  throw new SubmissionError(
    `Photograph ${position} could not be uploaded. Check your connection and try again.`,
  );
}

export default function ValuationForm() {
  const [watchInformation, setWatchInformation] =
    useState<WatchInformation>(
      initialWatchInformation,
    );

  const [sellerDetails, setSellerDetails] =
    useState<SellerDetails>(initialSellerDetails);

  const [photos, setPhotos] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [step, setStep] = useState<FormStep>("watch");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submissionError, setSubmissionError] =
    useState("");

  const [submissionStatus, setSubmissionStatus] =
    useState("");

  const [enquiryId, setEnquiryId] =
    useState<string | null>(null);

  const [turnstileToken, setTurnstileToken] =
    useState("");

  const [turnstileResetKey, setTurnstileResetKey] =
    useState(0);

  const headingRef =
    useRef<HTMLHeadingElement>(null);

  const submissionIdentityRef =
    useRef<SubmissionIdentity | null>(null);

  const uploadAttemptRef =
    useRef<UploadAttempt | null>(null);

  const submittingRef = useRef(false);

  const currentStepIndex = steps.findIndex(
    (item) => item.id === step,
  );

  function focusHeading() {
    requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
  }

  function changeStep(nextStep: FormStep) {
    if (submittingRef.current) {
      return;
    }

    setStep(nextStep);
    focusHeading();
  }

  function resetSubmissionAttempt() {
    submissionIdentityRef.current = null;
    uploadAttemptRef.current = null;

    setConsent(false);
    setSubmissionError("");
    setSubmissionStatus("");
    setTurnstileToken("");

    setTurnstileResetKey(
      (previous) => previous + 1,
    );
  }

  function handleWatchChange(
    value: WatchInformation,
  ) {
    if (submittingRef.current) {
      return;
    }

    setWatchInformation(value);
    resetSubmissionAttempt();
  }

  function handleSellerChange(
    value: SellerDetails,
  ) {
    if (submittingRef.current) {
      return;
    }

    setSellerDetails(value);
    resetSubmissionAttempt();
  }

  function handlePhotosChange(value: File[]) {
    if (submittingRef.current) {
      return;
    }

    setPhotos(value);
    resetSubmissionAttempt();
  }

  function handleConsentChange(value: boolean) {
    if (submittingRef.current) {
      return;
    }

    setConsent(value);
    setSubmissionError("");

    uploadAttemptRef.current = null;
  }

  async function submitEnquiry() {
    if (submittingRef.current) {
      return;
    }

    setSubmissionError("");
    setSubmissionStatus("");

    if (!consent) {
      setSubmissionError(
        "Please give your referral consent before submitting.",
      );
      return;
    }

    if (!submissionIdentityRef.current) {
      submissionIdentityRef.current = {
        key: crypto.randomUUID(),
        landingPage: window.location.pathname,
      };
    }

    const identity = submissionIdentityRef.current;

    // Keep original string form values in the request.
    // The server schema handles transformations.
    const submission = {
      submissionKey: identity.key,
      watch: watchInformation,
      seller: sellerDetails,
      photos: photos.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
      consent,
      consentVersion: REFERRAL_CONSENT_VERSION,
      landingPage: identity.landingPage,
    };

    const validation =
      enquirySubmissionSchema.safeParse(submission);

    if (!validation.success) {
      const issue = validation.error.issues[0];
      const section = String(
        issue?.path[0] ?? "",
      );

      if (
        section === "watch" ||
        section === "seller" ||
        section === "photos"
      ) {
        changeStep(section);
      }

      setSubmissionError(
        issue?.message ??
          "Please check your enquiry details.",
      );

      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const fingerprint =
        JSON.stringify(submission);

      let attempt = uploadAttemptRef.current;

      const needsNewSession =
        !attempt ||
        attempt.fingerprint !== fingerprint ||
        attempt.session.expiresAt <=
          Date.now() + 5000;

      if (needsNewSession) {
        if (!turnstileToken) {
          throw new SubmissionError(
            "Please complete the verification before submitting.",
          );
        }

        setSubmissionStatus(
          "Verifying and preparing your enquiry…",
        );

        let response: unknown;

        try {
          response = await postJson(
            "/api/enquiries/uploads",
            {
              submission,
              turnstileToken,
            },
          );
        } finally {
          // Verification tokens are single-use.
          setTurnstileToken("");

          setTurnstileResetKey(
            (previous) => previous + 1,
          );
        }

        const parsed =
          uploadResponseSchema.safeParse(response);

        if (!parsed.success) {
          throw new SubmissionError(
            "Could not prepare photo uploads. Please try again.",
          );
        }

        const expectedPositions = photos.map(
          (_, index) => index + 1,
        );

        const receivedPositions =
          parsed.data.uploads.map(
            (upload) => upload.position,
          );

        if (
          receivedPositions.length !==
            expectedPositions.length ||
          expectedPositions.some(
            (position) =>
              !receivedPositions.includes(position),
          )
        ) {
          throw new SubmissionError(
            "The photo upload details were incomplete. Please try again.",
          );
        }

        attempt = {
          fingerprint,
          session: parsed.data,
          completedPositions: new Set<number>(),
        };

        uploadAttemptRef.current = attempt;
      }

      if (!attempt) {
        throw new SubmissionError(
          "Could not prepare your enquiry.",
        );
      }

      for (const upload of attempt.session.uploads) {
        if (
          attempt.completedPositions.has(
            upload.position,
          )
        ) {
          continue;
        }

        const file = photos[upload.position - 1];

        if (!file) {
          throw new SubmissionError(
            "A selected photograph is missing. Please select your photographs again.",
          );
        }

        setSubmissionStatus(
          `Uploading photograph ${upload.position} of ${photos.length}…`,
        );

        await uploadPhoto(
          upload.signedUrl,
          file,
          upload.position,
        );

        attempt.completedPositions.add(
          upload.position,
        );
      }

      setSubmissionStatus(
        "Checking photographs and saving your enquiry…",
      );

      const response = await postJson(
        "/api/enquiries",
        {
          submission,
          sessionToken:
            attempt.session.sessionToken,
        },
      );

      const saved =
        successResponseSchema.safeParse(response);

      if (!saved.success) {
        throw new SubmissionError(
          "Your submission status could not be confirmed. Please try again using this form.",
        );
      }

      setEnquiryId(saved.data.enquiryId);

      setPhotos([]);
      setWatchInformation(
        initialWatchInformation,
      );
      setSellerDetails(initialSellerDetails);
      setConsent(false);
      setTurnstileToken("");

      uploadAttemptRef.current = null;
      submissionIdentityRef.current = null;

      setSubmissionStatus("");
      focusHeading();
    } catch (error) {
      if (error instanceof SubmissionError) {
        setSubmissionError(error.message);

        if (
          error.code ===
            "INVALID_UPLOAD_SESSION" ||
          error.code === "SUBMISSION_CHANGED" ||
          error.code === "INVALID_PHOTO"
        ) {
          uploadAttemptRef.current = null;
        }
      } else {
        setSubmissionError(
          "The request could not be completed. Check your connection and try again. Your form details are still available.",
        );
      }

      setSubmissionStatus("");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submittingRef.current) {
      return;
    }

    if (step === "review") {
      await submitEnquiry();
      return;
    }

    setSubmissionError("");

    const nextStep =
      steps[currentStepIndex + 1];

    if (nextStep) {
      changeStep(nextStep.id);
    }
  }

  function handleBack() {
    if (submittingRef.current) {
      return;
    }

    setSubmissionError("");

    const previousStep =
      steps[currentStepIndex - 1];

    if (previousStep) {
      changeStep(previousStep.id);
    }
  }

  const continueLabel =
    step === "watch"
      ? "Continue to Photos"
      : step === "photos"
        ? "Continue to Contact Details"
        : "Continue to Review";

  if (enquiryId) {
    return (
      <div className="mt-10 rounded-2xl border border-[#C8A75E]/40 bg-white p-6 shadow-[0_12px_40px_rgba(33,26,38,0.05)] sm:p-10">
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="rounded text-2xl font-medium text-[#30104B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
          style={{ fontFamily: "inherit" }}
        >
          Thank You
        </h3>

        <p
          role="status"
          className="mt-4 max-w-2xl text-sm leading-7 text-[#211A26]"
        >
          {ENQUIRY_SUCCESS_MESSAGE}
        </p>

        <p className="mt-5 text-xs leading-6 text-[#211A26]/70">
          Enquiry reference:
          <span className="mt-1 block break-all font-medium text-[#30104B]">
            {enquiryId}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-[#30104B]/10 bg-white p-5 shadow-[0_12px_40px_rgba(33,26,38,0.05)] sm:p-8 lg:p-10">
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="rounded text-xs font-semibold uppercase tracking-[0.15em] text-[#795C27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
        style={{ fontFamily: "inherit" }}
      >
        Step {currentStepIndex + 1} of{" "}
        {steps.length}
        {" · "}
        {steps[currentStepIndex].label}
      </h3>

      <ol
        aria-label="Enquiry progress"
        className="mt-5 grid grid-cols-2 gap-4 border-b border-[#30104B]/10 pb-6 sm:grid-cols-4"
      >
        {steps.map((item, index) => {
          const isCurrent = item.id === step;
          const isComplete =
            index < currentStepIndex;

          return (
            <li
              key={item.id}
              aria-current={
                isCurrent ? "step" : undefined
              }
              className="min-w-0"
            >
              <div
                aria-hidden="true"
                className={`mb-3 h-1 rounded-full ${
                  isCurrent || isComplete
                    ? "bg-[#30104B]"
                    : "bg-[#30104B]/10"
                }`}
              />

              <p
                className={`text-[11px] leading-5 sm:text-xs ${
                  isCurrent
                    ? "font-semibold text-[#30104B]"
                    : "text-[#211A26]/70"
                }`}
              >
                <span aria-hidden="true">
                  {index + 1}.{" "}
                </span>
                {item.label}
              </p>
            </li>
          );
        })}
      </ol>

      <form
        onSubmit={handleSubmit}
        className="mt-7"
        aria-label="Watch enquiry"
        aria-busy={isSubmitting}
      >
        {submissionError && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-[#A12626]"
          >
            {submissionError}
          </div>
        )}

        <fieldset
          disabled={isSubmitting}
          className="m-0 min-w-0 border-0 p-0"
        >
          <legend className="sr-only">
            Watch enquiry details
          </legend>

          {step === "watch" && (
            <WatchInformationStep
              value={watchInformation}
              onChange={handleWatchChange}
            />
          )}

          {step === "photos" && (
            <PhotoUploadStep
              files={photos}
              onChange={handlePhotosChange}
            />
          )}

          {step === "seller" && (
            <SellerDetailsStep
              value={sellerDetails}
              onChange={handleSellerChange}
            />
          )}

          {step === "review" && (
            <>
              <ConsentStep
                watch={watchInformation}
                seller={sellerDetails}
                photos={photos}
                consent={consent}
                onConsentChange={
                  handleConsentChange
                }
                onEdit={changeStep}
              />

              <TurnstileWidget
                resetKey={turnstileResetKey}
                onTokenChange={
                  setTurnstileToken
                }
              />
            </>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#30104B]/10 pt-6">
            {step !== "watch" ? (
              <button
                type="button"
                onClick={handleBack}
                className={
                  secondaryButtonClassName
                }
              >
                <span aria-hidden="true">
                  ←
                </span>
                Back
              </button>
            ) : (
              <p className="max-w-sm text-xs leading-6 text-[#211A26]/70">
                Your details are not submitted
                when you continue.
              </p>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting ||
                (step === "review" &&
                  (!consent || !turnstileToken))
              }
              className={primaryButtonClassName}
            >
              {step !== "review"
                ? continueLabel
                : isSubmitting
                  ? "Submitting…"
                  : "Submit My Enquiry"}

              {!isSubmitting && (
                <span aria-hidden="true">
                  →
                </span>
              )}
            </button>
          </div>
        </fieldset>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-4 text-sm leading-6 text-[#30104B]"
        >
          {submissionStatus}
        </div>

        {isSubmitting && (
          <p className="mt-2 text-xs leading-6 text-[#211A26]/70">
            Please keep this page open until your
            submission is confirmed.
          </p>
        )}
      </form>
    </div>
  );
}