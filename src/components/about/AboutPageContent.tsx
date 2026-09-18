import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/products/ProductCard";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { aboutCompany, aboutProducts } from "@/data/about";
import { productHref } from "@/data/products";
import { illustrations } from "@/data/illustrations";

function AboutHero() {
  return (
    <section className="about-hero" aria-labelledby="about-page-title">
      <div className="shell">
        <nav className="about-breadcrumb" aria-label="Breadcrumb">
          <ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">About Us</li></ol>
        </nav>
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <Eyebrow>Industrial hinge manufacturer</Eyebrow>
            <h1 id="about-page-title">About Yipinxiang</h1>
            <p className="about-hero-headline">Industrial Hinge Manufacturing Built Around Practical Requirements</p>
            <p>{aboutCompany.name} manufactures industrial weld-on hinges and supports published standard products and customer-specific requirements.</p>
            <div className="about-hero-actions">
              <Link href="/products" className="button button-primary">Explore Products <Arrow /></Link>
              <Link href="/#rfq" className="button button-outline">Discuss Your Requirement <Arrow /></Link>
            </div>
            <div className="about-hero-tags" aria-label="Company focus">
              <span>Weld-on hinges</span><span>Catalog specifications</span><span>Custom requirements</span>
            </div>
          </div>
          <figure className="about-hero-figure" data-asset-kind="illustration">
            <Image
              src={illustrations.factory.src}
              alt={illustrations.factory.alt}
              width={illustrations.factory.width}
              height={illustrations.factory.height}
              quality={85}
              sizes="(max-width: 899px) calc(100vw - 40px), 52vw"
            />
            <figcaption><span>{illustrations.factory.label}</span><span>AI-generated illustration</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function CompanyProfile() {
  return (
    <section className="section about-profile" aria-labelledby="about-profile-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Who we are"
          title={<span id="about-profile-title">Focused on Industrial Hinges</span>}
          description="A concise manufacturer profile based on the supplied company catalog."
        />
        <div className="about-profile-grid">
          <p className="about-profile-statement">Yipinxiang focuses on industrial weld-on hinges for supported steel-door, cabinet, gate, trailer-door and ramp applications.</p>
          <div className="about-profile-copy">
            <p>The product range covers several weld-on hinge structures, including bearing, pin, grease-nipple, adjustable and numbered-series configurations.</p>
            <p>The catalog describes support from design through production and sales, together with the ability to develop and produce products according to client requirements. It also describes many years of manufacturing experience without publishing a founding date.</p>
            <div className="about-profile-source"><span>Company identity</span><strong>{aboutCompany.name}</strong><small>Catalog sources · p1 / p3 / p18</small></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductRange() {
  return (
    <section className="section about-products" aria-labelledby="about-products-title">
      <div className="shell">
        <SectionHeading
          eyebrow="What we manufacture"
          title={<span id="about-products-title">A Focused Hinge Product Range</span>}
          description="Review representative catalog families below, then continue to the complete product range for published sizes and technical references."
        >
          <Link href="/products" className="text-link section-heading-link">Explore All Hinges <Arrow diagonal /></Link>
        </SectionHeading>
        <div className="product-grid about-product-grid">
          {aboutProducts.map((family, index) => (
            <ProductCard
              key={family.id}
              family={family}
              index={index}
              href={productHref(family.id)}
              actionLabel="View Details"
            />
          ))}
        </div>
        <div className="about-products-footer">
          <p>Additional catalog families include Round, Gasket, Square and Flag hinge configurations.</p>
          <Link href="/products" className="button button-outline">Explore All Hinges <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

export function AboutPageContent() {
  return <><AboutHero /><CompanyProfile /><ProductRange /></>;
}
