import Link from "next/link";

export default function HowItWorksCTA() {
  return (
    <div className="bg-[#F7F0E3] px-5 pb-14 pt-12 text-center sm:px-6 sm:pb-20">
      <Link
        href="/sell-luxury-watches"
        className="inline-flex min-h-12 items-center justify-center gap-4 rounded-md bg-[#30104B] px-7 py-4 text-xs font-semibold text-white! transition-colors hover:bg-[#452064] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
      >
        Request a Private Valuation
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}