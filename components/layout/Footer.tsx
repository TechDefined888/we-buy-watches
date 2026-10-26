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

const linkClassName =
  "inline-block rounded text-sm text-[#514758]! transition-colors hover:text-[#30104B]! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#FFFFFF",
        color: "#211A26",
        fontFamily: "var(--font-nav), Arial, sans-serif",
        borderTop: "1px solid rgba(48, 16, 75, 0.12)",
      }}
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div className="min-w-0">
            <Link
              href="/"
              aria-label="We Buy Watches home"
              className="inline-flex max-w-full items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B] sm:gap-4"
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
                className="flex min-w-0 flex-col gap-2 pl-3 sm:pl-4"
                style={{
                  borderLeft: "1px solid rgba(200, 167, 94, 0.5)",
                }}
              >
                <span
                  className="text-sm font-semibold uppercase tracking-[0.1em] sm:text-base"
                  style={{ color: "#30104B" }}
                >
                  We Buy Watches
                </span>

                <span
                  className="text-[8px] uppercase leading-5 tracking-[0.2em]"
                  style={{ color: "#514758" }}
                >
                  Luxury Watch Referrals
                </span>
              </span>
            </Link>

            <p
              className="mt-6 max-w-sm text-sm leading-7"
              style={{ color: "#514758" }}
            >
              Connecting owners of exceptional timepieces with
              participating dealers.
            </p>

            <p
              className="mt-5 text-[10px] uppercase leading-6 tracking-[0.18em]"
              style={{ color: "#795C27" }}
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
                color: "#30104B",
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
                    className={linkClassName}
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
                color: "#30104B",
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
                    className={linkClassName}
                  >
                    {brand.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/brands"
              className="mt-6 inline-flex items-center gap-3 rounded text-[10px] font-semibold uppercase tracking-[0.15em] text-[#30104B]! transition-colors hover:text-[#795C27]! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
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
            borderTop: "1px solid rgba(48, 16, 75, 0.12)",
          }}
        >
          <p
            className="m-0 max-w-4xl text-xs leading-6"
            style={{ color: "#514758" }}
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
            borderTop: "1px solid rgba(48, 16, 75, 0.1)",
          }}
        >
          <p
            className="m-0 text-[11px] leading-6"
            style={{ color: "#514758" }}
          >
            © 2026 We Buy Watches. All rights reserved.
          </p>

          <p
            className="m-0 text-[10px] uppercase leading-6 tracking-[0.15em]"
            style={{ color: "#514758" }}
          >
            Luxury Watch Referrals · Australia
          </p>
        </div>
      </div>
    </footer>
  );
}