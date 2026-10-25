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
  },
  {
    name: "Patek Philippe",
    href: "/sell-patek-philippe",
    image: "/images/brands/patek-philippe.png",
  },
  {
    name: "Audemars Piguet",
    href: "/sell-audemars-piguet",
    image: "/images/brands/audemars-piguet.png",
  },
  {
    name: "Richard Mille",
    href: "/sell-richard-mille",
    image: "/images/brands/richard-mille.png",
  },
  {
    name: "Vacheron Constantin",
    href: "/sell-vacheron-constantin",
    image: "/images/brands/vacheron-constantin.png",
  },
  {
    name: "A. Lange & Söhne",
    href: "/sell-a-lange-sohne",
    image: "/images/brands/a-lange-sohne.png",
  },
  {
    name: "F.P. Journe",
    href: "/sell-fp-journe",
    image: "/images/brands/fp-journe.png",
  },
  {
    name: "Breguet",
    href: "/sell-breguet",
    image: "/images/brands/breguet.png",
  },
  {
    name: "Jaeger-LeCoultre",
    href: "/sell-jaeger-lecoultre",
    image: "/images/brands/jaeger-lecoultre.png",
  },
  {
    name: "Cartier",
    href: "/sell-cartier",
    image: "/images/brands/cartier.png",
  },
  {
    name: "IWC",
    href: "/sell-iwc",
    image: "/images/brands/iwc.png",
  },
  {
    name: "Hublot",
    href: "/sell-hublot",
    image: "/images/brands/hublot.png",
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

      <div className="relative z-10 mx-auto max-w-7xl px-6">
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
                group relative flex h-[96px]
                items-center justify-center overflow-hidden
                rounded-[10px] border border-[#30104B]/10
                bg-white/45 px-4
                shadow-[0_4px_14px_rgba(33,26,38,0.04)]
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:border-[#C8A75E]/80
                hover:bg-white/80
                hover:shadow-[0_8px_22px_rgba(33,26,38,0.08)]
                sm:h-[100px] lg:h-[104px]
              "
            >
              {/* Hover glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  opacity-0 transition-opacity duration-300
                  group-hover:opacity-100
                "
                style={{
                  background:
                    "radial-gradient(circle at 25% 50%, rgba(200,167,94,0.10), transparent 55%)",
                }}
              />

              {/* Logo */}
              <div className="relative flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]">
                <Image
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  width={320}
                  height={160}
                  className="
                    max-h-[62px] w-auto max-w-[74%]
                    object-contain
                    sm:max-h-[66px] lg:max-h-[70px]
                  "
                />
              </div>

              {/* Hover arrow */}
              <span
                aria-hidden="true"
                className="
                  absolute right-3 top-1/2
                  flex h-7 w-7
                  -translate-y-1/2 translate-x-2
                  items-center justify-center rounded-full
                  bg-[#C8A75E] text-xs text-[#211A26]
                  opacity-0
                  shadow-[0_4px_12px_rgba(200,167,94,0.25)]
                  transition-all duration-300
                  group-hover:translate-x-0
                  group-hover:opacity-100
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
                "
              />
            </Link>
          ))}
        </div>

        {/* Explore all brands */}
        <div className="mt-9 text-center">
          <Link
            href="/brands"
            className="
              group inline-flex items-center
              text-[11px] font-semibold uppercase
              tracking-[0.16em] text-[#30104B]
              transition-colors duration-300
              hover:text-[#9A7A3B]
            "
          >
            Explore All Brands

            <span
              aria-hidden="true"
              className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <div className="mx-auto mt-2 h-px w-20 bg-[#C8A75E]" />
        </div>
      </div>
    </section>
  );
}