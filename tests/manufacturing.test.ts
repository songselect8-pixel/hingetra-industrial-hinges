import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const dataPath = resolve("src/data/manufacturing.ts");
const pagePath = resolve("src/app/manufacturing/page.tsx");
const contentPath = resolve("src/components/manufacturing/ManufacturingPageContent.tsx");
const capabilitiesPath = resolve("src/components/manufacturing/ManufacturingCapabilities.tsx");
const evidencePath = resolve("src/components/manufacturing/ManufacturingEvidence.tsx");
const rfqPath = resolve("src/components/manufacturing/ManufacturingRFQSection.tsx");
const cssPath = resolve("src/app/manufacturing/manufacturing.css");
const illustrationsPath = resolve("src/data/illustrations.ts");
const supportingVisualPath = resolve("src/components/ui/SupportingVisual.tsx");
const lockPath = resolve("docs/manufacturing-page-lock.json");

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

test("Manufacturing data keeps every company capability tied to its catalog page", async () => {
  assert.ok(existsSync(dataPath), "manufacturing data layer must exist");
  const data = await import("../src/data/manufacturing.ts");

  assert.deepEqual(data.manufacturingCapabilities.map((item) => [item.title, item.sourcePages]), [
    ["Sufficient materials", [3]],
    ["Self-owned equipment", [3]],
    ["Standing stock", [3]],
    ["Lathe processing", [3]],
    ["Automatic punching", [3]],
    ["Standardized turnover", [3]],
    ["Mass assembly", [3]],
    ["Standardized packaging", [3]],
  ]);
  assert.deepEqual(data.manufacturingOrganization.map((item) => item.title), ["Standing Stock", "Standardized Turnover", "Mass Assembly"]);
  assert.ok(data.companyEvidence.every((item) => item.sourcePages.every((page) => page === 3 || page === 18)));
  assert.ok(data.inProcessQuality.every((item) => item.sourcePages.includes(18)));
  assert.ok(data.logisticsPoints.every((item) => item.sourcePages.includes(18)));

  assert.deepEqual(data.packagingRecords.map((item) => ({ id: item.id, page: item.sourcePage, image: item.image })), [
    { id: "20-type", page: 16, image: "/images/packaging-20-type.jpg" },
    { id: "12-14-16-type", page: 17, image: "/images/packaging-12-14-16-type.jpg" },
  ]);
});

test("Manufacturing route implements the approved structure, SEO, and RFQ contract", () => {
  for (const path of [pagePath, contentPath, capabilitiesPath, evidencePath, rfqPath, cssPath]) assert.ok(existsSync(path), `${path} must exist`);
  const page = readFileSync(pagePath, "utf8");
  const content = readFileSync(contentPath, "utf8");
  const capabilities = readFileSync(capabilitiesPath, "utf8");
  const evidence = readFileSync(evidencePath, "utf8");
  const rfq = readFileSync(rfqPath, "utf8");
  const combined = `${page}\n${content}\n${capabilities}\n${evidence}\n${rfq}`;

  assert.match(page, /Industrial Hinge Manufacturing \| Factory Capability/);
  assert.match(page, /alternates:\s*\{\s*canonical:\s*"\/manufacturing"\s*\}/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /<Header currentPage="manufacturing"/);
  assert.match(page, /<Footer currentPage="manufacturing"/);
  assert.equal((combined.match(/<h1\b/g) ?? []).length, 1);

  for (const heading of [
    "Manufacturing Behind Every Hinge",
    "Manufacturing Capabilities from Processing to Assembly",
    "Lathe Processing",
    "Automatic Punching",
    "Organized for Consistent Production",
    "Built Around Confirmed Requirements",
    "Checks During Production",
    "Catalog-Backed Manufacturing Capabilities",
    "Standardized Packaging for Shipment",
    "Positioned for Export Shipment",
    "Manufacturing Capability Summary",
    "Manufacturing FAQ",
    "Have a Hinge Requirement?",
  ]) assert.ok(combined.includes(heading), heading);
  assert.doesNotMatch(combined, /From Material to Finished Hinge/);

  assert.match(rfq, /allowDrawing:\s*true/);
  assert.match(rfq, /contextLabel:\s*"Manufacturing page"/);
  assert.match(rfq, /uploadLabel:\s*"Drawing or reference image"/);
  assert.match(rfq, /submitLabel:\s*"Request a Quote"/);
});

test("Manufacturing imagery discloses the approved factory concept and keeps catalog packaging evidence", () => {
  assert.ok(existsSync(contentPath), "manufacturing content must exist");
  const existing = [contentPath, capabilitiesPath, evidencePath].filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");
  const illustrationData = readFileSync(illustrationsPath, "utf8");
  const supportingVisual = readFileSync(supportingVisualPath, "utf8");
  assert.equal((existing.match(/src=\{illustrations\.factory\.src\}/g) ?? []).length, 2, "both factory placements must use the approved shared illustration");
  assert.equal((existing.match(/>AI-generated illustration<\/span>/g) ?? []).length, 2);
  assert.match(existing, /data-asset-kind="catalog-packaging"/);
  assert.doesNotMatch(existing, /factory-exterior\.jpg|data-asset-kind="company-photo"|Actual company photo/i);
  assert.match(existing, /asset="manufacturing"/);
  assert.match(existing, /asset="engineering"/);
  assert.match(existing, /asset="quality"/);
  assert.doesNotMatch(existing, /asset="packaging"/);
  assert.doesNotMatch(existing, /our (?:lathe|workshop|production line|technician|quality engineer)/i);
  assert.doesNotMatch(`${existing}\n${illustrationData}`, /Our (?:Workshop|Equipment|Lathe|Quality Inspector)/i);
  assert.match(illustrationData, /label: "Manufacturing process"/);
  assert.match(illustrationData, /label: "Dimensional inspection"/);
  assert.match(illustrationData, /label: "Drawing & specification review"/);
  assert.match(supportingVisual, />Illustrative scene</);
  assert.doesNotMatch(existing, /data-asset-kind="company-photo"[^>]*>\s*<SupportingVisual/i);
});

test("Manufacturing public copy omits unsupported capability and logistics claims", () => {
  const existing = [dataPath, pagePath, contentPath, capabilitiesPath, evidencePath, rfqPath].filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");
  for (const prohibited of [
    /factory size/i,
    /square meters?/i,
    /employee count/i,
    /production lines?/i,
    /machine (?:count|quantity|brand)/i,
    /\bCNC\b/i,
    /monthly capacity/i,
    /annual output/i,
    /automation percentage/i,
    /welding robot/i,
    /\blead[ -]?time\b/i,
    /tolerance (?:capability|of|within)/i,
    /\bISO\b/i,
    /\bERP\b/i,
    /\bMES\b/i,
    /\bAQL\b/i,
    /shipping time/i,
    /delivery[ -]?time/i,
    /shipping[ -]?speed/i,
    /export (?:countries|volume)/i,
    /export[ -]?volume/i,
  ]) assert.doesNotMatch(existing, prohibited);
  assert.match(existing, /href="\/custom-hinges"/);
  assert.match(existing, /href="\/quality"/);
});

test("Manufacturing navigation extension preserves earlier page defaults and legacy aliases stay absent", () => {
  const header = readFileSync(resolve("src/components/navigation/Header.tsx"), "utf8");
  const footer = readFileSync(resolve("src/components/navigation/Footer.tsx"), "utf8");
  const site = readFileSync(resolve("src/data/site.ts"), "utf8");

  assert.match(header, /"home" \| "products" \| "applications" \| "custom-hinges" \| "manufacturing" \| "quality"/);
  assert.match(footer, /"home" \| "products" \| "applications" \| "custom-hinges" \| "manufacturing" \| "quality"/);
  assert.match(site, /\{ label: "Manufacturing", href: "\/manufacturing" \}/);
  assert.match(header, /currentPage === "manufacturing"/);
  assert.match(footer, /#manufacturing-top/);

  for (const route of ["about"]) {
    assert.equal(existsSync(resolve("src/app", route, "page.tsx")), false, `${route} must remain unbuilt`);
  }
});

test("Manufacturing approved lock matches its page files and source catalog", () => {
  assert.ok(existsSync(lockPath), "manufacturing lock must exist after approval");
  const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
    status: string;
    route: string;
    sourceCatalog: string;
    sourceCatalogSha256: string;
    files: { path: string; sha256: string }[];
  };

  assert.equal(lock.status, "LOCKED");
  assert.equal(lock.route, "/manufacturing");
  assert.equal(sha256(resolve(lock.sourceCatalog)), lock.sourceCatalogSha256);
  for (const file of lock.files) assert.equal(sha256(resolve(file.path)), file.sha256, file.path);
});
