export const MAX_PHOTOS = 5;

export const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;

export const PHOTO_BUCKET = "watch-enquiry-photos";

export const ALLOWED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export const PHOTO_INPUT_ACCEPT = [
  ...ALLOWED_PHOTO_TYPES,
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".heif",
].join(",");

export const REFERRAL_CONSENT_VERSION = "2026-11-08-v1";

export const REFERRAL_CONSENT_TEXT =
  "I consent to We Buy Watches reviewing my enquiry and sharing my contact details, watch information and photographs with the participating dealer so they can assess my watch and contact me about a potential offer.";

export const ENQUIRY_SUCCESS_MESSAGE =
  "Thank you. Your enquiry has been received and will be reviewed before being referred to our participating watch buyer where appropriate.";