// Auto-generated extension model for @swamp/gcp/securityposture/postures
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/postures/${shortName}`;
}

const BASE_URL = "https://securityposture.googleapis.com/";

const GET_CONFIG = {
  "id": "securityposture.organizations.locations.postures.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "revisionId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "securityposture.organizations.locations.postures.create",
  "path": "v1/{+parent}/postures",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "postureId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "securityposture.organizations.locations.postures.patch",
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
    "revisionId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "securityposture.organizations.locations.postures.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. The user-specified annotations for the posture. For details about the values you can use in an annotation, see [AIP-148: Standard fields](https://google.aip.dev/148#annotations).",
  ).optional(),
  description: z.string().describe("Optional. A description of the posture.")
    .optional(),
  name: z.string().describe(
    "Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`.",
  ).optional(),
  policySets: z.array(z.object({
    description: z.string().describe(
      "Optional. A description of the policy set.",
    ).optional(),
    policies: z.array(z.object({
      complianceStandards: z.array(z.object({
        control: z.string().describe(
          "Optional. The control in the compliance standard that the policy helps enforce. For example, `AC-3`.",
        ).optional(),
        standard: z.string().describe(
          "Optional. The compliance standard that the policy helps enforce. For example, `NIST SP 800-53`.",
        ).optional(),
      })).describe(
        "Optional. The compliance standards that the policy helps enforce.",
      ).optional(),
      constraint: z.object({
        orgPolicyConstraint: z.object({
          cannedConstraintId: z.string().describe(
            "Required. A unique identifier for the constraint.",
          ).optional(),
          policyRules: z.array(z.object({
            allowAll: z.boolean().describe(
              "Whether to allow any value for a list constraint. Valid only for list constraints.",
            ).optional(),
            condition: z.object({
              description: z.string().describe(
                "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
              ).optional(),
              expression: z.string().describe(
                "Textual representation of an expression in Common Expression Language syntax.",
              ).optional(),
              location: z.string().describe(
                "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
              ).optional(),
              title: z.string().describe(
                "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
              ).optional(),
            }).describe(
              'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
            ).optional(),
            denyAll: z.boolean().describe(
              "Whether to deny all values for a list constraint. Valid only for list constraints.",
            ).optional(),
            enforce: z.boolean().describe(
              "Whether to enforce the constraint. Valid only for boolean constraints.",
            ).optional(),
            parameters: z.record(z.string(), z.string()).describe(
              'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
            ).optional(),
            resourceTypes: z.object({
              included: z.array(z.string()).describe(
                "Optional. The resource types we currently support.",
              ).optional(),
            }).describe(
              "Set multiple resource types for one policy, for example: ` resourceTypes: included: - compute.googleapis.com/Instance - compute.googleapis.com/Disk ` Constraint definition contains an empty resource type in order to support multiple resource types in the policy. Only supports managed constraints. Method type is `GOVERN_TAGS`.",
            ).optional(),
            values: z.object({
              allowedValues: z.array(z.string()).describe(
                "The allowed values for the constraint.",
              ).optional(),
              deniedValues: z.array(z.string()).describe(
                "The denied values for the constraint.",
              ).optional(),
            }).describe(
              "The allowed and denied values for a list constraint. For all constraints, these fields can contain literal values. Optionally, you can add the `is:` prefix to these values. If the value contains a colon (`:`), then the `is:` prefix is required. Some constraints allow you to specify a portion of the resource hierarchy, known as a [_hierarchy subtree_](https://cloud.google.com/resource-manager/help/organization-policy/hierarchy-subtree), that the constraint applies to. To specify a hierarchy subtree, use the `under:` prefix, followed by a value with one of these formats: - `projects/{project_id}` (for example, `projects/tokyo-rain-123`) - `folders/{folder_id}` (for example, `folders/1234567890123`) - `organizations/{organization_id}` (for example, `organizations/123456789012`) A constraint's `supports_under` field indicates whether you can specify a hierarchy subtree. To learn which predefined constraints let you specify a hierarchy subtree, see the [constraints reference](https://cloud.google.com/resource-manager/help/organization-policy/constraints/reference).",
            ).optional(),
          })).describe("Required. The rules enforced by the constraint.")
            .optional(),
        }).describe("A predefined organization policy constraint.").optional(),
        orgPolicyConstraintCustom: z.object({
          customConstraint: z.object({
            actionType: z.enum(["ACTION_TYPE_UNSPECIFIED", "ALLOW", "DENY"])
              .describe("Whether to allow or deny the action.").optional(),
            condition: z.string().describe(
              "A Common Expression Language (CEL) condition expression that must evaluate to `true` for the constraint to be enforced. The maximum length is 1000 characters. For example: + `resource.instanceName.matches('(production|test)_(.+_)?[\\d]+')`: Evaluates to `true` if the resource's `instanceName` attribute contains the following: + The prefix `production` or `test` + An underscore (`_`) + Optional: One or more characters, followed by an underscore (`_`) + One or more digits + `resource.management.auto_upgrade == true`: Evaluates to `true` if the resource's `management.auto_upgrade` attribute is `true`.",
            ).optional(),
            description: z.string().describe(
              "A description of the constraint. The maximum length is 2000 characters.",
            ).optional(),
            displayName: z.string().describe(
              "A display name for the constraint. The maximum length is 200 characters.",
            ).optional(),
            methodTypes: z.array(
              z.enum(["METHOD_TYPE_UNSPECIFIED", "CREATE", "UPDATE", "DELETE"]),
            ).describe(
              "The types of operations that the constraint applies to.",
            ).optional(),
            name: z.string().describe(
              "Immutable. The name of the constraint, in the format `organizations/{organization_id}/customConstraints/custom.{custom_constraint_id}`. For example, `organizations/123456789012/customConstraints/custom.createOnlyE2TypeVms`. Must contain 1 to 62 characters, excluding the prefix `organizations/{organization_id}/customConstraints/custom.`.",
            ).optional(),
            resourceTypes: z.array(z.string()).describe(
              "Immutable. The resource type that the constraint applies to, in the format `{canonical_service_name}/{resource_type_name}`. For example, `compute.googleapis.com/Instance`.",
            ).optional(),
            updateTime: z.string().describe(
              "Output only. The last time at which the constraint was updated or created.",
            ).optional(),
          }).describe(
            "A custom, user-defined constraint. You can apply the constraint only to the resource types specified in the constraint, and only within the organization where the constraint is defined. _When you create a custom constraint, it is not enforced automatically._ You must use an organization policy to [enforce the constraint](https://cloud.google.com/resource-manager/help/organization-policy/constraints/enforce).",
          ).optional(),
          policyRules: z.array(z.object({
            allowAll: z.boolean().describe(
              "Whether to allow any value for a list constraint. Valid only for list constraints.",
            ).optional(),
            condition: z.object({
              description: z.string().describe(
                "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
              ).optional(),
              expression: z.string().describe(
                "Textual representation of an expression in Common Expression Language syntax.",
              ).optional(),
              location: z.string().describe(
                "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
              ).optional(),
              title: z.string().describe(
                "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
              ).optional(),
            }).describe(
              'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
            ).optional(),
            denyAll: z.boolean().describe(
              "Whether to deny all values for a list constraint. Valid only for list constraints.",
            ).optional(),
            enforce: z.boolean().describe(
              "Whether to enforce the constraint. Valid only for boolean constraints.",
            ).optional(),
            parameters: z.record(z.string(), z.string()).describe(
              'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
            ).optional(),
            resourceTypes: z.object({
              included: z.array(z.string()).describe(
                "Optional. The resource types we currently support.",
              ).optional(),
            }).describe(
              "Set multiple resource types for one policy, for example: ` resourceTypes: included: - compute.googleapis.com/Instance - compute.googleapis.com/Disk ` Constraint definition contains an empty resource type in order to support multiple resource types in the policy. Only supports managed constraints. Method type is `GOVERN_TAGS`.",
            ).optional(),
            values: z.object({
              allowedValues: z.array(z.string()).describe(
                "The allowed values for the constraint.",
              ).optional(),
              deniedValues: z.array(z.string()).describe(
                "The denied values for the constraint.",
              ).optional(),
            }).describe(
              "The allowed and denied values for a list constraint. For all constraints, these fields can contain literal values. Optionally, you can add the `is:` prefix to these values. If the value contains a colon (`:`), then the `is:` prefix is required. Some constraints allow you to specify a portion of the resource hierarchy, known as a [_hierarchy subtree_](https://cloud.google.com/resource-manager/help/organization-policy/hierarchy-subtree), that the constraint applies to. To specify a hierarchy subtree, use the `under:` prefix, followed by a value with one of these formats: - `projects/{project_id}` (for example, `projects/tokyo-rain-123`) - `folders/{folder_id}` (for example, `folders/1234567890123`) - `organizations/{organization_id}` (for example, `organizations/123456789012`) A constraint's `supports_under` field indicates whether you can specify a hierarchy subtree. To learn which predefined constraints let you specify a hierarchy subtree, see the [constraints reference](https://cloud.google.com/resource-manager/help/organization-policy/constraints/reference).",
            ).optional(),
          })).describe("Required. The rules enforced by the constraint.")
            .optional(),
        }).describe("A custom organization policy constraint.").optional(),
        securityHealthAnalyticsCustomModule: z.object({
          config: z.object({
            customOutput: z.object({
              properties: z.array(z.object({
                name: z.string().describe(
                  "Required. The name of the custom source property.",
                ).optional(),
                valueExpression: z.object({
                  description: z.string().describe(
                    "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
                  ).optional(),
                  expression: z.string().describe(
                    "Textual representation of an expression in Common Expression Language syntax.",
                  ).optional(),
                  location: z.string().describe(
                    "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
                  ).optional(),
                  title: z.string().describe(
                    "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
                  ).optional(),
                }).describe(
                  'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
                ).optional(),
              })).describe(
                "Optional. The custom source properties that can appear in findings.",
              ).optional(),
            }).describe(
              "Definitions of custom source properties that can appear in findings.",
            ).optional(),
            description: z.string().describe(
              "Optional. A description of the vulnerability or misconfiguration that the custom module detects. The description appears in each finding. Provide enough information to help an investigator understand the finding. The value must be enclosed in quotation marks.",
            ).optional(),
            predicate: z.object({
              description: z.string().describe(
                "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
              ).optional(),
              expression: z.string().describe(
                "Textual representation of an expression in Common Expression Language syntax.",
              ).optional(),
              location: z.string().describe(
                "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
              ).optional(),
              title: z.string().describe(
                "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
              ).optional(),
            }).describe(
              'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
            ).optional(),
            recommendation: z.string().describe(
              "Required. An explanation of the steps that security teams can take to resolve the detected issue. The explanation appears in each finding.",
            ).optional(),
            resourceSelector: z.object({
              resourceTypes: z.array(z.string()).describe(
                "Required. The resource types to run the detector on. Each custom module can specify up to 5 resource types.",
              ).optional(),
            }).describe(
              "A selector for the resource types to run the detector on.",
            ).optional(),
            severity: z.enum([
              "SEVERITY_UNSPECIFIED",
              "CRITICAL",
              "HIGH",
              "MEDIUM",
              "LOW",
            ]).describe(
              "Required. The severity of findings generated by the custom module.",
            ).optional(),
          }).describe(
            "A custom module configuration for Security Health Analytics. Use `CustomConfig` to create custom detectors that generate custom findings for resources that you specify.",
          ).optional(),
          displayName: z.string().describe(
            "Optional. The display name of the custom module. This value is used as the finding category for all the asset violation findings that the custom module returns. The display name must contain between 1 and 128 alphanumeric characters or underscores, and it must start with a lowercase letter.",
          ).optional(),
          id: z.string().describe(
            "Output only. Immutable. The unique identifier for the custom module. Contains 1 to 20 digits.",
          ).optional(),
          moduleEnablementState: z.enum([
            "ENABLEMENT_STATE_UNSPECIFIED",
            "ENABLED",
            "DISABLED",
          ]).describe(
            "Whether the custom module is enabled at a specified level of the resource hierarchy.",
          ).optional(),
        }).describe("A custom module for Security Health Analytics.")
          .optional(),
        securityHealthAnalyticsModule: z.object({
          moduleEnablementState: z.enum([
            "ENABLEMENT_STATE_UNSPECIFIED",
            "ENABLED",
            "DISABLED",
          ]).describe(
            "Whether the detector is enabled at a specified level of the resource hierarchy.",
          ).optional(),
          moduleName: z.string().describe(
            "Required. The name of the detector. For example, `BIGQUERY_TABLE_CMEK_DISABLED`. This field is also used as the finding category for all the asset violation findings that the detector returns.",
          ).optional(),
        }).describe("A built-in detector for Security Health Analytics.")
          .optional(),
      }).describe("Metadata for a constraint in a Policy.").optional(),
      description: z.string().describe("Optional. A description of the policy.")
        .optional(),
      policyId: z.string().describe(
        "Required. A user-specified identifier for the policy. In a PolicySet, each policy must have a unique identifier.",
      ).optional(),
    })).describe(
      "Required. The Policy resources in the policy set. Each policy must have a policy_id that's unique within the policy set.",
    ).optional(),
    policySetId: z.string().describe(
      "Required. An identifier for the policy set.",
    ).optional(),
  })).describe("Required. The PolicySet resources that the posture includes.")
    .optional(),
  state: z.enum(["STATE_UNSPECIFIED", "DEPRECATED", "DRAFT", "ACTIVE"])
    .describe(
      "Required. The state of the posture at the specified `revision_id`.",
    ).optional(),
  postureId: z.string().describe("Required. An identifier for the posture.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  categories: z.array(z.string()).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  policySets: z.array(z.object({
    description: z.string(),
    policies: z.array(z.object({
      complianceStandards: z.array(z.object({
        control: z.string(),
        standard: z.string(),
      })),
      constraint: z.object({
        orgPolicyConstraint: z.object({
          cannedConstraintId: z.string(),
          policyRules: z.array(z.object({
            allowAll: z.boolean(),
            condition: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            denyAll: z.boolean(),
            enforce: z.boolean(),
            parameters: z.record(z.string(), z.unknown()),
            resourceTypes: z.object({
              included: z.array(z.string()),
            }),
            values: z.object({
              allowedValues: z.array(z.string()),
              deniedValues: z.array(z.string()),
            }),
          })),
        }),
        orgPolicyConstraintCustom: z.object({
          customConstraint: z.object({
            actionType: z.string(),
            condition: z.string(),
            description: z.string(),
            displayName: z.string(),
            methodTypes: z.array(z.string()),
            name: z.string(),
            resourceTypes: z.array(z.string()),
            updateTime: z.string(),
          }),
          policyRules: z.array(z.object({
            allowAll: z.boolean(),
            condition: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            denyAll: z.boolean(),
            enforce: z.boolean(),
            parameters: z.record(z.string(), z.unknown()),
            resourceTypes: z.object({
              included: z.array(z.string()),
            }),
            values: z.object({
              allowedValues: z.array(z.string()),
              deniedValues: z.array(z.string()),
            }),
          })),
        }),
        securityHealthAnalyticsCustomModule: z.object({
          config: z.object({
            customOutput: z.object({
              properties: z.array(z.object({
                name: z.string(),
                valueExpression: z.object({
                  description: z.string(),
                  expression: z.string(),
                  location: z.string(),
                  title: z.string(),
                }),
              })),
            }),
            description: z.string(),
            predicate: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            recommendation: z.string(),
            resourceSelector: z.object({
              resourceTypes: z.array(z.string()),
            }),
            severity: z.string(),
          }),
          displayName: z.string(),
          id: z.string(),
          moduleEnablementState: z.string(),
        }),
        securityHealthAnalyticsModule: z.object({
          moduleEnablementState: z.string(),
          moduleName: z.string(),
        }),
      }),
      description: z.string(),
      policyId: z.string(),
    })),
    policySetId: z.string(),
  })).optional(),
  reconciling: z.boolean().optional(),
  revisionId: z.string().optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. The user-specified annotations for the posture. For details about the values you can use in an annotation, see [AIP-148: Standard fields](https://google.aip.dev/148#annotations).",
  ).optional(),
  description: z.string().describe("Optional. A description of the posture.")
    .optional(),
  name: z.string().describe(
    "Required. Identifier. The name of the posture, in the format `organizations/{organization}/locations/global/postures/{posture_id}`.",
  ).optional(),
  policySets: z.array(z.object({
    description: z.string().describe(
      "Optional. A description of the policy set.",
    ).optional(),
    policies: z.array(z.object({
      complianceStandards: z.array(z.object({
        control: z.string().describe(
          "Optional. The control in the compliance standard that the policy helps enforce. For example, `AC-3`.",
        ).optional(),
        standard: z.string().describe(
          "Optional. The compliance standard that the policy helps enforce. For example, `NIST SP 800-53`.",
        ).optional(),
      })).describe(
        "Optional. The compliance standards that the policy helps enforce.",
      ).optional(),
      constraint: z.object({
        orgPolicyConstraint: z.object({
          cannedConstraintId: z.string().describe(
            "Required. A unique identifier for the constraint.",
          ).optional(),
          policyRules: z.array(z.object({
            allowAll: z.boolean().describe(
              "Whether to allow any value for a list constraint. Valid only for list constraints.",
            ).optional(),
            condition: z.object({
              description: z.string().describe(
                "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
              ).optional(),
              expression: z.string().describe(
                "Textual representation of an expression in Common Expression Language syntax.",
              ).optional(),
              location: z.string().describe(
                "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
              ).optional(),
              title: z.string().describe(
                "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
              ).optional(),
            }).describe(
              'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
            ).optional(),
            denyAll: z.boolean().describe(
              "Whether to deny all values for a list constraint. Valid only for list constraints.",
            ).optional(),
            enforce: z.boolean().describe(
              "Whether to enforce the constraint. Valid only for boolean constraints.",
            ).optional(),
            parameters: z.record(z.string(), z.string()).describe(
              'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
            ).optional(),
            resourceTypes: z.object({
              included: z.array(z.string()).describe(
                "Optional. The resource types we currently support.",
              ).optional(),
            }).describe(
              "Set multiple resource types for one policy, for example: ` resourceTypes: included: - compute.googleapis.com/Instance - compute.googleapis.com/Disk ` Constraint definition contains an empty resource type in order to support multiple resource types in the policy. Only supports managed constraints. Method type is `GOVERN_TAGS`.",
            ).optional(),
            values: z.object({
              allowedValues: z.array(z.string()).describe(
                "The allowed values for the constraint.",
              ).optional(),
              deniedValues: z.array(z.string()).describe(
                "The denied values for the constraint.",
              ).optional(),
            }).describe(
              "The allowed and denied values for a list constraint. For all constraints, these fields can contain literal values. Optionally, you can add the `is:` prefix to these values. If the value contains a colon (`:`), then the `is:` prefix is required. Some constraints allow you to specify a portion of the resource hierarchy, known as a [_hierarchy subtree_](https://cloud.google.com/resource-manager/help/organization-policy/hierarchy-subtree), that the constraint applies to. To specify a hierarchy subtree, use the `under:` prefix, followed by a value with one of these formats: - `projects/{project_id}` (for example, `projects/tokyo-rain-123`) - `folders/{folder_id}` (for example, `folders/1234567890123`) - `organizations/{organization_id}` (for example, `organizations/123456789012`) A constraint's `supports_under` field indicates whether you can specify a hierarchy subtree. To learn which predefined constraints let you specify a hierarchy subtree, see the [constraints reference](https://cloud.google.com/resource-manager/help/organization-policy/constraints/reference).",
            ).optional(),
          })).describe("Required. The rules enforced by the constraint.")
            .optional(),
        }).describe("A predefined organization policy constraint.").optional(),
        orgPolicyConstraintCustom: z.object({
          customConstraint: z.object({
            actionType: z.enum(["ACTION_TYPE_UNSPECIFIED", "ALLOW", "DENY"])
              .describe("Whether to allow or deny the action.").optional(),
            condition: z.string().describe(
              "A Common Expression Language (CEL) condition expression that must evaluate to `true` for the constraint to be enforced. The maximum length is 1000 characters. For example: + `resource.instanceName.matches('(production|test)_(.+_)?[\\d]+')`: Evaluates to `true` if the resource's `instanceName` attribute contains the following: + The prefix `production` or `test` + An underscore (`_`) + Optional: One or more characters, followed by an underscore (`_`) + One or more digits + `resource.management.auto_upgrade == true`: Evaluates to `true` if the resource's `management.auto_upgrade` attribute is `true`.",
            ).optional(),
            description: z.string().describe(
              "A description of the constraint. The maximum length is 2000 characters.",
            ).optional(),
            displayName: z.string().describe(
              "A display name for the constraint. The maximum length is 200 characters.",
            ).optional(),
            methodTypes: z.array(
              z.enum(["METHOD_TYPE_UNSPECIFIED", "CREATE", "UPDATE", "DELETE"]),
            ).describe(
              "The types of operations that the constraint applies to.",
            ).optional(),
            name: z.string().describe(
              "Immutable. The name of the constraint, in the format `organizations/{organization_id}/customConstraints/custom.{custom_constraint_id}`. For example, `organizations/123456789012/customConstraints/custom.createOnlyE2TypeVms`. Must contain 1 to 62 characters, excluding the prefix `organizations/{organization_id}/customConstraints/custom.`.",
            ).optional(),
            resourceTypes: z.array(z.string()).describe(
              "Immutable. The resource type that the constraint applies to, in the format `{canonical_service_name}/{resource_type_name}`. For example, `compute.googleapis.com/Instance`.",
            ).optional(),
            updateTime: z.string().describe(
              "Output only. The last time at which the constraint was updated or created.",
            ).optional(),
          }).describe(
            "A custom, user-defined constraint. You can apply the constraint only to the resource types specified in the constraint, and only within the organization where the constraint is defined. _When you create a custom constraint, it is not enforced automatically._ You must use an organization policy to [enforce the constraint](https://cloud.google.com/resource-manager/help/organization-policy/constraints/enforce).",
          ).optional(),
          policyRules: z.array(z.object({
            allowAll: z.boolean().describe(
              "Whether to allow any value for a list constraint. Valid only for list constraints.",
            ).optional(),
            condition: z.object({
              description: z.string().describe(
                "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
              ).optional(),
              expression: z.string().describe(
                "Textual representation of an expression in Common Expression Language syntax.",
              ).optional(),
              location: z.string().describe(
                "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
              ).optional(),
              title: z.string().describe(
                "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
              ).optional(),
            }).describe(
              'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
            ).optional(),
            denyAll: z.boolean().describe(
              "Whether to deny all values for a list constraint. Valid only for list constraints.",
            ).optional(),
            enforce: z.boolean().describe(
              "Whether to enforce the constraint. Valid only for boolean constraints.",
            ).optional(),
            parameters: z.record(z.string(), z.string()).describe(
              'Optional. Required for managed constraints if parameters are defined. Passes parameter values when policy enforcement is enabled. Ensure that parameter value types match those defined in the constraint definition. For example: ` { "allowedLocations": ["us-east1", "us-west1"], "allowAll": true } `',
            ).optional(),
            resourceTypes: z.object({
              included: z.array(z.string()).describe(
                "Optional. The resource types we currently support.",
              ).optional(),
            }).describe(
              "Set multiple resource types for one policy, for example: ` resourceTypes: included: - compute.googleapis.com/Instance - compute.googleapis.com/Disk ` Constraint definition contains an empty resource type in order to support multiple resource types in the policy. Only supports managed constraints. Method type is `GOVERN_TAGS`.",
            ).optional(),
            values: z.object({
              allowedValues: z.array(z.string()).describe(
                "The allowed values for the constraint.",
              ).optional(),
              deniedValues: z.array(z.string()).describe(
                "The denied values for the constraint.",
              ).optional(),
            }).describe(
              "The allowed and denied values for a list constraint. For all constraints, these fields can contain literal values. Optionally, you can add the `is:` prefix to these values. If the value contains a colon (`:`), then the `is:` prefix is required. Some constraints allow you to specify a portion of the resource hierarchy, known as a [_hierarchy subtree_](https://cloud.google.com/resource-manager/help/organization-policy/hierarchy-subtree), that the constraint applies to. To specify a hierarchy subtree, use the `under:` prefix, followed by a value with one of these formats: - `projects/{project_id}` (for example, `projects/tokyo-rain-123`) - `folders/{folder_id}` (for example, `folders/1234567890123`) - `organizations/{organization_id}` (for example, `organizations/123456789012`) A constraint's `supports_under` field indicates whether you can specify a hierarchy subtree. To learn which predefined constraints let you specify a hierarchy subtree, see the [constraints reference](https://cloud.google.com/resource-manager/help/organization-policy/constraints/reference).",
            ).optional(),
          })).describe("Required. The rules enforced by the constraint.")
            .optional(),
        }).describe("A custom organization policy constraint.").optional(),
        securityHealthAnalyticsCustomModule: z.object({
          config: z.object({
            customOutput: z.object({
              properties: z.array(z.object({
                name: z.string().describe(
                  "Required. The name of the custom source property.",
                ).optional(),
                valueExpression: z.object({
                  description: z.string().describe(
                    "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
                  ).optional(),
                  expression: z.string().describe(
                    "Textual representation of an expression in Common Expression Language syntax.",
                  ).optional(),
                  location: z.string().describe(
                    "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
                  ).optional(),
                  title: z.string().describe(
                    "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
                  ).optional(),
                }).describe(
                  'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
                ).optional(),
              })).describe(
                "Optional. The custom source properties that can appear in findings.",
              ).optional(),
            }).describe(
              "Definitions of custom source properties that can appear in findings.",
            ).optional(),
            description: z.string().describe(
              "Optional. A description of the vulnerability or misconfiguration that the custom module detects. The description appears in each finding. Provide enough information to help an investigator understand the finding. The value must be enclosed in quotation marks.",
            ).optional(),
            predicate: z.object({
              description: z.string().describe(
                "Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.",
              ).optional(),
              expression: z.string().describe(
                "Textual representation of an expression in Common Expression Language syntax.",
              ).optional(),
              location: z.string().describe(
                "Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.",
              ).optional(),
              title: z.string().describe(
                "Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.",
              ).optional(),
            }).describe(
              'Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type!= \'private\' && document.type!= \'internal\'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "\'New message received at \' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.',
            ).optional(),
            recommendation: z.string().describe(
              "Required. An explanation of the steps that security teams can take to resolve the detected issue. The explanation appears in each finding.",
            ).optional(),
            resourceSelector: z.object({
              resourceTypes: z.array(z.string()).describe(
                "Required. The resource types to run the detector on. Each custom module can specify up to 5 resource types.",
              ).optional(),
            }).describe(
              "A selector for the resource types to run the detector on.",
            ).optional(),
            severity: z.enum([
              "SEVERITY_UNSPECIFIED",
              "CRITICAL",
              "HIGH",
              "MEDIUM",
              "LOW",
            ]).describe(
              "Required. The severity of findings generated by the custom module.",
            ).optional(),
          }).describe(
            "A custom module configuration for Security Health Analytics. Use `CustomConfig` to create custom detectors that generate custom findings for resources that you specify.",
          ).optional(),
          displayName: z.string().describe(
            "Optional. The display name of the custom module. This value is used as the finding category for all the asset violation findings that the custom module returns. The display name must contain between 1 and 128 alphanumeric characters or underscores, and it must start with a lowercase letter.",
          ).optional(),
          id: z.string().describe(
            "Output only. Immutable. The unique identifier for the custom module. Contains 1 to 20 digits.",
          ).optional(),
          moduleEnablementState: z.enum([
            "ENABLEMENT_STATE_UNSPECIFIED",
            "ENABLED",
            "DISABLED",
          ]).describe(
            "Whether the custom module is enabled at a specified level of the resource hierarchy.",
          ).optional(),
        }).describe("A custom module for Security Health Analytics.")
          .optional(),
        securityHealthAnalyticsModule: z.object({
          moduleEnablementState: z.enum([
            "ENABLEMENT_STATE_UNSPECIFIED",
            "ENABLED",
            "DISABLED",
          ]).describe(
            "Whether the detector is enabled at a specified level of the resource hierarchy.",
          ).optional(),
          moduleName: z.string().describe(
            "Required. The name of the detector. For example, `BIGQUERY_TABLE_CMEK_DISABLED`. This field is also used as the finding category for all the asset violation findings that the detector returns.",
          ).optional(),
        }).describe("A built-in detector for Security Health Analytics.")
          .optional(),
      }).describe("Metadata for a constraint in a Policy.").optional(),
      description: z.string().describe("Optional. A description of the policy.")
        .optional(),
      policyId: z.string().describe(
        "Required. A user-specified identifier for the policy. In a PolicySet, each policy must have a unique identifier.",
      ).optional(),
    })).describe(
      "Required. The Policy resources in the policy set. Each policy must have a policy_id that's unique within the policy set.",
    ).optional(),
    policySetId: z.string().describe(
      "Required. An identifier for the policy set.",
    ).optional(),
  })).describe("Required. The PolicySet resources that the posture includes.")
    .optional(),
  state: z.enum(["STATE_UNSPECIFIED", "DEPRECATED", "DRAFT", "ACTIVE"])
    .describe(
      "Required. The state of the posture at the specified `revision_id`.",
    ).optional(),
  postureId: z.string().describe("Required. An identifier for the posture.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/securityposture/postures",
  version: "2026.04.03.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The details of a posture.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a postures",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policySets"] !== undefined) body["policySets"] = g["policySets"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["postureId"] !== undefined) body["postureId"] = g["postureId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
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
      description: "Get a postures",
      arguments: z.object({
        identifier: z.string().describe("The name of the postures"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update postures attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["policySets"] !== undefined) body["policySets"] = g["policySets"];
        if (g["state"] !== undefined) body["state"] = g["state"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
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
    delete: {
      description: "Delete the postures",
      arguments: z.object({
        identifier: z.string().describe("The name of the postures"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync postures state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
    extract: {
      description: "extract",
      arguments: z.object({
        postureId: z.any().optional(),
        workload: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["postureId"] !== undefined) {
          body["postureId"] = args["postureId"];
        }
        if (args["workload"] !== undefined) body["workload"] = args["workload"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "securityposture.organizations.locations.postures.extract",
            "path": "v1/{+parent}/postures:extract",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_revisions: {
      description: "list revisions",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securityposture.organizations.locations.postures.listRevisions",
            "path": "v1/{+name}:listRevisions",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
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
