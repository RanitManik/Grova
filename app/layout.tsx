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

const baseUrl = process.env.NEXTAUTH_URL || "https://grova.5dev.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Grova — Goal Tracking & Habit Building SaaS",
    template: "%s | Grova",
  },
  description:
    "Grova is a public goal tracking and habit building platform. Build daily streaks, visualize consistency heatmaps, and achieve your targets with community accountability.",
  keywords: [
    "habit tracker",
    "goal tracker",
    "streak counter",
    "consistency heatmap",
    "productivity app",
    "public accountability",
    "goal setting software",
    "daily habit builder",
    "Grova",
  ],
  authors: [{ name: "Ranit Manik", url: "https://github.com/RanitManik" }],
  creator: "Ranit Manik",
  publisher: "Grova",
  applicationName: "Grova",
  category: "productivity",
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/logo.svg" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Grova",
    title: "Grova — Goal Tracking & Habit Building SaaS",
    description:
      "Transform long-term goals into visual streaks, daily consistency heatmaps, and community accountability.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Grova — Goal Tracking & Habit Building SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grova — Goal Tracking & Habit Building SaaS",
    description:
      "Transform long-term goals into visual streaks, daily consistency heatmaps, and community accountability.",
    images: ["/og.png"],
    creator: "@RanitManik",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Grova",
  operatingSystem: "All",
  applicationCategory: "ProductivityApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Transform long-term goals into visual streaks, daily consistency heatmaps, and community accountability.",
  url: baseUrl,
  author: {
    "@type": "Person",
    name: "Ranit Manik",
    url: "https://github.com/RanitManik",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
