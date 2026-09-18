import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SupportingVisual } from "@/components/ui/SupportingVisual";
import { aboutApplications, aboutCapabilities, standardAndCustom } from "@/data/about";
import { illustrations } from "@/data/illustrations";

function ManufacturingFoundation() {
  return (
    <section className="section about-manufacturing" aria-labelledby="about-manufacturing-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Manufacturing foundation"
          title={<span id="about-manufacturing-title">Manufacturing Behind the Product</span>}
          description="The capabilities below come from the company catalog. The factory exterior concept and process scene are supporting illustrations, not photographs of company facilities."
        >
          <Link href="/manufacturing" className="text-link section-heading-link">Explore Manufacturing <Arrow diagonal /></Link>
        </SectionHeading>
        <div className="about-manufacturing-media">
          <figure data-asset-kind="illustration" className="about-factory-evidence">
            <Image
              src={illustrations.factory.src}
              alt={illustrations.factory.alt}
              width={illustrations.factory.width}
              height={illustrations.factory.height}
              quality={85}
              sizes="(max-width: 768px) calc(100vw - 40px), 55vw"
            />
            <figcaption><span>{illustrations.factory.label}</span><span>AI-generated illustration</span></figcaption>
          </figure>
          <SupportingVisual asset="manufacturing" className="about-process-visual" sizes="(max-width: 768px) calc(100vw - 40px), 38vw" />
        </div>
        <div className="about-capability-ledger">
          {aboutCapabilities.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
              <small>Catalog p{item.sourcePages.join(" / ")}</small>
            </article>
          ))}
        </div>
        <Link href="/manufacturing" className="button button-outline about-manufacturing-cta">Explore Manufacturing <Arrow /></Link>
      </div>
    </section>
  );
}

function StandardCustom() {
  return (
    <section className="about-standard-custom" aria-labelledby="about-standard-custom-title">
      <div className="shell">
        <div className="about-standard-heading">
          <Eyebrow>Product path</Eyebrow>
          <h2 id="about-standard-custom-title">Standard Products. Custom Requirements.</h2>
        </div>
        <div className="about-standard-grid">
          {standardAndCustom.map((item, index) => (
            <article key={item.label}>
              <span>0{index + 1} · {item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href} className="text-link">{item.cta} <Arrow /></Link>
              <small>Reference sources · p{item.sourcePages.join(" / ")}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationsSummary() {
  const cabinetApplications = aboutApplications.filter((item) => item.sourcePage === 4);
  const gateApplications = aboutApplications.filter((item) => item.sourcePage === 6);

  return (
    <section className="section about-applications" aria-labelledby="about-applications-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Application context"
          title={<span id="about-applications-title">Built for Industrial Applications</span>}
          description="Use the catalog application groups as a starting point, then confirm the hinge family and dimensions for the requirement."
        >
          <Link href="/applications" className="text-link section-heading-link">Explore Applications <Arrow diagonal /></Link>
        </SectionHeading>
        <div className="about-application-grid">
          <article className="about-application-card">
            <SupportingVisual asset="cabinets" sizes="(max-width: 768px) calc(100vw - 40px), 48vw" />
            <div><span>Catalog application group · p4</span><h3>Steel Doors, Cabinets & Enclosures</h3><p>{cabinetApplications.map((item) => item.name).join(" · ")}</p></div>
          </article>
          <article className="about-application-card">
            <SupportingVisual asset="trailers" sizes="(max-width: 768px) calc(100vw - 40px), 48vw" />
            <div><span>Catalog application group · p6</span><h3>Gates, Trailer Doors & Ramps</h3><p>{gateApplications.map((item) => item.name).join(" · ")}</p></div>
          </article>
        </div>
        <div className="about-application-footer"><p>Application context supports selection discussion; confirm the product family and dimensions for the requirement.</p><Link href="/applications" className="button button-outline">Explore Applications <Arrow /></Link></div>
      </div>
    </section>
  );
}

export function AboutCapabilities() {
  return <><ManufacturingFoundation /><StandardCustom /><ApplicationsSummary /></>;
}
