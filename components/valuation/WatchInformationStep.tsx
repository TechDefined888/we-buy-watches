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

const hintClassName =
  "mt-2 text-xs leading-5 text-[#211A26]/70";

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
      <legend className="text-xl font-medium tracking-[-0.02em] text-[#211A26] sm:text-2xl">
        Watch Information
      </legend>

      <p className="mt-3 text-sm leading-7 text-[#211A26]/75">
        Share what you know about your timepiece. Fields marked
        with an asterisk (*) are required.
      </p>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        {/* Brand */}
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

        {/* Model */}
        <div>
          <label htmlFor="watch-model" className={labelClassName}>
            Model <span aria-hidden="true">*</span>
          </label>

          <input
            id="watch-model"
            name="model"
            type="text"
            required
            pattern=".*\S.*"
            maxLength={120}
            value={value.model}
            onChange={(event) =>
              updateField("model", event.target.value)
            }
            placeholder="e.g. Submariner"
            aria-describedby="watch-model-hint"
            className={fieldClassName}
          />

          <p id="watch-model-hint" className={hintClassName}>
            If unknown, enter “Not sure”.
          </p>
        </div>

        {/* Reference */}
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

          <p id="watch-reference-hint" className={hintClassName}>
            Optional. Leave blank if unknown. Please do not enter
            your watch&apos;s unique serial number.
          </p>
        </div>

        {/* Approximate year */}
        <div>
          <label htmlFor="watch-year" className={labelClassName}>
            Approximate year
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

          <p id="watch-year-hint" className={hintClassName}>
            Optional. Enter four digits, or leave blank if unknown.
          </p>
        </div>

        {/* Condition */}
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

        {/* Original box and papers */}
        <div>
          <label
            htmlFor="watch-included-items"
            className={labelClassName}
          >
            Original box and papers{" "}
            <span aria-hidden="true">*</span>
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
            <option value="box-and-papers">
              Original box and papers
            </option>
            <option value="box-only">Original box only</option>
            <option value="papers-only">
              Original papers only
            </option>
            <option value="neither">Neither</option>
            <option value="unsure">Not sure</option>
          </select>
        </div>

        {/* Service history */}
        <div className="sm:col-span-2">
          <label
            htmlFor="watch-service-history"
            className={labelClassName}
          >
            Service history
          </label>

          <textarea
            id="watch-service-history"
            name="serviceHistory"
            rows={3}
            maxLength={2000}
            value={value.serviceHistory ?? ""}
            onChange={(event) =>
              updateField("serviceHistory", event.target.value)
            }
            placeholder="Include known service dates, repairs and available records."
            aria-describedby="watch-service-history-hint"
            className={`${fieldClassName} resize-y`}
          />

          <p
            id="watch-service-history-hint"
            className={hintClassName}
          >
            Optional. Leave blank if unknown. Maximum 2,000
            characters.
          </p>
        </div>

        {/* Damage or faults */}
        <div className="sm:col-span-2">
          <label
            htmlFor="watch-known-faults"
            className={labelClassName}
          >
            Known damage or faults
          </label>

          <textarea
            id="watch-known-faults"
            name="knownFaults"
            rows={3}
            maxLength={2000}
            value={value.knownFaults ?? ""}
            onChange={(event) =>
              updateField("knownFaults", event.target.value)
            }
            placeholder="Describe visible damage or known problems with operation."
            aria-describedby="watch-known-faults-hint"
            className={`${fieldClassName} resize-y`}
          />

          <p
            id="watch-known-faults-hint"
            className={hintClassName}
          >
            Enter any known issues, or state that none are known.
            Leave blank if unsure. Maximum 2,000 characters.
          </p>
        </div>

        {/* Expected price */}
        <div className="sm:col-span-2">
          <label
            htmlFor="watch-expected-price"
            className={labelClassName}
          >
            Expected selling price (AUD)
          </label>

          <input
            id="watch-expected-price"
            name="expectedPrice"
            type="text"
            inputMode="decimal"
            pattern="[0-9]+([.][0-9]{1,2})?"
            maxLength={15}
            value={value.expectedPrice ?? ""}
            onChange={(event) =>
              updateField("expectedPrice", event.target.value)
            }
            placeholder="e.g. 15000"
            aria-describedby="watch-expected-price-hint"
            className={fieldClassName}
          />

          <p
            id="watch-expected-price-hint"
            className={hintClassName}
          >
            Optional. Enter an amount without commas or currency
            symbols, or leave blank if unsure. This is your
            expectation, not a valuation or offer.
          </p>
        </div>

        {/* Additional details */}
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
            placeholder="Include any other relevant information about your watch."
            aria-describedby="watch-additional-details-hint"
            className={`${fieldClassName} resize-y`}
          />

          <p
            id="watch-additional-details-hint"
            className={hintClassName}
          >
            Optional. Maximum 2,000 characters.
          </p>
        </div>
      </div>
    </fieldset>
  );
}