import { resourcePublisher } from "../publishing.ts";
import type { ResourceArticle } from "../types.ts";

export const alignmentClearance = {
  "publishedAt": "2026-09-20",
  "updatedAt": null,
  "author": resourcePublisher.name,
  "featuredImageWidth": 800,
  "featuredImageHeight": 800,
  "relatedApplications": [],
  "draft": false,
  "noindex": false,
  "featured": false,
  "slug": "weld-on-hinge-alignment-and-removal-clearance",
  "order": 10,
  "category": "technical-guides",
  "title": "Weld-On Hinge Alignment and Removal Clearance",
  "description": "Check hinge-axis alignment, opening clearance and the space needed to separate a removable hinge. Prepare a useful door-and-frame drawing for review.",
  "featuredImage": "/images/hinge-pin.jpg",
  "featuredImageAlt": "HINGETRA pin-type weld-on hinge reference photograph from the product catalog",
  "keywords": [
    "weld-on hinge alignment",
    "lift-off hinge clearance",
    "removable hinge space",
    "weld-on hinge installation"
  ],
  "relatedProducts": [
    "pin"
  ],
  "relatedArticles": [
    "how-to-choose-weld-on-hinges",
    "weld-on-hinges-for-gates-trailer-doors-and-ramps",
    "weld-on-hinges-for-electrical-control-cabinets",
    "prepare-hinge-drawing-dimension-request"
  ],
  "introduction": "A door can have room to swing and still lack room to come off its hinges. Check the rotation path and, where the hinge separates, the removal path as two separate parts of the installation drawing.",
  "content": [
    {
      "type": "heading",
      "level": 2,
      "id": "align-the-axes",
      "title": "Put the hinge positions on one drawing"
    },
    {
      "type": "paragraph",
      "content": [
        "For a door carried by multiple hinges, their pivot axes need to work together. Show the proposed hinge positions and axis on the door-and-frame drawing. Checking each loose hinge separately does not establish that the assembled layout is aligned."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "link",
          "text": "Guden’s selection guidance",
          "href": "https://www.guden.com/selection-guides/weld-on-hinges"
        },
        " identifies pin alignment as an installation consideration. Apply that as a question for the assembly drawing; it does not supply a numerical alignment allowance for a HINGETRA product."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "opening-clearance",
      "title": "Check the opening path"
    },
    {
      "type": "paragraph",
      "content": [
        "Mark the required open and closed positions. Include the frame return, door fold, seals and nearby structures that could obstruct movement. If a narrow drawing crops away the surrounding assembly, add a wider view rather than assuming the area is clear."
      ]
    },
    {
      "type": "list",
      "items": [
        [
          "Where is the pivot axis relative to the door edge and frame?"
        ],
        [
          "What is the required open position?"
        ],
        [
          "Which nearby part comes closest during movement?"
        ],
        [
          "Does the door need space for another operation while open?"
        ]
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "removal-clearance",
      "title": "Check how a separable hinge comes apart"
    },
    {
      "type": "paragraph",
      "content": [
        "First confirm that the chosen construction is intended to separate in the way you need. For a design in which one half slides off a pin, the free path must allow the engaged parts to disengage. Base that distance on the actual hinge drawing rather than the overall body length."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "Show the removal direction and nearby obstruction on the same view. A top cover may limit an upward path; a neighboring assembly may limit a sideways path. Include the space needed to handle the door after the hinge parts separate."
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "Orientation also affects how a removable assembly remains engaged. ",
        {
          "type": "link",
          "text": "Guden’s removable-hinge guide",
          "href": "https://www.guden.com/selection-guides/removable-hinges"
        },
        " distinguishes vertical and horizontal arrangements. Have the complete arrangement, including any required retention, reviewed for its intended orientation."
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "id": "review-the-installation",
      "title": "Separate geometry review from welding instructions"
    },
    {
      "type": "paragraph",
      "content": [
        "This checklist identifies information for selection and installation planning. It does not define a weld procedure, fixture setting or acceptance measurement. Those depend on the actual part and fabrication requirements and should be specified by the person responsible for the assembly."
      ]
    },
    {
      "type": "comparison-table",
      "caption": "Views to include in the review",
      "columns": [
        "View",
        "Information to mark"
      ],
      "rows": [
        [
          "Whole door",
          "Hinge count, positions and pivot axis"
        ],
        [
          "Door-edge section",
          "Frame, moving panel, hinge position and nearby obstructions"
        ],
        [
          "Open position",
          "Required movement and remaining clearance"
        ],
        [
          "Removal position",
          "Direction, disengagement travel and handling space"
        ]
      ]
    },
    {
      "type": "paragraph",
      "content": [
        "For a new inquiry, attach these views with the exact product reference. For an existing installation, add photographs and describe where movement becomes restricted. The ",
        {
          "type": "link",
          "text": "drawing and RFQ guide",
          "href": "/resources/prepare-hinge-drawing-dimension-request"
        },
        " helps organize the request without guessing the missing dimensions."
      ]
    }
  ],
  "keyTakeaways": [
    "Check the combined hinge layout, not only each loose part.",
    "Opening clearance and removal clearance are separate checks.",
    "Confirm the separable construction and its actual disengagement path.",
    "Send the surrounding assembly geometry for review."
  ]
} satisfies ResourceArticle;
