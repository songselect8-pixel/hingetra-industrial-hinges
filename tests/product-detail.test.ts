import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { bearingDetail, productDetailTemplateSections, productDetailTemplateVersion } from "../src/data/product-details.ts";
import { getProduct, products } from "../src/data/products.ts";
import { productInquiryHref, readProductInquiry } from "../src/data/product-inquiry.ts";
import { maxDrawingFileBytes, validateDrawingFile } from "../src/data/drawing-file.ts";

test("bearing pilot retains all 18 PDF-verified size and weight pairs without changing notation", () => {
  // Independently re-extracted from PDF p7 before implementation, then visually verified.
  const expected = [
    ["ф16*100mm", "142"], ["ф16*120mm", "158"], ["ф18*100mm", "180"], ["ф18*120mm", "230"],
    ["ф20*100mm", "242"], ["ф20*120mm", "288"], ["ф20*140mm", "330"], ["ф20*160mm", "391"],
    ["ф22*120mm", "354"], ["ф22*140mm", "416"], ["ф25*140mm", "525"], ["ф25*160mm", "597"],
    ["ф28*140mm", "694"], ["ф28*160mm", "798"], ["ф30*140mm", "754"], ["ф30*160mm", "869"],
    ["ф32*160mm", "917"], ["ф32*180mm", "1180"],
  ];
  const bearing = getProduct("bearing")!;
  assert.deepEqual(bearing.dimensions.map((row) => [row.size, row.weightG]), expected);
  assert.ok(bearing.dimensions.every((row) => row.sourcePage === 7 && row.unit === "mm"));
  assert.equal(bearing.packaging, null);
  assert.equal(bearing.customization, null);
  assert.ok(bearing.applications.every((application) => application.sourcePage === 4));
  assert.deepEqual(products.filter((product) => product.detailPagePublished).map((product) => product.id), products.map((product) => product.id));
});

test("bearing drawing preserves the original catalog composite, without relabelling other-series packaging", () => {
  const drawing = bearingDetail.drawing!;
  assert.equal(drawing.sourcePage, 7);
  assert.equal(createHash("sha256").update(readFileSync(`public${drawing.src}`)).digest("hex"), "d96721e065a0c0f28580e20ac8525fd10ad740798a63c0a24b53be8cb5a56ae8");
  assert.ok(drawing.note.includes("20 Type"));
  assert.equal(bearingDetail.gallery.filter((image) => image.kind === "photograph").length, 2);
  assert.deepEqual(bearingDetail.packaging!.examples.map((example) => example.productId), ["20-type", "12-14-16-type"]);
  assert.ok(bearingDetail.packaging!.boundary!.includes("other catalog series"));
  assert.ok(getProduct("bearing")!.relatedProducts.every((id) => id !== "bearing" && getProduct(id)));
});

test("the approved product-detail section order is recorded as the locked master template", () => {
  assert.equal(productDetailTemplateVersion, "1.0-locked");
  assert.deepEqual(productDetailTemplateSections, [
    "breadcrumb", "product-hero", "quick-technical-summary", "product-overview",
    "available-sizes-and-weights", "technical-drawing", "applications", "custom-requirements",
    "manufacturing-and-quality", "packaging", "related-hinges", "faq", "rfq",
  ]);
});

test("product RFQs keep the exact bearing size and cannot be changed to another family by a URL", () => {
  const href = productInquiryHref("bearing", "catalog-p07-r18");
  assert.equal(new URL(href, "http://localhost").pathname, "/products/bearing-weld-on-hinges/");
  assert.equal(readProductInquiry(new URL(href, "http://localhost").searchParams, "bearing")!.size, "ф32*180mm");
  assert.equal(readProductInquiry(new URLSearchParams("product=pin&variant=catalog-p09-r01"), "bearing")!.product, "bearing");
  assert.equal(readProductInquiry(new URLSearchParams("product=pin&variant=catalog-p07-r01"), "bearing")!.size, "");
  assert.equal(readProductInquiry(new URLSearchParams("variant=catalog-p07-r01"), "bearing")!.size, "ф16*100mm");
  assert.equal(readProductInquiry(new URLSearchParams("variant=catalog-p09-r01"), "bearing")!.size, "");
});

test("optional drawing selection checks empty, unsupported and oversized files without transmitting them", () => {
  assert.equal(validateDrawingFile(null), null);
  assert.equal(validateDrawingFile({ name: "HINGE.STEP", size: maxDrawingFileBytes }), null);
  assert.equal(validateDrawingFile({ name: "installation.dwg", size: 1024 }), null);
  assert.ok(validateDrawingFile({ name: "drawing.pdf.exe", size: 100 }));
  assert.ok(validateDrawingFile({ name: "drawing.svg", size: 100 }));
  assert.ok(validateDrawingFile({ name: "drawing.pdf", size: 0 }));
  assert.ok(validateDrawingFile({ name: "drawing.pdf", size: maxDrawingFileBytes + 1 }));
});
