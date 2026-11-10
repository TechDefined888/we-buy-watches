import Image from "next/image";
import Link from "next/link";

const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

export default function ClosingCTA() {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="overflow-hidden bg-[#F7F0E3] px-5 py-14 sm:px-6 sm:py-20 lg:py-24"
      style={sectionFont}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-[12px] bg-[#160D20]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <Image
              src="/images/closingcta-1.png"
              alt="Rose gold watch with a green dial gold WBW logo and brown leather strap against a deep purple background"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="translate-x-[80px] object-cover object-[85%_top] sm:translate-x-0 sm:object-[72%_center] lg:object-right"
            />

            <div
              className="absolute inset-0 sm:hidden"
              style={{
                background:
                  "linear-gradient(0deg, #160D20 0%, rgba(31,12,47,0.96) 22%, rgba(31,12,47,0.72) 38%, rgba(31,12,47,0.12) 56%, transparent 72%), linear-gradient(90deg, #160D20 0%, rgba(22,13,32,0.55) 19%, transparent 56%)",
              }}
            />

            <div
              className="absolute inset-0 hidden sm:block lg:hidden"
              style={{
                background:
                  "linear-gradient(90deg, rgba(22,13,32,0.96) 0%, rgba(22,13,32,0.88) 55%, rgba(22,13,32,0.65) 100%)",
              }}
            />

            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(90deg, #160D20 0%, rgba(22,13,32,0.98) 28%, rgba(22,13,32,0.85) 45%, rgba(22,13,32,0.25) 65%, rgba(22,13,32,0.05) 100%)",
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 0% 100%, rgba(70,25,98,0.35), transparent 65%)",
              }}
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 z-10 rounded-[6px] border border-[#C8A75E]/20 sm:inset-4"
          />

          <div className="relative z-20 flex min-h-[420px] flex-col justify-end px-6 pb-7 pt-36 sm:block sm:min-h-0 sm:px-12 sm:py-16 lg:min-h-[460px] lg:px-16 lg:py-20">
            <div className="max-w-[530px]">
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-6 shrink-0 bg-[#C8A75E] sm:w-8"
                />

                <p className="m-0 text-[8px] font-medium uppercase leading-4 tracking-[0.24em] text-[#E1C17E] sm:text-[10px] sm:leading-5 sm:tracking-[0.3em]">
                  A Considered Next Chapter
                </p>
              </div>

              <h2
                id="closing-cta-heading"
                style={sectionFont}
                className="mt-2 text-[clamp(20px,5.5vw,26px)] font-normal leading-[1.12] tracking-[-0.045em] text-[#F7F0E3] [text-shadow:0_2px_12px_rgba(36,10,55,0.95)] sm:mt-6 sm:text-[46px] sm:[text-shadow:none] lg:text-[52px]"
              >
                Exceptional watches.
                <span className="mt-1 block text-[#E1C17E] sm:mt-2">
                  New possibilities.
                </span>
              </h2>

              <p className="mt-2.5 max-w-[250px] text-[11px] font-normal leading-[1.65] text-[#F7F0E3]/90 [text-shadow:0_2px_8px_rgba(36,10,55,0.95)] sm:mt-6 sm:max-w-[380px] sm:text-sm sm:leading-[1.9] sm:text-[#F7F0E3]/75 sm:[text-shadow:none]">
                Ready to part with your timepiece? Start a private enquiry and
                explore your selling options.
              </p>

              <Link
                href="/sell-luxury-watches"
                className="
                  group mt-4 inline-flex min-h-11
                  w-fit max-w-full items-center justify-between gap-4
                  rounded-[3px] border border-[#C8A75E]
                  bg-[#C8A75E] px-4 py-2
                  text-[9px] font-semibold uppercase
                  tracking-[0.14em] text-[#211A26]!
                  transition-colors duration-200
                  hover:border-[#E1C17E] hover:bg-[#E1C17E]
                  focus-visible:outline-2 focus-visible:outline-offset-4
                  focus-visible:outline-[#E1C17E]
                  motion-reduce:transition-none
                  sm:mt-8 sm:min-h-[52px] sm:w-auto sm:min-w-[245px]
                  sm:gap-7 sm:px-6 sm:py-3 sm:text-[10px]
                "
              >
                <span>Submit Your Watch</span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="
                    h-4 w-4 shrink-0
                    transition-transform duration-200
                    group-hover:translate-x-1
                    group-focus-visible:translate-x-1
                    motion-reduce:transform-none
                    motion-reduce:transition-none
                    sm:h-5 sm:w-5
                  "
                >
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </Link>

              <div className="mt-2.5 flex items-center gap-2 text-[#F7F0E3]/75 sm:mt-5 sm:gap-2.5 sm:text-[#F7F0E3]/60">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 shrink-0"
                >
                  <circle cx="10" cy="10" r="7" />
                  <path d="m7 10 2 2 4-4" />
                </svg>

                <p className="m-0 text-[10px] leading-4 tracking-[0.02em] sm:text-[11px] sm:leading-6">
                  No obligation to accept an offer.
                </p>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 z-20 h-[2px] w-24 bg-[#C8A75E] sm:w-36"
          />
        </div>
      </div>
    </section>
  );
}