import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { aboutLogistics, aboutNavigation, aboutQualityPoints, buyerReasons, workingApproach } from "@/data/about";

function QualitySummary() {
  return (
    <section className="about-quality" aria-labelledby="about-quality-title">
      <div className="shell about-quality-grid">
        <div className="about-quality-heading">
          <Eyebrow>Quality approach</Eyebrow>
          <h2 id="about-quality-title">Checks During Production</h2>
          <p>Published specifications and confirmed requirement dimensions provide the reference. The catalog describes tools developed to support checks during production.</p>
          <Link href="/quality/" className="text-link">Explore Quality Control <Arrow diagonal /></Link>
        </div>
        <div className="about-quality-points">
          {aboutQualityPoints.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p><small>Catalog p{item.sourcePages.join(" / ")}</small></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuyerReasons() {
  return (
    <section className="section about-reasons" aria-labelledby="about-reasons-title">
      <div className="shell">
        <SectionHeading
          eyebrow="For industrial buyers"
          title={<span id="about-reasons-title">Built Around Practical B2B Requirements</span>}
          description="A factual overview of the catalog-backed manufacturing, product, customization, checking, packaging and logistics context."
        />
        <div className="about-reason-grid">
          {buyerReasons.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>Source · p{item.sourcePages.join(" / ")}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationAccess() {
  return (
    <section className="about-logistics" aria-labelledby="about-logistics-title">
      <div className="shell about-logistics-layout">
        <div className="about-logistics-copy">
          <Eyebrow>Location & shipping access</Eyebrow>
          <h2 id="about-logistics-title">Located for Convenient Export Access</h2>
          <p>The catalog presents the company location in relation to two ports, highway transportation and shipment handling. It does not publish transit times or destination coverage.</p>
          <div className="about-location-line" aria-label="Catalog-stated port proximity"><span>Shanghai Port</span><i /><strong>Pinghu</strong><i /><span>Ningbo Port</span></div>
          <small>Text-led location reference · catalog p18 · not a map</small>
        </div>
        <div className="about-logistics-points">
          {aboutLogistics.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkingApproach() {
  return (
    <section className="section about-approach" aria-labelledby="about-approach-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Working approach"
          title={<span id="about-approach-title">How We Approach Each Requirement</span>}
          description="A practical requirement path assembled from the application, product, manufacturing, checking and shipment context documented in the catalog."
        />
        <ol className="about-approach-list">
          {workingApproach.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>p{item.sourcePages.join(" / ")}</small>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function InternalNavigation() {
  return (
    <section className="about-continue" aria-labelledby="about-continue-title">
      <div className="shell about-continue-row">
        <div><Eyebrow>Next step</Eyebrow><h2 id="about-continue-title">Continue Exploring</h2></div>
        <nav aria-label="Continue exploring the website">
          {aboutNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label} <Arrow /></Link>)}
        </nav>
      </div>
    </section>
  );
}

export function AboutCompanyEvidence() {
  return <><QualitySummary /><BuyerReasons /><LocationAccess /><WorkingApproach /><InternalNavigation /></>;
}
