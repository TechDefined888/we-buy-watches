const questions = [
  {
    question: "Does We Buy Watches purchase my watch?",
    answer:
      "No. We Buy Watches is an independent referral platform. We do not buy, own, authenticate, take possession of or resell watches. The participating dealer independently handles assessments, offers, negotiations and purchases.",
  },
  {
    question: "What happens after I submit an enquiry?",
    answer:
      "We review your enquiry for suitability. With your consent, suitable enquiries are referred to our participating dealer. The dealer may contact you for further information or to discuss an inspection. Not every enquiry will qualify for referral.",
  },
  {
    question: "What information should I prepare?",
    answer:
      "Prepare your watch brand, model, condition and clear photographs. Include the reference number and approximate year if known, together with details about the original box, papers, service history and any known damage or faults. Keep identification documents and unrelated personal information out of photographs.",
  },
  {
    question: "Will I receive an immediate valuation or a guaranteed offer?",
    answer:
      "No. The enquiry form does not provide an instant valuation. The participating dealer may need further information or an inspection before deciding whether to make an offer. A valuation, offer, purchase or particular price is not guaranteed.",
  },
  {
    question: "Do I have to accept an offer?",
    answer:
      "No. Submitting an enquiry does not commit you to selling your watch. If the dealer makes an offer, you decide whether to accept or decline it.",
  },
  {
    question: "Who receives my enquiry details?",
    answer:
      "We review the information you submit. With your referral consent, suitable enquiries are shared with our participating dealer, including your contact details, watch information and photographs, so the dealer can assess your watch and contact you about a potential offer.",
  },
  {
    question: "Can I enquire from outside Melbourne?",
    answer:
      "Enquiries are welcome from across Australia, subject to the participating dealer’s ability to handle the transaction. Confirm any inspection, delivery, payment and purchase arrangements directly with the dealer before proceeding.",
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

          <p className="mt-5 text-sm leading-7 text-[#211A26]/75">
            Understand how your enquiry is reviewed, when details
            are shared and who handles a potential purchase.
          </p>
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