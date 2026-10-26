import Link from "next/link";

export default function BrandsHero() {
  return (
    <section
      aria-labelledby="brands-page-heading"
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
                className="rounded hover:text-[#E1C17E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1C17E]"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <span aria-current="page">Watch Brands</span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
            Exceptional Watchmakers
          </p>

          <h1
            id="brands-page-heading"
            className="mt-5 text-3xl font-normal leading-[1.2] tracking-[-0.035em] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "inherit" }}
          >
            Iconic Brands.
            <span className="mt-2 block text-[#E1C17E]">
              Exceptional Timepieces.
            </span>
          </h1>

          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-16 bg-[#C8A75E]"
          />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#F7F0E3]/80 sm:text-[15px]">
            Explore the luxury watch brands we focus on. If you
            are considering selling a timepiece in Australia,
            discover your brand and learn how our referral
            process works.
          </p>
        </div>
      </div>
    </section>
  );
}