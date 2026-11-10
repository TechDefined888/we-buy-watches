import Image from "next/image";

const brands = [
  { name: "Rolex", logo: "/images/brands/rolex.png", width: 70, height: 70 },
  { name: "Patek Philippe", logo: "/images/brands/patek-philippe.png", width: 82, height: 82 },
  { name: "Audemars Piguet", logo: "/images/brands/audemars-piguet.png", width: 83, height: 83 },
  { name: "Cartier", logo: "/images/brands/cartier.png", width: 92, height: 92 },
  { name: "Richard Mille", logo: "/images/brands/richard-mille.png", width: 144, height: 72 },
  { name: "Vacheron Constantin", logo: "/images/brands/vacheron-constantin.png", width: 102, height: 102 },
  { name: "A. Lange & Söhne", logo: "/images/brands/a-lange-sohne.png", width: 114, height: 114 },
  { name: "F.P. Journe", logo: "/images/brands/fp-journe.png", width: 102, height: 102 },
  { name: "Breguet", logo: "/images/brands/breguet.png", width: 118, height: 118 },
  { name: "Jaeger-LeCoultre", logo: "/images/brands/jaeger-lecoultre.png", width: 112, height: 112 },
  { name: "IWC", logo: "/images/brands/iwc.png", width: 85, height: 85 },
  { name: "Hublot", logo: "/images/brands/hublot.png", width: 68, height: 68 },
];

function BrandGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="wbw-brand-group" aria-hidden={duplicate || undefined}>
      {brands.map((brand) => (
        <div key={brand.name} className="wbw-brand-item">
          <div
            className="wbw-brand-image"
            style={{
              width: brand.width,
              maxWidth: "100%",
              height: brand.height,
            }}
          >
            <Image
              src={brand.logo}
              alt={duplicate ? "" : `${brand.name} logo`}
              fill
              sizes={`(max-width: 639px) ${Math.min(brand.width, 122)}px, ${brand.width}px`}
              className="wbw-brand-logo"
              style={{ objectFit: "contain" }}
            />
          </div>

          <span className="wbw-brand-divider" aria-hidden="true" />
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
    >
      <div className="wbw-brand-marquee">
        <BrandGroup />
        <BrandGroup duplicate />
      </div>
    </section>
  );
}