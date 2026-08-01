"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { UserPlus, UserCheck } from "lucide-react";

export function FollowButton({
  username,
  initialFollowing,
}: {
  username: string;
  initialFollowing: boolean;
}) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/follow/${username}`, { method: "POST" });
      const data = await res.json();
      setFollowing(data.following);
      toast.success(
        data.following ? `Following @${username}` : `Unfollowed @${username}`,
      );
    } catch {
      toast.error("Failed to update follow status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={following ? "outline" : "default"}
      size="sm"
      loading={loading}
      onClick={toggle}
    >
      {following ? (
        <>
          <UserCheck className="h-3.5 w-3.5" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="h-3.5 w-3.5" />
          Follow
        </>
      )}
    </Button>
  );
}
