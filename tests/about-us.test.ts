import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const dataPath = resolve("src/data/about.ts");
const pagePath = resolve("src/app/about-us/page.tsx");
const contentPath = resolve("src/components/about/AboutPageContent.tsx");
const capabilitiesPath = resolve("src/components/about/AboutCapabilities.tsx");
const evidencePath = resolve("src/components/about/AboutCompanyEvidence.tsx");
const ctaPath = resolve("src/components/about/AboutCTASection.tsx");
const cssPath = resolve("src/app/about-us/about-us.css");
const lockPath = resolve("docs/about-us-page-lock.json");
const sha256 = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

test("About data keeps company, manufacturing, application, and logistics claims tied to catalog pages", async () => {
  assert.ok(existsSync(dataPath), "About data layer must exist");
  const data = await import("../src/data/about.ts");

  assert.equal(data.aboutCompany.name, "Hingetra Industrial Hinges");
  assert.deepEqual(data.aboutCompany.sourcePages, [1, 3, 18]);
  assert.deepEqual(data.aboutProductIds, [
    "bearing",
    "pin",
    "grease-nipple",
    "adjustable",
    "20-type",
    "12-14-16-type",
  ]);
  assert.deepEqual(
    data.aboutCapabilities.map((item: { title: string; sourcePages: readonly number[] }) => [item.title, item.sourcePages]),
    [
      ["Self-Owned Factory", [18]],
      ["Self-Owned Equipment", [3]],
      ["Lathe Processing", [3]],
      ["Automatic Punching", [3]],
      ["Mass Assembly", [3]],
      ["Standardized Packaging", [3]],
    ],
  );
  assert.deepEqual(
    data.aboutApplications.map((item: { name: string; sourcePage: number }) => [item.name, item.sourcePage]),
    [
      ["Industrial steel doors", 4],
      ["Switch cabinets", 4],
      ["Control cabinets", 4],
      ["Network cabinets", 4],
      ["Industrial cabinets", 4],
      ["Gates", 6],
      ["Trailer doors", 6],
      ["Ramps", 6],
    ],
  );
  assert.deepEqual(
    data.aboutLogistics.map((item: { title: string; sourcePages: readonly number[] }) => [item.title, item.sourcePages]),
    [
      ["Shanghai & Ningbo Port Proximity", [18]],
      ["Highway Access", [18]],
      ["Shipment Handling", [18]],
    ],
  );
});

test("About route implements the requested hierarchy, SEO, and internal navigation", () => {
  for (const path of [pagePath, contentPath, capabilitiesPath, evidencePath, ctaPath, cssPath]) {
    assert.ok(existsSync(path), `${path} must exist`);
  }

  const page = readFileSync(pagePath, "utf8");
  const content = readFileSync(contentPath, "utf8");
  const capabilities = readFileSync(capabilitiesPath, "utf8");
  const evidence = readFileSync(evidencePath, "utf8");
  const cta = readFileSync(ctaPath, "utf8");
  const data = readFileSync(dataPath, "utf8");
  const combined = `${page}\n${content}\n${capabilities}\n${evidence}\n${cta}\n${data}`;

  assert.match(page, /About \$\{site.brand\} \| Industrial Hinge Manufacturer/);
  assert.match(page, /alternates:\s*\{\s*canonical:\s*"\/about-us"\s*\}/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /<Header currentPage="about-us"/);
  assert.match(page, /<Footer currentPage="about-us"/);
  assert.equal((combined.match(/<h1\b/g) ?? []).length, 1);

  for (const heading of [
    "About {site.brand}",
    "Industrial Hinge Manufacturing Built Around Practical Requirements",
    "About the {site.brand} Factory",
    "A Focused Hinge Product Range",
    "Manufacturing Behind the Product",
    "Standard Products. Custom Requirements.",
    "Built for Industrial Applications",
    "Checks During Production",
    "Built Around Practical B2B Requirements",
    "Located for Convenient Export Access",
    "How We Approach Each Requirement",
    "Continue Exploring",
    "Looking for an Industrial Hinge Supplier?",
  ]) assert.ok(combined.includes(heading), heading);

  for (const href of ["/products", "/applications", "/custom-hinges", "/manufacturing", "/quality", "/#rfq"]) {
    assert.ok(combined.includes(href), href);
  }
});

test("About imagery discloses the factory concept and preserves real product references", () => {
  const existing = [contentPath, capabilitiesPath, evidencePath]
    .filter(existsSync)
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  assert.equal((existing.match(/src=\{illustrations\.factory\.src\}/g) ?? []).length, 2);
  assert.equal((existing.match(/AI-generated illustration/g) ?? []).length, 2);
  assert.doesNotMatch(existing, /factory-exterior\.jpg|data-asset-kind="company-photo"|Actual company photo/i);
  assert.equal((existing.match(/asset="manufacturing"/g) ?? []).length, 1);
  assert.equal((existing.match(/asset="cabinets"/g) ?? []).length, 1);
  assert.equal((existing.match(/asset="trailers"/g) ?? []).length, 1);
  assert.match(existing, /<ProductCard/);
  assert.doesNotMatch(existing, /(?:our|yipinxiang|hingetra) (?:workshop|lathe|punching machine|technician|quality inspector)/i);
});

test("About public copy omits unsupported company history, scale, commercial, and technical claims", () => {
  const existing = [dataPath, pagePath, contentPath, capabilitiesPath, evidencePath, ctaPath]
    .filter(existsSync)
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  for (const prohibited of [
    /founded (?:in|since)/i,
    /established (?:in|since)/i,
    /employee count/i,
    /\b\d+\s+employees\b/i,
    /factory area/i,
    /square meters/i,
    /annual revenue/i,
    /export volume/i,
    /countries served/i,
    /customer count/i,
    /production capacity/i,
    /\bpatents?\b/i,
    /\bcertified\b/i,
    /\bcertifications?\b/i,
    /\bawards?\b/i,
    /global offices?/i,
    /world-leading/i,
    /industry leader/i,
    /internationally renowned/i,
    /best quality/i,
    /lowest price/i,
    /fastest delivery/i,
    /shipping time/i,
    /delivery speed/i,
    /freight cost/i,
    /tolerance range/i,
    /lead time/i,
  ]) assert.doesNotMatch(existing, prohibited);
});

test("About navigation extension preserves locked defaults", () => {
  const header = readFileSync(resolve("src/components/navigation/Header.tsx"), "utf8");
  const footer = readFileSync(resolve("src/components/navigation/Footer.tsx"), "utf8");
  const site = readFileSync(resolve("src/data/site.ts"), "utf8");

  assert.match(header, /"quality" \| "resources" \| "about-us"/);
  assert.match(footer, /"quality" \| "resources" \| "about-us"/);
  assert.match(site, /\{ label: "About Us", href: "\/about-us" \}/);
  assert.match(header, /currentPage === "about-us"/);
  assert.match(footer, /#about-us-top/);
});

test("About Us approved lock matches its page files and source catalog", () => {
  assert.ok(existsSync(lockPath), "About Us lock manifest must exist after approval");
  const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
    status: string;
    route: string;
    sourceCatalog: string;
    sourceCatalogSha256: string;
    files: { path: string; sha256: string }[];
  };

  assert.equal(lock.status, "LOCKED");
  assert.equal(lock.route, "/about-us");
  assert.equal(sha256(resolve(lock.sourceCatalog)), lock.sourceCatalogSha256);
  for (const file of lock.files) assert.equal(sha256(resolve(file.path)), file.sha256, file.path);
});
