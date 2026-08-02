"use client";

import React from "react";
import Link from "next/link";
import { Check, Heart, ArrowRight } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

const cloudFeatures = [
  "Unlimited Goals & Habit Tracking",
  "365-Day GitHub-style Heatmaps",
  "Public Profile & Social Reputation",
  "Daily Execution Logs & Quick Notes",
  "Real-Time Velocity & Pace Analytics",
  "Follow Consistency Leaders & Feeds",
];

const selfHostFeatures = [
  "Full Source Code Access on GitHub",
  "One-Click Vercel & Neon DB Deploy",
  "NextAuth v5 (GitHub & Google OAuth)",
  "Total Data Privacy & Zero Lock-In",
  "Custom Domain & Branding Support",
  "Docker & Self-Hosting Guides Included",
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Section Header */}
      <div className="mb-12 border-b border-[#30363d] pb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#3fb950]/30 bg-[#3fb950]/15 px-3 py-1 text-xs font-semibold tracking-wider text-[#3fb950] uppercase">
          <Heart className="h-3.5 w-3.5 fill-[#3fb950]" />
          FREE & OPEN SOURCE
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Free forever. Open source. Self-hostable.
        </h2>
        <p className="mt-1 text-sm text-[#8b949e]">
          No paywalls or hidden subscriptions. Use Grova Cloud for free or
          deploy on your own server.
        </p>
      </div>

      {/* 2-Column Pricing Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* ── Plan 1: Grova Cloud (Free Forever) ── */}
        <div className="group block">
          <div className="relative flex h-full flex-col justify-between rounded-md bg-[#161b22] p-6 sm:p-8">
            <div className="flex flex-1 flex-col">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-[#8b949e] uppercase">
                  Grova Cloud
                </span>
                <span className="rounded border border-[#3fb950]/30 bg-[#3fb950]/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#3fb950]">
                  100% FREE FOREVER
                </span>
              </div>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  $0
                </span>
                <span className="text-sm text-[#8b949e]">/ forever</span>
              </div>

              <p className="mb-6 text-sm text-[#8b949e]">
                Hosted on high-speed serverless infrastructure. Start building
                habits and sharing proof of work immediately.
              </p>

              {/* Features List */}
              <div className="mt-auto mb-8 flex flex-col gap-3.5 border-t border-[#30363d]/60 pt-6">
                {cloudFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-[#e6edf3]"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3fb950]/15 text-[#3fb950]">
                      <Check className="h-3 w-3 stroke-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/login" className="block">
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#3fb950] px-6 py-2.5 text-sm font-semibold text-[#0d1117] transition-all hover:bg-[#3fb950]/90 active:scale-[0.98]">
                Get Started Free
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </Link>
          </div>
        </div>

        {/* ── Plan 2: Self-Hostable (Open Source) ── */}
        <div className="group block">
          <div className="relative flex h-full flex-col justify-between rounded-md bg-[#161b22] p-6 sm:p-8">
            <div className="flex flex-1 flex-col">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-[#8b949e] uppercase">
                  Self-Hosted & Open Source
                </span>
                <span className="rounded border border-[#58a6ff]/30 bg-[#58a6ff]/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#58a6ff]">
                  GITHUB REPO
                </span>
              </div>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Open Source
                </span>
                <span className="font-mono text-sm text-[#58a6ff]">MIT</span>
              </div>

              <p className="mb-6 text-sm text-[#8b949e]">
                Complete ownership of your data and code. Deploy on Vercel &
                Neon PostgreSQL or your own infrastructure.
              </p>

              {/* Features List */}
              <div className="mt-auto mb-8 flex flex-col gap-3.5 border-t border-[#30363d]/60 pt-6">
                {selfHostFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-[#e6edf3]"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#58a6ff]/15 text-[#58a6ff]">
                      <Check className="h-3 w-3 stroke-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://github.com/RanitManik/Grova"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[#30363d] bg-[#21262d] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#30363d] active:scale-[0.98]">
                <GithubIcon className="h-4 w-4" />
                Open Repository on GitHub
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
