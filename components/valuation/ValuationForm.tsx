"use client";

import {
  useRef,
  useState,
  type FormEvent,
} from "react";

import type {
  SellerDetails,
  WatchInformation,
} from "@/types/valuation";

import ConsentStep from "./ConsentStep";
import PhotoUploadStep from "./PhotoUploadStep";
import SellerDetailsStep from "./SellerDetailsStep";
import WatchInformationStep from "./WatchInformationStep";

const initialWatchInformation: WatchInformation = {
  brand: "",
  model: "",
  referenceNumber: "",
  year: "",
  condition: "",
  includedItems: "",
  additionalDetails: "",
};

const initialSellerDetails: SellerDetails = {
  fullName: "",
  email: "",
  phone: "",
  suburb: "",
  postcode: "",
};

const steps = [
  { id: "watch", label: "Watch details" },
  { id: "photos", label: "Photographs" },
  { id: "seller", label: "Contact details" },
  { id: "review", label: "Review & consent" },
] as const;

type FormStep = (typeof steps)[number]["id"];

const primaryButtonClassName =
  "inline-flex min-h-12 items-center justify-center gap-4 rounded-md bg-[#30104B] px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#452064] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]";

const secondaryButtonClassName =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[#30104B]/25 px-6 py-3 text-xs font-semibold text-[#30104B] transition-colors hover:bg-[#F7F0E3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]";

export default function ValuationForm() {
  const [watchInformation, setWatchInformation] =
    useState<WatchInformation>(initialWatchInformation);

  const [sellerDetails, setSellerDetails] =
    useState<SellerDetails>(initialSellerDetails);

  const [photos, setPhotos] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [step, setStep] = useState<FormStep>("watch");

  const headingRef = useRef<HTMLHeadingElement>(null);

  const currentStepIndex = steps.findIndex(
    (item) => item.id === step,
  );

  function changeStep(nextStep: FormStep) {
    setStep(nextStep);

    requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
  }

  function handleWatchChange(value: WatchInformation) {
    setWatchInformation(value);
    setConsent(false);
  }

  function handleSellerChange(value: SellerDetails) {
    setSellerDetails(value);
    setConsent(false);
  }

  function handlePhotosChange(value: File[]) {
    setPhotos(value);
    setConsent(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextStep = steps[currentStepIndex + 1];

    if (nextStep) {
      changeStep(nextStep.id);
    }

    // Submission will be connected to the backend separately.
  }

  function handleBack() {
    const previousStep = steps[currentStepIndex - 1];

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

  return (
    <div className="mt-10 rounded-2xl border border-[#30104B]/10 bg-white p-5 shadow-[0_12px_40px_rgba(33,26,38,0.05)] sm:p-8 lg:p-10">
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="rounded text-xs font-semibold uppercase tracking-[0.15em] text-[#795C27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
        style={{ fontFamily: "inherit" }}
      >
        Step {currentStepIndex + 1} of {steps.length}
        {" · "}
        {steps[currentStepIndex].label}
      </h3>

      <ol
        aria-label="Enquiry progress"
        className="mt-5 grid grid-cols-2 gap-4 border-b border-[#30104B]/10 pb-6 sm:grid-cols-4"
      >
        {steps.map((item, index) => {
          const isCurrent = item.id === step;
          const isComplete = index < currentStepIndex;

          return (
            <li
              key={item.id}
              aria-current={isCurrent ? "step" : undefined}
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
                <span aria-hidden="true">{index + 1}. </span>
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
      >
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
          <ConsentStep
            watch={watchInformation}
            seller={sellerDetails}
            photos={photos}
            consent={consent}
            onConsentChange={setConsent}
            onEdit={changeStep}
          />
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#30104B]/10 pt-6">
          {step !== "watch" ? (
            <button
              type="button"
              onClick={handleBack}
              className={secondaryButtonClassName}
            >
              <span aria-hidden="true">←</span>
              Back
            </button>
          ) : (
            <p className="max-w-sm text-xs leading-6 text-[#211A26]/70">
              Your details are not submitted when you continue.
            </p>
          )}

          {step !== "review" ? (
            <button
              type="submit"
              className={primaryButtonClassName}
            >
              {continueLabel}
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <div className="max-w-sm">
              <button
                type="button"
                disabled
                aria-describedby="submission-availability"
                className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-md bg-[#30104B]/15 px-6 py-3 text-xs font-semibold text-[#211A26]/65"
              >
                Submit Enquiry
              </button>

              <p
                id="submission-availability"
                className="mt-3 text-xs leading-6 text-[#211A26]/70"
              >
                Online submission is not available yet. Your
                enquiry has not been sent.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}