"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Calendar,
  Zap,
  Trophy,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const benefitsList = [
  {
    icon: ShieldCheck,
    title: "Public Accountability",
    description:
      "Sharing your goals publicly creates positive social commitment. Watch your consistency surge when the world is watching your progress.",
    badgeColor: "text-[#3fb950]",
  },
  {
    icon: Calendar,
    title: "365-Day Visual Momentum",
    description:
      "Transform daily effort into color-coded contribution heatmaps. Seeing your green streak growing every single day makes quitting impossible.",
    badgeColor: "text-[#58a6ff]",
  },
  {
    icon: Zap,
    title: "Flexible Goal Mechanics",
    description:
      "Whether tracking cumulative targets, daily recurring habits, or weekly routines, Grova automatically calculates your required daily pace.",
    badgeColor: "text-[#e3b341]",
  },
  {
    icon: Trophy,
    title: "Social Proof & Reputation",
    description:
      "Your public profile acts as a verifiable portfolio of discipline. Share your achievements, gain followers, and inspire fellow builders.",
    badgeColor: "text-[#d29922]",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Velocity Analytics",
    description:
      "Understand your peak performance days, completion rates, and streak velocity across categories like Work, Study, Health, and Mindfulness.",
    badgeColor: "text-[#8957e5]",
  },
  {
    icon: Sparkles,
    title: "Zero Setup Required",
    description:
      "Start tracking in seconds with zero complex configuration. Clean, fast developer-first UI built to keep you focused on execution.",
    badgeColor: "text-[#3fb950]",
  },
];

export function BenefitsCards() {
  return (
    <section
      id="benefits"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 border-b border-[#30363d] pb-6 text-center"
      >
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#3fb950]/30 bg-[#3fb950]/15 px-3 py-1 text-xs font-semibold tracking-wider text-[#3fb950] uppercase">
          <Sparkles className="h-3.5 w-3.5" />
          KEY ADVANTAGES
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Everything you need to stay consistent
        </h2>
        <p className="mt-1 text-sm text-[#8b949e]">
          Built to help you maintain momentum, track progress, and showcase your
          discipline.
        </p>
      </motion.div>

      {/* 3x2 Grid Layout matching reference design */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {benefitsList.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group block"
            >
              <div className="relative flex h-full flex-col justify-between rounded-md bg-[#161b22] p-6 transition-all duration-200 group-hover:bg-[#1f242c]">
                <div>
                  {/* Top-left Icon Badge */}
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#30363d] bg-[#0d1117]">
                    <Icon className={`h-5 w-5 ${benefit.badgeColor}`} />
                  </div>

                  {/* Benefit Title */}
                  <h3 className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-[#3fb950]">
                    {benefit.title}
                  </h3>

                  {/* Benefit Description */}
                  <p className="mt-2 text-sm leading-relaxed text-[#8b949e]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
