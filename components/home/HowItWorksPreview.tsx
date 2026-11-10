"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

type IconType = "watch" | "document" | "tag" | "check";

type ProcessStep = {
  icon: IconType;
  title: string;
  text: string;
  image: string;
  alt: string;
  imagePosition: string;
};

const steps: ProcessStep[] = [
  {
    icon: "watch",
    title: "Tell us about your watch",
    text: "Share your watch details, clear photographs and preferred contact details to begin your enquiry.",
    image: "/images/process/step-1.jpg",
    alt: "Luxury wristwatch",
    imagePosition: "center 60%",
  },
  {
    icon: "document",
    title: "Review and referral",
    text: "We review your enquiry and, with your consent, refer suitable enquiries to our participating dealer.",
    image: "/images/process/step-2.jpg",
    alt: "Documents and fountain pen",
    imagePosition: "center 65%",
  },
  {
    icon: "tag",
    title: "Explore a potential offer",
    text: "The dealer may request further details or an inspection before deciding whether to make an offer. An offer is not guaranteed.",
    image: "/images/process/step-3.jpg",
    alt: "Luxury watch in presentation box",
    imagePosition: "center 65%",
  },
  {
    icon: "check",
    title: "The decision is yours",
    text: "You decide whether to accept an offer, with no obligation to sell. Any purchase arrangements are agreed directly with the dealer.",
    image: "/images/process/step-4.jpg",
    alt: "Professional handshake",
    imagePosition: "center 65%",
  },
];

function StepIcon({ type }: { type: IconType }) {
  const common = {
    width: 23,
    height: 23,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "watch":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="6" />
          <path d="M9 6l1-4h4l1 4M9 18l1 4h4l1-4M12 9v3l2 1" />
        </svg>
      );

    case "document":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M15 3v5h4M9 12h7M9 16h7" />
        </svg>
      );

    case "tag":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M20 12l-8 8a2 2 0 0 1-3 0l-6-6a2 2 0 0 1 0-3l8-8h9z" />
          <circle cx="16" cy="8" r="1.5" />
        </svg>
      );

    case "check":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m5 12 5 5L20 7" />
        </svg>
      );
  }
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path
        d={direction === "left" ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"}
      />
    </svg>
  );
}

const navigationClass = `
  flex h-11 w-11 shrink-0 items-center justify-center
  self-center rounded-full
  border border-[#C8A75E]/50
  bg-white text-[#30104B]
  transition-colors hover:bg-[#FAF6ED]
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-[#30104B]
  disabled:cursor-default disabled:opacity-35
  motion-reduce:transition-none
  sm:hidden
`;

export default function HowItWorksPreview() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateControls() {
      if (!track) return;

      const maximum = Math.max(
        0,
        track.scrollWidth - track.clientWidth,
      );

      setAtStart(track.scrollLeft <= 2);
      setAtEnd(track.scrollLeft >= maximum - 2);
    }

    updateControls();

    track.addEventListener("scroll", updateControls, {
      passive: true,
    });

    const observer = new ResizeObserver(updateControls);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", updateControls);
      observer.disconnect();
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

    const nextIndex =
      Math.round(track.scrollLeft / step) + direction;

    const maximum = Math.max(
      0,
      track.scrollWidth - track.clientWidth,
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollTo({
      left: Math.min(maximum, Math.max(0, nextIndex * step)),
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      style={sectionFont}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-36 h-72 w-72 rounded-full border border-[#C8A75E]/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-16 h-80 w-80 rounded-full border border-[#C8A75E]/15"
      />

      <div className="relative z-10 mx-auto min-w-0 max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-medium uppercase leading-5 tracking-[0.3em] text-[#9A7A3B] sm:text-[11px]">
            How It Works
          </p>

          <h2
            id="how-it-works-heading"
            style={sectionFont}
            className="mt-4 text-3xl font-normal leading-[1.15] tracking-[-0.035em] text-[#211A26] sm:text-4xl lg:text-[44px]"
          >
            A Simple, Discreet Process
          </h2>

          <p className="mx-auto mt-5 max-w-[580px] text-[13px] leading-[1.9] tracking-[0.01em] text-[#211A26]/70 sm:text-[14px]">
            Share your watch details, explore a potential offer from
            our participating dealer and decide whether selling is
            right for you.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-px w-14 bg-[#C8A75E]"
          />
        </div>

        {/*
          Mobile: arrows have their own columns.
          The middle column can shrink without overflowing the page.
          Tablet/desktop: restore the original grid.
        */}
        <div
          className="
            mx-auto mt-7 grid w-full max-w-[400px]
            grid-cols-[44px_minmax(0,1fr)_44px]
            items-center gap-1
            sm:mt-12 sm:block sm:max-w-none
          "
        >
          <button
            type="button"
            aria-label="Previous process step"
            aria-controls="how-it-works-cards"
            disabled={atStart}
            onClick={() => scrollCards(-1)}
            className={navigationClass}
          >
            <Chevron direction="left" />
          </button>

          <div
            id="how-it-works-cards"
            ref={trackRef}
            role="region"
            aria-label="How it works steps"
            className="
              grid w-full min-w-0
              auto-cols-[100%] grid-flow-col grid-rows-1
              items-stretch gap-4
              overflow-x-auto overscroll-x-contain
              snap-x snap-mandatory py-4
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              sm:auto-cols-auto sm:grid-flow-row
              sm:grid-cols-2 sm:grid-rows-none
              sm:gap-6 sm:overflow-visible
              sm:overscroll-x-auto sm:snap-none sm:py-0
              lg:grid-cols-4
            "
          >
            {steps.map((step) => (
              <Link
                key={step.icon}
                href="/how-it-works"
                aria-label={`Learn more about ${step.title}`}
                className="
                  group flex w-full min-w-0
                  snap-start flex-col self-stretch
                  overflow-hidden rounded-[18px]
                  border border-[#C8A75E]/30
                  bg-[#FAF6ED]
                  shadow-[0_4px_12px_rgba(73,48,20,0.08)]
                  transition-[border-color,box-shadow] duration-300
                  hover:border-[#C8A75E]/70
                  focus-visible:outline-2
                  focus-visible:-outline-offset-2
                  focus-visible:outline-[#C8A75E]
                  motion-reduce:transition-none
                  sm:w-auto sm:snap-align-none
                  sm:shadow-[0_10px_28px_rgba(73,48,20,0.10)]
                  sm:hover:shadow-[0_14px_34px_rgba(73,48,20,0.16)]
                  sm:focus-visible:outline-offset-4
                "
              >
                {/* Full image on mobile, original crop on desktop */}
                <div className="relative isolate h-[190px] w-full shrink-0 overflow-hidden bg-[#211A26] sm:h-[215px]">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1280px) 286px, (min-width: 1024px) calc((100vw - 136px) / 4), (min-width: 640px) calc((100vw - 72px) / 2), (min-width: 440px) 304px, calc(100vw - 136px)"
                    className="
                      object-contain object-center
                      sm:object-cover
                      sm:object-[var(--step-position)]
                    "
                    style={
                      {
                        "--step-position": step.imagePosition,
                      } as React.CSSProperties
                    }
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,0,0,0.22), transparent 55%)",
                    }}
                  />

                  <span
                    aria-hidden="true"
                    className="
                      absolute left-3 top-3 z-10
                      flex h-8 w-8 items-center justify-center
                      rounded-full border border-[#C8A75E]/65
                      bg-[#C8A75E] text-[#211A26]
                      shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                      transition-colors duration-300
                      [&>svg]:h-[18px] [&>svg]:w-[18px]
                      sm:left-5 sm:top-4 sm:h-11 sm:w-11
                      sm:bg-[#FFFAF0] sm:text-[#A77E32]
                      sm:[&>svg]:h-[23px] sm:[&>svg]:w-[23px]
                      group-hover:bg-[#C8A75E]
                      group-hover:text-[#211A26]
                      motion-reduce:transition-none
                    "
                  >
                    <StepIcon type={step.icon} />
                  </span>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-6">
                  <div
                    aria-hidden="true"
                    className="mb-2 h-px w-6 shrink-0 bg-[#C8A75E] sm:mb-3 sm:w-8"
                  />

                  <h3
                    style={sectionFont}
                    className="m-0 text-[16px] font-medium leading-[1.35] tracking-[-0.025em] text-[#30104B] sm:text-[19px] sm:leading-[1.4]"
                  >
                    {step.title}
                  </h3>

                  <p className="mb-0 mt-2 text-[12px] font-normal leading-[1.6] text-[#211A26]/75 sm:mt-3 sm:text-[13px] sm:leading-[1.7]">
                    {step.text}
                  </p>

                  <div className="mt-auto flex justify-end pt-4 sm:pt-6">
                    <span
                      aria-hidden="true"
                      className="
                        flex h-7 w-7 shrink-0
                        items-center justify-center rounded-full
                        border border-[#C8A75E]
                        bg-[#C8A75E] text-sm text-[#211A26]
                        transition-colors duration-300
                        sm:h-9 sm:w-9 sm:bg-transparent
                        sm:text-base sm:text-[#9A7A3B]
                        group-hover:bg-[#C8A75E]
                        group-hover:text-[#211A26]
                        motion-reduce:transition-none
                      "
                    >
                      <span
                        className="
                          transition-transform duration-300
                          group-hover:translate-x-0.5
                          motion-reduce:transform-none
                          motion-reduce:transition-none
                        "
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next process step"
            aria-controls="how-it-works-cards"
            disabled={atEnd}
            onClick={() => scrollCards(1)}
            className={navigationClass}
          >
            <Chevron direction="right" />
          </button>
        </div>

        {/* Existing CTA */}
        <div className="mt-7 flex justify-center sm:mt-12">
          <Link
            href="/how-it-works"
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
            Discover How It Works

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