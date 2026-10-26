import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { richardMilleContent } from "@/data/richard-mille";

export const metadata: Metadata = {
  title: "Sell Your Richard Mille in Australia",
  description:
    "Explore selling your Richard Mille in Australia. Share the reference, condition, photos and document details for review and potential dealer referral.",
};

export default function SellRichardMillePage() {
  return (
    <BrandSellingPage
      brand="Richard Mille"
      introduction={richardMilleContent.introduction}
      overview={richardMilleContent.overview}
      preparation={richardMilleContent.preparation}
      faqs={richardMilleContent.faqs}
    />
  );
}