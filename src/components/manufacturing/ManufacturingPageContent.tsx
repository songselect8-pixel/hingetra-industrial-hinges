import Link from "next/link";
import Image from "next/image";
import { ManufacturingCapabilities } from "./ManufacturingCapabilities";
import { ManufacturingEvidence } from "./ManufacturingEvidence";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { illustrations } from "@/data/illustrations";

function ManufacturingHero() {
  return (
    <section className="manufacturing-hero" aria-labelledby="manufacturing-page-title">
      <div className="shell">
        <nav className="manufacturing-breadcrumb" aria-label="Breadcrumb">
          <ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">Manufacturing</li></ol>
        </nav>
        <div className="manufacturing-hero-grid">
          <div className="manufacturing-hero-copy">
            <Eyebrow>Industrial hinge manufacturing</Eyebrow>
            <h1 id="manufacturing-page-title">Manufacturing Behind Every Hinge</h1>
            <p>Machining, automatic punching, assembly, production checks and standardized packaging support industrial hinge production and confirmed custom requirements.</p>
            <div className="manufacturing-hero-actions">
              <Link href="#capabilities" className="button button-primary">Explore Our Process <Arrow /></Link>
              <Link href="#rfq" className="button button-outline">Discuss Your Requirement <Arrow /></Link>
            </div>
            <div className="manufacturing-hero-tags" aria-label="Catalog-listed capability areas">
              <span>Machining</span><span>Punching</span><span>Assembly</span><span>Inspection</span><span>Packaging</span>
            </div>
          </div>
          <figure className="manufacturing-hero-figure" data-asset-kind="illustration">
            <Image src={illustrations.factory.src} alt={illustrations.factory.alt} width={illustrations.factory.width} height={illustrations.factory.height} quality={85} preload sizes="(max-width: 768px) calc(100vw - 40px), 52vw" />
            <figcaption><span>{illustrations.factory.label}</span><span>AI-generated illustration</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function ManufacturingPageContent() {
  return (
    <>
      <ManufacturingHero />
      <ManufacturingCapabilities />
      <ManufacturingEvidence />
    </>
  );
}
