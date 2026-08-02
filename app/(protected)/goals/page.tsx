import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { GoalsClient } from "./goals-client";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Goals" };

interface GoalsPageProps {
  searchParams?: Promise<{ action?: string; new?: string; create?: string }>;
}

export default async function GoalsPage({ searchParams }: GoalsPageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const resolvedParams = searchParams ? await searchParams : {};
  const isNew =
    resolvedParams.action === "new" ||
    resolvedParams.new === "true" ||
    resolvedParams.create === "true";

  const goals = await db.goal.findMany({
    where: { userId: session.user.id },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      _count: { select: { dailyLogs: true } },
    },
  });

  return (
    <Suspense>
      <GoalsClient goals={goals} initialCreate={isNew} />
    </Suspense>
  );
}
