import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const header = readFileSync(resolve("src/components/navigation/Header.tsx"), "utf8");

test("desktop Products navigation opens the overview while preserving mega-menu discovery", () => {
  assert.match(header, /<Link\s+ref=\{productTrigger\}\s+href="\/products\/"/);
  assert.match(header, /event\.key === "ArrowDown"/);
  assert.match(header, /id="product-mega-menu"/);
  assert.doesNotMatch(header, /<button\s+ref=\{productTrigger\}/);
});
