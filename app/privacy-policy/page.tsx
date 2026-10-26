import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Information about privacy and the proposed handling of watch enquiries by We Buy Watches.",
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  {
    id: "about",
    title: "1. About This Policy",
    paragraphs: [
      "We Buy Watches is an independent luxury-watch referral platform. Suitable enquiries may be introduced to a participating dealer, who handles watch assessments, offers and purchases.",
      "This page is a draft describing the intended handling of enquiry information. Online enquiry submission is not currently available. Selecting photographs in the form does not upload them, and continuing between steps does not send an enquiry.",
    ],
  },
  {
    id: "information",
    title: "2. Information Included in an Enquiry",
    paragraphs: [
      "When submission becomes available, an enquiry may include your name, email address, phone number, suburb, postcode, state or territory, preferred contact method and any additional notes you choose to provide.",
      "Watch information may include the brand, model, reference number, approximate year, condition, box and papers, service history, known faults, expected selling price, additional details and selected photographs.",
      "The intended enquiry record also includes the consent wording or version, consent timestamp and available lead-source or campaign information. Dealer feedback and purchase outcomes may be recorded where reported and permitted under the participating dealer agreement.",
    ],
  },
  {
    id: "purpose",
    title: "3. How Enquiry Information Is Intended to Be Used",
    paragraphs: [
      "Enquiry information is intended to help us review suitability, communicate about an enquiry and, with your consent, refer suitable enquiries to the participating dealer.",
      "Information may also be used to manage referral progress, record reported outcomes and administer referral payments under the applicable dealer agreement.",
      "Consent to a dealer referral is separate from marketing consent. If optional marketing is introduced, it will require a separate choice and will not be selected by default.",
    ],
  },
  {
    id: "sharing",
    title: "4. Sharing With the Participating Dealer",
    paragraphs: [
      "Before your contact details, watch information or photographs are shared with the participating dealer, the enquiry process will ask for your explicit consent.",
      "The dealer may use the referred information to contact you, request further details, arrange an assessment or discuss a potential offer. The dealer’s own handling of information should also be explained to you.",
      "The dealer identity, relevant privacy information and any service providers involved in handling enquiries must be confirmed before live submission is enabled.",
    ],
  },
  {
    id: "photographs",
    title: "5. Photographs and Sensitive Details",
    paragraphs: [
      "Photographs should show the watch and relevant accessories clearly. Keep identification documents, unrelated personal information and unique serial numbers out of your photographs.",
      "Only provide photographs you own or have permission to share. Do not submit passwords, payment-card details or other information unrelated to the watch enquiry.",
    ],
  },
  {
    id: "storage",
    title: "6. Storage, Security and Retention",
    paragraphs: [
      "The storage provider, access controls, hosting locations, retention periods and deletion process are still being finalised. This draft does not confirm that enquiry information is stored in Australia or that a particular security configuration is already operating.",
      "Before launch, this policy must explain the actual storage arrangements, relevant service providers, any overseas disclosures and how long enquiry information and photographs are retained.",
      "The intended system includes restricted access to seller information and photographs, with retention and deletion controls appropriate to the referral process.",
    ],
  },
  {
    id: "analytics",
    title: "7. Analytics and Cookies",
    paragraphs: [
      "Personal information, contact details and watch photographs must not be sent to analytics platforms.",
      "Any analytics services, cookies or similar technologies used by the live website must be identified in the final policy, together with their purpose and any relevant choices available to visitors.",
    ],
  },
  {
    id: "requests",
    title: "8. Privacy Requests and Contact Details",
    paragraphs: [
      "The final policy will provide a business contact for privacy questions, access or correction requests, deletion requests and complaints, together with an explanation of how those requests are handled.",
      "You may ask to withdraw consent to a future referral. If information has already been shared, withdrawal does not automatically remove copies held by the dealer; any request will need to consider the dealer’s handling of that information.",
      "The legal business name, privacy contact details and complaint-handling process have not yet been confirmed. These details must be added before live enquiry collection begins.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-nav, Arial), sans-serif",
      }}
    >
      <section
        aria-labelledby="privacy-heading"
        className="bg-[#30104B] px-5 py-14 text-[#F7F0E3] sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
            We Buy Watches
          </p>

          <h1
            id="privacy-heading"
            className="mt-4 text-3xl font-normal tracking-[-0.035em] sm:text-4xl"
            style={{ fontFamily: "inherit" }}
          >
            Privacy Policy
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#F7F0E3]/85">
            Understanding how information is intended to be handled
            throughout the enquiry and referral process.
          </p>
        </div>
      </section>

      <div className="bg-[#F7F0E3] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <aside
            aria-label="Draft policy notice"
            className="rounded-xl border border-[#C8A75E]/50 bg-white p-5"
          >
            <p className="text-sm font-semibold text-[#30104B]">
              Draft — pending business confirmation
            </p>

            <p className="mt-2 text-sm leading-7 text-[#211A26]/80">
              This policy is being prepared for launch. Business
              contact details and operational arrangements still
              need to be confirmed. Online enquiry submission is
              not available yet.
            </p>
          </aside>

          <article className="mt-8 space-y-6">
            {sections.map((section) => (
              <section
                key={section.id}
                aria-labelledby={`privacy-${section.id}`}
                className="rounded-2xl border border-[#30104B]/10 bg-white p-6 sm:p-8"
              >
                <h2
                  id={`privacy-${section.id}`}
                  className="text-lg font-medium leading-7 text-[#211A26] sm:text-xl"
                  style={{ fontFamily: "inherit" }}
                >
                  {section.title}
                </h2>

                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-[#211A26]/80"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <p className="mt-8 text-sm leading-7 text-[#211A26]/80">
            Read our{" "}
            <Link
              href="/terms"
              className="rounded font-medium text-[#30104B] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
            >
              Terms of Use
            </Link>{" "}
            for information about the referral service.
          </p>
        </div>
      </div>
    </div>
  );
}