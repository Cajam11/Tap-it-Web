import type { MetadataRoute } from "next";

import { siteUrl } from "./seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  // Evaluated at build time, so a deploy always ships a truthful lastModified
  // instead of the hardcoded date it used to carry.
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
