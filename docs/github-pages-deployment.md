# GitHub Pages Preview Deployment

The website is deployed as a static Next.js export at:

`https://songselect8-pixel.github.io/hingetra-industrial-hinges/`

The repository and project-site path were renamed to `hingetra-industrial-hinges` on 2026-09-18 at the user's request. The previous `yipinxiang-industrial-hinges` path is historical, not the current site address. Share and bookmark the new URL; GitHub repository redirects do not redirect the old Pages website. The Git remote is `https://github.com/songselect8-pixel/hingetra-industrial-hinges.git`.

The deployment workflow is `.github/workflows/deploy-pages.yml`. A push to `main` runs the automated tests and TypeScript check, builds all static routes with the GitHub Pages base path, verifies internal links and required assets, and publishes the resulting `out` directory.

This hosting integration does not change the locked visual system. Internal navigation uses Next.js `Link` so the same components work locally at `/` and on GitHub Pages under `/hingetra-industrial-hinges/`. Static image delivery uses the original supplied files without an external image service.

The deployed site remains a pre-launch preview:

- Search indexing is disabled by the existing robots policy.
- The RFQ form continues to show **“Request checked, not sent.”**
- No SMTP or external email delivery service is configured.
- The production domain and real RFQ delivery must still complete `docs/pre-launch-checklist.md`.

For a local production-style Pages check:

```powershell
$env:STATIC_EXPORT='true'
$env:PAGES_BASE_PATH='/hingetra-industrial-hinges'
$env:SITE_URL='https://songselect8-pixel.github.io/hingetra-industrial-hinges'
npm run build
npm run verify:static
```
