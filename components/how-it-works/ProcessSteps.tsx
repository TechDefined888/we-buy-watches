import Image from "next/image";

const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

const steps = [
  {
    id: "watch-details",
    title: "Tell Us About Your Watch",
    description:
      "Share your watch brand, model, condition and any available reference information. Add clear photographs, details about the original box, papers and service history, and your preferred contact details.",
    detail:
      "Keep identification documents and unrelated personal information out of photographs.",
    image: "/images/process/step-1.jpg",
    alt: "Luxury wristwatch",
    imagePosition: "center 60%",
  },
  {
    id: "review-referral",
    title: "Review and Referral",
    description:
      "We review your enquiry for suitability. With your consent, suitable enquiries are referred to our participating dealer, who independently decides whether to assess your watch further.",
    detail:
      "Not every watch or enquiry will qualify for referral.",
    image: "/images/process/step-2.jpg",
    alt: "Documents and fountain pen",
    imagePosition: "center 65%",
  },
  {
    id: "potential-offer",
    title: "Explore a Potential Offer",
    description:
      "The participating dealer may contact you for further information or arrange an inspection before deciding whether to make an offer. Watch assessments and offers are handled by the dealer.",
    detail:
      "Submitting an enquiry does not guarantee a valuation, offer or purchase.",
    image: "/images/process/step-3.jpg",
    alt: "Luxury watch in a presentation box",
    imagePosition: "center 65%",
  },
  {
    id: "your-decision",
    title: "The Decision Is Yours",
    description:
      "If the dealer makes an offer, you decide whether to accept it. Any negotiations, inspection, delivery, payment and purchase arrangements are agreed directly between you and the dealer.",
    detail:
      "You are under no obligation to accept an offer. We Buy Watches does not purchase or take possession of your watch.",
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
            From Enquiry to a Potential Offer
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
            Share your watch details, explore a potential offer from
            our participating dealer and decide whether it is right
            for you.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-14 bg-[#C8A75E]"
          />
        </div>

        {/* Process cards — no visible numbers */}
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
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 320px"
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

                {/* Bottom detail */}
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