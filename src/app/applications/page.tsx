import { joinSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { ApplicationsPageContent } from "@/components/applications/ApplicationsPageContent";
import { InquiryProvider } from "@/components/inquiry/InquiryProvider";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { RFQSection } from "@/components/sections/RFQSection";
import { site } from "@/data/site";
import "./applications.css";

const title = `Weld-On Hinges for Machine Enclosures & Doors | ${site.brand}`;
const description = "Explore heavy-duty weld-on hinge applications: machine enclosures, electrical control cabinets, steel doors, security gates, and trailer ramp hinges.";
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/applications" },
  openGraph: {
    title,
    description,
    url: "/applications",
    type: "website",
    locale: "en_US",
    siteName: site.brand,
    images: [{
      url: "/images/illustrations/application-control-cabinet.png",
      width: 1448,
      height: 1086,
      alt: "Illustration of weld-on hinges on an industrial control cabinet door",
    }],
  },
};

export default function ApplicationsPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "Applications", item: joinSiteUrl(baseUrl, "/applications") },
    ],
  };

  return (
    <div id="applications-top" className="applications-page">
      <InquiryProvider>
        <Header currentPage="applications" rfqHref="#rfq" />
        <main id="main-content">
          <ApplicationsPageContent />
          <RFQSection formOptions={{
            allowDrawing: true,
            contextLabel: "Applications page",
            productLabel: "Preferred hinge type",
            submitLabel: "Request a Recommendation",
          }} />
        </main>
        <Footer currentPage="applications" rfqHref="#rfq" />
      </InquiryProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
    </div>
  );
}
