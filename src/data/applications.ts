export type ApplicationMediaKind = "illustration" | "product-reference";

export type ApplicationOverviewItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  mediaKind: ApplicationMediaKind;
  mediaLabel: string;
  sourcePage: number;
  href: string;
  cta: string;
};

export type ApplicationGroup = {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  sourcePage: number;
  sourceLabel: string;
  supportedTerms: readonly string[];
  environment: string;
  considerations: readonly string[];
  characteristics: readonly string[];
  productIds: readonly string[];
  inquiryProductId: string;
  filterHref: string;
  detailMedia: {
    image: string;
    alt: string;
    label: string;
    presentation: "photograph" | "catalog-composite";
  };
};

export const waterDropApplicationProductIds = ["bearing", "pin", "gasket", "grease-nipple", "20-type"] as const;

export const applicationOverview: readonly ApplicationOverviewItem[] = [
  {
    id: "electrical-control-cabinets",
    title: "Electrical & Control Cabinets",
    description: "Switch, control, network, GGD and AE cabinet structures identified in the catalog.",
    image: "/images/illustrations/application-control-cabinet.png",
    alt: "Illustration of weld-on hinges positioned along the door edge of an industrial control cabinet",
    mediaKind: "illustration",
    mediaLabel: "Illustrative application view",
    sourcePage: 4,
    href: "#electrical-control-cabinets",
    cta: "Explore Cabinet Hinge Types",
  },
  {
    id: "gates-trailers-ramps",
    title: "Trailers, Gates & Heavy-Duty Doors",
    description: "A practical starting point for trailer doors, gates and ramps listed with the 12 / 14 / 16 Type series.",
    image: "/images/illustrations/application-trailer-gate-catalog.png",
    alt: "Illustration of a weld-on hinge connecting a steel trailer gate to its frame",
    mediaKind: "illustration",
    mediaLabel: "Illustrative application view",
    sourcePage: 6,
    href: "#gates-trailers-ramps",
    cta: "Explore Heavy-Duty Applications",
  },
  {
    id: "industrial-steel-doors",
    title: "Industrial Steel Doors",
    description: "Water-drop shaped weld-on hinge options for indoor and outdoor carbon steel doors.",
    image: "/images/hinge-bearing.jpg",
    alt: "Bearing-type water-drop weld-on hinge product photograph for steel-door selection reference",
    mediaKind: "product-reference",
    mediaLabel: "Real product reference",
    sourcePage: 4,
    href: "#industrial-steel-doors",
    cta: "Review Steel Door Considerations",
  },
  {
    id: "industrial-cabinets-enclosures",
    title: "Industrial Cabinets & Enclosures",
    description: "Product-led selection support for other welded metal cabinet and enclosure structures.",
    image: "/images/hinge-gasket.jpg",
    alt: "Gasket-type water-drop weld-on hinge product photograph for industrial cabinet selection reference",
    mediaKind: "product-reference",
    mediaLabel: "Real product reference",
    sourcePage: 4,
    href: "#electrical-control-cabinets",
    cta: "Review Cabinet Considerations",
  },
] as const;

export const applicationGroups: readonly ApplicationGroup[] = [
  {
    id: "electrical-control-cabinets",
    index: "01",
    title: "Electrical & Control Cabinets",
    shortTitle: "Cabinets & enclosures",
    sourcePage: 4,
    sourceLabel: "Water-drop shaped hinge application · catalog p4",
    supportedTerms: ["Switch cabinets", "Control cabinets", "Network cabinets", "GGD cabinets", "AE cabinets"],
    environment: "Welded steel cabinet structures where the hinge profile and installation dimensions must fit the available door-edge space.",
    considerations: ["Installation dimensions", "Available mounting space", "Required opening arrangement", "Drawing dimensions"],
    characteristics: ["Hinge profile / structure", "Published catalog size", "Weld-on mounting geometry"],
    productIds: waterDropApplicationProductIds,
    inquiryProductId: "custom",
    filterHref: "/products?application=control-cabinets",
    detailMedia: {
      image: "/images/hinge-bearing-detail.jpg",
      alt: "Bearing-type weld-on hinge product photograph with assembled and separated body sections",
      label: "Bearing-type product reference",
      presentation: "photograph",
    },
  },
  {
    id: "gates-trailers-ramps",
    index: "02",
    title: "Gates, Trailer Doors & Ramps",
    shortTitle: "Gates, trailers & ramps",
    sourcePage: 6,
    sourceLabel: "12 / 14 / 16 Type application · catalog p6",
    supportedTerms: ["Trailer doors", "Gates", "Ramps"],
    environment: "Welded steel door and frame assemblies in the gate, trailer-door and ramp applications named in the catalog.",
    considerations: ["Hinge size", "Door and frame structure", "Mounting geometry", "Quantity and application drawing"],
    characteristics: ["12-A / 14-A / 16-A configuration", "Published drawing dimensions", "Required hinge arrangement"],
    productIds: ["12-14-16-type"],
    inquiryProductId: "12-14-16-type",
    filterHref: "/products?application=trailer-doors",
    detailMedia: {
      image: "/images/drawing-12-14-16-type.png",
      alt: "Original 12 / 14 / 16 Type catalog product photograph and dimensional drawing",
      label: "Original catalog drawing · p6",
      presentation: "catalog-composite",
    },
  },
  {
    id: "industrial-steel-doors",
    index: "03",
    title: "Indoor & Outdoor Carbon Steel Doors",
    shortTitle: "Carbon steel doors",
    sourcePage: 4,
    sourceLabel: "Water-drop shaped hinge application · catalog p4",
    supportedTerms: ["Indoor carbon steel doors", "Outdoor carbon steel doors"],
    environment: "Carbon steel door structures identified in the catalog for weld-on hinge installation.",
    considerations: ["Door-edge geometry", "Installation dimensions", "Available mounting space", "Required hinge configuration"],
    characteristics: ["Water-drop hinge profile", "Published catalog dimensions", "Weld-on installation arrangement"],
    productIds: waterDropApplicationProductIds,
    inquiryProductId: "custom",
    filterHref: "/products?application=steel-doors",
    detailMedia: {
      image: "/images/hinge-pin.jpg",
      alt: "Pin-type water-drop weld-on hinge product photograph with separated hinge body and pin",
      label: "Pin-type product reference",
      presentation: "photograph",
    },
  },
] as const;

export const selectionInputs = [
  "Application",
  "Hinge type or reference image",
  "Required dimensions",
  "Door / cabinet structure",
  "Estimated quantity",
  "Technical drawing if available",
] as const;
