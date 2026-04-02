// Auto-generated extension model for @swamp/gcp/dfareporting/dynamicprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.dynamicProfiles.get",
  "path": "studio/dynamicProfiles/{+dynamicProfileId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "dynamicProfileId",
  ],
  "parameters": {
    "dynamicProfileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dfareporting.dynamicProfiles.insert",
  "path": "studio/dynamicProfiles",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "dfareporting.dynamicProfiles.update",
  "path": "studio/dynamicProfiles",
  "httpMethod": "PUT",
  "parameterOrder": [],
  "parameters": {},
} as const;

const GlobalArgsSchema = z.object({
  active: z.object({
    dynamicProfileFeedSettings: z.array(z.object({
      dynamicFeedId: z.string().describe(
        "Optional. Dynamic feed ID associated with dynamic profile version.",
      ).optional(),
      dynamicRules: z.object({
        autoTargetedFieldIds: z.array(z.number().int()).describe(
          "Optional. List of field IDs in this element that should be auto-targeted. Applicable when rule type is AUTO.",
        ).optional(),
        customRules: z.array(z.object({
          name: z.string().describe("Optional. Name of this custom rule.")
            .optional(),
          priority: z.number().int().describe(
            "Optional. Priority of the custom rule.",
          ).optional(),
          ruleBlocks: z.array(z.object({
            fieldFilter: z.array(z.object({
              boolValue: z.boolean().describe(
                "Optional. The boolean values, only applicable when rhs_value_type is BOOL.",
              ).optional(),
              dependentFieldValue: z.object({
                elementId: z.string().describe(
                  "Optional. The ID of the element that value's field will match against.",
                ).optional(),
                fieldId: z.number().int().describe(
                  "Optional. The field id of the dependent field.",
                ).optional(),
              }).describe("Contains dependent field value information.")
                .optional(),
              fieldId: z.number().int().describe(
                "Optional. The field ID on the left hand side of the expression.",
              ).optional(),
              matchType: z.enum([
                "LHS_MATCH_TYPE_UNKNOWN",
                "EQUALS_OR_UNRESTRICTED",
                "EQUALS",
                "UNRESTRICTED",
                "NOT_EQUALS",
              ]).describe(
                "Optional. Left hand side of the expression match type.",
              ).optional(),
              requestValue: z.object({
                excludeFromUserAttributeIds: z.array(z.string()).describe(
                  "Optional. User attribute IDs in the request that should be excluded. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID.",
                ).optional(),
                key: z.string().describe(
                  "Optional. Custom key in the request. Used only when the field type is CUSTOM_VALUE.",
                ).optional(),
                userAttributeIds: z.array(z.string()).describe(
                  "Optional. User attribute IDs in the request. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID.",
                ).optional(),
              }).describe("Contains request value information.").optional(),
              stringValue: z.string().describe(
                "Optional. The string value, only applicable when rhs_value_type is STRING.",
              ).optional(),
              valueType: z.enum([
                "RHS_VALUE_TYPE_UNKNOWN",
                "STRING",
                "REQUEST",
                "BOOL",
                "DEPENDENT",
              ]).describe("Optional. Right hand side of the expression.")
                .optional(),
            })).describe("Optional. A list of non-auto field filters")
              .optional(),
          })).describe(
            "Optional. A list of field filter, the custom rule will apply.",
          ).optional(),
        })).describe(
          "Optional. The custom rules of the dynamic feed, only applicable when rule type is CUSTOM.",
        ).optional(),
        customValueFields: z.array(z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          requestKey: z.string().describe(
            "Optional. Custom key used to match for auto filtering.",
          ).optional(),
        })).describe(
          "Optional. Mapping between field ID and custom key that are used to match for auto filtering.",
        ).optional(),
        proximityFilter: z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          radiusBucketType: z.enum([
            "RADIUS_BUCKET_TYPE_UNKNOWN",
            "SMALL",
            "MEDIUM",
            "LARGE",
            "MULTI_REGIONAL",
            "NATIONAL",
          ]).describe(
            "Optional. The radius bucket type of the proximity filter",
          ).optional(),
          radiusUnitType: z.enum([
            "RADIUS_UNIT_TYPE_UNKNOWN",
            "KILOMETERS",
            "MILES",
          ]).describe("Optional. The units of the radius value").optional(),
          radiusValue: z.number().int().describe(
            "Optional. Radius length in units defined by radius_units.",
          ).optional(),
        }).describe("Contains proximity filter information.").optional(),
        remarketingValueAttributes: z.array(z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          userAttributeIds: z.array(z.string()).describe(
            "Optional. Remarketing user attribute IDs for auto filtering.",
          ).optional(),
        })).describe(
          "Optional. The link between an element field ID and a list of user attribute IDs.",
        ).optional(),
        rotationType: z.enum([
          "ROTATION_TYPE_UNKNOWN",
          "RANDOM",
          "OPTIMIZED",
          "WEIGHTED",
        ]).describe(
          "Optional. The rotation type to select from eligible rows. Rotation type only apply when the filtering rule results in more than one eligible rows.",
        ).optional(),
        ruleType: z.enum([
          "RULE_SET_TYPE_UNKNOWN",
          "OPEN",
          "AUTO",
          "CUSTOM",
          "PROXIMITY_TARGETING",
        ]).describe(
          "Optional. The type of the rule, the default value is OPEN.",
        ).optional(),
        weightFieldId: z.number().int().describe(
          "Optional. The field ID for the feed that will be used for weighted rotation, only applicable when rotation type is WEIGHTED.",
        ).optional(),
      }).describe("Contains dynamic rules information.").optional(),
      quantity: z.number().int().describe(
        "Optional. The number of this dynamic feed rows needed by the dynamic profile, default value is 1. Acceptable values are between 1 to 99, inclusive.",
      ).optional(),
    })).describe(
      "Optional. Associated dynamic feeds and their settings (including dynamic rules) for this dynamic profile version.",
    ).optional(),
    versionId: z.string().describe(
      "Output only. Version ID of this dynamic profile version. This is a read-only, auto-generated field. -1 for draft version, 0+ for published versions.",
    ).optional(),
  }).describe("Contains dynamic profile version information.").optional(),
  archiveStatus: z.enum(["ARCHIVE_STATUS_UNKNOWN", "UNARCHIVED", "ARCHIVED"])
    .describe("Optional. Archive status of this dynamic profile.").optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  description: z.string().describe(
    "Optional. Description of this dynamic profile.",
  ).optional(),
  draft: z.object({
    dynamicProfileFeedSettings: z.array(z.object({
      dynamicFeedId: z.string().describe(
        "Optional. Dynamic feed ID associated with dynamic profile version.",
      ).optional(),
      dynamicRules: z.object({
        autoTargetedFieldIds: z.array(z.number().int()).describe(
          "Optional. List of field IDs in this element that should be auto-targeted. Applicable when rule type is AUTO.",
        ).optional(),
        customRules: z.array(z.object({
          name: z.string().describe("Optional. Name of this custom rule.")
            .optional(),
          priority: z.number().int().describe(
            "Optional. Priority of the custom rule.",
          ).optional(),
          ruleBlocks: z.array(z.object({
            fieldFilter: z.array(z.object({
              boolValue: z.boolean().describe(
                "Optional. The boolean values, only applicable when rhs_value_type is BOOL.",
              ).optional(),
              dependentFieldValue: z.object({
                elementId: z.string().describe(
                  "Optional. The ID of the element that value's field will match against.",
                ).optional(),
                fieldId: z.number().int().describe(
                  "Optional. The field id of the dependent field.",
                ).optional(),
              }).describe("Contains dependent field value information.")
                .optional(),
              fieldId: z.number().int().describe(
                "Optional. The field ID on the left hand side of the expression.",
              ).optional(),
              matchType: z.enum([
                "LHS_MATCH_TYPE_UNKNOWN",
                "EQUALS_OR_UNRESTRICTED",
                "EQUALS",
                "UNRESTRICTED",
                "NOT_EQUALS",
              ]).describe(
                "Optional. Left hand side of the expression match type.",
              ).optional(),
              requestValue: z.object({
                excludeFromUserAttributeIds: z.array(z.string()).describe(
                  "Optional. User attribute IDs in the request that should be excluded. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID.",
                ).optional(),
                key: z.string().describe(
                  "Optional. Custom key in the request. Used only when the field type is CUSTOM_VALUE.",
                ).optional(),
                userAttributeIds: z.array(z.string()).describe(
                  "Optional. User attribute IDs in the request. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID.",
                ).optional(),
              }).describe("Contains request value information.").optional(),
              stringValue: z.string().describe(
                "Optional. The string value, only applicable when rhs_value_type is STRING.",
              ).optional(),
              valueType: z.enum([
                "RHS_VALUE_TYPE_UNKNOWN",
                "STRING",
                "REQUEST",
                "BOOL",
                "DEPENDENT",
              ]).describe("Optional. Right hand side of the expression.")
                .optional(),
            })).describe("Optional. A list of non-auto field filters")
              .optional(),
          })).describe(
            "Optional. A list of field filter, the custom rule will apply.",
          ).optional(),
        })).describe(
          "Optional. The custom rules of the dynamic feed, only applicable when rule type is CUSTOM.",
        ).optional(),
        customValueFields: z.array(z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          requestKey: z.string().describe(
            "Optional. Custom key used to match for auto filtering.",
          ).optional(),
        })).describe(
          "Optional. Mapping between field ID and custom key that are used to match for auto filtering.",
        ).optional(),
        proximityFilter: z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          radiusBucketType: z.enum([
            "RADIUS_BUCKET_TYPE_UNKNOWN",
            "SMALL",
            "MEDIUM",
            "LARGE",
            "MULTI_REGIONAL",
            "NATIONAL",
          ]).describe(
            "Optional. The radius bucket type of the proximity filter",
          ).optional(),
          radiusUnitType: z.enum([
            "RADIUS_UNIT_TYPE_UNKNOWN",
            "KILOMETERS",
            "MILES",
          ]).describe("Optional. The units of the radius value").optional(),
          radiusValue: z.number().int().describe(
            "Optional. Radius length in units defined by radius_units.",
          ).optional(),
        }).describe("Contains proximity filter information.").optional(),
        remarketingValueAttributes: z.array(z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          userAttributeIds: z.array(z.string()).describe(
            "Optional. Remarketing user attribute IDs for auto filtering.",
          ).optional(),
        })).describe(
          "Optional. The link between an element field ID and a list of user attribute IDs.",
        ).optional(),
        rotationType: z.enum([
          "ROTATION_TYPE_UNKNOWN",
          "RANDOM",
          "OPTIMIZED",
          "WEIGHTED",
        ]).describe(
          "Optional. The rotation type to select from eligible rows. Rotation type only apply when the filtering rule results in more than one eligible rows.",
        ).optional(),
        ruleType: z.enum([
          "RULE_SET_TYPE_UNKNOWN",
          "OPEN",
          "AUTO",
          "CUSTOM",
          "PROXIMITY_TARGETING",
        ]).describe(
          "Optional. The type of the rule, the default value is OPEN.",
        ).optional(),
        weightFieldId: z.number().int().describe(
          "Optional. The field ID for the feed that will be used for weighted rotation, only applicable when rotation type is WEIGHTED.",
        ).optional(),
      }).describe("Contains dynamic rules information.").optional(),
      quantity: z.number().int().describe(
        "Optional. The number of this dynamic feed rows needed by the dynamic profile, default value is 1. Acceptable values are between 1 to 99, inclusive.",
      ).optional(),
    })).describe(
      "Optional. Associated dynamic feeds and their settings (including dynamic rules) for this dynamic profile version.",
    ).optional(),
    versionId: z.string().describe(
      "Output only. Version ID of this dynamic profile version. This is a read-only, auto-generated field. -1 for draft version, 0+ for published versions.",
    ).optional(),
  }).describe("Contains dynamic profile version information.").optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  name: z.string().describe(
    "Required. Identifier. Name of this dynamic profile. This is a required field and must be less than 256 characters long.",
  ).optional(),
  status: z.enum(["STATUS_UNKNOWN", "ACTIVE", "INACTIVE", "DELETED"]).describe(
    "Optional. Status of this dynamic profile.",
  ).optional(),
  studioAdvertiserId: z.string().describe(
    "Required. Advertiser ID of this dynamic profile. This is a required field on insertion.",
  ).optional(),
});

const StateSchema = z.object({
  active: z.object({
    dynamicProfileFeedSettings: z.array(z.object({
      dynamicFeedId: z.string(),
      dynamicRules: z.object({
        autoTargetedFieldIds: z.array(z.number()),
        customRules: z.array(z.object({
          name: z.string(),
          priority: z.number(),
          ruleBlocks: z.array(z.object({
            fieldFilter: z.array(z.object({
              boolValue: z.boolean(),
              dependentFieldValue: z.object({
                elementId: z.string(),
                fieldId: z.number(),
              }),
              fieldId: z.number(),
              matchType: z.string(),
              requestValue: z.object({
                excludeFromUserAttributeIds: z.array(z.string()),
                key: z.string(),
                userAttributeIds: z.array(z.string()),
              }),
              stringValue: z.string(),
              valueType: z.string(),
            })),
          })),
        })),
        customValueFields: z.array(z.object({
          fieldId: z.number(),
          requestKey: z.string(),
        })),
        proximityFilter: z.object({
          fieldId: z.number(),
          radiusBucketType: z.string(),
          radiusUnitType: z.string(),
          radiusValue: z.number(),
        }),
        remarketingValueAttributes: z.array(z.object({
          fieldId: z.number(),
          userAttributeIds: z.array(z.string()),
        })),
        rotationType: z.string(),
        ruleType: z.string(),
        weightFieldId: z.number(),
      }),
      quantity: z.number(),
    })),
    versionId: z.string(),
  }).optional(),
  archiveStatus: z.string().optional(),
  createInfo: z.object({
    time: z.string(),
  }).optional(),
  description: z.string().optional(),
  draft: z.object({
    dynamicProfileFeedSettings: z.array(z.object({
      dynamicFeedId: z.string(),
      dynamicRules: z.object({
        autoTargetedFieldIds: z.array(z.number()),
        customRules: z.array(z.object({
          name: z.string(),
          priority: z.number(),
          ruleBlocks: z.array(z.object({
            fieldFilter: z.array(z.object({
              boolValue: z.boolean(),
              dependentFieldValue: z.object({
                elementId: z.string(),
                fieldId: z.number(),
              }),
              fieldId: z.number(),
              matchType: z.string(),
              requestValue: z.object({
                excludeFromUserAttributeIds: z.array(z.string()),
                key: z.string(),
                userAttributeIds: z.array(z.string()),
              }),
              stringValue: z.string(),
              valueType: z.string(),
            })),
          })),
        })),
        customValueFields: z.array(z.object({
          fieldId: z.number(),
          requestKey: z.string(),
        })),
        proximityFilter: z.object({
          fieldId: z.number(),
          radiusBucketType: z.string(),
          radiusUnitType: z.string(),
          radiusValue: z.number(),
        }),
        remarketingValueAttributes: z.array(z.object({
          fieldId: z.number(),
          userAttributeIds: z.array(z.string()),
        })),
        rotationType: z.string(),
        ruleType: z.string(),
        weightFieldId: z.number(),
      }),
      quantity: z.number(),
    })),
    versionId: z.string(),
  }).optional(),
  dynamicProfileId: z.string().optional(),
  kind: z.string().optional(),
  lastModifiedInfo: z.object({
    time: z.string(),
  }).optional(),
  name: z.string(),
  status: z.string().optional(),
  studioAdvertiserId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  active: z.object({
    dynamicProfileFeedSettings: z.array(z.object({
      dynamicFeedId: z.string().describe(
        "Optional. Dynamic feed ID associated with dynamic profile version.",
      ).optional(),
      dynamicRules: z.object({
        autoTargetedFieldIds: z.array(z.number().int()).describe(
          "Optional. List of field IDs in this element that should be auto-targeted. Applicable when rule type is AUTO.",
        ).optional(),
        customRules: z.array(z.object({
          name: z.string().describe("Optional. Name of this custom rule.")
            .optional(),
          priority: z.number().int().describe(
            "Optional. Priority of the custom rule.",
          ).optional(),
          ruleBlocks: z.array(z.object({
            fieldFilter: z.array(z.object({
              boolValue: z.boolean().describe(
                "Optional. The boolean values, only applicable when rhs_value_type is BOOL.",
              ).optional(),
              dependentFieldValue: z.object({
                elementId: z.string().describe(
                  "Optional. The ID of the element that value's field will match against.",
                ).optional(),
                fieldId: z.number().int().describe(
                  "Optional. The field id of the dependent field.",
                ).optional(),
              }).describe("Contains dependent field value information.")
                .optional(),
              fieldId: z.number().int().describe(
                "Optional. The field ID on the left hand side of the expression.",
              ).optional(),
              matchType: z.enum([
                "LHS_MATCH_TYPE_UNKNOWN",
                "EQUALS_OR_UNRESTRICTED",
                "EQUALS",
                "UNRESTRICTED",
                "NOT_EQUALS",
              ]).describe(
                "Optional. Left hand side of the expression match type.",
              ).optional(),
              requestValue: z.object({
                excludeFromUserAttributeIds: z.array(z.string()).describe(
                  "Optional. User attribute IDs in the request that should be excluded. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID.",
                ).optional(),
                key: z.string().describe(
                  "Optional. Custom key in the request. Used only when the field type is CUSTOM_VALUE.",
                ).optional(),
                userAttributeIds: z.array(z.string()).describe(
                  "Optional. User attribute IDs in the request. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID.",
                ).optional(),
              }).describe("Contains request value information.").optional(),
              stringValue: z.string().describe(
                "Optional. The string value, only applicable when rhs_value_type is STRING.",
              ).optional(),
              valueType: z.enum([
                "RHS_VALUE_TYPE_UNKNOWN",
                "STRING",
                "REQUEST",
                "BOOL",
                "DEPENDENT",
              ]).describe("Optional. Right hand side of the expression.")
                .optional(),
            })).describe("Optional. A list of non-auto field filters")
              .optional(),
          })).describe(
            "Optional. A list of field filter, the custom rule will apply.",
          ).optional(),
        })).describe(
          "Optional. The custom rules of the dynamic feed, only applicable when rule type is CUSTOM.",
        ).optional(),
        customValueFields: z.array(z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          requestKey: z.string().describe(
            "Optional. Custom key used to match for auto filtering.",
          ).optional(),
        })).describe(
          "Optional. Mapping between field ID and custom key that are used to match for auto filtering.",
        ).optional(),
        proximityFilter: z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          radiusBucketType: z.enum([
            "RADIUS_BUCKET_TYPE_UNKNOWN",
            "SMALL",
            "MEDIUM",
            "LARGE",
            "MULTI_REGIONAL",
            "NATIONAL",
          ]).describe(
            "Optional. The radius bucket type of the proximity filter",
          ).optional(),
          radiusUnitType: z.enum([
            "RADIUS_UNIT_TYPE_UNKNOWN",
            "KILOMETERS",
            "MILES",
          ]).describe("Optional. The units of the radius value").optional(),
          radiusValue: z.number().int().describe(
            "Optional. Radius length in units defined by radius_units.",
          ).optional(),
        }).describe("Contains proximity filter information.").optional(),
        remarketingValueAttributes: z.array(z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          userAttributeIds: z.array(z.string()).describe(
            "Optional. Remarketing user attribute IDs for auto filtering.",
          ).optional(),
        })).describe(
          "Optional. The link between an element field ID and a list of user attribute IDs.",
        ).optional(),
        rotationType: z.enum([
          "ROTATION_TYPE_UNKNOWN",
          "RANDOM",
          "OPTIMIZED",
          "WEIGHTED",
        ]).describe(
          "Optional. The rotation type to select from eligible rows. Rotation type only apply when the filtering rule results in more than one eligible rows.",
        ).optional(),
        ruleType: z.enum([
          "RULE_SET_TYPE_UNKNOWN",
          "OPEN",
          "AUTO",
          "CUSTOM",
          "PROXIMITY_TARGETING",
        ]).describe(
          "Optional. The type of the rule, the default value is OPEN.",
        ).optional(),
        weightFieldId: z.number().int().describe(
          "Optional. The field ID for the feed that will be used for weighted rotation, only applicable when rotation type is WEIGHTED.",
        ).optional(),
      }).describe("Contains dynamic rules information.").optional(),
      quantity: z.number().int().describe(
        "Optional. The number of this dynamic feed rows needed by the dynamic profile, default value is 1. Acceptable values are between 1 to 99, inclusive.",
      ).optional(),
    })).describe(
      "Optional. Associated dynamic feeds and their settings (including dynamic rules) for this dynamic profile version.",
    ).optional(),
    versionId: z.string().describe(
      "Output only. Version ID of this dynamic profile version. This is a read-only, auto-generated field. -1 for draft version, 0+ for published versions.",
    ).optional(),
  }).describe("Contains dynamic profile version information.").optional(),
  archiveStatus: z.enum(["ARCHIVE_STATUS_UNKNOWN", "UNARCHIVED", "ARCHIVED"])
    .describe("Optional. Archive status of this dynamic profile.").optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  description: z.string().describe(
    "Optional. Description of this dynamic profile.",
  ).optional(),
  draft: z.object({
    dynamicProfileFeedSettings: z.array(z.object({
      dynamicFeedId: z.string().describe(
        "Optional. Dynamic feed ID associated with dynamic profile version.",
      ).optional(),
      dynamicRules: z.object({
        autoTargetedFieldIds: z.array(z.number().int()).describe(
          "Optional. List of field IDs in this element that should be auto-targeted. Applicable when rule type is AUTO.",
        ).optional(),
        customRules: z.array(z.object({
          name: z.string().describe("Optional. Name of this custom rule.")
            .optional(),
          priority: z.number().int().describe(
            "Optional. Priority of the custom rule.",
          ).optional(),
          ruleBlocks: z.array(z.object({
            fieldFilter: z.array(z.object({
              boolValue: z.boolean().describe(
                "Optional. The boolean values, only applicable when rhs_value_type is BOOL.",
              ).optional(),
              dependentFieldValue: z.object({
                elementId: z.string().describe(
                  "Optional. The ID of the element that value's field will match against.",
                ).optional(),
                fieldId: z.number().int().describe(
                  "Optional. The field id of the dependent field.",
                ).optional(),
              }).describe("Contains dependent field value information.")
                .optional(),
              fieldId: z.number().int().describe(
                "Optional. The field ID on the left hand side of the expression.",
              ).optional(),
              matchType: z.enum([
                "LHS_MATCH_TYPE_UNKNOWN",
                "EQUALS_OR_UNRESTRICTED",
                "EQUALS",
                "UNRESTRICTED",
                "NOT_EQUALS",
              ]).describe(
                "Optional. Left hand side of the expression match type.",
              ).optional(),
              requestValue: z.object({
                excludeFromUserAttributeIds: z.array(z.string()).describe(
                  "Optional. User attribute IDs in the request that should be excluded. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID.",
                ).optional(),
                key: z.string().describe(
                  "Optional. Custom key in the request. Used only when the field type is CUSTOM_VALUE.",
                ).optional(),
                userAttributeIds: z.array(z.string()).describe(
                  "Optional. User attribute IDs in the request. Used only when the field type is REMARKETING_VALUE or USER_ATTRIBUTE_ID.",
                ).optional(),
              }).describe("Contains request value information.").optional(),
              stringValue: z.string().describe(
                "Optional. The string value, only applicable when rhs_value_type is STRING.",
              ).optional(),
              valueType: z.enum([
                "RHS_VALUE_TYPE_UNKNOWN",
                "STRING",
                "REQUEST",
                "BOOL",
                "DEPENDENT",
              ]).describe("Optional. Right hand side of the expression.")
                .optional(),
            })).describe("Optional. A list of non-auto field filters")
              .optional(),
          })).describe(
            "Optional. A list of field filter, the custom rule will apply.",
          ).optional(),
        })).describe(
          "Optional. The custom rules of the dynamic feed, only applicable when rule type is CUSTOM.",
        ).optional(),
        customValueFields: z.array(z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          requestKey: z.string().describe(
            "Optional. Custom key used to match for auto filtering.",
          ).optional(),
        })).describe(
          "Optional. Mapping between field ID and custom key that are used to match for auto filtering.",
        ).optional(),
        proximityFilter: z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          radiusBucketType: z.enum([
            "RADIUS_BUCKET_TYPE_UNKNOWN",
            "SMALL",
            "MEDIUM",
            "LARGE",
            "MULTI_REGIONAL",
            "NATIONAL",
          ]).describe(
            "Optional. The radius bucket type of the proximity filter",
          ).optional(),
          radiusUnitType: z.enum([
            "RADIUS_UNIT_TYPE_UNKNOWN",
            "KILOMETERS",
            "MILES",
          ]).describe("Optional. The units of the radius value").optional(),
          radiusValue: z.number().int().describe(
            "Optional. Radius length in units defined by radius_units.",
          ).optional(),
        }).describe("Contains proximity filter information.").optional(),
        remarketingValueAttributes: z.array(z.object({
          fieldId: z.number().int().describe(
            "Optional. Field ID in the element.",
          ).optional(),
          userAttributeIds: z.array(z.string()).describe(
            "Optional. Remarketing user attribute IDs for auto filtering.",
          ).optional(),
        })).describe(
          "Optional. The link between an element field ID and a list of user attribute IDs.",
        ).optional(),
        rotationType: z.enum([
          "ROTATION_TYPE_UNKNOWN",
          "RANDOM",
          "OPTIMIZED",
          "WEIGHTED",
        ]).describe(
          "Optional. The rotation type to select from eligible rows. Rotation type only apply when the filtering rule results in more than one eligible rows.",
        ).optional(),
        ruleType: z.enum([
          "RULE_SET_TYPE_UNKNOWN",
          "OPEN",
          "AUTO",
          "CUSTOM",
          "PROXIMITY_TARGETING",
        ]).describe(
          "Optional. The type of the rule, the default value is OPEN.",
        ).optional(),
        weightFieldId: z.number().int().describe(
          "Optional. The field ID for the feed that will be used for weighted rotation, only applicable when rotation type is WEIGHTED.",
        ).optional(),
      }).describe("Contains dynamic rules information.").optional(),
      quantity: z.number().int().describe(
        "Optional. The number of this dynamic feed rows needed by the dynamic profile, default value is 1. Acceptable values are between 1 to 99, inclusive.",
      ).optional(),
    })).describe(
      "Optional. Associated dynamic feeds and their settings (including dynamic rules) for this dynamic profile version.",
    ).optional(),
    versionId: z.string().describe(
      "Output only. Version ID of this dynamic profile version. This is a read-only, auto-generated field. -1 for draft version, 0+ for published versions.",
    ).optional(),
  }).describe("Contains dynamic profile version information.").optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  name: z.string().describe(
    "Required. Identifier. Name of this dynamic profile. This is a required field and must be less than 256 characters long.",
  ).optional(),
  status: z.enum(["STATUS_UNKNOWN", "ACTIVE", "INACTIVE", "DELETED"]).describe(
    "Optional. Status of this dynamic profile.",
  ).optional(),
  studioAdvertiserId: z.string().describe(
    "Required. Advertiser ID of this dynamic profile. This is a required field on insertion.",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dfareporting/dynamicprofiles",
  version: "2026.04.02.2",
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
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "*Beta:* This API resource is available only to a very limited number of custo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dynamicProfiles",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["archiveStatus"] !== undefined) {
          body["archiveStatus"] = g["archiveStatus"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["draft"] !== undefined) body["draft"] = g["draft"];
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["studioAdvertiserId"] !== undefined) {
          body["studioAdvertiserId"] = g["studioAdvertiserId"];
        }
        if (g["name"] !== undefined) {
          params["dynamicProfileId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
        ) as StateData;
        const instanceName = (result.name ?? g.name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a dynamicProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the dynamicProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["dynamicProfileId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (result.name ?? g.name)?.toString() ??
          args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update dynamicProfiles attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = g.name?.toString() ?? "current";
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["archiveStatus"] !== undefined) {
          body["archiveStatus"] = g["archiveStatus"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["draft"] !== undefined) body["draft"] = g["draft"];
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["studioAdvertiserId"] !== undefined) {
          body["studioAdvertiserId"] = g["studioAdvertiserId"];
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync dynamicProfiles state from GCP",
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
          params["dynamicProfileId"] = identifier;
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
    generate_code: {
      description: "generate code",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["dynamicProfileId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "dfareporting.dynamicProfiles.generateCode",
            "path": "studio/dynamicProfiles/{+dynamicProfileId}/generateCode",
            "httpMethod": "GET",
            "parameterOrder": ["dynamicProfileId"],
            "parameters": {
              "dynamicProfileId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    publish: {
      description: "publish",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["dynamicProfileId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "dfareporting.dynamicProfiles.publish",
            "path": "studio/dynamicProfiles/{+dynamicProfileId}/publish",
            "httpMethod": "POST",
            "parameterOrder": ["dynamicProfileId"],
            "parameters": {
              "dynamicProfileId": { "location": "path", "required": true },
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
