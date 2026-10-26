import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { omegaContent } from "@/data/omega";

export const metadata: Metadata = {
  title: "Sell Your Omega in Australia",
  description:
    "Considering selling a premium Omega watch in Australia? Submit details and photos for review and potential dealer referral. Selected models considered.",
};

export default function SellOmegaPage() {
  return (
    <BrandSellingPage
      brand="Omega"
      introduction={omegaContent.introduction}
      overview={omegaContent.overview}
      preparation={omegaContent.preparation}
      faqs={omegaContent.faqs}
    />
  );
}