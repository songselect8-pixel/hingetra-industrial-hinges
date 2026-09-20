import Link from "next/link";
import Image from "next/image";
import { getPublishedResources, getResourceCategory, getResourceReadingTime, getVisibleResourceCategories } from "@/content/resources";
import { products } from "@/data/products";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ResourceCard } from "./ResourceCard";

const productTopics = [
  { label: "Water-drop weld-on hinges", href: "/products?type=water-drop-shaped-weld-on-hinges", note: "Bearing, pin, gasket, grease nipple and 20 type" },
  { label: "12 / 14 / 16 type hinges", href: "/products/12-14-16-type-weld-on-hinges", note: "Catalog models for gates, trailer doors and ramps" },
  { label: "Weld-on hinge sizes", href: "/resources/weld-on-hinge-sizes", note: "Diameter, length, model and drawing notation" },
  { label: "Custom hinge requirements", href: "/custom-hinges", note: "Prepare dimensions and drawings for review" },
] as const;

export function ResourcesIndexContent() {
  const articles = getPublishedResources();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles.filter((article) => article.slug !== featured?.slug).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.order - b.order);
  const featuredDate = featured?.updatedAt ?? featured?.publishedAt;
  const categories = getVisibleResourceCategories();

  return <>
    <section className="resources-hero" aria-labelledby="resources-title"><div className="shell">
      <nav className="product-breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">Resources</li></ol></nav>
      <div className="resources-hero-layout"><div><Eyebrow>Technical information center</Eyebrow><h1 id="resources-title">Industrial Hinge Resources</h1><p>Technical guides, application insights and product-selection information for industrial weld-on hinge buyers.</p><div className="resources-hero-actions"><Link href="#latest-resources" className="button button-primary">Explore Resources <Arrow /></Link><Link href="/products" className="button button-outline">View Hinge Range <Arrow /></Link></div></div>
        <nav className="resources-category-index" aria-label="Resource categories"><span className="micro-label">Browse published topics</span>{categories.map((category, index) => <Link href={`#${category.id}`} key={category.id}><span>0{index + 1}</span>{category.name}<Arrow /></Link>)}</nav>
      </div>
    </div></section>

    {featured && <section className="section resource-featured" aria-labelledby="featured-resource-title"><div className="shell">
      <SectionHeading eyebrow="Featured guide" title={<span id="featured-resource-title">A practical starting point.</span>}><Link href="#selection-guides" className="text-link section-heading-link">View selection guides <Arrow /></Link></SectionHeading>
      <article className="resource-featured-card"><Link href={`/resources/${featured.slug}`} className="resource-featured-image"><Image src={featured.featuredImage} alt={featured.featuredImageAlt} width={featured.featuredImageWidth} height={featured.featuredImageHeight} sizes="(max-width: 899px) 100vw, 52vw" /></Link><div className="resource-featured-copy"><span className="micro-label">{getResourceCategory(featured.category)?.name}</span><h2><Link href={`/resources/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.description}</p><div className="resource-featured-meta"><time dateTime={featuredDate}>{featured.updatedAt ? "Updated" : "Published"} {new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${featuredDate}T00:00:00Z`))}</time><span>·</span><span>{getResourceReadingTime(featured)} min read</span></div><Link href={`/resources/${featured.slug}`} className="button button-primary">Read Featured Guide <Arrow /></Link></div></article>
    </div></section>}

    <section id="latest-resources" className="section resources-latest" aria-labelledby="latest-resources-title"><div className="shell">
      <SectionHeading eyebrow="Published resources" title={<span id="latest-resources-title">Latest Resources</span>} description="Compare hinge constructions, check dimensions and prepare a clear inquiry." />
      <div className="resource-card-grid">{latest.map((article) => <ResourceCard article={article} key={article.slug} />)}</div>
    </div></section>

    <section className="section resources-categories" aria-labelledby="resource-categories-title"><div className="shell">
      <SectionHeading eyebrow="Find a guide" title={<span id="resource-categories-title">Browse by Category</span>} description="Find help with product selection, installation questions, dimensions and custom requirements." />
      <div className="resource-category-grid">{categories.map((category, index) => {
        const categoryArticles = articles.filter((article) => article.category === category.id);
        return <article id={category.id} key={category.id}><span className="micro-label">0{index + 1} / {categoryArticles.length} {categoryArticles.length === 1 ? "guide" : "guides"}</span><h3>{category.name}</h3><p>{category.description}</p><nav aria-label={`${category.name} articles`}>{categoryArticles.map((article) => <Link href={`/resources/${article.slug}`} key={article.slug}>{article.title}<Arrow /></Link>)}</nav></article>;
      })}</div>
    </div></section>

    <section className="section resource-topics" aria-labelledby="resource-topics-title"><div className="shell resource-topics-layout">
      <div><Eyebrow>Popular product topics</Eyebrow><h2 id="resource-topics-title">Move from research to the right catalog record.</h2><p>Use the resource guides for context, then check the relevant product page for the original images, sizes and drawings.</p><Link href="/products" className="text-link">Explore all {products.length} hinge families <Arrow /></Link></div>
      <div className="resource-topic-list">{productTopics.map((topic, index) => <Link href={topic.href} key={topic.label}><span>0{index + 1}</span><div><h3>{topic.label}</h3><p>{topic.note}</p></div><Arrow /></Link>)}</div>
    </div></section>

    <section className="section resource-pathways" aria-labelledby="resource-pathways-title"><div className="shell">
      <SectionHeading eyebrow="Continue your research" title={<span id="resource-pathways-title">Product and application pathways.</span>} />
      <div className="resource-pathway-grid"><Link href="/products"><span className="micro-label">Product range</span><h3>Compare Weld-On Hinge Families</h3><p>Review real product images, exact catalog entries and family-specific technical pages.</p><span className="text-link">Explore Products <Arrow /></span></Link><Link href="/applications"><span className="micro-label">Application context</span><h3>Explore Industrial Applications</h3><p>Start with steel doors, cabinets, gates, trailer doors or ramps supported by the catalog.</p><span className="text-link">Explore Applications <Arrow /></span></Link><Link href="/custom-hinges"><span className="micro-label">Requirement review</span><h3>Prepare a Custom Hinge Request</h3><p>Check the listed customization families and prepare your drawing for review.</p><span className="text-link">Custom Hinge Guides <Arrow /></span></Link></div>
    </div></section>

    <section className="section rfq-section resource-rfq" aria-labelledby="resource-rfq-title"><div className="shell resource-rfq-layout"><div><Eyebrow light>Selection support</Eyebrow><h2 id="resource-rfq-title">Need help connecting a guide to your requirement?</h2><p>Send the hinge type, required dimensions, quantity and application for review.</p></div><Link href="/contact#contact-rfq" className="button button-primary">Get Selection Support <Arrow /></Link></div></section>
  </>;
}
