// Auto-generated extension model for @swamp/gcp/aiplatform/endpoints
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
  return `${parent}/endpoints/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id": "aiplatform.projects.locations.endpoints.get",
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
  "id": "aiplatform.projects.locations.endpoints.create",
  "path": "v1/{+parent}/endpoints",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "endpointId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "aiplatform.projects.locations.endpoints.update",
  "path": "v1/{+name}:update",
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

const DELETE_CONFIG = {
  "id": "aiplatform.projects.locations.endpoints.delete",
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
  clientConnectionConfig: z.object({
    inferenceTimeout: z.string().describe(
      "Customizable online prediction request timeout.",
    ).optional(),
  }).describe(
    "Configurations (e.g. inference timeout) that are applied on your endpoints.",
  ).optional(),
  dedicatedEndpointEnabled: z.boolean().describe(
    "If true, the endpoint will be exposed through a dedicated DNS [Endpoint.dedicated_endpoint_dns]. Your request to the dedicated DNS will be isolated from other users' traffic and will have better performance and reliability. Note: Once you enabled dedicated endpoint, you won't be able to send request to the shared DNS {region}-aiplatform.googleapis.com. The limitation will be removed soon.",
  ).optional(),
  description: z.string().describe("The description of the Endpoint.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the Endpoint. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  gdcConfig: z.object({
    zone: z.string().describe(
      "GDC zone. A cluster will be designated for the Vertex AI workload in this zone.",
    ).optional(),
  }).describe("Google Distributed Cloud (GDC) config.").optional(),
  genAiAdvancedFeaturesConfig: z.object({
    ragConfig: z.object({
      enableRag: z.boolean().describe(
        "If true, enable Retrieval Augmented Generation in ChatCompletion request. Once enabled, the endpoint will be identified as GenAI endpoint and Arthedain router will be used.",
      ).optional(),
    }).describe("Configuration for Retrieval Augmented Generation feature.")
      .optional(),
  }).describe("Configuration for GenAiAdvancedFeatures.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize your Endpoints. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the Endpoint.")
    .optional(),
  network: z.string().describe(
    "Optional. The full name of the Google Compute Engine [network](https://cloud.google.com//compute/docs/networks-and-firewalls#networks) to which the Endpoint should be peered. Private services access must already be configured for the network. If left unspecified, the Endpoint is not peered with any network. Only one of the fields, network or enable_private_service_connect, can be set. [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/insert): `projects/{project}/global/networks/{network}`. Where `{project}` is a project number, as in `12345`, and `{network}` is network name.",
  ).optional(),
  predictRequestResponseLoggingConfig: z.object({
    bigqueryDestination: z.object({
      outputUri: z.string().describe(
        "Required. BigQuery URI to a project or table, up to 2000 characters long. When only the project is specified, the Dataset and Table is created. When the full table reference is specified, the Dataset must exist and table must not exist. Accepted forms: * BigQuery path. For example: `bq://projectId` or `bq://projectId.bqDatasetId` or `bq://projectId.bqDatasetId.bqTableId`.",
      ).optional(),
    }).describe("The BigQuery location for the output content.").optional(),
    enabled: z.boolean().describe("If logging is enabled or not.").optional(),
    samplingRate: z.number().describe(
      "Percentage of requests to be logged, expressed as a fraction in range(0,1].",
    ).optional(),
  }).describe("Configuration for logging request-response to a BigQuery table.")
    .optional(),
  privateServiceConnectConfig: z.object({
    enablePrivateServiceConnect: z.boolean().describe(
      "Required. If true, expose the IndexEndpoint via private service connect.",
    ).optional(),
    projectAllowlist: z.array(z.string()).describe(
      "A list of Projects from which the forwarding rule will target the service attachment.",
    ).optional(),
    pscAutomationConfigs: z.array(z.object({
      errorMessage: z.string().describe(
        "Output only. Error message if the PSC service automation failed.",
      ).optional(),
      forwardingRule: z.string().describe(
        "Output only. Forwarding rule created by the PSC service automation.",
      ).optional(),
      ipAddress: z.string().describe(
        "Output only. IP address rule created by the PSC service automation.",
      ).optional(),
      network: z.string().describe(
        "Required. The full name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks). [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/get): `projects/{project}/global/networks/{network}`.",
      ).optional(),
      projectId: z.string().describe(
        "Required. Project id used to create forwarding rule.",
      ).optional(),
      state: z.enum([
        "PSC_AUTOMATION_STATE_UNSPECIFIED",
        "PSC_AUTOMATION_STATE_SUCCESSFUL",
        "PSC_AUTOMATION_STATE_FAILED",
      ]).describe("Output only. The state of the PSC service automation.")
        .optional(),
    })).describe(
      "Optional. List of projects and networks where the PSC endpoints will be created. This field is used by Online Inference(Prediction) only.",
    ).optional(),
    serviceAttachment: z.string().describe(
      "Output only. The name of the generated service attachment resource. This is only populated if the endpoint is deployed with PrivateServiceConnect.",
    ).optional(),
  }).describe("Represents configuration for private service connect.")
    .optional(),
  trafficSplit: z.record(z.string(), z.number().int()).describe(
    "A map from a DeployedModel's ID to the percentage of this Endpoint's traffic that should be forwarded to that DeployedModel. If a DeployedModel's ID is not listed in this map, then it receives no traffic. The traffic percentage values must add up to 100, or map must be empty if the Endpoint is to not accept any traffic at a moment.",
  ).optional(),
  endpoint: z.object({
    clientConnectionConfig: z.object({
      inferenceTimeout: z.string().describe(
        "Customizable online prediction request timeout.",
      ).optional(),
    }).describe(
      "Configurations (e.g. inference timeout) that are applied on your endpoints.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Timestamp when this Endpoint was created.",
    ).optional(),
    dedicatedEndpointDns: z.string().describe(
      "Output only. DNS of the dedicated endpoint. Will only be populated if dedicated_endpoint_enabled is true. Depending on the features enabled, uid might be a random number or a string. For example, if fast_tryout is enabled, uid will be fasttryout. Format: `https://{endpoint_id}.{region}-{uid}.prediction.vertexai.goog`.",
    ).optional(),
    dedicatedEndpointEnabled: z.boolean().describe(
      "If true, the endpoint will be exposed through a dedicated DNS [Endpoint.dedicated_endpoint_dns]. Your request to the dedicated DNS will be isolated from other users' traffic and will have better performance and reliability. Note: Once you enabled dedicated endpoint, you won't be able to send request to the shared DNS {region}-aiplatform.googleapis.com. The limitation will be removed soon.",
    ).optional(),
    deployedModels: z.array(z.object({
      automaticResources: z.object({
        maxReplicaCount: z.number().int().describe(
          "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, a no upper bound for scaling under heavy traffic will be assume, though Vertex AI may be unable to scale beyond certain replica number.",
        ).optional(),
        minReplicaCount: z.number().int().describe(
          "Immutable. The minimum number of replicas that will be always deployed on. If traffic against it increases, it may dynamically be deployed onto more replicas up to max_replica_count, and as traffic decreases, some of these extra replicas may be freed. If the requested value is too large, the deployment will error.",
        ).optional(),
      }).describe(
        "A description of resources that to large degree are decided by Vertex AI, and require only a modest additional configuration. Each Model supporting these resources documents its specific guidelines.",
      ).optional(),
      checkpointId: z.string().describe("The checkpoint id of the model.")
        .optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the DeployedModel was created.",
      ).optional(),
      dedicatedResources: z.object({
        autoscalingMetricSpecs: z.array(z.object({
          metricName: z.string().describe(
            "Required. The resource metric name. Supported metrics: * For Online Prediction: * `aiplatform.googleapis.com/prediction/online/accelerator/duty_cycle` * `aiplatform.googleapis.com/prediction/online/cpu/utilization` * `aiplatform.googleapis.com/prediction/online/request_count` * `pubsub.googleapis.com/subscription/num_undelivered_messages` * `prometheus.googleapis.com/vertex_dcgm_fi_dev_gpu_util` * `prometheus.googleapis.com/vertex_vllm_gpu_cache_usage_perc` * `prometheus.googleapis.com/vertex_vllm_num_requests_waiting`",
          ).optional(),
          target: z.number().int().describe(
            "The target resource utilization in percentage (1% - 100%) for the given metric; once the real usage deviates from the target by a certain percentage, the machine replicas change. The default value is 60 (representing 60%) if not provided.",
          ).optional(),
        })).describe(
          "Immutable. The metric specifications that overrides a resource utilization metric (CPU utilization, accelerator's duty cycle, and so on) target value (default to 60 if not set). At most one entry is allowed per metric. If machine_spec.accelerator_count is above 0, the autoscaling will be based on both CPU utilization and accelerator's duty cycle metrics and scale up when either metrics exceeds its target value while scale down if both metrics are under their target value. The default target value is 60 for both metrics. If machine_spec.accelerator_count is 0, the autoscaling will be based on CPU utilization metric only with default target value 60 if not explicitly set. For example, in the case of Online Prediction, if you want to override target CPU utilization to 80, you should set autoscaling_metric_specs.metric_name to `aiplatform.googleapis.com/prediction/online/cpu/utilization` and autoscaling_metric_specs.target to `80`.",
        ).optional(),
        machineSpec: z.object({
          acceleratorCount: z.number().int().describe(
            "The number of accelerators to attach to the machine. For accelerator optimized machine types (https://cloud.google.com/compute/docs/accelerator-optimized-machines), One may set the accelerator_count from 1 to N for machine with N GPUs. If accelerator_count is less than or equal to N / 2, Vertex will co-schedule the replicas of the model into the same VM to save cost. For example, if the machine type is a3-highgpu-8g, which has 8 H100 GPUs, one can set accelerator_count to 1 to 8. If accelerator_count is 1, 2, 3, or 4, Vertex will co-schedule 8, 4, 2, or 2 replicas of the model into the same VM to save cost. When co-scheduling, CPU, memory and storage on the VM will be distributed to replicas on the VM. For example, one can expect a co-scheduled replica requesting 2 GPUs out of a 8-GPU VM will receive 25% of the CPU, memory and storage of the VM. Note that the feature is not compatible with multihost_gpu_node_count. When multihost_gpu_node_count is set, the co-scheduling will not be enabled.",
          ).optional(),
          acceleratorType: z.enum([
            "ACCELERATOR_TYPE_UNSPECIFIED",
            "NVIDIA_TESLA_K80",
            "NVIDIA_TESLA_P100",
            "NVIDIA_TESLA_V100",
            "NVIDIA_TESLA_P4",
            "NVIDIA_TESLA_T4",
            "NVIDIA_TESLA_A100",
            "NVIDIA_A100_80GB",
            "NVIDIA_L4",
            "NVIDIA_H100_80GB",
            "NVIDIA_H100_MEGA_80GB",
            "NVIDIA_H200_141GB",
            "NVIDIA_B200",
            "NVIDIA_GB200",
            "NVIDIA_RTX_PRO_6000",
            "TPU_V2",
            "TPU_V3",
            "TPU_V4_POD",
            "TPU_V5_LITEPOD",
          ]).describe(
            "Immutable. The type of accelerator(s) that may be attached to the machine as per accelerator_count.",
          ).optional(),
          gpuPartitionSize: z.string().describe(
            'Optional. Immutable. The Nvidia GPU partition size. When specified, the requested accelerators will be partitioned into smaller GPU partitions. For example, if the request is for 8 units of NVIDIA A100 GPUs, and gpu_partition_size="1g.10gb", the service will create 8 * 7 = 56 partitioned MIG instances. The partition size must be a value supported by the requested accelerator. Refer to [Nvidia GPU Partitioning](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus-multi#multi-instance_gpu_partitions) for the available partition sizes. If set, the accelerator_count should be set to 1.',
          ).optional(),
          machineType: z.string().describe(
            "Immutable. The type of the machine. See the [list of machine types supported for prediction](https://cloud.google.com/vertex-ai/docs/predictions/configure-compute#machine-types) See the [list of machine types supported for custom training](https://cloud.google.com/vertex-ai/docs/training/configure-compute#machine-types). For DeployedModel this field is optional, and the default value is `n1-standard-2`. For BatchPredictionJob or as part of WorkerPoolSpec this field is required.",
          ).optional(),
          reservationAffinity: z.object({
            key: z.string().describe(
              "Optional. Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.",
            ).optional(),
            reservationAffinityType: z.enum([
              "TYPE_UNSPECIFIED",
              "NO_RESERVATION",
              "ANY_RESERVATION",
              "SPECIFIC_RESERVATION",
            ]).describe("Required. Specifies the reservation affinity type.")
              .optional(),
            values: z.array(z.string()).describe(
              "Optional. Corresponds to the label values of a reservation resource. This must be the full resource name of the reservation or reservation block.",
            ).optional(),
          }).describe(
            "A ReservationAffinity can be used to configure a Vertex AI resource (e.g., a DeployedModel) to draw its Compute Engine resources from a Shared Reservation, or exclusively from on-demand capacity.",
          ).optional(),
          tpuTopology: z.string().describe(
            'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
          ).optional(),
        }).describe("Specification of a single machine.").optional(),
        maxReplicaCount: z.number().int().describe(
          "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, will use min_replica_count as the default value. The value of this field impacts the charge against Vertex CPU and GPU quotas. Specifically, you will be charged for (max_replica_count * number of cores in the selected machine type) and (max_replica_count * number of GPUs per replica in the selected machine type).",
        ).optional(),
        minReplicaCount: z.number().int().describe(
          "Required. Immutable. The minimum number of machine replicas that will be always deployed on. This value must be greater than or equal to 1. If traffic increases, it may dynamically be deployed onto more replicas, and as traffic decreases, some of these extra replicas may be freed.",
        ).optional(),
        requiredReplicaCount: z.number().int().describe(
          "Optional. Number of required available replicas for the deployment to succeed. This field is only needed when partial deployment/mutation is desired. If set, the deploy/mutate operation will succeed once available_replica_count reaches required_replica_count, and the rest of the replicas will be retried. If not set, the default required_replica_count will be min_replica_count.",
        ).optional(),
        spot: z.boolean().describe(
          "Optional. If true, schedule the deployment workload on [spot VMs](https://cloud.google.com/kubernetes-engine/docs/concepts/spot-vms).",
        ).optional(),
      }).describe(
        "A description of resources that are dedicated to a DeployedModel or DeployedIndex, and that need a higher degree of manual configuration.",
      ).optional(),
      disableContainerLogging: z.boolean().describe(
        "For custom-trained Models and AutoML Tabular Models, the container of the DeployedModel instances will send `stderr` and `stdout` streams to Cloud Logging by default. Please note that the logs incur cost, which are subject to [Cloud Logging pricing](https://cloud.google.com/logging/pricing). User can disable container logging by setting this flag to true.",
      ).optional(),
      disableExplanations: z.boolean().describe(
        "If true, deploy the model without explainable feature, regardless the existence of Model.explanation_spec or explanation_spec.",
      ).optional(),
      displayName: z.string().describe(
        "The display name of the DeployedModel. If not provided upon creation, the Model's display_name is used.",
      ).optional(),
      enableAccessLogging: z.boolean().describe(
        "If true, online prediction access logs are sent to Cloud Logging. These logs are like standard server access logs, containing information like timestamp and latency for each prediction request. Note that logs may incur a cost, especially if your project receives prediction requests at a high queries per second rate (QPS). Estimate your costs before enabling this option.",
      ).optional(),
      explanationSpec: z.object({
        metadata: z.object({
          featureAttributionsSchemaUri: z.string().describe(
            "Points to a YAML file stored on Google Cloud Storage describing the format of the feature attributions. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML tabular Models always have this field populated by Vertex AI. Note: The URI given on output may be different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
          ).optional(),
          inputs: z.record(
            z.string(),
            z.object({
              denseShapeTensorName: z.string().describe(
                "Specifies the shape of the values of the input if the input is a sparse representation. Refer to Tensorflow documentation for more details: https://www.tensorflow.org/api_docs/python/tf/sparse/SparseTensor.",
              ).optional(),
              encodedBaselines: z.array(z.string()).describe(
                "A list of baselines for the encoded tensor. The shape of each baseline should match the shape of the encoded tensor. If a scalar is provided, Vertex AI broadcasts to the same shape as the encoded tensor.",
              ).optional(),
              encodedTensorName: z.string().describe(
                "Encoded tensor is a transformation of the input tensor. Must be provided if choosing Integrated Gradients attribution or XRAI attribution and the input tensor is not differentiable. An encoded tensor is generated if the input tensor is encoded by a lookup table.",
              ).optional(),
              encoding: z.enum([
                "ENCODING_UNSPECIFIED",
                "IDENTITY",
                "BAG_OF_FEATURES",
                "BAG_OF_FEATURES_SPARSE",
                "INDICATOR",
                "COMBINED_EMBEDDING",
                "CONCAT_EMBEDDING",
              ]).describe(
                "Defines how the feature is encoded into the input tensor. Defaults to IDENTITY.",
              ).optional(),
              featureValueDomain: z.object({
                maxValue: z.number().describe(
                  "The maximum permissible value for this feature.",
                ).optional(),
                minValue: z.number().describe(
                  "The minimum permissible value for this feature.",
                ).optional(),
                originalMean: z.number().describe(
                  "If this input feature has been normalized to a mean value of 0, the original_mean specifies the mean value of the domain prior to normalization.",
                ).optional(),
                originalStddev: z.number().describe(
                  "If this input feature has been normalized to a standard deviation of 1.0, the original_stddev specifies the standard deviation of the domain prior to normalization.",
                ).optional(),
              }).describe(
                "Domain details of the input feature value. Provides numeric information about the feature, such as its range (min, max). If the feature has been pre-processed, for example with z-scoring, then it provides information about how to recover the original feature. For example, if the input feature is an image and it has been pre-processed to obtain 0-mean and stddev = 1 values, then original_mean, and original_stddev refer to the mean and stddev of the original feature (e.g. image tensor) from which input feature (with mean = 0 and stddev = 1) was obtained.",
              ).optional(),
              groupName: z.string().describe(
                "Name of the group that the input belongs to. Features with the same group name will be treated as one feature when computing attributions. Features grouped together can have different shapes in value. If provided, there will be one single attribution generated in Attribution.feature_attributions, keyed by the group name.",
              ).optional(),
              indexFeatureMapping: z.array(z.string()).describe(
                "A list of feature names for each index in the input tensor. Required when the input InputMetadata.encoding is BAG_OF_FEATURES, BAG_OF_FEATURES_SPARSE, INDICATOR.",
              ).optional(),
              indicesTensorName: z.string().describe(
                "Specifies the index of the values of the input tensor. Required when the input tensor is a sparse representation. Refer to Tensorflow documentation for more details: https://www.tensorflow.org/api_docs/python/tf/sparse/SparseTensor.",
              ).optional(),
              inputBaselines: z.array(z.string()).describe(
                "Baseline inputs for this feature. If no baseline is specified, Vertex AI chooses the baseline for this feature. If multiple baselines are specified, Vertex AI returns the average attributions across them in Attribution.feature_attributions. For Vertex AI-provided Tensorflow images (both 1.x and 2.x), the shape of each baseline must match the shape of the input tensor. If a scalar is provided, we broadcast to the same shape as the input tensor. For custom images, the element of the baselines must be in the same format as the feature's input in the instance[]. The schema of any single instance may be specified via Endpoint's DeployedModels' Model's PredictSchemata's instance_schema_uri.",
              ).optional(),
              inputTensorName: z.string().describe(
                "Name of the input tensor for this feature. Required and is only applicable to Vertex AI-provided images for Tensorflow.",
              ).optional(),
              modality: z.string().describe(
                "Modality of the feature. Valid values are: numeric, image. Defaults to numeric.",
              ).optional(),
              visualization: z.object({
                clipPercentLowerbound: z.number().describe(
                  "Excludes attributions below the specified percentile, from the highlighted areas. Defaults to 62.",
                ).optional(),
                clipPercentUpperbound: z.number().describe(
                  "Excludes attributions above the specified percentile from the highlighted areas. Using the clip_percent_upperbound and clip_percent_lowerbound together can be useful for filtering out noise and making it easier to see areas of strong attribution. Defaults to 99.9.",
                ).optional(),
                colorMap: z.enum([
                  "COLOR_MAP_UNSPECIFIED",
                  "PINK_GREEN",
                  "VIRIDIS",
                  "RED",
                  "GREEN",
                  "RED_GREEN",
                  "PINK_WHITE_GREEN",
                ]).describe(
                  "The color scheme used for the highlighted areas. Defaults to PINK_GREEN for Integrated Gradients attribution, which shows positive attributions in green and negative in pink. Defaults to VIRIDIS for XRAI attribution, which highlights the most influential regions in yellow and the least influential in blue.",
                ).optional(),
                overlayType: z.enum([
                  "OVERLAY_TYPE_UNSPECIFIED",
                  "NONE",
                  "ORIGINAL",
                  "GRAYSCALE",
                  "MASK_BLACK",
                ]).describe(
                  "How the original image is displayed in the visualization. Adjusting the overlay can help increase visual clarity if the original image makes it difficult to view the visualization. Defaults to NONE.",
                ).optional(),
                polarity: z.enum([
                  "POLARITY_UNSPECIFIED",
                  "POSITIVE",
                  "NEGATIVE",
                  "BOTH",
                ]).describe(
                  "Whether to only highlight pixels with positive contributions, negative or both. Defaults to POSITIVE.",
                ).optional(),
                type: z.enum(["TYPE_UNSPECIFIED", "PIXELS", "OUTLINES"])
                  .describe(
                    "Type of the image visualization. Only applicable to Integrated Gradients attribution. OUTLINES shows regions of attribution, while PIXELS shows per-pixel attribution. Defaults to OUTLINES.",
                  ).optional(),
              }).describe("Visualization configurations for image explanation.")
                .optional(),
            }),
          ).describe(
            "Required. Map from feature names to feature input metadata. Keys are the name of the features. Values are the specification of the feature. An empty InputMetadata is valid. It describes a text feature which has the name specified as the key in ExplanationMetadata.inputs. The baseline of the empty feature is chosen by Vertex AI. For Vertex AI-provided Tensorflow images, the key can be any friendly name of the feature. Once specified, featureAttributions are keyed by this key (if not grouped with another feature). For custom images, the key must match with the key in instance.",
          ).optional(),
          latentSpaceSource: z.string().describe(
            "Name of the source to generate embeddings for example based explanations.",
          ).optional(),
          outputs: z.record(
            z.string(),
            z.object({
              displayNameMappingKey: z.string().describe(
                "Specify a field name in the prediction to look for the display name. Use this if the prediction contains the display names for the outputs. The display names in the prediction must have the same shape of the outputs, so that it can be located by Attribution.output_index for a specific output.",
              ).optional(),
              indexDisplayNameMapping: z.string().describe(
                "Static mapping between the index and display name. Use this if the outputs are a deterministic n-dimensional array, e.g. a list of scores of all the classes in a pre-defined order for a multi-classification Model. It's not feasible if the outputs are non-deterministic, e.g. the Model produces top-k classes or sort the outputs by their values. The shape of the value must be an n-dimensional array of strings. The number of dimensions must match that of the outputs to be explained. The Attribution.output_display_name is populated by locating in the mapping with Attribution.output_index.",
              ).optional(),
              outputTensorName: z.string().describe(
                "Name of the output tensor. Required and is only applicable to Vertex AI provided images for Tensorflow.",
              ).optional(),
            }),
          ).describe(
            "Required. Map from output names to output metadata. For Vertex AI-provided Tensorflow images, keys can be any user defined string that consists of any UTF-8 characters. For custom images, keys are the name of the output field in the prediction to be explained. Currently only one key is allowed.",
          ).optional(),
        }).describe(
          "Metadata describing the Model's input and output for explanation.",
        ).optional(),
        parameters: z.object({
          examples: z.object({
            exampleGcsSource: z.object({
              dataFormat: z.enum(["DATA_FORMAT_UNSPECIFIED", "JSONL"]).describe(
                "The format in which instances are given, if not specified, assume it's JSONL format. Currently only JSONL format is supported.",
              ).optional(),
              gcsSource: z.object({
                uris: z.array(z.string()).describe(
                  "Required. Google Cloud Storage URI(-s) to the input file(s). May contain wildcards. For more information on wildcards, see https://cloud.google.com/storage/docs/wildcards.",
                ).optional(),
              }).describe(
                "The Google Cloud Storage location for the input content.",
              ).optional(),
            }).describe("The Cloud Storage input instances.").optional(),
            nearestNeighborSearchConfig: z.string().describe(
              "The full configuration for the generated index, the semantics are the same as metadata and should match [NearestNeighborSearchConfig](https://cloud.google.com/vertex-ai/docs/explainable-ai/configuring-explanations-example-based#nearest-neighbor-search-config).",
            ).optional(),
            neighborCount: z.number().int().describe(
              "The number of neighbors to return when querying for examples.",
            ).optional(),
            presets: z.object({
              modality: z.enum([
                "MODALITY_UNSPECIFIED",
                "IMAGE",
                "TEXT",
                "TABULAR",
              ]).describe(
                "The modality of the uploaded model, which automatically configures the distance measurement and feature normalization for the underlying example index and queries. If your model does not precisely fit one of these types, it is okay to choose the closest type.",
              ).optional(),
              query: z.enum(["PRECISE", "FAST"]).describe(
                "Preset option controlling parameters for speed-precision trade-off when querying for examples. If omitted, defaults to `PRECISE`.",
              ).optional(),
            }).describe("Preset configuration for example-based explanations")
              .optional(),
          }).describe(
            "Example-based explainability that returns the nearest neighbors from the provided dataset.",
          ).optional(),
          integratedGradientsAttribution: z.object({
            blurBaselineConfig: z.object({
              maxBlurSigma: z.number().describe(
                "The standard deviation of the blur kernel for the blurred baseline. The same blurring parameter is used for both the height and the width dimension. If not set, the method defaults to the zero (i.e. black for images) baseline.",
              ).optional(),
            }).describe(
              "Config for blur baseline. When enabled, a linear path from the maximally blurred image to the input image is created. Using a blurred baseline instead of zero (black image) is motivated by the BlurIG approach explained here: https://arxiv.org/abs/2004.03383",
            ).optional(),
            smoothGradConfig: z.object({
              featureNoiseSigma: z.object({
                noiseSigma: z.array(z.object({
                  name: z.string().describe(
                    "The name of the input feature for which noise sigma is provided. The features are defined in explanation metadata inputs.",
                  ).optional(),
                  sigma: z.number().describe(
                    "This represents the standard deviation of the Gaussian kernel that will be used to add noise to the feature prior to computing gradients. Similar to noise_sigma but represents the noise added to the current feature. Defaults to 0.1.",
                  ).optional(),
                })).describe(
                  "Noise sigma per feature. No noise is added to features that are not set.",
                ).optional(),
              }).describe(
                "Noise sigma by features. Noise sigma represents the standard deviation of the gaussian kernel that will be used to add noise to interpolated inputs prior to computing gradients.",
              ).optional(),
              noiseSigma: z.number().describe(
                "This is a single float value and will be used to add noise to all the features. Use this field when all features are normalized to have the same distribution: scale to range [0, 1], [-1, 1] or z-scoring, where features are normalized to have 0-mean and 1-variance. Learn more about [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). For best results the recommended value is about 10% - 20% of the standard deviation of the input feature. Refer to section 3.2 of the SmoothGrad paper: https://arxiv.org/pdf/1706.03825.pdf. Defaults to 0.1. If the distribution is different per feature, set feature_noise_sigma instead for each feature.",
              ).optional(),
              noisySampleCount: z.number().int().describe(
                "The number of gradient samples to use for approximation. The higher this number, the more accurate the gradient is, but the runtime complexity increases by this factor as well. Valid range of its value is [1, 50]. Defaults to 3.",
              ).optional(),
            }).describe(
              "Config for SmoothGrad approximation of gradients. When enabled, the gradients are approximated by averaging the gradients from noisy samples in the vicinity of the inputs. Adding noise can help improve the computed gradients. Refer to this paper for more details: https://arxiv.org/pdf/1706.03825.pdf",
            ).optional(),
            stepCount: z.number().int().describe(
              "Required. The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is within the desired error range. Valid range of its value is [1, 100], inclusively.",
            ).optional(),
          }).describe(
            "An attribution method that computes the Aumann-Shapley value taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1703.01365",
          ).optional(),
          outputIndices: z.array(z.string()).describe(
            "If populated, only returns attributions that have output_index contained in output_indices. It must be an ndarray of integers, with the same shape of the output it's explaining. If not populated, returns attributions for top_k indices of outputs. If neither top_k nor output_indices is populated, returns the argmax index of the outputs. Only applicable to Models that predict multiple outputs (e,g, multi-class Models that predict multiple classes).",
          ).optional(),
          sampledShapleyAttribution: z.object({
            pathCount: z.number().int().describe(
              "Required. The number of feature permutations to consider when approximating the Shapley values. Valid range of its value is [1, 50], inclusively.",
            ).optional(),
          }).describe(
            "An attribution method that approximates Shapley values for features that contribute to the label being predicted. A sampling strategy is used to approximate the value rather than considering all subsets of features.",
          ).optional(),
          topK: z.number().int().describe(
            "If populated, returns attributions for top K indices of outputs (defaults to 1). Only applies to Models that predicts more than one outputs (e,g, multi-class Models). When set to -1, returns explanations for all outputs.",
          ).optional(),
          xraiAttribution: z.object({
            blurBaselineConfig: z.object({
              maxBlurSigma: z.number().describe(
                "The standard deviation of the blur kernel for the blurred baseline. The same blurring parameter is used for both the height and the width dimension. If not set, the method defaults to the zero (i.e. black for images) baseline.",
              ).optional(),
            }).describe(
              "Config for blur baseline. When enabled, a linear path from the maximally blurred image to the input image is created. Using a blurred baseline instead of zero (black image) is motivated by the BlurIG approach explained here: https://arxiv.org/abs/2004.03383",
            ).optional(),
            smoothGradConfig: z.object({
              featureNoiseSigma: z.object({
                noiseSigma: z.array(z.object({
                  name: z.string().describe(
                    "The name of the input feature for which noise sigma is provided. The features are defined in explanation metadata inputs.",
                  ).optional(),
                  sigma: z.number().describe(
                    "This represents the standard deviation of the Gaussian kernel that will be used to add noise to the feature prior to computing gradients. Similar to noise_sigma but represents the noise added to the current feature. Defaults to 0.1.",
                  ).optional(),
                })).describe(
                  "Noise sigma per feature. No noise is added to features that are not set.",
                ).optional(),
              }).describe(
                "Noise sigma by features. Noise sigma represents the standard deviation of the gaussian kernel that will be used to add noise to interpolated inputs prior to computing gradients.",
              ).optional(),
              noiseSigma: z.number().describe(
                "This is a single float value and will be used to add noise to all the features. Use this field when all features are normalized to have the same distribution: scale to range [0, 1], [-1, 1] or z-scoring, where features are normalized to have 0-mean and 1-variance. Learn more about [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). For best results the recommended value is about 10% - 20% of the standard deviation of the input feature. Refer to section 3.2 of the SmoothGrad paper: https://arxiv.org/pdf/1706.03825.pdf. Defaults to 0.1. If the distribution is different per feature, set feature_noise_sigma instead for each feature.",
              ).optional(),
              noisySampleCount: z.number().int().describe(
                "The number of gradient samples to use for approximation. The higher this number, the more accurate the gradient is, but the runtime complexity increases by this factor as well. Valid range of its value is [1, 50]. Defaults to 3.",
              ).optional(),
            }).describe(
              "Config for SmoothGrad approximation of gradients. When enabled, the gradients are approximated by averaging the gradients from noisy samples in the vicinity of the inputs. Adding noise can help improve the computed gradients. Refer to this paper for more details: https://arxiv.org/pdf/1706.03825.pdf",
            ).optional(),
            stepCount: z.number().int().describe(
              "Required. The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is met within the desired error range. Valid range of its value is [1, 100], inclusively.",
            ).optional(),
          }).describe(
            "An explanation method that redistributes Integrated Gradients attributions to segmented regions, taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1906.02825 Supported only by image Models.",
          ).optional(),
        }).describe(
          "Parameters to configure explaining for Model's predictions.",
        ).optional(),
      }).describe("Specification of Model explanation.").optional(),
      fasterDeploymentConfig: z.object({
        fastTryoutEnabled: z.boolean().describe(
          "If true, enable fast tryout feature for this deployed model.",
        ).optional(),
      }).describe("Configuration for faster model deployment.").optional(),
      gdcConnectedModel: z.string().describe(
        "GDC pretrained / Gemini model name. The model name is a plain model name, e.g. gemini-1.5-flash-002.",
      ).optional(),
      id: z.string().describe(
        "Immutable. The ID of the DeployedModel. If not provided upon deployment, Vertex AI will generate a value for this ID. This value should be 1-10 characters, and valid characters are `/[0-9]/`.",
      ).optional(),
      model: z.string().describe(
        "The resource name of the Model that this is the deployment of. Note that the Model may be in a different location than the DeployedModel's Endpoint. The resource name may contain version id or version alias to specify the version. Example: `projects/{project}/locations/{location}/models/{model}@2` or `projects/{project}/locations/{location}/models/{model}@golden` if no version is specified, the default version will be deployed.",
      ).optional(),
      modelVersionId: z.string().describe(
        "Output only. The version ID of the model that is deployed.",
      ).optional(),
      privateEndpoints: z.object({
        explainHttpUri: z.string().describe(
          "Output only. Http(s) path to send explain requests.",
        ).optional(),
        healthHttpUri: z.string().describe(
          "Output only. Http(s) path to send health check requests.",
        ).optional(),
        predictHttpUri: z.string().describe(
          "Output only. Http(s) path to send prediction requests.",
        ).optional(),
        serviceAttachment: z.string().describe(
          "Output only. The name of the service attachment resource. Populated if private service connect is enabled.",
        ).optional(),
      }).describe(
        "PrivateEndpoints proto is used to provide paths for users to send requests privately. To send request via private service access, use predict_http_uri, explain_http_uri or health_http_uri. To send request via private service connect, use service_attachment.",
      ).optional(),
      serviceAccount: z.string().describe(
        "The service account that the DeployedModel's container runs as. Specify the email address of the service account. If this service account is not specified, the container runs as a service account that doesn't have access to the resource project. Users deploying the Model must have the `iam.serviceAccounts.actAs` permission on this service account.",
      ).optional(),
      sharedResources: z.string().describe(
        "The resource name of the shared DeploymentResourcePool to deploy on. Format: `projects/{project}/locations/{location}/deploymentResourcePools/{deployment_resource_pool}`",
      ).optional(),
      speculativeDecodingSpec: z.object({
        draftModelSpeculation: z.object({
          draftModel: z.string().describe(
            "Required. The resource name of the draft model.",
          ).optional(),
        }).describe(
          "Draft model speculation works by using the smaller model to generate candidate tokens for speculative decoding.",
        ).optional(),
        ngramSpeculation: z.object({
          ngramSize: z.number().int().describe(
            "The number of last N input tokens used as ngram to search/match against the previous prompt sequence. This is equal to the N in N-Gram. The default value is 3 if not specified.",
          ).optional(),
        }).describe(
          "N-Gram speculation works by trying to find matching tokens in the previous prompt sequence and use those as speculation for generating new tokens.",
        ).optional(),
        speculativeTokenCount: z.number().int().describe(
          "The number of speculative tokens to generate at each step.",
        ).optional(),
      }).describe("Configuration for Speculative Decoding.").optional(),
      status: z.object({
        availableReplicaCount: z.number().int().describe(
          "Output only. The number of available replicas of the deployed model.",
        ).optional(),
        lastUpdateTime: z.string().describe(
          "Output only. The time at which the status was last updated.",
        ).optional(),
        message: z.string().describe(
          "Output only. The latest deployed model's status message (if any).",
        ).optional(),
      }).describe("Runtime status of the deployed model.").optional(),
      systemLabels: z.record(z.string(), z.string()).describe(
        "System labels to apply to Model Garden deployments. System labels are managed by Google for internal use only.",
      ).optional(),
    })).describe(
      "Output only. The models deployed in this Endpoint. To add or remove DeployedModels use EndpointService.DeployModel and EndpointService.UndeployModel respectively.",
    ).optional(),
    description: z.string().describe("The description of the Endpoint.")
      .optional(),
    displayName: z.string().describe(
      "Required. The display name of the Endpoint. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
    ).optional(),
    enablePrivateServiceConnect: z.boolean().describe(
      "Deprecated: If true, expose the Endpoint via private service connect. Only one of the fields, network or enable_private_service_connect, can be set.",
    ).optional(),
    encryptionSpec: z.object({
      kmsKeyName: z.string().describe(
        "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
      ).optional(),
    }).describe(
      "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
    ).optional(),
    etag: z.string().describe(
      'Used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
    ).optional(),
    gdcConfig: z.object({
      zone: z.string().describe(
        "GDC zone. A cluster will be designated for the Vertex AI workload in this zone.",
      ).optional(),
    }).describe("Google Distributed Cloud (GDC) config.").optional(),
    genAiAdvancedFeaturesConfig: z.object({
      ragConfig: z.object({
        enableRag: z.boolean().describe(
          "If true, enable Retrieval Augmented Generation in ChatCompletion request. Once enabled, the endpoint will be identified as GenAI endpoint and Arthedain router will be used.",
        ).optional(),
      }).describe("Configuration for Retrieval Augmented Generation feature.")
        .optional(),
    }).describe("Configuration for GenAiAdvancedFeatures.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels with user-defined metadata to organize your Endpoints. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
    ).optional(),
    modelDeploymentMonitoringJob: z.string().describe(
      "Output only. Resource name of the Model Monitoring job associated with this Endpoint if monitoring is enabled by JobService.CreateModelDeploymentMonitoringJob. Format: `projects/{project}/locations/{location}/modelDeploymentMonitoringJobs/{model_deployment_monitoring_job}`",
    ).optional(),
    name: z.string().describe("Identifier. The resource name of the Endpoint.")
      .optional(),
    network: z.string().describe(
      "Optional. The full name of the Google Compute Engine [network](https://cloud.google.com//compute/docs/networks-and-firewalls#networks) to which the Endpoint should be peered. Private services access must already be configured for the network. If left unspecified, the Endpoint is not peered with any network. Only one of the fields, network or enable_private_service_connect, can be set. [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/insert): `projects/{project}/global/networks/{network}`. Where `{project}` is a project number, as in `12345`, and `{network}` is network name.",
    ).optional(),
    predictRequestResponseLoggingConfig: z.object({
      bigqueryDestination: z.object({
        outputUri: z.string().describe(
          "Required. BigQuery URI to a project or table, up to 2000 characters long. When only the project is specified, the Dataset and Table is created. When the full table reference is specified, the Dataset must exist and table must not exist. Accepted forms: * BigQuery path. For example: `bq://projectId` or `bq://projectId.bqDatasetId` or `bq://projectId.bqDatasetId.bqTableId`.",
        ).optional(),
      }).describe("The BigQuery location for the output content.").optional(),
      enabled: z.boolean().describe("If logging is enabled or not.").optional(),
      samplingRate: z.number().describe(
        "Percentage of requests to be logged, expressed as a fraction in range(0,1].",
      ).optional(),
    }).describe(
      "Configuration for logging request-response to a BigQuery table.",
    ).optional(),
    privateServiceConnectConfig: z.object({
      enablePrivateServiceConnect: z.boolean().describe(
        "Required. If true, expose the IndexEndpoint via private service connect.",
      ).optional(),
      projectAllowlist: z.array(z.string()).describe(
        "A list of Projects from which the forwarding rule will target the service attachment.",
      ).optional(),
      pscAutomationConfigs: z.array(z.object({
        errorMessage: z.string().describe(
          "Output only. Error message if the PSC service automation failed.",
        ).optional(),
        forwardingRule: z.string().describe(
          "Output only. Forwarding rule created by the PSC service automation.",
        ).optional(),
        ipAddress: z.string().describe(
          "Output only. IP address rule created by the PSC service automation.",
        ).optional(),
        network: z.string().describe(
          "Required. The full name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks). [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/get): `projects/{project}/global/networks/{network}`.",
        ).optional(),
        projectId: z.string().describe(
          "Required. Project id used to create forwarding rule.",
        ).optional(),
        state: z.enum([
          "PSC_AUTOMATION_STATE_UNSPECIFIED",
          "PSC_AUTOMATION_STATE_SUCCESSFUL",
          "PSC_AUTOMATION_STATE_FAILED",
        ]).describe("Output only. The state of the PSC service automation.")
          .optional(),
      })).describe(
        "Optional. List of projects and networks where the PSC endpoints will be created. This field is used by Online Inference(Prediction) only.",
      ).optional(),
      serviceAttachment: z.string().describe(
        "Output only. The name of the generated service attachment resource. This is only populated if the endpoint is deployed with PrivateServiceConnect.",
      ).optional(),
    }).describe("Represents configuration for private service connect.")
      .optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    trafficSplit: z.record(z.string(), z.number().int()).describe(
      "A map from a DeployedModel's ID to the percentage of this Endpoint's traffic that should be forwarded to that DeployedModel. If a DeployedModel's ID is not listed in this map, then it receives no traffic. The traffic percentage values must add up to 100, or map must be empty if the Endpoint is to not accept any traffic at a moment.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp when this Endpoint was last updated.",
    ).optional(),
  }).describe(
    "Models are deployed into it, and afterwards Endpoint is called to obtain predictions and explanations.",
  ).optional(),
  endpointId: z.string().describe(
    "Immutable. The ID to use for endpoint, which will become the final component of the endpoint resource name. If not provided, Vertex AI will generate a value for this ID. If the first character is a letter, this value may be up to 63 characters, and valid characters are `[a-z0-9-]`. The last character must be a letter or number. If the first character is a number, this value may be up to 9 characters, and valid characters are `[0-9]` with no leading zeros. When using HTTP/JSON, this field is populated based on a query string argument, such as `?endpoint_id=12345`. This is the fallback for fields that are not included in either the URI or the body.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  clientConnectionConfig: z.object({
    inferenceTimeout: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  dedicatedEndpointDns: z.string().optional(),
  dedicatedEndpointEnabled: z.boolean().optional(),
  deployedModels: z.array(z.object({
    automaticResources: z.object({
      maxReplicaCount: z.number(),
      minReplicaCount: z.number(),
    }),
    checkpointId: z.string(),
    createTime: z.string(),
    dedicatedResources: z.object({
      autoscalingMetricSpecs: z.array(z.object({
        metricName: z.string(),
        target: z.number(),
      })),
      machineSpec: z.object({
        acceleratorCount: z.number(),
        acceleratorType: z.string(),
        gpuPartitionSize: z.string(),
        machineType: z.string(),
        reservationAffinity: z.object({
          key: z.string(),
          reservationAffinityType: z.string(),
          values: z.array(z.string()),
        }),
        tpuTopology: z.string(),
      }),
      maxReplicaCount: z.number(),
      minReplicaCount: z.number(),
      requiredReplicaCount: z.number(),
      spot: z.boolean(),
    }),
    disableContainerLogging: z.boolean(),
    disableExplanations: z.boolean(),
    displayName: z.string(),
    enableAccessLogging: z.boolean(),
    explanationSpec: z.object({
      metadata: z.object({
        featureAttributionsSchemaUri: z.string(),
        inputs: z.record(z.string(), z.unknown()),
        latentSpaceSource: z.string(),
        outputs: z.record(z.string(), z.unknown()),
      }),
      parameters: z.object({
        examples: z.object({
          exampleGcsSource: z.object({
            dataFormat: z.string(),
            gcsSource: z.object({
              uris: z.array(z.string()),
            }),
          }),
          nearestNeighborSearchConfig: z.string(),
          neighborCount: z.number(),
          presets: z.object({
            modality: z.string(),
            query: z.string(),
          }),
        }),
        integratedGradientsAttribution: z.object({
          blurBaselineConfig: z.object({
            maxBlurSigma: z.number(),
          }),
          smoothGradConfig: z.object({
            featureNoiseSigma: z.object({
              noiseSigma: z.array(z.object({
                name: z.string(),
                sigma: z.number(),
              })),
            }),
            noiseSigma: z.number(),
            noisySampleCount: z.number(),
          }),
          stepCount: z.number(),
        }),
        outputIndices: z.array(z.string()),
        sampledShapleyAttribution: z.object({
          pathCount: z.number(),
        }),
        topK: z.number(),
        xraiAttribution: z.object({
          blurBaselineConfig: z.object({
            maxBlurSigma: z.number(),
          }),
          smoothGradConfig: z.object({
            featureNoiseSigma: z.object({
              noiseSigma: z.array(z.object({
                name: z.string(),
                sigma: z.number(),
              })),
            }),
            noiseSigma: z.number(),
            noisySampleCount: z.number(),
          }),
          stepCount: z.number(),
        }),
      }),
    }),
    fasterDeploymentConfig: z.object({
      fastTryoutEnabled: z.boolean(),
    }),
    gdcConnectedModel: z.string(),
    id: z.string(),
    model: z.string(),
    modelVersionId: z.string(),
    privateEndpoints: z.object({
      explainHttpUri: z.string(),
      healthHttpUri: z.string(),
      predictHttpUri: z.string(),
      serviceAttachment: z.string(),
    }),
    serviceAccount: z.string(),
    sharedResources: z.string(),
    speculativeDecodingSpec: z.object({
      draftModelSpeculation: z.object({
        draftModel: z.string(),
      }),
      ngramSpeculation: z.object({
        ngramSize: z.number(),
      }),
      speculativeTokenCount: z.number(),
    }),
    status: z.object({
      availableReplicaCount: z.number(),
      lastUpdateTime: z.string(),
      message: z.string(),
    }),
    systemLabels: z.record(z.string(), z.unknown()),
  })).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  enablePrivateServiceConnect: z.boolean().optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  etag: z.string().optional(),
  gdcConfig: z.object({
    zone: z.string(),
  }).optional(),
  genAiAdvancedFeaturesConfig: z.object({
    ragConfig: z.object({
      enableRag: z.boolean(),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  modelDeploymentMonitoringJob: z.string().optional(),
  name: z.string(),
  network: z.string().optional(),
  predictRequestResponseLoggingConfig: z.object({
    bigqueryDestination: z.object({
      outputUri: z.string(),
    }),
    enabled: z.boolean(),
    samplingRate: z.number(),
  }).optional(),
  privateServiceConnectConfig: z.object({
    enablePrivateServiceConnect: z.boolean(),
    projectAllowlist: z.array(z.string()),
    pscAutomationConfigs: z.array(z.object({
      errorMessage: z.string(),
      forwardingRule: z.string(),
      ipAddress: z.string(),
      network: z.string(),
      projectId: z.string(),
      state: z.string(),
    })),
    serviceAttachment: z.string(),
  }).optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  trafficSplit: z.record(z.string(), z.unknown()).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  clientConnectionConfig: z.object({
    inferenceTimeout: z.string().describe(
      "Customizable online prediction request timeout.",
    ).optional(),
  }).describe(
    "Configurations (e.g. inference timeout) that are applied on your endpoints.",
  ).optional(),
  dedicatedEndpointEnabled: z.boolean().describe(
    "If true, the endpoint will be exposed through a dedicated DNS [Endpoint.dedicated_endpoint_dns]. Your request to the dedicated DNS will be isolated from other users' traffic and will have better performance and reliability. Note: Once you enabled dedicated endpoint, you won't be able to send request to the shared DNS {region}-aiplatform.googleapis.com. The limitation will be removed soon.",
  ).optional(),
  description: z.string().describe("The description of the Endpoint.")
    .optional(),
  displayName: z.string().describe(
    "Required. The display name of the Endpoint. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
  ).optional(),
  encryptionSpec: z.object({
    kmsKeyName: z.string().describe(
      "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
    ).optional(),
  }).describe(
    "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
  ).optional(),
  gdcConfig: z.object({
    zone: z.string().describe(
      "GDC zone. A cluster will be designated for the Vertex AI workload in this zone.",
    ).optional(),
  }).describe("Google Distributed Cloud (GDC) config.").optional(),
  genAiAdvancedFeaturesConfig: z.object({
    ragConfig: z.object({
      enableRag: z.boolean().describe(
        "If true, enable Retrieval Augmented Generation in ChatCompletion request. Once enabled, the endpoint will be identified as GenAI endpoint and Arthedain router will be used.",
      ).optional(),
    }).describe("Configuration for Retrieval Augmented Generation feature.")
      .optional(),
  }).describe("Configuration for GenAiAdvancedFeatures.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels with user-defined metadata to organize your Endpoints. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
  ).optional(),
  name: z.string().describe("Identifier. The resource name of the Endpoint.")
    .optional(),
  network: z.string().describe(
    "Optional. The full name of the Google Compute Engine [network](https://cloud.google.com//compute/docs/networks-and-firewalls#networks) to which the Endpoint should be peered. Private services access must already be configured for the network. If left unspecified, the Endpoint is not peered with any network. Only one of the fields, network or enable_private_service_connect, can be set. [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/insert): `projects/{project}/global/networks/{network}`. Where `{project}` is a project number, as in `12345`, and `{network}` is network name.",
  ).optional(),
  predictRequestResponseLoggingConfig: z.object({
    bigqueryDestination: z.object({
      outputUri: z.string().describe(
        "Required. BigQuery URI to a project or table, up to 2000 characters long. When only the project is specified, the Dataset and Table is created. When the full table reference is specified, the Dataset must exist and table must not exist. Accepted forms: * BigQuery path. For example: `bq://projectId` or `bq://projectId.bqDatasetId` or `bq://projectId.bqDatasetId.bqTableId`.",
      ).optional(),
    }).describe("The BigQuery location for the output content.").optional(),
    enabled: z.boolean().describe("If logging is enabled or not.").optional(),
    samplingRate: z.number().describe(
      "Percentage of requests to be logged, expressed as a fraction in range(0,1].",
    ).optional(),
  }).describe("Configuration for logging request-response to a BigQuery table.")
    .optional(),
  privateServiceConnectConfig: z.object({
    enablePrivateServiceConnect: z.boolean().describe(
      "Required. If true, expose the IndexEndpoint via private service connect.",
    ).optional(),
    projectAllowlist: z.array(z.string()).describe(
      "A list of Projects from which the forwarding rule will target the service attachment.",
    ).optional(),
    pscAutomationConfigs: z.array(z.object({
      errorMessage: z.string().describe(
        "Output only. Error message if the PSC service automation failed.",
      ).optional(),
      forwardingRule: z.string().describe(
        "Output only. Forwarding rule created by the PSC service automation.",
      ).optional(),
      ipAddress: z.string().describe(
        "Output only. IP address rule created by the PSC service automation.",
      ).optional(),
      network: z.string().describe(
        "Required. The full name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks). [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/get): `projects/{project}/global/networks/{network}`.",
      ).optional(),
      projectId: z.string().describe(
        "Required. Project id used to create forwarding rule.",
      ).optional(),
      state: z.enum([
        "PSC_AUTOMATION_STATE_UNSPECIFIED",
        "PSC_AUTOMATION_STATE_SUCCESSFUL",
        "PSC_AUTOMATION_STATE_FAILED",
      ]).describe("Output only. The state of the PSC service automation.")
        .optional(),
    })).describe(
      "Optional. List of projects and networks where the PSC endpoints will be created. This field is used by Online Inference(Prediction) only.",
    ).optional(),
    serviceAttachment: z.string().describe(
      "Output only. The name of the generated service attachment resource. This is only populated if the endpoint is deployed with PrivateServiceConnect.",
    ).optional(),
  }).describe("Represents configuration for private service connect.")
    .optional(),
  trafficSplit: z.record(z.string(), z.number().int()).describe(
    "A map from a DeployedModel's ID to the percentage of this Endpoint's traffic that should be forwarded to that DeployedModel. If a DeployedModel's ID is not listed in this map, then it receives no traffic. The traffic percentage values must add up to 100, or map must be empty if the Endpoint is to not accept any traffic at a moment.",
  ).optional(),
  endpoint: z.object({
    clientConnectionConfig: z.object({
      inferenceTimeout: z.string().describe(
        "Customizable online prediction request timeout.",
      ).optional(),
    }).describe(
      "Configurations (e.g. inference timeout) that are applied on your endpoints.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. Timestamp when this Endpoint was created.",
    ).optional(),
    dedicatedEndpointDns: z.string().describe(
      "Output only. DNS of the dedicated endpoint. Will only be populated if dedicated_endpoint_enabled is true. Depending on the features enabled, uid might be a random number or a string. For example, if fast_tryout is enabled, uid will be fasttryout. Format: `https://{endpoint_id}.{region}-{uid}.prediction.vertexai.goog`.",
    ).optional(),
    dedicatedEndpointEnabled: z.boolean().describe(
      "If true, the endpoint will be exposed through a dedicated DNS [Endpoint.dedicated_endpoint_dns]. Your request to the dedicated DNS will be isolated from other users' traffic and will have better performance and reliability. Note: Once you enabled dedicated endpoint, you won't be able to send request to the shared DNS {region}-aiplatform.googleapis.com. The limitation will be removed soon.",
    ).optional(),
    deployedModels: z.array(z.object({
      automaticResources: z.object({
        maxReplicaCount: z.number().int().describe(
          "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, a no upper bound for scaling under heavy traffic will be assume, though Vertex AI may be unable to scale beyond certain replica number.",
        ).optional(),
        minReplicaCount: z.number().int().describe(
          "Immutable. The minimum number of replicas that will be always deployed on. If traffic against it increases, it may dynamically be deployed onto more replicas up to max_replica_count, and as traffic decreases, some of these extra replicas may be freed. If the requested value is too large, the deployment will error.",
        ).optional(),
      }).describe(
        "A description of resources that to large degree are decided by Vertex AI, and require only a modest additional configuration. Each Model supporting these resources documents its specific guidelines.",
      ).optional(),
      checkpointId: z.string().describe("The checkpoint id of the model.")
        .optional(),
      createTime: z.string().describe(
        "Output only. Timestamp when the DeployedModel was created.",
      ).optional(),
      dedicatedResources: z.object({
        autoscalingMetricSpecs: z.array(z.object({
          metricName: z.string().describe(
            "Required. The resource metric name. Supported metrics: * For Online Prediction: * `aiplatform.googleapis.com/prediction/online/accelerator/duty_cycle` * `aiplatform.googleapis.com/prediction/online/cpu/utilization` * `aiplatform.googleapis.com/prediction/online/request_count` * `pubsub.googleapis.com/subscription/num_undelivered_messages` * `prometheus.googleapis.com/vertex_dcgm_fi_dev_gpu_util` * `prometheus.googleapis.com/vertex_vllm_gpu_cache_usage_perc` * `prometheus.googleapis.com/vertex_vllm_num_requests_waiting`",
          ).optional(),
          target: z.number().int().describe(
            "The target resource utilization in percentage (1% - 100%) for the given metric; once the real usage deviates from the target by a certain percentage, the machine replicas change. The default value is 60 (representing 60%) if not provided.",
          ).optional(),
        })).describe(
          "Immutable. The metric specifications that overrides a resource utilization metric (CPU utilization, accelerator's duty cycle, and so on) target value (default to 60 if not set). At most one entry is allowed per metric. If machine_spec.accelerator_count is above 0, the autoscaling will be based on both CPU utilization and accelerator's duty cycle metrics and scale up when either metrics exceeds its target value while scale down if both metrics are under their target value. The default target value is 60 for both metrics. If machine_spec.accelerator_count is 0, the autoscaling will be based on CPU utilization metric only with default target value 60 if not explicitly set. For example, in the case of Online Prediction, if you want to override target CPU utilization to 80, you should set autoscaling_metric_specs.metric_name to `aiplatform.googleapis.com/prediction/online/cpu/utilization` and autoscaling_metric_specs.target to `80`.",
        ).optional(),
        machineSpec: z.object({
          acceleratorCount: z.number().int().describe(
            "The number of accelerators to attach to the machine. For accelerator optimized machine types (https://cloud.google.com/compute/docs/accelerator-optimized-machines), One may set the accelerator_count from 1 to N for machine with N GPUs. If accelerator_count is less than or equal to N / 2, Vertex will co-schedule the replicas of the model into the same VM to save cost. For example, if the machine type is a3-highgpu-8g, which has 8 H100 GPUs, one can set accelerator_count to 1 to 8. If accelerator_count is 1, 2, 3, or 4, Vertex will co-schedule 8, 4, 2, or 2 replicas of the model into the same VM to save cost. When co-scheduling, CPU, memory and storage on the VM will be distributed to replicas on the VM. For example, one can expect a co-scheduled replica requesting 2 GPUs out of a 8-GPU VM will receive 25% of the CPU, memory and storage of the VM. Note that the feature is not compatible with multihost_gpu_node_count. When multihost_gpu_node_count is set, the co-scheduling will not be enabled.",
          ).optional(),
          acceleratorType: z.enum([
            "ACCELERATOR_TYPE_UNSPECIFIED",
            "NVIDIA_TESLA_K80",
            "NVIDIA_TESLA_P100",
            "NVIDIA_TESLA_V100",
            "NVIDIA_TESLA_P4",
            "NVIDIA_TESLA_T4",
            "NVIDIA_TESLA_A100",
            "NVIDIA_A100_80GB",
            "NVIDIA_L4",
            "NVIDIA_H100_80GB",
            "NVIDIA_H100_MEGA_80GB",
            "NVIDIA_H200_141GB",
            "NVIDIA_B200",
            "NVIDIA_GB200",
            "NVIDIA_RTX_PRO_6000",
            "TPU_V2",
            "TPU_V3",
            "TPU_V4_POD",
            "TPU_V5_LITEPOD",
          ]).describe(
            "Immutable. The type of accelerator(s) that may be attached to the machine as per accelerator_count.",
          ).optional(),
          gpuPartitionSize: z.string().describe(
            'Optional. Immutable. The Nvidia GPU partition size. When specified, the requested accelerators will be partitioned into smaller GPU partitions. For example, if the request is for 8 units of NVIDIA A100 GPUs, and gpu_partition_size="1g.10gb", the service will create 8 * 7 = 56 partitioned MIG instances. The partition size must be a value supported by the requested accelerator. Refer to [Nvidia GPU Partitioning](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus-multi#multi-instance_gpu_partitions) for the available partition sizes. If set, the accelerator_count should be set to 1.',
          ).optional(),
          machineType: z.string().describe(
            "Immutable. The type of the machine. See the [list of machine types supported for prediction](https://cloud.google.com/vertex-ai/docs/predictions/configure-compute#machine-types) See the [list of machine types supported for custom training](https://cloud.google.com/vertex-ai/docs/training/configure-compute#machine-types). For DeployedModel this field is optional, and the default value is `n1-standard-2`. For BatchPredictionJob or as part of WorkerPoolSpec this field is required.",
          ).optional(),
          reservationAffinity: z.object({
            key: z.string().describe(
              "Optional. Corresponds to the label key of a reservation resource. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.",
            ).optional(),
            reservationAffinityType: z.enum([
              "TYPE_UNSPECIFIED",
              "NO_RESERVATION",
              "ANY_RESERVATION",
              "SPECIFIC_RESERVATION",
            ]).describe("Required. Specifies the reservation affinity type.")
              .optional(),
            values: z.array(z.string()).describe(
              "Optional. Corresponds to the label values of a reservation resource. This must be the full resource name of the reservation or reservation block.",
            ).optional(),
          }).describe(
            "A ReservationAffinity can be used to configure a Vertex AI resource (e.g., a DeployedModel) to draw its Compute Engine resources from a Shared Reservation, or exclusively from on-demand capacity.",
          ).optional(),
          tpuTopology: z.string().describe(
            'Immutable. The topology of the TPUs. Corresponds to the TPU topologies available from GKE. (Example: tpu_topology: "2x2x1").',
          ).optional(),
        }).describe("Specification of a single machine.").optional(),
        maxReplicaCount: z.number().int().describe(
          "Immutable. The maximum number of replicas that may be deployed on when the traffic against it increases. If the requested value is too large, the deployment will error, but if deployment succeeds then the ability to scale to that many replicas is guaranteed (barring service outages). If traffic increases beyond what its replicas at maximum may handle, a portion of the traffic will be dropped. If this value is not provided, will use min_replica_count as the default value. The value of this field impacts the charge against Vertex CPU and GPU quotas. Specifically, you will be charged for (max_replica_count * number of cores in the selected machine type) and (max_replica_count * number of GPUs per replica in the selected machine type).",
        ).optional(),
        minReplicaCount: z.number().int().describe(
          "Required. Immutable. The minimum number of machine replicas that will be always deployed on. This value must be greater than or equal to 1. If traffic increases, it may dynamically be deployed onto more replicas, and as traffic decreases, some of these extra replicas may be freed.",
        ).optional(),
        requiredReplicaCount: z.number().int().describe(
          "Optional. Number of required available replicas for the deployment to succeed. This field is only needed when partial deployment/mutation is desired. If set, the deploy/mutate operation will succeed once available_replica_count reaches required_replica_count, and the rest of the replicas will be retried. If not set, the default required_replica_count will be min_replica_count.",
        ).optional(),
        spot: z.boolean().describe(
          "Optional. If true, schedule the deployment workload on [spot VMs](https://cloud.google.com/kubernetes-engine/docs/concepts/spot-vms).",
        ).optional(),
      }).describe(
        "A description of resources that are dedicated to a DeployedModel or DeployedIndex, and that need a higher degree of manual configuration.",
      ).optional(),
      disableContainerLogging: z.boolean().describe(
        "For custom-trained Models and AutoML Tabular Models, the container of the DeployedModel instances will send `stderr` and `stdout` streams to Cloud Logging by default. Please note that the logs incur cost, which are subject to [Cloud Logging pricing](https://cloud.google.com/logging/pricing). User can disable container logging by setting this flag to true.",
      ).optional(),
      disableExplanations: z.boolean().describe(
        "If true, deploy the model without explainable feature, regardless the existence of Model.explanation_spec or explanation_spec.",
      ).optional(),
      displayName: z.string().describe(
        "The display name of the DeployedModel. If not provided upon creation, the Model's display_name is used.",
      ).optional(),
      enableAccessLogging: z.boolean().describe(
        "If true, online prediction access logs are sent to Cloud Logging. These logs are like standard server access logs, containing information like timestamp and latency for each prediction request. Note that logs may incur a cost, especially if your project receives prediction requests at a high queries per second rate (QPS). Estimate your costs before enabling this option.",
      ).optional(),
      explanationSpec: z.object({
        metadata: z.object({
          featureAttributionsSchemaUri: z.string().describe(
            "Points to a YAML file stored on Google Cloud Storage describing the format of the feature attributions. The schema is defined as an OpenAPI 3.0.2 [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.2.md#schemaObject). AutoML tabular Models always have this field populated by Vertex AI. Note: The URI given on output may be different, including the URI scheme, than the one given on input. The output URI will point to a location where the user only has a read access.",
          ).optional(),
          inputs: z.record(
            z.string(),
            z.object({
              denseShapeTensorName: z.string().describe(
                "Specifies the shape of the values of the input if the input is a sparse representation. Refer to Tensorflow documentation for more details: https://www.tensorflow.org/api_docs/python/tf/sparse/SparseTensor.",
              ).optional(),
              encodedBaselines: z.array(z.string()).describe(
                "A list of baselines for the encoded tensor. The shape of each baseline should match the shape of the encoded tensor. If a scalar is provided, Vertex AI broadcasts to the same shape as the encoded tensor.",
              ).optional(),
              encodedTensorName: z.string().describe(
                "Encoded tensor is a transformation of the input tensor. Must be provided if choosing Integrated Gradients attribution or XRAI attribution and the input tensor is not differentiable. An encoded tensor is generated if the input tensor is encoded by a lookup table.",
              ).optional(),
              encoding: z.enum([
                "ENCODING_UNSPECIFIED",
                "IDENTITY",
                "BAG_OF_FEATURES",
                "BAG_OF_FEATURES_SPARSE",
                "INDICATOR",
                "COMBINED_EMBEDDING",
                "CONCAT_EMBEDDING",
              ]).describe(
                "Defines how the feature is encoded into the input tensor. Defaults to IDENTITY.",
              ).optional(),
              featureValueDomain: z.object({
                maxValue: z.number().describe(
                  "The maximum permissible value for this feature.",
                ).optional(),
                minValue: z.number().describe(
                  "The minimum permissible value for this feature.",
                ).optional(),
                originalMean: z.number().describe(
                  "If this input feature has been normalized to a mean value of 0, the original_mean specifies the mean value of the domain prior to normalization.",
                ).optional(),
                originalStddev: z.number().describe(
                  "If this input feature has been normalized to a standard deviation of 1.0, the original_stddev specifies the standard deviation of the domain prior to normalization.",
                ).optional(),
              }).describe(
                "Domain details of the input feature value. Provides numeric information about the feature, such as its range (min, max). If the feature has been pre-processed, for example with z-scoring, then it provides information about how to recover the original feature. For example, if the input feature is an image and it has been pre-processed to obtain 0-mean and stddev = 1 values, then original_mean, and original_stddev refer to the mean and stddev of the original feature (e.g. image tensor) from which input feature (with mean = 0 and stddev = 1) was obtained.",
              ).optional(),
              groupName: z.string().describe(
                "Name of the group that the input belongs to. Features with the same group name will be treated as one feature when computing attributions. Features grouped together can have different shapes in value. If provided, there will be one single attribution generated in Attribution.feature_attributions, keyed by the group name.",
              ).optional(),
              indexFeatureMapping: z.array(z.string()).describe(
                "A list of feature names for each index in the input tensor. Required when the input InputMetadata.encoding is BAG_OF_FEATURES, BAG_OF_FEATURES_SPARSE, INDICATOR.",
              ).optional(),
              indicesTensorName: z.string().describe(
                "Specifies the index of the values of the input tensor. Required when the input tensor is a sparse representation. Refer to Tensorflow documentation for more details: https://www.tensorflow.org/api_docs/python/tf/sparse/SparseTensor.",
              ).optional(),
              inputBaselines: z.array(z.string()).describe(
                "Baseline inputs for this feature. If no baseline is specified, Vertex AI chooses the baseline for this feature. If multiple baselines are specified, Vertex AI returns the average attributions across them in Attribution.feature_attributions. For Vertex AI-provided Tensorflow images (both 1.x and 2.x), the shape of each baseline must match the shape of the input tensor. If a scalar is provided, we broadcast to the same shape as the input tensor. For custom images, the element of the baselines must be in the same format as the feature's input in the instance[]. The schema of any single instance may be specified via Endpoint's DeployedModels' Model's PredictSchemata's instance_schema_uri.",
              ).optional(),
              inputTensorName: z.string().describe(
                "Name of the input tensor for this feature. Required and is only applicable to Vertex AI-provided images for Tensorflow.",
              ).optional(),
              modality: z.string().describe(
                "Modality of the feature. Valid values are: numeric, image. Defaults to numeric.",
              ).optional(),
              visualization: z.object({
                clipPercentLowerbound: z.number().describe(
                  "Excludes attributions below the specified percentile, from the highlighted areas. Defaults to 62.",
                ).optional(),
                clipPercentUpperbound: z.number().describe(
                  "Excludes attributions above the specified percentile from the highlighted areas. Using the clip_percent_upperbound and clip_percent_lowerbound together can be useful for filtering out noise and making it easier to see areas of strong attribution. Defaults to 99.9.",
                ).optional(),
                colorMap: z.enum([
                  "COLOR_MAP_UNSPECIFIED",
                  "PINK_GREEN",
                  "VIRIDIS",
                  "RED",
                  "GREEN",
                  "RED_GREEN",
                  "PINK_WHITE_GREEN",
                ]).describe(
                  "The color scheme used for the highlighted areas. Defaults to PINK_GREEN for Integrated Gradients attribution, which shows positive attributions in green and negative in pink. Defaults to VIRIDIS for XRAI attribution, which highlights the most influential regions in yellow and the least influential in blue.",
                ).optional(),
                overlayType: z.enum([
                  "OVERLAY_TYPE_UNSPECIFIED",
                  "NONE",
                  "ORIGINAL",
                  "GRAYSCALE",
                  "MASK_BLACK",
                ]).describe(
                  "How the original image is displayed in the visualization. Adjusting the overlay can help increase visual clarity if the original image makes it difficult to view the visualization. Defaults to NONE.",
                ).optional(),
                polarity: z.enum([
                  "POLARITY_UNSPECIFIED",
                  "POSITIVE",
                  "NEGATIVE",
                  "BOTH",
                ]).describe(
                  "Whether to only highlight pixels with positive contributions, negative or both. Defaults to POSITIVE.",
                ).optional(),
                type: z.enum(["TYPE_UNSPECIFIED", "PIXELS", "OUTLINES"])
                  .describe(
                    "Type of the image visualization. Only applicable to Integrated Gradients attribution. OUTLINES shows regions of attribution, while PIXELS shows per-pixel attribution. Defaults to OUTLINES.",
                  ).optional(),
              }).describe("Visualization configurations for image explanation.")
                .optional(),
            }),
          ).describe(
            "Required. Map from feature names to feature input metadata. Keys are the name of the features. Values are the specification of the feature. An empty InputMetadata is valid. It describes a text feature which has the name specified as the key in ExplanationMetadata.inputs. The baseline of the empty feature is chosen by Vertex AI. For Vertex AI-provided Tensorflow images, the key can be any friendly name of the feature. Once specified, featureAttributions are keyed by this key (if not grouped with another feature). For custom images, the key must match with the key in instance.",
          ).optional(),
          latentSpaceSource: z.string().describe(
            "Name of the source to generate embeddings for example based explanations.",
          ).optional(),
          outputs: z.record(
            z.string(),
            z.object({
              displayNameMappingKey: z.string().describe(
                "Specify a field name in the prediction to look for the display name. Use this if the prediction contains the display names for the outputs. The display names in the prediction must have the same shape of the outputs, so that it can be located by Attribution.output_index for a specific output.",
              ).optional(),
              indexDisplayNameMapping: z.string().describe(
                "Static mapping between the index and display name. Use this if the outputs are a deterministic n-dimensional array, e.g. a list of scores of all the classes in a pre-defined order for a multi-classification Model. It's not feasible if the outputs are non-deterministic, e.g. the Model produces top-k classes or sort the outputs by their values. The shape of the value must be an n-dimensional array of strings. The number of dimensions must match that of the outputs to be explained. The Attribution.output_display_name is populated by locating in the mapping with Attribution.output_index.",
              ).optional(),
              outputTensorName: z.string().describe(
                "Name of the output tensor. Required and is only applicable to Vertex AI provided images for Tensorflow.",
              ).optional(),
            }),
          ).describe(
            "Required. Map from output names to output metadata. For Vertex AI-provided Tensorflow images, keys can be any user defined string that consists of any UTF-8 characters. For custom images, keys are the name of the output field in the prediction to be explained. Currently only one key is allowed.",
          ).optional(),
        }).describe(
          "Metadata describing the Model's input and output for explanation.",
        ).optional(),
        parameters: z.object({
          examples: z.object({
            exampleGcsSource: z.object({
              dataFormat: z.enum(["DATA_FORMAT_UNSPECIFIED", "JSONL"]).describe(
                "The format in which instances are given, if not specified, assume it's JSONL format. Currently only JSONL format is supported.",
              ).optional(),
              gcsSource: z.object({
                uris: z.array(z.string()).describe(
                  "Required. Google Cloud Storage URI(-s) to the input file(s). May contain wildcards. For more information on wildcards, see https://cloud.google.com/storage/docs/wildcards.",
                ).optional(),
              }).describe(
                "The Google Cloud Storage location for the input content.",
              ).optional(),
            }).describe("The Cloud Storage input instances.").optional(),
            nearestNeighborSearchConfig: z.string().describe(
              "The full configuration for the generated index, the semantics are the same as metadata and should match [NearestNeighborSearchConfig](https://cloud.google.com/vertex-ai/docs/explainable-ai/configuring-explanations-example-based#nearest-neighbor-search-config).",
            ).optional(),
            neighborCount: z.number().int().describe(
              "The number of neighbors to return when querying for examples.",
            ).optional(),
            presets: z.object({
              modality: z.enum([
                "MODALITY_UNSPECIFIED",
                "IMAGE",
                "TEXT",
                "TABULAR",
              ]).describe(
                "The modality of the uploaded model, which automatically configures the distance measurement and feature normalization for the underlying example index and queries. If your model does not precisely fit one of these types, it is okay to choose the closest type.",
              ).optional(),
              query: z.enum(["PRECISE", "FAST"]).describe(
                "Preset option controlling parameters for speed-precision trade-off when querying for examples. If omitted, defaults to `PRECISE`.",
              ).optional(),
            }).describe("Preset configuration for example-based explanations")
              .optional(),
          }).describe(
            "Example-based explainability that returns the nearest neighbors from the provided dataset.",
          ).optional(),
          integratedGradientsAttribution: z.object({
            blurBaselineConfig: z.object({
              maxBlurSigma: z.number().describe(
                "The standard deviation of the blur kernel for the blurred baseline. The same blurring parameter is used for both the height and the width dimension. If not set, the method defaults to the zero (i.e. black for images) baseline.",
              ).optional(),
            }).describe(
              "Config for blur baseline. When enabled, a linear path from the maximally blurred image to the input image is created. Using a blurred baseline instead of zero (black image) is motivated by the BlurIG approach explained here: https://arxiv.org/abs/2004.03383",
            ).optional(),
            smoothGradConfig: z.object({
              featureNoiseSigma: z.object({
                noiseSigma: z.array(z.object({
                  name: z.string().describe(
                    "The name of the input feature for which noise sigma is provided. The features are defined in explanation metadata inputs.",
                  ).optional(),
                  sigma: z.number().describe(
                    "This represents the standard deviation of the Gaussian kernel that will be used to add noise to the feature prior to computing gradients. Similar to noise_sigma but represents the noise added to the current feature. Defaults to 0.1.",
                  ).optional(),
                })).describe(
                  "Noise sigma per feature. No noise is added to features that are not set.",
                ).optional(),
              }).describe(
                "Noise sigma by features. Noise sigma represents the standard deviation of the gaussian kernel that will be used to add noise to interpolated inputs prior to computing gradients.",
              ).optional(),
              noiseSigma: z.number().describe(
                "This is a single float value and will be used to add noise to all the features. Use this field when all features are normalized to have the same distribution: scale to range [0, 1], [-1, 1] or z-scoring, where features are normalized to have 0-mean and 1-variance. Learn more about [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). For best results the recommended value is about 10% - 20% of the standard deviation of the input feature. Refer to section 3.2 of the SmoothGrad paper: https://arxiv.org/pdf/1706.03825.pdf. Defaults to 0.1. If the distribution is different per feature, set feature_noise_sigma instead for each feature.",
              ).optional(),
              noisySampleCount: z.number().int().describe(
                "The number of gradient samples to use for approximation. The higher this number, the more accurate the gradient is, but the runtime complexity increases by this factor as well. Valid range of its value is [1, 50]. Defaults to 3.",
              ).optional(),
            }).describe(
              "Config for SmoothGrad approximation of gradients. When enabled, the gradients are approximated by averaging the gradients from noisy samples in the vicinity of the inputs. Adding noise can help improve the computed gradients. Refer to this paper for more details: https://arxiv.org/pdf/1706.03825.pdf",
            ).optional(),
            stepCount: z.number().int().describe(
              "Required. The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is within the desired error range. Valid range of its value is [1, 100], inclusively.",
            ).optional(),
          }).describe(
            "An attribution method that computes the Aumann-Shapley value taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1703.01365",
          ).optional(),
          outputIndices: z.array(z.string()).describe(
            "If populated, only returns attributions that have output_index contained in output_indices. It must be an ndarray of integers, with the same shape of the output it's explaining. If not populated, returns attributions for top_k indices of outputs. If neither top_k nor output_indices is populated, returns the argmax index of the outputs. Only applicable to Models that predict multiple outputs (e,g, multi-class Models that predict multiple classes).",
          ).optional(),
          sampledShapleyAttribution: z.object({
            pathCount: z.number().int().describe(
              "Required. The number of feature permutations to consider when approximating the Shapley values. Valid range of its value is [1, 50], inclusively.",
            ).optional(),
          }).describe(
            "An attribution method that approximates Shapley values for features that contribute to the label being predicted. A sampling strategy is used to approximate the value rather than considering all subsets of features.",
          ).optional(),
          topK: z.number().int().describe(
            "If populated, returns attributions for top K indices of outputs (defaults to 1). Only applies to Models that predicts more than one outputs (e,g, multi-class Models). When set to -1, returns explanations for all outputs.",
          ).optional(),
          xraiAttribution: z.object({
            blurBaselineConfig: z.object({
              maxBlurSigma: z.number().describe(
                "The standard deviation of the blur kernel for the blurred baseline. The same blurring parameter is used for both the height and the width dimension. If not set, the method defaults to the zero (i.e. black for images) baseline.",
              ).optional(),
            }).describe(
              "Config for blur baseline. When enabled, a linear path from the maximally blurred image to the input image is created. Using a blurred baseline instead of zero (black image) is motivated by the BlurIG approach explained here: https://arxiv.org/abs/2004.03383",
            ).optional(),
            smoothGradConfig: z.object({
              featureNoiseSigma: z.object({
                noiseSigma: z.array(z.object({
                  name: z.string().describe(
                    "The name of the input feature for which noise sigma is provided. The features are defined in explanation metadata inputs.",
                  ).optional(),
                  sigma: z.number().describe(
                    "This represents the standard deviation of the Gaussian kernel that will be used to add noise to the feature prior to computing gradients. Similar to noise_sigma but represents the noise added to the current feature. Defaults to 0.1.",
                  ).optional(),
                })).describe(
                  "Noise sigma per feature. No noise is added to features that are not set.",
                ).optional(),
              }).describe(
                "Noise sigma by features. Noise sigma represents the standard deviation of the gaussian kernel that will be used to add noise to interpolated inputs prior to computing gradients.",
              ).optional(),
              noiseSigma: z.number().describe(
                "This is a single float value and will be used to add noise to all the features. Use this field when all features are normalized to have the same distribution: scale to range [0, 1], [-1, 1] or z-scoring, where features are normalized to have 0-mean and 1-variance. Learn more about [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). For best results the recommended value is about 10% - 20% of the standard deviation of the input feature. Refer to section 3.2 of the SmoothGrad paper: https://arxiv.org/pdf/1706.03825.pdf. Defaults to 0.1. If the distribution is different per feature, set feature_noise_sigma instead for each feature.",
              ).optional(),
              noisySampleCount: z.number().int().describe(
                "The number of gradient samples to use for approximation. The higher this number, the more accurate the gradient is, but the runtime complexity increases by this factor as well. Valid range of its value is [1, 50]. Defaults to 3.",
              ).optional(),
            }).describe(
              "Config for SmoothGrad approximation of gradients. When enabled, the gradients are approximated by averaging the gradients from noisy samples in the vicinity of the inputs. Adding noise can help improve the computed gradients. Refer to this paper for more details: https://arxiv.org/pdf/1706.03825.pdf",
            ).optional(),
            stepCount: z.number().int().describe(
              "Required. The number of steps for approximating the path integral. A good value to start is 50 and gradually increase until the sum to diff property is met within the desired error range. Valid range of its value is [1, 100], inclusively.",
            ).optional(),
          }).describe(
            "An explanation method that redistributes Integrated Gradients attributions to segmented regions, taking advantage of the model's fully differentiable structure. Refer to this paper for more details: https://arxiv.org/abs/1906.02825 Supported only by image Models.",
          ).optional(),
        }).describe(
          "Parameters to configure explaining for Model's predictions.",
        ).optional(),
      }).describe("Specification of Model explanation.").optional(),
      fasterDeploymentConfig: z.object({
        fastTryoutEnabled: z.boolean().describe(
          "If true, enable fast tryout feature for this deployed model.",
        ).optional(),
      }).describe("Configuration for faster model deployment.").optional(),
      gdcConnectedModel: z.string().describe(
        "GDC pretrained / Gemini model name. The model name is a plain model name, e.g. gemini-1.5-flash-002.",
      ).optional(),
      id: z.string().describe(
        "Immutable. The ID of the DeployedModel. If not provided upon deployment, Vertex AI will generate a value for this ID. This value should be 1-10 characters, and valid characters are `/[0-9]/`.",
      ).optional(),
      model: z.string().describe(
        "The resource name of the Model that this is the deployment of. Note that the Model may be in a different location than the DeployedModel's Endpoint. The resource name may contain version id or version alias to specify the version. Example: `projects/{project}/locations/{location}/models/{model}@2` or `projects/{project}/locations/{location}/models/{model}@golden` if no version is specified, the default version will be deployed.",
      ).optional(),
      modelVersionId: z.string().describe(
        "Output only. The version ID of the model that is deployed.",
      ).optional(),
      privateEndpoints: z.object({
        explainHttpUri: z.string().describe(
          "Output only. Http(s) path to send explain requests.",
        ).optional(),
        healthHttpUri: z.string().describe(
          "Output only. Http(s) path to send health check requests.",
        ).optional(),
        predictHttpUri: z.string().describe(
          "Output only. Http(s) path to send prediction requests.",
        ).optional(),
        serviceAttachment: z.string().describe(
          "Output only. The name of the service attachment resource. Populated if private service connect is enabled.",
        ).optional(),
      }).describe(
        "PrivateEndpoints proto is used to provide paths for users to send requests privately. To send request via private service access, use predict_http_uri, explain_http_uri or health_http_uri. To send request via private service connect, use service_attachment.",
      ).optional(),
      serviceAccount: z.string().describe(
        "The service account that the DeployedModel's container runs as. Specify the email address of the service account. If this service account is not specified, the container runs as a service account that doesn't have access to the resource project. Users deploying the Model must have the `iam.serviceAccounts.actAs` permission on this service account.",
      ).optional(),
      sharedResources: z.string().describe(
        "The resource name of the shared DeploymentResourcePool to deploy on. Format: `projects/{project}/locations/{location}/deploymentResourcePools/{deployment_resource_pool}`",
      ).optional(),
      speculativeDecodingSpec: z.object({
        draftModelSpeculation: z.object({
          draftModel: z.string().describe(
            "Required. The resource name of the draft model.",
          ).optional(),
        }).describe(
          "Draft model speculation works by using the smaller model to generate candidate tokens for speculative decoding.",
        ).optional(),
        ngramSpeculation: z.object({
          ngramSize: z.number().int().describe(
            "The number of last N input tokens used as ngram to search/match against the previous prompt sequence. This is equal to the N in N-Gram. The default value is 3 if not specified.",
          ).optional(),
        }).describe(
          "N-Gram speculation works by trying to find matching tokens in the previous prompt sequence and use those as speculation for generating new tokens.",
        ).optional(),
        speculativeTokenCount: z.number().int().describe(
          "The number of speculative tokens to generate at each step.",
        ).optional(),
      }).describe("Configuration for Speculative Decoding.").optional(),
      status: z.object({
        availableReplicaCount: z.number().int().describe(
          "Output only. The number of available replicas of the deployed model.",
        ).optional(),
        lastUpdateTime: z.string().describe(
          "Output only. The time at which the status was last updated.",
        ).optional(),
        message: z.string().describe(
          "Output only. The latest deployed model's status message (if any).",
        ).optional(),
      }).describe("Runtime status of the deployed model.").optional(),
      systemLabels: z.record(z.string(), z.string()).describe(
        "System labels to apply to Model Garden deployments. System labels are managed by Google for internal use only.",
      ).optional(),
    })).describe(
      "Output only. The models deployed in this Endpoint. To add or remove DeployedModels use EndpointService.DeployModel and EndpointService.UndeployModel respectively.",
    ).optional(),
    description: z.string().describe("The description of the Endpoint.")
      .optional(),
    displayName: z.string().describe(
      "Required. The display name of the Endpoint. The name can be up to 128 characters long and can consist of any UTF-8 characters.",
    ).optional(),
    enablePrivateServiceConnect: z.boolean().describe(
      "Deprecated: If true, expose the Endpoint via private service connect. Only one of the fields, network or enable_private_service_connect, can be set.",
    ).optional(),
    encryptionSpec: z.object({
      kmsKeyName: z.string().describe(
        "Required. Resource name of the Cloud KMS key used to protect the resource. The Cloud KMS key must be in the same region as the resource. It must have the format `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`.",
      ).optional(),
    }).describe(
      "Represents a customer-managed encryption key specification that can be applied to a Vertex AI resource.",
    ).optional(),
    etag: z.string().describe(
      'Used to perform consistent read-modify-write updates. If not set, a blind "overwrite" update happens.',
    ).optional(),
    gdcConfig: z.object({
      zone: z.string().describe(
        "GDC zone. A cluster will be designated for the Vertex AI workload in this zone.",
      ).optional(),
    }).describe("Google Distributed Cloud (GDC) config.").optional(),
    genAiAdvancedFeaturesConfig: z.object({
      ragConfig: z.object({
        enableRag: z.boolean().describe(
          "If true, enable Retrieval Augmented Generation in ChatCompletion request. Once enabled, the endpoint will be identified as GenAI endpoint and Arthedain router will be used.",
        ).optional(),
      }).describe("Configuration for Retrieval Augmented Generation feature.")
        .optional(),
    }).describe("Configuration for GenAiAdvancedFeatures.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels with user-defined metadata to organize your Endpoints. Label keys and values can be no longer than 64 characters (Unicode codepoints), can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. See https://goo.gl/xmQnxf for more information and examples of labels.",
    ).optional(),
    modelDeploymentMonitoringJob: z.string().describe(
      "Output only. Resource name of the Model Monitoring job associated with this Endpoint if monitoring is enabled by JobService.CreateModelDeploymentMonitoringJob. Format: `projects/{project}/locations/{location}/modelDeploymentMonitoringJobs/{model_deployment_monitoring_job}`",
    ).optional(),
    name: z.string().describe("Identifier. The resource name of the Endpoint.")
      .optional(),
    network: z.string().describe(
      "Optional. The full name of the Google Compute Engine [network](https://cloud.google.com//compute/docs/networks-and-firewalls#networks) to which the Endpoint should be peered. Private services access must already be configured for the network. If left unspecified, the Endpoint is not peered with any network. Only one of the fields, network or enable_private_service_connect, can be set. [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/insert): `projects/{project}/global/networks/{network}`. Where `{project}` is a project number, as in `12345`, and `{network}` is network name.",
    ).optional(),
    predictRequestResponseLoggingConfig: z.object({
      bigqueryDestination: z.object({
        outputUri: z.string().describe(
          "Required. BigQuery URI to a project or table, up to 2000 characters long. When only the project is specified, the Dataset and Table is created. When the full table reference is specified, the Dataset must exist and table must not exist. Accepted forms: * BigQuery path. For example: `bq://projectId` or `bq://projectId.bqDatasetId` or `bq://projectId.bqDatasetId.bqTableId`.",
        ).optional(),
      }).describe("The BigQuery location for the output content.").optional(),
      enabled: z.boolean().describe("If logging is enabled or not.").optional(),
      samplingRate: z.number().describe(
        "Percentage of requests to be logged, expressed as a fraction in range(0,1].",
      ).optional(),
    }).describe(
      "Configuration for logging request-response to a BigQuery table.",
    ).optional(),
    privateServiceConnectConfig: z.object({
      enablePrivateServiceConnect: z.boolean().describe(
        "Required. If true, expose the IndexEndpoint via private service connect.",
      ).optional(),
      projectAllowlist: z.array(z.string()).describe(
        "A list of Projects from which the forwarding rule will target the service attachment.",
      ).optional(),
      pscAutomationConfigs: z.array(z.object({
        errorMessage: z.string().describe(
          "Output only. Error message if the PSC service automation failed.",
        ).optional(),
        forwardingRule: z.string().describe(
          "Output only. Forwarding rule created by the PSC service automation.",
        ).optional(),
        ipAddress: z.string().describe(
          "Output only. IP address rule created by the PSC service automation.",
        ).optional(),
        network: z.string().describe(
          "Required. The full name of the Google Compute Engine [network](https://cloud.google.com/compute/docs/networks-and-firewalls#networks). [Format](https://cloud.google.com/compute/docs/reference/rest/v1/networks/get): `projects/{project}/global/networks/{network}`.",
        ).optional(),
        projectId: z.string().describe(
          "Required. Project id used to create forwarding rule.",
        ).optional(),
        state: z.enum([
          "PSC_AUTOMATION_STATE_UNSPECIFIED",
          "PSC_AUTOMATION_STATE_SUCCESSFUL",
          "PSC_AUTOMATION_STATE_FAILED",
        ]).describe("Output only. The state of the PSC service automation.")
          .optional(),
      })).describe(
        "Optional. List of projects and networks where the PSC endpoints will be created. This field is used by Online Inference(Prediction) only.",
      ).optional(),
      serviceAttachment: z.string().describe(
        "Output only. The name of the generated service attachment resource. This is only populated if the endpoint is deployed with PrivateServiceConnect.",
      ).optional(),
    }).describe("Represents configuration for private service connect.")
      .optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    trafficSplit: z.record(z.string(), z.number().int()).describe(
      "A map from a DeployedModel's ID to the percentage of this Endpoint's traffic that should be forwarded to that DeployedModel. If a DeployedModel's ID is not listed in this map, then it receives no traffic. The traffic percentage values must add up to 100, or map must be empty if the Endpoint is to not accept any traffic at a moment.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. Timestamp when this Endpoint was last updated.",
    ).optional(),
  }).describe(
    "Models are deployed into it, and afterwards Endpoint is called to obtain predictions and explanations.",
  ).optional(),
  endpointId: z.string().describe(
    "Immutable. The ID to use for endpoint, which will become the final component of the endpoint resource name. If not provided, Vertex AI will generate a value for this ID. If the first character is a letter, this value may be up to 63 characters, and valid characters are `[a-z0-9-]`. The last character must be a letter or number. If the first character is a number, this value may be up to 9 characters, and valid characters are `[0-9]` with no leading zeros. When using HTTP/JSON, this field is populated based on a query string argument, such as `?endpoint_id=12345`. This is the fallback for fields that are not included in either the URI or the body.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/aiplatform/endpoints",
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
        "Models are deployed into it, and afterwards Endpoint is called to obtain pred...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a endpoints",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["clientConnectionConfig"] !== undefined) {
          body["clientConnectionConfig"] = g["clientConnectionConfig"];
        }
        if (g["dedicatedEndpointEnabled"] !== undefined) {
          body["dedicatedEndpointEnabled"] = g["dedicatedEndpointEnabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["gdcConfig"] !== undefined) body["gdcConfig"] = g["gdcConfig"];
        if (g["genAiAdvancedFeaturesConfig"] !== undefined) {
          body["genAiAdvancedFeaturesConfig"] =
            g["genAiAdvancedFeaturesConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["predictRequestResponseLoggingConfig"] !== undefined) {
          body["predictRequestResponseLoggingConfig"] =
            g["predictRequestResponseLoggingConfig"];
        }
        if (g["privateServiceConnectConfig"] !== undefined) {
          body["privateServiceConnectConfig"] =
            g["privateServiceConnectConfig"];
        }
        if (g["trafficSplit"] !== undefined) {
          body["trafficSplit"] = g["trafficSplit"];
        }
        if (g["endpointId"] !== undefined) body["endpointId"] = g["endpointId"];
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
      description: "Get a endpoints",
      arguments: z.object({
        identifier: z.string().describe("The name of the endpoints"),
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
    update: {
      description: "Update endpoints attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["clientConnectionConfig"] !== undefined) {
          body["clientConnectionConfig"] = g["clientConnectionConfig"];
        }
        if (g["dedicatedEndpointEnabled"] !== undefined) {
          body["dedicatedEndpointEnabled"] = g["dedicatedEndpointEnabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionSpec"] !== undefined) {
          body["encryptionSpec"] = g["encryptionSpec"];
        }
        if (g["gdcConfig"] !== undefined) body["gdcConfig"] = g["gdcConfig"];
        if (g["genAiAdvancedFeaturesConfig"] !== undefined) {
          body["genAiAdvancedFeaturesConfig"] =
            g["genAiAdvancedFeaturesConfig"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["predictRequestResponseLoggingConfig"] !== undefined) {
          body["predictRequestResponseLoggingConfig"] =
            g["predictRequestResponseLoggingConfig"];
        }
        if (g["privateServiceConnectConfig"] !== undefined) {
          body["privateServiceConnectConfig"] =
            g["privateServiceConnectConfig"];
        }
        if (g["trafficSplit"] !== undefined) {
          body["trafficSplit"] = g["trafficSplit"];
        }
        if (g["endpoint"] !== undefined) body["endpoint"] = g["endpoint"];
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
          UPDATE_CONFIG,
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
      description: "Delete the endpoints",
      arguments: z.object({
        identifier: z.string().describe("The name of the endpoints"),
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
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
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
      description: "Sync endpoints state from GCP",
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
    compute_tokens: {
      description: "compute tokens",
      arguments: z.object({
        contents: z.any().optional(),
        instances: z.any().optional(),
        model: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["model"] !== undefined) body["model"] = args["model"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.computeTokens",
            "path": "v1/{+endpoint}:computeTokens",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    count_tokens: {
      description: "count tokens",
      arguments: z.object({
        contents: z.any().optional(),
        generationConfig: z.any().optional(),
        instances: z.any().optional(),
        model: z.any().optional(),
        systemInstruction: z.any().optional(),
        tools: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["generationConfig"] !== undefined) {
          body["generationConfig"] = args["generationConfig"];
        }
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["model"] !== undefined) body["model"] = args["model"];
        if (args["systemInstruction"] !== undefined) {
          body["systemInstruction"] = args["systemInstruction"];
        }
        if (args["tools"] !== undefined) body["tools"] = args["tools"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.countTokens",
            "path": "v1/{+endpoint}:countTokens",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    deploy_model: {
      description: "deploy model",
      arguments: z.object({
        deployedModel: z.any().optional(),
        trafficSplit: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["deployedModel"] !== undefined) {
          body["deployedModel"] = args["deployedModel"];
        }
        if (args["trafficSplit"] !== undefined) {
          body["trafficSplit"] = args["trafficSplit"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.deployModel",
            "path": "v1/{+endpoint}:deployModel",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    direct_predict: {
      description: "direct predict",
      arguments: z.object({
        inputs: z.any().optional(),
        parameters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["inputs"] !== undefined) body["inputs"] = args["inputs"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.directPredict",
            "path": "v1/{+endpoint}:directPredict",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    direct_raw_predict: {
      description: "direct raw predict",
      arguments: z.object({
        input: z.any().optional(),
        methodName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["input"] !== undefined) body["input"] = args["input"];
        if (args["methodName"] !== undefined) {
          body["methodName"] = args["methodName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.directRawPredict",
            "path": "v1/{+endpoint}:directRawPredict",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    explain: {
      description: "explain",
      arguments: z.object({
        deployedModelId: z.any().optional(),
        explanationSpecOverride: z.any().optional(),
        instances: z.any().optional(),
        parameters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["deployedModelId"] !== undefined) {
          body["deployedModelId"] = args["deployedModelId"];
        }
        if (args["explanationSpecOverride"] !== undefined) {
          body["explanationSpecOverride"] = args["explanationSpecOverride"];
        }
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.explain",
            "path": "v1/{+endpoint}:explain",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    fetch_predict_operation: {
      description: "fetch predict operation",
      arguments: z.object({
        operationName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["operationName"] !== undefined) {
          body["operationName"] = args["operationName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.endpoints.fetchPredictOperation",
            "path": "v1/{+endpoint}:fetchPredictOperation",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_content: {
      description: "generate content",
      arguments: z.object({
        cachedContent: z.any().optional(),
        contents: z.any().optional(),
        generationConfig: z.any().optional(),
        labels: z.any().optional(),
        modelArmorConfig: z.any().optional(),
        safetySettings: z.any().optional(),
        systemInstruction: z.any().optional(),
        toolConfig: z.any().optional(),
        tools: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["model"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["cachedContent"] !== undefined) {
          body["cachedContent"] = args["cachedContent"];
        }
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["generationConfig"] !== undefined) {
          body["generationConfig"] = args["generationConfig"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["modelArmorConfig"] !== undefined) {
          body["modelArmorConfig"] = args["modelArmorConfig"];
        }
        if (args["safetySettings"] !== undefined) {
          body["safetySettings"] = args["safetySettings"];
        }
        if (args["systemInstruction"] !== undefined) {
          body["systemInstruction"] = args["systemInstruction"];
        }
        if (args["toolConfig"] !== undefined) {
          body["toolConfig"] = args["toolConfig"];
        }
        if (args["tools"] !== undefined) body["tools"] = args["tools"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.generateContent",
            "path": "v1/{+model}:generateContent",
            "httpMethod": "POST",
            "parameterOrder": ["model"],
            "parameters": { "model": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    mutate_deployed_model: {
      description: "mutate deployed model",
      arguments: z.object({
        deployedModel: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["deployedModel"] !== undefined) {
          body["deployedModel"] = args["deployedModel"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.mutateDeployedModel",
            "path": "v1/{+endpoint}:mutateDeployedModel",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    predict: {
      description: "predict",
      arguments: z.object({
        instances: z.any().optional(),
        labels: z.any().optional(),
        parameters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.predict",
            "path": "v1/{+endpoint}:predict",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    predict_long_running: {
      description: "predict long running",
      arguments: z.object({
        instances: z.any().optional(),
        labels: z.any().optional(),
        parameters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["instances"] !== undefined) {
          body["instances"] = args["instances"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.predictLongRunning",
            "path": "v1/{+endpoint}:predictLongRunning",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    raw_predict: {
      description: "raw predict",
      arguments: z.object({
        httpBody: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["httpBody"] !== undefined) body["httpBody"] = args["httpBody"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.rawPredict",
            "path": "v1/{+endpoint}:rawPredict",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    server_streaming_predict: {
      description: "server streaming predict",
      arguments: z.object({
        inputs: z.any().optional(),
        parameters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["inputs"] !== undefined) body["inputs"] = args["inputs"];
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.endpoints.serverStreamingPredict",
            "path": "v1/{+endpoint}:serverStreamingPredict",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    stream_generate_content: {
      description: "stream generate content",
      arguments: z.object({
        cachedContent: z.any().optional(),
        contents: z.any().optional(),
        generationConfig: z.any().optional(),
        labels: z.any().optional(),
        modelArmorConfig: z.any().optional(),
        safetySettings: z.any().optional(),
        systemInstruction: z.any().optional(),
        toolConfig: z.any().optional(),
        tools: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["model"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["cachedContent"] !== undefined) {
          body["cachedContent"] = args["cachedContent"];
        }
        if (args["contents"] !== undefined) body["contents"] = args["contents"];
        if (args["generationConfig"] !== undefined) {
          body["generationConfig"] = args["generationConfig"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["modelArmorConfig"] !== undefined) {
          body["modelArmorConfig"] = args["modelArmorConfig"];
        }
        if (args["safetySettings"] !== undefined) {
          body["safetySettings"] = args["safetySettings"];
        }
        if (args["systemInstruction"] !== undefined) {
          body["systemInstruction"] = args["systemInstruction"];
        }
        if (args["toolConfig"] !== undefined) {
          body["toolConfig"] = args["toolConfig"];
        }
        if (args["tools"] !== undefined) body["tools"] = args["tools"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "aiplatform.projects.locations.endpoints.streamGenerateContent",
            "path": "v1/{+model}:streamGenerateContent",
            "httpMethod": "POST",
            "parameterOrder": ["model"],
            "parameters": { "model": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    stream_raw_predict: {
      description: "stream raw predict",
      arguments: z.object({
        httpBody: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["httpBody"] !== undefined) body["httpBody"] = args["httpBody"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.streamRawPredict",
            "path": "v1/{+endpoint}:streamRawPredict",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    undeploy_model: {
      description: "undeploy model",
      arguments: z.object({
        deployedModelId: z.any().optional(),
        trafficSplit: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["endpoint"] !== undefined) {
          params["endpoint"] = String(g["endpoint"]);
        }
        const body: Record<string, unknown> = {};
        if (args["deployedModelId"] !== undefined) {
          body["deployedModelId"] = args["deployedModelId"];
        }
        if (args["trafficSplit"] !== undefined) {
          body["trafficSplit"] = args["trafficSplit"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "aiplatform.projects.locations.endpoints.undeployModel",
            "path": "v1/{+endpoint}:undeployModel",
            "httpMethod": "POST",
            "parameterOrder": ["endpoint"],
            "parameters": {
              "endpoint": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
