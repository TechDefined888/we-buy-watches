import Image from "next/image";

const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

const steps = [
  {
    id: "watch-details",
    title: "Submit Your Watch",
    description:
      "Tell us about your timepiece and provide relevant photographs and details.",
    detail:
      "Include the brand, model, condition and any available box, papers or service history. Keep identification documents and unrelated personal information out of photographs.",
    image: "/images/process/step-1.jpg",
    alt: "Luxury wristwatch",
    imagePosition: "center 60%",
  },
  {
    id: "personal-consultation",
    title: "Personal Consultation",
    description:
      "Our concierge reviews your enquiry and discusses your requirements.",
    detail:
      "We discuss your watch, its history and your selling expectations. Your enquiry details are shared with participating watch professionals only with your consent.",
    image: "/images/process/step-2.jpg",
    alt: "Documents and fountain pen",
    imagePosition: "center 65%",
  },
  {
    id: "inspection-arrangements",
    title: "Inspection Arrangements",
    description:
      "We coordinate a suitable inspection appointment, either at participating premises or at an agreed location where available.",
    detail:
      "Inspection arrangements depend on availability and suitability. Submitting an enquiry does not guarantee a valuation, offer or purchase.",
    image: "/images/process/step-3.jpg",
    alt: "Luxury watch in a presentation box",
    imagePosition: "center 65%",
  },
  {
    id: "your-selling-opportunity",
    title: "Your Selling Opportunity",
    description:
      "The independent purchasing professional discusses the purchase offer and transaction directly with you.",
    detail:
      "You are under no obligation to accept an offer. Payment and purchase arrangements are agreed directly with the buyer. We Buy Watches does not purchase or take possession of your watch.",
    image: "/images/process/step-4.jpg",
    alt: "Professional handshake",
    imagePosition: "center 65%",
  },
];

export default function ProcessSteps() {
  return (
    <section
      aria-labelledby="process-steps-heading"
      className="bg-[#F7F0E3] px-5 py-14 sm:px-6 sm:py-20"
      style={sectionFont}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="m-0 text-[10px] font-semibold uppercase leading-5 tracking-[0.28em] text-[#795C27] sm:text-xs">
            Your Private Concierge Experience
          </p>

          <h2
            id="process-steps-heading"
            className="
              mb-0 mt-4 text-2xl font-normal
              leading-tight tracking-[-0.025em]
              text-[#211A26]
              sm:text-3xl lg:text-[38px]
            "
            style={{ fontFamily: "inherit" }}
          >
            Four Steps. An Informed Decision.
          </h2>

          <p className="mb-0 mt-5 text-sm leading-7 text-[#211A26]/75">
            Share your watch details and let our concierge guide you
            through a private consultation, inspection arrangements
            and your selling opportunity.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-14 bg-[#C8A75E]"
          />
        </div>

        {/* Process cards */}
        <ol
          role="list"
          className="
            m-0 mt-10 grid list-none
            grid-cols-1 items-stretch gap-5 p-0
            sm:grid-cols-2
            lg:mt-12 lg:grid-cols-4
          "
        >
          {steps.map((step) => (
            <li
              key={step.id}
              className="
                flex min-w-0 flex-col
                overflow-hidden rounded-[16px]
                border border-[#C8A75E]/30
                bg-white
                shadow-[0_8px_24px_rgba(33,26,38,0.06)]
                transition-[border-color,box-shadow] duration-300
                hover:border-[#C8A75E]/70
                hover:shadow-[0_12px_30px_rgba(33,26,38,0.10)]
                motion-reduce:transition-none
              "
            >
              {/* Image */}
              <div className="relative h-[210px] w-full shrink-0 overflow-hidden bg-[#211A26]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 1328px) 305px, (min-width: 1024px) calc((100vw - 108px) / 4), (min-width: 640px) calc((100vw - 68px) / 2), calc(100vw - 40px)"
                  className="object-cover"
                  style={{
                    objectPosition: step.imagePosition,
                  }}
                />
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
                <div
                  aria-hidden="true"
                  className="mb-4 h-px w-8 shrink-0 bg-[#C8A75E]"
                />

                <h3
                  className="
                    m-0 text-[18px] font-medium
                    leading-7 tracking-[-0.02em]
                    text-[#30104B] lg:min-h-14
                  "
                  style={{ fontFamily: "inherit" }}
                >
                  {step.title}
                </h3>

                <p className="mb-0 mt-4 text-[13px] leading-7 text-[#211A26]/75">
                  {step.description}
                </p>

                {/* Supporting detail */}
                <div className="mt-auto pt-6">
                  <p className="m-0 border-t border-[#30104B]/10 pt-4 text-xs leading-6 text-[#795C27]">
                    {step.detail}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}