import Link from "next/link";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="flex min-h-[60vh] items-center justify-center bg-[#F7F0E3] px-6 py-20 text-center"
      style={{
        fontFamily: "var(--font-nav), Arial, sans-serif",
      }}
    >
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9A7A3B]">
          Error 404
        </p>

        <h1
          id="not-found-heading"
          className="mt-5 text-3xl font-medium text-[#211A26] sm:text-5xl"
          style={{ fontFamily: "inherit" }}
        >
          Page not found
        </h1>

        <p className="mt-5 text-sm leading-7 text-[#211A26]/70">
          The page you are looking for may have moved or is no
          longer available.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded bg-[#30104B] px-7 py-3 text-sm font-semibold text-white! transition-colors hover:bg-[#452064] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#30104B]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}