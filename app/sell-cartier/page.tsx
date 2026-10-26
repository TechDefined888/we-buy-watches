import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { cartierContent } from "@/data/cartier";

export const metadata: Metadata = {
  title: "Sell Your Cartier Watch in Melbourne",
  description:
    "Looking to sell your Cartier watch in Melbourne? Share its model, condition and photographs for review and potential referral to a participating dealer.",
};

export default function SellCartierPage() {
  return (
    <BrandSellingPage
      brand="Cartier"
      introduction={cartierContent.introduction}
      overview={cartierContent.overview}
      preparation={cartierContent.preparation}
      faqs={cartierContent.faqs}
    />
  );
}