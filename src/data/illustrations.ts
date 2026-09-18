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
    src: "/images/illustrations/manufacturing-capability-cn.png",
    label: "Manufacturing process",
    alt: "AI-generated scene of water-drop weld-on hinge components in turnover trays beside a worker and a conventional lathe in a Chinese workshop setting",
  },
  quality: {
    ...sourceDimensions,
    src: "/images/illustrations/quality-control-cn.png",
    label: "Dimensional inspection",
    alt: "AI-generated scene of a worker checking a water-drop weld-on hinge with digital calipers at a workshop inspection table",
  },
  engineering: {
    ...sourceDimensions,
    src: "/images/illustrations/custom-engineering-cn.png",
    label: "Drawing & specification review",
    alt: "AI-generated scene of a worker reviewing a requirement sketch beside water-drop weld-on hinges at a workshop office desk",
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
