import type { Metadata } from "next";

import ValuationHero from "@/components/valuation/ValuationHero";
import ValuationIntro from "@/components/valuation/ValuationIntro";
import ValuationForm from "@/components/valuation/ValuationForm";

export const metadata: Metadata = {
  title: "Sell Your Luxury Watch in Australia",
  description:
    "Looking to sell a luxury watch in Australia? Submit your watch details for review and potential referral to a participating dealer. No obligation to accept an offer.",
};

export default function SellLuxuryWatchesPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
    >
      <ValuationHero />
      <ValuationIntro />
      <ValuationForm />
    </div>
  );
}