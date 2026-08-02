import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { AnalyticsClient } from "./analytics-client";

export const metadata: Metadata = { title: "Analytics" };

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysAgo = subDays(today, 30);

  const [user, logs] = await Promise.all([
    db.user.findUnique({
      where: { id: session.user.id },
      select: {
        currentStreak: true,
        longestStreak: true,
        totalContributions: true,
        completionRate: true,
      },
    }),
    db.dailyLog.findMany({
      where: {
        userId: session.user.id,
        date: { gte: thirtyDaysAgo },
      },
      select: {
        date: true,
        status: true,
        completedAmount: true,
        targetAmount: true,
        goal: { select: { title: true, category: true, color: true } },
      },
      orderBy: { date: "asc" },
    }),
  ]);

  if (!user) redirect("/login");

  // Build daily completion chart data (last 30 days)
  const allDays = eachDayOfInterval({ start: thirtyDaysAgo, end: today });
  const chartData = allDays.map((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dayLogs = (logs as Array<{ date: Date; status: string }>).filter(
      (l: { date: Date; status: string }) =>
        format(l.date, "yyyy-MM-dd") === dateStr,
    );
    const completed = dayLogs.filter(
      (l: { status: string }) => l.status === "COMPLETED",
    ).length;
    const total = dayLogs.length;
    return {
      date: format(day, "MMM d"),
      completed,
      total,
      rate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  });

  return <AnalyticsClient user={user} chartData={chartData} />;
}
