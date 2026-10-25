"use client";

import type { SellerDetails } from "@/types/valuation";

const fieldClassName =
  "mt-2 block min-h-12 w-full rounded-lg border border-[#30104B]/20 bg-white px-4 py-3 text-sm text-[#211A26] transition-colors placeholder:text-[#756C7A] hover:border-[#30104B]/40 focus-visible:border-[#30104B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30104B]";

const labelClassName =
  "block text-sm font-medium text-[#211A26]";

type SellerDetailsStepProps = {
  value: SellerDetails;
  onChange: (value: SellerDetails) => void;
};

export default function SellerDetailsStep({
  value,
  onChange,
}: SellerDetailsStepProps) {
  function updateField<K extends keyof SellerDetails>(
    field: K,
    nextValue: SellerDetails[K],
  ) {
    onChange({
      ...value,
      [field]: nextValue,
    });
  }

  return (
    <fieldset className="min-w-0">
      <legend className="text-xl font-medium tracking-[-0.02em] text-[#211A26] sm:text-2xl">
        Your Contact Details
      </legend>

      <p className="mt-3 text-sm leading-7 text-[#211A26]/75">
        Tell us how you can be contacted about your enquiry.
        Fields marked with an asterisk (*) are required.
      </p>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="seller-full-name"
            className={labelClassName}
          >
            Full name <span aria-hidden="true">*</span>
          </label>

          <input
            id="seller-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            pattern=".*\S.*"
            maxLength={120}
            value={value.fullName}
            onChange={(event) =>
              updateField("fullName", event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="seller-email"
            className={labelClassName}
          >
            Email address <span aria-hidden="true">*</span>
          </label>

          <input
            id="seller-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={value.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="seller-phone"
            className={labelClassName}
          >
            Phone number <span aria-hidden="true">*</span>
          </label>

          <input
            id="seller-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            minLength={8}
            maxLength={30}
            value={value.phone}
            onChange={(event) =>
              updateField("phone", event.target.value)
            }
            aria-describedby="seller-phone-hint"
            className={fieldClassName}
          />

          <p
            id="seller-phone-hint"
            className="mt-2 text-xs leading-5 text-[#211A26]/70"
          >
            Include your country code if outside Australia.
          </p>
        </div>

        <div>
          <label
            htmlFor="seller-suburb"
            className={labelClassName}
          >
            Suburb or town
          </label>

          <input
            id="seller-suburb"
            name="suburb"
            type="text"
            autoComplete="address-level2"
            maxLength={100}
            value={value.suburb}
            onChange={(event) =>
              updateField("suburb", event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="seller-postcode"
            className={labelClassName}
          >
            Australian postcode
          </label>

          <input
            id="seller-postcode"
            name="postcode"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            pattern="[0-9]{4}"
            maxLength={4}
            value={value.postcode}
            onChange={(event) =>
              updateField("postcode", event.target.value)
            }
            aria-describedby="seller-postcode-hint"
            className={fieldClassName}
          />

          <p
            id="seller-postcode-hint"
            className="mt-2 text-xs leading-5 text-[#211A26]/70"
          >
            Optional. Enter four digits if applicable.
          </p>
        </div>
      </div>
    </fieldset>
  );
}