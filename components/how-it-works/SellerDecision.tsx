export default function SellerDecision() {
  return (
    <section
      aria-labelledby="seller-decision-heading"
      className="bg-[#30104B] px-5 py-14 text-[#F7F0E3] sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1C17E] sm:text-xs">
          Clear Expectations
        </p>

        <h2
          id="seller-decision-heading"
          className="mt-4 text-2xl font-normal leading-tight tracking-[-0.025em] sm:text-3xl"
          style={{ fontFamily: "inherit" }}
        >
          Your Watch. Your Decision.
        </h2>

        <p className="mt-5 text-sm leading-7 text-[#F7F0E3]/80">
          Our concierge reviews your enquiry, discusses your
          requirements and coordinates suitable inspection
          arrangements. With your consent, we share the relevant
          enquiry details with participating watch professionals.
          The independent purchasing professional assesses your
          watch and decides whether to make an offer.
        </p>

        <p className="mt-4 text-sm leading-7 text-[#F7F0E3]/80">
          You are under no obligation to accept an offer. Our
          concierge supports you with appointment arrangements
          and communication throughout the process. If you choose
          to proceed, the purchase terms, delivery and payment
          arrangements are agreed directly between you and the
          independent buyer.
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