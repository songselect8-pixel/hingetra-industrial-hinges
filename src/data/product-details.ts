import { getVariants } from "./catalog.ts";
import { getProduct, getProductBySlug, type ProductImage } from "./products.ts";

export type ProductMedia = ProductImage & { label: string; width: number; height: number; caption: string };
export type SourcedCopy = { title: string; description: string; sourcePages: readonly number[] };
export type ProductPackaging = {
  intro: string;
  boundary: string | null;
  examples: readonly { productId: string; label: string }[];
};
export type ProductSpecificationGroup = {
  title: string;
  description: string;
  sourcePage: number;
  image: ProductMedia;
  recordIds: readonly string[];
};

export const productDetailTemplateVersion = "1.0-locked" as const;
export const productDetailTemplateSections = [
  "breadcrumb",
  "product-hero",
  "quick-technical-summary",
  "product-overview",
  "available-sizes-and-weights",
  "technical-drawing",
  "applications",
  "custom-requirements",
  "manufacturing-and-quality",
  "packaging",
  "related-hinges",
  "faq",
  "rfq",
] as const;

export type ProductDetail = {
  productId: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  applicationSummary: string | null;
  overview: readonly string[];
  gallery: readonly ProductMedia[];
  drawing: (ProductMedia & { note: string }) | null;
  specificationGroups: readonly ProductSpecificationGroup[];
  applicationTitle: string;
  applicationIntro: string;
  applicationGroups: readonly SourcedCopy[];
  customRequirement: SourcedCopy;
  manufacturing: readonly SourcedCopy[];
  packaging: ProductPackaging | null;
  faqs: readonly { question: string; answer: string; sourcePages: readonly number[] }[];
};

const manufacturingSummary: readonly SourcedCopy[] = [
  { title: "Lathe Processing", description: "Lathe processing for manufactured hinge components.", sourcePages: [3] },
  { title: "Automatic Punching", description: "Automatic punching as part of metal component processing.", sourcePages: [3] },
  { title: "Mass Assembly", description: "Assembly and standardized product handling support production.", sourcePages: [3] },
  { title: "In-Process Inspection", description: "Product checking tools are used during the production process.", sourcePages: [18] },
];

const waterDropApplications: readonly SourcedCopy[] = [
  { title: "Industrial steel doors", description: "Indoor and outdoor carbon steel door applications listed in the water-drop family introduction.", sourcePages: [4] },
  { title: "Electrical & industrial cabinets", description: "Switch cabinets, control cabinets, network cabinets, GGD and AE cabinets, and other industrial cabinets.", sourcePages: [4] },
];

const numberedSeriesApplications: readonly SourcedCopy[] = [
  { title: "Gates & trailer doors", description: "Gates and trailer doors are listed for the 12 / 14 / 16 Type series in the source catalog.", sourcePages: [6] },
  { title: "Ramps", description: "Ramps are also listed for this numbered weld-on hinge series. Confirm the selected model against the installation.", sourcePages: [6] },
];

function generalCustomRequirement(): SourcedCopy {
  return {
    title: "Need a Different Size or Configuration?",
    description: "Send your required dimensions or technical drawing for review. Include the quantity and application so we can discuss the requirement.",
    sourcePages: [18],
  };
}

function explicitCustomRequirement(sourcePages: readonly number[]): SourcedCopy {
  return {
    title: "Supports Customization",
    description: "The catalog identifies customization support for this product family. Send your required dimensions or technical drawing so the requirement can be reviewed.",
    sourcePages,
  };
}

function productSafeFaqs(productId: string, selectionGuidance: string) {
  const product = getProduct(productId)!;
  const technicalPages = product.technicalSpecifications.sourcePages;
  const customizationPages = product.customization?.sourcePages ?? [18];
  const customizationAnswer = product.customization
    ? "The catalog identifies customization support for this family. Send the required dimensions or a technical drawing for review; unlisted materials, finishes and performance requirements need confirmation."
    : "Send the required dimensions or a technical drawing for review. The catalog describes general custom product development and production, but the requested configuration must be confirmed.";
  return [
    { question: `Which ${product.name.toLowerCase()} are listed?`, answer: `${selectionGuidance} Only the individual published records shown in the table are presented as catalog options.`, sourcePages: technicalPages },
    { question: "Can I request a custom configuration?", answer: customizationAnswer, sourcePages: customizationPages },
    { question: "Can I send a technical drawing?", answer: "Use the file fields in the inquiry form to attach a drawing or reference image. Include the dimensions, installation details and any requested changes. Check the form's submission result after sending.", sourcePages: customizationPages },
    { question: "What information should I provide for a quotation?", answer: "Include the hinge family, exact catalog notation or required dimensions, estimated quantity, application and company contact details. Add your drawing and packing requirements where available.", sourcePages: [] },
  ] as const;
}

const bearing = getProduct("bearing")!;
const bearingDrawing: ProductDetail["drawing"] = {
  ...bearing.drawing!, label: "Technical drawing", width: 825, height: 864,
  caption: "Original catalog reference · page 7",
  note: "This reference also appears on the 20 Type catalog page. It shows the original section views and symbols; it is not a separate dimensional drawing for each of the 18 sizes.",
};

export const bearingDetail: ProductDetail = {
  productId: "bearing",
  title: "Bearing Type Weld-On Hinges",
  seoTitle: "Bearing Type Weld-On Hinges | Sizes & Drawings",
  seoDescription: "View bearing type weld-on hinge photographs, 18 published sizes and weights, and the original catalog drawing. Send your dimensions or drawing with an RFQ.",
  description: "Water-drop shaped weld-on hinges with a bearing assembly. Explore the published sizes for industrial steel door and cabinet requirements.",
  applicationSummary: "Steel doors & industrial cabinets",
  overview: [
    "The bearing type is part of the catalog’s water-drop shaped weld-on hinge family. The product photographs show the assembled hinge and its separated body sections.",
    "Use the published size and weight table to identify a catalog entry, then send your installation details or technical drawing with the requirement.",
  ],
  gallery: [
    { ...bearing.images[0], label: "Product view", width: 800, height: 800, caption: "Real product photograph · supplied company assets" },
    { ...bearing.images[1], label: "Assembly view", width: 800, height: 800, caption: "Assembled and separated views · supplied company assets" },
    bearingDrawing,
  ],
  drawing: bearingDrawing,
  specificationGroups: [],
  applicationTitle: "For industrial doors & cabinets.",
  applicationIntro: "The catalog introduction identifies these uses for the water-drop hinge family. Confirm the hinge selection against your door or cabinet installation.",
  applicationGroups: waterDropApplications,
  customRequirement: generalCustomRequirement(),
  manufacturing: manufacturingSummary,
  packaging: {
    intro: "Include your packing requirements with the RFQ. These actual catalog photographs document packaging for the named series below.",
    boundary: "The examples are for other catalog series, not a published packing specification for this bearing type.",
    examples: [
      { productId: "20-type", label: "20 Type · catalog packaging" },
      { productId: "12-14-16-type", label: "12 / 14 / 16 Type · catalog packaging" },
    ],
  },
  faqs: [
    { question: "Can I request a different hinge size?", answer: "Send the required dimensions and application for review. The catalog describes custom product development and production; your requested configuration needs to be reviewed before it is confirmed.", sourcePages: [18] },
    { question: "Can I send a technical drawing?", answer: "Use the file fields in the inquiry form to attach a drawing or reference image. Include the dimensions, installation details and any requested changes. Check the form's submission result after sending.", sourcePages: [18] },
    { question: "How do I select a suitable weld-on hinge?", answer: "Start with a published catalog size, compare the reference drawing with your installation, and provide the door or cabinet details for review. The listed weight is the product’s mass; it is not a load rating.", sourcePages: [4, 7] },
    { question: "What information should I provide for a quotation?", answer: "Include the hinge type, required size, estimated quantity, application and company contact details. Add your drawing, custom requirement and packing requirements where available.", sourcePages: [] },
  ],
};

const pin = getProduct("pin")!;
export const pinDetail: ProductDetail = {
  productId: "pin",
  title: "Pin Type Weld-On Hinges",
  seoTitle: "Pin Type Weld-On Hinges | Published Sizes & Weights",
  seoDescription: "Compare five published Pin Type weld-on hinge sizes and weights, view real product photographs, and send your dimensions or drawing for review.",
  description: "Water-drop shaped weld-on hinges with a separable pin construction. Review the five published sizes and catalog weights for your requirement.",
  applicationSummary: "Steel doors & industrial cabinets",
  overview: [
    "The Pin Type family uses the water-drop shaped profile shown in the catalog. The supplied product photographs show both the assembled hinge and the separable pin structure.",
    "Five discrete size and weight records are published. Select the exact catalog notation rather than forming unlisted diameter and length combinations.",
  ],
  gallery: [
    { src: "/images/hinge-pin-hero.jpg", alt: "Pin Type water-drop weld-on hinge assembled beside its separated hinge pin", sourcePage: 9, kind: "photograph", label: "Product view", width: 5252, height: 3505, caption: "Real product photograph · supplied company assets" },
    { ...pin.images[0], label: "Assembly view", width: 800, height: 800, caption: "Assembled and separated views · supplied company assets" },
  ],
  drawing: null,
  specificationGroups: [],
  applicationTitle: "For industrial doors & cabinets.",
  applicationIntro: "These applications are documented for the water-drop hinge family. Confirm the Pin Type selection against your installation.",
  applicationGroups: waterDropApplications,
  customRequirement: explicitCustomRequirement([9]),
  manufacturing: manufacturingSummary,
  packaging: null,
  faqs: productSafeFaqs("pin", "The catalog publishes five exact size and product-weight pairs for the Pin Type family."),
};

const greaseNipple = getProduct("grease-nipple")!;
export const greaseNippleDetail: ProductDetail = {
  productId: "grease-nipple",
  title: "Grease Nipple Type Weld-On Hinges",
  seoTitle: "Grease Nipple Type Weld-On Hinges | Sizes & Weights",
  seoDescription: "View Grease Nipple Type weld-on hinge photographs and six exact catalog size and weight records. Discuss a custom hinge requirement with an RFQ.",
  description: "Water-drop shaped weld-on hinges with a visible grease nipple fitting. Six size and product-weight records are published in the catalog.",
  applicationSummary: "Steel doors & industrial cabinets",
  overview: [
    "This family combines the catalog’s water-drop shaped hinge profile with a visible grease nipple fitting. The description is limited to the structure shown in the source product image.",
    "The catalog does not state a lubrication interval or grease specification. Use the six published size and weight pairs when preparing the requirement.",
  ],
  gallery: [
    { ...greaseNipple.images[0], label: "Product view", width: 800, height: 800, caption: "Real product photograph · supplied company assets" },
  ],
  drawing: null,
  specificationGroups: [],
  applicationTitle: "For industrial doors & cabinets.",
  applicationIntro: "These applications are documented for the water-drop hinge family. Confirm the grease nipple construction and selected size for the installation.",
  applicationGroups: waterDropApplications,
  customRequirement: explicitCustomRequirement([11]),
  manufacturing: manufacturingSummary,
  packaging: null,
  faqs: productSafeFaqs("grease-nipple", "The source lists six exact compound size strings with product weights; no maintenance interval is published."),
};

const round = getProduct("round")!;
export const roundDetail: ProductDetail = {
  productId: "round",
  title: "Round Type Weld-On Hinges",
  seoTitle: "Round Type Weld-On Hinges | Published Sizes & Weights",
  seoDescription: "Explore six Round Type weld-on hinge sizes and product weights from the catalog, view the real product image, and discuss custom dimensions.",
  description: "Cylindrical-profile weld-on hinges with six published size and product-weight combinations. Custom dimensions can be sent for review.",
  applicationSummary: null,
  overview: [
    "The Round Type family is identified by the cylindrical product profile shown in the source photograph. It is kept separate from the Bearing Type and Pin Type water-drop families.",
    "Six individual size and weight records are published. The catalog does not assign an application list to this family, so installation details should accompany the inquiry.",
  ],
  gallery: [
    { ...round.images[0], label: "Product view", width: 800, height: 800, caption: "Real product photograph · supplied company assets" },
  ],
  drawing: null,
  specificationGroups: [],
  applicationTitle: "Confirm the installation requirement.",
  applicationIntro: "No family-specific application list is published for this hinge type.",
  applicationGroups: [],
  customRequirement: explicitCustomRequirement([8]),
  manufacturing: manufacturingSummary,
  packaging: null,
  faqs: productSafeFaqs("round", "The source publishes six exact size and product-weight pairs for the cylindrical Round Type family."),
};

const adjustable = getProduct("adjustable")!;
export const adjustableDetail: ProductDetail = {
  productId: "adjustable",
  title: "Adjustable Weld-On Hinges",
  seoTitle: "Adjustable Weld-On Hinges | Catalog Sizes & Weights",
  seoDescription: "Review three published Adjustable weld-on hinge sizes and weights, view the original catalog product image, and send your requirement for review.",
  description: "An adjustable hinge construction with three published catalog size and weight records. Send the required installation details for review.",
  applicationSummary: null,
  overview: [
    "The catalog photograph shows an adjustable hinge construction with a visible adjustment screw. Three complete compound size strings and corresponding product weights are published.",
    "No adjustment range is stated in the source. Provide the installation geometry and required adjustment details with the inquiry so they can be reviewed.",
  ],
  gallery: [
    { ...adjustable.images[0], label: "Catalog product view", width: 800, height: 800, caption: "Original product photograph · catalog page 12" },
  ],
  drawing: null,
  specificationGroups: [],
  applicationTitle: "Confirm the installation requirement.",
  applicationIntro: "No family-specific application list is published for this hinge type.",
  applicationGroups: [],
  customRequirement: explicitCustomRequirement([12]),
  manufacturing: manufacturingSummary,
  packaging: null,
  faqs: productSafeFaqs("adjustable", "The source publishes three compound size strings and product weights; it does not publish an adjustment range."),
};

const flag = getProduct("flag")!;
const flagPage14Image: ProductMedia = { ...flag.images[0], label: "Design 01", width: 750, height: 750, caption: "Original product photograph · catalog page 14" };
const flagPage15Image: ProductMedia = { ...flag.images[1], label: "Design 02", width: 800, height: 800, caption: "Original product photograph · catalog page 15" };
export const flagDetail: ProductDetail = {
  productId: "flag",
  title: "Flag Type Weld-On Hinges",
  seoTitle: "Flag Type Weld-On Hinges | Two Catalog Designs",
  seoDescription: "Compare two distinct Flag Type weld-on hinge structures, each with its correct product image, published size table and catalog weights.",
  description: "Two distinct Flag Type structures are published in the catalog. Each design keeps its matching product image, sizes and product weights.",
  applicationSummary: null,
  overview: [
    "The source catalog presents two visually different structures under the same Flag Type family. No official A/B model names are published, so the page identifies them by their visible construction and source grouping.",
    "The cylindrical-body design has five published records. The rectangular-leaf design has four separate records; values are not merged between the two structures.",
  ],
  gallery: [flagPage14Image, flagPage15Image],
  drawing: null,
  specificationGroups: [
    {
      title: "Cylindrical Body & Weld-On Leaf",
      description: "Catalog design 01. The five records below belong to the product image shown with this group.",
      sourcePage: 14,
      image: flagPage14Image,
      recordIds: getVariants("flag").filter((record) => record.page === 14).map((record) => record.id),
    },
    {
      title: "Rectangular Leaf Structure",
      description: "Catalog design 02. These four records remain separate from the cylindrical-body design.",
      sourcePage: 15,
      image: flagPage15Image,
      recordIds: getVariants("flag").filter((record) => record.page === 15).map((record) => record.id),
    },
  ],
  applicationTitle: "Confirm the installation requirement.",
  applicationIntro: "No family-specific application list is published for these Flag Type designs.",
  applicationGroups: [],
  customRequirement: explicitCustomRequirement([14, 15]),
  manufacturing: manufacturingSummary,
  packaging: null,
  faqs: productSafeFaqs("flag", "The catalog contains two separate Flag Type structures with five and four published size-and-weight records respectively."),
};

const gasket = getProduct("gasket")!;
export const gasketDetail: ProductDetail = {
  productId: "gasket",
  title: "Gasket Type Weld-On Hinges",
  seoTitle: "Gasket Type Weld-On Hinges | Sizes & Weights",
  seoDescription: "View seven exact Gasket Type weld-on hinge sizes and weights, inspect the correct product photograph, and send custom dimensions for review.",
  description: "Water-drop shaped weld-on hinges with a visible gasket or washer between the hinge bodies. Seven size and weight records are published.",
  applicationSummary: "Steel doors & industrial cabinets",
  overview: [
    "The source photograph shows a gasket or washer positioned within the water-drop shaped hinge assembly. The product family is kept distinct from Bearing, Pin and Grease Nipple structures.",
    "Seven compound size strings and product weights are reproduced exactly. The source does not establish the gasket material, so no material description is added.",
  ],
  gallery: [
    { ...gasket.images[0], label: "Product view", width: 800, height: 800, caption: "Real product photograph · supplied company assets" },
  ],
  drawing: null,
  specificationGroups: [],
  applicationTitle: "For industrial doors & cabinets.",
  applicationIntro: "These applications are documented for the water-drop hinge family. Confirm the Gasket Type selection against your installation.",
  applicationGroups: waterDropApplications,
  customRequirement: explicitCustomRequirement([10]),
  manufacturing: manufacturingSummary,
  packaging: null,
  faqs: productSafeFaqs("gasket", "The catalog publishes seven complete compound size strings and product weights; the gasket material is not stated."),
};

const type20 = getProduct("20-type")!;
const type20Drawing: ProductDetail["drawing"] = {
  ...type20.drawing!, label: "Catalog reference", width: 825, height: 864,
  caption: "Original product views and dimensional reference · catalog page 5",
  note: "The original composite shows Type A with chamfered ends and Type B with right-angle ends, plus the D, D-1, L, d, L-1, c and L-2 symbols. The source table does not print a unit.",
};
export const type20Detail: ProductDetail = {
  productId: "20-type",
  title: "20 Type Weld-On Hinges",
  seoTitle: "20 Type Weld-On Hinges | Type A & Type B Dimensions",
  seoDescription: "Compare the published 20-A chamfered-end and 20-B right-angle-end weld-on hinge dimensions, original drawing and family-specific packaging.",
  description: "Two catalog variants with the same published dimensions: Type A has chamfered ends, while Type B has right-angle ends.",
  applicationSummary: "Steel doors & industrial cabinets",
  overview: [
    "The 20 Type family contains two source-defined end structures. 20-A is chamfered at both ends; 20-B has right-angle ends. No additional versions are inferred.",
    "Both variants share the exact published D, D-1, L, d, L-1, c and L-2 values shown below. The catalog does not print a unit for this table.",
  ],
  gallery: [type20Drawing],
  drawing: type20Drawing,
  specificationGroups: [],
  applicationTitle: "For industrial doors & cabinets.",
  applicationIntro: "These applications are documented for the water-drop hinge family. Confirm the 20-A or 20-B end structure against your installation.",
  applicationGroups: waterDropApplications,
  customRequirement: generalCustomRequirement(),
  manufacturing: manufacturingSummary,
  packaging: {
    intro: "The catalog publishes a packing method specifically for the 20 Type series.",
    boundary: "This packaging record is scoped to the 20 Type family.",
    examples: [{ productId: "20-type", label: "20 Type · catalog packaging" }],
  },
  faqs: productSafeFaqs("20-type", "The source publishes 20-A and 20-B with identical dimensional values and different end structures; the unit is not printed."),
};

const numbered = getProduct("12-14-16-type")!;
const numberedDrawing: ProductDetail["drawing"] = {
  ...numbered.drawing!, label: "Catalog reference", width: 546, height: 958,
  caption: "Original product views and dimensional reference · catalog page 6",
  note: "The original composite shows 12-A, 14-A and 16-A with the D, D-1, L, d and L-1 symbols. The source table does not print a unit; the model numbers are not substituted for the D values.",
};
export const numberedDetail: ProductDetail = {
  productId: "12-14-16-type",
  title: "12 / 14 / 16 Type Weld-On Hinges",
  seoTitle: "12 / 14 / 16 Type Weld-On Hinges | Dimensions",
  seoDescription: "Compare exact 12-A, 14-A and 16-A weld-on hinge dimensions, the original catalog drawing, supported applications and family-specific packaging.",
  description: "One numbered weld-on hinge family with three published models: 12-A, 14-A and 16-A. Original dimensional values remain unchanged.",
  applicationSummary: "Gates, trailer doors & ramps",
  overview: [
    "The catalog groups 12-A, 14-A and 16-A within one product family. Each model retains its own D, D-1, L, d and L-1 values in a single comparison table.",
    "The series numbers are model designations. The published D values are 11.80, 13.80 and 15.80, and the source does not print a unit for the table.",
  ],
  gallery: [numberedDrawing],
  drawing: numberedDrawing,
  specificationGroups: [],
  applicationTitle: "For gates, trailer doors & ramps.",
  applicationIntro: "These applications are listed specifically for the 12 / 14 / 16 Type series. Confirm the selected model against the installation.",
  applicationGroups: numberedSeriesApplications,
  customRequirement: generalCustomRequirement(),
  manufacturing: manufacturingSummary,
  packaging: {
    intro: "The catalog publishes a packing method specifically for the 12 / 14 / 16 Type series.",
    boundary: "This packaging record is scoped to the 12 / 14 / 16 Type family.",
    examples: [{ productId: "12-14-16-type", label: "12 / 14 / 16 Type · catalog packaging" }],
  },
  faqs: productSafeFaqs("12-14-16-type", "The source publishes three models—12-A, 14-A and 16-A—with exact parameter values and no printed unit."),
};

const square = getProduct("square")!;
export const squareDetail: ProductDetail = {
  productId: "square",
  title: "Square Type Weld-On Hinges",
  seoTitle: "Square Type Weld-On Hinges | Catalog Specification",
  seoDescription: "View the published Square Type weld-on hinge size and product weight, the original catalog image, and customization inquiry options.",
  description: "The square-profile weld-on hinge shown in the source catalog, with one published size and product-weight record.",
  applicationSummary: null,
  overview: [
    "The Square Type page uses the original catalog product image and keeps the square-profile family separate from cylindrical and water-drop hinge structures.",
    "One compound size string and product weight are published. The Φ symbol is retained exactly as printed, without changing or interpreting the dimension order.",
  ],
  gallery: [
    { ...square.images[0], label: "Catalog product view", width: 800, height: 800, caption: "Original product photograph · catalog page 13" },
  ],
  drawing: null,
  specificationGroups: [],
  applicationTitle: "Confirm the installation requirement.",
  applicationIntro: "No family-specific application list is published for this hinge type.",
  applicationGroups: [],
  customRequirement: explicitCustomRequirement([13]),
  manufacturing: manufacturingSummary,
  packaging: null,
  faqs: productSafeFaqs("square", "The catalog publishes one Square Type size and product weight. Its complete notation, including Φ, is preserved."),
};

export const productDetails: readonly ProductDetail[] = [
  bearingDetail,
  pinDetail,
  greaseNippleDetail,
  roundDetail,
  adjustableDetail,
  flagDetail,
  gasketDetail,
  type20Detail,
  numberedDetail,
  squareDetail,
];

export function getProductDetail(productId: string) {
  return productDetails.find((detail) => detail.productId === productId);
}

export function getProductDetailBySlug(slug: string) {
  const product = getProductBySlug(slug);
  return product ? getProductDetail(product.id) : undefined;
}
