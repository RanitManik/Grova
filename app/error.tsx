"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0d1117] text-[#e6edf3]">
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-12 text-center">
        <div className="mx-auto mt-8 flex max-w-lg flex-col items-center text-center">
          <div className="mb-2 text-[120px] leading-none font-black tracking-tighter text-[#238636] opacity-80">
            500
          </div>

          <h1 className="mb-3 text-4xl leading-none tracking-tighter text-[#e6edf3] sm:text-5xl">
            Oops! Unexpected Error
          </h1>

          <p className="mb-8 text-lg leading-snug text-[#8b949e]">
            An unexpected error occurred while processing your request. Please
            try again or return home.
          </p>

          <button
            onClick={() => reset()}
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-[#238636] px-20 py-2.5 text-[16px] font-medium text-white transition-all hover:bg-[#2ea043] active:scale-[0.98]"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
