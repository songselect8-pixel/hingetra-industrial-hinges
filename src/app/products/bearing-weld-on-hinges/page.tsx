import { joinSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { bearingDetail } from "@/data/product-details";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";
import { buildFaqSchema, buildProductSchema } from "@/lib/product-schema";
import { ProductDetailTemplate } from "@/components/products/detail/ProductDetailTemplate";
import "../products.css";
import "./product-detail.css";

const product = getProduct(bearingDetail.productId)!;
const title = `Bearing Type Weld-On Hinges | Sizes & Drawings | ${site.brand}`;
const description = "View bearing type weld-on hinge photographs, 18 published sizes and weights, and the original catalog drawing. Send your dimensions or drawing with an RFQ.";
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: product.detailPath },
  openGraph: { title, description, url: product.detailPath, type: "website", locale: "en_US", siteName: site.brand, images: [{ url: product.images[0].src, width: 800, height: 800, alt: product.images[0].alt }] },
};

export default function BearingWeldOnHingesPage() {
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "Products", item: joinSiteUrl(baseUrl, "/products") },
      { "@type": "ListItem", position: 3, name: bearingDetail.title, item: joinSiteUrl(baseUrl, product.detailPath) },
    ],
  };
  const productSchema = buildProductSchema(baseUrl, bearingDetail, product);
  const faqSchema = buildFaqSchema(bearingDetail);

  return <>
    <ProductDetailTemplate detail={bearingDetail} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
  </>;
}
