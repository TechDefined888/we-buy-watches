export default function SellerDecision() {
  return (
    <section
      aria-labelledby="referral-heading"
      className="bg-[#30104B] px-5 py-14 text-[#F7F0E3] sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
          Clear Expectations
        </p>

        <h2
          id="referral-heading"
          className="mt-4 text-2xl font-normal leading-tight tracking-[-0.025em] sm:text-3xl"
          style={{ fontFamily: "inherit" }}
        >
          Your Watch. Your Decision.
        </h2>

        <p className="mt-5 text-sm leading-7 text-[#F7F0E3]/80">
          We facilitate suitable introductions. The participating
          dealer independently assesses your watch and decides
          whether to make an offer. You choose whether to proceed,
          and any sale is arranged directly with that dealer.
        </p>
      </div>
    </section>
  );
}