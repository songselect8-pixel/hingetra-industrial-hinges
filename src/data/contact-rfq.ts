export type ContactRFQFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  productType: string;
  referenceProduct: string;
  size: string;
  quantity: string;
  application: string;
  requirementPath: string;
  technicalRequirements: string;
  referenceDescription: string;
  message: string;
};

export type ContactRFQFiles = {
  drawing: { name: string; size: number } | null;
  referenceImage: { name: string; size: number } | null;
};

export type ContactRFQErrors = Partial<Record<keyof ContactRFQFields | keyof ContactRFQFiles | "requirement" | "delivery", string>>;

export const initialContactRFQFields: ContactRFQFields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  productType: "",
  referenceProduct: "",
  size: "",
  quantity: "",
  application: "",
  requirementPath: "",
  technicalRequirements: "",
  referenceDescription: "",
  message: "",
};

const drawingExtensions = ["pdf", "dwg", "dxf", "jpg", "jpeg", "png"] as const;
const imageExtensions = ["jpg", "jpeg", "png"] as const;
const maxContactFileBytes = 10 * 1024 * 1024;

export const contactDrawingAccept = drawingExtensions.map((extension) => `.${extension}`).join(",");
export const contactImageAccept = imageExtensions.map((extension) => `.${extension}`).join(",");

export function validateContactFile(
  file: { name: string; size: number } | null,
  kind: keyof ContactRFQFiles,
): string | null {
  if (!file) return null;
  const extension = file.name.split(".").at(-1)?.toLowerCase();
  const allowed = kind === "drawing" ? drawingExtensions : imageExtensions;
  if (!extension || !allowed.some((candidate) => candidate === extension)) {
    return kind === "drawing"
      ? "Choose a PDF, DWG, DXF, JPG or PNG file."
      : "Choose a JPG or PNG reference image.";
  }
  if (!Number.isFinite(file.size) || file.size <= 0) return "This file is empty. Please choose a file with content.";
  if (file.size > maxContactFileBytes) return "Choose a file no larger than 10 MB.";
  return null;
}

function hasUsefulRequirement(fields: ContactRFQFields, files: ContactRFQFiles) {
  const usefulText = [
    fields.productType,
    fields.referenceProduct,
    fields.size,
    fields.application,
    fields.technicalRequirements,
    fields.referenceDescription,
    fields.message,
  ].some((value) => value.trim().length > 0);
  const usefulDrawing = Boolean(files.drawing && !validateContactFile(files.drawing, "drawing"));
  const usefulImage = Boolean(files.referenceImage && !validateContactFile(files.referenceImage, "referenceImage"));
  return usefulText || usefulDrawing || usefulImage;
}

export function validateContactRFQ(fields: ContactRFQFields, files: ContactRFQFiles): ContactRFQErrors {
  const errors: ContactRFQErrors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Please enter a valid email address.";
  if (!hasUsefulRequirement(fields, files)) errors.requirement = "Describe your requirement, select a product or attach a drawing / image.";

  const drawingIssue = validateContactFile(files.drawing, "drawing");
  const referenceImageIssue = validateContactFile(files.referenceImage, "referenceImage");
  if (drawingIssue) errors.drawing = drawingIssue;
  if (referenceImageIssue) errors.referenceImage = referenceImageIssue;
  return errors;
}
