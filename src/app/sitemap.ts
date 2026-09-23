import type { MetadataRoute } from "next";
import { getPublishedResources } from "@/content/resources";
import { navigation } from "@/data/site";
import { products } from "@/data/products";
import { joinSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const baseUrl = (process.env.SITE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");

// This launch-ready inventory does not override the global preview noindex gate.
// Modification dates are emitted only where the content source provides a verifiable date.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/products", ...navigation.filter((item) => item.href.startsWith("/")).map((item) => item.href)];
  const productPages = products.filter((product) => product.detailPagePublished).map((product) => product.detailPath);
  const articles = getPublishedResources().map((article) => ({
    url: joinSiteUrl(baseUrl, `/resources/${article.slug}`),
    lastModified: new Date(`${article.updatedAt ?? article.publishedAt}T00:00:00Z`),
  }));
  return [
    ...[...new Set([...pages, ...productPages])].map((path) => ({ url: joinSiteUrl(baseUrl, path) })),
    ...articles,
  ];
}
