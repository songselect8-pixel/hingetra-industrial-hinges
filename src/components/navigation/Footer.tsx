import Link from "next/link";
import { site } from "@/data/site";
import { CatalogLink } from "@/components/products/CatalogLink";
import { Arrow } from "@/components/ui/Arrow";
import { productHref } from "@/data/products";
import { BrandLogo } from "./BrandLogo";

export function Footer({ currentPage = "home", rfqHref }: { currentPage?: "home" | "products" | "applications" | "custom-hinges" | "manufacturing" | "quality" | "resources" | "about-us" | "contact"; rfqHref?: string }) {
  const homeHref = (destination: string) => {
    if (destination === "#rfq" && rfqHref) return rfqHref;
    if (destination.startsWith("/")) return destination;
    return currentPage === "home" ? destination : `/${destination}`;
  };
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top"><Link className="brand" href={homeHref("#home")} aria-label={`${site.brand} home`}><BrandLogo /></Link><p>Industrial weld-on hinges.<br />Standard profiles. Custom requirements.</p><Link href={homeHref("#rfq")} className="text-link">Request a Quote <Arrow diagonal /></Link></div>
        <div className="footer-grid">
          <div><h2>Product categories</h2><CatalogLink familyId="bearing" href={productHref("bearing")}>Bearing weld-on hinges</CatalogLink><CatalogLink familyId="pin" href={productHref("pin")}>Pin-type hinges</CatalogLink><CatalogLink familyId="grease-nipple" href={productHref("grease-nipple")}>Grease nipple hinges</CatalogLink><CatalogLink familyId="round" href={productHref("round")}>Round hinges</CatalogLink><Link href="/products">All hinge types <Arrow /></Link></div>
          <div><h2>Applications</h2><Link href="/applications#industrial-steel-doors">Industrial steel doors</Link><Link href="/applications#gates-trailers-ramps">Gates & trailer doors</Link><Link href="/applications#electrical-control-cabinets">Electrical cabinets</Link><Link href="/applications#electrical-control-cabinets">Control & network cabinets</Link></div>
          <div><h2>Our company</h2><Link href="/about-us">About {site.brand}</Link><Link href="/manufacturing">Manufacturing</Link><Link href="/custom-hinges">Custom hinges</Link><Link href="/quality">Quality control</Link><Link href={homeHref("#packaging")}>Packaging & shipment</Link></div>
          <div><h2>Resources</h2><Link href="/resources">All resources</Link><Link href="/resources#selection-guides">Hinge selection guides</Link><Link href="/resources#application-guides">Application guides</Link><Link href="/resources#technical-guides">Technical guides</Link></div>
          <div className="footer-contact"><h2>Start a conversation</h2><p>Have a hinge requirement?<br />Tell us about your project.</p><Link href={homeHref("#rfq")} className="footer-contact-link">Get in touch <Arrow diagonal /></Link><span>For industrial and OEM inquiries.</span></div>
        </div>
        <div className="footer-bottom"><p>© 2026 {site.companyName}</p><Link href={currentPage === "home" ? "#home" : currentPage === "products" ? "#products-top" : currentPage === "applications" ? "#applications-top" : currentPage === "custom-hinges" ? "#custom-hinges-top" : currentPage === "manufacturing" ? "#manufacturing-top" : currentPage === "quality" ? "#quality-top" : currentPage === "resources" ? "#resources-top" : currentPage === "contact" ? "#contact-top" : "#about-us-top"}>Back to top <span aria-hidden="true">↑</span></Link></div>
      </div>
    </footer>
  );
}
