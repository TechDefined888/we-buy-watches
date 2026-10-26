import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { vacheronConstantinContent } from "@/data/vacheron-constantin";

export const metadata: Metadata = {
  title: "Sell Your Vacheron Constantin in Melbourne",
  description:
    "Considering selling your Vacheron Constantin in Melbourne? Share watch details, photos and service information for review and potential dealer referral.",
};

export default function SellVacheronConstantinPage() {
  return (
    <BrandSellingPage
      brand="Vacheron Constantin"
      introduction={vacheronConstantinContent.introduction}
      overview={vacheronConstantinContent.overview}
      preparation={vacheronConstantinContent.preparation}
      faqs={vacheronConstantinContent.faqs}
    />
  );
}