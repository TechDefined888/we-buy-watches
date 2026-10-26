import Link from "next/link";

export default function BrandsCTA() {
  return (
    <section
      aria-labelledby="brands-cta-heading"
      className="bg-[#30104B] px-5 py-14 text-center text-[#F7F0E3] sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
          Your Next Chapter
        </p>

        <h2
          id="brands-cta-heading"
          className="mt-4 text-2xl font-normal leading-tight tracking-[-0.025em] sm:text-3xl"
          style={{ fontFamily: "inherit" }}
        >
          Have a Timepiece to Discuss?
        </h2>

        <p className="mt-5 text-sm leading-7 text-[#F7F0E3]/80">
          Share your watch details for review. Suitable enquiries
          may be referred to our participating dealer to explore
          a potential offer, with no obligation to accept.
        </p>

        <Link
          href="/sell-luxury-watches"
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-4 rounded-md bg-[#E1C17E] px-7 py-4 text-xs font-semibold text-[#211A26]! transition-colors hover:bg-[#EBD09B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1C17E]"
        >
          Explore the Enquiry Form
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}