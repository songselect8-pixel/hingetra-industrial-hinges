import { joinSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticleTemplate } from "@/components/resources/ResourceArticleTemplate";
import { getPublishedResources, getResourceArticle, isPublicResource, resourcePublisher } from "@/content/resources";
import { site } from "@/data/site";
import { buildResourceFaqSchema } from "@/lib/resource-schema";
import "../resources.css";
import "./article.css";

type ResourcePageProps = { params: Promise<{ slug: string }> };
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedResources().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceArticle(slug);
  if (!article || !isPublicResource(article)) return {};
  const path = `/resources/${article.slug}`;
  const title = `${article.title} | ${site.brand}`;
  return {
    title,
    description: article.description,
    keywords: [...article.keywords],
    alternates: { canonical: path },
    openGraph: {
      title,
      description: article.description,
      url: path,
      type: "article",
      locale: "en_US",
      siteName: site.brand,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? undefined,
      images: [{ url: article.featuredImage, width: article.featuredImageWidth, height: article.featuredImageHeight, alt: article.featuredImageAlt }],
    },
  };
}

export default async function ResourceArticlePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const article = getResourceArticle(slug);
  if (!article || !isPublicResource(article)) notFound();
  const url = joinSiteUrl(baseUrl, `/resources/${article.slug}`);
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "Resources", item: joinSiteUrl(baseUrl, "/resources") },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    inLanguage: "en",
    isPartOf: { "@id": `${joinSiteUrl(baseUrl, "/")}#website` },
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    image: joinSiteUrl(baseUrl, article.featuredImage),
    mainEntityOfPage: url,
    publisher: { "@type": "Organization", "@id": `${joinSiteUrl(baseUrl, "/")}#organization`, name: resourcePublisher.name, logo: { "@type": "ImageObject", url: joinSiteUrl(baseUrl, site.logo) } },
  };
  const faqSchema = buildResourceFaqSchema(article, url);
  return <>
    <ResourceArticleTemplate article={article} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
    {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />}
  </>;
}
