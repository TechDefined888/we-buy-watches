import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { patekPhilippeContent } from "@/data/patek-philippe";

export const metadata: Metadata = {
  title: "Sell Your Patek Philippe in Australia",
  description:
    "Looking to sell a Patek Philippe in Australia? Prepare watch details, photos and document information for review and potential referral to a participating dealer.",
};

export default function SellPatekPhilippePage() {
  return (
    <BrandSellingPage
      brand="Patek Philippe"
      introduction={patekPhilippeContent.introduction}
      overview={patekPhilippeContent.overview}
      preparation={patekPhilippeContent.preparation}
      faqs={patekPhilippeContent.faqs}
    />
  );
}