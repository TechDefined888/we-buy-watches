import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Draft terms explaining the We Buy Watches enquiry and dealer referral service.",
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  {
    id: "service",
    title: "1. Our Referral Service",
    paragraphs: [
      "We Buy Watches operates as an independent luxury-watch referral platform. We review enquiries for suitability and, with the seller’s consent, may introduce suitable enquiries to a participating dealer.",
      "We Buy Watches does not purchase, own, take possession of, authenticate or resell watches through this service. The participating dealer handles assessments, offers and any purchase.",
      "Online enquiry submission is not currently available. Completing the current form steps or selecting photographs does not send an enquiry.",
    ],
  },
  {
    id: "enquiry",
    title: "2. Preparing Your Enquiry",
    paragraphs: [
      "Provide information that is accurate to the best of your knowledge. Describe the watch’s condition, known faults, repairs, replacement parts and modifications honestly. Leave unknown details blank rather than guessing.",
      "Only enquire about a watch you own or are authorised to discuss on the owner’s behalf. Only share photographs and other material you have permission to provide.",
      "Do not include identification documents, unrelated personal information, payment-card details or unique serial numbers in the enquiry or photographs.",
    ],
  },
  {
    id: "referral",
    title: "3. Review and Referral",
    paragraphs: [
      "Not every watch or enquiry will qualify for referral. Suitability depends on the individual watch, the information supplied and the participating dealer’s interest.",
      "Your explicit consent is required before your contact details, watch information and photographs are shared with the participating dealer.",
      "A referral does not guarantee contact within a particular period, an assessment, an offer or a completed purchase.",
    ],
  },
  {
    id: "offers",
    title: "4. Assessments and Potential Offers",
    paragraphs: [
      "The website does not provide an instant valuation. Any expected selling price you enter represents your expectation and is not an agreed valuation or offer.",
      "The dealer may request additional information or an inspection before deciding whether to make an offer. The dealer independently determines any assessment and offer terms.",
      "Submitting an enquiry does not require you to accept an offer or sell your watch. You decide whether to proceed.",
    ],
  },
  {
    id: "arrangements",
    title: "5. Inspection, Delivery and Purchase Arrangements",
    paragraphs: [
      "Any inspection, delivery, collection, insurance, payment and purchase arrangements are agreed directly between you and the participating dealer.",
      "Do not send or hand over your watch based only on completing an enquiry. Confirm the dealer’s identity and the relevant arrangements before proceeding.",
      "Review any dealer terms and purchase agreement carefully before accepting an offer or transferring possession of your watch.",
    ],
  },
  {
    id: "fees",
    title: "6. Referral Fees and Commercial Disclosure",
    paragraphs: [
      "The proposed business model includes a referral fee payable by the participating dealer under a separate commercial agreement. The applicable fee structure and payment conditions are still being finalised.",
      "No fee percentage, fixed amount or seller charge is established by this draft. The final terms must clearly explain any relevant charges and referral arrangements before live enquiries are accepted.",
    ],
  },
  {
    id: "use",
    title: "7. Responsible Website Use",
    paragraphs: [
      "Do not use the website to submit misleading enquiries, impersonate another person, upload malicious files, send spam or attempt unauthorised access to systems or information.",
      "Brand names and logos identify the watches discussed. Their appearance does not imply that We Buy Watches is affiliated with, authorised by or endorsed by the watch manufacturers.",
    ],
  },
  {
    id: "privacy",
    title: "8. Privacy and Consent",
    paragraphs: [
      "The Privacy Policy explains the intended handling of enquiry information and identifies the operational details that still need confirmation before launch.",
      "Consent to a dealer referral does not automatically include consent to marketing. Any optional marketing choice must be separate.",
    ],
  },
  {
    id: "rights",
    title: "9. Your Consumer Rights",
    paragraphs: [
      "Nothing in these terms excludes, restricts or modifies any rights or remedies that cannot lawfully be excluded, restricted or modified under applicable Australian law, including the Australian Consumer Law.",
    ],
  },
  {
    id: "contact",
    title: "10. Business Details and Questions",
    paragraphs: [
      "The legal business name, business contact details and final commercial arrangements have not yet been confirmed for this draft.",
      "These details, together with any necessary revisions following review of the actual referral model, must be added before the live service begins accepting enquiries.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-nav, Arial), sans-serif",
      }}
    >
      <section
        aria-labelledby="terms-heading"
        className="bg-[#30104B] px-5 py-14 text-[#F7F0E3] sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
            We Buy Watches
          </p>

          <h1
            id="terms-heading"
            className="mt-4 text-3xl font-normal tracking-[-0.035em] sm:text-4xl"
            style={{ fontFamily: "inherit" }}
          >
            Terms of Use
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#F7F0E3]/85">
            Clear expectations for your enquiry, a potential
            referral and your decision to sell.
          </p>
        </div>
      </section>

      <div className="bg-[#F7F0E3] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <aside
            aria-label="Draft terms notice"
            className="rounded-xl border border-[#C8A75E]/50 bg-white p-5"
          >
            <p className="text-sm font-semibold text-[#30104B]">
              Draft — pending business confirmation
            </p>

            <p className="mt-2 text-sm leading-7 text-[#211A26]/80">
              These terms are being prepared for launch. Business
              details and commercial arrangements still need to
              be confirmed. Online enquiry submission is not
              available yet.
            </p>
          </aside>

          <article className="mt-8 space-y-6">
            {sections.map((section) => (
              <section
                key={section.id}
                aria-labelledby={`terms-${section.id}`}
                className="rounded-2xl border border-[#30104B]/10 bg-white p-6 sm:p-8"
              >
                <h2
                  id={`terms-${section.id}`}
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
              href="/privacy-policy"
              className="rounded font-medium text-[#30104B] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
            >
              Privacy Policy
            </Link>{" "}
            for information about enquiry data and consent.
          </p>
        </div>
      </div>
    </div>
  );
}