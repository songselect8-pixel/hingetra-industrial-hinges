"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { InquiryPrivacy, InquirySecurity } from "@/components/inquiry/InquirySecurity";
import { postInquiry } from "@/lib/rfq-delivery";
import { contactProductOptions } from "@/data/contact";
import {
  contactDrawingAccept,
  contactImageAccept,
  initialContactRFQFields,
  validateContactFile,
  validateContactRFQ,
  type ContactRFQErrors,
  type ContactRFQFields,
  type ContactRFQFiles,
} from "@/data/contact-rfq";

type DeliveryState = "idle" | "invalid" | "not-configured" | "submitting" | "sent" | "failed";
type FileKind = keyof ContactRFQFiles;

export function ContactRFQForm({ submissionEndpoint }: { submissionEndpoint: string | null }) {
  const [fields, setFields] = useState<ContactRFQFields>({ ...initialContactRFQFields });
  const [files, setFiles] = useState<{ drawing: File | null; referenceImage: File | null }>({ drawing: null, referenceImage: null });
  const [errors, setErrors] = useState<ContactRFQErrors>({});
  const [delivery, setDelivery] = useState<DeliveryState>("idle");
  const resultRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const requestId = useRef<string | null>(null);
  const sending = useRef(false);
  const [receipt, setReceipt] = useState("");
  const [attempt, setAttempt] = useState(0);
  const configured = Boolean(submissionEndpoint && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());

  useEffect(() => {
    if (delivery !== "idle" && delivery !== "submitting") resultRef.current?.focus({ preventScroll: false });
  }, [delivery, errors]);

  function clearErrors(...names: (keyof ContactRFQErrors)[]) {
    requestId.current = null;
    setDelivery("idle");
    setErrors((current) => {
      const next = { ...current };
      for (const name of [...names, "requirement" as const, "delivery" as const]) delete next[name];
      return next;
    });
  }

  function changeField(name: keyof ContactRFQFields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    clearErrors(name);
  }

  function changeFile(kind: FileKind, file: File | null) {
    const issue = validateContactFile(file, kind);
    setFiles((current) => ({ ...current, [kind]: issue ? null : file }));
    clearErrors(kind);
    if (issue) {
      const input = kind === "drawing" ? drawingRef.current : imageRef.current;
      if (input) input.value = "";
      setErrors((current) => ({ ...current, [kind]: issue }));
    }
  }

  function removeFile(kind: FileKind) {
    const input = kind === "drawing" ? drawingRef.current : imageRef.current;
    if (input) input.value = "";
    changeFile(kind, null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || delivery === "sent") return;
    const form = event.currentTarget;
    const nextErrors = validateContactRFQ(fields, files);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setDelivery("invalid");
      return;
    }

    if (!configured || !submissionEndpoint) {
      setDelivery("not-configured");
      return;
    }

    const body = new FormData(form);
    if (!body.get("cf-turnstile-response")) {
      setErrors({ delivery: "Complete the security check below before submitting." });
      setDelivery("failed");
      return;
    }
    requestId.current ??= crypto.randomUUID();
    body.set("requestId", requestId.current);
    body.set("formKind", "contact");
    body.set("sourcePath", window.location.pathname);
    sending.current = true;
    setDelivery("submitting");
    try {
      const result = await postInquiry(submissionEndpoint, body);
      setReceipt(result.inquiryId);
      setDelivery("sent");
    } catch (error) {
      setErrors((current) => ({ ...current, delivery: error instanceof Error ? error.message : "No confirmation was received. Your entries are still available below." }));
      setDelivery("failed");
    } finally {
      sending.current = false;
      setAttempt((current) => current + 1);
    }
  }

  const fieldError = (name: keyof ContactRFQErrors) => errors[name]
    ? <span id={`contact-error-${name}`} className="field-error">{errors[name]}</span>
    : null;
  const fieldProps = (name: keyof ContactRFQErrors, helpId?: string) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": [helpId, errors[name] ? `contact-error-${name}` : null].filter(Boolean).join(" ") || undefined,
  });
  const summaryTarget = (name: string) => ({
    requirement: "contact-product-type",
    drawing: "contact-drawing",
    referenceImage: "contact-reference-image",
    delivery: "contact-submit",
  })[name] ?? `contact-${name}`;

  const notice = delivery === "not-configured"
    ? { title: "Request checked, not sent.", text: "Inquiry delivery is not configured. Your entries and selected files remain in this browser tab; nothing has been transmitted." }
    : delivery === "sent"
      ? { title: "Inquiry received.", text: `Your inquiry and selected files have been saved. Reference: ${receipt}. Your entries remain visible for reference.` }
      : delivery === "failed"
        ? { title: "RFQ delivery failed.", text: "No confirmation was received. Review the message below or contact the company directly." }
        : null;

  return (
    <form className="contact-rfq-form rfq-form" noValidate method="post" onSubmit={submit} aria-busy={delivery === "submitting"}>
      <div className="form-heading"><h3>Request a Quote</h3><span>* Required fields</span></div>
      <p className="form-preview-note"><span aria-hidden="true" />{configured ? "Submit your requirement securely to HINGETRA." : "Preview · RFQs and files are not sent."}</p>

      {(delivery === "invalid" || notice) && (
        <div id="contact-form-result" ref={resultRef} tabIndex={-1} className={delivery === "invalid" || delivery === "failed" ? "form-error-summary" : "form-notice"} role={delivery === "invalid" || delivery === "failed" ? "alert" : "status"}>
          <strong>{delivery === "invalid" ? "Please check the highlighted fields." : notice?.title}</strong>
          {delivery === "invalid"
            ? <ul>{Object.entries(errors).map(([name, message]) => <li key={name}><Link href={`#${summaryTarget(name)}`}>{message}</Link></li>)}</ul>
            : <p>{notice?.text}</p>}
        </div>
      )}

      <fieldset className="contact-form-group" disabled={delivery === "submitting"}>
        <legend><span>01</span> Contact Information</legend>
        <div className="contact-form-grid">
          <div className="field"><label htmlFor="contact-name">Name <span>*</span></label><input id="contact-name" name="name" required autoComplete="name" maxLength={120} value={fields.name} onChange={(event) => changeField("name", event.target.value)} placeholder="Your name" {...fieldProps("name")} />{fieldError("name")}</div>
          <div className="field"><label htmlFor="contact-company">Company <span>*</span></label><input id="contact-company" name="company" required autoComplete="organization" maxLength={180} value={fields.company} onChange={(event) => changeField("company", event.target.value)} placeholder="Company name" {...fieldProps("company")} />{fieldError("company")}</div>
          <div className="field"><label htmlFor="contact-email">Business Email <span>*</span></label><input id="contact-email" name="email" required type="email" autoComplete="email" maxLength={254} value={fields.email} onChange={(event) => changeField("email", event.target.value)} placeholder="you@company.com" {...fieldProps("email")} />{fieldError("email")}</div>
          <div className="field"><label htmlFor="contact-phone">Phone / Contact Number</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={80} value={fields.phone} onChange={(event) => changeField("phone", event.target.value)} placeholder="Include country code where possible" /></div>
          <div className="field field-full"><label htmlFor="contact-country">Country / Region <span>*</span></label><input id="contact-country" name="country" required autoComplete="country-name" maxLength={100} value={fields.country} onChange={(event) => changeField("country", event.target.value)} placeholder="Your country or region" {...fieldProps("country")} />{fieldError("country")}</div>
        </div>
      </fieldset>

      <fieldset className="contact-form-group" disabled={delivery === "submitting"}>
        <legend><span>02</span> Product Requirement</legend>
        <div className="contact-form-grid">
          <div className="field"><label htmlFor="contact-product-type">Product Type</label><select id="contact-product-type" name="productType" value={fields.productType} onChange={(event) => changeField("productType", event.target.value)} {...fieldProps("requirement")}><option value="">Select a hinge type</option>{contactProductOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{fieldError("requirement")}</div>
          <div className="field"><label htmlFor="contact-referenceProduct">Reference Product / Model</label><input id="contact-referenceProduct" name="referenceProduct" maxLength={180} value={fields.referenceProduct} onChange={(event) => changeField("referenceProduct", event.target.value)} placeholder="Catalog model or reference" /></div>
          <div className="field"><label htmlFor="contact-size">Required Size / Dimensions</label><input id="contact-size" name="size" maxLength={300} value={fields.size} onChange={(event) => changeField("size", event.target.value)} placeholder="Use catalog notation or required dimensions" /></div>
          <div className="field"><label htmlFor="contact-quantity">Estimated Quantity</label><input id="contact-quantity" name="quantity" maxLength={120} value={fields.quantity} onChange={(event) => changeField("quantity", event.target.value)} placeholder="Estimated order quantity" /></div>
          <div className="field field-full"><label htmlFor="contact-application">Application</label><input id="contact-application" name="application" maxLength={220} value={fields.application} onChange={(event) => changeField("application", event.target.value)} placeholder="Door, gate, trailer, cabinet or other context" /></div>
        </div>
      </fieldset>

      <fieldset className="contact-form-group contact-choice-group" disabled={delivery === "submitting"}>
        <legend><span>03</span> Requirement Type</legend>
        <div className="contact-radio-grid">
          {["Standard Product", "Custom Requirement", "Not Sure / Need Selection Help"].map((label) => {
            const value = label.startsWith("Standard") ? "standard" : label.startsWith("Custom") ? "custom" : "not-sure";
            return <label className="contact-radio" key={value}><input type="radio" name="requirementPath" value={value} checked={fields.requirementPath === value} onChange={(event) => changeField("requirementPath", event.target.value)} /><span>{label}</span></label>;
          })}
        </div>
      </fieldset>

      <fieldset className="contact-form-group" disabled={delivery === "submitting"}>
        <legend><span>04</span> Technical Information</legend>
        <div className="contact-form-grid">
          <div className="field field-full"><label htmlFor="contact-technicalRequirements">Technical Requirements</label><textarea id="contact-technicalRequirements" name="technicalRequirements" rows={4} maxLength={4000} value={fields.technicalRequirements} onChange={(event) => changeField("technicalRequirements", event.target.value)} placeholder="Describe required structure, dimensions or other technical points" /></div>
          <div className="field field-full"><label htmlFor="contact-referenceDescription">Reference Product Description</label><textarea id="contact-referenceDescription" name="referenceDescription" rows={3} maxLength={2500} value={fields.referenceDescription} onChange={(event) => changeField("referenceDescription", event.target.value)} placeholder="Describe the reference product or visible construction" /></div>
          <div className="field field-full"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={4} maxLength={5000} value={fields.message} onChange={(event) => changeField("message", event.target.value)} placeholder="Add any other information that can help explain the requirement" /></div>
        </div>
      </fieldset>

      <fieldset className="contact-form-group contact-file-group" disabled={delivery === "submitting"}>
        <legend><span>05</span> File Upload</legend>
        <div className="contact-file-grid">
          <div className="field contact-file-field">
            <label htmlFor="contact-drawing">Technical Drawing <span>(optional)</span></label>
            <input ref={drawingRef} id="contact-drawing" name="drawing" type="file" accept={contactDrawingAccept} onChange={(event) => changeFile("drawing", event.currentTarget.files?.[0] ?? null)} {...fieldProps("drawing", "contact-drawing-help")} />
            <p id="contact-drawing-help">PDF, DWG, DXF, JPG or PNG · up to 10 MB.</p>{fieldError("drawing")}
            {files.drawing && <div className="contact-file-selection" role="status"><span>{files.drawing.name}</span><button type="button" onClick={() => removeFile("drawing")}>Remove</button></div>}
          </div>
          <div className="field contact-file-field">
            <label htmlFor="contact-reference-image">Reference Image <span>(optional)</span></label>
            <input ref={imageRef} id="contact-reference-image" name="referenceImage" type="file" accept={contactImageAccept} onChange={(event) => changeFile("referenceImage", event.currentTarget.files?.[0] ?? null)} {...fieldProps("referenceImage", "contact-reference-image-help")} />
            <p id="contact-reference-image-help">JPG or PNG · up to 10 MB.</p>{fieldError("referenceImage")}
            {files.referenceImage && <div className="contact-file-selection" role="status"><span>{files.referenceImage.name}</span><button type="button" onClick={() => removeFile("referenceImage")}>Remove</button></div>}
          </div>
        </div>
      </fieldset>

      {configured && <><InquirySecurity attempt={attempt} /><InquiryPrivacy /></>}
      {errors.delivery && <p id="contact-error-delivery" className="contact-delivery-error" role="alert">{errors.delivery}</p>}
      <div className="contact-form-bottom form-bottom">
        <p>{configured ? "Submitting shares your details and chosen files with HINGETRA as described above." : "Inquiry delivery is not configured in this preview. Nothing is transmitted or uploaded."}</p>
        <button id="contact-submit" className="button button-primary" type="submit" disabled={delivery === "submitting" || delivery === "sent"}>{delivery === "submitting" ? "Submitting RFQ" : delivery === "sent" ? "Inquiry received" : "Submit RFQ"} <Arrow /></button>
      </div>
      <p className="contact-privacy-note">Your submitted information is intended to help understand and respond to your inquiry. No account registration is required.</p>
      <noscript><p className="contact-noscript">JavaScript is required to validate this form. Use the direct email or phone contact shown on this page.</p></noscript>
    </form>
  );
}
