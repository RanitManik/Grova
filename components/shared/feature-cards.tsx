"use client";

import React from "react";
import {
  Check,
  Flame,
  Calendar,
  Target,
  Globe,
  TrendingUp,
  Zap,
  FileText,
  Copy,
} from "lucide-react";

export function FeatureCards() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Header */}
      <div className="mb-12 border-b border-[#30363d] pb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#3fb950]/30 bg-[#3fb950]/15 px-3 py-1 text-xs font-semibold tracking-wider text-[#3fb950] uppercase">
          <Flame className="h-3.5 w-3.5" />
          BUILT FOR CONSISTENCY
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Why builders choose Grova
        </h2>
        <p className="mt-1 text-sm text-[#8b949e]">
          Discover how Grova simplifies habit consistency, streak tracking, and
          daily execution.
        </p>
      </div>

      {/* 6 Cards Grid (3x2 layout) */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* ── Card 1: Task & Activity Tracking ── */}
        <div className="group block">
          <div className="relative flex h-full flex-col rounded-md bg-[#161b22] p-5 transition-all group-hover:bg-[#1f242c]">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#30363d] bg-[#0d1117] text-sm font-bold text-[#3fb950]">
                  <Check className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-bold tracking-tight text-white">
                    Task & Activity Tracking
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium text-[#8b949e]">
                    Daily Queue & Execution
                  </div>
                </div>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(57,211,83,0.3)] bg-[rgba(57,211,83,0.1)] py-1 pr-2.5 pl-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#3fb950]" />
                <span className="text-[11px] font-bold text-[#3fb950]">
                  3/3 Done
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 flex-1">
              <p className="line-clamp-2 text-sm leading-relaxed text-[#8b949e]">
                Set daily tasks, schedule recurring goals, and log execution
                step by step.
              </p>
            </div>

            {/* Inner Mockup */}
            <div className="mt-auto flex h-35 flex-col justify-between rounded-lg border border-[#30363d]/60 bg-[#0d1117] p-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center rounded bg-[#3fb950] text-[#0d1117]">
                    <Check className="h-3 w-3 stroke-3" />
                  </div>
                  <span className="font-semibold text-[#e6edf3]">
                    Ship OAuth & Profile
                  </span>
                </div>
                <span className="rounded bg-[#58a6ff]/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#58a6ff]">
                  WORK
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center rounded bg-[#3fb950] text-[#0d1117]">
                    <Check className="h-3 w-3 stroke-3" />
                  </div>
                  <span className="font-semibold text-[#e6edf3]">
                    30-min Deep Workout
                  </span>
                </div>
                <span className="rounded bg-[#3fb950]/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#3fb950]">
                  HEALTH
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded border border-[#30363d] bg-[#161b22]" />
                  <span className="font-semibold text-[#e6edf3]">
                    Read 20 Pages
                  </span>
                </div>
                <span className="rounded bg-[#8957e5]/15 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#8957e5]">
                  70%
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-2 text-[10px]">
                <span className="flex items-center gap-1 text-[#8b949e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" />
                  Daily Execution Pace
                </span>
                <span className="font-mono font-bold text-[#3fb950]">
                  87% Complete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: GitHub-style Heatmaps ── */}
        <div className="group block">
          <div className="relative flex h-full flex-col rounded-md bg-[#161b22] p-5 transition-all group-hover:bg-[#1f242c]">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#30363d] bg-[#0d1117] text-sm font-bold text-[#00e676]">
                  <Flame className="h-5 w-5 fill-[#00e676]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-bold tracking-tight text-white">
                    GitHub-style Heatmaps
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium text-[#8b949e]">
                    365-Day Consistency
                  </div>
                </div>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(210,153,34,0.2)] bg-[rgba(210,153,34,0.1)] py-1 pr-2.5 pl-2">
                <Flame className="h-3.5 w-3.5 text-[#d29922]" />
                <span className="text-[11px] font-bold text-[#d29922]">
                  42d Streak
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 flex-1">
              <p className="line-clamp-2 text-sm leading-relaxed text-[#8b949e]">
                Transform your effort into color-coded heatmaps. Green proves
                consistency.
              </p>
            </div>

            {/* Inner Mockup */}
            <div className="mt-auto flex h-35 flex-col justify-between rounded-lg border border-[#30363d]/60 bg-[#0d1117] p-3">
              <div className="flex items-center justify-between text-[10px] text-[#8b949e]">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="h-3 w-3 text-[#3fb950]" />
                  2,340 Contributions in 2026
                </span>
                <span className="font-mono text-[#3fb950]">Less ── More</span>
              </div>

              {/* 22 columns grid spanning full width */}
              <div className="flex w-full justify-between gap-1 py-1">
                {Array.from({ length: 22 }).map((_, colIdx) => (
                  <div key={colIdx} className="flex flex-1 flex-col gap-1">
                    {Array.from({ length: 5 }).map((_, rowIdx) => {
                      const isFuture = colIdx >= 19;
                      const heatIndex = isFuture
                        ? 0
                        : (colIdx + rowIdx * 2) % 7 === 0
                          ? 1
                          : (colIdx * 3 + rowIdx) % 5 === 0
                            ? 4
                            : (colIdx + rowIdx) % 3 === 0
                              ? 3
                              : 2;
                      const heatClasses = [
                        "bg-[#161b22]",
                        "bg-[#0e4429]",
                        "bg-[#006d32]",
                        "bg-[#26a641]",
                        "bg-[#39d353]",
                      ];
                      return (
                        <div
                          key={rowIdx}
                          className={`h-2.5 w-full rounded-xs ${heatClasses[heatIndex]}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom stats row */}
              <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-2 text-[10px] text-[#8b949e]">
                <span>
                  Streak:{" "}
                  <strong className="font-mono text-white">🔥 42d</strong>
                </span>
                <span>
                  Logs: <strong className="font-mono text-white">2.3K</strong>
                </span>
                <span>
                  Done:{" "}
                  <strong className="font-mono text-[#3fb950]">94%</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 3: Public Profiles & Reputation ── */}
        <div className="group block">
          <div className="relative flex h-full flex-col rounded-md bg-[#161b22] p-5 transition-all group-hover:bg-[#1f242c]">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#30363d] bg-[#0d1117] text-sm font-bold text-[#58a6ff]">
                  <Target className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-bold tracking-tight text-white">
                    Public Profiles
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium text-[#8b949e]">
                    Reputation & Social Proof
                  </div>
                </div>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(88,166,255,0.3)] bg-[rgba(88,166,255,0.1)] py-1 pr-2.5 pl-2">
                <Globe className="h-3.5 w-3.5 text-[#58a6ff]" />
                <span className="text-[11px] font-bold text-[#58a6ff]">
                  Public
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 flex-1">
              <p className="line-clamp-2 text-sm leading-relaxed text-[#8b949e]">
                Your progress is your reputation. Share public proof of
                discipline.
              </p>
            </div>

            {/* Inner Mockup */}
            <div className="mt-auto flex h-35 flex-col justify-between rounded-lg border border-[#30363d]/60 bg-[#0d1117] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#238636] text-xs font-bold text-white">
                    AD
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-[#3fb950] ring-2 ring-[#0d1117]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#e6edf3]">
                      alexdev
                    </div>
                    <div className="text-[10px] text-[#8b949e]">
                      @alexdev · Consistency Leader
                    </div>
                  </div>
                </div>
                <span className="rounded border border-[#3fb950]/30 bg-[#3fb950]/15 px-2 py-0.5 text-[10px] font-bold text-[#3fb950]">
                  Top 5%
                </span>
              </div>

              <div className="flex items-center justify-between rounded border border-[#30363d]/40 bg-[#161b22] px-2.5 py-1.5 text-[10px]">
                <span className="text-[#8b949e]">Community Status</span>
                <span className="font-semibold text-white">
                  342 Followers · 5 Goals
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-2 text-[10px] text-[#8b949e]">
                <span className="flex items-center gap-1 font-mono text-[#58a6ff]">
                  <Copy className="h-3 w-3" /> grova.5dev.in/alexdev
                </span>
                <span className="font-semibold text-[#3fb950]">Live Feed</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 4: Analytics & Goal Velocity ── */}
        <div className="group block">
          <div className="relative flex h-full flex-col rounded-md bg-[#161b22] p-5 transition-all group-hover:bg-[#1f242c]">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#30363d] bg-[#0d1117] text-sm font-bold text-[#8957e5]">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-bold tracking-tight text-white">
                    Analytics & Velocity
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium text-[#8b949e]">
                    Goal Trends & Performance
                  </div>
                </div>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(137,87,229,0.3)] bg-[rgba(137,87,229,0.1)] py-1 pr-2.5 pl-2">
                <TrendingUp className="h-3.5 w-3.5 text-[#8957e5]" />
                <span className="text-[11px] font-bold text-[#8957e5]">
                  Analytics
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 flex-1">
              <p className="line-clamp-2 text-sm leading-relaxed text-[#8b949e]">
                Deep insights into your completion velocity, peak days, and
                category distribution.
              </p>
            </div>

            {/* Inner Mockup */}
            <div className="mt-auto flex h-35 flex-col justify-between rounded-lg border border-[#30363d]/60 bg-[#0d1117] p-3">
              <div>
                <div className="mb-1 flex justify-between text-[10px]">
                  <span className="font-medium text-white">
                    Daily Recurring
                  </span>
                  <span className="font-mono font-bold text-[#58a6ff]">
                    85%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full border border-[#30363d]/40 bg-[#161b22]">
                  <div className="h-full w-[85%] rounded-full bg-[#58a6ff]" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-[10px]">
                  <span className="font-medium text-white">
                    Streak Velocity
                  </span>
                  <span className="font-mono font-bold text-[#3fb950]">
                    98%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full border border-[#30363d]/40 bg-[#161b22]">
                  <div className="h-full w-[98%] rounded-full bg-[#3fb950]" />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-2 text-[10px] text-[#8b949e]">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#58a6ff]" />{" "}
                  Work 45%
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" />{" "}
                  Health 35%
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8957e5]" />{" "}
                  Study 20%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 5: Smart Goal Mechanics ── */}
        <div className="group block">
          <div className="relative flex h-full flex-col rounded-md bg-[#161b22] p-5 transition-all group-hover:bg-[#1f242c]">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#30363d] bg-[#0d1117] text-sm font-bold text-[#e3b341]">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-bold tracking-tight text-white">
                    Smart Goal Mechanics
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium text-[#8b949e]">
                    Flexible Target Types
                  </div>
                </div>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(227,179,65,0.3)] bg-[rgba(227,179,65,0.1)] py-1 pr-2.5 pl-2">
                <Zap className="h-3.5 w-3.5 text-[#e3b341]" />
                <span className="text-[11px] font-bold text-[#e3b341]">
                  Auto-Pace
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 flex-1">
              <p className="line-clamp-2 text-sm leading-relaxed text-[#8b949e]">
                Supports Cumulative, Daily Recurring, and Weekly Targets with
                auto-calculated daily pace.
              </p>
            </div>

            {/* Inner Mockup */}
            <div className="mt-auto flex h-35 flex-col justify-between rounded-lg border border-[#30363d]/60 bg-[#0d1117] p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  Read 50 Books in 2026
                </span>
                <span className="font-mono text-[10px] font-bold text-[#3fb950]">
                  34 / 50 Books
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full border border-[#30363d]/40 bg-[#161b22]">
                <div className="h-full w-[68%] rounded-full bg-[#3fb950]" />
              </div>

              <div className="flex items-center justify-between rounded border border-[#30363d]/40 bg-[#161b22] px-2.5 py-1 text-[10px]">
                <span className="text-[#8b949e]">Daily Required Pace</span>
                <span className="font-mono font-bold text-white">
                  1.2 pages/day
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-2 text-[10px] text-[#8b949e]">
                <span>Pace Metric</span>
                <span className="rounded bg-[#3fb950]/15 px-2 py-0.5 font-bold text-[#3fb950]">
                  ✓ On Track
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 6: Execution Log & Reflection ── */}
        <div className="group block">
          <div className="relative flex h-full flex-col rounded-md bg-[#161b22] p-5 transition-all group-hover:bg-[#1f242c]">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#30363d] bg-[#0d1117] text-sm font-bold text-[#3fb950]">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-bold tracking-tight text-white">
                    Daily Notes & Lock
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium text-[#8b949e]">
                    Reflect & Sync Day
                  </div>
                </div>
              </div>

              <div className="ml-2 flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(57,211,83,0.3)] bg-[rgba(57,211,83,0.1)] py-1 pr-2.5 pl-2">
                <FileText className="h-3.5 w-3.5 text-[#3fb950]" />
                <span className="text-[11px] font-bold text-[#3fb950]">
                  Notes
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 flex-1">
              <p className="line-clamp-2 text-sm leading-relaxed text-[#8b949e]">
                Attach daily execution notes, log progress, and lock the day
                when finished.
              </p>
            </div>

            {/* Inner Mockup */}
            <div className="mt-auto flex h-35 flex-col justify-between rounded-lg border border-[#30363d]/60 bg-[#0d1117] p-3">
              <div className="flex items-center justify-between text-[10px] text-[#8b949e]">
                <span className="font-semibold text-white">
                  Daily Log Entry
                </span>
                <span className="font-mono text-[#3fb950]">AUG 2, 2026</span>
              </div>

              <div className="rounded border border-[#30363d]/40 bg-[#161b22] p-2 text-[11px] leading-snug text-[#e6edf3] italic">
                &quot;Shipped auth refactor & database schemas cleanly today
                🚀&quot;
              </div>

              <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-2 text-[10px]">
                <span className="text-[#8b949e]">Execution Status</span>
                <span className="flex items-center gap-1 font-semibold text-[#3fb950]">
                  <Check className="h-3 w-3 stroke-[2.5]" /> Locked & Synced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
