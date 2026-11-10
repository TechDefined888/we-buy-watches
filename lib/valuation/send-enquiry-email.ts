import "server-only";

import type { ValidatedEnquirySubmission } from "@/lib/valuation/schema";

type EnquiryEmailInput = {
  enquiryId: string;
  submittedAt: string;
  submission: ValidatedEnquirySubmission;
};

export async function sendEnquiryEmail({
  enquiryId,
  submittedAt,
  submission,
}: EnquiryEmailInput): Promise<boolean> {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.ENQUIRY_EMAIL_FROM?.trim();
    const to = process.env.ENQUIRY_EMAIL_TO?.trim();

    if (!apiKey || !from || !to) {
      console.error("Enquiry email configuration is missing.", {
        enquiryId,
      });
      return false;
    }

    const date = new Date(submittedAt);

    const formattedDate = Number.isNaN(date.getTime())
      ? "Unavailable"
      : new Intl.DateTimeFormat("en-AU", {
          dateStyle: "medium",
          timeStyle: "long",
          timeZone: "Australia/Sydney",
        }).format(date);

    // Keep user-entered values on one line in this plain-text email.
    const oneLine = (value: string) =>
      value.replace(/[\r\n]+/g, " ").trim();

    const text = [
      "New We Buy Watches enquiry",
      "",
      `Enquiry reference: ${enquiryId}`,
      `Submission consent recorded: ${formattedDate}`,
      "",
      "Seller details",
      `Name: ${oneLine(submission.seller.fullName)}`,
      `Email: ${oneLine(submission.seller.email)}`,
      `Phone: ${oneLine(submission.seller.phone)}`,
      "",
      "Watch details",
      `Brand: ${oneLine(submission.watch.brand)}`,
      `Model: ${oneLine(submission.watch.model)}`,
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `enquiry-notification/${enquiryId}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.seller.email,
        subject: `New watch enquiry — ${enquiryId}`,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      // Do not log the response body or seller contact details.
      console.error("Enquiry notification was not accepted.", {
        enquiryId,
        status: response.status,
      });
      return false;
    }

    console.info("Enquiry notification accepted by Resend.", {
      enquiryId,
    });

    return true;
  } catch {
    // Email errors must not turn a saved enquiry into a failed submission.
    console.error("Enquiry notification request failed.", {
      enquiryId,
    });
    return false;
  }
}