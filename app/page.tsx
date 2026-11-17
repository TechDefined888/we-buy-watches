import Hero from "@/components/home/Hero";
import TrustTicker from "@/components/home/TrustTicker";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import HowItWorksPreview from "@/components/home/HowItWorksPreview";
import TrustSection from "@/components/home/TrustSection";
import ClosingCTA from "@/components/home/ClosingCTA";
import type { Metadata } from "next";


export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <TrustTicker />

      <FeaturedBrands />

      <HowItWorksPreview />

      <TrustSection />

      <ClosingCTA />
    </>
  );
}