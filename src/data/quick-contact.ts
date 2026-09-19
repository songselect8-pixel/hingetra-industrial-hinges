import { site } from "./site.ts";

// Contact channels supplied by the user on 2026-09-19.
export const quickContact = {
  whatsappNumber: "+86 15584143652",
  whatsappQrImage: "/contact/whatsapp-qr.png",
  email: "cindy@hingetra.com",
  isPlaceholder: false,
} as const;

export const quickContactLinks = {
  whatsapp: `https://wa.me/${quickContact.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${site.brand}, I would like to discuss an industrial hinge requirement.`)}`,
  email: `mailto:${quickContact.email}?subject=${encodeURIComponent(`${site.brand} industrial hinge inquiry`)}`,
} as const;
