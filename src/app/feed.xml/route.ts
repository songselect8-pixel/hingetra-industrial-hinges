import { getPublishedResources } from "@/content/resources";
import { site } from "@/data/site";
import { joinSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const baseUrl = (process.env.SITE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]!);
}

export function GET() {
  const articles = getPublishedResources();
  const lastBuildDate = articles.reduce((latest, article) => {
    const value = article.updatedAt ?? article.publishedAt;
    return value > latest ? value : latest;
  }, "2026-09-02");
  const items = articles.map((article) => {
    const url = joinSiteUrl(baseUrl, `/resources/${article.slug}`);
    return `<item><title>${escapeXml(article.title)}</title><link>${escapeXml(url)}</link><guid isPermaLink="true">${escapeXml(url)}</guid><description>${escapeXml(article.description)}</description><pubDate>${new Date(`${article.publishedAt}T00:00:00Z`).toUTCString()}</pubDate></item>`;
  }).join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(`${site.brand} Industrial Hinge Resources`)}</title><link>${escapeXml(joinSiteUrl(baseUrl, "/resources"))}</link><description>${escapeXml("Technical guides and product-selection information for industrial weld-on hinge buyers.")}</description><language>en</language><lastBuildDate>${new Date(`${lastBuildDate}T00:00:00Z`).toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
