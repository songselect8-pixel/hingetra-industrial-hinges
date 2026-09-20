import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { productApplications, products } from "../src/data/products.ts";
import {
  getPublishedResources,
  getRelatedResources,
  getResourceArticle,
  getResourceReadingTime,
  getResourceTableOfContents,
  getVisibleResourceCategories,
  isPublicResource,
  paginateResources,
  resourceArticles,
  resourceCategories,
  resourcePublisher,
} from "../src/content/resources/index.ts";

test("Resources registry publishes the ten approved guides", () => {
  const published = getPublishedResources();
  assert.equal(resourceArticles.length, 10);
  assert.equal(published.length, 10);
  assert.ok(published.every((article) => !article.draft && !article.noindex));
  assert.equal(new Set(published.map((article) => article.slug)).size, 10);
  assert.equal(new Set(published.map((article) => article.title)).size, 10);
  assert.equal(new Set(published.map((article) => article.description)).size, 10);
  assert.deepEqual(
    published.map((article) => article.slug),
    [
      "how-to-choose-weld-on-hinges",
      "weld-on-hinge-sizes",
      "weld-on-hinges-for-gates-trailer-doors-and-ramps",
      "weld-on-hinges-for-electrical-control-cabinets",
      "standard-vs-custom-weld-on-hinges",
      "prepare-hinge-drawing-dimension-request",
      "bullet-barrel-weld-on-hinge-names",
      "bearing-pin-washer-weld-on-hinges",
      "grease-fitting-weld-on-hinges",
      "weld-on-hinge-alignment-and-removal-clearance",
    ],
  );
});

test("Resources categories stay extensible while empty categories remain hidden", () => {
  assert.deepEqual(resourceCategories.map((category) => category.id), [
    "selection-guides",
    "application-guides",
    "technical-guides",
    "custom-manufacturing",
    "manufacturing-quality",
  ]);
  assert.deepEqual(getVisibleResourceCategories().map((category) => category.id), [
    "selection-guides",
    "application-guides",
    "technical-guides",
    "custom-manufacturing",
  ]);
});

test("Every guide has publisher, useful structure, generated TOC, and automatic reading time", () => {
  assert.equal(resourcePublisher.name, "Hingetra Industrial Hinges");
  for (const article of getPublishedResources()) {
    assert.equal(article.author, resourcePublisher.name);
    assert.equal(article.publishedAt, article.order <= 6 ? "2026-09-02" : "2026-09-20");
    assert.equal(article.updatedAt, article.order <= 6 ? "2026-09-20" : null);
    assert.ok(article.featuredImage.startsWith("/images/"));
    assert.ok(article.featuredImageAlt.length > 24);
    assert.ok(article.keywords.length >= 3);
    assert.ok(article.keyTakeaways.length >= 3);
    const toc = getResourceTableOfContents(article);
    assert.ok(toc.length >= 4, article.slug);
    assert.equal(toc[0].level, 2);
    assert.equal(new Set(toc.map((item) => item.id)).size, toc.length);
    assert.ok(getResourceReadingTime(article) >= 1, article.slug);
  }
});

test("Product, application, and related-resource links are explicit and valid", () => {
  const productIds = new Set(products.map((product) => product.id));
  const applicationIds = new Set(productApplications.map((application) => application.id));
  const signatures = new Set<string>();
  for (const article of getPublishedResources()) {
    assert.ok(article.relatedProducts.every((id) => productIds.has(id)), article.slug);
    assert.ok(article.relatedApplications.every((id) => applicationIds.has(id)), article.slug);
    const related = getRelatedResources(article);
    assert.ok(related.length >= 2 && related.length <= 4, article.slug);
    assert.ok(related.every((item) => item.slug !== article.slug), article.slug);
    assert.equal(new Set(related.map((item) => item.slug)).size, related.length);
    signatures.add(related.map((item) => item.slug).join("|"));
  }
  assert.ok(signatures.size >= 5);
  assert.deepEqual(getResourceArticle("weld-on-hinges-for-gates-trailer-doors-and-ramps")?.relatedProducts, ["12-14-16-type"]);
  assert.deepEqual(getResourceArticle("weld-on-hinges-for-electrical-control-cabinets")?.relatedProducts, ["bearing", "pin", "gasket", "grease-nipple", "20-type"]);
});

test("Listing pagination is ready but unnecessary for ten guides", () => {
  const page = paginateResources(getPublishedResources(), 1, 12);
  assert.equal(page.totalItems, 10);
  assert.equal(page.totalPages, 1);
  assert.equal(page.items.length, 10);
  assert.equal(page.hasPreviousPage, false);
  assert.equal(page.hasNextPage, false);
});

test("Draft and noindex guides remain outside public publication", () => {
  const article = resourceArticles[0];
  assert.equal(isPublicResource({ ...article, draft: true }), false);
  assert.equal(isPublicResource({ ...article, noindex: true }), false);
  assert.equal(isPublicResource({ ...article, draft: false, noindex: false }), true);
});

test("Published guides avoid unsupported technical and commercial claims", () => {
  const publicText = JSON.stringify(getPublishedResources());
  for (const pattern of [
    // Buyer guidance can explain that product mass is not a load rating.
    // Numeric load claims still require new, model-specific evidence.
    /\b(?:load (?:rating|capacity)|rated load)\s*(?:of|:|=|up to)?\s*\d/i,
    /\b\d+(?:\.\d+)?\s*(?:kg|lbs?|kilograms?|pounds?)\s+(?:load|capacity)/i,
    /material grade/i,
    /\b(?:ISO|AQL)\b/i,
    /certif(?:ied|ication)/i,
    /\bMOQ\b/i,
    /lead time/i,
    /production capacity/i,
    /tolerance (?:value|of|±)/i,
    /world(?:'s|s) best|number one manufacturer|top quality/i,
  ]) assert.doesNotMatch(publicText, pattern);
});

test("Resources routes use the shared design system and reusable article template", () => {
  for (const file of [
    "src/app/resources/page.tsx",
    "src/app/resources/[slug]/page.tsx",
    "src/components/resources/ResourcesIndexContent.tsx",
    "src/components/resources/ResourceArticleTemplate.tsx",
    "src/components/resources/ResourceCard.tsx",
  ]) assert.ok(existsSync(resolve(file)), file);

  const indexPage = readFileSync(resolve("src/app/resources/page.tsx"), "utf8");
  const articlePage = readFileSync(resolve("src/app/resources/[slug]/page.tsx"), "utf8");
  const template = readFileSync(resolve("src/components/resources/ResourceArticleTemplate.tsx"), "utf8");
  assert.match(indexPage, /<Header currentPage="resources"/);
  assert.match(indexPage, /<ResourcesIndexContent/);
  assert.match(articlePage, /generateStaticParams/);
  assert.match(articlePage, /generateMetadata/);
  assert.match(articlePage, /BlogPosting/);
  assert.match(articlePage, /BreadcrumbList/);
  assert.match(template, /Table of Contents/);
  assert.match(template, /Key Takeaways/);
  assert.match(template, /Related Products/);
  assert.match(template, /Related Resources/);
  assert.match(template, /ResourceArticleBody/);
});

test("Resources navigation, RSS, and sitemap publishing are explicit", () => {
  const siteData = readFileSync(resolve("src/data/site.ts"), "utf8");
  const header = readFileSync(resolve("src/components/navigation/Header.tsx"), "utf8");
  const footer = readFileSync(resolve("src/components/navigation/Footer.tsx"), "utf8");
  assert.match(siteData, /label: "Quality"[\s\S]*label: "Resources"[\s\S]*label: "About Us"/);
  assert.match(header, /"resources"/);
  assert.match(footer, /Hinge selection guides/);
  assert.match(footer, /Application guides/);
  assert.match(footer, /Technical guides/);

  const sitemap = readFileSync(resolve("src/app/sitemap.ts"), "utf8");
  assert.match(sitemap, /getPublishedResources/);
  assert.match(sitemap, /article\.slug/);
  const feed = readFileSync(resolve("src/app/feed.xml/route.ts"), "utf8");
  assert.match(feed, /application\/rss\+xml/);
  assert.match(feed, /getPublishedResources/);
});
