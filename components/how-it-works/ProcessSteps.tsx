const steps = [
  {
    number: "01",
    title: "Tell Us About Your Watch",
    description:
      "Share your watch brand, model, condition and any available reference information. Add clear photographs, details about the original box, papers and service history, and your preferred contact details.",
    detail:
      "Keep identification documents and unrelated personal information out of photographs.",
  },
  {
    number: "02",
    title: "Review and Referral",
    description:
      "We review your enquiry for suitability. With your consent, suitable enquiries are referred to our participating dealer, who independently decides whether to assess your watch further.",
    detail:
      "Not every watch or enquiry will qualify for referral.",
  },
  {
    number: "03",
    title: "Explore a Potential Offer",
    description:
      "The participating dealer may contact you for further information or arrange an inspection before deciding whether to make an offer. Watch assessments and offers are handled by the dealer.",
    detail:
      "Submitting an enquiry does not guarantee a valuation, offer or purchase.",
  },
  {
    number: "04",
    title: "The Decision Is Yours",
    description:
      "If the dealer makes an offer, you decide whether to accept it. Any negotiations, inspection, delivery, payment and purchase arrangements are agreed directly between you and the dealer.",
    detail:
      "You are under no obligation to accept an offer. We Buy Watches does not purchase or take possession of your watch.",
  },
];

export default function ProcessSteps() {
  return (
    <section
      aria-labelledby="process-steps-heading"
      className="bg-[#F7F0E3] px-5 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#795C27] sm:text-xs">
            From Enquiry to a Potential Offer
          </p>

          <h2
            id="process-steps-heading"
            className="mt-4 text-2xl font-normal leading-tight tracking-[-0.025em] text-[#211A26] sm:text-3xl"
            style={{ fontFamily: "inherit" }}
          >
            Four Steps. An Informed Decision.
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#211A26]/75">
            Share your watch details, explore a potential offer
            from our participating dealer and decide whether it
            is right for you.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-2">
          {steps.map((step) => (
            <li
              key={step.number}
              className="rounded-2xl border border-[#30104B]/10 bg-white p-6 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#30104B] text-sm font-medium text-[#E1C17E]"
              >
                {step.number}
              </span>

              <h3
                className="mt-6 text-lg font-medium leading-7 tracking-[-0.02em] text-[#211A26] sm:text-xl"
                style={{ fontFamily: "inherit" }}
              >
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#211A26]/75">
                {step.description}
              </p>

              <p className="mt-5 border-t border-[#30104B]/10 pt-4 text-xs leading-6 text-[#795C27]">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}