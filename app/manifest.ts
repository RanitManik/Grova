import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Grova — Goal Tracking & Habit Building",
    short_name: "Grova",
    description:
      "Transform long-term goals into visual streaks, daily consistency heatmaps, and community accountability.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#238636",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
