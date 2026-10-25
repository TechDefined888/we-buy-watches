"use client";

import type {
  SellerDetails,
  WatchInformation,
} from "@/types/valuation";

type ConsentStepProps = {
  watch: WatchInformation;
  seller: SellerDetails;
  photos: File[];
  consent: boolean;
  onConsentChange: (value: boolean) => void;
  onEdit: (step: "watch" | "photos" | "seller") => void;
};

const conditionLabels: Record<string, string> = {
  unworn: "Unworn",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  "needs-attention": "Needs repair or attention",
};

const includedItemsLabels: Record<string, string> = {
  "box-and-papers": "Box and papers",
  "box-only": "Box only",
  "papers-only": "Papers only",
  neither: "Neither",
  unsure: "Not sure",
};

const editButtonClassName =
  "min-h-11 rounded px-3 text-xs font-semibold text-[#30104B] underline underline-offset-4 hover:bg-[#F7F0E3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30104B]";

export default function ConsentStep({
  watch,
  seller,
  photos,
  consent,
  onConsentChange,
  onEdit,
}: ConsentStepProps) {
  const watchDetails = [
    ["Brand", watch.brand],
    ["Model", watch.model],
    ["Reference number", watch.referenceNumber],
    ["Year", watch.year],
    ["Condition", conditionLabels[watch.condition]],
    ["Box and papers", includedItemsLabels[watch.includedItems]],
    ["Additional details", watch.additionalDetails],
  ];

  const sellerDetails = [
    ["Full name", seller.fullName],
    ["Email address", seller.email],
    ["Phone number", seller.phone],
    ["Suburb or town", seller.suburb],
    ["Postcode", seller.postcode],
  ];

  return (
    <fieldset className="min-w-0">
      <legend className="text-xl font-medium tracking-[-0.02em] text-[#211A26] sm:text-2xl">
        Review Your Enquiry
      </legend>

      <p className="mt-3 text-sm leading-7 text-[#211A26]/75">
        Check your details before submitting. You can return to
        any section to make changes.
      </p>

      <div className="mt-7 space-y-5">
        <section
          aria-labelledby="review-watch-heading"
          className="rounded-xl border border-[#30104B]/15 p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h4
              id="review-watch-heading"
              className="text-base font-semibold text-[#211A26]"
              style={{ fontFamily: "inherit" }}
            >
              Watch details
            </h4>

            <button
              type="button"
              onClick={() => onEdit("watch")}
              className={editButtonClassName}
              aria-label="Edit watch details"
            >
              Edit
            </button>
          </div>

          <dl className="mt-4 space-y-4">
            {watchDetails.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 text-sm sm:grid-cols-[160px_1fr] sm:gap-4"
              >
                <dt className="text-[#211A26]/70">{label}</dt>
                <dd className="min-w-0 whitespace-pre-wrap break-words text-[#211A26]">
                  {value?.trim() || "Not provided"}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-labelledby="review-photos-heading"
          className="rounded-xl border border-[#30104B]/15 p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h4
              id="review-photos-heading"
              className="text-base font-semibold text-[#211A26]"
              style={{ fontFamily: "inherit" }}
            >
              Photographs
            </h4>

            <button
              type="button"
              onClick={() => onEdit("photos")}
              className={editButtonClassName}
              aria-label="Edit selected photographs"
            >
              Edit
            </button>
          </div>

          {photos.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#211A26]/80">
              {photos.map((file) => (
                <li
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className="break-all"
                >
                  {file.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-[#211A26]/70">
              No photographs selected.
            </p>
          )}
        </section>

        <section
          aria-labelledby="review-contact-heading"
          className="rounded-xl border border-[#30104B]/15 p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h4
              id="review-contact-heading"
              className="text-base font-semibold text-[#211A26]"
              style={{ fontFamily: "inherit" }}
            >
              Contact details
            </h4>

            <button
              type="button"
              onClick={() => onEdit("seller")}
              className={editButtonClassName}
              aria-label="Edit contact details"
            >
              Edit
            </button>
          </div>

          <dl className="mt-4 space-y-4">
            {sellerDetails.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 text-sm sm:grid-cols-[160px_1fr] sm:gap-4"
              >
                <dt className="text-[#211A26]/70">{label}</dt>
                <dd className="min-w-0 break-words text-[#211A26]">
                  {value.trim() || "Not provided"}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className="mt-6 rounded-xl bg-[#F7F0E3] p-5">
        <p className="text-sm leading-7 text-[#211A26]/80">
          We Buy Watches operates as a referral platform.
          Assessments, offers and purchases are handled by the
          participating dealer. Submitting an enquiry does not
          require you to accept an offer.
        </p>

        <label
          htmlFor="referral-consent"
          className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-7 text-[#211A26]"
        >
          <input
            id="referral-consent"
            name="referralConsent"
            type="checkbox"
            required
            checked={consent}
            onChange={(event) =>
              onConsentChange(event.target.checked)
            }
            className="mt-1 h-5 w-5 shrink-0 accent-[#30104B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
          />

          <span>
            I consent to We Buy Watches reviewing my enquiry and
            sharing my contact details, watch information and
            photographs with the participating dealer so they can
            assess my watch and contact me about a potential offer.
          </span>
        </label>
      </div>
    </fieldset>
  );
}