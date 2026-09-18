import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SupportingVisual } from "@/components/ui/SupportingVisual";
import {
  companyEvidence,
  inProcessQuality,
  logisticsPoints,
  manufacturingFaqs,
  manufacturingSummary,
  packagingRecords,
} from "@/data/manufacturing";
import { illustrations } from "@/data/illustrations";

function CustomManufacturingBridge() {
  return (
    <section className="section manufacturing-custom-bridge" aria-labelledby="manufacturing-custom-title">
      <div className="shell manufacturing-custom-grid">
        <div className="manufacturing-custom-copy">
          <Eyebrow>Custom manufacturing connection</Eyebrow>
          <h2 id="manufacturing-custom-title">Built Around Confirmed Requirements</h2>
          <p>The catalog states an ability to develop and produce products according to client requirements. Send the available dimensions or drawing for review before the requested configuration is confirmed.</p>
          <Link href="/custom-hinges" className="button button-primary">Explore Custom Hinges <Arrow /></Link>
        </div>
        <SupportingVisual asset="engineering" sizes="(max-width: 768px) calc(100vw - 40px), 50vw" />
      </div>
    </section>
  );
}

function ProductionChecking() {
  return (
    <section className="section manufacturing-quality" aria-labelledby="manufacturing-quality-title">
      <div className="shell manufacturing-quality-grid">
        <div className="manufacturing-quality-copy">
          <Eyebrow>In-process quality</Eyebrow>
          <h2 id="manufacturing-quality-title">Checks During Production</h2>
          <p>The catalog describes testing tools intended to allow checks during production. No checking frequency, acceptance level or measured result is published.</p>
          <div className="manufacturing-quality-points">
            {inProcessQuality.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}
          </div>
          <Link href="/quality" className="text-link">Explore Quality Control <Arrow diagonal /></Link>
        </div>
        <SupportingVisual asset="quality" sizes="(max-width: 768px) calc(100vw - 40px), 50vw" />
      </div>
    </section>
  );
}

function FactoryEvidence() {
  return (
    <section className="section manufacturing-factory-evidence" aria-labelledby="manufacturing-factory-title">
      <div className="shell">
        <SectionHeading eyebrow="Catalog reference" title={<span id="manufacturing-factory-title">Catalog-Backed Manufacturing Capabilities</span>} description="The catalog supports the capability statements below. The factory exterior concept is an AI-generated illustration, not a photograph of company facilities." />
        <div className="manufacturing-factory-grid">
          <figure data-asset-kind="illustration">
            <Image src={illustrations.factory.src} alt={illustrations.factory.alt} width={illustrations.factory.width} height={illustrations.factory.height} quality={85} sizes="(max-width: 768px) calc(100vw - 40px), 55vw" />
            <figcaption><span>{illustrations.factory.label}</span><span>AI-generated illustration</span></figcaption>
          </figure>
          <div className="manufacturing-evidence-list">
            {companyEvidence.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.description}</p><small>Catalog p{item.sourcePages.join(" / ")}</small></div></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagingEvidence() {
  return (
    <section className="section manufacturing-packaging" aria-labelledby="manufacturing-packaging-title">
      <div className="shell">
        <SectionHeading eyebrow="Packaging & shipment" title={<span id="manufacturing-packaging-title">Standardized Packaging for Shipment</span>} description="These catalog photographs document packaging for two named hinge series. The applicable method can vary by product family." />
        <div className="manufacturing-packaging-grid">
          {packagingRecords.map((record) => (
            <article key={record.id}>
              <figure data-asset-kind="catalog-packaging"><Image src={record.image} alt={record.imageAlt} width={2001} height={1336} quality={85} sizes="(max-width: 768px) calc(100vw - 40px), 50vw" /></figure>
              <div className="manufacturing-packaging-copy"><span className="micro-label">{record.family} · catalog p{record.sourcePage}</span><h3>{record.title}</h3><p>{record.description}</p></div>
            </article>
          ))}
        </div>
        <div className="manufacturing-packaging-note"><p>Packaging shown above is series-specific and is not presented as a universal method for every hinge.</p><Link href="#rfq" className="text-link">Ask About Packaging <Arrow /></Link></div>
      </div>
    </section>
  );
}

function LogisticsSupport() {
  return (
    <section className="manufacturing-logistics" aria-labelledby="manufacturing-logistics-title">
      <div className="shell manufacturing-logistics-grid">
        <div><Eyebrow>Shipment context</Eyebrow><h2 id="manufacturing-logistics-title">Positioned for Export Shipment</h2><p>Catalog-supported location and shipment facts, without delivery or destination claims.</p></div>
        <div className="manufacturing-logistics-points">{logisticsPoints.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
      </div>
    </section>
  );
}

function CapabilityReference() {
  return (
    <section id="capability-summary" className="section manufacturing-reference" aria-label="Manufacturing capability reference and frequently asked questions">
      <div className="shell manufacturing-reference-grid">
        <div className="manufacturing-summary-block">
          <Eyebrow>Technical reference</Eyebrow><h2>Manufacturing Capability Summary</h2><p>A compact view of catalog-supported capability functions.</p>
          <div className="manufacturing-summary-table-wrap" tabIndex={0} role="region" aria-label="Manufacturing capability summary table">
            <table><thead><tr><th scope="col">Capability</th><th scope="col">Source-supported function</th><th scope="col">Source</th></tr></thead><tbody>{manufacturingSummary.map((row) => <tr key={row.capability}><th scope="row">{row.capability}</th><td>{row.function}</td><td>p{row.sourcePages.join(" / ")}</td></tr>)}</tbody></table>
          </div>
        </div>
        <div className="manufacturing-faq-block">
          <Eyebrow>Buyer questions</Eyebrow><h2>Manufacturing FAQ</h2><p>Answers stay within the published factory and process information.</p>
          <div className="manufacturing-faq-list">{manufacturingFaqs.map((item, index) => <details key={item.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<i aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
        </div>
      </div>
    </section>
  );
}

export function ManufacturingEvidence() {
  return <><CustomManufacturingBridge /><ProductionChecking /><FactoryEvidence /><PackagingEvidence /><LogisticsSupport /><CapabilityReference /></>;
}
