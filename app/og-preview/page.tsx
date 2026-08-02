"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  Sparkles,
  Search,
  Eye,
  Code,
  Image as ImageIcon,
} from "lucide-react";

export default function OgPreviewPage() {
  const [username, setUsername] = useState("ranit_manik");
  const [inputVal, setInputVal] = useState("ranit_manik");
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const [activeTab, setActiveTab] = useState<"card" | "social" | "raw">("card");

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://grova.5dev.in";

  const profileUrl = `${baseUrl}/${username}`;
  const ogImageUrl = `/${username}/opengraph-image?v=${key}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setUsername(inputVal.trim().replace(/^@/, ""));
      setKey(Date.now());
    }
  };

  const handleRefresh = () => {
    setKey(Date.now());
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#21262d] bg-[#161b22]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-bold text-white transition-opacity hover:opacity-80"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00e676] font-extrabold text-[#0d1117]">
                G
              </div>
              <span>Grova</span>
            </Link>
            <span className="text-[#30363d]">/</span>
            <span className="flex items-center gap-1.5 rounded-full border border-[#00e676]/30 bg-[#0e4429] px-3 py-0.5 text-xs font-semibold text-[#00e676]">
              <Sparkles className="h-3 w-3" /> OG Share Tester
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs text-[#8b949e] transition-colors hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href={`/${username}`}
              target="_blank"
              className="flex items-center gap-1 text-xs font-medium text-[#58a6ff] transition-colors hover:underline"
            >
              View Live Profile <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          {/* Top Controls */}
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  OpenGraph & Social Share Previewer
                </h1>
                <p className="mt-1 text-xs text-[#8b949e]">
                  Test how profile share cards look on Twitter, iMessage,
                  Discord, WhatsApp & LinkedIn.
                </p>
              </div>

              {/* Username Input Form */}
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Enter username..."
                    className="w-56 rounded-md border border-[#30363d] bg-[#0d1117] py-1.5 pr-3 pl-9 font-mono text-xs text-white placeholder-[#6e7681] focus:border-[#00e676] focus:ring-1 focus:ring-[#00e676] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-[#238636] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2ea043]"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={handleRefresh}
                  title="Reload OG image"
                  className="flex items-center justify-center rounded-md border border-[#30363d] bg-[#21262d] p-1.5 text-[#8b949e] transition-colors hover:bg-[#30363d] hover:text-white"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-between border-b border-[#21262d]">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("card")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === "card"
                    ? "border-[#00e676] text-[#00e676]"
                    : "border-transparent text-[#8b949e] hover:text-white"
                }`}
              >
                <ImageIcon className="h-4 w-4" /> OG Image (1200x630)
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === "social"
                    ? "border-[#00e676] text-[#00e676]"
                    : "border-transparent text-[#8b949e] hover:text-white"
                }`}
              >
                <Eye className="h-4 w-4" /> Social Card Mockups
              </button>
              <button
                onClick={() => setActiveTab("raw")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === "raw"
                    ? "border-[#00e676] text-[#00e676]"
                    : "border-transparent text-[#8b949e] hover:text-white"
                }`}
              >
                <Code className="h-4 w-4" /> OpenGraph HTML Meta Tags
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="mb-2 flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-[#30363d]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#00e676]" /> Copied Link
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#8b949e]" /> Copy Profile
                  URL
                </>
              )}
            </button>
          </div>

          {/* TAB 1: Dynamic OG Image */}
          {activeTab === "card" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8b949e]">
                <span>
                  Generated dynamically via Next.js{" "}
                  <code className="text-[#00e676]">next/og</code> at{" "}
                  <code className="text-white">
                    /{username}/opengraph-image
                  </code>
                </span>
                <a
                  href={ogImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[#58a6ff] hover:underline"
                >
                  Open Direct Image <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Rendered Image Container */}
              <div className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] p-2 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ogImageUrl}
                  alt={`OpenGraph card for @${username}`}
                  className="w-full rounded-lg object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB 2: Social Media Mockups */}
          {activeTab === "social" && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Twitter / X Mockup */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-[#8b949e]">
                  <span>Twitter / X Card Preview</span>
                  <span className="rounded bg-[#21262d] px-2 py-0.5 text-[10px] text-[#00e676]">
                    summary_large_image
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ogImageUrl}
                    alt="Twitter OG Card"
                    className="h-64 w-full object-cover"
                  />
                  <div className="p-3">
                    <div className="text-[11px] tracking-wider text-[#6e7681] uppercase">
                      grova.5dev.in
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-white">
                      @{username} on Grova
                    </div>
                    <div className="mt-1 line-clamp-2 text-xs text-[#8b949e]">
                      Track daily habit goals & visualize progress heatmaps on
                      Grova.
                    </div>
                  </div>
                </div>
              </div>

              {/* Discord / iMessage / LinkedIn Mockup */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-[#8b949e]">
                  <span>Discord / iMessage / WhatsApp Preview</span>
                  <span className="rounded bg-[#21262d] px-2 py-0.5 text-[10px] text-[#58a6ff]">
                    og:image
                  </span>
                </div>

                <div className="flex flex-col gap-2 rounded-xl border-l-4 border-[#00e676] bg-[#0d1117] p-3.5">
                  <div className="text-xs font-bold text-[#00e676]">Grova</div>
                  <div className="text-sm font-bold text-white">
                    @{username} — Grova Profile
                  </div>
                  <div className="text-xs text-[#8b949e]">
                    🔥 Streak & Goal Progress Profile
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ogImageUrl}
                    alt="Discord Embed OG Card"
                    className="mt-1.5 rounded-lg border border-[#30363d] object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Raw HTML Meta Tags */}
          {activeTab === "raw" && (
            <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-[#8b949e]">
                  Generated HTML Head Tags for @{username}
                </span>
                <span className="text-xs text-[#6e7681]">
                  Evaluated at runtime in app/[username]/page.tsx
                </span>
              </div>

              <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 font-mono text-xs text-[#e6edf3]">
                {`<!-- Primary Meta Tags -->
<title>@${username} — Grova</title>
<meta name="description" content="View @${username}'s daily habit goals & streak progress on Grova." />
<link rel="canonical" href="${profileUrl}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="profile" />
<meta property="og:url" content="${profileUrl}" />
<meta property="og:title" content="@${username} — Grova" />
<meta property="og:description" content="🔥 Track streaks and goal heatmaps on Grova." />
<meta property="og:image" content="${baseUrl}/${username}/opengraph-image" />
<meta property="og:site_name" content="Grova" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${profileUrl}" />
<meta name="twitter:title" content="@${username} — Grova" />
<meta name="twitter:description" content="🔥 Track streaks and goal heatmaps on Grova." />
<meta name="twitter:image" content="${baseUrl}/${username}/opengraph-image" />`}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
