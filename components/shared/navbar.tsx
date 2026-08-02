"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Target,
  BarChart2,
  Users,
  Globe,
  Zap,
  DollarSign,
  HelpCircle,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { cn, getUTCTimeInfo, type UTCTimeInfo } from "@/lib/utils";
import { GrovaLogo } from "@/components/shared/logo";

interface NavProps {
  user?: {
    name?: string | null;
    username?: string | null;
    image?: string | null;
    currentStreak?: number;
  } | null;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/explore", label: "Explore", icon: Users },
];

const landingLinks = [
  { href: "/", label: "Home", icon: Globe },
  { href: "/#features", label: "Features", icon: Target },
  { href: "/#benefits", label: "Benefits", icon: Zap },
  { href: "/#testimonials", label: "Testimonials", icon: Users },
  { href: "/#pricing", label: "Pricing", icon: DollarSign },
  { href: "/#faq", label: "FAQ", icon: HelpCircle },
];

export function Navbar({ user }: NavProps) {
  const pathname = usePathname();
  const isPublicPage = ["/", "/privacy", "/terms"].includes(pathname);
  const [timeInfo, setTimeInfo] = useState<UTCTimeInfo | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isPublicPage) return;

    const updateTimer = () => {
      setTimeInfo(getUTCTimeInfo());
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isPublicPage]);

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0d1117]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo & UTC Badge */}
        <div className="flex items-center gap-5">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="h-6 w-6 transition-opacity hover:opacity-90 sm:h-7 sm:w-7"
          >
            <GrovaLogo
              showText
              iconClassName="h-6 w-6 sm:h-7 sm:w-7"
              textClassName="text-base sm:text-lg"
            />
          </Link>

          {pathname !== "/" && (
            <div className="hidden h-4 w-px bg-[#30363d] lg:block" />
          )}

          {/* Timezone Indicator - Day, Live Time & Countdown */}
          {!isPublicPage && timeInfo && (
            <div className="hidden items-center gap-2 text-xs text-[#8b949e] lg:flex">
              <Globe className="h-3.5 w-3.5 text-[#8b949e]" />
              <span className="font-semibold text-[#c9d1d9]">
                {timeInfo.dateFormatted}
              </span>
              <span className="font-mono text-[#c9d1d9] tabular-nums">
                {timeInfo.timeWithZone}
              </span>
              <span className="text-[#30363d]">|</span>
              <span className="text-[#8b949e]">Reset in:</span>
              <span className="font-mono whitespace-nowrap text-[#c9d1d9] tabular-nums">
                {timeInfo.formatted}
              </span>
            </div>
          )}
        </div>

        {/* Center Nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
          {(isPublicPage ? landingLinks : navLinks).map(
            ({ href, label, icon: Icon }) => {
              const active = !isPublicPage && pathname.startsWith(href);
              if (isPublicPage) {
                return (
                  <Link
                    key={href}
                    href={href}
                    className="text-xs font-semibold text-[#8b949e] transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                );
              }
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-[#21262d] font-semibold text-white"
                      : "text-[#8b949e] hover:bg-[#21262d]/60 hover:text-white",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      active ? "text-[#3fb950]" : "text-[#8b949e]",
                    )}
                  />
                  {label}
                </Link>
              );
            },
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* UTC Mobile Badge */}
          {!isPublicPage && timeInfo?.formatted && (
            <div className="flex items-center font-mono text-xs whitespace-nowrap text-[#8b949e] tabular-nums lg:hidden">
              {timeInfo.formatted}
            </div>
          )}

          {/* Sponsor Button */}
          <a
            href="https://github.com/sponsors/RanitManik"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-xs font-semibold text-[#e6edf3] transition-colors hover:bg-[#30363d] hover:text-white sm:flex"
          >
            <Heart className="h-3.5 w-3.5 text-[#bf3989]" />
            Sponsor
          </a>

          {user ? (
            <>
              {/* Dashboard Button */}
              <Link
                href="/dashboard"
                className="rounded-md bg-[#238636] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2ea043]"
              >
                Dashboard
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="Profile menu"
                  className="group flex cursor-pointer items-center gap-1.5 py-1 focus:outline-none"
                >
                  <div
                    key={user?.image ?? "avatar"}
                    className={cn(
                      "h-7 w-7 overflow-hidden rounded-full border border-[#30363d] transition-all",
                      isDropdownOpen
                        ? "border-[#58a6ff] ring-2 ring-[#58a6ff]/20"
                        : "group-hover:border-[#8b949e]",
                    )}
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
                      <div className="flex h-full w-full items-center justify-center bg-[#21262d] text-xs font-bold text-white">
                        {(user.name ?? "U")[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-10 right-0 z-50 w-44 rounded-md border border-[#30363d] bg-[#161b22] py-1 shadow-lg shadow-black/40">
                    <div className="border-b border-[#30363d] px-3.5 py-2">
                      <p className="truncate text-xs font-semibold text-[#e6edf3]">
                        {user.name}
                      </p>
                      <p className="truncate text-[11px] text-[#8b949e]">
                        @{user.username}
                      </p>
                    </div>
                    <div className="border-b border-[#30363d] py-1">
                      <Link
                        href={`/${user.username}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block w-full px-3.5 py-1.5 text-xs text-[#c9d1d9] transition-colors hover:bg-[#0366d6] hover:text-white"
                      >
                        Your profile
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block w-full px-3.5 py-1.5 text-xs text-[#c9d1d9] transition-colors hover:bg-[#0366d6] hover:text-white"
                      >
                        Settings
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block w-full cursor-pointer px-3.5 py-1.5 text-left text-xs font-medium text-[#f85149] transition-colors hover:bg-[#da3633] hover:text-white"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center">
              <Link
                href="/login"
                className="rounded-md bg-[#238636] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2ea043]"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-md p-1.5 text-[#8b949e] hover:bg-[#21262d] hover:text-white focus:outline-none md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 z-40 w-full border-b border-[#30363d] bg-[#0d1117] px-4 py-4 shadow-lg shadow-black/40 md:hidden">
          <nav className="flex flex-col gap-4">
            {(isPublicPage ? landingLinks : navLinks).map(
              ({ href, label, icon: Icon }) => {
                if (isPublicPage) {
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-sm font-medium text-[#c9d1d9] transition-colors hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-sm font-medium text-[#c9d1d9] transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              },
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
