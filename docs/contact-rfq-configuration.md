# Contact RFQ Configuration

The `/contact` page is implemented as a validated RFQ interface. It does not transmit inquiries until a real endpoint is configured.

## Contact values

The user-approved business display name and contact fallback values live in `src/data/contact.ts`. The email was updated by the user on 2026-09-19; the contact name and voice-phone number still follow catalog page 19. The business name defaults to the shared HINGETRA identity in `src/data/site.ts`; this is not a verified registered legal-entity change. They can be updated before deployment with these server environment variables:

| Variable | Current fallback |
| --- | --- |
| `CONTACT_COMPANY_NAME` | `Hingetra Industrial Hinges` (user-approved business display name) |
| `CONTACT_PERSON_NAME` | `Eric Huang` |
| `CONTACT_EMAIL` | `cindy@hingetra.com` (shared with the floating email link) |
| `CONTACT_PHONE_DISPLAY` | `+86 18767359360` |
| `CONTACT_PHONE_HREF` | `+8618767359360` |

Do not add a street address, map or another contact channel without verified source information.

The user separately supplied WhatsApp `+86 15584143652` and its QR image on 2026-09-19. Shared floating links use `src/data/quick-contact.ts`; `/contact/whatsapp-qr.png` is the unmodified supplied image. It is a WhatsApp contact, not a replacement for the catalog voice-phone number. If overriding `CONTACT_EMAIL`, keep it aligned with the floating mailbox. Direct email links open the visitor's mail client and do not enable RFQ delivery.

## Compact Contact form — 2026-09-19

The user requested a shorter Contact form so visitors can reach submission without reading a long technical questionnaire. The default view now contains name, email and one requirement message. Company and country are optional for **Contact** on both client and server; the shared catalog RFQ still requires them.

Native, initially collapsed sections retain drawing/image uploads, catalog-derived product selection and optional company/phone details. Their fields stay mounted and remain in the submitted multipart data when collapsed. Attachment errors open the upload section. The three former description boxes are presented as one `message` field; the endpoint continues accepting older field names for compatibility.

Name, a valid email and at least one useful requirement remain mandatory. A product detail or valid drawing/image may replace the message; quantity alone is insufficient. The endpoint stores missing optional values as empty strings in the existing D1 schema, so this change needs **no new migration, binding or environment variable**. File limits, anti-abuse checks, private storage, error input retention and honest unconfigured states remain unchanged. No other page or shared RFQ layout is redesigned.

Validation: 93 automated tests passed, including minimal Contact submissions with a message or drawing and unchanged catalog identity requirements. TypeScript, the production static build, 28-page link/asset checks and SEO checks passed. Exported HTML contains three primary fields, one textarea and three initially closed optional sections. No browser screenshot review or real email submission was performed for this change.

## RFQ delivery endpoint

Production delivery and storage were authorized by the user on 2026-09-19. Follow `docs/inquiry-storage-setup.md` for the Cloudflare D1 / private R2 / Turnstile / Resend setup and current verification status. On 2026-09-20 the owner confirmed Contact notification receipt in the temporary `sales@hingetra.com` test inbox and an uploaded PNG in private R2, then requested cleaner notifications with the original files attached.

Set `NEXT_PUBLIC_RFQ_ENDPOINT=/api/inquiries` and the public `NEXT_PUBLIC_TURNSTILE_SITE_KEY` only for the Cloudflare production build. Both are required; otherwise a valid Contact form still displays **Request checked, not sent.** and preserves the buyer's entries and selected files in the current browser tab. The shared catalog form retains **Request prepared, not sent.**. GitHub Pages remains an inert static preview.

The same-origin Pages Function accepts multipart fields and files from both forms. Server activation (`RFQ_ENABLED=true`), D1/R2 bindings, Turnstile and notification secrets are mandatory. The browser reports receipt only after a valid JSON saved-inquiry acknowledgment with its UUID. An HTTP 200 HTML fallback, generic success object, failed storage, expired challenge or non-success response cannot simulate success. Network errors preserve entries/files and the request ID for a safe retry; editing fields creates a new request.

Private R2 attachments are stored before the D1 record. A successful response means the inquiry was saved, not that an email reached the recipient. Notification to the fixed recipient (temporarily `sales@hingetra.com` for owner testing; public contact remains Cindy) runs separately with a recorded `pending`, `accepted` or `failed` state. Notifications contain a compact plain-text summary of populated buyer fields and copies of the validated original files as email attachments; R2 retains the private originals. The privacy disclosure covers these email copies. No public database or attachment-reading API is exposed. The first version requires the owner to review pending/failed notifications; it does not promise automatic retries, malware scanning or a CRM interface.

Before collecting live inquiries, finish the documented cloud setup, owner review of privacy/retention practices and real submission tests for both forms, including an attachment and actual receipt in Cindy's inbox. Server-side length, product, format/signature, file/request-size validation, fixed-recipient email, origin checks, Turnstile verification and abuse counters are implemented; these do not replace operational checks or final privacy review.

## File rules presented in the interface

- Technical drawing: PDF, DWG, DXF, JPG, JPEG or PNG, up to 10 MB.
- Reference image: JPG, JPEG or PNG, up to 10 MB.

If the receiving endpoint supports a narrower set, update `src/data/contact-rfq.ts` and the endpoint together so the interface never advertises an unsupported format.
