import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const logSchema = z.object({
  goalId: z.string(),
  date: z.string(), // YYYY-MM-DD
  completedAmount: z.number().min(0),
  notes: z.string().max(500).optional(),
  status: z
    .enum(["PENDING", "COMPLETED", "SKIPPED", "PARTIAL"])
    .default("PARTIAL"),
});

// POST /api/logs — create or update a daily log entry
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = logSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { goalId, date, completedAmount, notes, status } = parsed.data;

  // Verify goal belongs to user
  const goal = await db.goal.findFirst({
    where: { id: goalId, userId: session.user.id },
  });

  if (!goal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  const cleanDateStr = date.split("T")[0];
  const logDate = new Date(`${cleanDateStr}T00:00:00.000Z`);

  // Determine actual status
  let logStatus = status;
  if (completedAmount >= goal.dailyTarget && goal.dailyTarget > 0) {
    logStatus = "COMPLETED";
  } else if (completedAmount > 0) {
    logStatus = "PARTIAL";
  }

  // Upsert the log
  const log = await db.dailyLog.upsert({
    where: { goalId_date: { goalId, date: logDate } },
    create: {
      userId: session.user.id,
      goalId,
      date: logDate,
      completedAmount,
      targetAmount: goal.dailyTarget,
      status: logStatus,
      notes,
      completedAt: logStatus === "COMPLETED" ? new Date() : null,
    },
    update: {
      completedAmount,
      status: logStatus,
      notes,
      completedAt: logStatus === "COMPLETED" ? new Date() : null,
    },
  });

  // Update goal's total completed amount
  const allLogs = await db.dailyLog.aggregate({
    where: { goalId },
    _sum: { completedAmount: true },
  });

  await db.goal.update({
    where: { id: goalId },
    data: { completedAmount: allLogs._sum.completedAmount ?? 0 },
  });

  // Recalculate user streak
  await recalculateStreak(session.user.id);

  return NextResponse.json(log);
}

// GET /api/logs?date=YYYY-MM-DD — get all logs for a date
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const cleanDateStr = dateStr.split("T")[0];
  const date = new Date(`${cleanDateStr}T00:00:00.000Z`);

  const logs = await db.dailyLog.findMany({
    where: {
      userId: session.user.id,
      date,
    },
    include: { goal: true },
  });

  return NextResponse.json(logs);
}

// Helper: recalculate streak for a user (LeetCode UTC standard)
async function recalculateStreak(userId: string) {
  const completedDays = await db.dailyLog.findMany({
    where: {
      userId,
      status: { in: ["COMPLETED", "PARTIAL"] },
    },
    select: { date: true },
    orderBy: { date: "desc" },
  });

  if (completedDays.length === 0) {
    await db.user.update({
      where: { id: userId },
      data: { currentStreak: 0, totalContributions: 0 },
    });
    return;
  }

  // Convert all logged dates to UTC YYYY-MM-DD set
  const loggedSet = new Set<string>();
  for (const item of completedDays) {
    const d = new Date(item.date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    loggedSet.add(`${year}-${month}-${day}`);
  }

  const now = new Date();
  const todayStr = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;

  const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayStr = `${yesterdayDate.getUTCFullYear()}-${String(yesterdayDate.getUTCMonth() + 1).padStart(2, "0")}-${String(yesterdayDate.getUTCDate()).padStart(2, "0")}`;

  let currentStreak = 0;
  let checkDate: Date;

  // Streak is active if user completed a log today OR yesterday (UTC)
  if (loggedSet.has(todayStr)) {
    checkDate = new Date(now.getTime());
  } else if (loggedSet.has(yesterdayStr)) {
    checkDate = new Date(yesterdayDate.getTime());
  } else {
    checkDate = new Date(0); // broken streak
  }

  if (checkDate.getTime() > 0) {
    while (true) {
      const year = checkDate.getUTCFullYear();
      const month = String(checkDate.getUTCMonth() + 1).padStart(2, "0");
      const day = String(checkDate.getUTCDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      if (loggedSet.has(dateStr)) {
        currentStreak++;
        checkDate.setTime(checkDate.getTime() - 24 * 60 * 60 * 1000);
      } else {
        break;
      }
    }
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { longestStreak: true },
  });

  await db.user.update({
    where: { id: userId },
    data: {
      currentStreak,
      longestStreak: Math.max(currentStreak, user?.longestStreak ?? 0),
      totalContributions: loggedSet.size,
    },
  });
}
