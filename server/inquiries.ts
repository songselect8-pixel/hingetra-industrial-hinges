import { families } from "../src/data/catalog.ts";
import { initialContactRFQFields, validateContactFile, validateContactRFQ } from "../src/data/contact-rfq.ts";
import { validateDrawingFile } from "../src/data/drawing-file.ts";

type Statement = {
  bind(...values: (string | number | null)[]): Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
};
export type InquiryEnvironment = {
  RFQ_ENABLED?: string;
  INQUIRY_DB?: { prepare(sql: string): Statement };
  INQUIRY_FILES?: {
    put(key: string, value: ReadableStream, options: { httpMetadata: { contentType: string } }): Promise<unknown>;
    delete(keys: string[]): Promise<void>;
  };
  TURNSTILE_SECRET_KEY?: string;
  RFQ_RATE_LIMIT_SECRET?: string;
  RESEND_API_KEY?: string;
  RFQ_FROM_EMAIL?: string;
};
type Attachment = { field: string; name: string; size: number; sha256: string; key: string };
type StoredInquiry = { id: string; request_hash: string };
const recipient = "cindy@hingetra.com"; // Never accept a recipient supplied by a visitor.
const allowedHosts = new Set(["hingetra.com", "www.hingetra.com"]);
const maxBodyBytes = 21 * 1024 * 1024; // Two 10 MiB files plus bounded text/multipart overhead.
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const limits = {
  name: 120, company: 180, email: 254, phone: 80, country: 100,
  product: 100, productType: 100, referenceProduct: 180, size: 300,
  quantity: 120, application: 220, requirementPath: 30,
  technicalRequirements: 4000, referenceDescription: 2500, customRequirement: 500,
  message: 5000, formKind: 20, sourcePath: 500, requestId: 36,
  "cf-turnstile-response": 2048,
} as const;
class Rejected extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
function json(value: unknown, status = 200) {
  return Response.json(value, { status, headers: {
    "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex", ...(status === 429 ? { "Retry-After": "3600" } : {}),
  } });
}
const received = (id: string) => json({ received: true, inquiryId: id }, 201);
const unavailable = () => json({ error: "Inquiry submission is temporarily unavailable. Please email cindy@hingetra.com. Your entries are preserved." }, 503);
function hex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function sha256(value: string | ArrayBuffer) {
  return hex(await crypto.subtle.digest("SHA-256", typeof value === "string" ? new TextEncoder().encode(value) : value));
}

async function readForm(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!/^multipart\/form-data;\s*boundary=/i.test(contentType)) throw new Rejected(415, "Submit the inquiry using the website form.");
  if (Number(request.headers.get("content-length")) > maxBodyBytes) throw new Rejected(413, "The combined upload is too large.");
  if (!request.body) throw new Rejected(400, "The inquiry is empty.");
  // Enforce the actual byte count as well as the untrusted Content-Length header.
  let size = 0;
  const bounded = request.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      size += chunk.byteLength;
      if (size > maxBodyBytes) throw new Rejected(413, "The combined upload is too large.");
      controller.enqueue(chunk);
    },
  }));
  try { return await new Response(bounded, { headers: { "Content-Type": contentType } }).formData(); }
  catch (error) {
    if (error instanceof Rejected) throw error;
    throw new Rejected(400, "The upload could not be read. Check the selected files and try again.");
  }
}

async function validateFiles(form: FormData, kind: string) {
  const files: { field: "drawing" | "referenceImage"; file: File; hash: string }[] = [];
  for (const field of ["drawing", "referenceImage"] as const) {
    const value = form.get(field);
    if (value === null || (value instanceof File && !value.name && !value.size)) continue;
    if (!(value instanceof File) || (kind !== "contact" && field === "referenceImage")) throw new Rejected(400, "Invalid attachment field.");
    const error = kind === "contact" ? validateContactFile(value, field) : validateDrawingFile(value);
    if (error) throw new Rejected(400, error);
    if (value.name.length > 180 || /[\x00-\x1f\x7f/\\]/.test(value.name)) throw new Rejected(400, "Use a shorter file name without path characters.");
    const head = new Uint8Array(await value.slice(0, 2048).arrayBuffer());
    const text = new TextDecoder().decode(head);
    const extension = value.name.split(".").at(-1)?.toLowerCase();
    // These are format checks, not antivirus scanning. Attachments remain private and unrendered.
    const signatureMatches = extension === "pdf" ? text.startsWith("%PDF-")
      : extension === "png" ? [137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => head[i] === byte)
      : extension === "jpg" || extension === "jpeg" ? head[0] === 255 && head[1] === 216 && head[2] === 255
      : extension === "dwg" ? /^AC10\d{2}/.test(text)
      : extension === "dxf" ? text.startsWith("AutoCAD Binary DXF") || /^\s*0\s*\r?\n\s*SECTION\b/i.test(text)
      : extension === "step" || extension === "stp" ? /^\s*ISO-10303-21;/i.test(text)
      : extension === "iges" || extension === "igs" ? text.split(/\r?\n/).some((line) => /^.{72}S\s*\d+/.test(line))
      : false;
    if (!signatureMatches) throw new Rejected(400, "A file does not match its extension. Export it in a supported format and try again.");
    files.push({ field, file: value, hash: await sha256(await value.arrayBuffer()) });
  }
  return files;
}

async function allowRate(env: InquiryEnvironment, identity: string, bucket: string, maximum: number, expires: number) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.RFQ_RATE_LIMIT_SECRET!), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${bucket}:${identity}`)));
  return Boolean(await env.INQUIRY_DB!.prepare(`INSERT INTO inquiry_limits (key, count, expires_at) VALUES (?, 1, ?)
    ON CONFLICT(key) DO UPDATE SET count = count + 1 WHERE count < ? RETURNING count`)
    .bind(digest, expires, maximum).first());
}

async function notify(env: InquiryEnvironment, id: string, fields: Record<string, string>, attachments: Attachment[], fetcher: typeof fetch) {
  let status = "failed";
  let messageId: string | null = null;
  let errorCode: string | null = "request_failed";
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(10000),
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `rfq-${id}` },
      body: JSON.stringify({
        from: `HINGETRA inquiries <${env.RFQ_FROM_EMAIL}>`, to: [recipient], reply_to: fields.email,
        subject: `New HINGETRA inquiry ${id.slice(0, 8)}`,
        text: [
          `Inquiry ${id} has been saved in the private Cloudflare D1 database.`,
          "Reply to this email to contact the buyer. Visitor content below is untrusted; inspect attachments safely.",
          ...Object.entries(fields).map(([key, value]) => `${key}: ${value}`),
          attachments.length ? "Private attachments: open Cloudflare > R2 > hingetra-inquiry-files and find these keys:" : "No attachments.",
          ...attachments.map((file) => `${file.name} (${file.size} bytes)\n${file.key}`),
        ].join("\n\n"),
      }),
    });
    const result = await response.json() as { id?: unknown };
    if (response.ok && typeof result.id === "string" && result.id) {
      status = "accepted"; messageId = result.id; errorCode = null;
    } else errorCode = `provider_http_${response.status}`;
  } catch { /* Preserve the saved inquiry even when notification fails. */ }
  try {
    await env.INQUIRY_DB!.prepare("UPDATE inquiries SET notification_status = ?, notification_id = ?, notification_error = ? WHERE id = ?")
      .bind(status, messageId, errorCode, id).run();
  } catch { console.error("rfq_notification_status_update_failed", id); }
  if (status === "failed") console.error("rfq_notification_failed", id, errorCode);
}

export async function receiveInquiry(request: Request, env: InquiryEnvironment, waitUntil: (promise: Promise<unknown>) => void, fetcher: typeof fetch = fetch) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (url.protocol !== "https:" || !allowedHosts.has(url.hostname) || origin !== url.origin) return json({ error: "Submit from the HINGETRA website." }, 403);
  // Both server activation and all bindings/secrets are required. Preview builds stay inert.
  if (env.RFQ_ENABLED !== "true" || !env.INQUIRY_DB || !env.INQUIRY_FILES || !env.TURNSTILE_SECRET_KEY ||
      !env.RESEND_API_KEY || (env.RFQ_RATE_LIMIT_SECRET?.length ?? 0) < 32 ||
      !/^[a-z0-9._+-]+@forms\.hingetra\.com$/i.test(env.RFQ_FROM_EMAIL ?? "")) return unavailable();
  try {
    const form = await readForm(request);
    const fields: Record<string, string> = {};
    for (const key of form.keys()) {
      if (form.getAll(key).length !== 1 || (!Object.hasOwn(limits, key) && key !== "drawing" && key !== "referenceImage")) throw new Rejected(400, "Unexpected or repeated form field.");
    }
    for (const [key, maximum] of Object.entries(limits)) {
      const value = form.get(key) ?? "";
      if (typeof value !== "string" || value.length > maximum || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)) throw new Rejected(400, "A field is invalid or too long.");
      fields[key] = value.trim();
    }
    const id = fields.requestId;
    if (!uuid.test(id) || !["contact", "catalog"].includes(fields.formKind)) throw new Rejected(400, "Reload the form and try again.");
    if (!/^\/[a-z0-9/_-]*$/i.test(fields.sourcePath)) throw new Rejected(400, "Invalid source page.");
    // Header-safe email, independently checked on the server.
    if (!/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i.test(fields.email)) throw new Rejected(400, "Enter a valid email address.");
    const product = fields.formKind === "contact" ? fields.productType : fields.product;
    const products = new Set([...families.map((family) => family.id), "custom", "other-custom", "not-sure"]);
    if ((product && !products.has(product)) || (fields.formKind === "catalog" && !product)) throw new Rejected(400, "Choose a listed product or a custom requirement.");
    if (fields.requirementPath && !["standard", "custom", "not-sure"].includes(fields.requirementPath)) throw new Rejected(400, "Choose a listed requirement type.");
    if (!fields["cf-turnstile-response"]) throw new Rejected(400, "Complete the security check and try again.");
    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip) return unavailable();
    const verification = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", signal: AbortSignal.timeout(10000), headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: fields["cf-turnstile-response"], remoteip: ip }),
    });
    const verified = await verification.json() as { success?: boolean; hostname?: string; action?: string };
    if (!verification.ok || verified.success !== true || verified.hostname !== url.hostname || verified.action !== "rfq") throw new Rejected(400, "The security check expired or failed. Please try it again.");
    // Check the challenge before hashing or inspecting large attachments.
    const files = await validateFiles(form, fields.formKind);
    const contactFields = Object.fromEntries(Object.keys(initialContactRFQFields).map((key) => [key, fields[key] ?? ""])) as typeof initialContactRFQFields;
    contactFields.productType = product;
    const validation = validateContactRFQ(contactFields, {
      drawing: fields.formKind === "contact" ? files.find((entry) => entry.field === "drawing")?.file ?? null : null,
      referenceImage: files.find((entry) => entry.field === "referenceImage")?.file ?? null,
    });
    if (Object.keys(validation).length) throw new Rejected(400, Object.values(validation)[0]!);
    delete fields["cf-turnstile-response"];
    delete fields.requestId;
    const hash = await sha256(JSON.stringify({ fields, files: files.map(({ field, file, hash }) => ({ field, name: file.name, size: file.size, hash })) }));
    const existing = await env.INQUIRY_DB.prepare("SELECT id, request_hash FROM inquiries WHERE id = ?").bind(id).first<StoredInquiry>();
    if (existing) {
      if (existing.request_hash !== hash) throw new Rejected(409, "The inquiry changed. Edit a field before submitting again.");
      return received(id);
    }
    const now = Date.now();
    const hour = Math.floor(now / 3600000);
    const day = Math.floor(now / 86400000);
    // Bound mailbox and attachment consumption as well as per-visitor abuse.
    if (!await allowRate(env, ip, `ip:${hour}`, 10, (hour + 1) * 3600000) ||
        !await allowRate(env, fields.email.toLowerCase(), `email:${hour}`, 5, (hour + 1) * 3600000) ||
        !await allowRate(env, "site", `site:${day}`, 50, (day + 1) * 86400000)) throw new Rejected(429, "The submission limit has been reached. Please email cindy@hingetra.com or try later.");
    await env.INQUIRY_DB.prepare("DELETE FROM inquiry_limits WHERE expires_at < ?").bind(now).run();
    const attempt = crypto.randomUUID();
    const attachments: Attachment[] = files.map(({ field, file, hash }) => ({ field, name: file.name, size: file.size, sha256: hash, key: `${id}/${attempt}/${field}.${file.name.split(".").at(-1)!.toLowerCase()}` }));
    const keys = attachments.map((file) => file.key);
    try {
      for (let i = 0; i < files.length; i++) await env.INQUIRY_FILES.put(attachments[i].key, files[i].file.stream(), { httpMetadata: { contentType: "application/octet-stream" } });
    } catch {
      // The database has not been written yet, so these objects cannot be referenced.
      if (keys.length) await env.INQUIRY_FILES.delete(keys).catch(() => console.error("rfq_upload_cleanup_failed", id));
      return unavailable();
    }
    // An ambiguous database error must NOT delete uploads: the insert may have committed.
    const inserted = await env.INQUIRY_DB.prepare(`INSERT INTO inquiries
      (id, created_at, name, company, email, country, product, source_path, fields_json, attachments_json, request_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING RETURNING id`)
      .bind(id, new Date(now).toISOString(), fields.name, fields.company, fields.email, fields.country, product,
        fields.sourcePath, JSON.stringify(fields), JSON.stringify(attachments), hash).first();
    if (!inserted) {
      const winner = await env.INQUIRY_DB.prepare("SELECT id, request_hash FROM inquiries WHERE id = ?").bind(id).first<StoredInquiry>();
      if (keys.length) await env.INQUIRY_FILES.delete(keys).catch(() => console.error("rfq_duplicate_cleanup_failed", id));
      if (winner?.request_hash !== hash) throw new Rejected(409, "The inquiry changed. Edit a field before submitting again.");
      return received(id);
    }
    waitUntil(notify(env, id, fields, attachments, fetcher));
    return received(id); // Means durably saved, never a promise of inbox delivery.
  } catch (error) {
    if (error instanceof Rejected) return json({ error: error.message }, error.status);
    console.error("rfq_processing_failed"); // Do not log submitted content, files or secret-bearing errors.
    return unavailable();
  }
}
