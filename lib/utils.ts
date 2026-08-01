import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, differenceInDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate a URL-safe username from a name or email */
export function generateUsername(nameOrEmail: string): string {
  const base = nameOrEmail
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20);
  const suffix = Math.floor(Math.random() * 999);
  return `${base}${suffix}`;
}

/** Get date string in YYYY-MM-DD format in UTC (LeetCode standard) */
export function toDateString(date: Date | string = new Date()): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Check if a date string or Date is today in UTC (LeetCode standard) */
export function isToday(date: Date | string): boolean {
  return toDateString(date) === toDateString(new Date());
}

/** Format UTC date as "Oct 24, 2024" */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** Format UTC date as "Wednesday, Oct 24" */
export function formatDayHeader(date: Date | string = new Date()): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${days[d.getUTCDay()]}, ${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

/** Get time remaining until 00:00 UTC (LeetCode daily reset timer) */
export function getUTCResetCountdown(): {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  const now = new Date();
  const nextReset = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
      0,
    ),
  );
  const diffMs = Math.max(0, nextReset.getTime() - now.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  const formatted = `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  return { hours, minutes, seconds, formatted };
}

/** Format date as relative "2 hours ago" */
export function formatRelative(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

/** Get week number of year (in UTC) */
export function getWeekNumber(date: Date = new Date()): number {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const diff = date.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

/** Calculate daily target from total target and date range */
export function calcDailyTarget(
  totalTarget: number,
  startDate: Date,
  endDate: Date,
): number {
  const days = Math.max(1, differenceInDays(endDate, startDate));
  return Math.ceil((totalTarget / days) * 10) / 10;
}

/** Get completion percentage (0–100) */
export function calcProgress(completed: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(100, Math.round((completed / target) * 100));
}

/** Get streak intensity level for heatmap (0–4) */
export function getStreakIntensity(completionRate: number): 0 | 1 | 2 | 3 | 4 {
  if (completionRate === 0) return 0;
  if (completionRate < 0.25) return 1;
  if (completionRate < 0.5) return 2;
  if (completionRate < 0.75) return 3;
  return 4;
}

/** Format a number with unit (e.g., "3.2 commits") */
export function formatMetric(value: number, unit: string): string {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} ${unit}`;
}
