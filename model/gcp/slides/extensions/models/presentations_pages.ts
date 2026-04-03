// Auto-generated extension model for @swamp/gcp/slides/presentations-pages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://slides.googleapis.com/";

const GET_CONFIG = {
  "id": "slides.presentations.pages.get",
  "path": "v1/presentations/{presentationId}/pages/{pageObjectId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "presentationId",
    "pageObjectId",
  ],
  "parameters": {
    "pageObjectId": {
      "location": "path",
      "required": true,
    },
    "presentationId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  layoutProperties: z.object({
    displayName: z.string(),
    masterObjectId: z.string(),
    name: z.string(),
  }).optional(),
  masterProperties: z.object({
    displayName: z.string(),
  }).optional(),
  notesProperties: z.object({
    speakerNotesObjectId: z.string(),
  }).optional(),
  objectId: z.string().optional(),
  pageElements: z.array(z.object({
    description: z.string(),
    elementGroup: z.object({
      children: z.array(z.string()),
    }),
    image: z.object({
      contentUrl: z.string(),
      imageProperties: z.object({
        brightness: z.number(),
        contrast: z.number(),
        cropProperties: z.object({
          angle: z.number(),
          bottomOffset: z.number(),
          leftOffset: z.number(),
          rightOffset: z.number(),
          topOffset: z.number(),
        }),
        link: z.object({
          pageObjectId: z.string(),
          relativeLink: z.string(),
          slideIndex: z.number(),
          url: z.string(),
        }),
        outline: z.object({
          dashStyle: z.string(),
          outlineFill: z.object({
            solidFill: z.object({
              alpha: z.number(),
              color: z.object({
                rgbColor: z.object({
                  blue: z.number(),
                  green: z.number(),
                  red: z.number(),
                }),
                themeColor: z.string(),
              }),
            }),
          }),
          propertyState: z.string(),
          weight: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
        }),
        recolor: z.object({
          name: z.string(),
          recolorStops: z.array(z.object({
            alpha: z.number(),
            color: z.object({
              rgbColor: z.object({
                blue: z.number(),
                green: z.number(),
                red: z.number(),
              }),
              themeColor: z.string(),
            }),
            position: z.number(),
          })),
        }),
        shadow: z.object({
          alignment: z.string(),
          alpha: z.number(),
          blurRadius: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
          color: z.object({
            rgbColor: z.object({
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            themeColor: z.string(),
          }),
          propertyState: z.string(),
          rotateWithShape: z.boolean(),
          transform: z.object({
            scaleX: z.number(),
            scaleY: z.number(),
            shearX: z.number(),
            shearY: z.number(),
            translateX: z.number(),
            translateY: z.number(),
            unit: z.string(),
          }),
          type: z.string(),
        }),
        transparency: z.number(),
      }),
      placeholder: z.object({
        index: z.number(),
        parentObjectId: z.string(),
        type: z.string(),
      }),
      sourceUrl: z.string(),
    }),
    line: z.object({
      lineCategory: z.string(),
      lineProperties: z.object({
        dashStyle: z.string(),
        endArrow: z.string(),
        endConnection: z.object({
          connectedObjectId: z.string(),
          connectionSiteIndex: z.number(),
        }),
        lineFill: z.object({
          solidFill: z.object({
            alpha: z.number(),
            color: z.object({
              rgbColor: z.object({
                blue: z.number(),
                green: z.number(),
                red: z.number(),
              }),
              themeColor: z.string(),
            }),
          }),
        }),
        link: z.object({
          pageObjectId: z.string(),
          relativeLink: z.string(),
          slideIndex: z.number(),
          url: z.string(),
        }),
        startArrow: z.string(),
        startConnection: z.object({
          connectedObjectId: z.string(),
          connectionSiteIndex: z.number(),
        }),
        weight: z.object({
          magnitude: z.number(),
          unit: z.string(),
        }),
      }),
      lineType: z.string(),
    }),
    objectId: z.string(),
    shape: z.object({
      placeholder: z.object({
        index: z.number(),
        parentObjectId: z.string(),
        type: z.string(),
      }),
      shapeProperties: z.object({
        autofit: z.object({
          autofitType: z.string(),
          fontScale: z.number(),
          lineSpacingReduction: z.number(),
        }),
        contentAlignment: z.string(),
        link: z.object({
          pageObjectId: z.string(),
          relativeLink: z.string(),
          slideIndex: z.number(),
          url: z.string(),
        }),
        outline: z.object({
          dashStyle: z.string(),
          outlineFill: z.object({
            solidFill: z.object({
              alpha: z.number(),
              color: z.object({
                rgbColor: z.object({
                  blue: z.number(),
                  green: z.number(),
                  red: z.number(),
                }),
                themeColor: z.string(),
              }),
            }),
          }),
          propertyState: z.string(),
          weight: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
        }),
        shadow: z.object({
          alignment: z.string(),
          alpha: z.number(),
          blurRadius: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
          color: z.object({
            rgbColor: z.object({
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            themeColor: z.string(),
          }),
          propertyState: z.string(),
          rotateWithShape: z.boolean(),
          transform: z.object({
            scaleX: z.number(),
            scaleY: z.number(),
            shearX: z.number(),
            shearY: z.number(),
            translateX: z.number(),
            translateY: z.number(),
            unit: z.string(),
          }),
          type: z.string(),
        }),
        shapeBackgroundFill: z.object({
          propertyState: z.string(),
          solidFill: z.object({
            alpha: z.number(),
            color: z.object({
              rgbColor: z.object({
                blue: z.number(),
                green: z.number(),
                red: z.number(),
              }),
              themeColor: z.string(),
            }),
          }),
        }),
      }),
      shapeType: z.string(),
      text: z.object({
        lists: z.record(z.string(), z.unknown()),
        textElements: z.array(z.object({
          autoText: z.object({
            content: z.string(),
            style: z.object({
              backgroundColor: z.object({
                opaqueColor: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
              baselineOffset: z.string(),
              bold: z.boolean(),
              fontFamily: z.string(),
              fontSize: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              foregroundColor: z.object({
                opaqueColor: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
              italic: z.boolean(),
              link: z.object({
                pageObjectId: z.string(),
                relativeLink: z.string(),
                slideIndex: z.number(),
                url: z.string(),
              }),
              smallCaps: z.boolean(),
              strikethrough: z.boolean(),
              underline: z.boolean(),
              weightedFontFamily: z.object({
                fontFamily: z.string(),
                weight: z.number(),
              }),
            }),
            type: z.string(),
          }),
          endIndex: z.number(),
          paragraphMarker: z.object({
            bullet: z.object({
              bulletStyle: z.object({
                backgroundColor: z.object({
                  opaqueColor: z.object({
                    rgbColor: z.object({
                      blue: z.number(),
                      green: z.number(),
                      red: z.number(),
                    }),
                    themeColor: z.string(),
                  }),
                }),
                baselineOffset: z.string(),
                bold: z.boolean(),
                fontFamily: z.string(),
                fontSize: z.object({
                  magnitude: z.number(),
                  unit: z.string(),
                }),
                foregroundColor: z.object({
                  opaqueColor: z.object({
                    rgbColor: z.object({
                      blue: z.number(),
                      green: z.number(),
                      red: z.number(),
                    }),
                    themeColor: z.string(),
                  }),
                }),
                italic: z.boolean(),
                link: z.object({
                  pageObjectId: z.string(),
                  relativeLink: z.string(),
                  slideIndex: z.number(),
                  url: z.string(),
                }),
                smallCaps: z.boolean(),
                strikethrough: z.boolean(),
                underline: z.boolean(),
                weightedFontFamily: z.object({
                  fontFamily: z.string(),
                  weight: z.number(),
                }),
              }),
              glyph: z.string(),
              listId: z.string(),
              nestingLevel: z.number(),
            }),
            style: z.object({
              alignment: z.string(),
              direction: z.string(),
              indentEnd: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              indentFirstLine: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              indentStart: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              lineSpacing: z.number(),
              spaceAbove: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              spaceBelow: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              spacingMode: z.string(),
            }),
          }),
          startIndex: z.number(),
          textRun: z.object({
            content: z.string(),
            style: z.object({
              backgroundColor: z.object({
                opaqueColor: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
              baselineOffset: z.string(),
              bold: z.boolean(),
              fontFamily: z.string(),
              fontSize: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              foregroundColor: z.object({
                opaqueColor: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
              italic: z.boolean(),
              link: z.object({
                pageObjectId: z.string(),
                relativeLink: z.string(),
                slideIndex: z.number(),
                url: z.string(),
              }),
              smallCaps: z.boolean(),
              strikethrough: z.boolean(),
              underline: z.boolean(),
              weightedFontFamily: z.object({
                fontFamily: z.string(),
                weight: z.number(),
              }),
            }),
          }),
        })),
      }),
    }),
    sheetsChart: z.object({
      chartId: z.number(),
      contentUrl: z.string(),
      sheetsChartProperties: z.object({
        chartImageProperties: z.object({
          brightness: z.number(),
          contrast: z.number(),
          cropProperties: z.object({
            angle: z.number(),
            bottomOffset: z.number(),
            leftOffset: z.number(),
            rightOffset: z.number(),
            topOffset: z.number(),
          }),
          link: z.object({
            pageObjectId: z.string(),
            relativeLink: z.string(),
            slideIndex: z.number(),
            url: z.string(),
          }),
          outline: z.object({
            dashStyle: z.string(),
            outlineFill: z.object({
              solidFill: z.object({
                alpha: z.number(),
                color: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
            }),
            propertyState: z.string(),
            weight: z.object({
              magnitude: z.number(),
              unit: z.string(),
            }),
          }),
          recolor: z.object({
            name: z.string(),
            recolorStops: z.array(z.object({
              alpha: z.number(),
              color: z.object({
                rgbColor: z.object({
                  blue: z.number(),
                  green: z.number(),
                  red: z.number(),
                }),
                themeColor: z.string(),
              }),
              position: z.number(),
            })),
          }),
          shadow: z.object({
            alignment: z.string(),
            alpha: z.number(),
            blurRadius: z.object({
              magnitude: z.number(),
              unit: z.string(),
            }),
            color: z.object({
              rgbColor: z.object({
                blue: z.number(),
                green: z.number(),
                red: z.number(),
              }),
              themeColor: z.string(),
            }),
            propertyState: z.string(),
            rotateWithShape: z.boolean(),
            transform: z.object({
              scaleX: z.number(),
              scaleY: z.number(),
              shearX: z.number(),
              shearY: z.number(),
              translateX: z.number(),
              translateY: z.number(),
              unit: z.string(),
            }),
            type: z.string(),
          }),
          transparency: z.number(),
        }),
      }),
      spreadsheetId: z.string(),
    }),
    size: z.object({
      height: z.object({
        magnitude: z.number(),
        unit: z.string(),
      }),
      width: z.object({
        magnitude: z.number(),
        unit: z.string(),
      }),
    }),
    speakerSpotlight: z.object({
      speakerSpotlightProperties: z.object({
        outline: z.object({
          dashStyle: z.string(),
          outlineFill: z.object({
            solidFill: z.object({
              alpha: z.number(),
              color: z.object({
                rgbColor: z.object({
                  blue: z.number(),
                  green: z.number(),
                  red: z.number(),
                }),
                themeColor: z.string(),
              }),
            }),
          }),
          propertyState: z.string(),
          weight: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
        }),
        shadow: z.object({
          alignment: z.string(),
          alpha: z.number(),
          blurRadius: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
          color: z.object({
            rgbColor: z.object({
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            themeColor: z.string(),
          }),
          propertyState: z.string(),
          rotateWithShape: z.boolean(),
          transform: z.object({
            scaleX: z.number(),
            scaleY: z.number(),
            shearX: z.number(),
            shearY: z.number(),
            translateX: z.number(),
            translateY: z.number(),
            unit: z.string(),
          }),
          type: z.string(),
        }),
      }),
    }),
    table: z.object({
      columns: z.number(),
      horizontalBorderRows: z.array(z.object({
        tableBorderCells: z.array(z.object({
          location: z.object({
            columnIndex: z.number(),
            rowIndex: z.number(),
          }),
          tableBorderProperties: z.object({
            dashStyle: z.string(),
            tableBorderFill: z.object({
              solidFill: z.object({
                alpha: z.number(),
                color: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
            }),
            weight: z.object({
              magnitude: z.number(),
              unit: z.string(),
            }),
          }),
        })),
      })),
      rows: z.number(),
      tableColumns: z.array(z.object({
        columnWidth: z.object({
          magnitude: z.number(),
          unit: z.string(),
        }),
      })),
      tableRows: z.array(z.object({
        rowHeight: z.object({
          magnitude: z.number(),
          unit: z.string(),
        }),
        tableCells: z.array(z.object({
          columnSpan: z.number(),
          location: z.object({
            columnIndex: z.number(),
            rowIndex: z.number(),
          }),
          rowSpan: z.number(),
          tableCellProperties: z.object({
            contentAlignment: z.string(),
            tableCellBackgroundFill: z.object({
              propertyState: z.string(),
              solidFill: z.object({
                alpha: z.number(),
                color: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
            }),
          }),
          text: z.object({
            lists: z.record(z.string(), z.unknown()),
            textElements: z.array(z.object({
              autoText: z.object({
                content: z.string(),
                style: z.object({
                  backgroundColor: z.object({
                    opaqueColor: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                  baselineOffset: z.string(),
                  bold: z.boolean(),
                  fontFamily: z.string(),
                  fontSize: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  foregroundColor: z.object({
                    opaqueColor: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                  italic: z.boolean(),
                  link: z.object({
                    pageObjectId: z.string(),
                    relativeLink: z.string(),
                    slideIndex: z.number(),
                    url: z.string(),
                  }),
                  smallCaps: z.boolean(),
                  strikethrough: z.boolean(),
                  underline: z.boolean(),
                  weightedFontFamily: z.object({
                    fontFamily: z.string(),
                    weight: z.number(),
                  }),
                }),
                type: z.string(),
              }),
              endIndex: z.number(),
              paragraphMarker: z.object({
                bullet: z.object({
                  bulletStyle: z.object({
                    backgroundColor: z.object({
                      opaqueColor: z.object({
                        rgbColor: z.object({
                          blue: z.number(),
                          green: z.number(),
                          red: z.number(),
                        }),
                        themeColor: z.string(),
                      }),
                    }),
                    baselineOffset: z.string(),
                    bold: z.boolean(),
                    fontFamily: z.string(),
                    fontSize: z.object({
                      magnitude: z.number(),
                      unit: z.string(),
                    }),
                    foregroundColor: z.object({
                      opaqueColor: z.object({
                        rgbColor: z.object({
                          blue: z.number(),
                          green: z.number(),
                          red: z.number(),
                        }),
                        themeColor: z.string(),
                      }),
                    }),
                    italic: z.boolean(),
                    link: z.object({
                      pageObjectId: z.string(),
                      relativeLink: z.string(),
                      slideIndex: z.number(),
                      url: z.string(),
                    }),
                    smallCaps: z.boolean(),
                    strikethrough: z.boolean(),
                    underline: z.boolean(),
                    weightedFontFamily: z.object({
                      fontFamily: z.string(),
                      weight: z.number(),
                    }),
                  }),
                  glyph: z.string(),
                  listId: z.string(),
                  nestingLevel: z.number(),
                }),
                style: z.object({
                  alignment: z.string(),
                  direction: z.string(),
                  indentEnd: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  indentFirstLine: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  indentStart: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  lineSpacing: z.number(),
                  spaceAbove: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  spaceBelow: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  spacingMode: z.string(),
                }),
              }),
              startIndex: z.number(),
              textRun: z.object({
                content: z.string(),
                style: z.object({
                  backgroundColor: z.object({
                    opaqueColor: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                  baselineOffset: z.string(),
                  bold: z.boolean(),
                  fontFamily: z.string(),
                  fontSize: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  foregroundColor: z.object({
                    opaqueColor: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                  italic: z.boolean(),
                  link: z.object({
                    pageObjectId: z.string(),
                    relativeLink: z.string(),
                    slideIndex: z.number(),
                    url: z.string(),
                  }),
                  smallCaps: z.boolean(),
                  strikethrough: z.boolean(),
                  underline: z.boolean(),
                  weightedFontFamily: z.object({
                    fontFamily: z.string(),
                    weight: z.number(),
                  }),
                }),
              }),
            })),
          }),
        })),
        tableRowProperties: z.object({
          minRowHeight: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
        }),
      })),
      verticalBorderRows: z.array(z.object({
        tableBorderCells: z.array(z.object({
          location: z.object({
            columnIndex: z.number(),
            rowIndex: z.number(),
          }),
          tableBorderProperties: z.object({
            dashStyle: z.string(),
            tableBorderFill: z.object({
              solidFill: z.object({
                alpha: z.number(),
                color: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
            }),
            weight: z.object({
              magnitude: z.number(),
              unit: z.string(),
            }),
          }),
        })),
      })),
    }),
    title: z.string(),
    transform: z.object({
      scaleX: z.number(),
      scaleY: z.number(),
      shearX: z.number(),
      shearY: z.number(),
      translateX: z.number(),
      translateY: z.number(),
      unit: z.string(),
    }),
    video: z.object({
      id: z.string(),
      source: z.string(),
      url: z.string(),
      videoProperties: z.object({
        autoPlay: z.boolean(),
        end: z.number(),
        mute: z.boolean(),
        outline: z.object({
          dashStyle: z.string(),
          outlineFill: z.object({
            solidFill: z.object({
              alpha: z.number(),
              color: z.object({
                rgbColor: z.object({
                  blue: z.number(),
                  green: z.number(),
                  red: z.number(),
                }),
                themeColor: z.string(),
              }),
            }),
          }),
          propertyState: z.string(),
          weight: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
        }),
        start: z.number(),
      }),
    }),
    wordArt: z.object({
      renderedText: z.string(),
    }),
  })).optional(),
  pageProperties: z.object({
    colorScheme: z.object({
      colors: z.array(z.object({
        color: z.object({
          blue: z.number(),
          green: z.number(),
          red: z.number(),
        }),
        type: z.string(),
      })),
    }),
    pageBackgroundFill: z.object({
      propertyState: z.string(),
      solidFill: z.object({
        alpha: z.number(),
        color: z.object({
          rgbColor: z.object({
            blue: z.number(),
            green: z.number(),
            red: z.number(),
          }),
          themeColor: z.string(),
        }),
      }),
      stretchedPictureFill: z.object({
        contentUrl: z.string(),
        size: z.object({
          height: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
          width: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
        }),
      }),
    }),
  }).optional(),
  pageType: z.string().optional(),
  revisionId: z.string().optional(),
  slideProperties: z.object({
    isSkipped: z.boolean(),
    layoutObjectId: z.string(),
    masterObjectId: z.string(),
    notesPage: z.object({
      layoutProperties: z.object({
        displayName: z.string(),
        masterObjectId: z.string(),
        name: z.string(),
      }),
      masterProperties: z.object({
        displayName: z.string(),
      }),
      notesProperties: z.object({
        speakerNotesObjectId: z.string(),
      }),
      objectId: z.string(),
      pageElements: z.array(z.object({
        description: z.string(),
        elementGroup: z.object({
          children: z.array(z.string()),
        }),
        image: z.object({
          contentUrl: z.string(),
          imageProperties: z.object({
            brightness: z.number(),
            contrast: z.number(),
            cropProperties: z.object({
              angle: z.number(),
              bottomOffset: z.number(),
              leftOffset: z.number(),
              rightOffset: z.number(),
              topOffset: z.number(),
            }),
            link: z.object({
              pageObjectId: z.string(),
              relativeLink: z.string(),
              slideIndex: z.number(),
              url: z.string(),
            }),
            outline: z.object({
              dashStyle: z.string(),
              outlineFill: z.object({
                solidFill: z.object({
                  alpha: z.number(),
                  color: z.object({
                    rgbColor: z.object({
                      blue: z.number(),
                      green: z.number(),
                      red: z.number(),
                    }),
                    themeColor: z.string(),
                  }),
                }),
              }),
              propertyState: z.string(),
              weight: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
            }),
            recolor: z.object({
              name: z.string(),
              recolorStops: z.array(z.object({
                alpha: z.number(),
                color: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
                position: z.number(),
              })),
            }),
            shadow: z.object({
              alignment: z.string(),
              alpha: z.number(),
              blurRadius: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              color: z.object({
                rgbColor: z.object({
                  blue: z.number(),
                  green: z.number(),
                  red: z.number(),
                }),
                themeColor: z.string(),
              }),
              propertyState: z.string(),
              rotateWithShape: z.boolean(),
              transform: z.object({
                scaleX: z.number(),
                scaleY: z.number(),
                shearX: z.number(),
                shearY: z.number(),
                translateX: z.number(),
                translateY: z.number(),
                unit: z.string(),
              }),
              type: z.string(),
            }),
            transparency: z.number(),
          }),
          placeholder: z.object({
            index: z.number(),
            parentObjectId: z.string(),
            type: z.string(),
          }),
          sourceUrl: z.string(),
        }),
        line: z.object({
          lineCategory: z.string(),
          lineProperties: z.object({
            dashStyle: z.string(),
            endArrow: z.string(),
            endConnection: z.object({
              connectedObjectId: z.string(),
              connectionSiteIndex: z.number(),
            }),
            lineFill: z.object({
              solidFill: z.object({
                alpha: z.number(),
                color: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
            }),
            link: z.object({
              pageObjectId: z.string(),
              relativeLink: z.string(),
              slideIndex: z.number(),
              url: z.string(),
            }),
            startArrow: z.string(),
            startConnection: z.object({
              connectedObjectId: z.string(),
              connectionSiteIndex: z.number(),
            }),
            weight: z.object({
              magnitude: z.number(),
              unit: z.string(),
            }),
          }),
          lineType: z.string(),
        }),
        objectId: z.string(),
        shape: z.object({
          placeholder: z.object({
            index: z.number(),
            parentObjectId: z.string(),
            type: z.string(),
          }),
          shapeProperties: z.object({
            autofit: z.object({
              autofitType: z.string(),
              fontScale: z.number(),
              lineSpacingReduction: z.number(),
            }),
            contentAlignment: z.string(),
            link: z.object({
              pageObjectId: z.string(),
              relativeLink: z.string(),
              slideIndex: z.number(),
              url: z.string(),
            }),
            outline: z.object({
              dashStyle: z.string(),
              outlineFill: z.object({
                solidFill: z.object({
                  alpha: z.number(),
                  color: z.object({
                    rgbColor: z.object({
                      blue: z.number(),
                      green: z.number(),
                      red: z.number(),
                    }),
                    themeColor: z.string(),
                  }),
                }),
              }),
              propertyState: z.string(),
              weight: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
            }),
            shadow: z.object({
              alignment: z.string(),
              alpha: z.number(),
              blurRadius: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              color: z.object({
                rgbColor: z.object({
                  blue: z.number(),
                  green: z.number(),
                  red: z.number(),
                }),
                themeColor: z.string(),
              }),
              propertyState: z.string(),
              rotateWithShape: z.boolean(),
              transform: z.object({
                scaleX: z.number(),
                scaleY: z.number(),
                shearX: z.number(),
                shearY: z.number(),
                translateX: z.number(),
                translateY: z.number(),
                unit: z.string(),
              }),
              type: z.string(),
            }),
            shapeBackgroundFill: z.object({
              propertyState: z.string(),
              solidFill: z.object({
                alpha: z.number(),
                color: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
              }),
            }),
          }),
          shapeType: z.string(),
          text: z.object({
            lists: z.record(z.string(), z.unknown()),
            textElements: z.array(z.object({
              autoText: z.object({
                content: z.string(),
                style: z.object({
                  backgroundColor: z.object({
                    opaqueColor: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                  baselineOffset: z.string(),
                  bold: z.boolean(),
                  fontFamily: z.string(),
                  fontSize: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  foregroundColor: z.object({
                    opaqueColor: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                  italic: z.boolean(),
                  link: z.object({
                    pageObjectId: z.string(),
                    relativeLink: z.string(),
                    slideIndex: z.number(),
                    url: z.string(),
                  }),
                  smallCaps: z.boolean(),
                  strikethrough: z.boolean(),
                  underline: z.boolean(),
                  weightedFontFamily: z.object({
                    fontFamily: z.string(),
                    weight: z.number(),
                  }),
                }),
                type: z.string(),
              }),
              endIndex: z.number(),
              paragraphMarker: z.object({
                bullet: z.object({
                  bulletStyle: z.object({
                    backgroundColor: z.object({
                      opaqueColor: z.object({
                        rgbColor: z.object({
                          blue: z.number(),
                          green: z.number(),
                          red: z.number(),
                        }),
                        themeColor: z.string(),
                      }),
                    }),
                    baselineOffset: z.string(),
                    bold: z.boolean(),
                    fontFamily: z.string(),
                    fontSize: z.object({
                      magnitude: z.number(),
                      unit: z.string(),
                    }),
                    foregroundColor: z.object({
                      opaqueColor: z.object({
                        rgbColor: z.object({
                          blue: z.number(),
                          green: z.number(),
                          red: z.number(),
                        }),
                        themeColor: z.string(),
                      }),
                    }),
                    italic: z.boolean(),
                    link: z.object({
                      pageObjectId: z.string(),
                      relativeLink: z.string(),
                      slideIndex: z.number(),
                      url: z.string(),
                    }),
                    smallCaps: z.boolean(),
                    strikethrough: z.boolean(),
                    underline: z.boolean(),
                    weightedFontFamily: z.object({
                      fontFamily: z.string(),
                      weight: z.number(),
                    }),
                  }),
                  glyph: z.string(),
                  listId: z.string(),
                  nestingLevel: z.number(),
                }),
                style: z.object({
                  alignment: z.string(),
                  direction: z.string(),
                  indentEnd: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  indentFirstLine: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  indentStart: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  lineSpacing: z.number(),
                  spaceAbove: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  spaceBelow: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  spacingMode: z.string(),
                }),
              }),
              startIndex: z.number(),
              textRun: z.object({
                content: z.string(),
                style: z.object({
                  backgroundColor: z.object({
                    opaqueColor: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                  baselineOffset: z.string(),
                  bold: z.boolean(),
                  fontFamily: z.string(),
                  fontSize: z.object({
                    magnitude: z.number(),
                    unit: z.string(),
                  }),
                  foregroundColor: z.object({
                    opaqueColor: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                  italic: z.boolean(),
                  link: z.object({
                    pageObjectId: z.string(),
                    relativeLink: z.string(),
                    slideIndex: z.number(),
                    url: z.string(),
                  }),
                  smallCaps: z.boolean(),
                  strikethrough: z.boolean(),
                  underline: z.boolean(),
                  weightedFontFamily: z.object({
                    fontFamily: z.string(),
                    weight: z.number(),
                  }),
                }),
              }),
            })),
          }),
        }),
        sheetsChart: z.object({
          chartId: z.number(),
          contentUrl: z.string(),
          sheetsChartProperties: z.object({
            chartImageProperties: z.object({
              brightness: z.number(),
              contrast: z.number(),
              cropProperties: z.object({
                angle: z.number(),
                bottomOffset: z.number(),
                leftOffset: z.number(),
                rightOffset: z.number(),
                topOffset: z.number(),
              }),
              link: z.object({
                pageObjectId: z.string(),
                relativeLink: z.string(),
                slideIndex: z.number(),
                url: z.string(),
              }),
              outline: z.object({
                dashStyle: z.string(),
                outlineFill: z.object({
                  solidFill: z.object({
                    alpha: z.number(),
                    color: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                }),
                propertyState: z.string(),
                weight: z.object({
                  magnitude: z.number(),
                  unit: z.string(),
                }),
              }),
              recolor: z.object({
                name: z.string(),
                recolorStops: z.array(z.object({
                  alpha: z.number(),
                  color: z.object({
                    rgbColor: z.object({
                      blue: z.number(),
                      green: z.number(),
                      red: z.number(),
                    }),
                    themeColor: z.string(),
                  }),
                  position: z.number(),
                })),
              }),
              shadow: z.object({
                alignment: z.string(),
                alpha: z.number(),
                blurRadius: z.object({
                  magnitude: z.number(),
                  unit: z.string(),
                }),
                color: z.object({
                  rgbColor: z.object({
                    blue: z.number(),
                    green: z.number(),
                    red: z.number(),
                  }),
                  themeColor: z.string(),
                }),
                propertyState: z.string(),
                rotateWithShape: z.boolean(),
                transform: z.object({
                  scaleX: z.number(),
                  scaleY: z.number(),
                  shearX: z.number(),
                  shearY: z.number(),
                  translateX: z.number(),
                  translateY: z.number(),
                  unit: z.string(),
                }),
                type: z.string(),
              }),
              transparency: z.number(),
            }),
          }),
          spreadsheetId: z.string(),
        }),
        size: z.object({
          height: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
          width: z.object({
            magnitude: z.number(),
            unit: z.string(),
          }),
        }),
        speakerSpotlight: z.object({
          speakerSpotlightProperties: z.object({
            outline: z.object({
              dashStyle: z.string(),
              outlineFill: z.object({
                solidFill: z.object({
                  alpha: z.number(),
                  color: z.object({
                    rgbColor: z.object({
                      blue: z.number(),
                      green: z.number(),
                      red: z.number(),
                    }),
                    themeColor: z.string(),
                  }),
                }),
              }),
              propertyState: z.string(),
              weight: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
            }),
            shadow: z.object({
              alignment: z.string(),
              alpha: z.number(),
              blurRadius: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              color: z.object({
                rgbColor: z.object({
                  blue: z.number(),
                  green: z.number(),
                  red: z.number(),
                }),
                themeColor: z.string(),
              }),
              propertyState: z.string(),
              rotateWithShape: z.boolean(),
              transform: z.object({
                scaleX: z.number(),
                scaleY: z.number(),
                shearX: z.number(),
                shearY: z.number(),
                translateX: z.number(),
                translateY: z.number(),
                unit: z.string(),
              }),
              type: z.string(),
            }),
          }),
        }),
        table: z.object({
          columns: z.number(),
          horizontalBorderRows: z.array(z.object({
            tableBorderCells: z.array(z.object({
              location: z.object({
                columnIndex: z.number(),
                rowIndex: z.number(),
              }),
              tableBorderProperties: z.object({
                dashStyle: z.string(),
                tableBorderFill: z.object({
                  solidFill: z.object({
                    alpha: z.number(),
                    color: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                }),
                weight: z.object({
                  magnitude: z.number(),
                  unit: z.string(),
                }),
              }),
            })),
          })),
          rows: z.number(),
          tableColumns: z.array(z.object({
            columnWidth: z.object({
              magnitude: z.number(),
              unit: z.string(),
            }),
          })),
          tableRows: z.array(z.object({
            rowHeight: z.object({
              magnitude: z.number(),
              unit: z.string(),
            }),
            tableCells: z.array(z.object({
              columnSpan: z.number(),
              location: z.object({
                columnIndex: z.number(),
                rowIndex: z.number(),
              }),
              rowSpan: z.number(),
              tableCellProperties: z.object({
                contentAlignment: z.string(),
                tableCellBackgroundFill: z.object({
                  propertyState: z.string(),
                  solidFill: z.object({
                    alpha: z.number(),
                    color: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                }),
              }),
              text: z.object({
                lists: z.record(z.string(), z.unknown()),
                textElements: z.array(z.object({
                  autoText: z.object({
                    content: z.string(),
                    style: z.object({
                      backgroundColor: z.object({
                        opaqueColor: z.object({
                          rgbColor: z.object({
                            blue: z.number(),
                            green: z.number(),
                            red: z.number(),
                          }),
                          themeColor: z.string(),
                        }),
                      }),
                      baselineOffset: z.string(),
                      bold: z.boolean(),
                      fontFamily: z.string(),
                      fontSize: z.object({
                        magnitude: z.number(),
                        unit: z.string(),
                      }),
                      foregroundColor: z.object({
                        opaqueColor: z.object({
                          rgbColor: z.object({
                            blue: z.number(),
                            green: z.number(),
                            red: z.number(),
                          }),
                          themeColor: z.string(),
                        }),
                      }),
                      italic: z.boolean(),
                      link: z.object({
                        pageObjectId: z.string(),
                        relativeLink: z.string(),
                        slideIndex: z.number(),
                        url: z.string(),
                      }),
                      smallCaps: z.boolean(),
                      strikethrough: z.boolean(),
                      underline: z.boolean(),
                      weightedFontFamily: z.object({
                        fontFamily: z.string(),
                        weight: z.number(),
                      }),
                    }),
                    type: z.string(),
                  }),
                  endIndex: z.number(),
                  paragraphMarker: z.object({
                    bullet: z.object({
                      bulletStyle: z.object({
                        backgroundColor: z.object({
                          opaqueColor: z.object({
                            rgbColor: z.object({
                              blue: z.number(),
                              green: z.number(),
                              red: z.number(),
                            }),
                            themeColor: z.string(),
                          }),
                        }),
                        baselineOffset: z.string(),
                        bold: z.boolean(),
                        fontFamily: z.string(),
                        fontSize: z.object({
                          magnitude: z.number(),
                          unit: z.string(),
                        }),
                        foregroundColor: z.object({
                          opaqueColor: z.object({
                            rgbColor: z.object({
                              blue: z.number(),
                              green: z.number(),
                              red: z.number(),
                            }),
                            themeColor: z.string(),
                          }),
                        }),
                        italic: z.boolean(),
                        link: z.object({
                          pageObjectId: z.string(),
                          relativeLink: z.string(),
                          slideIndex: z.number(),
                          url: z.string(),
                        }),
                        smallCaps: z.boolean(),
                        strikethrough: z.boolean(),
                        underline: z.boolean(),
                        weightedFontFamily: z.object({
                          fontFamily: z.string(),
                          weight: z.number(),
                        }),
                      }),
                      glyph: z.string(),
                      listId: z.string(),
                      nestingLevel: z.number(),
                    }),
                    style: z.object({
                      alignment: z.string(),
                      direction: z.string(),
                      indentEnd: z.object({
                        magnitude: z.number(),
                        unit: z.string(),
                      }),
                      indentFirstLine: z.object({
                        magnitude: z.number(),
                        unit: z.string(),
                      }),
                      indentStart: z.object({
                        magnitude: z.number(),
                        unit: z.string(),
                      }),
                      lineSpacing: z.number(),
                      spaceAbove: z.object({
                        magnitude: z.number(),
                        unit: z.string(),
                      }),
                      spaceBelow: z.object({
                        magnitude: z.number(),
                        unit: z.string(),
                      }),
                      spacingMode: z.string(),
                    }),
                  }),
                  startIndex: z.number(),
                  textRun: z.object({
                    content: z.string(),
                    style: z.object({
                      backgroundColor: z.object({
                        opaqueColor: z.object({
                          rgbColor: z.object({
                            blue: z.number(),
                            green: z.number(),
                            red: z.number(),
                          }),
                          themeColor: z.string(),
                        }),
                      }),
                      baselineOffset: z.string(),
                      bold: z.boolean(),
                      fontFamily: z.string(),
                      fontSize: z.object({
                        magnitude: z.number(),
                        unit: z.string(),
                      }),
                      foregroundColor: z.object({
                        opaqueColor: z.object({
                          rgbColor: z.object({
                            blue: z.number(),
                            green: z.number(),
                            red: z.number(),
                          }),
                          themeColor: z.string(),
                        }),
                      }),
                      italic: z.boolean(),
                      link: z.object({
                        pageObjectId: z.string(),
                        relativeLink: z.string(),
                        slideIndex: z.number(),
                        url: z.string(),
                      }),
                      smallCaps: z.boolean(),
                      strikethrough: z.boolean(),
                      underline: z.boolean(),
                      weightedFontFamily: z.object({
                        fontFamily: z.string(),
                        weight: z.number(),
                      }),
                    }),
                  }),
                })),
              }),
            })),
            tableRowProperties: z.object({
              minRowHeight: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
            }),
          })),
          verticalBorderRows: z.array(z.object({
            tableBorderCells: z.array(z.object({
              location: z.object({
                columnIndex: z.number(),
                rowIndex: z.number(),
              }),
              tableBorderProperties: z.object({
                dashStyle: z.string(),
                tableBorderFill: z.object({
                  solidFill: z.object({
                    alpha: z.number(),
                    color: z.object({
                      rgbColor: z.object({
                        blue: z.number(),
                        green: z.number(),
                        red: z.number(),
                      }),
                      themeColor: z.string(),
                    }),
                  }),
                }),
                weight: z.object({
                  magnitude: z.number(),
                  unit: z.string(),
                }),
              }),
            })),
          })),
        }),
        title: z.string(),
        transform: z.object({
          scaleX: z.number(),
          scaleY: z.number(),
          shearX: z.number(),
          shearY: z.number(),
          translateX: z.number(),
          translateY: z.number(),
          unit: z.string(),
        }),
        video: z.object({
          id: z.string(),
          source: z.string(),
          url: z.string(),
          videoProperties: z.object({
            autoPlay: z.boolean(),
            end: z.number(),
            mute: z.boolean(),
            outline: z.object({
              dashStyle: z.string(),
              outlineFill: z.object({
                solidFill: z.object({
                  alpha: z.number(),
                  color: z.object({
                    rgbColor: z.object({
                      blue: z.number(),
                      green: z.number(),
                      red: z.number(),
                    }),
                    themeColor: z.string(),
                  }),
                }),
              }),
              propertyState: z.string(),
              weight: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
            }),
            start: z.number(),
          }),
        }),
        wordArt: z.object({
          renderedText: z.string(),
        }),
      })),
      pageProperties: z.object({
        colorScheme: z.object({
          colors: z.array(z.object({
            color: z.object({
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            type: z.string(),
          })),
        }),
        pageBackgroundFill: z.object({
          propertyState: z.string(),
          solidFill: z.object({
            alpha: z.number(),
            color: z.object({
              rgbColor: z.object({
                blue: z.number(),
                green: z.number(),
                red: z.number(),
              }),
              themeColor: z.string(),
            }),
          }),
          stretchedPictureFill: z.object({
            contentUrl: z.string(),
            size: z.object({
              height: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
              width: z.object({
                magnitude: z.number(),
                unit: z.string(),
              }),
            }),
          }),
        }),
      }),
      pageType: z.string(),
      revisionId: z.string(),
      slideProperties: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/slides/presentations-pages",
  version: "2026.04.03.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A page in a presentation.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a pages",
      arguments: z.object({
        identifier: z.string().describe("The name of the pages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["presentationId"] !== undefined) {
          params["presentationId"] = String(g["presentationId"]);
        }
        params["pageObjectId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync pages state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["presentationId"] !== undefined) {
            params["presentationId"] = String(g["presentationId"]);
          } else if (existing["presentationId"]) {
            params["presentationId"] = String(existing["presentationId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["pageObjectId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    get_thumbnail: {
      description: "get thumbnail",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./,
            "_",
          ),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["presentationId"] = existing["presentationId"]?.toString() ??
          g["presentationId"]?.toString() ?? "";
        params["pageObjectId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "slides.presentations.pages.getThumbnail",
            "path":
              "v1/presentations/{presentationId}/pages/{pageObjectId}/thumbnail",
            "httpMethod": "GET",
            "parameterOrder": ["presentationId", "pageObjectId"],
            "parameters": {
              "pageObjectId": { "location": "path", "required": true },
              "presentationId": { "location": "path", "required": true },
              "thumbnailProperties.mimeType": { "location": "query" },
              "thumbnailProperties.thumbnailSize": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
