import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/users/[username]/heatmap?year=2026
// Returns daily completion data for the GitHub-style heatmap
export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  const { searchParams } = new URL(req.url);
  const year = parseInt(
    searchParams.get("year") ?? String(new Date().getFullYear()),
  );

  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  // Get all daily logs for the year
  const logs = await db.dailyLog.findMany({
    where: {
      userId: user.id,
      date: { gte: startDate, lte: endDate },
      status: { in: ["COMPLETED", "PARTIAL"] },
    },
    select: {
      date: true,
      status: true,
      completedAmount: true,
      targetAmount: true,
    },
  });

  // Group by date and calculate intensity
  const heatmapData: Record<
    string,
    { count: number; intensity: 0 | 1 | 2 | 3 | 4; completionRate: number }
  > = {};

  for (const log of logs) {
    const dateStr = log.date.toISOString().split("T")[0];
    if (!heatmapData[dateStr]) {
      heatmapData[dateStr] = { count: 0, intensity: 0, completionRate: 0 };
    }
    heatmapData[dateStr].count++;
    if (log.status === "COMPLETED") {
      heatmapData[dateStr].completionRate += 1;
    } else if (log.status === "PARTIAL" && log.targetAmount > 0) {
      heatmapData[dateStr].completionRate +=
        log.completedAmount / log.targetAmount;
    }
  }

  // Calculate intensity per day
  for (const dateStr of Object.keys(heatmapData)) {
    const entry = heatmapData[dateStr];
    const avgCompletion = entry.completionRate / entry.count;

    if (avgCompletion === 0) entry.intensity = 0;
    else if (avgCompletion < 0.25) entry.intensity = 1;
    else if (avgCompletion < 0.5) entry.intensity = 2;
    else if (avgCompletion < 0.75) entry.intensity = 3;
    else entry.intensity = 4;
  }

  return NextResponse.json({ year, data: heatmapData });
}
