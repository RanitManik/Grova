import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_-]+$/, "Only lowercase letters, numbers, _ and - allowed")
    .optional(),
  bio: z.string().max(300).optional(),
  location: z.string().max(100).optional(),
  website: z.string().url().max(200).optional().or(z.literal("")),
  company: z.string().max(100).optional(),
});

// GET /api/profile — get current user's full profile
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      bio: true,
      location: true,
      website: true,
      company: true,
      currentStreak: true,
      longestStreak: true,
      totalContributions: true,
      completionRate: true,
      createdAt: true,
      _count: {
        select: { goals: true, followers: true, following: true },
      },
    },
  });

  return NextResponse.json(user);
}

// PATCH /api/profile — update current user's profile
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = updateProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Check username uniqueness
  if (parsed.data.username) {
    const existing = await db.user.findFirst({
      where: {
        username: parsed.data.username,
        NOT: { id: session.user.id },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 },
      );
    }
  }

  const user = await db.user.update({
    where: { id: session.user.id },
    data: parsed.data,
  });

  return NextResponse.json(user);
}
