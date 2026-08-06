import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXTAUTH_URL || "https://grova.5dev.in";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
    { media: "(prefers-color-scheme: light)", color: "#0d1117" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Grova · Public Goal Tracker & Habit Builder",
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
    canonical: baseUrl,
  },
  icons: {
    icon: [
      { url: `${baseUrl}/logo.svg`, type: "image/svg+xml" },
      { url: `${baseUrl}/icon.png`, type: "image/png", sizes: "32x32" },
      { url: `${baseUrl}/favicon.ico`, sizes: "any" },
    ],
    apple: [
      { url: `${baseUrl}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/`,
    siteName: "Grova",
    title: "Grova · Public Goal Tracker & Habit Builder",
    description:
      "Transform long-term goals into visual streaks, daily consistency heatmaps, and community accountability.",
    images: [
      {
        url: `${baseUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Grova · Public Goal Tracker & Habit Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grova · Public Goal Tracker & Habit Builder",
    description:
      "Transform long-term goals into visual streaks, daily consistency heatmaps, and community accountability.",
    images: [`${baseUrl}/og.png`],
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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Grova",
      description: "Public Goal Tracker & Habit Builder",
      publisher: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Grova",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.svg`,
        },
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/explore?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${baseUrl}/#software`,
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
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
        <Toaster richColors theme="dark" position="bottom-right" />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
