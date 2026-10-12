import type { ProductDetail } from "@/data/product-details";

// These RFQ family pages have no public offers or reviews. Do not emit an
// incomplete Product snippet or use a zero price to represent a quotation.

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
