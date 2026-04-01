// Auto-generated extension model for @swamp/gcp/dlp/jobtriggers
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
  return `${parent}/jobTriggers/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.locations.jobTriggers.get",
  "path": "v2/{+name}",
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
  "id": "dlp.organizations.locations.jobTriggers.create",
  "path": "v2/{+parent}/jobTriggers",
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
  "id": "dlp.organizations.locations.jobTriggers.patch",
  "path": "v2/{+name}",
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
  "id": "dlp.organizations.locations.jobTriggers.delete",
  "path": "v2/{+name}",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  jobTrigger: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of a triggeredJob.",
    ).optional(),
    description: z.string().describe(
      "User provided description (max 256 chars)",
    ).optional(),
    displayName: z.string().describe("Display name (max 100 chars)").optional(),
    errors: z.array(z.object({
      details: z.object({
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
      extraInfo: z.enum([
        "ERROR_INFO_UNSPECIFIED",
        "IMAGE_SCAN_UNAVAILABLE_IN_REGION",
        "FILE_STORE_CLUSTER_UNSUPPORTED",
      ]).describe("Additional information about the error.").optional(),
      timestamps: z.array(z.string()).describe(
        "The times the error occurred. List includes the oldest timestamp and the last 9 timestamps.",
      ).optional(),
    })).describe(
      "Output only. A stream of errors encountered when the trigger was activated. Repeated errors may result in the JobTrigger automatically being paused. Will return the last 100 errors. Whenever the JobTrigger is modified this list will be cleared.",
    ).optional(),
    inspectJob: z.object({
      actions: z.array(z.object({
        deidentify: z.object({
          cloudStorageOutput: z.string().describe(
            "Required. User settable Cloud Storage bucket and folders to store de-identified files. This field must be set for Cloud Storage deidentification. The output Cloud Storage bucket must be different from the input bucket. De-identified files will overwrite files in the output path. Form of: gs://bucket/folder/ or gs://bucket",
          ).optional(),
          fileTypesToTransform: z.array(
            z.enum([
              "FILE_TYPE_UNSPECIFIED",
              "BINARY_FILE",
              "TEXT_FILE",
              "IMAGE",
              "WORD",
              "PDF",
              "AVRO",
              "CSV",
              "TSV",
              "POWERPOINT",
              "EXCEL",
            ]),
          ).describe(
            "List of user-specified file type groups to transform. If specified, only the files with these file types are transformed. If empty, all supported files are transformed. Supported types may be automatically added over time. Any unsupported file types that are set in this field are excluded from de-identification. An error is recorded for each unsupported file in the TransformationDetails output table. Currently the only file types supported are: IMAGES, TEXT_FILES, CSV, TSV.",
          ).optional(),
          transformationConfig: z.object({
            deidentifyTemplate: z.string().describe(
              "De-identify template. If this template is specified, it will serve as the default de-identify template. This template cannot contain `record_transformations` since it can be used for unstructured content such as free-form text files. If this template is not set, a default `ReplaceWithInfoTypeConfig` will be used to de-identify unstructured content.",
            ).optional(),
            imageRedactTemplate: z.string().describe(
              "Image redact template. If this template is specified, it will serve as the de-identify template for images. If this template is not set, all findings in the image will be redacted with a black box.",
            ).optional(),
            structuredDeidentifyTemplate: z.string().describe(
              "Structured de-identify template. If this template is specified, it will serve as the de-identify template for structured content such as delimited files and tables. If this template is not set but the `deidentify_template` is set, then `deidentify_template` will also apply to the structured content. If neither template is set, a default `ReplaceWithInfoTypeConfig` will be used to de-identify structured content.",
            ).optional(),
          }).describe(
            "User specified templates and configs for how to deidentify structured, unstructures, and image files. User must provide either a unstructured deidentify template or at least one redact image config.",
          ).optional(),
          transformationDetailsStorageConfig: z.object({
            table: z.object({
              datasetId: z.string().describe("Dataset ID of the table.")
                .optional(),
              projectId: z.string().describe(
                "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
              ).optional(),
              tableId: z.string().describe("Name of the table.").optional(),
            }).describe(
              "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
            ).optional(),
          }).describe("Config for storing transformation details.").optional(),
        }).describe(
          "Create a de-identified copy of a storage bucket. Only compatible with Cloud Storage buckets. A TransformationDetail will be created for each transformation. Compatible with: Inspection of Cloud Storage",
        ).optional(),
        jobNotificationEmails: z.object({}).describe(
          "Sends an email when the job completes. The email goes to IAM project owners and technical [Essential Contacts](https://cloud.google.com/resource-manager/docs/managing-notification-contacts).",
        ).optional(),
        pubSub: z.object({
          topic: z.string().describe(
            "Cloud Pub/Sub topic to send notifications to. The topic must have given publishing access rights to the DLP API service account executing the long running DlpJob sending the notifications. Format is projects/{project}/topics/{topic}.",
          ).optional(),
        }).describe(
          "Publish a message into a given Pub/Sub topic when DlpJob has completed. The message contains a single field, `DlpJobName`, which is equal to the finished job's [`DlpJob.name`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/projects.dlpJobs#DlpJob). Compatible with: Inspect, Risk",
        ).optional(),
        publishFindingsToCloudDataCatalog: z.object({}).describe(
          "Publish findings of a DlpJob to Data Catalog. In Data Catalog, tag templates are applied to the resource that Cloud DLP scanned. Data Catalog tag templates are stored in the same project and region where the BigQuery table exists. For Cloud DLP to create and apply the tag template, the Cloud DLP service agent must have the `roles/datacatalog.tagTemplateOwner` permission on the project. The tag template contains fields summarizing the results of the DlpJob. Any field values previously written by another DlpJob are deleted. InfoType naming patterns are strictly enforced when using this feature. Findings are persisted in Data Catalog storage and are governed by service-specific policies for Data Catalog. For more information, see [Service Specific Terms](https://cloud.google.com/terms/service-terms). Only a single instance of this action can be specified. This action is allowed only if all resources being scanned are BigQuery tables. Compatible with: Inspect",
        ).optional(),
        publishFindingsToDataplexCatalog: z.object({}).describe(
          "Publish findings of a DlpJob to Dataplex Universal Catalog as a `sensitive-data-protection-job-result` aspect. For more information, see [Send inspection results to Dataplex Universal Catalog as aspects](https://cloud.google.com/sensitive-data-protection/docs/add-aspects-inspection-job). Aspects are stored in Dataplex Universal Catalog storage and are governed by service-specific policies for Dataplex Universal Catalog. For more information, see [Service Specific Terms](https://cloud.google.com/terms/service-terms). Only a single instance of this action can be specified. This action is allowed only if all resources being scanned are BigQuery tables. Compatible with: Inspect",
        ).optional(),
        publishSummaryToCscc: z.object({}).describe(
          "Publish the result summary of a DlpJob to [Security Command Center](https://cloud.google.com/security-command-center). This action is available for only projects that belong to an organization. This action publishes the count of finding instances and their infoTypes. The summary of findings are persisted in Security Command Center and are governed by [service-specific policies for Security Command Center](https://cloud.google.com/terms/service-terms). Only a single instance of this action can be specified. Compatible with: Inspect",
        ).optional(),
        publishToStackdriver: z.object({}).describe(
          "Enable Stackdriver metric dlp.googleapis.com/finding_count. This will publish a metric to stack driver on each infotype requested and how many findings were found for it. CustomDetectors will be bucketed as 'Custom' under the Stackdriver label 'info_type'.",
        ).optional(),
        saveFindings: z.object({
          outputConfig: z.object({
            outputSchema: z.enum([
              "OUTPUT_SCHEMA_UNSPECIFIED",
              "BASIC_COLUMNS",
              "GCS_COLUMNS",
              "DATASTORE_COLUMNS",
              "BIG_QUERY_COLUMNS",
              "ALL_COLUMNS",
            ]).describe(
              "Schema used for writing the findings for Inspect jobs. This field is only used for Inspect and must be unspecified for Risk jobs. Columns are derived from the `Finding` object. If appending to an existing table, any columns from the predefined schema that are missing will be added. No columns in the existing table will be deleted. If unspecified, then all available columns will be used for a new table or an (existing) table with no schema, and no changes will be made to an existing table that has a schema. Only for use with external storage.",
            ).optional(),
            storagePath: z.object({
              path: z.string().describe(
                "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
              ).optional(),
            }).describe(
              "Message representing a single file or path in Cloud Storage.",
            ).optional(),
            table: z.object({
              datasetId: z.string().describe("Dataset ID of the table.")
                .optional(),
              projectId: z.string().describe(
                "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
              ).optional(),
              tableId: z.string().describe("Name of the table.").optional(),
            }).describe(
              "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
            ).optional(),
          }).describe("Cloud repository for storing output.").optional(),
        }).describe(
          "If set, the detailed findings will be persisted to the specified OutputStorageConfig. Only a single instance of this action can be specified. Compatible with: Inspect, Risk",
        ).optional(),
      })).describe("Actions to execute at the completion of the job.")
        .optional(),
      inspectConfig: z.object({
        contentOptions: z.array(
          z.enum(["CONTENT_UNSPECIFIED", "CONTENT_TEXT", "CONTENT_IMAGE"]),
        ).describe("Deprecated and unused.").optional(),
        customInfoTypes: z.array(z.object({
          detectionRules: z.array(z.object({
            hotwordRule: z.object({
              hotwordRegex: z.object({
                groupIndexes: z.array(z.number().int()).describe(
                  "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
                ).optional(),
                pattern: z.string().describe(
                  "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
                ).optional(),
              }).describe("Message defining a custom regular expression.")
                .optional(),
              likelihoodAdjustment: z.object({
                fixedLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe("Set the likelihood of a finding to a fixed value.")
                  .optional(),
                relativeLikelihood: z.number().int().describe(
                  "Increase or decrease the likelihood by the specified number of levels. For example, if a finding would be `POSSIBLE` without the detection rule and `relative_likelihood` is 1, then it is upgraded to `LIKELY`, while a value of -1 would downgrade it to `UNLIKELY`. Likelihood may never drop below `VERY_UNLIKELY` or exceed `VERY_LIKELY`, so applying an adjustment of 1 followed by an adjustment of -1 when base likelihood is `VERY_LIKELY` will result in a final likelihood of `LIKELY`.",
                ).optional(),
              }).describe(
                "Message for specifying an adjustment to the likelihood of a finding as part of a detection rule.",
              ).optional(),
              proximity: z.object({
                windowAfter: z.number().int().describe(
                  "Number of characters after the finding to consider.",
                ).optional(),
                windowBefore: z.number().int().describe(
                  "Number of characters before the finding to consider. For tabular data, if you want to modify the likelihood of an entire column of findngs, set this to 1. For more information, see [Hotword example: Set the match likelihood of a table column] (https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes-likelihood#match-column-values).",
                ).optional(),
              }).describe(
                "Message for specifying a window around a finding to apply a detection rule.",
              ).optional(),
            }).describe(
              "The rule that adjusts the likelihood of findings within a certain proximity of hotwords.",
            ).optional(),
          })).describe(
            "Set of detection rules to apply to all findings of this CustomInfoType. Rules are applied in the order that they are specified. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          dictionary: z.object({
            cloudStoragePath: z.object({
              path: z.string().describe(
                "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
              ).optional(),
            }).describe(
              "Message representing a single file or path in Cloud Storage.",
            ).optional(),
            wordList: z.object({
              words: z.array(z.string()).describe(
                "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
              ).optional(),
            }).describe(
              "Message defining a list of words or phrases to search for in the data.",
            ).optional(),
          }).describe(
            'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
          ).optional(),
          exclusionType: z.enum([
            "EXCLUSION_TYPE_UNSPECIFIED",
            "EXCLUSION_TYPE_EXCLUDE",
          ]).describe(
            "If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          infoType: z.object({
            name: z.string().describe(
              "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
            ).optional(),
            sensitivityScore: z.object({
              score: z.enum([
                "SENSITIVITY_SCORE_UNSPECIFIED",
                "SENSITIVITY_LOW",
                "SENSITIVITY_UNKNOWN",
                "SENSITIVITY_MODERATE",
                "SENSITIVITY_HIGH",
              ]).describe("The sensitivity score applied to the resource.")
                .optional(),
            }).describe(
              "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
            ).optional(),
            version: z.string().describe(
              "Optional version name for this InfoType.",
            ).optional(),
          }).describe("Type of information detected by the API.").optional(),
          likelihood: z.enum([
            "LIKELIHOOD_UNSPECIFIED",
            "VERY_UNLIKELY",
            "UNLIKELY",
            "POSSIBLE",
            "LIKELY",
            "VERY_LIKELY",
          ]).describe(
            "Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified.",
          ).optional(),
          metadataKeyValueExpression: z.object({
            keyRegex: z.string().describe(
              "The regular expression for the key. Key should be non-empty.",
            ).optional(),
            valueRegex: z.string().describe(
              "The regular expression for the value. Value should be non-empty.",
            ).optional(),
          }).describe(
            "Configuration for a custom infoType that detects key-value pairs in the metadata matching the specified regular expressions.",
          ).optional(),
          regex: z.object({
            groupIndexes: z.array(z.number().int()).describe(
              "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
            ).optional(),
            pattern: z.string().describe(
              "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
            ).optional(),
          }).describe("Message defining a custom regular expression.")
            .optional(),
          sensitivityScore: z.object({
            score: z.enum([
              "SENSITIVITY_SCORE_UNSPECIFIED",
              "SENSITIVITY_LOW",
              "SENSITIVITY_UNKNOWN",
              "SENSITIVITY_MODERATE",
              "SENSITIVITY_HIGH",
            ]).describe("The sensitivity score applied to the resource.")
              .optional(),
          }).describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          storedType: z.object({
            createTime: z.string().describe(
              "Timestamp indicating when the version of the `StoredInfoType` used for inspection was created. Output-only field, populated by the system.",
            ).optional(),
            name: z.string().describe(
              "Resource name of the requested `StoredInfoType`, for example `organizations/433245324/storedInfoTypes/432452342` or `projects/project-id/storedInfoTypes/432452342`.",
            ).optional(),
          }).describe("A reference to a StoredInfoType to use with scanning.")
            .optional(),
          surrogateType: z.object({}).describe(
            'Message for detecting output from deidentification transformations such as [`CryptoReplaceFfxFpeConfig`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/organizations.deidentifyTemplates#cryptoreplaceffxfpeconfig). These types of transformations are those that perform pseudonymization, thereby producing a "surrogate" as output. This should be used in conjunction with a field on the transformation such as `surrogate_info_type`. This CustomInfoType does not support the use of `detection_rules`.',
          ).optional(),
        })).describe(
          "CustomInfoTypes provided by the user. See https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more.",
        ).optional(),
        excludeInfoTypes: z.boolean().describe(
          "When true, excludes type information of the findings. This is not used for data profiling.",
        ).optional(),
        includeQuote: z.boolean().describe(
          "When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling.",
        ).optional(),
        infoTypes: z.array(z.object({
          name: z.string().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.object({
            score: z.enum([
              "SENSITIVITY_SCORE_UNSPECIFIED",
              "SENSITIVITY_LOW",
              "SENSITIVITY_UNKNOWN",
              "SENSITIVITY_MODERATE",
              "SENSITIVITY_HIGH",
            ]).describe("The sensitivity score applied to the resource.")
              .optional(),
          }).describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          version: z.string().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        })).describe(
          "Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time.",
        ).optional(),
        limits: z.object({
          maxFindingsPerInfoType: z.array(z.object({
            infoType: z.object({
              name: z.string().describe(
                "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
              ).optional(),
              sensitivityScore: z.object({
                score: z.enum([
                  "SENSITIVITY_SCORE_UNSPECIFIED",
                  "SENSITIVITY_LOW",
                  "SENSITIVITY_UNKNOWN",
                  "SENSITIVITY_MODERATE",
                  "SENSITIVITY_HIGH",
                ]).describe("The sensitivity score applied to the resource.")
                  .optional(),
              }).describe(
                "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
              ).optional(),
              version: z.string().describe(
                "Optional version name for this InfoType.",
              ).optional(),
            }).describe("Type of information detected by the API.").optional(),
            maxFindings: z.number().int().describe(
              "Max findings limit for the given infoType.",
            ).optional(),
          })).describe(
            "Configuration of findings limit given for specified infoTypes.",
          ).optional(),
          maxFindingsPerItem: z.number().int().describe(
            "Max number of findings that are returned for each item scanned. When set within an InspectContentRequest, this field is ignored. This value isn't a hard limit. If the number of findings for an item reaches this limit, the inspection of that item ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns for the item can be multiple times higher than this value.",
          ).optional(),
          maxFindingsPerRequest: z.number().int().describe(
            "Max number of findings that are returned per request or job. If you set this field in an InspectContentRequest, the resulting maximum value is the value that you set or 3,000, whichever is lower. This value isn't a hard limit. If an inspection reaches this limit, the inspection ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than this value.",
          ).optional(),
        }).describe(
          "Configuration to control the number of findings returned for inspection. This is not used for de-identification or data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error.",
        ).optional(),
        minLikelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://cloud.google.com/sensitive-data-protection/docs/likelihood).",
        ).optional(),
        minLikelihoodPerInfoType: z.array(z.object({
          infoType: z.object({
            name: z.string().describe(
              "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
            ).optional(),
            sensitivityScore: z.object({
              score: z.enum([
                "SENSITIVITY_SCORE_UNSPECIFIED",
                "SENSITIVITY_LOW",
                "SENSITIVITY_UNKNOWN",
                "SENSITIVITY_MODERATE",
                "SENSITIVITY_HIGH",
              ]).describe("The sensitivity score applied to the resource.")
                .optional(),
            }).describe(
              "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
            ).optional(),
            version: z.string().describe(
              "Optional version name for this InfoType.",
            ).optional(),
          }).describe("Type of information detected by the API.").optional(),
          minLikelihood: z.enum([
            "LIKELIHOOD_UNSPECIFIED",
            "VERY_UNLIKELY",
            "UNLIKELY",
            "POSSIBLE",
            "LIKELY",
            "VERY_LIKELY",
          ]).describe(
            "Only returns findings equal to or above this threshold. This field is required or else the configuration fails.",
          ).optional(),
        })).describe(
          "Minimum likelihood per infotype. For each infotype, a user can specify a minimum likelihood. The system only returns a finding if its likelihood is above this threshold. If this field is not set, the system uses the InspectConfig min_likelihood.",
        ).optional(),
        ruleSet: z.array(z.object({
          infoTypes: z.array(z.object({
            name: z.string().describe(
              "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
            ).optional(),
            sensitivityScore: z.object({
              score: z.enum([
                "SENSITIVITY_SCORE_UNSPECIFIED",
                "SENSITIVITY_LOW",
                "SENSITIVITY_UNKNOWN",
                "SENSITIVITY_MODERATE",
                "SENSITIVITY_HIGH",
              ]).describe("The sensitivity score applied to the resource.")
                .optional(),
            }).describe(
              "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
            ).optional(),
            version: z.string().describe(
              "Optional version name for this InfoType.",
            ).optional(),
          })).describe("List of infoTypes this rule set is applied to.")
            .optional(),
          rules: z.array(z.object({
            adjustmentRule: z.object({
              adjustByImageFindings: z.object({
                imageContainmentType: z.object({
                  encloses: z.object({}).describe(
                    "Defines a condition where one bounding box encloses another.",
                  ).optional(),
                  fullyInside: z.object({}).describe(
                    "Defines a condition where one bounding box is fully inside another.",
                  ).optional(),
                  overlaps: z.object({}).describe(
                    "Defines a condition for overlapping bounding boxes.",
                  ).optional(),
                }).describe(
                  "Specifies the relationship between bounding boxes for image findings.",
                ).optional(),
                infoTypes: z.array(z.object({
                  name: z.string().describe(
                    "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                  ).optional(),
                  sensitivityScore: z.object({
                    score: z.enum([
                      "SENSITIVITY_SCORE_UNSPECIFIED",
                      "SENSITIVITY_LOW",
                      "SENSITIVITY_UNKNOWN",
                      "SENSITIVITY_MODERATE",
                      "SENSITIVITY_HIGH",
                    ]).describe(
                      "The sensitivity score applied to the resource.",
                    ).optional(),
                  }).describe(
                    "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                  ).optional(),
                  version: z.string().describe(
                    "Optional version name for this InfoType.",
                  ).optional(),
                })).describe(
                  "A list of image-supported infoTypes—excluding [document infoTypes](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#documents)—to be used as context for the adjustment rule. Sensitive Data Protection adjusts the likelihood of an image finding if its bounding box has the specified spatial relationship (defined by `image_containment_type`) with a finding of an infoType in this list. For example, you can create a rule to adjust the likelihood of a `US_PASSPORT` finding if it is enclosed by a finding of `OBJECT_TYPE/PERSON/PASSPORT`. To configure this, set `US_PASSPORT` in `InspectionRuleSet.info_types`. Add an `adjustment_rule` with an `adjust_by_image_findings.info_types` that contains `OBJECT_TYPE/PERSON/PASSPORT` and `image_containment_type` set to `encloses`. In this case, the likelihood of the `US_PASSPORT` finding is adjusted, but the likelihood of the `OBJECT_TYPE/PERSON/PASSPORT` finding is not.",
                ).optional(),
                minLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe(
                  "Required. Minimum likelihood of the `adjust_by_image_findings.info_types` finding. If the likelihood is lower than this value, Sensitive Data Protection doesn't adjust the likelihood of the `InspectionRuleSet.info_types` finding.",
                ).optional(),
              }).describe(
                "AdjustmentRule condition for image findings. This rule is silently ignored if the content being inspected is not an image.",
              ).optional(),
              adjustByMatchingInfoTypes: z.object({
                infoTypes: z.array(z.object({
                  name: z.string().describe(
                    "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                  ).optional(),
                  sensitivityScore: z.object({
                    score: z.enum([
                      "SENSITIVITY_SCORE_UNSPECIFIED",
                      "SENSITIVITY_LOW",
                      "SENSITIVITY_UNKNOWN",
                      "SENSITIVITY_MODERATE",
                      "SENSITIVITY_HIGH",
                    ]).describe(
                      "The sensitivity score applied to the resource.",
                    ).optional(),
                  }).describe(
                    "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                  ).optional(),
                  version: z.string().describe(
                    "Optional version name for this InfoType.",
                  ).optional(),
                })).describe(
                  "Sensitive Data Protection adjusts the likelihood of a finding if that finding also matches one of these infoTypes. For example, you can create a rule to adjust the likelihood of a `PHONE_NUMBER` finding if the string is found within a document that is classified as `DOCUMENT_TYPE/HR/RESUME`. To configure this, set `PHONE_NUMBER` in `InspectionRuleSet.info_types`. Add an `adjustment_rule` with an `adjust_by_matching_info_types.info_types` that contains `DOCUMENT_TYPE/HR/RESUME`. In this case, the likelihood of the `PHONE_NUMBER` finding is adjusted, but the likelihood of the `DOCUMENT_TYPE/HR/RESUME` finding is not.",
                ).optional(),
                matchingType: z.enum([
                  "MATCHING_TYPE_UNSPECIFIED",
                  "MATCHING_TYPE_FULL_MATCH",
                  "MATCHING_TYPE_PARTIAL_MATCH",
                  "MATCHING_TYPE_INVERSE_MATCH",
                  "MATCHING_TYPE_RULE_SPECIFIC",
                ]).describe(
                  "How the adjustment rule is applied. Only `MATCHING_TYPE_PARTIAL_MATCH` is supported: - Partial match: adjusts the findings of infoTypes specified in the inspection rule when they have a nonempty intersection with a finding of an infoType specified in this adjustment rule.",
                ).optional(),
                minLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe(
                  "Required. Minimum likelihood of the `adjust_by_matching_info_types.info_types` finding. If the likelihood is lower than this value, Sensitive Data Protection doesn't adjust the likelihood of the `InspectionRuleSet.info_types` finding.",
                ).optional(),
              }).describe("AdjustmentRule condition for matching infoTypes.")
                .optional(),
              likelihoodAdjustment: z.object({
                fixedLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe("Set the likelihood of a finding to a fixed value.")
                  .optional(),
                relativeLikelihood: z.number().int().describe(
                  "Increase or decrease the likelihood by the specified number of levels. For example, if a finding would be `POSSIBLE` without the detection rule and `relative_likelihood` is 1, then it is upgraded to `LIKELY`, while a value of -1 would downgrade it to `UNLIKELY`. Likelihood may never drop below `VERY_UNLIKELY` or exceed `VERY_LIKELY`, so applying an adjustment of 1 followed by an adjustment of -1 when base likelihood is `VERY_LIKELY` will result in a final likelihood of `LIKELY`.",
                ).optional(),
              }).describe(
                "Message for specifying an adjustment to the likelihood of a finding as part of a detection rule.",
              ).optional(),
            }).describe(
              "Rule that specifies conditions when a certain infoType's finding details should be adjusted.",
            ).optional(),
            exclusionRule: z.object({
              dictionary: z.object({
                cloudStoragePath: z.object({
                  path: z.string().describe(
                    "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
                  ).optional(),
                }).describe(
                  "Message representing a single file or path in Cloud Storage.",
                ).optional(),
                wordList: z.object({
                  words: z.array(z.string()).describe(
                    "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
                  ).optional(),
                }).describe(
                  "Message defining a list of words or phrases to search for in the data.",
                ).optional(),
              }).describe(
                'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
              ).optional(),
              excludeByHotword: z.object({
                hotwordRegex: z.object({
                  groupIndexes: z.array(z.number().int()).describe(
                    "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
                  ).optional(),
                  pattern: z.string().describe(
                    "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
                  ).optional(),
                }).describe("Message defining a custom regular expression.")
                  .optional(),
                proximity: z.object({
                  windowAfter: z.number().int().describe(
                    "Number of characters after the finding to consider.",
                  ).optional(),
                  windowBefore: z.number().int().describe(
                    "Number of characters before the finding to consider. For tabular data, if you want to modify the likelihood of an entire column of findngs, set this to 1. For more information, see [Hotword example: Set the match likelihood of a table column] (https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes-likelihood#match-column-values).",
                  ).optional(),
                }).describe(
                  "Message for specifying a window around a finding to apply a detection rule.",
                ).optional(),
              }).describe(
                "The rule to exclude findings based on a hotword. For record inspection of tables, column names are considered hotwords. An example of this is to exclude a finding if it belongs to a BigQuery column that matches a specific pattern.",
              ).optional(),
              excludeByImageFindings: z.object({
                imageContainmentType: z.object({
                  encloses: z.object({}).describe(
                    "Defines a condition where one bounding box encloses another.",
                  ).optional(),
                  fullyInside: z.object({}).describe(
                    "Defines a condition where one bounding box is fully inside another.",
                  ).optional(),
                  overlaps: z.object({}).describe(
                    "Defines a condition for overlapping bounding boxes.",
                  ).optional(),
                }).describe(
                  "Specifies the relationship between bounding boxes for image findings.",
                ).optional(),
                infoTypes: z.array(z.object({
                  name: z.string().describe(
                    "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                  ).optional(),
                  sensitivityScore: z.object({
                    score: z.enum([
                      "SENSITIVITY_SCORE_UNSPECIFIED",
                      "SENSITIVITY_LOW",
                      "SENSITIVITY_UNKNOWN",
                      "SENSITIVITY_MODERATE",
                      "SENSITIVITY_HIGH",
                    ]).describe(
                      "The sensitivity score applied to the resource.",
                    ).optional(),
                  }).describe(
                    "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                  ).optional(),
                  version: z.string().describe(
                    "Optional version name for this InfoType.",
                  ).optional(),
                })).describe(
                  "A list of image-supported infoTypes—excluding [document infoTypes](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#documents)—to be used as context for the exclusion rule. A finding is excluded if its bounding box has the specified spatial relationship (defined by `image_containment_type`) with a finding of an infoType in this list. For example, if `InspectionRuleSet.info_types` includes `OBJECT_TYPE/PERSON` and this `exclusion_rule` specifies `info_types` as `OBJECT_TYPE/PERSON/PASSPORT` with `image_containment_type` set to `encloses`, then `OBJECT_TYPE/PERSON` findings will be excluded if they are fully contained within the bounding box of an `OBJECT_TYPE/PERSON/PASSPORT` finding.",
                ).optional(),
              }).describe(
                "The rule to exclude image findings based on spatial relationships with other image findings. For example, exclude an image finding if it overlaps with another image finding. This rule is silently ignored if the content being inspected is not an image.",
              ).optional(),
              excludeInfoTypes: z.object({
                infoTypes: z.array(z.object({
                  name: z.string().describe(
                    "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                  ).optional(),
                  sensitivityScore: z.object({
                    score: z.enum([
                      "SENSITIVITY_SCORE_UNSPECIFIED",
                      "SENSITIVITY_LOW",
                      "SENSITIVITY_UNKNOWN",
                      "SENSITIVITY_MODERATE",
                      "SENSITIVITY_HIGH",
                    ]).describe(
                      "The sensitivity score applied to the resource.",
                    ).optional(),
                  }).describe(
                    "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                  ).optional(),
                  version: z.string().describe(
                    "Optional version name for this InfoType.",
                  ).optional(),
                })).describe(
                  'InfoType list in ExclusionRule rule drops a finding when it overlaps or contained within with a finding of an infoType from this list. For example, for `InspectionRuleSet.info_types` containing "PHONE_NUMBER"` and `exclusion_rule` containing `exclude_info_types.info_types` with "EMAIL_ADDRESS" the phone number findings are dropped if they overlap with EMAIL_ADDRESS finding. That leads to "555-222-2222@example.org" to generate only a single finding, namely email address.',
                ).optional(),
              }).describe("List of excluded infoTypes.").optional(),
              matchingType: z.enum([
                "MATCHING_TYPE_UNSPECIFIED",
                "MATCHING_TYPE_FULL_MATCH",
                "MATCHING_TYPE_PARTIAL_MATCH",
                "MATCHING_TYPE_INVERSE_MATCH",
                "MATCHING_TYPE_RULE_SPECIFIC",
              ]).describe(
                "How the rule is applied, see MatchingType documentation for details.",
              ).optional(),
              regex: z.object({
                groupIndexes: z.array(z.number().int()).describe(
                  "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
                ).optional(),
                pattern: z.string().describe(
                  "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
                ).optional(),
              }).describe("Message defining a custom regular expression.")
                .optional(),
            }).describe(
              "The rule that specifies conditions when findings of infoTypes specified in `InspectionRuleSet` are removed from results.",
            ).optional(),
            hotwordRule: z.object({
              hotwordRegex: z.object({
                groupIndexes: z.array(z.number().int()).describe(
                  "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
                ).optional(),
                pattern: z.string().describe(
                  "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
                ).optional(),
              }).describe("Message defining a custom regular expression.")
                .optional(),
              likelihoodAdjustment: z.object({
                fixedLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe("Set the likelihood of a finding to a fixed value.")
                  .optional(),
                relativeLikelihood: z.number().int().describe(
                  "Increase or decrease the likelihood by the specified number of levels. For example, if a finding would be `POSSIBLE` without the detection rule and `relative_likelihood` is 1, then it is upgraded to `LIKELY`, while a value of -1 would downgrade it to `UNLIKELY`. Likelihood may never drop below `VERY_UNLIKELY` or exceed `VERY_LIKELY`, so applying an adjustment of 1 followed by an adjustment of -1 when base likelihood is `VERY_LIKELY` will result in a final likelihood of `LIKELY`.",
                ).optional(),
              }).describe(
                "Message for specifying an adjustment to the likelihood of a finding as part of a detection rule.",
              ).optional(),
              proximity: z.object({
                windowAfter: z.number().int().describe(
                  "Number of characters after the finding to consider.",
                ).optional(),
                windowBefore: z.number().int().describe(
                  "Number of characters before the finding to consider. For tabular data, if you want to modify the likelihood of an entire column of findngs, set this to 1. For more information, see [Hotword example: Set the match likelihood of a table column] (https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes-likelihood#match-column-values).",
                ).optional(),
              }).describe(
                "Message for specifying a window around a finding to apply a detection rule.",
              ).optional(),
            }).describe(
              "The rule that adjusts the likelihood of findings within a certain proximity of hotwords.",
            ).optional(),
          })).describe(
            "Set of rules to be applied to infoTypes. The rules are applied in order.",
          ).optional(),
        })).describe(
          "Set of rules to apply to the findings for this InspectConfig. Exclusion rules, contained in the set are executed in the end, other rules are executed in the order they are specified for each info type. Not supported for the `metadata_key_value_expression` CustomInfoType.",
        ).optional(),
      }).describe(
        "Configuration description of the scanning process. When used with redactContent only info_types and min_likelihood are currently used.",
      ).optional(),
      inspectTemplateName: z.string().describe(
        "If provided, will be used as the default for all values in InspectConfig. `inspect_config` will be merged into the values persisted as part of the template.",
      ).optional(),
      storageConfig: z.object({
        bigQueryOptions: z.object({
          excludedFields: z.array(z.object({
            name: z.string().describe("Name describing the field.").optional(),
          })).describe(
            "References to fields excluded from scanning. This allows you to skip inspection of entire columns which you know have no findings. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used.",
          ).optional(),
          identifyingFields: z.array(z.object({
            name: z.string().describe("Name describing the field.").optional(),
          })).describe(
            "Table fields that may uniquely identify a row within the table. When `actions.saveFindings.outputConfig.table` is specified, the values of columns specified here are available in the output table under `location.content_locations.record_location.record_key.id_values`. Nested fields such as `person.birthdate.year` are allowed.",
          ).optional(),
          includedFields: z.array(z.object({
            name: z.string().describe("Name describing the field.").optional(),
          })).describe(
            "Limit scanning only to these fields. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used.",
          ).optional(),
          rowsLimit: z.string().describe(
            "Max number of rows to scan. If the table has more rows than this value, the rest of the rows are omitted. If not set, or if set to 0, all rows will be scanned. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig.",
          ).optional(),
          rowsLimitPercent: z.number().int().describe(
            "Max percentage of rows to scan. The rest are omitted. The number of rows scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig. Caution: A [known issue](https://cloud.google.com/sensitive-data-protection/docs/known-issues#bq-sampling) is causing the `rowsLimitPercent` field to behave unexpectedly. We recommend using `rowsLimit` instead.",
          ).optional(),
          sampleMethod: z.enum([
            "SAMPLE_METHOD_UNSPECIFIED",
            "TOP",
            "RANDOM_START",
          ]).describe("How to sample the data.").optional(),
          tableReference: z.object({
            datasetId: z.string().describe("Dataset ID of the table.")
              .optional(),
            projectId: z.string().describe(
              "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
            ).optional(),
            tableId: z.string().describe("Name of the table.").optional(),
          }).describe(
            "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
          ).optional(),
        }).describe("Options defining BigQuery table and row identifiers.")
          .optional(),
        cloudStorageOptions: z.object({
          bytesLimitPerFile: z.string().describe(
            "Max number of bytes to scan from a file. If a scanned file's size is bigger than this value then the rest of the bytes are omitted. Only one of `bytes_limit_per_file` and `bytes_limit_per_file_percent` can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file).",
          ).optional(),
          bytesLimitPerFilePercent: z.number().int().describe(
            "Max percentage of bytes to scan from a file. The rest are omitted. The number of bytes scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of bytes_limit_per_file and bytes_limit_per_file_percent can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file).",
          ).optional(),
          fileSet: z.object({
            regexFileSet: z.object({
              bucketName: z.string().describe(
                "The name of a Cloud Storage bucket. Required.",
              ).optional(),
              excludeRegex: z.array(z.string()).describe(
                "A list of regular expressions matching file paths to exclude. All files in the bucket that match at least one of these regular expressions will be excluded from the scan. Regular expressions use RE2 [syntax](https://github.com/google/re2/wiki/Syntax); a guide can be found under the google/re2 repository on GitHub.",
              ).optional(),
              includeRegex: z.array(z.string()).describe(
                "A list of regular expressions matching file paths to include. All files in the bucket that match at least one of these regular expressions will be included in the set of files, except for those that also match an item in `exclude_regex`. Leaving this field empty will match all files by default (this is equivalent to including `.*` in the list). Regular expressions use RE2 [syntax](https://github.com/google/re2/wiki/Syntax); a guide can be found under the google/re2 repository on GitHub.",
              ).optional(),
            }).describe(
              'Message representing a set of files in a Cloud Storage bucket. Regular expressions are used to allow fine-grained control over which files in the bucket to include. Included files are those that match at least one item in `include_regex` and do not match any items in `exclude_regex`. Note that a file that matches items from both lists will _not_ be included. For a match to occur, the entire file path (i.e., everything in the url after the bucket name) must match the regular expression. For example, given the input `{bucket_name: "mybucket", include_regex: ["directory1/.*"], exclude_regex: ["directory1/excluded.*"]}`: * `gs://mybucket/directory1/myfile` will be included * `gs://mybucket/directory1/directory2/myfile` will be included (`.*` matches across `/`) * `gs://mybucket/directory0/directory1/myfile` will _not_ be included (the full path doesn\'t match any items in `include_regex`) * `gs://mybucket/directory1/excludedfile` will _not_ be included (the path matches an item in `exclude_regex`) If `include_regex` is left empty, it will match all files by default (this is equivalent to setting `include_regex: [".*"]`). Some other common use cases: * `{bucket_name: "mybucket", exclude_regex: [".*\\.pdf"]}` will include all files in `mybucket` except for.pdf files * `{bucket_name: "mybucket", include_regex: ["directory/[^/]+"]}` will include all files directly under `gs://mybucket/directory/`, without matching across `/`',
            ).optional(),
            url: z.string().describe(
              "The Cloud Storage url of the file(s) to scan, in the format `gs:///`. Trailing wildcard in the path is allowed. If the url ends in a trailing slash, the bucket or directory represented by the url will be scanned non-recursively (content in sub-directories will not be scanned). This means that `gs://mybucket/` is equivalent to `gs://mybucket/*`, and `gs://mybucket/directory/` is equivalent to `gs://mybucket/directory/*`. Exactly one of `url` or `regex_file_set` must be set.",
            ).optional(),
          }).describe("Set of files to scan.").optional(),
          fileTypes: z.array(
            z.enum([
              "FILE_TYPE_UNSPECIFIED",
              "BINARY_FILE",
              "TEXT_FILE",
              "IMAGE",
              "WORD",
              "PDF",
              "AVRO",
              "CSV",
              "TSV",
              "POWERPOINT",
              "EXCEL",
            ]),
          ).describe(
            "List of file type groups to include in the scan. If empty, all files are scanned and available data format processors are applied. In addition, the binary content of the selected files is always scanned as well. Images are scanned only as binary if the specified region does not support image inspection and no file_types were specified. Image inspection is restricted to 'global', 'us', 'asia', and 'europe'.",
          ).optional(),
          filesLimitPercent: z.number().int().describe(
            "Limits the number of files to scan to this percentage of the input FileSet. Number of files scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0.",
          ).optional(),
          sampleMethod: z.enum([
            "SAMPLE_METHOD_UNSPECIFIED",
            "TOP",
            "RANDOM_START",
          ]).describe("How to sample the data.").optional(),
        }).describe(
          "Options defining a file or a set of files within a Cloud Storage bucket.",
        ).optional(),
        datastoreOptions: z.object({
          kind: z.object({
            name: z.string().describe("The name of the kind.").optional(),
          }).describe("A representation of a Datastore kind.").optional(),
          partitionId: z.object({
            namespaceId: z.string().describe(
              "If not empty, the ID of the namespace to which the entities belong.",
            ).optional(),
            projectId: z.string().describe(
              "The ID of the project to which the entities belong.",
            ).optional(),
          }).describe(
            "Datastore partition ID. A partition ID identifies a grouping of entities. The grouping is always by project and namespace, however the namespace ID may be empty. A partition ID contains several dimensions: project ID and namespace ID.",
          ).optional(),
        }).describe(
          "Options defining a data set within Google Cloud Datastore.",
        ).optional(),
        hybridOptions: z.object({
          description: z.string().describe(
            "A short description of where the data is coming from. Will be stored once in the job. 256 max length.",
          ).optional(),
          labels: z.record(z.string(), z.string()).describe(
            'To organize findings, these labels will be added to each finding. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated with a given finding. Examples: * `"environment": "production"` * `"pipeline": "etl"`',
          ).optional(),
          requiredFindingLabelKeys: z.array(z.string()).describe(
            "These are labels that each inspection request must include within their 'finding_labels' map. Request may contain others, but any missing one of these will be rejected. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. No more than 10 keys can be required.",
          ).optional(),
          tableOptions: z.object({
            identifyingFields: z.array(z.object({
              name: z.string().describe("Name describing the field.")
                .optional(),
            })).describe(
              "The columns that are the primary keys for table objects included in ContentItem. A copy of this cell's value will stored alongside alongside each finding so that the finding can be traced to the specific row it came from. No more than 3 may be provided.",
            ).optional(),
          }).describe(
            "Instructions regarding the table content being inspected.",
          ).optional(),
        }).describe(
          "Configuration to control jobs where the content being inspected is outside of Google Cloud Platform.",
        ).optional(),
        timespanConfig: z.object({
          enableAutoPopulationOfTimespanConfig: z.boolean().describe(
            "When the job is started by a JobTrigger we will automatically figure out a valid start_time to avoid scanning files that have not been modified since the last time the JobTrigger executed. This will be based on the time of the execution of the last run of the JobTrigger or the timespan end_time used in the last run of the JobTrigger. **For BigQuery** Inspect jobs triggered by automatic population will scan data that is at least three hours old when the job starts. This is because streaming buffer rows are not read during inspection and reading up to the current timestamp will result in skipped rows. See the [known issue](https://cloud.google.com/sensitive-data-protection/docs/known-issues#recently-streamed-data) related to this operation.",
          ).optional(),
          endTime: z.string().describe(
            "Exclude files, tables, or rows newer than this value. If not set, no upper time limit is applied.",
          ).optional(),
          startTime: z.string().describe(
            "Exclude files, tables, or rows older than this value. If not set, no lower time limit is applied.",
          ).optional(),
          timestampField: z.object({
            name: z.string().describe("Name describing the field.").optional(),
          }).describe(
            "General identifier of a data field in a storage service.",
          ).optional(),
        }).describe(
          "Configuration of the timespan of the items to include in scanning. Currently only supported when inspecting Cloud Storage and BigQuery.",
        ).optional(),
      }).describe("Shared message indicating Cloud storage type.").optional(),
    }).describe("Controls what and how to inspect for findings.").optional(),
    lastRunTime: z.string().describe(
      "Output only. The timestamp of the last time this trigger executed.",
    ).optional(),
    name: z.string().describe(
      "Unique resource name for the triggeredJob, assigned by the service when the triggeredJob is created, for example `projects/dlp-test-project/jobTriggers/53234423`.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "HEALTHY", "PAUSED", "CANCELLED"])
      .describe("Required. A status for this trigger.").optional(),
    triggers: z.array(z.object({
      manual: z.object({}).describe(
        "Job trigger option for hybrid jobs. Jobs must be manually created and finished.",
      ).optional(),
      schedule: z.object({
        recurrencePeriodDuration: z.string().describe(
          "With this option a job is started on a regular periodic basis. For example: every day (86400 seconds). A scheduled start time will be skipped if the previous execution has not ended when its scheduled time occurs. This value must be set to a time duration greater than or equal to 1 day and can be no longer than 60 days.",
        ).optional(),
      }).describe("Schedule for inspect job triggers.").optional(),
    })).describe(
      "A list of triggers which will be OR'ed together. Only one in the list needs to trigger for a job to be started. The list may contain only a single Schedule trigger and must have at least one object.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a triggeredJob.",
    ).optional(),
  }).describe(
    "Contains a configuration to make API calls on a repeating basis. See https://cloud.google.com/sensitive-data-protection/docs/concepts-job-triggers to learn more.",
  ).optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  triggerId: z.string().describe(
    "The trigger id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  errors: z.array(z.object({
    details: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    extraInfo: z.string(),
    timestamps: z.array(z.string()),
  })).optional(),
  inspectJob: z.object({
    actions: z.array(z.object({
      deidentify: z.object({
        cloudStorageOutput: z.string(),
        fileTypesToTransform: z.array(z.string()),
        transformationConfig: z.object({
          deidentifyTemplate: z.string(),
          imageRedactTemplate: z.string(),
          structuredDeidentifyTemplate: z.string(),
        }),
        transformationDetailsStorageConfig: z.object({
          table: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
        }),
      }),
      jobNotificationEmails: z.object({}),
      pubSub: z.object({
        topic: z.string(),
      }),
      publishFindingsToCloudDataCatalog: z.object({}),
      publishFindingsToDataplexCatalog: z.object({}),
      publishSummaryToCscc: z.object({}),
      publishToStackdriver: z.object({}),
      saveFindings: z.object({
        outputConfig: z.object({
          outputSchema: z.string(),
          storagePath: z.object({
            path: z.string(),
          }),
          table: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
        }),
      }),
    })),
    inspectConfig: z.object({
      contentOptions: z.array(z.string()),
      customInfoTypes: z.array(z.object({
        detectionRules: z.array(z.object({
          hotwordRule: z.object({
            hotwordRegex: z.object({
              groupIndexes: z.array(z.number()),
              pattern: z.string(),
            }),
            likelihoodAdjustment: z.object({
              fixedLikelihood: z.string(),
              relativeLikelihood: z.number(),
            }),
            proximity: z.object({
              windowAfter: z.number(),
              windowBefore: z.number(),
            }),
          }),
        })),
        dictionary: z.object({
          cloudStoragePath: z.object({
            path: z.string(),
          }),
          wordList: z.object({
            words: z.array(z.string()),
          }),
        }),
        exclusionType: z.string(),
        infoType: z.object({
          name: z.string(),
          sensitivityScore: z.object({
            score: z.string(),
          }),
          version: z.string(),
        }),
        likelihood: z.string(),
        metadataKeyValueExpression: z.object({
          keyRegex: z.string(),
          valueRegex: z.string(),
        }),
        regex: z.object({
          groupIndexes: z.array(z.number()),
          pattern: z.string(),
        }),
        sensitivityScore: z.object({
          score: z.string(),
        }),
        storedType: z.object({
          createTime: z.string(),
          name: z.string(),
        }),
        surrogateType: z.object({}),
      })),
      excludeInfoTypes: z.boolean(),
      includeQuote: z.boolean(),
      infoTypes: z.array(z.object({
        name: z.string(),
        sensitivityScore: z.object({
          score: z.string(),
        }),
        version: z.string(),
      })),
      limits: z.object({
        maxFindingsPerInfoType: z.array(z.object({
          infoType: z.object({
            name: z.string(),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            version: z.string(),
          }),
          maxFindings: z.number(),
        })),
        maxFindingsPerItem: z.number(),
        maxFindingsPerRequest: z.number(),
      }),
      minLikelihood: z.string(),
      minLikelihoodPerInfoType: z.array(z.object({
        infoType: z.object({
          name: z.string(),
          sensitivityScore: z.object({
            score: z.string(),
          }),
          version: z.string(),
        }),
        minLikelihood: z.string(),
      })),
      ruleSet: z.array(z.object({
        infoTypes: z.array(z.object({
          name: z.string(),
          sensitivityScore: z.object({
            score: z.string(),
          }),
          version: z.string(),
        })),
        rules: z.array(z.object({
          adjustmentRule: z.object({
            adjustByImageFindings: z.object({
              imageContainmentType: z.object({
                encloses: z.object({}),
                fullyInside: z.object({}),
                overlaps: z.object({}),
              }),
              infoTypes: z.array(z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              })),
              minLikelihood: z.string(),
            }),
            adjustByMatchingInfoTypes: z.object({
              infoTypes: z.array(z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              })),
              matchingType: z.string(),
              minLikelihood: z.string(),
            }),
            likelihoodAdjustment: z.object({
              fixedLikelihood: z.string(),
              relativeLikelihood: z.number(),
            }),
          }),
          exclusionRule: z.object({
            dictionary: z.object({
              cloudStoragePath: z.object({
                path: z.string(),
              }),
              wordList: z.object({
                words: z.array(z.string()),
              }),
            }),
            excludeByHotword: z.object({
              hotwordRegex: z.object({
                groupIndexes: z.array(z.number()),
                pattern: z.string(),
              }),
              proximity: z.object({
                windowAfter: z.number(),
                windowBefore: z.number(),
              }),
            }),
            excludeByImageFindings: z.object({
              imageContainmentType: z.object({
                encloses: z.object({}),
                fullyInside: z.object({}),
                overlaps: z.object({}),
              }),
              infoTypes: z.array(z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              })),
            }),
            excludeInfoTypes: z.object({
              infoTypes: z.array(z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              })),
            }),
            matchingType: z.string(),
            regex: z.object({
              groupIndexes: z.array(z.number()),
              pattern: z.string(),
            }),
          }),
          hotwordRule: z.object({
            hotwordRegex: z.object({
              groupIndexes: z.array(z.number()),
              pattern: z.string(),
            }),
            likelihoodAdjustment: z.object({
              fixedLikelihood: z.string(),
              relativeLikelihood: z.number(),
            }),
            proximity: z.object({
              windowAfter: z.number(),
              windowBefore: z.number(),
            }),
          }),
        })),
      })),
    }),
    inspectTemplateName: z.string(),
    storageConfig: z.object({
      bigQueryOptions: z.object({
        excludedFields: z.array(z.object({
          name: z.string(),
        })),
        identifyingFields: z.array(z.object({
          name: z.string(),
        })),
        includedFields: z.array(z.object({
          name: z.string(),
        })),
        rowsLimit: z.string(),
        rowsLimitPercent: z.number(),
        sampleMethod: z.string(),
        tableReference: z.object({
          datasetId: z.string(),
          projectId: z.string(),
          tableId: z.string(),
        }),
      }),
      cloudStorageOptions: z.object({
        bytesLimitPerFile: z.string(),
        bytesLimitPerFilePercent: z.number(),
        fileSet: z.object({
          regexFileSet: z.object({
            bucketName: z.string(),
            excludeRegex: z.array(z.string()),
            includeRegex: z.array(z.string()),
          }),
          url: z.string(),
        }),
        fileTypes: z.array(z.string()),
        filesLimitPercent: z.number(),
        sampleMethod: z.string(),
      }),
      datastoreOptions: z.object({
        kind: z.object({
          name: z.string(),
        }),
        partitionId: z.object({
          namespaceId: z.string(),
          projectId: z.string(),
        }),
      }),
      hybridOptions: z.object({
        description: z.string(),
        labels: z.record(z.string(), z.unknown()),
        requiredFindingLabelKeys: z.array(z.string()),
        tableOptions: z.object({
          identifyingFields: z.array(z.object({
            name: z.string(),
          })),
        }),
      }),
      timespanConfig: z.object({
        enableAutoPopulationOfTimespanConfig: z.boolean(),
        endTime: z.string(),
        startTime: z.string(),
        timestampField: z.object({
          name: z.string(),
        }),
      }),
    }),
  }).optional(),
  lastRunTime: z.string().optional(),
  name: z.string(),
  status: z.string().optional(),
  triggers: z.array(z.object({
    manual: z.object({}),
    schedule: z.object({
      recurrencePeriodDuration: z.string(),
    }),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  jobTrigger: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of a triggeredJob.",
    ).optional(),
    description: z.string().describe(
      "User provided description (max 256 chars)",
    ).optional(),
    displayName: z.string().describe("Display name (max 100 chars)").optional(),
    errors: z.array(z.object({
      details: z.object({
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
      extraInfo: z.enum([
        "ERROR_INFO_UNSPECIFIED",
        "IMAGE_SCAN_UNAVAILABLE_IN_REGION",
        "FILE_STORE_CLUSTER_UNSUPPORTED",
      ]).describe("Additional information about the error.").optional(),
      timestamps: z.array(z.string()).describe(
        "The times the error occurred. List includes the oldest timestamp and the last 9 timestamps.",
      ).optional(),
    })).describe(
      "Output only. A stream of errors encountered when the trigger was activated. Repeated errors may result in the JobTrigger automatically being paused. Will return the last 100 errors. Whenever the JobTrigger is modified this list will be cleared.",
    ).optional(),
    inspectJob: z.object({
      actions: z.array(z.object({
        deidentify: z.object({
          cloudStorageOutput: z.string().describe(
            "Required. User settable Cloud Storage bucket and folders to store de-identified files. This field must be set for Cloud Storage deidentification. The output Cloud Storage bucket must be different from the input bucket. De-identified files will overwrite files in the output path. Form of: gs://bucket/folder/ or gs://bucket",
          ).optional(),
          fileTypesToTransform: z.array(
            z.enum([
              "FILE_TYPE_UNSPECIFIED",
              "BINARY_FILE",
              "TEXT_FILE",
              "IMAGE",
              "WORD",
              "PDF",
              "AVRO",
              "CSV",
              "TSV",
              "POWERPOINT",
              "EXCEL",
            ]),
          ).describe(
            "List of user-specified file type groups to transform. If specified, only the files with these file types are transformed. If empty, all supported files are transformed. Supported types may be automatically added over time. Any unsupported file types that are set in this field are excluded from de-identification. An error is recorded for each unsupported file in the TransformationDetails output table. Currently the only file types supported are: IMAGES, TEXT_FILES, CSV, TSV.",
          ).optional(),
          transformationConfig: z.object({
            deidentifyTemplate: z.string().describe(
              "De-identify template. If this template is specified, it will serve as the default de-identify template. This template cannot contain `record_transformations` since it can be used for unstructured content such as free-form text files. If this template is not set, a default `ReplaceWithInfoTypeConfig` will be used to de-identify unstructured content.",
            ).optional(),
            imageRedactTemplate: z.string().describe(
              "Image redact template. If this template is specified, it will serve as the de-identify template for images. If this template is not set, all findings in the image will be redacted with a black box.",
            ).optional(),
            structuredDeidentifyTemplate: z.string().describe(
              "Structured de-identify template. If this template is specified, it will serve as the de-identify template for structured content such as delimited files and tables. If this template is not set but the `deidentify_template` is set, then `deidentify_template` will also apply to the structured content. If neither template is set, a default `ReplaceWithInfoTypeConfig` will be used to de-identify structured content.",
            ).optional(),
          }).describe(
            "User specified templates and configs for how to deidentify structured, unstructures, and image files. User must provide either a unstructured deidentify template or at least one redact image config.",
          ).optional(),
          transformationDetailsStorageConfig: z.object({
            table: z.object({
              datasetId: z.string().describe("Dataset ID of the table.")
                .optional(),
              projectId: z.string().describe(
                "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
              ).optional(),
              tableId: z.string().describe("Name of the table.").optional(),
            }).describe(
              "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
            ).optional(),
          }).describe("Config for storing transformation details.").optional(),
        }).describe(
          "Create a de-identified copy of a storage bucket. Only compatible with Cloud Storage buckets. A TransformationDetail will be created for each transformation. Compatible with: Inspection of Cloud Storage",
        ).optional(),
        jobNotificationEmails: z.object({}).describe(
          "Sends an email when the job completes. The email goes to IAM project owners and technical [Essential Contacts](https://cloud.google.com/resource-manager/docs/managing-notification-contacts).",
        ).optional(),
        pubSub: z.object({
          topic: z.string().describe(
            "Cloud Pub/Sub topic to send notifications to. The topic must have given publishing access rights to the DLP API service account executing the long running DlpJob sending the notifications. Format is projects/{project}/topics/{topic}.",
          ).optional(),
        }).describe(
          "Publish a message into a given Pub/Sub topic when DlpJob has completed. The message contains a single field, `DlpJobName`, which is equal to the finished job's [`DlpJob.name`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/projects.dlpJobs#DlpJob). Compatible with: Inspect, Risk",
        ).optional(),
        publishFindingsToCloudDataCatalog: z.object({}).describe(
          "Publish findings of a DlpJob to Data Catalog. In Data Catalog, tag templates are applied to the resource that Cloud DLP scanned. Data Catalog tag templates are stored in the same project and region where the BigQuery table exists. For Cloud DLP to create and apply the tag template, the Cloud DLP service agent must have the `roles/datacatalog.tagTemplateOwner` permission on the project. The tag template contains fields summarizing the results of the DlpJob. Any field values previously written by another DlpJob are deleted. InfoType naming patterns are strictly enforced when using this feature. Findings are persisted in Data Catalog storage and are governed by service-specific policies for Data Catalog. For more information, see [Service Specific Terms](https://cloud.google.com/terms/service-terms). Only a single instance of this action can be specified. This action is allowed only if all resources being scanned are BigQuery tables. Compatible with: Inspect",
        ).optional(),
        publishFindingsToDataplexCatalog: z.object({}).describe(
          "Publish findings of a DlpJob to Dataplex Universal Catalog as a `sensitive-data-protection-job-result` aspect. For more information, see [Send inspection results to Dataplex Universal Catalog as aspects](https://cloud.google.com/sensitive-data-protection/docs/add-aspects-inspection-job). Aspects are stored in Dataplex Universal Catalog storage and are governed by service-specific policies for Dataplex Universal Catalog. For more information, see [Service Specific Terms](https://cloud.google.com/terms/service-terms). Only a single instance of this action can be specified. This action is allowed only if all resources being scanned are BigQuery tables. Compatible with: Inspect",
        ).optional(),
        publishSummaryToCscc: z.object({}).describe(
          "Publish the result summary of a DlpJob to [Security Command Center](https://cloud.google.com/security-command-center). This action is available for only projects that belong to an organization. This action publishes the count of finding instances and their infoTypes. The summary of findings are persisted in Security Command Center and are governed by [service-specific policies for Security Command Center](https://cloud.google.com/terms/service-terms). Only a single instance of this action can be specified. Compatible with: Inspect",
        ).optional(),
        publishToStackdriver: z.object({}).describe(
          "Enable Stackdriver metric dlp.googleapis.com/finding_count. This will publish a metric to stack driver on each infotype requested and how many findings were found for it. CustomDetectors will be bucketed as 'Custom' under the Stackdriver label 'info_type'.",
        ).optional(),
        saveFindings: z.object({
          outputConfig: z.object({
            outputSchema: z.enum([
              "OUTPUT_SCHEMA_UNSPECIFIED",
              "BASIC_COLUMNS",
              "GCS_COLUMNS",
              "DATASTORE_COLUMNS",
              "BIG_QUERY_COLUMNS",
              "ALL_COLUMNS",
            ]).describe(
              "Schema used for writing the findings for Inspect jobs. This field is only used for Inspect and must be unspecified for Risk jobs. Columns are derived from the `Finding` object. If appending to an existing table, any columns from the predefined schema that are missing will be added. No columns in the existing table will be deleted. If unspecified, then all available columns will be used for a new table or an (existing) table with no schema, and no changes will be made to an existing table that has a schema. Only for use with external storage.",
            ).optional(),
            storagePath: z.object({
              path: z.string().describe(
                "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
              ).optional(),
            }).describe(
              "Message representing a single file or path in Cloud Storage.",
            ).optional(),
            table: z.object({
              datasetId: z.string().describe("Dataset ID of the table.")
                .optional(),
              projectId: z.string().describe(
                "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
              ).optional(),
              tableId: z.string().describe("Name of the table.").optional(),
            }).describe(
              "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
            ).optional(),
          }).describe("Cloud repository for storing output.").optional(),
        }).describe(
          "If set, the detailed findings will be persisted to the specified OutputStorageConfig. Only a single instance of this action can be specified. Compatible with: Inspect, Risk",
        ).optional(),
      })).describe("Actions to execute at the completion of the job.")
        .optional(),
      inspectConfig: z.object({
        contentOptions: z.array(
          z.enum(["CONTENT_UNSPECIFIED", "CONTENT_TEXT", "CONTENT_IMAGE"]),
        ).describe("Deprecated and unused.").optional(),
        customInfoTypes: z.array(z.object({
          detectionRules: z.array(z.object({
            hotwordRule: z.object({
              hotwordRegex: z.object({
                groupIndexes: z.array(z.number().int()).describe(
                  "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
                ).optional(),
                pattern: z.string().describe(
                  "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
                ).optional(),
              }).describe("Message defining a custom regular expression.")
                .optional(),
              likelihoodAdjustment: z.object({
                fixedLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe("Set the likelihood of a finding to a fixed value.")
                  .optional(),
                relativeLikelihood: z.number().int().describe(
                  "Increase or decrease the likelihood by the specified number of levels. For example, if a finding would be `POSSIBLE` without the detection rule and `relative_likelihood` is 1, then it is upgraded to `LIKELY`, while a value of -1 would downgrade it to `UNLIKELY`. Likelihood may never drop below `VERY_UNLIKELY` or exceed `VERY_LIKELY`, so applying an adjustment of 1 followed by an adjustment of -1 when base likelihood is `VERY_LIKELY` will result in a final likelihood of `LIKELY`.",
                ).optional(),
              }).describe(
                "Message for specifying an adjustment to the likelihood of a finding as part of a detection rule.",
              ).optional(),
              proximity: z.object({
                windowAfter: z.number().int().describe(
                  "Number of characters after the finding to consider.",
                ).optional(),
                windowBefore: z.number().int().describe(
                  "Number of characters before the finding to consider. For tabular data, if you want to modify the likelihood of an entire column of findngs, set this to 1. For more information, see [Hotword example: Set the match likelihood of a table column] (https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes-likelihood#match-column-values).",
                ).optional(),
              }).describe(
                "Message for specifying a window around a finding to apply a detection rule.",
              ).optional(),
            }).describe(
              "The rule that adjusts the likelihood of findings within a certain proximity of hotwords.",
            ).optional(),
          })).describe(
            "Set of detection rules to apply to all findings of this CustomInfoType. Rules are applied in the order that they are specified. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          dictionary: z.object({
            cloudStoragePath: z.object({
              path: z.string().describe(
                "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
              ).optional(),
            }).describe(
              "Message representing a single file or path in Cloud Storage.",
            ).optional(),
            wordList: z.object({
              words: z.array(z.string()).describe(
                "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
              ).optional(),
            }).describe(
              "Message defining a list of words or phrases to search for in the data.",
            ).optional(),
          }).describe(
            'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
          ).optional(),
          exclusionType: z.enum([
            "EXCLUSION_TYPE_UNSPECIFIED",
            "EXCLUSION_TYPE_EXCLUDE",
          ]).describe(
            "If set to EXCLUSION_TYPE_EXCLUDE this infoType will not cause a finding to be returned. It still can be used for rules matching. Only supported for the `dictionary`, `regex`, and `stored_type` CustomInfoTypes.",
          ).optional(),
          infoType: z.object({
            name: z.string().describe(
              "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
            ).optional(),
            sensitivityScore: z.object({
              score: z.enum([
                "SENSITIVITY_SCORE_UNSPECIFIED",
                "SENSITIVITY_LOW",
                "SENSITIVITY_UNKNOWN",
                "SENSITIVITY_MODERATE",
                "SENSITIVITY_HIGH",
              ]).describe("The sensitivity score applied to the resource.")
                .optional(),
            }).describe(
              "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
            ).optional(),
            version: z.string().describe(
              "Optional version name for this InfoType.",
            ).optional(),
          }).describe("Type of information detected by the API.").optional(),
          likelihood: z.enum([
            "LIKELIHOOD_UNSPECIFIED",
            "VERY_UNLIKELY",
            "UNLIKELY",
            "POSSIBLE",
            "LIKELY",
            "VERY_LIKELY",
          ]).describe(
            "Likelihood to return for this CustomInfoType. This base value can be altered by a detection rule if the finding meets the criteria specified by the rule. Defaults to `VERY_LIKELY` if not specified.",
          ).optional(),
          metadataKeyValueExpression: z.object({
            keyRegex: z.string().describe(
              "The regular expression for the key. Key should be non-empty.",
            ).optional(),
            valueRegex: z.string().describe(
              "The regular expression for the value. Value should be non-empty.",
            ).optional(),
          }).describe(
            "Configuration for a custom infoType that detects key-value pairs in the metadata matching the specified regular expressions.",
          ).optional(),
          regex: z.object({
            groupIndexes: z.array(z.number().int()).describe(
              "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
            ).optional(),
            pattern: z.string().describe(
              "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
            ).optional(),
          }).describe("Message defining a custom regular expression.")
            .optional(),
          sensitivityScore: z.object({
            score: z.enum([
              "SENSITIVITY_SCORE_UNSPECIFIED",
              "SENSITIVITY_LOW",
              "SENSITIVITY_UNKNOWN",
              "SENSITIVITY_MODERATE",
              "SENSITIVITY_HIGH",
            ]).describe("The sensitivity score applied to the resource.")
              .optional(),
          }).describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          storedType: z.object({
            createTime: z.string().describe(
              "Timestamp indicating when the version of the `StoredInfoType` used for inspection was created. Output-only field, populated by the system.",
            ).optional(),
            name: z.string().describe(
              "Resource name of the requested `StoredInfoType`, for example `organizations/433245324/storedInfoTypes/432452342` or `projects/project-id/storedInfoTypes/432452342`.",
            ).optional(),
          }).describe("A reference to a StoredInfoType to use with scanning.")
            .optional(),
          surrogateType: z.object({}).describe(
            'Message for detecting output from deidentification transformations such as [`CryptoReplaceFfxFpeConfig`](https://cloud.google.com/sensitive-data-protection/docs/reference/rest/v2/organizations.deidentifyTemplates#cryptoreplaceffxfpeconfig). These types of transformations are those that perform pseudonymization, thereby producing a "surrogate" as output. This should be used in conjunction with a field on the transformation such as `surrogate_info_type`. This CustomInfoType does not support the use of `detection_rules`.',
          ).optional(),
        })).describe(
          "CustomInfoTypes provided by the user. See https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes to learn more.",
        ).optional(),
        excludeInfoTypes: z.boolean().describe(
          "When true, excludes type information of the findings. This is not used for data profiling.",
        ).optional(),
        includeQuote: z.boolean().describe(
          "When true, a contextual quote from the data that triggered a finding is included in the response; see Finding.quote. This is not used for data profiling.",
        ).optional(),
        infoTypes: z.array(z.object({
          name: z.string().describe(
            "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
          ).optional(),
          sensitivityScore: z.object({
            score: z.enum([
              "SENSITIVITY_SCORE_UNSPECIFIED",
              "SENSITIVITY_LOW",
              "SENSITIVITY_UNKNOWN",
              "SENSITIVITY_MODERATE",
              "SENSITIVITY_HIGH",
            ]).describe("The sensitivity score applied to the resource.")
              .optional(),
          }).describe(
            "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
          ).optional(),
          version: z.string().describe(
            "Optional version name for this InfoType.",
          ).optional(),
        })).describe(
          "Restricts what info_types to look for. The values must correspond to InfoType values returned by ListInfoTypes or listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference. When no InfoTypes or CustomInfoTypes are specified in a request, the system may automatically choose a default list of detectors to run, which may change over time. If you need precise control and predictability as to what detectors are run you should specify specific InfoTypes listed in the reference, otherwise a default list will be used, which may change over time.",
        ).optional(),
        limits: z.object({
          maxFindingsPerInfoType: z.array(z.object({
            infoType: z.object({
              name: z.string().describe(
                "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
              ).optional(),
              sensitivityScore: z.object({
                score: z.enum([
                  "SENSITIVITY_SCORE_UNSPECIFIED",
                  "SENSITIVITY_LOW",
                  "SENSITIVITY_UNKNOWN",
                  "SENSITIVITY_MODERATE",
                  "SENSITIVITY_HIGH",
                ]).describe("The sensitivity score applied to the resource.")
                  .optional(),
              }).describe(
                "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
              ).optional(),
              version: z.string().describe(
                "Optional version name for this InfoType.",
              ).optional(),
            }).describe("Type of information detected by the API.").optional(),
            maxFindings: z.number().int().describe(
              "Max findings limit for the given infoType.",
            ).optional(),
          })).describe(
            "Configuration of findings limit given for specified infoTypes.",
          ).optional(),
          maxFindingsPerItem: z.number().int().describe(
            "Max number of findings that are returned for each item scanned. When set within an InspectContentRequest, this field is ignored. This value isn't a hard limit. If the number of findings for an item reaches this limit, the inspection of that item ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns for the item can be multiple times higher than this value.",
          ).optional(),
          maxFindingsPerRequest: z.number().int().describe(
            "Max number of findings that are returned per request or job. If you set this field in an InspectContentRequest, the resulting maximum value is the value that you set or 3,000, whichever is lower. This value isn't a hard limit. If an inspection reaches this limit, the inspection ends gradually, not abruptly. Therefore, the actual number of findings that Cloud DLP returns can be multiple times higher than this value.",
          ).optional(),
        }).describe(
          "Configuration to control the number of findings returned for inspection. This is not used for de-identification or data profiling. When redacting sensitive data from images, finding limits don't apply. They can cause unexpected or inconsistent results, where only some data is redacted. Don't include finding limits in RedactImage requests. Otherwise, Cloud DLP returns an error.",
        ).optional(),
        minLikelihood: z.enum([
          "LIKELIHOOD_UNSPECIFIED",
          "VERY_UNLIKELY",
          "UNLIKELY",
          "POSSIBLE",
          "LIKELY",
          "VERY_LIKELY",
        ]).describe(
          "Only returns findings equal to or above this threshold. The default is POSSIBLE. In general, the highest likelihood setting yields the fewest findings in results and the lowest chance of a false positive. For more information, see [Match likelihood](https://cloud.google.com/sensitive-data-protection/docs/likelihood).",
        ).optional(),
        minLikelihoodPerInfoType: z.array(z.object({
          infoType: z.object({
            name: z.string().describe(
              "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
            ).optional(),
            sensitivityScore: z.object({
              score: z.enum([
                "SENSITIVITY_SCORE_UNSPECIFIED",
                "SENSITIVITY_LOW",
                "SENSITIVITY_UNKNOWN",
                "SENSITIVITY_MODERATE",
                "SENSITIVITY_HIGH",
              ]).describe("The sensitivity score applied to the resource.")
                .optional(),
            }).describe(
              "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
            ).optional(),
            version: z.string().describe(
              "Optional version name for this InfoType.",
            ).optional(),
          }).describe("Type of information detected by the API.").optional(),
          minLikelihood: z.enum([
            "LIKELIHOOD_UNSPECIFIED",
            "VERY_UNLIKELY",
            "UNLIKELY",
            "POSSIBLE",
            "LIKELY",
            "VERY_LIKELY",
          ]).describe(
            "Only returns findings equal to or above this threshold. This field is required or else the configuration fails.",
          ).optional(),
        })).describe(
          "Minimum likelihood per infotype. For each infotype, a user can specify a minimum likelihood. The system only returns a finding if its likelihood is above this threshold. If this field is not set, the system uses the InspectConfig min_likelihood.",
        ).optional(),
        ruleSet: z.array(z.object({
          infoTypes: z.array(z.object({
            name: z.string().describe(
              "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
            ).optional(),
            sensitivityScore: z.object({
              score: z.enum([
                "SENSITIVITY_SCORE_UNSPECIFIED",
                "SENSITIVITY_LOW",
                "SENSITIVITY_UNKNOWN",
                "SENSITIVITY_MODERATE",
                "SENSITIVITY_HIGH",
              ]).describe("The sensitivity score applied to the resource.")
                .optional(),
            }).describe(
              "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
            ).optional(),
            version: z.string().describe(
              "Optional version name for this InfoType.",
            ).optional(),
          })).describe("List of infoTypes this rule set is applied to.")
            .optional(),
          rules: z.array(z.object({
            adjustmentRule: z.object({
              adjustByImageFindings: z.object({
                imageContainmentType: z.object({
                  encloses: z.object({}).describe(
                    "Defines a condition where one bounding box encloses another.",
                  ).optional(),
                  fullyInside: z.object({}).describe(
                    "Defines a condition where one bounding box is fully inside another.",
                  ).optional(),
                  overlaps: z.object({}).describe(
                    "Defines a condition for overlapping bounding boxes.",
                  ).optional(),
                }).describe(
                  "Specifies the relationship between bounding boxes for image findings.",
                ).optional(),
                infoTypes: z.array(z.object({
                  name: z.string().describe(
                    "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                  ).optional(),
                  sensitivityScore: z.object({
                    score: z.enum([
                      "SENSITIVITY_SCORE_UNSPECIFIED",
                      "SENSITIVITY_LOW",
                      "SENSITIVITY_UNKNOWN",
                      "SENSITIVITY_MODERATE",
                      "SENSITIVITY_HIGH",
                    ]).describe(
                      "The sensitivity score applied to the resource.",
                    ).optional(),
                  }).describe(
                    "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                  ).optional(),
                  version: z.string().describe(
                    "Optional version name for this InfoType.",
                  ).optional(),
                })).describe(
                  "A list of image-supported infoTypes—excluding [document infoTypes](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#documents)—to be used as context for the adjustment rule. Sensitive Data Protection adjusts the likelihood of an image finding if its bounding box has the specified spatial relationship (defined by `image_containment_type`) with a finding of an infoType in this list. For example, you can create a rule to adjust the likelihood of a `US_PASSPORT` finding if it is enclosed by a finding of `OBJECT_TYPE/PERSON/PASSPORT`. To configure this, set `US_PASSPORT` in `InspectionRuleSet.info_types`. Add an `adjustment_rule` with an `adjust_by_image_findings.info_types` that contains `OBJECT_TYPE/PERSON/PASSPORT` and `image_containment_type` set to `encloses`. In this case, the likelihood of the `US_PASSPORT` finding is adjusted, but the likelihood of the `OBJECT_TYPE/PERSON/PASSPORT` finding is not.",
                ).optional(),
                minLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe(
                  "Required. Minimum likelihood of the `adjust_by_image_findings.info_types` finding. If the likelihood is lower than this value, Sensitive Data Protection doesn't adjust the likelihood of the `InspectionRuleSet.info_types` finding.",
                ).optional(),
              }).describe(
                "AdjustmentRule condition for image findings. This rule is silently ignored if the content being inspected is not an image.",
              ).optional(),
              adjustByMatchingInfoTypes: z.object({
                infoTypes: z.array(z.object({
                  name: z.string().describe(
                    "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                  ).optional(),
                  sensitivityScore: z.object({
                    score: z.enum([
                      "SENSITIVITY_SCORE_UNSPECIFIED",
                      "SENSITIVITY_LOW",
                      "SENSITIVITY_UNKNOWN",
                      "SENSITIVITY_MODERATE",
                      "SENSITIVITY_HIGH",
                    ]).describe(
                      "The sensitivity score applied to the resource.",
                    ).optional(),
                  }).describe(
                    "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                  ).optional(),
                  version: z.string().describe(
                    "Optional version name for this InfoType.",
                  ).optional(),
                })).describe(
                  "Sensitive Data Protection adjusts the likelihood of a finding if that finding also matches one of these infoTypes. For example, you can create a rule to adjust the likelihood of a `PHONE_NUMBER` finding if the string is found within a document that is classified as `DOCUMENT_TYPE/HR/RESUME`. To configure this, set `PHONE_NUMBER` in `InspectionRuleSet.info_types`. Add an `adjustment_rule` with an `adjust_by_matching_info_types.info_types` that contains `DOCUMENT_TYPE/HR/RESUME`. In this case, the likelihood of the `PHONE_NUMBER` finding is adjusted, but the likelihood of the `DOCUMENT_TYPE/HR/RESUME` finding is not.",
                ).optional(),
                matchingType: z.enum([
                  "MATCHING_TYPE_UNSPECIFIED",
                  "MATCHING_TYPE_FULL_MATCH",
                  "MATCHING_TYPE_PARTIAL_MATCH",
                  "MATCHING_TYPE_INVERSE_MATCH",
                  "MATCHING_TYPE_RULE_SPECIFIC",
                ]).describe(
                  "How the adjustment rule is applied. Only `MATCHING_TYPE_PARTIAL_MATCH` is supported: - Partial match: adjusts the findings of infoTypes specified in the inspection rule when they have a nonempty intersection with a finding of an infoType specified in this adjustment rule.",
                ).optional(),
                minLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe(
                  "Required. Minimum likelihood of the `adjust_by_matching_info_types.info_types` finding. If the likelihood is lower than this value, Sensitive Data Protection doesn't adjust the likelihood of the `InspectionRuleSet.info_types` finding.",
                ).optional(),
              }).describe("AdjustmentRule condition for matching infoTypes.")
                .optional(),
              likelihoodAdjustment: z.object({
                fixedLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe("Set the likelihood of a finding to a fixed value.")
                  .optional(),
                relativeLikelihood: z.number().int().describe(
                  "Increase or decrease the likelihood by the specified number of levels. For example, if a finding would be `POSSIBLE` without the detection rule and `relative_likelihood` is 1, then it is upgraded to `LIKELY`, while a value of -1 would downgrade it to `UNLIKELY`. Likelihood may never drop below `VERY_UNLIKELY` or exceed `VERY_LIKELY`, so applying an adjustment of 1 followed by an adjustment of -1 when base likelihood is `VERY_LIKELY` will result in a final likelihood of `LIKELY`.",
                ).optional(),
              }).describe(
                "Message for specifying an adjustment to the likelihood of a finding as part of a detection rule.",
              ).optional(),
            }).describe(
              "Rule that specifies conditions when a certain infoType's finding details should be adjusted.",
            ).optional(),
            exclusionRule: z.object({
              dictionary: z.object({
                cloudStoragePath: z.object({
                  path: z.string().describe(
                    "A URL representing a file or path (no wildcards) in Cloud Storage. Example: `gs://[BUCKET_NAME]/dictionary.txt`",
                  ).optional(),
                }).describe(
                  "Message representing a single file or path in Cloud Storage.",
                ).optional(),
                wordList: z.object({
                  words: z.array(z.string()).describe(
                    "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
                  ).optional(),
                }).describe(
                  "Message defining a list of words or phrases to search for in the data.",
                ).optional(),
              }).describe(
                'Custom information type based on a dictionary of words or phrases. This can be used to match sensitive information specific to the data, such as a list of employee IDs or job titles. Dictionary words are case-insensitive and all characters other than letters and digits in the unicode [Basic Multilingual Plane](https://en.wikipedia.org/wiki/Plane_%28Unicode%29#Basic_Multilingual_Plane) will be replaced with whitespace when scanning for matches, so the dictionary phrase "Sam Johnson" will match all three phrases "sam johnson", "Sam, Johnson", and "Sam (Johnson)". Additionally, the characters surrounding any match must be of a different type than the adjacent characters within the word, so letters must be next to non-letters and digits next to non-digits. For example, the dictionary word "jen" will match the first three letters of the text "jen123" but will return no matches for "jennifer". Dictionary words containing a large number of characters that are not letters or digits may result in unexpected findings because such characters are treated as whitespace. The [limits](https://cloud.google.com/sensitive-data-protection/limits) page contains details about the size limits of dictionaries. For dictionaries that do not fit within these constraints, consider using `LargeCustomDictionaryConfig` in the `StoredInfoType` API.',
              ).optional(),
              excludeByHotword: z.object({
                hotwordRegex: z.object({
                  groupIndexes: z.array(z.number().int()).describe(
                    "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
                  ).optional(),
                  pattern: z.string().describe(
                    "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
                  ).optional(),
                }).describe("Message defining a custom regular expression.")
                  .optional(),
                proximity: z.object({
                  windowAfter: z.number().int().describe(
                    "Number of characters after the finding to consider.",
                  ).optional(),
                  windowBefore: z.number().int().describe(
                    "Number of characters before the finding to consider. For tabular data, if you want to modify the likelihood of an entire column of findngs, set this to 1. For more information, see [Hotword example: Set the match likelihood of a table column] (https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes-likelihood#match-column-values).",
                  ).optional(),
                }).describe(
                  "Message for specifying a window around a finding to apply a detection rule.",
                ).optional(),
              }).describe(
                "The rule to exclude findings based on a hotword. For record inspection of tables, column names are considered hotwords. An example of this is to exclude a finding if it belongs to a BigQuery column that matches a specific pattern.",
              ).optional(),
              excludeByImageFindings: z.object({
                imageContainmentType: z.object({
                  encloses: z.object({}).describe(
                    "Defines a condition where one bounding box encloses another.",
                  ).optional(),
                  fullyInside: z.object({}).describe(
                    "Defines a condition where one bounding box is fully inside another.",
                  ).optional(),
                  overlaps: z.object({}).describe(
                    "Defines a condition for overlapping bounding boxes.",
                  ).optional(),
                }).describe(
                  "Specifies the relationship between bounding boxes for image findings.",
                ).optional(),
                infoTypes: z.array(z.object({
                  name: z.string().describe(
                    "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                  ).optional(),
                  sensitivityScore: z.object({
                    score: z.enum([
                      "SENSITIVITY_SCORE_UNSPECIFIED",
                      "SENSITIVITY_LOW",
                      "SENSITIVITY_UNKNOWN",
                      "SENSITIVITY_MODERATE",
                      "SENSITIVITY_HIGH",
                    ]).describe(
                      "The sensitivity score applied to the resource.",
                    ).optional(),
                  }).describe(
                    "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                  ).optional(),
                  version: z.string().describe(
                    "Optional version name for this InfoType.",
                  ).optional(),
                })).describe(
                  "A list of image-supported infoTypes—excluding [document infoTypes](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#documents)—to be used as context for the exclusion rule. A finding is excluded if its bounding box has the specified spatial relationship (defined by `image_containment_type`) with a finding of an infoType in this list. For example, if `InspectionRuleSet.info_types` includes `OBJECT_TYPE/PERSON` and this `exclusion_rule` specifies `info_types` as `OBJECT_TYPE/PERSON/PASSPORT` with `image_containment_type` set to `encloses`, then `OBJECT_TYPE/PERSON` findings will be excluded if they are fully contained within the bounding box of an `OBJECT_TYPE/PERSON/PASSPORT` finding.",
                ).optional(),
              }).describe(
                "The rule to exclude image findings based on spatial relationships with other image findings. For example, exclude an image finding if it overlaps with another image finding. This rule is silently ignored if the content being inspected is not an image.",
              ).optional(),
              excludeInfoTypes: z.object({
                infoTypes: z.array(z.object({
                  name: z.string().describe(
                    "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                  ).optional(),
                  sensitivityScore: z.object({
                    score: z.enum([
                      "SENSITIVITY_SCORE_UNSPECIFIED",
                      "SENSITIVITY_LOW",
                      "SENSITIVITY_UNKNOWN",
                      "SENSITIVITY_MODERATE",
                      "SENSITIVITY_HIGH",
                    ]).describe(
                      "The sensitivity score applied to the resource.",
                    ).optional(),
                  }).describe(
                    "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                  ).optional(),
                  version: z.string().describe(
                    "Optional version name for this InfoType.",
                  ).optional(),
                })).describe(
                  'InfoType list in ExclusionRule rule drops a finding when it overlaps or contained within with a finding of an infoType from this list. For example, for `InspectionRuleSet.info_types` containing "PHONE_NUMBER"` and `exclusion_rule` containing `exclude_info_types.info_types` with "EMAIL_ADDRESS" the phone number findings are dropped if they overlap with EMAIL_ADDRESS finding. That leads to "555-222-2222@example.org" to generate only a single finding, namely email address.',
                ).optional(),
              }).describe("List of excluded infoTypes.").optional(),
              matchingType: z.enum([
                "MATCHING_TYPE_UNSPECIFIED",
                "MATCHING_TYPE_FULL_MATCH",
                "MATCHING_TYPE_PARTIAL_MATCH",
                "MATCHING_TYPE_INVERSE_MATCH",
                "MATCHING_TYPE_RULE_SPECIFIC",
              ]).describe(
                "How the rule is applied, see MatchingType documentation for details.",
              ).optional(),
              regex: z.object({
                groupIndexes: z.array(z.number().int()).describe(
                  "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
                ).optional(),
                pattern: z.string().describe(
                  "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
                ).optional(),
              }).describe("Message defining a custom regular expression.")
                .optional(),
            }).describe(
              "The rule that specifies conditions when findings of infoTypes specified in `InspectionRuleSet` are removed from results.",
            ).optional(),
            hotwordRule: z.object({
              hotwordRegex: z.object({
                groupIndexes: z.array(z.number().int()).describe(
                  "The index of the submatch to extract as findings. When not specified, the entire match is returned. No more than 3 may be included.",
                ).optional(),
                pattern: z.string().describe(
                  "Pattern defining the regular expression. Its syntax (https://github.com/google/re2/wiki/Syntax) can be found under the google/re2 repository on GitHub.",
                ).optional(),
              }).describe("Message defining a custom regular expression.")
                .optional(),
              likelihoodAdjustment: z.object({
                fixedLikelihood: z.enum([
                  "LIKELIHOOD_UNSPECIFIED",
                  "VERY_UNLIKELY",
                  "UNLIKELY",
                  "POSSIBLE",
                  "LIKELY",
                  "VERY_LIKELY",
                ]).describe("Set the likelihood of a finding to a fixed value.")
                  .optional(),
                relativeLikelihood: z.number().int().describe(
                  "Increase or decrease the likelihood by the specified number of levels. For example, if a finding would be `POSSIBLE` without the detection rule and `relative_likelihood` is 1, then it is upgraded to `LIKELY`, while a value of -1 would downgrade it to `UNLIKELY`. Likelihood may never drop below `VERY_UNLIKELY` or exceed `VERY_LIKELY`, so applying an adjustment of 1 followed by an adjustment of -1 when base likelihood is `VERY_LIKELY` will result in a final likelihood of `LIKELY`.",
                ).optional(),
              }).describe(
                "Message for specifying an adjustment to the likelihood of a finding as part of a detection rule.",
              ).optional(),
              proximity: z.object({
                windowAfter: z.number().int().describe(
                  "Number of characters after the finding to consider.",
                ).optional(),
                windowBefore: z.number().int().describe(
                  "Number of characters before the finding to consider. For tabular data, if you want to modify the likelihood of an entire column of findngs, set this to 1. For more information, see [Hotword example: Set the match likelihood of a table column] (https://cloud.google.com/sensitive-data-protection/docs/creating-custom-infotypes-likelihood#match-column-values).",
                ).optional(),
              }).describe(
                "Message for specifying a window around a finding to apply a detection rule.",
              ).optional(),
            }).describe(
              "The rule that adjusts the likelihood of findings within a certain proximity of hotwords.",
            ).optional(),
          })).describe(
            "Set of rules to be applied to infoTypes. The rules are applied in order.",
          ).optional(),
        })).describe(
          "Set of rules to apply to the findings for this InspectConfig. Exclusion rules, contained in the set are executed in the end, other rules are executed in the order they are specified for each info type. Not supported for the `metadata_key_value_expression` CustomInfoType.",
        ).optional(),
      }).describe(
        "Configuration description of the scanning process. When used with redactContent only info_types and min_likelihood are currently used.",
      ).optional(),
      inspectTemplateName: z.string().describe(
        "If provided, will be used as the default for all values in InspectConfig. `inspect_config` will be merged into the values persisted as part of the template.",
      ).optional(),
      storageConfig: z.object({
        bigQueryOptions: z.object({
          excludedFields: z.array(z.object({
            name: z.string().describe("Name describing the field.").optional(),
          })).describe(
            "References to fields excluded from scanning. This allows you to skip inspection of entire columns which you know have no findings. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used.",
          ).optional(),
          identifyingFields: z.array(z.object({
            name: z.string().describe("Name describing the field.").optional(),
          })).describe(
            "Table fields that may uniquely identify a row within the table. When `actions.saveFindings.outputConfig.table` is specified, the values of columns specified here are available in the output table under `location.content_locations.record_location.record_key.id_values`. Nested fields such as `person.birthdate.year` are allowed.",
          ).optional(),
          includedFields: z.array(z.object({
            name: z.string().describe("Name describing the field.").optional(),
          })).describe(
            "Limit scanning only to these fields. When inspecting a table, we recommend that you inspect all columns. Otherwise, findings might be affected because hints from excluded columns will not be used.",
          ).optional(),
          rowsLimit: z.string().describe(
            "Max number of rows to scan. If the table has more rows than this value, the rest of the rows are omitted. If not set, or if set to 0, all rows will be scanned. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig.",
          ).optional(),
          rowsLimitPercent: z.number().int().describe(
            "Max percentage of rows to scan. The rest are omitted. The number of rows scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of rows_limit and rows_limit_percent can be specified. Cannot be used in conjunction with TimespanConfig. Caution: A [known issue](https://cloud.google.com/sensitive-data-protection/docs/known-issues#bq-sampling) is causing the `rowsLimitPercent` field to behave unexpectedly. We recommend using `rowsLimit` instead.",
          ).optional(),
          sampleMethod: z.enum([
            "SAMPLE_METHOD_UNSPECIFIED",
            "TOP",
            "RANDOM_START",
          ]).describe("How to sample the data.").optional(),
          tableReference: z.object({
            datasetId: z.string().describe("Dataset ID of the table.")
              .optional(),
            projectId: z.string().describe(
              "The Google Cloud project ID of the project containing the table. If omitted, project ID is inferred from the API call.",
            ).optional(),
            tableId: z.string().describe("Name of the table.").optional(),
          }).describe(
            "Message defining the location of a BigQuery table. A table is uniquely identified by its project_id, dataset_id, and table_name. Within a query a table is often referenced with a string in the format of: `:.` or `..`.",
          ).optional(),
        }).describe("Options defining BigQuery table and row identifiers.")
          .optional(),
        cloudStorageOptions: z.object({
          bytesLimitPerFile: z.string().describe(
            "Max number of bytes to scan from a file. If a scanned file's size is bigger than this value then the rest of the bytes are omitted. Only one of `bytes_limit_per_file` and `bytes_limit_per_file_percent` can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file).",
          ).optional(),
          bytesLimitPerFilePercent: z.number().int().describe(
            "Max percentage of bytes to scan from a file. The rest are omitted. The number of bytes scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0. Only one of bytes_limit_per_file and bytes_limit_per_file_percent can be specified. This field can't be set if de-identification is requested. For certain file types, setting this field has no effect. For more information, see [Limits on bytes scanned per file](https://cloud.google.com/sensitive-data-protection/docs/supported-file-types#max-byte-size-per-file).",
          ).optional(),
          fileSet: z.object({
            regexFileSet: z.object({
              bucketName: z.string().describe(
                "The name of a Cloud Storage bucket. Required.",
              ).optional(),
              excludeRegex: z.array(z.string()).describe(
                "A list of regular expressions matching file paths to exclude. All files in the bucket that match at least one of these regular expressions will be excluded from the scan. Regular expressions use RE2 [syntax](https://github.com/google/re2/wiki/Syntax); a guide can be found under the google/re2 repository on GitHub.",
              ).optional(),
              includeRegex: z.array(z.string()).describe(
                "A list of regular expressions matching file paths to include. All files in the bucket that match at least one of these regular expressions will be included in the set of files, except for those that also match an item in `exclude_regex`. Leaving this field empty will match all files by default (this is equivalent to including `.*` in the list). Regular expressions use RE2 [syntax](https://github.com/google/re2/wiki/Syntax); a guide can be found under the google/re2 repository on GitHub.",
              ).optional(),
            }).describe(
              'Message representing a set of files in a Cloud Storage bucket. Regular expressions are used to allow fine-grained control over which files in the bucket to include. Included files are those that match at least one item in `include_regex` and do not match any items in `exclude_regex`. Note that a file that matches items from both lists will _not_ be included. For a match to occur, the entire file path (i.e., everything in the url after the bucket name) must match the regular expression. For example, given the input `{bucket_name: "mybucket", include_regex: ["directory1/.*"], exclude_regex: ["directory1/excluded.*"]}`: * `gs://mybucket/directory1/myfile` will be included * `gs://mybucket/directory1/directory2/myfile` will be included (`.*` matches across `/`) * `gs://mybucket/directory0/directory1/myfile` will _not_ be included (the full path doesn\'t match any items in `include_regex`) * `gs://mybucket/directory1/excludedfile` will _not_ be included (the path matches an item in `exclude_regex`) If `include_regex` is left empty, it will match all files by default (this is equivalent to setting `include_regex: [".*"]`). Some other common use cases: * `{bucket_name: "mybucket", exclude_regex: [".*\\.pdf"]}` will include all files in `mybucket` except for.pdf files * `{bucket_name: "mybucket", include_regex: ["directory/[^/]+"]}` will include all files directly under `gs://mybucket/directory/`, without matching across `/`',
            ).optional(),
            url: z.string().describe(
              "The Cloud Storage url of the file(s) to scan, in the format `gs:///`. Trailing wildcard in the path is allowed. If the url ends in a trailing slash, the bucket or directory represented by the url will be scanned non-recursively (content in sub-directories will not be scanned). This means that `gs://mybucket/` is equivalent to `gs://mybucket/*`, and `gs://mybucket/directory/` is equivalent to `gs://mybucket/directory/*`. Exactly one of `url` or `regex_file_set` must be set.",
            ).optional(),
          }).describe("Set of files to scan.").optional(),
          fileTypes: z.array(
            z.enum([
              "FILE_TYPE_UNSPECIFIED",
              "BINARY_FILE",
              "TEXT_FILE",
              "IMAGE",
              "WORD",
              "PDF",
              "AVRO",
              "CSV",
              "TSV",
              "POWERPOINT",
              "EXCEL",
            ]),
          ).describe(
            "List of file type groups to include in the scan. If empty, all files are scanned and available data format processors are applied. In addition, the binary content of the selected files is always scanned as well. Images are scanned only as binary if the specified region does not support image inspection and no file_types were specified. Image inspection is restricted to 'global', 'us', 'asia', and 'europe'.",
          ).optional(),
          filesLimitPercent: z.number().int().describe(
            "Limits the number of files to scan to this percentage of the input FileSet. Number of files scanned is rounded down. Must be between 0 and 100, inclusively. Both 0 and 100 means no limit. Defaults to 0.",
          ).optional(),
          sampleMethod: z.enum([
            "SAMPLE_METHOD_UNSPECIFIED",
            "TOP",
            "RANDOM_START",
          ]).describe("How to sample the data.").optional(),
        }).describe(
          "Options defining a file or a set of files within a Cloud Storage bucket.",
        ).optional(),
        datastoreOptions: z.object({
          kind: z.object({
            name: z.string().describe("The name of the kind.").optional(),
          }).describe("A representation of a Datastore kind.").optional(),
          partitionId: z.object({
            namespaceId: z.string().describe(
              "If not empty, the ID of the namespace to which the entities belong.",
            ).optional(),
            projectId: z.string().describe(
              "The ID of the project to which the entities belong.",
            ).optional(),
          }).describe(
            "Datastore partition ID. A partition ID identifies a grouping of entities. The grouping is always by project and namespace, however the namespace ID may be empty. A partition ID contains several dimensions: project ID and namespace ID.",
          ).optional(),
        }).describe(
          "Options defining a data set within Google Cloud Datastore.",
        ).optional(),
        hybridOptions: z.object({
          description: z.string().describe(
            "A short description of where the data is coming from. Will be stored once in the job. 256 max length.",
          ).optional(),
          labels: z.record(z.string(), z.string()).describe(
            'To organize findings, these labels will be added to each finding. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. No more than 10 labels can be associated with a given finding. Examples: * `"environment": "production"` * `"pipeline": "etl"`',
          ).optional(),
          requiredFindingLabelKeys: z.array(z.string()).describe(
            "These are labels that each inspection request must include within their 'finding_labels' map. Request may contain others, but any missing one of these will be rejected. Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. No more than 10 keys can be required.",
          ).optional(),
          tableOptions: z.object({
            identifyingFields: z.array(z.object({
              name: z.string().describe("Name describing the field.")
                .optional(),
            })).describe(
              "The columns that are the primary keys for table objects included in ContentItem. A copy of this cell's value will stored alongside alongside each finding so that the finding can be traced to the specific row it came from. No more than 3 may be provided.",
            ).optional(),
          }).describe(
            "Instructions regarding the table content being inspected.",
          ).optional(),
        }).describe(
          "Configuration to control jobs where the content being inspected is outside of Google Cloud Platform.",
        ).optional(),
        timespanConfig: z.object({
          enableAutoPopulationOfTimespanConfig: z.boolean().describe(
            "When the job is started by a JobTrigger we will automatically figure out a valid start_time to avoid scanning files that have not been modified since the last time the JobTrigger executed. This will be based on the time of the execution of the last run of the JobTrigger or the timespan end_time used in the last run of the JobTrigger. **For BigQuery** Inspect jobs triggered by automatic population will scan data that is at least three hours old when the job starts. This is because streaming buffer rows are not read during inspection and reading up to the current timestamp will result in skipped rows. See the [known issue](https://cloud.google.com/sensitive-data-protection/docs/known-issues#recently-streamed-data) related to this operation.",
          ).optional(),
          endTime: z.string().describe(
            "Exclude files, tables, or rows newer than this value. If not set, no upper time limit is applied.",
          ).optional(),
          startTime: z.string().describe(
            "Exclude files, tables, or rows older than this value. If not set, no lower time limit is applied.",
          ).optional(),
          timestampField: z.object({
            name: z.string().describe("Name describing the field.").optional(),
          }).describe(
            "General identifier of a data field in a storage service.",
          ).optional(),
        }).describe(
          "Configuration of the timespan of the items to include in scanning. Currently only supported when inspecting Cloud Storage and BigQuery.",
        ).optional(),
      }).describe("Shared message indicating Cloud storage type.").optional(),
    }).describe("Controls what and how to inspect for findings.").optional(),
    lastRunTime: z.string().describe(
      "Output only. The timestamp of the last time this trigger executed.",
    ).optional(),
    name: z.string().describe(
      "Unique resource name for the triggeredJob, assigned by the service when the triggeredJob is created, for example `projects/dlp-test-project/jobTriggers/53234423`.",
    ).optional(),
    status: z.enum(["STATUS_UNSPECIFIED", "HEALTHY", "PAUSED", "CANCELLED"])
      .describe("Required. A status for this trigger.").optional(),
    triggers: z.array(z.object({
      manual: z.object({}).describe(
        "Job trigger option for hybrid jobs. Jobs must be manually created and finished.",
      ).optional(),
      schedule: z.object({
        recurrencePeriodDuration: z.string().describe(
          "With this option a job is started on a regular periodic basis. For example: every day (86400 seconds). A scheduled start time will be skipped if the previous execution has not ended when its scheduled time occurs. This value must be set to a time duration greater than or equal to 1 day and can be no longer than 60 days.",
        ).optional(),
      }).describe("Schedule for inspect job triggers.").optional(),
    })).describe(
      "A list of triggers which will be OR'ed together. Only one in the list needs to trigger for a job to be started. The list may contain only a single Schedule trigger and must have at least one object.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of a triggeredJob.",
    ).optional(),
  }).describe(
    "Contains a configuration to make API calls on a repeating basis. See https://cloud.google.com/sensitive-data-protection/docs/concepts-job-triggers to learn more.",
  ).optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  triggerId: z.string().describe(
    "The trigger id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dlp/jobtriggers",
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
        "Contains a configuration to make API calls on a repeating basis. See https://...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobTriggers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["jobTrigger"] !== undefined) body["jobTrigger"] = g["jobTrigger"];
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["triggerId"] !== undefined) body["triggerId"] = g["triggerId"];
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
        const instanceName = g.name?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a jobTriggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobTriggers"),
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
      description: "Update jobTriggers attributes",
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
        if (g["jobTrigger"] !== undefined) body["jobTrigger"] = g["jobTrigger"];
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
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
      description: "Delete the jobTriggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobTriggers"),
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
      description: "Sync jobTriggers state from GCP",
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
