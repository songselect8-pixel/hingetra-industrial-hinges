import { joinSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { CustomHingesPageContent } from "@/components/custom-hinges/CustomHingesPageContent";
import { CustomRFQSection } from "@/components/custom-hinges/CustomRFQSection";
import { InquiryProvider } from "@/components/inquiry/InquiryProvider";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { site } from "@/data/site";
import { illustrations } from "@/data/illustrations";
import "./custom-hinges.css";

const title = `Custom Weld-On Hinges | Made to Drawing | ${site.brand}`;
const description = "Discuss custom weld-on hinge dimensions, structures and drawings for review before quotation. Explore catalog-supported customizable hinge families.";
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/custom-hinges" },
  openGraph: {
    title,
    description,
    url: "/custom-hinges",
    type: "website",
    locale: "en_US",
    siteName: site.brand,
    images: [{
      url: illustrations.engineering.src,
      width: illustrations.engineering.width,
      height: illustrations.engineering.height,
      alt: illustrations.engineering.alt,
    }],
  },
};

export default function CustomHingesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "Custom Hinges", item: joinSiteUrl(baseUrl, "/custom-hinges") },
    ],
  };

  return (
    <div id="custom-hinges-top" className="custom-hinges-page">
      <InquiryProvider>
        <Header currentPage="custom-hinges" rfqHref="#rfq" />
        <main id="main-content">
          <CustomHingesPageContent />
          <CustomRFQSection />
        </main>
        <Footer currentPage="custom-hinges" rfqHref="#rfq" />
      </InquiryProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
    </div>
  );
}
