import { getFamily, type CatalogFamily } from "./catalog.ts";
import { productApplications } from "./products.ts";
import { site } from "./site.ts";

export type AboutSourceRecord = {
  title: string;
  description: string;
  sourcePages: readonly number[];
};

export const aboutCompany = {
  name: site.companyName,
  description: "An industrial hinge manufacturer focused on weld-on hinge products, published catalog specifications and requirement-based production support.",
  sourcePages: [1, 3, 18],
} as const;

export const aboutFactoryIntroduction = {
  statement: "Factory-direct weld-on hinge manufacturing, from catalog models to confirmed custom requirements.",
  paragraphs: [
    `${site.companyName} manufactures industrial weld-on hinges for steel-door, cabinet, gate and trailer-door applications. Our range includes bearing, pin, gasket, grease-nipple, round, adjustable, square and flag structures, alongside the 20 Type and 12 / 14 / 16 Type series.`,
    "Our self-owned factory and equipment support lathe processing, automatic punching, mass assembly and standardized packaging. Product checking tools support inspection during production, with the hinge specification providing the reference for requirement discussions.",
    "For OEM, fabrication and distributor inquiries, we start with the required hinge structure, dimensions, quantity and application. Drawings and specifications help us review custom requirements. The proposed configuration and applicable packaging need to be confirmed for the selected product family.",
  ],
  sourcePages: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
} as const;

export const aboutProductIds = [
  "bearing",
  "pin",
  "grease-nipple",
  "adjustable",
  "20-type",
  "12-14-16-type",
] as const;

function requireFamily(id: (typeof aboutProductIds)[number]): CatalogFamily {
  const family = getFamily(id);
  if (!family) throw new Error(`Missing audited product family: ${id}`);
  return family;
}

export const aboutProducts = aboutProductIds.map(requireFamily);

export const aboutCapabilities = [
  { title: "Self-Owned Factory", description: "The catalog identifies a self-owned factory supporting the company’s hinge business.", sourcePages: [18] },
  { title: "Self-Owned Equipment", description: "Self-owned equipment is listed in the catalog company profile.", sourcePages: [3] },
  { title: "Lathe Processing", description: "Lathe processing is listed among the factory’s manufacturing capabilities.", sourcePages: [3] },
  { title: "Automatic Punching", description: "Automatic punching is listed as a production-processing capability.", sourcePages: [3] },
  { title: "Mass Assembly", description: "Mass assembly is listed as part of the production organization.", sourcePages: [3] },
  { title: "Standardized Packaging", description: "Standardized packaging is listed as part of order preparation.", sourcePages: [3] },
] as const satisfies readonly AboutSourceRecord[];

const supportedApplicationIds = [
  "steel-doors",
  "switch-cabinets",
  "control-cabinets",
  "network-cabinets",
  "industrial-cabinets",
  "gates",
  "trailer-doors",
  "ramps",
] as const;

export const aboutApplications = supportedApplicationIds.map((id) => {
  const application = productApplications.find((item) => item.id === id);
  if (!application) throw new Error(`Missing audited application: ${id}`);
  return application;
});

export const standardAndCustom = [
  {
    label: "Standard product range",
    title: "Review published families and dimensions",
    description: "Browse catalog product families, listed sizes and original technical references where they are available.",
    href: "/products",
    cta: "Browse Products",
    sourcePages: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
  {
    label: "Custom requirements",
    title: "Start with a drawing or required dimensions",
    description: "Send a drawing, dimensions or product requirement for review where customization is supported. The requested configuration remains subject to confirmation.",
    href: "/custom-hinges",
    cta: "Explore Custom Hinges",
    sourcePages: [8, 9, 10, 11, 12, 13, 14, 15, 18],
  },
] as const;

export const aboutQualityPoints = [
  { title: "Dimensional Checking", description: "Published dimensions or confirmed requirement dimensions can provide a practical checking reference.", sourcePages: [5, 7, 12, 18] },
  { title: "Specification Reference", description: "The applicable family record and original drawing help identify the dimensions being reviewed.", sourcePages: [5, 7, 12] },
  { title: "In-Process Checking", description: "The catalog describes tools developed to support checks during production.", sourcePages: [18] },
] as const satisfies readonly AboutSourceRecord[];

export const buyerReasons = [
  { title: "Manufacturing Capability", description: "A self-owned factory and the catalog-listed processing and assembly capabilities support hinge production.", sourcePages: [3, 18] },
  { title: "Focused Hinge Range", description: "The catalog documents multiple weld-on hinge structures with family-specific technical records.", sourcePages: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
  { title: "Customization Support", description: "Requirement-based development is described at company level, with explicit customization support on named product pages.", sourcePages: [8, 9, 10, 11, 12, 13, 14, 15, 18] },
  { title: "Production Checking", description: "Production-stage checking is described as part of the company’s quality approach.", sourcePages: [18] },
  { title: "Standardized Packaging", description: "Standardized packaging is listed at company level, with two series-specific examples documented separately.", sourcePages: [3, 16, 17] },
  { title: "Port-Adjacent Location", description: "The catalog describes the company location as adjacent to Shanghai Port and Ningbo Port.", sourcePages: [18] },
] as const satisfies readonly AboutSourceRecord[];

export const aboutLogistics = [
  { title: "Shanghai & Ningbo Port Proximity", description: "The catalog states that the company location is adjacent to Shanghai Port and Ningbo Port.", sourcePages: [18] },
  { title: "Highway Access", description: "Convenient transportation and a highway network are listed as logistics advantages.", sourcePages: [18] },
  { title: "Shipment Handling", description: "The catalog states that personnel are responsible for shipment handling.", sourcePages: [18] },
] as const satisfies readonly AboutSourceRecord[];

export const workingApproach = [
  { title: "Understand the application", description: "Identify the door, cabinet, gate, trailer-door or ramp context described for the requirement.", sourcePages: [4, 6] },
  { title: "Confirm required dimensions", description: "Use the relevant published dimensions or the dimensions provided with the requirement.", sourcePages: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18] },
  { title: "Produce to the confirmed requirement", description: "Requirement-based product development and production are described in the catalog.", sourcePages: [18] },
  { title: "Check during production", description: "Production-stage checking supports review against the available requirement.", sourcePages: [18] },
  { title: "Prepare for shipment", description: "Packaging preparation and shipment handling follow the applicable order requirement.", sourcePages: [3, 16, 17, 18] },
] as const satisfies readonly AboutSourceRecord[];

export const aboutNavigation = [
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Custom Hinges", href: "/custom-hinges" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Quality", href: "/quality" },
] as const;
