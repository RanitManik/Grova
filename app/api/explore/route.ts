import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/explore?q=search&page=1&sortBy=streak
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1");
  const sortBy = searchParams.get("sortBy") ?? "streak";
  const limit = 20;
  const skip = (page - 1) * limit;

  const orderBy =
    sortBy === "streak"
      ? { currentStreak: "desc" as const }
      : sortBy === "contributions"
        ? { totalContributions: "desc" as const }
        : { createdAt: "desc" as const };

  const where = query
    ? {
        OR: [
          { username: { contains: query, mode: "insensitive" as const } },
          { name: { contains: query, mode: "insensitive" as const } },
        ],
        username: { not: null },
      }
    : { username: { not: null } };

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        currentStreak: true,
        longestStreak: true,
        totalContributions: true,
        completionRate: true,
        _count: {
          select: { goals: true, followers: true },
        },
      },
    }),
    db.user.count({ where }),
  ]);

  return NextResponse.json({
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
