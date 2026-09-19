# Pre-Launch Checklist

This preview is not ready for public production traffic until every blocking item below is complete.

## Hosted preview

- GitHub Pages preview: `https://songselect8-pixel.github.io/hingetra-industrial-hinges/`
- Keep this deployment under the existing global `noindex` and robots gate until the production blockers are complete.
- A push to `main` must pass the GitHub Pages build, static route/link verification and `npm run verify:seo` before it is published.
- The hosted preview does not change the RFQ delivery blocker below.

## RFQ delivery — blocking

**CRITICAL BEFORE PRODUCTION:**  
Connect the RFQ form to a real server-side delivery system and perform a real submission test to the configured inquiry recipient.

- **2026-09-19 progress, not completion:** user authorized delivery and inquiry storage. The two RFQ components now support a gated Pages Function with D1 records, private R2 attachments, Turnstile and Resend notifications. Follow `docs/inquiry-storage-setup.md`; cloud resources/secrets, production activation, owner privacy/retention review and actual submission/inbox tests remain outstanding. An API saved receipt is not inbox-delivery proof.

- Keep the current **“Request checked, not sent.”** behavior until that server-side system is configured and verified.
- Do not simulate a successful submission or silently discard an inquiry.
- Confirm that the receiving system processes every text field and the optional drawing and reference-image files.
- Repeat server-side file type and size validation; client-side checks are not a security boundary.
- Verify successful delivery, failure handling, recipient routing and operational monitoring with real test submissions.

## Domain and search visibility

- Set `SITE_URL` to the final HTTPS origin and verify every canonical URL and Open Graph URL.
- Keep the current global `noindex` preview policy until the production domain, content and inquiry delivery are ready.
- Before launch, intentionally set `SEARCH_INDEXING_ENABLED=true` only after all blockers are resolved, rebuild, and recheck `robots.txt`, `sitemap.xml`, canonicals and structured data on the deployed origin. The unset/default state remains false.
- GitHub Actions reads the same repository variable and the actual Pages `base_url` for `SITE_URL`. Optional `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` values must come from the owner's accounts; empty configuration does not connect an account.
- Verify robots at the host root. A project-subdirectory `/hingetra-industrial-hinges/robots.txt` does not control the entire host. Page-level noindex is retained; neither noindex nor robots makes a public preview private.
- Confirm `/resources`, all published resource articles and `/feed.xml` use the final HTTPS origin.
- Verify that every intended public guide has `draft: false` and `noindex: false`; draft or noindex content must remain absent from the Resources index, related-guide modules and sitemap.
- Validate every article canonical, Open Graph payload, `BlogPosting` and `BreadcrumbList` on the deployed origin.
- Confirm the production sitemap contains all 25 currently published content routes: nine main pages, ten product details and six approved articles. It must contain no drafts, error pages, test records, `localhost` URLs or `127.0.0.1` URLs. Use actual article modification dates; do not mark unchanged pages as updated on every build.
- Verify the Organization / WebSite IDs, article publisher, canonical, breadcrumb, RSS and sitemap URLs agree on the final origin and trailing-slash convention.
- After readiness and ownership verification, submit the final sitemap through Search Console / Bing Webmaster Tools. Review search access separately from optional AI-training access; do not promise indexing or AI citations.

## Resources publishing and navigation

- Keep the initial release limited to the six approved seed guides recorded in `docs/resources-system-lock.json`.
- Verify every Resources card and “Read Guide” action opens its registered `/resources/[slug]` page, with no placeholder or date-based routes.
- Check the Resources navigation entry at 1440, 1024, 768 and 390px after any future header-label or navigation change.
- Follow `docs/resources-publishing-guide.md` for future articles. Add content through the typed registry, reuse verified product data and map related products, applications and guides explicitly.
- Keep `draft: true` or `noindex: true` guides out of public listings, static parameters, RSS and sitemap until they complete source, editorial and SEO review.
- For every future publication, rerun tests, TypeScript, the production build, route/link checks, metadata and structured-data validation, TOC checks, table overflow checks and the four-width reading audit.

## Inquiry privacy and security

- Publish the final privacy information appropriate to the deployed inquiry workflow before collecting personal or technical files.
- Add server-side input validation, abuse protection, secure transport, file handling and retention rules to the delivery implementation.
- Confirm that endpoint logs and error messages do not expose submitted drawings, contact details or infrastructure secrets.
- Configure and verify deployment security headers, including a Content Security Policy, MIME sniffing protection, framing restrictions, Referrer Policy and Permissions Policy. Enable HSTS only on the final HTTPS deployment.

## Business and configuration review

- **Contact delivery verification:** the user supplied `cindy@hingetra.com`, WhatsApp `+86 15584143652` and its QR image on 2026-09-19. These replace the floating placeholders (`isPlaceholder=false`); the Contact-page email shares the same default. Verify actual email delivery and the WhatsApp destination before promotion; user-supplied contact details alone do not prove delivery. The catalog voice-phone number remains unchanged. The SEO deployment check still rejects indexed builds that retain demo contacts.

- Confirm the production company name, recipient, contact name, email and phone environment values.
- The user explicitly confirmed HINGETRA / Hingetra Industrial Hinges as the public website brand on 2026-09-18. The supplied logo's English-only adaptation is used across the site. Confirm the registered legal entity before production; a brand change does not change the original catalog identity or verify a new legal company name.
- The approved HINGETRA factory exterior remains an AI-generated concept, not photographic evidence. Keep its disclosure visible.
- `hingetra.com` and `www.hingetra.com` are connected to the Cloudflare Pages project with SSL (user confirmed on 2026-09-19). Keep canonical origin `https://hingetra.com`; the separate GitHub Pages preview URL is unchanged. Successful domain setup alone does not resolve inquiry and publication blockers.
- Keep unverified street addresses, maps, additional channels, timing promises and commercial claims unpublished.
- Confirm that the production recipient can receive the advertised PDF, DWG, DXF, JPG and PNG attachments within the configured limit.
- Follow `docs/seo-geo-operations.md` for source-backed content, search measurement and qualified-RFQ operations. Do not count local validation as a delivered inquiry or add tracking before privacy/measurement setup is confirmed.

## Final deployed regression

- Run the complete automated test suite, TypeScript check and production build from the release source.
- Recheck every public route at 1440, 1024, 768 and 390px on the deployed origin.
- Test navigation, product filters, technical-table overflow, drawing views, all RFQ validation states, file upload and direct contact links.
- Confirm there are no console errors, failed required assets, broken internal links or unexpected horizontal overflow.
