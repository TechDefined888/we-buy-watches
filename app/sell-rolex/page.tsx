import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { rolexContent } from "@/data/rolex";

export const metadata: Metadata = {
  title: "Sell Your Rolex in Melbourne",
  description:
    "Considering selling your Rolex in Melbourne? Share watch details and photos for review and potential dealer referral. No obligation to accept an offer.",
};

export default function SellRolexPage() {
  return (
    <BrandSellingPage
      brand="Rolex"
      introduction={rolexContent.introduction}
      overview={rolexContent.overview}
      preparation={rolexContent.preparation}
      faqs={rolexContent.faqs}
    />
  );
}