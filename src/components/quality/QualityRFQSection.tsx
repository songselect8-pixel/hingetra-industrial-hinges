import Link from "next/link";
import { RFQForm, type RFQFormOptions } from "@/components/inquiry/RFQForm";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow } from "@/components/ui/SectionHeading";

const qualityFormOptions = {
  allowDrawing: true,
  contextLabel: "Quality page",
  productLabel: "Hinge type",
  customRequirementLabel: "Checking / specification requirements",
  uploadLabel: "Drawing or reference image",
  messageLabel: "Application and requirement details",
  submitLabel: "Send Your Requirement",
} satisfies RFQFormOptions;

export function QualityRFQSection() {
  return (
    <section id="rfq" className="section rfq-section quality-rfq" aria-labelledby="rfq-title">
      <div className="shell rfq-layout">
        <div className="rfq-copy">
          <Eyebrow light>Quality requirement RFQ</Eyebrow>
          <h2 id="rfq-title">Have Specific Hinge Requirements?</h2>
          <p>Send your dimensions, application or technical drawing for discussion.</p>
          <div className="rfq-checklist"><span className="micro-label">A useful inquiry includes</span><ol><li><span>01</span>Hinge family or reference product</li><li><span>02</span>Required dimensions and application</li><li><span>03</span>Drawing and relevant checking requirements</li></ol></div>
          <Link href="/custom-hinges/" className="quality-rfq-secondary">Explore Custom Hinges <Arrow diagonal /></Link>
          <div className="rfq-side-note"><p>Published product or custom requirement.</p><span>Applicable specifications remain subject to confirmation.</span></div>
        </div>
        <RFQForm {...qualityFormOptions} />
      </div>
    </section>
  );
}
