# Homepage, Products and Product Detail design systems — LOCKED

Status: locked by the user's final homepage refinement instruction, 2026-08-31. The implemented homepage is the visual reference for all subsequent inner pages. This is a preservation and reuse contract, not a proposal to redesign the site.

User-approved asset update, 2026-09-18: every displayed catalog factory exterior and its share-image reference now uses the approved HINGETRA factory concept at `/images/illustrations/hingetra-factory-exterior.png`. Preserve the existing layouts; label this asset “AI-generated illustration”, never actual company evidence. This specific approval supersedes earlier instructions to display the catalog factory photograph. The original photograph remains unmodified in the source assets, and company facts still come from the catalog. The update does not authorize a site-wide company-name change.

User-requested process-scene update, 2026-09-18: the manufacturing, engineering-review and dimensional-inspection illustrations were regenerated with fictional Chinese personnel and ordinary Chinese hardware-workplace settings, using the original pin/bearing product photographs as appearance references. Reuse the `-cn.png` assets declared in `src/data/illustrations.ts` for all page, article and share-image placements. Keep the neutral “Illustrative scene” captions and explicit AI-generated ALT text; no depicted person or equipment is company evidence. The approved factory exterior, application/packaging scenes, layout, technical data and original product photographs/drawings remain unchanged. Prompt/provenance: `docs/research/2026-09-18-chinese-industrial-scenes-prompts.md`.

The user subsequently approved and locked the Products center before requesting a single Bearing Type pilot detail page. Preserve `src/app/products/page.tsx`, `src/app/products/products.css`, the finder layout, cards, filters and comparison styling. Updating a family link to an implemented detail route is an approved functional extension; it is not a visual redesign.

The user approved the Bearing Type detail page on 2026-09-01. It is now the locked master product-detail template. Its exact section order and baseline files are recorded in `docs/product-detail-template-lock.json`; the machine-readable family/image/page provenance map is `docs/research/product-family-source-manifest.json`. Reuse this template for every remaining family. Source-driven omissions or copy changes are allowed, but a second page structure or visual system is not.

The nine remaining product-family detail routes were generated from this master on 2026-09-01. They share the same dynamic route composition and only use source-driven differences: nullable drawings/applications/packaging, numbered-series model summaries, and two independently sourced Flag tables. The internal route/source table is `docs/research/product-detail-publication-map.md`. These additions do not establish a new visual system.

Before the Applications phase, the user explicitly re-locked the Homepage, Products center, product-detail template and product data structure. `docs/design-system-lock.json` records the current source hashes for those scopes. The user approved and locked `/applications` on 2026-09-01 after its final copy and conversion-hierarchy refinement. Its exact page files, source boundaries, section order and responsive evidence are recorded in `docs/applications-page-lock.json`. Route awareness in the existing header/footer and optional RFQ labels remain backward-compatible; the defaults used by every earlier locked page are unchanged.

The Applications page keeps “Explore Hinges by Application” as its application-to-product heading and uses neutral selection language throughout. Its earlier selection-support CTA is a compact light paper banner; the final RFQ remains the only dominant dark navy conversion section near the page end. Do not return the light banner to navy, add more generated application scenes, or turn the source relationships into definitive best-fit recommendations.

The user approved and locked `/custom-hinges` on 2026-09-01 after its final catalog and wording audit. Its exact page files, source-backed badge map, section order and preservation rules are recorded in `docs/custom-hinges-page-lock.json`. Route awareness in the existing header and footer and the optional custom-requirement, upload and message labels in `RFQForm` remain backward-compatible; all earlier locked defaults, field order and visual classes remain unchanged.

The Custom Hinges page displays “Customization Supported” only for Round, Pin, Gasket, Grease Nipple, Adjustable, Square and Flag families. Catalog pages 8–15 print “Supports product customization” for those families; Bearing, 20 Type and 12 / 14 / 16 Type remain excluded. Preserve the approved workflow language “Requirement / Specification Confirmation.” Do not add sample or prototype capability, sample or prototype timing, lead-time, timeline or turnaround claims unless a later verified source explicitly supports them.

The user approved and locked `/manufacturing` on 2026-09-02 after its final heading, illustration-caption and logistics-boundary audit. Its exact files, section order, source pages and preservation rules are recorded in `docs/manufacturing-page-lock.json`. Preserve “Manufacturing Capabilities from Processing to Assembly” as a capability-range heading; the blocks are not a claimed chronological production sequence. Company-specific copy remains limited to catalog pages 3, 16, 17 and 18. The actual factory exterior and catalog packaging photographs remain labeled as company evidence, while manufacturing, engineering and inspection scenes retain neutral captions and the visible “Illustrative scene” disclosure. Shared header, footer and navigation route awareness remains a backward-compatible functional extension.

The user approved and locked `/quality` on 2026-09-02 after its final factual review. Its exact files, section order, source-page boundaries and preservation rules are recorded in `docs/quality-page-lock.json`. Company-specific quality copy remains limited to catalog page 18’s production-stage testing-tool statement, page 3’s production-organization concepts, original technical references on pages 5, 7 and 12, and family-specific packaging on pages 16 and 17. The dimensional-inspection scene appears once with the neutral label “Dimensional inspection” and the visible “Illustrative scene” disclosure; original product images, drawings, values and packaging photographs provide the technical evidence. Keep surface-condition wording limited to practical visual review for requirement discussion. Do not add tolerance values, inspection percentages or frequencies, AQL levels, certifications, laboratory capabilities, named test methods or test results without new verified evidence.

The user approved and locked `/about-us` on 2026-09-02 after its final factual review. Its exact files, section order, source boundaries and preservation rules are recorded in `docs/about-us-page-lock.json`. Company-specific copy is limited to catalog pages 1, 3 and 18; application language remains scoped to pages 4 and 6; product cards reuse the audited family layer. The real catalog factory exterior is the primary company photograph. The manufacturing and application scenes retain neutral labels and the visible “Illustrative scene” disclosure. Keep logistics claims limited to the catalog-supported port proximity, highway transportation and shipment-handling statements. Do not add shipping-time, delivery-speed or export-volume claims without new verified evidence.

The user approved and locked `/contact` on 2026-09-02. Its exact files, section order and preservation rules are recorded in `docs/contact-page-lock.json`. The route adds only Contact current-page awareness and a real `/contact` destination to the shared navigation; its composition and CSS remain route-scoped. Preserve the current form, validation, file-upload UI, responsive layout, catalog-derived selector, confirmed contact details and configuration boundary. RFQ delivery remains deliberately unconfigured and must continue to state “Request checked, not sent.” until a real server-side system is connected and tested before production.

The Resources publishing system was added on 2026-09-02 as the final approved extension before development freeze. `/resources` and `/resources/[slug]` reuse this design system with a narrower editorial reading column, the existing technical-table treatment and the existing dark navy CTA language. The shared header and footer gained Resources route awareness; Products, Applications, Custom Hinges and Quality gained only the user-authorized contextual guide links. Product details gained one compact Related Guides section after Related Hinges. These additions are recorded in `docs/resources-system-lock.json`; they do not establish a separate visual system or unlock earlier page compositions.

On 2026-09-02, the desktop Products navigation entry received a user-requested functional repair: the visible “Products” label now links directly to `/products`, while the existing mouse-hover and keyboard-ArrowDown mega-menu discovery remains intact. This changes no locked header styling, spacing, typography, mobile behavior or mega-menu content.

Before pilot implementation, four-width Home/Products baselines and source hashes were captured in `output/qa/bearing-pilot/locked-pages-baseline.json` and `locked-source-hashes.json`. The pilot has its own composition stylesheet and reuses the shared components. The final template-integrity pass changed only data boundaries and provenance safeguards; it did not restyle the approved page.

## Established visual language

- Industrial navy `#0D2238`, steel gray `#5F6973`, paper `#F5F7F8`, white `#FFFFFF`, orange `#F59E0B`.
- Local IBM Plex Sans, using the existing weights, hierarchy, line heights and letter spacing. Do not introduce another typeface or a new type scale.
- Existing 1280px maximum `.shell`, responsive gutters and section spacing. Retain the breakpoints and behavior in `src/app/globals.css`.
- Square controls and image-led product cards, fine technical dividers, restrained orange highlights, white/gray sections and the established dark navy sections. No new gradients, shadows, rounded-card system, icon-heavy presentation or animation style.
- Real product photographs, factory evidence and original drawings take precedence over supporting industrial illustrations.

Do not restyle the approved homepage to accommodate an inner page. Compose inner pages from the existing components and classes. New page-specific composition can be added where required, but must follow these established tokens and hierarchy rather than creating a competing design system. Routing, accurate content, accessibility fixes and approved inquiry integration can be developed while preserving the visual contract.

## Reuse map

| Established element | Implementation to reuse |
| --- | --- |
| Header, mega menu, mobile navigation | `src/components/navigation/Header.tsx`; existing `.site-header`, `.desktop-nav`, `.mega-menu` and mobile-navigation styles |
| Buttons and text links | `.button`, `.button-primary`, `.button-outline`, `.text-link`; `src/components/ui/Arrow.tsx` |
| Section labels and headings | `src/components/ui/SectionHeading.tsx`, including `Eyebrow` and `SectionHeading` |
| Type, colors, gutters and spacing | Existing local fonts, CSS variables, `.shell`, `.section` and responsive rules in `src/app/globals.css` |
| Product cards and category grids | `src/components/products/ProductCard.tsx`; `.product-grid` and `.product-card` |
| Application cards | The two photographic cards and compact supporting text links in `src/components/sections/Applications.tsx` |
| Original product data | `src/data/catalog.ts` and `src/data/catalog-variants.ts` |
| Compact catalog examples | `src/data/catalog-overview.ts`, presented by `src/components/sections/TechnicalRange.tsx` |
| Readable technical tables | `src/components/products/TechnicalTable.tsx` and `.technical-table-wrap` |
| Dark navy custom and RFQ sections | `src/components/sections/CustomManufacturing.tsx` and `RFQSection.tsx`, with their existing classes, buttons and light labels |
| Inquiry fields and selection | `src/components/inquiry/RFQForm.tsx` and `InquiryProvider.tsx` |
| Captioned supporting visuals | `src/components/ui/SupportingVisual.tsx` and `src/data/illustrations.ts` |
| Footer | `src/components/navigation/Footer.tsx` and existing footer styles |
| Resource cards and article layout | `src/components/resources/ResourceCard.tsx`, `ResourceArticleTemplate.tsx`, `ResourceArticleBody.tsx` and route-scoped Resources CSS |

## Locked product-detail template

Keep this order: Breadcrumb, Product Hero, Quick Technical Summary, Product Overview, Available Sizes & Weights, Technical Drawing, Applications, Custom Requirements, Manufacturing & Quality, Packaging, Related Hinges, Related Guides, FAQ and RFQ. A section may be omitted only when the family source genuinely has no safe content for it. Related Guides is omitted only when no published guide is explicitly mapped to the family. Do not replace any section with invented data.

| Approved detail element | Implementation to reuse |
| --- | --- |
| Product hero and breadcrumb | `ProductDetailTemplate.tsx`, `.detail-hero`, `.product-breadcrumb` |
| Product gallery | `ProductGallery.tsx` and `ImageEnlarger.tsx` |
| Quick technical summary | `.detail-quick-summary` in the master template |
| Product overview | `.detail-overview` in the master template |
| Available sizes and weights | `TechnicalTable.tsx`; exact records from `catalog-variants.ts` |
| Technical drawing | `ImageEnlarger.tsx`; only the original drawing declared in the source manifest |
| Applications | `.detail-applications`; family- or series-scoped source copy only |
| Custom requirements | `.detail-custom`; company-level review invitation or family-specific source copy |
| Manufacturing and quality | `.detail-manufacturing`; keep the compact factory summary |
| Packaging | `.detail-packaging`; data-driven family scope and explicit boundaries |
| Related hinges | Existing `ProductCard.tsx` system |
| Related guides | `ProductRelatedGuides.tsx`; explicit mappings from the Resources data layer only |
| FAQ | `.detail-faq`; product-safe answers without unsupported commercial or technical facts |
| RFQ | Existing `RFQSection.tsx` and `RFQForm.tsx` |

The master template version is `1.0-locked`, declared in `src/data/product-details.ts`. Application headings and packaging boundaries are data fields so each family can remain accurate without changing the approved composition. A null drawing or null family packaging record is intentional and must not be filled from a visually similar product.

## Content and image boundaries

The approved HINGETRA factory concept remains captioned “AI-generated illustration” and must not be described as an actual company photograph or evidence of premises. The six process/application scenes remain visibly labeled “Illustrative scene”; some may be AI-generated. Do not relabel any illustration as company staff, workshops, equipment, laboratories or customer installations. Neutral process headings do not establish ownership of equipment visible in an illustration.

Catalog pages 3 and 18 support self-owned equipment/factory, lathe processing, automatic punching, mass assembly, standardized packaging, custom production and product checking tools. They do not establish particular CNC machines, inspection percentages, tolerances, laboratory capabilities, certification validity or test results.

Additional application links cover Steel Doors, Switch Cabinets and Network Cabinets from page 4. General industrial equipment remains an inquiry context unless further source material confirms product suitability. Keep the two approved application images; do not add artificial scenes to fill a grid.

The technical overview shows representative published records, not continuous or interpolated ranges. Preserve all raw size strings, glyphs, decimals and compound notation. Numbered-series tables have no printed unit; keep `TBD` internally and the visible “Unit not printed” note. Keep the two flag designs separate by source page. The expanded technical tables remain the full specification reference.

The two actual catalog packaging photographs remain first and retain their original dimensions and series-specific explanations. Only the supporting packaging illustration is capped at 600px wide / 450px high on large desktop screens. Its full 4:3 frame remains visible. The final pass reduces the local packaging lead-in to 32px and the supporting-row gap to 32px; it does not change global section spacing.

## Responsive and behavioral invariants

- Verify at 1440, 1024, 768 and 390px when adding inner pages or changing shared behavior.
- Preserve the existing mobile stacking order, including the approved factory concept before the process illustration.
- Keep all six supporting image frames visible. Do not crop away cabinet hinges, caliper/workpiece details, engineering drawings or packaging contents.
- Keep technical overflow inside the focusable table wrapper. Its `position: relative` contains the screen-reader labels; removing it can cause mobile page overflow.
- The mobile overview reserves sufficient width for complete raw dimensions. Do not truncate or shrink away technical values.
- Keep the RFQ field spacing, labels, validation, visible focus styles and footer readability. No registration is required.
- The homepage RFQ remains a local preview. The Contact RFQ also sends nothing by default; it can post multipart form data only after `NEXT_PUBLIC_RFQ_ENDPOINT` is configured, and it never reports success without a successful endpoint response.

Baseline source hashes and final screenshots are recorded under `output/qa/final-refinement/`. They support comparison; the implemented components and CSS remain the working source of truth. Do not treat earlier exploratory screenshots as a new design direction.
