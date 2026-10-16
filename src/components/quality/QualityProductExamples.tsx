import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { qualityProductExamples } from "@/data/quality";

function RepresentativeProducts() {
  return (
    <section className="section quality-products" aria-labelledby="quality-products-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Product-specific checking"
          title={<span id="quality-products-title">Different Hinges. Different Details to Check.</span>}
          description="Each example remains bound to its own product family, source image and published record. Open the product page for the complete specification set."
        />
        <div className="quality-product-grid">
          {qualityProductExamples.map((item) => {
            const catalogComposite = item.productId === "20-type";
            return (
              <article className="quality-product-card" key={item.productId}>
                <Link href={item.href} className={`quality-product-image${catalogComposite ? " is-composite" : ""}`}>
                  <Image src={item.image} alt={item.imageAlt} width={catalogComposite ? 825 : 800} height={catalogComposite ? 864 : 800} quality={85} sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 999px) 50vw, 33vw" />
                  <span>View family <Arrow /></span>
                </Link>
                <div className="quality-product-copy">
                  <span className="micro-label">Source-bound product reference · catalog p{item.sourcePage}</span>
                  <h3>{item.name}</h3>
                  <p>{item.structure}</p>
                  <dl className="quality-reference-values">
                    {item.reference.labels.map((label, index) => <div key={label}><dt>{label}</dt><dd>{item.reference.values[index]}</dd></div>)}
                  </dl>
                  <p className="quality-reference-note">{item.reference.note}</p>
                  <Link href={`${item.href}#specifications`} className="text-link">View Full Specifications <Arrow /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CustomRequirementConnection() {
  const requirements = ["Technical drawing", "Required dimensions", "Reference product / image", "Application", "Quantity"];
  return (
    <section className="section quality-custom" aria-labelledby="quality-custom-title">
      <div className="shell quality-custom-grid">
        <div className="quality-custom-copy">
          <Eyebrow>Quality & custom requirements</Eyebrow>
          <h2 id="quality-custom-title">Custom Requirements Start With Confirmed Dimensions</h2>
          <p>For a different size or structure, the available drawing, dimensions and application details help establish a clear requirement for production and checking discussion.</p>
          <Link href="/custom-hinges/" className="button button-primary">Send Your Drawing <Arrow /></Link>
        </div>
        <div className="quality-custom-requirements">
          <span className="micro-label">Information to provide</span>
          <ol>{requirements.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
          <p>Requested details remain subject to requirement / specification confirmation.</p>
        </div>
      </div>
    </section>
  );
}

export function QualityProductExamples() {
  return <><RepresentativeProducts /><CustomRequirementConnection /></>;
}
