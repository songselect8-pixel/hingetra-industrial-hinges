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

## RFQ delivery endpoint

Set `NEXT_PUBLIC_RFQ_ENDPOINT` to an HTTPS endpoint that accepts `multipart/form-data`. Until this variable is present, a valid form displays **Request checked, not sent.** and preserves the buyer's entries and selected files in the current browser tab. No request is made.

The endpoint must accept the named text fields rendered by `ContactRFQForm.tsx` and the optional `drawing` and `referenceImage` files. The browser reports success only after an HTTP success response. Network errors and non-success responses preserve the form values and display an accessible delivery error.

Before connecting production delivery, implement server-side validation, file type and file size checks, secure storage or email delivery, abuse protection, logging appropriate to the deployment, and the site's final privacy handling. Client-side validation is a usability layer and must not be the only security boundary.

## File rules presented in the interface

- Technical drawing: PDF, DWG, DXF, JPG, JPEG or PNG, up to 10 MB.
- Reference image: JPG, JPEG or PNG, up to 10 MB.

If the receiving endpoint supports a narrower set, update `src/data/contact-rfq.ts` and the endpoint together so the interface never advertises an unsupported format.
