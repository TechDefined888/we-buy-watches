"use client";

import type { SellerDetails } from "@/types/valuation";

const states = [
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NSW", label: "New South Wales" },
  { value: "NT", label: "Northern Territory" },
  { value: "QLD", label: "Queensland" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "VIC", label: "Victoria" },
  { value: "WA", label: "Western Australia" },
];

const fieldClassName =
  "mt-2 block min-h-12 w-full rounded-lg border border-[#30104B]/20 bg-white px-4 py-3 text-sm text-[#211A26] transition-colors placeholder:text-[#756C7A] hover:border-[#30104B]/40 focus-visible:border-[#30104B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30104B]";

const labelClassName =
  "block text-sm font-medium text-[#211A26]";

const hintClassName =
  "mt-2 text-xs leading-5 text-[#211A26]/70";

type SellerDetailsStepProps = {
  value: SellerDetails;
  onChange: (value: SellerDetails) => void;
};

function getPhoneError(value: string): string {
  const phone = value.trim();

  if (!phone) {
    return "Please enter your phone number.";
  }

  // Allow a leading +, digits and common formatting characters.
  if (!/^\+?[0-9\s().-]+$/.test(phone)) {
    return "Use numbers, spaces, brackets or hyphens, with an optional leading +.";
  }

  const digits = phone.replace(/\D/g, "");

  if (digits.length < 8 || digits.length > 15) {
    return "Please enter a phone number containing 8 to 15 digits.";
  }

  return "";
}

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
        {/* Full name */}
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
            pattern={String.raw`.*\S.*`}
            title="Enter your name using at least one non-space character."
            maxLength={120}
            value={value.fullName}
            onChange={(event) =>
              updateField("fullName", event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        {/* Email */}
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
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={254}
            value={value.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        {/* Phone */}
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
            onChange={(event) => {
              const input = event.currentTarget;

              input.setCustomValidity(
                getPhoneError(input.value),
              );

              updateField("phone", input.value);
            }}
            onInvalid={(event) => {
              const input = event.currentTarget;

              input.setCustomValidity(
                getPhoneError(input.value),
              );
            }}
            onBlur={(event) => {
              const input = event.currentTarget;

              input.setCustomValidity(
                getPhoneError(input.value),
              );
            }}
            aria-describedby="seller-phone-hint"
            className={fieldClassName}
          />

          <p id="seller-phone-hint" className={hintClassName}>
            Enter 8–15 digits. Spaces, brackets and hyphens are
            accepted. Include your country code if outside Australia.
          </p>
        </div>

        {/* State or territory */}
        <div>
          <label
            htmlFor="seller-state"
            className={labelClassName}
          >
            State or territory <span aria-hidden="true">*</span>
          </label>

          <select
            id="seller-state"
            name="stateOrTerritory"
            autoComplete="address-level1"
            required
            value={value.stateOrTerritory ?? ""}
            onChange={(event) =>
              updateField(
                "stateOrTerritory",
                event.target.value as SellerDetails["stateOrTerritory"],
              )
            }
            className={fieldClassName}
          >
            <option value="">Select your state or territory</option>

            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        {/* Postcode */}
        <div>
          <label
            htmlFor="seller-postcode"
            className={labelClassName}
          >
            Australian postcode <span aria-hidden="true">*</span>
          </label>

          <input
            id="seller-postcode"
            name="postcode"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            pattern="[0-9]{4}"
            title="Enter a four-digit Australian postcode."
            minLength={4}
            maxLength={4}
            value={value.postcode}
            onChange={(event) =>
              updateField("postcode", event.target.value)
            }
            aria-describedby="seller-postcode-hint"
            className={fieldClassName}
          />

          <p id="seller-postcode-hint" className={hintClassName}>
            Enter your four-digit Australian postcode.
          </p>
        </div>

        {/* Suburb */}
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
            pattern={String.raw`.*\S.*`}
            title="Enter a suburb or town, or leave this field blank."
            maxLength={100}
            value={value.suburb}
            onChange={(event) =>
              updateField("suburb", event.target.value)
            }
            className={fieldClassName}
          />
        </div>

        {/* Contact preference */}
        <div>
          <label
            htmlFor="seller-contact-method"
            className={labelClassName}
          >
            Preferred contact method{" "}
            <span aria-hidden="true">*</span>
          </label>

          <select
            id="seller-contact-method"
            name="preferredContactMethod"
            required
            value={value.preferredContactMethod ?? ""}
            onChange={(event) =>
              updateField(
                "preferredContactMethod",
                event.target.value as SellerDetails["preferredContactMethod"],
              )
            }
            className={fieldClassName}
          >
            <option value="">Select a contact method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {/* Additional notes */}
        <div className="sm:col-span-2">
          <label
            htmlFor="seller-additional-notes"
            className={labelClassName}
          >
            Additional notes
          </label>

          <textarea
            id="seller-additional-notes"
            name="additionalNotes"
            rows={3}
            maxLength={2000}
            value={value.additionalNotes ?? ""}
            onChange={(event) =>
              updateField("additionalNotes", event.target.value)
            }
            placeholder="For example, a suitable time to contact you."
            aria-describedby="seller-additional-notes-hint"
            className={`${fieldClassName} resize-y`}
          />

          <p
            id="seller-additional-notes-hint"
            className={hintClassName}
          >
            Optional. Maximum 2,000 characters. Please do not
            include identification or payment details.
          </p>
        </div>
      </div>
    </fieldset>
  );
}