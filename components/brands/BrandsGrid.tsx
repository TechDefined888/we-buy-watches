"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    name: "Rolex",
    slug: "rolex",
    href: "/sell-rolex",
  },
  {
    name: "Patek Philippe",
    slug: "patek-philippe",
    href: "/sell-patek-philippe",
  },
  {
    name: "Audemars Piguet",
    slug: "audemars-piguet",
    href: "/sell-audemars-piguet",
  },
  {
    name: "Richard Mille",
    slug: "richard-mille",
    href: "/sell-richard-mille",
  },
  {
    name: "Vacheron Constantin",
    slug: "vacheron-constantin",
    href: "/sell-vacheron-constantin",
  },
  {
    name: "A. Lange & Söhne",
    slug: "a-lange-sohne",
    href: "/sell-a-lange-sohne",
  },
  {
    name: "F.P. Journe",
    slug: "fp-journe",
    href: "/sell-fp-journe",
  },
  {
    name: "Breguet",
    slug: "breguet",
    href: "/sell-breguet",
  },
  {
    name: "Jaeger-LeCoultre",
    slug: "jaeger-lecoultre",
    href: "/sell-jaeger-lecoultre",
  },
  {
    name: "Cartier",
    slug: "cartier",
    href: "/sell-cartier",
  },
  {
    name: "IWC",
    slug: "iwc",
    href: "/sell-iwc",
  },
  {
    name: "Hublot",
    slug: "hublot",
    href: "/sell-hublot",
  },
  {
    name: "Omega",
    slug: "omega",
    href: "/sell-omega",
  },
  {
    name: "Breitling",
    slug: "breitling",
    href: "/sell-breitling",
  },
];

type Brand = (typeof brands)[number];

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={brand.href}
      aria-label={`Explore selling your ${brand.name} watch`}
      className="
        group relative flex min-w-0 flex-col
        overflow-hidden rounded-xl
        border border-[#C8A75E]/45
        bg-[#1C1028]
        shadow-[0_5px_18px_rgba(33,26,38,0.06)]
        transition-[border-color,box-shadow] duration-300
        hover:border-[#C8A75E]
        hover:shadow-[0_10px_26px_rgba(48,16,75,0.14)]
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#30104B]
        motion-reduce:transition-none
      "
    >
      {/* Watch image */}
      <div
        className="relative aspect-[5/4] w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 75%, #493052 0%, #291535 48%, #160D20 100%)",
        }}
      >
        <Image
          src={`/images/brands/watches/${brand.slug}.png`}
          alt={`${brand.name} luxury wristwatch`}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 300px"
          className="
            object-contain p-3
            transition-transform duration-500
            group-hover:scale-[1.04]
            motion-reduce:transform-none
            motion-reduce:transition-none
            sm:p-4
          "
        />
      </div>

      {/* Brand name and link */}
      <div className="flex flex-1 flex-col items-center px-3 pb-5 pt-2 text-center sm:px-4">
        <h3
          className="
            m-0 flex min-h-10 items-center justify-center
            text-[10px] font-medium uppercase
            leading-5 tracking-[0.12em]
            sm:text-[11px] lg:text-[12px]
          "
          style={{
            fontFamily: "inherit",
            color: "#F7F0E3",
          }}
        >
          {brand.name}
        </h3>

        <span
          className="mt-1 inline-flex items-center gap-2 text-[11px] leading-5"
          style={{ color: "#E1C17E" }}
        >
          Explore brand

          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="
              transition-transform duration-300
              group-hover:translate-x-1
              group-focus-visible:translate-x-1
              motion-reduce:transform-none
            "
          >
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      {/* Gold hover line */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-0 left-1/2
          h-[2px] w-0 -translate-x-1/2
          bg-[#C8A75E]
          transition-[width] duration-300
          group-hover:w-1/2
          group-focus-visible:w-1/2
          motion-reduce:transition-none
        "
      />
    </Link>
  );
}

export default function BrandsGrid() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      aria-labelledby="featured-watchmakers-heading"
      className="bg-white px-5 py-14 sm:px-6 sm:py-16 lg:py-20"
      style={{
        fontFamily: "var(--font-nav, Arial), sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="h-px w-6 bg-[#C8A75E]/70 sm:w-10"
            />

            <p className="m-0 text-[9px] font-semibold uppercase leading-5 tracking-[0.24em] text-[#9A7A3B] sm:text-[11px]">
              Find Your Watchmaker
            </p>

            <span
              aria-hidden="true"
              className="h-px w-6 bg-[#C8A75E]/70 sm:w-10"
            />
          </div>

          <h2
            id="featured-watchmakers-heading"
            className="
              mb-0 mt-4 text-[27px] font-normal
              leading-[1.2] tracking-[-0.035em]
              text-[#30104B]
              sm:text-4xl lg:text-[40px]
            "
            style={{ fontFamily: "inherit" }}
          >
            Explore Our Featured Brands
          </h2>

          <p className="mx-auto mb-0 mt-4 max-w-2xl text-[13px] leading-7 text-[#211A26]/75 sm:text-sm">
            Discover your watchmaker and begin a private watch enquiry.
            Suitability depends on the individual watch, its condition
            and the participating dealer&apos;s interest.
          </p>
        </div>

        {/* Brand cards */}
        <div
          id="watch-brands-grid"
          className="
            mt-9 grid grid-cols-2 items-stretch gap-3
            sm:grid-cols-3 sm:gap-4
            lg:mt-10 lg:grid-cols-4 lg:gap-5
          "
        >
          {brands.map((brand, index) => (
            <div
              key={brand.slug}
              hidden={index >= 8 && !showAll}
              className={
                index >= 8 && !showAll
                  ? "hidden"
                  : "grid min-w-0"
              }
            >
              <BrandCard brand={brand} />
            </div>
          ))}
        </div>

        {/* Purple show more button */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="watch-brands-grid"
            onClick={() => setShowAll((previous) => !previous)}
            className="
              group inline-flex min-h-12 cursor-pointer
              items-center justify-center gap-5
              rounded-[6px] border-0
              bg-[#30104B]! px-6 py-3
              text-[14px] font-normal normal-case
              tracking-normal text-white!
              transition-colors duration-300
              hover:bg-[#421765]!
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#30104B]
              motion-reduce:transition-none
              sm:text-[15px]
            "
            style={{ fontFamily: "inherit" }}
          >
            {showAll ? "Show Less" : "Show More"}

            <span
              aria-hidden="true"
              className="
                text-xl leading-none
                transition-transform duration-300
                group-hover:translate-x-1
                motion-reduce:transform-none
              "
            >
              →
            </span>
          </button>
        </div>

        {/* Brand information */}
        <p className="mx-auto mb-0 mt-8 max-w-2xl text-center text-[11px] leading-6 text-[#211A26]/65">
          Brand names and logos identify the watches discussed. Their
          inclusion does not imply affiliation with or endorsement by
          the watch manufacturers.
        </p>
      </div>
    </section>
  );
}