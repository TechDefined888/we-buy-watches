import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { breitlingContent } from "@/data/breitling";

export const metadata: Metadata = {
  title: "Sell Your Breitling in Australia",
  description:
    "Considering selling a premium Breitling watch in Australia? Share details and photos for review and potential dealer referral. Selected models considered.",
};

export default function SellBreitlingPage() {
  return (
    <BrandSellingPage
      brand="Breitling"
      introduction={breitlingContent.introduction}
      overview={breitlingContent.overview}
      preparation={breitlingContent.preparation}
      faqs={breitlingContent.faqs}
    />
  );
}