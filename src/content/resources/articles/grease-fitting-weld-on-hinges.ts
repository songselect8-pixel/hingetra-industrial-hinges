import { resourcePublisher } from "../publishing.ts";
import type { ResourceArticle } from "../types.ts";

export const greaseFittingHinges = {
  "publishedAt": "2026-09-20",
  "updatedAt": null,
  "author": resourcePublisher.name,
  "featuredImageWidth": 800,
  "featuredImageHeight": 800,
  "relatedApplications": [
    "steel-doors",
    "control-cabinets"
  ],
  "draft": false,
  "noindex": false,
  "featured": false,
  "slug": "grease-fitting-weld-on-hinges",
  "order": 9,
  "category": "technical-guides",
  "title": "Weld-On Hinges with a Grease Fitting: What to Check Before Ordering",
  "description": "Check grease-fitting access, orientation and surrounding door geometry before ordering a grease-nipple weld-on hinge. Includes an inquiry checklist.",
  "featuredImage": "/images/hinge-grease-nipple.jpg",
  "featuredImageAlt": "HINGETRA grease-nipple weld-on hinge product photograph from the catalog",
  "keywords": [
    "grease fitting weld-on hinges",
    "grease nipple hinges",
    "greasable weld-on hinges"
  ],
  "relatedProducts": [
    "grease-nipple"
  ],
  "relatedArticles": [
    "bearing-pin-washer-weld-on-hinges",
    "weld-on-hinge-alignment-and-removal-clearance",
    "prepare-hinge-drawing-dimension-request"
  ],
  "introduction": "Check the fitting in the installed position, not just on the loose hinge. A frame return, door edge or nearby panel may occupy the space needed to reach it. Include that access in the drawing before choosing a size.",
  "content": [
    {
      "type": "heading",
      "level": 2,
      "id": "what-the-fitting-does",
      "title": "What the fitting tells you"
    },
    {
      "type": "paragraph",
      "content": [
        "A grease fitting provides a point for adding lubricant. It does not, by itself, specify the lubricant, amount or maintenance interval. Those details need to be confirmed for the actual hinge and application."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "As general industry context, ",
        {
          "type": "link",
          "text": "Guden’s weld-on selection guide",
          "href": "https://www.guden.com/selection-guides/weld-on-hinges"
        },
        " describes grease-fitting options for lubrication. HINGETRA’s own product reference is the grease-nipple family shown below; use its dimensions when preparing your inquiry."
      ]
    },
    {
      "type": "product-table",
      "productIds": [
        "grease-nipple"
      ],
      "title": "Grease-nipple family reference",
      "description": "Exact examples from each product family. Open the product page for its full drawing and size table.",
      "display": "catalog-examples"
    },
    {
      "type": "heading",
      "level": 2,
      "id": "check-installed-access",
      "title": "Draw the space around the fitting"
    },
    {
      "type": "paragraph",
      "content": [
        "Show the fitting relative to the door, frame and any adjacent panel. Include both the position used to access it and obstructions in that position. A photograph taken square to the hinge can help explain the available space, but label important dimensions on the drawing."
      ]
    },
    {
      "type": "list",
      "items": [
        [
          "Which way will the fitting face after installation?"
        ],
        [
          "Can the intended lubrication tool reach and connect to it?"
        ],
        [
          "Does the door need to be open to gain access?"
        ],
        [
          "Will another component be installed later in that space?"
        ]
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "The tool connection matters as well as visibility. A fitting that can be seen through a narrow gap may still be difficult to reach. Show the intended tool or its required access envelope if space is tight."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "confirm-product-details",
      "title": "Keep product details and maintenance questions separate"
    },
    {
      "type": "comparison-table",
      "caption": "Two parts of the inquiry",
      "columns": [
        "Product selection",
        "Maintenance clarification"
      ],
      "rows": [
        [
          "Exact family and size entry",
          "Appropriate lubricant for the confirmed product and use"
        ],
        [
          "Fitting location and installation drawing",
          "Access position and tool connection"
        ],
        [
          "Any requested dimensional change",
          "Maintenance instructions for the application"
        ]
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "Do not copy a lubrication interval from an unrelated hinge. If no interval or lubricant is stated for your selected product, include that as a question. Describe the operating environment and expected use so the supplier understands the request."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "send-the-inquiry",
      "title": "What to send before ordering"
    },
    {
      "type": "paragraph",
      "content": [
        "Attach the product reference, a door-and-frame view, the required quantity and the open maintenance questions. If a fitting location or dimension needs to change, mark the requested change rather than assuming it is included in the listed entry."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "Customization is listed for the grease-nipple family, with the specific request subject to Requirement / Specification Confirmation. Use the ",
        {
          "type": "link",
          "text": "drawing checklist",
          "href": "/resources/prepare-hinge-drawing-dimension-request"
        },
        " to organize the files. Also check ",
        {
          "type": "link",
          "text": "alignment and removal clearance",
          "href": "/resources/weld-on-hinge-alignment-and-removal-clearance"
        },
        " if the door must detach for service."
      ]
    }
  ],
  "keyTakeaways": [
    "Check fitting access in the completed installation.",
    "Include room for the intended tool connection.",
    "Confirm lubricant and maintenance instructions for the actual product.",
    "Mark any fitting or dimensional change for review before ordering."
  ]
} satisfies ResourceArticle;
