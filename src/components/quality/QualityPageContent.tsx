import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SupportingVisual } from "@/components/ui/SupportingVisual";
import { qualityApproach } from "@/data/quality";
import { QualityPreparation } from "./QualityPreparation";
import { QualityProductExamples } from "./QualityProductExamples";
import { QualityTechnicalEvidence } from "./QualityTechnicalEvidence";

function QualityHero() {
  return (
    <section className="quality-hero" aria-labelledby="quality-page-title">
      <div className="shell">
        <nav className="quality-breadcrumb" aria-label="Breadcrumb">
          <ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">Quality Control</li></ol>
        </nav>
        <div className="quality-hero-grid">
          <div className="quality-hero-copy">
            <Eyebrow>Industrial hinge quality control</Eyebrow>
            <h1 id="quality-page-title">Quality Checks Throughout Production</h1>
            <p>Dimensional checks and in-process inspection help support product consistency throughout manufacturing. Published specifications and confirmed requirements provide the reference.</p>
            <div className="quality-hero-actions">
              <Link href="#rfq" className="button button-primary">Discuss Your Requirement <Arrow /></Link>
              <Link href="/products/#selection-overview" className="button button-outline">View Product Specifications <Arrow /></Link>
            </div>
            <div className="quality-hero-tags" aria-label="Quality reference areas">
              <span>Published dimensions</span><span>Original drawings</span><span>In-process checks</span>
            </div>
          </div>
          <SupportingVisual asset="quality" className="quality-hero-visual" sizes="(max-width: 899px) calc(100vw - 40px), 52vw" />
        </div>
      </div>
    </section>
  );
}

function QualityApproach() {
  return (
    <section id="quality-approach" className="section quality-approach" aria-labelledby="quality-approach-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Quality approach"
          title={<span id="quality-approach-title">Checks Are Part of the Process</span>}
          description="The catalog connects production-stage checking with technical references and organized handling. No numerical targets are added to these source statements."
        >
          <Link href="#dimensional-checks" className="text-link section-heading-link">Review the checking references <Arrow diagonal /></Link>
        </SectionHeading>
        <div className="quality-approach-ledger">
          {qualityApproach.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
              <small>Catalog p{item.sourcePages.join(" / ")}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QualityPageContent() {
  return (
    <>
      <QualityHero />
      <QualityApproach />
      <QualityTechnicalEvidence />
      <QualityProductExamples />
      <QualityPreparation />
    </>
  );
}
