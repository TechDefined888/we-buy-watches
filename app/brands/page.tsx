import type { Metadata } from "next";

import BrandsCTA from "@/components/brands/BrandsCTA";
import BrandsGrid from "@/components/brands/BrandsGrid";
import BrandsHero from "@/components/brands/BrandsHero";

export const metadata: Metadata = {
  title: "Luxury Watch Brands to Sell in Australia",
  description:
    "Explore Rolex, Patek Philippe, Audemars Piguet and other luxury watch brands. Learn about selling your watch in Australia through our dealer referral platform.",
};

export default function BrandsPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
    >
      <BrandsHero />
      <BrandsGrid />
      <BrandsCTA />
    </div>
  );
}