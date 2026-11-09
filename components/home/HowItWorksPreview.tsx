import Image from "next/image";
import Link from "next/link";

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

export default function HowItWorksPreview() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      style={sectionFont}
    >
      {/* Background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-36 h-72 w-72 rounded-full border border-[#C8A75E]/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-16 h-80 w-80 rounded-full border border-[#C8A75E]/15"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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

        {/* Process cards */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Link
              key={step.icon}
              href="/how-it-works"
              aria-label={`Learn more about ${step.title}`}
              className="
                group flex min-w-0 flex-col self-stretch
                overflow-hidden rounded-[18px]
                border border-[#C8A75E]/30
                bg-[#FAF6ED]
                shadow-[0_10px_28px_rgba(73,48,20,0.10)]
                transition-[border-color,box-shadow] duration-300
                hover:border-[#C8A75E]/70
                hover:shadow-[0_14px_34px_rgba(73,48,20,0.16)]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#C8A75E]
                motion-reduce:transition-none
              "
            >
              {/* Fixed image area */}
              <div
                className="relative isolate w-full shrink-0 overflow-hidden bg-[#211A26]"
                style={{ height: 215 }}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "block",
                    width: "100%",
                    height: "100%",
                    maxWidth: "none",
                    objectFit: "cover",
                    objectPosition: step.imagePosition,
                  }}
                />

                {/* Subtle shade behind icon */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,0,0,0.22), transparent 55%)",
                  }}
                />

                {/* Step icon */}
                <span
                  aria-hidden="true"
                  className="
                    absolute left-5 top-4 z-10
                    flex h-11 w-11 items-center justify-center
                    rounded-full border border-[#C8A75E]/65
                    bg-[#FFFAF0] text-[#A77E32]
                    shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                    transition-colors duration-300
                    group-hover:bg-[#C8A75E]
                    group-hover:text-[#211A26]
                    motion-reduce:transition-none
                  "
                >
                  <StepIcon type={step.icon} />
                </span>
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col px-5 pb-5 pt-6 sm:px-6">
                <div
                  aria-hidden="true"
                  className="mb-3 h-px w-8 shrink-0 bg-[#C8A75E]"
                />

                <h3
                  style={sectionFont}
                  className="m-0 text-[19px] font-medium leading-[1.4] tracking-[-0.025em] text-[#30104B]"
                >
                  {step.title}
                </h3>

                <p className="mb-0 mt-3 text-[13px] font-normal leading-[1.7] text-[#211A26]/75">
                  {step.text}
                </p>

                {/* Bottom-aligned arrow */}
                <div className="mt-auto flex justify-end pt-6">
                  <span
                    aria-hidden="true"
                    className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center rounded-full
                      border border-[#C8A75E] text-[#9A7A3B]
                      transition-colors duration-300
                      group-hover:bg-[#C8A75E]
                      group-hover:text-[#211A26]
                      motion-reduce:transition-none
                    "
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Purple CTA button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/how-it-works"
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
            Discover How It Works

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