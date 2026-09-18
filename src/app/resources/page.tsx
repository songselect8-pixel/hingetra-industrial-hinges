import { joinSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { InquiryProvider } from "@/components/inquiry/InquiryProvider";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { ResourcesIndexContent } from "@/components/resources/ResourcesIndexContent";
import { site } from "@/data/site";
import "./resources.css";

const title = `Industrial Hinge Resources | Selection & Technical Guides | ${site.brand}`;
const description = "Technical guides, application insights and product-selection information for industrial weld-on hinge buyers.";
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resources" },
  openGraph: { title, description, url: "/resources", type: "website", locale: "en_US", siteName: site.brand, images: [{ url: "/images/hinge-pin-hero.jpg", width: 5252, height: 3505, alt: "Industrial pin-type weld-on hinge product photograph" }] },
};

export default function ResourcesPage() {
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "Resources", item: joinSiteUrl(baseUrl, "/resources") },
    ],
  };
  return <div id="resources-top" className="resources-page"><InquiryProvider><Header currentPage="resources" rfqHref="/contact#contact-rfq" /><main id="main-content"><ResourcesIndexContent /></main><Footer currentPage="resources" rfqHref="/contact#contact-rfq" /></InquiryProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\u003c") }} /></div>;
}
