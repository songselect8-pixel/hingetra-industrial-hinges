import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const dataPath = resolve("src/data/applications.ts");
const pagePath = resolve("src/app/applications/page.tsx");
const contentPath = resolve("src/components/applications/ApplicationsPageContent.tsx");
const detailPath = resolve("src/components/applications/ApplicationDetailSection.tsx");
const cssPath = resolve("src/app/applications/applications.css");

test("Applications data keeps catalog page 4 and page 6 mappings separate", async () => {
  assert.ok(existsSync(dataPath), "source-backed Applications data module must exist");
  const { applicationGroups } = await import("../src/data/applications.ts");
  const cabinets = applicationGroups.find((group: { id: string }) => group.id === "electrical-control-cabinets");
  const heavyDuty = applicationGroups.find((group: { id: string }) => group.id === "gates-trailers-ramps");
  const steelDoors = applicationGroups.find((group: { id: string }) => group.id === "industrial-steel-doors");

  assert.deepEqual(cabinets?.productIds, ["bearing", "pin", "gasket", "grease-nipple", "20-type"]);
  assert.equal(cabinets?.sourcePage, 4);
  assert.deepEqual(cabinets?.supportedTerms, ["Switch cabinets", "Control cabinets", "Network cabinets", "GGD cabinets", "AE cabinets"]);
  assert.deepEqual(steelDoors?.productIds, cabinets?.productIds);
  assert.equal(steelDoors?.sourcePage, 4);
  assert.equal(steelDoors?.detailMedia.image, "/images/hinge-pin.jpg");
  assert.deepEqual(heavyDuty?.productIds, ["12-14-16-type"]);
  assert.equal(heavyDuty?.sourcePage, 6);
  assert.deepEqual(heavyDuty?.supportedTerms, ["Trailer doors", "Gates", "Ramps"]);
});

test("Applications overview uses two labeled illustrations and real product references", async () => {
  assert.ok(existsSync(dataPath), "source-backed Applications data module must exist");
  const { applicationOverview } = await import("../src/data/applications.ts");
  assert.equal(applicationOverview.length, 4);
  assert.deepEqual(applicationOverview.map((item: { id: string }) => item.id), [
    "electrical-control-cabinets",
    "gates-trailers-ramps",
    "industrial-steel-doors",
    "industrial-cabinets-enclosures",
  ]);
  assert.deepEqual(applicationOverview.filter((item: { mediaKind: string }) => item.mediaKind === "illustration").map((item: { image: string }) => item.image), [
    "/images/illustrations/application-control-cabinet.png",
    "/images/illustrations/application-trailer-gate-catalog.png",
  ]);
  assert.ok(applicationOverview.filter((item: { mediaKind: string }) => item.mediaKind === "product-reference").every((item: { image: string }) => item.image.startsWith("/images/hinge-")));
  for (const item of applicationOverview) {
    assert.ok(existsSync(resolve("public", item.image.slice(1))), item.image);
    assert.ok(item.alt.toLowerCase().includes(item.mediaKind === "illustration" ? "illustration" : "hinge"));
  }
});

test("Applications route implements the approved SEO, content, and RFQ contract", () => {
  for (const path of [pagePath, contentPath, cssPath]) assert.ok(existsSync(path), `${path} must exist`);
  const page = readFileSync(pagePath, "utf8");
  const content = readFileSync(contentPath, "utf8");
  const detail = readFileSync(detailPath, "utf8");
  const data = readFileSync(dataPath, "utf8");
  const combined = `${page}\n${content}\n${detail}\n${data}`;

  assert.match(page, /Weld-On Hinge Applications \| Industrial Doors, Gates & Cabinets/);
  assert.match(page, /alternates:\s*\{\s*canonical:\s*"\/applications"\s*\}/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /<Header currentPage="applications"/);
  assert.match(page, /<Footer currentPage="applications"/);
  assert.match(page, /allowDrawing:\s*true/);
  assert.match(page, /productLabel:\s*"Preferred hinge type"/);
  assert.match(page, /submitLabel:\s*"Request a Recommendation"/);

  assert.equal((combined.match(/<h1\b/g) ?? []).length, 1);
  assert.match(combined, /Weld-On Hinges for Industrial Applications/);
  assert.match(content, /What Should You Tell Us\?/);
  for (const label of ["Application", "Hinge type or reference image", "Required dimensions", "Door / cabinet structure", "Estimated quantity", "Technical drawing if available"]) assert.ok(combined.includes(label), label);
  assert.match(content, /Not Sure Which Hinge Fits Your Application\?/);
  assert.match(content, /Explore Hinges by Application/);
  assert.match(content, /Start with your application, review relevant hinge families, or send us your dimensions for selection support\./);
  assert.doesNotMatch(content, /Follow the catalog relationship\./);
  assert.match(combined, /Relevant hinge families/);
  assert.match(combined, /Explore available hinge types/);
  assert.match(content, /productHref/);
  assert.match(content, /applicationGroups/);
});

test("Applications keeps the final RFQ dominant over the compact selection banner", () => {
  const page = readFileSync(pagePath, "utf8");
  const css = readFileSync(cssPath, "utf8");
  assert.match(page, /<RFQSection/);
  assert.match(css, /\.application-help-cta\s*\{[\s\S]*?background:\s*var\(--paper\)/);
  assert.doesNotMatch(css, /\.application-help-cta\s*\{[\s\S]*?background:\s*var\(--navy\)/);
  assert.match(css, /\.application-help-cta\s*\{[\s\S]*?padding-block:\s*48px/);
});

test("Applications public copy avoids unsupported technical and authenticity claims", () => {
  const existing = [dataPath, pagePath, contentPath, detailPath].filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");
  for (const prohibited of [
    /load capacity/i,
    /fire rating/i,
    /security rating/i,
    /enclosure rating/i,
    /IP\d{2}/,
    /certification standard/i,
    /our customer installation/i,
    /our technician/i,
    /view matching catalog range/i,
  ]) assert.doesNotMatch(existing, prohibited);
});

test("shared route extensions keep existing defaults while supporting Applications", () => {
  const header = readFileSync(resolve("src/components/navigation/Header.tsx"), "utf8");
  const footer = readFileSync(resolve("src/components/navigation/Footer.tsx"), "utf8");
  const form = readFileSync(resolve("src/components/inquiry/RFQForm.tsx"), "utf8");
  const site = readFileSync(resolve("src/data/site.ts"), "utf8");
  assert.match(header, /"home" \| "products" \| "applications"/);
  assert.match(footer, /"home" \| "products" \| "applications"/);
  assert.match(site, /\{ label: "Applications", href: "\/applications" \}/);
  assert.match(form, /submitLabel = "Submit RFQ"/);
  assert.match(form, /productLabel = "Product type"/);
});

test("the local image optimizer avoids the AVIF encoder path that stalls Chromium", () => {
  const config = readFileSync(resolve("next.config.ts"), "utf8");
  assert.match(config, /formats:\s*\["image\/webp"\]/);
  assert.doesNotMatch(config, /image\/avif/);
});
