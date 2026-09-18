type Illustration = {
  src: string;
  width: number;
  height: number;
  label: string;
  alt: string;
  kind: "illustration";
  isCompanyEvidence: false;
};

const sourceDimensions = { width: 1448, height: 1086, kind: "illustration", isCompanyEvidence: false } as const;

// These supplied scenes support an explanation. They are not company evidence
// and must never enter the actual product photography or specification data.
export const illustrations = {
  factory: {
    ...sourceDimensions,
    src: "/images/illustrations/hingetra-factory-exterior.png",
    label: "HINGETRA factory concept",
    alt: "AI-generated factory exterior concept with an entrance sign reading 铰拓工业 and HINGETRA",
  },
  manufacturing: {
    ...sourceDimensions,
    src: "/images/illustrations/manufacturing-capability.png",
    label: "Manufacturing process",
    alt: "Illustration of hinge components on a workbench with machining and punching equipment in the background",
  },
  quality: {
    ...sourceDimensions,
    src: "/images/illustrations/quality-control.png",
    label: "Dimensional inspection",
    alt: "Illustration of a hinge being measured with calipers during dimensional inspection",
  },
  engineering: {
    ...sourceDimensions,
    src: "/images/illustrations/custom-engineering.png",
    label: "Drawing & specification review",
    alt: "Illustration of a technical drawing being reviewed beside industrial hinges and measuring tools",
  },
  cabinets: {
    ...sourceDimensions,
    src: "/images/illustrations/application-control-cabinet.png",
    label: "Cabinet application",
    alt: "Illustration of two weld-on hinges along the door edge of an industrial control cabinet",
  },
  trailers: {
    ...sourceDimensions,
    src: "/images/illustrations/application-trailer-gate-catalog.png",
    label: "Trailer & gate application",
    alt: "Illustration of a weld-on hinge connecting a steel trailer gate to its frame",
  },
  packaging: {
    ...sourceDimensions,
    src: "/images/illustrations/packaging-shipping.png",
    label: "Industrial packaging",
    alt: "Illustration of hinges in film-lined cartons beside a strapped wooden case and outer cartons",
  },
} as const satisfies Record<string, Illustration>;

export type IllustrationKey = keyof typeof illustrations;
