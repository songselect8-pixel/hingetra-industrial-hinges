import type { ResourceArticle, ResourceParagraphBlock } from "@/content/resources/types";

function paragraphText(block: ResourceParagraphBlock) {
  return block.content.map((item) => typeof item === "string" ? item : item.text).join("");
}

export function getResourceFaqs(article: ResourceArticle) {
  const faqs = [];
  for (let index = 0; index < article.content.length - 1; index += 1) {
    const heading = article.content[index];
    const answer = article.content[index + 1];
    if (heading.type !== "heading" || heading.level !== 3 || answer.type !== "paragraph") continue;
    faqs.push({ question: heading.title, answer: paragraphText(answer) });
  }
  return faqs;
}

export function buildResourceFaqSchema(article: ResourceArticle, url: string) {
  const faqs = getResourceFaqs(article);
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
