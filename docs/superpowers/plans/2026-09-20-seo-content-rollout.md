# HINGETRA SEO and Content Rollout Implementation Plan

> Execute in this task with the executing-plans workflow. The user approved the research and editorial brief with “全部开始吧” on 2026-09-20. No additional design approval or subagents are needed for this agreed scope.

**Goal:** Correct obsolete delivery copy, improve six existing articles, publish four evidence-supported guides, prepare the remaining eight topics, install the selected editorial skills, and complete the independently verifiable launch work.

**Architecture:** Keep the existing typed Resources registry, article template, static export, Cloudflare Pages Functions and catalog data. Use static deployment headers. Keep claims tied to the catalog or clearly attributed general guidance; unresolved business facts stay pending instead of being invented.

**Tech Stack:** Next 16.3.3, React, TypeScript, Cloudflare Pages, D1/R2, Resend. No new production dependencies.

## Approved scope and dependencies

- Existing research and editorial brief are the design specification. Old routes, verified tables, photograph provenance, navigation and page layouts remain the base.
- Owner confirmed 铰拓五金有限公司, indefinite retention, global English procurement audience, and Cindy receipt/attachments/direct replies. These factual dependencies are resolved.
- The owner authorized indexing and changed Cloudflare Production to true. Live indexing and the Google tag are verified; the owner confirmed Google ownership verification and sitemap submission. The owner also confirmed successful Bing import and sitemap presence.
- Do not send messages or fabricate inbox results. Do not install a full WordPress automation stack or publish topics with missing technical evidence.

## Work

- [x] Install `seo-audit`, `content-strategy`, `copy-editing`, `humanizer`; inspect local rules and create HINGETRA editorial context with verified facts and restrictions.
- [x] Correct the two shared/individual drawing FAQ strings in `src/data/product-details.ts`. Remove obsolete internal publishing explanations from the Resources index without redesigning it.
- [x] Rewrite all six files under `src/content/resources/articles/` according to R01–R06. Preserve original publish dates, set a real update date, reuse source tables and improve related links.
- [x] Add A01–A04 as four typed article files with verified existing images, clear practical checklists, scope boundaries, references and explicit product mappings. Register them in `src/content/resources/index.ts`.
- [x] Prepare A05–A12 as unpublished Markdown drafts outside the public registry; identify exactly what evidence each needs.
- [x] Add tested Pages security headers in `public/_headers`; keep API no-store/noindex and preview search exclusion. Verify static hydration, navigation, files and Turnstile compatibility.
- [x] Update the existing publication tests for ten articles and real update dates. Remove the obsolete four-minute minimum; retain meaningful source/metadata/link checks. Test draft exclusion through the existing publishing API.
- [x] Update affected lock hashes only for changed authorized files. Record this approval and publication scope. Refresh the outdated operational checklist and SEO manual with verified versus pending items.
- [x] Run `npm test`, `npm run typecheck`, static production build, `verify:static`, `verify:seo`, and Functions compilation if API code changes. Review articles and FAQ at 1440/1024/768/390px and inspect browser errors.
- [x] Commit and push verified content changes through the existing main deployment path. Check Cloudflare status and live routes/headers. Keep a clear handoff for account-owned or missing-information work.

## Publication checks

Expected public content: 29 sitemap routes, ten articles, no new public draft routes, unique metadata and valid internal links. No material grades, rated loads, timelines, testimonials or technical values are inferred. Private files and customer data stay outside Git.

## Execution evidence

97 tests passed, TypeScript passed, indexed static build passed; 32 HTML files, 29 content routes, ten articles and 1,053 fragments verified. Responsive checks: 13 routes at four widths, no H1/overflow/fragment/image failures. Expected local limitations and deployment evidence are recorded in docs/2026-09-20-content-release.md. Installed four skills; eight drafts remain unpublished. No email sent or new production dependency added.

Deployment: b4f89cb, 6bb2071 and a96cba3 passed GitHub build/deploy and Cloudflare Pages. Live 29-route, response-header, Google-tag and CSP compatibility checks passed. Production pages allow indexing, robots permits crawling and lists the sitemap, and pages.dev aliases retain noindex. Google account verification and sitemap submission were confirmed by the owner; Bing import and sitemap presence were also confirmed by the owner.

Retention: the owner supplied the enabled R2 Default Multipart Abort Rule (seven days), which affects incomplete multipart uploads, not completed files. No lifecycle change is required for that rule. Long-term backups and notification monitoring are documented operational follow-up, not implemented services in this content release.
