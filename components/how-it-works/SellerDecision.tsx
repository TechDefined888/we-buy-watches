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
          We review enquiries and, with your consent, refer suitable
          enquiries to our participating dealer. The dealer
          independently assesses your watch and decides whether to
          make an offer.
        </p>

        <p className="mt-4 text-sm leading-7 text-[#F7F0E3]/80">
          You are under no obligation to accept an offer. If you
          choose to proceed, any negotiations, inspection, delivery,
          payment and purchase arrangements are agreed directly
          between you and the dealer.
        </p>

        <p className="mt-4 text-sm leading-7 text-[#F7F0E3]/80">
          We Buy Watches does not purchase or take possession of
          your watch. An offer, purchase or particular price is
          not guaranteed.
        </p>
      </div>
    </section>
  );
}