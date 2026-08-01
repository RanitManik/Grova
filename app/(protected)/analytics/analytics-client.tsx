"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Flame, Activity, Target, RotateCcw } from "lucide-react";

interface AnalyticsClientProps {
  user: {
    currentStreak: number;
    longestStreak: number;
    totalContributions: number;
    completionRate: number;
  };
  chartData: {
    date: string;
    completed: number;
    total: number;
    rate: number;
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3 shadow-md">
        <p className="mb-1 text-xs font-semibold text-[#8b949e]">{label}</p>
        <p className="text-sm font-bold text-white">
          {payload[0].value}% Completion
        </p>
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-[#30363d] bg-[#161b22] p-3 shadow-md">
        <p className="mb-1 text-xs font-semibold text-[#8b949e]">{label}</p>
        <p className="text-sm font-bold text-white">
          {payload[0].value} {payload[0].value === 1 ? "goal" : "goals"}{" "}
          completed
        </p>
      </div>
    );
  }
  return null;
};

export function AnalyticsClient({ user, chartData }: AnalyticsClientProps) {
  const avgCompletionRate =
    chartData.length > 0
      ? Math.round(
          chartData.reduce((sum, d) => sum + d.rate, 0) / chartData.length,
        )
      : 0;

  const bestDay = chartData.reduce(
    (best, d) => (d.rate > (best?.rate ?? 0) ? d : best),
    chartData[0],
  );

  return (
    <div className="animate-fade-in space-y-6 pb-10 font-sans">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-[#30363d] pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            Your productivity insights over the last 30 days
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Current Streak */}
        <div className="relative overflow-hidden rounded-md border border-[#21262d] bg-[#161b22] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8b949e]">
              Current Streak
            </span>
            <Flame className="h-4 w-4 text-[#00e676]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {user.currentStreak}
            </span>
            <span className="text-xs text-[#8b949e]">Days</span>
          </div>
          <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#00e676]" />
        </div>

        {/* Card 2: Longest Streak */}
        <div className="rounded-md border border-[#21262d] bg-[#161b22] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8b949e]">
              Longest Streak
            </span>
            <RotateCcw className="h-4 w-4 text-[#6e7681]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {user.longestStreak}
            </span>
            <span className="text-xs text-[#8b949e]">Days</span>
          </div>
        </div>

        {/* Card 3: Completion Rate */}
        <div className="rounded-md border border-[#21262d] bg-[#161b22] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8b949e]">
              30-Day Avg
            </span>
            <Activity className="h-4 w-4 text-[#6e7681]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {avgCompletionRate}
            </span>
            <span className="text-xs text-[#8b949e]">%</span>
          </div>
        </div>

        {/* Card 4: Active Goals */}
        <div className="rounded-md border border-[#21262d] bg-[#161b22] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8b949e]">
              Total Days
            </span>
            <Target className="h-4 w-4 text-[#6e7681]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {user.totalContributions}
            </span>
            <span className="text-xs text-[#8b949e]">Logged</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Completion Rate Area Chart */}
        <div className="flex flex-col rounded-md border border-[#30363d] bg-[#0d1117] p-6">
          <h2 className="mb-6 text-sm font-semibold tracking-wider text-[#8b949e] uppercase">
            Daily Completion Rate
          </h2>
          <div className="min-h-62.5 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#30363d"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#8b949e", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  interval={5}
                  dy={10}
                />
                <YAxis
                  tick={{ fill: "#8b949e", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  dx={-10}
                />
                <Tooltip content={<AreaTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#58a6ff"
                  strokeWidth={3}
                  fill="url(#blueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {bestDay && (
            <p className="mt-4 text-xs font-medium text-[#8b949e]">
              Best day:{" "}
              <span className="font-bold text-white">{bestDay.date}</span> with{" "}
              {bestDay.rate}% completion
            </p>
          )}
        </div>

        {/* Activity Bar Chart */}
        <div className="flex flex-col rounded-md border border-[#30363d] bg-[#0d1117] p-6">
          <h2 className="mb-6 text-sm font-semibold tracking-wider text-[#8b949e] uppercase">
            Goals Completed Per Day (Last 14 Days)
          </h2>
          <div className="min-h-62.5 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(-14)}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#30363d"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#8b949e", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fill: "#8b949e", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  dx={-10}
                />
                <Tooltip content={<BarTooltip />} />
                <Bar
                  dataKey="completed"
                  fill="#238636"
                  radius={[4, 4, 0, 0]}
                  name="Completed"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
