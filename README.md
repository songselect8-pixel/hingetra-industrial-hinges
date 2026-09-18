# HINGETRA industrial hinge website

An English B2B manufacturer website built with Next.js, TypeScript and Tailwind CSS. The homepage, Products center and Bearing Type product-detail template are approved and locked. The approved master route is `/products/bearing-weld-on-hinges`; all nine remaining catalog-family detail routes now reuse that template.

**Homepage, Products and product-detail design systems: LOCKED.** Reuse the components, styles and rules documented in [docs/design-system.md](docs/design-system.md) for inner pages. The product-detail baseline and section order are recorded in [docs/product-detail-template-lock.json](docs/product-detail-template-lock.json).

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000 for the homepage, http://127.0.0.1:3000/products for the Products center, or any product card’s View Details route. For the optimized production preview:

```sh
npm run build
npm run start
```

The server binds to the local computer only. No deployment or external service is required. Built and verified with Node.js 24.16.0; catalog tests use its native TypeScript stripping support.

## Verification

```sh
npm test
npm run typecheck
npm run build
```

The catalog tests compare all 60 public technical records against the independently prepared source audit, including raw decimals, unconfirmed units, square-hinge notation and the two flag-hinge designs. They also check image references and prevent private contact or invented commercial data from entering the public catalog layer.

Products tests additionally cover same-variant size/structure filtering, documented application scope, exact Unicode size strings, null fields, future route preparation and source-preserving RFQ links. Products browser evidence is recorded in `output/qa/products-center/`, including regression checks against the locked homepage.

Product-detail tests verify the 18 bearing size/weight pairs, unchanged original drawing pixels, source-specific packaging boundaries, fixed-family inquiry selection, optional drawing-file validation and the approved section order. Batch tests cover all 10 canonical routes, unique metadata, family-matched galleries, application/customization scope, Flag source groups and varied related links. The final source map checks all 10 families, 60 technical records, active image hashes, drawing scope, application scope and the two family-specific packaging records. Evidence is in `output/qa/product-template-integrity/` and `output/qa/product-detail-batch/`.

Browser review artifacts are in `output/qa/`. The homepage is checked at 1440, 1024, 768 and 390px, including open specification tables, keyboard navigation and inquiry validation. The supplied-image update has its own screenshots and verification in `output/qa/image-update/`.

## Where to edit

| Location | Purpose |
| --- | --- |
| `src/app/page.tsx` | Homepage composition |
| `src/app/products/page.tsx` | Products page composition, breadcrumb and page metadata |
| `src/app/products/[slug]/page.tsx` | Static generation, canonical metadata and breadcrumb data for the nine batch product routes |
| `src/app/products/products.css` | Products-only composition using the locked design tokens |
| `src/app/globals.css` | Design tokens and responsive styles |
| `src/components/sections/` | The ten homepage sections |
| `src/components/navigation/` | Header, product mega menu and footer |
| `src/components/products/` | Product cards, category links and technical tables |
| `src/components/products/detail/` | Reusable detail composition, real-photo gallery and original-image enlargement |
| `src/components/inquiry/` | RFQ form and shared product/size/application selection |
| `src/data/catalog.ts` | Product families, descriptions and image references |
| `src/data/catalog-variants.ts` | Exact source specification records |
| `src/data/products.ts` | Ten families, variants, source provenance, nullable product fields, published routes and related links |
| `src/data/product-details.ts` | Locked detail-template contract and source-scoped page content for all ten product families |
| `src/data/drawing-file.ts` | Local drawing selection limits and validation; no network upload |
| `src/data/product-filters.ts` | Supported facets and same-variant filter matching |
| `src/data/product-inquiry.ts` | Catalog-validated product and size selection for cross-page RFQ links |
| `src/data/catalog-overview.ts` | Representative records for the compact overview, without parsing or normalizing dimensions |
| `src/data/illustrations.ts` | Supplied supporting visuals, captions and explicit authenticity classification |
| `src/data/site.ts` | Configurable draft identity and unconfirmed contact fields |
| `src/components/ui/SupportingVisual.tsx` | Responsive illustration with a mandatory visible caption |
| `src/assets/fonts/` | Local IBM Plex Sans files and their license |
| `public/images/` | Original supplied or PDF-extracted product, factory, drawing and packaging images; supporting scenes are isolated in `illustrations/` |
| `docs/research/homepage-asset-manifest.json` | Image provenance |
| `docs/research/product-family-source-manifest.json` | Locked family-to-page/image/drawing/packaging source map |
| `docs/research/product-detail-publication-map.md` | Human-readable internal route-to-source mapping table |
| `docs/product-detail-template-lock.json` | Approved detail-template order and baseline hashes |

Keep catalog values as strings: symbols, decimal precision and compound dimension notation must not be normalized. The original transcription uses `TBD`; the Products data model maps unavailable values to null/empty fields. Neither is rendered as a fabricated claim.

`/products` groups the range into ten real families. Water-drop is a shared profile, not a duplicate category. The two flag designs and 20-A / 20-B remain variants. The finder uses family, exact catalog size/model, structure and documented application; it does not infer diameter or length from unlabelled compound sizes. Filter selections are retained in the URL.

**Every View Details action now opens its product-family detail route.** Existing `/products?view=` preview bookmarks remain supported. Quote and table-selection links retain the exact catalog family and record in the matching detail-page RFQ.

The bearing drawing is the original composite printed on PDF page 7, also used on page 5. It is visibly identified as a shared reference, not a separate dimensioned drawing for each size. Page 7 supplies all 18 unchanged size/weight entries. Bearing-specific packaging and customization remain null; the pilot invites requirements for review and explicitly labels the packaging photos as examples from the 20 Type and 12 / 14 / 16 Type series.

The final overview shows exact published size examples rather than an inferred continuous range. Numbered-series examples retain the “Unit not printed” caveat, and flag-hinge examples identify their separate catalog pages. The final refinement evidence is in `output/qa/final-refinement/`.

## Preview boundaries

- The RFQ form validates entries and carries selected products, exact sizes and applications into the form. It sends and persistently stores **nothing**. A valid preview explicitly says “Request prepared, not sent.” The pilot supports optional PDF/CAD/JPG/PNG file selection up to 10 MB, retained only in browser memory. Files are not read, uploaded or sent. No account, upload endpoint, mail provider or analytics service has been added.
- The catalog company name is a configurable draft identity. The header uses a simple text identifier. No confirmed logo file was supplied.
- Personal contact information, the full catalog PDF and certification images are not served publicly. The private source audit must remain outside `public/` and client imports.
- Product photographs, technical drawings and catalog packaging photographs remain the source evidence. On 2026-09-18 the user approved replacing every displayed factory exterior with the HINGETRA factory concept, explicitly labeled “AI-generated illustration”; it is not an actual company photograph. The original catalog exterior is retained unchanged as source material but is no longer referenced by any page or share image. Six additional industrial scenes illustrate manufacturing, inspection, engineering review, applications and packaging and remain labeled “Illustrative scene”. Illustrations are not evidence of company personnel, equipment, facilities or customer installations and never contribute product specifications.
- The six assets were supplied as 1448 × 1086 PNG files, despite the requested example filenames using JPG extensions. The originals are copied unchanged to `public/images/illustrations/`. Each uses its full 4:3 frame with `object-fit: contain` so hinge and packaging details remain visible across the reviewed widths. The image manifest records their source, hash and evidence classification.
- Preview indexing is disabled in metadata and `robots.txt`. The sitemap does not list unpublished pages. `SITE_URL` configures the canonical and Open Graph base URL; it does not enable indexing or publish unconfirmed identity information.
- Organization and Product structured data and live inquiry delivery remain deferred until the relevant identity, content and delivery configuration are approved. Every published page has one H1, semantic sections and descriptive image alternatives. The Products center and all product-detail pages have visible/structured breadcrumbs, unique metadata and canonical URLs.

Do not publish this preview or connect a live inquiry destination without confirming the public company identity, receiving business address and production requirements. The Bearing template remains the locked master for all generated product-family pages.
