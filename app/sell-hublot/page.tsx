import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { hublotContent } from "@/data/hublot";

export const metadata: Metadata = {
  title: "Sell Your Hublot in Melbourne",
  description:
    "Looking to sell your Hublot in Melbourne? Share its reference, condition, photographs and available records for review and potential dealer referral.",
};

export default function SellHublotPage() {
  return (
    <BrandSellingPage
      brand="Hublot"
      introduction={hublotContent.introduction}
      overview={hublotContent.overview}
      preparation={hublotContent.preparation}
      faqs={hublotContent.faqs}
    />
  );
}