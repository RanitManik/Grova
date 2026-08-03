"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function CtaCard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group block"
      >
        <div className="relative flex flex-col items-center justify-between rounded-md bg-[#161b22] p-12 text-center sm:p-16">
          {/* Header Badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#3fb950]/30 bg-[#3fb950]/15 px-3 py-1 text-xs font-semibold text-[#3fb950]">
            <Flame className="h-3.5 w-3.5 fill-[#3fb950]" />
            READY TO BUILD CONSISTENCY?
          </div>

          {/* Title */}
          <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl lg:text-4xl">
            Start building your streak today
          </h2>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#8b949e]">
            Turn daily effort into a 365-day contribution heatmap. Join
            thousands of builders shipping ambitious goals publicly.
          </p>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <Link href="/login">
              <button className="flex cursor-pointer items-center gap-2 rounded-md bg-[#3fb950] px-6 py-2.5 text-sm font-semibold text-[#0d1117] transition-all hover:bg-[#3fb950]/90 active:scale-[0.98]">
                Start your journey
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
