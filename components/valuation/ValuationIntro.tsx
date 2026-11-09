import type { ReactNode } from "react";

function IntroIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-12 w-12 shrink-0 text-[#9A7A3B]"
    >
      {children}
    </svg>
  );
}

const preparationItems = [
  {
    title: "Your timepiece",
    description: "Brand, model & reference",
    icon: (
      <IntroIcon>
        <path d="m17 11 2-8h10l2 8M17 37l2 8h10l2-8" />
        <circle cx="24" cy="24" r="15" />
        <path d="M24 15v9l6 4M39 21h3v6h-3" />
      </IntroIcon>
    ),
  },
  {
    title: "Box & papers",
    description: "Include what you have",
    icon: (
      <IntroIcon>
        <path d="M12 4h17l9 9v31H12z" />
        <path d="M29 4v10h9M18 22h14M18 29h14M18 36h10" />
      </IntroIcon>
    ),
  },
  {
    title: "Clear photographs",
    description: "Dial, case & bracelet",
    icon: (
      <IntroIcon>
        <path d="M5 14h10l4-6h10l4 6h10v26H5z" />
        <circle cx="24" cy="27" r="9" />
        <path d="M36 19h2" />
      </IntroIcon>
    ),
  },
];

export default function ValuationIntro() {
  return (
    <section
      aria-labelledby="watch-enquiry-heading"
      className="border-y border-[#C8A75E]/45 bg-[#F7F0E3] px-5 py-12 text-[#30104B] sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9A7A3B] sm:text-xs">
            Tell Us About Your Watch
          </p>

          <h2
            id="watch-enquiry-heading"
            className="mt-5 text-3xl font-normal leading-[1.15] tracking-[-0.025em] text-[#30104B] sm:text-4xl lg:text-5xl"
            style={{
              fontFamily:
                'var(--font-heading, Georgia), "Times New Roman", serif',
            }}
          >
            Begin Your Private Enquiry
          </h2>

          <div
            aria-hidden="true"
            className="mt-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-[#B49352]" />
            <span className="h-2 w-2 rotate-45 bg-[#B49352]" />
            <span className="h-px w-12 bg-[#B49352]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#514758] sm:text-base">
            Share your watch details and clear photographs.
            We&apos;ll guide you through the rest.
          </p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl list-none grid-cols-1 p-0 md:mt-12 md:grid-cols-3">
          {preparationItems.map((item, index) => (
            <li
              key={item.title}
              className={`flex min-w-0 items-center gap-5 py-6 md:justify-center md:px-5 md:py-2 ${
                index > 0
                  ? "border-t border-[#C8A75E]/35 md:border-t-0 md:border-l"
                  : ""
              }`}
            >
              {item.icon}

              <div className="min-w-0">
                <h3
                  className="m-0 text-xl font-normal leading-7 text-[#30104B]"
                  style={{
                    fontFamily:
                      'var(--font-heading, Georgia), "Times New Roman", serif',
                  }}
                >
                  {item.title}
                </h3>

                <p className="mb-0 mt-1 text-xs leading-6 text-[#65566D] sm:text-sm">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mb-0 mt-9 text-center text-[10px] leading-6 tracking-[0.14em] text-[#796982] sm:mt-11 sm:text-xs">
          A considered next chapter for your timepiece.
        </p>
      </div>
    </section>
  );
}