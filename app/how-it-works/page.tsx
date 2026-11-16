import type { Metadata } from "next";

import HowItWorksCTA from "@/components/how-it-works/HowItWorksCTA";
import HowItWorksHero from "@/components/how-it-works/HowItWorksHero";
import ProcessFAQ from "@/components/how-it-works/ProcessFAQ";
import ProcessSteps from "@/components/how-it-works/ProcessSteps";
import SellerDecision from "@/components/how-it-works/SellerDecision";

export const metadata: Metadata = {
  title: "How Selling Your Luxury Watch Works",
  description:
    "Discover our private watch concierge process in Australia, from submitting your watch details to personal consultation, inspection arrangements and selling opportunities.",
};

export default function HowItWorksPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
    >
      <HowItWorksHero />
      <ProcessSteps />
      <SellerDecision />
      <ProcessFAQ />
      <HowItWorksCTA />
    </div>
  );
}