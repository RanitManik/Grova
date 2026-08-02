"use client";

import Link from "next/link";
import Image from "next/image";
import { HeroGlowArc } from "@/components/shared/hero-glow-arc";

interface HeroSectionProps {
  loggedInUser?: {
    name?: string | null;
    username?: string | null;
    image?: string | null;
    currentStreak?: number;
  } | null;
}

export function HeroSection({ loggedInUser }: HeroSectionProps) {
  return (
    <>
      <section
        id="home"
        className="mx-auto max-w-7xl px-4 pt-28 pb-8 text-center sm:px-6"
      >
        {/* Hero Title */}
        <h1 className="mx-auto max-w-4xl text-4xl leading-[1.12] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
          Build streaks. <span className="text-[#3fb950]">Ship goals.</span>
          <br />
          Show your growth.
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-[#8b949e] sm:text-lg">
          Grova is a public productivity tracker where your progress is your
          reputation. <br className="hidden lg:block" /> Set ambitious goals,
          log daily, and let the world see your consistency.
        </p>

        {/* Hero CTA Button */}
        <div className="mt-8 flex justify-center">
          <Link href={loggedInUser ? "/dashboard" : "/login"}>
            <button className="flex cursor-pointer items-center rounded-md bg-[#3fb950] px-6 py-2 text-sm font-semibold text-[#0d1117] transition-all hover:bg-[#3fb950]/90 active:scale-[0.98]">
              {loggedInUser ? "Open Dashboard" : "Start your journey"}
            </button>
          </Link>
        </div>

        {/* Glowing Light Beam Arc Effect */}
        <HeroGlowArc />
      </section>

      {/* ── Product Preview Image ── */}
      <section
        id="preview"
        className="mx-auto -mt-4 max-w-7xl px-4 pb-20 sm:px-6"
      >
        <Image
          src="/hero-product-preview.png"
          alt="Grova Product Preview"
          width={1600}
          height={1000}
          className="h-auto w-full rounded-xl object-cover"
          priority
        />
      </section>
    </>
  );
}
