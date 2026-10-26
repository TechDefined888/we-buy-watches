import Link from "next/link";

type BrandSellingPageProps = {
  brand: string;
  introduction: string;
  overview: string;
  preparation: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

const headingStyle = {
  fontFamily: "inherit",
};

const focusClassName =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A75E]";

export default function BrandSellingPage({
  brand,
  introduction,
  overview,
  preparation,
  faqs,
}: BrandSellingPageProps) {
  return (
    <div
      style={{
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
    >
      {/* Hero */}
      <section
        aria-labelledby="brand-selling-heading"
        className="relative overflow-hidden bg-[#30104B] px-5 py-14 text-[#F7F0E3] sm:px-6 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(200,167,94,0.12), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-3 text-xs text-[#F7F0E3]/80">
              <li>
                <Link
                  href="/"
                  className={`rounded hover:text-[#E1C17E] ${focusClassName}`}
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true">/</li>

              <li>
                <Link
                  href="/brands"
                  className={`rounded hover:text-[#E1C17E] ${focusClassName}`}
                >
                  Watch Brands
                </Link>
              </li>

              <li aria-hidden="true">/</li>

              <li>
                <span aria-current="page">Sell {brand}</span>
              </li>
            </ol>
          </nav>

          <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
              Luxury Watch Referrals
            </p>

            <h1
              id="brand-selling-heading"
              style={headingStyle}
              className="mt-5 text-3xl font-normal leading-[1.2] tracking-[-0.035em] sm:text-4xl lg:text-5xl"
            >
              Sell Your {brand}
              <span className="mt-2 block text-[#E1C17E]">
                in Australia
              </span>
            </h1>

            <div
              aria-hidden="true"
              className="mx-auto mt-6 h-px w-16 bg-[#C8A75E]"
            />

            <p className="mt-6 text-sm leading-7 text-[#F7F0E3]/85 sm:text-[15px]">
              {introduction}
            </p>

            <p className="mt-4 text-xs leading-6 text-[#F7F0E3]/80">
              Enquiries are welcome from across Australia, subject
              to the participating dealer&apos;s ability to handle
              the transaction. Confirm any inspection, delivery
              and purchase arrangements directly with the dealer.
            </p>

            <Link
              href="/sell-luxury-watches"
              className={`mt-8 inline-flex min-h-12 items-center justify-center gap-4 rounded-md bg-[#E1C17E] px-7 py-4 text-xs font-semibold text-[#211A26]! transition-colors hover:bg-[#EBD09B] ${focusClassName}`}
            >
              Explore the Enquiry Form
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand overview */}
      <section
        aria-labelledby="brand-overview-heading"
        className="bg-[#F7F0E3] px-5 py-14 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#795C27] sm:text-xs">
            An Informed Starting Point
          </p>

          <h2
            id="brand-overview-heading"
            style={headingStyle}
            className="mt-4 text-2xl font-normal leading-tight text-[#211A26] sm:text-3xl"
          >
            Considering Selling Your {brand}?
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#211A26]/80">
            {overview}
          </p>
        </div>
      </section>

      {/* Enquiry preparation */}
      <section
        aria-labelledby="brand-preparation-heading"
        className="bg-white px-5 py-14 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#795C27] sm:text-xs">
              Prepare Your Enquiry
            </p>

            <h2
              id="brand-preparation-heading"
              style={headingStyle}
              className="mt-4 text-2xl font-normal leading-tight text-[#211A26] sm:text-3xl"
            >
              The Details That Help
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#211A26]/75">
              Share accurate information so the participating
              dealer can decide whether to assess your watch
              further.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {preparation.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-[#30104B]/10 bg-[#F7F0E3]/60 p-6 sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="h-px w-10 bg-[#C8A75E]"
                />

                <h3
                  style={headingStyle}
                  className="mt-5 text-lg font-medium text-[#211A26]"
                >
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#211A26]/75">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Referral process */}
      <section
        aria-labelledby="brand-process-heading"
        className="bg-[#30104B] px-5 py-14 text-[#F7F0E3] sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="brand-process-heading"
            style={headingStyle}
            className="text-2xl font-normal sm:text-3xl"
          >
            From Enquiry to a Potential Offer
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#F7F0E3]/85">
            Share your watch details, photographs and contact
            information. We review your enquiry and, with your
            consent, refer suitable enquiries to our participating
            dealer. The dealer may request further information
            or an inspection before deciding whether to make
            an offer.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#F7F0E3]/85">
            Assessments, offers and purchases are handled by the
            dealer. You are under no obligation to accept an offer.
          </p>

          <Link
            href="/how-it-works"
            className={`mt-6 inline-flex min-h-11 items-center gap-3 rounded text-sm text-[#E1C17E]! underline underline-offset-4 ${focusClassName}`}
          >
            Read about our process
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Brand questions */}
      <section
        aria-labelledby="brand-faq-heading"
        className="bg-[#F7F0E3] px-5 py-14 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="brand-faq-heading"
            style={headingStyle}
            className="text-center text-2xl font-normal text-[#211A26] sm:text-3xl"
          >
            Selling Your {brand}: Common Questions
          </h2>

          <div className="mt-9 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="rounded-xl border border-[#30104B]/15 bg-white"
              >
                <summary
                  className={`cursor-pointer rounded-xl px-5 py-5 text-sm font-medium leading-6 text-[#211A26] ${focusClassName}`}
                >
                  {item.question}
                </summary>

                <p className="px-5 pb-5 text-sm leading-7 text-[#211A26]/80">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/sell-luxury-watches"
              className={`inline-flex min-h-12 items-center justify-center gap-4 rounded-md bg-[#30104B] px-7 py-4 text-xs font-semibold text-white! transition-colors hover:bg-[#452064] ${focusClassName}`}
            >
              Explore the Enquiry Form
              <span aria-hidden="true">→</span>
            </Link>

            <p className="mt-7 text-xs leading-6 text-[#211A26]/70">
              We Buy Watches is an independent referral platform.
              References to {brand} do not imply affiliation with
              or endorsement by the manufacturer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}