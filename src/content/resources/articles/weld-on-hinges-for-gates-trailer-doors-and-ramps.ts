import { resourcePublisher } from "../publishing.ts";
import { resourceLink, type ResourceArticle } from "../types.ts";

export const gateTrailerRampHinges = {
  slug: "weld-on-hinges-for-gates-trailer-doors-and-ramps",
  order: 3,
  title: "Weld-On Hinges for Gates, Trailer Doors and Ramps",
  description: "Review the catalog-supported 12-A, 14-A and 16-A hinge series for gates, trailer doors and ramps, and prepare dimensions for selection support.",
  category: "application-guides",
  publishedAt: "2026-09-02",
  updatedAt: null,
  author: resourcePublisher.name,
  featuredImage: "/images/illustrations/application-trailer-gate-catalog.png",
  featuredImageAlt: "Industrial application illustration showing a weld-on hinge connection on a fabricated gate or trailer structure",
  featuredImageWidth: 1448,
  featuredImageHeight: 1086,
  keywords: ["weld-on hinges for gates", "trailer door hinges", "ramp weld-on hinges", "12 14 16 type hinges"],
  relatedProducts: ["12-14-16-type"],
  relatedApplications: ["gates", "trailer-doors", "ramps"],
  relatedArticles: ["how-to-choose-weld-on-hinges", "weld-on-hinge-sizes", "prepare-hinge-drawing-dimension-request"],
  draft: false,
  noindex: false,
  featured: false,
  introduction: "The catalog explicitly associates the 12 / 14 / 16 type weld-on hinge series with gates, trailer doors and ramps. Use that relationship as a starting point, then compare the exact model, drawing parameters and installation requirement.",
  content: [
    { type: "heading", level: 2, id: "catalog-relationship", title: "Begin with the catalog-supported application relationship" },
    { type: "paragraph", content: ["Catalog page 6 presents the 12-A, 14-A and 16-A models and names gates, trailer doors and ramps as applications. This is the direct source relationship for the family. It makes the series relevant for buyers working on these fabricated structures, but it does not establish that one model is automatically appropriate for every gate, trailer door or ramp."] },
    { type: "paragraph", content: ["Selection still requires the geometry of the moving part and fixed frame, the intended hinge position and the required catalog dimensions. A buyer should show whether the hinge bodies will be welded to flat edges, formed sections or another prepared surface. Photographs of the assembly can explain access and orientation, while a dimensioned drawing identifies the values that must be checked."] },
    { type: "image", src: "/images/illustrations/application-trailer-gate-catalog.png", alt: "Supporting industrial scene illustrating a weld-on hinge connection on a gate or trailer door structure", width: 1448, height: 1086, caption: "Industrial application illustration. Use the catalog drawing and buyer dimensions for product confirmation.", evidence: "supporting-illustration" },

    { type: "heading", level: 2, id: "compare-models", title: "Compare 12-A, 14-A and 16-A as separate models" },
    { type: "paragraph", content: ["The three model labels form one catalog series, but each row has its own parameter values. The labels 12, 14 and 16 are not replacements for the printed D parameters. The catalog gives D as 11.80 for 12-A, 13.80 for 14-A and 15.80 for 16-A. Those decimal values must remain unchanged when copied into a technical request."] },
    { type: "paragraph", content: ["The source table uses the drawing symbols D, D-1, L, d, L-1, c and L-2. Compare the complete row rather than choosing from one dimension alone. The table does not print a unit, so the values should be described as catalog values until the requirement is confirmed. This prevents an unprinted unit from being introduced into the technical record."] },
    { type: "product-table", productIds: ["12-14-16-type"], title: "12 / 14 / 16 type catalog records", description: "Review the original models and their complete published parameter rows. No intermediate models or values are implied.", display: "complete-records" },

    { type: "heading", level: 2, id: "installation-information", title: "Document the installation before requesting selection support" },
    { type: "paragraph", content: ["For a gate, show the post or frame and the moving leaf. For a trailer door, show the door edge, surrounding fabricated section and opening direction. For a ramp, show the joint area and the space available around the hinge. These application notes provide context; the supplier still needs dimensions to compare the requirement with the catalog."] },
    { type: "list", items: [
      ["Overall hinge length and relevant body dimensions, shown at their measurement positions."],
      ["The catalog model being considered, or a statement that no model has been selected."],
      ["A front and side view of the fixed and moving fabricated parts."],
      ["The desired opening direction and any physical clearance that affects the hinge position."],
      ["Estimated quantity, application name and any buyer drawing reference number."],
    ] },
    { type: "paragraph", content: ["Do not remove decimals or replace original symbols when transferring the values into an RFQ. If the buyer’s drawing uses different labels, add a simple mapping or marked view. The ", resourceLink("weld-on hinge size guide", "/resources/weld-on-hinge-sizes"), " explains why model names, parameters and units need separate treatment."] },

    { type: "heading", level: 2, id: "questions-to-review", title: "Questions to review for gates, trailer doors and ramps" },
    { type: "paragraph", content: ["A useful selection discussion separates confirmed facts from open questions. The application and basic arrangement may be known, while the exact hinge model remains open. Or the buyer may have selected a model but needs to confirm whether its complete geometry matches the fabrication. Organizing the request around these questions reduces the risk of matching by photograph alone."] },
    { type: "comparison-table", caption: "Application review checklist", columns: ["Review area", "Information to send", "What remains for confirmation"], rows: [
      ["Gate", "Frame and leaf drawings, hinge position, required dimensions", "Relevant model and geometry"],
      ["Trailer door", "Door-edge arrangement, opening direction, dimensions", "Catalog record correspondence"],
      ["Ramp", "Joint drawing, available space, required dimensions", "Model and installation fit"],
      ["Any structure", "Quantity, application, labeled photos and drawing", "Unpublished or unclear product facts"],
    ], note: "This checklist supports a requirements review; it does not make an application decision without the complete project information." },

    { type: "heading", level: 2, id: "move-to-rfq", title: "Move from application context to an RFQ" },
    { type: "paragraph", content: ["When the 12 / 14 / 16 type series is relevant, link the RFQ to the exact model and source drawing. Attach the buyer drawing and list every required value. If the requirement does not correspond to one of the published rows, state that clearly instead of altering a catalog value. The request can then be reviewed on its own technical basis."] },
    { type: "paragraph", content: ["Include the company, business email, country or region, product type, required size, estimated quantity and application. A short message should explain whether the inquiry is for a new fabrication or a replacement part. Follow the ", resourceLink("technical drawing request checklist", "/resources/prepare-hinge-drawing-dimension-request"), " so that the source of each measurement is visible."] },
    { type: "callout", label: "Source boundary", content: ["The catalog supports the application relationship and printed dimensions. Project-specific suitability remains a requirements and specification confirmation step."] },
  ],
  keyTakeaways: [
    "The catalog associates the 12 / 14 / 16 type series with gates, trailer doors and ramps.",
    "12-A, 14-A and 16-A are model names; use the complete printed parameter row for comparison.",
    "Show the fixed and moving structure, hinge position, opening direction and measurement locations.",
    "Treat the catalog relationship as a starting point and request review for the actual project dimensions.",
  ],
} satisfies ResourceArticle;
