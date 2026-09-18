import { joinSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { contactDetails } from "@/data/contact";
import { site } from "@/data/site";
import "./contact.css";

const title = `Contact ${site.brand} | Request an Industrial Hinge Quote`;
const description = `Contact ${site.brand} and submit a technical RFQ for industrial weld-on hinges. Share the hinge type, dimensions, application, quantity or drawing.`;
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title,
    description,
    url: "/contact",
    type: "website",
    locale: "en_US",
    siteName: site.brand,
  },
};

export default function ContactPage() {
  const submissionEndpoint = process.env.NEXT_PUBLIC_RFQ_ENDPOINT?.trim() || null;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "Contact", item: joinSiteUrl(baseUrl, "/contact") },
    ],
  };
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: contactDetails.company,
    logo: joinSiteUrl(baseUrl, site.logo),
    url: joinSiteUrl(baseUrl, "/contact"),
    email: contactDetails.email,
    telephone: contactDetails.phoneHref,
    contactPoint: {
      "@type": "ContactPoint",
      name: contactDetails.contact,
      contactType: "sales",
      email: contactDetails.email,
      telephone: contactDetails.phoneHref,
    },
  };

  return (
    <div id="contact-top" className="contact-page">
      <Header currentPage="contact" rfqHref="#contact-rfq" />
      <main id="main-content"><ContactPageContent submissionEndpoint={submissionEndpoint} /></main>
      <Footer currentPage="contact" rfqHref="#contact-rfq" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
    </div>
  );
}
