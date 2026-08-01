"use client";

import { useState, useTransition } from "react";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

interface SettingsClientProps {
  user: {
    name?: string | null;
    username?: string | null;
    email?: string | null;
    image?: string | null;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
    company?: string | null;
  };
}

export function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    name: user.name ?? "",
    username: user.username ?? "",
    bio: user.bio ?? "",
    location: user.location ?? "",
    website: user.website ?? "",
    company: user.company ?? "",
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error ?? "Failed to save");
        }

        toast.success("Profile updated!");
        router.refresh();
      } catch (err: unknown) {
        toast.error(
          err instanceof Error ? err.message : "Failed to save profile",
        );
      }
    });
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="mb-8 border-b border-[#30363d] pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Public profile
        </h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          Manage your personal information and how you appear to others
        </p>
      </div>

      <div className="flex flex-col gap-10 md:flex-row">
        {/* Main form */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-white"
              >
                Name
              </label>
              <input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full max-w-xl rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-white"
              >
                Username
              </label>
              <input
                id="username"
                value={form.username}
                onChange={(e) =>
                  update(
                    "username",
                    e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                  )
                }
                className="w-full max-w-xl rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
              <p className="text-xs text-[#8b949e]">
                Only lowercase letters, numbers, _ and -
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="website"
                className="block text-sm font-semibold text-white"
              >
                URL
              </label>
              <input
                id="website"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                type="url"
                className="w-full max-w-xl rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-white"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                rows={4}
                maxLength={180}
                placeholder="Tell us a little bit about yourself"
                className="w-full max-w-xl rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
              <p className="text-xs text-[#8b949e]">
                You can @mention other users and organizations to link to them.
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-white"
              >
                Company
              </label>
              <input
                id="company"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className="w-full max-w-xl rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-white"
              >
                Location
              </label>
              <input
                id="location"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full max-w-xl rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-sm text-white focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-2 rounded-md border border-[rgba(255,255,255,0.1)] bg-[#238636] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#2ea043] disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Update profile"}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full shrink-0 md:w-[320px]">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-white">
              Profile picture
            </label>
            <div className="flex flex-col items-start gap-4">
              <div className="h-48 w-48 overflow-hidden rounded-full border border-[#30363d] bg-[#161b22]">
                {user.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={user.image}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-emerald-600 to-green-500 text-6xl font-bold text-white">
                    {(form.name || form.username || "U")[0].toUpperCase()}
                  </div>
                )}
              </div>
              <p className="text-xs leading-relaxed text-[#8b949e]">
                Your profile picture is managed by your OAuth provider (Google
                or GitHub).
                <br />
                <br />
                We will eventually support custom uploads, but for now you can
                change it on your provider&apos;s site and re-login.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-[#30363d] pt-6">
            <label className="block text-sm font-semibold text-white">
              Email
            </label>
            <div className="space-y-1.5">
              <div className="w-full cursor-not-allowed overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-sm text-ellipsis whitespace-nowrap text-[#8b949e] opacity-80">
                {user.email}
              </div>
              <p className="text-xs leading-relaxed text-[#8b949e]">
                Email is managed via your OAuth provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
