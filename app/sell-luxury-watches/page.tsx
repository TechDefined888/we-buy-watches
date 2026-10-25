import type { Metadata } from "next";

import ValuationHero from "@/components/valuation/ValuationHero";
import ValuationForm from "@/components/valuation/ValuationForm";

export const metadata: Metadata = {
  title: "Sell Your Luxury Watch in Melbourne",
  description:
    "Looking to sell a luxury watch in Melbourne? Submit your watch details for review and potential referral to a participating dealer. No obligation to accept an offer.",
};

export default function SellLuxuryWatchesPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
    >
      <ValuationHero />
      <ValuationForm />

      <section
        aria-labelledby="watch-enquiry-heading"
        className="bg-[#F7F0E3] px-5 py-14 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9A7A3B] sm:text-xs">
              Tell Us About Your Watch
            </p>

            <h2
              id="watch-enquiry-heading"
              className="mt-4 text-2xl font-normal leading-tight tracking-[-0.025em] text-[#211A26] sm:text-3xl"
              style={{ fontFamily: "inherit" }}
            >
              Begin Your Private Enquiry
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#211A26]/75">
              Have your watch brand, model and any available box
              or paperwork details ready, together with clear
              photographs of your timepiece.
            </p>
          </div>

          {/* The enquiry form will be added here next. */}
        </div>
      </section>
    </div>
  );
}