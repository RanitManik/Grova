"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Share2, Copy, Check, Sparkles, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  username: string;
  name?: string;
  className?: string;
}

export function ShareButton({ username, name, className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = name || username;
  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${username}`
      : `https://grova.5dev.in/${username}`;

  const shareText = `Check out ${displayName} (@${username})'s streak progress and daily habit goals on Grova!`;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success("Profile link copied to clipboard!");
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} (@${username}) — Grova`,
          text: shareText,
          url: profileUrl,
        });
        setIsOpen(false);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Could not share profile.");
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleShareWhatsapp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleShareLinkedin = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-3.5 py-1.5 text-xs font-semibold text-[#c9d1d9] transition-all duration-150 hover:border-[#8b949e] hover:bg-[#30363d] hover:text-white",
          isOpen && "border-[#8b949e] bg-[#30363d] text-white",
          className,
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Share2 className="h-3.5 w-3.5 text-[#00e676]" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="animate-in fade-in-80 zoom-in-95 absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg border border-[#30363d] bg-[#161b22] p-1.5 shadow-xl ring-1 ring-black/5 focus:outline-none">
          {/* Section Header */}
          <div className="px-2.5 py-1.5 text-[11px] font-semibold tracking-wider text-[#8b949e] uppercase">
            Share Profile
          </div>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-xs text-[#c9d1d9] transition-colors hover:bg-[#21262d] hover:text-white"
          >
            <div className="flex items-center gap-2">
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[#3fb950]" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-[#8b949e]" />
              )}
              <span>{copied ? "Link Copied!" : "Copy Profile Link"}</span>
            </div>
            {copied && (
              <span className="text-[10px] font-medium text-[#3fb950]">
                Copied
              </span>
            )}
          </button>

          {/* Native Mobile Share (if available) */}
          {typeof navigator !== "undefined" &&
            typeof navigator.share === "function" && (
              <button
                onClick={handleNativeShare}
                className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-xs text-[#c9d1d9] transition-colors hover:bg-[#21262d] hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5 text-[#00e676]" />
                <span>Share via Device...</span>
              </button>
            )}

          <div className="my-1 h-px bg-[#30363d]" />

          {/* Social Share Options */}
          <button
            onClick={handleShareTwitter}
            className="flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-xs text-[#c9d1d9] transition-colors hover:bg-[#21262d] hover:text-white"
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-3.5 w-3.5 fill-current text-[#1d9bf0]"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Share on X / Twitter</span>
            </div>
            <ExternalLink className="h-3 w-3 text-[#6e7681]" />
          </button>

          <button
            onClick={handleShareWhatsapp}
            className="flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-xs text-[#c9d1d9] transition-colors hover:bg-[#21262d] hover:text-white"
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-3.5 w-3.5 fill-current text-[#25d366]"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Share on WhatsApp</span>
            </div>
            <ExternalLink className="h-3 w-3 text-[#6e7681]" />
          </button>

          <button
            onClick={handleShareLinkedin}
            className="flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-xs text-[#c9d1d9] transition-colors hover:bg-[#21262d] hover:text-white"
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-3.5 w-3.5 fill-current text-[#0a66c2]"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>Share on LinkedIn</span>
            </div>
            <ExternalLink className="h-3 w-3 text-[#6e7681]" />
          </button>

          <div className="my-1 h-px bg-[#30363d]" />

          {/* Social Card Preview Tool Link */}
          <a
            href={`/og-preview?username=${username}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-xs text-[#c9d1d9] transition-colors hover:bg-[#21262d] hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#e3b341]" />
              <span>Preview Card & Meta</span>
            </div>
            <ExternalLink className="h-3 w-3 text-[#6e7681]" />
          </a>
        </div>
      )}
    </div>
  );
}
