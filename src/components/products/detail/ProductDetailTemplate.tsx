import Link from "next/link";
import Image from "next/image";
import type { ProductDetail } from "@/data/product-details";
import { getFamily, getVariants } from "@/data/catalog";
import { getProduct, productHref, products } from "@/data/products";
import { productInquiryHref } from "@/data/product-inquiry";
import { illustrations } from "@/data/illustrations";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { InquiryProvider } from "@/components/inquiry/InquiryProvider";
import { RFQSection } from "@/components/sections/RFQSection";
import { Arrow, Plus } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalTable } from "../TechnicalTable";
import { ProductCard } from "../ProductCard";
import { ProductGallery } from "./ProductGallery";
import { ImageEnlarger } from "./ImageEnlarger";
import { ProductRelatedGuides } from "./ProductRelatedGuides";

export function ProductDetailTemplate({ detail }: { detail: ProductDetail }) {
  const product = getProduct(detail.productId)!;
  const family = getFamily(detail.productId)!;
  const records = getVariants(detail.productId);
  const firstListed = product.dimensions[0];
  const lastListed = product.dimensions.at(-1);
  const firstValue = firstListed?.size ?? firstListed?.model;
  const lastValue = lastListed?.size ?? lastListed?.model;
  const firstListingLabel = firstListed?.size ? "First listed size" : "First listed model";
  const lastListingLabel = firstListed?.size ? "Last listed size" : "Last listed model";

  return <div id="products-top" className="products-center product-detail-page">
    <InquiryProvider fixedProductId={product.id}>
      <Header currentPage="products" rfqHref="#rfq" />
      <main id="main-content">
        <section className="detail-hero" aria-labelledby="detail-title"><div className="shell">
          <nav className="product-breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/products">Products</Link></li><li aria-hidden="true">/</li><li aria-current="page">{detail.title}</li></ol></nav>
          <div className="detail-hero-layout">
            <ProductGallery images={detail.gallery} profileLabel={`${family.shortName} · ${family.profile}`} />
            <div className="detail-hero-copy">
              <Eyebrow>Industrial weld-on hinges</Eyebrow><h1 id="detail-title">{detail.title}</h1>
              <p className="detail-description">{detail.description}</p>
              <dl className="detail-hero-facts"><div><dt>Published sizes</dt><dd><Link href="#specifications">{records.length} catalog entries <Arrow /></Link></dd></div>{detail.applicationSummary && <div><dt>Catalog applications</dt><dd>{detail.applicationSummary}</dd></div>}</dl>
              <div className="product-page-actions detail-hero-actions"><Link href="#rfq" className="button button-primary">Request a Quote <Arrow /></Link><Link href="#specifications" className="button button-outline">View Specifications <Arrow /></Link></div>
              <Link href="#rfq-drawing" className="text-link detail-drawing-link">Send Your Drawing <Arrow diagonal /></Link>
            </div>
          </div>
          <dl className="detail-quick-summary" aria-label="Quick technical summary"><div><dt>Hinge family</dt><dd>{family.shortName}<span>{family.profile}</span></dd></div><div><dt>Published sizes</dt><dd><strong>{records.length}</strong> catalog entries</dd></div>{firstValue && <div><dt>{firstListingLabel}</dt><dd>{firstValue}</dd></div>}{lastValue && <div><dt>{lastListingLabel}</dt><dd>{lastValue}</dd></div>}</dl>
        </div></section>

        <section className="section detail-overview" aria-labelledby="detail-overview-title"><div className="shell detail-overview-layout">
          <SectionHeading eyebrow="The product" title={<span id="detail-overview-title">Product overview.</span>} />
          <div className="detail-overview-copy">{detail.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div></section>

        <section id="specifications" className="section detail-specifications" aria-labelledby="detail-specifications-title"><div className="shell">
          <SectionHeading eyebrow="Original catalog data" title={<span id="detail-specifications-title">{records.some((record) => record.weightG !== "TBD") ? "Available Sizes & Weights" : "Technical Specifications"}</span>}><span className="detail-source-label">{records.length} entries · Catalog {product.technicalSpecifications.sourcePages.map((page) => `page ${page}`).join(" / ")}</span></SectionHeading>
          {detail.specificationGroups.length > 0 ? <div className="detail-variant-groups">{detail.specificationGroups.map((group, index) => {
            const groupRecords = records.filter((record) => group.recordIds.includes(record.id));
            const titleId = `detail-variant-${group.sourcePage}`;
            return <section className="detail-variant-group" aria-labelledby={titleId} key={group.sourcePage}>
              <div className="detail-variant-heading">
                <figure><Image src={group.image.src} alt={group.image.alt} width={group.image.width} height={group.image.height} sizes="(max-width: 599px) 100vw, 140px" quality={85} /><figcaption>Original product image · catalog page {group.sourcePage}</figcaption></figure>
                <div><span className="micro-label">0{index + 1} / Catalog design</span><h2 id={titleId}>{group.title}</h2><p>{group.description}</p></div>
              </div>
              <TechnicalTable family={family} records={groupRecords} />
              <p className="detail-source-note">This table belongs to the product structure shown above. Choose a size to add the exact notation to your inquiry.</p>
            </section>;
          })}</div> : <div className={`detail-specification-layout${detail.drawing ? "" : " without-drawing"}`}>
              <div className="detail-table-column"><TechnicalTable family={family} records={records} /><p className="detail-source-note">Each row is a published catalog entry. Choose a size to add the exact notation to your inquiry.</p></div>
              {detail.drawing && <section className="detail-drawing" aria-labelledby="detail-drawing-title">
                <div className="detail-drawing-heading"><h2 id="detail-drawing-title">Technical Drawing</h2><p>Original reference · catalog page {detail.drawing.sourcePage}</p></div>
                <figure><ImageEnlarger media={detail.drawing} className="detail-drawing-image"><Image src={detail.drawing.src} alt={detail.drawing.alt} width={detail.drawing.width} height={detail.drawing.height} unoptimized={!process.env.NEXT_PUBLIC_BASE_PATH} sizes="(max-width: 899px) 100vw, 36vw" /><span>Enlarge drawing <Arrow diagonal /></span></ImageEnlarger><figcaption>{detail.drawing.note}</figcaption></figure>
                <Link href="#rfq-drawing" className="text-link">Have your own drawing? <Arrow /></Link>
              </section>}
            </div>}
        </div></section>

        {detail.applicationGroups.length > 0 && <section className="section detail-applications" aria-labelledby="detail-applications-title"><div className="shell">
          <SectionHeading eyebrow="Catalog applications" title={<span id="detail-applications-title">{detail.applicationTitle}</span>} description={detail.applicationIntro} />
          <div className="detail-application-grid">{detail.applicationGroups.map((application, index) => <article key={application.title}><span className="micro-label">0{index + 1} / Application</span><h3>{application.title}</h3><p>{application.description}</p><Link className="text-link" href="#rfq">Discuss your installation <Arrow /></Link></article>)}</div>
        </div></section>}

        <section id="custom-requirement" className="section product-custom-cta detail-custom" aria-labelledby="detail-custom-title"><div className="shell product-custom-layout">
          <SectionHeading eyebrow="Custom hinge requirements" title={<span id="detail-custom-title">{detail.customRequirement.title}</span>} />
          <div className="product-custom-copy"><p>{detail.customRequirement.description}</p><Link href="#rfq-customRequirement" className="button button-outline">Discuss Your Requirement <Arrow /></Link><Link href="/#custom-hinges" className="text-link">Explore custom manufacturing <Arrow /></Link></div>
        </div></section>

        <section className="section detail-manufacturing" aria-labelledby="detail-manufacturing-title"><div className="shell detail-manufacturing-layout">
          <figure className="detail-factory-photo" data-asset-kind="illustration"><Image src={illustrations.factory.src} alt={illustrations.factory.alt} width={illustrations.factory.width} height={illustrations.factory.height} sizes="(max-width: 899px) 100vw, 45vw" quality={85} /><figcaption>{illustrations.factory.label} · AI-generated illustration</figcaption></figure>
          <div className="detail-manufacturing-copy"><SectionHeading eyebrow="From the factory" title={<span id="detail-manufacturing-title">Manufacturing & Quality</span>} /><div className="detail-capabilities">{detail.manufacturing.map((capability) => <div key={capability.title}><h3>{capability.title}</h3><p>{capability.description}</p></div>)}</div><Link className="text-link" href="/#manufacturing">Explore manufacturing capabilities <Arrow /></Link></div>
        </div></section>

        {detail.packaging && detail.packaging.examples.length > 0 && <section className="section detail-packaging" aria-labelledby="detail-packaging-title"><div className="shell detail-packaging-layout">
          <div className="detail-packaging-copy"><SectionHeading eyebrow="Packing requirements" title={<span id="detail-packaging-title">Packaging.</span>} /><p>{detail.packaging.intro}</p>{detail.packaging.boundary && <p className="detail-packaging-boundary">{detail.packaging.boundary}</p>}<Link href="#rfq-message" className="text-link">Discuss your packing requirement <Arrow /></Link></div>
          <div className={`detail-packaging-examples${detail.packaging.examples.length === 1 ? " is-single" : ""}`}>{detail.packaging.examples.map((example) => {
            const packaging = getProduct(example.productId)?.packaging;
            return packaging ? <figure key={example.productId}><Image src={packaging.image} alt={`Actual ${example.label.toLowerCase()} photographs: ${packaging.description}`} width={2001} height={1336} sizes="(max-width: 599px) 100vw, 28vw" quality={85} /><figcaption><strong>{example.label}</strong><p>{packaging.description}</p><span>Catalog page {packaging.sourcePage}</span></figcaption></figure> : null;
          })}</div>
        </div></section>}

        <section className="section detail-related" aria-labelledby="detail-related-title"><div className="shell"><SectionHeading eyebrow="Other constructions" title={<span id="detail-related-title">Related hinges.</span>}><Link href="/products" className="text-link section-heading-link">View the complete range <Arrow /></Link></SectionHeading>
          <div className="product-grid">{product.relatedProducts.map((id) => { const related = getProduct(id)!; return <ProductCard key={id} family={getFamily(id)!} index={products.indexOf(related)} href={productHref(id)} actionLabel="View Details" quoteHref={productInquiryHref(id)} countLabel={`${related.dimensions.length} ${id.includes("type") ? "catalog models" : "catalog sizes"}`} />; })}</div>
        </div></section>

        <ProductRelatedGuides productId={product.id} />
        <section className="section detail-faq" aria-labelledby="detail-faq-title"><div className="shell detail-faq-layout"><SectionHeading eyebrow="Before you inquire" title={<span id="detail-faq-title">Useful answers.</span>} /><div className="detail-faq-list">{detail.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus /></summary><p>{faq.answer}</p></details>)}</div></div></section>
        <RFQSection formOptions={{ fixedProductName: detail.title, allowDrawing: true }} />
      </main>
      <Footer currentPage="products" rfqHref="#rfq" />
    </InquiryProvider>
  </div>;
}
