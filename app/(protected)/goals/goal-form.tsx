"use client";

import { useState, useMemo } from "react";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { format, addDays, differenceInDays } from "date-fns";
import {
  Target,
  Calendar,
  X,
  Briefcase,
  BookOpen,
  Heart,
  Leaf,
  DollarSign,
  Palette,
  Users,
} from "lucide-react";
import { cn, calcDailyTarget } from "@/lib/utils";

type GoalType = "TOTAL_TARGET" | "DAILY_RECURRING" | "WEEKLY_RECURRING";
type Category =
  | "WORK"
  | "STUDY"
  | "HEALTH"
  | "MINDFULNESS"
  | "FINANCE"
  | "CREATIVE"
  | "SOCIAL"
  | "OTHER";

const CATEGORIES: {
  value: Category;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: "WORK", label: "Work", icon: Briefcase },
  { value: "STUDY", label: "Study", icon: BookOpen },
  { value: "HEALTH", label: "Health", icon: Heart },
  { value: "MINDFULNESS", label: "Mindfulness", icon: Leaf },
  { value: "FINANCE", label: "Finance", icon: DollarSign },
  { value: "CREATIVE", label: "Creative", icon: Palette },
  { value: "SOCIAL", label: "Social", icon: Users },
  { value: "OTHER", label: "Other", icon: Target },
];

const COLORS = [
  "#238636",
  "#1f6feb",
  "#8957e5",
  "#e3b341",
  "#f85149",
  "#fb923c",
  "#22d3ee",
  "#ec4899",
];

interface GoalFormProps {
  onCancel: () => void;
}

export function GoalForm({ onCancel }: GoalFormProps) {
  const router = useRouter();
  const today = new Date();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState<GoalType>("TOTAL_TARGET");
  const [title, setTitle] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("OTHER");
  const [color, setColor] = useState(COLORS[0]);
  const [targetAmount, setTargetAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [startDate, setStartDate] = useState(format(today, "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(
    format(addDays(today, 90), "yyyy-MM-dd"),
  );
  const [loading, setLoading] = useState(false);

  // Calculated pace
  const pace = useMemo(() => {
    const target = parseFloat(targetAmount);
    if (!target || !startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, differenceInDays(end, start));

    const dailyTarget = calcDailyTarget(target, start, end);
    return { dailyTarget, totalDays: days, target, unit };
  }, [targetAmount, startDate, endDate, unit]);

  const isValid =
    title.trim() &&
    targetAmount &&
    parseFloat(targetAmount) > 0 &&
    unit.trim() &&
    startDate &&
    endDate;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);

    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          type,
          category,
          color,
          targetAmount: parseFloat(targetAmount),
          unit: unit.trim(),
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          isPublic: true,
          status: "ACTIVE",
        }),
      });

      if (!res.ok) throw new Error("Failed to create goal");

      toast.success("🎯 Goal created! Let's go!");
      router.refresh();
      onCancel();
    } catch {
      toast.error("Failed to create goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in flex h-full flex-col pb-20"
    >
      <div className="mb-6 flex items-start justify-between border-b border-[#30363d] pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Create New Goal
          </h2>
          <p className="mt-1 text-sm text-[#8b949e]">
            Define your target and pace.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="shrink-0 rounded-md p-1 text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-white">
              Goal Title
            </label>
            <input
              type="text"
              placeholder="e.g., Ship the MVP, Read 12 Books"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-white">
                Target Quantity
              </label>
              <input
                type="number"
                min="0"
                placeholder="100"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-white">
                Unit
              </label>
              <input
                type="text"
                placeholder="commits, pages"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-white">
            Duration
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                <Calendar className="h-3.5 w-3.5" /> Start Date
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                <Calendar className="h-3.5 w-3.5" /> End Date
              </div>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preview Pace */}
        {pace && (
          <div className="flex items-center justify-between gap-3 rounded-md border border-[#30363d]/80 bg-[#161b22] px-3.5 py-2.5 text-xs">
            <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
              <span className="font-semibold text-[#c9d1d9]">Daily Pace</span>
              <span className="text-[#8b949e]">
                &middot; across {pace.totalDays} days
              </span>
            </div>
            <div className="flex min-w-0 items-center justify-end gap-1 font-medium text-[#e6edf3]">
              <span className="shrink-0 text-sm font-bold text-[#3fb950]">
                {pace.dailyTarget}
              </span>
              <span
                className="min-w-0 truncate text-[#8b949e]"
                title={pace.unit}
              >
                {pace.unit}
              </span>
              <span className="shrink-0 text-[#8b949e]">/ day</span>
            </div>
          </div>
        )}

        {/* Category */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  category === c.value
                    ? "border-[#58a6ff] bg-[#1f3a5f]/40 text-[#58a6ff]"
                    : "border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#8b949e] hover:text-white",
                )}
              >
                <c.icon className="h-4 w-4" />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white">
            Theme Color
          </label>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={cn(
                  "h-8 w-8 rounded-full transition-transform",
                  color === c
                    ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#0d1117]"
                    : "hover:scale-110",
                )}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={!isValid || loading}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[rgba(255,255,255,0.1)] bg-[#238636] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Goal"}
        </button>
      </div>
    </form>
  );
}
