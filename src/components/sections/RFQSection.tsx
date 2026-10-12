import { RFQForm, type RFQFormOptions } from "@/components/inquiry/RFQForm";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function RFQSection({ formOptions }: { formOptions?: RFQFormOptions } = {}) {
  return (
    <section id="rfq" className="section rfq-section" aria-labelledby="rfq-title">
      <div className="shell rfq-layout">
        <div className="rfq-copy">
          <Eyebrow light>Let’s talk about your project</Eyebrow>
          <h2 id="rfq-title">Need a hinge <br />for your <br /><span>application?</span></h2>
          <p>Start with what you know. Tell us the hinge type, dimensions, quantity and application you have in mind.</p>
          <div className="rfq-checklist"><span className="micro-label">A useful inquiry includes</span><ol><li><span>01</span>Hinge type or a reference drawing</li><li><span>02</span>Dimensions and installation details</li><li><span>03</span>Quantity and project requirements</li></ol></div>
          <div className="rfq-side-note"><p>Order terms confirmed for your requirement.</p><span>Quantity, samples, timing and packing are agreed with the quotation.</span></div>
        </div>
        <RFQForm {...formOptions} />
      </div>
    </section>
  );
}
