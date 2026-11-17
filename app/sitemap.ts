import type { MetadataRoute } from "next";

const SITE_URL = "https://webuywatches.com.au";

const pages = [
  "/",
  "/brands",
  "/how-it-works",
  "/sell-luxury-watches",

  "/sell-a-lange-sohne",
  "/sell-audemars-piguet",
  "/sell-breguet",
  "/sell-breitling",
  "/sell-cartier",
  "/sell-fp-journe",
  "/sell-hublot",
  "/sell-iwc",
  "/sell-jaeger-lecoultre",
  "/sell-omega",
  "/sell-patek-philippe",
  "/sell-richard-mille",
  "/sell-rolex",
  "/sell-vacheron-constantin",

  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}