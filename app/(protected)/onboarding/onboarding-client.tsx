"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  User,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MapPin,
  AtSign,
  AlignLeft,
  Globe,
  ShieldCheck,
} from "lucide-react";

interface UserProfile {
  name: string | null;
  username: string | null;
  email: string;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  company: string | null;
}

export function OnboardingClient({ user }: { user: UserProfile }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          username: username.trim().toLowerCase() || undefined,
          bio: bio.trim() || undefined,
          location: location.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      toast.success("Profile setup complete! Welcome to Grova.");
      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push(callbackUrl);
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      {/* Background Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-green-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-3xl border border-neutral-800 bg-neutral-900/80 p-8 shadow-2xl backdrop-blur-2xl"
      >
        {/* Header Section */}
        <div className="space-y-4 text-center">
          <div className="relative mx-auto h-20 w-20 rounded-3xl bg-linear-to-tr from-emerald-500 via-green-400 to-teal-300 p-1 shadow-lg shadow-emerald-500/20">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] bg-neutral-950">
              {user.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.image}
                  alt={user.name ?? "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-black text-emerald-400">
                  {(name || user.email || "U")[0].toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-800/50 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" /> Welcome to Grova
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Complete your profile
            </h1>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-neutral-400">
              Welcome,{" "}
              <span className="font-semibold text-white">
                {user.name || user.email}
              </span>
              ! Customize your handle and details to get started.
            </p>
          </div>

          {/* Timezone Note */}
          <div className="flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/60 p-2.5 text-xs text-neutral-400">
            <Globe className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>
              Daily streaks & log resets are synchronized to{" "}
              <strong className="text-emerald-400">00:00 UTC</strong> (LeetCode
              standard).
            </span>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-neutral-400 uppercase">
              <User className="h-3.5 w-3.5 text-emerald-400" /> Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
          </div>

          {/* Username Handle */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold tracking-wider text-neutral-400 uppercase">
              <span className="flex items-center gap-1.5">
                <AtSign className="h-3.5 w-3.5 text-emerald-400" /> Username
                Handle
              </span>
              <span className="font-mono text-[11px] text-neutral-500">
                Unique Identifier
              </span>
            </label>
            <div className="relative">
              <span className="absolute top-3.5 left-4 text-sm font-semibold text-emerald-400">
                @
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                  )
                }
                placeholder="username"
                className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/60 py-3 pr-4 pl-9 font-mono text-sm text-white placeholder-neutral-500 transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <p className="flex items-center gap-1 text-xs text-neutral-500">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Your public
              profile URL will be grova.app/@{username || "username"}
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-neutral-400 uppercase">
              <AlignLeft className="h-3.5 w-3.5 text-emerald-400" /> Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share your goals, stack, or productivity mission..."
              className="w-full resize-none rounded-2xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-neutral-400 uppercase">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" /> Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA or Remote"
              className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-tr from-emerald-600 to-green-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] hover:shadow-emerald-600/40 active:scale-[0.98] disabled:opacity-50 sm:flex-1"
            >
              {loading ? (
                "Saving Profile..."
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Save & Launch Dashboard
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl border border-neutral-800 bg-neutral-950/40 px-5 py-3.5 text-sm font-semibold text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white sm:w-auto"
            >
              Skip <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
