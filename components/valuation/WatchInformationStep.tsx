"use client";

import type { WatchInformation } from "@/types/valuation";

const watchBrands = [
  "Rolex",
  "Patek Philippe",
  "Audemars Piguet",
  "Richard Mille",
  "Vacheron Constantin",
  "A. Lange & Söhne",
  "F.P. Journe",
  "Breguet",
  "Jaeger-LeCoultre",
  "Cartier",
  "IWC",
  "Hublot",
  "Other",
];

const fieldClassName =
  "mt-2 block min-h-12 w-full rounded-lg border border-[#30104B]/20 bg-white px-4 py-3 text-sm text-[#211A26] transition-colors placeholder:text-[#756C7A] hover:border-[#30104B]/40 focus-visible:border-[#30104B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30104B]";

const labelClassName =
  "block text-sm font-medium text-[#211A26]";

type WatchInformationStepProps = {
  value: WatchInformation;
  onChange: (value: WatchInformation) => void;
};

export default function WatchInformationStep({
  value,
  onChange,
}: WatchInformationStepProps) {
  function updateField<K extends keyof WatchInformation>(
    field: K,
    nextValue: WatchInformation[K],
  ) {
    onChange({
      ...value,
      [field]: nextValue,
    });
  }

  return (
    <fieldset className="min-w-0">
      <legend
        className="text-xl font-medium tracking-[-0.02em] text-[#211A26] sm:text-2xl"
      >
        Watch Information
      </legend>

      <p className="mt-3 text-sm leading-7 text-[#211A26]/75">
        Share what you know about your timepiece. Fields marked
        with an asterisk (*) are required.
      </p>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="watch-brand" className={labelClassName}>
            Watch brand <span aria-hidden="true">*</span>
          </label>

          <select
            id="watch-brand"
            name="brand"
            required
            value={value.brand}
            onChange={(event) =>
              updateField("brand", event.target.value)
            }
            className={fieldClassName}
          >
            <option value="">Select a brand</option>

            {watchBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="watch-model" className={labelClassName}>
            Model <span aria-hidden="true">*</span>
          </label>

          <input
            id="watch-model"
            name="model"
            type="text"
            required
            maxLength={120}
            value={value.model}
            onChange={(event) =>
              updateField("model", event.target.value)
            }
            placeholder="e.g. Submariner"
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="watch-reference"
            className={labelClassName}
          >
            Reference number
          </label>

          <input
            id="watch-reference"
            name="referenceNumber"
            type="text"
            maxLength={80}
            value={value.referenceNumber}
            onChange={(event) =>
              updateField("referenceNumber", event.target.value)
            }
            placeholder="e.g. 126610LN"
            aria-describedby="watch-reference-hint"
            className={fieldClassName}
          />

          <p
            id="watch-reference-hint"
            className="mt-2 text-xs leading-5 text-[#211A26]/70"
          >
            Optional. Please do not enter your watch&apos;s
            unique serial number.
          </p>
        </div>

        <div>
          <label htmlFor="watch-year" className={labelClassName}>
            Year
          </label>

          <input
            id="watch-year"
            name="year"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            value={value.year}
            onChange={(event) =>
              updateField("year", event.target.value)
            }
            placeholder="e.g. 2020"
            aria-describedby="watch-year-hint"
            className={fieldClassName}
          />

          <p
            id="watch-year-hint"
            className="mt-2 text-xs leading-5 text-[#211A26]/70"
          >
            Enter four digits, or leave blank if unknown.
          </p>
        </div>

        <div>
          <label
            htmlFor="watch-condition"
            className={labelClassName}
          >
            Condition <span aria-hidden="true">*</span>
          </label>

          <select
            id="watch-condition"
            name="condition"
            required
            value={value.condition}
            onChange={(event) =>
              updateField(
                "condition",
                event.target.value as WatchInformation["condition"],
              )
            }
            className={fieldClassName}
          >
            <option value="">Select condition</option>
            <option value="unworn">Unworn</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="needs-attention">
              Needs repair or attention
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="watch-included-items"
            className={labelClassName}
          >
            Box and papers <span aria-hidden="true">*</span>
          </label>

          <select
            id="watch-included-items"
            name="includedItems"
            required
            value={value.includedItems}
            onChange={(event) =>
              updateField(
                "includedItems",
                event.target
                  .value as WatchInformation["includedItems"],
              )
            }
            className={fieldClassName}
          >
            <option value="">Select an option</option>
            <option value="box-and-papers">Box and papers</option>
            <option value="box-only">Box only</option>
            <option value="papers-only">Papers only</option>
            <option value="neither">Neither</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="watch-additional-details"
            className={labelClassName}
          >
            Additional details
          </label>

          <textarea
            id="watch-additional-details"
            name="additionalDetails"
            rows={4}
            maxLength={2000}
            value={value.additionalDetails}
            onChange={(event) =>
              updateField("additionalDetails", event.target.value)
            }
            placeholder="Tell us about service history, wear or any modifications."
            aria-describedby="watch-additional-details-hint"
            className={`${fieldClassName} resize-y`}
          />

          <p
            id="watch-additional-details-hint"
            className="mt-2 text-xs leading-5 text-[#211A26]/70"
          >
            Optional. Maximum 2,000 characters.
          </p>
        </div>
      </div>
    </fieldset>
  );
}