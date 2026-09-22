import { joinSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailTemplate } from "@/components/products/detail/ProductDetailTemplate";
import { getProductDetailBySlug } from "@/data/product-details";
import { getProduct, products } from "@/data/products";
import { site } from "@/data/site";
import { buildFaqSchema, buildProductSchema } from "@/lib/product-schema";
import "../products.css";
import "../bearing-weld-on-hinges/product-detail.css";

type ProductPageProps = { params: Promise<{ slug: string }> };
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.filter((product) => product.id !== "bearing").map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getProductDetailBySlug(slug);
  if (!detail) return {};
  const product = getProduct(detail.productId)!;
  const title = `${detail.seoTitle} | ${site.brand}`;
  const hero = detail.gallery[0];

  return {
    title,
    description: detail.seoDescription,
    alternates: { canonical: product.detailPath },
    openGraph: {
      title,
      description: detail.seoDescription,
      url: product.detailPath,
      type: "website",
      locale: "en_US",
      siteName: site.brand,
      images: hero ? [{ url: hero.src, width: hero.width, height: hero.height, alt: hero.alt }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const detail = getProductDetailBySlug(slug);
  if (!detail || detail.productId === "bearing") notFound();
  const product = getProduct(detail.productId)!;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "Products", item: joinSiteUrl(baseUrl, "/products") },
      { "@type": "ListItem", position: 3, name: detail.title, item: joinSiteUrl(baseUrl, product.detailPath) },
    ],
  };
  const productSchema = buildProductSchema(baseUrl, detail, product);
  const faqSchema = buildFaqSchema(detail);

  return <>
    <ProductDetailTemplate detail={detail} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
  </>;
}
