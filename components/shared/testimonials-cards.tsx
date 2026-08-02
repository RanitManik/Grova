"use client";

import React from "react";
import { Flame, Star, Quote } from "lucide-react";

const testimonialsList = [
  {
    name: "Alex Chen",
    username: "alexchen_dev",
    role: "Full-Stack Engineer",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote:
      "Grova turned my daily habit tracking into a GitHub contribution board. Hitting a 60-day streak literally forced me to ship my SaaS.",
    metric: "2,140 Contributions",
  },
  {
    name: "Sarah Jenkins",
    username: "sarah_builds",
    role: "Indie Hacker & Creator",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    quote:
      "Public accountability is the ultimate cheat code. My followers on Grova keep me honest every single day when I log my writing targets.",
    metric: "48 Active Goals",
  },
  {
    name: "David Kim",
    username: "dkim_tech",
    role: "Core Maintainer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote:
      "The flexible target mechanics (Cumulative vs Daily Recurring) are incredible. It auto-calculates my daily reading pace perfectly.",
    metric: "98% Completion",
  },
  {
    name: "Elena Rostova",
    username: "elena_mind",
    role: "Mindfulness & Code",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    quote:
      "I use Grova for both deep work sessions and daily meditation. Seeing all my progress categories in one place is super empowering.",
    metric: "1,280 Logs",
  },
  {
    name: "Marcus Vance",
    username: "marcusv",
    role: "Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    quote:
      "The UI is clean, developer-native, and lightning fast. No fluff, just raw proof of work and streak metrics.",
    metric: "3,400 Contributions",
  },
  {
    name: "Priya Sharma",
    username: "priyacodes",
    role: "Backend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quote:
      "Sharing my public profile link on Twitter and LinkedIn has brought so much organic feedback and accountability to my open-source work.",
    metric: "520 Followers",
  },
];

export function TestimonialsCards() {
  return (
    <section
      id="testimonials"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Section Header */}
      <div className="mb-12 border-b border-[#30363d] pb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#3fb950]/30 bg-[#3fb950]/15 px-3 py-1 text-xs font-semibold tracking-wider text-[#3fb950] uppercase">
          <Quote className="h-3.5 w-3.5" />
          COMMUNITY REVIEWS
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Loved by consistent builders
        </h2>
        <p className="mt-1 text-sm text-[#8b949e]">
          See how individuals and teams use Grova to build daily momentum and
          show proof of execution.
        </p>
      </div>

      {/* 3x2 Grid Layout */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsList.map((item, idx) => (
          <div key={idx} className="group block">
            <div className="relative flex h-full flex-col justify-between rounded-md bg-[#161b22] p-6 transition-all duration-200 group-hover:bg-[#1f242c]">
              <div>
                {/* Top User Info Header */}
                <div className="mb-4 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-10 w-10 shrink-0 rounded-full border border-[#30363d] object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold tracking-tight text-white">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#8b949e]">
                      @{item.username} · {item.role}
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="mb-3 flex items-center gap-1 text-[#e3b341]">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="h-3.5 w-3.5 fill-[#e3b341]"
                    />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="mb-6 text-sm leading-relaxed text-[#c9d1d9]">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              {/* Bottom Metrics Pill */}
              <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-3 text-[11px]">
                <span className="flex items-center gap-1 text-[#8b949e]">
                  <Flame className="h-3 w-3 text-[#3fb950]" /> Verified Builder
                </span>
                <span className="font-mono font-semibold text-white">
                  {item.metric}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
