"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

const photoFolder = "/images/watches/featured";

const photoSizes =
  "(min-width: 1280px) 296px, " +
  "(min-width: 640px) calc((100vw - 96px) / 4), " +
  "calc((100vw - 58px) / 4)";

const brands = [
  {
    name: "Rolex",
    href: "/sell-rolex",
    photo: "rolex.png",
    alt: "Rolex wristwatch",
  },
  {
    name: "Patek Philippe",
    href: "/sell-patek-philippe",
    photo: "patek-philippe.png",
    alt: "Patek Philippe wristwatch",
  },
  {
    name: "Audemars Piguet",
    href: "/sell-audemars-piguet",
    photo: "audemars-piguet.png",
    alt: "Audemars Piguet wristwatch",
  },
  {
    name: "Richard Mille",
    href: "/sell-richard-mille",
    photo: "richard-mille.png",
    alt: "Richard Mille wristwatch",
  },
  {
    name: "Vacheron Constantin",
    href: "/sell-vacheron-constantin",
    photo: "vacheron-constantin.png",
    alt: "Vacheron Constantin wristwatch",
  },
  {
    name: "A. Lange & Söhne",
    href: "/sell-a-lange-sohne",
    photo: "a-lange-sohne.png",
    alt: "A. Lange & Söhne wristwatch",
  },
  {
    name: "F.P. Journe",
    href: "/sell-fp-journe",
    photo: "fp-journe.png",
    alt: "F.P. Journe wristwatch",
  },
  {
    name: "Breguet",
    href: "/sell-breguet",
    photo: "breguet.png",
    alt: "Breguet wristwatch",
  },
  {
    name: "Jaeger-LeCoultre",
    href: "/sell-jaeger-lecoultre",
    photo: "jaeger-lecoultre.png",
    alt: "Jaeger-LeCoultre wristwatch",
  },
  {
    name: "Cartier",
    href: "/sell-cartier",
    photo: "cartier.png",
    alt: "Cartier wristwatch",
  },
  {
    name: "IWC",
    href: "/sell-iwc",
    photo: "iwc.png",
    alt: "IWC wristwatch",
  },
  {
    name: "Hublot",
    href: "/sell-hublot",
    photo: "hublot.png",
    alt: "Hublot wristwatch",
  },
  {
    name: "Omega",
    href: "/sell-omega",
    photo: "omega.png",
    alt: "Omega wristwatch",
  },
  {
    name: "Tudor",
    href: "/sell-luxury-watches",
    photo: "tudor.png",
    alt: "Tudor wristwatch",
  },
];

const arrowClass =
  "grid size-11 place-items-center rounded-full " +
  "border border-[#30104B]/20 bg-white text-lg text-[#30104B] " +
  "transition-colors hover:border-[#C8A75E] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[#30104B] " +
  "disabled:cursor-default disabled:opacity-40 " +
  "motion-reduce:transition-none";

export default function FeaturedBrands() {
  const trackRef = useRef<HTMLUListElement>(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [failedPhotos, setFailedPhotos] = useState<string[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateControls = () => {
      const maxScroll = Math.max(
        0,
        track.scrollWidth - track.clientWidth,
      );

      setAtStart(track.scrollLeft <= 2);
      setAtEnd(track.scrollLeft >= maxScroll - 2);
    };

    updateControls();

    track.addEventListener("scroll", updateControls, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateControls);
      resizeObserver.disconnect();
    };
  }, []);

  function scrollCards(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const first = track.children.item(0);
    const second = track.children.item(1);

    if (!first || !second) return;

    const step =
      second.getBoundingClientRect().left -
      first.getBoundingClientRect().left;

    if (step <= 0) return;

    const nextCard =
      Math.round(track.scrollLeft / step) + direction;

    const maxScroll = Math.max(
      0,
      track.scrollWidth - track.clientWidth,
    );

    const target = Math.min(
      maxScroll,
      Math.max(0, nextCard * step),
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left: target,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  function handlePhotoError(photo: string) {
    setFailedPhotos((current) =>
      current.includes(photo) ? current : [...current, photo],
    );
  }

  return (
    <section
      aria-labelledby="featured-brands-heading"
      className="relative overflow-hidden bg-[#F7F0E3] py-16 sm:py-18 lg:py-20"
      style={sectionFont}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 5%, rgba(200,167,94,0.08), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-medium uppercase leading-5 tracking-[0.3em] text-[#9A7A3B] sm:text-[11px]">
            Featured Brands
          </p>

          <h2
            id="featured-brands-heading"
            className="mt-4 text-3xl font-normal leading-[1.15] tracking-[-0.035em] text-[#211A26] sm:text-4xl lg:text-[44px]"
          >
            Iconic Brands. Exceptional Timepieces.
          </h2>

          <p className="mx-auto mt-5 max-w-[580px] text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#211A26]/70 sm:text-[14px]">
            We focus on desirable luxury and collectible watches from
            some of the world&apos;s most recognised watchmakers.
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button
            type="button"
            aria-label="Previous watch brand"
            aria-controls="featured-watch-cards"
            className={arrowClass}
            disabled={atStart}
            onClick={() => scrollCards(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            type="button"
            aria-label="Next watch brand"
            aria-controls="featured-watch-cards"
            className={arrowClass}
            disabled={atEnd}
            onClick={() => scrollCards(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <ul
          id="featured-watch-cards"
          ref={trackRef}
          aria-label="Featured watch brands"
          className="
            mt-3 grid w-full min-w-0 list-none grid-flow-col
            auto-cols-[calc((100%_-_18px)/4)]
            snap-x snap-mandatory gap-[6px]
            overflow-x-auto overscroll-x-contain
            p-0 pb-2
            sm:auto-cols-[calc((100%_-_48px)/4)]
            sm:gap-4
          "
        >
          {brands.map((brand) => (
            <li
              key={brand.name}
              className="min-w-0 snap-start"
            >
              <Link
                href={brand.href}
                className="
                  group flex h-full min-w-0 flex-col
                  overflow-hidden rounded-lg
                  border border-[#30104B]/15
                  bg-white text-[#30104B] no-underline
                  transition-colors hover:border-[#C8A75E]
                  focus-visible:outline-2
                  focus-visible:-outline-offset-2
                  focus-visible:outline-[#C8A75E]
                  motion-reduce:transition-none
                "
              >
                <div className="relative aspect-[4/5] w-full bg-[#30104B]">
                  {!failedPhotos.includes(brand.photo) ? (
                    <Image
                      src={`${photoFolder}/${brand.photo}`}
                      alt={brand.alt}
                      fill
                      sizes={photoSizes}
                      className="object-contain"
                      onError={() => handlePhotoError(brand.photo)}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-[#F7F0E3] p-1">
                      <span className="text-center text-[10px] leading-tight text-[#211A26]/60 sm:text-xs">
                        Image unavailable
                      </span>
                    </div>
                  )}
                </div>

                <span
                  className="
                    grid min-h-14 flex-1 place-items-center
                    px-0.5 py-2 text-center
                    text-[11px] font-semibold leading-tight
                    [overflow-wrap:anywhere]
                    sm:min-h-16 sm:px-3 sm:py-3 sm:text-sm
                  "
                >
                  {brand.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex justify-center">
          <Link
            href="/brands"
            className="
              group inline-flex min-h-12
              items-center justify-center gap-5
              rounded-[6px] border-0
              bg-[#30104B]! px-6 py-3
              text-[14px] font-normal normal-case
              tracking-normal text-white! no-underline!
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
                motion-reduce:transition-none
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