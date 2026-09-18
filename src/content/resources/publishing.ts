import type { ResourceArticle, ResourceContentBlock, ResourceRichText, ResourceTocItem } from "./types.ts";
import { site } from "../../data/site.ts";

export const resourcePublisher = {
  name: site.companyName,
  type: "Organization",
} as const;

function richTextValue(content: ResourceRichText) {
  return content.map((part) => typeof part === "string" ? part : part.text).join(" ");
}

function blockText(block: ResourceContentBlock): string {
  if (block.type === "heading") return block.title;
  if (block.type === "paragraph" || block.type === "callout") return richTextValue(block.content);
  if (block.type === "list") return block.items.map(richTextValue).join(" ");
  if (block.type === "image") return `${block.alt} ${block.caption}`;
  if (block.type === "product-table") return `${block.title} ${block.description}`;
  return `${block.caption} ${block.columns.join(" ")} ${block.rows.flat().join(" ")} ${block.note ?? ""}`;
}

export function isPublicResource(article: ResourceArticle) {
  return !article.draft && !article.noindex;
}

export function getResourceWordCount(article: ResourceArticle) {
  const text = [article.title, article.description, article.introduction, ...article.keyTakeaways, ...article.content.map(blockText)].join(" ");
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

export function getResourceReadingTime(article: ResourceArticle) {
  return Math.max(1, Math.ceil(getResourceWordCount(article) / 220));
}

export function getResourceTableOfContents(article: ResourceArticle): readonly ResourceTocItem[] {
  return article.content.flatMap((block) => block.type === "heading" ? [{ id: block.id, title: block.title, level: block.level }] : []);
}

export function paginateResources(articles: readonly ResourceArticle[], page: number, pageSize: number) {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const totalItems = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(page)), totalPages);
  const start = (currentPage - 1) * safePageSize;
  return {
    items: articles.slice(start, start + safePageSize),
    currentPage,
    totalItems,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  } as const;
}
