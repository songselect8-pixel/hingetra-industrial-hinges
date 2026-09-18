import assert from "node:assert/strict";
import test from "node:test";
import { joinSiteUrl } from "../src/lib/site-url.ts";
import { getSearchPolicy } from "../src/lib/search-policy.ts";

test("canonical URLs preserve hosting prefixes, fragments and file extensions", () => {
  const base = "https://example.com/hingetra-industrial-hinges/";
  assert.equal(joinSiteUrl(base, "/"), base);
  assert.equal(joinSiteUrl(base, "/products/bearing-weld-on-hinges"), `${base}products/bearing-weld-on-hinges/`);
  assert.equal(joinSiteUrl(base, "contact?product=bearing#contact-rfq"), `${base}contact/?product=bearing#contact-rfq`);
  assert.equal(joinSiteUrl(base, "/products/"), `${base}products/`);
  for (const file of ["images/brand/hingetra-logo.png", "sitemap.xml", "feed.xml"]) {
    assert.equal(joinSiteUrl(base, file), `${base}${file}`);
  }
});

test("indexing is opt-in and rejects unsafe launch origins", () => {
  assert.equal(getSearchPolicy({}).indexable, false);
  assert.equal(getSearchPolicy({ SITE_URL: "https://example.com", SEARCH_INDEXING_ENABLED: "false" }).indexable, false);
  assert.equal(getSearchPolicy({ SITE_URL: "https://example.com", SEARCH_INDEXING_ENABLED: "true" }).indexable, true);
  for (const siteUrl of [undefined, "http://example.com", "https://localhost", "https://127.0.0.1", "https://[::1]", "https://preview.local", "https://example.com/?draft=1", "https://example.com/#preview", "https://user:password@example.com"]) {
    assert.throws(() => getSearchPolicy({ SITE_URL: siteUrl, SEARCH_INDEXING_ENABLED: "true" }));
  }
});
