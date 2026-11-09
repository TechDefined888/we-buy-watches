import Image from "next/image";
import Link from "next/link";

const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

const brands = [
  {
    name: "Rolex",
    href: "/sell-rolex",
    image: "/images/brands/rolex.png",
    logoSize: "max-w-[145px] h-[78px]",
    logoScale: 1.3,
  },
  {
    name: "Patek Philippe",
    href: "/sell-patek-philippe",
    image: "/images/brands/patek-philippe.png",
    logoSize: "max-w-[165px] h-[86px]",
    logoScale: 1.5,
  },
  {
    name: "Audemars Piguet",
    href: "/sell-audemars-piguet",
    image: "/images/brands/audemars-piguet.png",
    logoSize: "max-w-[160px] h-[84px]",
    logoScale: 1.5,
  },
  {
    name: "Richard Mille",
    href: "/sell-richard-mille",
    image: "/images/brands/richard-mille.png",
    logoSize: "max-w-[155px] h-[68px]",
    logoScale: 1.05,
  },
  {
    name: "Vacheron Constantin",
    href: "/sell-vacheron-constantin",
    image: "/images/brands/vacheron-constantin.png",
    logoSize: "max-w-[185px] h-[90px]",
    logoScale: 1.8,
  },
  {
    name: "A. Lange & Söhne",
    href: "/sell-a-lange-sohne",
    image: "/images/brands/a-lange-sohne.png",
    logoSize: "max-w-[200px] h-[94px]",
    logoScale: 1.7,
  },
  {
    name: "F.P. Journe",
    href: "/sell-fp-journe",
    image: "/images/brands/fp-journe.png",
    logoSize: "max-w-[185px] h-[88px]",
    logoScale: 1.55,
  },
  {
    name: "Breguet",
    href: "/sell-breguet",
    image: "/images/brands/breguet.png",
    logoSize: "max-w-[195px] h-[90px]",
    logoScale: 1.65,
  },
  {
    name: "Jaeger-LeCoultre",
    href: "/sell-jaeger-lecoultre",
    image: "/images/brands/jaeger-lecoultre.png",
    logoSize: "max-w-[200px] h-[94px]",
    logoScale: 1.85,
  },
  {
    name: "Cartier",
    href: "/sell-cartier",
    image: "/images/brands/cartier.png",
    logoSize: "max-w-[180px] h-[82px]",
    logoScale: 1.65,
  },
  {
    name: "IWC",
    href: "/sell-iwc",
    image: "/images/brands/iwc.png",
    logoSize: "max-w-[165px] h-[78px]",
    logoScale: 1.5,
  },
  {
    name: "Hublot",
    href: "/sell-hublot",
    image: "/images/brands/hublot.png",
    logoSize: "max-w-[145px] h-[72px]",
    logoScale: 1.3,
  },
];

export default function FeaturedBrands() {
  return (
    <section
      aria-labelledby="featured-brands-heading"
      className="relative overflow-hidden bg-[#F7F0E3] py-16 sm:py-18 lg:py-20"
      style={sectionFont}
    >
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 5%, rgba(200,167,94,0.08), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-medium uppercase leading-5 tracking-[0.3em] text-[#9A7A3B] sm:text-[11px]">
            Featured Brands
          </p>

          <h2
            id="featured-brands-heading"
            style={sectionFont}
            className="mt-4 text-3xl font-normal leading-[1.15] tracking-[-0.035em] text-[#211A26] sm:text-4xl lg:text-[44px]"
          >
            Iconic Brands. Exceptional Timepieces.
          </h2>

          <p className="mx-auto mt-5 max-w-[580px] text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#211A26]/70 sm:text-[14px]">
            We focus on desirable luxury and collectible watches from
            some of the world&apos;s most recognised watchmakers.
          </p>
        </div>

        {/* Brand cards */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              aria-label={`Explore ${brand.name}`}
              className="
                group relative flex h-[96px] min-w-0
                items-center justify-center overflow-hidden
                rounded-[10px] border border-[#30104B]/10
                bg-white/45 px-3
                shadow-[0_4px_14px_rgba(33,26,38,0.04)]
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:border-[#C8A75E]/80
                hover:bg-white/80
                hover:shadow-[0_8px_22px_rgba(33,26,38,0.08)]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#30104B]
                motion-reduce:transform-none
                motion-reduce:transition-none
                sm:h-[100px] sm:px-4 lg:h-[104px]
              "
            >
              {/* Hover glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  opacity-0 transition-opacity duration-300
                  group-hover:opacity-100
                  motion-reduce:transition-none
                "
                style={{
                  background:
                    "radial-gradient(circle at 25% 50%, rgba(200,167,94,0.10), transparent 55%)",
                }}
              />

              {/* Brand logo */}
              <div className="pointer-events-none relative flex h-full w-full min-w-0 items-center justify-center">
                <div
                  className={`
                    relative w-full
                    transition-transform duration-300
                    group-hover:scale-[1.03]
                    motion-reduce:transform-none
                    motion-reduce:transition-none
                    ${brand.logoSize}
                  `}
                >
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="(max-width: 639px) 60vw, 360px"
                    className="object-contain"
                    style={{
                      transform: `scale(${brand.logoScale})`,
                      transformOrigin: "center",
                    }}
                  />
                </div>
              </div>

              {/* Hover arrow */}
              <span
                aria-hidden="true"
                className="
                  absolute right-3 top-1/2 z-10
                  flex h-7 w-7
                  -translate-y-1/2 translate-x-2
                  items-center justify-center rounded-full
                  bg-[#C8A75E] text-xs text-[#211A26]
                  opacity-0
                  shadow-[0_4px_12px_rgba(200,167,94,0.25)]
                  transition-all duration-300
                  group-hover:translate-x-0
                  group-hover:opacity-100
                  group-focus-visible:translate-x-0
                  group-focus-visible:opacity-100
                  motion-reduce:transition-none
                "
              >
                →
              </span>

              {/* Bottom gold line */}
              <span
                aria-hidden="true"
                className="
                  absolute bottom-0 left-1/2
                  h-[2px] w-0 -translate-x-1/2
                  bg-[#C8A75E]
                  transition-all duration-300
                  group-hover:w-[55%]
                  group-focus-visible:w-[55%]
                  motion-reduce:transition-none
                "
              />
            </Link>
          ))}
        </div>

        {/* Explore all brands button */}
        <div className="mt-9 flex justify-center">
          <Link
            href="/brands"
            className="
              group inline-flex min-h-12
              items-center justify-center gap-5
              rounded-[6px] border-0
              bg-[#30104B]! px-6 py-3
              text-[14px] font-normal normal-case
              tracking-normal text-white!
              no-underline!
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
            Explore All Brands

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
          </Link>
        </div>
      </div>
    </section>
  );
}