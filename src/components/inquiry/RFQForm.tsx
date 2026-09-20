"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { families } from "@/data/catalog";
import { useInquiry } from "./InquiryProvider";
import { Arrow } from "@/components/ui/Arrow";
import { drawingFileAccept, validateDrawingFile } from "@/data/drawing-file";
import { InquiryPrivacy, InquirySecurity } from "./InquirySecurity";
import { InquiryResult } from "./InquiryResult";
import { postInquiry } from "@/lib/rfq-delivery";

type Fields = { name: string; company: string; email: string; country: string; quantity: string; customRequirement: string; message: string };
const initialFields: Fields = { name: "", company: "", email: "", country: "", quantity: "", customRequirement: "", message: "" };
export type RFQFormOptions = {
  fixedProductName?: string;
  allowDrawing?: boolean;
  contextLabel?: string;
  productLabel?: string;
  customRequirementLabel?: string;
  uploadLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
};

export function RFQForm({
  fixedProductName,
  allowDrawing = false,
  contextLabel = "Homepage",
  productLabel = "Product type",
  customRequirementLabel = "Custom requirement",
  uploadLabel = "Drawing upload",
  messageLabel,
  submitLabel = "Submit RFQ",
}: RFQFormOptions = {}) {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewReady, setPreviewReady] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const { selection, updateSelection } = useInquiry();
  const resultRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<HTMLInputElement>(null);
  const [drawing, setDrawing] = useState<File | null>(null);
  const [drawingIssue, setDrawingIssue] = useState<string | null>(null);
  const endpoint = process.env.NEXT_PUBLIC_RFQ_ENDPOINT?.trim();
  const configured = Boolean(endpoint && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());
  const [delivery, setDelivery] = useState<"idle" | "submitting" | "received" | "failed">("idle");
  const [attempt, setAttempt] = useState(0);
  const requestId = useRef<string | null>(null);
  const sending = useRef(false);

  useEffect(() => { setInteractive(true); }, []);

  // Catalog and application links can update the form from elsewhere on the page.
  useEffect(() => {
    setPreviewReady(false);
    setDelivery("idle");
    requestId.current = null;
    if (selection.product) {
      setErrors((previous) => {
        if (!previous.product) return previous;
        const next = { ...previous };
        delete next.product;
        return next;
      });
    }
  }, [selection.product, selection.size, selection.application]);

  function clearError(name: string) {
    setPreviewReady(false);
    setDelivery("idle");
    requestId.current = null;
    setErrors((previous) => { const next = { ...previous }; delete next[name]; delete next.delivery; return next; });
  }

  function changeField(name: keyof Fields, value: string) {
    setFields((previous) => ({ ...previous, [name]: value }));
    clearError(name);
  }

  function changeDrawing(file: File | null) {
    const issue = validateDrawingFile(file);
    setDrawingIssue(issue);
    setDrawing(issue ? null : file);
    clearError("drawing");
    if (issue) setErrors((previous) => ({ ...previous, drawing: issue }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || delivery === "received") return;
    const form = event.currentTarget;
    const nextErrors: Record<string, string> = {};
    if (!fields.name.trim()) nextErrors.name = "Please enter your name.";
    if (!fields.company.trim()) nextErrors.company = "Please enter your company.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) nextErrors.email = "Please enter a valid email address.";
    if (!fields.country.trim()) nextErrors.country = "Please enter your country or region.";
    if (!selection.product) nextErrors.product = "Please choose a hinge type, or select a custom requirement.";
    if (allowDrawing && drawingIssue) nextErrors.drawing = drawingIssue;
    setErrors(nextErrors);
    const valid = Object.keys(nextErrors).length === 0;
    setPreviewReady(valid && !configured);
    if (valid && configured && endpoint) {
      const body = new FormData(form);
      if (!body.get("cf-turnstile-response")) {
        setDelivery("failed");
      } else {
        requestId.current ??= crypto.randomUUID();
        body.set("requestId", requestId.current);
        body.set("formKind", "catalog");
        body.set("sourcePath", window.location.pathname);
        sending.current = true;
        setDelivery("submitting");
        try {
          await postInquiry(endpoint, body);
          setDelivery("received");
        } catch {
          setDelivery("failed");
        } finally {
          sending.current = false;
          setAttempt((current) => current + 1);
        }
      }
    }
    requestAnimationFrame(() => resultRef.current?.focus({ preventScroll: false }));
  }

  const errorMessage = (field: string) => errors[field] ? <span id={`error-${field}`} className="field-error">{errors[field]}</span> : null;
  const errorProps = (field: string) => ({ "aria-invalid": Boolean(errors[field]), "aria-describedby": errors[field] ? `error-${field}` : undefined });

  return (
    <form className="rfq-form" noValidate method="post" onSubmit={submit} aria-busy={delivery === "submitting"}>
      <div className="form-heading"><h3>Your hinge requirement</h3><span>* Required fields</span></div>
      <p className="form-preview-note"><span aria-hidden="true" />{configured ? "Submit your requirement securely to HINGETRA." : fixedProductName ? "Product page preview · RFQs and files are not sent." : `${contextLabel} preview · RFQs are not sent.`}</p>
      {(delivery === "received" || delivery === "failed") && <InquiryResult resultRef={resultRef} success={delivery === "received"} />}
      {(Object.keys(errors).length > 0 || previewReady) && <div ref={resultRef} tabIndex={-1} className={previewReady ? "form-notice" : "form-error-summary"} role={previewReady ? "status" : "alert"}>
        <strong>{previewReady ? "Request prepared, not sent." : "Please check the highlighted fields."}</strong>
        {previewReady ? <p>{fixedProductName ? "Inquiry delivery is not configured. Your entries and any selected drawing remain in this browser tab; nothing has been sent or uploaded." : `This ${contextLabel.toLowerCase()} is a preview. Inquiry delivery is not configured, so no RFQ has been sent. Your entries are preserved below.`}</p> : <ul>{Object.entries(errors).map(([name, message]) => <li key={name}><Link href={`#rfq-${name}`}>{message}</Link></li>)}</ul>}
      </div>}
      <fieldset disabled={delivery === "submitting"} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}><div className="form-grid">
        <div className="field"><label htmlFor="rfq-name">Name <span>*</span></label><input id="rfq-name" name="name" autoComplete="name" required value={fields.name} onChange={(event) => changeField("name", event.target.value)} maxLength={120} placeholder="Your name" {...errorProps("name")} />{errorMessage("name")}</div>
        <div className="field"><label htmlFor="rfq-company">Company <span>*</span></label><input id="rfq-company" name="company" autoComplete="organization" required value={fields.company} onChange={(event) => changeField("company", event.target.value)} maxLength={180} placeholder="Company name" {...errorProps("company")} />{errorMessage("company")}</div>
        <div className="field"><label htmlFor="rfq-email">Business email <span>*</span></label><input id="rfq-email" name="email" type="email" autoComplete="email" required value={fields.email} onChange={(event) => changeField("email", event.target.value)} maxLength={254} placeholder="you@company.com" {...errorProps("email")} />{errorMessage("email")}</div>
        <div className="field"><label htmlFor="rfq-country">Country / Region <span>*</span></label><input id="rfq-country" name="country" autoComplete="country-name" required value={fields.country} onChange={(event) => changeField("country", event.target.value)} maxLength={100} placeholder="Your country or region" {...errorProps("country")} />{errorMessage("country")}</div>
        <div className="field"><label htmlFor="rfq-product">{productLabel} <span>*</span></label>{fixedProductName ? <><input id="rfq-product" value={fixedProductName} readOnly {...errorProps("product")} /><input type="hidden" name="product" value={selection.product} /></> : <select id="rfq-product" name="product" required value={selection.product} onChange={(event) => { updateSelection({ product: event.target.value, size: "" }); clearError("product"); }} {...errorProps("product")}><option value="">Select a hinge type</option>{families.map((family) => <option key={family.id} value={family.id}>{family.shortName}</option>)}<option value="custom">Not sure / Custom requirement</option></select>}{errorMessage("product")}</div>
        <div className="field"><label htmlFor="rfq-size">Required size</label><input id="rfq-size" name="size" value={selection.size} onChange={(event) => { updateSelection({ size: event.target.value }); setPreviewReady(false); }} maxLength={300} placeholder="Catalog size or your dimensions" /></div>
        <div className="field"><label htmlFor="rfq-quantity">Estimated quantity</label><input id="rfq-quantity" name="quantity" value={fields.quantity} onChange={(event) => changeField("quantity", event.target.value)} maxLength={120} placeholder="Quantity per order or annual need" /></div>
        <div className="field"><label htmlFor="rfq-application">Application</label><input id="rfq-application" name="application" value={selection.application} onChange={(event) => { updateSelection({ application: event.target.value }); setPreviewReady(false); }} maxLength={180} placeholder="Where will the hinge be used?" /></div>
        {allowDrawing && <>
          <div className="field field-full"><label htmlFor="rfq-customRequirement">{customRequirementLabel} <span>(optional)</span></label><input id="rfq-customRequirement" name="customRequirement" value={fields.customRequirement} onChange={(event) => changeField("customRequirement", event.target.value)} maxLength={500} placeholder="Describe a different size or configuration" /></div>
          <div className="field field-full drawing-upload-field"><label htmlFor="rfq-drawing">{uploadLabel} <span>(optional)</span></label><input ref={drawingRef} id="rfq-drawing" name="drawing" type="file" accept={drawingFileAccept} onChange={(event) => changeDrawing(event.currentTarget.files?.[0] ?? null)} aria-invalid={Boolean(errors.drawing)} aria-describedby={`drawing-help${errors.drawing ? " error-drawing" : ""}`} /><p id="drawing-help" className="drawing-upload-help">PDF, DXF, DWG, STEP, IGES, JPG or PNG · up to 10 MB.<br />{configured ? "Selected files are uploaded privately when you submit." : "Files stay in this browser tab. Nothing is uploaded in this preview."}</p>{errorMessage("drawing")}{drawing && <div className="drawing-selection" role="status"><span>{drawing.name}</span><button type="button" onClick={() => { if (drawingRef.current) drawingRef.current.value = ""; changeDrawing(null); }} aria-label="Remove selected drawing">Remove</button></div>}</div>
        </>}
        <div className="field field-full"><label htmlFor="rfq-message">{messageLabel ?? (fixedProductName ? "Message" : "Tell us about your project")}</label><textarea id="rfq-message" name="message" rows={4} value={fields.message} onChange={(event) => changeField("message", event.target.value)} maxLength={5000} placeholder="Dimensions, installation details, packaging or inspection requirements. If you have a drawing, let us know." /></div>
      </div></fieldset>
      {configured && <><InquirySecurity attempt={attempt} /><InquiryPrivacy /></>}
      <div className="form-bottom"><p>No account required.<br />{configured ? "Submitting shares your details and chosen files as described above." : "No details are transmitted in this preview."}</p><button id="rfq-submit" className="button button-primary" type="submit" disabled={!interactive || delivery === "submitting" || delivery === "received"}>{delivery === "submitting" ? "Submitting RFQ" : submitLabel} <Arrow /></button></div>
      <noscript><p>JavaScript is required to validate and submit this form. Please use the direct email link instead.</p></noscript>
    </form>
  );
}
