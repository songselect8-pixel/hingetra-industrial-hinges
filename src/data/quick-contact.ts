import { site } from "./site.ts";

// User-requested placeholders, 2026-09-19. Replace these together before launch.
// This reserved fictional number and .example mailbox do not belong to a buyer.
export const quickContact = {
  whatsappNumber: "+1 202 555 0143",
  email: "sales@hingetra.example",
  isPlaceholder: true,
} as const;

export const quickContactLinks = {
  whatsapp: `https://wa.me/${quickContact.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${site.brand}, I would like to discuss an industrial hinge requirement.`)}`,
  email: `mailto:${quickContact.email}?subject=${encodeURIComponent(`${site.brand} industrial hinge inquiry`)}`,
} as const;
