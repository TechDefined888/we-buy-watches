import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { audemarsPiguetContent } from "@/data/audemars-piguet";

export const metadata: Metadata = {
  title: "Sell Your Audemars Piguet in Melbourne",
  description:
    "Considering selling your Audemars Piguet in Melbourne? Share watch details, condition and photos for review and potential referral to a participating dealer.",
};

export default function SellAudemarsPiguetPage() {
  return (
    <BrandSellingPage
      brand="Audemars Piguet"
      introduction={audemarsPiguetContent.introduction}
      overview={audemarsPiguetContent.overview}
      preparation={audemarsPiguetContent.preparation}
      faqs={audemarsPiguetContent.faqs}
    />
  );
}