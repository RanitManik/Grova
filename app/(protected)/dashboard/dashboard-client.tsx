"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { CheckCircle2, Clock, SkipForward, Target } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogStatus = "PENDING" | "COMPLETED" | "SKIPPED" | "PARTIAL";

interface LogEntry {
  id: string;
  title: string;
  category: string;
  dailyTarget: number;
  unit: string;
  color: string;
  status: LogStatus;
  completedAmount: number;
  isOverdue: boolean;
}

interface DashboardClientProps {
  user: {
    name?: string | null;
    username?: string | null;
    currentStreak: number;
    longestStreak: number;
    totalContributions: number;
  };
  today: string;
  logEntries: LogEntry[];
  progressPercent: number;
  completedGoals: number;
  totalGoals: number;
  skippedGoals: number;
  tomorrowGoals: { title: string; dailyTarget: number; unit: string }[];
  activityByDate: Record<string, number>;
  initialNote: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const categoryVariants: Record<
  string,
  "info" | "purple" | "primary" | "warning" | "default"
> = {
  WORK: "info",
  STUDY: "purple",
  HEALTH: "primary",
  MINDFULNESS: "warning",
  FINANCE: "primary",
  CREATIVE: "purple",
  SOCIAL: "info",
  OTHER: "default",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const statusConfig = {
  PENDING: {
    icon: Clock,
    className: "text-subtle-foreground",
    label: "Pending",
  },
  COMPLETED: {
    icon: CheckCircle2,
    className: "text-primary-glow",
    label: "Done",
  },
  SKIPPED: { icon: SkipForward, className: "text-warning", label: "Skipped" },
  PARTIAL: { icon: Clock, className: "text-info", label: "Partial" },
};

export function DashboardClient({
  user,
  today,
  logEntries: initialEntries,
  totalGoals,
  tomorrowGoals,
  activityByDate,
  initialNote,
}: DashboardClientProps) {
  const [entries, setEntries] = useState(initialEntries);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [note, setNote] = useState(initialNote);
  const [noteDebounce, setNoteDebounce] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [noteStatus, setNoteStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  const [activeRow, setActiveRow] = useState<number>(0);
  const [weeksToRender, setWeeksToRender] = useState(19);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);

  const todayDate = new Date(today);
  const dateLabel = format(todayDate, "EEEE, MMM d").toUpperCase();

  const completedCount = entries.filter((e) => e.status === "COMPLETED").length;
  const progress =
    totalGoals > 0 ? Math.round((completedCount / totalGoals) * 100) : 0;

  const toggleStatus = useCallback(
    async (idx: number) => {
      const entry = entries[idx];
      if (!entry) return;

      const newStatus: LogStatus =
        entry.status === "PENDING"
          ? "COMPLETED"
          : entry.status === "COMPLETED"
            ? "SKIPPED"
            : "PENDING";

      // Optimistic update
      setEntries((prev) =>
        prev.map((e, i) =>
          i === idx
            ? {
                ...e,
                status: newStatus,
                completedAmount: newStatus === "COMPLETED" ? e.dailyTarget : 0,
              }
            : e,
        ),
      );

      try {
        await fetch("/api/logs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            goalId: entry.id,
            date: format(new Date(today), "yyyy-MM-dd"),
            completedAmount: newStatus === "COMPLETED" ? entry.dailyTarget : 0,
            status: newStatus,
          }),
        });

        if (newStatus === "COMPLETED") {
          toast.success(`✅ ${entry.title} completed!`);
        }
      } catch {
        toast.error("Failed to save — try again");
      }
    },
    [entries, today],
  );

  // Keyboard shortcuts: J/K to navigate, Space to toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "j" || e.key === "J") {
        setActiveRow((prev) => Math.min(prev + 1, entries.length - 1));
      } else if (e.key === "k" || e.key === "K") {
        setActiveRow((prev) => Math.max(prev - 1, 0));
      } else if (e.key === " ") {
        e.preventDefault();
        toggleStatus(activeRow);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeRow, entries.length, toggleStatus]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNoteChange = (value: string) => {
    setNote(value);
    setNoteStatus("saving");
    if (noteDebounce) clearTimeout(noteDebounce);
    const t = setTimeout(async () => {
      try {
        await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: value }),
        });
        setNoteStatus("saved");
        setTimeout(() => setNoteStatus("idle"), 2000);
      } catch {
        setNoteStatus("idle");
      }
    }, 1000);
    setNoteDebounce(t);
  };

  // Dynamic heatmap width
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const width = entries[0].contentRect.width;
        // Each week column is 11px wide + 3px gap = 14px.
        const calculatedWeeks = Math.floor((width + 3) / 14);
        setWeeksToRender(Math.max(1, Math.min(calculatedWeeks, 52)));
      }
    });

    if (heatmapContainerRef.current) {
      observer.observe(heatmapContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Mini activity heatmap (dynamic width)
  const heatmapWeeks: { date: string; intensity: number }[][] = [];
  for (let w = weeksToRender - 1; w >= 0; w--) {
    const week: { date: string; intensity: number }[] = [];
    for (let d = 6; d >= 0; d--) {
      const date = new Date(todayDate);
      date.setDate(todayDate.getDate() - w * 7 - d);
      const dateStr = format(date, "yyyy-MM-dd");
      const count = activityByDate[dateStr] ?? 0;
      week.push({
        date: dateStr,
        intensity: count === 0 ? 0 : count === 1 ? 2 : count <= 3 ? 3 : 4,
      });
    }
    heatmapWeeks.push(week);
  }

  const heatClasses = [
    "bg-[rgba(255,255,255,0.04)]",
    "bg-[#0e4429]",
    "bg-[#006d32]",
    "bg-[#26a641]",
    "bg-[#39d353]",
  ];

  return (
    <div className="animate-fade-in w-full font-sans">
      {/* Header */}
      <div className="mt-4 mb-8">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#39d353] uppercase">
          <div className="h-2 w-2 rounded-full bg-[#39d353]"></div>
          Live Execution
        </div>
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          {dateLabel.split(",")[0]},{" "}
          <span className="text-white">{dateLabel.split(",")[1]}</span>
        </h1>
        <div className="text-sm font-medium text-[#8b949e]">
          Focus: Deep Work & Algorithms
        </div>
      </div>

      <div className="mb-10 h-px w-full bg-[#30363d]"></div>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left Column */}
        <div className="min-w-0 flex-1">
          {/* Queue Header */}
          <div className="mb-4 flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold tracking-wide text-white">
              Today&apos;s Queue
            </h2>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#8b949e]">
              <span className="flex items-center gap-1">
                <span className="rounded border border-[#30363d] bg-[#161b22] px-1.5 py-0.5 text-white">
                  J
                </span>{" "}
                Next
              </span>
              <span className="flex items-center gap-1">
                <span className="rounded border border-[#30363d] bg-[#161b22] px-1.5 py-0.5 text-white">
                  K
                </span>{" "}
                Prev
              </span>
              <span className="flex items-center gap-1">
                <span className="rounded border border-[#30363d] bg-[#161b22] px-1.5 py-0.5 text-white">
                  SPC
                </span>{" "}
                Toggle
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="mb-12 overflow-hidden rounded-md border border-[#30363d] bg-[#0d1117]">
            {/* Grid Header */}
            <div className="grid grid-cols-[1fr_100px_100px_120px] gap-6 border-b border-[#30363d] bg-[#161b22]/80 px-6 py-3">
              <div className="text-[10px] font-bold tracking-widest text-[#8b949e] uppercase">
                Task / Goal
              </div>
              <div className="text-[10px] font-bold tracking-widest text-[#8b949e] uppercase">
                Metric
              </div>
              <div className="text-[10px] font-bold tracking-widest text-[#8b949e] uppercase">
                Tag
              </div>
              <div className="text-right text-[10px] font-bold tracking-widest text-[#8b949e] uppercase">
                Action
              </div>
            </div>

            {/* Rows */}
            {entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Target className="mb-3 h-10 w-10 text-[#8b949e]" />
                <p className="text-sm font-medium text-[#8b949e]">
                  No active goals for today
                </p>
                <Link href="/goals?action=new" className="mt-4">
                  <button className="rounded-md border border-[rgba(255,255,255,0.1)] bg-[#238636] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2ea043]">
                    Create Goal
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col">
                {entries.map((entry, idx) => {
                  const isActive = activeRow === idx;
                  const isCompleted = entry.status === "COMPLETED";
                  const isSkipped = entry.status === "SKIPPED";

                  // Tag styling based on category
                  let tagColor = "text-[#8b949e] border-[#30363d] bg-[#161b22]";
                  if (entry.category === "WORK")
                    tagColor = "text-[#58a6ff] border-[#1f3a5f] bg-[#0d223f]";
                  else if (
                    entry.category === "DEV" ||
                    entry.category === "STUDY"
                  )
                    tagColor = "text-[#d2a8ff] border-[#3c1e5a] bg-[#271042]";
                  else if (entry.category === "HEALTH")
                    tagColor = "text-[#f85149] border-[#4a1818] bg-[#321115]";
                  else if (entry.category === "LIFE")
                    tagColor = "text-[#39d353] border-[#184a25] bg-[#11321d]";
                  else if (entry.category === "CREATIVE")
                    tagColor = "text-[#ff7b72] border-[#4a2422] bg-[#321817]";

                  return (
                    <div
                      key={entry.id}
                      onClick={() => setActiveRow(idx)}
                      className={cn(
                        "relative grid cursor-pointer grid-cols-[1fr_100px_100px_120px] items-center gap-6 border-b border-[#30363d] px-6 py-4 transition-colors last:border-b-0",
                        isActive ? "bg-[#161b22]" : "hover:bg-[#161b22]/50",
                      )}
                    >
                      {/* Active highlight bar on left */}
                      {isActive && (
                        <div className="absolute top-0 bottom-0 left-0 w-0.75 bg-[#58a6ff]" />
                      )}

                      {/* Task / Goal */}
                      <div className="flex flex-col gap-1 truncate pr-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "truncate text-sm font-semibold",
                              isCompleted || isSkipped
                                ? "text-[#8b949e]"
                                : "text-white",
                              isCompleted && "text-[#8b949e] line-through",
                            )}
                          >
                            {entry.title}
                          </span>
                          {entry.isOverdue && !isCompleted && !isSkipped && (
                            <div className="h-1.5 w-1.5 rounded-full bg-[#d29922]"></div>
                          )}
                        </div>
                        {entry.isOverdue && !isCompleted && !isSkipped ? (
                          <span className="text-[11px] font-medium text-[#d29922]">
                            Overdue from yesterday
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#8b949e]">
                            {entry.category.charAt(0).toUpperCase() +
                              entry.category.slice(1).toLowerCase()}
                          </span>
                        )}
                      </div>

                      {/* Metric */}
                      <div className="flex items-center">
                        <span
                          className={cn(
                            "rounded-md border font-mono text-[11px]",
                            isCompleted
                              ? "border-transparent bg-transparent px-0 text-[#39d353] line-through"
                              : isSkipped
                                ? "border-transparent bg-transparent px-0 text-[#8b949e] line-through"
                                : "border-[#30363d] bg-transparent px-2.5 py-1 text-[#c9d1d9]",
                          )}
                        >
                          {entry.dailyTarget}
                          {entry.unit === "count" ? "" : " " + entry.unit}
                        </span>
                      </div>

                      {/* Tag */}
                      <div className="flex items-center">
                        <span
                          className={cn(
                            "rounded border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase",
                            tagColor,
                          )}
                        >
                          {entry.category}
                        </span>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-end gap-2">
                        {isCompleted ? (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#39d353] uppercase">
                            <CheckCircle2 className="h-4 w-4" />
                            Done
                          </div>
                        ) : isSkipped ? (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#8b949e] uppercase">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#8b949e]">
                              <div className="h-px w-2 bg-[#8b949e]"></div>
                            </div>
                            Skipped
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStatus(idx);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded border border-[#30363d] text-[#8b949e] transition-colors hover:border-[#2ea043] hover:bg-[#238636] hover:text-white"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                            <button className="flex h-7 w-7 items-center justify-center rounded border border-[#30363d] text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-white">
                              <SkipForward className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Vertical Separator */}
        <div className="hidden w-px shrink-0 bg-[#30363d] lg:block" />

        {/* Right Sidebar */}
        <div className="flex w-full shrink-0 flex-col gap-6 lg:w-75">
          {/* Daily Velocity */}
          <div className="w-full">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-xs text-[#8b949e]">
                Daily Velocity
              </span>
              <span className="text-xs font-bold text-white">{progress}%</span>
            </div>
            <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-[#21262d]">
              <div
                className="h-full rounded-full bg-[#39d353] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-[#8b949e] uppercase">
              <span>
                {completedCount}/{totalGoals} DONE
              </span>
              <span>{totalGoals - completedCount} REM</span>
            </div>
          </div>

          {/* Activity mini-heatmap */}
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Activity</span>
              <Link
                href={`/${user.username}`}
                className="text-xs text-[#58a6ff] transition-colors hover:underline"
              >
                View full
              </Link>
            </div>
            <div
              ref={heatmapContainerRef}
              className="flex justify-end gap-0.75 overflow-hidden"
            >
              {heatmapWeeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.75">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={cn(
                        "h-2.75 w-2.75 rounded-xs",
                        heatClasses[day.intensity],
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-[#8b949e]">
              Current Streak:{" "}
              <span className="font-semibold text-[#39d353]">
                {user.currentStreak} Days
              </span>
            </div>
          </div>

          {/* On Deck - Tomorrow */}
          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4">
            <div className="mb-3 text-sm font-semibold text-white">
              On Deck (Tomorrow)
            </div>
            {tomorrowGoals.length === 0 ? (
              <p className="text-xs text-[#8b949e]">No upcoming goals</p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {tomorrowGoals.slice(0, 4).map((goal, i) => (
                  <div
                    key={i}
                    className="group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117]" />
                      <span className="text-xs font-medium text-[#c9d1d9] transition-colors group-hover:text-[#58a6ff]">
                        {goal.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#8b949e]">
                      {goal.dailyTarget}
                      {goal.unit === "count" ? "" : " " + goal.unit}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
