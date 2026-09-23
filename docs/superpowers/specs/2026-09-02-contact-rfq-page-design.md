# Contact / RFQ Page Design

Status: user-approved implementation brief received on 2026-09-02.

## Goal

Build `/contact` as the website's primary technical inquiry page. It must present the catalog-confirmed company contact details and collect enough information for a useful industrial hinge discussion without pretending that an unconfigured backend has submitted an RFQ.

## Locked visual contract

The route reuses the approved header, footer, IBM Plex Sans hierarchy, navy / white / steel-gray / orange palette, square buttons and fields, eyebrow labels, fine dividers, technical card language, page gutters and compact dark navy closing CTA. All new CSS is scoped under `.contact-page`. No locked page component is redesigned.

## Information architecture

1. Compact breadcrumb and hero with an RFQ-input technical panel rather than a decorative image.
2. Catalog-confirmed company contact block with clickable email and phone links.
3. Main RFQ section with grouped contact, product, technical and file fields.
4. Compact selection-help banner.
5. Buyer information checklist.
6. Standard-product and custom-requirement paths.
7. Application entry points using existing approved application routes.
8. Conservative submission expectation.
9. Product-safe inquiry FAQ.
10. Compact dark navy final CTA.

## Source and data boundaries

Catalog page 19 supports Eric Huang, Pinghu Yipinxiang Machinery Technology Co., Ltd., `hjhuman0205@gmail.com` and `+86 18767359360`. These values live in `src/data/contact.ts` with optional environment overrides so they can be updated without editing UI components. The route publishes no street address, map, business hours, WhatsApp number, branch, office or response-time promise.

**Change record — 2026-09-23:** The owner authorized replacing the public website contact set with Cindy, `cindy@hingetra.com`, and `+86 15584143652` (phone href `+8615584143652`). The catalog p19 contact values above remain historical source evidence; they are no longer used as the website's public contact values.

Product options are derived from `families` in `src/data/catalog.ts`, followed by Other / Custom Requirement and Not Sure. Application entry points reuse the existing Applications route and its approved anchors; they do not recommend a definitive hinge family.

## Form architecture

`ContactRFQForm` is a dedicated client component so the locked shared `RFQForm` keeps its approved behavior. A pure `contact-rfq.ts` module owns field types, initial values, email and useful-requirement validation, file extensions and file-size rules.

Required identity fields are Name, Company, Business Email and Country / Region. The form also requires at least one useful requirement input from product type, reference product, required dimensions, application, technical requirements, reference description, message or an accepted file. Quantity alone is not enough.

Technical drawings accept PDF, DWG, DXF, JPG, JPEG and PNG. Reference images accept JPG, JPEG and PNG. Each file is limited to 10 MB. Both controls remain native keyboard-accessible file inputs.

The Server Component passes `NEXT_PUBLIC_RFQ_ENDPOINT` into the form as the only delivery configuration point. With no endpoint, valid input produces an explicit "checked, not sent" state and preserves all entries. With an endpoint, the client posts `FormData`; network or non-2xx failures show an accessible error and preserve every value and selected file. The form never reports success without a successful endpoint response.

## Accessibility and responsive behavior

Every control has a visible label. Fieldsets and legends identify groups. Required fields use native `required` plus visible text. Inline errors connect through `aria-describedby`; the summary receives focus after submission. Focus outlines remain visible, file controls use keyboard-native interaction, and status/error messages use appropriate live roles.

The form uses two columns on large screens and one column at 768px and 390px. Contact details, file controls, radio choices, FAQ and footer must remain readable without horizontal overflow.

## SEO and non-goals

The route has one H1, a unique title and description, canonical `/contact`, breadcrumb markup and descriptive labels. The preview site's global noindex policy remains unchanged. This phase does not create an address, map, privacy-policy page, backend, email service, pricing, MOQ, lead-time, sample-time, payment, load-calculation or response-time promise.

