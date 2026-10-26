import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { aLangeSohneContent } from "@/data/a-lange-sohne";

export const metadata: Metadata = {
  title: "Sell Your A. Lange & Söhne in Australia",
  description:
    "Explore selling your A. Lange & Söhne in Australia. Share watch details, condition, photos and service records for review and potential dealer referral.",
};

export default function SellALangeSohnePage() {
  return (
    <BrandSellingPage
      brand="A. Lange & Söhne"
      introduction={aLangeSohneContent.introduction}
      overview={aLangeSohneContent.overview}
      preparation={aLangeSohneContent.preparation}
      faqs={aLangeSohneContent.faqs}
    />
  );
}