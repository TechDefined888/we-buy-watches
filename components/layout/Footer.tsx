import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Sell Your Timepiece", href: "/sell-luxury-watches" },
  { label: "Our Process", href: "/how-it-works" },
  { label: "Watch Brands", href: "/brands" },
];

const brands = [
  { label: "Rolex", href: "/sell-rolex" },
  { label: "Patek Philippe", href: "/sell-patek-philippe" },
  { label: "Audemars Piguet", href: "/sell-audemars-piguet" },
  { label: "Richard Mille", href: "/sell-richard-mille" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111113",
        color: "#F7F0E3",
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
    >
      {/* Purple call to action */}
      <div
        style={{
          backgroundColor: "#261035",
          borderTop: "1px solid rgba(200, 167, 94, 0.3)",
          borderBottom: "1px solid rgba(200, 167, 94, 0.3)",
        }}
      >
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-6 py-10 sm:px-8 lg:flex-row lg:items-center lg:px-12">
          <div>
            <p
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.24em]"
              style={{ color: "#E1C17E" }}
            >
              Your next chapter starts here
            </p>

            <h2
              className="text-2xl sm:text-3xl"
              style={{
                margin: 0,
                color: "#F7F0E3",
                fontFamily: "var(--font-nav), Arial, sans-serif",
                fontWeight: 500,
                lineHeight: 1.35,
              }}
            >
              Considering selling your timepiece?
            </h2>

            <p
              className="mt-3 max-w-xl text-sm leading-7"
              style={{ color: "#C4B9CD" }}
            >
              Share your watch details to begin a referral to a
              participating dealer.
            </p>
          </div>

          <Link
            href="/sell-luxury-watches"
            className="group inline-flex min-h-[54px] items-center justify-center gap-5 rounded px-6 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1C17E]"
            style={{
              backgroundColor: "#E1C17E",
              color: "#19151C",
              flexShrink: 0,
            }}
          >
            Request a Private Valuation

            <span
              aria-hidden="true"
              className="text-xl transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="We Buy Watches home"
              className="inline-flex items-center gap-4 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1C17E]"
            >
              <Image
                src="/logo/we-buy-watches-logo.png"
                alt=""
                width={68}
                height={68}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />

              <span
                className="flex flex-col gap-2 pl-4"
                style={{
                  borderLeft: "1px solid rgba(200, 167, 94, 0.5)",
                }}
              >
                <span
                  className="text-sm font-semibold uppercase tracking-[0.1em] sm:text-base"
                  style={{ color: "#E1C17E" }}
                >
                  We Buy Watches
                </span>

                <span
                  className="text-[8px] uppercase tracking-[0.2em]"
                  style={{ color: "#C4B9CD" }}
                >
                  Luxury Watch Referrals
                </span>
              </span>
            </Link>

            <p
              className="mt-6 max-w-sm text-sm leading-7"
              style={{ color: "#AAA1B1" }}
            >
              Connecting owners of exceptional timepieces with
              participating dealers.
            </p>

            <p
              className="mt-5 text-[10px] uppercase leading-6 tracking-[0.18em]"
              style={{ color: "#C8A75E" }}
            >
              Exceptional timepieces.
              <br />
              Personal connections.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3
              className="mb-6 text-[11px] uppercase tracking-[0.2em]"
              style={{
                color: "#E1C17E",
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              Explore
            </h3>

            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded text-sm !text-[#C4B9CD] transition-colors hover:!text-[#E1C17E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1C17E]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Brands */}
          <nav aria-label="Featured watch brands">
            <h3
              className="mb-6 text-[11px] uppercase tracking-[0.2em]"
              style={{
                color: "#E1C17E",
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              Featured Brands
            </h3>

            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {brands.map((brand) => (
                <li key={brand.href}>
                  <Link
                    href={brand.href}
                    className="inline-block rounded text-sm !text-[#C4B9CD] transition-colors hover:!text-[#E1C17E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1C17E]"
                  >
                    {brand.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/brands"
              className="mt-6 inline-flex items-center gap-3 rounded text-[10px] font-medium uppercase tracking-[0.15em] !text-[#E1C17E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E1C17E]"
            >
              Explore All Brands
              <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>

        {/* Referral information */}
        <div
          className="py-6"
          style={{
            borderTop: "1px solid rgba(200, 167, 94, 0.18)",
          }}
        >
          <p
            className="m-0 max-w-4xl text-xs leading-6"
            style={{ color: "#AAA1B1" }}
          >
            We Buy Watches operates as a referral platform. Watch
            assessments, offers and purchases are handled by the
            participating dealer.
          </p>
        </div>

        {/* Copyright */}
        <div
          className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <p
            className="m-0 text-[11px] leading-6"
            style={{ color: "#AAA1B1" }}
          >
            © 2026 We Buy Watches. All rights reserved.
          </p>

          <p
            className="m-0 text-[10px] uppercase tracking-[0.15em]"
            style={{ color: "#C4B9CD" }}
          >
            Luxury Watch Referrals · Australia
          </p>
        </div>
      </div>
    </footer>
  );
}