// Auto-generated extension model for @swamp/gcp/contentwarehouse/rulesets
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
  return `${parent}/ruleSets/${shortName}`;
}

const BASE_URL = "https://contentwarehouse.googleapis.com/";

const GET_CONFIG = {
  "id": "contentwarehouse.projects.locations.ruleSets.get",
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
  },
} as const;

const INSERT_CONFIG = {
  "id": "contentwarehouse.projects.locations.ruleSets.create",
  "path": "v1/{+parent}/ruleSets",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "contentwarehouse.projects.locations.ruleSets.patch",
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
  "id": "contentwarehouse.projects.locations.ruleSets.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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
  description: z.string().describe("Short description of the rule-set.")
    .optional(),
  name: z.string().describe(
    "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
  ).optional(),
  rules: z.array(z.object({
    actions: z.array(z.object({
      accessControl: z.object({
        operationType: z.enum([
          "UNKNOWN",
          "ADD_POLICY_BINDING",
          "REMOVE_POLICY_BINDING",
          "REPLACE_POLICY_BINDING",
        ]).describe("Identifies the type of operation.").optional(),
        policy: z.object({
          auditConfigs: z.array(z.object({
            auditLogConfigs: z.array(z.object({
              exemptedMembers: z.array(z.string()).describe(
                "Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members.",
              ).optional(),
              logType: z.enum([
                "LOG_TYPE_UNSPECIFIED",
                "ADMIN_READ",
                "DATA_WRITE",
                "DATA_READ",
              ]).describe("The log type that this config enables.").optional(),
            })).describe(
              "The configuration for logging of each type of permission.",
            ).optional(),
            service: z.string().describe(
              "Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.",
            ).optional(),
          })).describe(
            "Specifies cloud audit logging configuration for this policy.",
          ).optional(),
          bindings: z.array(z.object({
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
            members: z.array(z.string()).describe(
              "Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com`. * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.",
            ).optional(),
            role: z.string().describe(
              "Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles).",
            ).optional(),
          })).describe(
            "Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.",
          ).optional(),
          etag: z.string().describe(
            "`etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.",
          ).optional(),
          version: z.number().int().describe(
            "Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).",
          ).optional(),
        }).describe(
          'An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** ` { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp(\'2020-10-01T00:00:00.000Z\')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } ` **YAML example:** ` bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp(\'2020-10-01T00:00:00.000Z\') etag: BwWWja0YfJA= version: 3 ` For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).',
        ).optional(),
      }).describe(
        "Represents the action responsible for access control list management operations.",
      ).optional(),
      actionId: z.string().describe("ID of the action. Managed internally.")
        .optional(),
      addToFolder: z.object({
        folders: z.array(z.string()).describe(
          "Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe(
        "Represents the action responsible for adding document under a folder.",
      ).optional(),
      dataUpdate: z.object({
        entries: z.record(z.string(), z.string()).describe(
          'Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types.',
        ).optional(),
      }).describe(
        "Represents the action responsible for properties update operations.",
      ).optional(),
      dataValidation: z.object({
        conditions: z.record(z.string(), z.string()).describe(
          'Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation.',
        ).optional(),
      }).describe(
        "Represents the action responsible for data validation operations.",
      ).optional(),
      deleteDocumentAction: z.object({
        enableHardDelete: z.boolean().describe(
          "Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'.",
        ).optional(),
      }).describe(
        "Represents the action responsible for deleting the document.",
      ).optional(),
      publishToPubSub: z.object({
        messages: z.array(z.string()).describe("Messages to be published.")
          .optional(),
        topicId: z.string().describe(
          "The topic id in the Pub/Sub service for which messages will be published to.",
        ).optional(),
      }).describe(
        "Represents the action responsible for publishing messages to a Pub/Sub topic.",
      ).optional(),
      removeFromFolderAction: z.object({
        condition: z.string().describe(
          "Condition of the action to be executed.",
        ).optional(),
        folder: z.string().describe(
          "Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe(
        "Represents the action responsible for remove a document from a specific folder.",
      ).optional(),
    })).describe(
      "List of actions that are executed when the rule is satisfied.",
    ).optional(),
    condition: z.string().describe(
      'Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000',
    ).optional(),
    description: z.string().describe(
      "Short description of the rule and its context.",
    ).optional(),
    ruleId: z.string().describe(
      "ID of the rule. It has to be unique across all the examples. This is managed internally.",
    ).optional(),
    triggerType: z.enum([
      "UNKNOWN",
      "ON_CREATE",
      "ON_UPDATE",
      "ON_CREATE_LINK",
      "ON_DELETE_LINK",
    ]).describe("Identifies the trigger type for running the policy.")
      .optional(),
  })).describe("List of rules given by the customer.").optional(),
  source: z.string().describe("Source of the rules i.e., customer name.")
    .optional(),
  ruleSet: z.object({
    description: z.string().describe("Short description of the rule-set.")
      .optional(),
    name: z.string().describe(
      "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
    ).optional(),
    rules: z.array(z.object({
      actions: z.array(z.object({
        accessControl: z.object({
          operationType: z.enum([
            "UNKNOWN",
            "ADD_POLICY_BINDING",
            "REMOVE_POLICY_BINDING",
            "REPLACE_POLICY_BINDING",
          ]).describe("Identifies the type of operation.").optional(),
          policy: z.object({
            auditConfigs: z.array(z.object({
              auditLogConfigs: z.array(z.object({
                exemptedMembers: z.array(z.string()).describe(
                  "Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members.",
                ).optional(),
                logType: z.enum([
                  "LOG_TYPE_UNSPECIFIED",
                  "ADMIN_READ",
                  "DATA_WRITE",
                  "DATA_READ",
                ]).describe("The log type that this config enables.")
                  .optional(),
              })).describe(
                "The configuration for logging of each type of permission.",
              ).optional(),
              service: z.string().describe(
                "Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.",
              ).optional(),
            })).describe(
              "Specifies cloud audit logging configuration for this policy.",
            ).optional(),
            bindings: z.array(z.object({
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
              members: z.array(z.string()).describe(
                "Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com`. * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.",
              ).optional(),
              role: z.string().describe(
                "Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles).",
              ).optional(),
            })).describe(
              "Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.",
            ).optional(),
            etag: z.string().describe(
              "`etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.",
            ).optional(),
            version: z.number().int().describe(
              "Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).",
            ).optional(),
          }).describe(
            'An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** ` { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp(\'2020-10-01T00:00:00.000Z\')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } ` **YAML example:** ` bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp(\'2020-10-01T00:00:00.000Z\') etag: BwWWja0YfJA= version: 3 ` For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).',
          ).optional(),
        }).describe(
          "Represents the action responsible for access control list management operations.",
        ).optional(),
        actionId: z.string().describe("ID of the action. Managed internally.")
          .optional(),
        addToFolder: z.object({
          folders: z.array(z.string()).describe(
            "Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
          ).optional(),
        }).describe(
          "Represents the action responsible for adding document under a folder.",
        ).optional(),
        dataUpdate: z.object({
          entries: z.record(z.string(), z.string()).describe(
            'Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types.',
          ).optional(),
        }).describe(
          "Represents the action responsible for properties update operations.",
        ).optional(),
        dataValidation: z.object({
          conditions: z.record(z.string(), z.string()).describe(
            'Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation.',
          ).optional(),
        }).describe(
          "Represents the action responsible for data validation operations.",
        ).optional(),
        deleteDocumentAction: z.object({
          enableHardDelete: z.boolean().describe(
            "Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'.",
          ).optional(),
        }).describe(
          "Represents the action responsible for deleting the document.",
        ).optional(),
        publishToPubSub: z.object({
          messages: z.array(z.string()).describe("Messages to be published.")
            .optional(),
          topicId: z.string().describe(
            "The topic id in the Pub/Sub service for which messages will be published to.",
          ).optional(),
        }).describe(
          "Represents the action responsible for publishing messages to a Pub/Sub topic.",
        ).optional(),
        removeFromFolderAction: z.object({
          condition: z.string().describe(
            "Condition of the action to be executed.",
          ).optional(),
          folder: z.string().describe(
            "Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
          ).optional(),
        }).describe(
          "Represents the action responsible for remove a document from a specific folder.",
        ).optional(),
      })).describe(
        "List of actions that are executed when the rule is satisfied.",
      ).optional(),
      condition: z.string().describe(
        'Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000',
      ).optional(),
      description: z.string().describe(
        "Short description of the rule and its context.",
      ).optional(),
      ruleId: z.string().describe(
        "ID of the rule. It has to be unique across all the examples. This is managed internally.",
      ).optional(),
      triggerType: z.enum([
        "UNKNOWN",
        "ON_CREATE",
        "ON_UPDATE",
        "ON_CREATE_LINK",
        "ON_DELETE_LINK",
      ]).describe("Identifies the trigger type for running the policy.")
        .optional(),
    })).describe("List of rules given by the customer.").optional(),
    source: z.string().describe("Source of the rules i.e., customer name.")
      .optional(),
  }).describe("Represents a set of rules from a single customer.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  name: z.string(),
  rules: z.array(z.object({
    actions: z.array(z.object({
      accessControl: z.object({
        operationType: z.string(),
        policy: z.object({
          auditConfigs: z.array(z.object({
            auditLogConfigs: z.array(z.object({
              exemptedMembers: z.array(z.string()),
              logType: z.string(),
            })),
            service: z.string(),
          })),
          bindings: z.array(z.object({
            condition: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            members: z.array(z.string()),
            role: z.string(),
          })),
          etag: z.string(),
          version: z.number(),
        }),
      }),
      actionId: z.string(),
      addToFolder: z.object({
        folders: z.array(z.string()),
      }),
      dataUpdate: z.object({
        entries: z.record(z.string(), z.unknown()),
      }),
      dataValidation: z.object({
        conditions: z.record(z.string(), z.unknown()),
      }),
      deleteDocumentAction: z.object({
        enableHardDelete: z.boolean(),
      }),
      publishToPubSub: z.object({
        messages: z.array(z.string()),
        topicId: z.string(),
      }),
      removeFromFolderAction: z.object({
        condition: z.string(),
        folder: z.string(),
      }),
    })),
    condition: z.string(),
    description: z.string(),
    ruleId: z.string(),
    triggerType: z.string(),
  })).optional(),
  source: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe("Short description of the rule-set.")
    .optional(),
  name: z.string().describe(
    "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
  ).optional(),
  rules: z.array(z.object({
    actions: z.array(z.object({
      accessControl: z.object({
        operationType: z.enum([
          "UNKNOWN",
          "ADD_POLICY_BINDING",
          "REMOVE_POLICY_BINDING",
          "REPLACE_POLICY_BINDING",
        ]).describe("Identifies the type of operation.").optional(),
        policy: z.object({
          auditConfigs: z.array(z.object({
            auditLogConfigs: z.array(z.object({
              exemptedMembers: z.array(z.string()).describe(
                "Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members.",
              ).optional(),
              logType: z.enum([
                "LOG_TYPE_UNSPECIFIED",
                "ADMIN_READ",
                "DATA_WRITE",
                "DATA_READ",
              ]).describe("The log type that this config enables.").optional(),
            })).describe(
              "The configuration for logging of each type of permission.",
            ).optional(),
            service: z.string().describe(
              "Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.",
            ).optional(),
          })).describe(
            "Specifies cloud audit logging configuration for this policy.",
          ).optional(),
          bindings: z.array(z.object({
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
            members: z.array(z.string()).describe(
              "Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com`. * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.",
            ).optional(),
            role: z.string().describe(
              "Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles).",
            ).optional(),
          })).describe(
            "Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.",
          ).optional(),
          etag: z.string().describe(
            "`etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.",
          ).optional(),
          version: z.number().int().describe(
            "Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).",
          ).optional(),
        }).describe(
          'An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** ` { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp(\'2020-10-01T00:00:00.000Z\')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } ` **YAML example:** ` bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp(\'2020-10-01T00:00:00.000Z\') etag: BwWWja0YfJA= version: 3 ` For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).',
        ).optional(),
      }).describe(
        "Represents the action responsible for access control list management operations.",
      ).optional(),
      actionId: z.string().describe("ID of the action. Managed internally.")
        .optional(),
      addToFolder: z.object({
        folders: z.array(z.string()).describe(
          "Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe(
        "Represents the action responsible for adding document under a folder.",
      ).optional(),
      dataUpdate: z.object({
        entries: z.record(z.string(), z.string()).describe(
          'Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types.',
        ).optional(),
      }).describe(
        "Represents the action responsible for properties update operations.",
      ).optional(),
      dataValidation: z.object({
        conditions: z.record(z.string(), z.string()).describe(
          'Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation.',
        ).optional(),
      }).describe(
        "Represents the action responsible for data validation operations.",
      ).optional(),
      deleteDocumentAction: z.object({
        enableHardDelete: z.boolean().describe(
          "Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'.",
        ).optional(),
      }).describe(
        "Represents the action responsible for deleting the document.",
      ).optional(),
      publishToPubSub: z.object({
        messages: z.array(z.string()).describe("Messages to be published.")
          .optional(),
        topicId: z.string().describe(
          "The topic id in the Pub/Sub service for which messages will be published to.",
        ).optional(),
      }).describe(
        "Represents the action responsible for publishing messages to a Pub/Sub topic.",
      ).optional(),
      removeFromFolderAction: z.object({
        condition: z.string().describe(
          "Condition of the action to be executed.",
        ).optional(),
        folder: z.string().describe(
          "Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
        ).optional(),
      }).describe(
        "Represents the action responsible for remove a document from a specific folder.",
      ).optional(),
    })).describe(
      "List of actions that are executed when the rule is satisfied.",
    ).optional(),
    condition: z.string().describe(
      'Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000',
    ).optional(),
    description: z.string().describe(
      "Short description of the rule and its context.",
    ).optional(),
    ruleId: z.string().describe(
      "ID of the rule. It has to be unique across all the examples. This is managed internally.",
    ).optional(),
    triggerType: z.enum([
      "UNKNOWN",
      "ON_CREATE",
      "ON_UPDATE",
      "ON_CREATE_LINK",
      "ON_DELETE_LINK",
    ]).describe("Identifies the trigger type for running the policy.")
      .optional(),
  })).describe("List of rules given by the customer.").optional(),
  source: z.string().describe("Source of the rules i.e., customer name.")
    .optional(),
  ruleSet: z.object({
    description: z.string().describe("Short description of the rule-set.")
      .optional(),
    name: z.string().describe(
      "The resource name of the rule set. Managed internally. Format: projects/{project_number}/locations/{location}/ruleSet/{rule_set_id}. The name is ignored when creating a rule set.",
    ).optional(),
    rules: z.array(z.object({
      actions: z.array(z.object({
        accessControl: z.object({
          operationType: z.enum([
            "UNKNOWN",
            "ADD_POLICY_BINDING",
            "REMOVE_POLICY_BINDING",
            "REPLACE_POLICY_BINDING",
          ]).describe("Identifies the type of operation.").optional(),
          policy: z.object({
            auditConfigs: z.array(z.object({
              auditLogConfigs: z.array(z.object({
                exemptedMembers: z.array(z.string()).describe(
                  "Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members.",
                ).optional(),
                logType: z.enum([
                  "LOG_TYPE_UNSPECIFIED",
                  "ADMIN_READ",
                  "DATA_WRITE",
                  "DATA_READ",
                ]).describe("The log type that this config enables.")
                  .optional(),
              })).describe(
                "The configuration for logging of each type of permission.",
              ).optional(),
              service: z.string().describe(
                "Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.",
              ).optional(),
            })).describe(
              "Specifies cloud audit logging configuration for this policy.",
            ).optional(),
            bindings: z.array(z.object({
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
              members: z.array(z.string()).describe(
                "Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com`. * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.",
              ).optional(),
              role: z.string().describe(
                "Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles).",
              ).optional(),
            })).describe(
              "Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.",
            ).optional(),
            etag: z.string().describe(
              "`etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.",
            ).optional(),
            version: z.number().int().describe(
              "Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies).",
            ).optional(),
          }).describe(
            'An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). **JSON example:** ` { "bindings": [ { "role": "roles/resourcemanager.organizationAdmin", "members": [ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" ] }, { "role": "roles/resourcemanager.organizationViewer", "members": [ "user:eve@example.com" ], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp(\'2020-10-01T00:00:00.000Z\')", } } ], "etag": "BwWWja0YfJA=", "version": 3 } ` **YAML example:** ` bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp(\'2020-10-01T00:00:00.000Z\') etag: BwWWja0YfJA= version: 3 ` For a description of IAM and its features, see the [IAM documentation](https://cloud.google.com/iam/docs/).',
          ).optional(),
        }).describe(
          "Represents the action responsible for access control list management operations.",
        ).optional(),
        actionId: z.string().describe("ID of the action. Managed internally.")
          .optional(),
        addToFolder: z.object({
          folders: z.array(z.string()).describe(
            "Names of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
          ).optional(),
        }).describe(
          "Represents the action responsible for adding document under a folder.",
        ).optional(),
        dataUpdate: z.object({
          entries: z.record(z.string(), z.string()).describe(
            'Map of (K, V) -> (valid name of the field, new value of the field) E.g., ("age", "60") entry triggers update of field age with a value of 60. If the field is not present then new entry is added. During update action execution, value strings will be casted to appropriate types.',
          ).optional(),
        }).describe(
          "Represents the action responsible for properties update operations.",
        ).optional(),
        dataValidation: z.object({
          conditions: z.record(z.string(), z.string()).describe(
            'Map of (K, V) -> (field, string condition to be evaluated on the field) E.g., ("age", "age > 18 && age < 60") entry triggers validation of field age with the given condition. Map entries will be ANDed during validation.',
          ).optional(),
        }).describe(
          "Represents the action responsible for data validation operations.",
        ).optional(),
        deleteDocumentAction: z.object({
          enableHardDelete: z.boolean().describe(
            "Boolean field to select between hard vs soft delete options. Set 'true' for 'hard delete' and 'false' for 'soft delete'.",
          ).optional(),
        }).describe(
          "Represents the action responsible for deleting the document.",
        ).optional(),
        publishToPubSub: z.object({
          messages: z.array(z.string()).describe("Messages to be published.")
            .optional(),
          topicId: z.string().describe(
            "The topic id in the Pub/Sub service for which messages will be published to.",
          ).optional(),
        }).describe(
          "Represents the action responsible for publishing messages to a Pub/Sub topic.",
        ).optional(),
        removeFromFolderAction: z.object({
          condition: z.string().describe(
            "Condition of the action to be executed.",
          ).optional(),
          folder: z.string().describe(
            "Name of the folder under which new document is to be added. Format: projects/{project_number}/locations/{location}/documents/{document_id}.",
          ).optional(),
        }).describe(
          "Represents the action responsible for remove a document from a specific folder.",
        ).optional(),
      })).describe(
        "List of actions that are executed when the rule is satisfied.",
      ).optional(),
      condition: z.string().describe(
        'Represents the conditional expression to be evaluated. Expression should evaluate to a boolean result. When the condition is true actions are executed. Example: user_role = "hsbc_role_1" AND doc.salary > 20000',
      ).optional(),
      description: z.string().describe(
        "Short description of the rule and its context.",
      ).optional(),
      ruleId: z.string().describe(
        "ID of the rule. It has to be unique across all the examples. This is managed internally.",
      ).optional(),
      triggerType: z.enum([
        "UNKNOWN",
        "ON_CREATE",
        "ON_UPDATE",
        "ON_CREATE_LINK",
        "ON_DELETE_LINK",
      ]).describe("Identifies the trigger type for running the policy.")
        .optional(),
    })).describe("List of rules given by the customer.").optional(),
    source: z.string().describe("Source of the rules i.e., customer name.")
      .optional(),
  }).describe("Represents a set of rules from a single customer.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/contentwarehouse/rulesets",
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
      description: "Represents a set of rules from a single customer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ruleSets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rules"] !== undefined) body["rules"] = g["rules"];
        if (g["source"] !== undefined) body["source"] = g["source"];
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
      description: "Get a ruleSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the ruleSets"),
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
      description: "Update ruleSets attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["ruleSet"] !== undefined) body["ruleSet"] = g["ruleSet"];
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
      description: "Delete the ruleSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the ruleSets"),
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
      description: "Sync ruleSets state from GCP",
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
  },
};
