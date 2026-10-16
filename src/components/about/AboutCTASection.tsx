import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function AboutCTASection() {
  return (
    <section id="about-rfq" className="about-cta" aria-labelledby="about-cta-title">
      <div className="shell about-cta-layout">
        <div>
          <Eyebrow>Industrial & OEM inquiries</Eyebrow>
          <h2 id="about-cta-title">Looking for an Industrial Hinge Supplier?</h2>
        </div>
        <div className="about-cta-copy">
          <p>Explore the product range or send your dimensions, application or technical drawing for requirement discussion.</p>
          <div className="about-cta-actions">
            <Link href="/#rfq" className="button button-primary">Request a Quote <Arrow /></Link>
            <Link href="/products/" className="button about-cta-secondary">Explore Products <Arrow /></Link>
          </div>
          <small>Share the hinge type, dimensions, quantity and application where available.</small>
        </div>
      </div>
    </section>
  );
}
