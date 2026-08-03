"use client";

import Link from "next/link";
import Image from "next/image";
import { HeroGlowArc } from "@/components/shared/hero-glow-arc";
import { motion } from "framer-motion";

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
          <motion.span
            initial={{ opacity: 0, y: 35, filter: "blur(12px)", scale: 0.96 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            Build streaks.{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 35, filter: "blur(12px)", scale: 0.96 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-[#3fb950]"
          >
            Ship goals.
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 35, filter: "blur(12px)", scale: 0.96 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            Show your growth.
          </motion.span>
        </h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-[#8b949e] sm:text-lg"
        >
          Grova is a public productivity tracker where your progress is your
          reputation. <br className="hidden lg:block" /> Set ambitious goals,
          log daily, and let the world see your consistency.
        </motion.p>

        {/* Hero CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-8 flex justify-center"
        >
          <Link href={loggedInUser ? "/dashboard" : "/login"}>
            <button className="flex cursor-pointer items-center rounded-md bg-[#3fb950] px-6 py-2 text-sm font-semibold text-[#0d1117] transition-all hover:bg-[#3fb950]/90 active:scale-[0.98]">
              {loggedInUser ? "Open Dashboard" : "Start your journey"}
            </button>
          </Link>
        </motion.div>

        {/* Glowing Light Beam Arc Effect */}
        <HeroGlowArc />
      </section>

      {/* ── Product Preview Image ── */}
      <motion.section
        id="preview"
        initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.9,
          delay: 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
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
      </motion.section>
    </>
  );
}
