import Image from "next/image";

const brands = [
  {
    name: "Rolex",
    logo: "/images/brand/rolex.png",
  },
  {
    name: "Patek Philippe",
    logo: "/images/brand/patek-philippe.png",
  },
  {
    name: "Audemars Piguet",
    logo: "/images/brand/audemars-piguet.png",
  },
  {
    name: "Omega",
    logo: "/images/brand/omega.png",
  },
  {
    name: "Cartier",
    logo: "/images/brand/cartier.png",
  },
  {
    name: "Richard Mille",
    logo: "/images/brand/richard-mille.png",
  },
  {
    name: "Tudor",
    logo: "/images/brand/tudor.png",
  },
];

function BrandGroup({
  duplicate = false,
}: {
  duplicate?: boolean;
}) {
  return (
    <div
      className="wbw-brand-group"
      aria-hidden={duplicate ? true : undefined}
    >
      {brands.map((brand) => (
        <div key={brand.name} className="wbw-brand-item">
          <div
            className="wbw-brand-image"
            style={{
              position: "relative",
              width: "100%",
              height: "48px",
              overflow: "hidden",
            }}
          >
            <Image
              src={brand.logo}
              alt={duplicate ? "" : `${brand.name} logo`}
              fill
              sizes="(max-width: 639px) 122px, (max-width: 767px) 162px, 186px"
              className="wbw-brand-logo"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <span
            className="wbw-brand-divider"
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}

export default function BrandSection() {
  return (
    <section
      id="brands"
      aria-label="Luxury watch brands"
      className="wbw-brands-section"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="wbw-brand-marquee">
        <BrandGroup />
        <BrandGroup duplicate />
      </div>
    </section>
  );
}