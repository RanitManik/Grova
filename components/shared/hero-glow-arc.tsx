"use client";

import React from "react";

export function HeroGlowArc() {
  return (
    <div className="pointer-events-none relative mx-auto -mt-6 mb-2 w-full max-w-6xl overflow-visible select-none">
      {/* Soft background radial ambient light */}
      <div className="absolute top-1/2 left-1/2 h-32.5 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-emerald-500/15 opacity-75 blur-[90px]" />

      {/* Edge-to-edge SVG Arc Light Beam */}
      <svg
        viewBox="0 0 1200 160"
        className="h-auto w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Seamless green arc gradient - matching Grova brand #3fb950 */}
          <linearGradient
            id="seamless-green-arc"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3fb950" stopOpacity="0" />
            <stop offset="15%" stopColor="#3fb950" stopOpacity="0.25" />
            <stop offset="35%" stopColor="#39d353" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#56ff7a" stopOpacity="1" />
            <stop offset="65%" stopColor="#39d353" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#3fb950" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3fb950" stopOpacity="0" />
          </linearGradient>

          {/* Seamless inner white core filament */}
          <linearGradient
            id="seamless-white-core"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter
            id="glow-blur-wide"
            filterUnits="userSpaceOnUse"
            x="-300"
            y="-200"
            width="1800"
            height="600"
          >
            <feGaussianBlur stdDeviation="32" result="blur" />
          </filter>

          <filter
            id="glow-blur-mid"
            filterUnits="userSpaceOnUse"
            x="-300"
            y="-200"
            width="1800"
            height="600"
          >
            <feGaussianBlur stdDeviation="12" result="blur" />
          </filter>
        </defs>

        {/* Outer wide ambient glow stroke */}
        <path
          d="M -100 0 Q 600 155 1300 0"
          stroke="url(#seamless-green-arc)"
          strokeWidth="70"
          strokeLinecap="round"
          fill="none"
          className="opacity-40"
          filter="url(#glow-blur-wide)"
        />

        {/* Mid glow stroke */}
        <path
          d="M -100 0 Q 600 155 1300 0"
          stroke="url(#seamless-green-arc)"
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
          className="opacity-75"
          filter="url(#glow-blur-mid)"
        />

        {/* Sharp main green beam line */}
        <path
          d="M -100 0 Q 600 155 1300 0"
          stroke="url(#seamless-green-arc)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          className="opacity-95"
        />

        {/* Inner white highlight core */}
        <path
          d="M 100 14 Q 600 155 1100 14"
          stroke="url(#seamless-white-core)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          className="opacity-80"
        />
      </svg>
    </div>
  );
}
