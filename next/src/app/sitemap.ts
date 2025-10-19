import { MetadataRoute } from "next";
import { getWordPressPosts, getWordPressEvents } from "@/lib/wordpress-data";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/nieuws`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/agenda`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sponsors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/over-levy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/club-van-100`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/media`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  let eventRoutes: MetadataRoute.Sitemap = [];
  
  // Only fetch WordPress data if API URL is configured
  if (process.env.NEXT_PUBLIC_WP_API_URL) {
    try {
      const postsRes = await getWordPressPosts({ per_page: 100, order: "desc", orderby: "date" }, 600);
      postRoutes = postsRes.items.map((post) => {
        const year = new Date(post.date).getFullYear();
        return {
          url: `${SITE_URL}/nieuws/${year}/${post.slug}`,
          lastModified: new Date(post.modified),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        };
      });
    } catch (error) {
      console.error("Error fetching posts for sitemap:", error);
    }

    try {
      const eventsRes = await getWordPressEvents({ per_page: 100, order: "asc" }, 600);
      eventRoutes = eventsRes.items.map((event) => {
        const year = new Date(event.meta?.datum || event.date).getFullYear();
        return {
          url: `${SITE_URL}/agenda/${year}/${event.slug}`,
          lastModified: new Date(event.modified),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      });
    } catch (error) {
      console.error("Error fetching events for sitemap:", error);
    }
  }

  return [...baseRoutes, ...postRoutes, ...eventRoutes];
}
