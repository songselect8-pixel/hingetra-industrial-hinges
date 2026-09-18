import { families } from "./catalog.ts";
import { site } from "./site.ts";

function configured(name: string, fallback: string) {
  return process.env[name]?.trim() || fallback;
}

export const contactDetails = {
  company: configured("CONTACT_COMPANY_NAME", site.companyName),
  contact: configured("CONTACT_PERSON_NAME", "Eric Huang"),
  email: configured("CONTACT_EMAIL", "hjhuman0205@gmail.com"),
  phoneDisplay: configured("CONTACT_PHONE_DISPLAY", "+86 18767359360"),
  phoneHref: configured("CONTACT_PHONE_HREF", "+8618767359360"),
  sourcePage: 19,
} as const;

export const contactProductOptions = [
  ...families.map((family) => ({ value: family.id, label: family.name })),
  { value: "other-custom", label: "Other / Custom Requirement" },
  { value: "not-sure", label: "Not Sure" },
] as const;

export const contactApplicationEntries = [
  { label: "Industrial Steel Doors", href: "/applications#industrial-steel-doors" },
  { label: "Gates", href: "/applications#gates-trailers-ramps" },
  { label: "Trailer Doors / Ramps", href: "/applications#gates-trailers-ramps" },
  { label: "Electrical & Control Cabinets", href: "/applications#electrical-control-cabinets" },
  { label: "Industrial Cabinets & Enclosures", href: "/applications#electrical-control-cabinets" },
] as const;

export const contactChecklist = [
  "Application",
  "Hinge type or reference product",
  "Required dimensions",
  "Estimated quantity",
  "Technical drawing if available",
  "Reference image if available",
  "Special structural requirement",
] as const;

export const contactFaq = [
  {
    question: "What information should I provide for a hinge quotation?",
    answer: "Include the hinge type or reference product, required dimensions, estimated quantity and application. Add a drawing or reference image where available.",
  },
  {
    question: "Can I upload a technical drawing?",
    answer: "Yes. The form accepts PDF, DWG, DXF, JPG and PNG files up to 10 MB. Files are transmitted only after an RFQ endpoint is configured.",
  },
  {
    question: "What if I do not know the hinge model?",
    answer: "Choose Not Sure and provide the application, required dimensions, estimated quantity and any available drawing or reference image for discussion.",
  },
  {
    question: "Can I request a different size from the catalog?",
    answer: "For product families with catalog-supported customization, send the required size, structure or drawing for review. The requested configuration remains subject to confirmation.",
  },
  {
    question: "Can I send a reference product photo?",
    answer: "Yes. A JPG or PNG reference image can be attached to help describe the product or installation context.",
  },
  {
    question: "How can I contact the company directly?",
    answer: "Use the catalog-confirmed email or phone details shown on this page and include the hinge requirement where possible.",
  },
] as const;
