import { resourcePublisher } from "../publishing.ts";
import { resourceLink, type ResourceArticle } from "../types.ts";

export const hingeMaterials = {
  slug: "weld-on-hinge-materials-and-finishes",
  order: 12,
  title: "Carbon Steel vs 304 and 316 Stainless Steel Weld-On Hinges",
  description: "Compare carbon steel, 304 and 316 stainless steel for a weld-on hinge inquiry: exposure, welding, finish and component requirements to confirm before ordering.",
  category: "technical-guides",
  publishedAt: "2026-10-12",
  updatedAt: null,
  author: resourcePublisher.name,
  featuredImage: "/images/hinge-round.jpg",
  featuredImageAlt: "Round weld-on hinge and separated pin from the HINGETRA catalog; the photograph does not identify a steel grade",
  featuredImageWidth: 800,
  featuredImageHeight: 800,
  keywords: ["carbon steel vs stainless steel weld-on hinges", "304 vs 316 hinge", "weld-on hinge materials", "hinge surface finish"],
  relatedProducts: ["round", "pin", "grease-nipple"],
  relatedApplications: [],
  relatedArticles: ["weld-on-vs-bolt-on-hinges", "prepare-hinge-drawing-dimension-request", "grease-fitting-weld-on-hinges"],
  draft: false,
  noindex: false,
  featured: false,
  introduction: "A request for a stainless hinge leaves several questions open: which grade, which components, what it will be welded to and where it will work. Carbon steel, 304 and 316 are useful starting points for that discussion. A complete specification also needs the finish and fabrication requirements.",
  content: [
    { type: "callout", label: "Before specifying a HINGETRA product", content: ["This is general material-selection guidance. HINGETRA has not published confirmed grades or finishes for each hinge family. Send a required grade as a requirement for review; the product photograph and family name do not confirm its availability."] },

    { type: "heading", level: 2, id: "materials-comparison", title: "Compare the material with the intended environment" },
    { type: "comparison-table", caption: "Questions to resolve before choosing a hinge material", columns: ["Candidate", "Selection starting point", "What the inquiry should settle"], rows: [
      ["Carbon steel", "Review the steel specification together with the proposed coating and exposure.", "Identify the body and pin grades, surface preparation, finish and treatment of the welded area."],
      ["304 stainless steel", "A widely used stainless family with good general corrosion resistance; suitability still depends on exposure.", "Describe moisture, cleaning chemicals and chloride exposure rather than specifying outdoor use alone."],
      ["316 stainless steel", "Molybdenum alloying improves resistance to some forms of localized corrosion compared with the basic 304 family.", "Confirm the environment and finished-joint requirements; 316 is not immune to chloride attack."],
    ], note: "These material families are comparison candidates, not a HINGETRA stock or availability list." },
    { type: "paragraph", content: [
      "Outokumpu’s ", resourceLink("Core 304 range", "https://www.outokumpu.com/en/products/product-ranges/core"),
      " and ", resourceLink("Supra 316 range", "https://www.outokumpu.com/en/products/product-ranges/supra"),
      " explain the distinction between the basic chromium-nickel grades and molybdenum-alloyed grades. Their descriptions concern the steel itself. They do not establish a finished hinge’s load capacity, surface condition or service life.",
    ] },

    { type: "heading", level: 2, id: "chlorides-and-cleaning", title: "Describe salt, moisture and cleaning conditions" },
    { type: "heading", level: 3, id: "stainless-rust-proof", title: "Does 316 make a weld-on hinge rust-proof?" },
    { type: "paragraph", content: ["No. Stainless steel can suffer localized corrosion in chloride-containing conditions. Temperature, deposits, crevices and surface condition matter as well as grade. A coastal gate, an intermittently washed enclosure and a continuously wet assembly are different requirements; describe the actual exposure."] },
    { type: "paragraph", content: [
      resourceLink("Outokumpu’s corrosion guidance", "https://www.outokumpu.com/en/expertise/stainless-basics/corrosion-resistance"),
      " identifies chlorides as a risk for pitting and crevice corrosion and stresses clean surfaces, weld-oxide removal and designs that avoid stagnant crevices. For a hinge inquiry, identify where water or debris may collect and how the assembly will be cleaned.",
    ] },
    { type: "paragraph", content: ["A steel name does not provide a salt-spray duration. If the project requires a corrosion test, specify the method, specimen condition and acceptance criteria, and ask whether a report is available for the proposed finished part. HINGETRA has no published hinge corrosion-test results to substitute for that review."] },

    { type: "heading", level: 2, id: "welding-and-finish", title: "Agree the welded joint and finishing sequence" },
    { type: "paragraph", content: [
      "The hinge body must be considered with the door or frame it will join. ",
      resourceLink("Outokumpu’s welding guide", "https://www.outokumpu.com/en/expertise/2021/welding-guide"),
      " explains why welding method, filler selection and post-weld treatment can affect the joint’s properties. Provide both base materials for review; the hinge label alone is not a welding instruction.",
    ] },
    { type: "paragraph", content: ["Keep the exact suffix when a drawing calls for 304L or 316L. These are low-carbon variants relevant to welded fabrication, rather than interchangeable spellings of 304 and 316. Ask the responsible fabricator to confirm the required grade and procedure for the assembly."] },
    { type: "list", items: [
      ["Identify whether the hinge is supplied unfinished or with an agreed surface treatment."],
      ["Show the intended weld area and identify any surface that must remain suitable for assembly."],
      ["Agree who performs cleaning and finishing after welding."],
      ["Keep the final finish description with the drawing revision and quotation."],
    ] },

    { type: "heading", level: 2, id: "specify-components", title: "Specify the body, pin and washer separately" },
    { type: "heading", level: 3, id: "all-parts-stainless", title: "Does a stainless body mean every hinge component is stainless?" },
    { type: "paragraph", content: ["Do not assume so. Identify the body, pin, washer or bearing and any fitting separately. A material stated for one component does not define the rest of the assembly. Ask for confirmation of the proposed combination before accepting it against your drawing."] },
    { type: "paragraph", content: [
      resourceLink("Guden’s weld-on selection guide", "https://www.guden.com/selection-guides/weld-on-hinges"),
      " lists combinations with different body and pin materials, illustrating why component-level descriptions matter. Those are Guden options, not HINGETRA specifications. Use a ",
      resourceLink("round barrel hinge", "/products/round-weld-on-hinges"),
      " or ", resourceLink("pin-type hinge", "/products/pin-weld-on-hinges"),
      " page to identify a HINGETRA construction, then attach your material requirements to that reference.",
    ] },

    { type: "heading", level: 2, id: "compare-material-quotes", title: "Request comparable material quotations" },
    { type: "paragraph", content: ["Keep geometry and quantity the same when asking about alternative materials. Compare the whole scope: component specifications, finish, fabrication work and required documents. A price comparison between an unfinished hinge and a finished assembly answers a different question from a material-only comparison."] },
    { type: "list", items: [
      ["Product family, complete size notation and current drawing revision."],
      ["Required grade for each identified component, or a clear request for selection advice."],
      ["Door and frame materials, exposure, cleaning conditions and intended finishing process."],
      ["Quantity and any material records or test documentation required with the order."],
    ] },
    { type: "paragraph", content: [
      "Use the ", resourceLink("drawing request checklist", "/resources/prepare-hinge-drawing-dimension-request"),
      " to assemble these details and ", resourceLink("send your requirement", "/contact#contact-rfq"),
      ". Specific materials, samples, timing and documentation remain subject to confirmation for the proposed order.",
    ] },
  ],
  keyTakeaways: [
    "Specify the environment and finish alongside the steel grade.",
    "304 and 316 are not blanket guarantees against corrosion.",
    "Confirm body, pin, washer or bearing and fitting requirements separately.",
    "Keep HINGETRA material availability and any required reports as quotation checks until confirmed.",
  ],
} satisfies ResourceArticle;
