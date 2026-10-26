import Image from "next/image";
import Link from "next/link";

import type { WatchBrand } from "@/data/brands";

type BrandCardProps = {
  brand: WatchBrand;
};

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={brand.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#30104B]/10 bg-white shadow-[0_4px_16px_rgba(33,26,38,0.03)] transition-colors hover:border-[#C8A75E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
    >
      <div className="flex min-h-[130px] items-center justify-center px-6 py-7 sm:min-h-[150px]">
        <Image
          src={brand.image}
          alt=""
          width={320}
          height={160}
          sizes="(max-width: 639px) 140px, 200px"
          className="h-auto max-h-[70px] w-auto max-w-full object-contain"
        />
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#30104B]/10 px-4 py-4 sm:px-5">
        <span className="text-xs font-medium leading-5 text-[#211A26] sm:text-sm">
          Sell your {brand.name}
        </span>

        <span
          aria-hidden="true"
          className="shrink-0 text-[#795C27] transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
        >
          →
        </span>
      </div>
    </Link>
  );
}