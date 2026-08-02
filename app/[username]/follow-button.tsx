"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
  username: string;
  initialFollowing: boolean;
}

export function FollowButton({
  username,
  initialFollowing,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (loading) return;

    // ── Optimistic update ──────────────────────────────────────────
    const wasFollowing = following;
    setFollowing(!wasFollowing);

    try {
      const res = await fetch(`/api/follow/${username}`, { method: "POST" });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();

      // Reconcile with server truth in case of race
      setFollowing(data.following);

      toast.success(
        data.following ? `Following @${username}` : `Unfollowed @${username}`,
      );
    } catch {
      // Rollback on error
      setFollowing(wasFollowing);
      toast.error("Couldn't update follow status. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={cn(
        "relative flex min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-md border px-4 py-1.5 text-xs font-semibold transition-all duration-150 disabled:pointer-events-none disabled:opacity-70",
        following
          ? "border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white"
          : "border-[#238636] bg-[#238636] text-white hover:border-[#2ea043] hover:bg-[#2ea043]",
      )}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : following ? (
        <>
          <UserCheck className="h-3.5 w-3.5 text-[#3fb950]" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="h-3.5 w-3.5" />
          Follow
        </>
      )}
    </button>
  );
}
