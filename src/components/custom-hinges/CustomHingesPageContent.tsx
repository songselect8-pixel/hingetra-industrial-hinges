import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/products/ProductCard";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SupportingVisual } from "@/components/ui/SupportingVisual";
import {
  customComparison,
  customFaqs,
  customProductIds,
  customProductSourcePages,
  customRfqChecklist,
  customScenarios,
  customWorkflow,
  dimensionInputs,
  manufacturingCapabilities,
  qualityPoints,
  requirementInputs,
} from "@/data/custom-hinges";
import { getFamily } from "@/data/catalog";
import { productHref } from "@/data/products";
import { illustrations } from "@/data/illustrations";

function WhenStandardSizesAreNotEnough() {
  return (
    <section className="section custom-scenarios" aria-labelledby="custom-scenarios-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Custom requirement context"
          title={<span id="custom-scenarios-title">When Standard Sizes Are Not Enough</span>}
          description="A custom discussion starts when the published size, structure or mounting arrangement does not describe the requirement you need reviewed."
        >
          <Link href="/products" className="text-link section-heading-link">Browse standard hinges <Arrow diagonal /></Link>
        </SectionHeading>
        <div className="custom-scenario-grid">
          {customScenarios.map((scenario, index) => <article key={scenario.title}><span>0{index + 1}</span><h3>{scenario.title}</h3><p>{scenario.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function StartWithWhatYouHave() {
  return (
    <section id="start-with-what-you-have" className="section custom-inputs" aria-labelledby="custom-inputs-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Requirement inputs"
          title={<span id="custom-inputs-title">Start With What You Have</span>}
          description="A complete drawing is useful, but available dimensions, application information and a clear reference can also start the discussion."
        />
        <div className="custom-input-grid">
          {requirementInputs.map((input, index) => <article key={input.title}><span>0{index + 1}</span><div><h3>{input.title}</h3><p>{input.description}</p></div></article>)}
        </div>
        <div className="custom-input-note"><p>Available information can be reviewed before quotation. It does not guarantee that an unlisted configuration can be produced. <Link href="/resources#custom-manufacturing">Read the custom hinge guides</Link> before preparing your request.</p><Link href="#rfq" className="text-link">Send what you have <Arrow /></Link></div>
      </div>
    </section>
  );
}

function KeyDimensions() {
  return (
    <section className="section custom-dimensions" aria-labelledby="custom-dimensions-title">
      <div className="shell custom-dimensions-layout">
        <figure className="custom-drawing-figure" data-asset-kind="catalog-drawing">
          <div className="custom-drawing-frame"><Image src="/images/drawing-20-type.png" alt="Original 20 Type catalog photographs and dimensional drawings with the published D, D-1, L, d, L-1, c and L-2 reference symbols" width={825} height={864} sizes="(max-width: 899px) 100vw, 43vw" /></div>
          <figcaption><span>Original 20 Type catalog drawing</span><span>Dimensions shown unchanged · catalog p5</span></figcaption>
        </figure>
        <div className="custom-dimensions-copy">
          <Eyebrow>Drawing information</Eyebrow>
          <h2 id="custom-dimensions-title">Key Dimensions to Share</h2>
          <p>The original drawing is an example of how a hinge requirement can be described. Use the notation and dimensions from your own drawing; do not copy an unrelated catalog value.</p>
          <div className="custom-dimension-list">
            {dimensionInputs.map((input, index) => <div key={input.title}><span>0{index + 1}</span><div><h3>{input.title}</h3><p>{input.description}</p></div></div>)}
          </div>
          <p className="custom-source-note">Catalog symbols and measurements remain exactly as published. The drawing is a communication reference, not a custom specification.</p>
        </div>
      </div>
    </section>
  );
}

function CustomWorkflow() {
  return (
    <section className="section custom-workflow" aria-labelledby="custom-workflow-title">
      <div className="shell">
        <SectionHeading eyebrow="Custom manufacturing workflow" title={<span id="custom-workflow-title">From Requirement to Production</span>} description="Each stage depends on confirmed information. The catalog does not publish a standard review or production schedule." />
        <ol className="custom-workflow-list">
          {customWorkflow.map((stage, index) => <li key={stage.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{stage.title}</h3><p>{stage.description}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

function StandardOrCustom() {
  return (
    <section className="section custom-comparison" aria-labelledby="custom-comparison-title">
      <div className="shell">
        <SectionHeading eyebrow="Selection path" title={<span id="custom-comparison-title">Standard Product or Custom?</span>} description="Use the published catalog when an existing family and size apply. Send a requirement when the dimensions or structure need review." />
        <div className="custom-comparison-table-wrap" tabIndex={0} role="region" aria-label="Comparison of standard catalog hinges and custom hinge requirements">
          <table className="custom-comparison-table">
            <thead><tr><th scope="col">Selection point</th><th scope="col">Standard Catalog Hinge</th><th scope="col">Custom Requirement</th></tr></thead>
            <tbody>{customComparison.map((row) => <tr key={row.criterion}><th scope="row">{row.criterion}</th><td>{row.standard}</td><td>{row.custom}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="custom-comparison-actions"><Link href="/products" className="button button-outline">Browse Standard Hinges <Arrow /></Link><Link href="#rfq" className="button button-primary">Send Your Requirement <Arrow /></Link></div>
      </div>
    </section>
  );
}

function CustomProductFamilies() {
  return (
    <section className="section custom-product-families" aria-labelledby="custom-product-families-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Catalog-confirmed customization"
          title={<span id="custom-product-families-title">Product Families With Customization Support</span>}
          description="The following catalog families contain an explicit customization statement. The requested dimensions and structure still require review."
        >
          <Link href="/applications" className="text-link section-heading-link">Review applications <Arrow diagonal /></Link>
        </SectionHeading>
        <div className="custom-product-grid">
          {customProductIds.map((id, index) => {
            const family = getFamily(id)!;
            const pages = customProductSourcePages[id];
            return <ProductCard key={id} family={family} index={index} href={productHref(id)} quoteHref="#rfq" actionLabel="View details"><div className="customization-support-label"><span>Customization Supported</span><span>Catalog p{pages.join("–")}</span></div></ProductCard>;
          })}
        </div>
      </div>
    </section>
  );
}

function ManufacturingSupport() {
  return (
    <section id="manufacturing-support" className="section custom-manufacturing-support" aria-labelledby="custom-manufacturing-title">
      <div className="shell">
        <SectionHeading eyebrow="Compact capability overview" title={<span id="custom-manufacturing-title">Manufacturing Behind the Requirement</span>} description="The catalog supports custom product development and production, together with the listed factory capabilities below." />
        <div className="custom-manufacturing-media">
          <figure className="custom-factory-figure" data-asset-kind="illustration"><Image src={illustrations.factory.src} alt={illustrations.factory.alt} width={illustrations.factory.width} height={illustrations.factory.height} sizes="(max-width: 599px) 100vw, 50vw" /><figcaption><span>{illustrations.factory.label}</span><span>AI-generated illustration</span></figcaption></figure>
          <SupportingVisual asset="manufacturing" sizes="(max-width: 599px) 100vw, 50vw" />
        </div>
        <div className="custom-capability-list">{manufacturingCapabilities.map((capability, index) => <div key={capability.title}><span>0{index + 1}</span><h3>{capability.title}</h3><p>Catalog source · p{capability.sourcePages.join(" / ")}</p></div>)}</div>
      </div>
    </section>
  );
}

function DimensionalChecking() {
  return (
    <section className="section custom-quality" aria-labelledby="custom-quality-title">
      <div className="shell custom-quality-layout">
        <div className="custom-quality-copy">
          <Eyebrow>Production checking</Eyebrow>
          <h2 id="custom-quality-title">Dimensional Checks During Production</h2>
          <p>Confirmed dimensions and checking requirements provide a reference during production. No tolerance value, inspection percentage or test result is published.</p>
          <div className="custom-quality-points">{qualityPoints.map((point) => <div key={point.title}><h3>{point.title}</h3><p>{point.description}</p></div>)}</div>
          <Link href="#rfq" className="text-link">Share checking requirements <Arrow diagonal /></Link>
        </div>
        <SupportingVisual asset="quality" sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 899px) 620px, 50vw" />
      </div>
    </section>
  );
}

function RequirementChecklist() {
  return (
    <section className="section custom-rfq-prep" aria-labelledby="custom-rfq-prep-title">
      <div className="shell custom-rfq-prep-layout">
        <div><Eyebrow>Prepare your inquiry</Eyebrow><h2 id="custom-rfq-prep-title">Help Us Understand Your Requirement</h2><p>Provide what is available. Missing information can be identified during the review rather than filled with assumptions.</p></div>
        <ol>{customRfqChecklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
      </div>
    </section>
  );
}

function CustomFaq() {
  return (
    <section className="section custom-faq" aria-labelledby="custom-faq-title">
      <div className="shell custom-faq-layout">
        <div><Eyebrow>Before you send a requirement</Eyebrow><h2 id="custom-faq-title">Custom Hinge FAQ</h2><p>Answers stay within the published customization scope and this website preview’s file handling.</p></div>
        <div className="custom-faq-list">{customFaqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<i aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
      </div>
    </section>
  );
}

export function CustomHingesPageContent() {
  return (
    <>
      <section className="custom-page-hero" aria-labelledby="custom-page-title">
        <div className="shell">
          <nav className="custom-breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">Custom Hinges</li></ol></nav>
          <div className="custom-hero-layout">
            <div className="custom-hero-copy">
              <Eyebrow>Made to requirement</Eyebrow>
              <h1 id="custom-page-title">Custom Weld-On Hinges <span>Built Around Your Requirements</span></h1>
              <p>Send us your required dimensions, hinge structure or technical drawing for review.</p>
              <div className="custom-hero-actions"><Link href="#rfq" className="button button-primary">Send Your Drawing <Arrow /></Link><Link href="#start-with-what-you-have" className="button button-outline">Discuss Your Requirement <Arrow /></Link></div>
              <div className="custom-hero-specs"><span>Drawing</span><span>Dimensions</span><span>Structure</span><span>Application</span></div>
            </div>
            <SupportingVisual asset="engineering" className="custom-hero-visual" sizes="(max-width: 599px) 100vw, 48vw" />
          </div>
        </div>
      </section>
      <WhenStandardSizesAreNotEnough />
      <StartWithWhatYouHave />
      <KeyDimensions />
      <CustomWorkflow />
      <StandardOrCustom />
      <CustomProductFamilies />
      <ManufacturingSupport />
      <DimensionalChecking />
      <RequirementChecklist />
      <CustomFaq />
    </>
  );
}
