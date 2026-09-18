import type { MetadataRoute } from "next";
import { getSearchPolicy } from "@/lib/search-policy";
import { joinSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const { siteUrl, indexable } = getSearchPolicy();
  return indexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: joinSiteUrl(siteUrl, "/sitemap.xml") }
    : { rules: { userAgent: "*", disallow: "/" } };
}
