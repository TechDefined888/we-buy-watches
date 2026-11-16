const sectionFont = {
  fontFamily: "var(--font-nav, Arial), sans-serif",
};

const services = [
  {
    title: "Private Watch Consultations",
    text: "A personalised consultation to discuss your watch, its condition, history and selling expectations.",
  },
  {
    title: "Watch Selling Assistance",
    text: "Dedicated assistance throughout the process of preparing and arranging your watch for sale.",
  },
  {
    title: "Private Inspections",
    text: "Inspection appointments coordinated around your convenience, with participating watch professionals.",
  },
  {
    title: "Concierge Support",
    text: "A dedicated point of contact to guide you through enquiries, appointment arrangements and the selling process.",
  },
];

export default function TrustSection() {
  return (
    <section
      id="our-services"
      aria-labelledby="services-section-heading"
      className="bg-[#30104B] py-16 text-[#F7F0E3] sm:py-20 lg:py-24"
      style={sectionFont}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-medium uppercase leading-5 tracking-[0.3em] text-[#C8A75E] sm:text-[11px]">
            Our Services
          </p>

          <h2
            id="services-section-heading"
            style={sectionFont}
            className="mt-4 text-3xl font-normal leading-[1.15] tracking-[-0.035em] text-[#F7F0E3] sm:text-4xl lg:text-[44px]"
          >
            A Personal Approach to Selling Your Watch.
          </h2>

          <p className="mx-auto mt-5 max-w-[580px] text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#F7F0E3]/65 sm:text-[14px]">
            Private consultations, inspection arrangements and
            personalised support throughout your watch selling
            experience.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-px w-14 bg-[#C8A75E]"
          />
        </div>

        <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-[#351452] p-8 transition-colors duration-300 hover:bg-[#3d195c] motion-reduce:transition-none"
            >
              <div
                aria-hidden="true"
                className="mb-6 h-px w-10 bg-[#C8A75E]"
              />

              <h3
                style={sectionFont}
                className="text-[19px] font-medium leading-[1.4] tracking-[-0.025em] text-[#F7F0E3]"
              >
                {service.title}
              </h3>

              <p className="mt-4 text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#F7F0E3]/65 sm:text-[14px]">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}