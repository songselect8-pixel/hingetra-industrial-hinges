import Link from "next/link";
import Image from "next/image";
import { InquiryProvider } from "@/components/inquiry/InquiryProvider";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { ProductCard } from "@/components/products/ProductCard";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { getRelatedResources, getResourceCategory, getResourceReadingTime, getResourceTableOfContents, resourcePublisher, type ResourceArticle } from "@/content/resources";
import { getFamily } from "@/data/catalog";
import { getProduct, productHref, products } from "@/data/products";
import { productInquiryHref } from "@/data/product-inquiry";
import { ResourceArticleBody } from "./ResourceArticleBody";
import { ResourceCard } from "./ResourceCard";
import { ResourceTableOfContents } from "./ResourceTableOfContents";

const applicationLinks: Readonly<Record<string, { name: string; href: string }>> = {
  "steel-doors": { name: "Industrial steel doors", href: "/applications#industrial-steel-doors" },
  "switch-cabinets": { name: "Switch cabinets", href: "/applications#electrical-control-cabinets" },
  "control-cabinets": { name: "Control cabinets", href: "/applications#electrical-control-cabinets" },
  "network-cabinets": { name: "Network cabinets", href: "/applications#electrical-control-cabinets" },
  "industrial-cabinets": { name: "Industrial cabinets", href: "/applications#electrical-control-cabinets" },
  gates: { name: "Gates", href: "/applications#gates-trailers-ramps" },
  "trailer-doors": { name: "Trailer doors", href: "/applications#gates-trailers-ramps" },
  ramps: { name: "Ramps", href: "/applications#gates-trailers-ramps" },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function ResourceArticleTemplate({ article }: { article: ResourceArticle }) {
  const category = getResourceCategory(article.category);
  const toc = getResourceTableOfContents(article);
  const relatedResources = getRelatedResources(article);
  const relatedProducts = article.relatedProducts.map(getProduct).filter((product): product is NonNullable<typeof product> => Boolean(product)).slice(0, 3);
  const relatedApplications = article.relatedApplications.map((id) => applicationLinks[id]).filter(Boolean);

  return <div id="resources-top" className="resources-page resource-article-page">
    <InquiryProvider>
      <Header currentPage="resources" rfqHref="/contact#contact-rfq" />
      <main id="main-content">
        <article>
          <header className="resource-article-hero"><div className="shell">
            <nav className="product-breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/resources">Resources</Link></li><li aria-hidden="true">/</li><li aria-current="page">{article.title}</li></ol></nav>
            <div className="resource-article-hero-layout"><div className="resource-article-hero-copy"><Eyebrow>{category?.name ?? "Industrial hinge resource"}</Eyebrow><h1>{article.title}</h1><p className="resource-article-intro">{article.introduction}</p><div className="resource-article-meta"><time dateTime={article.publishedAt}>Published {formatDate(article.publishedAt)}</time>{article.updatedAt && <time dateTime={article.updatedAt}>Updated {formatDate(article.updatedAt)}</time>}<span>{getResourceReadingTime(article)} min read</span></div></div>
              <figure className="resource-article-hero-image"><div><Image src={article.featuredImage} alt={article.featuredImageAlt} width={article.featuredImageWidth} height={article.featuredImageHeight} priority sizes="(max-width: 899px) 100vw, 42vw" /></div><figcaption><span>{article.featuredImage.includes("/illustrations/") ? "Supporting industrial illustration" : article.featuredImage.includes("drawing-") ? "Original catalog drawing" : "Real product reference"}</span><span>Resource visual</span></figcaption></figure>
            </div>
          </div></header>

          <div className="shell resource-reading-layout">
            <aside className="resource-reading-aside" aria-label="Table of Contents"><ResourceTableOfContents items={toc} /><Link href="/contact#contact-rfq" className="resource-toc-support"><span className="micro-label">Selection support</span><strong>Have a drawing or dimensions?</strong><span>Send your requirement <Arrow /></span></Link></aside>
            <div className="resource-reading-column"><ResourceTableOfContents items={toc} /><ResourceArticleBody article={article} />
              <section className="resource-key-takeaways" aria-labelledby="key-takeaways-title"><span className="micro-label">Guide summary</span><h2 id="key-takeaways-title">Key Takeaways</h2><ul>{article.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul></section>
              <footer className="resource-publisher"><span className="micro-label">Publisher</span><h2>{resourcePublisher.name}</h2><p>Industrial hinge manufacturer and supplier. This guide uses the supplied product catalog and approved website data as its technical references.</p><nav aria-label="Company capability references"><Link href="/manufacturing">Manufacturing</Link><Link href="/quality">Quality Control</Link><Link href="/contact">Contact</Link></nav></footer>
            </div>
          </div>
        </article>

        {relatedProducts.length > 0 && <section className="section resource-related-products" aria-labelledby="related-products-title"><div className="shell"><SectionHeading eyebrow="Continue with catalog data" title={<span id="related-products-title">Related Products</span>}><Link href="/products" className="text-link section-heading-link">View complete range <Arrow /></Link></SectionHeading><div className="product-grid">{relatedProducts.map((product) => <ProductCard key={product.id} family={getFamily(product.id)!} index={products.indexOf(product)} href={productHref(product.id)} actionLabel="View Details" quoteHref={productInquiryHref(product.id)} countLabel={`${product.dimensions.length} ${product.id.includes("type") ? "catalog models" : "catalog sizes"}`} />)}</div></div></section>}

        {relatedApplications.length > 0 && <section className="section resource-related-applications" aria-labelledby="related-applications-title"><div className="shell resource-related-applications-layout"><div><Eyebrow>Application context</Eyebrow><h2 id="related-applications-title">Related Applications</h2><p>Review the catalog-supported application relationship, then send the actual installation dimensions for selection support.</p></div><nav aria-label="Related applications">{relatedApplications.map((application) => <Link href={application.href} key={`${application.name}-${application.href}`}>{application.name}<Arrow /></Link>)}</nav></div></section>}

        <section className="section resource-related-resources" aria-labelledby="related-resources-title"><div className="shell"><SectionHeading eyebrow="Keep researching" title={<span id="related-resources-title">Related Resources</span>}><Link href="/resources" className="text-link section-heading-link">All resources <Arrow /></Link></SectionHeading><div className="resource-card-grid">{relatedResources.map((resource) => <ResourceCard article={resource} compact key={resource.slug} />)}</div></div></section>

        <section className="section rfq-section resource-rfq" aria-labelledby="article-rfq-title"><div className="shell resource-rfq-layout"><div><Eyebrow light>RFQ and selection support</Eyebrow><h2 id="article-rfq-title">Ready to discuss your hinge requirement?</h2><p>Tell us the hinge type, dimensions, estimated quantity and application. Attach your drawing where available.</p></div><Link href="/contact#contact-rfq" className="button button-primary">Request a Quote <Arrow /></Link></div></section>
      </main>
      <Footer currentPage="resources" rfqHref="/contact#contact-rfq" />
    </InquiryProvider>
  </div>;
}
