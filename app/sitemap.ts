import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://grova.app";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Fetch active public users for sitemap
  try {
    const users = await db.user.findMany({
      where: { username: { not: null } },
      select: { username: true, updatedAt: true },
      take: 500,
    });

    const userRoutes: MetadataRoute.Sitemap = users.map((user) => ({
      url: `${baseUrl}/${user.username}`,
      lastModified: user.updatedAt,
      changeFrequency: "daily",
      priority: 0.8,
    }));

    return [...staticRoutes, ...userRoutes];
  } catch {
    return staticRoutes;
  }
}
