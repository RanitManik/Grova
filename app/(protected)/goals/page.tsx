import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { GoalsClient } from "./goals-client";

export const metadata: Metadata = { title: "Goals" };

export default async function GoalsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const goals = await db.goal.findMany({
    where: { userId: session.user.id },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      _count: { select: { dailyLogs: true } },
    },
  });

  return <GoalsClient goals={goals} />;
}
