const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

const trustItems = [
  {
    title: "Straightforward Enquiries",
    text: "A simple online process designed around the information that matters.",
  },
  {
    title: "Secure Photo Submission",
    text: "Submit relevant watch photographs together with your enquiry.",
  },
  {
    title: "Transparent Handling",
    text: "Suitable enquiries are reviewed before referral to a participating buyer.",
  },
  {
    title: "No Obligation",
    text: "Submitting an enquiry does not commit you to accepting an offer.",
  },
];

export default function TrustSection() {
  return (
    <section
      aria-labelledby="trust-section-heading"
      className="bg-[#30104B] py-16 text-[#F7F0E3] sm:py-20 lg:py-24"
      style={sectionFont}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Centered heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-medium uppercase leading-5 tracking-[0.3em] text-[#C8A75E] sm:text-[11px]">
            Why We Buy Watches
          </p>

          <h2
            id="trust-section-heading"
            style={sectionFont}
            className="mt-4 text-3xl font-normal leading-[1.15] tracking-[-0.035em] text-[#F7F0E3] sm:text-4xl lg:text-[44px]"
          >
            A Refined Way to Explore Your Selling Options.
          </h2>

          <p className="mx-auto mt-5 max-w-[580px] text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#F7F0E3]/65 sm:text-[14px]">
            Created for owners of desirable, high-value luxury watches
            who want a straightforward and discreet enquiry process.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-px w-14 bg-[#C8A75E]"
          />
        </div>

        {/* Trust cards */}
        <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="bg-[#351452] p-8 transition-colors duration-300 hover:bg-[#3d195c]"
            >
              <div
                aria-hidden="true"
                className="mb-6 h-px w-10 bg-[#C8A75E]"
              />

              <h3
                style={sectionFont}
                className="text-[19px] font-medium leading-[1.4] tracking-[-0.025em] text-[#F7F0E3]"
              >
                {item.title}
              </h3>

              <p className="mt-4 text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#F7F0E3]/65 sm:text-[14px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}