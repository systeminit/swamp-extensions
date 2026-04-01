// Auto-generated extension model for @swamp/gcp/contentwarehouse/documents-referenceid
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://contentwarehouse.googleapis.com/";

const GET_CONFIG = {
  "id": "contentwarehouse.projects.locations.documents.referenceId.get",
  "path": "v1/{+name}:get",
  "httpMethod": "POST",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "contentwarehouse.projects.locations.documents.referenceId.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "contentwarehouse.projects.locations.documents.referenceId.delete",
  "path": "v1/{+name}:delete",
  "httpMethod": "POST",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  cloudAiDocumentOption: z.object({
    customizedEntitiesPropertiesConversions: z.record(z.string(), z.string())
      .describe(
        "If set, only selected entities will be converted to properties.",
      ).optional(),
    enableEntitiesConversions: z.boolean().describe(
      "Whether to convert all the entities to properties.",
    ).optional(),
  }).describe("Request Option for processing Cloud AI Document in CW Document.")
    .optional(),
  document: z.object({
    cloudAiDocument: z.object({
      chunkedDocument: z.object({
        chunks: z.array(z.object({
          chunkId: z.string().describe("ID of the chunk.").optional(),
          content: z.string().describe("Text content of the chunk.").optional(),
          pageFooters: z.array(z.object({
            pageSpan: z.object({
              pageEnd: z.number().int().describe(
                "Page where chunk ends in the document.",
              ).optional(),
              pageStart: z.number().int().describe(
                "Page where chunk starts in the document.",
              ).optional(),
            }).describe(
              "Represents where the chunk starts and ends in the document.",
            ).optional(),
            text: z.string().describe("Footer in text format.").optional(),
          })).describe("Page footers associated with the chunk.").optional(),
          pageHeaders: z.array(z.object({
            pageSpan: z.object({
              pageEnd: z.number().int().describe(
                "Page where chunk ends in the document.",
              ).optional(),
              pageStart: z.number().int().describe(
                "Page where chunk starts in the document.",
              ).optional(),
            }).describe(
              "Represents where the chunk starts and ends in the document.",
            ).optional(),
            text: z.string().describe("Header in text format.").optional(),
          })).describe("Page headers associated with the chunk.").optional(),
          pageSpan: z.object({
            pageEnd: z.number().int().describe(
              "Page where chunk ends in the document.",
            ).optional(),
            pageStart: z.number().int().describe(
              "Page where chunk starts in the document.",
            ).optional(),
          }).describe(
            "Represents where the chunk starts and ends in the document.",
          ).optional(),
          sourceBlockIds: z.array(z.string()).describe("Unused.").optional(),
        })).describe("List of chunks.").optional(),
      }).describe("Represents the chunks that the document is divided into.")
        .optional(),
      content: z.string().describe(
        "Optional. Inline document content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64.",
      ).optional(),
      documentLayout: z.object({
        blocks: z.array(z.object({
          blockId: z.string().describe("ID of the block.").optional(),
          listBlock: z.object({
            listEntries: z.array(z.object({
              blocks: z.array(z.string()).describe(
                "A list entry is a list of blocks. Repeated blocks support further hierarchies and nested blocks.",
              ).optional(),
            })).describe("List entries that constitute a list block.")
              .optional(),
            type: z.string().describe(
              "Type of the list_entries (if exist). Available options are `ordered` and `unordered`.",
            ).optional(),
          }).describe("Represents a list type block.").optional(),
          pageSpan: z.object({
            pageEnd: z.number().int().describe(
              "Page where block ends in the document.",
            ).optional(),
            pageStart: z.number().int().describe(
              "Page where block starts in the document.",
            ).optional(),
          }).describe(
            "Represents where the block starts and ends in the document.",
          ).optional(),
          tableBlock: z.object({
            bodyRows: z.array(z.object({
              cells: z.array(z.object({
                blocks: z.array(z.string()).describe(
                  "A table cell is a list of blocks. Repeated blocks support further hierarchies and nested blocks.",
                ).optional(),
                colSpan: z.number().int().describe(
                  "How many columns this cell spans.",
                ).optional(),
                rowSpan: z.number().int().describe(
                  "How many rows this cell spans.",
                ).optional(),
              })).describe("A table row is a list of table cells.").optional(),
            })).describe("Body rows containing main table content.").optional(),
            caption: z.string().describe("Table caption/title.").optional(),
            headerRows: z.array(z.object({
              cells: z.array(z.object({
                blocks: z.array(z.string()).describe(
                  "A table cell is a list of blocks. Repeated blocks support further hierarchies and nested blocks.",
                ).optional(),
                colSpan: z.number().int().describe(
                  "How many columns this cell spans.",
                ).optional(),
                rowSpan: z.number().int().describe(
                  "How many rows this cell spans.",
                ).optional(),
              })).describe("A table row is a list of table cells.").optional(),
            })).describe("Header rows at the top of the table.").optional(),
          }).describe("Represents a table type block.").optional(),
          textBlock: z.object({
            blocks: z.array(z.string()).describe(
              "A text block could further have child blocks. Repeated blocks support further hierarchies and nested blocks.",
            ).optional(),
            text: z.string().describe("Text content stored in the block.")
              .optional(),
            type: z.string().describe(
              "Type of the text in the block. Available options are: `paragraph`, `subtitle`, `heading-1`, `heading-2`, `heading-3`, `heading-4`, `heading-5`, `header`, `footer`.",
            ).optional(),
          }).describe("Represents a text type block.").optional(),
        })).describe("List of blocks in the document.").optional(),
      }).describe(
        "Represents the parsed layout of a document as a collection of blocks that the document is divided into.",
      ).optional(),
      entities: z.array(z.object({
        confidence: z.number().describe(
          "Optional. Confidence of detected Schema entity. Range `[0, 1]`.",
        ).optional(),
        id: z.string().describe(
          "Optional. Canonical id. This will be a unique value in the entity list for this document.",
        ).optional(),
        mentionId: z.string().describe(
          "Optional. Deprecated. Use `id` field instead.",
        ).optional(),
        mentionText: z.string().describe(
          "Optional. Text value of the entity e.g. `1600 Amphitheatre Pkwy`.",
        ).optional(),
        normalizedValue: z.object({
          addressValue: z.object({
            addressLines: z.array(z.string()).describe(
              'Unstructured address lines describing the lower levels of an address. Because values in address_lines do not have type information and may sometimes contain multiple values in a single field (For example "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country/region of the address. In places where this can vary (For example Japan), address_language is used to make it explicit (For example "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). This way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a region_code with all remaining information placed in the address_lines. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a region_code and address_lines, and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
            ).optional(),
            administrativeArea: z.string().describe(
              'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. Specifically, for Spain this is the province and not the autonomous community (For example "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example in Switzerland this should be left unpopulated.',
            ).optional(),
            languageCode: z.string().describe(
              'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
            ).optional(),
            locality: z.string().describe(
              "Optional. Generally refers to the city/town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave locality empty and use address_lines.",
            ).optional(),
            organization: z.string().describe(
              "Optional. The name of the organization at the address.",
            ).optional(),
            postalCode: z.string().describe(
              "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (For example state/zip validation in the U.S.A.).",
            ).optional(),
            recipients: z.array(z.string()).describe(
              'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
            ).optional(),
            regionCode: z.string().describe(
              'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
            ).optional(),
            revision: z.number().int().describe(
              "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
            ).optional(),
            sortingCode: z.string().describe(
              'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (For example "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (For example Côte d\'Ivoire).',
            ).optional(),
            sublocality: z.string().describe(
              "Optional. Sublocality of the address. For example, this can be neighborhoods, boroughs, districts.",
            ).optional(),
          }).describe(
            "Represents a postal address. For example for postal delivery or payments addresses. Given a postal address, a postal service can deliver items to a premise, P.O. Box or similar. It is not intended to model geographical locations (roads, towns, mountains). In typical usage an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input / editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput) - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478",
          ).optional(),
          booleanValue: z.boolean().describe(
            "Boolean value. Can be used for entities with binary values, or for checkboxes.",
          ).optional(),
          dateValue: z.object({
            day: z.number().int().describe(
              "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
            ).optional(),
            month: z.number().int().describe(
              "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
            ).optional(),
            year: z.number().int().describe(
              "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
            ).optional(),
          }).describe(
            "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
          ).optional(),
          datetimeValue: z.object({
            day: z.number().int().describe(
              "Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day.",
            ).optional(),
            hours: z.number().int().describe(
              'Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
            ).optional(),
            minutes: z.number().int().describe(
              "Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.",
            ).optional(),
            month: z.number().int().describe(
              "Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month.",
            ).optional(),
            nanos: z.number().int().describe(
              "Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0.",
            ).optional(),
            seconds: z.number().int().describe(
              "Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds.",
            ).optional(),
            timeZone: z.object({
              id: z.string().describe(
                'IANA Time Zone Database time zone. For example "America/New_York".',
              ).optional(),
              version: z.string().describe(
                'Optional. IANA Time Zone Database version number. For example "2019a".',
              ).optional(),
            }).describe(
              "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
            ).optional(),
            utcOffset: z.string().describe(
              "UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.",
            ).optional(),
            year: z.number().int().describe(
              "Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year.",
            ).optional(),
          }).describe(
            "Represents civil time (or occasionally physical time). This type can represent a civil time in one of a few possible ways: * When utc_offset is set and time_zone is unset: a civil time on a calendar day with a particular offset from UTC. * When time_zone is set and utc_offset is unset: a civil time on a calendar day in a particular time zone. * When neither time_zone nor utc_offset is set: a civil time on a calendar day in local time. The date is relative to the Proleptic Gregorian Calendar. If year, month, or day are 0, the DateTime is considered not to have a specific year, month, or day respectively. This type may also be used to represent a physical time if all the date and time fields are set and either case of the `time_offset` oneof is set. Consider using `Timestamp` message for physical time instead. If your use case also would like to store the user's timezone, that can be done in another field. This type is more flexible than some applications may want. Make sure to document and validate your application's limitations.",
          ).optional(),
          floatValue: z.number().describe("Float value.").optional(),
          integerValue: z.number().int().describe("Integer value.").optional(),
          moneyValue: z.object({
            currencyCode: z.string().describe(
              "The three-letter currency code defined in ISO 4217.",
            ).optional(),
            nanos: z.number().int().describe(
              "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
            ).optional(),
            units: z.string().describe(
              'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
            ).optional(),
          }).describe("Represents an amount of money with its currency type.")
            .optional(),
          text: z.string().describe(
            "Optional. An optional field to store a normalized string. For some entity types, one of respective `structured_value` fields may also be populated. Also not all the types of `structured_value` will be normalized. For example, some processors may not generate `float` or `integer` normalized text by default. Below are sample formats mapped to structured values. - Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date type (`date_value`) is in the ISO 8601 text format. - Datetime type (`datetime_value`) is in the ISO 8601 text format.",
          ).optional(),
        }).describe("Parsed and normalized entity value.").optional(),
        pageAnchor: z.object({
          pageRefs: z.array(z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Optional. Confidence of detected page element, if applicable. Range `[0, 1]`.",
            ).optional(),
            layoutId: z.string().describe(
              "Optional. Deprecated. Use PageRef.bounding_poly instead.",
            ).optional(),
            layoutType: z.enum([
              "LAYOUT_TYPE_UNSPECIFIED",
              "BLOCK",
              "PARAGRAPH",
              "LINE",
              "TOKEN",
              "VISUAL_ELEMENT",
              "TABLE",
              "FORM_FIELD",
            ]).describe(
              "Optional. The type of the layout element that is being referenced if any.",
            ).optional(),
            page: z.string().describe(
              "Required. Index into the Document.pages element, for example using `Document.pages` to locate the related page element. This field is skipped when its value is the default `0`. See https://developers.google.com/protocol-buffers/docs/proto3#json.",
            ).optional(),
          })).describe("One or more references to visual page elements")
            .optional(),
        }).describe(
          "Referencing the visual context of the entity in the Document.pages. Page anchors can be cross-page, consist of multiple bounding polygons and optionally reference specific layout element types.",
        ).optional(),
        properties: z.array(z.string()).describe(
          "Optional. Entities can be nested to form a hierarchical data structure representing the content in the document.",
        ).optional(),
        provenance: z.object({
          id: z.number().int().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.array(z.object({
            id: z.number().int().describe("The id of the parent provenance.")
              .optional(),
            index: z.number().int().describe(
              "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the index into current revision's parent_ids list.",
            ).optional(),
          })).describe("References to the original elements that are replaced.")
            .optional(),
          revision: z.number().int().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.enum([
            "OPERATION_TYPE_UNSPECIFIED",
            "ADD",
            "REMOVE",
            "UPDATE",
            "REPLACE",
            "EVAL_REQUESTED",
            "EVAL_APPROVED",
            "EVAL_SKIPPED",
          ]).describe("The type of provenance operation.").optional(),
        }).describe(
          "Structure to identify provenance relationships between annotations in different revisions.",
        ).optional(),
        redacted: z.boolean().describe(
          "Optional. Whether the entity will be redacted for de-identification purposes.",
        ).optional(),
        textAnchor: z.object({
          content: z.string().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.array(z.object({
            endIndex: z.string().describe(
              "TextSegment half open end UTF-8 char index in the Document.text.",
            ).optional(),
            startIndex: z.string().describe(
              "TextSegment start UTF-8 char index in the Document.text.",
            ).optional(),
          })).describe("The text segments from the Document.text.").optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
        type: z.string().describe(
          "Required. Entity type from a schema e.g. `Address`.",
        ).optional(),
      })).describe(
        "A list of entities detected on Document.text. For document shards, entities in this list may cross shard boundaries.",
      ).optional(),
      entityRelations: z.array(z.object({
        objectId: z.string().describe("Object entity id.").optional(),
        relation: z.string().describe("Relationship description.").optional(),
        subjectId: z.string().describe("Subject entity id.").optional(),
      })).describe("Placeholder. Relationship among Document.entities.")
        .optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.string())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      mimeType: z.string().describe(
        "An IANA published [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml).",
      ).optional(),
      pages: z.array(z.object({
        blocks: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
        })).describe(
          "A list of visually detected text blocks on the page. A block has a set of lines (collected into paragraphs) that have a common line-spacing and orientation.",
        ).optional(),
        detectedBarcodes: z.array(z.object({
          barcode: z.object({
            format: z.string().describe(
              "Format of a barcode. The supported formats are: - `CODE_128`: Code 128 type. - `CODE_39`: Code 39 type. - `CODE_93`: Code 93 type. - `CODABAR`: Codabar type. - `DATA_MATRIX`: 2D Data Matrix type. - `ITF`: ITF type. - `EAN_13`: EAN-13 type. - `EAN_8`: EAN-8 type. - `QR_CODE`: 2D QR code type. - `UPC_A`: UPC-A type. - `UPC_E`: UPC-E type. - `PDF417`: PDF417 type. - `AZTEC`: 2D Aztec code type. - `DATABAR`: GS1 DataBar code type.",
            ).optional(),
            rawValue: z.string().describe(
              "Raw value encoded in the barcode. For example: `'MEBKM:TITLE:Google;URL:https://www.google.com;;'`.",
            ).optional(),
            valueFormat: z.string().describe(
              "Value format describes the format of the value that a barcode encodes. The supported formats are: - `CONTACT_INFO`: Contact information. - `EMAIL`: Email address. - `ISBN`: ISBN identifier. - `PHONE`: Phone number. - `PRODUCT`: Product. - `SMS`: SMS message. - `TEXT`: Text string. - `URL`: URL address. - `WIFI`: Wifi information. - `GEO`: Geo-localization. - `CALENDAR_EVENT`: Calendar event. - `DRIVER_LICENSE`: Driver's license.",
            ).optional(),
          }).describe("Encodes the detailed information of a barcode.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
        })).describe("A list of detected barcodes.").optional(),
        detectedLanguages: z.array(z.object({
          confidence: z.number().describe(
            "Confidence of detected language. Range `[0, 1]`.",
          ).optional(),
          languageCode: z.string().describe(
            "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
          ).optional(),
        })).describe("A list of detected languages together with confidence.")
          .optional(),
        dimension: z.object({
          height: z.number().describe("Page height.").optional(),
          unit: z.string().describe("Dimension unit.").optional(),
          width: z.number().describe("Page width.").optional(),
        }).describe("Dimension for the page.").optional(),
        formFields: z.array(z.object({
          correctedKeyText: z.string().describe(
            "Created for Labeling UI to export key text. If corrections were made to the text identified by the `field_name.text_anchor`, this field will contain the correction.",
          ).optional(),
          correctedValueText: z.string().describe(
            "Created for Labeling UI to export value text. If corrections were made to the text identified by the `field_value.text_anchor`, this field will contain the correction.",
          ).optional(),
          fieldName: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          fieldValue: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          nameDetectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe(
            "A list of detected languages for name together with confidence.",
          ).optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
          valueDetectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe(
            "A list of detected languages for value together with confidence.",
          ).optional(),
          valueType: z.string().describe(
            "If the value is non-textual, this field represents the type. Current valid values are: - blank (this indicates the `field_value` is normal text) - `unfilled_checkbox` - `filled_checkbox`",
          ).optional(),
        })).describe("A list of visually detected form fields on the page.")
          .optional(),
        image: z.object({
          content: z.string().describe("Raw byte content of the image.")
            .optional(),
          height: z.number().int().describe("Height of the image in pixels.")
            .optional(),
          mimeType: z.string().describe(
            "Encoding [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml) for the image.",
          ).optional(),
          width: z.number().int().describe("Width of the image in pixels.")
            .optional(),
        }).describe("Rendered image contents for this page.").optional(),
        imageQualityScores: z.object({
          detectedDefects: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected defect. Range `[0, 1]` where `1` indicates strong confidence that the defect exists.",
            ).optional(),
            type: z.string().describe(
              "Name of the defect type. Supported values are: - `quality/defect_blurry` - `quality/defect_noisy` - `quality/defect_dark` - `quality/defect_faint` - `quality/defect_text_too_small` - `quality/defect_document_cutoff` - `quality/defect_text_cutoff` - `quality/defect_glare`",
            ).optional(),
          })).describe("A list of detected defects.").optional(),
          qualityScore: z.number().describe(
            "The overall quality score. Range `[0, 1]` where `1` is perfect quality.",
          ).optional(),
        }).describe("Image quality scores for the page image.").optional(),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number().describe("X coordinate.").optional(),
              y: z.number().describe(
                "Y coordinate (starts from the top of the image).",
              ).optional(),
            })).describe("The bounding polygon normalized vertices.")
              .optional(),
            vertices: z.array(z.object({
              x: z.number().int().describe("X coordinate.").optional(),
              y: z.number().int().describe(
                "Y coordinate (starts from the top of the image).",
              ).optional(),
            })).describe("The bounding polygon vertices.").optional(),
          }).describe("A bounding polygon for the detected image annotation.")
            .optional(),
          confidence: z.number().describe(
            "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
          ).optional(),
          orientation: z.enum([
            "ORIENTATION_UNSPECIFIED",
            "PAGE_UP",
            "PAGE_RIGHT",
            "PAGE_DOWN",
            "PAGE_LEFT",
          ]).describe("Detected orientation for the Layout.").optional(),
          textAnchor: z.object({
            content: z.string().describe(
              "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
            ).optional(),
            textSegments: z.array(z.object({
              endIndex: z.string().describe(
                "TextSegment half open end UTF-8 char index in the Document.text.",
              ).optional(),
              startIndex: z.string().describe(
                "TextSegment start UTF-8 char index in the Document.text.",
              ).optional(),
            })).describe("The text segments from the Document.text.")
              .optional(),
          }).describe("Text reference indexing into the Document.text.")
            .optional(),
        }).describe("Visual element describing a layout unit on a page.")
          .optional(),
        lines: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
        })).describe(
          "A list of visually detected text lines on the page. A collection of tokens that a human would perceive as a line.",
        ).optional(),
        pageNumber: z.number().int().describe(
          "1-based index for current Page in a parent Document. Useful when a page is taken out of a Document for individual processing.",
        ).optional(),
        paragraphs: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
        })).describe(
          "A list of visually detected text paragraphs on the page. A collection of lines that a human would perceive as a paragraph.",
        ).optional(),
        provenance: z.object({
          id: z.number().int().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.array(z.object({
            id: z.number().int().describe("The id of the parent provenance.")
              .optional(),
            index: z.number().int().describe(
              "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the index into current revision's parent_ids list.",
            ).optional(),
          })).describe("References to the original elements that are replaced.")
            .optional(),
          revision: z.number().int().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.enum([
            "OPERATION_TYPE_UNSPECIFIED",
            "ADD",
            "REMOVE",
            "UPDATE",
            "REPLACE",
            "EVAL_REQUESTED",
            "EVAL_APPROVED",
            "EVAL_SKIPPED",
          ]).describe("The type of provenance operation.").optional(),
        }).describe(
          "Structure to identify provenance relationships between annotations in different revisions.",
        ).optional(),
        symbols: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
        })).describe("A list of visually detected symbols on the page.")
          .optional(),
        tables: z.array(z.object({
          bodyRows: z.array(z.object({
            cells: z.array(z.object({
              colSpan: z.number().int().describe(
                "How many columns this cell spans.",
              ).optional(),
              detectedLanguages: z.array(z.object({
                confidence: z.number().describe(
                  "Confidence of detected language. Range `[0, 1]`.",
                ).optional(),
                languageCode: z.string().describe(
                  "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
                ).optional(),
              })).describe(
                "A list of detected languages together with confidence.",
              ).optional(),
              layout: z.object({
                boundingPoly: z.object({
                  normalizedVertices: z.array(z.object({
                    x: z.number().describe("X coordinate.").optional(),
                    y: z.number().describe(
                      "Y coordinate (starts from the top of the image).",
                    ).optional(),
                  })).describe("The bounding polygon normalized vertices.")
                    .optional(),
                  vertices: z.array(z.object({
                    x: z.number().int().describe("X coordinate.").optional(),
                    y: z.number().int().describe(
                      "Y coordinate (starts from the top of the image).",
                    ).optional(),
                  })).describe("The bounding polygon vertices.").optional(),
                }).describe(
                  "A bounding polygon for the detected image annotation.",
                ).optional(),
                confidence: z.number().describe(
                  "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
                ).optional(),
                orientation: z.enum([
                  "ORIENTATION_UNSPECIFIED",
                  "PAGE_UP",
                  "PAGE_RIGHT",
                  "PAGE_DOWN",
                  "PAGE_LEFT",
                ]).describe("Detected orientation for the Layout.").optional(),
                textAnchor: z.object({
                  content: z.string().describe(
                    "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
                  ).optional(),
                  textSegments: z.array(z.object({
                    endIndex: z.string().describe(
                      "TextSegment half open end UTF-8 char index in the Document.text.",
                    ).optional(),
                    startIndex: z.string().describe(
                      "TextSegment start UTF-8 char index in the Document.text.",
                    ).optional(),
                  })).describe("The text segments from the Document.text.")
                    .optional(),
                }).describe("Text reference indexing into the Document.text.")
                  .optional(),
              }).describe("Visual element describing a layout unit on a page.")
                .optional(),
              rowSpan: z.number().int().describe(
                "How many rows this cell spans.",
              ).optional(),
            })).describe("Cells that make up this row.").optional(),
          })).describe("Body rows of the table.").optional(),
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          headerRows: z.array(z.object({
            cells: z.array(z.object({
              colSpan: z.number().int().describe(
                "How many columns this cell spans.",
              ).optional(),
              detectedLanguages: z.array(z.object({
                confidence: z.number().describe(
                  "Confidence of detected language. Range `[0, 1]`.",
                ).optional(),
                languageCode: z.string().describe(
                  "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
                ).optional(),
              })).describe(
                "A list of detected languages together with confidence.",
              ).optional(),
              layout: z.object({
                boundingPoly: z.object({
                  normalizedVertices: z.array(z.object({
                    x: z.number().describe("X coordinate.").optional(),
                    y: z.number().describe(
                      "Y coordinate (starts from the top of the image).",
                    ).optional(),
                  })).describe("The bounding polygon normalized vertices.")
                    .optional(),
                  vertices: z.array(z.object({
                    x: z.number().int().describe("X coordinate.").optional(),
                    y: z.number().int().describe(
                      "Y coordinate (starts from the top of the image).",
                    ).optional(),
                  })).describe("The bounding polygon vertices.").optional(),
                }).describe(
                  "A bounding polygon for the detected image annotation.",
                ).optional(),
                confidence: z.number().describe(
                  "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
                ).optional(),
                orientation: z.enum([
                  "ORIENTATION_UNSPECIFIED",
                  "PAGE_UP",
                  "PAGE_RIGHT",
                  "PAGE_DOWN",
                  "PAGE_LEFT",
                ]).describe("Detected orientation for the Layout.").optional(),
                textAnchor: z.object({
                  content: z.string().describe(
                    "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
                  ).optional(),
                  textSegments: z.array(z.object({
                    endIndex: z.string().describe(
                      "TextSegment half open end UTF-8 char index in the Document.text.",
                    ).optional(),
                    startIndex: z.string().describe(
                      "TextSegment start UTF-8 char index in the Document.text.",
                    ).optional(),
                  })).describe("The text segments from the Document.text.")
                    .optional(),
                }).describe("Text reference indexing into the Document.text.")
                  .optional(),
              }).describe("Visual element describing a layout unit on a page.")
                .optional(),
              rowSpan: z.number().int().describe(
                "How many rows this cell spans.",
              ).optional(),
            })).describe("Cells that make up this row.").optional(),
          })).describe("Header rows of the table.").optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
        })).describe("A list of visually detected tables on the page.")
          .optional(),
        tokens: z.array(z.object({
          detectedBreak: z.object({
            type: z.enum(["TYPE_UNSPECIFIED", "SPACE", "WIDE_SPACE", "HYPHEN"])
              .describe("Detected break type.").optional(),
          }).describe("Detected break at the end of a Token.").optional(),
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
          styleInfo: z.object({
            backgroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            bold: z.boolean().describe(
              "Whether the text is bold (equivalent to font_weight is at least `700`).",
            ).optional(),
            fontSize: z.number().int().describe(
              "Font size in points (`1` point is `¹⁄₇₂` inches).",
            ).optional(),
            fontType: z.string().describe("Name or style of the font.")
              .optional(),
            fontWeight: z.number().int().describe(
              "TrueType weight on a scale `100` (thin) to `1000` (ultra-heavy). Normal is `400`, bold is `700`.",
            ).optional(),
            handwritten: z.boolean().describe(
              "Whether the text is handwritten.",
            ).optional(),
            italic: z.boolean().describe("Whether the text is italic.")
              .optional(),
            letterSpacing: z.number().describe("Letter spacing in points.")
              .optional(),
            pixelFontSize: z.number().describe(
              "Font size in pixels, equal to _unrounded font_size_ * _resolution_ ÷ `72.0`.",
            ).optional(),
            smallcaps: z.boolean().describe(
              "Whether the text is in small caps. This feature is not supported yet.",
            ).optional(),
            strikeout: z.boolean().describe(
              "Whether the text is strikethrough. This feature is not supported yet.",
            ).optional(),
            subscript: z.boolean().describe(
              "Whether the text is a subscript. This feature is not supported yet.",
            ).optional(),
            superscript: z.boolean().describe(
              "Whether the text is a superscript. This feature is not supported yet.",
            ).optional(),
            textColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            underlined: z.boolean().describe("Whether the text is underlined.")
              .optional(),
          }).describe("Font and other text style attributes.").optional(),
        })).describe("A list of visually detected tokens on the page.")
          .optional(),
        transforms: z.array(z.object({
          cols: z.number().int().describe("Number of columns in the matrix.")
            .optional(),
          data: z.string().describe("The matrix data.").optional(),
          rows: z.number().int().describe("Number of rows in the matrix.")
            .optional(),
          type: z.number().int().describe(
            "This encodes information about what data type the matrix uses. For example, 0 (CV_8U) is an unsigned 8-bit image. For the full list of OpenCV primitive data types, please refer to https://docs.opencv.org/4.3.0/d1/d1b/group__core__hal__interface.html",
          ).optional(),
        })).describe(
          "Transformation matrices that were applied to the original document image to produce Page.image.",
        ).optional(),
        visualElements: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          type: z.string().describe("Type of the VisualElement.").optional(),
        })).describe(
          "A list of detected non-text visual elements e.g. checkbox, signature etc. on the page.",
        ).optional(),
      })).describe("Visual page layout for the Document.").optional(),
      revisions: z.array(z.object({
        agent: z.string().describe(
          "If the change was made by a person specify the name or id of that person.",
        ).optional(),
        createTime: z.string().describe(
          "The time that the revision was created, internally generated by doc proto storage at the time of create.",
        ).optional(),
        humanReview: z.object({
          state: z.string().describe(
            "Human review state. e.g. `requested`, `succeeded`, `rejected`.",
          ).optional(),
          stateMessage: z.string().describe(
            "A message providing more details about the current state of processing. For example, the rejection reason when the state is `rejected`.",
          ).optional(),
        }).describe("Human Review information of the document.").optional(),
        id: z.string().describe(
          "Id of the revision, internally generated by doc proto storage. Unique within the context of the document.",
        ).optional(),
        parent: z.array(z.number().int()).describe(
          "The revisions that this revision is based on. This can include one or more parent (when documents are merged.) This field represents the index into the `revisions` field.",
        ).optional(),
        parentIds: z.array(z.string()).describe(
          "The revisions that this revision is based on. Must include all the ids that have anything to do with this revision - eg. there are `provenance.parent.revision` fields that index into this field.",
        ).optional(),
        processor: z.string().describe(
          "If the annotation was made by processor identify the processor by its resource name.",
        ).optional(),
      })).describe("Placeholder. Revision history of this document.")
        .optional(),
      shardInfo: z.object({
        shardCount: z.string().describe("Total number of shards.").optional(),
        shardIndex: z.string().describe("The 0-based index of this shard.")
          .optional(),
        textOffset: z.string().describe(
          "The index of the first character in Document.text in the overall document global text.",
        ).optional(),
      }).describe(
        "For a large document, sharding may be performed to produce several document shards. Each document shard contains this field to detail which shard it is.",
      ).optional(),
      text: z.string().describe(
        "Optional. UTF-8 encoded text in reading order from the document.",
      ).optional(),
      textChanges: z.array(z.object({
        changedText: z.string().describe(
          "The text that replaces the text identified in the `text_anchor`.",
        ).optional(),
        provenance: z.array(z.object({
          id: z.number().int().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.array(z.object({
            id: z.number().int().describe("The id of the parent provenance.")
              .optional(),
            index: z.number().int().describe(
              "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the index into current revision's parent_ids list.",
            ).optional(),
          })).describe("References to the original elements that are replaced.")
            .optional(),
          revision: z.number().int().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.enum([
            "OPERATION_TYPE_UNSPECIFIED",
            "ADD",
            "REMOVE",
            "UPDATE",
            "REPLACE",
            "EVAL_REQUESTED",
            "EVAL_APPROVED",
            "EVAL_SKIPPED",
          ]).describe("The type of provenance operation.").optional(),
        })).describe("The history of this annotation.").optional(),
        textAnchor: z.object({
          content: z.string().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.array(z.object({
            endIndex: z.string().describe(
              "TextSegment half open end UTF-8 char index in the Document.text.",
            ).optional(),
            startIndex: z.string().describe(
              "TextSegment start UTF-8 char index in the Document.text.",
            ).optional(),
          })).describe("The text segments from the Document.text.").optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
      })).describe(
        "Placeholder. A list of text corrections made to Document.text. This is usually used for annotating corrections to OCR mistakes. Text changes for a given revision may not overlap with each other.",
      ).optional(),
      textStyles: z.array(z.object({
        backgroundColor: z.object({
          alpha: z.number().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.number().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.number().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.number().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
        color: z.object({
          alpha: z.number().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.number().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.number().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.number().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
        fontFamily: z.string().describe(
          "Font family such as `Arial`, `Times New Roman`. https://www.w3schools.com/cssref/pr_font_font-family.asp",
        ).optional(),
        fontSize: z.object({
          size: z.number().describe("Font size for the text.").optional(),
          unit: z.string().describe(
            "Unit for the font size. Follows CSS naming (such as `in`, `px`, and `pt`).",
          ).optional(),
        }).describe("Font size with unit.").optional(),
        fontWeight: z.string().describe(
          "[Font weight](https://www.w3schools.com/cssref/pr_font_weight.asp). Possible values are `normal`, `bold`, `bolder`, and `lighter`.",
        ).optional(),
        textAnchor: z.object({
          content: z.string().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.array(z.object({
            endIndex: z.string().describe(
              "TextSegment half open end UTF-8 char index in the Document.text.",
            ).optional(),
            startIndex: z.string().describe(
              "TextSegment start UTF-8 char index in the Document.text.",
            ).optional(),
          })).describe("The text segments from the Document.text.").optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
        textDecoration: z.string().describe(
          "[Text decoration](https://www.w3schools.com/cssref/pr_text_text-decoration.asp). Follows CSS standard.",
        ).optional(),
        textStyle: z.string().describe(
          "[Text style](https://www.w3schools.com/cssref/pr_font_font-style.asp). Possible values are `normal`, `italic`, and `oblique`.",
        ).optional(),
      })).describe("Styles for the Document.text.").optional(),
      uri: z.string().describe(
        "Optional. Currently supports Google Cloud Storage URI of the form `gs://bucket_name/object_name`. Object versioning is not supported. For more information, refer to [Google Cloud Storage Request URIs](https://cloud.google.com/storage/docs/reference-uris).",
      ).optional(),
    }).describe(
      "Document represents the canonical document resource in Document AI. It is an interchange format that provides insights into documents and allows for collaboration between users and Document AI to iterate and optimize for quality.",
    ).optional(),
    contentCategory: z.enum([
      "CONTENT_CATEGORY_UNSPECIFIED",
      "CONTENT_CATEGORY_IMAGE",
      "CONTENT_CATEGORY_AUDIO",
      "CONTENT_CATEGORY_VIDEO",
    ]).describe(
      "Indicates the category (image, audio, video etc.) of the original content.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time when the document is created.",
    ).optional(),
    creator: z.string().describe("The user who creates the document.")
      .optional(),
    displayName: z.string().describe(
      "Required. Display name of the document given by the user. This name will be displayed in the UI. Customer can populate this field with the name of the document. This differs from the 'title' field as 'title' is optional and stores the top heading in the document.",
    ).optional(),
    displayUri: z.string().describe(
      "Uri to display the document, for example, in the UI.",
    ).optional(),
    dispositionTime: z.string().describe(
      "Output only. If linked to a Collection with RetentionPolicy, the date when the document becomes mutable.",
    ).optional(),
    documentSchemaName: z.string().describe(
      "The Document schema name. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}.",
    ).optional(),
    inlineRawDocument: z.string().describe("Raw document content.").optional(),
    legalHold: z.boolean().describe(
      "Output only. Indicates if the document has a legal hold on it.",
    ).optional(),
    name: z.string().describe(
      "The resource name of the document. Format: projects/{project_number}/locations/{location}/documents/{document_id}. The name is ignored when creating a document.",
    ).optional(),
    plainText: z.string().describe("Other document format, such as PPTX, XLXS")
      .optional(),
    properties: z.array(z.object({
      dateTimeValues: z.object({
        values: z.array(z.object({
          day: z.number().int().describe(
            "Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day.",
          ).optional(),
          hours: z.number().int().describe(
            'Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.number().int().describe(
            "Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.",
          ).optional(),
          month: z.number().int().describe(
            "Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month.",
          ).optional(),
          nanos: z.number().int().describe(
            "Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0.",
          ).optional(),
          seconds: z.number().int().describe(
            "Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
          timeZone: z.object({
            id: z.string().describe(
              'IANA Time Zone Database time zone. For example "America/New_York".',
            ).optional(),
            version: z.string().describe(
              'Optional. IANA Time Zone Database version number. For example "2019a".',
            ).optional(),
          }).describe(
            "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
          ).optional(),
          utcOffset: z.string().describe(
            "UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.",
          ).optional(),
          year: z.number().int().describe(
            "Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year.",
          ).optional(),
        })).describe(
          "List of datetime values. Both OffsetDateTime and ZonedDateTime are supported.",
        ).optional(),
      }).describe("DateTime values.").optional(),
      enumValues: z.object({
        values: z.array(z.string()).describe("List of enum values.").optional(),
      }).describe("Enum values.").optional(),
      floatValues: z.object({
        values: z.array(z.number()).describe("List of float values.")
          .optional(),
      }).describe("Float values.").optional(),
      integerValues: z.object({
        values: z.array(z.number().int()).describe("List of integer values.")
          .optional(),
      }).describe("Integer values.").optional(),
      mapProperty: z.object({
        fields: z.record(
          z.string(),
          z.object({
            booleanValue: z.boolean().describe("Represents a boolean value.")
              .optional(),
            datetimeValue: z.object({
              day: z.number().int().describe(
                "Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day.",
              ).optional(),
              hours: z.number().int().describe(
                'Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
              ).optional(),
              minutes: z.number().int().describe(
                "Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.",
              ).optional(),
              month: z.number().int().describe(
                "Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month.",
              ).optional(),
              nanos: z.number().int().describe(
                "Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0.",
              ).optional(),
              seconds: z.number().int().describe(
                "Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds.",
              ).optional(),
              timeZone: z.object({
                id: z.string().describe(
                  'IANA Time Zone Database time zone. For example "America/New_York".',
                ).optional(),
                version: z.string().describe(
                  'Optional. IANA Time Zone Database version number. For example "2019a".',
                ).optional(),
              }).describe(
                "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
              ).optional(),
              utcOffset: z.string().describe(
                "UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.",
              ).optional(),
              year: z.number().int().describe(
                "Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year.",
              ).optional(),
            }).describe(
              "Represents civil time (or occasionally physical time). This type can represent a civil time in one of a few possible ways: * When utc_offset is set and time_zone is unset: a civil time on a calendar day with a particular offset from UTC. * When time_zone is set and utc_offset is unset: a civil time on a calendar day in a particular time zone. * When neither time_zone nor utc_offset is set: a civil time on a calendar day in local time. The date is relative to the Proleptic Gregorian Calendar. If year, month, or day are 0, the DateTime is considered not to have a specific year, month, or day respectively. This type may also be used to represent a physical time if all the date and time fields are set and either case of the `time_offset` oneof is set. Consider using `Timestamp` message for physical time instead. If your use case also would like to store the user's timezone, that can be done in another field. This type is more flexible than some applications may want. Make sure to document and validate your application's limitations.",
            ).optional(),
            enumValue: z.object({
              value: z.string().describe(
                "String value of the enum field. This must match defined set of enums in document schema using EnumTypeOptions.",
              ).optional(),
            }).describe("Represents the string value of the enum field.")
              .optional(),
            floatValue: z.number().describe("Represents a float value.")
              .optional(),
            intValue: z.number().int().describe("Represents a integer value.")
              .optional(),
            stringValue: z.string().describe("Represents a string value.")
              .optional(),
            timestampValue: z.object({
              textValue: z.string().describe(
                'The string must represent a valid instant in UTC and is parsed using java.time.format.DateTimeFormatter.ISO_INSTANT. e.g. "2013-09-29T18:46:19Z"',
              ).optional(),
              timestampValue: z.string().describe("Timestamp value").optional(),
            }).describe("Timestamp value type.").optional(),
          }),
        ).describe("Unordered map of dynamically typed values.").optional(),
      }).describe(
        "Map property value. Represents a structured entries of key value pairs, consisting of field names which map to dynamically typed values.",
      ).optional(),
      name: z.string().describe(
        "Required. Must match the name of a PropertyDefinition in the DocumentSchema.",
      ).optional(),
      propertyValues: z.object({
        properties: z.array(z.string()).describe("List of property values.")
          .optional(),
      }).describe("Property values.").optional(),
      textValues: z.object({
        values: z.array(z.string()).describe("List of text values.").optional(),
      }).describe("String/text values.").optional(),
      timestampValues: z.object({
        values: z.array(z.object({
          textValue: z.string().describe(
            'The string must represent a valid instant in UTC and is parsed using java.time.format.DateTimeFormatter.ISO_INSTANT. e.g. "2013-09-29T18:46:19Z"',
          ).optional(),
          timestampValue: z.string().describe("Timestamp value").optional(),
        })).describe("List of timestamp values.").optional(),
      }).describe("Timestamp values.").optional(),
    })).describe("List of values that are user supplied metadata.").optional(),
    rawDocumentFileType: z.enum([
      "RAW_DOCUMENT_FILE_TYPE_UNSPECIFIED",
      "RAW_DOCUMENT_FILE_TYPE_PDF",
      "RAW_DOCUMENT_FILE_TYPE_DOCX",
      "RAW_DOCUMENT_FILE_TYPE_XLSX",
      "RAW_DOCUMENT_FILE_TYPE_PPTX",
      "RAW_DOCUMENT_FILE_TYPE_TEXT",
      "RAW_DOCUMENT_FILE_TYPE_TIFF",
    ]).describe(
      "This is used when DocAI was not used to load the document and parsing/ extracting is needed for the inline_raw_document. For example, if inline_raw_document is the byte representation of a PDF file, then this should be set to: RAW_DOCUMENT_FILE_TYPE_PDF.",
    ).optional(),
    rawDocumentPath: z.string().describe(
      "Raw document file in Cloud Storage path.",
    ).optional(),
    referenceId: z.string().describe(
      "The reference ID set by customers. Must be unique per project and location.",
    ).optional(),
    textExtractionDisabled: z.boolean().describe(
      "If true, text extraction will not be performed.",
    ).optional(),
    textExtractionEnabled: z.boolean().describe(
      "If true, text extraction will be performed.",
    ).optional(),
    title: z.string().describe(
      "Title that describes the document. This can be the top heading or text that describes the document.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the document is last updated.",
    ).optional(),
    updater: z.string().describe("The user who lastly updates the document.")
      .optional(),
  }).describe("Defines the structure for content warehouse document proto.")
    .optional(),
  requestMetadata: z.object({
    userInfo: z.object({
      groupIds: z.array(z.string()).describe(
        'The unique group identifications which the user is belong to. The format is "group:yyyy@example.com";',
      ).optional(),
      id: z.string().describe(
        'A unique user identification string, as determined by the client. The maximum number of allowed characters is 255. Allowed characters include numbers 0 to 9, uppercase and lowercase letters, and restricted special symbols (:, @, +, -, _, ~) The format is "user:xxxx@example.com";',
      ).optional(),
    }).describe("The user information.").optional(),
  }).describe(
    "Meta information is used to improve the performance of the service.",
  ).optional(),
  updateOptions: z.object({
    mergeFieldsOptions: z.object({
      replaceMessageFields: z.boolean().describe(
        "When merging message fields, the default behavior is to merge the content of two message fields together. If you instead want to use the field from the source message to replace the corresponding field in the destination message, set this flag to true. When this flag is set, specified submessage fields that are missing in source will be cleared in destination.",
      ).optional(),
      replaceRepeatedFields: z.boolean().describe(
        "When merging repeated fields, the default behavior is to append entries from the source repeated field to the destination repeated field. If you instead want to keep only the entries from the source repeated field, set this flag to true. If you want to replace a repeated field within a message field on the destination message, you must set both replace_repeated_fields and replace_message_fields to true, otherwise the repeated fields will be appended.",
      ).optional(),
    }).describe("Options for merging updated fields.").optional(),
    updateMask: z.string().describe(
      "Field mask for merging Document fields. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask",
    ).optional(),
    updateType: z.enum([
      "UPDATE_TYPE_UNSPECIFIED",
      "UPDATE_TYPE_REPLACE",
      "UPDATE_TYPE_MERGE",
      "UPDATE_TYPE_INSERT_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_REPLACE_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_DELETE_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_MERGE_AND_REPLACE_OR_INSERT_PROPERTIES_BY_NAMES",
    ]).describe("Type for update.").optional(),
  }).describe("Options for Update operations.").optional(),
});

const StateSchema = z.object({
  cloudAiDocument: z.object({
    chunkedDocument: z.object({
      chunks: z.array(z.object({
        chunkId: z.string(),
        content: z.string(),
        pageFooters: z.array(z.object({
          pageSpan: z.object({
            pageEnd: z.number(),
            pageStart: z.number(),
          }),
          text: z.string(),
        })),
        pageHeaders: z.array(z.object({
          pageSpan: z.object({
            pageEnd: z.number(),
            pageStart: z.number(),
          }),
          text: z.string(),
        })),
        pageSpan: z.object({
          pageEnd: z.number(),
          pageStart: z.number(),
        }),
        sourceBlockIds: z.array(z.string()),
      })),
    }),
    content: z.string(),
    documentLayout: z.object({
      blocks: z.array(z.object({
        blockId: z.string(),
        listBlock: z.object({
          listEntries: z.array(z.object({
            blocks: z.array(z.string()),
          })),
          type: z.string(),
        }),
        pageSpan: z.object({
          pageEnd: z.number(),
          pageStart: z.number(),
        }),
        tableBlock: z.object({
          bodyRows: z.array(z.object({
            cells: z.array(z.object({
              blocks: z.array(z.string()),
              colSpan: z.number(),
              rowSpan: z.number(),
            })),
          })),
          caption: z.string(),
          headerRows: z.array(z.object({
            cells: z.array(z.object({
              blocks: z.array(z.string()),
              colSpan: z.number(),
              rowSpan: z.number(),
            })),
          })),
        }),
        textBlock: z.object({
          blocks: z.array(z.string()),
          text: z.string(),
          type: z.string(),
        }),
      })),
    }),
    entities: z.array(z.object({
      confidence: z.number(),
      id: z.string(),
      mentionId: z.string(),
      mentionText: z.string(),
      normalizedValue: z.object({
        addressValue: z.object({
          addressLines: z.array(z.string()),
          administrativeArea: z.string(),
          languageCode: z.string(),
          locality: z.string(),
          organization: z.string(),
          postalCode: z.string(),
          recipients: z.array(z.string()),
          regionCode: z.string(),
          revision: z.number(),
          sortingCode: z.string(),
          sublocality: z.string(),
        }),
        booleanValue: z.boolean(),
        dateValue: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        datetimeValue: z.object({
          day: z.number(),
          hours: z.number(),
          minutes: z.number(),
          month: z.number(),
          nanos: z.number(),
          seconds: z.number(),
          timeZone: z.object({
            id: z.string(),
            version: z.string(),
          }),
          utcOffset: z.string(),
          year: z.number(),
        }),
        floatValue: z.number(),
        integerValue: z.number(),
        moneyValue: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        text: z.string(),
      }),
      pageAnchor: z.object({
        pageRefs: z.array(z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          layoutId: z.string(),
          layoutType: z.string(),
          page: z.string(),
        })),
      }),
      properties: z.array(z.string()),
      provenance: z.object({
        id: z.number(),
        parents: z.array(z.object({
          id: z.number(),
          index: z.number(),
          revision: z.number(),
        })),
        revision: z.number(),
        type: z.string(),
      }),
      redacted: z.boolean(),
      textAnchor: z.object({
        content: z.string(),
        textSegments: z.array(z.object({
          endIndex: z.string(),
          startIndex: z.string(),
        })),
      }),
      type: z.string(),
    })),
    entityRelations: z.array(z.object({
      objectId: z.string(),
      relation: z.string(),
      subjectId: z.string(),
    })),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    mimeType: z.string(),
    pages: z.array(z.object({
      blocks: z.array(z.object({
        detectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
        provenance: z.object({
          id: z.number(),
          parents: z.array(z.object({
            id: z.number(),
            index: z.number(),
            revision: z.number(),
          })),
          revision: z.number(),
          type: z.string(),
        }),
      })),
      detectedBarcodes: z.array(z.object({
        barcode: z.object({
          format: z.string(),
          rawValue: z.string(),
          valueFormat: z.string(),
        }),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
      })),
      detectedLanguages: z.array(z.object({
        confidence: z.number(),
        languageCode: z.string(),
      })),
      dimension: z.object({
        height: z.number(),
        unit: z.string(),
        width: z.number(),
      }),
      formFields: z.array(z.object({
        correctedKeyText: z.string(),
        correctedValueText: z.string(),
        fieldName: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
        fieldValue: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
        nameDetectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        provenance: z.object({
          id: z.number(),
          parents: z.array(z.object({
            id: z.number(),
            index: z.number(),
            revision: z.number(),
          })),
          revision: z.number(),
          type: z.string(),
        }),
        valueDetectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        valueType: z.string(),
      })),
      image: z.object({
        content: z.string(),
        height: z.number(),
        mimeType: z.string(),
        width: z.number(),
      }),
      imageQualityScores: z.object({
        detectedDefects: z.array(z.object({
          confidence: z.number(),
          type: z.string(),
        })),
        qualityScore: z.number(),
      }),
      layout: z.object({
        boundingPoly: z.object({
          normalizedVertices: z.array(z.object({
            x: z.number(),
            y: z.number(),
          })),
          vertices: z.array(z.object({
            x: z.number(),
            y: z.number(),
          })),
        }),
        confidence: z.number(),
        orientation: z.string(),
        textAnchor: z.object({
          content: z.string(),
          textSegments: z.array(z.object({
            endIndex: z.string(),
            startIndex: z.string(),
          })),
        }),
      }),
      lines: z.array(z.object({
        detectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
        provenance: z.object({
          id: z.number(),
          parents: z.array(z.object({
            id: z.number(),
            index: z.number(),
            revision: z.number(),
          })),
          revision: z.number(),
          type: z.string(),
        }),
      })),
      pageNumber: z.number(),
      paragraphs: z.array(z.object({
        detectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
        provenance: z.object({
          id: z.number(),
          parents: z.array(z.object({
            id: z.number(),
            index: z.number(),
            revision: z.number(),
          })),
          revision: z.number(),
          type: z.string(),
        }),
      })),
      provenance: z.object({
        id: z.number(),
        parents: z.array(z.object({
          id: z.number(),
          index: z.number(),
          revision: z.number(),
        })),
        revision: z.number(),
        type: z.string(),
      }),
      symbols: z.array(z.object({
        detectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
      })),
      tables: z.array(z.object({
        bodyRows: z.array(z.object({
          cells: z.array(z.object({
            colSpan: z.number(),
            detectedLanguages: z.array(z.object({
              confidence: z.number(),
              languageCode: z.string(),
            })),
            layout: z.object({
              boundingPoly: z.object({
                normalizedVertices: z.array(z.object({
                  x: z.number(),
                  y: z.number(),
                })),
                vertices: z.array(z.object({
                  x: z.number(),
                  y: z.number(),
                })),
              }),
              confidence: z.number(),
              orientation: z.string(),
              textAnchor: z.object({
                content: z.string(),
                textSegments: z.array(z.object({
                  endIndex: z.string(),
                  startIndex: z.string(),
                })),
              }),
            }),
            rowSpan: z.number(),
          })),
        })),
        detectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        headerRows: z.array(z.object({
          cells: z.array(z.object({
            colSpan: z.number(),
            detectedLanguages: z.array(z.object({
              confidence: z.number(),
              languageCode: z.string(),
            })),
            layout: z.object({
              boundingPoly: z.object({
                normalizedVertices: z.array(z.object({
                  x: z.number(),
                  y: z.number(),
                })),
                vertices: z.array(z.object({
                  x: z.number(),
                  y: z.number(),
                })),
              }),
              confidence: z.number(),
              orientation: z.string(),
              textAnchor: z.object({
                content: z.string(),
                textSegments: z.array(z.object({
                  endIndex: z.string(),
                  startIndex: z.string(),
                })),
              }),
            }),
            rowSpan: z.number(),
          })),
        })),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
        provenance: z.object({
          id: z.number(),
          parents: z.array(z.object({
            id: z.number(),
            index: z.number(),
            revision: z.number(),
          })),
          revision: z.number(),
          type: z.string(),
        }),
      })),
      tokens: z.array(z.object({
        detectedBreak: z.object({
          type: z.string(),
        }),
        detectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
        provenance: z.object({
          id: z.number(),
          parents: z.array(z.object({
            id: z.number(),
            index: z.number(),
            revision: z.number(),
          })),
          revision: z.number(),
          type: z.string(),
        }),
        styleInfo: z.object({
          backgroundColor: z.object({
            alpha: z.number(),
            blue: z.number(),
            green: z.number(),
            red: z.number(),
          }),
          bold: z.boolean(),
          fontSize: z.number(),
          fontType: z.string(),
          fontWeight: z.number(),
          handwritten: z.boolean(),
          italic: z.boolean(),
          letterSpacing: z.number(),
          pixelFontSize: z.number(),
          smallcaps: z.boolean(),
          strikeout: z.boolean(),
          subscript: z.boolean(),
          superscript: z.boolean(),
          textColor: z.object({
            alpha: z.number(),
            blue: z.number(),
            green: z.number(),
            red: z.number(),
          }),
          underlined: z.boolean(),
        }),
      })),
      transforms: z.array(z.object({
        cols: z.number(),
        data: z.string(),
        rows: z.number(),
        type: z.number(),
      })),
      visualElements: z.array(z.object({
        detectedLanguages: z.array(z.object({
          confidence: z.number(),
          languageCode: z.string(),
        })),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
            vertices: z.array(z.object({
              x: z.number(),
              y: z.number(),
            })),
          }),
          confidence: z.number(),
          orientation: z.string(),
          textAnchor: z.object({
            content: z.string(),
            textSegments: z.array(z.object({
              endIndex: z.string(),
              startIndex: z.string(),
            })),
          }),
        }),
        type: z.string(),
      })),
    })),
    revisions: z.array(z.object({
      agent: z.string(),
      createTime: z.string(),
      humanReview: z.object({
        state: z.string(),
        stateMessage: z.string(),
      }),
      id: z.string(),
      parent: z.array(z.number()),
      parentIds: z.array(z.string()),
      processor: z.string(),
    })),
    shardInfo: z.object({
      shardCount: z.string(),
      shardIndex: z.string(),
      textOffset: z.string(),
    }),
    text: z.string(),
    textChanges: z.array(z.object({
      changedText: z.string(),
      provenance: z.array(z.object({
        id: z.number(),
        parents: z.array(z.object({
          id: z.number(),
          index: z.number(),
          revision: z.number(),
        })),
        revision: z.number(),
        type: z.string(),
      })),
      textAnchor: z.object({
        content: z.string(),
        textSegments: z.array(z.object({
          endIndex: z.string(),
          startIndex: z.string(),
        })),
      }),
    })),
    textStyles: z.array(z.object({
      backgroundColor: z.object({
        alpha: z.number(),
        blue: z.number(),
        green: z.number(),
        red: z.number(),
      }),
      color: z.object({
        alpha: z.number(),
        blue: z.number(),
        green: z.number(),
        red: z.number(),
      }),
      fontFamily: z.string(),
      fontSize: z.object({
        size: z.number(),
        unit: z.string(),
      }),
      fontWeight: z.string(),
      textAnchor: z.object({
        content: z.string(),
        textSegments: z.array(z.object({
          endIndex: z.string(),
          startIndex: z.string(),
        })),
      }),
      textDecoration: z.string(),
      textStyle: z.string(),
    })),
    uri: z.string(),
  }).optional(),
  contentCategory: z.string().optional(),
  createTime: z.string().optional(),
  creator: z.string().optional(),
  displayName: z.string().optional(),
  displayUri: z.string().optional(),
  dispositionTime: z.string().optional(),
  documentSchemaName: z.string().optional(),
  inlineRawDocument: z.string().optional(),
  legalHold: z.boolean().optional(),
  name: z.string(),
  plainText: z.string().optional(),
  properties: z.array(z.object({
    dateTimeValues: z.object({
      values: z.array(z.object({
        day: z.number(),
        hours: z.number(),
        minutes: z.number(),
        month: z.number(),
        nanos: z.number(),
        seconds: z.number(),
        timeZone: z.object({
          id: z.string(),
          version: z.string(),
        }),
        utcOffset: z.string(),
        year: z.number(),
      })),
    }),
    enumValues: z.object({
      values: z.array(z.string()),
    }),
    floatValues: z.object({
      values: z.array(z.number()),
    }),
    integerValues: z.object({
      values: z.array(z.number()),
    }),
    mapProperty: z.object({
      fields: z.record(z.string(), z.unknown()),
    }),
    name: z.string(),
    propertyValues: z.object({
      properties: z.array(z.string()),
    }),
    textValues: z.object({
      values: z.array(z.string()),
    }),
    timestampValues: z.object({
      values: z.array(z.object({
        textValue: z.string(),
        timestampValue: z.string(),
      })),
    }),
  })).optional(),
  rawDocumentFileType: z.string().optional(),
  rawDocumentPath: z.string().optional(),
  referenceId: z.string().optional(),
  textExtractionDisabled: z.boolean().optional(),
  textExtractionEnabled: z.boolean().optional(),
  title: z.string().optional(),
  updateTime: z.string().optional(),
  updater: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  cloudAiDocumentOption: z.object({
    customizedEntitiesPropertiesConversions: z.record(z.string(), z.string())
      .describe(
        "If set, only selected entities will be converted to properties.",
      ).optional(),
    enableEntitiesConversions: z.boolean().describe(
      "Whether to convert all the entities to properties.",
    ).optional(),
  }).describe("Request Option for processing Cloud AI Document in CW Document.")
    .optional(),
  document: z.object({
    cloudAiDocument: z.object({
      chunkedDocument: z.object({
        chunks: z.array(z.object({
          chunkId: z.string().describe("ID of the chunk.").optional(),
          content: z.string().describe("Text content of the chunk.").optional(),
          pageFooters: z.array(z.object({
            pageSpan: z.object({
              pageEnd: z.number().int().describe(
                "Page where chunk ends in the document.",
              ).optional(),
              pageStart: z.number().int().describe(
                "Page where chunk starts in the document.",
              ).optional(),
            }).describe(
              "Represents where the chunk starts and ends in the document.",
            ).optional(),
            text: z.string().describe("Footer in text format.").optional(),
          })).describe("Page footers associated with the chunk.").optional(),
          pageHeaders: z.array(z.object({
            pageSpan: z.object({
              pageEnd: z.number().int().describe(
                "Page where chunk ends in the document.",
              ).optional(),
              pageStart: z.number().int().describe(
                "Page where chunk starts in the document.",
              ).optional(),
            }).describe(
              "Represents where the chunk starts and ends in the document.",
            ).optional(),
            text: z.string().describe("Header in text format.").optional(),
          })).describe("Page headers associated with the chunk.").optional(),
          pageSpan: z.object({
            pageEnd: z.number().int().describe(
              "Page where chunk ends in the document.",
            ).optional(),
            pageStart: z.number().int().describe(
              "Page where chunk starts in the document.",
            ).optional(),
          }).describe(
            "Represents where the chunk starts and ends in the document.",
          ).optional(),
          sourceBlockIds: z.array(z.string()).describe("Unused.").optional(),
        })).describe("List of chunks.").optional(),
      }).describe("Represents the chunks that the document is divided into.")
        .optional(),
      content: z.string().describe(
        "Optional. Inline document content, represented as a stream of bytes. Note: As with all `bytes` fields, protobuffers use a pure binary representation, whereas JSON representations use base64.",
      ).optional(),
      documentLayout: z.object({
        blocks: z.array(z.object({
          blockId: z.string().describe("ID of the block.").optional(),
          listBlock: z.object({
            listEntries: z.array(z.object({
              blocks: z.array(z.string()).describe(
                "A list entry is a list of blocks. Repeated blocks support further hierarchies and nested blocks.",
              ).optional(),
            })).describe("List entries that constitute a list block.")
              .optional(),
            type: z.string().describe(
              "Type of the list_entries (if exist). Available options are `ordered` and `unordered`.",
            ).optional(),
          }).describe("Represents a list type block.").optional(),
          pageSpan: z.object({
            pageEnd: z.number().int().describe(
              "Page where block ends in the document.",
            ).optional(),
            pageStart: z.number().int().describe(
              "Page where block starts in the document.",
            ).optional(),
          }).describe(
            "Represents where the block starts and ends in the document.",
          ).optional(),
          tableBlock: z.object({
            bodyRows: z.array(z.object({
              cells: z.array(z.object({
                blocks: z.array(z.string()).describe(
                  "A table cell is a list of blocks. Repeated blocks support further hierarchies and nested blocks.",
                ).optional(),
                colSpan: z.number().int().describe(
                  "How many columns this cell spans.",
                ).optional(),
                rowSpan: z.number().int().describe(
                  "How many rows this cell spans.",
                ).optional(),
              })).describe("A table row is a list of table cells.").optional(),
            })).describe("Body rows containing main table content.").optional(),
            caption: z.string().describe("Table caption/title.").optional(),
            headerRows: z.array(z.object({
              cells: z.array(z.object({
                blocks: z.array(z.string()).describe(
                  "A table cell is a list of blocks. Repeated blocks support further hierarchies and nested blocks.",
                ).optional(),
                colSpan: z.number().int().describe(
                  "How many columns this cell spans.",
                ).optional(),
                rowSpan: z.number().int().describe(
                  "How many rows this cell spans.",
                ).optional(),
              })).describe("A table row is a list of table cells.").optional(),
            })).describe("Header rows at the top of the table.").optional(),
          }).describe("Represents a table type block.").optional(),
          textBlock: z.object({
            blocks: z.array(z.string()).describe(
              "A text block could further have child blocks. Repeated blocks support further hierarchies and nested blocks.",
            ).optional(),
            text: z.string().describe("Text content stored in the block.")
              .optional(),
            type: z.string().describe(
              "Type of the text in the block. Available options are: `paragraph`, `subtitle`, `heading-1`, `heading-2`, `heading-3`, `heading-4`, `heading-5`, `header`, `footer`.",
            ).optional(),
          }).describe("Represents a text type block.").optional(),
        })).describe("List of blocks in the document.").optional(),
      }).describe(
        "Represents the parsed layout of a document as a collection of blocks that the document is divided into.",
      ).optional(),
      entities: z.array(z.object({
        confidence: z.number().describe(
          "Optional. Confidence of detected Schema entity. Range `[0, 1]`.",
        ).optional(),
        id: z.string().describe(
          "Optional. Canonical id. This will be a unique value in the entity list for this document.",
        ).optional(),
        mentionId: z.string().describe(
          "Optional. Deprecated. Use `id` field instead.",
        ).optional(),
        mentionText: z.string().describe(
          "Optional. Text value of the entity e.g. `1600 Amphitheatre Pkwy`.",
        ).optional(),
        normalizedValue: z.object({
          addressValue: z.object({
            addressLines: z.array(z.string()).describe(
              'Unstructured address lines describing the lower levels of an address. Because values in address_lines do not have type information and may sometimes contain multiple values in a single field (For example "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country/region of the address. In places where this can vary (For example Japan), address_language is used to make it explicit (For example "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). This way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a region_code with all remaining information placed in the address_lines. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a region_code and address_lines, and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas).',
            ).optional(),
            administrativeArea: z.string().describe(
              'Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. Specifically, for Spain this is the province and not the autonomous community (For example "Barcelona" and not "Catalonia"). Many countries don\'t use an administrative area in postal addresses. For example in Switzerland this should be left unpopulated.',
            ).optional(),
            languageCode: z.string().describe(
              'Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address\' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en".',
            ).optional(),
            locality: z.string().describe(
              "Optional. Generally refers to the city/town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave locality empty and use address_lines.",
            ).optional(),
            organization: z.string().describe(
              "Optional. The name of the organization at the address.",
            ).optional(),
            postalCode: z.string().describe(
              "Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (For example state/zip validation in the U.S.A.).",
            ).optional(),
            recipients: z.array(z.string()).describe(
              'Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information.',
            ).optional(),
            regionCode: z.string().describe(
              'Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland.',
            ).optional(),
            revision: z.number().int().describe(
              "The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions.",
            ).optional(),
            sortingCode: z.string().describe(
              'Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (For example "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (For example Côte d\'Ivoire).',
            ).optional(),
            sublocality: z.string().describe(
              "Optional. Sublocality of the address. For example, this can be neighborhoods, boroughs, districts.",
            ).optional(),
          }).describe(
            "Represents a postal address. For example for postal delivery or payments addresses. Given a postal address, a postal service can deliver items to a premise, P.O. Box or similar. It is not intended to model geographical locations (roads, towns, mountains). In typical usage an address would be created by user input or from importing existing data, depending on the type of process. Advice on address input / editing: - Use an internationalization-ready address widget such as https://github.com/google/libaddressinput) - Users should not be presented with UI elements for input or editing of fields outside countries where that field is used. For more guidance on how to use this schema, see: https://support.google.com/business/answer/6397478",
          ).optional(),
          booleanValue: z.boolean().describe(
            "Boolean value. Can be used for entities with binary values, or for checkboxes.",
          ).optional(),
          dateValue: z.object({
            day: z.number().int().describe(
              "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
            ).optional(),
            month: z.number().int().describe(
              "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
            ).optional(),
            year: z.number().int().describe(
              "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
            ).optional(),
          }).describe(
            "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
          ).optional(),
          datetimeValue: z.object({
            day: z.number().int().describe(
              "Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day.",
            ).optional(),
            hours: z.number().int().describe(
              'Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
            ).optional(),
            minutes: z.number().int().describe(
              "Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.",
            ).optional(),
            month: z.number().int().describe(
              "Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month.",
            ).optional(),
            nanos: z.number().int().describe(
              "Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0.",
            ).optional(),
            seconds: z.number().int().describe(
              "Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds.",
            ).optional(),
            timeZone: z.object({
              id: z.string().describe(
                'IANA Time Zone Database time zone. For example "America/New_York".',
              ).optional(),
              version: z.string().describe(
                'Optional. IANA Time Zone Database version number. For example "2019a".',
              ).optional(),
            }).describe(
              "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
            ).optional(),
            utcOffset: z.string().describe(
              "UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.",
            ).optional(),
            year: z.number().int().describe(
              "Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year.",
            ).optional(),
          }).describe(
            "Represents civil time (or occasionally physical time). This type can represent a civil time in one of a few possible ways: * When utc_offset is set and time_zone is unset: a civil time on a calendar day with a particular offset from UTC. * When time_zone is set and utc_offset is unset: a civil time on a calendar day in a particular time zone. * When neither time_zone nor utc_offset is set: a civil time on a calendar day in local time. The date is relative to the Proleptic Gregorian Calendar. If year, month, or day are 0, the DateTime is considered not to have a specific year, month, or day respectively. This type may also be used to represent a physical time if all the date and time fields are set and either case of the `time_offset` oneof is set. Consider using `Timestamp` message for physical time instead. If your use case also would like to store the user's timezone, that can be done in another field. This type is more flexible than some applications may want. Make sure to document and validate your application's limitations.",
          ).optional(),
          floatValue: z.number().describe("Float value.").optional(),
          integerValue: z.number().int().describe("Integer value.").optional(),
          moneyValue: z.object({
            currencyCode: z.string().describe(
              "The three-letter currency code defined in ISO 4217.",
            ).optional(),
            nanos: z.number().int().describe(
              "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
            ).optional(),
            units: z.string().describe(
              'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
            ).optional(),
          }).describe("Represents an amount of money with its currency type.")
            .optional(),
          text: z.string().describe(
            "Optional. An optional field to store a normalized string. For some entity types, one of respective `structured_value` fields may also be populated. Also not all the types of `structured_value` will be normalized. For example, some processors may not generate `float` or `integer` normalized text by default. Below are sample formats mapped to structured values. - Money/Currency type (`money_value`) is in the ISO 4217 text format. - Date type (`date_value`) is in the ISO 8601 text format. - Datetime type (`datetime_value`) is in the ISO 8601 text format.",
          ).optional(),
        }).describe("Parsed and normalized entity value.").optional(),
        pageAnchor: z.object({
          pageRefs: z.array(z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Optional. Confidence of detected page element, if applicable. Range `[0, 1]`.",
            ).optional(),
            layoutId: z.string().describe(
              "Optional. Deprecated. Use PageRef.bounding_poly instead.",
            ).optional(),
            layoutType: z.enum([
              "LAYOUT_TYPE_UNSPECIFIED",
              "BLOCK",
              "PARAGRAPH",
              "LINE",
              "TOKEN",
              "VISUAL_ELEMENT",
              "TABLE",
              "FORM_FIELD",
            ]).describe(
              "Optional. The type of the layout element that is being referenced if any.",
            ).optional(),
            page: z.string().describe(
              "Required. Index into the Document.pages element, for example using `Document.pages` to locate the related page element. This field is skipped when its value is the default `0`. See https://developers.google.com/protocol-buffers/docs/proto3#json.",
            ).optional(),
          })).describe("One or more references to visual page elements")
            .optional(),
        }).describe(
          "Referencing the visual context of the entity in the Document.pages. Page anchors can be cross-page, consist of multiple bounding polygons and optionally reference specific layout element types.",
        ).optional(),
        properties: z.array(z.string()).describe(
          "Optional. Entities can be nested to form a hierarchical data structure representing the content in the document.",
        ).optional(),
        provenance: z.object({
          id: z.number().int().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.array(z.object({
            id: z.number().int().describe("The id of the parent provenance.")
              .optional(),
            index: z.number().int().describe(
              "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the index into current revision's parent_ids list.",
            ).optional(),
          })).describe("References to the original elements that are replaced.")
            .optional(),
          revision: z.number().int().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.enum([
            "OPERATION_TYPE_UNSPECIFIED",
            "ADD",
            "REMOVE",
            "UPDATE",
            "REPLACE",
            "EVAL_REQUESTED",
            "EVAL_APPROVED",
            "EVAL_SKIPPED",
          ]).describe("The type of provenance operation.").optional(),
        }).describe(
          "Structure to identify provenance relationships between annotations in different revisions.",
        ).optional(),
        redacted: z.boolean().describe(
          "Optional. Whether the entity will be redacted for de-identification purposes.",
        ).optional(),
        textAnchor: z.object({
          content: z.string().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.array(z.object({
            endIndex: z.string().describe(
              "TextSegment half open end UTF-8 char index in the Document.text.",
            ).optional(),
            startIndex: z.string().describe(
              "TextSegment start UTF-8 char index in the Document.text.",
            ).optional(),
          })).describe("The text segments from the Document.text.").optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
        type: z.string().describe(
          "Required. Entity type from a schema e.g. `Address`.",
        ).optional(),
      })).describe(
        "A list of entities detected on Document.text. For document shards, entities in this list may cross shard boundaries.",
      ).optional(),
      entityRelations: z.array(z.object({
        objectId: z.string().describe("Object entity id.").optional(),
        relation: z.string().describe("Relationship description.").optional(),
        subjectId: z.string().describe("Subject entity id.").optional(),
      })).describe("Placeholder. Relationship among Document.entities.")
        .optional(),
      error: z.object({
        code: z.number().int().describe(
          "The status code, which should be an enum value of google.rpc.Code.",
        ).optional(),
        details: z.array(z.record(z.string(), z.string())).describe(
          "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
        ).optional(),
        message: z.string().describe(
          "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
        ).optional(),
      }).describe(
        "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
      ).optional(),
      mimeType: z.string().describe(
        "An IANA published [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml).",
      ).optional(),
      pages: z.array(z.object({
        blocks: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
        })).describe(
          "A list of visually detected text blocks on the page. A block has a set of lines (collected into paragraphs) that have a common line-spacing and orientation.",
        ).optional(),
        detectedBarcodes: z.array(z.object({
          barcode: z.object({
            format: z.string().describe(
              "Format of a barcode. The supported formats are: - `CODE_128`: Code 128 type. - `CODE_39`: Code 39 type. - `CODE_93`: Code 93 type. - `CODABAR`: Codabar type. - `DATA_MATRIX`: 2D Data Matrix type. - `ITF`: ITF type. - `EAN_13`: EAN-13 type. - `EAN_8`: EAN-8 type. - `QR_CODE`: 2D QR code type. - `UPC_A`: UPC-A type. - `UPC_E`: UPC-E type. - `PDF417`: PDF417 type. - `AZTEC`: 2D Aztec code type. - `DATABAR`: GS1 DataBar code type.",
            ).optional(),
            rawValue: z.string().describe(
              "Raw value encoded in the barcode. For example: `'MEBKM:TITLE:Google;URL:https://www.google.com;;'`.",
            ).optional(),
            valueFormat: z.string().describe(
              "Value format describes the format of the value that a barcode encodes. The supported formats are: - `CONTACT_INFO`: Contact information. - `EMAIL`: Email address. - `ISBN`: ISBN identifier. - `PHONE`: Phone number. - `PRODUCT`: Product. - `SMS`: SMS message. - `TEXT`: Text string. - `URL`: URL address. - `WIFI`: Wifi information. - `GEO`: Geo-localization. - `CALENDAR_EVENT`: Calendar event. - `DRIVER_LICENSE`: Driver's license.",
            ).optional(),
          }).describe("Encodes the detailed information of a barcode.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
        })).describe("A list of detected barcodes.").optional(),
        detectedLanguages: z.array(z.object({
          confidence: z.number().describe(
            "Confidence of detected language. Range `[0, 1]`.",
          ).optional(),
          languageCode: z.string().describe(
            "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
          ).optional(),
        })).describe("A list of detected languages together with confidence.")
          .optional(),
        dimension: z.object({
          height: z.number().describe("Page height.").optional(),
          unit: z.string().describe("Dimension unit.").optional(),
          width: z.number().describe("Page width.").optional(),
        }).describe("Dimension for the page.").optional(),
        formFields: z.array(z.object({
          correctedKeyText: z.string().describe(
            "Created for Labeling UI to export key text. If corrections were made to the text identified by the `field_name.text_anchor`, this field will contain the correction.",
          ).optional(),
          correctedValueText: z.string().describe(
            "Created for Labeling UI to export value text. If corrections were made to the text identified by the `field_value.text_anchor`, this field will contain the correction.",
          ).optional(),
          fieldName: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          fieldValue: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          nameDetectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe(
            "A list of detected languages for name together with confidence.",
          ).optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
          valueDetectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe(
            "A list of detected languages for value together with confidence.",
          ).optional(),
          valueType: z.string().describe(
            "If the value is non-textual, this field represents the type. Current valid values are: - blank (this indicates the `field_value` is normal text) - `unfilled_checkbox` - `filled_checkbox`",
          ).optional(),
        })).describe("A list of visually detected form fields on the page.")
          .optional(),
        image: z.object({
          content: z.string().describe("Raw byte content of the image.")
            .optional(),
          height: z.number().int().describe("Height of the image in pixels.")
            .optional(),
          mimeType: z.string().describe(
            "Encoding [media type (MIME type)](https://www.iana.org/assignments/media-types/media-types.xhtml) for the image.",
          ).optional(),
          width: z.number().int().describe("Width of the image in pixels.")
            .optional(),
        }).describe("Rendered image contents for this page.").optional(),
        imageQualityScores: z.object({
          detectedDefects: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected defect. Range `[0, 1]` where `1` indicates strong confidence that the defect exists.",
            ).optional(),
            type: z.string().describe(
              "Name of the defect type. Supported values are: - `quality/defect_blurry` - `quality/defect_noisy` - `quality/defect_dark` - `quality/defect_faint` - `quality/defect_text_too_small` - `quality/defect_document_cutoff` - `quality/defect_text_cutoff` - `quality/defect_glare`",
            ).optional(),
          })).describe("A list of detected defects.").optional(),
          qualityScore: z.number().describe(
            "The overall quality score. Range `[0, 1]` where `1` is perfect quality.",
          ).optional(),
        }).describe("Image quality scores for the page image.").optional(),
        layout: z.object({
          boundingPoly: z.object({
            normalizedVertices: z.array(z.object({
              x: z.number().describe("X coordinate.").optional(),
              y: z.number().describe(
                "Y coordinate (starts from the top of the image).",
              ).optional(),
            })).describe("The bounding polygon normalized vertices.")
              .optional(),
            vertices: z.array(z.object({
              x: z.number().int().describe("X coordinate.").optional(),
              y: z.number().int().describe(
                "Y coordinate (starts from the top of the image).",
              ).optional(),
            })).describe("The bounding polygon vertices.").optional(),
          }).describe("A bounding polygon for the detected image annotation.")
            .optional(),
          confidence: z.number().describe(
            "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
          ).optional(),
          orientation: z.enum([
            "ORIENTATION_UNSPECIFIED",
            "PAGE_UP",
            "PAGE_RIGHT",
            "PAGE_DOWN",
            "PAGE_LEFT",
          ]).describe("Detected orientation for the Layout.").optional(),
          textAnchor: z.object({
            content: z.string().describe(
              "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
            ).optional(),
            textSegments: z.array(z.object({
              endIndex: z.string().describe(
                "TextSegment half open end UTF-8 char index in the Document.text.",
              ).optional(),
              startIndex: z.string().describe(
                "TextSegment start UTF-8 char index in the Document.text.",
              ).optional(),
            })).describe("The text segments from the Document.text.")
              .optional(),
          }).describe("Text reference indexing into the Document.text.")
            .optional(),
        }).describe("Visual element describing a layout unit on a page.")
          .optional(),
        lines: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
        })).describe(
          "A list of visually detected text lines on the page. A collection of tokens that a human would perceive as a line.",
        ).optional(),
        pageNumber: z.number().int().describe(
          "1-based index for current Page in a parent Document. Useful when a page is taken out of a Document for individual processing.",
        ).optional(),
        paragraphs: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
        })).describe(
          "A list of visually detected text paragraphs on the page. A collection of lines that a human would perceive as a paragraph.",
        ).optional(),
        provenance: z.object({
          id: z.number().int().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.array(z.object({
            id: z.number().int().describe("The id of the parent provenance.")
              .optional(),
            index: z.number().int().describe(
              "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the index into current revision's parent_ids list.",
            ).optional(),
          })).describe("References to the original elements that are replaced.")
            .optional(),
          revision: z.number().int().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.enum([
            "OPERATION_TYPE_UNSPECIFIED",
            "ADD",
            "REMOVE",
            "UPDATE",
            "REPLACE",
            "EVAL_REQUESTED",
            "EVAL_APPROVED",
            "EVAL_SKIPPED",
          ]).describe("The type of provenance operation.").optional(),
        }).describe(
          "Structure to identify provenance relationships between annotations in different revisions.",
        ).optional(),
        symbols: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
        })).describe("A list of visually detected symbols on the page.")
          .optional(),
        tables: z.array(z.object({
          bodyRows: z.array(z.object({
            cells: z.array(z.object({
              colSpan: z.number().int().describe(
                "How many columns this cell spans.",
              ).optional(),
              detectedLanguages: z.array(z.object({
                confidence: z.number().describe(
                  "Confidence of detected language. Range `[0, 1]`.",
                ).optional(),
                languageCode: z.string().describe(
                  "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
                ).optional(),
              })).describe(
                "A list of detected languages together with confidence.",
              ).optional(),
              layout: z.object({
                boundingPoly: z.object({
                  normalizedVertices: z.array(z.object({
                    x: z.number().describe("X coordinate.").optional(),
                    y: z.number().describe(
                      "Y coordinate (starts from the top of the image).",
                    ).optional(),
                  })).describe("The bounding polygon normalized vertices.")
                    .optional(),
                  vertices: z.array(z.object({
                    x: z.number().int().describe("X coordinate.").optional(),
                    y: z.number().int().describe(
                      "Y coordinate (starts from the top of the image).",
                    ).optional(),
                  })).describe("The bounding polygon vertices.").optional(),
                }).describe(
                  "A bounding polygon for the detected image annotation.",
                ).optional(),
                confidence: z.number().describe(
                  "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
                ).optional(),
                orientation: z.enum([
                  "ORIENTATION_UNSPECIFIED",
                  "PAGE_UP",
                  "PAGE_RIGHT",
                  "PAGE_DOWN",
                  "PAGE_LEFT",
                ]).describe("Detected orientation for the Layout.").optional(),
                textAnchor: z.object({
                  content: z.string().describe(
                    "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
                  ).optional(),
                  textSegments: z.array(z.object({
                    endIndex: z.string().describe(
                      "TextSegment half open end UTF-8 char index in the Document.text.",
                    ).optional(),
                    startIndex: z.string().describe(
                      "TextSegment start UTF-8 char index in the Document.text.",
                    ).optional(),
                  })).describe("The text segments from the Document.text.")
                    .optional(),
                }).describe("Text reference indexing into the Document.text.")
                  .optional(),
              }).describe("Visual element describing a layout unit on a page.")
                .optional(),
              rowSpan: z.number().int().describe(
                "How many rows this cell spans.",
              ).optional(),
            })).describe("Cells that make up this row.").optional(),
          })).describe("Body rows of the table.").optional(),
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          headerRows: z.array(z.object({
            cells: z.array(z.object({
              colSpan: z.number().int().describe(
                "How many columns this cell spans.",
              ).optional(),
              detectedLanguages: z.array(z.object({
                confidence: z.number().describe(
                  "Confidence of detected language. Range `[0, 1]`.",
                ).optional(),
                languageCode: z.string().describe(
                  "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
                ).optional(),
              })).describe(
                "A list of detected languages together with confidence.",
              ).optional(),
              layout: z.object({
                boundingPoly: z.object({
                  normalizedVertices: z.array(z.object({
                    x: z.number().describe("X coordinate.").optional(),
                    y: z.number().describe(
                      "Y coordinate (starts from the top of the image).",
                    ).optional(),
                  })).describe("The bounding polygon normalized vertices.")
                    .optional(),
                  vertices: z.array(z.object({
                    x: z.number().int().describe("X coordinate.").optional(),
                    y: z.number().int().describe(
                      "Y coordinate (starts from the top of the image).",
                    ).optional(),
                  })).describe("The bounding polygon vertices.").optional(),
                }).describe(
                  "A bounding polygon for the detected image annotation.",
                ).optional(),
                confidence: z.number().describe(
                  "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
                ).optional(),
                orientation: z.enum([
                  "ORIENTATION_UNSPECIFIED",
                  "PAGE_UP",
                  "PAGE_RIGHT",
                  "PAGE_DOWN",
                  "PAGE_LEFT",
                ]).describe("Detected orientation for the Layout.").optional(),
                textAnchor: z.object({
                  content: z.string().describe(
                    "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
                  ).optional(),
                  textSegments: z.array(z.object({
                    endIndex: z.string().describe(
                      "TextSegment half open end UTF-8 char index in the Document.text.",
                    ).optional(),
                    startIndex: z.string().describe(
                      "TextSegment start UTF-8 char index in the Document.text.",
                    ).optional(),
                  })).describe("The text segments from the Document.text.")
                    .optional(),
                }).describe("Text reference indexing into the Document.text.")
                  .optional(),
              }).describe("Visual element describing a layout unit on a page.")
                .optional(),
              rowSpan: z.number().int().describe(
                "How many rows this cell spans.",
              ).optional(),
            })).describe("Cells that make up this row.").optional(),
          })).describe("Header rows of the table.").optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
        })).describe("A list of visually detected tables on the page.")
          .optional(),
        tokens: z.array(z.object({
          detectedBreak: z.object({
            type: z.enum(["TYPE_UNSPECIFIED", "SPACE", "WIDE_SPACE", "HYPHEN"])
              .describe("Detected break type.").optional(),
          }).describe("Detected break at the end of a Token.").optional(),
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          provenance: z.object({
            id: z.number().int().describe(
              "The Id of this operation. Needs to be unique within the scope of the revision.",
            ).optional(),
            parents: z.array(z.object({
              id: z.number().int().describe("The id of the parent provenance.")
                .optional(),
              index: z.number().int().describe(
                "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
              ).optional(),
              revision: z.number().int().describe(
                "The index of the index into current revision's parent_ids list.",
              ).optional(),
            })).describe(
              "References to the original elements that are replaced.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the revision that produced this element.",
            ).optional(),
            type: z.enum([
              "OPERATION_TYPE_UNSPECIFIED",
              "ADD",
              "REMOVE",
              "UPDATE",
              "REPLACE",
              "EVAL_REQUESTED",
              "EVAL_APPROVED",
              "EVAL_SKIPPED",
            ]).describe("The type of provenance operation.").optional(),
          }).describe(
            "Structure to identify provenance relationships between annotations in different revisions.",
          ).optional(),
          styleInfo: z.object({
            backgroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            bold: z.boolean().describe(
              "Whether the text is bold (equivalent to font_weight is at least `700`).",
            ).optional(),
            fontSize: z.number().int().describe(
              "Font size in points (`1` point is `¹⁄₇₂` inches).",
            ).optional(),
            fontType: z.string().describe("Name or style of the font.")
              .optional(),
            fontWeight: z.number().int().describe(
              "TrueType weight on a scale `100` (thin) to `1000` (ultra-heavy). Normal is `400`, bold is `700`.",
            ).optional(),
            handwritten: z.boolean().describe(
              "Whether the text is handwritten.",
            ).optional(),
            italic: z.boolean().describe("Whether the text is italic.")
              .optional(),
            letterSpacing: z.number().describe("Letter spacing in points.")
              .optional(),
            pixelFontSize: z.number().describe(
              "Font size in pixels, equal to _unrounded font_size_ * _resolution_ ÷ `72.0`.",
            ).optional(),
            smallcaps: z.boolean().describe(
              "Whether the text is in small caps. This feature is not supported yet.",
            ).optional(),
            strikeout: z.boolean().describe(
              "Whether the text is strikethrough. This feature is not supported yet.",
            ).optional(),
            subscript: z.boolean().describe(
              "Whether the text is a subscript. This feature is not supported yet.",
            ).optional(),
            superscript: z.boolean().describe(
              "Whether the text is a superscript. This feature is not supported yet.",
            ).optional(),
            textColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            underlined: z.boolean().describe("Whether the text is underlined.")
              .optional(),
          }).describe("Font and other text style attributes.").optional(),
        })).describe("A list of visually detected tokens on the page.")
          .optional(),
        transforms: z.array(z.object({
          cols: z.number().int().describe("Number of columns in the matrix.")
            .optional(),
          data: z.string().describe("The matrix data.").optional(),
          rows: z.number().int().describe("Number of rows in the matrix.")
            .optional(),
          type: z.number().int().describe(
            "This encodes information about what data type the matrix uses. For example, 0 (CV_8U) is an unsigned 8-bit image. For the full list of OpenCV primitive data types, please refer to https://docs.opencv.org/4.3.0/d1/d1b/group__core__hal__interface.html",
          ).optional(),
        })).describe(
          "Transformation matrices that were applied to the original document image to produce Page.image.",
        ).optional(),
        visualElements: z.array(z.object({
          detectedLanguages: z.array(z.object({
            confidence: z.number().describe(
              "Confidence of detected language. Range `[0, 1]`.",
            ).optional(),
            languageCode: z.string().describe(
              "The [BCP-47 language code](https://www.unicode.org/reports/tr35/#Unicode_locale_identifier), such as `en-US` or `sr-Latn`.",
            ).optional(),
          })).describe("A list of detected languages together with confidence.")
            .optional(),
          layout: z.object({
            boundingPoly: z.object({
              normalizedVertices: z.array(z.object({
                x: z.number().describe("X coordinate.").optional(),
                y: z.number().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon normalized vertices.")
                .optional(),
              vertices: z.array(z.object({
                x: z.number().int().describe("X coordinate.").optional(),
                y: z.number().int().describe(
                  "Y coordinate (starts from the top of the image).",
                ).optional(),
              })).describe("The bounding polygon vertices.").optional(),
            }).describe("A bounding polygon for the detected image annotation.")
              .optional(),
            confidence: z.number().describe(
              "Confidence of the current Layout within context of the object this layout is for. e.g. confidence can be for a single token, a table, a visual element, etc. depending on context. Range `[0, 1]`.",
            ).optional(),
            orientation: z.enum([
              "ORIENTATION_UNSPECIFIED",
              "PAGE_UP",
              "PAGE_RIGHT",
              "PAGE_DOWN",
              "PAGE_LEFT",
            ]).describe("Detected orientation for the Layout.").optional(),
            textAnchor: z.object({
              content: z.string().describe(
                "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
              ).optional(),
              textSegments: z.array(z.object({
                endIndex: z.string().describe(
                  "TextSegment half open end UTF-8 char index in the Document.text.",
                ).optional(),
                startIndex: z.string().describe(
                  "TextSegment start UTF-8 char index in the Document.text.",
                ).optional(),
              })).describe("The text segments from the Document.text.")
                .optional(),
            }).describe("Text reference indexing into the Document.text.")
              .optional(),
          }).describe("Visual element describing a layout unit on a page.")
            .optional(),
          type: z.string().describe("Type of the VisualElement.").optional(),
        })).describe(
          "A list of detected non-text visual elements e.g. checkbox, signature etc. on the page.",
        ).optional(),
      })).describe("Visual page layout for the Document.").optional(),
      revisions: z.array(z.object({
        agent: z.string().describe(
          "If the change was made by a person specify the name or id of that person.",
        ).optional(),
        createTime: z.string().describe(
          "The time that the revision was created, internally generated by doc proto storage at the time of create.",
        ).optional(),
        humanReview: z.object({
          state: z.string().describe(
            "Human review state. e.g. `requested`, `succeeded`, `rejected`.",
          ).optional(),
          stateMessage: z.string().describe(
            "A message providing more details about the current state of processing. For example, the rejection reason when the state is `rejected`.",
          ).optional(),
        }).describe("Human Review information of the document.").optional(),
        id: z.string().describe(
          "Id of the revision, internally generated by doc proto storage. Unique within the context of the document.",
        ).optional(),
        parent: z.array(z.number().int()).describe(
          "The revisions that this revision is based on. This can include one or more parent (when documents are merged.) This field represents the index into the `revisions` field.",
        ).optional(),
        parentIds: z.array(z.string()).describe(
          "The revisions that this revision is based on. Must include all the ids that have anything to do with this revision - eg. there are `provenance.parent.revision` fields that index into this field.",
        ).optional(),
        processor: z.string().describe(
          "If the annotation was made by processor identify the processor by its resource name.",
        ).optional(),
      })).describe("Placeholder. Revision history of this document.")
        .optional(),
      shardInfo: z.object({
        shardCount: z.string().describe("Total number of shards.").optional(),
        shardIndex: z.string().describe("The 0-based index of this shard.")
          .optional(),
        textOffset: z.string().describe(
          "The index of the first character in Document.text in the overall document global text.",
        ).optional(),
      }).describe(
        "For a large document, sharding may be performed to produce several document shards. Each document shard contains this field to detail which shard it is.",
      ).optional(),
      text: z.string().describe(
        "Optional. UTF-8 encoded text in reading order from the document.",
      ).optional(),
      textChanges: z.array(z.object({
        changedText: z.string().describe(
          "The text that replaces the text identified in the `text_anchor`.",
        ).optional(),
        provenance: z.array(z.object({
          id: z.number().int().describe(
            "The Id of this operation. Needs to be unique within the scope of the revision.",
          ).optional(),
          parents: z.array(z.object({
            id: z.number().int().describe("The id of the parent provenance.")
              .optional(),
            index: z.number().int().describe(
              "The index of the parent item in the corresponding item list (eg. list of entities, properties within entities, etc.) in the parent revision.",
            ).optional(),
            revision: z.number().int().describe(
              "The index of the index into current revision's parent_ids list.",
            ).optional(),
          })).describe("References to the original elements that are replaced.")
            .optional(),
          revision: z.number().int().describe(
            "The index of the revision that produced this element.",
          ).optional(),
          type: z.enum([
            "OPERATION_TYPE_UNSPECIFIED",
            "ADD",
            "REMOVE",
            "UPDATE",
            "REPLACE",
            "EVAL_REQUESTED",
            "EVAL_APPROVED",
            "EVAL_SKIPPED",
          ]).describe("The type of provenance operation.").optional(),
        })).describe("The history of this annotation.").optional(),
        textAnchor: z.object({
          content: z.string().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.array(z.object({
            endIndex: z.string().describe(
              "TextSegment half open end UTF-8 char index in the Document.text.",
            ).optional(),
            startIndex: z.string().describe(
              "TextSegment start UTF-8 char index in the Document.text.",
            ).optional(),
          })).describe("The text segments from the Document.text.").optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
      })).describe(
        "Placeholder. A list of text corrections made to Document.text. This is usually used for annotating corrections to OCR mistakes. Text changes for a given revision may not overlap with each other.",
      ).optional(),
      textStyles: z.array(z.object({
        backgroundColor: z.object({
          alpha: z.number().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.number().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.number().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.number().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
        color: z.object({
          alpha: z.number().describe(
            "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
          ).optional(),
          blue: z.number().describe(
            "The amount of blue in the color as a value in the interval [0, 1].",
          ).optional(),
          green: z.number().describe(
            "The amount of green in the color as a value in the interval [0, 1].",
          ).optional(),
          red: z.number().describe(
            "The amount of red in the color as a value in the interval [0, 1].",
          ).optional(),
        }).describe(
          "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
        ).optional(),
        fontFamily: z.string().describe(
          "Font family such as `Arial`, `Times New Roman`. https://www.w3schools.com/cssref/pr_font_font-family.asp",
        ).optional(),
        fontSize: z.object({
          size: z.number().describe("Font size for the text.").optional(),
          unit: z.string().describe(
            "Unit for the font size. Follows CSS naming (such as `in`, `px`, and `pt`).",
          ).optional(),
        }).describe("Font size with unit.").optional(),
        fontWeight: z.string().describe(
          "[Font weight](https://www.w3schools.com/cssref/pr_font_weight.asp). Possible values are `normal`, `bold`, `bolder`, and `lighter`.",
        ).optional(),
        textAnchor: z.object({
          content: z.string().describe(
            "Contains the content of the text span so that users do not have to look it up in the text_segments. It is always populated for formFields.",
          ).optional(),
          textSegments: z.array(z.object({
            endIndex: z.string().describe(
              "TextSegment half open end UTF-8 char index in the Document.text.",
            ).optional(),
            startIndex: z.string().describe(
              "TextSegment start UTF-8 char index in the Document.text.",
            ).optional(),
          })).describe("The text segments from the Document.text.").optional(),
        }).describe("Text reference indexing into the Document.text.")
          .optional(),
        textDecoration: z.string().describe(
          "[Text decoration](https://www.w3schools.com/cssref/pr_text_text-decoration.asp). Follows CSS standard.",
        ).optional(),
        textStyle: z.string().describe(
          "[Text style](https://www.w3schools.com/cssref/pr_font_font-style.asp). Possible values are `normal`, `italic`, and `oblique`.",
        ).optional(),
      })).describe("Styles for the Document.text.").optional(),
      uri: z.string().describe(
        "Optional. Currently supports Google Cloud Storage URI of the form `gs://bucket_name/object_name`. Object versioning is not supported. For more information, refer to [Google Cloud Storage Request URIs](https://cloud.google.com/storage/docs/reference-uris).",
      ).optional(),
    }).describe(
      "Document represents the canonical document resource in Document AI. It is an interchange format that provides insights into documents and allows for collaboration between users and Document AI to iterate and optimize for quality.",
    ).optional(),
    contentCategory: z.enum([
      "CONTENT_CATEGORY_UNSPECIFIED",
      "CONTENT_CATEGORY_IMAGE",
      "CONTENT_CATEGORY_AUDIO",
      "CONTENT_CATEGORY_VIDEO",
    ]).describe(
      "Indicates the category (image, audio, video etc.) of the original content.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time when the document is created.",
    ).optional(),
    creator: z.string().describe("The user who creates the document.")
      .optional(),
    displayName: z.string().describe(
      "Required. Display name of the document given by the user. This name will be displayed in the UI. Customer can populate this field with the name of the document. This differs from the 'title' field as 'title' is optional and stores the top heading in the document.",
    ).optional(),
    displayUri: z.string().describe(
      "Uri to display the document, for example, in the UI.",
    ).optional(),
    dispositionTime: z.string().describe(
      "Output only. If linked to a Collection with RetentionPolicy, the date when the document becomes mutable.",
    ).optional(),
    documentSchemaName: z.string().describe(
      "The Document schema name. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}.",
    ).optional(),
    inlineRawDocument: z.string().describe("Raw document content.").optional(),
    legalHold: z.boolean().describe(
      "Output only. Indicates if the document has a legal hold on it.",
    ).optional(),
    name: z.string().describe(
      "The resource name of the document. Format: projects/{project_number}/locations/{location}/documents/{document_id}. The name is ignored when creating a document.",
    ).optional(),
    plainText: z.string().describe("Other document format, such as PPTX, XLXS")
      .optional(),
    properties: z.array(z.object({
      dateTimeValues: z.object({
        values: z.array(z.object({
          day: z.number().int().describe(
            "Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day.",
          ).optional(),
          hours: z.number().int().describe(
            'Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.number().int().describe(
            "Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.",
          ).optional(),
          month: z.number().int().describe(
            "Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month.",
          ).optional(),
          nanos: z.number().int().describe(
            "Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0.",
          ).optional(),
          seconds: z.number().int().describe(
            "Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
          timeZone: z.object({
            id: z.string().describe(
              'IANA Time Zone Database time zone. For example "America/New_York".',
            ).optional(),
            version: z.string().describe(
              'Optional. IANA Time Zone Database version number. For example "2019a".',
            ).optional(),
          }).describe(
            "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
          ).optional(),
          utcOffset: z.string().describe(
            "UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.",
          ).optional(),
          year: z.number().int().describe(
            "Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year.",
          ).optional(),
        })).describe(
          "List of datetime values. Both OffsetDateTime and ZonedDateTime are supported.",
        ).optional(),
      }).describe("DateTime values.").optional(),
      enumValues: z.object({
        values: z.array(z.string()).describe("List of enum values.").optional(),
      }).describe("Enum values.").optional(),
      floatValues: z.object({
        values: z.array(z.number()).describe("List of float values.")
          .optional(),
      }).describe("Float values.").optional(),
      integerValues: z.object({
        values: z.array(z.number().int()).describe("List of integer values.")
          .optional(),
      }).describe("Integer values.").optional(),
      mapProperty: z.object({
        fields: z.record(
          z.string(),
          z.object({
            booleanValue: z.boolean().describe("Represents a boolean value.")
              .optional(),
            datetimeValue: z.object({
              day: z.number().int().describe(
                "Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day.",
              ).optional(),
              hours: z.number().int().describe(
                'Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
              ).optional(),
              minutes: z.number().int().describe(
                "Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0.",
              ).optional(),
              month: z.number().int().describe(
                "Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month.",
              ).optional(),
              nanos: z.number().int().describe(
                "Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0.",
              ).optional(),
              seconds: z.number().int().describe(
                "Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds.",
              ).optional(),
              timeZone: z.object({
                id: z.string().describe(
                  'IANA Time Zone Database time zone. For example "America/New_York".',
                ).optional(),
                version: z.string().describe(
                  'Optional. IANA Time Zone Database version number. For example "2019a".',
                ).optional(),
              }).describe(
                "Represents a time zone from the [IANA Time Zone Database](https://www.iana.org/time-zones).",
              ).optional(),
              utcOffset: z.string().describe(
                "UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }.",
              ).optional(),
              year: z.number().int().describe(
                "Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year.",
              ).optional(),
            }).describe(
              "Represents civil time (or occasionally physical time). This type can represent a civil time in one of a few possible ways: * When utc_offset is set and time_zone is unset: a civil time on a calendar day with a particular offset from UTC. * When time_zone is set and utc_offset is unset: a civil time on a calendar day in a particular time zone. * When neither time_zone nor utc_offset is set: a civil time on a calendar day in local time. The date is relative to the Proleptic Gregorian Calendar. If year, month, or day are 0, the DateTime is considered not to have a specific year, month, or day respectively. This type may also be used to represent a physical time if all the date and time fields are set and either case of the `time_offset` oneof is set. Consider using `Timestamp` message for physical time instead. If your use case also would like to store the user's timezone, that can be done in another field. This type is more flexible than some applications may want. Make sure to document and validate your application's limitations.",
            ).optional(),
            enumValue: z.object({
              value: z.string().describe(
                "String value of the enum field. This must match defined set of enums in document schema using EnumTypeOptions.",
              ).optional(),
            }).describe("Represents the string value of the enum field.")
              .optional(),
            floatValue: z.number().describe("Represents a float value.")
              .optional(),
            intValue: z.number().int().describe("Represents a integer value.")
              .optional(),
            stringValue: z.string().describe("Represents a string value.")
              .optional(),
            timestampValue: z.object({
              textValue: z.string().describe(
                'The string must represent a valid instant in UTC and is parsed using java.time.format.DateTimeFormatter.ISO_INSTANT. e.g. "2013-09-29T18:46:19Z"',
              ).optional(),
              timestampValue: z.string().describe("Timestamp value").optional(),
            }).describe("Timestamp value type.").optional(),
          }),
        ).describe("Unordered map of dynamically typed values.").optional(),
      }).describe(
        "Map property value. Represents a structured entries of key value pairs, consisting of field names which map to dynamically typed values.",
      ).optional(),
      name: z.string().describe(
        "Required. Must match the name of a PropertyDefinition in the DocumentSchema.",
      ).optional(),
      propertyValues: z.object({
        properties: z.array(z.string()).describe("List of property values.")
          .optional(),
      }).describe("Property values.").optional(),
      textValues: z.object({
        values: z.array(z.string()).describe("List of text values.").optional(),
      }).describe("String/text values.").optional(),
      timestampValues: z.object({
        values: z.array(z.object({
          textValue: z.string().describe(
            'The string must represent a valid instant in UTC and is parsed using java.time.format.DateTimeFormatter.ISO_INSTANT. e.g. "2013-09-29T18:46:19Z"',
          ).optional(),
          timestampValue: z.string().describe("Timestamp value").optional(),
        })).describe("List of timestamp values.").optional(),
      }).describe("Timestamp values.").optional(),
    })).describe("List of values that are user supplied metadata.").optional(),
    rawDocumentFileType: z.enum([
      "RAW_DOCUMENT_FILE_TYPE_UNSPECIFIED",
      "RAW_DOCUMENT_FILE_TYPE_PDF",
      "RAW_DOCUMENT_FILE_TYPE_DOCX",
      "RAW_DOCUMENT_FILE_TYPE_XLSX",
      "RAW_DOCUMENT_FILE_TYPE_PPTX",
      "RAW_DOCUMENT_FILE_TYPE_TEXT",
      "RAW_DOCUMENT_FILE_TYPE_TIFF",
    ]).describe(
      "This is used when DocAI was not used to load the document and parsing/ extracting is needed for the inline_raw_document. For example, if inline_raw_document is the byte representation of a PDF file, then this should be set to: RAW_DOCUMENT_FILE_TYPE_PDF.",
    ).optional(),
    rawDocumentPath: z.string().describe(
      "Raw document file in Cloud Storage path.",
    ).optional(),
    referenceId: z.string().describe(
      "The reference ID set by customers. Must be unique per project and location.",
    ).optional(),
    textExtractionDisabled: z.boolean().describe(
      "If true, text extraction will not be performed.",
    ).optional(),
    textExtractionEnabled: z.boolean().describe(
      "If true, text extraction will be performed.",
    ).optional(),
    title: z.string().describe(
      "Title that describes the document. This can be the top heading or text that describes the document.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the document is last updated.",
    ).optional(),
    updater: z.string().describe("The user who lastly updates the document.")
      .optional(),
  }).describe("Defines the structure for content warehouse document proto.")
    .optional(),
  requestMetadata: z.object({
    userInfo: z.object({
      groupIds: z.array(z.string()).describe(
        'The unique group identifications which the user is belong to. The format is "group:yyyy@example.com";',
      ).optional(),
      id: z.string().describe(
        'A unique user identification string, as determined by the client. The maximum number of allowed characters is 255. Allowed characters include numbers 0 to 9, uppercase and lowercase letters, and restricted special symbols (:, @, +, -, _, ~) The format is "user:xxxx@example.com";',
      ).optional(),
    }).describe("The user information.").optional(),
  }).describe(
    "Meta information is used to improve the performance of the service.",
  ).optional(),
  updateOptions: z.object({
    mergeFieldsOptions: z.object({
      replaceMessageFields: z.boolean().describe(
        "When merging message fields, the default behavior is to merge the content of two message fields together. If you instead want to use the field from the source message to replace the corresponding field in the destination message, set this flag to true. When this flag is set, specified submessage fields that are missing in source will be cleared in destination.",
      ).optional(),
      replaceRepeatedFields: z.boolean().describe(
        "When merging repeated fields, the default behavior is to append entries from the source repeated field to the destination repeated field. If you instead want to keep only the entries from the source repeated field, set this flag to true. If you want to replace a repeated field within a message field on the destination message, you must set both replace_repeated_fields and replace_message_fields to true, otherwise the repeated fields will be appended.",
      ).optional(),
    }).describe("Options for merging updated fields.").optional(),
    updateMask: z.string().describe(
      "Field mask for merging Document fields. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask",
    ).optional(),
    updateType: z.enum([
      "UPDATE_TYPE_UNSPECIFIED",
      "UPDATE_TYPE_REPLACE",
      "UPDATE_TYPE_MERGE",
      "UPDATE_TYPE_INSERT_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_REPLACE_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_DELETE_PROPERTIES_BY_NAMES",
      "UPDATE_TYPE_MERGE_AND_REPLACE_OR_INSERT_PROPERTIES_BY_NAMES",
    ]).describe("Type for update.").optional(),
  }).describe("Options for Update operations.").optional(),
});

export const model = {
  type: "@swamp/gcp/contentwarehouse/documents-referenceid",
  version: "2026.04.01.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Defines the structure for content warehouse document proto.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a referenceId",
      arguments: z.object({
        identifier: z.string().describe("The name of the referenceId"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = g.name?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update referenceId attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = g.name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["cloudAiDocumentOption"] !== undefined) {
          body["cloudAiDocumentOption"] = g["cloudAiDocumentOption"];
        }
        if (g["document"] !== undefined) body["document"] = g["document"];
        if (g["requestMetadata"] !== undefined) {
          body["requestMetadata"] = g["requestMetadata"];
        }
        if (g["updateOptions"] !== undefined) {
          body["updateOptions"] = g["updateOptions"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the referenceId",
      arguments: z.object({
        identifier: z.string().describe("The name of the referenceId"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = g.name?.toString() ?? args.identifier;
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync referenceId state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = g.name?.toString() ?? "current";
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
  },
};
