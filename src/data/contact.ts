import { families } from "./catalog.ts";
import { site } from "./site.ts";
import { quickContact } from "./quick-contact.ts";

function configured(name: string, fallback: string) {
  return process.env[name]?.trim() || fallback;
}

export const contactDetails = {
  company: configured("CONTACT_COMPANY_NAME", site.companyName),
  contact: configured("CONTACT_PERSON_NAME", "Cindy"),
  email: configured("CONTACT_EMAIL", quickContact.email),
  phoneDisplay: configured("CONTACT_PHONE_DISPLAY", "+86 15584143652"),
  phoneHref: configured("CONTACT_PHONE_HREF", "+8615584143652"),
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
    answer: "Yes. Attach PDF, DWG, DXF, JPG or PNG files up to 10 MB each. Include a drawing revision where available, and check the submission result after sending.",
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
    question: "How are order quantity, samples and delivery dates agreed?",
    answer: "Minimum order quantity, sample availability and any charges, production lead time, packing and marking are confirmed for the specific hinge, quantity and destination. Include what you need in the inquiry so these points can be addressed in the quotation.",
  },
  {
    question: "How can I contact the company directly?",
    answer: "Use the email or phone details shown on this page and include the hinge requirement where possible.",
  },
] as const;
