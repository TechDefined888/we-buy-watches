import Image from "next/image";
import Link from "next/link";

export default function ValuationHero() {
  return (
    <section
      aria-labelledby="valuation-heading"
      className="relative isolate overflow-hidden bg-[#30104B] px-5 py-12 text-[#F7F0E3] sm:px-6 sm:py-16 lg:min-h-[560px] lg:py-16"
      style={{
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <Image
          src="/images/valuation/valuation-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Stronger overlay on smaller screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#240B36]/85 sm:bg-[#240B36]/70 lg:bg-transparent"
      />

      {/* Keep the centre readable while showing the watches */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(24,6,36,0.08) 0%, rgba(36,11,54,0.18) 24%, rgba(36,11,54,0.65) 36%, rgba(36,11,54,0.65) 64%, rgba(36,11,54,0.18) 76%, rgba(24,6,36,0.08) 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb">
          <ol className="m-0 flex list-none flex-wrap items-center gap-3 p-0 text-xs text-[#F7F0E3]/85">
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
              <span aria-current="page">
                Sell Your Timepiece
              </span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-12 max-w-xl text-center sm:mt-14 lg:mt-12 lg:max-w-[560px]">
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

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#F7F0E3]/90 sm:text-[15px]">
            Looking to sell a luxury watch in Australia? Share
            your watch details and photographs. Suitable
            enquiries are reviewed before referral to our
            participating dealer for assessment and a potential
            offer.
          </p>

          <p className="mt-5 text-xs leading-6 text-[#E1C17E]">
            No obligation to accept an offer.
          </p>
        </div>
      </div>
    </section>
  );
}