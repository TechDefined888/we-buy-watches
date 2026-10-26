import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { breguetContent } from "@/data/breguet";

export const metadata: Metadata = {
  title: "Sell Your Breguet in Melbourne",
  description:
    "Looking to sell your Breguet in Melbourne? Share watch details, condition, photographs and service records for review and potential dealer referral.",
};

export default function SellBreguetPage() {
  return (
    <BrandSellingPage
      brand="Breguet"
      introduction={breguetContent.introduction}
      overview={breguetContent.overview}
      preparation={breguetContent.preparation}
      faqs={breguetContent.faqs}
    />
  );
}