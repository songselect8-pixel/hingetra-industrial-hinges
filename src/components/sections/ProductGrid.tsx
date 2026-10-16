import Link from "next/link";
import { featuredFamilies } from "@/data/catalog";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";

export function ProductGrid() {
  return (
    <section id="products" className="section products-section" aria-labelledby="products-title">
      <div className="shell">
        <SectionHeading eyebrow="The product range" title={<span id="products-title">Find your hinge.</span>} description="Explore our weld-on hinges by profile and construction.">
          <Link href="/products/" className="text-link section-heading-link">View the complete range <Arrow diagonal /></Link>
        </SectionHeading>
        <div className="product-grid">{featuredFamilies.map((family, index) => <ProductCard family={family} index={index} key={family.id} />)}</div>
        <div className="product-grid-note"><span>A different size or configuration?</span><Link href="#custom-hinges">Let’s discuss a custom hinge. <Arrow /></Link></div>
      </div>
    </section>
  );
}
