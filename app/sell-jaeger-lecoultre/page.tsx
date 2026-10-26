import type { Metadata } from "next";

import BrandSellingPage from "@/components/brands/BrandSellingPage";
import { jaegerLecoultreContent } from "@/data/jaeger-lecoultre";

export const metadata: Metadata = {
  title: "Sell Your Jaeger-LeCoultre in Melbourne",
  description:
    "Considering selling your Jaeger-LeCoultre in Melbourne? Share watch details, condition and photos for review and potential referral to a participating dealer.",
};

export default function SellJaegerLecoultrePage() {
  return (
    <BrandSellingPage
      brand="Jaeger-LeCoultre"
      introduction={jaegerLecoultreContent.introduction}
      overview={jaegerLecoultreContent.overview}
      preparation={jaegerLecoultreContent.preparation}
      faqs={jaegerLecoultreContent.faqs}
    />
  );
}