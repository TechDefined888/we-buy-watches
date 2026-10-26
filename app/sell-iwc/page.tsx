import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { iwcContent } from "@/data/iwc";

export const metadata: Metadata = {
  title: "Sell Your IWC Watch in Australia",
  description:
    "Considering selling your IWC watch in Australia? Share its reference, condition, photos and service history for review and potential dealer referral.",
};

export default function SellIWCPage() {
  return (
    <BrandSellingPage
      brand="IWC"
      introduction={iwcContent.introduction}
      overview={iwcContent.overview}
      preparation={iwcContent.preparation}
      faqs={iwcContent.faqs}
    />
  );
}