import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { fpJourneContent } from "@/data/fp-journe";

export const metadata: Metadata = {
  title: "Sell Your F.P. Journe in Melbourne",
  description:
    "Considering selling your F.P. Journe in Melbourne? Share watch details, photos and available records for review and potential referral to a participating dealer.",
};

export default function SellFPJournePage() {
  return (
    <BrandSellingPage
      brand="F.P. Journe"
      introduction={fpJourneContent.introduction}
      overview={fpJourneContent.overview}
      preparation={fpJourneContent.preparation}
      faqs={fpJourneContent.faqs}
    />
  );
}