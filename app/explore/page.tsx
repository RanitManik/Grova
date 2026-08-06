import { Metadata } from "next";
import { db } from "@/lib/db";
import Link from "next/link";
import { Users, Trophy, Flame, Target, Activity } from "lucide-react";
import { auth } from "@/auth";
import { SidebarLayout } from "@/components/shared/sidebar";
import { ExploreFilters } from "./explore-filters";

const baseUrl = process.env.NEXTAUTH_URL || "https://grova.5dev.in";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Discover active habit builders, top daily streaks, and public goal progress on Grova.",
  alternates: {
    canonical: `${baseUrl}/explore`,
  },
  openGraph: {
    title: "Explore | Grova",
    description:
      "Discover active habit builders, top daily streaks, and public goal progress on Grova.",
    url: `${baseUrl}/explore`,
    siteName: "Grova",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore | Grova",
    description:
      "Discover active habit builders, top daily streaks, and public goal progress on Grova.",
  },
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q = "", sort = "streak" } = await searchParams;

  const session = await auth();
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

  const orderBy =
    sort === "streak"
      ? { currentStreak: "desc" as const }
      : sort === "contributions"
        ? { totalContributions: "desc" as const }
        : { createdAt: "desc" as const };

  const where = q
    ? {
        OR: [
          { username: { contains: q, mode: "insensitive" as const } },
          { name: { contains: q, mode: "insensitive" as const } },
        ],
        username: { not: null as never },
      }
    : { username: { not: null as never } };

  const users = await db.user.findMany({
    where,
    orderBy,
    take: 40,
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
      _count: { select: { goals: true, followers: true } },
    },
  });

  return (
    <SidebarLayout user={loggedInUser}>
      <div className="animate-fade-in space-y-6">
        {/* Header */}
        <div className="mb-8 border-b border-[#30363d] pb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Explore
          </h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            Discover productive people and get inspired
          </p>
        </div>

        {/* Search + Sort */}
        <ExploreFilters initialQ={q} initialSort={sort} />

        {/* User Grid */}
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-[#30363d] bg-[#0d1117] py-24">
            <Users className="mb-4 h-12 w-12 text-[#8b949e]" />
            <h2 className="text-lg font-semibold text-white">No users found</h2>
            <p className="mt-1 text-sm text-[#8b949e]">
              Try searching for a different name or username.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/${user.username}`}
                className="group block"
              >
                <div className="relative flex h-full flex-col rounded-md border border-[#30363d] bg-[#161b22] p-5 transition-all group-hover:border-[#8b949e] group-hover:bg-[#1f242c]">
                  {/* Top: Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      {user.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={user.image}
                          alt={user.name ?? ""}
                          referrerPolicy="no-referrer"
                          className="h-12 w-12 shrink-0 rounded-full border-2 border-[#30363d] bg-[#0d1117] object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#30363d] bg-[#0d1117] text-lg font-bold text-[#8b949e]">
                          {(user.name ?? user.username ?? "U")[0].toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-base font-bold tracking-tight text-white">
                          {user.name ?? user.username}
                        </div>
                        <div className="mt-0.5 truncate text-sm font-medium text-[#8b949e]">
                          @{user.username}
                        </div>
                      </div>
                    </div>

                    {user.longestStreak >= 30 && (
                      <div className="ml-2 flex shrink-0 items-center gap-1.5 rounded-full border border-[rgba(210,153,34,0.2)] bg-[rgba(210,153,34,0.1)] py-1 pr-2.5 pl-2">
                        <Trophy className="h-3.5 w-3.5 text-[#d29922]" />
                        <span className="text-[11px] font-bold text-[#d29922]">
                          {user.longestStreak}d best
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="mb-5 flex-1">
                    {user.bio ? (
                      <p className="line-clamp-2 text-sm leading-relaxed text-[#8b949e]">
                        {user.bio}
                      </p>
                    ) : (
                      <div className="h-10" />
                    )}
                  </div>

                  {/* Stats Footer */}
                  <div className="mt-auto grid grid-cols-3 gap-2 rounded-lg border border-[#30363d]/50 bg-[#0d1117] p-3">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-0.5 flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-[#00e676]" />
                        <span className="text-sm font-bold text-white">
                          {user.currentStreak}
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold tracking-wider text-[#8b949e] uppercase">
                        Streak
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center border-l border-[#30363d]/50">
                      <div className="mb-0.5 flex items-center gap-1.5">
                        <Target className="h-4 w-4 text-[#8b949e]" />
                        <span className="text-sm font-bold text-white">
                          {user._count.goals}
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold tracking-wider text-[#8b949e] uppercase">
                        Goals
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center border-l border-[#30363d]/50">
                      <div className="mb-0.5 flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-[#8b949e]" />
                        <span className="text-sm font-bold text-white">
                          {Math.round(user.completionRate * 100)}%
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold tracking-wider text-[#8b949e] uppercase">
                        Done
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
