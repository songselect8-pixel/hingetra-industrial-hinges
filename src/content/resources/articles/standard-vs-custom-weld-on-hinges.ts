import { resourcePublisher } from "../publishing.ts";
import { resourceLink, type ResourceArticle } from "../types.ts";
import { illustrations } from "../../../data/illustrations.ts";

export const standardVsCustomHinges = {
  slug: "standard-vs-custom-weld-on-hinges",
  order: 5,
  title: "Standard vs Custom Weld-On Hinges: What Information Should Buyers Provide?",
  description: "Understand when to reference a standard catalog hinge and how to prepare a clear custom requirement with dimensions, drawings and application context.",
  category: "custom-manufacturing",
  publishedAt: "2026-09-02",
  updatedAt: null,
  author: resourcePublisher.name,
  featuredImage: illustrations.engineering.src,
  featuredImageAlt: illustrations.engineering.alt,
  featuredImageWidth: illustrations.engineering.width,
  featuredImageHeight: illustrations.engineering.height,
  keywords: ["custom weld-on hinges", "standard industrial hinges", "custom hinge drawing", "hinge specification request"],
  relatedProducts: ["round", "pin", "gasket", "grease-nipple", "adjustable", "square", "flag"],
  relatedApplications: [],
  relatedArticles: ["prepare-hinge-drawing-dimension-request", "how-to-choose-weld-on-hinges", "weld-on-hinge-sizes"],
  draft: false,
  noindex: false,
  featured: false,
  introduction: "A standard request points to an exact catalog record. A custom request begins with buyer requirements that differ from, or cannot yet be matched to, that record. Keeping those two paths distinct protects the accuracy of the technical discussion.",
  content: [
    { type: "heading", level: 2, id: "standard-catalog-request", title: "What makes a request a standard catalog inquiry?" },
    { type: "paragraph", content: ["A standard inquiry identifies a product family and an existing published entry without changing its notation. The buyer can name the family, model when present, exact size or parameters, application and estimated quantity. A link to the product detail page or the catalog source page gives the supplier a clear record to check."] },
    { type: "paragraph", content: ["The word standard should not imply unpublished characteristics. It only means the request corresponds to a listed catalog entry. Materials, project suitability and any other unprinted facts remain subjects for confirmation. Similar-looking products should not be treated as interchangeable, because their family, construction and dimension tables may differ."] },
    { type: "callout", label: "Standard request", content: ["Reference the family and exact published entry. Do not alter a model name, decimal value, compound size string or drawing symbol to describe a different requirement."] },

    { type: "heading", level: 2, id: "custom-review-boundary", title: "When does a requirement need custom review?" },
    { type: "paragraph", content: ["Custom review is appropriate when the requested dimension, profile or construction does not correspond to the chosen catalog entry, or when the buyer is working from its own drawing. The source explicitly states product customization support for seven families: round, pin, gasket, grease-nipple, adjustable, square and flag hinges. Those are the families that can carry a source-backed customization label on this website."] },
    { type: "paragraph", content: ["The source statement supports a requirements discussion. It does not define every available change, a development sequence or a delivery commitment. The responsible next step is requirement and specification confirmation. If another family lacks an explicit customization statement, a buyer may still send a requirement for review, but the site should not present that family as confirmed for customization."] },
    { type: "product-table", productIds: ["round", "pin", "gasket", "grease-nipple", "adjustable", "square", "flag"], title: "Catalog-backed customization families", description: "These seven families have explicit product customization wording on their catalog source pages. Exact feasibility remains subject to requirement review.", display: "catalog-examples" },

    { type: "heading", level: 2, id: "information-buyers-provide", title: "Information buyers should provide" },
    { type: "paragraph", content: ["A custom inquiry should make the difference from the catalog visible. If the buyer wants a different length, show the catalog reference and the required length in separate labeled fields. If the structure changes, provide a drawing with enough views to understand that change. Do not overwrite the catalog table and do not describe a custom value as an available catalog size."] },
    { type: "list", items: [
      ["Product family or closest catalog reference, including a page or product link."],
      ["Required dimensions with arrows, symbols, decimal places and confirmed units."],
      ["Front, side and section views where one view cannot explain the construction."],
      ["Application description and the fixed and moving fabricated parts."],
      ["Estimated quantity, destination country or region and buyer drawing reference."],
      ["Clearly marked open questions that require specification confirmation."],
    ] },
    { type: "paragraph", content: ["Reference photographs can be useful when they show an existing hinge or installation, but they should be paired with a drawing. Add a scale or measurement annotation instead of expecting dimensions to be estimated from the image. If the desired part is based on a physical sample, state which values were measured and where."] },
    { type: "image", src: illustrations.engineering.src, alt: illustrations.engineering.alt, width: illustrations.engineering.width, height: illustrations.engineering.height, caption: "Custom engineering support illustration for requirement and specification review.", evidence: "supporting-illustration" },

    { type: "heading", level: 2, id: "confirmation-workflow", title: "Use a conservative confirmation workflow" },
    { type: "paragraph", content: ["The website uses a simple sequence: requirement, drawing or specification, requirement and specification confirmation, manufacturing, inspection, packaging and shipment. This sequence communicates the information flow without promising a prototype stage or a particular timetable. Any manufacturing step remains tied to a confirmed requirement."] },
    { type: "comparison-table", caption: "Standard and custom request paths", columns: ["Area", "Standard catalog request", "Custom requirement"], rows: [
      ["Starting point", "Exact listed family and entry", "Closest reference plus buyer requirement"],
      ["Dimensions", "Copied from one source record", "Buyer values shown separately on a drawing"],
      ["Images", "Correct family photograph and source page", "Reference photos plus measurement views"],
      ["Decision step", "Confirm the requested record", "Requirement and specification confirmation"],
      ["Unknown facts", "Leave open for review", "Leave open for review"],
    ], note: "Neither path should be filled with assumptions where the catalog or buyer drawing is silent." },
    { type: "paragraph", content: ["The review may identify an existing catalog entry that already matches the request, or it may show that further technical information is needed. The result should be recorded against the buyer’s drawing revision so that later communication refers to the same requirement."] },

    { type: "heading", level: 2, id: "avoid-common-ambiguity", title: "Avoid common sources of ambiguity" },
    { type: "paragraph", content: ["Do not send only a generic family name such as weld-on hinge. Do not infer dimensions from a product photograph, combine records from different families or round a decimal value. Keep a model such as 12-A separate from its drawing parameter D. When a compound size string is used, retain its order and show how it maps to the drawing."] },
    { type: "paragraph", content: ["A concise, labeled request is more useful than a large unstructured file bundle. Put the current drawing revision first, identify the catalog reference and list open points. For a practical document checklist, see ", resourceLink("how to prepare a hinge drawing or dimension request", "/resources/prepare-hinge-drawing-dimension-request"), ". For catalog notation, review the ", resourceLink("weld-on hinge size guide", "/resources/weld-on-hinge-sizes"), "."] },
  ],
  keyTakeaways: [
    "A standard inquiry references one exact catalog family and published entry without changing its data.",
    "Explicit customization wording applies to round, pin, gasket, grease-nipple, adjustable, square and flag families.",
    "Customization support starts a requirement review; it does not define every possible change or a timetable.",
    "Show buyer-required dimensions separately and use requirement and specification confirmation language.",
  ],
} satisfies ResourceArticle;
