import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { format } from "date-fns";
import {
  MapPin,
  Building2,
  Flame,
  RotateCcw,
  Activity,
  Flag,
  Check,
  Link as LinkIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ContributionHeatmap } from "@/components/shared/heatmap";
import { SidebarLayout } from "@/components/shared/sidebar";
import { FollowButton } from "./follow-button";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const baseUrl = process.env.NEXTAUTH_URL || "https://grova.5dev.in";

  const user = await db.user.findUnique({
    where: { username },
    select: {
      name: true,
      username: true,
      bio: true,
      image: true,
      currentStreak: true,
      longestStreak: true,
      totalContributions: true,
      _count: {
        select: { goals: true, followers: true },
      },
    },
  });

  if (!user) {
    return {
      title: "User Not Found | Grova",
      description: "The requested user profile does not exist on Grova.",
    };
  }

  const displayName = user.name || user.username || username;
  const streakText = `🔥 ${user.currentStreak} Day Streak`;
  const goalsText = `🎯 ${user._count.goals} Active Goals`;
  const contribText = `⚡ ${user.totalContributions} Contributions`;
  const statsSummary = [streakText, goalsText, contribText].join(" • ");

  const description = user.bio
    ? `${user.bio} — ${statsSummary}`
    : `${displayName}'s daily habit & productivity profile on Grova. ${statsSummary}.`;

  const profileUrl = `${baseUrl}/${username}`;
  const ogImageUrl = `${baseUrl}/${username}/opengraph-image`;

  return {
    title: `${displayName} (@${username})`,
    description,
    alternates: {
      canonical: profileUrl,
    },
    openGraph: {
      type: "profile",
      url: profileUrl,
      title: `${displayName} (@${username}) — Grova`,
      description,
      siteName: "Grova",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${displayName} (@${username}) on Grova`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName} (@${username}) — Grova`,
      description,
      images: [ogImageUrl],
      creator: "@Grova",
    },
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const session = await auth();

  // 1. Fetch user from database
  const user = await db.user.findUnique({
    where: { username },
    include: {
      goals: {
        where: { isPublic: true, status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { followers: true, following: true, goals: true },
      },
    },
  });

  if (!user) notFound();

  // 2. Check if logged in user is following profile user
  let isFollowing = false;
  if (session?.user?.id && session.user.id !== user.id) {
    const follow = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: user.id,
        },
      },
    });
    isFollowing = !!follow;
  }

  // 3. Fetch real annual daily logs for heatmap
  const todayUTC = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
    ),
  );
  const endDateHeatmap = new Date(todayUTC);
  endDateHeatmap.setUTCDate(
    endDateHeatmap.getUTCDate() + (6 - endDateHeatmap.getUTCDay()),
  );

  const startDateHeatmap = new Date(endDateHeatmap);
  startDateHeatmap.setUTCDate(startDateHeatmap.getUTCDate() - (52 * 7 - 1));

  const annualLogs = await db.dailyLog.findMany({
    where: {
      userId: user.id,
      date: { gte: startDateHeatmap, lte: endDateHeatmap },
      status: { in: ["COMPLETED", "PARTIAL"] },
    },
    select: {
      date: true,
      status: true,
      completedAmount: true,
      targetAmount: true,
    },
  });

  // Pre-process real data into heatmap format
  const heatmapData: Record<
    string,
    { count: number; intensity: 0 | 1 | 2 | 3 | 4; completionRate: number }
  > = {};

  annualLogs.forEach((log) => {
    // Strictly use UTC string to perfectly match heatmap's UTC generator
    const dateStr = log.date.toISOString().split("T")[0];
    if (!heatmapData[dateStr]) {
      heatmapData[dateStr] = { count: 0, intensity: 0, completionRate: 0 };
    }
    heatmapData[dateStr].count += 1;

    if (log.status === "COMPLETED") {
      heatmapData[dateStr].completionRate += 1;
    } else if (log.status === "PARTIAL" && log.targetAmount > 0) {
      heatmapData[dateStr].completionRate +=
        log.completedAmount / log.targetAmount;
    } else {
      heatmapData[dateStr].completionRate += 0.1; // Ensure some base rate for partials with 0 amount
    }
  });

  for (const dateStr of Object.keys(heatmapData)) {
    const entry = heatmapData[dateStr];
    const avg = entry.completionRate / (entry.count || 1);
    // If they have a log, they have at least 1 intensity (so it visually shows up)
    entry.intensity =
      avg <= 0 ? 1 : avg < 0.25 ? 1 : avg < 0.5 ? 2 : avg < 0.75 ? 3 : 4;
  }

  // 4. Fetch today's daily logs for Daily Breakdown
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayLogs = await db.dailyLog.findMany({
    where: { userId: user.id, date: today },
    include: { goal: true },
    orderBy: { createdAt: "asc" },
  });

  const completedTodayCount = (todayLogs as Array<{ status: string }>).filter(
    (l: { status: string }) => l.status === "COMPLETED",
  ).length;
  const totalTodayCount = todayLogs.length;
  const todayCompletionPct =
    totalTodayCount > 0
      ? Math.round((completedTodayCount / totalTodayCount) * 100)
      : 0;

  // 5. Fetch user's friends / followers activity
  const followersList = await db.follow.findMany({
    where: { followingId: user.id },
    take: 5,
    include: {
      follower: { select: { name: true, image: true, username: true } },
    },
  });

  let loggedInUser = null;
  if (session?.user?.id) {
    loggedInUser = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        username: true,
        image: true,
        currentStreak: true,
      },
    });
  }

  const isOwnProfile = session?.user?.id === user.id;

  return (
    <SidebarLayout user={loggedInUser}>
      <div className="animate-fade-in space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#8b949e]">
          <Link
            href="/dashboard"
            className="transition-colors hover:text-white"
          >
            Home
          </Link>
          <span>/</span>
          <Link href="/explore" className="transition-colors hover:text-white">
            Users
          </Link>
          <span>/</span>
          <span className="text-[#e6edf3]">@{user.username}</span>
        </nav>

        {/* ── Profile Header Section ── */}
        <div className="relative flex w-full flex-col items-start justify-between gap-6 pb-1 md:flex-row">
          <div className="flex w-full flex-col items-start gap-5 sm:flex-row">
            {/* User Avatar */}
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] sm:h-32 sm:w-32">
              {user.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.image}
                  alt={user.name ?? user.username ?? ""}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-emerald-600 to-green-500 text-3xl font-bold text-white">
                  {(user.name ?? user.username ?? "U")[0].toUpperCase()}
                </div>
              )}
            </div>

            {/* User Metadata */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {user.name ?? user.username}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#8b949e]">
                <span className="font-semibold text-[#00e676]">
                  @{user.username}
                </span>
                <span>•</span>
                <span>Member since {format(user.createdAt, "yyyy")}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="font-medium text-[#e6edf3]">
                    {user._count.followers}
                  </span>{" "}
                  followers
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="font-medium text-[#e6edf3]">
                    {user._count.following}
                  </span>{" "}
                  following
                </span>
              </div>

              {/* Bio */}
              <p className="max-w-2xl pt-0.5 text-xs leading-relaxed text-[#8b949e] sm:text-sm">
                {user.bio || "No bio provided."}
              </p>

              {/* External Links */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#8b949e]">
                {user.website && (
                  <a
                    href={
                      user.website.startsWith("http")
                        ? user.website
                        : `https://${user.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <LinkIcon className="h-3.5 w-3.5 text-[#6e7681]" />{" "}
                    {user.website.replace(/https?:\/\//, "")}
                  </a>
                )}
                {user.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#6e7681]" />{" "}
                    {user.location}
                  </span>
                )}
                {user.company && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-[#6e7681]" />{" "}
                    {user.company}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex shrink-0 items-center gap-2.5">
            {isOwnProfile ? (
              <Link
                href="/settings"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#30363d]"
              >
                <span>Edit profile</span>
              </Link>
            ) : (
              <>
                {session ? (
                  <FollowButton
                    username={user.username!}
                    initialFollowing={isFollowing}
                  />
                ) : (
                  <button className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white transition-colors hover:border-[#8b949e] hover:bg-[#30363d]">
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* ── 4 Key Metric Cards Grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Current Streak */}
          <div className="relative overflow-hidden rounded-md border border-[#21262d] bg-[#161b22] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#8b949e]">
                Current Streak
              </span>
              <Flame className="h-4 w-4 text-[#00e676]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-white">
                {user.currentStreak}
              </span>
              <span className="text-xs text-[#8b949e]">Days</span>
            </div>
            <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#00e676]" />
          </div>

          {/* Card 2: Longest Streak */}
          <div className="rounded-md border border-[#21262d] bg-[#161b22] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#8b949e]">
                Longest Streak
              </span>
              <RotateCcw className="h-4 w-4 text-[#6e7681]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-white">
                {user.longestStreak}
              </span>
              <span className="text-xs text-[#8b949e]">Days</span>
            </div>
          </div>

          {/* Card 3: Completion Rate */}
          <div className="rounded-md border border-[#21262d] bg-[#161b22] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#8b949e]">
                Completion Rate
              </span>
              <Activity className="h-4 w-4 text-[#6e7681]" />
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold tracking-tight text-white">
                {Math.round(user.completionRate * 100)}%
              </span>
            </div>
          </div>

          {/* Card 4: Active Goals */}
          <div className="rounded-md border border-[#21262d] bg-[#161b22] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#8b949e]">
                Active Goals
              </span>
              <Flag className="h-4 w-4 text-[#6e7681]" />
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold tracking-tight text-white">
                {user._count.goals}
              </span>
            </div>
          </div>
        </div>

        {/* ── 52-Week Contribution Heatmap ── */}
        <ContributionHeatmap
          data={heatmapData}
          totalCount={user.totalContributions}
        />

        {/* ── Two Column Layout (Daily Breakdown + Sidebar) ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* ── Left Column: Daily Breakdown ── */}
          <div className="space-y-3">
            {/* Header with Date Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00e676]" />
                <h2 className="text-base font-bold tracking-tight text-white">
                  Daily Breakdown
                </h2>
              </div>
              <div className="rounded-md border border-[#00e676]/30 bg-[#0e4429] px-3 py-1 font-mono text-xs font-semibold text-[#00e676]">
                {format(today, "MMM d, yyyy")}
              </div>
            </div>

            {/* Daily Breakdown Card */}
            <div className="overflow-hidden rounded-md border border-[#21262d] bg-[#161b22]">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#21262d] bg-[#161b22] px-4 py-3 text-xs">
                <span className="text-[#8b949e]">Goals for today</span>
                <span className="font-bold text-[#00e676]">
                  {todayCompletionPct}% COMPLETE
                </span>
              </div>

              {/* Dynamic Task Items List */}
              <div className="divide-y divide-[#21262d]">
                {todayLogs.length > 0 ? (
                  todayLogs.map((log) => {
                    const isDone = log.status === "COMPLETED";
                    const isSkipped = log.status === "SKIPPED";
                    const logTime = log.completedAt
                      ? format(log.completedAt, "hh:mm a")
                      : "";

                    return (
                      <div
                        key={log.id}
                        className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-[#1c2128]"
                      >
                        <div className="flex items-start gap-3">
                          {isDone ? (
                            <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded bg-[#00e676] text-black">
                              <Check className="h-3 w-3 stroke-3" />
                            </div>
                          ) : (
                            <div className="mt-0.5 h-4 w-4 rounded border border-[#30363d] bg-[#0d1117]" />
                          )}
                          <div>
                            <div
                              className={cn(
                                "text-sm font-semibold",
                                isDone
                                  ? "text-[#8b949e] line-through"
                                  : isSkipped
                                    ? "text-[#6e7681]"
                                    : "text-[#e6edf3]",
                              )}
                            >
                              {log.goal.title}
                            </div>
                            <div className="mt-0.5 text-xs text-[#6e7681]">
                              {log.goal.category} · {log.goal.dailyTarget}{" "}
                              {log.goal.unit}
                            </div>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-[#6e7681]">
                          {isDone
                            ? logTime || "Done"
                            : isSkipped
                              ? "Skipped"
                              : "Pending"}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-xs text-[#6e7681]">
                    No goals logged for today yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right Column: Active Focus & Friends Activity ── */}
          <div className="space-y-4">
            {/* Active Focus Card */}
            <div className="rounded-md border border-[#21262d] bg-[#161b22] p-4">
              <h3 className="mb-4 text-sm font-bold tracking-tight text-white">
                Active Focus
              </h3>

              <div className="space-y-4">
                {user.goals.length > 0 ? (
                  user.goals.slice(0, 4).map((goal, idx) => {
                    const pct =
                      goal.targetAmount > 0
                        ? Math.min(
                            100,
                            Math.round(
                              (goal.completedAmount / goal.targetAmount) * 100,
                            ),
                          )
                        : 0;
                    const accentColors = [
                      "#00e676",
                      "#58a6ff",
                      "#8957e5",
                      "#e3b341",
                    ];
                    const color =
                      goal.color || accentColors[idx % accentColors.length];

                    return (
                      <div key={goal.id}>
                        <div className="mb-1.5 flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="truncate text-xs font-semibold text-white">
                            {goal.title}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#21262d]">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: color }}
                          />
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[11px] text-[#6e7681]">
                          <span>
                            {goal.completedAmount} / {goal.targetAmount}{" "}
                            {goal.unit}
                          </span>
                          <span>{pct}%</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-2 text-xs text-[#6e7681]">
                    No active focus goals.
                  </div>
                )}
              </div>
            </div>

            {/* Friends Activity Card */}
            <div className="rounded-md border border-[#21262d] bg-[#161b22] p-4">
              <h3 className="mb-4 text-sm font-bold tracking-tight text-white">
                Friends Activity
              </h3>

              {followersList.length > 0 ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 overflow-hidden">
                      {followersList.map((f, i) => (
                        <div
                          key={i}
                          className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-emerald-700 text-[10px] font-bold text-white ring-2 ring-[#161b22]"
                        >
                          {f.follower.image ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={f.follower.image}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            (f.follower.name ??
                              f.follower.username ??
                              "F")[0].toUpperCase()
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs text-[#8b949e]">
                    <strong className="font-semibold text-white">
                      {followersList[0]?.follower.name ??
                        followersList[0]?.follower.username}
                    </strong>{" "}
                    and {followersList.length - 1} follower
                    {followersList.length > 2 ? "s" : ""} active.
                  </p>
                </>
              ) : (
                <div className="flex items-center gap-2 py-1 text-xs text-[#6e7681]">
                  <Users className="h-3.5 w-3.5" />
                  <span>No recent activity from followers yet.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
