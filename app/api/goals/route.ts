import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { calcDailyTarget } from "@/lib/utils";

const createGoalSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(["TOTAL_TARGET", "DAILY_RECURRING", "WEEKLY_RECURRING"]),
  category: z
    .enum([
      "WORK",
      "STUDY",
      "HEALTH",
      "MINDFULNESS",
      "FINANCE",
      "CREATIVE",
      "SOCIAL",
      "OTHER",
    ])
    .default("OTHER"),
  color: z.string().default("#238636"),
  targetAmount: z.number().positive(),
  unit: z.string().min(1).max(30),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid start date"),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid end date"),
  isPublic: z.boolean().default(true),
});

// GET /api/goals — list user's goals
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const goals = await db.goal.findMany({
    where: {
      userId: session.user.id,
      ...(status ? { status: status as never } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { dailyLogs: true } },
    },
  });

  return NextResponse.json(goals);
}

// POST /api/goals — create a new goal
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createGoalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  const dailyTarget =
    data.type === "TOTAL_TARGET"
      ? calcDailyTarget(data.targetAmount, startDate, endDate)
      : data.type === "WEEKLY_RECURRING"
        ? data.targetAmount / 7
        : data.targetAmount;

  const goal = await db.goal.create({
    data: {
      userId: session.user.id,
      title: data.title,
      description: data.description,
      type: data.type,
      category: data.category,
      color: data.color,
      targetAmount: data.targetAmount,
      unit: data.unit,
      startDate,
      endDate,
      dailyTarget,
      isPublic: data.isPublic,
      status: "ACTIVE",
    },
  });

  return NextResponse.json(goal, { status: 201 });
}
