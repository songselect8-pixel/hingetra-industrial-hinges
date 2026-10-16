import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const dataPath = resolve("src/data/quality.ts");
const pagePath = resolve("src/app/quality/page.tsx");
const contentPath = resolve("src/components/quality/QualityPageContent.tsx");
const technicalPath = resolve("src/components/quality/QualityTechnicalEvidence.tsx");
const productsPath = resolve("src/components/quality/QualityProductExamples.tsx");
const preparationPath = resolve("src/components/quality/QualityPreparation.tsx");
const rfqPath = resolve("src/components/quality/QualityRFQSection.tsx");
const cssPath = resolve("src/app/quality/quality.css");
const lockPath = resolve("docs/quality-page-lock.json");

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

test("Quality data derives exact representative references from the audited catalog families", async () => {
  assert.ok(existsSync(dataPath), "quality data layer must exist");
  const data = await import("../src/data/quality.ts");

  assert.deepEqual(data.qualityApproach.map((item: { title: string }) => item.title), [
    "Dimensional Checking",
    "Specification Verification",
    "In-Process Inspection",
    "Production Consistency",
    "Packaging Preparation",
  ]);
  assert.ok(data.inProcessChecks.every((item: { sourcePages: readonly number[] }) => item.sourcePages.includes(18)));
  assert.deepEqual(data.consistencyAreas.map((item: { title: string; sourcePages: readonly number[] }) => [item.title, item.sourcePages]), [
    ["Standardized Turnover", [3]],
    ["Mass Assembly", [3]],
    ["In-Process Checking", [18]],
    ["Standardized Packaging", [3, 16, 17]],
  ]);

  type Example = (typeof data.qualityProductExamples)[number];
  const examples = Object.fromEntries(data.qualityProductExamples.map((item: Example) => [item.productId, item])) as Record<string, Example>;
  assert.deepEqual(Object.keys(examples), ["bearing", "20-type", "adjustable"]);
  assert.equal(examples.bearing.sourcePage, 7);
  assert.equal(examples.bearing.image, "/images/hinge-bearing.jpg");
  assert.equal(examples.bearing.drawing?.src, "/images/drawing-bearing-reference.png");
  assert.deepEqual(examples.bearing.reference.values, ["ф16*100mm", "142"]);
  assert.equal(examples["20-type"].sourcePage, 5);
  assert.equal(examples["20-type"].image, "/images/drawing-20-type.png");
  assert.deepEqual(examples["20-type"].reference.values, ["20-A", "20.00", "24.80", "140", "10.85", "60", "20.00", "7"]);
  assert.equal(examples.adjustable.sourcePage, 12);
  assert.equal(examples.adjustable.image, "/images/hinge-adjustable.jpg");
  assert.equal(examples.adjustable.drawing, null);
  assert.deepEqual(examples.adjustable.reference.values, ["Φ20x25x140mm", "354"]);

  assert.deepEqual(data.qualityPackaging.map((item: { id: string; sourcePage: number; image: string }) => ({ id: item.id, page: item.sourcePage, image: item.image })), [
    { id: "20-type", page: 16, image: "/images/packaging-20-type.jpg" },
    { id: "12-14-16-type", page: 17, image: "/images/packaging-12-14-16-type.jpg" },
  ]);
});

test("Quality route implements the approved structure, SEO, and RFQ contract", () => {
  for (const path of [pagePath, contentPath, technicalPath, productsPath, preparationPath, rfqPath, cssPath]) {
    assert.ok(existsSync(path), `${path} must exist`);
  }
  const page = readFileSync(pagePath, "utf8");
  const content = readFileSync(contentPath, "utf8");
  const technical = readFileSync(technicalPath, "utf8");
  const products = readFileSync(productsPath, "utf8");
  const preparation = readFileSync(preparationPath, "utf8");
  const rfq = readFileSync(rfqPath, "utf8");
  const combined = `${page}\n${content}\n${technical}\n${products}\n${preparation}\n${rfq}`;

  assert.match(page, /Industrial Hinge Quality Control \| In-Process Inspection/);
  assert.match(page, /alternates:\s*\{\s*canonical:\s*"\/quality"\s*\}/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /<Header currentPage="quality"/);
  assert.match(page, /<Footer currentPage="quality"/);
  assert.equal((combined.match(/<h1\b/g) ?? []).length, 1);

  for (const heading of [
    "Quality Checks Throughout Production",
    "Checks Are Part of the Process",
    "Dimensional Checks Against Requirements",
    "Specifications Provide the Reference",
    "Checks During Production",
    "Consistency Across Production",
    "Different Hinges. Different Details to Check.",
    "Custom Requirements Start With Confirmed Dimensions",
    "Practical Review Points",
    "Prepared for the Next Step",
    "Standard Product or Custom Requirement?",
    "Quality Control FAQ",
    "Have Specific Hinge Requirements?",
  ]) assert.ok(combined.includes(heading), heading);

  assert.match(rfq, /allowDrawing:\s*true/);
  assert.match(rfq, /contextLabel:\s*"Quality page"/);
  assert.match(rfq, /uploadLabel:\s*"Drawing or reference image"/);
  assert.match(rfq, /submitLabel:\s*"Send Your Requirement"/);
  assert.match(rfq, /href="\/custom-hinges\/"/);
});

test("Quality imagery separates one supporting inspection illustration from source evidence", () => {
  const existing = [contentPath, technicalPath, productsPath, preparationPath].filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");
  const supportingVisual = readFileSync(resolve("src/components/ui/SupportingVisual.tsx"), "utf8");
  const sourceRegistries = [dataPath, resolve("src/data/catalog.ts"), resolve("src/data/products.ts"), resolve("src/data/manufacturing.ts")]
    .map((path) => readFileSync(path, "utf8")).join("\n");

  assert.equal((existing.match(/asset="quality"/g) ?? []).length, 1, "use one strong inspection illustration");
  assert.match(supportingVisual, />Illustrative scene</);
  for (const asset of [
    "/images/hinge-bearing.jpg",
    "/images/drawing-bearing-reference.png",
    "/images/drawing-20-type.png",
    "/images/hinge-adjustable.jpg",
    "/images/packaging-20-type.jpg",
    "/images/packaging-12-14-16-type.jpg",
  ]) assert.ok(existing.includes(asset) || sourceRegistries.includes(asset), asset);
  assert.doesNotMatch(existing, /data-asset-kind="company-photo"/);
  assert.doesNotMatch(existing, /our (?:quality laboratory|engineer|inspector|measuring equipment)/i);
});

test("Quality public copy omits unsupported certification, testing, and numerical QC claims", () => {
  const existing = [dataPath, pagePath, contentPath, technicalPath, productsPath, preparationPath, rfqPath]
    .filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");

  for (const prohibited of [
    /\bISO(?:\s*9001)?\b/i,
    /\bIATF\b/i,
    /\bCE\b/,
    /\bUL\b/,
    /\bRoHS\b/i,
    /\bREACH\b/,
    /\bAQL\b/i,
    /100% inspection/i,
    /\bCMM\b/i,
    /salt spray/i,
    /hardness test/i,
    /tensile test/i,
    /load test/i,
    /fatigue test/i,
    /inspection (?:frequency|percentage)/i,
    /tolerance (?:capability|guarantee|within|of)/i,
    /defect rate/i,
    /pass rate/i,
    /laboratory (?:accreditation|capability)/i,
    /testing (?:tool|equipment|capabilit|laborator)/i,
    /statistical process control/i,
    /\bSPC\b/,
  ]) assert.doesNotMatch(existing, prohibited);
});

test("surface condition is framed only as a practical visual review", async () => {
  const data = await import("../src/data/quality.ts");
  const surfaceCondition = data.practicalReviewPoints.find(
    (item: { title: string }) => item.title === "Visible Surface Condition",
  );

  assert.ok(surfaceCondition);
  assert.equal(
    surfaceCondition.description,
    "Use practical visual review to note visible differences for requirement discussion.",
  );
  assert.doesNotMatch(surfaceCondition.description, /acceptance|pass|reject|standard|tolerance/i);
});

test("Quality navigation extension preserves locked defaults and legacy aliases stay absent", () => {
  const header = readFileSync(resolve("src/components/navigation/Header.tsx"), "utf8");
  const footer = readFileSync(resolve("src/components/navigation/Footer.tsx"), "utf8");
  const site = readFileSync(resolve("src/data/site.ts"), "utf8");

  assert.match(header, /"home" \| "products" \| "applications" \| "custom-hinges" \| "manufacturing" \| "quality"/);
  assert.match(footer, /"home" \| "products" \| "applications" \| "custom-hinges" \| "manufacturing" \| "quality"/);
  assert.match(site, /\{ label: "Quality", href: "\/quality\/" \}/);
  assert.match(header, /currentPage === "quality"/);
  assert.match(footer, /#quality-top/);
  for (const route of ["about"]) {
    assert.equal(existsSync(resolve("src/app", route, "page.tsx")), false, `${route} must remain unbuilt`);
  }
});

test("Quality approved lock matches its page files and source catalog", () => {
  assert.ok(existsSync(lockPath), "quality lock must exist after approval");
  const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
    status: string;
    route: string;
    sourceCatalog: string;
    sourceCatalogSha256: string;
    files: { path: string; sha256: string }[];
  };

  assert.equal(lock.status, "LOCKED");
  assert.equal(lock.route, "/quality");
  assert.equal(sha256(resolve(lock.sourceCatalog)), lock.sourceCatalogSha256);
  for (const file of lock.files) assert.equal(sha256(resolve(file.path)), file.sha256, file.path);
});
