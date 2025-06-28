import { Data } from "@/data/portfolio-data";
import { MetadataRoute } from "next";

const staticRoutes = [
  "",
  "/about",
  "/testimonials",
  "/projects",
  "/services",
  "/sponsors",
  "/blogs",
  "/videos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  let sitemap: MetadataRoute.Sitemap = [];
  staticRoutes.forEach((route) => {
    sitemap = [
      {
        url: `${Data.url}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  });
  return sitemap;
}
