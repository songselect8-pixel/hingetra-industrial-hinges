import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SupportingVisual } from "@/components/ui/SupportingVisual";
import { site } from "@/data/site";
import { illustrations } from "@/data/illustrations";

const processes = [
  { title: "Lathe processing", detail: "Lathe processing for hinge components." },
  { title: "Automatic punching", detail: "Automatic punching for hinge production." },
  { title: "Mass assembly", detail: "Assembly of hinge products for industrial supply." },
  { title: "Standardized packaging", detail: "Organized handling and packing." },
];

export function FactorySection() {
  return (
    <section id="manufacturing" className="section factory-section" aria-labelledby="factory-title">
      <div className="shell">
        <div className="factory-heading">
          <div><Eyebrow>Manufacturing capability</Eyebrow><h2 id="factory-title">From machining <br />to assembly.</h2></div>
          <p className="factory-intro" id="about-us">We are {site.companyName}. We produce hinges to customer requirements with a self-owned factory and equipment.</p>
        </div>
        <div className="factory-evidence-grid">
          <figure className="factory-evidence-figure" data-asset-kind="illustration">
            <Image src={illustrations.factory.src} alt={illustrations.factory.alt} width={illustrations.factory.width} height={illustrations.factory.height} quality={85} sizes="(max-width: 599px) 100vw, 50vw" />
            <figcaption><span>{illustrations.factory.label}</span><span>AI-generated illustration</span></figcaption>
          </figure>
          <SupportingVisual asset="manufacturing" sizes="(max-width: 599px) 100vw, 50vw" />
        </div>
        <div className="factory-processes">{processes.map((process, index) => <div key={process.title}><span>0{index + 1}</span><div><h3>{process.title}</h3><p>{process.detail}</p></div></div>)}</div>
        <Link href="#rfq" className="text-link factory-cta">Talk to us about your project <Arrow diagonal /></Link>
      </div>
    </section>
  );
}
