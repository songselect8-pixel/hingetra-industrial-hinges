import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { getVariants } from "../src/data/catalog.ts";
import { products, getProduct, getProductExamples, productPreviewHref, productHref } from "../src/data/products.ts";
import { emptyProductFilters, filterProducts, readProductFilters } from "../src/data/product-filters.ts";
import { productInquiryHref, readProductInquiry } from "../src/data/product-inquiry.ts";

test("Products data retains every audited dimension and represents unpublished fields as null", () => {
  const audit = JSON.parse(readFileSync(resolve("docs/research/catalog-data-draft.json"), "utf8"));
  assert.equal(products.length, 10);
  assert.equal(new Set(products.map((product) => product.slug)).size, 10);
  assert.equal(products.flatMap((product) => product.dimensions).length, 60);
  for (const product of products) {
    for (const dimension of product.dimensions) {
      const source = audit.specifications.find((item: { recordId: string }) => item.recordId === dimension.id);
      assert.ok(source);
      assert.equal(dimension.size, source.sizeRaw === "TBD" ? null : source.sizeRaw);
      assert.equal(dimension.model, source.catalogModel === "TBD" ? null : source.catalogModel);
      assert.equal(dimension.unit, source.unit === "TBD" ? null : source.unit);
      assert.equal(dimension.weightG, source.weightG === "TBD" ? null : source.weightG);
      assert.deepEqual(dimension.parameters, source.dimensionSymbols === "TBD" ? null : source.dimensionSymbols);
      assert.equal(dimension.sourcePage, source.sourcePage);
    }
    for (const image of product.images) assert.ok(existsSync(resolve("public", image.src.slice(1))));
    assert.equal(product.detailPagePublished, true);
    assert.ok(productPreviewHref(product.id).startsWith("/products/?view="));
    const hasStaticPage = existsSync(resolve("src/app", product.detailPath.slice(1), "page.tsx"));
    const hasDynamicPage = existsSync(resolve("src/app/products/[slug]/page.tsx"));
    assert.equal(hasStaticPage || hasDynamicPage, product.detailPagePublished);
    assert.equal(productHref(product.id), product.detailPagePublished ? product.detailPath : productPreviewHref(product.id));
  }
  const publicData = JSON.stringify(products);
  assert.equal(publicData.includes('"TBD"'), false);
  for (const value of Object.values(audit.companyDraft.privateContactDraft)) if (typeof value === "string" && value !== "TBD") assert.equal(publicData.includes(value), false);
});

test("size and structure must occur in the same catalog variant", () => {
  assert.equal(filterProducts({ ...emptyProductFilters, family: "20-type", size: "20-A", structure: "Right-angle ends · 20-B" }).length, 0);
  assert.equal(filterProducts({ ...emptyProductFilters, size: "20-A", structure: "Chamfered ends · 20-A" })[0].dimensions[0].model, "20-A");
  assert.equal(filterProducts({ ...emptyProductFilters, family: "flag", size: "Φ14*80*3mm", structure: "Flag design · catalog p15" }).length, 0);
  assert.deepEqual(filterProducts({ ...emptyProductFilters, family: "flag", structure: "Flag design · catalog p15" })[0].dimensions.map((item) => item.sourcePage), [15, 15, 15, 15]);
});

test("exact size filtering does not interpolate combinations, relabel units or normalize symbols", () => {
  const exact = filterProducts({ ...emptyProductFilters, size: "Φ20x25x140mm" });
  assert.deepEqual(exact.map((match) => match.product.id), ["adjustable", "square"]);
  assert.equal(filterProducts({ ...emptyProductFilters, size: "Φ20x25x150mm" }).length, 0);
  assert.equal(filterProducts({ ...emptyProductFilters, size: "Φ20×25×140mm" }).length, 0);
  assert.equal(getProduct("12-14-16-type")!.dimensions[0].parameters!.D, "11.80");
  assert.ok(getProduct("12-14-16-type")!.dimensions.every((item) => item.unit === null));
  assert.equal(getProduct("grease-nipple")!.dimensions.at(-1)!.size, "Φ22x27x160mm");
});

test("application filtering uses the documented family or series scope only", () => {
  assert.deepEqual(filterProducts({ ...emptyProductFilters, application: "trailer-doors" }).map((item) => item.product.id), ["12-14-16-type"]);
  assert.deepEqual(filterProducts({ ...emptyProductFilters, application: "control-cabinets" }).map((item) => item.product.id), ["bearing", "pin", "grease-nipple", "gasket", "20-type"]);
  assert.equal(filterProducts({ ...emptyProductFilters, family: "round", application: "control-cabinets" }).length, 0);
  assert.equal(filterProducts(emptyProductFilters).length, 10);
  assert.deepEqual(readProductFilters(new URLSearchParams("family=not-a-family&size=999mm&application=aircraft")), emptyProductFilters);
});

test("comparison examples retain both flag designs and exclude invented packaging/customization", () => {
  assert.deepEqual(getProductExamples(getProduct("flag")!.dimensions).map((item) => item.sourcePage), [14, 15]);
  assert.equal(getProduct("bearing")!.customization, null);
  assert.equal(getProduct("round")!.customization!.sourcePages[0], 8);
  assert.equal(getProduct("square")!.packaging, null);
  assert.deepEqual(products.filter((product) => product.packaging).map((product) => product.packaging!.sourcePage), [16, 17]);
});

test("RFQ links preserve source selections, and reject cross-family or unknown records", () => {
  for (const product of products) for (const record of getVariants(product.id)) {
    const href = productInquiryHref(product.id, record.id);
    const selection = readProductInquiry(new URL(href, "http://localhost").searchParams)!;
    assert.equal(selection.product, product.id);
    if (record.size !== "TBD") assert.equal(selection.size, record.size);
    else { assert.ok(selection.size.includes(`D ${record.parameters!.D}`)); assert.ok(selection.size.endsWith("(unit to confirm)")); }
  }
  assert.equal(readProductInquiry(new URLSearchParams("product=invalid")), null);
  assert.equal(readProductInquiry(new URLSearchParams("product=bearing&variant=catalog-p05-r01"))!.size, "");
  assert.equal(productInquiryHref("invalid"), "/#rfq");
});
