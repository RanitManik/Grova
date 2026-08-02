import { ImageResponse } from "next/og";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export const alt = "Grova Profile";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await db.user.findUnique({
    where: { username },
    select: {
      name: true,
      username: true,
      bio: true,
      image: true,
      website: true,
      location: true,
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

  const displayName = user?.name || user?.username || username;
  const handle = user?.username || username;
  const initial = displayName.charAt(0).toUpperCase() || "U";
  const bioText = user?.bio || "No bio provided.";
  const currentStreak = user?.currentStreak ?? 0;
  const longestStreak = user?.longestStreak ?? 0;
  const completionRatePct = Math.round((user?.completionRate ?? 0) * 100);
  const activeGoals = user?._count?.goals ?? 0;
  const followersCount = user?._count?.followers ?? 0;
  const followingCount = user?._count?.following ?? 0;
  const memberYear = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : new Date().getFullYear();

  const websiteClean = user?.website
    ? user.website.replace(/^https?:\/\//, "")
    : null;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#0d1117",
        color: "#ffffff",
        fontFamily: "sans-serif",
        padding: "45px 50px",
      }}
    >
      {/* Top Branding Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Official Grova SVG Logo */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="6" fill="url(#grova-grad)" />
            <path
              d="M17.5 5.5L9.5 16.5H15.5L14.5 26.5L22.5 15.5H16.5L17.5 5.5Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="grova-grad"
                x1="0"
                y1="0"
                x2="32"
                y2="32"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#238636" />
                <stop offset="1" stopColor="#2ea043" />
              </linearGradient>
            </defs>
          </svg>
          <span
            style={{
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: "#ffffff",
            }}
          >
            Grova
          </span>
        </div>

        <div
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#00e676",
            backgroundColor: "rgba(0, 230, 118, 0.12)",
            border: "1.5px solid rgba(0, 230, 118, 0.35)",
            borderRadius: "4px",
            padding: "6px 20px",
          }}
        >
          grova.5dev.in
        </div>
      </div>

      {/* Middle Profile Header — Bold, High-Readability Hierarchy */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "32px",
          width: "100%",
          marginTop: "10px",
        }}
      >
        {/* User Avatar with High-Contrast Border */}
        {user?.image ? (
          <img
            src={user.image}
            alt={displayName}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "14px",
              objectFit: "cover",
              border: "2px solid #30363d",
              backgroundColor: "#161b22",
            }}
          />
        ) : (
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "14px",
              backgroundImage:
                "linear-gradient(to bottom right, #059669, #22c55e)",
              border: "2px solid #30363d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "68px",
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            {initial}
          </div>
        )}

        {/* User Metadata */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: 1,
          }}
        >
          {/* Line 1: Display Name */}
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.5px",
              lineHeight: "1.1",
            }}
          >
            {displayName}
          </span>

          {/* Line 2: @username • Member since YYYY • X followers • Y following */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "20px",
              color: "#d0d7de",
              fontWeight: 500,
            }}
          >
            <span style={{ fontWeight: 700, color: "#00e676" }}>@{handle}</span>
            <span style={{ color: "#484f58" }}>•</span>
            <span>Member since {memberYear}</span>
            <span style={{ color: "#484f58" }}>•</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#ffffff",
              }}
            >
              <strong style={{ fontWeight: 800 }}>{followersCount}</strong>
              <span style={{ color: "#d0d7de" }}>followers</span>
            </div>
            <span style={{ color: "#484f58" }}>•</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#ffffff",
              }}
            >
              <strong style={{ fontWeight: 800 }}>{followingCount}</strong>
              <span style={{ color: "#d0d7de" }}>following</span>
            </div>
          </div>

          {/* Line 3: Bio */}
          <p
            style={{
              fontSize: "20px",
              color: "#d0d7de",
              lineHeight: "1.4",
              margin: "4px 0 0 0",
              maxHeight: "56px",
              overflow: "hidden",
            }}
          >
            {bioText}
          </p>

          {/* Line 4: External Links Row (Website, Location, Company) */}
          {(websiteClean || user?.location || user?.company) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "22px",
                fontSize: "18px",
                color: "#d0d7de",
                marginTop: "6px",
                fontWeight: 500,
              }}
            >
              {websiteClean && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9198a1"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span>{websiteClean}</span>
                </div>
              )}

              {user?.location && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9198a1"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{user.location}</span>
                </div>
              )}

              {user?.company && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9198a1"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                    <path d="M10 6h4" />
                    <path d="M10 10h4" />
                    <path d="M10 14h4" />
                    <path d="M10 18h4" />
                  </svg>
                  <span>{user.company}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Metric Cards Grid — Exactly matching profile page metrics */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          width: "100%",
          marginTop: "16px",
        }}
      >
        {/* Card 1: Current Streak */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#161b22",
            border: "1px solid #21262d",
            borderRadius: "8px",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#8b949e",
              }}
            >
              Current Streak
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00e676"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              {currentStreak}
            </span>
            <span
              style={{ fontSize: "16px", fontWeight: 500, color: "#8b949e" }}
            >
              Days
            </span>
          </div>
        </div>

        {/* Card 2: Longest Streak */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#161b22",
            border: "1px solid #21262d",
            borderRadius: "8px",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#8b949e",
              }}
            >
              Longest Streak
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6e7681"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              {longestStreak}
            </span>
            <span
              style={{ fontSize: "16px", fontWeight: 500, color: "#8b949e" }}
            >
              Days
            </span>
          </div>
        </div>

        {/* Card 3: Completion Rate */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#161b22",
            border: "1px solid #21262d",
            borderRadius: "8px",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#8b949e",
              }}
            >
              Completion Rate
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6e7681"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            {completionRatePct}%
          </span>
        </div>

        {/* Card 4: Active Goals */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#161b22",
            border: "1px solid #21262d",
            borderRadius: "8px",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#8b949e",
              }}
            >
              Active Goals
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6e7681"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" x2="4" y1="22" y2="15" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            {activeGoals}
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
