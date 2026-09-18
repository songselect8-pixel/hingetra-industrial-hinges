import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const dataPath = resolve("src/data/custom-hinges.ts");
const pagePath = resolve("src/app/custom-hinges/page.tsx");
const contentPath = resolve("src/components/custom-hinges/CustomHingesPageContent.tsx");
const rfqPath = resolve("src/components/custom-hinges/CustomRFQSection.tsx");
const cssPath = resolve("src/app/custom-hinges/custom-hinges.css");
const lockPath = resolve("docs/custom-hinges-page-lock.json");
const sha256 = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

test("Custom Hinges publishes only families with explicit catalog customization support", async () => {
  assert.ok(existsSync(dataPath), "custom-hinges data layer must exist");
  const { customProductIds, customProductSourcePages } = await import("../src/data/custom-hinges.ts");
  assert.deepEqual(customProductIds, ["round", "pin", "gasket", "grease-nipple", "adjustable", "square", "flag"]);
  assert.deepEqual(customProductSourcePages, {
    round: [8],
    pin: [9],
    gasket: [10],
    "grease-nipple": [11],
    adjustable: [12],
    square: [13],
    flag: [14, 15],
  });

  const { getProduct } = await import("../src/data/products.ts");
  for (const id of customProductIds) assert.deepEqual(getProduct(id)?.customization?.sourcePages, customProductSourcePages[id]);
  for (const id of ["bearing", "20-type", "12-14-16-type"]) assert.equal(getProduct(id)?.customization, null);

  const sourceManifest = JSON.parse(readFileSync(resolve("docs/research/product-family-source-manifest.json"), "utf8"));
  const manifestPages = Object.fromEntries(sourceManifest.families.map((family: { id: string; productSpecificCustomizationPages: number[] }) => [family.id, family.productSpecificCustomizationPages]));
  for (const id of customProductIds) assert.deepEqual(manifestPages[id], customProductSourcePages[id]);
  for (const id of ["bearing", "20-type", "12-14-16-type"]) assert.deepEqual(manifestPages[id], []);
});

test("Custom Hinges route implements the approved SEO, content, and custom RFQ contract", () => {
  for (const path of [pagePath, contentPath, rfqPath, cssPath]) assert.ok(existsSync(path), `${path} must exist`);
  const page = readFileSync(pagePath, "utf8");
  const content = readFileSync(contentPath, "utf8");
  const rfq = readFileSync(rfqPath, "utf8");
  const data = readFileSync(dataPath, "utf8");
  const combined = `${page}\n${content}\n${rfq}\n${data}`;

  assert.match(page, /Custom Weld-On Hinges \| Made to Drawing/);
  assert.match(page, /alternates:\s*\{\s*canonical:\s*"\/custom-hinges"\s*\}/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /<Header currentPage="custom-hinges"/);
  assert.match(page, /<Footer currentPage="custom-hinges"/);
  assert.equal((combined.match(/<h1\b/g) ?? []).length, 1);

  for (const heading of [
    "Custom Weld-On Hinges",
    "When Standard Sizes Are Not Enough",
    "Start With What You Have",
    "Key Dimensions to Share",
    "From Requirement to Production",
    "Standard Product or Custom?",
    "Product Families With Customization Support",
    "Manufacturing Behind the Requirement",
    "Dimensional Checks During Production",
    "Help Us Understand Your Requirement",
    "Custom Hinge FAQ",
    "Send Us Your Hinge Requirement",
  ]) assert.ok(combined.includes(heading), heading);

  assert.match(rfq, /allowDrawing:\s*true/);
  assert.match(rfq, /productLabel:\s*"Reference product \/ hinge type"/);
  assert.match(rfq, /customRequirementLabel:\s*"Technical requirements"/);
  assert.match(rfq, /uploadLabel:\s*"Drawing or reference image"/);
  assert.match(rfq, /messageLabel:\s*"Message"/);
  assert.match(rfq, /submitLabel:\s*"Submit Custom Requirement"/);
  assert.match(data, /Requirement \/ Specification Confirmation/);
});

test("Custom Hinges uses only approved real and supporting visual assets", () => {
  const illustrationDataPath = resolve("src/data/illustrations.ts");
  const pageAssets = [contentPath, dataPath].filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");
  const illustrationAssets = readFileSync(illustrationDataPath, "utf8");
  const existing = `${pageAssets}\n${illustrationAssets}`;
  for (const asset of [
    "/images/illustrations/custom-engineering-cn.png",
    "/images/drawing-20-type.png",
    "/images/illustrations/hingetra-factory-exterior.png",
    "/images/illustrations/manufacturing-capability-cn.png",
    "/images/illustrations/quality-control-cn.png",
  ]) assert.ok(existing.includes(asset) || existing.includes(asset.split("/").at(-1)!.split(".")[0]), asset);
  assert.match(pageAssets, /ProductCard/);
  assert.match(pageAssets, /asset="engineering"/);
  assert.match(pageAssets, /asset="manufacturing"/);
  assert.match(pageAssets, /asset="quality"/);
  assert.match(pageAssets, /AI-generated illustration/);
  assert.doesNotMatch(pageAssets, /factory-exterior\.jpg|data-asset-kind="company-photo"|Actual company photo/i);
  assert.doesNotMatch(pageAssets, /application-control-cabinet|application-trailer-gate|placeholder/i);
});

test("Custom Hinges public copy stays within documented custom-manufacturing boundaries", () => {
  const existing = [dataPath, pagePath, contentPath, rfqPath].filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");
  for (const prohibited of [
    /\bCNC\b/i,
    /custom material/i,
    /custom coating/i,
    /load capacity/i,
    /tolerance (?:of|within|capability)/i,
    /\bsample\b/i,
    /\bprototype\b/i,
    /\blead[ -]?time\b/i,
    /\btimeline\b/i,
    /\bturnaround\b/i,
    /\bMOQ\b/i,
    /tooling fee/i,
    /production capacity/i,
    /engineering team size/i,
    /R&D staff/i,
    /our technician/i,
    /our engineer/i,
    /certified/i,
  ]) assert.doesNotMatch(existing, prohibited);
});

test("Custom Hinges navigation and RFQ extensions preserve locked defaults", () => {
  const header = readFileSync(resolve("src/components/navigation/Header.tsx"), "utf8");
  const footer = readFileSync(resolve("src/components/navigation/Footer.tsx"), "utf8");
  const form = readFileSync(resolve("src/components/inquiry/RFQForm.tsx"), "utf8");
  const site = readFileSync(resolve("src/data/site.ts"), "utf8");

  assert.match(header, /"home" \| "products" \| "applications" \| "custom-hinges" \| "manufacturing" \| "quality"/);
  assert.match(footer, /"home" \| "products" \| "applications" \| "custom-hinges" \| "manufacturing" \| "quality"/);
  assert.match(site, /\{ label: "Custom Hinges", href: "\/custom-hinges" \}/);
  assert.match(form, /customRequirementLabel = "Custom requirement"/);
  assert.match(form, /uploadLabel = "Drawing upload"/);
  assert.match(form, /submitLabel = "Submit RFQ"/);
  assert.match(form, /productLabel = "Product type"/);
  assert.match(form, /messageLabel \?\?/);
});

test("Custom Hinges lock remains intact while legacy route aliases stay absent", () => {
  for (const route of ["about"]) {
    assert.equal(existsSync(resolve("src/app", route, "page.tsx")), false, `${route} must remain unbuilt`);
  }
});

test("Custom Hinges approved lock matches its page files and source catalog", () => {
  assert.ok(existsSync(lockPath), "custom-hinges lock must exist after approval");
  const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
    status: string;
    route: string;
    sourceCatalog: string;
    sourceCatalogSha256: string;
    files: { path: string; sha256: string }[];
  };

  assert.equal(lock.status, "LOCKED");
  assert.equal(lock.route, "/custom-hinges");
  assert.equal(sha256(resolve(lock.sourceCatalog)), lock.sourceCatalogSha256);
  for (const file of lock.files) assert.equal(sha256(resolve(file.path)), file.sha256, file.path);
});
