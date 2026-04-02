// Auto-generated extension model for @swamp/gcp/integrations/templates
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
  return `${parent}/templates/${shortName}`;
}

const BASE_URL = "https://integrations.googleapis.com/";

const GET_CONFIG = {
  "id": "integrations.projects.locations.templates.get",
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
  "id": "integrations.projects.locations.templates.create",
  "path": "v1/{+parent}/templates",
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
  "id": "integrations.projects.locations.templates.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "integrations.projects.locations.templates.delete",
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
  author: z.string().describe("Optional. Creator of the template.").optional(),
  categories: z.array(
    z.enum([
      "CATEGORY_UNSPECIFIED",
      "AI_MACHINE_LEARNING",
      "BUSINESS_INTELLIGENCE",
      "COLLABORATION",
      "CUSTOMER_SERVICE",
      "DATABASES",
      "DEVOPS_IT",
      "CONTENT_AND_FILES",
      "FINANCE_AND_ACCOUNTING",
      "HUMAN_RESOURCES",
      "OPERATIONS",
      "PRODUCT_PROJECT_MANAGEMENT",
      "PRODUCTIVITY",
      "SALES_AND_MARKETING",
      "UNIVERSAL_CONNECTORS",
      "UTILITY",
      "OTHERS",
    ]),
  ).describe(
    "Required. Categories associated with the Template. The categories listed below will be utilized for the Template listing.",
  ).optional(),
  components: z.array(z.object({
    name: z.string().describe("Optional. Name of the component.").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "TRIGGER", "TASK", "CONNECTOR"]).describe(
      "Optional. Type of the component.",
    ).optional(),
  })).describe(
    "Optional. Components being used in the template. This could be used to categorize and filter.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the template. The length should not be more than 255 characters",
  ).optional(),
  displayName: z.string().describe("Required. The name of the template")
    .optional(),
  docLink: z.string().describe("Optional. Link to template documentation.")
    .optional(),
  lastUsedTime: z.string().describe(
    "Optional. Time the template was last used.",
  ).optional(),
  name: z.string().describe("Identifier. Resource name of the template.")
    .optional(),
  sharedWith: z.array(z.string()).describe(
    "Required. Resource names with which the template is shared for example ProjectNumber/Ord id",
  ).optional(),
  tags: z.array(z.string()).describe(
    "Required. Tags which are used to identify templates. These tags could be for business use case, connectors etc.",
  ).optional(),
  templateBundle: z.object({
    integrationVersionTemplate: z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string().describe(
          "Optional. Cloud KMS resource name for the CMEK encryption key.",
        ).optional(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.enum([
            "CLOUD_LOGGING_SEVERITY_UNSPECIFIED",
            "INFO",
            "ERROR",
            "WARNING",
          ]).describe(
            "Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed.",
          ).optional(),
          enableCloudLogging: z.boolean().describe(
            "Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed.",
          ).optional(),
        }).describe("Cloud Logging details for execution info").optional(),
        createTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        createdFromTemplate: z.string().describe(
          "Optional. Optional. The resource name of the template from which the integration is created.",
        ).optional(),
        databasePersistencePolicy: z.enum([
          "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED",
          "DATABASE_PERSISTENCE_DISABLED",
          "DATABASE_PERSISTENCE_ASYNC",
        ]).describe(
          "Optional. Flag to disable database persistence for execution data, including event execution info, execution export info, execution metadata index and execution param index.",
        ).optional(),
        description: z.string().describe(
          "Optional. The integration description.",
        ).optional(),
        enableVariableMasking: z.boolean().describe(
          "Optional. True if variable masking feature should be turned on for this version",
        ).optional(),
        errorCatcherConfigs: z.array(z.object({
          description: z.string().describe(
            "Optional. User-provided description intended to give more business context about the error catcher config.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow",
          ).optional(),
          errorCatcherNumber: z.string().describe(
            "Required. A number to uniquely identify each error catcher config within the workflow on UI.",
          ).optional(),
          label: z.string().describe(
            "Optional. The user created label for a particular error catcher. Optional.",
          ).optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          startErrorTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Required. The set of start tasks that are to be executed for the error catch flow",
          ).optional(),
        })).describe(
          "Optional. Error Catch Task configuration for the integration. It's optional.",
        ).optional(),
        integrationConfigParameters: z.array(z.object({
          parameter: z.object({
            containsLargeData: z.boolean().describe(
              "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
            ).optional(),
            dataType: z.enum([
              "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
              "STRING_VALUE",
              "INT_VALUE",
              "DOUBLE_VALUE",
              "BOOLEAN_VALUE",
              "STRING_ARRAY",
              "INT_ARRAY",
              "DOUBLE_ARRAY",
              "BOOLEAN_ARRAY",
              "JSON_VALUE",
              "PROTO_VALUE",
              "PROTO_ARRAY",
              "NON_SERIALIZABLE_OBJECT",
              "PROTO_ENUM",
              "SERIALIZED_OBJECT_VALUE",
              "PROTO_ENUM_ARRAY",
              "BYTES",
              "BYTES_ARRAY",
            ]).describe("Type of the parameter.").optional(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()).describe("Boolean array.")
                  .optional(),
              }).describe(
                "This message only contains a field of boolean array.",
              ).optional(),
              booleanValue: z.boolean().describe("Boolean.").optional(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()).describe(
                  "Double number array.",
                ).optional(),
              }).describe(
                "This message only contains a field of double number array.",
              ).optional(),
              doubleValue: z.number().describe("Double Number.").optional(),
              intArray: z.object({
                intValues: z.array(z.string()).describe("Integer array.")
                  .optional(),
              }).describe(
                "This message only contains a field of integer array.",
              ).optional(),
              intValue: z.string().describe("Integer.").optional(),
              jsonValue: z.string().describe("Json.").optional(),
              stringArray: z.object({
                stringValues: z.array(z.string()).describe("String array.")
                  .optional(),
              }).describe("This message only contains a field of string array.")
                .optional(),
              stringValue: z.string().describe("String.").optional(),
            }).describe("The type of the parameter.").optional(),
            description: z.string().describe(
              "Optional. Description of the parameter.",
            ).optional(),
            displayName: z.string().describe(
              'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
            ).optional(),
            inputOutputType: z.enum([
              "IN_OUT_TYPE_UNSPECIFIED",
              "IN",
              "OUT",
              "IN_OUT",
            ]).describe("Specifies the input/output type for the parameter.")
              .optional(),
            isTransient: z.boolean().describe(
              "Whether this parameter is a transient parameter.",
            ).optional(),
            jsonSchema: z.string().describe(
              "This schema will be used to validate runtime JSON-typed values of this parameter.",
            ).optional(),
            key: z.string().describe(
              "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
            ).optional(),
            masked: z.boolean().describe(
              "True if this parameter should be masked in the logs",
            ).optional(),
            producer: z.string().describe(
              "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
            ).optional(),
            searchable: z.boolean().describe(
              "Searchable in the execution log or not.",
            ).optional(),
          }).describe(
            "Integration Parameter is defined in the integration config and are used to provide information about data types of the expected parameters and provide any default values if needed. They can also be used to add custom attributes. These are static in nature and should not be used for dynamic event definition.",
          ).optional(),
          value: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()).describe("Boolean array.")
                .optional(),
            }).describe("This message only contains a field of boolean array.")
              .optional(),
            booleanValue: z.boolean().describe("Boolean.").optional(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()).describe("Double number array.")
                .optional(),
            }).describe(
              "This message only contains a field of double number array.",
            ).optional(),
            doubleValue: z.number().describe("Double Number.").optional(),
            intArray: z.object({
              intValues: z.array(z.string()).describe("Integer array.")
                .optional(),
            }).describe("This message only contains a field of integer array.")
              .optional(),
            intValue: z.string().describe("Integer.").optional(),
            jsonValue: z.string().describe("Json.").optional(),
            stringArray: z.object({
              stringValues: z.array(z.string()).describe("String array.")
                .optional(),
            }).describe("This message only contains a field of string array.")
              .optional(),
            stringValue: z.string().describe("String.").optional(),
          }).describe("The type of the parameter.").optional(),
        })).describe(
          "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
        ).optional(),
        integrationParameters: z.array(z.object({
          containsLargeData: z.boolean().describe(
            "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
          ).optional(),
          dataType: z.enum([
            "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
            "STRING_VALUE",
            "INT_VALUE",
            "DOUBLE_VALUE",
            "BOOLEAN_VALUE",
            "STRING_ARRAY",
            "INT_ARRAY",
            "DOUBLE_ARRAY",
            "BOOLEAN_ARRAY",
            "JSON_VALUE",
            "PROTO_VALUE",
            "PROTO_ARRAY",
            "NON_SERIALIZABLE_OBJECT",
            "PROTO_ENUM",
            "SERIALIZED_OBJECT_VALUE",
            "PROTO_ENUM_ARRAY",
            "BYTES",
            "BYTES_ARRAY",
          ]).describe("Type of the parameter.").optional(),
          defaultValue: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()).describe("Boolean array.")
                .optional(),
            }).describe("This message only contains a field of boolean array.")
              .optional(),
            booleanValue: z.boolean().describe("Boolean.").optional(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()).describe("Double number array.")
                .optional(),
            }).describe(
              "This message only contains a field of double number array.",
            ).optional(),
            doubleValue: z.number().describe("Double Number.").optional(),
            intArray: z.object({
              intValues: z.array(z.string()).describe("Integer array.")
                .optional(),
            }).describe("This message only contains a field of integer array.")
              .optional(),
            intValue: z.string().describe("Integer.").optional(),
            jsonValue: z.string().describe("Json.").optional(),
            stringArray: z.object({
              stringValues: z.array(z.string()).describe("String array.")
                .optional(),
            }).describe("This message only contains a field of string array.")
              .optional(),
            stringValue: z.string().describe("String.").optional(),
          }).describe("The type of the parameter.").optional(),
          description: z.string().describe(
            "Optional. Description of the parameter.",
          ).optional(),
          displayName: z.string().describe(
            'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
          ).optional(),
          inputOutputType: z.enum([
            "IN_OUT_TYPE_UNSPECIFIED",
            "IN",
            "OUT",
            "IN_OUT",
          ]).describe("Specifies the input/output type for the parameter.")
            .optional(),
          isTransient: z.boolean().describe(
            "Whether this parameter is a transient parameter.",
          ).optional(),
          jsonSchema: z.string().describe(
            "This schema will be used to validate runtime JSON-typed values of this parameter.",
          ).optional(),
          key: z.string().describe(
            "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
          ).optional(),
          masked: z.boolean().describe(
            "True if this parameter should be masked in the logs",
          ).optional(),
          producer: z.string().describe(
            "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
          ).optional(),
          searchable: z.boolean().describe(
            "Searchable in the execution log or not.",
          ).optional(),
        })).describe(
          "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        integrationParametersInternal: z.object({
          parameters: z.array(z.object({
            attributes: z.object({
              dataType: z.enum([
                "DATA_TYPE_UNSPECIFIED",
                "EMAIL",
                "URL",
                "CURRENCY",
                "TIMESTAMP",
                "DOMAIN_NAME",
              ]).describe(
                "Things like URL, Email, Currency, Timestamp (rather than string, int64...)",
              ).optional(),
              defaultValue: z.object({
                booleanValue: z.boolean().optional(),
                doubleArray: z.object({
                  values: z.array(z.number()).optional(),
                }).optional(),
                doubleValue: z.number().optional(),
                intArray: z.object({
                  values: z.array(z.string()).optional(),
                }).optional(),
                intValue: z.string().optional(),
                protoValue: z.record(z.string(), z.string()).optional(),
                stringArray: z.object({
                  values: z.array(z.string()).optional(),
                }).optional(),
                stringValue: z.string().optional(),
              }).describe(
                "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
              ).optional(),
              isRequired: z.boolean().describe(
                "Required for event execution. The validation will be done by the event bus when the event is triggered.",
              ).optional(),
              isSearchable: z.boolean().describe(
                "Used to indicate if a ParameterEntry should be converted to ParamIndexes for ST-Spanner full-text search. DEPRECATED: use searchable.",
              ).optional(),
              logSettings: z.object({
                logFieldName: z.string().describe(
                  "The name of corresponding logging field of the event property. If omitted, assumes the same name as the event property key.",
                ).optional(),
                seedPeriod: z.enum([
                  "SEED_PERIOD_UNSPECIFIED",
                  "DAY",
                  "WEEK",
                  "MONTH",
                ]).optional(),
                seedScope: z.enum([
                  "SEED_SCOPE_UNSPECIFIED",
                  "EVENT_NAME",
                  "TIME_PERIOD",
                  "PARAM_NAME",
                ]).optional(),
              }).describe(
                "The LogSettings define the logging attributes for an event property. These attributes are used to map the property to the parameter in the log proto. Also used to define scrubbing/truncation behavior and PII information.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this workflow parameter should be masked in the logs",
              ).optional(),
              readOnly: z.boolean().describe(
                "Used to indicate if the ParameterEntry is a read only field or not.",
              ).optional(),
              searchable: z.enum(["UNSPECIFIED", "YES", "NO"]).optional(),
              taskVisibility: z.array(z.string()).describe(
                "List of tasks that can view this property, if empty then all.",
              ).optional(),
            }).describe(
              "Attributes are additional options that can be associated with each event property. For more information, see",
            ).optional(),
            children: z.array(z.string()).describe(
              "Child parameters nested within this parameter. This field only applies to protobuf parameters",
            ).optional(),
            containsLargeData: z.boolean().describe(
              "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
            ).optional(),
            dataType: z.enum([
              "DATA_TYPE_UNSPECIFIED",
              "STRING_VALUE",
              "INT_VALUE",
              "DOUBLE_VALUE",
              "BOOLEAN_VALUE",
              "PROTO_VALUE",
              "SERIALIZED_OBJECT_VALUE",
              "STRING_ARRAY",
              "INT_ARRAY",
              "DOUBLE_ARRAY",
              "PROTO_ARRAY",
              "PROTO_ENUM",
              "BOOLEAN_ARRAY",
              "PROTO_ENUM_ARRAY",
              "BYTES",
              "BYTES_ARRAY",
              "NON_SERIALIZABLE_OBJECT",
              "JSON_VALUE",
            ]).describe("The data type of the parameter.").optional(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()).optional(),
              }).optional(),
              booleanValue: z.boolean().optional(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()).optional(),
              }).optional(),
              doubleValue: z.number().optional(),
              intArray: z.object({
                intValues: z.array(z.string()).optional(),
              }).optional(),
              intValue: z.string().optional(),
              jsonValue: z.string().optional(),
              protoArray: z.object({
                protoValues: z.array(z.record(z.string(), z.string()))
                  .optional(),
              }).optional(),
              protoValue: z.record(z.string(), z.string()).optional(),
              serializedObjectValue: z.object({
                objectValue: z.string().optional(),
              }).optional(),
              stringArray: z.object({
                stringValues: z.array(z.string()).optional(),
              }).optional(),
              stringValue: z.string().optional(),
            }).describe(
              "To support various types of parameter values. Next available id: 14",
            ).optional(),
            description: z.string().describe(
              "Optional. The description about the parameter",
            ).optional(),
            inOutType: z.enum([
              "IN_OUT_TYPE_UNSPECIFIED",
              "IN",
              "OUT",
              "IN_OUT",
            ]).describe("Specifies the input/output type for the parameter.")
              .optional(),
            isTransient: z.boolean().describe(
              "Whether this parameter is a transient parameter.",
            ).optional(),
            jsonSchema: z.string().describe(
              "This schema will be used to validate runtime JSON-typed values of this parameter.",
            ).optional(),
            key: z.string().describe(
              "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
            ).optional(),
            name: z.string().describe(
              'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
            ).optional(),
            producedBy: z.object({
              elementIdentifier: z.string().describe(
                "Configuration of the edge.",
              ).optional(),
              elementType: z.enum([
                "UNKNOWN_TYPE",
                "TASK_CONFIG",
                "TRIGGER_CONFIG",
              ]).describe(
                "Destination node where the edge ends. It can only be a task config.",
              ).optional(),
            }).describe(
              "Represents a node identifier (type + id). Next highest id: 3",
            ).optional(),
            producer: z.string().optional(),
            protoDefName: z.string().describe(
              "The name of the protobuf type if the parameter has a protobuf data type.",
            ).optional(),
            protoDefPath: z.string().describe(
              'If the data type is of type proto or proto array, this field needs to be populated with the fully qualified proto name. This message, for example, would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry".',
            ).optional(),
            required: z.boolean().optional(),
          })).describe(
            "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
          ).optional(),
        }).describe(
          "LINT.IfChange This is the frontend version of WorkflowParameters. It's exactly like the backend version except that instead of flattening protobuf parameters and treating every field and subfield of a protobuf parameter as a separate parameter, the fields/subfields of a protobuf parameter will be nested as \"children\" (see 'children' field below) parameters of the parent parameter. Please refer to enterprise/crm/eventbus/proto/workflow_parameters.proto for more information about WorkflowParameters.",
        ).optional(),
        lastModifierEmail: z.string().describe(
          "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        lockHolder: z.string().describe(
          "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        name: z.string().describe("Output only. Auto-generated primary key.")
          .optional(),
        origin: z.enum([
          "UNSPECIFIED",
          "UI",
          "PIPER_V2",
          "PIPER_V3",
          "APPLICATION_IP_PROVISIONING",
          "TEST_CASE",
        ]).describe(
          "Optional. The origin that indicates where this integration is coming from.",
        ).optional(),
        parentTemplateId: z.string().describe(
          "Optional. The id of the template which was used to create this integration_version.",
        ).optional(),
        runAsServiceAccount: z.string().describe(
          "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
        ).optional(),
        snapshotNumber: z.string().describe(
          'Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head.',
        ).optional(),
        state: z.enum([
          "INTEGRATION_STATE_UNSPECIFIED",
          "DRAFT",
          "ACTIVE",
          "ARCHIVED",
          "SNAPSHOT",
        ]).describe("Output only. User should not set it as an input.")
          .optional(),
        status: z.enum(["UNKNOWN", "DRAFT", "ACTIVE", "ARCHIVED", "SNAPSHOT"])
          .describe(
            "Output only. Generated by eventbus. User should not set it as an input.",
          ).optional(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              condition: z.string().describe(
                "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
              ).optional(),
              intervalTime: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
              ).optional(),
              maxRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryStrategy: z.enum([
                "RETRY_STRATEGY_UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_INTEGRATION_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            }).describe(
              "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
            ).optional(),
            failurePolicies: z.array(z.object({
              condition: z.string().describe(
                "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
              ).optional(),
              intervalTime: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
              ).optional(),
              maxRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryStrategy: z.enum([
                "RETRY_STRATEGY_UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_INTEGRATION_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            })).describe(
              "The list of failure policies that will be applied to the task in order.",
            ).optional(),
          }).describe("Conditional task failur retry strategies").optional(),
          description: z.string().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          displayName: z.string().describe(
            "Optional. User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.enum([
            "EXTERNAL_TASK_TYPE_UNSPECIFIED",
            "NORMAL_TASK",
            "ERROR_TASK",
          ]).describe("Optional. External task type of the task").optional(),
          failurePolicy: z.object({
            condition: z.string().describe(
              "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
            ).optional(),
            intervalTime: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
            ).optional(),
            maxRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryStrategy: z.enum([
              "RETRY_STRATEGY_UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_INTEGRATION_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          jsonValidationOption: z.enum([
            "JSON_VALIDATION_OPTION_UNSPECIFIED",
            "SKIP",
            "PRE_EXECUTION",
            "POST_EXECUTION",
            "PRE_POST_EXECUTION",
          ]).describe(
            "Optional. If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          nextTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe(
            "Optional. The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.record(
            z.string(),
            z.object({
              key: z.string().describe(
                "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this parameter should be masked in the logs",
              ).optional(),
              value: z.object({
                booleanArray: z.object({
                  booleanValues: z.array(z.boolean()).describe("Boolean array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of boolean array.",
                ).optional(),
                booleanValue: z.boolean().describe("Boolean.").optional(),
                doubleArray: z.object({
                  doubleValues: z.array(z.number()).describe(
                    "Double number array.",
                  ).optional(),
                }).describe(
                  "This message only contains a field of double number array.",
                ).optional(),
                doubleValue: z.number().describe("Double Number.").optional(),
                intArray: z.object({
                  intValues: z.array(z.string()).describe("Integer array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of integer array.",
                ).optional(),
                intValue: z.string().describe("Integer.").optional(),
                jsonValue: z.string().describe("Json.").optional(),
                stringArray: z.object({
                  stringValues: z.array(z.string()).describe("String array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of string array.",
                ).optional(),
                stringValue: z.string().describe("String.").optional(),
              }).describe("The type of the parameter.").optional(),
            }),
          ).describe(
            "Optional. The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          successPolicy: z.object({
            finalState: z.enum([
              "FINAL_STATE_UNSPECIFIED",
              "SUCCEEDED",
              "SUSPENDED",
            ]).describe(
              "State to which the execution snapshot status will be set if the task succeeds.",
            ).optional(),
          }).describe(
            "Policy that dictates the behavior for the task after it completes successfully.",
          ).optional(),
          synchronousCallFailurePolicy: z.object({
            condition: z.string().describe(
              "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
            ).optional(),
            intervalTime: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
            ).optional(),
            maxRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryStrategy: z.enum([
              "RETRY_STRATEGY_UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_INTEGRATION_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          task: z.string().describe("Optional. The name for the task.")
            .optional(),
          taskExecutionStrategy: z.enum([
            "TASK_EXECUTION_STRATEGY_UNSPECIFIED",
            "WHEN_ALL_SUCCEED",
            "WHEN_ANY_SUCCEED",
            "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
          ]).describe(
            "Optional. The policy dictating the execution strategy of this task.",
          ).optional(),
          taskId: z.string().describe(
            "Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`).",
          ).optional(),
          taskTemplate: z.string().describe(
            "Optional. Used to define task-template name if task is of type task-template",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week).",
            ).optional(),
            alertDisabled: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert.",
            ).optional(),
            alertName: z.string().describe(
              "A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique in within the scope of the containing workflow.",
            ).optional(),
            clientId: z.string().describe(
              "Client associated with this alert configuration. Must be a client enabled in one of the containing workflow's triggers.",
            ).optional(),
            durationThresholdMs: z.string().describe(
              "Should be specified only for TASK_AVERAGE_DURATION and TASK_PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).optional(),
            numAggregationPeriods: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            onlyFinalAttempt: z.boolean().describe(
              "Only count final task attempts, not retries.",
            ).optional(),
            playbookUrl: z.string().describe(
              "Link to a playbook for resolving the issue that triggered this alert.",
            ).optional(),
            thresholdType: z.enum([
              "UNSPECIFIED_THRESHOLD_TYPE",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().optional(),
              percentage: z.number().int().optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
          })).describe(
            "Alert configurations on error rate, warning rate, number of runs, durations, etc.",
          ).optional(),
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              intervalInSeconds: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
              ).optional(),
              maxNumRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryCondition: z.string().describe(
                "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
              ).optional(),
              retryStrategy: z.enum([
                "UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_WORKFLOW_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            }).describe(
              "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
            ).optional(),
            failurePolicies: z.array(z.object({
              intervalInSeconds: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
              ).optional(),
              maxNumRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryCondition: z.string().describe(
                "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
              ).optional(),
              retryStrategy: z.enum([
                "UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_WORKFLOW_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            })).describe(
              "The list of failure policies that will be applied to the task in order.",
            ).optional(),
          }).optional(),
          createTime: z.string().describe("Auto-generated.").optional(),
          creatorEmail: z.string().describe(
            "The creator's email address. Auto-generated from the user's email.",
          ).optional(),
          description: z.string().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          disableStrictTypeValidation: z.boolean().describe(
            "If this config contains a TypedTask, allow validation to succeed if an input is read from the output of another TypedTask whose output type is declared as a superclass of the requested input type. For instance, if the previous task declares an output of type Message, any task with this flag enabled will pass validation when attempting to read any proto Message type from the resultant Event parameter.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.enum([
            "EXTERNAL_TASK_TYPE_UNSPECIFIED",
            "NORMAL_TASK",
            "ERROR_TASK",
          ]).optional(),
          failurePolicy: z.object({
            intervalInSeconds: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
            ).optional(),
            maxNumRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryCondition: z.string().describe(
              "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
            ).optional(),
            retryStrategy: z.enum([
              "UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_WORKFLOW_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          incomingEdgeCount: z.number().int().describe(
            "The number of edges leading into this TaskConfig.",
          ).optional(),
          jsonValidationOption: z.enum([
            "UNSPECIFIED_JSON_VALIDATION_OPTION",
            "SKIP",
            "PRE_EXECUTION",
            "POST_EXECUTION",
            "PRE_POST_EXECUTION",
          ]).describe(
            "If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          label: z.string().describe(
            "User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          lastModifiedTime: z.string().describe("Auto-generated.").optional(),
          nextTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string().describe(
                  "Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown.",
                ).optional(),
                operator: z.enum([
                  "UNSET",
                  "EQUALS",
                  "CONTAINS",
                  "LESS_THAN",
                  "GREATER_THAN",
                  "EXISTS",
                  "DOES_NOT_EXIST",
                  "IS_EMPTY",
                  "IS_NOT_EMPTY",
                ]).describe(
                  "Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("A set of individual constituent conditions.")
                .optional(),
            })).describe(
              "Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition`",
            ).optional(),
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give more business context about the next task edge or condition.",
            ).optional(),
            label: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskNumber: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe(
            "The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.record(
            z.string(),
            z.object({
              dataType: z.enum([
                "DATA_TYPE_UNSPECIFIED",
                "STRING_VALUE",
                "INT_VALUE",
                "DOUBLE_VALUE",
                "BOOLEAN_VALUE",
                "PROTO_VALUE",
                "SERIALIZED_OBJECT_VALUE",
                "STRING_ARRAY",
                "INT_ARRAY",
                "DOUBLE_ARRAY",
                "PROTO_ARRAY",
                "PROTO_ENUM",
                "BOOLEAN_ARRAY",
                "PROTO_ENUM_ARRAY",
                "BYTES",
                "BYTES_ARRAY",
                "NON_SERIALIZABLE_OBJECT",
                "JSON_VALUE",
              ]).describe("Explicitly getting the type of the parameter.")
                .optional(),
              key: z.string().describe(
                "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this parameter should be masked in the logs",
              ).optional(),
              value: z.object({
                booleanArray: z.object({
                  booleanValues: z.array(z.boolean()).optional(),
                }).optional(),
                booleanValue: z.boolean().optional(),
                doubleArray: z.object({
                  doubleValues: z.array(z.number()).optional(),
                }).optional(),
                doubleValue: z.number().optional(),
                intArray: z.object({
                  intValues: z.array(z.string()).optional(),
                }).optional(),
                intValue: z.string().optional(),
                jsonValue: z.string().optional(),
                protoArray: z.object({
                  protoValues: z.array(z.record(z.string(), z.string()))
                    .optional(),
                }).optional(),
                protoValue: z.record(z.string(), z.string()).optional(),
                serializedObjectValue: z.object({
                  objectValue: z.string().optional(),
                }).optional(),
                stringArray: z.object({
                  stringValues: z.array(z.string()).optional(),
                }).optional(),
                stringValue: z.string().optional(),
              }).describe(
                "To support various types of parameter values. Next available id: 14",
              ).optional(),
            }),
          ).describe(
            "The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.object({
            x: z.number().int().optional(),
            y: z.number().int().optional(),
          }).describe("Represents two-dimensional positions.").optional(),
          precondition: z.string().describe(
            'Optional. Standard filter expression evaluated before execution. Independent of other conditions and tasks. Can be used to enable rollout. e.g. "rollout(5)" will only allow 5% of incoming traffic to task.',
          ).optional(),
          preconditionLabel: z.string().describe(
            "Optional. User-provided label that is attached to precondition in the UI.",
          ).optional(),
          rollbackStrategy: z.object({
            parameters: z.object({
              parameters: z.array(z.object({
                dataType: z.enum([
                  "DATA_TYPE_UNSPECIFIED",
                  "STRING_VALUE",
                  "INT_VALUE",
                  "DOUBLE_VALUE",
                  "BOOLEAN_VALUE",
                  "PROTO_VALUE",
                  "SERIALIZED_OBJECT_VALUE",
                  "STRING_ARRAY",
                  "INT_ARRAY",
                  "DOUBLE_ARRAY",
                  "PROTO_ARRAY",
                  "PROTO_ENUM",
                  "BOOLEAN_ARRAY",
                  "PROTO_ENUM_ARRAY",
                  "BYTES",
                  "BYTES_ARRAY",
                  "NON_SERIALIZABLE_OBJECT",
                  "JSON_VALUE",
                ]).describe("Explicitly getting the type of the parameter.")
                  .optional(),
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  jsonValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same workflow execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            rollbackTaskImplementationClassName: z.string().describe(
              "Required. This is the name of the task that needs to be executed upon rollback of this task.",
            ).optional(),
            taskNumbersToRollback: z.array(z.string()).describe(
              "Required. These are the tasks numbers of the tasks whose `rollback_strategy.rollback_task_implementation_class_name` needs to be executed upon failure of this task.",
            ).optional(),
          }).describe("Next available id: 4").optional(),
          successPolicy: z.object({
            finalState: z.enum(["UNSPECIFIED", "SUCCEEDED", "SUSPENDED"])
              .describe(
                "State to which the execution snapshot status will be set if the task succeeds.",
              ).optional(),
          }).describe(
            "Policy that dictates the behavior for the task after it completes successfully.",
          ).optional(),
          synchronousCallFailurePolicy: z.object({
            intervalInSeconds: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
            ).optional(),
            maxNumRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryCondition: z.string().describe(
              "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
            ).optional(),
            retryStrategy: z.enum([
              "UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_WORKFLOW_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          taskEntity: z.object({
            disabledForVpcSc: z.boolean().describe(
              "True if the task has conflict with vpcsc",
            ).optional(),
            metadata: z.object({
              activeTaskName: z.string().describe(
                "The new task name to replace the current task if it is deprecated. Otherwise, it is the same as the current task name.",
              ).optional(),
              admins: z.array(z.object({
                googleGroupEmail: z.string().optional(),
                userEmail: z.string().optional(),
              })).optional(),
              category: z.enum([
                "UNSPECIFIED_CATEGORY",
                "CUSTOM",
                "FLOW_CONTROL",
                "DATA_MANIPULATION",
                "SCRIPTING",
                "CONNECTOR",
                "HIDDEN",
                "CLOUD_SYSTEMS",
                "CUSTOM_TASK_TEMPLATE",
                "TASK_RECOMMENDATIONS",
              ]).optional(),
              codeSearchLink: z.string().describe(
                "The Code Search link to the Task Java file.",
              ).optional(),
              defaultJsonValidationOption: z.enum([
                "UNSPECIFIED_JSON_VALIDATION_OPTION",
                "SKIP",
                "PRE_EXECUTION",
                "POST_EXECUTION",
                "PRE_POST_EXECUTION",
              ]).describe(
                "Controls whether JSON workflow parameters are validated against provided schemas before and/or after this task's execution.",
              ).optional(),
              defaultSpec: z.string().describe(
                "Contains the initial configuration of the task with default values set. For now, The string should be compatible to an ASCII-proto format.",
              ).optional(),
              description: z.string().describe(
                "In a few sentences, describe the purpose and usage of the task.",
              ).optional(),
              descriptiveName: z.string().describe(
                'The string name to show on the task list on the Workflow editor screen. This should be a very short, one to two words name for the task. (e.g. "Send Mail")',
              ).optional(),
              docMarkdown: z.string().describe(
                "Snippet of markdown documentation to embed in the RHP for this task.",
              ).optional(),
              externalCategory: z.enum([
                "UNSPECIFIED_EXTERNAL_CATEGORY",
                "CORE",
                "CONNECTORS",
                "EXTERNAL_HTTP",
                "EXTERNAL_INTEGRATION_SERVICES",
                "EXTERNAL_CUSTOMER_ACTIONS",
                "EXTERNAL_FLOW_CONTROL",
                "EXTERNAL_WORKSPACE",
                "EXTERNAL_SECURITY",
                "EXTERNAL_DATABASES",
                "EXTERNAL_ANALYTICS",
                "EXTERNAL_BYOC",
                "EXTERNAL_BYOT",
                "EXTERNAL_ARTIFICIAL_INTELIGENCE",
                "EXTERNAL_DATA_MANIPULATION",
              ]).optional(),
              externalCategorySequence: z.number().int().describe(
                "Sequence with which the task in specific category to be displayed in task discovery panel for external users.",
              ).optional(),
              externalDocHtml: z.string().describe(
                "External-facing documention embedded in the RHP for this task.",
              ).optional(),
              externalDocLink: z.string().describe(
                "Doc link for external-facing documentation (separate from g3doc).",
              ).optional(),
              externalDocMarkdown: z.string().describe(
                "DEPRECATED: Use external_doc_html.",
              ).optional(),
              g3DocLink: z.string().describe(
                "URL to the associated G3 Doc for the task if available",
              ).optional(),
              iconLink: z.string().describe(
                "URL to gstatic image icon for this task. This icon shows up on the task list panel along with the task name in the Workflow Editor screen. Use the 24p, 2x, gray color icon image format.",
              ).optional(),
              isDeprecated: z.boolean().describe(
                "The deprecation status of the current task. Default value is false;",
              ).optional(),
              name: z.string().describe(
                "The actual class name or the annotated name of the task. Task Author should initialize this field with value from the getName() method of the Task class.",
              ).optional(),
              standaloneExternalDocHtml: z.string().describe(
                "External-facing documention for standalone IP in pantheon embedded in the RHP for this task. Non null only if different from external_doc_html",
              ).optional(),
              status: z.enum([
                "UNSPECIFIED_STATUS",
                "DEFAULT_INACTIVE",
                "ACTIVE",
              ]).describe(
                "Allows author to indicate if the task is ready to use or not. If not set, then it will default to INACTIVE.",
              ).optional(),
              system: z.enum([
                "UNSPECIFIED_SYSTEM",
                "GENERIC",
                "BUGANIZER",
                "SALESFORCE",
                "CLOUD_SQL",
                "PLX",
                "SHEETS",
                "GOOGLE_GROUPS",
                "EMAIL",
                "SPANNER",
                "DATA_BRIDGE",
              ]).optional(),
              tags: z.array(z.string()).describe(
                'A set of tags that pertain to a particular task. This can be used to improve the searchability of tasks with several names ("REST Caller" vs. "Call REST Endpoint") or to help users find tasks based on related words.',
              ).optional(),
            }).describe(
              "TaskMetadata are attributes that are associated to every common Task we have.",
            ).optional(),
            paramSpecs: z.object({
              parameters: z.array(z.object({
                className: z.string().describe(
                  'The FQCN of the Java object this represents. A string, for example, would be "java.lang.String". If this is "java.lang.Object", the parameter can be of any type.',
                ).optional(),
                collectionElementClassName: z.string().describe(
                  'If it is a collection of objects, this would be the FCQN of every individual element in the collection. If this is "java.lang.Object", the parameter is a collection of any type.',
                ).optional(),
                config: z.object({
                  descriptivePhrase: z.string().describe(
                    "A short phrase to describe what this parameter contains.",
                  ).optional(),
                  helpText: z.string().describe(
                    "Detailed help text for this parameter containing information not provided elsewhere. For example, instructions on how to migrate from a deprecated parameter.",
                  ).optional(),
                  hideDefaultValue: z.boolean().describe(
                    "Whether the default value is hidden in the UI.",
                  ).optional(),
                  inputDisplayOption: z.enum([
                    "DEFAULT",
                    "STRING_MULTI_LINE",
                    "NUMBER_SLIDER",
                    "BOOLEAN_TOGGLE",
                  ]).optional(),
                  isHidden: z.boolean().describe(
                    "Whether this field is hidden in the UI.",
                  ).optional(),
                  label: z.string().describe(
                    "A user-friendly label for the parameter.",
                  ).optional(),
                  parameterNameOption: z.enum([
                    "DEFAULT_NOT_PARAMETER_NAME",
                    "IS_PARAMETER_NAME",
                    "KEY_IS_PARAMETER_NAME",
                    "VALUE_IS_PARAMETER_NAME",
                  ]).optional(),
                  subSectionLabel: z.string().describe(
                    "A user-friendly label for subSection under which the parameter will be displayed.",
                  ).optional(),
                  uiPlaceholderText: z.string().describe(
                    "Placeholder text which will appear in the UI input form for this parameter.",
                  ).optional(),
                }).optional(),
                dataType: z.enum([
                  "DATA_TYPE_UNSPECIFIED",
                  "STRING_VALUE",
                  "INT_VALUE",
                  "DOUBLE_VALUE",
                  "BOOLEAN_VALUE",
                  "PROTO_VALUE",
                  "SERIALIZED_OBJECT_VALUE",
                  "STRING_ARRAY",
                  "INT_ARRAY",
                  "DOUBLE_ARRAY",
                  "PROTO_ARRAY",
                  "PROTO_ENUM",
                  "BOOLEAN_ARRAY",
                  "PROTO_ENUM_ARRAY",
                  "BYTES",
                  "BYTES_ARRAY",
                  "NON_SERIALIZABLE_OBJECT",
                  "JSON_VALUE",
                ]).describe("The data type of the parameter.").optional(),
                defaultValue: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  jsonValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "To support various types of parameter values. Next available id: 14",
                ).optional(),
                isDeprecated: z.boolean().describe(
                  "If set, this entry is deprecated, so further use of this parameter should be prohibited.",
                ).optional(),
                isOutput: z.boolean().optional(),
                jsonSchema: z.string().describe(
                  "If the data_type is JSON_VALUE, then this will define its schema.",
                ).optional(),
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given task. These parameters must be predefined in the workflow definition.",
                ).optional(),
                protoDef: z.object({
                  fullName: z.string().describe(
                    'The fully-qualified proto name. This message, for example, would be "enterprise.crm.eventbus.proto.ParamSpecEntry.ProtoDefinition".',
                  ).optional(),
                  path: z.string().describe(
                    "Path to the proto file that contains the message type's definition.",
                  ).optional(),
                }).optional(),
                required: z.boolean().describe(
                  "If set, the user must provide an input value for this parameter.",
                ).optional(),
                validationRule: z.object({
                  doubleRange: z.object({
                    max: z.number().describe(
                      "The inclusive maximum of the acceptable range.",
                    ).optional(),
                    min: z.number().describe(
                      "The inclusive minimum of the acceptable range.",
                    ).optional(),
                  }).describe("Range used to validate doubles and floats.")
                    .optional(),
                  intRange: z.object({
                    max: z.string().describe(
                      "The inclusive maximum of the acceptable range.",
                    ).optional(),
                    min: z.string().describe(
                      "The inclusive minimum of the acceptable range.",
                    ).optional(),
                  }).describe("Range used to validate longs and ints.")
                    .optional(),
                  stringRegex: z.object({
                    exclusive: z.boolean().describe(
                      "Whether the regex matcher is applied exclusively (if true, matching values will be rejected).",
                    ).optional(),
                    regex: z.string().describe(
                      "The regex applied to the input value(s).",
                    ).optional(),
                  }).describe("Rule used to validate strings.").optional(),
                }).optional(),
              })).optional(),
            }).optional(),
            stats: z.object({
              dimensions: z.object({
                clientId: z.string().optional(),
                enumFilterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"])
                  .describe(
                    "Whether to include or exclude the enums matching the regex.",
                  ).optional(),
                errorEnumString: z.string().optional(),
                retryAttempt: z.enum([
                  "UNSPECIFIED",
                  "FINAL",
                  "RETRYABLE",
                  "CANCELED",
                ]).optional(),
                taskName: z.string().optional(),
                taskNumber: z.string().optional(),
                triggerId: z.string().describe(
                  "Stats have been or will be aggregated on set fields for any semantically-meaningful combination.",
                ).optional(),
                warningEnumString: z.string().optional(),
                workflowId: z.string().optional(),
                workflowName: z.string().optional(),
              }).optional(),
              durationInSeconds: z.number().describe(
                "Average duration in seconds.",
              ).optional(),
              errorRate: z.number().describe("Average error rate.").optional(),
              qps: z.number().describe("Queries per second.").optional(),
              warningRate: z.number().describe("Average warning rate.")
                .optional(),
            }).describe(
              "Stats for the requested dimensions: QPS, duration, and error/warning rate",
            ).optional(),
            taskType: z.enum(["TASK", "ASIS_TEMPLATE", "IO_TEMPLATE"]).describe(
              "Defines the type of the task",
            ).optional(),
            uiConfig: z.object({
              taskUiModuleConfigs: z.array(z.object({
                moduleId: z.enum([
                  "UNSPECIFIED_TASK_MODULE",
                  "LABEL",
                  "ERROR_HANDLING",
                  "TASK_PARAM_TABLE",
                  "TASK_PARAM_FORM",
                  "PRECONDITION",
                  "SCRIPT_EDITOR",
                  "RPC",
                  "TASK_SUMMARY",
                  "SUSPENSION",
                  "RPC_TYPED",
                  "SUB_WORKFLOW",
                  "APPS_SCRIPT_NAVIGATOR",
                  "SUB_WORKFLOW_FOR_EACH_LOOP",
                  "FIELD_MAPPING",
                  "README",
                  "REST_CALLER",
                  "SUB_WORKFLOW_SCATTER_GATHER",
                  "CLOUD_SQL",
                  "GENERIC_CONNECTOR_TASK",
                ]).describe("ID of the config module.").optional(),
              })).describe("Configurations of included config modules.")
                .optional(),
            }).describe(
              "Task authors would use this type to configure the UI for a particular task by specifying what UI config modules should be included to compose the UI. Learn more about config module framework:",
            ).optional(),
          }).describe(
            "Contains a task's metadata and associated information. Next available id: 7",
          ).optional(),
          taskExecutionStrategy: z.enum([
            "WHEN_ALL_SUCCEED",
            "WHEN_ANY_SUCCEED",
            "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
          ]).describe(
            "The policy dictating the execution strategy of this task.",
          ).optional(),
          taskName: z.string().describe("The name for the task.").optional(),
          taskNumber: z.string().describe(
            "REQUIRED: the identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_number`).",
          ).optional(),
          taskSpec: z.string().describe(
            'A string template that allows user to configure task parameters (with either literal default values or tokens which will be resolved at execution time) for the task. It will eventually replace the old "parameters" field.',
          ).optional(),
          taskTemplateName: z.string().describe(
            "Used to define task-template name if task is of type task-template",
          ).optional(),
          taskType: z.enum(["TASK", "ASIS_TEMPLATE", "IO_TEMPLATE"]).describe(
            "Defines the type of the task",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.object({
            creatorEmail: z.string().describe("The creator's email address.")
              .optional(),
            name: z.string().describe(
              "Required. Unique identifier of the teardown task within this Config. We use this field as the identifier to find next teardown tasks.",
            ).optional(),
            nextTeardownTask: z.object({
              name: z.string().describe(
                "Required. Name of the next teardown task.",
              ).optional(),
            }).describe(
              "The teardown task that is next in line to be executed. We support only sequential execution of teardown tasks (i.e. no branching).",
            ).optional(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "LINT.IfChange To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            properties: z.object({
              properties: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding property value. This should be unique for a given fired event. The Tasks should be aware of the keys used while firing the events for them to be able to retrieve the values.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("An unordered list of property entries.").optional(),
            }).describe(
              "LINT.IfChange This message is used for storing key value pair properties for each Event / Task in the EventBus.",
            ).optional(),
            teardownTaskImplementationClassName: z.string().describe(
              "Required. Implementation class name.",
            ).optional(),
          })).describe("Required.").optional(),
        }).optional(),
        triggerConfigs: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
            ).optional(),
            alertThreshold: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            disableAlert: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this integration alert.",
            ).optional(),
            displayName: z.string().describe(
              "Name of the alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the integration.",
            ).optional(),
            durationThreshold: z.string().describe(
              "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "EVENT_ERROR_RATE",
              "EVENT_WARNING_RATE",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "EVENT_RATE",
              "EVENT_AVERAGE_DURATION",
              "EVENT_PERCENTILE_DURATION",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).describe("The type of metric.").optional(),
            onlyFinalAttempt: z.boolean().describe(
              "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
            ).optional(),
            thresholdType: z.enum([
              "THRESHOLD_TYPE_UNSPECIFIED",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().describe("Absolute value threshold.")
                .optional(),
              percentage: z.number().int().describe("Percentage threshold.")
                .optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
          })).describe(
            "Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published.",
          ).optional(),
          cloudSchedulerConfig: z.object({
            cronTab: z.string().describe(
              "Required. The cron tab of cloud scheduler trigger.",
            ).optional(),
            errorMessage: z.string().describe(
              "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
            ).optional(),
            location: z.string().describe(
              "Required. The location where associated cloud scheduler job will be created",
            ).optional(),
            serviceAccountEmail: z.string().describe(
              "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
            ).optional(),
          }).describe("Cloud Scheduler Trigger configuration").optional(),
          description: z.string().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          label: z.string().describe(
            "Optional. The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe("Optional. Dictates how next tasks will be executed.")
            .optional(),
          outputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          properties: z.record(z.string(), z.string()).describe(
            'Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers.',
          ).optional(),
          startTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph).",
          ).optional(),
          trigger: z.string().describe(
            'Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose.',
          ).optional(),
          triggerId: z.string().describe(
            'Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME}',
          ).optional(),
          triggerNumber: z.string().describe(
            "Required. A number to uniquely identify each trigger config within the integration on UI.",
          ).optional(),
          triggerType: z.enum([
            "TRIGGER_TYPE_UNSPECIFIED",
            "CRON",
            "API",
            "SFDC_CHANNEL",
            "CLOUD_PUBSUB_EXTERNAL",
            "SFDC_CDC_CHANNEL",
            "CLOUD_SCHEDULER",
            "INTEGRATION_CONNECTOR_TRIGGER",
            "PRIVATE_TRIGGER",
            "CLOUD_PUBSUB",
            "EVENTARC_TRIGGER",
          ]).describe("Optional. Type of trigger").optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
            ).optional(),
            alertDisabled: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert.",
            ).optional(),
            alertName: z.string().describe(
              "A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the workflow.",
            ).optional(),
            clientId: z.string().describe(
              "Client associated with this alert configuration.",
            ).optional(),
            durationThresholdMs: z.string().describe(
              "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "EVENT_ERROR_RATE",
              "EVENT_WARNING_RATE",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "EVENT_RATE",
              "EVENT_AVERAGE_DURATION",
              "EVENT_PERCENTILE_DURATION",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).optional(),
            numAggregationPeriods: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            onlyFinalAttempt: z.boolean().describe(
              "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
            ).optional(),
            playbookUrl: z.string().describe(
              "Link to a playbook for resolving the issue that triggered this alert.",
            ).optional(),
            thresholdType: z.enum([
              "UNSPECIFIED_THRESHOLD_TYPE",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().optional(),
              percentage: z.number().int().optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
          })).describe(
            "An alert threshold configuration for the [trigger + client + workflow] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + workflow] when published.",
          ).optional(),
          cloudSchedulerConfig: z.object({
            cronTab: z.string().describe(
              "Required. The cron tab of cloud scheduler trigger.",
            ).optional(),
            errorMessage: z.string().describe(
              "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
            ).optional(),
            location: z.string().describe(
              "Required. The location where associated cloud scheduler job will be created",
            ).optional(),
            serviceAccountEmail: z.string().describe(
              "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
            ).optional(),
          }).describe("Cloud Scheduler Trigger configuration").optional(),
          description: z.string().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          enabledClients: z.array(z.string()).describe(
            "Required. The list of client ids which are enabled to execute the workflow using this trigger. In other words, these clients have the workflow execution privledges for this trigger. For API trigger, the client id in the incoming request is validated against the list of enabled clients. For non-API triggers, one workflow execution is triggered on behalf of each enabled client.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          label: z.string().describe(
            "The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe("Dictates how next tasks will be executed.").optional(),
          outputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          pauseWorkflowExecutions: z.boolean().describe(
            "Optional. If set to true, any upcoming requests for this trigger config will be paused and the executions will be resumed later when the flag is reset. The workflow to which this trigger config belongs has to be in ACTIVE status for the executions to be paused or resumed.",
          ).optional(),
          position: z.object({
            x: z.number().int().optional(),
            y: z.number().int().optional(),
          }).describe("Represents two-dimensional positions.").optional(),
          properties: z.record(z.string(), z.string()).describe(
            'Configurable properties of the trigger, not to be confused with workflow parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Cloud Pubsub triggers.',
          ).optional(),
          startTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string().describe(
                  "Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown.",
                ).optional(),
                operator: z.enum([
                  "UNSET",
                  "EQUALS",
                  "CONTAINS",
                  "LESS_THAN",
                  "GREATER_THAN",
                  "EXISTS",
                  "DOES_NOT_EXIST",
                  "IS_EMPTY",
                  "IS_NOT_EMPTY",
                ]).describe(
                  "Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("A set of individual constituent conditions.")
                .optional(),
            })).describe(
              "Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition`",
            ).optional(),
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give more business context about the next task edge or condition.",
            ).optional(),
            label: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskNumber: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Set of tasks numbers from where the workflow execution is started by this trigger. If this is empty, then workflow is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same workflow execution graph).",
          ).optional(),
          triggerCriteria: z.object({
            condition: z.string().describe(
              "Required. Standard filter expression, when true the workflow will be executed. If there's no trigger_criteria_task_implementation_class_name specified, the condition will be validated directly.",
            ).optional(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "LINT.IfChange To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            triggerCriteriaTaskImplementationClassName: z.string().describe(
              "Optional. Implementation class name. The class should implement the “TypedTask” interface.",
            ).optional(),
          }).optional(),
          triggerId: z.string().describe("The backend trigger ID.").optional(),
          triggerName: z.string().describe(
            "Optional. Name of the trigger This is added to identify the type of trigger. This is avoid the logic on triggerId to identify the trigger_type and push the same to monitoring.",
          ).optional(),
          triggerNumber: z.string().describe(
            "Required. A number to uniquely identify each trigger config within the workflow on UI.",
          ).optional(),
          triggerType: z.enum([
            "UNKNOWN",
            "CLOUD_PUBSUB",
            "GOOPS",
            "SFDC_SYNC",
            "CRON",
            "API",
            "MANIFOLD_TRIGGER",
            "DATALAYER_DATA_CHANGE",
            "SFDC_CHANNEL",
            "CLOUD_PUBSUB_EXTERNAL",
            "SFDC_CDC_CHANNEL",
            "SFDC_PLATFORM_EVENTS_CHANNEL",
            "CLOUD_SCHEDULER",
            "INTEGRATION_CONNECTOR_TRIGGER",
            "PRIVATE_TRIGGER",
            "EVENTARC_TRIGGER",
          ]).optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        updateTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        userLabel: z.string().describe(
          "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
        ).optional(),
      }).describe("The integration version definition.").optional(),
      key: z.string().describe(
        "Required. Unique Key of the IntegrationVersion.",
      ).optional(),
    }).describe("Define the template of IntegrationVersion.").optional(),
    subIntegrationVersionTemplates: z.array(z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string().describe(
          "Optional. Cloud KMS resource name for the CMEK encryption key.",
        ).optional(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.enum([
            "CLOUD_LOGGING_SEVERITY_UNSPECIFIED",
            "INFO",
            "ERROR",
            "WARNING",
          ]).describe(
            "Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed.",
          ).optional(),
          enableCloudLogging: z.boolean().describe(
            "Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed.",
          ).optional(),
        }).describe("Cloud Logging details for execution info").optional(),
        createTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        createdFromTemplate: z.string().describe(
          "Optional. Optional. The resource name of the template from which the integration is created.",
        ).optional(),
        databasePersistencePolicy: z.enum([
          "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED",
          "DATABASE_PERSISTENCE_DISABLED",
          "DATABASE_PERSISTENCE_ASYNC",
        ]).describe(
          "Optional. Flag to disable database persistence for execution data, including event execution info, execution export info, execution metadata index and execution param index.",
        ).optional(),
        description: z.string().describe(
          "Optional. The integration description.",
        ).optional(),
        enableVariableMasking: z.boolean().describe(
          "Optional. True if variable masking feature should be turned on for this version",
        ).optional(),
        errorCatcherConfigs: z.array(z.object({
          description: z.string().describe(
            "Optional. User-provided description intended to give more business context about the error catcher config.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow",
          ).optional(),
          errorCatcherNumber: z.string().describe(
            "Required. A number to uniquely identify each error catcher config within the workflow on UI.",
          ).optional(),
          label: z.string().describe(
            "Optional. The user created label for a particular error catcher. Optional.",
          ).optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          startErrorTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Required. The set of start tasks that are to be executed for the error catch flow",
          ).optional(),
        })).describe(
          "Optional. Error Catch Task configuration for the integration. It's optional.",
        ).optional(),
        integrationConfigParameters: z.array(z.object({
          parameter: z.object({
            containsLargeData: z.boolean().describe(
              "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
            ).optional(),
            dataType: z.enum([
              "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
              "STRING_VALUE",
              "INT_VALUE",
              "DOUBLE_VALUE",
              "BOOLEAN_VALUE",
              "STRING_ARRAY",
              "INT_ARRAY",
              "DOUBLE_ARRAY",
              "BOOLEAN_ARRAY",
              "JSON_VALUE",
              "PROTO_VALUE",
              "PROTO_ARRAY",
              "NON_SERIALIZABLE_OBJECT",
              "PROTO_ENUM",
              "SERIALIZED_OBJECT_VALUE",
              "PROTO_ENUM_ARRAY",
              "BYTES",
              "BYTES_ARRAY",
            ]).describe("Type of the parameter.").optional(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()).describe("Boolean array.")
                  .optional(),
              }).describe(
                "This message only contains a field of boolean array.",
              ).optional(),
              booleanValue: z.boolean().describe("Boolean.").optional(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()).describe(
                  "Double number array.",
                ).optional(),
              }).describe(
                "This message only contains a field of double number array.",
              ).optional(),
              doubleValue: z.number().describe("Double Number.").optional(),
              intArray: z.object({
                intValues: z.array(z.string()).describe("Integer array.")
                  .optional(),
              }).describe(
                "This message only contains a field of integer array.",
              ).optional(),
              intValue: z.string().describe("Integer.").optional(),
              jsonValue: z.string().describe("Json.").optional(),
              stringArray: z.object({
                stringValues: z.array(z.string()).describe("String array.")
                  .optional(),
              }).describe("This message only contains a field of string array.")
                .optional(),
              stringValue: z.string().describe("String.").optional(),
            }).describe("The type of the parameter.").optional(),
            description: z.string().describe(
              "Optional. Description of the parameter.",
            ).optional(),
            displayName: z.string().describe(
              'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
            ).optional(),
            inputOutputType: z.enum([
              "IN_OUT_TYPE_UNSPECIFIED",
              "IN",
              "OUT",
              "IN_OUT",
            ]).describe("Specifies the input/output type for the parameter.")
              .optional(),
            isTransient: z.boolean().describe(
              "Whether this parameter is a transient parameter.",
            ).optional(),
            jsonSchema: z.string().describe(
              "This schema will be used to validate runtime JSON-typed values of this parameter.",
            ).optional(),
            key: z.string().describe(
              "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
            ).optional(),
            masked: z.boolean().describe(
              "True if this parameter should be masked in the logs",
            ).optional(),
            producer: z.string().describe(
              "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
            ).optional(),
            searchable: z.boolean().describe(
              "Searchable in the execution log or not.",
            ).optional(),
          }).describe(
            "Integration Parameter is defined in the integration config and are used to provide information about data types of the expected parameters and provide any default values if needed. They can also be used to add custom attributes. These are static in nature and should not be used for dynamic event definition.",
          ).optional(),
          value: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()).describe("Boolean array.")
                .optional(),
            }).describe("This message only contains a field of boolean array.")
              .optional(),
            booleanValue: z.boolean().describe("Boolean.").optional(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()).describe("Double number array.")
                .optional(),
            }).describe(
              "This message only contains a field of double number array.",
            ).optional(),
            doubleValue: z.number().describe("Double Number.").optional(),
            intArray: z.object({
              intValues: z.array(z.string()).describe("Integer array.")
                .optional(),
            }).describe("This message only contains a field of integer array.")
              .optional(),
            intValue: z.string().describe("Integer.").optional(),
            jsonValue: z.string().describe("Json.").optional(),
            stringArray: z.object({
              stringValues: z.array(z.string()).describe("String array.")
                .optional(),
            }).describe("This message only contains a field of string array.")
              .optional(),
            stringValue: z.string().describe("String.").optional(),
          }).describe("The type of the parameter.").optional(),
        })).describe(
          "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
        ).optional(),
        integrationParameters: z.array(z.object({
          containsLargeData: z.boolean().describe(
            "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
          ).optional(),
          dataType: z.enum([
            "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
            "STRING_VALUE",
            "INT_VALUE",
            "DOUBLE_VALUE",
            "BOOLEAN_VALUE",
            "STRING_ARRAY",
            "INT_ARRAY",
            "DOUBLE_ARRAY",
            "BOOLEAN_ARRAY",
            "JSON_VALUE",
            "PROTO_VALUE",
            "PROTO_ARRAY",
            "NON_SERIALIZABLE_OBJECT",
            "PROTO_ENUM",
            "SERIALIZED_OBJECT_VALUE",
            "PROTO_ENUM_ARRAY",
            "BYTES",
            "BYTES_ARRAY",
          ]).describe("Type of the parameter.").optional(),
          defaultValue: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()).describe("Boolean array.")
                .optional(),
            }).describe("This message only contains a field of boolean array.")
              .optional(),
            booleanValue: z.boolean().describe("Boolean.").optional(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()).describe("Double number array.")
                .optional(),
            }).describe(
              "This message only contains a field of double number array.",
            ).optional(),
            doubleValue: z.number().describe("Double Number.").optional(),
            intArray: z.object({
              intValues: z.array(z.string()).describe("Integer array.")
                .optional(),
            }).describe("This message only contains a field of integer array.")
              .optional(),
            intValue: z.string().describe("Integer.").optional(),
            jsonValue: z.string().describe("Json.").optional(),
            stringArray: z.object({
              stringValues: z.array(z.string()).describe("String array.")
                .optional(),
            }).describe("This message only contains a field of string array.")
              .optional(),
            stringValue: z.string().describe("String.").optional(),
          }).describe("The type of the parameter.").optional(),
          description: z.string().describe(
            "Optional. Description of the parameter.",
          ).optional(),
          displayName: z.string().describe(
            'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
          ).optional(),
          inputOutputType: z.enum([
            "IN_OUT_TYPE_UNSPECIFIED",
            "IN",
            "OUT",
            "IN_OUT",
          ]).describe("Specifies the input/output type for the parameter.")
            .optional(),
          isTransient: z.boolean().describe(
            "Whether this parameter is a transient parameter.",
          ).optional(),
          jsonSchema: z.string().describe(
            "This schema will be used to validate runtime JSON-typed values of this parameter.",
          ).optional(),
          key: z.string().describe(
            "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
          ).optional(),
          masked: z.boolean().describe(
            "True if this parameter should be masked in the logs",
          ).optional(),
          producer: z.string().describe(
            "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
          ).optional(),
          searchable: z.boolean().describe(
            "Searchable in the execution log or not.",
          ).optional(),
        })).describe(
          "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        integrationParametersInternal: z.object({
          parameters: z.array(z.object({
            attributes: z.object({
              dataType: z.enum([
                "DATA_TYPE_UNSPECIFIED",
                "EMAIL",
                "URL",
                "CURRENCY",
                "TIMESTAMP",
                "DOMAIN_NAME",
              ]).describe(
                "Things like URL, Email, Currency, Timestamp (rather than string, int64...)",
              ).optional(),
              defaultValue: z.object({
                booleanValue: z.boolean().optional(),
                doubleArray: z.object({
                  values: z.array(z.number()).optional(),
                }).optional(),
                doubleValue: z.number().optional(),
                intArray: z.object({
                  values: z.array(z.string()).optional(),
                }).optional(),
                intValue: z.string().optional(),
                protoValue: z.record(z.string(), z.string()).optional(),
                stringArray: z.object({
                  values: z.array(z.string()).optional(),
                }).optional(),
                stringValue: z.string().optional(),
              }).describe(
                "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
              ).optional(),
              isRequired: z.boolean().describe(
                "Required for event execution. The validation will be done by the event bus when the event is triggered.",
              ).optional(),
              isSearchable: z.boolean().describe(
                "Used to indicate if a ParameterEntry should be converted to ParamIndexes for ST-Spanner full-text search. DEPRECATED: use searchable.",
              ).optional(),
              logSettings: z.object({
                logFieldName: z.string().describe(
                  "The name of corresponding logging field of the event property. If omitted, assumes the same name as the event property key.",
                ).optional(),
                seedPeriod: z.enum([
                  "SEED_PERIOD_UNSPECIFIED",
                  "DAY",
                  "WEEK",
                  "MONTH",
                ]).optional(),
                seedScope: z.enum([
                  "SEED_SCOPE_UNSPECIFIED",
                  "EVENT_NAME",
                  "TIME_PERIOD",
                  "PARAM_NAME",
                ]).optional(),
              }).describe(
                "The LogSettings define the logging attributes for an event property. These attributes are used to map the property to the parameter in the log proto. Also used to define scrubbing/truncation behavior and PII information.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this workflow parameter should be masked in the logs",
              ).optional(),
              readOnly: z.boolean().describe(
                "Used to indicate if the ParameterEntry is a read only field or not.",
              ).optional(),
              searchable: z.enum(["UNSPECIFIED", "YES", "NO"]).optional(),
              taskVisibility: z.array(z.string()).describe(
                "List of tasks that can view this property, if empty then all.",
              ).optional(),
            }).describe(
              "Attributes are additional options that can be associated with each event property. For more information, see",
            ).optional(),
            children: z.array(z.string()).describe(
              "Child parameters nested within this parameter. This field only applies to protobuf parameters",
            ).optional(),
            containsLargeData: z.boolean().describe(
              "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
            ).optional(),
            dataType: z.enum([
              "DATA_TYPE_UNSPECIFIED",
              "STRING_VALUE",
              "INT_VALUE",
              "DOUBLE_VALUE",
              "BOOLEAN_VALUE",
              "PROTO_VALUE",
              "SERIALIZED_OBJECT_VALUE",
              "STRING_ARRAY",
              "INT_ARRAY",
              "DOUBLE_ARRAY",
              "PROTO_ARRAY",
              "PROTO_ENUM",
              "BOOLEAN_ARRAY",
              "PROTO_ENUM_ARRAY",
              "BYTES",
              "BYTES_ARRAY",
              "NON_SERIALIZABLE_OBJECT",
              "JSON_VALUE",
            ]).describe("The data type of the parameter.").optional(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()).optional(),
              }).optional(),
              booleanValue: z.boolean().optional(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()).optional(),
              }).optional(),
              doubleValue: z.number().optional(),
              intArray: z.object({
                intValues: z.array(z.string()).optional(),
              }).optional(),
              intValue: z.string().optional(),
              jsonValue: z.string().optional(),
              protoArray: z.object({
                protoValues: z.array(z.record(z.string(), z.string()))
                  .optional(),
              }).optional(),
              protoValue: z.record(z.string(), z.string()).optional(),
              serializedObjectValue: z.object({
                objectValue: z.string().optional(),
              }).optional(),
              stringArray: z.object({
                stringValues: z.array(z.string()).optional(),
              }).optional(),
              stringValue: z.string().optional(),
            }).describe(
              "To support various types of parameter values. Next available id: 14",
            ).optional(),
            description: z.string().describe(
              "Optional. The description about the parameter",
            ).optional(),
            inOutType: z.enum([
              "IN_OUT_TYPE_UNSPECIFIED",
              "IN",
              "OUT",
              "IN_OUT",
            ]).describe("Specifies the input/output type for the parameter.")
              .optional(),
            isTransient: z.boolean().describe(
              "Whether this parameter is a transient parameter.",
            ).optional(),
            jsonSchema: z.string().describe(
              "This schema will be used to validate runtime JSON-typed values of this parameter.",
            ).optional(),
            key: z.string().describe(
              "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
            ).optional(),
            name: z.string().describe(
              'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
            ).optional(),
            producedBy: z.object({
              elementIdentifier: z.string().describe(
                "Configuration of the edge.",
              ).optional(),
              elementType: z.enum([
                "UNKNOWN_TYPE",
                "TASK_CONFIG",
                "TRIGGER_CONFIG",
              ]).describe(
                "Destination node where the edge ends. It can only be a task config.",
              ).optional(),
            }).describe(
              "Represents a node identifier (type + id). Next highest id: 3",
            ).optional(),
            producer: z.string().optional(),
            protoDefName: z.string().describe(
              "The name of the protobuf type if the parameter has a protobuf data type.",
            ).optional(),
            protoDefPath: z.string().describe(
              'If the data type is of type proto or proto array, this field needs to be populated with the fully qualified proto name. This message, for example, would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry".',
            ).optional(),
            required: z.boolean().optional(),
          })).describe(
            "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
          ).optional(),
        }).describe(
          "LINT.IfChange This is the frontend version of WorkflowParameters. It's exactly like the backend version except that instead of flattening protobuf parameters and treating every field and subfield of a protobuf parameter as a separate parameter, the fields/subfields of a protobuf parameter will be nested as \"children\" (see 'children' field below) parameters of the parent parameter. Please refer to enterprise/crm/eventbus/proto/workflow_parameters.proto for more information about WorkflowParameters.",
        ).optional(),
        lastModifierEmail: z.string().describe(
          "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        lockHolder: z.string().describe(
          "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        name: z.string().describe("Output only. Auto-generated primary key.")
          .optional(),
        origin: z.enum([
          "UNSPECIFIED",
          "UI",
          "PIPER_V2",
          "PIPER_V3",
          "APPLICATION_IP_PROVISIONING",
          "TEST_CASE",
        ]).describe(
          "Optional. The origin that indicates where this integration is coming from.",
        ).optional(),
        parentTemplateId: z.string().describe(
          "Optional. The id of the template which was used to create this integration_version.",
        ).optional(),
        runAsServiceAccount: z.string().describe(
          "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
        ).optional(),
        snapshotNumber: z.string().describe(
          'Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head.',
        ).optional(),
        state: z.enum([
          "INTEGRATION_STATE_UNSPECIFIED",
          "DRAFT",
          "ACTIVE",
          "ARCHIVED",
          "SNAPSHOT",
        ]).describe("Output only. User should not set it as an input.")
          .optional(),
        status: z.enum(["UNKNOWN", "DRAFT", "ACTIVE", "ARCHIVED", "SNAPSHOT"])
          .describe(
            "Output only. Generated by eventbus. User should not set it as an input.",
          ).optional(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              condition: z.string().describe(
                "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
              ).optional(),
              intervalTime: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
              ).optional(),
              maxRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryStrategy: z.enum([
                "RETRY_STRATEGY_UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_INTEGRATION_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            }).describe(
              "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
            ).optional(),
            failurePolicies: z.array(z.object({
              condition: z.string().describe(
                "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
              ).optional(),
              intervalTime: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
              ).optional(),
              maxRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryStrategy: z.enum([
                "RETRY_STRATEGY_UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_INTEGRATION_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            })).describe(
              "The list of failure policies that will be applied to the task in order.",
            ).optional(),
          }).describe("Conditional task failur retry strategies").optional(),
          description: z.string().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          displayName: z.string().describe(
            "Optional. User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.enum([
            "EXTERNAL_TASK_TYPE_UNSPECIFIED",
            "NORMAL_TASK",
            "ERROR_TASK",
          ]).describe("Optional. External task type of the task").optional(),
          failurePolicy: z.object({
            condition: z.string().describe(
              "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
            ).optional(),
            intervalTime: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
            ).optional(),
            maxRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryStrategy: z.enum([
              "RETRY_STRATEGY_UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_INTEGRATION_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          jsonValidationOption: z.enum([
            "JSON_VALIDATION_OPTION_UNSPECIFIED",
            "SKIP",
            "PRE_EXECUTION",
            "POST_EXECUTION",
            "PRE_POST_EXECUTION",
          ]).describe(
            "Optional. If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          nextTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe(
            "Optional. The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.record(
            z.string(),
            z.object({
              key: z.string().describe(
                "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this parameter should be masked in the logs",
              ).optional(),
              value: z.object({
                booleanArray: z.object({
                  booleanValues: z.array(z.boolean()).describe("Boolean array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of boolean array.",
                ).optional(),
                booleanValue: z.boolean().describe("Boolean.").optional(),
                doubleArray: z.object({
                  doubleValues: z.array(z.number()).describe(
                    "Double number array.",
                  ).optional(),
                }).describe(
                  "This message only contains a field of double number array.",
                ).optional(),
                doubleValue: z.number().describe("Double Number.").optional(),
                intArray: z.object({
                  intValues: z.array(z.string()).describe("Integer array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of integer array.",
                ).optional(),
                intValue: z.string().describe("Integer.").optional(),
                jsonValue: z.string().describe("Json.").optional(),
                stringArray: z.object({
                  stringValues: z.array(z.string()).describe("String array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of string array.",
                ).optional(),
                stringValue: z.string().describe("String.").optional(),
              }).describe("The type of the parameter.").optional(),
            }),
          ).describe(
            "Optional. The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          successPolicy: z.object({
            finalState: z.enum([
              "FINAL_STATE_UNSPECIFIED",
              "SUCCEEDED",
              "SUSPENDED",
            ]).describe(
              "State to which the execution snapshot status will be set if the task succeeds.",
            ).optional(),
          }).describe(
            "Policy that dictates the behavior for the task after it completes successfully.",
          ).optional(),
          synchronousCallFailurePolicy: z.object({
            condition: z.string().describe(
              "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
            ).optional(),
            intervalTime: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
            ).optional(),
            maxRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryStrategy: z.enum([
              "RETRY_STRATEGY_UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_INTEGRATION_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          task: z.string().describe("Optional. The name for the task.")
            .optional(),
          taskExecutionStrategy: z.enum([
            "TASK_EXECUTION_STRATEGY_UNSPECIFIED",
            "WHEN_ALL_SUCCEED",
            "WHEN_ANY_SUCCEED",
            "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
          ]).describe(
            "Optional. The policy dictating the execution strategy of this task.",
          ).optional(),
          taskId: z.string().describe(
            "Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`).",
          ).optional(),
          taskTemplate: z.string().describe(
            "Optional. Used to define task-template name if task is of type task-template",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week).",
            ).optional(),
            alertDisabled: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert.",
            ).optional(),
            alertName: z.string().describe(
              "A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique in within the scope of the containing workflow.",
            ).optional(),
            clientId: z.string().describe(
              "Client associated with this alert configuration. Must be a client enabled in one of the containing workflow's triggers.",
            ).optional(),
            durationThresholdMs: z.string().describe(
              "Should be specified only for TASK_AVERAGE_DURATION and TASK_PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).optional(),
            numAggregationPeriods: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            onlyFinalAttempt: z.boolean().describe(
              "Only count final task attempts, not retries.",
            ).optional(),
            playbookUrl: z.string().describe(
              "Link to a playbook for resolving the issue that triggered this alert.",
            ).optional(),
            thresholdType: z.enum([
              "UNSPECIFIED_THRESHOLD_TYPE",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().optional(),
              percentage: z.number().int().optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
          })).describe(
            "Alert configurations on error rate, warning rate, number of runs, durations, etc.",
          ).optional(),
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              intervalInSeconds: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
              ).optional(),
              maxNumRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryCondition: z.string().describe(
                "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
              ).optional(),
              retryStrategy: z.enum([
                "UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_WORKFLOW_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            }).describe(
              "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
            ).optional(),
            failurePolicies: z.array(z.object({
              intervalInSeconds: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
              ).optional(),
              maxNumRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryCondition: z.string().describe(
                "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
              ).optional(),
              retryStrategy: z.enum([
                "UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_WORKFLOW_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            })).describe(
              "The list of failure policies that will be applied to the task in order.",
            ).optional(),
          }).optional(),
          createTime: z.string().describe("Auto-generated.").optional(),
          creatorEmail: z.string().describe(
            "The creator's email address. Auto-generated from the user's email.",
          ).optional(),
          description: z.string().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          disableStrictTypeValidation: z.boolean().describe(
            "If this config contains a TypedTask, allow validation to succeed if an input is read from the output of another TypedTask whose output type is declared as a superclass of the requested input type. For instance, if the previous task declares an output of type Message, any task with this flag enabled will pass validation when attempting to read any proto Message type from the resultant Event parameter.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.enum([
            "EXTERNAL_TASK_TYPE_UNSPECIFIED",
            "NORMAL_TASK",
            "ERROR_TASK",
          ]).optional(),
          failurePolicy: z.object({
            intervalInSeconds: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
            ).optional(),
            maxNumRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryCondition: z.string().describe(
              "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
            ).optional(),
            retryStrategy: z.enum([
              "UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_WORKFLOW_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          incomingEdgeCount: z.number().int().describe(
            "The number of edges leading into this TaskConfig.",
          ).optional(),
          jsonValidationOption: z.enum([
            "UNSPECIFIED_JSON_VALIDATION_OPTION",
            "SKIP",
            "PRE_EXECUTION",
            "POST_EXECUTION",
            "PRE_POST_EXECUTION",
          ]).describe(
            "If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          label: z.string().describe(
            "User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          lastModifiedTime: z.string().describe("Auto-generated.").optional(),
          nextTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string().describe(
                  "Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown.",
                ).optional(),
                operator: z.enum([
                  "UNSET",
                  "EQUALS",
                  "CONTAINS",
                  "LESS_THAN",
                  "GREATER_THAN",
                  "EXISTS",
                  "DOES_NOT_EXIST",
                  "IS_EMPTY",
                  "IS_NOT_EMPTY",
                ]).describe(
                  "Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("A set of individual constituent conditions.")
                .optional(),
            })).describe(
              "Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition`",
            ).optional(),
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give more business context about the next task edge or condition.",
            ).optional(),
            label: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskNumber: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe(
            "The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.record(
            z.string(),
            z.object({
              dataType: z.enum([
                "DATA_TYPE_UNSPECIFIED",
                "STRING_VALUE",
                "INT_VALUE",
                "DOUBLE_VALUE",
                "BOOLEAN_VALUE",
                "PROTO_VALUE",
                "SERIALIZED_OBJECT_VALUE",
                "STRING_ARRAY",
                "INT_ARRAY",
                "DOUBLE_ARRAY",
                "PROTO_ARRAY",
                "PROTO_ENUM",
                "BOOLEAN_ARRAY",
                "PROTO_ENUM_ARRAY",
                "BYTES",
                "BYTES_ARRAY",
                "NON_SERIALIZABLE_OBJECT",
                "JSON_VALUE",
              ]).describe("Explicitly getting the type of the parameter.")
                .optional(),
              key: z.string().describe(
                "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this parameter should be masked in the logs",
              ).optional(),
              value: z.object({
                booleanArray: z.object({
                  booleanValues: z.array(z.boolean()).optional(),
                }).optional(),
                booleanValue: z.boolean().optional(),
                doubleArray: z.object({
                  doubleValues: z.array(z.number()).optional(),
                }).optional(),
                doubleValue: z.number().optional(),
                intArray: z.object({
                  intValues: z.array(z.string()).optional(),
                }).optional(),
                intValue: z.string().optional(),
                jsonValue: z.string().optional(),
                protoArray: z.object({
                  protoValues: z.array(z.record(z.string(), z.string()))
                    .optional(),
                }).optional(),
                protoValue: z.record(z.string(), z.string()).optional(),
                serializedObjectValue: z.object({
                  objectValue: z.string().optional(),
                }).optional(),
                stringArray: z.object({
                  stringValues: z.array(z.string()).optional(),
                }).optional(),
                stringValue: z.string().optional(),
              }).describe(
                "To support various types of parameter values. Next available id: 14",
              ).optional(),
            }),
          ).describe(
            "The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.object({
            x: z.number().int().optional(),
            y: z.number().int().optional(),
          }).describe("Represents two-dimensional positions.").optional(),
          precondition: z.string().describe(
            'Optional. Standard filter expression evaluated before execution. Independent of other conditions and tasks. Can be used to enable rollout. e.g. "rollout(5)" will only allow 5% of incoming traffic to task.',
          ).optional(),
          preconditionLabel: z.string().describe(
            "Optional. User-provided label that is attached to precondition in the UI.",
          ).optional(),
          rollbackStrategy: z.object({
            parameters: z.object({
              parameters: z.array(z.object({
                dataType: z.enum([
                  "DATA_TYPE_UNSPECIFIED",
                  "STRING_VALUE",
                  "INT_VALUE",
                  "DOUBLE_VALUE",
                  "BOOLEAN_VALUE",
                  "PROTO_VALUE",
                  "SERIALIZED_OBJECT_VALUE",
                  "STRING_ARRAY",
                  "INT_ARRAY",
                  "DOUBLE_ARRAY",
                  "PROTO_ARRAY",
                  "PROTO_ENUM",
                  "BOOLEAN_ARRAY",
                  "PROTO_ENUM_ARRAY",
                  "BYTES",
                  "BYTES_ARRAY",
                  "NON_SERIALIZABLE_OBJECT",
                  "JSON_VALUE",
                ]).describe("Explicitly getting the type of the parameter.")
                  .optional(),
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  jsonValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same workflow execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            rollbackTaskImplementationClassName: z.string().describe(
              "Required. This is the name of the task that needs to be executed upon rollback of this task.",
            ).optional(),
            taskNumbersToRollback: z.array(z.string()).describe(
              "Required. These are the tasks numbers of the tasks whose `rollback_strategy.rollback_task_implementation_class_name` needs to be executed upon failure of this task.",
            ).optional(),
          }).describe("Next available id: 4").optional(),
          successPolicy: z.object({
            finalState: z.enum(["UNSPECIFIED", "SUCCEEDED", "SUSPENDED"])
              .describe(
                "State to which the execution snapshot status will be set if the task succeeds.",
              ).optional(),
          }).describe(
            "Policy that dictates the behavior for the task after it completes successfully.",
          ).optional(),
          synchronousCallFailurePolicy: z.object({
            intervalInSeconds: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
            ).optional(),
            maxNumRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryCondition: z.string().describe(
              "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
            ).optional(),
            retryStrategy: z.enum([
              "UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_WORKFLOW_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          taskEntity: z.object({
            disabledForVpcSc: z.boolean().describe(
              "True if the task has conflict with vpcsc",
            ).optional(),
            metadata: z.object({
              activeTaskName: z.string().describe(
                "The new task name to replace the current task if it is deprecated. Otherwise, it is the same as the current task name.",
              ).optional(),
              admins: z.array(z.object({
                googleGroupEmail: z.string().optional(),
                userEmail: z.string().optional(),
              })).optional(),
              category: z.enum([
                "UNSPECIFIED_CATEGORY",
                "CUSTOM",
                "FLOW_CONTROL",
                "DATA_MANIPULATION",
                "SCRIPTING",
                "CONNECTOR",
                "HIDDEN",
                "CLOUD_SYSTEMS",
                "CUSTOM_TASK_TEMPLATE",
                "TASK_RECOMMENDATIONS",
              ]).optional(),
              codeSearchLink: z.string().describe(
                "The Code Search link to the Task Java file.",
              ).optional(),
              defaultJsonValidationOption: z.enum([
                "UNSPECIFIED_JSON_VALIDATION_OPTION",
                "SKIP",
                "PRE_EXECUTION",
                "POST_EXECUTION",
                "PRE_POST_EXECUTION",
              ]).describe(
                "Controls whether JSON workflow parameters are validated against provided schemas before and/or after this task's execution.",
              ).optional(),
              defaultSpec: z.string().describe(
                "Contains the initial configuration of the task with default values set. For now, The string should be compatible to an ASCII-proto format.",
              ).optional(),
              description: z.string().describe(
                "In a few sentences, describe the purpose and usage of the task.",
              ).optional(),
              descriptiveName: z.string().describe(
                'The string name to show on the task list on the Workflow editor screen. This should be a very short, one to two words name for the task. (e.g. "Send Mail")',
              ).optional(),
              docMarkdown: z.string().describe(
                "Snippet of markdown documentation to embed in the RHP for this task.",
              ).optional(),
              externalCategory: z.enum([
                "UNSPECIFIED_EXTERNAL_CATEGORY",
                "CORE",
                "CONNECTORS",
                "EXTERNAL_HTTP",
                "EXTERNAL_INTEGRATION_SERVICES",
                "EXTERNAL_CUSTOMER_ACTIONS",
                "EXTERNAL_FLOW_CONTROL",
                "EXTERNAL_WORKSPACE",
                "EXTERNAL_SECURITY",
                "EXTERNAL_DATABASES",
                "EXTERNAL_ANALYTICS",
                "EXTERNAL_BYOC",
                "EXTERNAL_BYOT",
                "EXTERNAL_ARTIFICIAL_INTELIGENCE",
                "EXTERNAL_DATA_MANIPULATION",
              ]).optional(),
              externalCategorySequence: z.number().int().describe(
                "Sequence with which the task in specific category to be displayed in task discovery panel for external users.",
              ).optional(),
              externalDocHtml: z.string().describe(
                "External-facing documention embedded in the RHP for this task.",
              ).optional(),
              externalDocLink: z.string().describe(
                "Doc link for external-facing documentation (separate from g3doc).",
              ).optional(),
              externalDocMarkdown: z.string().describe(
                "DEPRECATED: Use external_doc_html.",
              ).optional(),
              g3DocLink: z.string().describe(
                "URL to the associated G3 Doc for the task if available",
              ).optional(),
              iconLink: z.string().describe(
                "URL to gstatic image icon for this task. This icon shows up on the task list panel along with the task name in the Workflow Editor screen. Use the 24p, 2x, gray color icon image format.",
              ).optional(),
              isDeprecated: z.boolean().describe(
                "The deprecation status of the current task. Default value is false;",
              ).optional(),
              name: z.string().describe(
                "The actual class name or the annotated name of the task. Task Author should initialize this field with value from the getName() method of the Task class.",
              ).optional(),
              standaloneExternalDocHtml: z.string().describe(
                "External-facing documention for standalone IP in pantheon embedded in the RHP for this task. Non null only if different from external_doc_html",
              ).optional(),
              status: z.enum([
                "UNSPECIFIED_STATUS",
                "DEFAULT_INACTIVE",
                "ACTIVE",
              ]).describe(
                "Allows author to indicate if the task is ready to use or not. If not set, then it will default to INACTIVE.",
              ).optional(),
              system: z.enum([
                "UNSPECIFIED_SYSTEM",
                "GENERIC",
                "BUGANIZER",
                "SALESFORCE",
                "CLOUD_SQL",
                "PLX",
                "SHEETS",
                "GOOGLE_GROUPS",
                "EMAIL",
                "SPANNER",
                "DATA_BRIDGE",
              ]).optional(),
              tags: z.array(z.string()).describe(
                'A set of tags that pertain to a particular task. This can be used to improve the searchability of tasks with several names ("REST Caller" vs. "Call REST Endpoint") or to help users find tasks based on related words.',
              ).optional(),
            }).describe(
              "TaskMetadata are attributes that are associated to every common Task we have.",
            ).optional(),
            paramSpecs: z.object({
              parameters: z.array(z.object({
                className: z.string().describe(
                  'The FQCN of the Java object this represents. A string, for example, would be "java.lang.String". If this is "java.lang.Object", the parameter can be of any type.',
                ).optional(),
                collectionElementClassName: z.string().describe(
                  'If it is a collection of objects, this would be the FCQN of every individual element in the collection. If this is "java.lang.Object", the parameter is a collection of any type.',
                ).optional(),
                config: z.object({
                  descriptivePhrase: z.string().describe(
                    "A short phrase to describe what this parameter contains.",
                  ).optional(),
                  helpText: z.string().describe(
                    "Detailed help text for this parameter containing information not provided elsewhere. For example, instructions on how to migrate from a deprecated parameter.",
                  ).optional(),
                  hideDefaultValue: z.boolean().describe(
                    "Whether the default value is hidden in the UI.",
                  ).optional(),
                  inputDisplayOption: z.enum([
                    "DEFAULT",
                    "STRING_MULTI_LINE",
                    "NUMBER_SLIDER",
                    "BOOLEAN_TOGGLE",
                  ]).optional(),
                  isHidden: z.boolean().describe(
                    "Whether this field is hidden in the UI.",
                  ).optional(),
                  label: z.string().describe(
                    "A user-friendly label for the parameter.",
                  ).optional(),
                  parameterNameOption: z.enum([
                    "DEFAULT_NOT_PARAMETER_NAME",
                    "IS_PARAMETER_NAME",
                    "KEY_IS_PARAMETER_NAME",
                    "VALUE_IS_PARAMETER_NAME",
                  ]).optional(),
                  subSectionLabel: z.string().describe(
                    "A user-friendly label for subSection under which the parameter will be displayed.",
                  ).optional(),
                  uiPlaceholderText: z.string().describe(
                    "Placeholder text which will appear in the UI input form for this parameter.",
                  ).optional(),
                }).optional(),
                dataType: z.enum([
                  "DATA_TYPE_UNSPECIFIED",
                  "STRING_VALUE",
                  "INT_VALUE",
                  "DOUBLE_VALUE",
                  "BOOLEAN_VALUE",
                  "PROTO_VALUE",
                  "SERIALIZED_OBJECT_VALUE",
                  "STRING_ARRAY",
                  "INT_ARRAY",
                  "DOUBLE_ARRAY",
                  "PROTO_ARRAY",
                  "PROTO_ENUM",
                  "BOOLEAN_ARRAY",
                  "PROTO_ENUM_ARRAY",
                  "BYTES",
                  "BYTES_ARRAY",
                  "NON_SERIALIZABLE_OBJECT",
                  "JSON_VALUE",
                ]).describe("The data type of the parameter.").optional(),
                defaultValue: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  jsonValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "To support various types of parameter values. Next available id: 14",
                ).optional(),
                isDeprecated: z.boolean().describe(
                  "If set, this entry is deprecated, so further use of this parameter should be prohibited.",
                ).optional(),
                isOutput: z.boolean().optional(),
                jsonSchema: z.string().describe(
                  "If the data_type is JSON_VALUE, then this will define its schema.",
                ).optional(),
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given task. These parameters must be predefined in the workflow definition.",
                ).optional(),
                protoDef: z.object({
                  fullName: z.string().describe(
                    'The fully-qualified proto name. This message, for example, would be "enterprise.crm.eventbus.proto.ParamSpecEntry.ProtoDefinition".',
                  ).optional(),
                  path: z.string().describe(
                    "Path to the proto file that contains the message type's definition.",
                  ).optional(),
                }).optional(),
                required: z.boolean().describe(
                  "If set, the user must provide an input value for this parameter.",
                ).optional(),
                validationRule: z.object({
                  doubleRange: z.object({
                    max: z.number().describe(
                      "The inclusive maximum of the acceptable range.",
                    ).optional(),
                    min: z.number().describe(
                      "The inclusive minimum of the acceptable range.",
                    ).optional(),
                  }).describe("Range used to validate doubles and floats.")
                    .optional(),
                  intRange: z.object({
                    max: z.string().describe(
                      "The inclusive maximum of the acceptable range.",
                    ).optional(),
                    min: z.string().describe(
                      "The inclusive minimum of the acceptable range.",
                    ).optional(),
                  }).describe("Range used to validate longs and ints.")
                    .optional(),
                  stringRegex: z.object({
                    exclusive: z.boolean().describe(
                      "Whether the regex matcher is applied exclusively (if true, matching values will be rejected).",
                    ).optional(),
                    regex: z.string().describe(
                      "The regex applied to the input value(s).",
                    ).optional(),
                  }).describe("Rule used to validate strings.").optional(),
                }).optional(),
              })).optional(),
            }).optional(),
            stats: z.object({
              dimensions: z.object({
                clientId: z.string().optional(),
                enumFilterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"])
                  .describe(
                    "Whether to include or exclude the enums matching the regex.",
                  ).optional(),
                errorEnumString: z.string().optional(),
                retryAttempt: z.enum([
                  "UNSPECIFIED",
                  "FINAL",
                  "RETRYABLE",
                  "CANCELED",
                ]).optional(),
                taskName: z.string().optional(),
                taskNumber: z.string().optional(),
                triggerId: z.string().describe(
                  "Stats have been or will be aggregated on set fields for any semantically-meaningful combination.",
                ).optional(),
                warningEnumString: z.string().optional(),
                workflowId: z.string().optional(),
                workflowName: z.string().optional(),
              }).optional(),
              durationInSeconds: z.number().describe(
                "Average duration in seconds.",
              ).optional(),
              errorRate: z.number().describe("Average error rate.").optional(),
              qps: z.number().describe("Queries per second.").optional(),
              warningRate: z.number().describe("Average warning rate.")
                .optional(),
            }).describe(
              "Stats for the requested dimensions: QPS, duration, and error/warning rate",
            ).optional(),
            taskType: z.enum(["TASK", "ASIS_TEMPLATE", "IO_TEMPLATE"]).describe(
              "Defines the type of the task",
            ).optional(),
            uiConfig: z.object({
              taskUiModuleConfigs: z.array(z.object({
                moduleId: z.enum([
                  "UNSPECIFIED_TASK_MODULE",
                  "LABEL",
                  "ERROR_HANDLING",
                  "TASK_PARAM_TABLE",
                  "TASK_PARAM_FORM",
                  "PRECONDITION",
                  "SCRIPT_EDITOR",
                  "RPC",
                  "TASK_SUMMARY",
                  "SUSPENSION",
                  "RPC_TYPED",
                  "SUB_WORKFLOW",
                  "APPS_SCRIPT_NAVIGATOR",
                  "SUB_WORKFLOW_FOR_EACH_LOOP",
                  "FIELD_MAPPING",
                  "README",
                  "REST_CALLER",
                  "SUB_WORKFLOW_SCATTER_GATHER",
                  "CLOUD_SQL",
                  "GENERIC_CONNECTOR_TASK",
                ]).describe("ID of the config module.").optional(),
              })).describe("Configurations of included config modules.")
                .optional(),
            }).describe(
              "Task authors would use this type to configure the UI for a particular task by specifying what UI config modules should be included to compose the UI. Learn more about config module framework:",
            ).optional(),
          }).describe(
            "Contains a task's metadata and associated information. Next available id: 7",
          ).optional(),
          taskExecutionStrategy: z.enum([
            "WHEN_ALL_SUCCEED",
            "WHEN_ANY_SUCCEED",
            "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
          ]).describe(
            "The policy dictating the execution strategy of this task.",
          ).optional(),
          taskName: z.string().describe("The name for the task.").optional(),
          taskNumber: z.string().describe(
            "REQUIRED: the identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_number`).",
          ).optional(),
          taskSpec: z.string().describe(
            'A string template that allows user to configure task parameters (with either literal default values or tokens which will be resolved at execution time) for the task. It will eventually replace the old "parameters" field.',
          ).optional(),
          taskTemplateName: z.string().describe(
            "Used to define task-template name if task is of type task-template",
          ).optional(),
          taskType: z.enum(["TASK", "ASIS_TEMPLATE", "IO_TEMPLATE"]).describe(
            "Defines the type of the task",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.object({
            creatorEmail: z.string().describe("The creator's email address.")
              .optional(),
            name: z.string().describe(
              "Required. Unique identifier of the teardown task within this Config. We use this field as the identifier to find next teardown tasks.",
            ).optional(),
            nextTeardownTask: z.object({
              name: z.string().describe(
                "Required. Name of the next teardown task.",
              ).optional(),
            }).describe(
              "The teardown task that is next in line to be executed. We support only sequential execution of teardown tasks (i.e. no branching).",
            ).optional(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "LINT.IfChange To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            properties: z.object({
              properties: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding property value. This should be unique for a given fired event. The Tasks should be aware of the keys used while firing the events for them to be able to retrieve the values.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("An unordered list of property entries.").optional(),
            }).describe(
              "LINT.IfChange This message is used for storing key value pair properties for each Event / Task in the EventBus.",
            ).optional(),
            teardownTaskImplementationClassName: z.string().describe(
              "Required. Implementation class name.",
            ).optional(),
          })).describe("Required.").optional(),
        }).optional(),
        triggerConfigs: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
            ).optional(),
            alertThreshold: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            disableAlert: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this integration alert.",
            ).optional(),
            displayName: z.string().describe(
              "Name of the alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the integration.",
            ).optional(),
            durationThreshold: z.string().describe(
              "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "EVENT_ERROR_RATE",
              "EVENT_WARNING_RATE",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "EVENT_RATE",
              "EVENT_AVERAGE_DURATION",
              "EVENT_PERCENTILE_DURATION",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).describe("The type of metric.").optional(),
            onlyFinalAttempt: z.boolean().describe(
              "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
            ).optional(),
            thresholdType: z.enum([
              "THRESHOLD_TYPE_UNSPECIFIED",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().describe("Absolute value threshold.")
                .optional(),
              percentage: z.number().int().describe("Percentage threshold.")
                .optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
          })).describe(
            "Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published.",
          ).optional(),
          cloudSchedulerConfig: z.object({
            cronTab: z.string().describe(
              "Required. The cron tab of cloud scheduler trigger.",
            ).optional(),
            errorMessage: z.string().describe(
              "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
            ).optional(),
            location: z.string().describe(
              "Required. The location where associated cloud scheduler job will be created",
            ).optional(),
            serviceAccountEmail: z.string().describe(
              "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
            ).optional(),
          }).describe("Cloud Scheduler Trigger configuration").optional(),
          description: z.string().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          label: z.string().describe(
            "Optional. The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe("Optional. Dictates how next tasks will be executed.")
            .optional(),
          outputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          properties: z.record(z.string(), z.string()).describe(
            'Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers.',
          ).optional(),
          startTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph).",
          ).optional(),
          trigger: z.string().describe(
            'Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose.',
          ).optional(),
          triggerId: z.string().describe(
            'Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME}',
          ).optional(),
          triggerNumber: z.string().describe(
            "Required. A number to uniquely identify each trigger config within the integration on UI.",
          ).optional(),
          triggerType: z.enum([
            "TRIGGER_TYPE_UNSPECIFIED",
            "CRON",
            "API",
            "SFDC_CHANNEL",
            "CLOUD_PUBSUB_EXTERNAL",
            "SFDC_CDC_CHANNEL",
            "CLOUD_SCHEDULER",
            "INTEGRATION_CONNECTOR_TRIGGER",
            "PRIVATE_TRIGGER",
            "CLOUD_PUBSUB",
            "EVENTARC_TRIGGER",
          ]).describe("Optional. Type of trigger").optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
            ).optional(),
            alertDisabled: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert.",
            ).optional(),
            alertName: z.string().describe(
              "A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the workflow.",
            ).optional(),
            clientId: z.string().describe(
              "Client associated with this alert configuration.",
            ).optional(),
            durationThresholdMs: z.string().describe(
              "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "EVENT_ERROR_RATE",
              "EVENT_WARNING_RATE",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "EVENT_RATE",
              "EVENT_AVERAGE_DURATION",
              "EVENT_PERCENTILE_DURATION",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).optional(),
            numAggregationPeriods: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            onlyFinalAttempt: z.boolean().describe(
              "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
            ).optional(),
            playbookUrl: z.string().describe(
              "Link to a playbook for resolving the issue that triggered this alert.",
            ).optional(),
            thresholdType: z.enum([
              "UNSPECIFIED_THRESHOLD_TYPE",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().optional(),
              percentage: z.number().int().optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
          })).describe(
            "An alert threshold configuration for the [trigger + client + workflow] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + workflow] when published.",
          ).optional(),
          cloudSchedulerConfig: z.object({
            cronTab: z.string().describe(
              "Required. The cron tab of cloud scheduler trigger.",
            ).optional(),
            errorMessage: z.string().describe(
              "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
            ).optional(),
            location: z.string().describe(
              "Required. The location where associated cloud scheduler job will be created",
            ).optional(),
            serviceAccountEmail: z.string().describe(
              "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
            ).optional(),
          }).describe("Cloud Scheduler Trigger configuration").optional(),
          description: z.string().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          enabledClients: z.array(z.string()).describe(
            "Required. The list of client ids which are enabled to execute the workflow using this trigger. In other words, these clients have the workflow execution privledges for this trigger. For API trigger, the client id in the incoming request is validated against the list of enabled clients. For non-API triggers, one workflow execution is triggered on behalf of each enabled client.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          label: z.string().describe(
            "The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe("Dictates how next tasks will be executed.").optional(),
          outputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          pauseWorkflowExecutions: z.boolean().describe(
            "Optional. If set to true, any upcoming requests for this trigger config will be paused and the executions will be resumed later when the flag is reset. The workflow to which this trigger config belongs has to be in ACTIVE status for the executions to be paused or resumed.",
          ).optional(),
          position: z.object({
            x: z.number().int().optional(),
            y: z.number().int().optional(),
          }).describe("Represents two-dimensional positions.").optional(),
          properties: z.record(z.string(), z.string()).describe(
            'Configurable properties of the trigger, not to be confused with workflow parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Cloud Pubsub triggers.',
          ).optional(),
          startTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string().describe(
                  "Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown.",
                ).optional(),
                operator: z.enum([
                  "UNSET",
                  "EQUALS",
                  "CONTAINS",
                  "LESS_THAN",
                  "GREATER_THAN",
                  "EXISTS",
                  "DOES_NOT_EXIST",
                  "IS_EMPTY",
                  "IS_NOT_EMPTY",
                ]).describe(
                  "Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("A set of individual constituent conditions.")
                .optional(),
            })).describe(
              "Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition`",
            ).optional(),
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give more business context about the next task edge or condition.",
            ).optional(),
            label: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskNumber: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Set of tasks numbers from where the workflow execution is started by this trigger. If this is empty, then workflow is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same workflow execution graph).",
          ).optional(),
          triggerCriteria: z.object({
            condition: z.string().describe(
              "Required. Standard filter expression, when true the workflow will be executed. If there's no trigger_criteria_task_implementation_class_name specified, the condition will be validated directly.",
            ).optional(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "LINT.IfChange To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            triggerCriteriaTaskImplementationClassName: z.string().describe(
              "Optional. Implementation class name. The class should implement the “TypedTask” interface.",
            ).optional(),
          }).optional(),
          triggerId: z.string().describe("The backend trigger ID.").optional(),
          triggerName: z.string().describe(
            "Optional. Name of the trigger This is added to identify the type of trigger. This is avoid the logic on triggerId to identify the trigger_type and push the same to monitoring.",
          ).optional(),
          triggerNumber: z.string().describe(
            "Required. A number to uniquely identify each trigger config within the workflow on UI.",
          ).optional(),
          triggerType: z.enum([
            "UNKNOWN",
            "CLOUD_PUBSUB",
            "GOOPS",
            "SFDC_SYNC",
            "CRON",
            "API",
            "MANIFOLD_TRIGGER",
            "DATALAYER_DATA_CHANGE",
            "SFDC_CHANNEL",
            "CLOUD_PUBSUB_EXTERNAL",
            "SFDC_CDC_CHANNEL",
            "SFDC_PLATFORM_EVENTS_CHANNEL",
            "CLOUD_SCHEDULER",
            "INTEGRATION_CONNECTOR_TRIGGER",
            "PRIVATE_TRIGGER",
            "EVENTARC_TRIGGER",
          ]).optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        updateTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        userLabel: z.string().describe(
          "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
        ).optional(),
      }).describe("The integration version definition.").optional(),
      key: z.string().describe(
        "Required. Unique Key of the IntegrationVersion.",
      ).optional(),
    })).describe(
      "Optional. Sub integration templates which would be added along with main integration.",
    ).optional(),
  }).describe("Define the bundle of the template.").optional(),
  usageCount: z.string().describe("Optional. Number of template usages.")
    .optional(),
  usageInfo: z.string().describe(
    "Optional. Information on how to use the template. This should contain detailed information about usage of the template.",
  ).optional(),
  visibility: z.enum(["VISIBILITY_UNSPECIFIED", "PRIVATE", "SHARED", "PUBLIC"])
    .describe("Required. Visibility of the template.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  author: z.string().optional(),
  categories: z.array(z.string()).optional(),
  components: z.array(z.object({
    name: z.string(),
    type: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  docLink: z.string().optional(),
  lastUsedTime: z.string().optional(),
  name: z.string(),
  sharedWith: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  templateBundle: z.object({
    integrationVersionTemplate: z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.string(),
          enableCloudLogging: z.boolean(),
        }),
        createTime: z.string(),
        createdFromTemplate: z.string(),
        databasePersistencePolicy: z.string(),
        description: z.string(),
        enableVariableMasking: z.boolean(),
        errorCatcherConfigs: z.array(z.object({
          description: z.string(),
          errorCatcherId: z.string(),
          errorCatcherNumber: z.string(),
          label: z.string(),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          startErrorTasks: z.array(z.object({
            condition: z.string(),
            description: z.string(),
            displayName: z.string(),
            taskConfigId: z.string(),
            taskId: z.string(),
          })),
        })),
        integrationConfigParameters: z.array(z.object({
          parameter: z.object({
            containsLargeData: z.boolean(),
            dataType: z.string(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()),
              }),
              booleanValue: z.boolean(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()),
              }),
              doubleValue: z.number(),
              intArray: z.object({
                intValues: z.array(z.string()),
              }),
              intValue: z.string(),
              jsonValue: z.string(),
              stringArray: z.object({
                stringValues: z.array(z.string()),
              }),
              stringValue: z.string(),
            }),
            description: z.string(),
            displayName: z.string(),
            inputOutputType: z.string(),
            isTransient: z.boolean(),
            jsonSchema: z.string(),
            key: z.string(),
            masked: z.boolean(),
            producer: z.string(),
            searchable: z.boolean(),
          }),
          value: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()),
            }),
            booleanValue: z.boolean(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()),
            }),
            doubleValue: z.number(),
            intArray: z.object({
              intValues: z.array(z.string()),
            }),
            intValue: z.string(),
            jsonValue: z.string(),
            stringArray: z.object({
              stringValues: z.array(z.string()),
            }),
            stringValue: z.string(),
          }),
        })),
        integrationParameters: z.array(z.object({
          containsLargeData: z.boolean(),
          dataType: z.string(),
          defaultValue: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()),
            }),
            booleanValue: z.boolean(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()),
            }),
            doubleValue: z.number(),
            intArray: z.object({
              intValues: z.array(z.string()),
            }),
            intValue: z.string(),
            jsonValue: z.string(),
            stringArray: z.object({
              stringValues: z.array(z.string()),
            }),
            stringValue: z.string(),
          }),
          description: z.string(),
          displayName: z.string(),
          inputOutputType: z.string(),
          isTransient: z.boolean(),
          jsonSchema: z.string(),
          key: z.string(),
          masked: z.boolean(),
          producer: z.string(),
          searchable: z.boolean(),
        })),
        integrationParametersInternal: z.object({
          parameters: z.array(z.object({
            attributes: z.object({
              dataType: z.string(),
              defaultValue: z.object({
                booleanValue: z.boolean(),
                doubleArray: z.object({
                  values: z.array(z.number()),
                }),
                doubleValue: z.number(),
                intArray: z.object({
                  values: z.array(z.string()),
                }),
                intValue: z.string(),
                protoValue: z.record(z.string(), z.unknown()),
                stringArray: z.object({
                  values: z.array(z.string()),
                }),
                stringValue: z.string(),
              }),
              isRequired: z.boolean(),
              isSearchable: z.boolean(),
              logSettings: z.object({
                logFieldName: z.string(),
                seedPeriod: z.string(),
                seedScope: z.string(),
              }),
              masked: z.boolean(),
              readOnly: z.boolean(),
              searchable: z.string(),
              taskVisibility: z.array(z.string()),
            }),
            children: z.array(z.string()),
            containsLargeData: z.boolean(),
            dataType: z.string(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()),
              }),
              booleanValue: z.boolean(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()),
              }),
              doubleValue: z.number(),
              intArray: z.object({
                intValues: z.array(z.string()),
              }),
              intValue: z.string(),
              jsonValue: z.string(),
              protoArray: z.object({
                protoValues: z.array(z.record(z.string(), z.unknown())),
              }),
              protoValue: z.record(z.string(), z.unknown()),
              serializedObjectValue: z.object({
                objectValue: z.string(),
              }),
              stringArray: z.object({
                stringValues: z.array(z.string()),
              }),
              stringValue: z.string(),
            }),
            description: z.string(),
            inOutType: z.string(),
            isTransient: z.boolean(),
            jsonSchema: z.string(),
            key: z.string(),
            name: z.string(),
            producedBy: z.object({
              elementIdentifier: z.string(),
              elementType: z.string(),
            }),
            producer: z.string(),
            protoDefName: z.string(),
            protoDefPath: z.string(),
            required: z.boolean(),
          })),
        }),
        lastModifierEmail: z.string(),
        lockHolder: z.string(),
        name: z.string(),
        origin: z.string(),
        parentTemplateId: z.string(),
        runAsServiceAccount: z.string(),
        snapshotNumber: z.string(),
        state: z.string(),
        status: z.string(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              condition: z.string(),
              intervalTime: z.string(),
              maxRetries: z.number(),
              retryStrategy: z.string(),
            }),
            failurePolicies: z.array(z.object({
              condition: z.string(),
              intervalTime: z.string(),
              maxRetries: z.number(),
              retryStrategy: z.string(),
            })),
          }),
          description: z.string(),
          displayName: z.string(),
          errorCatcherId: z.string(),
          externalTaskType: z.string(),
          failurePolicy: z.object({
            condition: z.string(),
            intervalTime: z.string(),
            maxRetries: z.number(),
            retryStrategy: z.string(),
          }),
          jsonValidationOption: z.string(),
          nextTasks: z.array(z.object({
            condition: z.string(),
            description: z.string(),
            displayName: z.string(),
            taskConfigId: z.string(),
            taskId: z.string(),
          })),
          nextTasksExecutionPolicy: z.string(),
          parameters: z.record(z.string(), z.unknown()),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          successPolicy: z.object({
            finalState: z.string(),
          }),
          synchronousCallFailurePolicy: z.object({
            condition: z.string(),
            intervalTime: z.string(),
            maxRetries: z.number(),
            retryStrategy: z.string(),
          }),
          task: z.string(),
          taskExecutionStrategy: z.string(),
          taskId: z.string(),
          taskTemplate: z.string(),
        })),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.array(z.object({
            aggregationPeriod: z.string(),
            alertDisabled: z.boolean(),
            alertName: z.string(),
            clientId: z.string(),
            durationThresholdMs: z.string(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()),
              filterType: z.string(),
            }),
            metricType: z.string(),
            numAggregationPeriods: z.number(),
            onlyFinalAttempt: z.boolean(),
            playbookUrl: z.string(),
            thresholdType: z.string(),
            thresholdValue: z.object({
              absolute: z.string(),
              percentage: z.number(),
            }),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()),
              filterType: z.string(),
            }),
          })),
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              intervalInSeconds: z.string(),
              maxNumRetries: z.number(),
              retryCondition: z.string(),
              retryStrategy: z.string(),
            }),
            failurePolicies: z.array(z.object({
              intervalInSeconds: z.string(),
              maxNumRetries: z.number(),
              retryCondition: z.string(),
              retryStrategy: z.string(),
            })),
          }),
          createTime: z.string(),
          creatorEmail: z.string(),
          description: z.string(),
          disableStrictTypeValidation: z.boolean(),
          errorCatcherId: z.string(),
          externalTaskType: z.string(),
          failurePolicy: z.object({
            intervalInSeconds: z.string(),
            maxNumRetries: z.number(),
            retryCondition: z.string(),
            retryStrategy: z.string(),
          }),
          incomingEdgeCount: z.number(),
          jsonValidationOption: z.string(),
          label: z.string(),
          lastModifiedTime: z.string(),
          nextTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string(),
                operator: z.string(),
                value: z.object({
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    values: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    values: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoValue: z.record(z.string(), z.unknown()),
                  stringArray: z.object({
                    values: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            })),
            condition: z.string(),
            description: z.string(),
            label: z.string(),
            taskConfigId: z.string(),
            taskNumber: z.string(),
          })),
          nextTasksExecutionPolicy: z.string(),
          parameters: z.record(z.string(), z.unknown()),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          precondition: z.string(),
          preconditionLabel: z.string(),
          rollbackStrategy: z.object({
            parameters: z.object({
              parameters: z.array(z.object({
                dataType: z.string(),
                key: z.string(),
                masked: z.boolean(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()),
                  }),
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    intValues: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  jsonValue: z.string(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.unknown())),
                  }),
                  protoValue: z.record(z.string(), z.unknown()),
                  serializedObjectValue: z.object({
                    objectValue: z.string(),
                  }),
                  stringArray: z.object({
                    stringValues: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            }),
            rollbackTaskImplementationClassName: z.string(),
            taskNumbersToRollback: z.array(z.string()),
          }),
          successPolicy: z.object({
            finalState: z.string(),
          }),
          synchronousCallFailurePolicy: z.object({
            intervalInSeconds: z.string(),
            maxNumRetries: z.number(),
            retryCondition: z.string(),
            retryStrategy: z.string(),
          }),
          taskEntity: z.object({
            disabledForVpcSc: z.boolean(),
            metadata: z.object({
              activeTaskName: z.string(),
              admins: z.array(z.object({
                googleGroupEmail: z.string(),
                userEmail: z.string(),
              })),
              category: z.string(),
              codeSearchLink: z.string(),
              defaultJsonValidationOption: z.string(),
              defaultSpec: z.string(),
              description: z.string(),
              descriptiveName: z.string(),
              docMarkdown: z.string(),
              externalCategory: z.string(),
              externalCategorySequence: z.number(),
              externalDocHtml: z.string(),
              externalDocLink: z.string(),
              externalDocMarkdown: z.string(),
              g3DocLink: z.string(),
              iconLink: z.string(),
              isDeprecated: z.boolean(),
              name: z.string(),
              standaloneExternalDocHtml: z.string(),
              status: z.string(),
              system: z.string(),
              tags: z.array(z.string()),
            }),
            paramSpecs: z.object({
              parameters: z.array(z.object({
                className: z.string(),
                collectionElementClassName: z.string(),
                config: z.object({
                  descriptivePhrase: z.string(),
                  helpText: z.string(),
                  hideDefaultValue: z.boolean(),
                  inputDisplayOption: z.string(),
                  isHidden: z.boolean(),
                  label: z.string(),
                  parameterNameOption: z.string(),
                  subSectionLabel: z.string(),
                  uiPlaceholderText: z.string(),
                }),
                dataType: z.string(),
                defaultValue: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()),
                  }),
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    intValues: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  jsonValue: z.string(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.unknown())),
                  }),
                  protoValue: z.record(z.string(), z.unknown()),
                  serializedObjectValue: z.object({
                    objectValue: z.string(),
                  }),
                  stringArray: z.object({
                    stringValues: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
                isDeprecated: z.boolean(),
                isOutput: z.boolean(),
                jsonSchema: z.string(),
                key: z.string(),
                protoDef: z.object({
                  fullName: z.string(),
                  path: z.string(),
                }),
                required: z.boolean(),
                validationRule: z.object({
                  doubleRange: z.object({
                    max: z.number(),
                    min: z.number(),
                  }),
                  intRange: z.object({
                    max: z.string(),
                    min: z.string(),
                  }),
                  stringRegex: z.object({
                    exclusive: z.boolean(),
                    regex: z.string(),
                  }),
                }),
              })),
            }),
            stats: z.object({
              dimensions: z.object({
                clientId: z.string(),
                enumFilterType: z.string(),
                errorEnumString: z.string(),
                retryAttempt: z.string(),
                taskName: z.string(),
                taskNumber: z.string(),
                triggerId: z.string(),
                warningEnumString: z.string(),
                workflowId: z.string(),
                workflowName: z.string(),
              }),
              durationInSeconds: z.number(),
              errorRate: z.number(),
              qps: z.number(),
              warningRate: z.number(),
            }),
            taskType: z.string(),
            uiConfig: z.object({
              taskUiModuleConfigs: z.array(z.object({
                moduleId: z.string(),
              })),
            }),
          }),
          taskExecutionStrategy: z.string(),
          taskName: z.string(),
          taskNumber: z.string(),
          taskSpec: z.string(),
          taskTemplateName: z.string(),
          taskType: z.string(),
        })),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.object({
            creatorEmail: z.string(),
            name: z.string(),
            nextTeardownTask: z.object({
              name: z.string(),
            }),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string(),
                masked: z.boolean(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()),
                  }),
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    intValues: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.unknown())),
                  }),
                  protoValue: z.record(z.string(), z.unknown()),
                  serializedObjectValue: z.object({
                    objectValue: z.string(),
                  }),
                  stringArray: z.object({
                    stringValues: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            }),
            properties: z.object({
              properties: z.array(z.object({
                key: z.string(),
                value: z.object({
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    values: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    values: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoValue: z.record(z.string(), z.unknown()),
                  stringArray: z.object({
                    values: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            }),
            teardownTaskImplementationClassName: z.string(),
          })),
        }),
        triggerConfigs: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string(),
            alertThreshold: z.number(),
            disableAlert: z.boolean(),
            displayName: z.string(),
            durationThreshold: z.string(),
            metricType: z.string(),
            onlyFinalAttempt: z.boolean(),
            thresholdType: z.string(),
            thresholdValue: z.object({
              absolute: z.string(),
              percentage: z.number(),
            }),
          })),
          cloudSchedulerConfig: z.object({
            cronTab: z.string(),
            errorMessage: z.string(),
            location: z.string(),
            serviceAccountEmail: z.string(),
          }),
          description: z.string(),
          errorCatcherId: z.string(),
          inputVariables: z.object({
            names: z.array(z.string()),
          }),
          label: z.string(),
          nextTasksExecutionPolicy: z.string(),
          outputVariables: z.object({
            names: z.array(z.string()),
          }),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          properties: z.record(z.string(), z.unknown()),
          startTasks: z.array(z.object({
            condition: z.string(),
            description: z.string(),
            displayName: z.string(),
            taskConfigId: z.string(),
            taskId: z.string(),
          })),
          trigger: z.string(),
          triggerId: z.string(),
          triggerNumber: z.string(),
          triggerType: z.string(),
        })),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string(),
            alertDisabled: z.boolean(),
            alertName: z.string(),
            clientId: z.string(),
            durationThresholdMs: z.string(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()),
              filterType: z.string(),
            }),
            metricType: z.string(),
            numAggregationPeriods: z.number(),
            onlyFinalAttempt: z.boolean(),
            playbookUrl: z.string(),
            thresholdType: z.string(),
            thresholdValue: z.object({
              absolute: z.string(),
              percentage: z.number(),
            }),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()),
              filterType: z.string(),
            }),
          })),
          cloudSchedulerConfig: z.object({
            cronTab: z.string(),
            errorMessage: z.string(),
            location: z.string(),
            serviceAccountEmail: z.string(),
          }),
          description: z.string(),
          enabledClients: z.array(z.string()),
          errorCatcherId: z.string(),
          inputVariables: z.object({
            names: z.array(z.string()),
          }),
          label: z.string(),
          nextTasksExecutionPolicy: z.string(),
          outputVariables: z.object({
            names: z.array(z.string()),
          }),
          pauseWorkflowExecutions: z.boolean(),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          properties: z.record(z.string(), z.unknown()),
          startTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string(),
                operator: z.string(),
                value: z.object({
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    values: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    values: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoValue: z.record(z.string(), z.unknown()),
                  stringArray: z.object({
                    values: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            })),
            condition: z.string(),
            description: z.string(),
            label: z.string(),
            taskConfigId: z.string(),
            taskNumber: z.string(),
          })),
          triggerCriteria: z.object({
            condition: z.string(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string(),
                masked: z.boolean(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()),
                  }),
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    intValues: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.unknown())),
                  }),
                  protoValue: z.record(z.string(), z.unknown()),
                  serializedObjectValue: z.object({
                    objectValue: z.string(),
                  }),
                  stringArray: z.object({
                    stringValues: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            }),
            triggerCriteriaTaskImplementationClassName: z.string(),
          }),
          triggerId: z.string(),
          triggerName: z.string(),
          triggerNumber: z.string(),
          triggerType: z.string(),
        })),
        updateTime: z.string(),
        userLabel: z.string(),
      }),
      key: z.string(),
    }),
    subIntegrationVersionTemplates: z.array(z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.string(),
          enableCloudLogging: z.boolean(),
        }),
        createTime: z.string(),
        createdFromTemplate: z.string(),
        databasePersistencePolicy: z.string(),
        description: z.string(),
        enableVariableMasking: z.boolean(),
        errorCatcherConfigs: z.array(z.object({
          description: z.string(),
          errorCatcherId: z.string(),
          errorCatcherNumber: z.string(),
          label: z.string(),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          startErrorTasks: z.array(z.object({
            condition: z.string(),
            description: z.string(),
            displayName: z.string(),
            taskConfigId: z.string(),
            taskId: z.string(),
          })),
        })),
        integrationConfigParameters: z.array(z.object({
          parameter: z.object({
            containsLargeData: z.boolean(),
            dataType: z.string(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()),
              }),
              booleanValue: z.boolean(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()),
              }),
              doubleValue: z.number(),
              intArray: z.object({
                intValues: z.array(z.string()),
              }),
              intValue: z.string(),
              jsonValue: z.string(),
              stringArray: z.object({
                stringValues: z.array(z.string()),
              }),
              stringValue: z.string(),
            }),
            description: z.string(),
            displayName: z.string(),
            inputOutputType: z.string(),
            isTransient: z.boolean(),
            jsonSchema: z.string(),
            key: z.string(),
            masked: z.boolean(),
            producer: z.string(),
            searchable: z.boolean(),
          }),
          value: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()),
            }),
            booleanValue: z.boolean(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()),
            }),
            doubleValue: z.number(),
            intArray: z.object({
              intValues: z.array(z.string()),
            }),
            intValue: z.string(),
            jsonValue: z.string(),
            stringArray: z.object({
              stringValues: z.array(z.string()),
            }),
            stringValue: z.string(),
          }),
        })),
        integrationParameters: z.array(z.object({
          containsLargeData: z.boolean(),
          dataType: z.string(),
          defaultValue: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()),
            }),
            booleanValue: z.boolean(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()),
            }),
            doubleValue: z.number(),
            intArray: z.object({
              intValues: z.array(z.string()),
            }),
            intValue: z.string(),
            jsonValue: z.string(),
            stringArray: z.object({
              stringValues: z.array(z.string()),
            }),
            stringValue: z.string(),
          }),
          description: z.string(),
          displayName: z.string(),
          inputOutputType: z.string(),
          isTransient: z.boolean(),
          jsonSchema: z.string(),
          key: z.string(),
          masked: z.boolean(),
          producer: z.string(),
          searchable: z.boolean(),
        })),
        integrationParametersInternal: z.object({
          parameters: z.array(z.object({
            attributes: z.object({
              dataType: z.string(),
              defaultValue: z.object({
                booleanValue: z.boolean(),
                doubleArray: z.object({
                  values: z.array(z.number()),
                }),
                doubleValue: z.number(),
                intArray: z.object({
                  values: z.array(z.string()),
                }),
                intValue: z.string(),
                protoValue: z.record(z.string(), z.unknown()),
                stringArray: z.object({
                  values: z.array(z.string()),
                }),
                stringValue: z.string(),
              }),
              isRequired: z.boolean(),
              isSearchable: z.boolean(),
              logSettings: z.object({
                logFieldName: z.string(),
                seedPeriod: z.string(),
                seedScope: z.string(),
              }),
              masked: z.boolean(),
              readOnly: z.boolean(),
              searchable: z.string(),
              taskVisibility: z.array(z.string()),
            }),
            children: z.array(z.string()),
            containsLargeData: z.boolean(),
            dataType: z.string(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()),
              }),
              booleanValue: z.boolean(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()),
              }),
              doubleValue: z.number(),
              intArray: z.object({
                intValues: z.array(z.string()),
              }),
              intValue: z.string(),
              jsonValue: z.string(),
              protoArray: z.object({
                protoValues: z.array(z.record(z.string(), z.unknown())),
              }),
              protoValue: z.record(z.string(), z.unknown()),
              serializedObjectValue: z.object({
                objectValue: z.string(),
              }),
              stringArray: z.object({
                stringValues: z.array(z.string()),
              }),
              stringValue: z.string(),
            }),
            description: z.string(),
            inOutType: z.string(),
            isTransient: z.boolean(),
            jsonSchema: z.string(),
            key: z.string(),
            name: z.string(),
            producedBy: z.object({
              elementIdentifier: z.string(),
              elementType: z.string(),
            }),
            producer: z.string(),
            protoDefName: z.string(),
            protoDefPath: z.string(),
            required: z.boolean(),
          })),
        }),
        lastModifierEmail: z.string(),
        lockHolder: z.string(),
        name: z.string(),
        origin: z.string(),
        parentTemplateId: z.string(),
        runAsServiceAccount: z.string(),
        snapshotNumber: z.string(),
        state: z.string(),
        status: z.string(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              condition: z.string(),
              intervalTime: z.string(),
              maxRetries: z.number(),
              retryStrategy: z.string(),
            }),
            failurePolicies: z.array(z.object({
              condition: z.string(),
              intervalTime: z.string(),
              maxRetries: z.number(),
              retryStrategy: z.string(),
            })),
          }),
          description: z.string(),
          displayName: z.string(),
          errorCatcherId: z.string(),
          externalTaskType: z.string(),
          failurePolicy: z.object({
            condition: z.string(),
            intervalTime: z.string(),
            maxRetries: z.number(),
            retryStrategy: z.string(),
          }),
          jsonValidationOption: z.string(),
          nextTasks: z.array(z.object({
            condition: z.string(),
            description: z.string(),
            displayName: z.string(),
            taskConfigId: z.string(),
            taskId: z.string(),
          })),
          nextTasksExecutionPolicy: z.string(),
          parameters: z.record(z.string(), z.unknown()),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          successPolicy: z.object({
            finalState: z.string(),
          }),
          synchronousCallFailurePolicy: z.object({
            condition: z.string(),
            intervalTime: z.string(),
            maxRetries: z.number(),
            retryStrategy: z.string(),
          }),
          task: z.string(),
          taskExecutionStrategy: z.string(),
          taskId: z.string(),
          taskTemplate: z.string(),
        })),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.array(z.object({
            aggregationPeriod: z.string(),
            alertDisabled: z.boolean(),
            alertName: z.string(),
            clientId: z.string(),
            durationThresholdMs: z.string(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()),
              filterType: z.string(),
            }),
            metricType: z.string(),
            numAggregationPeriods: z.number(),
            onlyFinalAttempt: z.boolean(),
            playbookUrl: z.string(),
            thresholdType: z.string(),
            thresholdValue: z.object({
              absolute: z.string(),
              percentage: z.number(),
            }),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()),
              filterType: z.string(),
            }),
          })),
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              intervalInSeconds: z.string(),
              maxNumRetries: z.number(),
              retryCondition: z.string(),
              retryStrategy: z.string(),
            }),
            failurePolicies: z.array(z.object({
              intervalInSeconds: z.string(),
              maxNumRetries: z.number(),
              retryCondition: z.string(),
              retryStrategy: z.string(),
            })),
          }),
          createTime: z.string(),
          creatorEmail: z.string(),
          description: z.string(),
          disableStrictTypeValidation: z.boolean(),
          errorCatcherId: z.string(),
          externalTaskType: z.string(),
          failurePolicy: z.object({
            intervalInSeconds: z.string(),
            maxNumRetries: z.number(),
            retryCondition: z.string(),
            retryStrategy: z.string(),
          }),
          incomingEdgeCount: z.number(),
          jsonValidationOption: z.string(),
          label: z.string(),
          lastModifiedTime: z.string(),
          nextTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string(),
                operator: z.string(),
                value: z.object({
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    values: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    values: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoValue: z.record(z.string(), z.unknown()),
                  stringArray: z.object({
                    values: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            })),
            condition: z.string(),
            description: z.string(),
            label: z.string(),
            taskConfigId: z.string(),
            taskNumber: z.string(),
          })),
          nextTasksExecutionPolicy: z.string(),
          parameters: z.record(z.string(), z.unknown()),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          precondition: z.string(),
          preconditionLabel: z.string(),
          rollbackStrategy: z.object({
            parameters: z.object({
              parameters: z.array(z.object({
                dataType: z.string(),
                key: z.string(),
                masked: z.boolean(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()),
                  }),
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    intValues: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  jsonValue: z.string(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.unknown())),
                  }),
                  protoValue: z.record(z.string(), z.unknown()),
                  serializedObjectValue: z.object({
                    objectValue: z.string(),
                  }),
                  stringArray: z.object({
                    stringValues: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            }),
            rollbackTaskImplementationClassName: z.string(),
            taskNumbersToRollback: z.array(z.string()),
          }),
          successPolicy: z.object({
            finalState: z.string(),
          }),
          synchronousCallFailurePolicy: z.object({
            intervalInSeconds: z.string(),
            maxNumRetries: z.number(),
            retryCondition: z.string(),
            retryStrategy: z.string(),
          }),
          taskEntity: z.object({
            disabledForVpcSc: z.boolean(),
            metadata: z.object({
              activeTaskName: z.string(),
              admins: z.array(z.object({
                googleGroupEmail: z.string(),
                userEmail: z.string(),
              })),
              category: z.string(),
              codeSearchLink: z.string(),
              defaultJsonValidationOption: z.string(),
              defaultSpec: z.string(),
              description: z.string(),
              descriptiveName: z.string(),
              docMarkdown: z.string(),
              externalCategory: z.string(),
              externalCategorySequence: z.number(),
              externalDocHtml: z.string(),
              externalDocLink: z.string(),
              externalDocMarkdown: z.string(),
              g3DocLink: z.string(),
              iconLink: z.string(),
              isDeprecated: z.boolean(),
              name: z.string(),
              standaloneExternalDocHtml: z.string(),
              status: z.string(),
              system: z.string(),
              tags: z.array(z.string()),
            }),
            paramSpecs: z.object({
              parameters: z.array(z.object({
                className: z.string(),
                collectionElementClassName: z.string(),
                config: z.object({
                  descriptivePhrase: z.string(),
                  helpText: z.string(),
                  hideDefaultValue: z.boolean(),
                  inputDisplayOption: z.string(),
                  isHidden: z.boolean(),
                  label: z.string(),
                  parameterNameOption: z.string(),
                  subSectionLabel: z.string(),
                  uiPlaceholderText: z.string(),
                }),
                dataType: z.string(),
                defaultValue: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()),
                  }),
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    intValues: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  jsonValue: z.string(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.unknown())),
                  }),
                  protoValue: z.record(z.string(), z.unknown()),
                  serializedObjectValue: z.object({
                    objectValue: z.string(),
                  }),
                  stringArray: z.object({
                    stringValues: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
                isDeprecated: z.boolean(),
                isOutput: z.boolean(),
                jsonSchema: z.string(),
                key: z.string(),
                protoDef: z.object({
                  fullName: z.string(),
                  path: z.string(),
                }),
                required: z.boolean(),
                validationRule: z.object({
                  doubleRange: z.object({
                    max: z.number(),
                    min: z.number(),
                  }),
                  intRange: z.object({
                    max: z.string(),
                    min: z.string(),
                  }),
                  stringRegex: z.object({
                    exclusive: z.boolean(),
                    regex: z.string(),
                  }),
                }),
              })),
            }),
            stats: z.object({
              dimensions: z.object({
                clientId: z.string(),
                enumFilterType: z.string(),
                errorEnumString: z.string(),
                retryAttempt: z.string(),
                taskName: z.string(),
                taskNumber: z.string(),
                triggerId: z.string(),
                warningEnumString: z.string(),
                workflowId: z.string(),
                workflowName: z.string(),
              }),
              durationInSeconds: z.number(),
              errorRate: z.number(),
              qps: z.number(),
              warningRate: z.number(),
            }),
            taskType: z.string(),
            uiConfig: z.object({
              taskUiModuleConfigs: z.array(z.object({
                moduleId: z.string(),
              })),
            }),
          }),
          taskExecutionStrategy: z.string(),
          taskName: z.string(),
          taskNumber: z.string(),
          taskSpec: z.string(),
          taskTemplateName: z.string(),
          taskType: z.string(),
        })),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.object({
            creatorEmail: z.string(),
            name: z.string(),
            nextTeardownTask: z.object({
              name: z.string(),
            }),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string(),
                masked: z.boolean(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()),
                  }),
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    intValues: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.unknown())),
                  }),
                  protoValue: z.record(z.string(), z.unknown()),
                  serializedObjectValue: z.object({
                    objectValue: z.string(),
                  }),
                  stringArray: z.object({
                    stringValues: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            }),
            properties: z.object({
              properties: z.array(z.object({
                key: z.string(),
                value: z.object({
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    values: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    values: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoValue: z.record(z.string(), z.unknown()),
                  stringArray: z.object({
                    values: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            }),
            teardownTaskImplementationClassName: z.string(),
          })),
        }),
        triggerConfigs: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string(),
            alertThreshold: z.number(),
            disableAlert: z.boolean(),
            displayName: z.string(),
            durationThreshold: z.string(),
            metricType: z.string(),
            onlyFinalAttempt: z.boolean(),
            thresholdType: z.string(),
            thresholdValue: z.object({
              absolute: z.string(),
              percentage: z.number(),
            }),
          })),
          cloudSchedulerConfig: z.object({
            cronTab: z.string(),
            errorMessage: z.string(),
            location: z.string(),
            serviceAccountEmail: z.string(),
          }),
          description: z.string(),
          errorCatcherId: z.string(),
          inputVariables: z.object({
            names: z.array(z.string()),
          }),
          label: z.string(),
          nextTasksExecutionPolicy: z.string(),
          outputVariables: z.object({
            names: z.array(z.string()),
          }),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          properties: z.record(z.string(), z.unknown()),
          startTasks: z.array(z.object({
            condition: z.string(),
            description: z.string(),
            displayName: z.string(),
            taskConfigId: z.string(),
            taskId: z.string(),
          })),
          trigger: z.string(),
          triggerId: z.string(),
          triggerNumber: z.string(),
          triggerType: z.string(),
        })),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string(),
            alertDisabled: z.boolean(),
            alertName: z.string(),
            clientId: z.string(),
            durationThresholdMs: z.string(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()),
              filterType: z.string(),
            }),
            metricType: z.string(),
            numAggregationPeriods: z.number(),
            onlyFinalAttempt: z.boolean(),
            playbookUrl: z.string(),
            thresholdType: z.string(),
            thresholdValue: z.object({
              absolute: z.string(),
              percentage: z.number(),
            }),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()),
              filterType: z.string(),
            }),
          })),
          cloudSchedulerConfig: z.object({
            cronTab: z.string(),
            errorMessage: z.string(),
            location: z.string(),
            serviceAccountEmail: z.string(),
          }),
          description: z.string(),
          enabledClients: z.array(z.string()),
          errorCatcherId: z.string(),
          inputVariables: z.object({
            names: z.array(z.string()),
          }),
          label: z.string(),
          nextTasksExecutionPolicy: z.string(),
          outputVariables: z.object({
            names: z.array(z.string()),
          }),
          pauseWorkflowExecutions: z.boolean(),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          properties: z.record(z.string(), z.unknown()),
          startTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string(),
                operator: z.string(),
                value: z.object({
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    values: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    values: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoValue: z.record(z.string(), z.unknown()),
                  stringArray: z.object({
                    values: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            })),
            condition: z.string(),
            description: z.string(),
            label: z.string(),
            taskConfigId: z.string(),
            taskNumber: z.string(),
          })),
          triggerCriteria: z.object({
            condition: z.string(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string(),
                masked: z.boolean(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()),
                  }),
                  booleanValue: z.boolean(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()),
                  }),
                  doubleValue: z.number(),
                  intArray: z.object({
                    intValues: z.array(z.string()),
                  }),
                  intValue: z.string(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.unknown())),
                  }),
                  protoValue: z.record(z.string(), z.unknown()),
                  serializedObjectValue: z.object({
                    objectValue: z.string(),
                  }),
                  stringArray: z.object({
                    stringValues: z.array(z.string()),
                  }),
                  stringValue: z.string(),
                }),
              })),
            }),
            triggerCriteriaTaskImplementationClassName: z.string(),
          }),
          triggerId: z.string(),
          triggerName: z.string(),
          triggerNumber: z.string(),
          triggerType: z.string(),
        })),
        updateTime: z.string(),
        userLabel: z.string(),
      }),
      key: z.string(),
    })),
  }).optional(),
  updateTime: z.string().optional(),
  usageCount: z.string().optional(),
  usageInfo: z.string().optional(),
  visibility: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  author: z.string().describe("Optional. Creator of the template.").optional(),
  categories: z.array(
    z.enum([
      "CATEGORY_UNSPECIFIED",
      "AI_MACHINE_LEARNING",
      "BUSINESS_INTELLIGENCE",
      "COLLABORATION",
      "CUSTOMER_SERVICE",
      "DATABASES",
      "DEVOPS_IT",
      "CONTENT_AND_FILES",
      "FINANCE_AND_ACCOUNTING",
      "HUMAN_RESOURCES",
      "OPERATIONS",
      "PRODUCT_PROJECT_MANAGEMENT",
      "PRODUCTIVITY",
      "SALES_AND_MARKETING",
      "UNIVERSAL_CONNECTORS",
      "UTILITY",
      "OTHERS",
    ]),
  ).describe(
    "Required. Categories associated with the Template. The categories listed below will be utilized for the Template listing.",
  ).optional(),
  components: z.array(z.object({
    name: z.string().describe("Optional. Name of the component.").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "TRIGGER", "TASK", "CONNECTOR"]).describe(
      "Optional. Type of the component.",
    ).optional(),
  })).describe(
    "Optional. Components being used in the template. This could be used to categorize and filter.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the template. The length should not be more than 255 characters",
  ).optional(),
  displayName: z.string().describe("Required. The name of the template")
    .optional(),
  docLink: z.string().describe("Optional. Link to template documentation.")
    .optional(),
  lastUsedTime: z.string().describe(
    "Optional. Time the template was last used.",
  ).optional(),
  name: z.string().describe("Identifier. Resource name of the template.")
    .optional(),
  sharedWith: z.array(z.string()).describe(
    "Required. Resource names with which the template is shared for example ProjectNumber/Ord id",
  ).optional(),
  tags: z.array(z.string()).describe(
    "Required. Tags which are used to identify templates. These tags could be for business use case, connectors etc.",
  ).optional(),
  templateBundle: z.object({
    integrationVersionTemplate: z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string().describe(
          "Optional. Cloud KMS resource name for the CMEK encryption key.",
        ).optional(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.enum([
            "CLOUD_LOGGING_SEVERITY_UNSPECIFIED",
            "INFO",
            "ERROR",
            "WARNING",
          ]).describe(
            "Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed.",
          ).optional(),
          enableCloudLogging: z.boolean().describe(
            "Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed.",
          ).optional(),
        }).describe("Cloud Logging details for execution info").optional(),
        createTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        createdFromTemplate: z.string().describe(
          "Optional. Optional. The resource name of the template from which the integration is created.",
        ).optional(),
        databasePersistencePolicy: z.enum([
          "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED",
          "DATABASE_PERSISTENCE_DISABLED",
          "DATABASE_PERSISTENCE_ASYNC",
        ]).describe(
          "Optional. Flag to disable database persistence for execution data, including event execution info, execution export info, execution metadata index and execution param index.",
        ).optional(),
        description: z.string().describe(
          "Optional. The integration description.",
        ).optional(),
        enableVariableMasking: z.boolean().describe(
          "Optional. True if variable masking feature should be turned on for this version",
        ).optional(),
        errorCatcherConfigs: z.array(z.object({
          description: z.string().describe(
            "Optional. User-provided description intended to give more business context about the error catcher config.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow",
          ).optional(),
          errorCatcherNumber: z.string().describe(
            "Required. A number to uniquely identify each error catcher config within the workflow on UI.",
          ).optional(),
          label: z.string().describe(
            "Optional. The user created label for a particular error catcher. Optional.",
          ).optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          startErrorTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Required. The set of start tasks that are to be executed for the error catch flow",
          ).optional(),
        })).describe(
          "Optional. Error Catch Task configuration for the integration. It's optional.",
        ).optional(),
        integrationConfigParameters: z.array(z.object({
          parameter: z.object({
            containsLargeData: z.boolean().describe(
              "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
            ).optional(),
            dataType: z.enum([
              "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
              "STRING_VALUE",
              "INT_VALUE",
              "DOUBLE_VALUE",
              "BOOLEAN_VALUE",
              "STRING_ARRAY",
              "INT_ARRAY",
              "DOUBLE_ARRAY",
              "BOOLEAN_ARRAY",
              "JSON_VALUE",
              "PROTO_VALUE",
              "PROTO_ARRAY",
              "NON_SERIALIZABLE_OBJECT",
              "PROTO_ENUM",
              "SERIALIZED_OBJECT_VALUE",
              "PROTO_ENUM_ARRAY",
              "BYTES",
              "BYTES_ARRAY",
            ]).describe("Type of the parameter.").optional(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()).describe("Boolean array.")
                  .optional(),
              }).describe(
                "This message only contains a field of boolean array.",
              ).optional(),
              booleanValue: z.boolean().describe("Boolean.").optional(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()).describe(
                  "Double number array.",
                ).optional(),
              }).describe(
                "This message only contains a field of double number array.",
              ).optional(),
              doubleValue: z.number().describe("Double Number.").optional(),
              intArray: z.object({
                intValues: z.array(z.string()).describe("Integer array.")
                  .optional(),
              }).describe(
                "This message only contains a field of integer array.",
              ).optional(),
              intValue: z.string().describe("Integer.").optional(),
              jsonValue: z.string().describe("Json.").optional(),
              stringArray: z.object({
                stringValues: z.array(z.string()).describe("String array.")
                  .optional(),
              }).describe("This message only contains a field of string array.")
                .optional(),
              stringValue: z.string().describe("String.").optional(),
            }).describe("The type of the parameter.").optional(),
            description: z.string().describe(
              "Optional. Description of the parameter.",
            ).optional(),
            displayName: z.string().describe(
              'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
            ).optional(),
            inputOutputType: z.enum([
              "IN_OUT_TYPE_UNSPECIFIED",
              "IN",
              "OUT",
              "IN_OUT",
            ]).describe("Specifies the input/output type for the parameter.")
              .optional(),
            isTransient: z.boolean().describe(
              "Whether this parameter is a transient parameter.",
            ).optional(),
            jsonSchema: z.string().describe(
              "This schema will be used to validate runtime JSON-typed values of this parameter.",
            ).optional(),
            key: z.string().describe(
              "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
            ).optional(),
            masked: z.boolean().describe(
              "True if this parameter should be masked in the logs",
            ).optional(),
            producer: z.string().describe(
              "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
            ).optional(),
            searchable: z.boolean().describe(
              "Searchable in the execution log or not.",
            ).optional(),
          }).describe(
            "Integration Parameter is defined in the integration config and are used to provide information about data types of the expected parameters and provide any default values if needed. They can also be used to add custom attributes. These are static in nature and should not be used for dynamic event definition.",
          ).optional(),
          value: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()).describe("Boolean array.")
                .optional(),
            }).describe("This message only contains a field of boolean array.")
              .optional(),
            booleanValue: z.boolean().describe("Boolean.").optional(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()).describe("Double number array.")
                .optional(),
            }).describe(
              "This message only contains a field of double number array.",
            ).optional(),
            doubleValue: z.number().describe("Double Number.").optional(),
            intArray: z.object({
              intValues: z.array(z.string()).describe("Integer array.")
                .optional(),
            }).describe("This message only contains a field of integer array.")
              .optional(),
            intValue: z.string().describe("Integer.").optional(),
            jsonValue: z.string().describe("Json.").optional(),
            stringArray: z.object({
              stringValues: z.array(z.string()).describe("String array.")
                .optional(),
            }).describe("This message only contains a field of string array.")
              .optional(),
            stringValue: z.string().describe("String.").optional(),
          }).describe("The type of the parameter.").optional(),
        })).describe(
          "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
        ).optional(),
        integrationParameters: z.array(z.object({
          containsLargeData: z.boolean().describe(
            "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
          ).optional(),
          dataType: z.enum([
            "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
            "STRING_VALUE",
            "INT_VALUE",
            "DOUBLE_VALUE",
            "BOOLEAN_VALUE",
            "STRING_ARRAY",
            "INT_ARRAY",
            "DOUBLE_ARRAY",
            "BOOLEAN_ARRAY",
            "JSON_VALUE",
            "PROTO_VALUE",
            "PROTO_ARRAY",
            "NON_SERIALIZABLE_OBJECT",
            "PROTO_ENUM",
            "SERIALIZED_OBJECT_VALUE",
            "PROTO_ENUM_ARRAY",
            "BYTES",
            "BYTES_ARRAY",
          ]).describe("Type of the parameter.").optional(),
          defaultValue: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()).describe("Boolean array.")
                .optional(),
            }).describe("This message only contains a field of boolean array.")
              .optional(),
            booleanValue: z.boolean().describe("Boolean.").optional(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()).describe("Double number array.")
                .optional(),
            }).describe(
              "This message only contains a field of double number array.",
            ).optional(),
            doubleValue: z.number().describe("Double Number.").optional(),
            intArray: z.object({
              intValues: z.array(z.string()).describe("Integer array.")
                .optional(),
            }).describe("This message only contains a field of integer array.")
              .optional(),
            intValue: z.string().describe("Integer.").optional(),
            jsonValue: z.string().describe("Json.").optional(),
            stringArray: z.object({
              stringValues: z.array(z.string()).describe("String array.")
                .optional(),
            }).describe("This message only contains a field of string array.")
              .optional(),
            stringValue: z.string().describe("String.").optional(),
          }).describe("The type of the parameter.").optional(),
          description: z.string().describe(
            "Optional. Description of the parameter.",
          ).optional(),
          displayName: z.string().describe(
            'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
          ).optional(),
          inputOutputType: z.enum([
            "IN_OUT_TYPE_UNSPECIFIED",
            "IN",
            "OUT",
            "IN_OUT",
          ]).describe("Specifies the input/output type for the parameter.")
            .optional(),
          isTransient: z.boolean().describe(
            "Whether this parameter is a transient parameter.",
          ).optional(),
          jsonSchema: z.string().describe(
            "This schema will be used to validate runtime JSON-typed values of this parameter.",
          ).optional(),
          key: z.string().describe(
            "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
          ).optional(),
          masked: z.boolean().describe(
            "True if this parameter should be masked in the logs",
          ).optional(),
          producer: z.string().describe(
            "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
          ).optional(),
          searchable: z.boolean().describe(
            "Searchable in the execution log or not.",
          ).optional(),
        })).describe(
          "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        integrationParametersInternal: z.object({
          parameters: z.array(z.object({
            attributes: z.object({
              dataType: z.enum([
                "DATA_TYPE_UNSPECIFIED",
                "EMAIL",
                "URL",
                "CURRENCY",
                "TIMESTAMP",
                "DOMAIN_NAME",
              ]).describe(
                "Things like URL, Email, Currency, Timestamp (rather than string, int64...)",
              ).optional(),
              defaultValue: z.object({
                booleanValue: z.boolean().optional(),
                doubleArray: z.object({
                  values: z.array(z.number()).optional(),
                }).optional(),
                doubleValue: z.number().optional(),
                intArray: z.object({
                  values: z.array(z.string()).optional(),
                }).optional(),
                intValue: z.string().optional(),
                protoValue: z.record(z.string(), z.string()).optional(),
                stringArray: z.object({
                  values: z.array(z.string()).optional(),
                }).optional(),
                stringValue: z.string().optional(),
              }).describe(
                "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
              ).optional(),
              isRequired: z.boolean().describe(
                "Required for event execution. The validation will be done by the event bus when the event is triggered.",
              ).optional(),
              isSearchable: z.boolean().describe(
                "Used to indicate if a ParameterEntry should be converted to ParamIndexes for ST-Spanner full-text search. DEPRECATED: use searchable.",
              ).optional(),
              logSettings: z.object({
                logFieldName: z.string().describe(
                  "The name of corresponding logging field of the event property. If omitted, assumes the same name as the event property key.",
                ).optional(),
                seedPeriod: z.enum([
                  "SEED_PERIOD_UNSPECIFIED",
                  "DAY",
                  "WEEK",
                  "MONTH",
                ]).optional(),
                seedScope: z.enum([
                  "SEED_SCOPE_UNSPECIFIED",
                  "EVENT_NAME",
                  "TIME_PERIOD",
                  "PARAM_NAME",
                ]).optional(),
              }).describe(
                "The LogSettings define the logging attributes for an event property. These attributes are used to map the property to the parameter in the log proto. Also used to define scrubbing/truncation behavior and PII information.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this workflow parameter should be masked in the logs",
              ).optional(),
              readOnly: z.boolean().describe(
                "Used to indicate if the ParameterEntry is a read only field or not.",
              ).optional(),
              searchable: z.enum(["UNSPECIFIED", "YES", "NO"]).optional(),
              taskVisibility: z.array(z.string()).describe(
                "List of tasks that can view this property, if empty then all.",
              ).optional(),
            }).describe(
              "Attributes are additional options that can be associated with each event property. For more information, see",
            ).optional(),
            children: z.array(z.string()).describe(
              "Child parameters nested within this parameter. This field only applies to protobuf parameters",
            ).optional(),
            containsLargeData: z.boolean().describe(
              "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
            ).optional(),
            dataType: z.enum([
              "DATA_TYPE_UNSPECIFIED",
              "STRING_VALUE",
              "INT_VALUE",
              "DOUBLE_VALUE",
              "BOOLEAN_VALUE",
              "PROTO_VALUE",
              "SERIALIZED_OBJECT_VALUE",
              "STRING_ARRAY",
              "INT_ARRAY",
              "DOUBLE_ARRAY",
              "PROTO_ARRAY",
              "PROTO_ENUM",
              "BOOLEAN_ARRAY",
              "PROTO_ENUM_ARRAY",
              "BYTES",
              "BYTES_ARRAY",
              "NON_SERIALIZABLE_OBJECT",
              "JSON_VALUE",
            ]).describe("The data type of the parameter.").optional(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()).optional(),
              }).optional(),
              booleanValue: z.boolean().optional(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()).optional(),
              }).optional(),
              doubleValue: z.number().optional(),
              intArray: z.object({
                intValues: z.array(z.string()).optional(),
              }).optional(),
              intValue: z.string().optional(),
              jsonValue: z.string().optional(),
              protoArray: z.object({
                protoValues: z.array(z.record(z.string(), z.string()))
                  .optional(),
              }).optional(),
              protoValue: z.record(z.string(), z.string()).optional(),
              serializedObjectValue: z.object({
                objectValue: z.string().optional(),
              }).optional(),
              stringArray: z.object({
                stringValues: z.array(z.string()).optional(),
              }).optional(),
              stringValue: z.string().optional(),
            }).describe(
              "To support various types of parameter values. Next available id: 14",
            ).optional(),
            description: z.string().describe(
              "Optional. The description about the parameter",
            ).optional(),
            inOutType: z.enum([
              "IN_OUT_TYPE_UNSPECIFIED",
              "IN",
              "OUT",
              "IN_OUT",
            ]).describe("Specifies the input/output type for the parameter.")
              .optional(),
            isTransient: z.boolean().describe(
              "Whether this parameter is a transient parameter.",
            ).optional(),
            jsonSchema: z.string().describe(
              "This schema will be used to validate runtime JSON-typed values of this parameter.",
            ).optional(),
            key: z.string().describe(
              "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
            ).optional(),
            name: z.string().describe(
              'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
            ).optional(),
            producedBy: z.object({
              elementIdentifier: z.string().describe(
                "Configuration of the edge.",
              ).optional(),
              elementType: z.enum([
                "UNKNOWN_TYPE",
                "TASK_CONFIG",
                "TRIGGER_CONFIG",
              ]).describe(
                "Destination node where the edge ends. It can only be a task config.",
              ).optional(),
            }).describe(
              "Represents a node identifier (type + id). Next highest id: 3",
            ).optional(),
            producer: z.string().optional(),
            protoDefName: z.string().describe(
              "The name of the protobuf type if the parameter has a protobuf data type.",
            ).optional(),
            protoDefPath: z.string().describe(
              'If the data type is of type proto or proto array, this field needs to be populated with the fully qualified proto name. This message, for example, would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry".',
            ).optional(),
            required: z.boolean().optional(),
          })).describe(
            "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
          ).optional(),
        }).describe(
          "LINT.IfChange This is the frontend version of WorkflowParameters. It's exactly like the backend version except that instead of flattening protobuf parameters and treating every field and subfield of a protobuf parameter as a separate parameter, the fields/subfields of a protobuf parameter will be nested as \"children\" (see 'children' field below) parameters of the parent parameter. Please refer to enterprise/crm/eventbus/proto/workflow_parameters.proto for more information about WorkflowParameters.",
        ).optional(),
        lastModifierEmail: z.string().describe(
          "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        lockHolder: z.string().describe(
          "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        name: z.string().describe("Output only. Auto-generated primary key.")
          .optional(),
        origin: z.enum([
          "UNSPECIFIED",
          "UI",
          "PIPER_V2",
          "PIPER_V3",
          "APPLICATION_IP_PROVISIONING",
          "TEST_CASE",
        ]).describe(
          "Optional. The origin that indicates where this integration is coming from.",
        ).optional(),
        parentTemplateId: z.string().describe(
          "Optional. The id of the template which was used to create this integration_version.",
        ).optional(),
        runAsServiceAccount: z.string().describe(
          "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
        ).optional(),
        snapshotNumber: z.string().describe(
          'Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head.',
        ).optional(),
        state: z.enum([
          "INTEGRATION_STATE_UNSPECIFIED",
          "DRAFT",
          "ACTIVE",
          "ARCHIVED",
          "SNAPSHOT",
        ]).describe("Output only. User should not set it as an input.")
          .optional(),
        status: z.enum(["UNKNOWN", "DRAFT", "ACTIVE", "ARCHIVED", "SNAPSHOT"])
          .describe(
            "Output only. Generated by eventbus. User should not set it as an input.",
          ).optional(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              condition: z.string().describe(
                "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
              ).optional(),
              intervalTime: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
              ).optional(),
              maxRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryStrategy: z.enum([
                "RETRY_STRATEGY_UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_INTEGRATION_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            }).describe(
              "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
            ).optional(),
            failurePolicies: z.array(z.object({
              condition: z.string().describe(
                "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
              ).optional(),
              intervalTime: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
              ).optional(),
              maxRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryStrategy: z.enum([
                "RETRY_STRATEGY_UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_INTEGRATION_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            })).describe(
              "The list of failure policies that will be applied to the task in order.",
            ).optional(),
          }).describe("Conditional task failur retry strategies").optional(),
          description: z.string().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          displayName: z.string().describe(
            "Optional. User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.enum([
            "EXTERNAL_TASK_TYPE_UNSPECIFIED",
            "NORMAL_TASK",
            "ERROR_TASK",
          ]).describe("Optional. External task type of the task").optional(),
          failurePolicy: z.object({
            condition: z.string().describe(
              "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
            ).optional(),
            intervalTime: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
            ).optional(),
            maxRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryStrategy: z.enum([
              "RETRY_STRATEGY_UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_INTEGRATION_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          jsonValidationOption: z.enum([
            "JSON_VALIDATION_OPTION_UNSPECIFIED",
            "SKIP",
            "PRE_EXECUTION",
            "POST_EXECUTION",
            "PRE_POST_EXECUTION",
          ]).describe(
            "Optional. If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          nextTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe(
            "Optional. The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.record(
            z.string(),
            z.object({
              key: z.string().describe(
                "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this parameter should be masked in the logs",
              ).optional(),
              value: z.object({
                booleanArray: z.object({
                  booleanValues: z.array(z.boolean()).describe("Boolean array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of boolean array.",
                ).optional(),
                booleanValue: z.boolean().describe("Boolean.").optional(),
                doubleArray: z.object({
                  doubleValues: z.array(z.number()).describe(
                    "Double number array.",
                  ).optional(),
                }).describe(
                  "This message only contains a field of double number array.",
                ).optional(),
                doubleValue: z.number().describe("Double Number.").optional(),
                intArray: z.object({
                  intValues: z.array(z.string()).describe("Integer array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of integer array.",
                ).optional(),
                intValue: z.string().describe("Integer.").optional(),
                jsonValue: z.string().describe("Json.").optional(),
                stringArray: z.object({
                  stringValues: z.array(z.string()).describe("String array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of string array.",
                ).optional(),
                stringValue: z.string().describe("String.").optional(),
              }).describe("The type of the parameter.").optional(),
            }),
          ).describe(
            "Optional. The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          successPolicy: z.object({
            finalState: z.enum([
              "FINAL_STATE_UNSPECIFIED",
              "SUCCEEDED",
              "SUSPENDED",
            ]).describe(
              "State to which the execution snapshot status will be set if the task succeeds.",
            ).optional(),
          }).describe(
            "Policy that dictates the behavior for the task after it completes successfully.",
          ).optional(),
          synchronousCallFailurePolicy: z.object({
            condition: z.string().describe(
              "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
            ).optional(),
            intervalTime: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
            ).optional(),
            maxRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryStrategy: z.enum([
              "RETRY_STRATEGY_UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_INTEGRATION_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          task: z.string().describe("Optional. The name for the task.")
            .optional(),
          taskExecutionStrategy: z.enum([
            "TASK_EXECUTION_STRATEGY_UNSPECIFIED",
            "WHEN_ALL_SUCCEED",
            "WHEN_ANY_SUCCEED",
            "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
          ]).describe(
            "Optional. The policy dictating the execution strategy of this task.",
          ).optional(),
          taskId: z.string().describe(
            "Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`).",
          ).optional(),
          taskTemplate: z.string().describe(
            "Optional. Used to define task-template name if task is of type task-template",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week).",
            ).optional(),
            alertDisabled: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert.",
            ).optional(),
            alertName: z.string().describe(
              "A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique in within the scope of the containing workflow.",
            ).optional(),
            clientId: z.string().describe(
              "Client associated with this alert configuration. Must be a client enabled in one of the containing workflow's triggers.",
            ).optional(),
            durationThresholdMs: z.string().describe(
              "Should be specified only for TASK_AVERAGE_DURATION and TASK_PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).optional(),
            numAggregationPeriods: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            onlyFinalAttempt: z.boolean().describe(
              "Only count final task attempts, not retries.",
            ).optional(),
            playbookUrl: z.string().describe(
              "Link to a playbook for resolving the issue that triggered this alert.",
            ).optional(),
            thresholdType: z.enum([
              "UNSPECIFIED_THRESHOLD_TYPE",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().optional(),
              percentage: z.number().int().optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
          })).describe(
            "Alert configurations on error rate, warning rate, number of runs, durations, etc.",
          ).optional(),
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              intervalInSeconds: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
              ).optional(),
              maxNumRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryCondition: z.string().describe(
                "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
              ).optional(),
              retryStrategy: z.enum([
                "UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_WORKFLOW_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            }).describe(
              "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
            ).optional(),
            failurePolicies: z.array(z.object({
              intervalInSeconds: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
              ).optional(),
              maxNumRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryCondition: z.string().describe(
                "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
              ).optional(),
              retryStrategy: z.enum([
                "UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_WORKFLOW_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            })).describe(
              "The list of failure policies that will be applied to the task in order.",
            ).optional(),
          }).optional(),
          createTime: z.string().describe("Auto-generated.").optional(),
          creatorEmail: z.string().describe(
            "The creator's email address. Auto-generated from the user's email.",
          ).optional(),
          description: z.string().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          disableStrictTypeValidation: z.boolean().describe(
            "If this config contains a TypedTask, allow validation to succeed if an input is read from the output of another TypedTask whose output type is declared as a superclass of the requested input type. For instance, if the previous task declares an output of type Message, any task with this flag enabled will pass validation when attempting to read any proto Message type from the resultant Event parameter.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.enum([
            "EXTERNAL_TASK_TYPE_UNSPECIFIED",
            "NORMAL_TASK",
            "ERROR_TASK",
          ]).optional(),
          failurePolicy: z.object({
            intervalInSeconds: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
            ).optional(),
            maxNumRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryCondition: z.string().describe(
              "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
            ).optional(),
            retryStrategy: z.enum([
              "UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_WORKFLOW_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          incomingEdgeCount: z.number().int().describe(
            "The number of edges leading into this TaskConfig.",
          ).optional(),
          jsonValidationOption: z.enum([
            "UNSPECIFIED_JSON_VALIDATION_OPTION",
            "SKIP",
            "PRE_EXECUTION",
            "POST_EXECUTION",
            "PRE_POST_EXECUTION",
          ]).describe(
            "If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          label: z.string().describe(
            "User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          lastModifiedTime: z.string().describe("Auto-generated.").optional(),
          nextTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string().describe(
                  "Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown.",
                ).optional(),
                operator: z.enum([
                  "UNSET",
                  "EQUALS",
                  "CONTAINS",
                  "LESS_THAN",
                  "GREATER_THAN",
                  "EXISTS",
                  "DOES_NOT_EXIST",
                  "IS_EMPTY",
                  "IS_NOT_EMPTY",
                ]).describe(
                  "Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("A set of individual constituent conditions.")
                .optional(),
            })).describe(
              "Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition`",
            ).optional(),
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give more business context about the next task edge or condition.",
            ).optional(),
            label: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskNumber: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe(
            "The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.record(
            z.string(),
            z.object({
              dataType: z.enum([
                "DATA_TYPE_UNSPECIFIED",
                "STRING_VALUE",
                "INT_VALUE",
                "DOUBLE_VALUE",
                "BOOLEAN_VALUE",
                "PROTO_VALUE",
                "SERIALIZED_OBJECT_VALUE",
                "STRING_ARRAY",
                "INT_ARRAY",
                "DOUBLE_ARRAY",
                "PROTO_ARRAY",
                "PROTO_ENUM",
                "BOOLEAN_ARRAY",
                "PROTO_ENUM_ARRAY",
                "BYTES",
                "BYTES_ARRAY",
                "NON_SERIALIZABLE_OBJECT",
                "JSON_VALUE",
              ]).describe("Explicitly getting the type of the parameter.")
                .optional(),
              key: z.string().describe(
                "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this parameter should be masked in the logs",
              ).optional(),
              value: z.object({
                booleanArray: z.object({
                  booleanValues: z.array(z.boolean()).optional(),
                }).optional(),
                booleanValue: z.boolean().optional(),
                doubleArray: z.object({
                  doubleValues: z.array(z.number()).optional(),
                }).optional(),
                doubleValue: z.number().optional(),
                intArray: z.object({
                  intValues: z.array(z.string()).optional(),
                }).optional(),
                intValue: z.string().optional(),
                jsonValue: z.string().optional(),
                protoArray: z.object({
                  protoValues: z.array(z.record(z.string(), z.string()))
                    .optional(),
                }).optional(),
                protoValue: z.record(z.string(), z.string()).optional(),
                serializedObjectValue: z.object({
                  objectValue: z.string().optional(),
                }).optional(),
                stringArray: z.object({
                  stringValues: z.array(z.string()).optional(),
                }).optional(),
                stringValue: z.string().optional(),
              }).describe(
                "To support various types of parameter values. Next available id: 14",
              ).optional(),
            }),
          ).describe(
            "The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.object({
            x: z.number().int().optional(),
            y: z.number().int().optional(),
          }).describe("Represents two-dimensional positions.").optional(),
          precondition: z.string().describe(
            'Optional. Standard filter expression evaluated before execution. Independent of other conditions and tasks. Can be used to enable rollout. e.g. "rollout(5)" will only allow 5% of incoming traffic to task.',
          ).optional(),
          preconditionLabel: z.string().describe(
            "Optional. User-provided label that is attached to precondition in the UI.",
          ).optional(),
          rollbackStrategy: z.object({
            parameters: z.object({
              parameters: z.array(z.object({
                dataType: z.enum([
                  "DATA_TYPE_UNSPECIFIED",
                  "STRING_VALUE",
                  "INT_VALUE",
                  "DOUBLE_VALUE",
                  "BOOLEAN_VALUE",
                  "PROTO_VALUE",
                  "SERIALIZED_OBJECT_VALUE",
                  "STRING_ARRAY",
                  "INT_ARRAY",
                  "DOUBLE_ARRAY",
                  "PROTO_ARRAY",
                  "PROTO_ENUM",
                  "BOOLEAN_ARRAY",
                  "PROTO_ENUM_ARRAY",
                  "BYTES",
                  "BYTES_ARRAY",
                  "NON_SERIALIZABLE_OBJECT",
                  "JSON_VALUE",
                ]).describe("Explicitly getting the type of the parameter.")
                  .optional(),
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  jsonValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same workflow execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            rollbackTaskImplementationClassName: z.string().describe(
              "Required. This is the name of the task that needs to be executed upon rollback of this task.",
            ).optional(),
            taskNumbersToRollback: z.array(z.string()).describe(
              "Required. These are the tasks numbers of the tasks whose `rollback_strategy.rollback_task_implementation_class_name` needs to be executed upon failure of this task.",
            ).optional(),
          }).describe("Next available id: 4").optional(),
          successPolicy: z.object({
            finalState: z.enum(["UNSPECIFIED", "SUCCEEDED", "SUSPENDED"])
              .describe(
                "State to which the execution snapshot status will be set if the task succeeds.",
              ).optional(),
          }).describe(
            "Policy that dictates the behavior for the task after it completes successfully.",
          ).optional(),
          synchronousCallFailurePolicy: z.object({
            intervalInSeconds: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
            ).optional(),
            maxNumRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryCondition: z.string().describe(
              "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
            ).optional(),
            retryStrategy: z.enum([
              "UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_WORKFLOW_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          taskEntity: z.object({
            disabledForVpcSc: z.boolean().describe(
              "True if the task has conflict with vpcsc",
            ).optional(),
            metadata: z.object({
              activeTaskName: z.string().describe(
                "The new task name to replace the current task if it is deprecated. Otherwise, it is the same as the current task name.",
              ).optional(),
              admins: z.array(z.object({
                googleGroupEmail: z.string().optional(),
                userEmail: z.string().optional(),
              })).optional(),
              category: z.enum([
                "UNSPECIFIED_CATEGORY",
                "CUSTOM",
                "FLOW_CONTROL",
                "DATA_MANIPULATION",
                "SCRIPTING",
                "CONNECTOR",
                "HIDDEN",
                "CLOUD_SYSTEMS",
                "CUSTOM_TASK_TEMPLATE",
                "TASK_RECOMMENDATIONS",
              ]).optional(),
              codeSearchLink: z.string().describe(
                "The Code Search link to the Task Java file.",
              ).optional(),
              defaultJsonValidationOption: z.enum([
                "UNSPECIFIED_JSON_VALIDATION_OPTION",
                "SKIP",
                "PRE_EXECUTION",
                "POST_EXECUTION",
                "PRE_POST_EXECUTION",
              ]).describe(
                "Controls whether JSON workflow parameters are validated against provided schemas before and/or after this task's execution.",
              ).optional(),
              defaultSpec: z.string().describe(
                "Contains the initial configuration of the task with default values set. For now, The string should be compatible to an ASCII-proto format.",
              ).optional(),
              description: z.string().describe(
                "In a few sentences, describe the purpose and usage of the task.",
              ).optional(),
              descriptiveName: z.string().describe(
                'The string name to show on the task list on the Workflow editor screen. This should be a very short, one to two words name for the task. (e.g. "Send Mail")',
              ).optional(),
              docMarkdown: z.string().describe(
                "Snippet of markdown documentation to embed in the RHP for this task.",
              ).optional(),
              externalCategory: z.enum([
                "UNSPECIFIED_EXTERNAL_CATEGORY",
                "CORE",
                "CONNECTORS",
                "EXTERNAL_HTTP",
                "EXTERNAL_INTEGRATION_SERVICES",
                "EXTERNAL_CUSTOMER_ACTIONS",
                "EXTERNAL_FLOW_CONTROL",
                "EXTERNAL_WORKSPACE",
                "EXTERNAL_SECURITY",
                "EXTERNAL_DATABASES",
                "EXTERNAL_ANALYTICS",
                "EXTERNAL_BYOC",
                "EXTERNAL_BYOT",
                "EXTERNAL_ARTIFICIAL_INTELIGENCE",
                "EXTERNAL_DATA_MANIPULATION",
              ]).optional(),
              externalCategorySequence: z.number().int().describe(
                "Sequence with which the task in specific category to be displayed in task discovery panel for external users.",
              ).optional(),
              externalDocHtml: z.string().describe(
                "External-facing documention embedded in the RHP for this task.",
              ).optional(),
              externalDocLink: z.string().describe(
                "Doc link for external-facing documentation (separate from g3doc).",
              ).optional(),
              externalDocMarkdown: z.string().describe(
                "DEPRECATED: Use external_doc_html.",
              ).optional(),
              g3DocLink: z.string().describe(
                "URL to the associated G3 Doc for the task if available",
              ).optional(),
              iconLink: z.string().describe(
                "URL to gstatic image icon for this task. This icon shows up on the task list panel along with the task name in the Workflow Editor screen. Use the 24p, 2x, gray color icon image format.",
              ).optional(),
              isDeprecated: z.boolean().describe(
                "The deprecation status of the current task. Default value is false;",
              ).optional(),
              name: z.string().describe(
                "The actual class name or the annotated name of the task. Task Author should initialize this field with value from the getName() method of the Task class.",
              ).optional(),
              standaloneExternalDocHtml: z.string().describe(
                "External-facing documention for standalone IP in pantheon embedded in the RHP for this task. Non null only if different from external_doc_html",
              ).optional(),
              status: z.enum([
                "UNSPECIFIED_STATUS",
                "DEFAULT_INACTIVE",
                "ACTIVE",
              ]).describe(
                "Allows author to indicate if the task is ready to use or not. If not set, then it will default to INACTIVE.",
              ).optional(),
              system: z.enum([
                "UNSPECIFIED_SYSTEM",
                "GENERIC",
                "BUGANIZER",
                "SALESFORCE",
                "CLOUD_SQL",
                "PLX",
                "SHEETS",
                "GOOGLE_GROUPS",
                "EMAIL",
                "SPANNER",
                "DATA_BRIDGE",
              ]).optional(),
              tags: z.array(z.string()).describe(
                'A set of tags that pertain to a particular task. This can be used to improve the searchability of tasks with several names ("REST Caller" vs. "Call REST Endpoint") or to help users find tasks based on related words.',
              ).optional(),
            }).describe(
              "TaskMetadata are attributes that are associated to every common Task we have.",
            ).optional(),
            paramSpecs: z.object({
              parameters: z.array(z.object({
                className: z.string().describe(
                  'The FQCN of the Java object this represents. A string, for example, would be "java.lang.String". If this is "java.lang.Object", the parameter can be of any type.',
                ).optional(),
                collectionElementClassName: z.string().describe(
                  'If it is a collection of objects, this would be the FCQN of every individual element in the collection. If this is "java.lang.Object", the parameter is a collection of any type.',
                ).optional(),
                config: z.object({
                  descriptivePhrase: z.string().describe(
                    "A short phrase to describe what this parameter contains.",
                  ).optional(),
                  helpText: z.string().describe(
                    "Detailed help text for this parameter containing information not provided elsewhere. For example, instructions on how to migrate from a deprecated parameter.",
                  ).optional(),
                  hideDefaultValue: z.boolean().describe(
                    "Whether the default value is hidden in the UI.",
                  ).optional(),
                  inputDisplayOption: z.enum([
                    "DEFAULT",
                    "STRING_MULTI_LINE",
                    "NUMBER_SLIDER",
                    "BOOLEAN_TOGGLE",
                  ]).optional(),
                  isHidden: z.boolean().describe(
                    "Whether this field is hidden in the UI.",
                  ).optional(),
                  label: z.string().describe(
                    "A user-friendly label for the parameter.",
                  ).optional(),
                  parameterNameOption: z.enum([
                    "DEFAULT_NOT_PARAMETER_NAME",
                    "IS_PARAMETER_NAME",
                    "KEY_IS_PARAMETER_NAME",
                    "VALUE_IS_PARAMETER_NAME",
                  ]).optional(),
                  subSectionLabel: z.string().describe(
                    "A user-friendly label for subSection under which the parameter will be displayed.",
                  ).optional(),
                  uiPlaceholderText: z.string().describe(
                    "Placeholder text which will appear in the UI input form for this parameter.",
                  ).optional(),
                }).optional(),
                dataType: z.enum([
                  "DATA_TYPE_UNSPECIFIED",
                  "STRING_VALUE",
                  "INT_VALUE",
                  "DOUBLE_VALUE",
                  "BOOLEAN_VALUE",
                  "PROTO_VALUE",
                  "SERIALIZED_OBJECT_VALUE",
                  "STRING_ARRAY",
                  "INT_ARRAY",
                  "DOUBLE_ARRAY",
                  "PROTO_ARRAY",
                  "PROTO_ENUM",
                  "BOOLEAN_ARRAY",
                  "PROTO_ENUM_ARRAY",
                  "BYTES",
                  "BYTES_ARRAY",
                  "NON_SERIALIZABLE_OBJECT",
                  "JSON_VALUE",
                ]).describe("The data type of the parameter.").optional(),
                defaultValue: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  jsonValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "To support various types of parameter values. Next available id: 14",
                ).optional(),
                isDeprecated: z.boolean().describe(
                  "If set, this entry is deprecated, so further use of this parameter should be prohibited.",
                ).optional(),
                isOutput: z.boolean().optional(),
                jsonSchema: z.string().describe(
                  "If the data_type is JSON_VALUE, then this will define its schema.",
                ).optional(),
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given task. These parameters must be predefined in the workflow definition.",
                ).optional(),
                protoDef: z.object({
                  fullName: z.string().describe(
                    'The fully-qualified proto name. This message, for example, would be "enterprise.crm.eventbus.proto.ParamSpecEntry.ProtoDefinition".',
                  ).optional(),
                  path: z.string().describe(
                    "Path to the proto file that contains the message type's definition.",
                  ).optional(),
                }).optional(),
                required: z.boolean().describe(
                  "If set, the user must provide an input value for this parameter.",
                ).optional(),
                validationRule: z.object({
                  doubleRange: z.object({
                    max: z.number().describe(
                      "The inclusive maximum of the acceptable range.",
                    ).optional(),
                    min: z.number().describe(
                      "The inclusive minimum of the acceptable range.",
                    ).optional(),
                  }).describe("Range used to validate doubles and floats.")
                    .optional(),
                  intRange: z.object({
                    max: z.string().describe(
                      "The inclusive maximum of the acceptable range.",
                    ).optional(),
                    min: z.string().describe(
                      "The inclusive minimum of the acceptable range.",
                    ).optional(),
                  }).describe("Range used to validate longs and ints.")
                    .optional(),
                  stringRegex: z.object({
                    exclusive: z.boolean().describe(
                      "Whether the regex matcher is applied exclusively (if true, matching values will be rejected).",
                    ).optional(),
                    regex: z.string().describe(
                      "The regex applied to the input value(s).",
                    ).optional(),
                  }).describe("Rule used to validate strings.").optional(),
                }).optional(),
              })).optional(),
            }).optional(),
            stats: z.object({
              dimensions: z.object({
                clientId: z.string().optional(),
                enumFilterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"])
                  .describe(
                    "Whether to include or exclude the enums matching the regex.",
                  ).optional(),
                errorEnumString: z.string().optional(),
                retryAttempt: z.enum([
                  "UNSPECIFIED",
                  "FINAL",
                  "RETRYABLE",
                  "CANCELED",
                ]).optional(),
                taskName: z.string().optional(),
                taskNumber: z.string().optional(),
                triggerId: z.string().describe(
                  "Stats have been or will be aggregated on set fields for any semantically-meaningful combination.",
                ).optional(),
                warningEnumString: z.string().optional(),
                workflowId: z.string().optional(),
                workflowName: z.string().optional(),
              }).optional(),
              durationInSeconds: z.number().describe(
                "Average duration in seconds.",
              ).optional(),
              errorRate: z.number().describe("Average error rate.").optional(),
              qps: z.number().describe("Queries per second.").optional(),
              warningRate: z.number().describe("Average warning rate.")
                .optional(),
            }).describe(
              "Stats for the requested dimensions: QPS, duration, and error/warning rate",
            ).optional(),
            taskType: z.enum(["TASK", "ASIS_TEMPLATE", "IO_TEMPLATE"]).describe(
              "Defines the type of the task",
            ).optional(),
            uiConfig: z.object({
              taskUiModuleConfigs: z.array(z.object({
                moduleId: z.enum([
                  "UNSPECIFIED_TASK_MODULE",
                  "LABEL",
                  "ERROR_HANDLING",
                  "TASK_PARAM_TABLE",
                  "TASK_PARAM_FORM",
                  "PRECONDITION",
                  "SCRIPT_EDITOR",
                  "RPC",
                  "TASK_SUMMARY",
                  "SUSPENSION",
                  "RPC_TYPED",
                  "SUB_WORKFLOW",
                  "APPS_SCRIPT_NAVIGATOR",
                  "SUB_WORKFLOW_FOR_EACH_LOOP",
                  "FIELD_MAPPING",
                  "README",
                  "REST_CALLER",
                  "SUB_WORKFLOW_SCATTER_GATHER",
                  "CLOUD_SQL",
                  "GENERIC_CONNECTOR_TASK",
                ]).describe("ID of the config module.").optional(),
              })).describe("Configurations of included config modules.")
                .optional(),
            }).describe(
              "Task authors would use this type to configure the UI for a particular task by specifying what UI config modules should be included to compose the UI. Learn more about config module framework:",
            ).optional(),
          }).describe(
            "Contains a task's metadata and associated information. Next available id: 7",
          ).optional(),
          taskExecutionStrategy: z.enum([
            "WHEN_ALL_SUCCEED",
            "WHEN_ANY_SUCCEED",
            "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
          ]).describe(
            "The policy dictating the execution strategy of this task.",
          ).optional(),
          taskName: z.string().describe("The name for the task.").optional(),
          taskNumber: z.string().describe(
            "REQUIRED: the identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_number`).",
          ).optional(),
          taskSpec: z.string().describe(
            'A string template that allows user to configure task parameters (with either literal default values or tokens which will be resolved at execution time) for the task. It will eventually replace the old "parameters" field.',
          ).optional(),
          taskTemplateName: z.string().describe(
            "Used to define task-template name if task is of type task-template",
          ).optional(),
          taskType: z.enum(["TASK", "ASIS_TEMPLATE", "IO_TEMPLATE"]).describe(
            "Defines the type of the task",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.object({
            creatorEmail: z.string().describe("The creator's email address.")
              .optional(),
            name: z.string().describe(
              "Required. Unique identifier of the teardown task within this Config. We use this field as the identifier to find next teardown tasks.",
            ).optional(),
            nextTeardownTask: z.object({
              name: z.string().describe(
                "Required. Name of the next teardown task.",
              ).optional(),
            }).describe(
              "The teardown task that is next in line to be executed. We support only sequential execution of teardown tasks (i.e. no branching).",
            ).optional(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "LINT.IfChange To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            properties: z.object({
              properties: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding property value. This should be unique for a given fired event. The Tasks should be aware of the keys used while firing the events for them to be able to retrieve the values.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("An unordered list of property entries.").optional(),
            }).describe(
              "LINT.IfChange This message is used for storing key value pair properties for each Event / Task in the EventBus.",
            ).optional(),
            teardownTaskImplementationClassName: z.string().describe(
              "Required. Implementation class name.",
            ).optional(),
          })).describe("Required.").optional(),
        }).optional(),
        triggerConfigs: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
            ).optional(),
            alertThreshold: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            disableAlert: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this integration alert.",
            ).optional(),
            displayName: z.string().describe(
              "Name of the alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the integration.",
            ).optional(),
            durationThreshold: z.string().describe(
              "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "EVENT_ERROR_RATE",
              "EVENT_WARNING_RATE",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "EVENT_RATE",
              "EVENT_AVERAGE_DURATION",
              "EVENT_PERCENTILE_DURATION",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).describe("The type of metric.").optional(),
            onlyFinalAttempt: z.boolean().describe(
              "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
            ).optional(),
            thresholdType: z.enum([
              "THRESHOLD_TYPE_UNSPECIFIED",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().describe("Absolute value threshold.")
                .optional(),
              percentage: z.number().int().describe("Percentage threshold.")
                .optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
          })).describe(
            "Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published.",
          ).optional(),
          cloudSchedulerConfig: z.object({
            cronTab: z.string().describe(
              "Required. The cron tab of cloud scheduler trigger.",
            ).optional(),
            errorMessage: z.string().describe(
              "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
            ).optional(),
            location: z.string().describe(
              "Required. The location where associated cloud scheduler job will be created",
            ).optional(),
            serviceAccountEmail: z.string().describe(
              "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
            ).optional(),
          }).describe("Cloud Scheduler Trigger configuration").optional(),
          description: z.string().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          label: z.string().describe(
            "Optional. The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe("Optional. Dictates how next tasks will be executed.")
            .optional(),
          outputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          properties: z.record(z.string(), z.string()).describe(
            'Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers.',
          ).optional(),
          startTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph).",
          ).optional(),
          trigger: z.string().describe(
            'Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose.',
          ).optional(),
          triggerId: z.string().describe(
            'Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME}',
          ).optional(),
          triggerNumber: z.string().describe(
            "Required. A number to uniquely identify each trigger config within the integration on UI.",
          ).optional(),
          triggerType: z.enum([
            "TRIGGER_TYPE_UNSPECIFIED",
            "CRON",
            "API",
            "SFDC_CHANNEL",
            "CLOUD_PUBSUB_EXTERNAL",
            "SFDC_CDC_CHANNEL",
            "CLOUD_SCHEDULER",
            "INTEGRATION_CONNECTOR_TRIGGER",
            "PRIVATE_TRIGGER",
            "CLOUD_PUBSUB",
            "EVENTARC_TRIGGER",
          ]).describe("Optional. Type of trigger").optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
            ).optional(),
            alertDisabled: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert.",
            ).optional(),
            alertName: z.string().describe(
              "A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the workflow.",
            ).optional(),
            clientId: z.string().describe(
              "Client associated with this alert configuration.",
            ).optional(),
            durationThresholdMs: z.string().describe(
              "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "EVENT_ERROR_RATE",
              "EVENT_WARNING_RATE",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "EVENT_RATE",
              "EVENT_AVERAGE_DURATION",
              "EVENT_PERCENTILE_DURATION",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).optional(),
            numAggregationPeriods: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            onlyFinalAttempt: z.boolean().describe(
              "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
            ).optional(),
            playbookUrl: z.string().describe(
              "Link to a playbook for resolving the issue that triggered this alert.",
            ).optional(),
            thresholdType: z.enum([
              "UNSPECIFIED_THRESHOLD_TYPE",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().optional(),
              percentage: z.number().int().optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
          })).describe(
            "An alert threshold configuration for the [trigger + client + workflow] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + workflow] when published.",
          ).optional(),
          cloudSchedulerConfig: z.object({
            cronTab: z.string().describe(
              "Required. The cron tab of cloud scheduler trigger.",
            ).optional(),
            errorMessage: z.string().describe(
              "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
            ).optional(),
            location: z.string().describe(
              "Required. The location where associated cloud scheduler job will be created",
            ).optional(),
            serviceAccountEmail: z.string().describe(
              "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
            ).optional(),
          }).describe("Cloud Scheduler Trigger configuration").optional(),
          description: z.string().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          enabledClients: z.array(z.string()).describe(
            "Required. The list of client ids which are enabled to execute the workflow using this trigger. In other words, these clients have the workflow execution privledges for this trigger. For API trigger, the client id in the incoming request is validated against the list of enabled clients. For non-API triggers, one workflow execution is triggered on behalf of each enabled client.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          label: z.string().describe(
            "The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe("Dictates how next tasks will be executed.").optional(),
          outputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          pauseWorkflowExecutions: z.boolean().describe(
            "Optional. If set to true, any upcoming requests for this trigger config will be paused and the executions will be resumed later when the flag is reset. The workflow to which this trigger config belongs has to be in ACTIVE status for the executions to be paused or resumed.",
          ).optional(),
          position: z.object({
            x: z.number().int().optional(),
            y: z.number().int().optional(),
          }).describe("Represents two-dimensional positions.").optional(),
          properties: z.record(z.string(), z.string()).describe(
            'Configurable properties of the trigger, not to be confused with workflow parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Cloud Pubsub triggers.',
          ).optional(),
          startTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string().describe(
                  "Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown.",
                ).optional(),
                operator: z.enum([
                  "UNSET",
                  "EQUALS",
                  "CONTAINS",
                  "LESS_THAN",
                  "GREATER_THAN",
                  "EXISTS",
                  "DOES_NOT_EXIST",
                  "IS_EMPTY",
                  "IS_NOT_EMPTY",
                ]).describe(
                  "Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("A set of individual constituent conditions.")
                .optional(),
            })).describe(
              "Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition`",
            ).optional(),
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give more business context about the next task edge or condition.",
            ).optional(),
            label: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskNumber: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Set of tasks numbers from where the workflow execution is started by this trigger. If this is empty, then workflow is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same workflow execution graph).",
          ).optional(),
          triggerCriteria: z.object({
            condition: z.string().describe(
              "Required. Standard filter expression, when true the workflow will be executed. If there's no trigger_criteria_task_implementation_class_name specified, the condition will be validated directly.",
            ).optional(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "LINT.IfChange To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            triggerCriteriaTaskImplementationClassName: z.string().describe(
              "Optional. Implementation class name. The class should implement the “TypedTask” interface.",
            ).optional(),
          }).optional(),
          triggerId: z.string().describe("The backend trigger ID.").optional(),
          triggerName: z.string().describe(
            "Optional. Name of the trigger This is added to identify the type of trigger. This is avoid the logic on triggerId to identify the trigger_type and push the same to monitoring.",
          ).optional(),
          triggerNumber: z.string().describe(
            "Required. A number to uniquely identify each trigger config within the workflow on UI.",
          ).optional(),
          triggerType: z.enum([
            "UNKNOWN",
            "CLOUD_PUBSUB",
            "GOOPS",
            "SFDC_SYNC",
            "CRON",
            "API",
            "MANIFOLD_TRIGGER",
            "DATALAYER_DATA_CHANGE",
            "SFDC_CHANNEL",
            "CLOUD_PUBSUB_EXTERNAL",
            "SFDC_CDC_CHANNEL",
            "SFDC_PLATFORM_EVENTS_CHANNEL",
            "CLOUD_SCHEDULER",
            "INTEGRATION_CONNECTOR_TRIGGER",
            "PRIVATE_TRIGGER",
            "EVENTARC_TRIGGER",
          ]).optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        updateTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        userLabel: z.string().describe(
          "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
        ).optional(),
      }).describe("The integration version definition.").optional(),
      key: z.string().describe(
        "Required. Unique Key of the IntegrationVersion.",
      ).optional(),
    }).describe("Define the template of IntegrationVersion.").optional(),
    subIntegrationVersionTemplates: z.array(z.object({
      integrationVersion: z.object({
        cloudKmsKey: z.string().describe(
          "Optional. Cloud KMS resource name for the CMEK encryption key.",
        ).optional(),
        cloudLoggingDetails: z.object({
          cloudLoggingSeverity: z.enum([
            "CLOUD_LOGGING_SEVERITY_UNSPECIFIED",
            "INFO",
            "ERROR",
            "WARNING",
          ]).describe(
            "Optional. Severity selected by the customer for the logs to be sent to Cloud Logging, for the integration version getting executed.",
          ).optional(),
          enableCloudLogging: z.boolean().describe(
            "Optional. Status of whether Cloud Logging is enabled or not for the integration version getting executed.",
          ).optional(),
        }).describe("Cloud Logging details for execution info").optional(),
        createTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        createdFromTemplate: z.string().describe(
          "Optional. Optional. The resource name of the template from which the integration is created.",
        ).optional(),
        databasePersistencePolicy: z.enum([
          "DATABASE_PERSISTENCE_POLICY_UNSPECIFIED",
          "DATABASE_PERSISTENCE_DISABLED",
          "DATABASE_PERSISTENCE_ASYNC",
        ]).describe(
          "Optional. Flag to disable database persistence for execution data, including event execution info, execution export info, execution metadata index and execution param index.",
        ).optional(),
        description: z.string().describe(
          "Optional. The integration description.",
        ).optional(),
        enableVariableMasking: z.boolean().describe(
          "Optional. True if variable masking feature should be turned on for this version",
        ).optional(),
        errorCatcherConfigs: z.array(z.object({
          description: z.string().describe(
            "Optional. User-provided description intended to give more business context about the error catcher config.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Required. An error catcher id is string representation for the error catcher config. Within a workflow, error_catcher_id uniquely identifies an error catcher config among all error catcher configs for the workflow",
          ).optional(),
          errorCatcherNumber: z.string().describe(
            "Required. A number to uniquely identify each error catcher config within the workflow on UI.",
          ).optional(),
          label: z.string().describe(
            "Optional. The user created label for a particular error catcher. Optional.",
          ).optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          startErrorTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Required. The set of start tasks that are to be executed for the error catch flow",
          ).optional(),
        })).describe(
          "Optional. Error Catch Task configuration for the integration. It's optional.",
        ).optional(),
        integrationConfigParameters: z.array(z.object({
          parameter: z.object({
            containsLargeData: z.boolean().describe(
              "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
            ).optional(),
            dataType: z.enum([
              "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
              "STRING_VALUE",
              "INT_VALUE",
              "DOUBLE_VALUE",
              "BOOLEAN_VALUE",
              "STRING_ARRAY",
              "INT_ARRAY",
              "DOUBLE_ARRAY",
              "BOOLEAN_ARRAY",
              "JSON_VALUE",
              "PROTO_VALUE",
              "PROTO_ARRAY",
              "NON_SERIALIZABLE_OBJECT",
              "PROTO_ENUM",
              "SERIALIZED_OBJECT_VALUE",
              "PROTO_ENUM_ARRAY",
              "BYTES",
              "BYTES_ARRAY",
            ]).describe("Type of the parameter.").optional(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()).describe("Boolean array.")
                  .optional(),
              }).describe(
                "This message only contains a field of boolean array.",
              ).optional(),
              booleanValue: z.boolean().describe("Boolean.").optional(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()).describe(
                  "Double number array.",
                ).optional(),
              }).describe(
                "This message only contains a field of double number array.",
              ).optional(),
              doubleValue: z.number().describe("Double Number.").optional(),
              intArray: z.object({
                intValues: z.array(z.string()).describe("Integer array.")
                  .optional(),
              }).describe(
                "This message only contains a field of integer array.",
              ).optional(),
              intValue: z.string().describe("Integer.").optional(),
              jsonValue: z.string().describe("Json.").optional(),
              stringArray: z.object({
                stringValues: z.array(z.string()).describe("String array.")
                  .optional(),
              }).describe("This message only contains a field of string array.")
                .optional(),
              stringValue: z.string().describe("String.").optional(),
            }).describe("The type of the parameter.").optional(),
            description: z.string().describe(
              "Optional. Description of the parameter.",
            ).optional(),
            displayName: z.string().describe(
              'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
            ).optional(),
            inputOutputType: z.enum([
              "IN_OUT_TYPE_UNSPECIFIED",
              "IN",
              "OUT",
              "IN_OUT",
            ]).describe("Specifies the input/output type for the parameter.")
              .optional(),
            isTransient: z.boolean().describe(
              "Whether this parameter is a transient parameter.",
            ).optional(),
            jsonSchema: z.string().describe(
              "This schema will be used to validate runtime JSON-typed values of this parameter.",
            ).optional(),
            key: z.string().describe(
              "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
            ).optional(),
            masked: z.boolean().describe(
              "True if this parameter should be masked in the logs",
            ).optional(),
            producer: z.string().describe(
              "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
            ).optional(),
            searchable: z.boolean().describe(
              "Searchable in the execution log or not.",
            ).optional(),
          }).describe(
            "Integration Parameter is defined in the integration config and are used to provide information about data types of the expected parameters and provide any default values if needed. They can also be used to add custom attributes. These are static in nature and should not be used for dynamic event definition.",
          ).optional(),
          value: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()).describe("Boolean array.")
                .optional(),
            }).describe("This message only contains a field of boolean array.")
              .optional(),
            booleanValue: z.boolean().describe("Boolean.").optional(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()).describe("Double number array.")
                .optional(),
            }).describe(
              "This message only contains a field of double number array.",
            ).optional(),
            doubleValue: z.number().describe("Double Number.").optional(),
            intArray: z.object({
              intValues: z.array(z.string()).describe("Integer array.")
                .optional(),
            }).describe("This message only contains a field of integer array.")
              .optional(),
            intValue: z.string().describe("Integer.").optional(),
            jsonValue: z.string().describe("Json.").optional(),
            stringArray: z.object({
              stringValues: z.array(z.string()).describe("String array.")
                .optional(),
            }).describe("This message only contains a field of string array.")
              .optional(),
            stringValue: z.string().describe("String.").optional(),
          }).describe("The type of the parameter.").optional(),
        })).describe(
          "Optional. Config Parameters that are expected to be passed to the integration when an integration is published. This consists of all the parameters that are expected to provide configuration in the integration execution. This gives the user the ability to provide default values, value, add information like connection url, project based configuration value and also provide data types of each parameter.",
        ).optional(),
        integrationParameters: z.array(z.object({
          containsLargeData: z.boolean().describe(
            "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
          ).optional(),
          dataType: z.enum([
            "INTEGRATION_PARAMETER_DATA_TYPE_UNSPECIFIED",
            "STRING_VALUE",
            "INT_VALUE",
            "DOUBLE_VALUE",
            "BOOLEAN_VALUE",
            "STRING_ARRAY",
            "INT_ARRAY",
            "DOUBLE_ARRAY",
            "BOOLEAN_ARRAY",
            "JSON_VALUE",
            "PROTO_VALUE",
            "PROTO_ARRAY",
            "NON_SERIALIZABLE_OBJECT",
            "PROTO_ENUM",
            "SERIALIZED_OBJECT_VALUE",
            "PROTO_ENUM_ARRAY",
            "BYTES",
            "BYTES_ARRAY",
          ]).describe("Type of the parameter.").optional(),
          defaultValue: z.object({
            booleanArray: z.object({
              booleanValues: z.array(z.boolean()).describe("Boolean array.")
                .optional(),
            }).describe("This message only contains a field of boolean array.")
              .optional(),
            booleanValue: z.boolean().describe("Boolean.").optional(),
            doubleArray: z.object({
              doubleValues: z.array(z.number()).describe("Double number array.")
                .optional(),
            }).describe(
              "This message only contains a field of double number array.",
            ).optional(),
            doubleValue: z.number().describe("Double Number.").optional(),
            intArray: z.object({
              intValues: z.array(z.string()).describe("Integer array.")
                .optional(),
            }).describe("This message only contains a field of integer array.")
              .optional(),
            intValue: z.string().describe("Integer.").optional(),
            jsonValue: z.string().describe("Json.").optional(),
            stringArray: z.object({
              stringValues: z.array(z.string()).describe("String array.")
                .optional(),
            }).describe("This message only contains a field of string array.")
              .optional(),
            stringValue: z.string().describe("String.").optional(),
          }).describe("The type of the parameter.").optional(),
          description: z.string().describe(
            "Optional. Description of the parameter.",
          ).optional(),
          displayName: z.string().describe(
            'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
          ).optional(),
          inputOutputType: z.enum([
            "IN_OUT_TYPE_UNSPECIFIED",
            "IN",
            "OUT",
            "IN_OUT",
          ]).describe("Specifies the input/output type for the parameter.")
            .optional(),
          isTransient: z.boolean().describe(
            "Whether this parameter is a transient parameter.",
          ).optional(),
          jsonSchema: z.string().describe(
            "This schema will be used to validate runtime JSON-typed values of this parameter.",
          ).optional(),
          key: z.string().describe(
            "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
          ).optional(),
          masked: z.boolean().describe(
            "True if this parameter should be masked in the logs",
          ).optional(),
          producer: z.string().describe(
            "The identifier of the node (TaskConfig/TriggerConfig) this parameter was produced by, if it is a transient param or a copy of an input param.",
          ).optional(),
          searchable: z.boolean().describe(
            "Searchable in the execution log or not.",
          ).optional(),
        })).describe(
          "Optional. Parameters that are expected to be passed to the integration when an event is triggered. This consists of all the parameters that are expected in the integration execution. This gives the user the ability to provide default values, add information like PII and also provide data types of each parameter.",
        ).optional(),
        integrationParametersInternal: z.object({
          parameters: z.array(z.object({
            attributes: z.object({
              dataType: z.enum([
                "DATA_TYPE_UNSPECIFIED",
                "EMAIL",
                "URL",
                "CURRENCY",
                "TIMESTAMP",
                "DOMAIN_NAME",
              ]).describe(
                "Things like URL, Email, Currency, Timestamp (rather than string, int64...)",
              ).optional(),
              defaultValue: z.object({
                booleanValue: z.boolean().optional(),
                doubleArray: z.object({
                  values: z.array(z.number()).optional(),
                }).optional(),
                doubleValue: z.number().optional(),
                intArray: z.object({
                  values: z.array(z.string()).optional(),
                }).optional(),
                intValue: z.string().optional(),
                protoValue: z.record(z.string(), z.string()).optional(),
                stringArray: z.object({
                  values: z.array(z.string()).optional(),
                }).optional(),
                stringValue: z.string().optional(),
              }).describe(
                "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
              ).optional(),
              isRequired: z.boolean().describe(
                "Required for event execution. The validation will be done by the event bus when the event is triggered.",
              ).optional(),
              isSearchable: z.boolean().describe(
                "Used to indicate if a ParameterEntry should be converted to ParamIndexes for ST-Spanner full-text search. DEPRECATED: use searchable.",
              ).optional(),
              logSettings: z.object({
                logFieldName: z.string().describe(
                  "The name of corresponding logging field of the event property. If omitted, assumes the same name as the event property key.",
                ).optional(),
                seedPeriod: z.enum([
                  "SEED_PERIOD_UNSPECIFIED",
                  "DAY",
                  "WEEK",
                  "MONTH",
                ]).optional(),
                seedScope: z.enum([
                  "SEED_SCOPE_UNSPECIFIED",
                  "EVENT_NAME",
                  "TIME_PERIOD",
                  "PARAM_NAME",
                ]).optional(),
              }).describe(
                "The LogSettings define the logging attributes for an event property. These attributes are used to map the property to the parameter in the log proto. Also used to define scrubbing/truncation behavior and PII information.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this workflow parameter should be masked in the logs",
              ).optional(),
              readOnly: z.boolean().describe(
                "Used to indicate if the ParameterEntry is a read only field or not.",
              ).optional(),
              searchable: z.enum(["UNSPECIFIED", "YES", "NO"]).optional(),
              taskVisibility: z.array(z.string()).describe(
                "List of tasks that can view this property, if empty then all.",
              ).optional(),
            }).describe(
              "Attributes are additional options that can be associated with each event property. For more information, see",
            ).optional(),
            children: z.array(z.string()).describe(
              "Child parameters nested within this parameter. This field only applies to protobuf parameters",
            ).optional(),
            containsLargeData: z.boolean().describe(
              "Indicates whether this variable contains large data and need to be uploaded to Cloud Storage.",
            ).optional(),
            dataType: z.enum([
              "DATA_TYPE_UNSPECIFIED",
              "STRING_VALUE",
              "INT_VALUE",
              "DOUBLE_VALUE",
              "BOOLEAN_VALUE",
              "PROTO_VALUE",
              "SERIALIZED_OBJECT_VALUE",
              "STRING_ARRAY",
              "INT_ARRAY",
              "DOUBLE_ARRAY",
              "PROTO_ARRAY",
              "PROTO_ENUM",
              "BOOLEAN_ARRAY",
              "PROTO_ENUM_ARRAY",
              "BYTES",
              "BYTES_ARRAY",
              "NON_SERIALIZABLE_OBJECT",
              "JSON_VALUE",
            ]).describe("The data type of the parameter.").optional(),
            defaultValue: z.object({
              booleanArray: z.object({
                booleanValues: z.array(z.boolean()).optional(),
              }).optional(),
              booleanValue: z.boolean().optional(),
              doubleArray: z.object({
                doubleValues: z.array(z.number()).optional(),
              }).optional(),
              doubleValue: z.number().optional(),
              intArray: z.object({
                intValues: z.array(z.string()).optional(),
              }).optional(),
              intValue: z.string().optional(),
              jsonValue: z.string().optional(),
              protoArray: z.object({
                protoValues: z.array(z.record(z.string(), z.string()))
                  .optional(),
              }).optional(),
              protoValue: z.record(z.string(), z.string()).optional(),
              serializedObjectValue: z.object({
                objectValue: z.string().optional(),
              }).optional(),
              stringArray: z.object({
                stringValues: z.array(z.string()).optional(),
              }).optional(),
              stringValue: z.string().optional(),
            }).describe(
              "To support various types of parameter values. Next available id: 14",
            ).optional(),
            description: z.string().describe(
              "Optional. The description about the parameter",
            ).optional(),
            inOutType: z.enum([
              "IN_OUT_TYPE_UNSPECIFIED",
              "IN",
              "OUT",
              "IN_OUT",
            ]).describe("Specifies the input/output type for the parameter.")
              .optional(),
            isTransient: z.boolean().describe(
              "Whether this parameter is a transient parameter.",
            ).optional(),
            jsonSchema: z.string().describe(
              "This schema will be used to validate runtime JSON-typed values of this parameter.",
            ).optional(),
            key: z.string().describe(
              "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
            ).optional(),
            name: z.string().describe(
              'The name (without prefix) to be displayed in the UI for this parameter. E.g. if the key is "foo.bar.myName", then the name would be "myName".',
            ).optional(),
            producedBy: z.object({
              elementIdentifier: z.string().describe(
                "Configuration of the edge.",
              ).optional(),
              elementType: z.enum([
                "UNKNOWN_TYPE",
                "TASK_CONFIG",
                "TRIGGER_CONFIG",
              ]).describe(
                "Destination node where the edge ends. It can only be a task config.",
              ).optional(),
            }).describe(
              "Represents a node identifier (type + id). Next highest id: 3",
            ).optional(),
            producer: z.string().optional(),
            protoDefName: z.string().describe(
              "The name of the protobuf type if the parameter has a protobuf data type.",
            ).optional(),
            protoDefPath: z.string().describe(
              'If the data type is of type proto or proto array, this field needs to be populated with the fully qualified proto name. This message, for example, would be "enterprise.crm.frontends.eventbus.proto.WorkflowParameterEntry".',
            ).optional(),
            required: z.boolean().optional(),
          })).describe(
            "Parameters are a part of Event and can be used to communiticate between different tasks that are part of the same workflow execution.",
          ).optional(),
        }).describe(
          "LINT.IfChange This is the frontend version of WorkflowParameters. It's exactly like the backend version except that instead of flattening protobuf parameters and treating every field and subfield of a protobuf parameter as a separate parameter, the fields/subfields of a protobuf parameter will be nested as \"children\" (see 'children' field below) parameters of the parent parameter. Please refer to enterprise/crm/eventbus/proto/workflow_parameters.proto for more information about WorkflowParameters.",
        ).optional(),
        lastModifierEmail: z.string().describe(
          "Optional. The last modifier's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        lockHolder: z.string().describe(
          "Optional. The edit lock holder's email address. Generated based on the End User Credentials/LOAS role of the user making the call.",
        ).optional(),
        name: z.string().describe("Output only. Auto-generated primary key.")
          .optional(),
        origin: z.enum([
          "UNSPECIFIED",
          "UI",
          "PIPER_V2",
          "PIPER_V3",
          "APPLICATION_IP_PROVISIONING",
          "TEST_CASE",
        ]).describe(
          "Optional. The origin that indicates where this integration is coming from.",
        ).optional(),
        parentTemplateId: z.string().describe(
          "Optional. The id of the template which was used to create this integration_version.",
        ).optional(),
        runAsServiceAccount: z.string().describe(
          "Optional. The run-as service account email, if set and auth config is not configured, that will be used to generate auth token to be used in Connector task, Rest caller task and Cloud function task.",
        ).optional(),
        snapshotNumber: z.string().describe(
          'Output only. An increasing sequence that is set when a new snapshot is created. The last created snapshot can be identified by [workflow_name, org_id latest(snapshot_number)]. However, last created snapshot need not be same as the HEAD. So users should always use "HEAD" tag to identify the head.',
        ).optional(),
        state: z.enum([
          "INTEGRATION_STATE_UNSPECIFIED",
          "DRAFT",
          "ACTIVE",
          "ARCHIVED",
          "SNAPSHOT",
        ]).describe("Output only. User should not set it as an input.")
          .optional(),
        status: z.enum(["UNKNOWN", "DRAFT", "ACTIVE", "ARCHIVED", "SNAPSHOT"])
          .describe(
            "Output only. Generated by eventbus. User should not set it as an input.",
          ).optional(),
        taskConfigs: z.array(z.object({
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              condition: z.string().describe(
                "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
              ).optional(),
              intervalTime: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
              ).optional(),
              maxRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryStrategy: z.enum([
                "RETRY_STRATEGY_UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_INTEGRATION_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            }).describe(
              "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
            ).optional(),
            failurePolicies: z.array(z.object({
              condition: z.string().describe(
                "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
              ).optional(),
              intervalTime: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
              ).optional(),
              maxRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryStrategy: z.enum([
                "RETRY_STRATEGY_UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_INTEGRATION_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            })).describe(
              "The list of failure policies that will be applied to the task in order.",
            ).optional(),
          }).describe("Conditional task failur retry strategies").optional(),
          description: z.string().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          displayName: z.string().describe(
            "Optional. User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.enum([
            "EXTERNAL_TASK_TYPE_UNSPECIFIED",
            "NORMAL_TASK",
            "ERROR_TASK",
          ]).describe("Optional. External task type of the task").optional(),
          failurePolicy: z.object({
            condition: z.string().describe(
              "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
            ).optional(),
            intervalTime: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
            ).optional(),
            maxRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryStrategy: z.enum([
              "RETRY_STRATEGY_UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_INTEGRATION_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          jsonValidationOption: z.enum([
            "JSON_VALIDATION_OPTION_UNSPECIFIED",
            "SKIP",
            "PRE_EXECUTION",
            "POST_EXECUTION",
            "PRE_POST_EXECUTION",
          ]).describe(
            "Optional. If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          nextTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Optional. The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe(
            "Optional. The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.record(
            z.string(),
            z.object({
              key: z.string().describe(
                "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this parameter should be masked in the logs",
              ).optional(),
              value: z.object({
                booleanArray: z.object({
                  booleanValues: z.array(z.boolean()).describe("Boolean array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of boolean array.",
                ).optional(),
                booleanValue: z.boolean().describe("Boolean.").optional(),
                doubleArray: z.object({
                  doubleValues: z.array(z.number()).describe(
                    "Double number array.",
                  ).optional(),
                }).describe(
                  "This message only contains a field of double number array.",
                ).optional(),
                doubleValue: z.number().describe("Double Number.").optional(),
                intArray: z.object({
                  intValues: z.array(z.string()).describe("Integer array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of integer array.",
                ).optional(),
                intValue: z.string().describe("Integer.").optional(),
                jsonValue: z.string().describe("Json.").optional(),
                stringArray: z.object({
                  stringValues: z.array(z.string()).describe("String array.")
                    .optional(),
                }).describe(
                  "This message only contains a field of string array.",
                ).optional(),
                stringValue: z.string().describe("String.").optional(),
              }).describe("The type of the parameter.").optional(),
            }),
          ).describe(
            "Optional. The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          successPolicy: z.object({
            finalState: z.enum([
              "FINAL_STATE_UNSPECIFIED",
              "SUCCEEDED",
              "SUSPENDED",
            ]).describe(
              "State to which the execution snapshot status will be set if the task succeeds.",
            ).optional(),
          }).describe(
            "Policy that dictates the behavior for the task after it completes successfully.",
          ).optional(),
          synchronousCallFailurePolicy: z.object({
            condition: z.string().describe(
              "Optional. The string condition that will be evaluated to determine if the task should be retried with this failure policy.",
            ).optional(),
            intervalTime: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the initial interval in seconds for backoff.",
            ).optional(),
            maxRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_INTEGRATION_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryStrategy: z.enum([
              "RETRY_STRATEGY_UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_INTEGRATION_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          task: z.string().describe("Optional. The name for the task.")
            .optional(),
          taskExecutionStrategy: z.enum([
            "TASK_EXECUTION_STRATEGY_UNSPECIFIED",
            "WHEN_ALL_SUCCEED",
            "WHEN_ANY_SUCCEED",
            "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
          ]).describe(
            "Optional. The policy dictating the execution strategy of this task.",
          ).optional(),
          taskId: z.string().describe(
            "Required. The identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_id`).",
          ).optional(),
          taskTemplate: z.string().describe(
            "Optional. Used to define task-template name if task is of type task-template",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        taskConfigsInternal: z.array(z.object({
          alertConfigs: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week).",
            ).optional(),
            alertDisabled: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert.",
            ).optional(),
            alertName: z.string().describe(
              "A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique in within the scope of the containing workflow.",
            ).optional(),
            clientId: z.string().describe(
              "Client associated with this alert configuration. Must be a client enabled in one of the containing workflow's triggers.",
            ).optional(),
            durationThresholdMs: z.string().describe(
              "Should be specified only for TASK_AVERAGE_DURATION and TASK_PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).optional(),
            numAggregationPeriods: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            onlyFinalAttempt: z.boolean().describe(
              "Only count final task attempts, not retries.",
            ).optional(),
            playbookUrl: z.string().describe(
              "Link to a playbook for resolving the issue that triggered this alert.",
            ).optional(),
            thresholdType: z.enum([
              "UNSPECIFIED_THRESHOLD_TYPE",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().optional(),
              percentage: z.number().int().optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
          })).describe(
            "Alert configurations on error rate, warning rate, number of runs, durations, etc.",
          ).optional(),
          conditionalFailurePolicies: z.object({
            defaultFailurePolicy: z.object({
              intervalInSeconds: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
              ).optional(),
              maxNumRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryCondition: z.string().describe(
                "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
              ).optional(),
              retryStrategy: z.enum([
                "UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_WORKFLOW_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            }).describe(
              "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
            ).optional(),
            failurePolicies: z.array(z.object({
              intervalInSeconds: z.string().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
              ).optional(),
              maxNumRetries: z.number().int().describe(
                "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
              ).optional(),
              retryCondition: z.string().describe(
                "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
              ).optional(),
              retryStrategy: z.enum([
                "UNSPECIFIED",
                "IGNORE",
                "NONE",
                "FATAL",
                "FIXED_INTERVAL",
                "LINEAR_BACKOFF",
                "EXPONENTIAL_BACKOFF",
                "RESTART_WORKFLOW_WITH_BACKOFF",
              ]).describe("Defines what happens to the task upon failure.")
                .optional(),
            })).describe(
              "The list of failure policies that will be applied to the task in order.",
            ).optional(),
          }).optional(),
          createTime: z.string().describe("Auto-generated.").optional(),
          creatorEmail: z.string().describe(
            "The creator's email address. Auto-generated from the user's email.",
          ).optional(),
          description: z.string().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          disableStrictTypeValidation: z.boolean().describe(
            "If this config contains a TypedTask, allow validation to succeed if an input is read from the output of another TypedTask whose output type is declared as a superclass of the requested input type. For instance, if the previous task declares an output of type Message, any task with this flag enabled will pass validation when attempting to read any proto Message type from the resultant Event parameter.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          externalTaskType: z.enum([
            "EXTERNAL_TASK_TYPE_UNSPECIFIED",
            "NORMAL_TASK",
            "ERROR_TASK",
          ]).optional(),
          failurePolicy: z.object({
            intervalInSeconds: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
            ).optional(),
            maxNumRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryCondition: z.string().describe(
              "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
            ).optional(),
            retryStrategy: z.enum([
              "UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_WORKFLOW_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          incomingEdgeCount: z.number().int().describe(
            "The number of edges leading into this TaskConfig.",
          ).optional(),
          jsonValidationOption: z.enum([
            "UNSPECIFIED_JSON_VALIDATION_OPTION",
            "SKIP",
            "PRE_EXECUTION",
            "POST_EXECUTION",
            "PRE_POST_EXECUTION",
          ]).describe(
            "If set, overrides the option configured in the Task implementation class.",
          ).optional(),
          label: z.string().describe(
            "User-provided label that is attached to this TaskConfig in the UI.",
          ).optional(),
          lastModifiedTime: z.string().describe("Auto-generated.").optional(),
          nextTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string().describe(
                  "Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown.",
                ).optional(),
                operator: z.enum([
                  "UNSET",
                  "EQUALS",
                  "CONTAINS",
                  "LESS_THAN",
                  "GREATER_THAN",
                  "EXISTS",
                  "DOES_NOT_EXIST",
                  "IS_EMPTY",
                  "IS_NOT_EMPTY",
                ]).describe(
                  "Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("A set of individual constituent conditions.")
                .optional(),
            })).describe(
              "Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition`",
            ).optional(),
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give more business context about the next task edge or condition.",
            ).optional(),
            label: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskNumber: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "The set of tasks that are next in line to be executed as per the execution graph defined for the parent event, specified by `event_config_id`. Each of these next tasks are executed only if the condition associated with them evaluates to true.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe(
            "The policy dictating the execution of the next set of tasks for the current task.",
          ).optional(),
          parameters: z.record(
            z.string(),
            z.object({
              dataType: z.enum([
                "DATA_TYPE_UNSPECIFIED",
                "STRING_VALUE",
                "INT_VALUE",
                "DOUBLE_VALUE",
                "BOOLEAN_VALUE",
                "PROTO_VALUE",
                "SERIALIZED_OBJECT_VALUE",
                "STRING_ARRAY",
                "INT_ARRAY",
                "DOUBLE_ARRAY",
                "PROTO_ARRAY",
                "PROTO_ENUM",
                "BOOLEAN_ARRAY",
                "PROTO_ENUM_ARRAY",
                "BYTES",
                "BYTES_ARRAY",
                "NON_SERIALIZABLE_OBJECT",
                "JSON_VALUE",
              ]).describe("Explicitly getting the type of the parameter.")
                .optional(),
              key: z.string().describe(
                "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
              ).optional(),
              masked: z.boolean().describe(
                "True if this parameter should be masked in the logs",
              ).optional(),
              value: z.object({
                booleanArray: z.object({
                  booleanValues: z.array(z.boolean()).optional(),
                }).optional(),
                booleanValue: z.boolean().optional(),
                doubleArray: z.object({
                  doubleValues: z.array(z.number()).optional(),
                }).optional(),
                doubleValue: z.number().optional(),
                intArray: z.object({
                  intValues: z.array(z.string()).optional(),
                }).optional(),
                intValue: z.string().optional(),
                jsonValue: z.string().optional(),
                protoArray: z.object({
                  protoValues: z.array(z.record(z.string(), z.string()))
                    .optional(),
                }).optional(),
                protoValue: z.record(z.string(), z.string()).optional(),
                serializedObjectValue: z.object({
                  objectValue: z.string().optional(),
                }).optional(),
                stringArray: z.object({
                  stringValues: z.array(z.string()).optional(),
                }).optional(),
                stringValue: z.string().optional(),
              }).describe(
                "To support various types of parameter values. Next available id: 14",
              ).optional(),
            }),
          ).describe(
            "The customized parameters the user can pass to this task.",
          ).optional(),
          position: z.object({
            x: z.number().int().optional(),
            y: z.number().int().optional(),
          }).describe("Represents two-dimensional positions.").optional(),
          precondition: z.string().describe(
            'Optional. Standard filter expression evaluated before execution. Independent of other conditions and tasks. Can be used to enable rollout. e.g. "rollout(5)" will only allow 5% of incoming traffic to task.',
          ).optional(),
          preconditionLabel: z.string().describe(
            "Optional. User-provided label that is attached to precondition in the UI.",
          ).optional(),
          rollbackStrategy: z.object({
            parameters: z.object({
              parameters: z.array(z.object({
                dataType: z.enum([
                  "DATA_TYPE_UNSPECIFIED",
                  "STRING_VALUE",
                  "INT_VALUE",
                  "DOUBLE_VALUE",
                  "BOOLEAN_VALUE",
                  "PROTO_VALUE",
                  "SERIALIZED_OBJECT_VALUE",
                  "STRING_ARRAY",
                  "INT_ARRAY",
                  "DOUBLE_ARRAY",
                  "PROTO_ARRAY",
                  "PROTO_ENUM",
                  "BOOLEAN_ARRAY",
                  "PROTO_ENUM_ARRAY",
                  "BYTES",
                  "BYTES_ARRAY",
                  "NON_SERIALIZABLE_OBJECT",
                  "JSON_VALUE",
                ]).describe("Explicitly getting the type of the parameter.")
                  .optional(),
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the workflow definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  jsonValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same workflow execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            rollbackTaskImplementationClassName: z.string().describe(
              "Required. This is the name of the task that needs to be executed upon rollback of this task.",
            ).optional(),
            taskNumbersToRollback: z.array(z.string()).describe(
              "Required. These are the tasks numbers of the tasks whose `rollback_strategy.rollback_task_implementation_class_name` needs to be executed upon failure of this task.",
            ).optional(),
          }).describe("Next available id: 4").optional(),
          successPolicy: z.object({
            finalState: z.enum(["UNSPECIFIED", "SUCCEEDED", "SUSPENDED"])
              .describe(
                "State to which the execution snapshot status will be set if the task succeeds.",
              ).optional(),
          }).describe(
            "Policy that dictates the behavior for the task after it completes successfully.",
          ).optional(),
          synchronousCallFailurePolicy: z.object({
            intervalInSeconds: z.string().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the initial interval for backoff.",
            ).optional(),
            maxNumRetries: z.number().int().describe(
              "Required if retry_strategy is FIXED_INTERVAL or LINEAR/EXPONENTIAL_BACKOFF/RESTART_WORKFLOW_WITH_BACKOFF. Defines the number of times the task will be retried if failed.",
            ).optional(),
            retryCondition: z.string().describe(
              "Optional. The retry condition that will be evaluated for this failure policy with the corresponding retry strategy.",
            ).optional(),
            retryStrategy: z.enum([
              "UNSPECIFIED",
              "IGNORE",
              "NONE",
              "FATAL",
              "FIXED_INTERVAL",
              "LINEAR_BACKOFF",
              "EXPONENTIAL_BACKOFF",
              "RESTART_WORKFLOW_WITH_BACKOFF",
            ]).describe("Defines what happens to the task upon failure.")
              .optional(),
          }).describe(
            "Policy that defines the task retry logic and failure type. If no FailurePolicy is defined for a task, all its dependent tasks will not be executed (i.e, a `retry_strategy` of NONE will be applied).",
          ).optional(),
          taskEntity: z.object({
            disabledForVpcSc: z.boolean().describe(
              "True if the task has conflict with vpcsc",
            ).optional(),
            metadata: z.object({
              activeTaskName: z.string().describe(
                "The new task name to replace the current task if it is deprecated. Otherwise, it is the same as the current task name.",
              ).optional(),
              admins: z.array(z.object({
                googleGroupEmail: z.string().optional(),
                userEmail: z.string().optional(),
              })).optional(),
              category: z.enum([
                "UNSPECIFIED_CATEGORY",
                "CUSTOM",
                "FLOW_CONTROL",
                "DATA_MANIPULATION",
                "SCRIPTING",
                "CONNECTOR",
                "HIDDEN",
                "CLOUD_SYSTEMS",
                "CUSTOM_TASK_TEMPLATE",
                "TASK_RECOMMENDATIONS",
              ]).optional(),
              codeSearchLink: z.string().describe(
                "The Code Search link to the Task Java file.",
              ).optional(),
              defaultJsonValidationOption: z.enum([
                "UNSPECIFIED_JSON_VALIDATION_OPTION",
                "SKIP",
                "PRE_EXECUTION",
                "POST_EXECUTION",
                "PRE_POST_EXECUTION",
              ]).describe(
                "Controls whether JSON workflow parameters are validated against provided schemas before and/or after this task's execution.",
              ).optional(),
              defaultSpec: z.string().describe(
                "Contains the initial configuration of the task with default values set. For now, The string should be compatible to an ASCII-proto format.",
              ).optional(),
              description: z.string().describe(
                "In a few sentences, describe the purpose and usage of the task.",
              ).optional(),
              descriptiveName: z.string().describe(
                'The string name to show on the task list on the Workflow editor screen. This should be a very short, one to two words name for the task. (e.g. "Send Mail")',
              ).optional(),
              docMarkdown: z.string().describe(
                "Snippet of markdown documentation to embed in the RHP for this task.",
              ).optional(),
              externalCategory: z.enum([
                "UNSPECIFIED_EXTERNAL_CATEGORY",
                "CORE",
                "CONNECTORS",
                "EXTERNAL_HTTP",
                "EXTERNAL_INTEGRATION_SERVICES",
                "EXTERNAL_CUSTOMER_ACTIONS",
                "EXTERNAL_FLOW_CONTROL",
                "EXTERNAL_WORKSPACE",
                "EXTERNAL_SECURITY",
                "EXTERNAL_DATABASES",
                "EXTERNAL_ANALYTICS",
                "EXTERNAL_BYOC",
                "EXTERNAL_BYOT",
                "EXTERNAL_ARTIFICIAL_INTELIGENCE",
                "EXTERNAL_DATA_MANIPULATION",
              ]).optional(),
              externalCategorySequence: z.number().int().describe(
                "Sequence with which the task in specific category to be displayed in task discovery panel for external users.",
              ).optional(),
              externalDocHtml: z.string().describe(
                "External-facing documention embedded in the RHP for this task.",
              ).optional(),
              externalDocLink: z.string().describe(
                "Doc link for external-facing documentation (separate from g3doc).",
              ).optional(),
              externalDocMarkdown: z.string().describe(
                "DEPRECATED: Use external_doc_html.",
              ).optional(),
              g3DocLink: z.string().describe(
                "URL to the associated G3 Doc for the task if available",
              ).optional(),
              iconLink: z.string().describe(
                "URL to gstatic image icon for this task. This icon shows up on the task list panel along with the task name in the Workflow Editor screen. Use the 24p, 2x, gray color icon image format.",
              ).optional(),
              isDeprecated: z.boolean().describe(
                "The deprecation status of the current task. Default value is false;",
              ).optional(),
              name: z.string().describe(
                "The actual class name or the annotated name of the task. Task Author should initialize this field with value from the getName() method of the Task class.",
              ).optional(),
              standaloneExternalDocHtml: z.string().describe(
                "External-facing documention for standalone IP in pantheon embedded in the RHP for this task. Non null only if different from external_doc_html",
              ).optional(),
              status: z.enum([
                "UNSPECIFIED_STATUS",
                "DEFAULT_INACTIVE",
                "ACTIVE",
              ]).describe(
                "Allows author to indicate if the task is ready to use or not. If not set, then it will default to INACTIVE.",
              ).optional(),
              system: z.enum([
                "UNSPECIFIED_SYSTEM",
                "GENERIC",
                "BUGANIZER",
                "SALESFORCE",
                "CLOUD_SQL",
                "PLX",
                "SHEETS",
                "GOOGLE_GROUPS",
                "EMAIL",
                "SPANNER",
                "DATA_BRIDGE",
              ]).optional(),
              tags: z.array(z.string()).describe(
                'A set of tags that pertain to a particular task. This can be used to improve the searchability of tasks with several names ("REST Caller" vs. "Call REST Endpoint") or to help users find tasks based on related words.',
              ).optional(),
            }).describe(
              "TaskMetadata are attributes that are associated to every common Task we have.",
            ).optional(),
            paramSpecs: z.object({
              parameters: z.array(z.object({
                className: z.string().describe(
                  'The FQCN of the Java object this represents. A string, for example, would be "java.lang.String". If this is "java.lang.Object", the parameter can be of any type.',
                ).optional(),
                collectionElementClassName: z.string().describe(
                  'If it is a collection of objects, this would be the FCQN of every individual element in the collection. If this is "java.lang.Object", the parameter is a collection of any type.',
                ).optional(),
                config: z.object({
                  descriptivePhrase: z.string().describe(
                    "A short phrase to describe what this parameter contains.",
                  ).optional(),
                  helpText: z.string().describe(
                    "Detailed help text for this parameter containing information not provided elsewhere. For example, instructions on how to migrate from a deprecated parameter.",
                  ).optional(),
                  hideDefaultValue: z.boolean().describe(
                    "Whether the default value is hidden in the UI.",
                  ).optional(),
                  inputDisplayOption: z.enum([
                    "DEFAULT",
                    "STRING_MULTI_LINE",
                    "NUMBER_SLIDER",
                    "BOOLEAN_TOGGLE",
                  ]).optional(),
                  isHidden: z.boolean().describe(
                    "Whether this field is hidden in the UI.",
                  ).optional(),
                  label: z.string().describe(
                    "A user-friendly label for the parameter.",
                  ).optional(),
                  parameterNameOption: z.enum([
                    "DEFAULT_NOT_PARAMETER_NAME",
                    "IS_PARAMETER_NAME",
                    "KEY_IS_PARAMETER_NAME",
                    "VALUE_IS_PARAMETER_NAME",
                  ]).optional(),
                  subSectionLabel: z.string().describe(
                    "A user-friendly label for subSection under which the parameter will be displayed.",
                  ).optional(),
                  uiPlaceholderText: z.string().describe(
                    "Placeholder text which will appear in the UI input form for this parameter.",
                  ).optional(),
                }).optional(),
                dataType: z.enum([
                  "DATA_TYPE_UNSPECIFIED",
                  "STRING_VALUE",
                  "INT_VALUE",
                  "DOUBLE_VALUE",
                  "BOOLEAN_VALUE",
                  "PROTO_VALUE",
                  "SERIALIZED_OBJECT_VALUE",
                  "STRING_ARRAY",
                  "INT_ARRAY",
                  "DOUBLE_ARRAY",
                  "PROTO_ARRAY",
                  "PROTO_ENUM",
                  "BOOLEAN_ARRAY",
                  "PROTO_ENUM_ARRAY",
                  "BYTES",
                  "BYTES_ARRAY",
                  "NON_SERIALIZABLE_OBJECT",
                  "JSON_VALUE",
                ]).describe("The data type of the parameter.").optional(),
                defaultValue: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  jsonValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "To support various types of parameter values. Next available id: 14",
                ).optional(),
                isDeprecated: z.boolean().describe(
                  "If set, this entry is deprecated, so further use of this parameter should be prohibited.",
                ).optional(),
                isOutput: z.boolean().optional(),
                jsonSchema: z.string().describe(
                  "If the data_type is JSON_VALUE, then this will define its schema.",
                ).optional(),
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given task. These parameters must be predefined in the workflow definition.",
                ).optional(),
                protoDef: z.object({
                  fullName: z.string().describe(
                    'The fully-qualified proto name. This message, for example, would be "enterprise.crm.eventbus.proto.ParamSpecEntry.ProtoDefinition".',
                  ).optional(),
                  path: z.string().describe(
                    "Path to the proto file that contains the message type's definition.",
                  ).optional(),
                }).optional(),
                required: z.boolean().describe(
                  "If set, the user must provide an input value for this parameter.",
                ).optional(),
                validationRule: z.object({
                  doubleRange: z.object({
                    max: z.number().describe(
                      "The inclusive maximum of the acceptable range.",
                    ).optional(),
                    min: z.number().describe(
                      "The inclusive minimum of the acceptable range.",
                    ).optional(),
                  }).describe("Range used to validate doubles and floats.")
                    .optional(),
                  intRange: z.object({
                    max: z.string().describe(
                      "The inclusive maximum of the acceptable range.",
                    ).optional(),
                    min: z.string().describe(
                      "The inclusive minimum of the acceptable range.",
                    ).optional(),
                  }).describe("Range used to validate longs and ints.")
                    .optional(),
                  stringRegex: z.object({
                    exclusive: z.boolean().describe(
                      "Whether the regex matcher is applied exclusively (if true, matching values will be rejected).",
                    ).optional(),
                    regex: z.string().describe(
                      "The regex applied to the input value(s).",
                    ).optional(),
                  }).describe("Rule used to validate strings.").optional(),
                }).optional(),
              })).optional(),
            }).optional(),
            stats: z.object({
              dimensions: z.object({
                clientId: z.string().optional(),
                enumFilterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"])
                  .describe(
                    "Whether to include or exclude the enums matching the regex.",
                  ).optional(),
                errorEnumString: z.string().optional(),
                retryAttempt: z.enum([
                  "UNSPECIFIED",
                  "FINAL",
                  "RETRYABLE",
                  "CANCELED",
                ]).optional(),
                taskName: z.string().optional(),
                taskNumber: z.string().optional(),
                triggerId: z.string().describe(
                  "Stats have been or will be aggregated on set fields for any semantically-meaningful combination.",
                ).optional(),
                warningEnumString: z.string().optional(),
                workflowId: z.string().optional(),
                workflowName: z.string().optional(),
              }).optional(),
              durationInSeconds: z.number().describe(
                "Average duration in seconds.",
              ).optional(),
              errorRate: z.number().describe("Average error rate.").optional(),
              qps: z.number().describe("Queries per second.").optional(),
              warningRate: z.number().describe("Average warning rate.")
                .optional(),
            }).describe(
              "Stats for the requested dimensions: QPS, duration, and error/warning rate",
            ).optional(),
            taskType: z.enum(["TASK", "ASIS_TEMPLATE", "IO_TEMPLATE"]).describe(
              "Defines the type of the task",
            ).optional(),
            uiConfig: z.object({
              taskUiModuleConfigs: z.array(z.object({
                moduleId: z.enum([
                  "UNSPECIFIED_TASK_MODULE",
                  "LABEL",
                  "ERROR_HANDLING",
                  "TASK_PARAM_TABLE",
                  "TASK_PARAM_FORM",
                  "PRECONDITION",
                  "SCRIPT_EDITOR",
                  "RPC",
                  "TASK_SUMMARY",
                  "SUSPENSION",
                  "RPC_TYPED",
                  "SUB_WORKFLOW",
                  "APPS_SCRIPT_NAVIGATOR",
                  "SUB_WORKFLOW_FOR_EACH_LOOP",
                  "FIELD_MAPPING",
                  "README",
                  "REST_CALLER",
                  "SUB_WORKFLOW_SCATTER_GATHER",
                  "CLOUD_SQL",
                  "GENERIC_CONNECTOR_TASK",
                ]).describe("ID of the config module.").optional(),
              })).describe("Configurations of included config modules.")
                .optional(),
            }).describe(
              "Task authors would use this type to configure the UI for a particular task by specifying what UI config modules should be included to compose the UI. Learn more about config module framework:",
            ).optional(),
          }).describe(
            "Contains a task's metadata and associated information. Next available id: 7",
          ).optional(),
          taskExecutionStrategy: z.enum([
            "WHEN_ALL_SUCCEED",
            "WHEN_ANY_SUCCEED",
            "WHEN_ALL_TASKS_AND_CONDITIONS_SUCCEED",
          ]).describe(
            "The policy dictating the execution strategy of this task.",
          ).optional(),
          taskName: z.string().describe("The name for the task.").optional(),
          taskNumber: z.string().describe(
            "REQUIRED: the identifier of this task within its parent event config, specified by the client. This should be unique among all the tasks belong to the same event config. We use this field as the identifier to find next tasks (via field `next_tasks.task_number`).",
          ).optional(),
          taskSpec: z.string().describe(
            'A string template that allows user to configure task parameters (with either literal default values or tokens which will be resolved at execution time) for the task. It will eventually replace the old "parameters" field.',
          ).optional(),
          taskTemplateName: z.string().describe(
            "Used to define task-template name if task is of type task-template",
          ).optional(),
          taskType: z.enum(["TASK", "ASIS_TEMPLATE", "IO_TEMPLATE"]).describe(
            "Defines the type of the task",
          ).optional(),
        })).describe(
          "Optional. Task configuration for the integration. It's optional, but the integration doesn't do anything without task_configs.",
        ).optional(),
        teardown: z.object({
          teardownTaskConfigs: z.array(z.object({
            creatorEmail: z.string().describe("The creator's email address.")
              .optional(),
            name: z.string().describe(
              "Required. Unique identifier of the teardown task within this Config. We use this field as the identifier to find next teardown tasks.",
            ).optional(),
            nextTeardownTask: z.object({
              name: z.string().describe(
                "Required. Name of the next teardown task.",
              ).optional(),
            }).describe(
              "The teardown task that is next in line to be executed. We support only sequential execution of teardown tasks (i.e. no branching).",
            ).optional(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "LINT.IfChange To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            properties: z.object({
              properties: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding property value. This should be unique for a given fired event. The Tasks should be aware of the keys used while firing the events for them to be able to retrieve the values.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("An unordered list of property entries.").optional(),
            }).describe(
              "LINT.IfChange This message is used for storing key value pair properties for each Event / Task in the EventBus.",
            ).optional(),
            teardownTaskImplementationClassName: z.string().describe(
              "Required. Implementation class name.",
            ).optional(),
          })).describe("Required.").optional(),
        }).optional(),
        triggerConfigs: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "The period over which the metric value should be aggregated and evaluated. Format is, where integer should be a positive integer and unit should be one of (s,m,h,d,w) meaning (second, minute, hour, day, week). For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
            ).optional(),
            alertThreshold: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            disableAlert: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this integration alert.",
            ).optional(),
            displayName: z.string().describe(
              "Name of the alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the integration.",
            ).optional(),
            durationThreshold: z.string().describe(
              "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "EVENT_ERROR_RATE",
              "EVENT_WARNING_RATE",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "EVENT_RATE",
              "EVENT_AVERAGE_DURATION",
              "EVENT_PERCENTILE_DURATION",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).describe("The type of metric.").optional(),
            onlyFinalAttempt: z.boolean().describe(
              "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
            ).optional(),
            thresholdType: z.enum([
              "THRESHOLD_TYPE_UNSPECIFIED",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().describe("Absolute value threshold.")
                .optional(),
              percentage: z.number().int().describe("Percentage threshold.")
                .optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
          })).describe(
            "Optional. An alert threshold configuration for the [trigger + client + integration] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + integration] when published.",
          ).optional(),
          cloudSchedulerConfig: z.object({
            cronTab: z.string().describe(
              "Required. The cron tab of cloud scheduler trigger.",
            ).optional(),
            errorMessage: z.string().describe(
              "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
            ).optional(),
            location: z.string().describe(
              "Required. The location where associated cloud scheduler job will be created",
            ).optional(),
            serviceAccountEmail: z.string().describe(
              "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
            ).optional(),
          }).describe("Cloud Scheduler Trigger configuration").optional(),
          description: z.string().describe(
            "Optional. User-provided description intended to give additional business context about the task.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional. Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          label: z.string().describe(
            "Optional. The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "NEXT_TASKS_EXECUTION_POLICY_UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe("Optional. Dictates how next tasks will be executed.")
            .optional(),
          outputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          position: z.object({
            x: z.number().int().describe("Required. X axis of the coordinate")
              .optional(),
            y: z.number().int().describe("Required. Y axis of the coordinate")
              .optional(),
          }).describe("Configuration detail of coordinate, it used for UI")
            .optional(),
          properties: z.record(z.string(), z.string()).describe(
            'Optional. Configurable properties of the trigger, not to be confused with integration parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Pub/sub triggers.',
          ).optional(),
          startTasks: z.array(z.object({
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give additional business context about the task.",
            ).optional(),
            displayName: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskId: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Optional. Set of tasks numbers from where the integration execution is started by this trigger. If this is empty, then integration is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same integration execution graph).",
          ).optional(),
          trigger: z.string().describe(
            'Optional. Name of the trigger. Example: "API Trigger", "Cloud Pub Sub Trigger" When set will be sent out to monitoring dashabord for tracking purpose.',
          ).optional(),
          triggerId: z.string().describe(
            'Optional. Auto-generated trigger ID. The ID is based on the properties that you define in the trigger config. For example, for an API trigger, the trigger ID follows the format: api_trigger/TRIGGER_NAME Where trigger config has properties with value {"Trigger name": TRIGGER_NAME}',
          ).optional(),
          triggerNumber: z.string().describe(
            "Required. A number to uniquely identify each trigger config within the integration on UI.",
          ).optional(),
          triggerType: z.enum([
            "TRIGGER_TYPE_UNSPECIFIED",
            "CRON",
            "API",
            "SFDC_CHANNEL",
            "CLOUD_PUBSUB_EXTERNAL",
            "SFDC_CDC_CHANNEL",
            "CLOUD_SCHEDULER",
            "INTEGRATION_CONNECTOR_TRIGGER",
            "PRIVATE_TRIGGER",
            "CLOUD_PUBSUB",
            "EVENTARC_TRIGGER",
          ]).describe("Optional. Type of trigger").optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        triggerConfigsInternal: z.array(z.object({
          alertConfig: z.array(z.object({
            aggregationPeriod: z.string().describe(
              "For an EXPECTED_MIN threshold, this aggregation_period must be lesser than 24 hours.",
            ).optional(),
            alertDisabled: z.boolean().describe(
              "Set to false by default. When set to true, the metrics are not aggregated or pushed to Monarch for this workflow alert.",
            ).optional(),
            alertName: z.string().describe(
              "A name to identify this alert. This will be displayed in the alert subject. If set, this name should be unique within the scope of the workflow.",
            ).optional(),
            clientId: z.string().describe(
              "Client associated with this alert configuration.",
            ).optional(),
            durationThresholdMs: z.string().describe(
              "Should be specified only for *AVERAGE_DURATION and *PERCENTILE_DURATION metrics. This member should be used to specify what duration value the metrics should exceed for the alert to trigger.",
            ).optional(),
            errorEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
            metricType: z.enum([
              "METRIC_TYPE_UNSPECIFIED",
              "EVENT_ERROR_RATE",
              "EVENT_WARNING_RATE",
              "TASK_ERROR_RATE",
              "TASK_WARNING_RATE",
              "TASK_RATE",
              "EVENT_RATE",
              "EVENT_AVERAGE_DURATION",
              "EVENT_PERCENTILE_DURATION",
              "TASK_AVERAGE_DURATION",
              "TASK_PERCENTILE_DURATION",
            ]).optional(),
            numAggregationPeriods: z.number().int().describe(
              "For how many contiguous aggregation periods should the expected min or max be violated for the alert to be fired.",
            ).optional(),
            onlyFinalAttempt: z.boolean().describe(
              "For either events or tasks, depending on the type of alert, count only final attempts, not retries.",
            ).optional(),
            playbookUrl: z.string().describe(
              "Link to a playbook for resolving the issue that triggered this alert.",
            ).optional(),
            thresholdType: z.enum([
              "UNSPECIFIED_THRESHOLD_TYPE",
              "EXPECTED_MIN",
              "EXPECTED_MAX",
            ]).describe(
              "The threshold type, whether lower(expected_min) or upper(expected_max), for which this alert is being configured. If value falls below expected_min or exceeds expected_max, an alert will be fired.",
            ).optional(),
            thresholdValue: z.object({
              absolute: z.string().optional(),
              percentage: z.number().int().optional(),
            }).describe(
              "The threshold value of the metric, above or below which the alert should be triggered. See EventAlertConfig or TaskAlertConfig for the different alert metric types in each case. For the *RATE metrics, one or both of these fields may be set. Zero is the default value and can be left at that. For *PERCENTILE_DURATION metrics, one or both of these fields may be set, and also, the duration threshold value should be specified in the threshold_duration_ms member below. For *AVERAGE_DURATION metrics, these fields should not be set at all. A different member, threshold_duration_ms, must be set in the EventAlertConfig or the TaskAlertConfig.",
            ).optional(),
            warningEnumList: z.object({
              enumStrings: z.array(z.string()).optional(),
              filterType: z.enum(["DEFAULT_INCLUSIVE", "EXCLUSIVE"]).optional(),
            }).describe("List of error enums for alerts.").optional(),
          })).describe(
            "An alert threshold configuration for the [trigger + client + workflow] tuple. If these values are not specified in the trigger config, default values will be populated by the system. Note that there must be exactly one alert threshold configured per [client + trigger + workflow] when published.",
          ).optional(),
          cloudSchedulerConfig: z.object({
            cronTab: z.string().describe(
              "Required. The cron tab of cloud scheduler trigger.",
            ).optional(),
            errorMessage: z.string().describe(
              "Optional. When the job was deleted from Pantheon UI, error_message will be populated when Get/List integrations",
            ).optional(),
            location: z.string().describe(
              "Required. The location where associated cloud scheduler job will be created",
            ).optional(),
            serviceAccountEmail: z.string().describe(
              "Required. Service account used by Cloud Scheduler to trigger the integration at scheduled time",
            ).optional(),
          }).describe("Cloud Scheduler Trigger configuration").optional(),
          description: z.string().describe(
            "User-provided description intended to give more business context about the task.",
          ).optional(),
          enabledClients: z.array(z.string()).describe(
            "Required. The list of client ids which are enabled to execute the workflow using this trigger. In other words, these clients have the workflow execution privledges for this trigger. For API trigger, the client id in the incoming request is validated against the list of enabled clients. For non-API triggers, one workflow execution is triggered on behalf of each enabled client.",
          ).optional(),
          errorCatcherId: z.string().describe(
            "Optional Error catcher id of the error catch flow which will be executed when execution error happens in the task",
          ).optional(),
          inputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          label: z.string().describe(
            "The user created label for a particular trigger.",
          ).optional(),
          nextTasksExecutionPolicy: z.enum([
            "UNSPECIFIED",
            "RUN_ALL_MATCH",
            "RUN_FIRST_MATCH",
          ]).describe("Dictates how next tasks will be executed.").optional(),
          outputVariables: z.object({
            names: z.array(z.string()).describe(
              "Optional. List of variable names.",
            ).optional(),
          }).describe("Variables names mapped to api trigger.").optional(),
          pauseWorkflowExecutions: z.boolean().describe(
            "Optional. If set to true, any upcoming requests for this trigger config will be paused and the executions will be resumed later when the flag is reset. The workflow to which this trigger config belongs has to be in ACTIVE status for the executions to be paused or resumed.",
          ).optional(),
          position: z.object({
            x: z.number().int().optional(),
            y: z.number().int().optional(),
          }).describe("Represents two-dimensional positions.").optional(),
          properties: z.record(z.string(), z.string()).describe(
            'Configurable properties of the trigger, not to be confused with workflow parameters. E.g. "name" is a property for API triggers and "subscription" is a property for Cloud Pubsub triggers.',
          ).optional(),
          startTasks: z.array(z.object({
            combinedConditions: z.array(z.object({
              conditions: z.array(z.object({
                eventPropertyKey: z.string().describe(
                  "Key that's evaluated against the `value`. Please note the data type of the runtime value associated with the key should match the data type of `value`, else an IllegalArgumentException is thrown.",
                ).optional(),
                operator: z.enum([
                  "UNSET",
                  "EQUALS",
                  "CONTAINS",
                  "LESS_THAN",
                  "GREATER_THAN",
                  "EXISTS",
                  "DOES_NOT_EXIST",
                  "IS_EMPTY",
                  "IS_NOT_EMPTY",
                ]).describe(
                  "Operator used to evaluate the condition. Please note that an operator with an inappropriate key/value operand will result in IllegalArgumentException, e.g. CONTAINS with boolean key/value pair.",
                ).optional(),
                value: z.object({
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    values: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  stringArray: z.object({
                    values: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "Used for define type for values. Currently supported value types include int, string, double, array, and any proto message.",
                ).optional(),
              })).describe("A set of individual constituent conditions.")
                .optional(),
            })).describe(
              "Combined condition for this task to become an eligible next task. Each of these combined_conditions are joined with logical OR. DEPRECATED: use `condition`",
            ).optional(),
            condition: z.string().describe(
              "Standard filter expression for this task to become an eligible next task.",
            ).optional(),
            description: z.string().describe(
              "User-provided description intended to give more business context about the next task edge or condition.",
            ).optional(),
            label: z.string().describe(
              "User-provided label that is attached to this edge in the UI.",
            ).optional(),
            taskConfigId: z.string().describe("ID of the next task.")
              .optional(),
            taskNumber: z.string().describe("Task number of the next task.")
              .optional(),
          })).describe(
            "Set of tasks numbers from where the workflow execution is started by this trigger. If this is empty, then workflow is executed with default start tasks. In the list of start tasks, none of two tasks can have direct ancestor-descendant relationships (i.e. in a same workflow execution graph).",
          ).optional(),
          triggerCriteria: z.object({
            condition: z.string().describe(
              "Required. Standard filter expression, when true the workflow will be executed. If there's no trigger_criteria_task_implementation_class_name specified, the condition will be validated directly.",
            ).optional(),
            parameters: z.object({
              parameters: z.array(z.object({
                key: z.string().describe(
                  "Key is used to retrieve the corresponding parameter value. This should be unique for a given fired event. These parameters must be predefined in the integration definition.",
                ).optional(),
                masked: z.boolean().describe(
                  "True if this parameter should be masked in the logs",
                ).optional(),
                value: z.object({
                  booleanArray: z.object({
                    booleanValues: z.array(z.boolean()).optional(),
                  }).optional(),
                  booleanValue: z.boolean().optional(),
                  doubleArray: z.object({
                    doubleValues: z.array(z.number()).optional(),
                  }).optional(),
                  doubleValue: z.number().optional(),
                  intArray: z.object({
                    intValues: z.array(z.string()).optional(),
                  }).optional(),
                  intValue: z.string().optional(),
                  protoArray: z.object({
                    protoValues: z.array(z.record(z.string(), z.string()))
                      .optional(),
                  }).optional(),
                  protoValue: z.record(z.string(), z.string()).optional(),
                  serializedObjectValue: z.object({
                    objectValue: z.string().optional(),
                  }).optional(),
                  stringArray: z.object({
                    stringValues: z.array(z.string()).optional(),
                  }).optional(),
                  stringValue: z.string().optional(),
                }).describe(
                  "LINT.IfChange To support various types of parameter values. Next available id: 14",
                ).optional(),
              })).describe(
                "Parameters are a part of Event and can be used to communicate between different tasks that are part of the same integration execution.",
              ).optional(),
            }).describe(
              "LINT.IfChange This message is used for processing and persisting (when applicable) key value pair parameters for each event in the event bus. Please see",
            ).optional(),
            triggerCriteriaTaskImplementationClassName: z.string().describe(
              "Optional. Implementation class name. The class should implement the “TypedTask” interface.",
            ).optional(),
          }).optional(),
          triggerId: z.string().describe("The backend trigger ID.").optional(),
          triggerName: z.string().describe(
            "Optional. Name of the trigger This is added to identify the type of trigger. This is avoid the logic on triggerId to identify the trigger_type and push the same to monitoring.",
          ).optional(),
          triggerNumber: z.string().describe(
            "Required. A number to uniquely identify each trigger config within the workflow on UI.",
          ).optional(),
          triggerType: z.enum([
            "UNKNOWN",
            "CLOUD_PUBSUB",
            "GOOPS",
            "SFDC_SYNC",
            "CRON",
            "API",
            "MANIFOLD_TRIGGER",
            "DATALAYER_DATA_CHANGE",
            "SFDC_CHANNEL",
            "CLOUD_PUBSUB_EXTERNAL",
            "SFDC_CDC_CHANNEL",
            "SFDC_PLATFORM_EVENTS_CHANNEL",
            "CLOUD_SCHEDULER",
            "INTEGRATION_CONNECTOR_TRIGGER",
            "PRIVATE_TRIGGER",
            "EVENTARC_TRIGGER",
          ]).optional(),
        })).describe("Optional. Trigger configurations.").optional(),
        updateTime: z.string().describe("Output only. Auto-generated.")
          .optional(),
        userLabel: z.string().describe(
          "Optional. A user-defined label that annotates an integration version. Typically, this is only set when the integration version is created.",
        ).optional(),
      }).describe("The integration version definition.").optional(),
      key: z.string().describe(
        "Required. Unique Key of the IntegrationVersion.",
      ).optional(),
    })).describe(
      "Optional. Sub integration templates which would be added along with main integration.",
    ).optional(),
  }).describe("Define the bundle of the template.").optional(),
  usageCount: z.string().describe("Optional. Number of template usages.")
    .optional(),
  usageInfo: z.string().describe(
    "Optional. Information on how to use the template. This should contain detailed information about usage of the template.",
  ).optional(),
  visibility: z.enum(["VISIBILITY_UNSPECIFIED", "PRIVATE", "SHARED", "PUBLIC"])
    .describe("Required. Visibility of the template.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/integrations/templates",
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
      description: "Defines the template for Application Integration",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a templates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["categories"] !== undefined) body["categories"] = g["categories"];
        if (g["components"] !== undefined) body["components"] = g["components"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["docLink"] !== undefined) body["docLink"] = g["docLink"];
        if (g["lastUsedTime"] !== undefined) {
          body["lastUsedTime"] = g["lastUsedTime"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["sharedWith"] !== undefined) body["sharedWith"] = g["sharedWith"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["templateBundle"] !== undefined) {
          body["templateBundle"] = g["templateBundle"];
        }
        if (g["usageCount"] !== undefined) body["usageCount"] = g["usageCount"];
        if (g["usageInfo"] !== undefined) body["usageInfo"] = g["usageInfo"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
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
      description: "Get a templates",
      arguments: z.object({
        identifier: z.string().describe("The name of the templates"),
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
      description: "Update templates attributes",
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
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["categories"] !== undefined) body["categories"] = g["categories"];
        if (g["components"] !== undefined) body["components"] = g["components"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["docLink"] !== undefined) body["docLink"] = g["docLink"];
        if (g["lastUsedTime"] !== undefined) {
          body["lastUsedTime"] = g["lastUsedTime"];
        }
        if (g["sharedWith"] !== undefined) body["sharedWith"] = g["sharedWith"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["templateBundle"] !== undefined) {
          body["templateBundle"] = g["templateBundle"];
        }
        if (g["usageCount"] !== undefined) body["usageCount"] = g["usageCount"];
        if (g["usageInfo"] !== undefined) body["usageInfo"] = g["usageInfo"];
        if (g["visibility"] !== undefined) body["visibility"] = g["visibility"];
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
      description: "Delete the templates",
      arguments: z.object({
        identifier: z.string().describe("The name of the templates"),
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
      description: "Sync templates state from GCP",
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
    download: {
      description: "download",
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
            "id": "integrations.projects.locations.templates.download",
            "path": "v1/{+name}:download",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "fileFormat": { "location": "query" },
              "name": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        integration: z.any().optional(),
        subIntegrations: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["integration"] !== undefined) {
          body["integration"] = args["integration"];
        }
        if (args["subIntegrations"] !== undefined) {
          body["subIntegrations"] = args["subIntegrations"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "integrations.projects.locations.templates.import",
            "path": "v1/{+name}:import",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    search: {
      description: "search",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "integrations.projects.locations.templates.search",
            "path": "v1/{+parent}/templates:search",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "enableNaturalLanguageQueryUnderstanding": {
                "location": "query",
              },
              "filter": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "query": { "location": "query" },
              "readMask": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    share: {
      description: "share",
      arguments: z.object({
        resourceNames: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["resourceNames"] !== undefined) {
          body["resourceNames"] = args["resourceNames"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "integrations.projects.locations.templates.share",
            "path": "v1/{+name}:share",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    unshare: {
      description: "unshare",
      arguments: z.object({
        resourceNames: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["resourceNames"] !== undefined) {
          body["resourceNames"] = args["resourceNames"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "integrations.projects.locations.templates.unshare",
            "path": "v1/{+name}:unshare",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    upload: {
      description: "upload",
      arguments: z.object({
        content: z.any().optional(),
        fileFormat: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["content"] !== undefined) body["content"] = args["content"];
        if (args["fileFormat"] !== undefined) {
          body["fileFormat"] = args["fileFormat"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "integrations.projects.locations.templates.upload",
            "path": "v1/{+parent}/templates:upload",
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
    use: {
      description: "use",
      arguments: z.object({
        integrationDetails: z.any().optional(),
        integrationRegion: z.any().optional(),
        subIntegrations: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["integrationDetails"] !== undefined) {
          body["integrationDetails"] = args["integrationDetails"];
        }
        if (args["integrationRegion"] !== undefined) {
          body["integrationRegion"] = args["integrationRegion"];
        }
        if (args["subIntegrations"] !== undefined) {
          body["subIntegrations"] = args["subIntegrations"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "integrations.projects.locations.templates.use",
            "path": "v1/{+name}:use",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
