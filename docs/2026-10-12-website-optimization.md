# Website optimization — 2026-10-12

## Authorization and baseline

The owner supplied `hingetra_website_optimization_plan.md` and asked to apply it to the website. They confirmed that MOQ, samples, delivery timing, material grades and reports remain unconfirmed and must be discussed for the requirement. No public own-factory photographs, CAD files or test reports are available for this release.

Started from clean `8009179`, matching `origin/main` after fetch. Retained the other AI's contact update, brand/share images, FAQ markup and existing layouts. No inquiry delivery, storage, recipient or anti-abuse configuration changes.

## Implemented scope

| Plan item | Implementation |
| --- | --- |
| Search terminology | Updated homepage, product hub and seven relevant family metadata entries. Added restrained bullet/barrel and teardrop wording. Gate/trailer/ramp wording remains tied to the 12 / 14 / 16 catalog series. No universal load or suitability claims. |
| Organization | Retained the shared Organization and WebSite entities and real brand logo; added sales contact details from the same configuration used by Contact. No invented address or legal translation. |
| Product rich-result issue | Removed incomplete Product snippets from both family route implementations. There is no real public price or review to qualify them. Breadcrumbs and visible FAQs remain. A zero price means free, not request a quote; fabricated availability and ratings were not added. |
| FAQ | Preserved family FAQs. Resource FAQ extraction now requires a visible H3 question followed by its answer, preventing ordinary H3 sections from being labeled as questions. |
| ALT | Reviewed catalog/product ALT and retained existing specific descriptions and source-bound drawings. New guides reuse existing photographs with descriptive ALT; no new images or simulated material examples. Static QA checks ALT across the export. |
| Related guides | Explicitly prioritized three relevant, public guides per product family; no longer select the first three articles by publication order. Added contextual product and guide links within comparisons. |
| llms.txt | Updated the existing file rather than introducing another generated copy. Corrected unconfirmed carbon-steel claims and references to drawings on every family. Distinguished mass from load and general material education from product availability. Added current guides and contact details. |
| Comparison guides | Added weld-on versus bolt-on and carbon steel versus 304/316 guides. Expanded the existing bearing/pin/washer guide with ball-bearing versus brass-washer terminology and a requirement checklist, preserving its indexed URL. Two new articles and one substantial update; twelve published guides total. |
| Purchasing terms | Added a Contact FAQ and concise RFQ/Contact notes: quantity, sample availability/charges, timing, packing and marking require confirmation. Updated the obsolete Contact upload FAQ to describe the working form. |

`llms.txt` is an optional reading index, not a ranking requirement or a guarantee of AI citations. No Google ranking, rich-result or AI recommendation outcome is promised.

## Content evidence and boundaries

Sources read on 2026-10-12. Articles paraphrase the evidence and link it at the relevant point; they do not copy supplier marketing passages or transfer competitor specifications to HINGETRA.

| Primary source | Use and limit |
| --- | --- |
| [Google Product snippet documentation](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) | Required Product properties; price 0 is a free offer, not an RFQ placeholder. Removing unqualified markup does not remove the product page. |
| [Guden bullet hinge range](https://www.guden.com/catsearch/123/weld-on-bullet-hinges/1) | Overlapping bullet/barrel/cylinder trade names, not dimensional interchangeability. |
| [Guden weld-on selection guide](https://www.guden.com/selection-guides/weld-on-hinges) | Alignment, separation clearance and component-specific materials. Its product options and sample policy are not HINGETRA offers. |
| [OneMonroe weld-on overview](https://monroeengineering.com/blog/the-pros-and-cons-of-weld-on-hinges/) | Welded versus fastened attachment and heat during installation. No universal strength or security conclusion. |
| [JW Winco multiple-joint hinge technical notes](https://www.jwwinco.com/fileadmin/user_upload_jwwinco/downloads/Multiple-Joint_Hinges_2022_SR.pdf) | Example of manufacturer-specific load conditions. No numerical values transferred to this site's hinges. |
| [PINET weld-on range](https://www.pinet-industrie.com/en/products/24875-weld-on-hinges-and-others) | Distinct ball-bearing and brass-washer product descriptions. HINGETRA bearing construction and washer material remain unconfirmed. |
| [SKF lubrication and contamination](https://evolution.skf.com/wp-content/uploads/2013/02/EN_lubrication0.pdf) | General rolling-bearing principles. No comparative life, torque or sag claim for HINGETRA products. |
| [Outokumpu Core grades](https://www.outokumpu.com/en/products/product-ranges/core), [Supra grades](https://www.outokumpu.com/en/products/product-ranges/supra) | General 304/316 and low-carbon variant distinctions, not a HINGETRA material availability table. |
| [Outokumpu corrosion guidance](https://www.outokumpu.com/en/expertise/stainless-basics/corrosion-resistance), [welding guide](https://www.outokumpu.com/en/expertise/2021/welding-guide) | Exposure, weld surface condition and grade/procedure considerations. No guaranteed corrosion class, test duration or welding recipe. |

Product rows, units, weights, drawings, application mappings and the seven catalog-supported customization families remain unchanged. Comparison tables are procurement checklists and general material explanations, not test reports or engineering approval of an installation. Publication dates reflect this release, and the expanded bearing guide retains its original publication date with a new modification date.

## Deferred until evidence exists

- Actual factory/packing photography: retain all current illustration disclosures until authorized real photographs replace those images.
- CAD/catalog gated downloads: no public STEP/IGES/DWG library or owner-approved downloadable catalog package was supplied. Do not add a download button that cannot deliver its promised file.
- Material/inspection report blocks: no company-specific reports or confirmed family grades were supplied.
- Fixed MOQ, free samples, stock and delivery promises: use case-by-case quotation wording.
- Forum/backlink posting: no external accounts were contacted or posts published.

## Baseline lock handling

Ten pre-existing hash mismatches were recorded before editing. They came from the synchronized `8009179` baseline: root layout, product hub and product details/routes, Resources routes and sitemap. Only entries for files actually changed in this release are refreshed. Untouched Resources route and sitemap mismatches remain recorded as pre-existing; they are not silently rewritten. No locked layout CSS or technical-data files are changed.

## Validation

- All 99 automated tests passed. The initial metadata check caught shortened family names; those were restored in the SEO titles before the final run.
- TypeScript and the production static build passed with `STATIC_EXPORT=true`, `SITE_URL=https://hingetra.com` and `SEARCH_INDEXING_ENABLED=true`.
- Static verification: 34 HTML files; no broken local links/assets or development URLs.
- SEO verification: 31 public pages, 12 articles, 1,206 valid fragment links; canonical, robots, sitemap/RSS and visible product FAQ checks passed. All ten family pages omit Product snippets.
- Browser review under the production CSP: eight routes at 1440, 1024, 768 and 390 px, for 32 checks. No horizontal page overflow, missing images/ALT, failed local requests or JavaScript errors. Article TOC jumps and narrow-screen table scrolling work. Each checked product page has three related guides.
- Evidence: `output/playwright/optimization-browser-results.json` and `output/playwright/optimization-*.png` (local, ignored review artifacts). Selected desktop/mobile screenshots were visually reviewed.
- Image preparation also refreshed the generated responsive-image manifest for the previously added `hingetra-og.jpg`; no source image was changed.
- No inquiry emails were sent during QA. No live Cloudflare settings were modified.

After deployment, Search Console may continue to show previously crawled Product errors until Google fetches the changed pages. Use live URL inspection and request validation; do not add an invented price to clear the old report.
