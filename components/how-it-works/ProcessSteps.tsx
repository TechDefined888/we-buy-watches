const steps = [
  {
    number: "01",
    title: "Tell Us About Your Watch",
    description:
      "Share your watch brand, model, condition and any available reference information. Include details about the box, papers and service history where possible.",
    detail:
      "Accurate details help the dealer understand your timepiece.",
  },
  {
    number: "02",
    title: "Add Photographs and Contact Details",
    description:
      "Select clear photographs of the dial, case, bracelet and any visible wear. Provide your contact details and review the information you consent to share.",
    detail:
      "Keep identification documents and personal information out of photographs.",
  },
  {
    number: "03",
    title: "Your Enquiry Is Reviewed",
    description:
      "We review your enquiry for suitability. With your consent, suitable enquiries are referred to our participating dealer for further assessment.",
    detail:
      "Not every watch or enquiry will qualify for referral.",
  },
  {
    number: "04",
    title: "Consider a Potential Offer",
    description:
      "The participating dealer may contact you to request further information, discuss an inspection or make an offer. Any purchase arrangements are agreed directly with the dealer.",
    detail:
      "An offer or purchase is not guaranteed. The decision to accept is yours.",
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
            From Enquiry to Opportunity
          </p>

          <h2
            id="process-steps-heading"
            className="mt-4 text-2xl font-normal leading-tight tracking-[-0.025em] text-[#211A26] sm:text-3xl"
            style={{ fontFamily: "inherit" }}
          >
            Four Steps. An Informed Decision.
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#211A26]/75">
            A straightforward introduction, with the freedom to
            decide whether an offer is right for you.
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