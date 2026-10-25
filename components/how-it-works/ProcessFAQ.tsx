const questions = [
  {
    question: "Does We Buy Watches purchase my watch?",
    answer:
      "We Buy Watches operates as a referral platform. The participating dealer handles watch assessments, offers and purchases.",
  },
  {
    question: "Do I have to accept an offer?",
    answer:
      "No. Submitting an enquiry does not require you to accept an offer or sell your watch.",
  },
  {
    question: "What information should I prepare?",
    answer:
      "Have your watch brand, model, condition and any available reference number ready. Clear photographs and information about the box, papers and service history can also help.",
  },
  {
    question: "Will I receive an immediate valuation?",
    answer:
      "The enquiry form does not provide an instant valuation. The participating dealer may need additional information or an inspection before deciding whether to make an offer.",
  },
];

export default function ProcessFAQ() {
  return (
    <section
      aria-labelledby="process-questions-heading"
      className="bg-[#F7F0E3] px-5 pt-14 sm:px-6 sm:pt-20"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#795C27] sm:text-xs">
            Before You Begin
          </p>

          <h2
            id="process-questions-heading"
            className="mt-4 text-2xl font-normal tracking-[-0.025em] text-[#211A26] sm:text-3xl"
            style={{ fontFamily: "inherit" }}
          >
            A Few Things to Know
          </h2>
        </div>

        <div className="mt-9 space-y-4">
          {questions.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-[#30104B]/15 bg-white"
            >
              <summary className="cursor-pointer rounded-xl px-5 py-5 text-sm font-medium leading-6 text-[#211A26] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]">
                {item.question}
              </summary>

              <p className="px-5 pb-5 text-sm leading-7 text-[#211A26]/75">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}