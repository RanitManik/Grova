"use client";

import { useState, Fragment } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface HeatmapProps {
  data: Record<
    string,
    { count: number; intensity: 0 | 1 | 2 | 3 | 4; completionRate: number }
  >;
  year?: number;
  totalCount?: number;
  className?: string;
}

const MONTHS = [
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
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

// Intensity colors matching GitHub Dark mode
const intensityClasses = [
  "bg-[#161b22]", // 0 - empty dark cell
  "bg-[#0e4429]", // 1 - dark green
  "bg-[#006d32]", // 2 - medium green
  "bg-[#26a641]", // 3 - bright green
  "bg-[#39d353]", // 4 - neon green
];

export function ContributionHeatmap({
  data,
  totalCount,
  className,
}: HeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    displayDate: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Generate 52 weeks (364 days) leading up to today
  const today = new Date();
  const todayUTC = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );

  // Find the most recent Saturday (end of week 52)
  const endDate = new Date(todayUTC);
  const dayOfWeek = endDate.getUTCDay(); // 0 = Sun, 6 = Sat
  endDate.setUTCDate(endDate.getUTCDate() + (6 - dayOfWeek));

  // Start date is 52 weeks (364 days) before end date
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - (52 * 7 - 1));

  // Build array of 52 weeks x 7 days
  const weeks: { date: Date; dateStr: string; month: number }[][] = [];
  const curr = new Date(startDate);

  for (let w = 0; w < 52; w++) {
    const week: { date: Date; dateStr: string; month: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const yearStr = curr.getUTCFullYear();
      const monthStr = String(curr.getUTCMonth() + 1).padStart(2, "0");
      const dateNumStr = String(curr.getUTCDate()).padStart(2, "0");
      const dateStr = `${yearStr}-${monthStr}-${dateNumStr}`;

      week.push({
        date: new Date(curr),
        dateStr,
        month: curr.getUTCMonth(),
      });

      curr.setUTCDate(curr.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  // Calculate month header positions
  const monthPositions: { label: string; col: number }[] = [];
  let currentMonth = -1;
  weeks.forEach((week, weekIdx) => {
    const firstDay = week[0];
    if (firstDay && firstDay.month !== currentMonth) {
      currentMonth = firstDay.month;
      monthPositions.push({ label: MONTHS[currentMonth], col: weekIdx });
    }
  });

  // Calculate total contributions
  const totalCalculated = Object.values(data).reduce(
    (sum, d) => sum + d.count,
    0,
  );
  const displayTotal = totalCount ?? totalCalculated;

  return (
    <div
      className={cn(
        "relative w-full rounded-md border border-[#21262d] bg-[#0d1117] p-5 text-white shadow-none",
        className,
      )}
    >
      {/* Top Header Row */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#00e676]" />
          <span className="text-base font-bold tracking-tight text-white">
            {displayTotal.toLocaleString()} Contributions
          </span>
          <span className="text-xs text-[#8b949e]">in the last year</span>
        </div>
      </div>

      {/* Heatmap Grid Container */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="w-full min-w-180">
          {/* Month Header Labels */}
          <div
            className="mb-1.5 grid gap-0.75 text-[10px] font-medium text-[#6e7681]"
            style={{
              gridTemplateColumns: "30px repeat(52, calc((100% - 186px) / 52))",
            }}
          >
            <div /> {/* Empty space for day labels */}
            {weeks.map((_, idx) => {
              const monthLabel = monthPositions.find((m) => m.col === idx);
              return (
                <div key={idx} className="relative h-4">
                  {monthLabel && (
                    <span className="absolute left-0">{monthLabel.label}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid Layout (7 Rows x 53 Columns) */}
          <div
            className="grid gap-0.75"
            style={{
              gridTemplateColumns: "30px repeat(52, calc((100% - 186px) / 52))",
            }}
          >
            {Array.from({ length: 7 }).map((_, dayIdx) => (
              <Fragment key={dayIdx}>
                {/* Day Label (Column 1) */}
                <div className="relative h-full w-full">
                  {DAYS[dayIdx] && (
                    <span className="absolute top-1/2 right-1 -translate-y-1/2 text-[10px] leading-none font-medium text-[#6e7681]">
                      {DAYS[dayIdx]}
                    </span>
                  )}
                </div>

                {/* 52 Cells for this day (Columns 2-53) */}
                {weeks.map((week, weekIdx) => {
                  const cell = week[dayIdx];
                  if (!cell)
                    return (
                      <div key={weekIdx} className="aspect-square w-full" />
                    ); // Safety fallback

                  const entry = data[cell.dateStr];
                  const intensity = entry?.intensity ?? 0;

                  const monthShort = MONTHS[cell.date.getUTCMonth()];
                  const dayNum = cell.date.getUTCDate();
                  const displayDate = `${monthShort} ${dayNum}`;
                  const isFuture = cell.date > todayUTC;

                  return (
                    <div
                      key={weekIdx}
                      className={cn(
                        "aspect-square w-full cursor-pointer rounded-xs",
                        isFuture
                          ? "bg-transparent"
                          : intensityClasses[intensity],
                      )}
                      onMouseEnter={(e) => {
                        if (isFuture) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredCell({
                          displayDate,
                          count: entry?.count ?? 0,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Legend & Footer Info */}
      <div className="mt-4 flex items-center justify-between border-t border-[#21262d]/80 pt-3 text-xs text-[#8b949e]">
        <span className="cursor-pointer text-[11px] text-[#6e7681] transition-colors hover:text-[#58a6ff]">
          Learn how we count contributions
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>Less</span>
          <div className="flex gap-0.75">
            {intensityClasses.map((cls, i) => (
              <div key={i} className={cn("h-2.5 w-2.5 rounded-xs", cls)} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredCell && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full pb-2"
          style={{ left: hoveredCell.x, top: hoveredCell.y }}
        >
          <div className="rounded-md border border-[#30363d] bg-[#010409] px-2.5 py-1 text-xs font-semibold text-white">
            {hoveredCell.displayDate}: {hoveredCell.count} Goal
            {hoveredCell.count !== 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
