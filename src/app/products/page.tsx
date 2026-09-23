import { joinSiteUrl } from "@/lib/site-url";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { InquiryProvider } from "@/components/inquiry/InquiryProvider";
import { ProductFinder } from "@/components/products/ProductFinder";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { products } from "@/data/products";
import "./products.css";

const title = `Industrial Weld-On Hinges | Product Range | ${site.brand}`;
const description = "Explore weld-on hinge families, compare original catalog dimensions and find bearing, pin, round, adjustable and flag hinges for your industrial requirements.";
const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/products" },
  openGraph: { title, description, url: "/products", type: "website", locale: "en_US", siteName: site.brand, images: [{ url: "/images/og/hingetra-og.jpg", width: 1200, height: 630, alt: "HINGETRA industrial weld-on hinge product range" }] },
};

export default function ProductsPage() {
  const collection = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "@id": `${joinSiteUrl(baseUrl, "/products")}#webpage`,
    url: joinSiteUrl(baseUrl, "/products"), name: "Industrial Weld-On Hinges", description,
    isPartOf: { "@id": `${joinSiteUrl(baseUrl, "/")}#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.filter((product) => product.detailPagePublished).map((product, index) => ({
        "@type": "ListItem", position: index + 1, name: product.name, url: joinSiteUrl(baseUrl, product.detailPath),
      })),
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: joinSiteUrl(baseUrl, "/") },
      { "@type": "ListItem", position: 2, name: "Products", item: joinSiteUrl(baseUrl, "/products") },
    ],
  };
  return <div id="products-top" className="products-center">
    <InquiryProvider>
      <Header currentPage="products" />
      <main id="main-content">
        <section className="product-page-hero" aria-labelledby="product-page-title"><div className="shell">
          <nav className="product-breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">Products</li></ol></nav>
          <div className="product-page-heading"><div><Eyebrow>Industrial hinge range</Eyebrow><h1 id="product-page-title">Industrial Weld-On Hinges</h1></div><span className="range-edition">PRODUCT CATALOG <strong>2026</strong></span></div>
          <div className="product-page-summary"><p className="product-page-intro">Explore hinge types for industrial steel doors, gates, trailer doors, cabinets and enclosures.</p>
          <div className="product-page-actions"><Link href="#product-range" className="button button-primary">View Product Range <Arrow /></Link><Link href="/#rfq" className="button button-outline">Request a Quote <Arrow diagonal /></Link></div></div>
        </div></section>
        <ProductFinder />
        <section className="section product-custom-cta" aria-labelledby="product-custom-title"><div className="shell product-custom-layout">
          <SectionHeading eyebrow="Custom hinge manufacturing" title={<span id="product-custom-title">Need a different<br />size or structure?</span>} />
          <div className="product-custom-copy"><p>Send us your drawing or required dimensions for review. Include the hinge structure, quantity and application so we can discuss your requirement.</p><Link href="/#rfq" className="button button-outline">Discuss Your Requirement <Arrow /></Link><Link href="/#custom-hinges" className="text-link">Explore custom manufacturing <Arrow /></Link><Link href="/resources#selection-guides" className="text-link">View Hinge Selection Guides <Arrow /></Link></div>
        </div></section>
        <section className="section rfq-section product-rfq-cta" aria-labelledby="product-rfq-title"><div className="shell product-rfq-layout"><div className="rfq-copy"><Eyebrow light>Let’s talk about your project</Eyebrow><h2 id="product-rfq-title">Need help selecting<br /><span>a hinge?</span></h2><p>Tell us your hinge type, dimensions, quantity and application. A clear requirement is the starting point.</p></div><div className="product-rfq-action"><Link href="/#rfq" className="button button-primary">Request a Quote <Arrow /></Link><p>For industrial, distributor and OEM inquiries.</p></div></div></section>
      </main>
      <Footer currentPage="products" />
    </InquiryProvider>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection).replace(/</g, "\\u003c") }} />
  </div>;
}
