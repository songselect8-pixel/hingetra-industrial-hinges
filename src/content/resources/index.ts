import { resourceCategories } from "./categories.ts";
import { chooseWeldOnHinges } from "./articles/how-to-choose-weld-on-hinges.ts";
import { weldOnHingeSizes } from "./articles/weld-on-hinge-sizes.ts";
import { gateTrailerRampHinges } from "./articles/weld-on-hinges-for-gates-trailer-doors-and-ramps.ts";
import { cabinetHinges } from "./articles/weld-on-hinges-for-electrical-control-cabinets.ts";
import { standardVsCustomHinges } from "./articles/standard-vs-custom-weld-on-hinges.ts";
import { prepareHingeDrawing } from "./articles/prepare-hinge-drawing-dimension-request.ts";
import { bulletBarrelNames } from "./articles/bullet-barrel-weld-on-hinge-names.ts";
import { bearingPinWasher } from "./articles/bearing-pin-washer-weld-on-hinges.ts";
import { greaseFittingHinges } from "./articles/grease-fitting-weld-on-hinges.ts";
import { alignmentClearance } from "./articles/weld-on-hinge-alignment-and-removal-clearance.ts";
import { weldOnVsBoltOn } from "./articles/weld-on-vs-bolt-on-hinges.ts";
import { hingeMaterials } from "./articles/weld-on-hinge-materials-and-finishes.ts";
import { liftOffHingesGuide } from "./articles/lift-off-weld-on-hinges-selection-guide.ts";
import { getResourceReadingTime, getResourceTableOfContents, isPublicResource, paginateResources, resourcePublisher } from "./publishing.ts";
import type { ResourceArticle, ResourceCategoryId } from "./types.ts";

export const resourceArticles: readonly ResourceArticle[] = [
  chooseWeldOnHinges,
  weldOnHingeSizes,
  gateTrailerRampHinges,
  cabinetHinges,
  standardVsCustomHinges,
  prepareHingeDrawing,
  bulletBarrelNames,
  bearingPinWasher,
  greaseFittingHinges,
  alignmentClearance,
  weldOnVsBoltOn,
  hingeMaterials,
  liftOffHingesGuide,
] as const;

export function getPublishedResources() {
  return resourceArticles.filter(isPublicResource).sort((a, b) => a.order - b.order);
}

export function getResourceArticle(slug: string) {
  return resourceArticles.find((article) => article.slug === slug);
}

export function getResourceCategory(id: ResourceCategoryId) {
  return resourceCategories.find((category) => category.id === id);
}

export function getResourcesByCategory(id: ResourceCategoryId) {
  return getPublishedResources().filter((article) => article.category === id);
}

export function getVisibleResourceCategories() {
  return resourceCategories.filter((category) => getResourcesByCategory(category.id).length > 0);
}

export function getRelatedResources(article: ResourceArticle) {
  return article.relatedArticles
    .map(getResourceArticle)
    .filter((item): item is ResourceArticle => Boolean(item && isPublicResource(item)))
    .filter((item) => item.slug !== article.slug)
    .slice(0, 4);
}

const productGuideSlugs: Record<string, readonly string[]> = {
  bearing: [bearingPinWasher.slug, cabinetHinges.slug, weldOnHingeSizes.slug],
  pin: [alignmentClearance.slug, weldOnVsBoltOn.slug, bearingPinWasher.slug],
  "grease-nipple": [greaseFittingHinges.slug, hingeMaterials.slug, cabinetHinges.slug],
  round: [bulletBarrelNames.slug, weldOnVsBoltOn.slug, hingeMaterials.slug],
  adjustable: [prepareHingeDrawing.slug, standardVsCustomHinges.slug, weldOnHingeSizes.slug],
  flag: [weldOnHingeSizes.slug, standardVsCustomHinges.slug, prepareHingeDrawing.slug],
  gasket: [bearingPinWasher.slug, cabinetHinges.slug, weldOnHingeSizes.slug],
  "20-type": [cabinetHinges.slug, weldOnHingeSizes.slug, prepareHingeDrawing.slug],
  "12-14-16-type": [gateTrailerRampHinges.slug, weldOnVsBoltOn.slug, weldOnHingeSizes.slug],
  square: [weldOnHingeSizes.slug, standardVsCustomHinges.slug, prepareHingeDrawing.slug],
};

export function getResourcesForProduct(productId: string, limit = 3) {
  const slugs = Object.hasOwn(productGuideSlugs, productId) ? productGuideSlugs[productId] : [];
  return slugs
    .map(getResourceArticle)
    .filter((article): article is ResourceArticle => Boolean(article && isPublicResource(article) && article.relatedProducts.includes(productId)))
    .slice(0, Math.max(0, limit));
}

export {
  getResourceReadingTime,
  getResourceTableOfContents,
  isPublicResource,
  paginateResources,
  resourceCategories,
  resourcePublisher,
};
export type { ResourceArticle, ResourceCategoryId } from "./types.ts";
