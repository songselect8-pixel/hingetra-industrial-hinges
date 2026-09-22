import type { ProductDetail } from "@/data/product-details";
import type { ProductFamily } from "@/data/products";
import { joinSiteUrl } from "@/lib/site-url";

export function buildProductSchema(baseUrl: string, detail: ProductDetail, product: ProductFamily) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: detail.title,
    description: detail.description,
    image: detail.gallery.map((image) => joinSiteUrl(baseUrl, image.src)),
    category: product.category,
    brand: { "@type": "Brand", name: "HINGETRA" },
    manufacturer: {
      "@type": "Organization",
      name: "HINGETRA",
      url: joinSiteUrl(baseUrl, "/"),
    },
    url: joinSiteUrl(baseUrl, product.detailPath),
  };
}

export function buildFaqSchema(detail: ProductDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
