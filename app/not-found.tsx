import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0d1117] text-[#e6edf3]">
      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-12 text-center">
        <div className="mx-auto mt-8 flex max-w-lg flex-col items-center text-center">
          <div className="mb-2 text-[120px] leading-none font-black tracking-tighter text-[#238636] opacity-80">
            404
          </div>
          <h1 className="mb-3 text-4xl leading-none tracking-tighter text-[#e6edf3] sm:text-5xl">
            Oops! Page Not Found
          </h1>

          <p className="mb-8 text-lg leading-snug text-[#8b949e]">
            The page you&apos;re looking for doesn&apos;t exist. It might have
            been moved, deleted, or the URL might be incorrect.
          </p>

          <Link
            href="/"
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-[#238636] px-20 py-2.5 text-[16px] font-medium text-white transition-all hover:bg-[#2ea043] active:scale-[0.98]"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
