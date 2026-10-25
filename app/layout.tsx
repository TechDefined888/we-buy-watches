import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Montserrat,
} from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const navbarFont = Montserrat({
  variable: "--font-nav",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "We Buy Watches",
    template: "%s | We Buy Watches",
  },
  description:
    "A premium Australian luxury-watch referral platform for owners looking to sell desirable high-value watches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${navbarFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F7F0E3] text-[#211A26]">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}