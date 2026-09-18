import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve("out");
const base = (process.env.SITE_URL || "").replace(/\/+$/, "");
assert.match(base, /^https:\/\//, "Run this check against a static build with its explicit HTTPS SITE_URL.");
const indexable = process.env.SEARCH_INDEXING_ENABLED === "true";
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const titles = new Set();
const descriptions = new Set();
const pages = new Set();
const articleUrls = new Set();
let checkedFragments = 0;

// The checker reads our own deterministic static export, not arbitrary web HTML.
const files = walk(root).filter((file) => file.endsWith(".html"));
const content = files.filter((file) => !/(?:^|\/)(?:404|500|_not-found|_global-error)(?:\/|\.html$)/.test(relative(root, file).replaceAll("\\", "/")));
const documents = new Map(files.map((file) => [resolve(file), readFileSync(file, "utf8")]));

for (const file of content) {
  const html = documents.get(resolve(file));
  const path = relative(root, file).replaceAll("\\", "/").replace(/(?:^|\/)index\.html$/, "/");
  const url = `${base}/${path}`.replace(/([^:])\/{2,}/g, "$1/");
  const fail = (message) => `${path}: ${message}`;
  const meta = Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/g)].map((match) => { const a = attrs(match[0]); return [a.name || a.property, a.content]; }));
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attrs(match[0])).find((a) => a.rel === "canonical")?.href;
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || "");
  assert.ok(title && !titles.has(title), fail("missing or duplicate title"));
  titles.add(title);
  assert.ok(meta.description && !descriptions.has(meta.description), fail("missing or duplicate description"));
  descriptions.add(meta.description);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, fail("expected one H1"));
  assert.equal(canonical, url, fail("canonical must match the exported page"));
  assert.equal(meta["og:url"], url, fail("Open Graph URL must match canonical"));
  for (const key of ["og:title", "og:description", "og:image", "og:image:alt"]) assert.ok(meta[key], fail(`missing ${key}`));
  assert.equal(/\bnoindex\b/.test(meta.robots || ""), !indexable, fail("indexing policy drift"));
  assert.ok(indexable ? /\bindex\b/.test(meta.robots || "") : /\bnofollow\b/.test(meta.robots || ""), fail("missing search policy"));
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) assert.ok("alt" in attrs(tag[0]), fail("image missing ALT"));

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => { const data = JSON.parse(match[1]); return data["@graph"] || [data]; });
  assert.ok(schemas.some((schema) => schema["@type"] === "Organization" && schema["@id"] === `${base}/#organization`), fail("missing shared brand entity"));
  assert.ok(schemas.some((schema) => schema["@type"] === "WebSite" && schema["@id"] === `${base}/#website`), fail("missing website entity"));
  if (url !== `${base}/`) {
    const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
    assert.equal(breadcrumb?.itemListElement.at(-1)?.item, url, fail("breadcrumb does not match canonical"));
  }
  const article = schemas.find((schema) => schema["@type"] === "BlogPosting");
  if (article) {
    assert.equal(article.url, url, fail("article URL mismatch"));
    assert.equal(article.mainEntityOfPage, url, fail("article page mismatch"));
    assert.equal(article.publisher["@id"], `${base}/#organization`, fail("publisher identity drift"));
    articleUrls.add(url);
  }

  // Catch valid-page / invalid-fragment CTAs, which ordinary file checks miss.
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    const href = attrs(match[0]).href;
    if (!href || !href.includes("#")) continue;
    const target = new URL(href, url);
    if (!target.href.startsWith(`${base}/`) || !target.hash || target.hash.startsWith("#:~:")) continue;
    const localPath = target.pathname.slice(new URL(base).pathname.replace(/\/$/, "").length);
    const targetFile = resolve(root, `.${localPath}`, "index.html");
    const targetHtml = documents.get(targetFile);
    const id = decodeURIComponent(target.hash.slice(1));
    assert.ok(targetHtml && [...targetHtml.matchAll(/\bid="([^"]+)"/g)].some((entry) => decode(entry[1]) === id), fail(`unresolved fragment ${href}`));
    checkedFragments++;
  }
  pages.add(url);
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
assert.equal(sitemapUrls.length, new Set(sitemapUrls).size, "Duplicate sitemap URL");
assert.deepEqual(new Set(sitemapUrls), pages, "Sitemap must cover every published content page and no drafts/errors");
const feed = readFileSync(join(root, "feed.xml"), "utf8");
const feedUrls = [...feed.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)].map((match) => decode(match[1]));
assert.deepEqual(new Set(feedUrls), articleUrls, "RSS and published article URLs differ");
const robots = readFileSync(join(root, "robots.txt"), "utf8");
assert.ok(indexable ? robots.includes(`Sitemap: ${base}/sitemap.xml`) && !robots.includes("Disallow: /") : robots.includes("Disallow: /"), "Robots policy drift");
console.log(`SEO verified: ${pages.size} pages, ${articleUrls.size} articles, ${checkedFragments} fragment links; indexing ${indexable ? "enabled" : "disabled (preview)"}.`);
