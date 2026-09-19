import { site } from "./site.ts";

export const manufacturingIntroduction = {
  paragraphs: [
    `${site.companyName} operates a self-owned factory focused on weld-on hinge production. Our manufacturing capabilities include lathe processing, automatic punching, mass assembly and standardized packaging for the hinge structures and series shown in our catalog.`,
    "For standard models, catalog dimensions and original drawings provide the technical reference. For custom requirements, we review the proposed structure and dimensions before confirming a production specification. Production checks and the applicable packing method are discussed for the selected hinge family.",
  ],
  sourcePages: [3, 5, 7, 12, 16, 17, 18],
} as const;

export type ManufacturingSourceRecord = {
  title: string;
  description: string;
  sourcePages: readonly number[];
};

export const manufacturingCapabilities = [
  { id: "materials", title: "Sufficient materials", description: "Materials are maintained as part of production preparation.", sourcePages: [3] },
  { id: "equipment", title: "Self-owned equipment", description: "Factory equipment supports the production activities listed in the catalog.", sourcePages: [3] },
  { id: "stock", title: "Standing stock", description: "Standing stock is listed as part of the factory’s production organization.", sourcePages: [3] },
  { id: "lathe", title: "Lathe processing", description: "Lathe processing is listed among the factory capabilities used in hinge production.", sourcePages: [3] },
  { id: "punching", title: "Automatic punching", description: "Automatic punching is listed as a production-processing capability.", sourcePages: [3] },
  { id: "turnover", title: "Standardized turnover", description: "Standardized turnover is listed as part of production organization.", sourcePages: [3] },
  { id: "assembly", title: "Mass assembly", description: "Mass assembly supports the assembly of hinge products for industrial supply.", sourcePages: [3] },
  { id: "packaging", title: "Standardized packaging", description: "Standardized packaging is listed as part of order preparation.", sourcePages: [3] },
] as const;

export const manufacturingOrganization = [
  { title: "Standing Stock", description: "Standing stock is listed as a factory capability supporting production preparation.", sourcePages: [3] },
  { title: "Standardized Turnover", description: "Standardized turnover provides a documented basis for organized production handling.", sourcePages: [3] },
  { title: "Mass Assembly", description: "Mass assembly supports batch assembly without implying a published throughput figure.", sourcePages: [3] },
] as const satisfies readonly ManufacturingSourceRecord[];

export const companyEvidence = [
  { title: "Self-Owned Factory", description: "The catalog identifies a self-owned factory.", sourcePages: [18] },
  { title: "Self-Owned Equipment", description: "Self-owned equipment is listed in the company profile.", sourcePages: [3] },
  { title: "Design-to-Production Support", description: "The catalog describes support extending from design through production.", sourcePages: [18] },
  { title: "Custom Product Development", description: "The catalog states an ability to develop and produce products according to client requirements.", sourcePages: [18] },
] as const satisfies readonly ManufacturingSourceRecord[];

export const inProcessQuality = [
  { title: "Testing Tools", description: "The catalog describes testing tools intended for checks during production.", sourcePages: [18] },
  { title: "In-Process Checks", description: "Checks can be conducted during the production process according to the catalog statement.", sourcePages: [18] },
  { title: "Confirmed Requirements", description: "Share dimensions and checking requirements before production is discussed.", sourcePages: [18] },
] as const satisfies readonly ManufacturingSourceRecord[];

export const packagingRecords = [
  {
    id: "20-type",
    family: "20 Type series",
    title: "Inner cartons and corrugated outer packing",
    description: "Kraft-paper inner cartons use plastic-film lining. The documented outer carton uses corrugated paper, transparent sealing tape and packing tape.",
    image: "/images/packaging-20-type.jpg",
    imageAlt: "Actual catalog packaging for the 20 Type series with film-lined inner cartons, a corrugated outer carton, sealing tape and packing straps",
    sourcePage: 16,
  },
  {
    id: "12-14-16-type",
    family: "12 / 14 / 16 Type series",
    title: "Inner boxes and a strapped composite wooden case",
    description: "Folded inner boxes use plastic-film lining. The documented outer packing is a composite wooden case secured with two horizontal and one vertical packing belts.",
    image: "/images/packaging-12-14-16-type.jpg",
    imageAlt: "Actual catalog packaging for the 12, 14 and 16 Type series with film-lined inner boxes and a strapped composite wooden case",
    sourcePage: 17,
  },
] as const;

export const logisticsPoints = [
  { title: "Port Proximity", description: "The catalog states the location is adjacent to Shanghai Port and Ningbo Port.", sourcePages: [18] },
  { title: "Highway Transportation", description: "Convenient highway transportation is listed as a logistics advantage.", sourcePages: [18] },
  { title: "Shipment Handling", description: "The catalog states that professionals are responsible for shipment.", sourcePages: [18] },
] as const satisfies readonly ManufacturingSourceRecord[];

export const manufacturingSummary = [
  { capability: "Lathe Processing", function: "Component machining", sourcePages: [3] },
  { capability: "Automatic Punching", function: "Production processing", sourcePages: [3] },
  { capability: "Mass Assembly", function: "Batch assembly", sourcePages: [3] },
  { capability: "Inspection", function: "In-process checking", sourcePages: [18] },
  { capability: "Standardized Packaging", function: "Shipment preparation", sourcePages: [3, 16, 17] },
  { capability: "Custom Development", function: "Requirement-based production support", sourcePages: [18] },
] as const;

export const manufacturingFaqs = [
  {
    question: "Do you manufacture the hinges directly?",
    answer: "The catalog identifies a self-owned factory and self-owned equipment, and lists lathe processing, automatic punching, mass assembly and standardized packaging.",
    sourcePages: [3, 18],
  },
  {
    question: "Can you produce hinges based on customer requirements?",
    answer: "The catalog states an ability to develop and produce products according to client requirements. Send the available drawing and dimensions for review; the requested configuration still needs confirmation.",
    sourcePages: [18],
  },
  {
    question: "What manufacturing processes are shown in the catalog?",
    answer: "The company profile lists lathe processing, automatic punching, standardized turnover, mass assembly and standardized packaging, together with materials, stock and equipment capabilities.",
    sourcePages: [3],
  },
  {
    question: "How are products checked during production?",
    answer: "The catalog describes testing tools intended to allow checks during production. It does not publish a checking frequency or measured result.",
    sourcePages: [18],
  },
  {
    question: "How are hinges prepared for shipment?",
    answer: "The catalog documents different packaging for the 20 Type and 12 / 14 / 16 Type series. The applicable packing method should be confirmed with the hinge family and order requirement.",
    sourcePages: [16, 17],
  },
] as const;
