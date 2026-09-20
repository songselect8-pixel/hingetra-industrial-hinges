import { resourcePublisher } from "../publishing.ts";
import type { ResourceArticle } from "../types.ts";

export const bearingPinWasher = {
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
  "slug": "bearing-pin-washer-weld-on-hinges",
  "order": 8,
  "category": "selection-guides",
  "title": "Bearing, Pin and Washer Weld-On Hinges: What to Compare",
  "description": "Compare bearing, pin and gasket / washer weld-on hinge references by construction, dimensions and installation details, without assuming a performance ranking.",
  "featuredImage": "/images/hinge-bearing.jpg",
  "featuredImageAlt": "Catalog product photograph of the HINGETRA bearing weld-on hinge family",
  "keywords": [
    "bearing weld-on hinges",
    "pin weld-on hinges",
    "washer weld-on hinges",
    "gasket hinge"
  ],
  "relatedProducts": [
    "bearing",
    "pin",
    "gasket"
  ],
  "relatedArticles": [
    "how-to-choose-weld-on-hinges",
    "weld-on-hinge-sizes",
    "grease-fitting-weld-on-hinges"
  ],
  "introduction": "A bearing, a pin and a washer describe different details of a hinge. They are not three steps on a universal quality scale. Compare the actual construction and dimensions before deciding which reference to discuss for your door.",
  "content": [
    {
      "type": "heading",
      "level": 2,
      "id": "identify-the-detail",
      "title": "Identify the detail being described"
    },
    {
      "type": "paragraph",
      "content": [
        "Hinge suppliers distinguish products using construction details as well as overall shape. ",
        {
          "type": "link",
          "text": "PINET’s weld-on range",
          "href": "https://www.pinet-industrie.com/en/products/24875-weld-on-hinges-and-others"
        },
        " includes products described by pin, washer, bearing and grease-nipple features. Those descriptions identify its products; they do not establish the components or performance of another manufacturer’s hinge."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "For a HINGETRA inquiry, start with the bearing, pin or gasket family page and its drawing. The English catalog uses “gasket” for the named family. If your requirement calls for a washer, show the component you mean on the drawing so both sides are discussing the same detail."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "compare-three-families",
      "title": "Compare the three product records"
    },
    {
      "type": "product-table",
      "productIds": [
        "bearing",
        "pin",
        "gasket"
      ],
      "title": "Bearing, pin and gasket family references",
      "description": "Exact examples from each product family. Open the product page for its full drawing and size table.",
      "display": "catalog-examples"
    },
    {
      "type": "comparison-table",
      "caption": "Questions to ask about the construction",
      "columns": [
        "Reference",
        "Point to clarify"
      ],
      "rows": [
        [
          "Bearing",
          "Which internal arrangement is required? Identify it on the drawing."
        ],
        [
          "Pin",
          "What pin and body dimensions must match the installation?"
        ],
        [
          "Gasket / washer",
          "Which component does the name refer to, and what dimensions are required?"
        ]
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "A label such as bearing does not tell you every internal detail. Do not add “ball bearing” to an order unless that construction is confirmed. Likewise, the gasket family name does not establish a weather seal for the door or enclosure."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "compare-the-fit",
      "title": "Check fit before comparing preferences"
    },
    {
      "type": "paragraph",
      "content": [
        "Keep the assembled length, body profile and drawing parameters together for each candidate. If one part matches the length but places the hinge axis differently, it may not fit the same door edge. A section through the frame and door makes that difference easier to review."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "Published hinge weight is the mass of that entry. It is not a measure of how much door weight the assembly can carry. Explain the door dimensions, weight and hinge layout separately, and ask for review of the intended arrangement."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "If a drawing uses a compound size string, retain the full notation and mark the corresponding features. The ",
        {
          "type": "link",
          "text": "hinge size guide",
          "href": "/resources/weld-on-hinge-sizes"
        },
        " covers these checks."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "prepare-comparison",
      "title": "Send a comparison the supplier can answer"
    },
    {
      "type": "list",
      "items": [
        [
          "List the exact candidate families and sizes."
        ],
        [
          "Attach one current installation drawing for all candidates."
        ],
        [
          "Mark fixed dimensions and any feature that may change."
        ],
        [
          "Ask separately about removal, lubrication access or another requirement."
        ],
        [
          "Keep unanswered construction details as open points in the quotation review."
        ]
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "If lubrication access is part of the decision, read the ",
        {
          "type": "link",
          "text": "grease-fitting guide",
          "href": "/resources/grease-fitting-weld-on-hinges"
        },
        ". A fitting on the hinge is useful only if the chosen installation allows the required access."
      ]
    }
  ],
  "keyTakeaways": [
    "Compare the construction shown in each family drawing.",
    "Bearing and gasket names do not establish unlisted internal or sealing features.",
    "Keep product mass separate from the door’s requirements.",
    "Use one installation drawing when asking about several candidate hinges."
  ]
} satisfies ResourceArticle;
