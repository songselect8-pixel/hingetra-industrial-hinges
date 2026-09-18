# HINGETRA English website branding — 2026-09-18

## User authorization and boundaries

The user requested replacing the website's English identity with their own brand and adding the supplied logo, rearranged for the website with its Chinese wording removed.

- Public brand: **HINGETRA**
- Public business display name: **Hingetra Industrial Hinges**
- Logo wording: **HINGETRA** / **INDUSTRIAL HINGES**
- Proposed domain from the user's naming reference: `hingetra.com`. It has **not** been connected, registered, or substituted for the hosted preview URL.
- The original catalog identifies **Pinghu Yipinxiang Machinery Technology Co., Ltd.** This branding request does not verify a change of registered legal entity. Keep the original PDF, source photographs, technical drawings, dimensions and catalog provenance intact.
- Contact person, email, phone, RFQ validation and the honest unconfigured delivery state are unchanged. Confirm the production legal identity and inquiry recipient before launch.
- Remove Chinese from the website logo only. Do not alter the existing factory illustration's signage or original source drawings as part of this task.
- Scope is brand presentation, logo-specific sizing, favicon, metadata and publisher identity; previously approved page layouts remain locked.

## Inputs and delivery

Mode: built-in `image_gen` edits of the supplied raster logo. No CLI image API was used.

Supplied logo: `C:/Users/XuWanPi/Downloads/ChatGPT Image 2026年9月18日 20_48_44.png`

Naming reference: `C:/Users/XuWanPi/AppData/Local/Temp/codex-clipboard-dfa41ad8-705e-4916-aa58-751937cc7a83.png`

Final project assets:
- `public/images/brand/hingetra-logo.png`: 960 × 155, transparent English horizontal lockup.
- `public/images/brand/hingetra-mark.png`: 512 × 512, transparent emblem.
- `src/app/icon.png`: 128 × 128, browser icon derived from the emblem.

The original supplied file is unchanged. Full generated outputs are retained in `output/branding/`. Delivery processing trims transparent canvas padding and downsizes/compresses the approved image content with Sharp; the existing responsive-image pipeline supplies lightweight WebP variants.

## Initial English-only adaptation

```text
Use case: precise-object-edit.
Asset type: English-only horizontal website logo lockup, with a genuinely transparent background.
Edit target: the supplied HINGETRA raster logo. This is a layout adaptation of the user's existing brand, not a new logo design.
Primary request: Remove the Chinese characters 铰拓 and the two horizontal divider lines completely. Recompose the existing emblem and English text into a compact horizontal lockup suitable for a white industrial website header.
Composition: Existing navy and brushed-silver hinge emblem on the LEFT. Existing HINGETRA custom uppercase wordmark on the RIGHT, with small clean uppercase INDUSTRIAL HINGES directly beneath it. The combined two text lines should vertically balance with the emblem. Keep a clear modest gap between emblem and wordmark. Use a wide layout approximately 4:1 with tight but sufficient transparent padding; do not float the logo in a huge empty canvas.
Text verbatim: "HINGETRA" and "INDUSTRIAL HINGES". No other text.
Invariants: Preserve the recognizable original hinge emblem silhouette and metallic navy/silver appearance. Preserve the original angular HINGETRA letterforms, exact spelling, dark navy color, and the orange insert in the final A. Keep the INDUSTRIAL HINGES subtitle crisp, steel-gray, readable rather than distressed. The result must remain the same brand.
Background: Actual transparent alpha, not black, not a white rectangle, no checkered texture baked into pixels.
Avoid: Chinese characters, divider rules, any new icon, invented slogan, scene, mockup, shadow outside the emblem, extra ornament, or changes to the wordmark spelling.
```

## Final small-header layout refinement

```text
Use case: precise-object-edit.
Edit target: this existing English-only HINGETRA horizontal logo.
Make ONLY a website-small-size layout refinement; keep the emblem and HINGETRA wordmark design, navy/silver palette and orange A insert unchanged.
The existing emblem is too tall and the subtitle too small when shown in a 200px-wide navigation header.
Reduce the left emblem to exactly the visual height of the TWO text rows combined. Its top aligns with the top of HINGETRA and its bottom aligns with the bottom of INDUSTRIAL HINGES. The emblem must NOT extend far above or below the combined text block.
Keep HINGETRA prominent. Enlarge the subtitle INDUSTRIAL HINGES to approximately 40 percent of the HINGETRA letter height; use restrained tracking and a solid readable steel-gray sans-serif. Align subtitle left with HINGETRA and keep it entirely underneath. Moderate 1/5-emblem-width horizontal gap between emblem and text.
The occupied logo content should be a compact WIDE horizontal lockup around 5.5 to 6:1, not a stacked logo. Crop the transparent canvas close to the lockup, if possible.
Text exactly "HINGETRA" and "INDUSTRIAL HINGES". No Chinese, no other text or lines.
Preserve genuine transparent alpha, no baked white/black background. Do not redesign the emblem or HINGETRA lettering.
```

## Browser emblem

```text
Use case: background-extraction.
Asset type: favicon / website brand emblem.
Edit target: supplied original HINGETRA logo.
Extract ONLY the existing hinge emblem at the top. Remove every word, letter, Chinese character, horizontal rule and subtitle completely.
Preserve the exact recognizable hinge emblem silhouette, navy left plate, brushed silver right plate, central cylindrical silver hinge barrel, cutouts, metallic shading, original proportions and colors. Do not redesign or stylize it differently.
Center this single emblem in a square transparent canvas with a small, even transparent safe margin (about 5 percent). Genuine transparent alpha. No black or white rectangular background. No added text, symbol, outline, decorations or drop shadow. This will be downsampled for a browser tab; keep the source form clean and intact.
```

