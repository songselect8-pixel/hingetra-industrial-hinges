import { joinSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { InquiryProvider } from "@/components/inquiry/InquiryProvider";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { AboutCapabilities } from "@/components/about/AboutCapabilities";
import { AboutCompanyEvidence } from "@/components/about/AboutCompanyEvidence";
import { AboutCTASection } from "@/components/about/AboutCTASection";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { aboutCompany } from "@/data/about";
import { site } from "@/data/site";
import { illustrations } from "@/data/illustrations";
import "./about-us.css";

const title = `About ${site.brand} | Industrial Hinge Manufacturer`;
const description = `Learn about ${site.companyName}, its industrial weld-on hinge range, manufacturing capabilities, custom-requirement support and port-adjacent location.`;
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about-us" },
  openGraph: {
    title,
    description,
    url: "/about-us",
    type: "website",
    locale: "en_US",
    siteName: site.brand,
    images: [{
      url: illustrations.factory.src,
      width: illustrations.factory.width,
      height: illustrations.factory.height,
      alt: illustrations.factory.alt,
    }],
  },
};

export default function AboutUsPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "About Us", item: joinSiteUrl(baseUrl, "/about-us") },
    ],
  };
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${joinSiteUrl(baseUrl, "/")}#organization`,
    name: aboutCompany.name,
    logo: joinSiteUrl(baseUrl, site.logo),
    url: joinSiteUrl(baseUrl, "/"),
  };

  return (
    <div id="about-us-top" className="about-page">
      <InquiryProvider>
        <Header currentPage="about-us" rfqHref="/#rfq" />
        <main id="main-content">
          <AboutPageContent />
          <AboutCapabilities />
          <AboutCompanyEvidence />
          <AboutCTASection />
        </main>
        <Footer currentPage="about-us" rfqHref="/#rfq" />
      </InquiryProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
    </div>
  );
}
