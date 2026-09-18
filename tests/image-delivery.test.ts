import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";
import staticImageLoader from "../src/lib/static-image-loader.ts";

test("the static image loader serves a real responsive WebP variant", () => {
  process.env.NEXT_PUBLIC_BASE_PATH = "/hingetra-industrial-hinges";

  const url = staticImageLoader({
    src: "/images/hinge-pin-hero.jpg",
    width: 640,
    quality: 90,
  });

  assert.equal(
    url,
    "/hingetra-industrial-hinges/images/optimized/hinge-pin-hero-640.webp",
  );
});

test("the static image loader rounds up to the next prepared width", () => {
  process.env.NEXT_PUBLIC_BASE_PATH = "/hingetra-industrial-hinges";

  assert.equal(
    staticImageLoader({ src: "/images/hinge-pin-hero.jpg", width: 700 }),
    "/hingetra-industrial-hinges/images/optimized/hinge-pin-hero-768.webp",
  );
});

test("external and unregistered images remain usable", () => {
  process.env.NEXT_PUBLIC_BASE_PATH = "/hingetra-industrial-hinges";

  assert.equal(
    staticImageLoader({ src: "https://example.com/hinge.jpg", width: 640 }),
    "https://example.com/hinge.jpg",
  );
  assert.equal(
    staticImageLoader({ src: "/images/future-source.jpg", width: 640 }),
    "/hingetra-industrial-hinges/images/future-source.jpg",
  );
});

test("the prepared mobile hero is a small 640-pixel WebP", async () => {
  const source = await stat("public/images/hinge-pin-hero.jpg");
  const variantPath = "public/images/optimized/hinge-pin-hero-640.webp";
  const variant = await stat(variantPath);
  const metadata = await sharp(variantPath).metadata();

  assert.equal(metadata.format, "webp");
  assert.equal(metadata.width, 640);
  assert.ok(variant.size < source.size * 0.1);
});
