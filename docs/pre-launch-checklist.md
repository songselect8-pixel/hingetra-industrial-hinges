# Pre-Launch Checklist

This preview is not ready for public production traffic until every blocking item below is complete.

## Hosted preview

- GitHub Pages preview: `https://songselect8-pixel.github.io/yipinxiang-industrial-hinges/`
- Keep this deployment under the existing global `noindex` and robots gate until the production blockers are complete.
- A push to `main` must pass the GitHub Pages build and static route/link verification before it is published.
- The hosted preview does not change the RFQ delivery blocker below.

## RFQ delivery — blocking

**CRITICAL BEFORE PRODUCTION:**  
Connect the RFQ form to a real server-side delivery system and perform a real submission test to the configured inquiry recipient.

- Keep the current **“Request checked, not sent.”** behavior until that server-side system is configured and verified.
- Do not simulate a successful submission or silently discard an inquiry.
- Confirm that the receiving system processes every text field and the optional drawing and reference-image files.
- Repeat server-side file type and size validation; client-side checks are not a security boundary.
- Verify successful delivery, failure handling, recipient routing and operational monitoring with real test submissions.

## Domain and search visibility

- Set `SITE_URL` to the final HTTPS origin and verify every canonical URL and Open Graph URL.
- Keep the current global `noindex` preview policy until the production domain, content and inquiry delivery are ready.
- Before launch, intentionally enable indexing and recheck `robots.txt`, `sitemap.xml`, canonicals and structured data on the deployed origin.
- Confirm `/resources`, all published resource articles and `/feed.xml` use the final HTTPS origin.
- Verify that every intended public guide has `draft: false` and `noindex: false`; draft or noindex content must remain absent from the Resources index, related-guide modules and sitemap.
- Validate every article canonical, Open Graph payload, `BlogPosting` and `BreadcrumbList` on the deployed origin.
- Confirm the production sitemap contains `/resources` and exactly the six approved published article routes. It must contain no drafts, test records, `localhost` URLs or `127.0.0.1` URLs.

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

- Confirm the production company name, recipient, contact name, email and phone environment values.
- The approved HINGETRA factory exterior is an AI-generated concept, not photographic evidence. Keep that disclosure visible and confirm the relationship between the HINGETRA sign and the catalog company identity before production; do not infer a legal-entity or site-wide brand change from the image request.
- Keep unverified street addresses, maps, additional channels, timing promises and commercial claims unpublished.
- Confirm that the production recipient can receive the advertised PDF, DWG, DXF, JPG and PNG attachments within the configured limit.

## Final deployed regression

- Run the complete automated test suite, TypeScript check and production build from the release source.
- Recheck every public route at 1440, 1024, 768 and 390px on the deployed origin.
- Test navigation, product filters, technical-table overflow, drawing views, all RFQ validation states, file upload and direct contact links.
- Confirm there are no console errors, failed required assets, broken internal links or unexpected horizontal overflow.
