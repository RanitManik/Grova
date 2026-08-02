"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Target,
  BarChart2,
  Users,
  Settings,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Flame,
  Clock,
} from "lucide-react";
import { cn, getUTCResetCountdown } from "@/lib/utils";
import { GrovaLogo } from "@/components/shared/logo";

export interface SidebarUser {
  name?: string | null;
  username?: string | null;
  image?: string | null;
  currentStreak?: number;
}

interface SidebarLayoutProps {
  user?: SidebarUser | null;
  children: React.ReactNode;
}

export function SidebarLayout({ user, children }: SidebarLayoutProps) {
  const pathname = usePathname();
  const [countdown, setCountdown] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // UTC countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const { formatted } = getUTCResetCountdown();
      setCountdown(formatted);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/goals", label: "Goals", icon: Target },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/explore", label: "Explore", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  if (user?.username) {
    navLinks.push({
      href: `/${user.username}`,
      label: "My Profile",
      icon: UserIcon,
    });
  }

  const renderNavItems = (isMobile = false) => (
    <div className="flex w-full flex-col gap-0.5">
      {navLinks.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={() => isMobile && setIsMobileOpen(false)}
            className={cn(
              "group flex items-center gap-3 border-l-2 px-4 py-2 text-sm font-medium",
              isActive
                ? "border-[#3fb950] bg-[#21262d] font-semibold text-white"
                : "border-transparent text-[#9198a1] hover:bg-[#21262d]/60 hover:text-white",
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isActive
                  ? "text-[#3fb950]"
                  : "text-[#8b949e] group-hover:text-white",
              )}
            />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      {/* ── Mobile Top Header ── */}
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-[#30363d] bg-[#0d1117]/95 backdrop-blur-sm md:hidden">
        <Link
          href="/dashboard"
          className="flex h-full flex-1 items-center px-3.5 transition-colors hover:bg-[#21262d]/60"
        >
          <GrovaLogo showText iconClassName="h-5 w-5" textClassName="text-sm" />
        </Link>

        <div className="flex items-center gap-2.5 pr-3.5">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            className="rounded-md p-1 text-[#8b949e] hover:bg-[#21262d] hover:text-white focus:outline-none"
          >
            {isMobileOpen ? (
              <X className="h-4.5 w-4.5" />
            ) : (
              <Menu className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Mobile Slide-out Drawer ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#30363d] bg-[#0d1117] transition-transform duration-200 ease-in-out md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-12 items-center justify-between border-b border-[#30363d]">
          <Link
            href="/dashboard"
            className="flex h-full flex-1 items-center px-3.5 transition-colors hover:bg-[#21262d]/60"
          >
            <GrovaLogo
              showText
              iconClassName="h-5 w-5"
              textClassName="text-sm text-white"
            />
          </Link>
          <div className="flex items-center pr-3.5">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="rounded-md p-1 text-[#8b949e] hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {renderNavItems(true)}
        </div>

        {/* Mobile Stats Card (Rounded matching page cards) */}
        <div className="mx-3 mb-2.5 space-y-2 rounded-md border border-[#30363d] bg-[#161b22] p-2.5 text-xs">
          <div className="flex items-center justify-between text-[#8b949e]">
            <span className="flex items-center gap-1.5 font-medium text-[#c9d1d9]">
              <Flame className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              Streak
            </span>
            <span className="font-bold text-[#3fb950]">
              {user?.currentStreak ?? 0} days
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-1.5 text-[#8b949e]">
            <span className="flex items-center gap-1.5 font-medium text-[#8b949e]">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              UTC Reset
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#c9d1d9] tabular-nums">
              {countdown}
            </span>
          </div>
        </div>

        {/* Mobile User Footer */}
        {user && (
          <div className="border-t border-[#30363d] p-2.5">
            <div className="flex items-center justify-between rounded-md border border-[#30363d] bg-[#161b22] p-2">
              <div className="flex min-w-0 items-center gap-2">
                <div
                  key={user.image ?? "avatar"}
                  className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#30363d] bg-[#21262d]"
                >
                  {user.image && !imgError ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={user.image}
                      alt={user.name ?? "User"}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                      {(user.name ?? "U")[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white">
                    {user.name}
                  </p>
                  <p className="truncate text-[11px] text-[#8b949e]">
                    @{user.username}
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                title="Sign out"
                className="cursor-pointer rounded-md p-1 text-[#8b949e] hover:bg-[#da3633]/20 hover:text-[#f85149]"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ── Desktop Fixed Sidebar ── */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:flex md:w-64 md:flex-col md:border-r md:border-[#30363d] md:bg-[#0d1117]">
        {/* Compact Brand Header */}
        <Link
          href="/dashboard"
          className="flex h-12 items-center border-b border-[#30363d]/60 px-4 transition-colors hover:bg-[#21262d]/60"
        >
          <GrovaLogo
            showText
            iconClassName="h-6 w-6"
            textClassName="text-base text-white"
          />
        </Link>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto py-3">
          {renderNavItems(false)}
        </div>

        {/* Stats Card (Rounded matching page cards) */}
        <div className="mx-3 mb-2.5 space-y-2 rounded-md border border-[#30363d] bg-[#161b22] p-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-[#c9d1d9]">
              <Flame className="h-3.5 w-3.5 shrink-0 text-amber-500" />
              Streak
            </span>
            <span className="font-bold text-[#3fb950]">
              {user?.currentStreak ?? 0} days
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-[#30363d]/60 pt-1.5 text-[#8b949e]">
            <span className="flex items-center gap-1.5 font-medium text-[#8b949e]">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              UTC Reset
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#c9d1d9] tabular-nums">
              {countdown}
            </span>
          </div>
        </div>

        {/* User Profile Card Footer (Rounded matching page cards) */}
        {user ? (
          <div className="border-t border-[#30363d] p-2.5">
            <div className="flex items-center justify-between rounded-md border border-[#30363d] bg-[#161b22] p-2 hover:border-[#8b949e]/50">
              <Link
                href={user.username ? `/${user.username}` : "/settings"}
                className="group flex min-w-0 flex-1 items-center gap-2.5"
              >
                <div
                  key={user.image ?? "avatar"}
                  className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#30363d] bg-[#21262d] group-hover:border-[#58a6ff]"
                >
                  {user.image && !imgError ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={user.image}
                      alt={user.name ?? "User"}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                      {(user.name ?? "U")[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white group-hover:text-[#58a6ff]">
                    {user.name}
                  </p>
                  <p className="truncate text-[11px] text-[#8b949e]">
                    @{user.username}
                  </p>
                </div>
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                title="Sign out"
                className="ml-1 shrink-0 cursor-pointer rounded-md p-1.5 text-[#8b949e] hover:bg-[#da3633]/20 hover:text-[#f85149]"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-[#30363d] p-2.5">
            <Link
              href="/login"
              className="flex w-full items-center justify-center rounded-md bg-[#238636] py-1.5 text-xs font-semibold text-white hover:bg-[#2ea043]"
            >
              Sign In
            </Link>
          </div>
        )}
      </aside>

      {/* ── Main Content Container ── */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
