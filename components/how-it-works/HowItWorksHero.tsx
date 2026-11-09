import Image from "next/image";
import Link from "next/link";

export default function HowItWorksHero() {
  return (
    <section
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden bg-[#30104B] px-5 py-12 text-[#F7F0E3] sm:px-6 sm:py-16 lg:py-20"
      style={{ fontFamily: "var(--font-nav, Arial), sans-serif" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/images/process/process-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#30104B]/60 sm:bg-[#160B20]/40 lg:bg-[#160B20]/15" />

        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,7,23,0.25) 0%, transparent 40%, rgba(15,7,23,0.20) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb">
          <ol className="m-0 flex list-none flex-wrap items-center gap-3 p-0 text-xs text-[#F7F0E3]/80">
            <li>
              <Link
                href="/"
                className="rounded text-[#F7F0E3]/80! transition-colors hover:text-[#E1C17E]! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A75E]"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <span aria-current="page" className="text-[#F7F0E3]/80">
                Our Process
              </span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-12 max-w-3xl text-center sm:mt-14 lg:mt-16">
          <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
            Our Process
          </p>

          <h1
            id="process-heading"
            className="mb-0 mt-5 text-3xl font-normal leading-[1.2] tracking-[-0.035em] text-[#F7F0E3] sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: "inherit",
              textShadow: "0 2px 16px rgba(0,0,0,0.2)",
            }}
          >
            A Clear Path to
            <span className="mt-2 block text-[#E1C17E]">
              Your Next Chapter.
            </span>
          </h1>

          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-16 bg-[#C8A75E]"
          />

          <p className="mx-auto mb-0 mt-6 max-w-2xl text-sm leading-7 text-[#F7F0E3]/80 sm:text-[15px]">
            Considering selling a luxury watch in Australia? Understand how your
            enquiry is reviewed and how our participating dealer may help you
            explore a potential sale.
          </p>
        </div>
      </div>
    </section>
  );
}