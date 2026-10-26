import Link from "next/link";

export default function ValuationHero() {
  return (
    <section
      aria-labelledby="valuation-heading"
      className="relative overflow-hidden bg-[#30104B] px-5 py-14 text-[#F7F0E3] sm:px-6 sm:py-20"
      style={{
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
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
          <ol className="flex flex-wrap items-center gap-3 text-xs text-[#F7F0E3]/75">
            <li>
              <Link
                href="/"
                className="rounded transition-colors hover:text-[#E1C17E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1C17E]"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <span aria-current="page">Sell Your Timepiece</span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
            Luxury Watch Enquiries · Australia
          </p>

          <h1
            id="valuation-heading"
            className="mt-5 text-3xl font-normal leading-[1.2] tracking-[-0.035em] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "inherit" }}
          >
            Your Timepiece.
            <span className="mt-2 block text-[#E1C17E]">
              Its Next Chapter.
            </span>
          </h1>

          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-16 bg-[#C8A75E]"
          />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#F7F0E3]/80 sm:text-[15px]">
            Looking to sell a luxury watch in Australia? Share your
            watch details and photographs. Suitable enquiries are
            reviewed before referral to our participating dealer
            for assessment and a potential offer.
          </p>

          <p className="mt-5 text-xs leading-6 text-[#E1C17E]">
            No obligation to accept an offer.
          </p>
        </div>
      </div>
    </section>
  );
}