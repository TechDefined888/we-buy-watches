"use client";

import Link from "next/link";
import { useRef, useState, type ChangeEvent } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [soundOn, setSoundOn] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const toggleSound = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (soundOn) {
      video.muted = true;
      setSoundOn(false);
      return;
    }

    const nextVolume = volume > 0 ? volume : 0.7;

    video.volume = nextVolume;
    video.muted = false;
    setVolume(nextVolume);

    try {
      await video.play();
      setSoundOn(true);
    } catch (error) {
      video.muted = true;
      setSoundOn(false);
      console.error("Unable to enable video sound:", error);
    }
  };

  const handleVolumeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const nextVolume = Number(event.target.value);
    const video = videoRef.current;

    setVolume(nextVolume);

    if (!video) return;

    video.volume = nextVolume;
    video.muted = nextVolume === 0;

    setSoundOn(nextVolume > 0);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="
        relative isolate flex w-full items-center overflow-hidden bg-black
        min-h-[calc(100svh-150px)]
        min-[480px]:min-h-[calc(100svh-154px)]
        lg:min-h-[calc(100svh-170px)]
      "
      style={{
        fontFamily: "var(--font-nav, Arial), sans-serif",
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source
          src="/videos/hero-watch.mp4"
          type="video/mp4"
        />

        Your browser does not support the video tag.
      </video>

      {/* Left shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.74) 28%, rgba(0,0,0,0.28) 54%, rgba(0,0,0,0) 76%)",
        }}
      />

      {/* Purple glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 5% 58%, rgba(48,16,75,0.62) 0%, rgba(48,16,75,0.27) 30%, rgba(48,16,75,0.06) 50%, transparent 69%)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.34) 0%, transparent 25%)",
        }}
      />

      {/* Content */}
      <div
        className="
          relative z-20 mx-auto w-full max-w-[1600px]
          px-6 pb-28 pt-12
          sm:px-10 sm:pb-28 sm:pt-16
          lg:px-16 lg:py-20
          xl:px-20
        "
      >
        <div className="max-w-[720px]">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0 bg-[#C8A75E]/70"
            />

            <p className="m-0 text-[9px] font-medium uppercase leading-5 tracking-[0.3em] text-[#D8BA73] sm:text-[10px]">
              WE BUY WATCHES
            </p>
          </div>

          <h1
            id="hero-heading"
            style={{
              fontFamily: "var(--font-nav, Arial), sans-serif",
              fontWeight: 400,
            }}
            className="
              mt-7 text-[clamp(2rem,5vw,4.5rem)]
              leading-[1.12] tracking-[-0.045em] text-[#F7F0E3]
            "
          >
            Looking to Sell

            <span className="mt-2 block text-[#D8BA73]">
              Your Luxury Watch?
            </span>
          </h1>

          <p className="mt-7 max-w-[480px] text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-[#E8E1EC]/80 sm:text-[14px]">
            From sought-after Rolex references to exceptional
            collector timepieces, tell us about your watch and
            connect with our participating Australian luxury watch
            buyer to explore a potential offer.
          </p>

          <div className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
            <Link
              href="/sell-luxury-watches"
              className="
                group inline-flex min-h-[52px] max-w-full
                items-center justify-center gap-6
                rounded-[3px] border border-[#D8BA73]
                bg-[#D8BA73] px-7 py-4
                text-[9px] font-semibold uppercase
                tracking-[0.14em] text-[#211A26]!
                transition-colors duration-300
                hover:border-[#E7CC96] hover:bg-[#E7CC96]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#D8BA73]
                sm:text-[10px]
              "
            >
              <span>REQUEST A PRIVATE VALUATION</span>

              <span
                aria-hidden="true"
                className="shrink-0 text-lg font-normal leading-none transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
              >
                →
              </span>
            </Link>

            <Link
              href="/how-it-works"
              className="
                group inline-flex min-h-[44px]
                items-center gap-4
                border-b border-[#F7F0E3]/30 py-2
                text-[9px] font-medium uppercase
                tracking-[0.18em] text-[#F7F0E3]!
                transition-colors duration-300
                hover:border-[#D8BA73]
                hover:text-[#D8BA73]!
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#D8BA73]
                sm:text-[10px]
              "
            >
              HOW IT WORKS

              <span
                aria-hidden="true"
                className="text-base transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Audio controls */}
      <div className="group absolute bottom-6 right-6 z-30 flex flex-col items-center sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10">
        <div
          className="
            pointer-events-none mb-3 flex h-0 w-12
            items-center justify-center overflow-hidden
            rounded-full border border-white/40
            bg-black/85 opacity-0
            shadow-[0_10px_30px_rgba(0,0,0,0.45)]
            transition-all duration-300
            group-hover:pointer-events-auto
            group-hover:h-[118px]
            group-hover:opacity-100
            group-focus-within:pointer-events-auto
            group-focus-within:h-[118px]
            group-focus-within:opacity-100
            motion-reduce:transition-none
          "
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Video volume"
            className="h-[85px] w-4 cursor-pointer accent-white"
            style={{
              writingMode: "vertical-lr",
              direction: "rtl",
            }}
          />
        </div>

        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute video" : "Unmute video"}
          title={soundOn ? "Mute" : "Unmute"}
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full border border-white/50
            bg-black/85 text-white
            shadow-[0_10px_30px_rgba(0,0,0,0.45)]
            transition-colors duration-300
            hover:border-white hover:bg-white hover:text-black
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-[#D8BA73]
            motion-reduce:transition-none
          "
        >
          {soundOn ? <VolumeOnIcon /> : <VolumeOffIcon />}
        </button>
      </div>
    </section>
  );
}

function VolumeOnIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 5L6 9H2V15H6L11 19V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M15 9.5C16.3 10.8 16.3 13.2 15 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M18 7C20.8 9.8 20.8 14.2 18 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 5L6 9H2V15H6L11 19V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16 10L21 15M21 10L16 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}