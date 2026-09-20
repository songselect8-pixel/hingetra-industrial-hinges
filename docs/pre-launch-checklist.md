# HINGETRA launch and operations checklist

Updated 2026-09-20. This replaces the earlier preview-only checklist. A local test, successful build or API receipt is not evidence of inbox delivery or search indexing.

## Confirmed business and inquiry facts

**CRITICAL BEFORE PRODUCTION:** Connect the RFQ form to a real server-side delivery system and perform a real submission test to the configured inquiry recipient. This requirement is retained; the owner-confirmed results below record its current status rather than treating an API response as delivery evidence.

- [x] Public brand: HINGETRA / Hingetra Industrial Hinges. The owner confirmed the operating legal entity **铰拓五金有限公司** on 2026-09-20. No English registered-name translation or street address is invented.
- [x] Audience: worldwide English-speaking procurement customers, with no country restriction specified.
- [x] Production domain: `https://hingetra.com`; www and HTTP redirect to the HTTPS root domain.
- [x] Real server delivery: Cloudflare Pages Function, D1, private R2, Turnstile and Resend are active. Public and fixed notification recipient: `cindy@hingetra.com`.
- [x] The owner confirmed Cindy receives the revised notification and attachments and can reply directly to the customer. This is owner-confirmed acceptance, not an independently inspected mail-header audit.
- [x] Retention decision: keep inquiry records and uploaded files indefinitely without automatic expiry. The form names the legal entity, use, processors, email copies and access/correction/deletion contact.
- [ ] Keep the R2 bucket private and confirm no object-expiration rule is configured. The application does not expire inquiry records or drawings. Account settings need account access to verify.
- [ ] Assign a person to review D1 `pending` / `failed` notifications and mailbox bounces. See `docs/inquiry-storage-setup.md` for queries. There is no automatic retry or monitoring service in this release.
- [ ] Production large-file and recovery checks remain operational follow-up unless separately evidenced. Existing automated tests cover both form schemas, two 10 MiB files and byte preservation; do not describe those as real remote delivery tests.

## Content release

- [x] Correct obsolete drawing/upload FAQ text shared by all ten product details.
- [x] Rewrite six approved guides, preserving original publication dates, routes and product data; record the actual update date.
- [x] Add four guides on product names, bearing/pin/washer comparison, grease-fitting access, and alignment/removal clearance.
- [x] Keep eight further topics in `docs/content-drafts/` outside the public registry. Missing evidence is listed per draft.
- [x] The intended sitemap contains **29 content routes: nine main pages, ten product details and ten articles**. No draft, error or test routes belong in it.
- [x] Preserve the locked templates, factual tables, original drawing values, explicit related-content mapping and illustration disclosures.

## Search activation

The owner authorized execution of the research plan and confirmed the business/recipient facts on 2026-09-20. Enabling production search is authorized; it still requires an actual environment change and deployment verification.

1. In Cloudflare **Workers & Pages → hingetra-industrial-hinges → Settings → Variables and Secrets → Production**, set the existing text variable `SEARCH_INDEXING_ENABLED` to `true`.
2. Keep `STATIC_EXPORT=true`, `SITE_URL=https://hingetra.com`, the existing public RFQ variables, bindings and secrets. Do not expose or copy secret values.
3. Redeploy the latest verified `main` commit. Public variables are fixed at build time.
4. Verify root `robots.txt` allows crawling and declares the production sitemap. Inspect rendered page meta for `index,follow` and absence of a conflicting production `X-Robots-Tag`.
5. Verify all 29 canonical URLs, title/description uniqueness, one H1 per page, JSON-LD, RSS and sitemap URLs.
6. Keep Cloudflare branch-preview environment indexing false. `public/_headers` also sends `noindex,nofollow` on production/deployment `pages.dev` aliases. Keep the separate GitHub Pages repository indexing variable false or unset.
7. Verify domain ownership in the owner's Google Search Console and Bing Webmaster Tools and submit `https://hingetra.com/sitemap.xml`. Use genuine account-issued verification values; do not invent tokens. Missing meta tags do not prove DNS verification is absent.

Production indexing was verified after deployment `6bb2071`: all 29 content pages return `index, follow`; robots permits crawling and lists the canonical sitemap; pages.dev aliases retain noindex. The owner supplied a Google HTML verification tag, now configured for the production domain in root metadata, with an optional environment override. Account verification and sitemap submission remain pending. Wrangler is unauthenticated and the user's browser tabs are inaccessible from this machine. Record subsequent account status in `docs/2026-09-20-content-release.md`.

## Deployment headers and regression

- Static Pages responses use `public/_headers`: CSP, nosniff, framing restriction, Referrer-Policy and Permissions-Policy; production-only short HSTS without includeSubDomains/preload.
- CSP allows Next's static inline scripts/styles, Cloudflare Turnstile, and the existing Cloudflare Web Analytics script/collection endpoints observed on production. It is a compatibility baseline, not a claim of full XSS prevention. API response headers remain owned by the existing Function.
- Validate with `npm test`, `npm run typecheck`, static production build, `verify:static` and `verify:seo` using identical build/check environment.
- Check updated pages at 1440, 1024, 768 and 390px, including title wrapping, tables, TOC targets, images and contact links.
- Check the actual deployment headers and Turnstile resource loading after release. A production key on localhost can reject the hostname; do not label that as a successful challenge test.
- Do not replace actual mail or browser verification with a green deployment status.

## Ongoing work

Use actual search queries and qualified inquiries to choose the next article. Collect owner-approved product photographs, annotated drawings, material/finish records and technical review before publishing claims beyond the current catalog. No fabricated credentials, ratings, availability, delivery promises or customer cases.

Retention is a storage policy, not a backup guarantee. Keep access limited, review provider billing/storage usage, and handle deletion requests across D1, R2, mailbox copies and applicable backups. Never publish inquiry data or customer drawings in the website repository.
