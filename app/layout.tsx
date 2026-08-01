import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Grova — Track Your Growth",
    template: "%s | Grova",
  },
  description:
    "Grova is a public productivity tracking platform. Set goals, build streaks, and share your progress with the world.",
  keywords: [
    "productivity",
    "goals",
    "streaks",
    "habit tracking",
    "public accountability",
  ],
  authors: [{ name: "Grova" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grova.app",
    siteName: "Grova",
    title: "Grova — Track Your Growth",
    description:
      "Set goals, build streaks, and share your progress with the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grova — Track Your Growth",
    description: "Set goals, build streaks, and share your progress.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#3fb950" showSpinner={false} />
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
