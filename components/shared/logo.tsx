import React from "react";

export function GrovaLogo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="6" fill="url(#grova-grad)" />
      <path
        d="M17.5 5.5L9.5 16.5H15.5L14.5 26.5L22.5 15.5H16.5L17.5 5.5Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="grova-grad"
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
}
