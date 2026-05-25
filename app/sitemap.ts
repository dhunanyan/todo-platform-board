import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dhunanyan.com/task-flow-board",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
