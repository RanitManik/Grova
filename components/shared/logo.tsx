import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface GrovaLogoProps {
  showText?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function GrovaLogo({
  showText = false,
  className,
  iconClassName = "h-7 w-7",
  textClassName = "",
}: GrovaLogoProps) {
  const id = useId();
  const gradientId = `grova-grad-${id.replace(/:/g, "")}`;

  const svgIcon = (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "shrink-0",
        className && !showText ? className : iconClassName,
      )}
    >
      <rect width="32" height="32" rx="6" fill={`url(#${gradientId})`} />
      <path
        d="M17.5 5.5L9.5 16.5H15.5L14.5 26.5L22.5 15.5H16.5L17.5 5.5Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={gradientId}
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
  );

  if (!showText) {
    return svgIcon;
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {svgIcon}
      <span
        className={cn(
          "text-base font-medium tracking-tight text-[#e6edf3]",
          textClassName,
        )}
      >
        Grova
      </span>
    </div>
  );
}
