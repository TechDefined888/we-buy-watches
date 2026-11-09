import { z } from "zod";

import {
  ALLOWED_PHOTO_TYPES,
  MAX_PHOTOS,
  MAX_PHOTO_SIZE_BYTES,
  REFERRAL_CONSENT_VERSION,
} from "@/lib/valuation/config";

// Optional text fields become empty strings when omitted.
function optionalText(maxLength: number) {
  return z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .transform((value) => value ?? "");
}

const yearSchema = z
  .string()
  .trim()
  .max(4)
  .refine(
    (value) =>
      value === "" ||
      (/^\d{4}$/.test(value) &&
        Number(value) >= 1800 &&
        Number(value) <= 2200),
    {
      message:
        "Enter a valid four-digit year or leave it blank.",
    },
  )
  .transform((value) =>
    value === "" ? null : Number(value),
  );

const expectedPriceSchema = z
  .string()
  .trim()
  .max(15)
  .optional()
  .refine(
    (value) =>
      !value ||
      /^\d{1,12}(?:\.\d{1,2})?$/.test(value),
    {
      message:
        "Enter a valid AUD price without commas or currency symbols, or leave it blank.",
    },
  )
  // Keep decimal amounts as strings for database insertion.
  .transform((value) => value || null);

export const watchInformationSchema = z
  .object({
    brand: z
      .string()
      .trim()
      .min(1, "Please select a watch brand.")
      .max(100),

    model: z
      .string()
      .trim()
      .min(1, "Please enter the watch model.")
      .max(200),

    referenceNumber: optionalText(100),

    year: yearSchema,

    condition: z.enum([
      "unworn",
      "excellent",
      "good",
      "fair",
      "needs-attention",
    ]),

    includedItems: z.enum([
      "box-and-papers",
      "box-only",
      "papers-only",
      "neither",
      "unsure",
    ]),

    serviceHistory: optionalText(3000),

    knownFaults: optionalText(3000),

    expectedPrice: expectedPriceSchema,

    additionalDetails: optionalText(5000),
  })
  .strict();

export const sellerDetailsSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Please enter your full name.")
      .max(150),

    email: z
      .string()
      .trim()
      .max(254)
      .email("Please enter a valid email address."),

    phone: z
      .string()
      .trim()
      .min(6, "Please enter a valid phone number.")
      .max(30)
      .regex(
        /^\+?[\d\s().-]+$/,
        "Please enter a valid phone number.",
      )
      .refine(
        (value) =>
          value.replace(/\D/g, "").length >= 6 &&
          value.replace(/\D/g, "").length <= 15,
        {
          message:
            "Please enter a phone number containing 6 to 15 digits.",
        },
      ),

    suburb: optionalText(150),

    postcode: z
      .string()
      .trim()
      .regex(
        /^\d{4}$/,
        "Please enter a four-digit Australian postcode.",
      ),

    stateOrTerritory: z.enum([
      "ACT",
      "NSW",
      "NT",
      "QLD",
      "SA",
      "TAS",
      "VIC",
      "WA",
    ]),

    preferredContactMethod: z.enum([
      "email",
      "phone",
    ]),

    additionalNotes: optionalText(5000),
  })
  .strict();

// These are declared file details.
// Actual uploaded bytes must be checked separately.
export const photoMetadataSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(255),

    size: z
      .number()
      .int()
      .positive("Empty files are not allowed.")
      .max(
        MAX_PHOTO_SIZE_BYTES,
        "Each photograph must be no more than 10 MB.",
      ),

    type: z.enum(ALLOWED_PHOTO_TYPES),
  })
  .strict();

export const enquirySubmissionSchema = z
  .object({
    submissionKey: z.string().uuid(),

    watch: watchInformationSchema,

    seller: sellerDetailsSchema,

    photos: z
      .array(photoMetadataSchema)
      .max(
        MAX_PHOTOS,
        "Please select no more than five photographs.",
      ),

    consent: z.literal(true),

    consentVersion: z.literal(
      REFERRAL_CONSENT_VERSION,
    ),

    // Store a page path, excluding query strings.
    landingPage: z
      .string()
      .trim()
      .max(500)
      .refine(
        (value) =>
          value.startsWith("/") &&
          !value.startsWith("//") &&
          !/[?#\r\n]/.test(value),
        {
          message: "Invalid landing page path.",
        },
      )
      .optional(),
  })
  .strict();

export type ValidatedWatchInformation = z.infer<
  typeof watchInformationSchema
>;

export type ValidatedSellerDetails = z.infer<
  typeof sellerDetailsSchema
>;

export type PhotoMetadata = z.infer<
  typeof photoMetadataSchema
>;

export type ValidatedEnquirySubmission = z.infer<
  typeof enquirySubmissionSchema
>;