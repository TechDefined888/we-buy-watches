import Image from "next/image";
import Link from "next/link";

const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

const steps = [
  {
    number: "01",
    icon: "watch",
    title: "Tell us about your watch",
    text: "Share your watch details, clear photographs and preferred contact details to begin your enquiry.",
    image: "/images/process/step-1.jpg",
    alt: "Luxury wristwatch",
  },
  {
    number: "02",
    icon: "document",
    title: "Review and referral",
    text: "We review your enquiry and, with your consent, refer suitable enquiries to our participating dealer.",
    image: "/images/process/step-2.jpg",
    alt: "Documents and fountain pen",
  },
  {
    number: "03",
    icon: "tag",
    title: "Explore a potential offer",
    text: "The dealer may request further details or an inspection before deciding whether to make an offer. An offer is not guaranteed.",
    image: "/images/process/step-3.jpg",
    alt: "Luxury watch in presentation box",
  },
  {
    number: "04",
    icon: "check",
    title: "The decision is yours",
    text: "You decide whether to accept an offer, with no obligation to sell. Any purchase arrangements are agreed directly with the dealer.",
    image: "/images/process/step-4.jpg",
    alt: "Professional handshake",
  },
];

function StepIcon({ type }: { type: string }) {
  const common = {
    width: 19,
    height: 19,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "watch") {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="12" cy="12" r="6" />
        <path d="M9 6l1-4h4l1 4M9 18l1 4h4l1-4M12 9v3l2 1" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M15 3v5h4M9 12h7M9 16h7" />
      </svg>
    );
  }

  if (type === "tag") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M20 12l-8 8a2 2 0 0 1-3 0l-6-6a2 2 0 0 1 0-3l8-8h9z" />
        <circle cx="16" cy="8" r="1.5" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export default function HowItWorksPreview() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        ...sectionFont,
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Decorative background circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 top-36 h-72 w-72 rounded-full"
        style={{
          border: "1px solid rgba(200,167,94,0.15)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-16 h-80 w-80 rounded-full"
        style={{
          border: "1px solid rgba(200,167,94,0.18)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
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

          <p className="mx-auto mt-5 max-w-[580px] text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#211A26]/70 sm:text-[14px]">
            Share your watch details, explore a potential offer from
            our participating dealer and decide whether selling is
            right for you.
          </p>

          <div
            className="mx-auto mt-5"
            style={{
              width: "56px",
              height: "1px",
              backgroundColor: "#C8A75E",
            }}
          />
        </div>

        {/* Floating cards */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Link
              key={step.number}
              href="/how-it-works"
              aria-label={`Learn more about ${step.title}`}
              className="
                group relative flex h-full flex-col
                overflow-hidden rounded-[18px]
                transition-all duration-500
                hover:-translate-y-1.5
                hover:shadow-[0_22px_45px_rgba(95,62,22,0.18)]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#C8A75E]
              "
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(200,167,94,0.32)",
                boxShadow:
                  "0 12px 30px rgba(73,48,20,0.11), 0 3px 8px rgba(73,48,20,0.04)",
              }}
            >
              {/* Image */}
              <div
                className="relative w-full shrink-0 overflow-hidden"
                style={{
                  height: "215px",
                  backgroundColor: "#211A26",
                }}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={640}
                  height={480}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="block transition-transform duration-700 group-hover:scale-[1.07]"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.30), transparent 55%, rgba(0,0,0,0.10))",
                  }}
                />

                {/* Step number */}
                <span
                  className="absolute left-5 top-4 text-[34px] font-normal leading-none text-white"
                  style={{
                    ...sectionFont,
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Frosted content panel */}
              <div
                className="relative z-10 flex flex-1 flex-col rounded-t-[18px] px-5 pb-5 pt-8 sm:px-6"
                style={{
                  marginTop: "-34px",
                  minHeight: "235px",
                  backgroundColor: "rgba(250,246,237,0.88)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  borderTop: "1px solid rgba(255,255,255,0.85)",
                  boxShadow: "0 -8px 25px rgba(0,0,0,0.035)",
                }}
              >
                {/* Floating icon */}
                <div
                  className="
                    absolute -top-5 left-5
                    flex h-11 w-11 items-center justify-center
                    rounded-full text-[#A77E32]
                    shadow-[0_5px_16px_rgba(95,62,22,0.14)]
                    transition-all duration-300
                    group-hover:bg-[#C8A75E]
                    group-hover:text-[#211A26]
                  "
                  style={{
                    backgroundColor: "rgba(255,250,240,0.96)",
                    border: "1px solid rgba(200,167,94,0.65)",
                  }}
                >
                  <StepIcon type={step.icon} />
                </div>

                {/* Gold accent */}
                <div
                  className="mb-3"
                  style={{
                    width: "32px",
                    height: "1px",
                    backgroundColor: "#C8A75E",
                  }}
                />

                <h3
                  style={sectionFont}
                  className="text-[19px] font-medium leading-[1.4] tracking-[-0.025em] text-[#30104B]"
                >
                  {step.title}
                </h3>

                <p className="mt-3 text-[13px] font-normal leading-[1.7] text-[#211A26]/75">
                  {step.text}
                </p>

                {/* Bottom arrow */}
                <div className="mt-auto flex items-center justify-end pt-5">
                  <span
                    aria-hidden="true"
                    className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center rounded-full
                      text-[#9A7A3B]
                      transition-all duration-300
                      group-hover:bg-[#C8A75E]
                      group-hover:text-[#211A26]
                    "
                    style={{
                      border: "1px solid #C8A75E",
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/how-it-works"
            className="
              group inline-flex items-center
              border-b border-[#C8A75E] pb-2
              text-[11px] font-semibold uppercase
              tracking-[0.18em] text-[#30104B]
              transition-colors duration-300
              hover:text-[#9A7A3B]
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#C8A75E]
            "
          >
            Discover How It Works

            <span
              aria-hidden="true"
              className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}