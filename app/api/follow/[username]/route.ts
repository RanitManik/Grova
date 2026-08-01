import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// POST /api/follow/[username] — toggle follow/unfollow
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = await params;

  const targetUser = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (targetUser.id === session.user.id) {
    return NextResponse.json(
      { error: "Cannot follow yourself" },
      { status: 400 },
    );
  }

  // Check if already following
  const existing = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId: targetUser.id,
      },
    },
  });

  if (existing) {
    // Unfollow
    await db.follow.delete({ where: { id: existing.id } });
    return NextResponse.json({ following: false });
  } else {
    // Follow
    await db.follow.create({
      data: {
        followerId: session.user.id,
        followingId: targetUser.id,
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        userId: targetUser.id,
        type: "FOLLOWER_NEW",
        title: "New Follower",
        message: `${session.user.name ?? "Someone"} started following you`,
        actionUrl: `/${session.user.username}`,
      },
    });

    return NextResponse.json({ following: true });
  }
}

// GET /api/follow/[username] — check if current user follows this user
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ following: false });
  }

  const { username } = await params;

  const targetUser = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!targetUser) {
    return NextResponse.json({ following: false });
  }

  const existing = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId: targetUser.id,
      },
    },
  });

  return NextResponse.json({ following: !!existing });
}
