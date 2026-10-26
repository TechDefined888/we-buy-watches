import { watchBrands } from "@/data/brands";

import BrandCard from "./BrandCard";

export default function BrandsGrid() {
  return (
    <section
      aria-labelledby="brands-grid-heading"
      className="bg-[#F7F0E3] px-5 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#795C27] sm:text-xs">
            Find Your Watchmaker
          </p>

          <h2
            id="brands-grid-heading"
            className="mt-4 text-2xl font-normal leading-tight tracking-[-0.025em] text-[#211A26] sm:text-3xl"
            style={{ fontFamily: "inherit" }}
          >
            Explore Our Featured Brands
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#211A26]/75">
            We focus on desirable luxury and collectible watches.
            Suitability depends on the individual watch, its
            condition and the participating dealer&apos;s interest.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {watchBrands.map((brand) => (
            <li key={brand.href} className="min-w-0">
              <BrandCard brand={brand} />
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-6 text-[#211A26]/70">
          Brand names and logos identify the watches discussed.
          Their inclusion does not imply affiliation with or
          endorsement by the watch manufacturers.
        </p>
      </div>
    </section>
  );
}