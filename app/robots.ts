import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://grova.5dev.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/goals",
        "/analytics",
        "/settings",
        "/onboarding",
        "/api/",
        "/og-preview",
        "/test-error",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
