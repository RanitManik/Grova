import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { format } from "date-fns";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [user, todayLogs, tomorrowGoals, recentNote] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        username: true,
        currentStreak: true,
        longestStreak: true,
        totalContributions: true,
      },
    }),
    // Today's goals with their logs
    db.goal.findMany({
      where: {
        userId: session.user.id,
        status: "ACTIVE",
        startDate: { lte: today },
        endDate: { gte: today },
      },
      include: {
        dailyLogs: {
          where: { date: today },
        },
      },
      orderBy: { createdAt: "asc" },
    }),
    // Tomorrow's goals
    db.goal.findMany({
      where: {
        userId: session.user.id,
        status: "ACTIVE",
      },
      take: 5,
      select: { title: true, dailyTarget: true, unit: true },
      orderBy: { createdAt: "asc" },
    }),
    // Quick note for today
    db.quickNote.findUnique({
      where: {
        userId_date: { userId: session.user.id, date: today },
      },
    }),
  ]);

  if (!user) redirect("/login");

  // Calculate daily progress
  const completedGoals = (todayLogs as Array<{ dailyLogs: Array<{ status: string }> }>).filter(
    (g: { dailyLogs: Array<{ status: string }> }) => g.dailyLogs[0]?.status === "COMPLETED",
  ).length;
  const skippedGoals = (todayLogs as Array<{ dailyLogs: Array<{ status: string }> }>).filter(
    (g: { dailyLogs: Array<{ status: string }> }) => g.dailyLogs[0]?.status === "SKIPPED",
  ).length;
  const progressPercent =
    todayLogs.length > 0
      ? Math.round((completedGoals / todayLogs.length) * 100)
      : 0;

  // Prepare log entries
  const logEntries = todayLogs.map((goal) => {
    const log = goal.dailyLogs[0];
    return {
      id: goal.id,
      title: goal.title,
      category: goal.category,
      dailyTarget: goal.dailyTarget,
      unit: goal.unit,
      color: goal.color,
      status: log?.status ?? "PENDING",
      completedAmount: log?.completedAmount ?? 0,
      isOverdue: !log && today > goal.startDate,
    };
  });

  // Activity heatmap data (last 52 weeks to support dynamic widths)
  const heatmapStart = new Date(today);
  heatmapStart.setDate(today.getDate() - 365);

  const activityLogs = await db.dailyLog.findMany({
    where: {
      userId: session.user.id,
      date: { gte: heatmapStart },
      status: { in: ["COMPLETED", "PARTIAL"] },
    },
    select: { date: true, status: true },
  });

  const activityByDate: Record<string, number> = {};
  for (const log of activityLogs) {
    const dateStr = format(log.date, "yyyy-MM-dd");
    activityByDate[dateStr] = (activityByDate[dateStr] ?? 0) + 1;
  }

  return (
    <DashboardClient
      user={user}
      today={today.toISOString()}
      logEntries={logEntries}
      progressPercent={progressPercent}
      completedGoals={completedGoals}
      totalGoals={todayLogs.length}
      skippedGoals={skippedGoals}
      tomorrowGoals={tomorrowGoals}
      activityByDate={activityByDate}
      initialNote={recentNote?.content ?? ""}
    />
  );
}
