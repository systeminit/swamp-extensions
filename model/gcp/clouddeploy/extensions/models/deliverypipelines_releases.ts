// Auto-generated extension model for @swamp/gcp/clouddeploy/deliverypipelines-releases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/releases/${shortName}`;
}

const BASE_URL = "https://clouddeploy.googleapis.com/";

const GET_CONFIG = {
  "id": "clouddeploy.projects.locations.deliveryPipelines.releases.get",
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
  "id": "clouddeploy.projects.locations.deliveryPipelines.releases.create",
  "path": "v1/{+parent}/releases",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "overrideDeployPolicy": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "releaseId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  buildArtifacts: z.array(z.object({
    image: z.string().describe(
      "Optional. Image name in Skaffold configuration.",
    ).optional(),
    tag: z.string().describe(
      'Optional. Image tag to use. This will generally be the full path to an image, such as "gcr.io/my-project/busybox:1.2.3" or "gcr.io/my-project/busybox@sha256:abc123".',
    ).optional(),
  })).describe(
    "Optional. List of artifacts to pass through to Skaffold command.",
  ).optional(),
  condition: z.object({
    dockerVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    helmVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    kptVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    kubectlVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    kustomizeVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    releaseReadyCondition: z.object({
      status: z.boolean().describe(
        "True if the Release is in a valid state. Otherwise at least one condition in `ReleaseCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Release.",
      ).optional(),
    }).describe(
      "ReleaseReadyCondition contains information around the status of the Release. If a release is not ready, you cannot create a rollout with the release.",
    ).optional(),
    skaffoldSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "The time at which this release's version of Skaffold will enter maintenance mode.",
      ).optional(),
      skaffoldSupportState: z.enum([
        "SKAFFOLD_SUPPORT_STATE_UNSPECIFIED",
        "SKAFFOLD_SUPPORT_STATE_SUPPORTED",
        "SKAFFOLD_SUPPORT_STATE_MAINTENANCE_MODE",
        "SKAFFOLD_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "The Skaffold support state for this release's version of Skaffold.",
      ).optional(),
      status: z.boolean().describe(
        "True if the version of Skaffold used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "The time at which this release's version of Skaffold will no longer be supported.",
      ).optional(),
    }).describe(
      "SkaffoldSupportedCondition contains information about when support for the release's version of Skaffold ends.",
    ).optional(),
    skaffoldVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
  }).describe("ReleaseCondition contains all conditions relevant to a Release.")
    .optional(),
  deliveryPipelineSnapshot: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy.",
    ).optional(),
    condition: z.object({
      pipelineReadyCondition: z.object({
        status: z.boolean().describe(
          "True if the Pipeline is in a valid state. Otherwise at least one condition in `PipelineCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Pipeline.",
        ).optional(),
        updateTime: z.string().describe("Last time the condition was updated.")
          .optional(),
      }).describe(
        "PipelineReadyCondition contains information around the status of the Pipeline.",
      ).optional(),
      targetsPresentCondition: z.object({
        missingTargets: z.array(z.string()).describe(
          "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
        ).optional(),
        status: z.boolean().describe(
          "True if there aren't any missing Targets.",
        ).optional(),
        updateTime: z.string().describe("Last time the condition was updated.")
          .optional(),
      }).describe(
        "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
      ).optional(),
      targetsTypeCondition: z.object({
        errorDetails: z.string().describe("Human readable error message.")
          .optional(),
        status: z.boolean().describe(
          "True if the targets are all a comparable type. For example this is true if all targets are GKE clusters. This is false if some targets are Cloud Run targets and others are GKE clusters.",
        ).optional(),
      }).describe(
        "TargetsTypeCondition contains information on whether the Targets defined in the Delivery Pipeline are of the same type.",
      ).optional(),
    }).describe(
      "PipelineCondition contains all conditions relevant to a Delivery Pipeline.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Time at which the pipeline was created.",
    ).optional(),
    description: z.string().describe(
      "Optional. Description of the `DeliveryPipeline`. Max length is 255 characters.",
    ).optional(),
    etag: z.string().describe(
      "This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
    ).optional(),
    name: z.string().describe(
      "Identifier. Name of the `DeliveryPipeline`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}`. The `deliveryPipeline` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
    ).optional(),
    serialPipeline: z.object({
      stages: z.array(z.object({
        deployParameters: z.array(z.object({
          matchTargetLabels: z.record(z.string(), z.string()).describe(
            "Optional. Deploy parameters are applied to targets with match labels. If unspecified, deploy parameters are applied to all targets (including child targets of a multi-target).",
          ).optional(),
          values: z.record(z.string(), z.string()).describe(
            "Required. Values are deploy parameters in key-value pairs.",
          ).optional(),
        })).describe(
          "Optional. The deploy parameters to use for the target in this stage.",
        ).optional(),
        profiles: z.array(z.string()).describe(
          "Optional. Skaffold profiles to use when rendering the manifest for this stage's `Target`.",
        ).optional(),
        strategy: z.object({
          canary: z.object({
            canaryDeployment: z.object({
              analysis: z.object({
                customChecks: z.array(z.object({
                  frequency: z.string().describe(
                    "Optional. The frequency at which the custom check will be run, with a minimum and default of 5 minutes.",
                  ).optional(),
                  id: z.string().describe(
                    "Required. The ID of the custom Analysis check.",
                  ).optional(),
                  task: z.object({
                    container: z.object({
                      args: z.array(z.string()).describe(
                        "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                      ).optional(),
                      command: z.array(z.string()).describe(
                        "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                      ).optional(),
                      env: z.record(z.string(), z.string()).describe(
                        "Optional. Environment variables that are set in the container.",
                      ).optional(),
                      image: z.string().describe(
                        "Required. Image is the container image to use.",
                      ).optional(),
                    }).describe(
                      "This task is represented by a container that is executed in the Cloud Build execution environment.",
                    ).optional(),
                  }).describe(
                    "A Task represents a unit of work that is executed as part of a Job.",
                  ).optional(),
                })).describe(
                  "Optional. Custom analysis checks from 3P metric providers.",
                ).optional(),
                duration: z.string().describe(
                  "Required. The amount of time in minutes the analysis on the target will last. If all analysis checks have successfully completed before the specified duration, the analysis is successful. If a check is still running while the specified duration passes, it will wait for that check to complete to determine if the analysis is successful. The maximum duration is 48 hours.",
                ).optional(),
                googleCloud: z.object({
                  alertPolicyChecks: z.array(z.object({
                    alertPolicies: z.array(z.string()).describe(
                      "Required. The Cloud Monitoring Alert Policies to check for active alerts. Format is `projects/{project}/alertPolicies/{alert_policy}`.",
                    ).optional(),
                    id: z.string().describe(
                      "Required. The ID of the analysis check.",
                    ).optional(),
                    labels: z.record(z.string(), z.string()).describe(
                      "Optional. A set of labels to filter active alerts. If set, only alerts having all of the specified labels will be considered. Otherwise, all active alerts will be considered.",
                    ).optional(),
                  })).describe(
                    "Optional. A list of Cloud Monitoring Alert Policy checks to perform as part of the analysis.",
                  ).optional(),
                }).describe(
                  "GoogleCloudAnalysis is a set of Google Cloud-based checks to perform on the deployment.",
                ).optional(),
              }).describe(
                "Analysis contains the configuration for the set of analyses to be performed on the target.",
              ).optional(),
              percentages: z.array(z.number().int()).describe(
                "Required. The percentage based deployments that will occur as a part of a `Rollout`. List is expected in ascending order and each integer n is 0 <= n < 100. If the GatewayServiceMesh is configured for Kubernetes, then the range for n is 0 <= n <= 100.",
              ).optional(),
              postdeploy: z.object({
                actions: z.array(z.string()).describe(
                  "Optional. A sequence of Skaffold custom actions to invoke during execution of the postdeploy job.",
                ).optional(),
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()).describe(
                      "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                    ).optional(),
                    command: z.array(z.string()).describe(
                      "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                    ).optional(),
                    env: z.record(z.string(), z.string()).describe(
                      "Optional. Environment variables that are set in the container.",
                    ).optional(),
                    image: z.string().describe(
                      "Required. Image is the container image to use.",
                    ).optional(),
                  }).describe(
                    "This task is represented by a container that is executed in the Cloud Build execution environment.",
                  ).optional(),
                })).describe(
                  "Optional. The tasks that will run as a part of the postdeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
                ).optional(),
              }).describe(
                "Postdeploy contains the postdeploy job configuration information.",
              ).optional(),
              predeploy: z.object({
                actions: z.array(z.string()).describe(
                  "Optional. A sequence of Skaffold custom actions to invoke during execution of the predeploy job.",
                ).optional(),
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()).describe(
                      "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                    ).optional(),
                    command: z.array(z.string()).describe(
                      "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                    ).optional(),
                    env: z.record(z.string(), z.string()).describe(
                      "Optional. Environment variables that are set in the container.",
                    ).optional(),
                    image: z.string().describe(
                      "Required. Image is the container image to use.",
                    ).optional(),
                  }).describe(
                    "This task is represented by a container that is executed in the Cloud Build execution environment.",
                  ).optional(),
                })).describe(
                  "Optional. The tasks that will run as a part of the predeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
                ).optional(),
              }).describe(
                "Predeploy contains the predeploy job configuration information.",
              ).optional(),
              verify: z.boolean().describe(
                "Optional. Whether to run verify tests after each percentage deployment via `skaffold verify`.",
              ).optional(),
              verifyConfig: z.object({
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()).describe(
                      "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                    ).optional(),
                    command: z.array(z.string()).describe(
                      "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                    ).optional(),
                    env: z.record(z.string(), z.string()).describe(
                      "Optional. Environment variables that are set in the container.",
                    ).optional(),
                    image: z.string().describe(
                      "Required. Image is the container image to use.",
                    ).optional(),
                  }).describe(
                    "This task is represented by a container that is executed in the Cloud Build execution environment.",
                  ).optional(),
                })).describe(
                  "Optional. The tasks that will run as a part of the verify job. The tasks are executed sequentially in the order specified.",
                ).optional(),
              }).describe(
                "Verify contains the verify job configuration information.",
              ).optional(),
            }).describe(
              "CanaryDeployment represents the canary deployment configuration",
            ).optional(),
            customCanaryDeployment: z.object({
              phaseConfigs: z.array(z.object({
                analysis: z.object({
                  customChecks: z.array(z.object({
                    frequency: z.string().describe(
                      "Optional. The frequency at which the custom check will be run, with a minimum and default of 5 minutes.",
                    ).optional(),
                    id: z.string().describe(
                      "Required. The ID of the custom Analysis check.",
                    ).optional(),
                    task: z.object({
                      container: z.object({
                        args: z.array(z.string()).describe(
                          "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                        ).optional(),
                        command: z.array(z.string()).describe(
                          "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                        ).optional(),
                        env: z.record(z.string(), z.string()).describe(
                          "Optional. Environment variables that are set in the container.",
                        ).optional(),
                        image: z.string().describe(
                          "Required. Image is the container image to use.",
                        ).optional(),
                      }).describe(
                        "This task is represented by a container that is executed in the Cloud Build execution environment.",
                      ).optional(),
                    }).describe(
                      "A Task represents a unit of work that is executed as part of a Job.",
                    ).optional(),
                  })).describe(
                    "Optional. Custom analysis checks from 3P metric providers.",
                  ).optional(),
                  duration: z.string().describe(
                    "Required. The amount of time in minutes the analysis on the target will last. If all analysis checks have successfully completed before the specified duration, the analysis is successful. If a check is still running while the specified duration passes, it will wait for that check to complete to determine if the analysis is successful. The maximum duration is 48 hours.",
                  ).optional(),
                  googleCloud: z.object({
                    alertPolicyChecks: z.array(z.object({
                      alertPolicies: z.array(z.string()).describe(
                        "Required. The Cloud Monitoring Alert Policies to check for active alerts. Format is `projects/{project}/alertPolicies/{alert_policy}`.",
                      ).optional(),
                      id: z.string().describe(
                        "Required. The ID of the analysis check.",
                      ).optional(),
                      labels: z.record(z.string(), z.string()).describe(
                        "Optional. A set of labels to filter active alerts. If set, only alerts having all of the specified labels will be considered. Otherwise, all active alerts will be considered.",
                      ).optional(),
                    })).describe(
                      "Optional. A list of Cloud Monitoring Alert Policy checks to perform as part of the analysis.",
                    ).optional(),
                  }).describe(
                    "GoogleCloudAnalysis is a set of Google Cloud-based checks to perform on the deployment.",
                  ).optional(),
                }).describe(
                  "Analysis contains the configuration for the set of analyses to be performed on the target.",
                ).optional(),
                percentage: z.number().int().describe(
                  "Required. Percentage deployment for the phase.",
                ).optional(),
                phaseId: z.string().describe(
                  "Required. The ID to assign to the `Rollout` phase. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
                ).optional(),
                postdeploy: z.object({
                  actions: z.array(z.string()).describe(
                    "Optional. A sequence of Skaffold custom actions to invoke during execution of the postdeploy job.",
                  ).optional(),
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()).describe(
                        "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                      ).optional(),
                      command: z.array(z.string()).describe(
                        "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                      ).optional(),
                      env: z.record(z.string(), z.string()).describe(
                        "Optional. Environment variables that are set in the container.",
                      ).optional(),
                      image: z.string().describe(
                        "Required. Image is the container image to use.",
                      ).optional(),
                    }).describe(
                      "This task is represented by a container that is executed in the Cloud Build execution environment.",
                    ).optional(),
                  })).describe(
                    "Optional. The tasks that will run as a part of the postdeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
                  ).optional(),
                }).describe(
                  "Postdeploy contains the postdeploy job configuration information.",
                ).optional(),
                predeploy: z.object({
                  actions: z.array(z.string()).describe(
                    "Optional. A sequence of Skaffold custom actions to invoke during execution of the predeploy job.",
                  ).optional(),
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()).describe(
                        "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                      ).optional(),
                      command: z.array(z.string()).describe(
                        "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                      ).optional(),
                      env: z.record(z.string(), z.string()).describe(
                        "Optional. Environment variables that are set in the container.",
                      ).optional(),
                      image: z.string().describe(
                        "Required. Image is the container image to use.",
                      ).optional(),
                    }).describe(
                      "This task is represented by a container that is executed in the Cloud Build execution environment.",
                    ).optional(),
                  })).describe(
                    "Optional. The tasks that will run as a part of the predeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
                  ).optional(),
                }).describe(
                  "Predeploy contains the predeploy job configuration information.",
                ).optional(),
                profiles: z.array(z.string()).describe(
                  "Optional. Skaffold profiles to use when rendering the manifest for this phase. These are in addition to the profiles list specified in the `DeliveryPipeline` stage.",
                ).optional(),
                verify: z.boolean().describe(
                  "Optional. Whether to run verify tests after the deployment via `skaffold verify`.",
                ).optional(),
                verifyConfig: z.object({
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()).describe(
                        "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                      ).optional(),
                      command: z.array(z.string()).describe(
                        "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                      ).optional(),
                      env: z.record(z.string(), z.string()).describe(
                        "Optional. Environment variables that are set in the container.",
                      ).optional(),
                      image: z.string().describe(
                        "Required. Image is the container image to use.",
                      ).optional(),
                    }).describe(
                      "This task is represented by a container that is executed in the Cloud Build execution environment.",
                    ).optional(),
                  })).describe(
                    "Optional. The tasks that will run as a part of the verify job. The tasks are executed sequentially in the order specified.",
                  ).optional(),
                }).describe(
                  "Verify contains the verify job configuration information.",
                ).optional(),
              })).describe(
                "Required. Configuration for each phase in the canary deployment in the order executed.",
              ).optional(),
            }).describe(
              "CustomCanaryDeployment represents the custom canary deployment configuration.",
            ).optional(),
            runtimeConfig: z.object({
              cloudRun: z.object({
                automaticTrafficControl: z.boolean().describe(
                  "Optional. Whether Cloud Deploy should update the traffic stanza in a Cloud Run Service on the user's behalf to facilitate traffic splitting. This is required to be true for CanaryDeployments, but optional for CustomCanaryDeployments.",
                ).optional(),
                canaryRevisionTags: z.array(z.string()).describe(
                  "Optional. A list of tags that are added to the canary revision while the canary phase is in progress.",
                ).optional(),
                priorRevisionTags: z.array(z.string()).describe(
                  "Optional. A list of tags that are added to the prior revision while the canary phase is in progress.",
                ).optional(),
                stableRevisionTags: z.array(z.string()).describe(
                  "Optional. A list of tags that are added to the final stable revision when the stable phase is applied.",
                ).optional(),
              }).describe(
                "CloudRunConfig contains the Cloud Run runtime configuration.",
              ).optional(),
              kubernetes: z.object({
                gatewayServiceMesh: z.object({
                  deployment: z.string().describe(
                    "Required. Name of the Kubernetes Deployment whose traffic is managed by the specified HTTPRoute and Service.",
                  ).optional(),
                  httpRoute: z.string().describe(
                    "Required. Name of the Gateway API HTTPRoute.",
                  ).optional(),
                  podSelectorLabel: z.string().describe(
                    "Optional. The label to use when selecting Pods for the Deployment and Service resources. This label must already be present in both resources.",
                  ).optional(),
                  routeDestinations: z.object({
                    destinationIds: z.array(z.string()).describe(
                      'Required. The clusters where the Gateway API HTTPRoute resource will be deployed to. Valid entries include the associated entities IDs configured in the Target resource and "@self" to include the Target cluster.',
                    ).optional(),
                    propagateService: z.boolean().describe(
                      "Optional. Whether to propagate the Kubernetes Service to the route destination clusters. The Service will always be deployed to the Target cluster even if the HTTPRoute is not. This option may be used to facilitate successful DNS lookup in the route destination clusters. Can only be set to true if destinations are specified.",
                    ).optional(),
                  }).describe(
                    "Information about route destinations for the Gateway API service mesh.",
                  ).optional(),
                  routeUpdateWaitTime: z.string().describe(
                    "Optional. The time to wait for route updates to propagate. The maximum configurable time is 3 hours, in seconds format. If unspecified, there is no wait time.",
                  ).optional(),
                  service: z.string().describe(
                    "Required. Name of the Kubernetes Service.",
                  ).optional(),
                  stableCutbackDuration: z.string().describe(
                    "Optional. The amount of time to migrate traffic back from the canary Service to the original Service during the stable phase deployment. If specified, must be between 15s and 3600s. If unspecified, there is no cutback time.",
                  ).optional(),
                }).describe(
                  "Information about the Kubernetes Gateway API service mesh configuration.",
                ).optional(),
                serviceNetworking: z.object({
                  deployment: z.string().describe(
                    "Required. Name of the Kubernetes Deployment whose traffic is managed by the specified Service.",
                  ).optional(),
                  disablePodOverprovisioning: z.boolean().describe(
                    "Optional. Whether to disable Pod overprovisioning. If Pod overprovisioning is disabled then Cloud Deploy will limit the number of total Pods used for the deployment strategy to the number of Pods the Deployment has on the cluster.",
                  ).optional(),
                  podSelectorLabel: z.string().describe(
                    "Optional. The label to use when selecting Pods for the Deployment resource. This label must already be present in the Deployment.",
                  ).optional(),
                  service: z.string().describe(
                    "Required. Name of the Kubernetes Service.",
                  ).optional(),
                }).describe(
                  "Information about the Kubernetes Service networking configuration.",
                ).optional(),
              }).describe(
                "KubernetesConfig contains the Kubernetes runtime configuration.",
              ).optional(),
            }).describe(
              "RuntimeConfig contains the runtime specific configurations for a deployment strategy.",
            ).optional(),
          }).describe("Canary represents the canary deployment strategy.")
            .optional(),
          standard: z.object({
            analysis: z.object({
              customChecks: z.array(z.object({
                frequency: z.string().describe(
                  "Optional. The frequency at which the custom check will be run, with a minimum and default of 5 minutes.",
                ).optional(),
                id: z.string().describe(
                  "Required. The ID of the custom Analysis check.",
                ).optional(),
                task: z.object({
                  container: z.object({
                    args: z.array(z.string()).describe(
                      "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                    ).optional(),
                    command: z.array(z.string()).describe(
                      "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                    ).optional(),
                    env: z.record(z.string(), z.string()).describe(
                      "Optional. Environment variables that are set in the container.",
                    ).optional(),
                    image: z.string().describe(
                      "Required. Image is the container image to use.",
                    ).optional(),
                  }).describe(
                    "This task is represented by a container that is executed in the Cloud Build execution environment.",
                  ).optional(),
                }).describe(
                  "A Task represents a unit of work that is executed as part of a Job.",
                ).optional(),
              })).describe(
                "Optional. Custom analysis checks from 3P metric providers.",
              ).optional(),
              duration: z.string().describe(
                "Required. The amount of time in minutes the analysis on the target will last. If all analysis checks have successfully completed before the specified duration, the analysis is successful. If a check is still running while the specified duration passes, it will wait for that check to complete to determine if the analysis is successful. The maximum duration is 48 hours.",
              ).optional(),
              googleCloud: z.object({
                alertPolicyChecks: z.array(z.object({
                  alertPolicies: z.array(z.string()).describe(
                    "Required. The Cloud Monitoring Alert Policies to check for active alerts. Format is `projects/{project}/alertPolicies/{alert_policy}`.",
                  ).optional(),
                  id: z.string().describe(
                    "Required. The ID of the analysis check.",
                  ).optional(),
                  labels: z.record(z.string(), z.string()).describe(
                    "Optional. A set of labels to filter active alerts. If set, only alerts having all of the specified labels will be considered. Otherwise, all active alerts will be considered.",
                  ).optional(),
                })).describe(
                  "Optional. A list of Cloud Monitoring Alert Policy checks to perform as part of the analysis.",
                ).optional(),
              }).describe(
                "GoogleCloudAnalysis is a set of Google Cloud-based checks to perform on the deployment.",
              ).optional(),
            }).describe(
              "Analysis contains the configuration for the set of analyses to be performed on the target.",
            ).optional(),
            postdeploy: z.object({
              actions: z.array(z.string()).describe(
                "Optional. A sequence of Skaffold custom actions to invoke during execution of the postdeploy job.",
              ).optional(),
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()).describe(
                    "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                  ).optional(),
                  command: z.array(z.string()).describe(
                    "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                  ).optional(),
                  env: z.record(z.string(), z.string()).describe(
                    "Optional. Environment variables that are set in the container.",
                  ).optional(),
                  image: z.string().describe(
                    "Required. Image is the container image to use.",
                  ).optional(),
                }).describe(
                  "This task is represented by a container that is executed in the Cloud Build execution environment.",
                ).optional(),
              })).describe(
                "Optional. The tasks that will run as a part of the postdeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
              ).optional(),
            }).describe(
              "Postdeploy contains the postdeploy job configuration information.",
            ).optional(),
            predeploy: z.object({
              actions: z.array(z.string()).describe(
                "Optional. A sequence of Skaffold custom actions to invoke during execution of the predeploy job.",
              ).optional(),
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()).describe(
                    "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                  ).optional(),
                  command: z.array(z.string()).describe(
                    "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                  ).optional(),
                  env: z.record(z.string(), z.string()).describe(
                    "Optional. Environment variables that are set in the container.",
                  ).optional(),
                  image: z.string().describe(
                    "Required. Image is the container image to use.",
                  ).optional(),
                }).describe(
                  "This task is represented by a container that is executed in the Cloud Build execution environment.",
                ).optional(),
              })).describe(
                "Optional. The tasks that will run as a part of the predeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
              ).optional(),
            }).describe(
              "Predeploy contains the predeploy job configuration information.",
            ).optional(),
            verify: z.boolean().describe(
              "Optional. Whether to verify a deployment via `skaffold verify`.",
            ).optional(),
            verifyConfig: z.object({
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()).describe(
                    "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                  ).optional(),
                  command: z.array(z.string()).describe(
                    "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                  ).optional(),
                  env: z.record(z.string(), z.string()).describe(
                    "Optional. Environment variables that are set in the container.",
                  ).optional(),
                  image: z.string().describe(
                    "Required. Image is the container image to use.",
                  ).optional(),
                }).describe(
                  "This task is represented by a container that is executed in the Cloud Build execution environment.",
                ).optional(),
              })).describe(
                "Optional. The tasks that will run as a part of the verify job. The tasks are executed sequentially in the order specified.",
              ).optional(),
            }).describe(
              "Verify contains the verify job configuration information.",
            ).optional(),
          }).describe("Standard represents the standard deployment strategy.")
            .optional(),
        }).describe("Strategy contains deployment strategy information.")
          .optional(),
        targetId: z.string().describe(
          "Optional. The target_id to which this stage points. This field refers exclusively to the last segment of a target name. For example, this field would just be `my-target` (rather than `projects/project/locations/location/targets/my-target`). The location of the `Target` is inferred to be the same as the location of the `DeliveryPipeline` that contains this `Stage`.",
        ).optional(),
      })).describe(
        "Optional. Each stage specifies configuration for a `Target`. The ordering of this list defines the promotion flow.",
      ).optional(),
    }).describe(
      "SerialPipeline defines a sequential set of stages for a `DeliveryPipeline`.",
    ).optional(),
    suspended: z.boolean().describe(
      "Optional. When suspended, no new releases or rollouts can be created, but in-progress ones will complete.",
    ).optional(),
    uid: z.string().describe(
      "Output only. Unique identifier of the `DeliveryPipeline`.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Most recent time at which the pipeline was updated.",
    ).optional(),
  }).describe(
    "A `DeliveryPipeline` resource in the Cloud Deploy API. A `DeliveryPipeline` defines a pipeline through which a Skaffold configuration can progress.",
  ).optional(),
  deployParameters: z.record(z.string(), z.string()).describe(
    "Optional. The deploy parameters to use for all targets in this release.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `Release`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `Release`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}`. The `release` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  skaffoldConfigPath: z.string().describe(
    "Optional. Filepath of the Skaffold config inside of the config URI.",
  ).optional(),
  skaffoldConfigUri: z.string().describe(
    "Optional. Cloud Storage URI of tar.gz archive containing Skaffold configuration.",
  ).optional(),
  skaffoldVersion: z.string().describe(
    'Optional. The Skaffold version to use when operating on this release, such as "1.20.0". Not all versions are valid; Cloud Deploy supports a specific set of versions. If unset, the most recent supported Skaffold version will be used.',
  ).optional(),
  toolVersions: z.object({
    docker: z.string().describe(
      "Optional. The Docker version to use for Cloud Deploy operations.",
    ).optional(),
    helm: z.string().describe(
      "Optional. The Helm version to use for Cloud Deploy operations.",
    ).optional(),
    kpt: z.string().describe(
      "Optional. The kpt version to use for Cloud Deploy operations.",
    ).optional(),
    kubectl: z.string().describe(
      "Optional. The Kubectl version to use for Cloud Deploy operations.",
    ).optional(),
    kustomize: z.string().describe(
      "Optional. The Kustomize version to use for Cloud Deploy operations.",
    ).optional(),
    skaffold: z.string().describe(
      "Optional. The Skaffold version to use for Cloud Deploy operations.",
    ).optional(),
  }).describe("Details of ToolVersions for the release.").optional(),
  overrideDeployPolicy: z.string().describe(
    "Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`.",
  ).optional(),
  releaseId: z.string().describe("Required. ID of the `Release`.").optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  abandoned: z.boolean().optional(),
  annotations: z.record(z.string(), z.unknown()).optional(),
  buildArtifacts: z.array(z.object({
    image: z.string(),
    tag: z.string(),
  })).optional(),
  condition: z.object({
    dockerVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    helmVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    kptVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    kubectlVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    kustomizeVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
    releaseReadyCondition: z.object({
      status: z.boolean(),
    }),
    skaffoldSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      skaffoldSupportState: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
    }),
    skaffoldVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string(),
      status: z.boolean(),
      supportExpirationTime: z.string(),
      toolVersionSupportState: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  customTargetTypeSnapshots: z.array(z.object({
    annotations: z.record(z.string(), z.unknown()),
    createTime: z.string(),
    customActions: z.object({
      deployAction: z.string(),
      includeSkaffoldModules: z.array(z.object({
        configs: z.array(z.string()),
        git: z.object({
          path: z.string(),
          ref: z.string(),
          repo: z.string(),
        }),
        googleCloudBuildRepo: z.object({
          path: z.string(),
          ref: z.string(),
          repository: z.string(),
        }),
        googleCloudStorage: z.object({
          path: z.string(),
          source: z.string(),
        }),
      })),
      renderAction: z.string(),
    }),
    customTargetTypeId: z.string(),
    description: z.string(),
    etag: z.string(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    tasks: z.object({
      deploy: z.object({
        container: z.object({
          args: z.array(z.string()),
          command: z.array(z.string()),
          env: z.record(z.string(), z.unknown()),
          image: z.string(),
        }),
      }),
      render: z.object({
        container: z.object({
          args: z.array(z.string()),
          command: z.array(z.string()),
          env: z.record(z.string(), z.unknown()),
          image: z.string(),
        }),
      }),
    }),
    uid: z.string(),
    updateTime: z.string(),
  })).optional(),
  deliveryPipelineSnapshot: z.object({
    annotations: z.record(z.string(), z.unknown()),
    condition: z.object({
      pipelineReadyCondition: z.object({
        status: z.boolean(),
        updateTime: z.string(),
      }),
      targetsPresentCondition: z.object({
        missingTargets: z.array(z.string()),
        status: z.boolean(),
        updateTime: z.string(),
      }),
      targetsTypeCondition: z.object({
        errorDetails: z.string(),
        status: z.boolean(),
      }),
    }),
    createTime: z.string(),
    description: z.string(),
    etag: z.string(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    serialPipeline: z.object({
      stages: z.array(z.object({
        deployParameters: z.array(z.object({
          matchTargetLabels: z.record(z.string(), z.unknown()),
          values: z.record(z.string(), z.unknown()),
        })),
        profiles: z.array(z.string()),
        strategy: z.object({
          canary: z.object({
            canaryDeployment: z.object({
              analysis: z.object({
                customChecks: z.array(z.object({
                  frequency: z.string(),
                  id: z.string(),
                  task: z.object({
                    container: z.object({
                      args: z.array(z.string()),
                      command: z.array(z.string()),
                      env: z.record(z.string(), z.unknown()),
                      image: z.string(),
                    }),
                  }),
                })),
                duration: z.string(),
                googleCloud: z.object({
                  alertPolicyChecks: z.array(z.object({
                    alertPolicies: z.array(z.string()),
                    id: z.string(),
                    labels: z.record(z.string(), z.unknown()),
                  })),
                }),
              }),
              percentages: z.array(z.number()),
              postdeploy: z.object({
                actions: z.array(z.string()),
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()),
                    command: z.array(z.string()),
                    env: z.record(z.string(), z.unknown()),
                    image: z.string(),
                  }),
                })),
              }),
              predeploy: z.object({
                actions: z.array(z.string()),
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()),
                    command: z.array(z.string()),
                    env: z.record(z.string(), z.unknown()),
                    image: z.string(),
                  }),
                })),
              }),
              verify: z.boolean(),
              verifyConfig: z.object({
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()),
                    command: z.array(z.string()),
                    env: z.record(z.string(), z.unknown()),
                    image: z.string(),
                  }),
                })),
              }),
            }),
            customCanaryDeployment: z.object({
              phaseConfigs: z.array(z.object({
                analysis: z.object({
                  customChecks: z.array(z.object({
                    frequency: z.string(),
                    id: z.string(),
                    task: z.object({
                      container: z.object({
                        args: z.array(z.string()),
                        command: z.array(z.string()),
                        env: z.record(z.string(), z.unknown()),
                        image: z.string(),
                      }),
                    }),
                  })),
                  duration: z.string(),
                  googleCloud: z.object({
                    alertPolicyChecks: z.array(z.object({
                      alertPolicies: z.array(z.string()),
                      id: z.string(),
                      labels: z.record(z.string(), z.unknown()),
                    })),
                  }),
                }),
                percentage: z.number(),
                phaseId: z.string(),
                postdeploy: z.object({
                  actions: z.array(z.string()),
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()),
                      command: z.array(z.string()),
                      env: z.record(z.string(), z.unknown()),
                      image: z.string(),
                    }),
                  })),
                }),
                predeploy: z.object({
                  actions: z.array(z.string()),
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()),
                      command: z.array(z.string()),
                      env: z.record(z.string(), z.unknown()),
                      image: z.string(),
                    }),
                  })),
                }),
                profiles: z.array(z.string()),
                verify: z.boolean(),
                verifyConfig: z.object({
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()),
                      command: z.array(z.string()),
                      env: z.record(z.string(), z.unknown()),
                      image: z.string(),
                    }),
                  })),
                }),
              })),
            }),
            runtimeConfig: z.object({
              cloudRun: z.object({
                automaticTrafficControl: z.boolean(),
                canaryRevisionTags: z.array(z.string()),
                priorRevisionTags: z.array(z.string()),
                stableRevisionTags: z.array(z.string()),
              }),
              kubernetes: z.object({
                gatewayServiceMesh: z.object({
                  deployment: z.string(),
                  httpRoute: z.string(),
                  podSelectorLabel: z.string(),
                  routeDestinations: z.object({
                    destinationIds: z.array(z.string()),
                    propagateService: z.boolean(),
                  }),
                  routeUpdateWaitTime: z.string(),
                  service: z.string(),
                  stableCutbackDuration: z.string(),
                }),
                serviceNetworking: z.object({
                  deployment: z.string(),
                  disablePodOverprovisioning: z.boolean(),
                  podSelectorLabel: z.string(),
                  service: z.string(),
                }),
              }),
            }),
          }),
          standard: z.object({
            analysis: z.object({
              customChecks: z.array(z.object({
                frequency: z.string(),
                id: z.string(),
                task: z.object({
                  container: z.object({
                    args: z.array(z.string()),
                    command: z.array(z.string()),
                    env: z.record(z.string(), z.unknown()),
                    image: z.string(),
                  }),
                }),
              })),
              duration: z.string(),
              googleCloud: z.object({
                alertPolicyChecks: z.array(z.object({
                  alertPolicies: z.array(z.string()),
                  id: z.string(),
                  labels: z.record(z.string(), z.unknown()),
                })),
              }),
            }),
            postdeploy: z.object({
              actions: z.array(z.string()),
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()),
                  command: z.array(z.string()),
                  env: z.record(z.string(), z.unknown()),
                  image: z.string(),
                }),
              })),
            }),
            predeploy: z.object({
              actions: z.array(z.string()),
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()),
                  command: z.array(z.string()),
                  env: z.record(z.string(), z.unknown()),
                  image: z.string(),
                }),
              })),
            }),
            verify: z.boolean(),
            verifyConfig: z.object({
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()),
                  command: z.array(z.string()),
                  env: z.record(z.string(), z.unknown()),
                  image: z.string(),
                }),
              })),
            }),
          }),
        }),
        targetId: z.string(),
      })),
    }),
    suspended: z.boolean(),
    uid: z.string(),
    updateTime: z.string(),
  }).optional(),
  deployParameters: z.record(z.string(), z.unknown()).optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  renderEndTime: z.string().optional(),
  renderStartTime: z.string().optional(),
  renderState: z.string().optional(),
  skaffoldConfigPath: z.string().optional(),
  skaffoldConfigUri: z.string().optional(),
  skaffoldVersion: z.string().optional(),
  targetArtifacts: z.record(z.string(), z.unknown()).optional(),
  targetRenders: z.record(z.string(), z.unknown()).optional(),
  targetSnapshots: z.array(z.object({
    annotations: z.record(z.string(), z.unknown()),
    anthosCluster: z.object({
      membership: z.string(),
    }),
    associatedEntities: z.record(z.string(), z.unknown()),
    createTime: z.string(),
    customTarget: z.object({
      customTargetType: z.string(),
    }),
    deployParameters: z.record(z.string(), z.unknown()),
    description: z.string(),
    etag: z.string(),
    executionConfigs: z.array(z.object({
      artifactStorage: z.string(),
      defaultPool: z.object({
        artifactStorage: z.string(),
        serviceAccount: z.string(),
      }),
      executionTimeout: z.string(),
      privatePool: z.object({
        artifactStorage: z.string(),
        serviceAccount: z.string(),
        workerPool: z.string(),
      }),
      serviceAccount: z.string(),
      usages: z.array(z.string()),
      verbose: z.boolean(),
      workerPool: z.string(),
    })),
    gke: z.object({
      cluster: z.string(),
      dnsEndpoint: z.boolean(),
      internalIp: z.boolean(),
      proxyUrl: z.string(),
    }),
    labels: z.record(z.string(), z.unknown()),
    multiTarget: z.object({
      targetIds: z.array(z.string()),
    }),
    name: z.string(),
    requireApproval: z.boolean(),
    run: z.object({
      location: z.string(),
    }),
    targetId: z.string(),
    uid: z.string(),
    updateTime: z.string(),
  })).optional(),
  toolVersions: z.object({
    docker: z.string(),
    helm: z.string(),
    kpt: z.string(),
    kubectl: z.string(),
    kustomize: z.string(),
    skaffold: z.string(),
  }).optional(),
  uid: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  buildArtifacts: z.array(z.object({
    image: z.string().describe(
      "Optional. Image name in Skaffold configuration.",
    ).optional(),
    tag: z.string().describe(
      'Optional. Image tag to use. This will generally be the full path to an image, such as "gcr.io/my-project/busybox:1.2.3" or "gcr.io/my-project/busybox@sha256:abc123".',
    ).optional(),
  })).describe(
    "Optional. List of artifacts to pass through to Skaffold command.",
  ).optional(),
  condition: z.object({
    dockerVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    helmVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    kptVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    kubectlVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    kustomizeVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
    releaseReadyCondition: z.object({
      status: z.boolean().describe(
        "True if the Release is in a valid state. Otherwise at least one condition in `ReleaseCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Release.",
      ).optional(),
    }).describe(
      "ReleaseReadyCondition contains information around the status of the Release. If a release is not ready, you cannot create a rollout with the release.",
    ).optional(),
    skaffoldSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "The time at which this release's version of Skaffold will enter maintenance mode.",
      ).optional(),
      skaffoldSupportState: z.enum([
        "SKAFFOLD_SUPPORT_STATE_UNSPECIFIED",
        "SKAFFOLD_SUPPORT_STATE_SUPPORTED",
        "SKAFFOLD_SUPPORT_STATE_MAINTENANCE_MODE",
        "SKAFFOLD_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "The Skaffold support state for this release's version of Skaffold.",
      ).optional(),
      status: z.boolean().describe(
        "True if the version of Skaffold used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "The time at which this release's version of Skaffold will no longer be supported.",
      ).optional(),
    }).describe(
      "SkaffoldSupportedCondition contains information about when support for the release's version of Skaffold ends.",
    ).optional(),
    skaffoldVersionSupportedCondition: z.object({
      maintenanceModeTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will enter maintenance mode.",
      ).optional(),
      status: z.boolean().describe(
        "Output only. True if the version of Tool used by this release is supported.",
      ).optional(),
      supportExpirationTime: z.string().describe(
        "Output only. The time at which this release's version of the tool will no longer be supported.",
      ).optional(),
      toolVersionSupportState: z.enum([
        "TOOL_VERSION_SUPPORT_STATE_UNSPECIFIED",
        "TOOL_VERSION_SUPPORT_STATE_SUPPORTED",
        "TOOL_VERSION_SUPPORT_STATE_MAINTENANCE_MODE",
        "TOOL_VERSION_SUPPORT_STATE_UNSUPPORTED",
      ]).describe(
        "Output only. The tool support state for this release's version of the tool.",
      ).optional(),
    }).describe(
      "ToolVersionSupportedCondition contains information about when support for the release's version of a tool ends.",
    ).optional(),
  }).describe("ReleaseCondition contains all conditions relevant to a Release.")
    .optional(),
  deliveryPipelineSnapshot: z.object({
    annotations: z.record(z.string(), z.string()).describe(
      "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy.",
    ).optional(),
    condition: z.object({
      pipelineReadyCondition: z.object({
        status: z.boolean().describe(
          "True if the Pipeline is in a valid state. Otherwise at least one condition in `PipelineCondition` is in an invalid state. Iterate over those conditions and see which condition(s) has status = false to find out what is wrong with the Pipeline.",
        ).optional(),
        updateTime: z.string().describe("Last time the condition was updated.")
          .optional(),
      }).describe(
        "PipelineReadyCondition contains information around the status of the Pipeline.",
      ).optional(),
      targetsPresentCondition: z.object({
        missingTargets: z.array(z.string()).describe(
          "The list of Target names that do not exist. For example, `projects/{project_id}/locations/{location_name}/targets/{target_name}`.",
        ).optional(),
        status: z.boolean().describe(
          "True if there aren't any missing Targets.",
        ).optional(),
        updateTime: z.string().describe("Last time the condition was updated.")
          .optional(),
      }).describe(
        "`TargetsPresentCondition` contains information on any Targets referenced in the Delivery Pipeline that do not actually exist.",
      ).optional(),
      targetsTypeCondition: z.object({
        errorDetails: z.string().describe("Human readable error message.")
          .optional(),
        status: z.boolean().describe(
          "True if the targets are all a comparable type. For example this is true if all targets are GKE clusters. This is false if some targets are Cloud Run targets and others are GKE clusters.",
        ).optional(),
      }).describe(
        "TargetsTypeCondition contains information on whether the Targets defined in the Delivery Pipeline are of the same type.",
      ).optional(),
    }).describe(
      "PipelineCondition contains all conditions relevant to a Delivery Pipeline.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Time at which the pipeline was created.",
    ).optional(),
    description: z.string().describe(
      "Optional. Description of the `DeliveryPipeline`. Max length is 255 characters.",
    ).optional(),
    etag: z.string().describe(
      "This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
    ).optional(),
    name: z.string().describe(
      "Identifier. Name of the `DeliveryPipeline`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}`. The `deliveryPipeline` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
    ).optional(),
    serialPipeline: z.object({
      stages: z.array(z.object({
        deployParameters: z.array(z.object({
          matchTargetLabels: z.record(z.string(), z.string()).describe(
            "Optional. Deploy parameters are applied to targets with match labels. If unspecified, deploy parameters are applied to all targets (including child targets of a multi-target).",
          ).optional(),
          values: z.record(z.string(), z.string()).describe(
            "Required. Values are deploy parameters in key-value pairs.",
          ).optional(),
        })).describe(
          "Optional. The deploy parameters to use for the target in this stage.",
        ).optional(),
        profiles: z.array(z.string()).describe(
          "Optional. Skaffold profiles to use when rendering the manifest for this stage's `Target`.",
        ).optional(),
        strategy: z.object({
          canary: z.object({
            canaryDeployment: z.object({
              analysis: z.object({
                customChecks: z.array(z.object({
                  frequency: z.string().describe(
                    "Optional. The frequency at which the custom check will be run, with a minimum and default of 5 minutes.",
                  ).optional(),
                  id: z.string().describe(
                    "Required. The ID of the custom Analysis check.",
                  ).optional(),
                  task: z.object({
                    container: z.object({
                      args: z.array(z.string()).describe(
                        "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                      ).optional(),
                      command: z.array(z.string()).describe(
                        "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                      ).optional(),
                      env: z.record(z.string(), z.string()).describe(
                        "Optional. Environment variables that are set in the container.",
                      ).optional(),
                      image: z.string().describe(
                        "Required. Image is the container image to use.",
                      ).optional(),
                    }).describe(
                      "This task is represented by a container that is executed in the Cloud Build execution environment.",
                    ).optional(),
                  }).describe(
                    "A Task represents a unit of work that is executed as part of a Job.",
                  ).optional(),
                })).describe(
                  "Optional. Custom analysis checks from 3P metric providers.",
                ).optional(),
                duration: z.string().describe(
                  "Required. The amount of time in minutes the analysis on the target will last. If all analysis checks have successfully completed before the specified duration, the analysis is successful. If a check is still running while the specified duration passes, it will wait for that check to complete to determine if the analysis is successful. The maximum duration is 48 hours.",
                ).optional(),
                googleCloud: z.object({
                  alertPolicyChecks: z.array(z.object({
                    alertPolicies: z.array(z.string()).describe(
                      "Required. The Cloud Monitoring Alert Policies to check for active alerts. Format is `projects/{project}/alertPolicies/{alert_policy}`.",
                    ).optional(),
                    id: z.string().describe(
                      "Required. The ID of the analysis check.",
                    ).optional(),
                    labels: z.record(z.string(), z.string()).describe(
                      "Optional. A set of labels to filter active alerts. If set, only alerts having all of the specified labels will be considered. Otherwise, all active alerts will be considered.",
                    ).optional(),
                  })).describe(
                    "Optional. A list of Cloud Monitoring Alert Policy checks to perform as part of the analysis.",
                  ).optional(),
                }).describe(
                  "GoogleCloudAnalysis is a set of Google Cloud-based checks to perform on the deployment.",
                ).optional(),
              }).describe(
                "Analysis contains the configuration for the set of analyses to be performed on the target.",
              ).optional(),
              percentages: z.array(z.number().int()).describe(
                "Required. The percentage based deployments that will occur as a part of a `Rollout`. List is expected in ascending order and each integer n is 0 <= n < 100. If the GatewayServiceMesh is configured for Kubernetes, then the range for n is 0 <= n <= 100.",
              ).optional(),
              postdeploy: z.object({
                actions: z.array(z.string()).describe(
                  "Optional. A sequence of Skaffold custom actions to invoke during execution of the postdeploy job.",
                ).optional(),
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()).describe(
                      "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                    ).optional(),
                    command: z.array(z.string()).describe(
                      "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                    ).optional(),
                    env: z.record(z.string(), z.string()).describe(
                      "Optional. Environment variables that are set in the container.",
                    ).optional(),
                    image: z.string().describe(
                      "Required. Image is the container image to use.",
                    ).optional(),
                  }).describe(
                    "This task is represented by a container that is executed in the Cloud Build execution environment.",
                  ).optional(),
                })).describe(
                  "Optional. The tasks that will run as a part of the postdeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
                ).optional(),
              }).describe(
                "Postdeploy contains the postdeploy job configuration information.",
              ).optional(),
              predeploy: z.object({
                actions: z.array(z.string()).describe(
                  "Optional. A sequence of Skaffold custom actions to invoke during execution of the predeploy job.",
                ).optional(),
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()).describe(
                      "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                    ).optional(),
                    command: z.array(z.string()).describe(
                      "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                    ).optional(),
                    env: z.record(z.string(), z.string()).describe(
                      "Optional. Environment variables that are set in the container.",
                    ).optional(),
                    image: z.string().describe(
                      "Required. Image is the container image to use.",
                    ).optional(),
                  }).describe(
                    "This task is represented by a container that is executed in the Cloud Build execution environment.",
                  ).optional(),
                })).describe(
                  "Optional. The tasks that will run as a part of the predeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
                ).optional(),
              }).describe(
                "Predeploy contains the predeploy job configuration information.",
              ).optional(),
              verify: z.boolean().describe(
                "Optional. Whether to run verify tests after each percentage deployment via `skaffold verify`.",
              ).optional(),
              verifyConfig: z.object({
                tasks: z.array(z.object({
                  container: z.object({
                    args: z.array(z.string()).describe(
                      "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                    ).optional(),
                    command: z.array(z.string()).describe(
                      "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                    ).optional(),
                    env: z.record(z.string(), z.string()).describe(
                      "Optional. Environment variables that are set in the container.",
                    ).optional(),
                    image: z.string().describe(
                      "Required. Image is the container image to use.",
                    ).optional(),
                  }).describe(
                    "This task is represented by a container that is executed in the Cloud Build execution environment.",
                  ).optional(),
                })).describe(
                  "Optional. The tasks that will run as a part of the verify job. The tasks are executed sequentially in the order specified.",
                ).optional(),
              }).describe(
                "Verify contains the verify job configuration information.",
              ).optional(),
            }).describe(
              "CanaryDeployment represents the canary deployment configuration",
            ).optional(),
            customCanaryDeployment: z.object({
              phaseConfigs: z.array(z.object({
                analysis: z.object({
                  customChecks: z.array(z.object({
                    frequency: z.string().describe(
                      "Optional. The frequency at which the custom check will be run, with a minimum and default of 5 minutes.",
                    ).optional(),
                    id: z.string().describe(
                      "Required. The ID of the custom Analysis check.",
                    ).optional(),
                    task: z.object({
                      container: z.object({
                        args: z.array(z.string()).describe(
                          "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                        ).optional(),
                        command: z.array(z.string()).describe(
                          "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                        ).optional(),
                        env: z.record(z.string(), z.string()).describe(
                          "Optional. Environment variables that are set in the container.",
                        ).optional(),
                        image: z.string().describe(
                          "Required. Image is the container image to use.",
                        ).optional(),
                      }).describe(
                        "This task is represented by a container that is executed in the Cloud Build execution environment.",
                      ).optional(),
                    }).describe(
                      "A Task represents a unit of work that is executed as part of a Job.",
                    ).optional(),
                  })).describe(
                    "Optional. Custom analysis checks from 3P metric providers.",
                  ).optional(),
                  duration: z.string().describe(
                    "Required. The amount of time in minutes the analysis on the target will last. If all analysis checks have successfully completed before the specified duration, the analysis is successful. If a check is still running while the specified duration passes, it will wait for that check to complete to determine if the analysis is successful. The maximum duration is 48 hours.",
                  ).optional(),
                  googleCloud: z.object({
                    alertPolicyChecks: z.array(z.object({
                      alertPolicies: z.array(z.string()).describe(
                        "Required. The Cloud Monitoring Alert Policies to check for active alerts. Format is `projects/{project}/alertPolicies/{alert_policy}`.",
                      ).optional(),
                      id: z.string().describe(
                        "Required. The ID of the analysis check.",
                      ).optional(),
                      labels: z.record(z.string(), z.string()).describe(
                        "Optional. A set of labels to filter active alerts. If set, only alerts having all of the specified labels will be considered. Otherwise, all active alerts will be considered.",
                      ).optional(),
                    })).describe(
                      "Optional. A list of Cloud Monitoring Alert Policy checks to perform as part of the analysis.",
                    ).optional(),
                  }).describe(
                    "GoogleCloudAnalysis is a set of Google Cloud-based checks to perform on the deployment.",
                  ).optional(),
                }).describe(
                  "Analysis contains the configuration for the set of analyses to be performed on the target.",
                ).optional(),
                percentage: z.number().int().describe(
                  "Required. Percentage deployment for the phase.",
                ).optional(),
                phaseId: z.string().describe(
                  "Required. The ID to assign to the `Rollout` phase. This value must consist of lower-case letters, numbers, and hyphens, start with a letter and end with a letter or a number, and have a max length of 63 characters. In other words, it must match the following regex: `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
                ).optional(),
                postdeploy: z.object({
                  actions: z.array(z.string()).describe(
                    "Optional. A sequence of Skaffold custom actions to invoke during execution of the postdeploy job.",
                  ).optional(),
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()).describe(
                        "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                      ).optional(),
                      command: z.array(z.string()).describe(
                        "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                      ).optional(),
                      env: z.record(z.string(), z.string()).describe(
                        "Optional. Environment variables that are set in the container.",
                      ).optional(),
                      image: z.string().describe(
                        "Required. Image is the container image to use.",
                      ).optional(),
                    }).describe(
                      "This task is represented by a container that is executed in the Cloud Build execution environment.",
                    ).optional(),
                  })).describe(
                    "Optional. The tasks that will run as a part of the postdeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
                  ).optional(),
                }).describe(
                  "Postdeploy contains the postdeploy job configuration information.",
                ).optional(),
                predeploy: z.object({
                  actions: z.array(z.string()).describe(
                    "Optional. A sequence of Skaffold custom actions to invoke during execution of the predeploy job.",
                  ).optional(),
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()).describe(
                        "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                      ).optional(),
                      command: z.array(z.string()).describe(
                        "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                      ).optional(),
                      env: z.record(z.string(), z.string()).describe(
                        "Optional. Environment variables that are set in the container.",
                      ).optional(),
                      image: z.string().describe(
                        "Required. Image is the container image to use.",
                      ).optional(),
                    }).describe(
                      "This task is represented by a container that is executed in the Cloud Build execution environment.",
                    ).optional(),
                  })).describe(
                    "Optional. The tasks that will run as a part of the predeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
                  ).optional(),
                }).describe(
                  "Predeploy contains the predeploy job configuration information.",
                ).optional(),
                profiles: z.array(z.string()).describe(
                  "Optional. Skaffold profiles to use when rendering the manifest for this phase. These are in addition to the profiles list specified in the `DeliveryPipeline` stage.",
                ).optional(),
                verify: z.boolean().describe(
                  "Optional. Whether to run verify tests after the deployment via `skaffold verify`.",
                ).optional(),
                verifyConfig: z.object({
                  tasks: z.array(z.object({
                    container: z.object({
                      args: z.array(z.string()).describe(
                        "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                      ).optional(),
                      command: z.array(z.string()).describe(
                        "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                      ).optional(),
                      env: z.record(z.string(), z.string()).describe(
                        "Optional. Environment variables that are set in the container.",
                      ).optional(),
                      image: z.string().describe(
                        "Required. Image is the container image to use.",
                      ).optional(),
                    }).describe(
                      "This task is represented by a container that is executed in the Cloud Build execution environment.",
                    ).optional(),
                  })).describe(
                    "Optional. The tasks that will run as a part of the verify job. The tasks are executed sequentially in the order specified.",
                  ).optional(),
                }).describe(
                  "Verify contains the verify job configuration information.",
                ).optional(),
              })).describe(
                "Required. Configuration for each phase in the canary deployment in the order executed.",
              ).optional(),
            }).describe(
              "CustomCanaryDeployment represents the custom canary deployment configuration.",
            ).optional(),
            runtimeConfig: z.object({
              cloudRun: z.object({
                automaticTrafficControl: z.boolean().describe(
                  "Optional. Whether Cloud Deploy should update the traffic stanza in a Cloud Run Service on the user's behalf to facilitate traffic splitting. This is required to be true for CanaryDeployments, but optional for CustomCanaryDeployments.",
                ).optional(),
                canaryRevisionTags: z.array(z.string()).describe(
                  "Optional. A list of tags that are added to the canary revision while the canary phase is in progress.",
                ).optional(),
                priorRevisionTags: z.array(z.string()).describe(
                  "Optional. A list of tags that are added to the prior revision while the canary phase is in progress.",
                ).optional(),
                stableRevisionTags: z.array(z.string()).describe(
                  "Optional. A list of tags that are added to the final stable revision when the stable phase is applied.",
                ).optional(),
              }).describe(
                "CloudRunConfig contains the Cloud Run runtime configuration.",
              ).optional(),
              kubernetes: z.object({
                gatewayServiceMesh: z.object({
                  deployment: z.string().describe(
                    "Required. Name of the Kubernetes Deployment whose traffic is managed by the specified HTTPRoute and Service.",
                  ).optional(),
                  httpRoute: z.string().describe(
                    "Required. Name of the Gateway API HTTPRoute.",
                  ).optional(),
                  podSelectorLabel: z.string().describe(
                    "Optional. The label to use when selecting Pods for the Deployment and Service resources. This label must already be present in both resources.",
                  ).optional(),
                  routeDestinations: z.object({
                    destinationIds: z.array(z.string()).describe(
                      'Required. The clusters where the Gateway API HTTPRoute resource will be deployed to. Valid entries include the associated entities IDs configured in the Target resource and "@self" to include the Target cluster.',
                    ).optional(),
                    propagateService: z.boolean().describe(
                      "Optional. Whether to propagate the Kubernetes Service to the route destination clusters. The Service will always be deployed to the Target cluster even if the HTTPRoute is not. This option may be used to facilitate successful DNS lookup in the route destination clusters. Can only be set to true if destinations are specified.",
                    ).optional(),
                  }).describe(
                    "Information about route destinations for the Gateway API service mesh.",
                  ).optional(),
                  routeUpdateWaitTime: z.string().describe(
                    "Optional. The time to wait for route updates to propagate. The maximum configurable time is 3 hours, in seconds format. If unspecified, there is no wait time.",
                  ).optional(),
                  service: z.string().describe(
                    "Required. Name of the Kubernetes Service.",
                  ).optional(),
                  stableCutbackDuration: z.string().describe(
                    "Optional. The amount of time to migrate traffic back from the canary Service to the original Service during the stable phase deployment. If specified, must be between 15s and 3600s. If unspecified, there is no cutback time.",
                  ).optional(),
                }).describe(
                  "Information about the Kubernetes Gateway API service mesh configuration.",
                ).optional(),
                serviceNetworking: z.object({
                  deployment: z.string().describe(
                    "Required. Name of the Kubernetes Deployment whose traffic is managed by the specified Service.",
                  ).optional(),
                  disablePodOverprovisioning: z.boolean().describe(
                    "Optional. Whether to disable Pod overprovisioning. If Pod overprovisioning is disabled then Cloud Deploy will limit the number of total Pods used for the deployment strategy to the number of Pods the Deployment has on the cluster.",
                  ).optional(),
                  podSelectorLabel: z.string().describe(
                    "Optional. The label to use when selecting Pods for the Deployment resource. This label must already be present in the Deployment.",
                  ).optional(),
                  service: z.string().describe(
                    "Required. Name of the Kubernetes Service.",
                  ).optional(),
                }).describe(
                  "Information about the Kubernetes Service networking configuration.",
                ).optional(),
              }).describe(
                "KubernetesConfig contains the Kubernetes runtime configuration.",
              ).optional(),
            }).describe(
              "RuntimeConfig contains the runtime specific configurations for a deployment strategy.",
            ).optional(),
          }).describe("Canary represents the canary deployment strategy.")
            .optional(),
          standard: z.object({
            analysis: z.object({
              customChecks: z.array(z.object({
                frequency: z.string().describe(
                  "Optional. The frequency at which the custom check will be run, with a minimum and default of 5 minutes.",
                ).optional(),
                id: z.string().describe(
                  "Required. The ID of the custom Analysis check.",
                ).optional(),
                task: z.object({
                  container: z.object({
                    args: z.array(z.string()).describe(
                      "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                    ).optional(),
                    command: z.array(z.string()).describe(
                      "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                    ).optional(),
                    env: z.record(z.string(), z.string()).describe(
                      "Optional. Environment variables that are set in the container.",
                    ).optional(),
                    image: z.string().describe(
                      "Required. Image is the container image to use.",
                    ).optional(),
                  }).describe(
                    "This task is represented by a container that is executed in the Cloud Build execution environment.",
                  ).optional(),
                }).describe(
                  "A Task represents a unit of work that is executed as part of a Job.",
                ).optional(),
              })).describe(
                "Optional. Custom analysis checks from 3P metric providers.",
              ).optional(),
              duration: z.string().describe(
                "Required. The amount of time in minutes the analysis on the target will last. If all analysis checks have successfully completed before the specified duration, the analysis is successful. If a check is still running while the specified duration passes, it will wait for that check to complete to determine if the analysis is successful. The maximum duration is 48 hours.",
              ).optional(),
              googleCloud: z.object({
                alertPolicyChecks: z.array(z.object({
                  alertPolicies: z.array(z.string()).describe(
                    "Required. The Cloud Monitoring Alert Policies to check for active alerts. Format is `projects/{project}/alertPolicies/{alert_policy}`.",
                  ).optional(),
                  id: z.string().describe(
                    "Required. The ID of the analysis check.",
                  ).optional(),
                  labels: z.record(z.string(), z.string()).describe(
                    "Optional. A set of labels to filter active alerts. If set, only alerts having all of the specified labels will be considered. Otherwise, all active alerts will be considered.",
                  ).optional(),
                })).describe(
                  "Optional. A list of Cloud Monitoring Alert Policy checks to perform as part of the analysis.",
                ).optional(),
              }).describe(
                "GoogleCloudAnalysis is a set of Google Cloud-based checks to perform on the deployment.",
              ).optional(),
            }).describe(
              "Analysis contains the configuration for the set of analyses to be performed on the target.",
            ).optional(),
            postdeploy: z.object({
              actions: z.array(z.string()).describe(
                "Optional. A sequence of Skaffold custom actions to invoke during execution of the postdeploy job.",
              ).optional(),
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()).describe(
                    "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                  ).optional(),
                  command: z.array(z.string()).describe(
                    "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                  ).optional(),
                  env: z.record(z.string(), z.string()).describe(
                    "Optional. Environment variables that are set in the container.",
                  ).optional(),
                  image: z.string().describe(
                    "Required. Image is the container image to use.",
                  ).optional(),
                }).describe(
                  "This task is represented by a container that is executed in the Cloud Build execution environment.",
                ).optional(),
              })).describe(
                "Optional. The tasks that will run as a part of the postdeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
              ).optional(),
            }).describe(
              "Postdeploy contains the postdeploy job configuration information.",
            ).optional(),
            predeploy: z.object({
              actions: z.array(z.string()).describe(
                "Optional. A sequence of Skaffold custom actions to invoke during execution of the predeploy job.",
              ).optional(),
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()).describe(
                    "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                  ).optional(),
                  command: z.array(z.string()).describe(
                    "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                  ).optional(),
                  env: z.record(z.string(), z.string()).describe(
                    "Optional. Environment variables that are set in the container.",
                  ).optional(),
                  image: z.string().describe(
                    "Required. Image is the container image to use.",
                  ).optional(),
                }).describe(
                  "This task is represented by a container that is executed in the Cloud Build execution environment.",
                ).optional(),
              })).describe(
                "Optional. The tasks that will run as a part of the predeploy job. The tasks are executed sequentially in the order specified. Only one of `actions` or `tasks` can be specified.",
              ).optional(),
            }).describe(
              "Predeploy contains the predeploy job configuration information.",
            ).optional(),
            verify: z.boolean().describe(
              "Optional. Whether to verify a deployment via `skaffold verify`.",
            ).optional(),
            verifyConfig: z.object({
              tasks: z.array(z.object({
                container: z.object({
                  args: z.array(z.string()).describe(
                    "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
                  ).optional(),
                  command: z.array(z.string()).describe(
                    "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
                  ).optional(),
                  env: z.record(z.string(), z.string()).describe(
                    "Optional. Environment variables that are set in the container.",
                  ).optional(),
                  image: z.string().describe(
                    "Required. Image is the container image to use.",
                  ).optional(),
                }).describe(
                  "This task is represented by a container that is executed in the Cloud Build execution environment.",
                ).optional(),
              })).describe(
                "Optional. The tasks that will run as a part of the verify job. The tasks are executed sequentially in the order specified.",
              ).optional(),
            }).describe(
              "Verify contains the verify job configuration information.",
            ).optional(),
          }).describe("Standard represents the standard deployment strategy.")
            .optional(),
        }).describe("Strategy contains deployment strategy information.")
          .optional(),
        targetId: z.string().describe(
          "Optional. The target_id to which this stage points. This field refers exclusively to the last segment of a target name. For example, this field would just be `my-target` (rather than `projects/project/locations/location/targets/my-target`). The location of the `Target` is inferred to be the same as the location of the `DeliveryPipeline` that contains this `Stage`.",
        ).optional(),
      })).describe(
        "Optional. Each stage specifies configuration for a `Target`. The ordering of this list defines the promotion flow.",
      ).optional(),
    }).describe(
      "SerialPipeline defines a sequential set of stages for a `DeliveryPipeline`.",
    ).optional(),
    suspended: z.boolean().describe(
      "Optional. When suspended, no new releases or rollouts can be created, but in-progress ones will complete.",
    ).optional(),
    uid: z.string().describe(
      "Output only. Unique identifier of the `DeliveryPipeline`.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Most recent time at which the pipeline was updated.",
    ).optional(),
  }).describe(
    "A `DeliveryPipeline` resource in the Cloud Deploy API. A `DeliveryPipeline` defines a pipeline through which a Skaffold configuration can progress.",
  ).optional(),
  deployParameters: z.record(z.string(), z.string()).describe(
    "Optional. The deploy parameters to use for all targets in this release.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `Release`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `Release`. Format is `projects/{project}/locations/{location}/deliveryPipelines/{deliveryPipeline}/releases/{release}`. The `release` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  skaffoldConfigPath: z.string().describe(
    "Optional. Filepath of the Skaffold config inside of the config URI.",
  ).optional(),
  skaffoldConfigUri: z.string().describe(
    "Optional. Cloud Storage URI of tar.gz archive containing Skaffold configuration.",
  ).optional(),
  skaffoldVersion: z.string().describe(
    'Optional. The Skaffold version to use when operating on this release, such as "1.20.0". Not all versions are valid; Cloud Deploy supports a specific set of versions. If unset, the most recent supported Skaffold version will be used.',
  ).optional(),
  toolVersions: z.object({
    docker: z.string().describe(
      "Optional. The Docker version to use for Cloud Deploy operations.",
    ).optional(),
    helm: z.string().describe(
      "Optional. The Helm version to use for Cloud Deploy operations.",
    ).optional(),
    kpt: z.string().describe(
      "Optional. The kpt version to use for Cloud Deploy operations.",
    ).optional(),
    kubectl: z.string().describe(
      "Optional. The Kubectl version to use for Cloud Deploy operations.",
    ).optional(),
    kustomize: z.string().describe(
      "Optional. The Kustomize version to use for Cloud Deploy operations.",
    ).optional(),
    skaffold: z.string().describe(
      "Optional. The Skaffold version to use for Cloud Deploy operations.",
    ).optional(),
  }).describe("Details of ToolVersions for the release.").optional(),
  overrideDeployPolicy: z.string().describe(
    "Optional. Deploy policies to override. Format is `projects/{project}/locations/{location}/deployPolicies/{deployPolicy}`.",
  ).optional(),
  releaseId: z.string().describe("Required. ID of the `Release`.").optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/clouddeploy/deliverypipelines-releases",
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
      description:
        "A `Release` resource in the Cloud Deploy API. A `Release` defines a specific ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a releases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["buildArtifacts"] !== undefined) {
          body["buildArtifacts"] = g["buildArtifacts"];
        }
        if (g["condition"] !== undefined) body["condition"] = g["condition"];
        if (g["deliveryPipelineSnapshot"] !== undefined) {
          body["deliveryPipelineSnapshot"] = g["deliveryPipelineSnapshot"];
        }
        if (g["deployParameters"] !== undefined) {
          body["deployParameters"] = g["deployParameters"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["skaffoldConfigPath"] !== undefined) {
          body["skaffoldConfigPath"] = g["skaffoldConfigPath"];
        }
        if (g["skaffoldConfigUri"] !== undefined) {
          body["skaffoldConfigUri"] = g["skaffoldConfigUri"];
        }
        if (g["skaffoldVersion"] !== undefined) {
          body["skaffoldVersion"] = g["skaffoldVersion"];
        }
        if (g["toolVersions"] !== undefined) {
          body["toolVersions"] = g["toolVersions"];
        }
        if (g["overrideDeployPolicy"] !== undefined) {
          body["overrideDeployPolicy"] = g["overrideDeployPolicy"];
        }
        if (g["releaseId"] !== undefined) body["releaseId"] = g["releaseId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a releases",
      arguments: z.object({
        identifier: z.string().describe("The name of the releases"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Sync releases state from GCP",
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
    abandon: {
      description: "abandon",
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
              "clouddeploy.projects.locations.deliveryPipelines.releases.abandon",
            "path": "v1/{+name}:abandon",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
