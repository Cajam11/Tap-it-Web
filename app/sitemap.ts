import type { MetadataRoute } from "next";

import { siteUrl } from "./seo-content";
import { allPageSeo, legalPageSeo } from "./site-pages";

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
    ...allPageSeo.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Právne dokumenty patria do sitemapy, ale nesúťažia o pozornosť s
    // obchodnými stránkami — menia sa zriedka a majú nižšiu prioritu.
    ...legalPageSeo.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: new Date(page.updated ?? lastModified),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
