import Image from "next/image";
import Link from "next/link";

const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

export default function ClosingCTA() {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="bg-[#F7F0E3] py-16 sm:py-20 lg:py-24"
      style={sectionFont}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[24px] bg-[#211A26] px-6 py-14 shadow-[0_20px_60px_rgba(33,26,38,0.15)] sm:rounded-[32px] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          {/* Background image */}
          <Image
            src="/images/closing-cta.png"
            alt="Gold Rolex Day-Date watch with a black dial against a dark purple background"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />

          {/* Dark overlay for readable text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(15,10,20,0.94) 0%, rgba(15,10,20,0.80) 45%, rgba(15,10,20,0.35) 100%)",
            }}
          />

          {/* Purple glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 0% 100%, rgba(48,16,75,0.55), transparent 65%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-3xl">
            <p className="text-[10px] font-medium uppercase leading-5 tracking-[0.3em] text-[#C8A75E] sm:text-[11px]">
              We Buy Watches
            </p>

            <h2
              id="closing-cta-heading"
              style={sectionFont}
              className="mt-5 max-w-[650px] text-3xl font-normal leading-[1.15] tracking-[-0.035em] text-[#F7F0E3] sm:text-4xl lg:text-[44px]"
            >
              Have a Desirable Timepiece to Sell?
            </h2>

            <p className="mt-6 max-w-xl text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#F7F0E3]/75 sm:text-[14px]">
              Start with a private enquiry and explore your selling
              options.
            </p>

            <Link
              href="/sell-luxury-watches"
              className="
                group mt-8 inline-flex min-h-[50px]
                items-center justify-center gap-5
                rounded-[4px] bg-[#C8A75E] px-7 py-4
                text-[10px] font-semibold uppercase
                tracking-[0.14em] text-[#211A26]!
                transition-colors duration-300
                hover:bg-[#D6B96F]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#C8A75E]
                sm:text-[11px]
              "
            >
              Submit Your Watch

              <span
                aria-hidden="true"
                className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}