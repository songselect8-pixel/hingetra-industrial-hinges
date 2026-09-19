import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SupportingVisual } from "@/components/ui/SupportingVisual";
import { manufacturingCapabilities, manufacturingIntroduction, manufacturingOrganization } from "@/data/manufacturing";
import { site } from "@/data/site";

function CapabilityOverview() {
  return (
    <section id="capabilities" className="section manufacturing-overview" aria-labelledby="manufacturing-overview-title">
      <div className="shell">
        <SectionHeading
          eyebrow={`${site.brand} factory overview`}
          title={<span id="manufacturing-overview-title">Manufacturing Capabilities from Processing to Assembly</span>}
          description="A focused manufacturing base for standard hinge products and confirmed custom requirements."
        >
          <Link href="#capability-summary" className="text-link section-heading-link">Review the technical summary <Arrow diagonal /></Link>
        </SectionHeading>
        <div className="manufacturing-introduction" aria-label={`${site.brand} factory introduction`}>
          {manufacturingIntroduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="manufacturing-capability-ledger">
          {manufacturingCapabilities.map((capability, index) => (
            <article key={capability.id}>
              <span className="manufacturing-ledger-number">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{capability.title}</h3><p>{capability.description}</p></div>
              <span className="manufacturing-source-tag">Catalog p{capability.sourcePages.join(" / ")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessingCapabilities() {
  return (
    <section className="section manufacturing-processing" aria-label="Machining and punching capabilities">
      <div className="shell manufacturing-processing-stack">
        <div className="manufacturing-lathe-row">
          <div className="manufacturing-process-copy">
            <Eyebrow>Machining capability</Eyebrow>
            <h2>Lathe Processing</h2>
            <p>Lathe processing is listed in the catalog as a factory capability used in hinge production. The required component dimensions remain subject to the confirmed hinge specification.</p>
            <dl><div><dt>Catalog capability</dt><dd>Lathe processing</dd></div><div><dt>Requirement input</dt><dd>Drawing or required dimensions</dd></div><div><dt>Source</dt><dd>Company profile · p3</dd></div></dl>
          </div>
          <SupportingVisual asset="manufacturing" sizes="(max-width: 768px) calc(100vw - 40px), 52vw" />
        </div>
        <div className="manufacturing-punching-row">
          <div><Eyebrow>Processing capability</Eyebrow><h2>Automatic Punching</h2></div>
          <div className="manufacturing-punching-copy">
            <p>Automatic punching is listed among the production capabilities in the company profile. The catalog does not assign a particular machine model or production rate to this statement.</p>
            <div className="manufacturing-punching-facts"><span>Source-supported capability</span><strong>Automatic punching</strong><span>Catalog source · p3</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessOrganization() {
  return (
    <section className="section manufacturing-organization" aria-labelledby="manufacturing-organization-title">
      <div className="shell">
        <SectionHeading eyebrow="Production organization" title={<span id="manufacturing-organization-title">Organized for Consistent Production</span>} description="The company profile lists stock, turnover and assembly capabilities without publishing throughput figures." />
        <div className="manufacturing-organization-grid">
          {manufacturingOrganization.map((item, index) => (
            <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><small>Catalog p{item.sourcePages.join(" / ")}</small></article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ManufacturingCapabilities() {
  return <><CapabilityOverview /><ProcessingCapabilities /><ProcessOrganization /></>;
}
