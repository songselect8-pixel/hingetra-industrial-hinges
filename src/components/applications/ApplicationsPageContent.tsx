import Link from "next/link";
import Image from "next/image";
import { ApplicationDetailSection } from "./ApplicationDetailSection";
import { ApplicationInquiryLink } from "./ApplicationInquiryLink";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { applicationGroups, applicationOverview, selectionInputs } from "@/data/applications";
import { getProduct, productHref } from "@/data/products";

function ApplicationOverview() {
  return (
    <section id="application-overview" className="section application-overview" aria-labelledby="application-overview-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Choose by application"
          title={<span id="application-overview-title">Built for Industrial Applications</span>}
          description="Start with the structure you are building, then review the catalog-supported hinge family and published dimensions."
        >
          <ApplicationInquiryLink product="custom" application="" diagonal>Ask for selection help</ApplicationInquiryLink>
        </SectionHeading>

        <div className="application-overview-grid">
          {applicationOverview.map((item, index) => (
            <Link className={`application-overview-card${index < 2 ? " application-overview-card-primary" : " application-overview-card-secondary"}`} href={item.href} key={item.id}>
              <figure className={`application-overview-media application-overview-media-${item.mediaKind}`} data-asset-kind={item.mediaKind}>
                <div className="application-overview-image-frame">
                  <Image src={item.image} alt={item.alt} width={1448} height={1086} sizes={index < 2 ? "(max-width: 599px) 100vw, 50vw" : "(max-width: 599px) 100vw, 30vw"} />
                </div>
                <figcaption><span>{item.mediaLabel}</span><span>Catalog application · p{item.sourcePage}</span></figcaption>
              </figure>
              <div className="application-overview-copy">
                <span className="application-card-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="text-link">{item.cta} <Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
        <p className="application-visual-note">The cabinet and trailer scenes are supporting illustrations. Product photographs remain the reference for actual hinge appearance.</p>
      </div>
    </section>
  );
}

function SelectionGuide() {
  return (
    <section id="selection-guide" className="section application-selection-guide" aria-labelledby="selection-guide-title">
      <div className="shell selection-guide-layout">
        <div className="selection-guide-heading">
          <Eyebrow>Prepare a useful RFQ</Eyebrow>
          <h2 id="selection-guide-title">What Should You Tell Us?</h2>
          <p>Clear installation information helps narrow the catalog range without assuming a load, rating or hinge configuration that has not been confirmed.</p>
        </div>
        <ol className="selection-input-grid">
          {selectionInputs.map((input, index) => <li key={input}><span>0{index + 1}</span><p>{input}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

function ApplicationProductNavigation() {
  return (
    <section className="section application-product-navigation" aria-labelledby="application-product-navigation-title">
      <div className="shell">
        <SectionHeading eyebrow="Application to product" title={<span id="application-product-navigation-title">Explore Hinges by Application</span>} description="Start with your application, review relevant hinge families, or send us your dimensions for selection support."><Link href="/resources/#application-guides" className="text-link section-heading-link">Read Application Guides <Arrow /></Link></SectionHeading>
        <div className="application-navigation-list">
          {applicationGroups.map((group) => (
            <article key={group.id}>
              <div><span className="micro-label">{group.sourceLabel}</span><h3>{group.shortTitle}</h3></div>
              <nav aria-label={`Product navigation for ${group.shortTitle}`}>
                {group.productIds.map((id) => <Link href={productHref(id)} key={id}>{getProduct(id)!.name}<Arrow /></Link>)}
              </nav>
              <Link href={group.filterHref} className="text-link">Explore relevant hinge families <Arrow /></Link>
            </article>
          ))}
        </div>
        <div className="application-navigation-note"><p>Need to review another hinge structure?</p><Link href="/products/" className="button button-outline">Explore all hinge types <Arrow /></Link></div>
      </div>
    </section>
  );
}

export function ApplicationsPageContent() {
  return (
    <>
      <section className="application-page-hero" aria-labelledby="application-page-title">
        <div className="shell">
          <nav className="application-breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">Applications</li></ol></nav>
          <div className="application-hero-layout">
            <div className="application-hero-copy">
              <Eyebrow>Application-led hinge selection</Eyebrow>
              <h1 id="application-page-title">Weld-On Hinges for Industrial Applications</h1>
              <p>From indoor and outdoor carbon steel doors to gates, trailer doors and industrial cabinets, explore weld-on hinge solutions by application.</p>
              <div className="application-hero-actions"><Link href="#application-overview" className="button button-primary">Explore Applications <Arrow /></Link><ApplicationInquiryLink product="custom" application="" className="button button-outline">Ask for Selection Help</ApplicationInquiryLink></div>
            </div>
            <figure className="application-hero-visual">
              <div><Image src="/images/hinge-pin-hero.jpg" alt="Pin-type water-drop weld-on hinge product photograph with an assembled hinge and separated pin" width={5252} height={3505} priority sizes="(max-width: 599px) 100vw, 47vw" /></div>
              <figcaption><span>Real product photography</span><span>Water-drop hinge reference</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <ApplicationOverview />
      <div className="application-details" aria-label="Industrial application guides">
        {applicationGroups.map((group, index) => <ApplicationDetailSection group={group} reversed={index % 2 === 1} key={group.id} />)}
      </div>
      <SelectionGuide />
      <ApplicationProductNavigation />

      <section className="section application-help-cta" aria-labelledby="application-help-title">
        <div className="shell application-help-layout">
          <div><Eyebrow>Selection support</Eyebrow><h2 id="application-help-title">Not Sure Which Hinge Fits Your Application?</h2></div>
          <div><p>Send us your application, required dimensions or technical drawing for review.</p><ApplicationInquiryLink product="custom" application="" className="button button-primary">Get Selection Support</ApplicationInquiryLink></div>
        </div>
      </section>
    </>
  );
}
