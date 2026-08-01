import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/users/[username] — public profile data
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;

  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
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
      goals: {
        where: { isPublic: true, status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          type: true,
          category: true,
          color: true,
          targetAmount: true,
          completedAmount: true,
          unit: true,
          startDate: true,
          endDate: true,
          status: true,
        },
      },
      _count: {
        select: {
          followers: true,
          following: true,
          goals: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PATCH /api/users/[username] — update profile (authenticated)
// Note: protected by middleware, user can only update their own profile
