import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import test from "node:test";

const dataPath = resolve("src/data/contact.ts");
const validationPath = resolve("src/data/contact-rfq.ts");
const pagePath = resolve("src/app/contact/page.tsx");
const cssPath = resolve("src/app/contact/contact.css");
const contentPath = resolve("src/components/contact/ContactPageContent.tsx");
const formPath = resolve("src/components/contact/ContactRFQForm.tsx");

function requireFile(path: string) {
  assert.ok(existsSync(path), `${path} must exist`);
  return readFileSync(path, "utf8");
}

test("Contact data uses the approved brand, updated email, catalog phone and existing product families", async () => {
  requireFile(dataPath);
  const [{ contactDetails, contactProductOptions }, { families }] = await Promise.all([
    import("../src/data/contact.ts"),
    import("../src/data/catalog.ts"),
  ]);

  assert.deepEqual(contactDetails, {
    company: "Hingetra Industrial Hinges",
    contact: "Eric Huang",
    email: "cindy@hingetra.com",
    phoneDisplay: "+86 18767359360",
    phoneHref: "+8618767359360",
    sourcePage: 19,
  });
  assert.deepEqual(
    contactProductOptions.slice(0, families.length),
    families.map((family) => ({ value: family.id, label: family.name })),
  );
  assert.deepEqual(contactProductOptions.slice(-2), [
    { value: "other-custom", label: "Other / Custom Requirement" },
    { value: "not-sure", label: "Not Sure" },
  ]);
  assert.equal("address" in contactDetails, false);
  assert.equal("whatsapp" in contactDetails, false);
  assert.equal("businessHours" in contactDetails, false);
});

test("Contact RFQ accepts name, email and one useful requirement without company or country", async () => {
  requireFile(validationPath);
  const { initialContactRFQFields, validateContactRFQ } = await import("../src/data/contact-rfq.ts");

  const emptyErrors = validateContactRFQ(initialContactRFQFields, { drawing: null, referenceImage: null });
  assert.equal(emptyErrors.name, "Please enter your name.");
  assert.equal(emptyErrors.company, undefined);
  assert.equal(emptyErrors.email, "Please enter a valid email address.");
  assert.equal(emptyErrors.country, undefined);
  assert.equal(emptyErrors.requirement, "Describe your requirement, select a product or attach a drawing / image.");

  const identity = {
    ...initialContactRFQFields,
    name: "A Buyer",
    email: "buyer@example.com",
  };
  assert.equal(validateContactRFQ({ ...identity, quantity: "500" }, { drawing: null, referenceImage: null }).requirement,
    "Describe your requirement, select a product or attach a drawing / image.");
  assert.deepEqual(validateContactRFQ({ ...identity, message: "I need hinges for a steel door." }, { drawing: null, referenceImage: null }), {});
  assert.deepEqual(validateContactRFQ(identity, { drawing: { name: "hinge.pdf", size: 1024 }, referenceImage: null }), {});
  assert.deepEqual(validateContactRFQ({ ...identity, productType: "bearing" }, { drawing: null, referenceImage: null }), {});
  assert.deepEqual(validateContactRFQ({ ...identity, application: "Industrial steel door" }, { drawing: null, referenceImage: null }), {});
  assert.equal(validateContactRFQ({ ...identity, email: "buyer-at-example" }, { drawing: null, referenceImage: null }).email,
    "Please enter a valid email address.");
});

test("Contact file validation advertises and accepts only implemented drawing and image formats", async () => {
  requireFile(validationPath);
  const { contactDrawingAccept, contactImageAccept, validateContactFile } = await import("../src/data/contact-rfq.ts");
  const oneMegabyte = 1024 * 1024;

  assert.equal(contactDrawingAccept, ".pdf,.dwg,.dxf,.jpg,.jpeg,.png");
  assert.equal(contactImageAccept, ".jpg,.jpeg,.png");
  assert.equal(validateContactFile({ name: "door-hinge.dwg", size: oneMegabyte }, "drawing"), null);
  assert.equal(validateContactFile({ name: "reference.png", size: oneMegabyte }, "referenceImage"), null);
  assert.match(validateContactFile({ name: "archive.zip", size: oneMegabyte }, "drawing") ?? "", /PDF, DWG, DXF, JPG or PNG/);
  assert.match(validateContactFile({ name: "drawing.pdf", size: 11 * oneMegabyte }, "drawing") ?? "", /10 MB/);
  assert.match(validateContactFile({ name: "empty.pdf", size: 0 }, "drawing") ?? "", /empty/);
});

test("Contact route implements the approved hierarchy, SEO, exact links, and configured-delivery boundary", () => {
  const page = requireFile(pagePath);
  const css = requireFile(cssPath);
  const content = requireFile(contentPath);
  const form = requireFile(formPath);
  const combined = `${page}\n${content}\n${form}\n${css}`;

  assert.match(page, /Contact \$\{site.brand\} \| Request an Industrial Hinge Quote/);
  assert.match(page, /alternates:\s*\{\s*canonical:\s*"\/contact"\s*\}/);
  assert.match(page, /BreadcrumbList/);
  assert.match(page, /<Header currentPage="contact"/);
  assert.match(page, /<Footer currentPage="contact"/);
  assert.equal((combined.match(/<h1\b/g) ?? []).length, 1);

  for (const heading of [
    "Tell Us About Your Hinge Requirement",
    "Contact {site.brand}",
    "Request a Quote",
    "Not Sure Which Hinge You Need?",
    "Information That Helps Us Understand Your Requirement",
    "Standard Product or Custom Requirement",
    "Explore by Application",
    "Inquiry Questions",
    "Ready to Discuss Your Hinge Requirement?",
  ]) assert.ok(combined.includes(heading), heading);

  assert.match(content, /href=\{`mailto:\$\{contactDetails\.email\}`\}/);
  assert.match(content, /href=\{`tel:\$\{contactDetails\.phoneHref\}`\}/);
  assert.match(form, /NEXT_PUBLIC_RFQ_ENDPOINT|submissionEndpoint/);
  assert.match(form, /Request checked, not sent\./);
  assert.match(form, /postInquiry\(submissionEndpoint/);
  assert.match(requireFile(resolve("src/lib/rfq-delivery.ts")), /readInquiryReceipt\(response\)/);
  assert.doesNotMatch(form, /\.reset\(\)|setFields\(initialContactRFQFields\)/);
});

test("Contact public copy contains no invented address, map, channel, timing, or commercial promise", () => {
  const combined = [dataPath, pagePath, contentPath, formPath]
    .map(requireFile)
    .join("\n");

  for (const prohibited of [
    /street address/i,
    /google maps/i,
    /<iframe/i,
    /whatsapp/i,
    /business hours/i,
    /sales office/i,
    /international branch/i,
    /reply within/i,
    /same-day/i,
    /24-hour response/i,
    /shipping time/i,
    /lead time/i,
    /sample time/i,
    /minimum order|\bMOQ\b/i,
    /payment terms/i,
    /load calculation/i,
  ]) assert.doesNotMatch(combined, prohibited);
});

test("Contact navigation is a functional extension of the locked header and footer", () => {
  const header = requireFile(resolve("src/components/navigation/Header.tsx"));
  const footer = requireFile(resolve("src/components/navigation/Footer.tsx"));
  const site = requireFile(resolve("src/data/site.ts"));

  assert.match(site, /\{ label: "Contact", href: "\/contact" \}/);
  assert.match(header, /"about-us" \| "contact"/);
  assert.match(footer, /"about-us" \| "contact"/);
  assert.match(header, /currentPage === "contact"/);
  assert.match(footer, /#contact-top/);
});

test("Contact approval is locked and production delivery remains an explicit launch blocker", () => {
  const lockPath = resolve("docs/contact-page-lock.json");
  const checklistPath = resolve("docs/pre-launch-checklist.md");
  assert.ok(existsSync(lockPath), "Contact lock must exist after approval");
  assert.ok(existsSync(checklistPath), "pre-launch checklist must exist");

  const lock = JSON.parse(readFileSync(lockPath, "utf8")) as {
    status: string;
    route: string;
    sourceCatalog: string;
    sourceCatalogSha256: string;
    rules: string[];
    files: { path: string; sha256: string }[];
  };
  assert.equal(lock.status, "LOCKED");
  assert.equal(lock.route, "/contact");
  assert.equal(lock.sourceCatalog, "铰链/Products show 2026(1).pdf");
  assert.equal(
    createHash("sha256").update(readFileSync(resolve(lock.sourceCatalog))).digest("hex"),
    lock.sourceCatalogSha256,
  );
  for (const file of lock.files) {
    assert.equal(
      createHash("sha256").update(readFileSync(resolve(file.path))).digest("hex"),
      file.sha256,
      file.path,
    );
  }
  assert.ok(lock.rules.some((rule) => rule.includes("Request checked, not sent.")));
  assert.ok(lock.rules.some((rule) => /Do not implement SMTP|external email service/i.test(rule)));

  const checklist = readFileSync(checklistPath, "utf8");
  assert.match(checklist, /CRITICAL BEFORE PRODUCTION:/);
  assert.match(checklist, /Connect the RFQ form to a real server-side delivery system and perform a real submission test to the configured inquiry recipient\./);

  const designLock = JSON.parse(readFileSync(resolve("docs/design-system-lock.json"), "utf8")) as {
    lockedScopes: string[];
    contactExtension?: { status: string; lock?: string };
  };
  assert.ok(designLock.lockedScopes.includes("contact-page"));
  assert.equal(designLock.contactExtension?.status, "LOCKED");
  assert.equal(designLock.contactExtension?.lock, "docs/contact-page-lock.json");
});
