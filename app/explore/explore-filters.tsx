"use client";

import { useRouter } from "nextjs-toploader/app";
import { Search } from "lucide-react";
import { useTransition } from "react";

export function ExploreFilters({
  initialQ,
  initialSort,
}: {
  initialQ: string;
  initialSort: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const updateFilters = (q: string, sort: string) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (sort && sort !== "streak") params.set("sort", sort);
      router.push(`/explore?${params.toString()}`);
    });
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8b949e]" />
        <input
          defaultValue={initialQ}
          onChange={(e) => updateFilters(e.target.value, initialSort)}
          placeholder="Search users..."
          className="h-10 w-full rounded-md border border-[#30363d] bg-[#161b22] pr-4 pl-10 text-sm text-white shadow-sm transition-all placeholder:text-[#8b949e] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
        />
      </div>

      <div className="relative">
        <select
          defaultValue={initialSort}
          onChange={(e) => updateFilters(initialQ, e.target.value)}
          className="h-10 cursor-pointer appearance-none rounded-md border border-[#30363d] bg-[#161b22] pr-10 pl-4 text-sm font-medium text-white shadow-sm transition-all focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
        >
          <option value="streak">Highest Streak</option>
          <option value="contributions">Most Active</option>
          <option value="new">Newest Members</option>
        </select>
        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#8b949e]">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
