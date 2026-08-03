"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqList = [
  {
    question: "Is Grova really 100% free forever?",
    answer:
      "Yes, Grova Cloud is completely free for individuals and teams with no hidden fees, paywalls, or trial periods. You get unlimited goal creation, daily execution tracking, 365-day heatmaps, and public profile sharing right out of the box. We believe daily consistency tools should be accessible to every builder without barriers.",
  },
  {
    question: "How does the GitHub-style heatmap tracking work?",
    answer:
      "Every time you log progress or complete a goal, Grova records your contribution level for that date. The 365-day activity grid automatically calculates your daily intensity and updates your heatmap cells in real time with GitHub-style green shades—ranging from light green for single check-ins to deep emerald for heavy completion days.",
  },
  {
    question: "Can I self-host Grova on my own infrastructure?",
    answer:
      "Absolutely. Grova is 100% open source under permissive licensing. You can fork the repository on GitHub and deploy your own private instance to Vercel paired with Neon Serverless PostgreSQL in under 5 minutes. Full step-by-step self-hosting instructions, database migration scripts, and environment variable templates are included in the codebase documentation.",
  },
  {
    question: "Are my goal logs and profile public or private?",
    answer:
      "Grova is designed around the power of public accountability and social proof. Your public profile (e.g. grova.5dev.in/yourusername) displays your active goals, streak stats, and contribution heatmap so you can share your proof of work on Twitter, LinkedIn, or personal portfolios. However, you can manage individual goal visibility whenever needed.",
  },
  {
    question: "What goal types does Grova support?",
    answer:
      "Grova offers three versatile goal mechanics tailored to different habits: Cumulative Targets (e.g. read 50 books with automated daily pace calculations), Daily Recurring (e.g. 30 minutes of deep work or workout every day), and Weekly Recurring targets. Each mode features real-time velocity metrics and target completion percentages.",
  },
  {
    question: "How are streaks calculated?",
    answer:
      "Your active streak increments automatically when you complete at least one goal or log an activity within a 24-hour window. If you miss a day, your current streak resets to keep you accountable, but your longest streak metric and historical heatmap cells remain permanently saved on your profile grid as proof of past dedication.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      {/* Widespread Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 border-b border-[#30363d] pb-6 text-center"
      >
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#3fb950]/30 bg-[#3fb950]/15 px-3 py-1 text-xs font-semibold tracking-wider text-[#3fb950] uppercase">
          <HelpCircle className="h-3.5 w-3.5" />
          FREQUENTLY ASKED QUESTIONS
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Got questions? We&apos;ve got answers.
        </h2>
        <p className="mt-1 text-sm text-[#8b949e]">
          Everything you need to know about Grova, streaks, self-hosting, and
          privacy.
        </p>
      </motion.div>

      {/* Accordion FAQ Stack */}
      <div className="mx-auto flex max-w-3xl flex-col gap-3.5">
        {faqList.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="overflow-hidden rounded-md bg-[#161b22] transition-colors duration-150"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="group flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white transition-colors hover:bg-[#1f242c]"
                aria-expanded={isOpen}
              >
                <span className="pr-4 transition-colors group-hover:text-[#3fb950]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#8b949e] transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#3fb950]" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#30363d]/50 bg-[#161b22] px-5 py-4 text-sm leading-relaxed text-[#c9d1d9]">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
