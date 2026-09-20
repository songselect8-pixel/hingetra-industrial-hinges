import { resourcePublisher } from "../publishing.ts";
import type { ResourceArticle } from "../types.ts";

export const prepareHingeDrawing = {
  "slug": "prepare-hinge-drawing-dimension-request",
  "order": 6,
  "title": "What to Include in a Hinge Drawing and RFQ",
  "description": "Prepare a hinge quote request with the right views, dimensions, revision and installation details. Includes a short RFQ outline and file checklist.",
  "category": "technical-guides",
  "publishedAt": "2026-09-02",
  "updatedAt": "2026-09-20",
  "author": resourcePublisher.name,
  "featuredImage": "/images/drawing-12-14-16-type.png",
  "featuredImageAlt": "Original catalog photograph and dimensional drawing for the 12-A, 14-A and 16-A hinge series",
  "featuredImageWidth": 546,
  "featuredImageHeight": 958,
  "keywords": [
    "hinge technical drawing",
    "hinge dimension request",
    "industrial hinge RFQ",
    "custom hinge drawing checklist"
  ],
  "relatedProducts": [
    "bearing",
    "pin",
    "gasket",
    "grease-nipple",
    "20-type",
    "12-14-16-type",
    "round",
    "adjustable",
    "square",
    "flag"
  ],
  "relatedApplications": [
    "steel-doors",
    "control-cabinets",
    "gates",
    "trailer-doors",
    "ramps"
  ],
  "relatedArticles": [
    "standard-vs-custom-weld-on-hinges",
    "weld-on-hinge-sizes",
    "weld-on-hinge-alignment-and-removal-clearance"
  ],
  "draft": false,
  "noindex": false,
  "featured": false,
  "introduction": "A clearly labeled sketch can start the discussion. It should identify the part, locate each measurement and explain how the hinge fits the assembly. A polished drawing with missing units is less useful than a simple sketch with those details.",
  "content": [
    {
      "type": "heading",
      "level": 2,
      "id": "identify-reference",
      "title": "Name the part and drawing revision"
    },
    {
      "type": "paragraph",
      "content": [
        "Put the product family and exact model or size at the top when referring to a listed hinge. If you do not know the family, label the drawing as a buyer requirement and include photographs. Do not select a family solely because its photograph looks similar."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "Give the drawing a reference and revision, even for a simple sketch. State whether dimensions are measured from an existing part or required for a new design. If the part is worn, mark that rather than treating every measured value as a new-part requirement."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "show-enough-views",
      "title": "Show the hinge and the installation"
    },
    {
      "type": "paragraph",
      "content": [
        "Use an overall view for length and body arrangement, and a side or section view for the profile and pin position. Add a section through the door and frame when their relationship affects the fit. Mark opening direction, intended mounting surfaces and nearby obstructions."
      ]
    },
    {
      "type": "image",
      "src": "/images/drawing-bearing-reference.png",
      "alt": "Original bearing hinge catalog reference drawing with multiple section views and dimension symbols",
      "width": 825,
      "height": 864,
      "caption": "Original catalog reference drawing. Keep its symbols and values unchanged when citing the source record.",
      "evidence": "catalog-drawing"
    },
    {
      "type": "paragraph",
      "content": [
        "Photographs help explain access and condition. They cannot reliably supply dimensions from perspective alone. Keep measurements on the sketch and use the photograph to show where the part sits."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "dimension-clearly",
      "title": "Locate each dimension and state its unit"
    },
    {
      "type": "list",
      "items": [
        [
          "Overall length and body dimensions, with arrows showing the endpoints."
        ],
        [
          "Pin or section details needed to distinguish the part."
        ],
        [
          "Required changes marked separately from the product reference."
        ],
        [
          "Units and the current drawing revision."
        ],
        [
          "Any missing measurement clearly labeled as needing confirmation."
        ]
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "Preserve the original symbols when quoting a product drawing. For example, 12-A is the model and 11.80 is its printed D value. The source table does not print a unit, so ask for confirmation. The ",
        {
          "type": "link",
          "text": "size guide",
          "href": "/resources/weld-on-hinge-sizes"
        },
        " covers this and other notation differences."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "add-application-context",
      "title": "Use this short inquiry outline"
    },
    {
      "type": "heading",
      "level": 3,
      "id": "hinge-quotation-details",
      "title": "What details should I include in a hinge quotation request?"
    },
    {
      "type": "paragraph",
      "content": [
        "Include the hinge reference or a marked sketch, quantity, intended use, and any material or finish requirements. Put units and a drawing revision on the sketch. For a replacement, add photographs of the existing part and its mounting position. List unknown details as questions so they can be resolved before ordering."
      ]
    },
    {
      "type": "list",
      "items": [
        [
          "Product reference: [product link, family and size, or buyer drawing reference]."
        ],
        [
          "Application: [door, cabinet, gate or other assembly; include the installation sketch]."
        ],
        [
          "Required change or question: [identify the feature or dimension]."
        ],
        [
          "Material or finish requirement: [state the required specification, or ask for confirmation]."
        ],
        [
          "Quantity and destination: [estimated quantity; country or region]."
        ],
        [
          "Attached drawing: [file name, drawing number and revision]."
        ],
        [
          "Open points: [information that still needs confirmation]."
        ]
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "A short message with these details is enough to start. Avoid sending several nearly identical files named “final” without marking the current one. If you revise a drawing, state what changed in the message."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "final-review",
      "title": "Check the files before submitting"
    },
    {
      "type": "paragraph",
      "content": [
        "Open the file once before uploading it. Check that the dimensions are legible, the correct revision is visible and the image is not cropped through a needed feature. Attach only files relevant to the inquiry and identify any photograph that shows a different reference part."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "On the ",
        {
          "type": "link",
          "text": "inquiry form",
          "href": "/contact#contact-rfq"
        },
        ", use Technical Drawing for a PDF, DWG, DXF, JPG or PNG, and Reference Image for a JPG or PNG. Each file field accepts a file up to 10 MB. After submitting, check the form’s result before assuming the inquiry has been received."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "If the request changes a listed hinge, the ",
        {
          "type": "link",
          "text": "standard versus custom guide",
          "href": "/resources/standard-vs-custom-weld-on-hinges"
        },
        " explains the confirmation step. If the part fits but the movement is uncertain, include the details from the ",
        {
          "type": "link",
          "text": "alignment and clearance guide",
          "href": "/resources/weld-on-hinge-alignment-and-removal-clearance"
        },
        "."
      ]
    }
  ],
  "keyTakeaways": [
    "Identify the part and current drawing revision.",
    "Show measurement positions and units, plus the door and frame when relevant.",
    "Separate existing measurements from required new dimensions.",
    "Attach the current files and check the submission result."
  ]
} satisfies ResourceArticle;
