import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateGoalSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  status: z
    .enum(["DRAFT", "ACTIVE", "PAUSED", "COMPLETED", "ABANDONED"])
    .optional(),
  color: z.string().optional(),
  isPublic: z.boolean().optional(),
});

// GET /api/goals/[id]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const goal = await db.goal.findFirst({
    where: { id, userId: session.user.id },
    include: {
      dailyLogs: {
        orderBy: { date: "desc" },
        take: 30,
      },
    },
  });

  if (!goal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  return NextResponse.json(goal);
}

// PATCH /api/goals/[id]
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = updateGoalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const goal = await db.goal.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!goal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  const updated = await db.goal.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json(updated);
}

// DELETE /api/goals/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const goal = await db.goal.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!goal) {
    return NextResponse.json({ error: "Goal not found" }, { status: 404 });
  }

  await db.goal.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
