import Link from "next/link";
import { ContactRFQForm } from "@/components/contact/ContactRFQForm";
import { Arrow, Plus } from "@/components/ui/Arrow";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import {
  contactApplicationEntries,
  contactChecklist,
  contactDetails,
  contactFaq,
} from "@/data/contact";

const rfqInputs = [
  ["01", "Hinge type or model"],
  ["02", "Dimensions and quantity"],
  ["03", "Application context"],
  ["04", "Drawing or reference image"],
] as const;

function ContactHero() {
  return (
    <section className="contact-hero" aria-labelledby="contact-page-title">
      <div className="shell">
        <nav className="contact-breadcrumb" aria-label="Breadcrumb">
          <ol><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">Contact</li></ol>
        </nav>
        <div className="contact-hero-grid">
          <div className="contact-hero-copy">
            <Eyebrow>Technical inquiry</Eyebrow>
            <h1 id="contact-page-title">Tell Us About Your Hinge Requirement</h1>
            <p>Send us your hinge type, dimensions, quantity, application or technical drawing. The more information you provide, the easier it is to understand your requirement.</p>
            <div className="contact-hero-actions">
              <Link className="button button-primary" href="#contact-rfq">Start Your RFQ <Arrow /></Link>
              <Link className="button button-outline" href="/products">Explore Products <Arrow /></Link>
            </div>
          </div>
          <aside className="contact-hero-ledger" aria-label="Useful RFQ information">
            <div className="contact-ledger-heading"><span>RFQ input</span><strong>Technical inquiry</strong></div>
            <ol>{rfqInputs.map(([number, label]) => <li key={number}><span>{number}</span><p>{label}</p><i aria-hidden="true" /></li>)}</ol>
            <p className="contact-ledger-note">Provide what is available. Every technical field does not need to be completed.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactDetails() {
  return (
    <section className="section contact-details" aria-labelledby="contact-details-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Direct contact"
          title={<span id="contact-details-title">Contact {site.brand}</span>}
          description="Use the contact details below for industrial hinge and OEM inquiries."
        />
        <dl className="contact-details-grid">
          <div className="contact-company-detail"><dt>Business name</dt><dd>{contactDetails.company}</dd></div>
          <div><dt>Contact</dt><dd>{contactDetails.contact}</dd></div>
          <div><dt>Email</dt><dd><Link href={`mailto:${contactDetails.email}`}>{contactDetails.email}<Arrow diagonal /></Link></dd></div>
          <div><dt>Phone</dt><dd><Link href={`tel:${contactDetails.phoneHref}`}>{contactDetails.phoneDisplay}<Arrow diagonal /></Link></dd></div>
        </dl>
        <p className="contact-details-note"><span aria-hidden="true" />For product inquiries, please include the hinge type, required dimensions, application and estimated quantity when possible.</p>
      </div>
    </section>
  );
}

function RFQSection({ submissionEndpoint }: { submissionEndpoint: string | null }) {
  return (
    <section className="contact-rfq-section" id="contact-rfq" aria-labelledby="contact-rfq-title">
      <div className="shell contact-rfq-layout">
        <div className="contact-rfq-copy">
          <Eyebrow light>Request an industrial hinge quote</Eyebrow>
          <h2 id="contact-rfq-title">Request a Quote</h2>
          <p>Your name, email and a brief requirement are enough to start. Add specifications or a drawing only if you have them.</p>
          <ol>
            <li><span>01</span><p>Tell us how to reach you.</p></li>
            <li><span>02</span><p>Describe the hinge or application you have in mind.</p></li>
          </ol>
          <div className="contact-rfq-direct">
            <span>Direct inquiry</span>
            <Link href={`mailto:${contactDetails.email}`}>{contactDetails.email}</Link>
            <Link href={`tel:${contactDetails.phoneHref}`}>{contactDetails.phoneDisplay}</Link>
          </div>
        </div>
        <ContactRFQForm submissionEndpoint={submissionEndpoint} />
      </div>
    </section>
  );
}

function SelectionSupport() {
  return (
    <section className="contact-selection" aria-labelledby="contact-selection-title">
      <div className="shell contact-selection-row">
        <div>
          <Eyebrow>Selection support</Eyebrow>
          <h2 id="contact-selection-title">Not Sure Which Hinge You Need?</h2>
          <p>Provide the application, required dimensions, estimated quantity and any available photo or drawing for discussion.</p>
        </div>
        <Link className="button button-outline" href="#contact-rfq">Send Your Requirement <Arrow /></Link>
      </div>
    </section>
  );
}

function RequirementGuide() {
  return (
    <section className="section contact-requirement-guide" aria-labelledby="contact-checklist-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Buyer checklist"
          title={<span id="contact-checklist-title">Information That Helps Us Understand Your Requirement</span>}
          description="Include the points that are known. A drawing or reference image can help explain a size or structure that is difficult to describe in text."
        />
        <ol className="contact-checklist">
          {contactChecklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

function StandardOrCustom() {
  return (
    <section className="contact-paths" aria-labelledby="contact-paths-title">
      <div className="shell contact-paths-layout">
        <div className="contact-paths-heading">
          <Eyebrow>Choose a starting point</Eyebrow>
          <h2 id="contact-paths-title">Standard Product or Custom Requirement</h2>
        </div>
        <div className="contact-path-grid">
          <article>
            <span>01 · Standard product</span>
            <h3>Already know the hinge type?</h3>
            <p>Review the catalog families and published technical information before sending your inquiry.</p>
            <Link className="text-link" href="/products">Browse Products <Arrow /></Link>
          </article>
          <article>
            <span>02 · Custom requirement</span>
            <h3>Need a different size or structure?</h3>
            <p>Start with your required dimensions, structural requirement or technical drawing for review.</p>
            <Link className="text-link" href="/custom-hinges">Explore Custom Hinges <Arrow /></Link>
          </article>
        </div>
      </div>
    </section>
  );
}

function ApplicationEntry() {
  return (
    <section className="section contact-applications" aria-labelledby="contact-applications-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Application entry"
          title={<span id="contact-applications-title">Explore by Application</span>}
          description="Start with the installation context when the hinge family or model is not yet known."
        >
          <Link className="text-link section-heading-link" href="/applications">Explore Applications <Arrow diagonal /></Link>
        </SectionHeading>
        <nav className="contact-application-links" aria-label="Application pages">
          {contactApplicationEntries.map((entry, index) => <Link key={entry.label} href={entry.href}><span>{String(index + 1).padStart(2, "0")}</span><strong>{entry.label}</strong><Arrow /></Link>)}
        </nav>
        <div className="contact-response-note"><span>After submission</span><p>Once your requirement is submitted, the information can be reviewed for further discussion.</p></div>
      </div>
    </section>
  );
}

function InquiryFaq() {
  return (
    <section className="section contact-faq" aria-labelledby="contact-faq-title">
      <div className="shell contact-faq-layout">
        <div className="contact-faq-heading">
          <Eyebrow>Before you send</Eyebrow>
          <h2 id="contact-faq-title">Inquiry Questions</h2>
          <p>Short answers about preparing a useful technical inquiry.</p>
        </div>
        <div className="contact-faq-list">
          {contactFaq.map((item, index) => (
            <details key={item.question}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><Plus /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="contact-final-cta" aria-labelledby="contact-final-title">
      <div className="shell contact-final-layout">
        <div><Eyebrow light>Start the discussion</Eyebrow><h2 id="contact-final-title">Ready to Discuss Your Hinge Requirement?</h2></div>
        <div className="contact-final-copy">
          <p>Send the product reference, dimensions, quantity, application or available technical files.</p>
          <div><Link className="button button-primary" href="#contact-rfq">Submit Your RFQ <Arrow /></Link><Link className="button contact-final-secondary" href="/products">Browse Hinges <Arrow /></Link></div>
        </div>
      </div>
    </section>
  );
}

export function ContactPageContent({ submissionEndpoint }: { submissionEndpoint: string | null }) {
  return <><ContactHero /><ContactDetails /><RFQSection submissionEndpoint={submissionEndpoint} /><SelectionSupport /><RequirementGuide /><StandardOrCustom /><ApplicationEntry /><InquiryFaq /><ContactCTA /></>;
}
