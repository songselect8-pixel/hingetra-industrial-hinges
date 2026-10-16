import { families, getVariants, type CatalogVariant } from "./catalog.ts";

export type ProductImage = { src: string; alt: string; sourcePage: number | null; kind: "photograph" | "catalog-composite" };
export type ProductApplication = { id: string; name: string; sourcePage: number; scope: "profile" | "series" };
export type ProductDimension = {
  id: string;
  model: string | null;
  size: string | null;
  parameters: Readonly<Record<string, string>> | null;
  unit: "mm" | null;
  weightG: string | null;
  structure: string;
  sourcePage: number;
};
export type ProductFamily = {
  id: string;
  slug: string;
  detailPath: string;
  detailPagePublished: boolean;
  name: string;
  category: string;
  structure: string;
  shortDescription: string;
  images: readonly ProductImage[];
  applications: readonly ProductApplication[];
  dimensions: readonly ProductDimension[];
  technicalSpecifications: { recordIds: readonly string[]; sourcePages: readonly number[]; notes: readonly string[] };
  drawing: ProductImage | null;
  customization: { description: string; sourcePages: readonly number[] } | null;
  packaging: { description: string; image: string; sourcePage: number } | null;
  relatedProducts: readonly string[];
};

export const productApplications: readonly ProductApplication[] = [
  { id: "steel-doors", name: "Industrial steel doors", sourcePage: 4, scope: "profile" },
  { id: "switch-cabinets", name: "Switch cabinets", sourcePage: 4, scope: "profile" },
  { id: "control-cabinets", name: "Control cabinets", sourcePage: 4, scope: "profile" },
  { id: "network-cabinets", name: "Network cabinets", sourcePage: 4, scope: "profile" },
  { id: "industrial-cabinets", name: "Industrial cabinets", sourcePage: 4, scope: "profile" },
  { id: "gates", name: "Gates", sourcePage: 6, scope: "series" },
  { id: "trailer-doors", name: "Trailer doors", sourcePage: 6, scope: "series" },
  { id: "ramps", name: "Ramps", sourcePage: 6, scope: "series" },
];

const slugs: Record<string, string> = {
  bearing: "bearing-weld-on-hinges", pin: "pin-weld-on-hinges",
  "grease-nipple": "grease-nipple-weld-on-hinges", round: "round-weld-on-hinges",
  adjustable: "adjustable-weld-on-hinges", flag: "flag-weld-on-hinges",
  gasket: "gasket-weld-on-hinges", "20-type": "20-type-weld-on-hinges",
  "12-14-16-type": "12-14-16-type-weld-on-hinges", square: "square-weld-on-hinges",
};

// Water-drop is a shared profile, not an extra family duplicating these records.
const waterDropIds = new Set(["bearing", "pin", "gasket", "grease-nipple", "20-type"]);

const productStructures: Record<string, string> = {
  bearing: "Water-drop · bearing assembly", pin: "Water-drop · pin construction",
  "grease-nipple": "Water-drop · grease nipple", round: "Cylindrical profile",
  adjustable: "Adjustable construction", flag: "Two catalog designs",
  gasket: "Water-drop · gasket", "20-type": "Chamfered / right-angle ends",
  "12-14-16-type": "12-A / 14-A / 16-A", square: "Square profile",
};

const relatedProductMap: Readonly<Record<string, readonly string[]>> = {
  bearing: ["pin", "20-type", "round"],
  pin: ["bearing", "gasket", "grease-nipple"],
  "grease-nipple": ["gasket", "pin", "round"],
  round: ["pin", "grease-nipple", "adjustable"],
  adjustable: ["square", "flag", "round"],
  flag: ["adjustable", "square", "12-14-16-type"],
  gasket: ["pin", "bearing", "grease-nipple"],
  "20-type": ["bearing", "pin", "12-14-16-type"],
  "12-14-16-type": ["20-type", "adjustable", "flag"],
  square: ["adjustable", "flag", "20-type"],
};

function structureFor(record: CatalogVariant): string {
  if (record.familyId === "20-type") return record.model === "20-A" ? "Chamfered ends · 20-A" : "Right-angle ends · 20-B";
  if (record.familyId === "flag") return `Flag design · catalog p${record.page}`;
  return productStructures[record.familyId];
}

function specificationNotes(id: string): readonly string[] {
  if (id === "20-type") return ["20-A: chamfered at both ends. 20-B: right-angle ends.", "No unit is printed in the original dimensional table."];
  if (id === "12-14-16-type") return ["12, 14 and 16 are model designations. The catalog D values are 11.80, 13.80 and 15.80 respectively.", "No unit is printed in the original dimensional table."];
  if (id === "square") return ["The Φ symbol and complete size notation are retained from the catalog. Confirm the dimension order for your application."];
  if (["gasket", "grease-nipple", "adjustable", "flag"].includes(id)) return ["Compound size strings are reproduced exactly as published. Confirm the dimension order against your requirement."];
  return [];
}

export const products: readonly ProductFamily[] = families.map((family) => {
  const records = getVariants(family.id);
  const sourcePages = [...new Set(records.map((record) => record.page))];
  const isNumbered = family.id.includes("type");
  const mainImage: ProductImage = { src: family.image, alt: family.imageAlt, sourcePage: family.id === "bearing" ? null : family.page, kind: isNumbered ? "catalog-composite" : "photograph" };
  const dimensions = records.map((record): ProductDimension => ({
    id: record.id,
    model: record.model === "TBD" ? null : record.model,
    size: record.size === "TBD" ? null : record.size,
    parameters: record.parameters,
    unit: record.unit === "TBD" ? null : record.unit,
    weightG: record.weightG === "TBD" ? null : record.weightG,
    structure: structureFor(record),
    sourcePage: record.page,
  }));
  return {
    id: family.id, slug: slugs[family.id], detailPath: `/products/${slugs[family.id]}/`, detailPagePublished: true,
    name: family.name,
    category: waterDropIds.has(family.id) ? "Water-drop shaped weld-on hinges" : family.id === "12-14-16-type" ? "Numbered weld-on hinge series" : family.profile,
    structure: productStructures[family.id],
    shortDescription: family.description,
    images: family.id === "flag" ? [mainImage, { src: "/images/hinge-flag-leaf.jpg", alt: "Flag hinge with rectangular leaves, the separate design on catalog page 15", sourcePage: 15, kind: "photograph" }] : family.id === "bearing" ? [mainImage, { src: "/images/hinge-bearing-detail.jpg", alt: "Bearing type weld-on hinges shown assembled and with the two body sections separated", sourcePage: null, kind: "photograph" }] : [mainImage],
    applications: waterDropIds.has(family.id) ? productApplications.filter((item) => item.sourcePage === 4) : family.id === "12-14-16-type" ? productApplications.filter((item) => item.sourcePage === 6) : [],
    dimensions,
    technicalSpecifications: { recordIds: records.map((record) => record.id), sourcePages, notes: specificationNotes(family.id) },
    drawing: family.id === "bearing" ? { src: "/images/drawing-bearing-reference.png", alt: "Original bearing-page reference drawing with two section views and the catalog D, D-1, L, d, L-1, c and L-2 symbols", sourcePage: 7, kind: "catalog-composite" } : isNumbered ? mainImage : null,
    // Explicit family customization statements occur on catalog pages 8–15.
    customization: sourcePages.every((page) => page >= 8 && page <= 15) ? { description: "Product customization supported; send the required dimensions or drawing for review.", sourcePages } : null,
    packaging: family.id === "20-type" ? { description: "Kraft-paper inner boxes with plastic-film lining; corrugated outer packaging with sealing tape and packing straps.", image: "/images/packaging-20-type.jpg", sourcePage: 16 } : family.id === "12-14-16-type" ? { description: "Folded inner boxes with plastic-film lining; a composite wooden case secured with packing belts.", image: "/images/packaging-12-14-16-type.jpg", sourcePage: 17 } : null,
    relatedProducts: relatedProductMap[family.id],
  };
});

export function getProduct(id: string) { return products.find((product) => product.id === id); }
export function getProductBySlug(slug: string) { return products.find((product) => product.slug === slug); }

// Preserve bookmarked previews. Only implemented detail pages receive direct links.
export function productPreviewHref(id: string) {
  const product = getProduct(id);
  return product ? `/products/?view=${product.slug}#product-range` : "/products/";
}

export function productHref(id: string) {
  const product = getProduct(id);
  return product?.detailPagePublished ? product.detailPath : productPreviewHref(id);
}

export function getProductExamples(dimensions: readonly ProductDimension[]): readonly ProductDimension[] {
  const first = dimensions[0];
  if (!first) return [];
  if (first.parameters || dimensions.length === 1) return [first];
  const pages = [...new Set(dimensions.map((item) => item.sourcePage))];
  if (pages.length > 1) return pages.map((page) => dimensions.find((item) => item.sourcePage === page)!);
  return [first, dimensions[dimensions.length - 1]];
}
