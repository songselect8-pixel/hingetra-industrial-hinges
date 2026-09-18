# Resources publishing guide

Resources use typed structured content. No CMS or MDX runtime is required. The registry lives in `src/content/resources/`, while React components only render the typed blocks.

Brand update, 2026-09-18: the user confirmed **HINGETRA** / **Hingetra Industrial Hinges** as the public identity. Use `resourcePublisher` from `publishing.ts`, which reads the shared business name from `src/data/site.ts`; do not hardcode another publisher or invent a legal entity or author credentials. Article structured data uses the same supplied English logo as the website. Original catalog identity and technical provenance remain unchanged.

## Add a guide

1. Create one file in `src/content/resources/articles/` that exports a `ResourceArticle`.
2. Use a short stable slug. The public URL becomes `/resources/[slug]`; do not include dates in the slug.
3. Add the article import and registry entry in `src/content/resources/index.ts`.
4. Select one category from `categories.ts`. A category appears on `/resources` only after it has at least one public article.
5. Map `relatedProducts`, `relatedApplications` and `relatedArticles` explicitly. Do not infer relationships from keywords or visual similarity.
6. Reuse verified images in `public/images/`. Set the correct width, height, ALT text and evidence type. Supporting illustrations must keep neutral captions.
7. Build content from typed blocks: heading, paragraph, list, callout, image, product table or comparison table. H2/H3 blocks automatically generate the table of contents.

## Draft and noindex behavior

- `draft: true` excludes a guide from the index, category lists, related guides, static routes, RSS and sitemap.
- `noindex: true` uses the same public-list exclusion. It is reserved for material that must not be published as a discoverable route.
- A public guide requires both `draft: false` and `noindex: false`.
- The whole website still has a separate pre-launch global noindex/robots gate. Remove that gate only during the controlled production launch described in `docs/pre-launch-checklist.md`.
- The default-off `SEARCH_INDEXING_ENABLED` setting controls the global gate. The sitemap now includes published main/product pages as well as public guides; preparing this inventory does not authorize indexing.

## Source and copy rules

- Copy technical values from the audited product data. Keep family, model, symbols, decimal precision, compound notation, unit and source page together.
- Never infer a missing dimension, unit, material, performance value, certification, commercial term or production figure.
- Treat published product weight as the mass of the listed entry, not as an application-selection value.
- Product photographs, drawings and data must belong to the same family. Do not select images by appearance alone.
- Link to applications and products only through explicit, source-supported mappings.

## Publication check

Run:

```text
npm test
npm run typecheck
npm run build
```

Then verify the guide at 1440, 1024, 768 and 390px. Check one H1, canonical metadata, `BlogPosting` and breadcrumb structured data, table-of-contents anchors, technical-table scrolling, image captions, related links and the RFQ destination. Confirm the guide appears in `/resources`, `/sitemap.xml` and `/feed.xml` only when public.

For a static deployment, also run `npm run verify:static` and `npm run verify:seo` with the same `SITE_URL`, `PAGES_BASE_PATH` and search-policy environment as the build. These check unique metadata, shared publisher/site IDs, canonical URLs, sitemap/RSS coverage and fragment destinations. Use `/contact#contact-rfq` for the Contact form; `/contact#rfq` is not defined. Do not change publication dates to simulate freshness.
