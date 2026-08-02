"use client";

import React from "react";
import Link from "next/link";
import { Zap, Globe, Mail } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0d1117] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#238636]">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Grova
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#8b949e]">
              Public goal tracking and GitHub-style heatmaps for builders,
              creators, and teams. Your daily progress is your reputation.
            </p>

            {/* Social & Creator Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/RanitManik/Grova"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] transition-all hover:border-[#8b949e] hover:text-white"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ranit-manik/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] transition-all hover:border-[#8b949e] hover:text-white"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:grova@5dev.in"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] transition-all hover:border-[#8b949e] hover:text-white"
                aria-label="Email Support"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://me.5dev.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-[#8b949e] transition-all hover:border-[#8b949e] hover:text-white"
                aria-label="Creator Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white">Navigation</h3>
            <ul className="mt-4 flex flex-col gap-3.5 text-xs text-[#8b949e]">
              <li>
                <a href="#home" className="underline-offset-4 hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#preview"
                  className="underline-offset-4 hover:underline"
                >
                  Product Preview
                </a>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="underline-offset-4 hover:underline"
                >
                  Explore Community
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="underline-offset-4 hover:underline"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="underline-offset-4 hover:underline"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white">Product</h3>
            <ul className="mt-4 flex flex-col gap-3.5 text-xs text-[#8b949e]">
              <li>
                <a
                  href="#features"
                  className="underline-offset-4 hover:underline"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="underline-offset-4 hover:underline"
                >
                  Key Advantages
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="underline-offset-4 hover:underline"
                >
                  Community Reviews
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="underline-offset-4 hover:underline"
                >
                  Pricing & Free Plan
                </a>
              </li>
              <li>
                <a href="#faq" className="underline-offset-4 hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Open Source (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white">
              Legal & Open Source
            </h3>
            <ul className="mt-4 flex flex-col gap-3.5 text-xs text-[#8b949e]">
              <li>
                <a
                  href="https://github.com/RanitManik/Grova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  Open Repository
                </a>
              </li>
              <li>
                <a
                  href="https://me.5dev.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  Creator Website
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sponsors/RanitManik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  Sponsor Project
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="underline-offset-4 hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="mt-12 border-t border-[#30363d] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#8b949e] sm:flex-row">
            <div>
              © 2026 Grova. All rights reserved. Built by{" "}
              <a
                href="https://me.5dev.in"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                Ranit Manik
              </a>
              .
            </div>

            {/* Radar Ping System Status Indicator */}
            <div className="flex items-center gap-2 text-[#3fb950]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3fb950] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3fb950]" />
              </span>
              <span className="text-xs font-medium text-[#3fb950]">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
