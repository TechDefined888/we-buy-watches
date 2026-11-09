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

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
];

const blackText = {
  color: "#000000",
};

const headingStyle = {
  color: "#000000",
  fontFamily: "inherit",
  fontWeight: 700,
};

const headingClassName =
  "mb-5 text-[12px] uppercase leading-6 tracking-[0.14em]";

const linkClassName =
  "inline-block rounded text-sm text-black! underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        fontFamily: "var(--font-nav), Arial, sans-serif",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_0.9fr_1.35fr] lg:gap-x-10 lg:py-16 xl:gap-x-14">
          {/* Brand */}
          <div className="min-w-0">
            <div className="w-full max-w-[280px] text-center">
              <Link
                href="/"
                aria-label="We Buy Watches home"
                className="inline-flex max-w-full flex-col items-center rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <Image
                  src="/logo/we-buy-watches-logo.png"
                  alt=""
                  width={140}
                  height={140}
                  sizes="140px"
                  style={{
                    display: "block",
                    width: "140px",
                    height: "140px",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />

                <span
                  className="mt-3 block text-center text-[16px] uppercase leading-7 tracking-[0.12em] sm:text-[17px]"
                  style={headingStyle}
                >
                  We Buy Watches
                </span>

                <span
                  className="mt-1.5 block w-full text-center text-[9px] uppercase leading-5 tracking-[0.2em]"
                  style={blackText}
                >
                  Luxury Watch Referrals
                </span>
              </Link>

              <p
                className="mb-0 mt-6 text-sm leading-7"
                style={blackText}
              >
                Connecting owners of exceptional timepieces with
                participating dealers.
              </p>


            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className={headingClassName} style={headingStyle}>
              Explore
            </h3>

            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={linkClassName}
                    style={blackText}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Brands */}
          <nav aria-label="Featured watch brands">
            <h3 className={headingClassName} style={headingStyle}>
              Featured Brands
            </h3>

            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {brands.map((brand) => (
                <li key={brand.href}>
                  <Link
                    href={brand.href}
                    className={linkClassName}
                    style={blackText}
                  >
                    {brand.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/brands"
              style={headingStyle}
              className="group mt-6 inline-flex min-h-10 items-center gap-3 rounded text-[10px] uppercase tracking-[0.15em] text-black! underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              Explore All Brands

              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              >
                →
              </span>
            </Link>
          </nav>

          {/* Acknowledgement of Country */}
          <div className="min-w-0">
            <h3 className={headingClassName} style={headingStyle}>
              Acknowledgement of Country
            </h3>

            <p
              className="m-0 max-w-md text-[13px] leading-7"
              style={blackText}
            >
              We Buy Watches acknowledges the Traditional Custodians
              of Country throughout Australia and their continuing
              connection to land, waters and community. We pay our
              respects to Aboriginal and Torres Strait Islander
              peoples and to Elders past and present.
            </p>

            <div className="mt-5 flex items-center">
              <Image
                src="/images/flags/australia.png"
                alt="Australian flag"
                width={60}
                height={30}
                className="h-[30px] w-[60px] rounded-[3px] object-cover shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="flex flex-col gap-3 border-t border-black/10 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <p
            className="m-0 text-[11px] leading-6"
            style={blackText}
          >
            © 2026 We Buy Watches. All rights reserved.
          </p>

          <nav aria-label="Footer legal information">
            <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-1 p-0">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={blackText}
                    className="inline-flex min-h-11 items-center rounded text-[11px] leading-6 text-black! underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p
            className="m-0 text-[10px] uppercase leading-6 tracking-[0.15em]"
            style={blackText}
          >
            Luxury Watch Referrals · Australia
          </p>
        </div>
      </div>
    </footer>
  );
}