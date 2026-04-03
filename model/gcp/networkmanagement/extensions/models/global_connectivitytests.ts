// Auto-generated extension model for @swamp/gcp/networkmanagement/global-connectivitytests
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
  return `${parent}/connectivityTests/${shortName}`;
}

const BASE_URL = "https://networkmanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "networkmanagement.projects.locations.global.connectivityTests.get",
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
  "id": "networkmanagement.projects.locations.global.connectivityTests.create",
  "path": "v1/{+parent}/connectivityTests",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "testId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkmanagement.projects.locations.global.connectivityTests.patch",
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
  "id": "networkmanagement.projects.locations.global.connectivityTests.delete",
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
  bypassFirewallChecks: z.boolean().describe(
    "Whether the analysis should skip firewall checking. Default value is false.",
  ).optional(),
  description: z.string().describe(
    "The user-supplied description of the Connectivity Test. Maximum of 512 characters.",
  ).optional(),
  destination: z.object({
    appEngineVersion: z.object({
      uri: z.string().describe(
        "An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name.",
      ).optional(),
    }).describe("Wrapper for the App Engine service version attributes.")
      .optional(),
    cloudFunction: z.object({
      uri: z.string().describe(
        "A [Cloud Function](https://cloud.google.com/functions) name.",
      ).optional(),
    }).describe("Wrapper for Cloud Function attributes.").optional(),
    cloudRunRevision: z.object({
      serviceUri: z.string().describe(
        "Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}",
      ).optional(),
      uri: z.string().describe(
        "A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision}",
      ).optional(),
    }).describe("Wrapper for Cloud Run revision attributes.").optional(),
    cloudSqlInstance: z.string().describe(
      "A [Cloud SQL](https://cloud.google.com/sql) instance URI.",
    ).optional(),
    forwardingRule: z.string().describe(
      "A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}`",
    ).optional(),
    forwardingRuleTarget: z.enum([
      "FORWARDING_RULE_TARGET_UNSPECIFIED",
      "INSTANCE",
      "LOAD_BALANCER",
      "VPN_GATEWAY",
      "PSC",
    ]).describe(
      "Output only. Specifies the type of the target of the forwarding rule.",
    ).optional(),
    fqdn: z.string().describe(
      "DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint.",
    ).optional(),
    gkeMasterCluster: z.string().describe(
      "A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).",
    ).optional(),
    gkePod: z.string().describe(
      "A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI.",
    ).optional(),
    instance: z.string().describe("A Compute Engine instance URI.").optional(),
    ipAddress: z.string().describe(
      "The IP address of the endpoint, which can be an external or internal IP.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers.",
    ).optional(),
    loadBalancerType: z.enum([
      "LOAD_BALANCER_TYPE_UNSPECIFIED",
      "HTTPS_ADVANCED_LOAD_BALANCER",
      "HTTPS_LOAD_BALANCER",
      "REGIONAL_HTTPS_LOAD_BALANCER",
      "INTERNAL_HTTPS_LOAD_BALANCER",
      "SSL_PROXY_LOAD_BALANCER",
      "TCP_PROXY_LOAD_BALANCER",
      "INTERNAL_TCP_PROXY_LOAD_BALANCER",
      "NETWORK_LOAD_BALANCER",
      "LEGACY_NETWORK_LOAD_BALANCER",
      "TCP_UDP_INTERNAL_LOAD_BALANCER",
    ]).describe(
      "Output only. Type of the load balancer the forwarding rule points to.",
    ).optional(),
    network: z.string().describe(
      "A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint.",
    ).optional(),
    networkType: z.enum([
      "NETWORK_TYPE_UNSPECIFIED",
      "GCP_NETWORK",
      "NON_GCP_NETWORK",
      "INTERNET",
    ]).describe(
      "For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints.",
    ).optional(),
    port: z.number().int().describe(
      "The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP.",
    ).optional(),
    projectId: z.string().describe(
      "For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints.",
    ).optional(),
    redisCluster: z.string().describe(
      "A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint.",
    ).optional(),
    redisInstance: z.string().describe(
      "A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint.",
    ).optional(),
  }).describe("Source or destination of the Connectivity Test.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user-provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}`",
  ).optional(),
  probingDetails: z.object({
    abortCause: z.enum([
      "PROBING_ABORT_CAUSE_UNSPECIFIED",
      "PERMISSION_DENIED",
      "NO_SOURCE_LOCATION",
    ]).describe("The reason probing was aborted.").optional(),
    destinationEgressLocation: z.object({
      metropolitanArea: z.string().describe("Name of the metropolitan area.")
        .optional(),
    }).describe(
      "Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.",
    ).optional(),
    edgeResponses: z.array(z.object({
      destinationEgressLocation: z.object({
        metropolitanArea: z.string().describe("Name of the metropolitan area.")
          .optional(),
      }).describe(
        "Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.",
      ).optional(),
      destinationRouter: z.string().describe(
        "Router name in the format '{router}.{metroshard}'. For example: pf01.aaa01, pr02.aaa01.",
      ).optional(),
      probingLatency: z.object({
        latencyPercentiles: z.array(z.object({
          latencyMicros: z.string().describe(
            "percent-th percentile of latency observed, in microseconds. Fraction of percent/100 of samples have latency lower or equal to the value of this field.",
          ).optional(),
          percent: z.number().int().describe(
            "Percentage of samples this data point applies to.",
          ).optional(),
        })).describe("Representative latency percentiles.").optional(),
      }).describe("Describes measured latency distribution.").optional(),
      result: z.enum([
        "PROBING_RESULT_UNSPECIFIED",
        "REACHABLE",
        "UNREACHABLE",
        "REACHABILITY_INCONSISTENT",
        "UNDETERMINED",
      ]).describe(
        "The overall result of active probing for this egress device.",
      ).optional(),
      sentProbeCount: z.number().int().describe("Number of probes sent.")
        .optional(),
      successfulProbeCount: z.number().int().describe(
        "Number of probes that reached the destination.",
      ).optional(),
    })).describe("Probing results for all edge devices.").optional(),
    endpointInfo: z.object({
      destinationIp: z.string().describe("Destination IP address.").optional(),
      destinationNetworkUri: z.string().describe(
        "URI of the network where this packet is sent to.",
      ).optional(),
      destinationPort: z.number().int().describe(
        "Destination port. Only valid when protocol is TCP or UDP.",
      ).optional(),
      protocol: z.string().describe(
        'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
      ).optional(),
      sourceAgentUri: z.string().describe(
        "URI of the source telemetry agent this packet originates from.",
      ).optional(),
      sourceIp: z.string().describe("Source IP address.").optional(),
      sourceNetworkUri: z.string().describe(
        "URI of the network where this packet originates from.",
      ).optional(),
      sourcePort: z.number().int().describe(
        "Source port. Only valid when protocol is TCP or UDP.",
      ).optional(),
    }).describe(
      "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
    ).optional(),
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
    probedAllDevices: z.boolean().describe(
      "Whether all relevant edge devices were probed.",
    ).optional(),
    probingLatency: z.object({
      latencyPercentiles: z.array(z.object({
        latencyMicros: z.string().describe(
          "percent-th percentile of latency observed, in microseconds. Fraction of percent/100 of samples have latency lower or equal to the value of this field.",
        ).optional(),
        percent: z.number().int().describe(
          "Percentage of samples this data point applies to.",
        ).optional(),
      })).describe("Representative latency percentiles.").optional(),
    }).describe("Describes measured latency distribution.").optional(),
    result: z.enum([
      "PROBING_RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "REACHABILITY_INCONSISTENT",
      "UNDETERMINED",
    ]).describe("The overall result of active probing.").optional(),
    sentProbeCount: z.number().int().describe("Number of probes sent.")
      .optional(),
    successfulProbeCount: z.number().int().describe(
      "Number of probes that reached the destination.",
    ).optional(),
    verifyTime: z.string().describe(
      "The time that reachability was assessed through active probing.",
    ).optional(),
  }).describe("Results of active probing from the last run of the test.")
    .optional(),
  protocol: z.string().describe(
    'IP Protocol of the test. When not provided, "TCP" is assumed.',
  ).optional(),
  reachabilityDetails: z.object({
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
    result: z.enum([
      "RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "AMBIGUOUS",
      "UNDETERMINED",
    ]).describe("The overall result of the test's configuration analysis.")
      .optional(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string().describe("Destination IP address.")
          .optional(),
        destinationNetworkUri: z.string().describe(
          "URI of the network where this packet is sent to.",
        ).optional(),
        destinationPort: z.number().int().describe(
          "Destination port. Only valid when protocol is TCP or UDP.",
        ).optional(),
        protocol: z.string().describe(
          'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
        ).optional(),
        sourceAgentUri: z.string().describe(
          "URI of the source telemetry agent this packet originates from.",
        ).optional(),
        sourceIp: z.string().describe("Source IP address.").optional(),
        sourceNetworkUri: z.string().describe(
          "URI of the network where this packet originates from.",
        ).optional(),
        sourcePort: z.number().int().describe(
          "Source port. Only valid when protocol is TCP or UDP.",
        ).optional(),
      }).describe(
        "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
      ).optional(),
      forwardTraceId: z.number().int().describe(
        "ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace.",
      ).optional(),
      steps: z.array(z.object({
        abort: z.object({
          cause: z.enum([
            "CAUSE_UNSPECIFIED",
            "UNKNOWN_NETWORK",
            "UNKNOWN_PROJECT",
            "NO_EXTERNAL_IP",
            "UNINTENDED_DESTINATION",
            "SOURCE_ENDPOINT_NOT_FOUND",
            "MISMATCHED_SOURCE_NETWORK",
            "DESTINATION_ENDPOINT_NOT_FOUND",
            "MISMATCHED_DESTINATION_NETWORK",
            "UNKNOWN_IP",
            "GOOGLE_MANAGED_SERVICE_UNKNOWN_IP",
            "SOURCE_IP_ADDRESS_NOT_IN_SOURCE_NETWORK",
            "PERMISSION_DENIED",
            "PERMISSION_DENIED_NO_CLOUD_NAT_CONFIGS",
            "PERMISSION_DENIED_NO_NEG_ENDPOINT_CONFIGS",
            "PERMISSION_DENIED_NO_CLOUD_ROUTER_CONFIGS",
            "NO_SOURCE_LOCATION",
            "NO_SOURCE_GCP_NETWORK_LOCATION",
            "NO_SOURCE_NON_GCP_NETWORK_LOCATION",
            "NO_SOURCE_INTERNET_LOCATION",
            "INVALID_ARGUMENT",
            "TRACE_TOO_LONG",
            "INTERNAL_ERROR",
            "UNSUPPORTED",
            "MISMATCHED_IP_VERSION",
            "GKE_KONNECTIVITY_PROXY_UNSUPPORTED",
            "RESOURCE_CONFIG_NOT_FOUND",
            "VM_INSTANCE_CONFIG_NOT_FOUND",
            "NETWORK_CONFIG_NOT_FOUND",
            "FIREWALL_CONFIG_NOT_FOUND",
            "ROUTE_CONFIG_NOT_FOUND",
            "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_PSC_ENDPOINT",
            "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_ENDPOINT",
            "SOURCE_PSC_CLOUD_SQL_UNSUPPORTED",
            "SOURCE_EXTERNAL_CLOUD_SQL_UNSUPPORTED",
            "SOURCE_REDIS_CLUSTER_UNSUPPORTED",
            "SOURCE_REDIS_INSTANCE_UNSUPPORTED",
            "SOURCE_FORWARDING_RULE_UNSUPPORTED",
            "NON_ROUTABLE_IP_ADDRESS",
            "UNKNOWN_ISSUE_IN_GOOGLE_MANAGED_PROJECT",
            "UNSUPPORTED_GOOGLE_MANAGED_PROJECT_CONFIG",
            "NO_SERVERLESS_IP_RANGES",
            "IP_VERSION_PROTOCOL_MISMATCH",
            "GKE_POD_UNKNOWN_ENDPOINT_LOCATION",
          ]).describe("Causes that the analysis is aborted.").optional(),
          ipAddress: z.string().describe("IP address that caused the abort.")
            .optional(),
          projectsMissingPermission: z.array(z.string()).describe(
            "List of project IDs the user specified in the request but lacks access to. In this case, analysis is aborted with the PERMISSION_DENIED cause.",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that caused the abort.",
          ).optional(),
        }).describe(
          'Details of the final state "abort" and associated resource.',
        ).optional(),
        appEngineVersion: z.object({
          displayName: z.string().describe("Name of an App Engine version.")
            .optional(),
          environment: z.string().describe(
            "App Engine execution environment for a version.",
          ).optional(),
          runtime: z.string().describe("Runtime of the App Engine version.")
            .optional(),
          uri: z.string().describe("URI of an App Engine version.").optional(),
        }).describe(
          "For display only. Metadata associated with an App Engine version.",
        ).optional(),
        causesDrop: z.boolean().describe(
          "This is a step that leads to the final state Drop.",
        ).optional(),
        cloudFunction: z.object({
          displayName: z.string().describe("Name of a Cloud Function.")
            .optional(),
          location: z.string().describe(
            "Location in which the Cloud Function is deployed.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Function.").optional(),
          versionId: z.string().describe(
            "Latest successfully deployed version id of the Cloud Function.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Function.",
        ).optional(),
        cloudRunRevision: z.object({
          displayName: z.string().describe("Name of a Cloud Run revision.")
            .optional(),
          location: z.string().describe(
            "Location in which this revision is deployed.",
          ).optional(),
          serviceUri: z.string().describe(
            "URI of Cloud Run service this revision belongs to.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Run revision.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Run revision.",
        ).optional(),
        cloudSqlInstance: z.object({
          displayName: z.string().describe("Name of a Cloud SQL instance.")
            .optional(),
          externalIp: z.string().describe(
            "External IP address of a Cloud SQL instance.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of a Cloud SQL instance.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of a Cloud SQL instance network or empty string if the instance does not have one.",
          ).optional(),
          region: z.string().describe(
            "Region in which the Cloud SQL instance is running.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud SQL instance.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud SQL instance.",
        ).optional(),
        deliver: z.object({
          googleServiceType: z.enum([
            "GOOGLE_SERVICE_TYPE_UNSPECIFIED",
            "IAP",
            "GFE_PROXY_OR_HEALTH_CHECK_PROBER",
            "CLOUD_DNS",
            "PRIVATE_GOOGLE_ACCESS",
            "SERVERLESS_VPC_ACCESS",
          ]).describe(
            "Recognized type of a Google Service the packet is delivered to (if applicable).",
          ).optional(),
          ipAddress: z.string().describe(
            "IP address of the target (if applicable).",
          ).optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target the packet is delivered to (if applicable).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that the packet is delivered to.",
          ).optional(),
          storageBucket: z.string().describe(
            "Name of the Cloud Storage Bucket the packet is delivered to (if applicable).",
          ).optional(),
          target: z.enum([
            "TARGET_UNSPECIFIED",
            "INSTANCE",
            "INTERNET",
            "GOOGLE_API",
            "GKE_MASTER",
            "CLOUD_SQL_INSTANCE",
            "PSC_PUBLISHED_SERVICE",
            "PSC_GOOGLE_API",
            "PSC_VPC_SC",
            "SERVERLESS_NEG",
            "STORAGE_BUCKET",
            "PRIVATE_NETWORK",
            "CLOUD_FUNCTION",
            "APP_ENGINE_VERSION",
            "CLOUD_RUN_REVISION",
            "GOOGLE_MANAGED_SERVICE",
            "REDIS_INSTANCE",
            "REDIS_CLUSTER",
            "GKE_POD",
          ]).describe("Target type where the packet is delivered to.")
            .optional(),
        }).describe(
          'Details of the final state "deliver" and associated resource.',
        ).optional(),
        description: z.string().describe(
          "A description of the step. Usually this is a summary of the state.",
        ).optional(),
        directVpcEgressConnection: z.object({
          networkUri: z.string().describe("URI of direct access network.")
            .optional(),
          region: z.string().describe(
            "Region in which the Direct VPC egress is deployed.",
          ).optional(),
          selectedIpAddress: z.string().describe(
            "Selected starting IP address, from the selected IP range.",
          ).optional(),
          selectedIpRange: z.string().describe("Selected IP range.").optional(),
          subnetworkUri: z.string().describe("URI of direct access subnetwork.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a serverless direct VPC egress connection.",
        ).optional(),
        drop: z.object({
          cause: z.enum([
            "CAUSE_UNSPECIFIED",
            "UNKNOWN_EXTERNAL_ADDRESS",
            "FOREIGN_IP_DISALLOWED",
            "FIREWALL_RULE",
            "NO_ROUTE",
            "ROUTE_BLACKHOLE",
            "ROUTE_WRONG_NETWORK",
            "ROUTE_NEXT_HOP_IP_ADDRESS_NOT_RESOLVED",
            "ROUTE_NEXT_HOP_RESOURCE_NOT_FOUND",
            "ROUTE_NEXT_HOP_INSTANCE_WRONG_NETWORK",
            "ROUTE_NEXT_HOP_INSTANCE_NON_PRIMARY_IP",
            "ROUTE_NEXT_HOP_FORWARDING_RULE_IP_MISMATCH",
            "ROUTE_NEXT_HOP_VPN_TUNNEL_NOT_ESTABLISHED",
            "ROUTE_NEXT_HOP_FORWARDING_RULE_TYPE_INVALID",
            "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV6_ADDRESS",
            "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV4_ADDRESS",
            "NO_ROUTE_FROM_EXTERNAL_IPV6_SOURCE_TO_PRIVATE_IPV6_ADDRESS",
            "VPN_TUNNEL_LOCAL_SELECTOR_MISMATCH",
            "VPN_TUNNEL_REMOTE_SELECTOR_MISMATCH",
            "PRIVATE_TRAFFIC_TO_INTERNET",
            "PRIVATE_GOOGLE_ACCESS_DISALLOWED",
            "PRIVATE_GOOGLE_ACCESS_VIA_VPN_TUNNEL_UNSUPPORTED",
            "NO_EXTERNAL_ADDRESS",
            "UNKNOWN_INTERNAL_ADDRESS",
            "FORWARDING_RULE_MISMATCH",
            "FORWARDING_RULE_NO_INSTANCES",
            "FIREWALL_BLOCKING_LOAD_BALANCER_BACKEND_HEALTH_CHECK",
            "INGRESS_FIREWALL_TAGS_UNSUPPORTED_BY_DIRECT_VPC_EGRESS",
            "INSTANCE_NOT_RUNNING",
            "GKE_CLUSTER_NOT_RUNNING",
            "GKE_POD_NOT_RUNNING",
            "CLOUD_SQL_INSTANCE_NOT_RUNNING",
            "REDIS_INSTANCE_NOT_RUNNING",
            "REDIS_CLUSTER_NOT_RUNNING",
            "TRAFFIC_TYPE_BLOCKED",
            "GKE_MASTER_UNAUTHORIZED_ACCESS",
            "CLOUD_SQL_INSTANCE_UNAUTHORIZED_ACCESS",
            "DROPPED_INSIDE_GKE_SERVICE",
            "DROPPED_INSIDE_CLOUD_SQL_SERVICE",
            "GOOGLE_MANAGED_SERVICE_NO_PEERING",
            "GOOGLE_MANAGED_SERVICE_NO_PSC_ENDPOINT",
            "GKE_PSC_ENDPOINT_MISSING",
            "CLOUD_SQL_INSTANCE_NO_IP_ADDRESS",
            "GKE_CONTROL_PLANE_REGION_MISMATCH",
            "PUBLIC_GKE_CONTROL_PLANE_TO_PRIVATE_DESTINATION",
            "GKE_CONTROL_PLANE_NO_ROUTE",
            "CLOUD_SQL_INSTANCE_NOT_CONFIGURED_FOR_EXTERNAL_TRAFFIC",
            "PUBLIC_CLOUD_SQL_INSTANCE_TO_PRIVATE_DESTINATION",
            "CLOUD_SQL_INSTANCE_NO_ROUTE",
            "CLOUD_SQL_CONNECTOR_REQUIRED",
            "CLOUD_FUNCTION_NOT_ACTIVE",
            "VPC_CONNECTOR_NOT_SET",
            "VPC_CONNECTOR_NOT_RUNNING",
            "VPC_CONNECTOR_SERVERLESS_TRAFFIC_BLOCKED",
            "VPC_CONNECTOR_HEALTH_CHECK_TRAFFIC_BLOCKED",
            "FORWARDING_RULE_REGION_MISMATCH",
            "PSC_CONNECTION_NOT_ACCEPTED",
            "PSC_ENDPOINT_ACCESSED_FROM_PEERED_NETWORK",
            "PSC_NEG_PRODUCER_ENDPOINT_NO_GLOBAL_ACCESS",
            "PSC_NEG_PRODUCER_FORWARDING_RULE_MULTIPLE_PORTS",
            "CLOUD_SQL_PSC_NEG_UNSUPPORTED",
            "NO_NAT_SUBNETS_FOR_PSC_SERVICE_ATTACHMENT",
            "PSC_TRANSITIVITY_NOT_PROPAGATED",
            "HYBRID_NEG_NON_DYNAMIC_ROUTE_MATCHED",
            "HYBRID_NEG_NON_LOCAL_DYNAMIC_ROUTE_MATCHED",
            "CLOUD_RUN_REVISION_NOT_READY",
            "DROPPED_INSIDE_PSC_SERVICE_PRODUCER",
            "LOAD_BALANCER_HAS_NO_PROXY_SUBNET",
            "CLOUD_NAT_NO_ADDRESSES",
            "ROUTING_LOOP",
            "DROPPED_INSIDE_GOOGLE_MANAGED_SERVICE",
            "LOAD_BALANCER_BACKEND_INVALID_NETWORK",
            "BACKEND_SERVICE_NAMED_PORT_NOT_DEFINED",
            "DESTINATION_IS_PRIVATE_NAT_IP_RANGE",
            "DROPPED_INSIDE_REDIS_INSTANCE_SERVICE",
            "REDIS_INSTANCE_UNSUPPORTED_PORT",
            "REDIS_INSTANCE_CONNECTING_FROM_PUPI_ADDRESS",
            "REDIS_INSTANCE_NO_ROUTE_TO_DESTINATION_NETWORK",
            "REDIS_INSTANCE_NO_EXTERNAL_IP",
            "REDIS_INSTANCE_UNSUPPORTED_PROTOCOL",
            "DROPPED_INSIDE_REDIS_CLUSTER_SERVICE",
            "REDIS_CLUSTER_UNSUPPORTED_PORT",
            "REDIS_CLUSTER_NO_EXTERNAL_IP",
            "REDIS_CLUSTER_UNSUPPORTED_PROTOCOL",
            "NO_ADVERTISED_ROUTE_TO_GCP_DESTINATION",
            "NO_TRAFFIC_SELECTOR_TO_GCP_DESTINATION",
            "NO_KNOWN_ROUTE_FROM_PEERED_NETWORK_TO_DESTINATION",
            "PRIVATE_NAT_TO_PSC_ENDPOINT_UNSUPPORTED",
            "PSC_PORT_MAPPING_PORT_MISMATCH",
            "PSC_PORT_MAPPING_WITHOUT_PSC_CONNECTION_UNSUPPORTED",
            "UNSUPPORTED_ROUTE_MATCHED_FOR_NAT64_DESTINATION",
            "TRAFFIC_FROM_HYBRID_ENDPOINT_TO_INTERNET_DISALLOWED",
            "NO_MATCHING_NAT64_GATEWAY",
            "NO_CONFIGURED_PRIVATE_NAT64_RULE",
            "LOAD_BALANCER_BACKEND_IP_VERSION_MISMATCH",
            "NO_KNOWN_ROUTE_FROM_NCC_NETWORK_TO_DESTINATION",
            "CLOUD_NAT_PROTOCOL_UNSUPPORTED",
            "L2_INTERCONNECT_UNSUPPORTED_PROTOCOL",
            "L2_INTERCONNECT_UNSUPPORTED_PORT",
            "L2_INTERCONNECT_DESTINATION_IP_MISMATCH",
            "NCC_ROUTE_WITHIN_HYBRID_SUBNET_UNSUPPORTED",
            "HYBRID_SUBNET_REGION_MISMATCH",
            "HYBRID_SUBNET_NO_ROUTE",
            "GKE_NETWORK_POLICY",
            "NO_VALID_ROUTE_FROM_GOOGLE_MANAGED_NETWORK_TO_DESTINATION",
          ]).describe("Cause that the packet is dropped.").optional(),
          destinationGeolocationCode: z.string().describe(
            "Geolocation (region code) of the destination IP address (if relevant).",
          ).optional(),
          destinationIp: z.string().describe(
            "Destination IP address of the dropped packet (if relevant).",
          ).optional(),
          region: z.string().describe(
            "Region of the dropped packet (if relevant).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that caused the drop.",
          ).optional(),
          sourceGeolocationCode: z.string().describe(
            "Geolocation (region code) of the source IP address (if relevant).",
          ).optional(),
          sourceIp: z.string().describe(
            "Source IP address of the dropped packet (if relevant).",
          ).optional(),
        }).describe(
          'Details of the final state "drop" and associated resource.',
        ).optional(),
        endpoint: z.object({
          destinationIp: z.string().describe("Destination IP address.")
            .optional(),
          destinationNetworkUri: z.string().describe(
            "URI of the network where this packet is sent to.",
          ).optional(),
          destinationPort: z.number().int().describe(
            "Destination port. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          sourceAgentUri: z.string().describe(
            "URI of the source telemetry agent this packet originates from.",
          ).optional(),
          sourceIp: z.string().describe("Source IP address.").optional(),
          sourceNetworkUri: z.string().describe(
            "URI of the network where this packet originates from.",
          ).optional(),
          sourcePort: z.number().int().describe(
            "Source port. Only valid when protocol is TCP or UDP.",
          ).optional(),
        }).describe(
          "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
        ).optional(),
        firewall: z.object({
          action: z.string().describe(
            "Possible values: ALLOW, DENY, APPLY_SECURITY_PROFILE_GROUP",
          ).optional(),
          direction: z.string().describe("Possible values: INGRESS, EGRESS")
            .optional(),
          displayName: z.string().describe(
            "The display name of the firewall rule. This field might be empty for firewall policy rules.",
          ).optional(),
          firewallRuleType: z.enum([
            "FIREWALL_RULE_TYPE_UNSPECIFIED",
            "HIERARCHICAL_FIREWALL_POLICY_RULE",
            "VPC_FIREWALL_RULE",
            "IMPLIED_VPC_FIREWALL_RULE",
            "SERVERLESS_VPC_ACCESS_MANAGED_FIREWALL_RULE",
            "NETWORK_FIREWALL_POLICY_RULE",
            "NETWORK_REGIONAL_FIREWALL_POLICY_RULE",
            "SYSTEM_NETWORK_FIREWALL_POLICY_RULE",
            "SYSTEM_REGIONAL_NETWORK_FIREWALL_POLICY_RULE",
            "UNSUPPORTED_FIREWALL_POLICY_RULE",
            "TRACKING_STATE",
            "ANALYSIS_SKIPPED",
          ]).describe("The firewall rule's type.").optional(),
          networkUri: z.string().describe(
            "The URI of the VPC network that the firewall rule is associated with. This field is not applicable to hierarchical firewall policy rules.",
          ).optional(),
          policy: z.string().describe(
            "The name of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          policyPriority: z.number().int().describe(
            "The priority of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          policyUri: z.string().describe(
            "The URI of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          priority: z.number().int().describe(
            "The priority of the firewall rule.",
          ).optional(),
          targetServiceAccounts: z.array(z.string()).describe(
            "The target service accounts specified by the firewall rule.",
          ).optional(),
          targetTags: z.array(z.string()).describe(
            "The target tags defined by the VPC firewall rule. This field is not applicable to firewall policy rules.",
          ).optional(),
          targetType: z.enum([
            "TARGET_TYPE_UNSPECIFIED",
            "INSTANCES",
            "INTERNAL_MANAGED_LB",
          ]).describe("Target type of the firewall rule.").optional(),
          uri: z.string().describe(
            "The URI of the firewall rule. This field is not applicable to implied VPC firewall rules.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.",
        ).optional(),
        forward: z.object({
          ipAddress: z.string().describe(
            "IP address of the target (if applicable).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that the packet is forwarded to.",
          ).optional(),
          target: z.enum([
            "TARGET_UNSPECIFIED",
            "PEERING_VPC",
            "VPN_GATEWAY",
            "INTERCONNECT",
            "GKE_MASTER",
            "IMPORTED_CUSTOM_ROUTE_NEXT_HOP",
            "CLOUD_SQL_INSTANCE",
            "ANOTHER_PROJECT",
            "NCC_HUB",
            "ROUTER_APPLIANCE",
            "SECURE_WEB_PROXY_GATEWAY",
          ]).describe("Target type where this packet is forwarded to.")
            .optional(),
        }).describe(
          'Details of the final state "forward" and associated resource.',
        ).optional(),
        forwardingRule: z.object({
          displayName: z.string().describe("Name of the forwarding rule.")
            .optional(),
          loadBalancerName: z.string().describe(
            "Name of the load balancer the forwarding rule belongs to. Empty for forwarding rules not related to load balancers (like PSC forwarding rules).",
          ).optional(),
          matchedPortRange: z.string().describe(
            "Port range defined in the forwarding rule that matches the packet.",
          ).optional(),
          matchedProtocol: z.string().describe(
            "Protocol defined in the forwarding rule that matches the packet.",
          ).optional(),
          networkUri: z.string().describe("Network URI.").optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target this forwarding rule targets (if applicable).",
          ).optional(),
          pscServiceAttachmentUri: z.string().describe(
            "URI of the PSC service attachment this forwarding rule targets (if applicable).",
          ).optional(),
          region: z.string().describe(
            "Region of the forwarding rule. Set only for regional forwarding rules.",
          ).optional(),
          target: z.string().describe("Target type of the forwarding rule.")
            .optional(),
          uri: z.string().describe("URI of the forwarding rule.").optional(),
          vip: z.string().describe("VIP of the forwarding rule.").optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine forwarding rule.",
        ).optional(),
        gkeMaster: z.object({
          clusterNetworkUri: z.string().describe(
            "URI of a GKE cluster network.",
          ).optional(),
          clusterUri: z.string().describe("URI of a GKE cluster.").optional(),
          dnsEndpoint: z.string().describe(
            "DNS endpoint of a GKE cluster control plane.",
          ).optional(),
          externalIp: z.string().describe(
            "External IP address of a GKE cluster control plane.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of a GKE cluster control plane.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.",
        ).optional(),
        gkeNetworkPolicy: z.object({
          action: z.string().describe("Possible values: ALLOW, DENY")
            .optional(),
          direction: z.string().describe("Possible values: INGRESS, EGRESS")
            .optional(),
          displayName: z.string().describe("The name of the Network Policy.")
            .optional(),
          uri: z.string().describe(
            "The URI of the Network Policy. Format for a Network Policy in a zonal cluster: `projects//zones//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/` Format for a Network Policy in a regional cluster: `projects//locations//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/`",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a GKE Network Policy.",
        ).optional(),
        gkeNetworkPolicySkipped: z.object({
          reason: z.enum([
            "REASON_UNSPECIFIED",
            "NETWORK_POLICY_DISABLED",
            "INGRESS_SOURCE_ON_SAME_NODE",
            "EGRESS_FROM_NODE_NETWORK_NAMESPACE_POD",
            "NETWORK_POLICY_NOT_APPLIED_TO_RESPONSE_TRAFFIC",
            "NETWORK_POLICY_ANALYSIS_UNSUPPORTED",
          ]).describe("Reason why Network Policy evaluation was skipped.")
            .optional(),
        }).describe(
          "For display only. Contains information about why GKE Network Policy evaluation was skipped.",
        ).optional(),
        gkePod: z.object({
          ipAddress: z.string().describe(
            "IP address of a GKE Pod. If the Pod is dual-stack, this is the IP address relevant to the trace.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of the network containing the GKE Pod.",
          ).optional(),
          podUri: z.string().describe(
            "URI of a GKE Pod. For Pods in regional Clusters, the URI format is: `projects/{project}/locations/{location}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}` For Pods in zonal Clusters, the URI format is: `projects/{project}/zones/{zone}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}`",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.",
        ).optional(),
        googleService: z.object({
          googleServiceType: z.enum([
            "GOOGLE_SERVICE_TYPE_UNSPECIFIED",
            "IAP",
            "GFE_PROXY_OR_HEALTH_CHECK_PROBER",
            "CLOUD_DNS",
            "GOOGLE_API",
            "GOOGLE_API_PSC",
            "GOOGLE_API_VPC_SC",
            "SERVERLESS_VPC_ACCESS",
          ]).describe("Recognized type of a Google Service.").optional(),
          sourceIp: z.string().describe("Source IP address.").optional(),
        }).describe(
          "For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths",
        ).optional(),
        hybridSubnet: z.object({
          displayName: z.string().describe("Name of a hybrid subnet.")
            .optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where the hybrid subnet is configured.",
          ).optional(),
          uri: z.string().describe("URI of a hybrid subnet.").optional(),
        }).describe(
          "For display only. Metadata associated with a hybrid subnet.",
        ).optional(),
        instance: z.object({
          displayName: z.string().describe("Name of a Compute Engine instance.")
            .optional(),
          externalIp: z.string().describe(
            "External IP address of the network interface.",
          ).optional(),
          interface: z.string().describe(
            "Name of the network interface of a Compute Engine instance.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of the network interface.",
          ).optional(),
          networkTags: z.array(z.string()).describe(
            "Network tags configured on the instance.",
          ).optional(),
          networkUri: z.string().describe("URI of a Compute Engine network.")
            .optional(),
          pscNetworkAttachmentUri: z.string().describe(
            "URI of the PSC network attachment the NIC is attached to (if relevant).",
          ).optional(),
          running: z.boolean().describe(
            "Indicates whether the Compute Engine instance is running. Deprecated: use the `status` field instead.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Service account authorized for the instance.",
          ).optional(),
          status: z.enum(["STATUS_UNSPECIFIED", "RUNNING", "NOT_RUNNING"])
            .describe("The status of the instance.").optional(),
          uri: z.string().describe("URI of a Compute Engine instance.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine instance.",
        ).optional(),
        interconnectAttachment: z.object({
          cloudRouterUri: z.string().describe(
            "URI of the Cloud Router to be used for dynamic routing.",
          ).optional(),
          displayName: z.string().describe(
            "Name of an Interconnect attachment.",
          ).optional(),
          interconnectUri: z.string().describe(
            "URI of the Interconnect where the Interconnect attachment is configured.",
          ).optional(),
          l2AttachmentMatchedIpAddress: z.string().describe(
            "Appliance IP address that was matched for L2_DEDICATED attachments.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where the Interconnect attachment is configured.",
          ).optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "DEDICATED",
            "PARTNER",
            "PARTNER_PROVIDER",
            "L2_DEDICATED",
          ]).describe("The type of interconnect attachment this is.")
            .optional(),
          uri: z.string().describe("URI of an Interconnect attachment.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with an Interconnect attachment.",
        ).optional(),
        ipMasqueradingSkipped: z.object({
          nonMasqueradeRange: z.string().describe(
            "The matched non-masquerade IP range. Only set if reason is DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE or DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE.",
          ).optional(),
          reason: z.enum([
            "REASON_UNSPECIFIED",
            "DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE",
            "DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE",
            "DESTINATION_ON_SAME_NODE",
            "DEFAULT_SNAT_DISABLED",
            "NO_MASQUERADING_FOR_IPV6",
            "POD_USES_NODE_NETWORK_NAMESPACE",
            "NO_MASQUERADING_FOR_RETURN_PACKET",
          ]).describe("Reason why IP masquerading was not applied.").optional(),
        }).describe(
          "For display only. Contains information about why IP masquerading was skipped for the packet.",
        ).optional(),
        loadBalancer: z.object({
          backendType: z.enum([
            "BACKEND_TYPE_UNSPECIFIED",
            "BACKEND_SERVICE",
            "TARGET_POOL",
            "TARGET_INSTANCE",
          ]).describe("Type of load balancer's backend configuration.")
            .optional(),
          backendUri: z.string().describe("Backend configuration URI.")
            .optional(),
          backends: z.array(z.object({
            displayName: z.string().describe(
              "Name of a Compute Engine instance or network endpoint.",
            ).optional(),
            healthCheckAllowingFirewallRules: z.array(z.string()).describe(
              "A list of firewall rule URIs allowing probes from health check IP ranges.",
            ).optional(),
            healthCheckBlockingFirewallRules: z.array(z.string()).describe(
              "A list of firewall rule URIs blocking probes from health check IP ranges.",
            ).optional(),
            healthCheckFirewallState: z.enum([
              "HEALTH_CHECK_FIREWALL_STATE_UNSPECIFIED",
              "CONFIGURED",
              "MISCONFIGURED",
            ]).describe("State of the health check firewall configuration.")
              .optional(),
            uri: z.string().describe(
              "URI of a Compute Engine instance or network endpoint.",
            ).optional(),
          })).describe("Information for the loadbalancer backends.").optional(),
          healthCheckUri: z.string().describe(
            "URI of the health check for the load balancer. Deprecated and no longer populated as different load balancer backends might have different health checks.",
          ).optional(),
          loadBalancerType: z.enum([
            "LOAD_BALANCER_TYPE_UNSPECIFIED",
            "INTERNAL_TCP_UDP",
            "NETWORK_TCP_UDP",
            "HTTP_PROXY",
            "TCP_PROXY",
            "SSL_PROXY",
          ]).describe("Type of the load balancer.").optional(),
        }).describe(
          "For display only. Metadata associated with a load balancer.",
        ).optional(),
        loadBalancerBackendInfo: z.object({
          backendBucketUri: z.string().describe(
            "URI of the backend bucket this backend targets (if applicable).",
          ).optional(),
          backendServiceUri: z.string().describe(
            "URI of the backend service this backend belongs to (if applicable).",
          ).optional(),
          healthCheckFirewallsConfigState: z.enum([
            "HEALTH_CHECK_FIREWALLS_CONFIG_STATE_UNSPECIFIED",
            "FIREWALLS_CONFIGURED",
            "FIREWALLS_PARTIALLY_CONFIGURED",
            "FIREWALLS_NOT_CONFIGURED",
            "FIREWALLS_UNSUPPORTED",
          ]).describe(
            "Output only. Health check firewalls configuration state for the backend. This is a result of the static firewall analysis (verifying that health check traffic from required IP ranges to the backend is allowed or not). The backend might still be unhealthy even if these firewalls are configured. Please refer to the documentation for more information: https://cloud.google.com/load-balancing/docs/firewall-rules",
          ).optional(),
          healthCheckUri: z.string().describe(
            "URI of the health check attached to this backend (if applicable).",
          ).optional(),
          instanceGroupUri: z.string().describe(
            "URI of the instance group this backend belongs to (if applicable).",
          ).optional(),
          instanceUri: z.string().describe(
            "URI of the backend instance (if applicable). Populated for instance group backends, and zonal NEG backends.",
          ).optional(),
          name: z.string().describe(
            "Display name of the backend. For example, it might be an instance name for the instance group backends, or an IP address and port for zonal network endpoint group backends.",
          ).optional(),
          networkEndpointGroupUri: z.string().describe(
            "URI of the network endpoint group this backend belongs to (if applicable).",
          ).optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target this PSC NEG backend targets (if applicable).",
          ).optional(),
          pscServiceAttachmentUri: z.string().describe(
            "URI of the PSC service attachment this PSC NEG backend targets (if applicable).",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with the load balancer backend.",
        ).optional(),
        nat: z.object({
          cloudNatGatewayType: z.enum([
            "CLOUD_NAT_GATEWAY_TYPE_UNSPECIFIED",
            "PUBLIC_NAT44",
            "PUBLIC_NAT64",
            "PRIVATE_NAT_NCC",
            "PRIVATE_NAT_HYBRID",
            "PRIVATE_NAT64",
          ]).describe(
            "Type of Cloud NAT gateway. Only valid when `type` is CLOUD_NAT.",
          ).optional(),
          natGatewayName: z.string().describe(
            "The name of Cloud NAT Gateway. Only valid when type is CLOUD_NAT.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of the network where NAT translation takes place.",
          ).optional(),
          newDestinationIp: z.string().describe(
            "Destination IP address after NAT translation.",
          ).optional(),
          newDestinationPort: z.number().int().describe(
            "Destination port after NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          newSourceIp: z.string().describe(
            "Source IP address after NAT translation.",
          ).optional(),
          newSourcePort: z.number().int().describe(
            "Source port after NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldDestinationIp: z.string().describe(
            "Destination IP address before NAT translation.",
          ).optional(),
          oldDestinationPort: z.number().int().describe(
            "Destination port before NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldSourceIp: z.string().describe(
            "Source IP address before NAT translation.",
          ).optional(),
          oldSourcePort: z.number().int().describe(
            "Source port before NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          routerUri: z.string().describe(
            "Uri of the Cloud Router. Only valid when type is CLOUD_NAT.",
          ).optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "INTERNAL_TO_EXTERNAL",
            "EXTERNAL_TO_INTERNAL",
            "CLOUD_NAT",
            "PRIVATE_SERVICE_CONNECT",
            "GKE_POD_IP_MASQUERADING",
          ]).describe("Type of NAT.").optional(),
        }).describe("For display only. Metadata associated with NAT.")
          .optional(),
        network: z.object({
          displayName: z.string().describe("Name of a Compute Engine network.")
            .optional(),
          matchedIpRange: z.string().describe(
            "The IP range of the subnet matching the source IP address of the test.",
          ).optional(),
          matchedSubnetUri: z.string().describe(
            "URI of the subnet matching the source IP address of the test.",
          ).optional(),
          region: z.string().describe(
            "The region of the subnet matching the source IP address of the test.",
          ).optional(),
          uri: z.string().describe("URI of a Compute Engine network.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine network.",
        ).optional(),
        ngfwPacketInspection: z.object({
          securityProfileGroupUri: z.string().describe(
            "URI of the security profile group associated with this firewall packet inspection.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a layer 7 packet inspection by the firewall.",
        ).optional(),
        projectId: z.string().describe(
          "Project ID that contains the configuration this step is validating.",
        ).optional(),
        proxyConnection: z.object({
          networkUri: z.string().describe(
            "URI of the network where connection is proxied.",
          ).optional(),
          newDestinationIp: z.string().describe(
            "Destination IP address of a new connection.",
          ).optional(),
          newDestinationPort: z.number().int().describe(
            "Destination port of a new connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          newSourceIp: z.string().describe(
            "Source IP address of a new connection.",
          ).optional(),
          newSourcePort: z.number().int().describe(
            "Source port of a new connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldDestinationIp: z.string().describe(
            "Destination IP address of an original connection",
          ).optional(),
          oldDestinationPort: z.number().int().describe(
            "Destination port of an original connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldSourceIp: z.string().describe(
            "Source IP address of an original connection.",
          ).optional(),
          oldSourcePort: z.number().int().describe(
            "Source port of an original connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          subnetUri: z.string().describe("Uri of proxy subnet.").optional(),
        }).describe(
          "For display only. Metadata associated with ProxyConnection.",
        ).optional(),
        redisCluster: z.object({
          discoveryEndpointIpAddress: z.string().describe(
            "Discovery endpoint IP address of a Redis Cluster.",
          ).optional(),
          displayName: z.string().describe("Name of a Redis Cluster.")
            .optional(),
          location: z.string().describe(
            'Name of the region in which the Redis Cluster is defined. For example, "us-central1".',
          ).optional(),
          networkUri: z.string().describe(
            'URI of the network containing the Redis Cluster endpoints in format "projects/{project_id}/global/networks/{network_id}".',
          ).optional(),
          secondaryEndpointIpAddress: z.string().describe(
            "Secondary endpoint IP address of a Redis Cluster.",
          ).optional(),
          uri: z.string().describe(
            'URI of a Redis Cluster in format "projects/{project_id}/locations/{location}/clusters/{cluster_id}"',
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Redis Cluster.",
        ).optional(),
        redisInstance: z.object({
          displayName: z.string().describe("Name of a Cloud Redis Instance.")
            .optional(),
          networkUri: z.string().describe(
            "URI of a Cloud Redis Instance network.",
          ).optional(),
          primaryEndpointIp: z.string().describe(
            "Primary endpoint IP address of a Cloud Redis Instance.",
          ).optional(),
          readEndpointIp: z.string().describe(
            "Read endpoint IP address of a Cloud Redis Instance (if applicable).",
          ).optional(),
          region: z.string().describe(
            "Region in which the Cloud Redis Instance is defined.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Redis Instance.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Redis Instance.",
        ).optional(),
        route: z.object({
          advertisedRouteNextHopUri: z.string().describe(
            "For ADVERTISED routes, the URI of their next hop, i.e. the URI of the hybrid endpoint (VPN tunnel, Interconnect attachment, NCC router appliance) the advertised prefix is advertised through, or URI of the source peered network. Deprecated in favor of the next_hop_uri field, not used in new tests.",
          ).optional(),
          advertisedRouteSourceRouterUri: z.string().describe(
            "For ADVERTISED dynamic routes, the URI of the Cloud Router that advertised the corresponding IP prefix.",
          ).optional(),
          destIpRange: z.string().describe("Destination IP range of the route.")
            .optional(),
          destPortRanges: z.array(z.string()).describe(
            "Destination port ranges of the route. POLICY_BASED routes only.",
          ).optional(),
          displayName: z.string().describe("Name of a route.").optional(),
          instanceTags: z.array(z.string()).describe(
            "Instance tags of the route.",
          ).optional(),
          nccHubRouteUri: z.string().describe(
            "For PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub, the URI of the corresponding route in NCC Hub's routing table.",
          ).optional(),
          nccHubUri: z.string().describe(
            "URI of the NCC Hub the route is advertised by. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only.",
          ).optional(),
          nccSpokeUri: z.string().describe(
            "URI of the destination NCC Spoke. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of a VPC network where route is located.",
          ).optional(),
          nextHop: z.string().describe(
            'String type of the next hop of the route (for example, "VPN tunnel"). Deprecated in favor of the next_hop_type and next_hop_uri fields, not used in new tests.',
          ).optional(),
          nextHopNetworkUri: z.string().describe(
            "URI of a VPC network where the next hop resource is located.",
          ).optional(),
          nextHopType: z.enum([
            "NEXT_HOP_TYPE_UNSPECIFIED",
            "NEXT_HOP_IP",
            "NEXT_HOP_INSTANCE",
            "NEXT_HOP_NETWORK",
            "NEXT_HOP_PEERING",
            "NEXT_HOP_INTERCONNECT",
            "NEXT_HOP_VPN_TUNNEL",
            "NEXT_HOP_VPN_GATEWAY",
            "NEXT_HOP_INTERNET_GATEWAY",
            "NEXT_HOP_BLACKHOLE",
            "NEXT_HOP_ILB",
            "NEXT_HOP_ROUTER_APPLIANCE",
            "NEXT_HOP_NCC_HUB",
            "SECURE_WEB_PROXY_GATEWAY",
          ]).describe("Type of next hop.").optional(),
          nextHopUri: z.string().describe("URI of the next hop resource.")
            .optional(),
          originatingRouteDisplayName: z.string().describe(
            "For PEERING_SUBNET, PEERING_STATIC and PEERING_DYNAMIC routes, the name of the originating SUBNET/STATIC/DYNAMIC route.",
          ).optional(),
          originatingRouteUri: z.string().describe(
            "For PEERING_SUBNET and PEERING_STATIC routes, the URI of the originating SUBNET/STATIC route.",
          ).optional(),
          priority: z.number().int().describe("Priority of the route.")
            .optional(),
          protocols: z.array(z.string()).describe(
            "Protocols of the route. POLICY_BASED routes only.",
          ).optional(),
          region: z.string().describe(
            "Region of the route. DYNAMIC, PEERING_DYNAMIC, POLICY_BASED and ADVERTISED routes only. If set for POLICY_BASED route, this is a region of VLAN attachments for Cloud Interconnect the route applies to.",
          ).optional(),
          routeScope: z.enum(["ROUTE_SCOPE_UNSPECIFIED", "NETWORK", "NCC_HUB"])
            .describe(
              "Indicates where route is applicable. Deprecated, routes with NCC_HUB scope are not included in the trace in new tests.",
            ).optional(),
          routeType: z.enum([
            "ROUTE_TYPE_UNSPECIFIED",
            "SUBNET",
            "STATIC",
            "DYNAMIC",
            "PEERING_SUBNET",
            "PEERING_STATIC",
            "PEERING_DYNAMIC",
            "POLICY_BASED",
            "ADVERTISED",
          ]).describe("Type of route.").optional(),
          srcIpRange: z.string().describe(
            "Source IP address range of the route. POLICY_BASED routes only.",
          ).optional(),
          srcPortRanges: z.array(z.string()).describe(
            "Source port ranges of the route. POLICY_BASED routes only.",
          ).optional(),
          uri: z.string().describe(
            "URI of a route. SUBNET, STATIC, PEERING_SUBNET (only for peering network) and POLICY_BASED routes only.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine route.",
        ).optional(),
        serverlessExternalConnection: z.object({
          selectedIpAddress: z.string().describe(
            "Selected starting IP address, from the Google dynamic address pool.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a serverless public connection.",
        ).optional(),
        serverlessNeg: z.object({
          negUri: z.string().describe(
            "URI of the serverless network endpoint group.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with the serverless network endpoint group backend.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "START_FROM_INSTANCE",
          "START_FROM_INTERNET",
          "START_FROM_GOOGLE_SERVICE",
          "START_FROM_PRIVATE_NETWORK",
          "START_FROM_GKE_MASTER",
          "START_FROM_CLOUD_SQL_INSTANCE",
          "START_FROM_GKE_POD",
          "START_FROM_REDIS_INSTANCE",
          "START_FROM_REDIS_CLUSTER",
          "START_FROM_CLOUD_FUNCTION",
          "START_FROM_APP_ENGINE_VERSION",
          "START_FROM_CLOUD_RUN_REVISION",
          "START_FROM_STORAGE_BUCKET",
          "START_FROM_PSC_PUBLISHED_SERVICE",
          "START_FROM_SERVERLESS_NEG",
          "APPLY_INGRESS_FIREWALL_RULE",
          "APPLY_EGRESS_FIREWALL_RULE",
          "APPLY_ROUTE",
          "APPLY_FORWARDING_RULE",
          "ANALYZE_LOAD_BALANCER_BACKEND",
          "SPOOFING_APPROVED",
          "ARRIVE_AT_INSTANCE",
          "ARRIVE_AT_INTERNAL_LOAD_BALANCER",
          "ARRIVE_AT_EXTERNAL_LOAD_BALANCER",
          "ARRIVE_AT_HYBRID_SUBNET",
          "ARRIVE_AT_VPN_GATEWAY",
          "ARRIVE_AT_VPN_TUNNEL",
          "ARRIVE_AT_INTERCONNECT_ATTACHMENT",
          "ARRIVE_AT_VPC_CONNECTOR",
          "ARRIVE_AT_GKE_POD",
          "DIRECT_VPC_EGRESS_CONNECTION",
          "SERVERLESS_EXTERNAL_CONNECTION",
          "NGFW_PACKET_INSPECTION",
          "NAT",
          "SKIP_GKE_POD_IP_MASQUERADING",
          "SKIP_GKE_INGRESS_NETWORK_POLICY",
          "SKIP_GKE_EGRESS_NETWORK_POLICY",
          "APPLY_INGRESS_GKE_NETWORK_POLICY",
          "APPLY_EGRESS_GKE_NETWORK_POLICY",
          "PROXY_CONNECTION",
          "DELIVER",
          "DROP",
          "FORWARD",
          "ABORT",
          "VIEWER_PERMISSION_MISSING",
        ]).describe("Each step is in one of the pre-defined states.")
          .optional(),
        storageBucket: z.object({
          bucket: z.string().describe("Cloud Storage Bucket name.").optional(),
        }).describe(
          "For display only. Metadata associated with Storage Bucket.",
        ).optional(),
        vpcConnector: z.object({
          displayName: z.string().describe("Name of a VPC connector.")
            .optional(),
          location: z.string().describe(
            "Location in which the VPC connector is deployed.",
          ).optional(),
          uri: z.string().describe("URI of a VPC connector.").optional(),
        }).describe(
          "For display only. Metadata associated with a VPC connector.",
        ).optional(),
        vpnGateway: z.object({
          displayName: z.string().describe("Name of a VPN gateway.").optional(),
          ipAddress: z.string().describe("IP address of the VPN gateway.")
            .optional(),
          networkUri: z.string().describe(
            "URI of a Compute Engine network where the VPN gateway is configured.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where this VPN gateway is configured.",
          ).optional(),
          uri: z.string().describe("URI of a VPN gateway.").optional(),
          vpnTunnelUri: z.string().describe(
            "A VPN tunnel that is associated with this VPN gateway. There may be multiple VPN tunnels configured on a VPN gateway, and only the one relevant to the test is displayed.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine VPN gateway.",
        ).optional(),
        vpnTunnel: z.object({
          displayName: z.string().describe("Name of a VPN tunnel.").optional(),
          networkUri: z.string().describe(
            "URI of a Compute Engine network where the VPN tunnel is configured.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where this VPN tunnel is configured.",
          ).optional(),
          remoteGateway: z.string().describe(
            "URI of a VPN gateway at remote end of the tunnel.",
          ).optional(),
          remoteGatewayIp: z.string().describe(
            "Remote VPN gateway's IP address.",
          ).optional(),
          routingType: z.enum([
            "ROUTING_TYPE_UNSPECIFIED",
            "ROUTE_BASED",
            "POLICY_BASED",
            "DYNAMIC",
          ]).describe("Type of the routing policy.").optional(),
          sourceGateway: z.string().describe(
            "URI of the VPN gateway at local end of the tunnel.",
          ).optional(),
          sourceGatewayIp: z.string().describe(
            "Local VPN gateway's IP address.",
          ).optional(),
          uri: z.string().describe("URI of a VPN tunnel.").optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine VPN tunnel.",
        ).optional(),
      })).describe(
        "A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them.",
      ).optional(),
    })).describe(
      "Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends.",
    ).optional(),
    verifyTime: z.string().describe("The time of the configuration analysis.")
      .optional(),
  }).describe(
    "Results of the configuration analysis from the last run of the test.",
  ).optional(),
  relatedProjects: z.array(z.string()).describe(
    "Other projects that may be relevant for reachability analysis. This is applicable to scenarios where a test can cross project boundaries.",
  ).optional(),
  returnReachabilityDetails: z.object({
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
    result: z.enum([
      "RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "AMBIGUOUS",
      "UNDETERMINED",
    ]).describe("The overall result of the test's configuration analysis.")
      .optional(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string().describe("Destination IP address.")
          .optional(),
        destinationNetworkUri: z.string().describe(
          "URI of the network where this packet is sent to.",
        ).optional(),
        destinationPort: z.number().int().describe(
          "Destination port. Only valid when protocol is TCP or UDP.",
        ).optional(),
        protocol: z.string().describe(
          'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
        ).optional(),
        sourceAgentUri: z.string().describe(
          "URI of the source telemetry agent this packet originates from.",
        ).optional(),
        sourceIp: z.string().describe("Source IP address.").optional(),
        sourceNetworkUri: z.string().describe(
          "URI of the network where this packet originates from.",
        ).optional(),
        sourcePort: z.number().int().describe(
          "Source port. Only valid when protocol is TCP or UDP.",
        ).optional(),
      }).describe(
        "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
      ).optional(),
      forwardTraceId: z.number().int().describe(
        "ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace.",
      ).optional(),
      steps: z.array(z.object({
        abort: z.object({
          cause: z.enum([
            "CAUSE_UNSPECIFIED",
            "UNKNOWN_NETWORK",
            "UNKNOWN_PROJECT",
            "NO_EXTERNAL_IP",
            "UNINTENDED_DESTINATION",
            "SOURCE_ENDPOINT_NOT_FOUND",
            "MISMATCHED_SOURCE_NETWORK",
            "DESTINATION_ENDPOINT_NOT_FOUND",
            "MISMATCHED_DESTINATION_NETWORK",
            "UNKNOWN_IP",
            "GOOGLE_MANAGED_SERVICE_UNKNOWN_IP",
            "SOURCE_IP_ADDRESS_NOT_IN_SOURCE_NETWORK",
            "PERMISSION_DENIED",
            "PERMISSION_DENIED_NO_CLOUD_NAT_CONFIGS",
            "PERMISSION_DENIED_NO_NEG_ENDPOINT_CONFIGS",
            "PERMISSION_DENIED_NO_CLOUD_ROUTER_CONFIGS",
            "NO_SOURCE_LOCATION",
            "NO_SOURCE_GCP_NETWORK_LOCATION",
            "NO_SOURCE_NON_GCP_NETWORK_LOCATION",
            "NO_SOURCE_INTERNET_LOCATION",
            "INVALID_ARGUMENT",
            "TRACE_TOO_LONG",
            "INTERNAL_ERROR",
            "UNSUPPORTED",
            "MISMATCHED_IP_VERSION",
            "GKE_KONNECTIVITY_PROXY_UNSUPPORTED",
            "RESOURCE_CONFIG_NOT_FOUND",
            "VM_INSTANCE_CONFIG_NOT_FOUND",
            "NETWORK_CONFIG_NOT_FOUND",
            "FIREWALL_CONFIG_NOT_FOUND",
            "ROUTE_CONFIG_NOT_FOUND",
            "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_PSC_ENDPOINT",
            "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_ENDPOINT",
            "SOURCE_PSC_CLOUD_SQL_UNSUPPORTED",
            "SOURCE_EXTERNAL_CLOUD_SQL_UNSUPPORTED",
            "SOURCE_REDIS_CLUSTER_UNSUPPORTED",
            "SOURCE_REDIS_INSTANCE_UNSUPPORTED",
            "SOURCE_FORWARDING_RULE_UNSUPPORTED",
            "NON_ROUTABLE_IP_ADDRESS",
            "UNKNOWN_ISSUE_IN_GOOGLE_MANAGED_PROJECT",
            "UNSUPPORTED_GOOGLE_MANAGED_PROJECT_CONFIG",
            "NO_SERVERLESS_IP_RANGES",
            "IP_VERSION_PROTOCOL_MISMATCH",
            "GKE_POD_UNKNOWN_ENDPOINT_LOCATION",
          ]).describe("Causes that the analysis is aborted.").optional(),
          ipAddress: z.string().describe("IP address that caused the abort.")
            .optional(),
          projectsMissingPermission: z.array(z.string()).describe(
            "List of project IDs the user specified in the request but lacks access to. In this case, analysis is aborted with the PERMISSION_DENIED cause.",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that caused the abort.",
          ).optional(),
        }).describe(
          'Details of the final state "abort" and associated resource.',
        ).optional(),
        appEngineVersion: z.object({
          displayName: z.string().describe("Name of an App Engine version.")
            .optional(),
          environment: z.string().describe(
            "App Engine execution environment for a version.",
          ).optional(),
          runtime: z.string().describe("Runtime of the App Engine version.")
            .optional(),
          uri: z.string().describe("URI of an App Engine version.").optional(),
        }).describe(
          "For display only. Metadata associated with an App Engine version.",
        ).optional(),
        causesDrop: z.boolean().describe(
          "This is a step that leads to the final state Drop.",
        ).optional(),
        cloudFunction: z.object({
          displayName: z.string().describe("Name of a Cloud Function.")
            .optional(),
          location: z.string().describe(
            "Location in which the Cloud Function is deployed.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Function.").optional(),
          versionId: z.string().describe(
            "Latest successfully deployed version id of the Cloud Function.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Function.",
        ).optional(),
        cloudRunRevision: z.object({
          displayName: z.string().describe("Name of a Cloud Run revision.")
            .optional(),
          location: z.string().describe(
            "Location in which this revision is deployed.",
          ).optional(),
          serviceUri: z.string().describe(
            "URI of Cloud Run service this revision belongs to.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Run revision.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Run revision.",
        ).optional(),
        cloudSqlInstance: z.object({
          displayName: z.string().describe("Name of a Cloud SQL instance.")
            .optional(),
          externalIp: z.string().describe(
            "External IP address of a Cloud SQL instance.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of a Cloud SQL instance.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of a Cloud SQL instance network or empty string if the instance does not have one.",
          ).optional(),
          region: z.string().describe(
            "Region in which the Cloud SQL instance is running.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud SQL instance.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud SQL instance.",
        ).optional(),
        deliver: z.object({
          googleServiceType: z.enum([
            "GOOGLE_SERVICE_TYPE_UNSPECIFIED",
            "IAP",
            "GFE_PROXY_OR_HEALTH_CHECK_PROBER",
            "CLOUD_DNS",
            "PRIVATE_GOOGLE_ACCESS",
            "SERVERLESS_VPC_ACCESS",
          ]).describe(
            "Recognized type of a Google Service the packet is delivered to (if applicable).",
          ).optional(),
          ipAddress: z.string().describe(
            "IP address of the target (if applicable).",
          ).optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target the packet is delivered to (if applicable).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that the packet is delivered to.",
          ).optional(),
          storageBucket: z.string().describe(
            "Name of the Cloud Storage Bucket the packet is delivered to (if applicable).",
          ).optional(),
          target: z.enum([
            "TARGET_UNSPECIFIED",
            "INSTANCE",
            "INTERNET",
            "GOOGLE_API",
            "GKE_MASTER",
            "CLOUD_SQL_INSTANCE",
            "PSC_PUBLISHED_SERVICE",
            "PSC_GOOGLE_API",
            "PSC_VPC_SC",
            "SERVERLESS_NEG",
            "STORAGE_BUCKET",
            "PRIVATE_NETWORK",
            "CLOUD_FUNCTION",
            "APP_ENGINE_VERSION",
            "CLOUD_RUN_REVISION",
            "GOOGLE_MANAGED_SERVICE",
            "REDIS_INSTANCE",
            "REDIS_CLUSTER",
            "GKE_POD",
          ]).describe("Target type where the packet is delivered to.")
            .optional(),
        }).describe(
          'Details of the final state "deliver" and associated resource.',
        ).optional(),
        description: z.string().describe(
          "A description of the step. Usually this is a summary of the state.",
        ).optional(),
        directVpcEgressConnection: z.object({
          networkUri: z.string().describe("URI of direct access network.")
            .optional(),
          region: z.string().describe(
            "Region in which the Direct VPC egress is deployed.",
          ).optional(),
          selectedIpAddress: z.string().describe(
            "Selected starting IP address, from the selected IP range.",
          ).optional(),
          selectedIpRange: z.string().describe("Selected IP range.").optional(),
          subnetworkUri: z.string().describe("URI of direct access subnetwork.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a serverless direct VPC egress connection.",
        ).optional(),
        drop: z.object({
          cause: z.enum([
            "CAUSE_UNSPECIFIED",
            "UNKNOWN_EXTERNAL_ADDRESS",
            "FOREIGN_IP_DISALLOWED",
            "FIREWALL_RULE",
            "NO_ROUTE",
            "ROUTE_BLACKHOLE",
            "ROUTE_WRONG_NETWORK",
            "ROUTE_NEXT_HOP_IP_ADDRESS_NOT_RESOLVED",
            "ROUTE_NEXT_HOP_RESOURCE_NOT_FOUND",
            "ROUTE_NEXT_HOP_INSTANCE_WRONG_NETWORK",
            "ROUTE_NEXT_HOP_INSTANCE_NON_PRIMARY_IP",
            "ROUTE_NEXT_HOP_FORWARDING_RULE_IP_MISMATCH",
            "ROUTE_NEXT_HOP_VPN_TUNNEL_NOT_ESTABLISHED",
            "ROUTE_NEXT_HOP_FORWARDING_RULE_TYPE_INVALID",
            "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV6_ADDRESS",
            "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV4_ADDRESS",
            "NO_ROUTE_FROM_EXTERNAL_IPV6_SOURCE_TO_PRIVATE_IPV6_ADDRESS",
            "VPN_TUNNEL_LOCAL_SELECTOR_MISMATCH",
            "VPN_TUNNEL_REMOTE_SELECTOR_MISMATCH",
            "PRIVATE_TRAFFIC_TO_INTERNET",
            "PRIVATE_GOOGLE_ACCESS_DISALLOWED",
            "PRIVATE_GOOGLE_ACCESS_VIA_VPN_TUNNEL_UNSUPPORTED",
            "NO_EXTERNAL_ADDRESS",
            "UNKNOWN_INTERNAL_ADDRESS",
            "FORWARDING_RULE_MISMATCH",
            "FORWARDING_RULE_NO_INSTANCES",
            "FIREWALL_BLOCKING_LOAD_BALANCER_BACKEND_HEALTH_CHECK",
            "INGRESS_FIREWALL_TAGS_UNSUPPORTED_BY_DIRECT_VPC_EGRESS",
            "INSTANCE_NOT_RUNNING",
            "GKE_CLUSTER_NOT_RUNNING",
            "GKE_POD_NOT_RUNNING",
            "CLOUD_SQL_INSTANCE_NOT_RUNNING",
            "REDIS_INSTANCE_NOT_RUNNING",
            "REDIS_CLUSTER_NOT_RUNNING",
            "TRAFFIC_TYPE_BLOCKED",
            "GKE_MASTER_UNAUTHORIZED_ACCESS",
            "CLOUD_SQL_INSTANCE_UNAUTHORIZED_ACCESS",
            "DROPPED_INSIDE_GKE_SERVICE",
            "DROPPED_INSIDE_CLOUD_SQL_SERVICE",
            "GOOGLE_MANAGED_SERVICE_NO_PEERING",
            "GOOGLE_MANAGED_SERVICE_NO_PSC_ENDPOINT",
            "GKE_PSC_ENDPOINT_MISSING",
            "CLOUD_SQL_INSTANCE_NO_IP_ADDRESS",
            "GKE_CONTROL_PLANE_REGION_MISMATCH",
            "PUBLIC_GKE_CONTROL_PLANE_TO_PRIVATE_DESTINATION",
            "GKE_CONTROL_PLANE_NO_ROUTE",
            "CLOUD_SQL_INSTANCE_NOT_CONFIGURED_FOR_EXTERNAL_TRAFFIC",
            "PUBLIC_CLOUD_SQL_INSTANCE_TO_PRIVATE_DESTINATION",
            "CLOUD_SQL_INSTANCE_NO_ROUTE",
            "CLOUD_SQL_CONNECTOR_REQUIRED",
            "CLOUD_FUNCTION_NOT_ACTIVE",
            "VPC_CONNECTOR_NOT_SET",
            "VPC_CONNECTOR_NOT_RUNNING",
            "VPC_CONNECTOR_SERVERLESS_TRAFFIC_BLOCKED",
            "VPC_CONNECTOR_HEALTH_CHECK_TRAFFIC_BLOCKED",
            "FORWARDING_RULE_REGION_MISMATCH",
            "PSC_CONNECTION_NOT_ACCEPTED",
            "PSC_ENDPOINT_ACCESSED_FROM_PEERED_NETWORK",
            "PSC_NEG_PRODUCER_ENDPOINT_NO_GLOBAL_ACCESS",
            "PSC_NEG_PRODUCER_FORWARDING_RULE_MULTIPLE_PORTS",
            "CLOUD_SQL_PSC_NEG_UNSUPPORTED",
            "NO_NAT_SUBNETS_FOR_PSC_SERVICE_ATTACHMENT",
            "PSC_TRANSITIVITY_NOT_PROPAGATED",
            "HYBRID_NEG_NON_DYNAMIC_ROUTE_MATCHED",
            "HYBRID_NEG_NON_LOCAL_DYNAMIC_ROUTE_MATCHED",
            "CLOUD_RUN_REVISION_NOT_READY",
            "DROPPED_INSIDE_PSC_SERVICE_PRODUCER",
            "LOAD_BALANCER_HAS_NO_PROXY_SUBNET",
            "CLOUD_NAT_NO_ADDRESSES",
            "ROUTING_LOOP",
            "DROPPED_INSIDE_GOOGLE_MANAGED_SERVICE",
            "LOAD_BALANCER_BACKEND_INVALID_NETWORK",
            "BACKEND_SERVICE_NAMED_PORT_NOT_DEFINED",
            "DESTINATION_IS_PRIVATE_NAT_IP_RANGE",
            "DROPPED_INSIDE_REDIS_INSTANCE_SERVICE",
            "REDIS_INSTANCE_UNSUPPORTED_PORT",
            "REDIS_INSTANCE_CONNECTING_FROM_PUPI_ADDRESS",
            "REDIS_INSTANCE_NO_ROUTE_TO_DESTINATION_NETWORK",
            "REDIS_INSTANCE_NO_EXTERNAL_IP",
            "REDIS_INSTANCE_UNSUPPORTED_PROTOCOL",
            "DROPPED_INSIDE_REDIS_CLUSTER_SERVICE",
            "REDIS_CLUSTER_UNSUPPORTED_PORT",
            "REDIS_CLUSTER_NO_EXTERNAL_IP",
            "REDIS_CLUSTER_UNSUPPORTED_PROTOCOL",
            "NO_ADVERTISED_ROUTE_TO_GCP_DESTINATION",
            "NO_TRAFFIC_SELECTOR_TO_GCP_DESTINATION",
            "NO_KNOWN_ROUTE_FROM_PEERED_NETWORK_TO_DESTINATION",
            "PRIVATE_NAT_TO_PSC_ENDPOINT_UNSUPPORTED",
            "PSC_PORT_MAPPING_PORT_MISMATCH",
            "PSC_PORT_MAPPING_WITHOUT_PSC_CONNECTION_UNSUPPORTED",
            "UNSUPPORTED_ROUTE_MATCHED_FOR_NAT64_DESTINATION",
            "TRAFFIC_FROM_HYBRID_ENDPOINT_TO_INTERNET_DISALLOWED",
            "NO_MATCHING_NAT64_GATEWAY",
            "NO_CONFIGURED_PRIVATE_NAT64_RULE",
            "LOAD_BALANCER_BACKEND_IP_VERSION_MISMATCH",
            "NO_KNOWN_ROUTE_FROM_NCC_NETWORK_TO_DESTINATION",
            "CLOUD_NAT_PROTOCOL_UNSUPPORTED",
            "L2_INTERCONNECT_UNSUPPORTED_PROTOCOL",
            "L2_INTERCONNECT_UNSUPPORTED_PORT",
            "L2_INTERCONNECT_DESTINATION_IP_MISMATCH",
            "NCC_ROUTE_WITHIN_HYBRID_SUBNET_UNSUPPORTED",
            "HYBRID_SUBNET_REGION_MISMATCH",
            "HYBRID_SUBNET_NO_ROUTE",
            "GKE_NETWORK_POLICY",
            "NO_VALID_ROUTE_FROM_GOOGLE_MANAGED_NETWORK_TO_DESTINATION",
          ]).describe("Cause that the packet is dropped.").optional(),
          destinationGeolocationCode: z.string().describe(
            "Geolocation (region code) of the destination IP address (if relevant).",
          ).optional(),
          destinationIp: z.string().describe(
            "Destination IP address of the dropped packet (if relevant).",
          ).optional(),
          region: z.string().describe(
            "Region of the dropped packet (if relevant).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that caused the drop.",
          ).optional(),
          sourceGeolocationCode: z.string().describe(
            "Geolocation (region code) of the source IP address (if relevant).",
          ).optional(),
          sourceIp: z.string().describe(
            "Source IP address of the dropped packet (if relevant).",
          ).optional(),
        }).describe(
          'Details of the final state "drop" and associated resource.',
        ).optional(),
        endpoint: z.object({
          destinationIp: z.string().describe("Destination IP address.")
            .optional(),
          destinationNetworkUri: z.string().describe(
            "URI of the network where this packet is sent to.",
          ).optional(),
          destinationPort: z.number().int().describe(
            "Destination port. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          sourceAgentUri: z.string().describe(
            "URI of the source telemetry agent this packet originates from.",
          ).optional(),
          sourceIp: z.string().describe("Source IP address.").optional(),
          sourceNetworkUri: z.string().describe(
            "URI of the network where this packet originates from.",
          ).optional(),
          sourcePort: z.number().int().describe(
            "Source port. Only valid when protocol is TCP or UDP.",
          ).optional(),
        }).describe(
          "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
        ).optional(),
        firewall: z.object({
          action: z.string().describe(
            "Possible values: ALLOW, DENY, APPLY_SECURITY_PROFILE_GROUP",
          ).optional(),
          direction: z.string().describe("Possible values: INGRESS, EGRESS")
            .optional(),
          displayName: z.string().describe(
            "The display name of the firewall rule. This field might be empty for firewall policy rules.",
          ).optional(),
          firewallRuleType: z.enum([
            "FIREWALL_RULE_TYPE_UNSPECIFIED",
            "HIERARCHICAL_FIREWALL_POLICY_RULE",
            "VPC_FIREWALL_RULE",
            "IMPLIED_VPC_FIREWALL_RULE",
            "SERVERLESS_VPC_ACCESS_MANAGED_FIREWALL_RULE",
            "NETWORK_FIREWALL_POLICY_RULE",
            "NETWORK_REGIONAL_FIREWALL_POLICY_RULE",
            "SYSTEM_NETWORK_FIREWALL_POLICY_RULE",
            "SYSTEM_REGIONAL_NETWORK_FIREWALL_POLICY_RULE",
            "UNSUPPORTED_FIREWALL_POLICY_RULE",
            "TRACKING_STATE",
            "ANALYSIS_SKIPPED",
          ]).describe("The firewall rule's type.").optional(),
          networkUri: z.string().describe(
            "The URI of the VPC network that the firewall rule is associated with. This field is not applicable to hierarchical firewall policy rules.",
          ).optional(),
          policy: z.string().describe(
            "The name of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          policyPriority: z.number().int().describe(
            "The priority of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          policyUri: z.string().describe(
            "The URI of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          priority: z.number().int().describe(
            "The priority of the firewall rule.",
          ).optional(),
          targetServiceAccounts: z.array(z.string()).describe(
            "The target service accounts specified by the firewall rule.",
          ).optional(),
          targetTags: z.array(z.string()).describe(
            "The target tags defined by the VPC firewall rule. This field is not applicable to firewall policy rules.",
          ).optional(),
          targetType: z.enum([
            "TARGET_TYPE_UNSPECIFIED",
            "INSTANCES",
            "INTERNAL_MANAGED_LB",
          ]).describe("Target type of the firewall rule.").optional(),
          uri: z.string().describe(
            "The URI of the firewall rule. This field is not applicable to implied VPC firewall rules.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.",
        ).optional(),
        forward: z.object({
          ipAddress: z.string().describe(
            "IP address of the target (if applicable).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that the packet is forwarded to.",
          ).optional(),
          target: z.enum([
            "TARGET_UNSPECIFIED",
            "PEERING_VPC",
            "VPN_GATEWAY",
            "INTERCONNECT",
            "GKE_MASTER",
            "IMPORTED_CUSTOM_ROUTE_NEXT_HOP",
            "CLOUD_SQL_INSTANCE",
            "ANOTHER_PROJECT",
            "NCC_HUB",
            "ROUTER_APPLIANCE",
            "SECURE_WEB_PROXY_GATEWAY",
          ]).describe("Target type where this packet is forwarded to.")
            .optional(),
        }).describe(
          'Details of the final state "forward" and associated resource.',
        ).optional(),
        forwardingRule: z.object({
          displayName: z.string().describe("Name of the forwarding rule.")
            .optional(),
          loadBalancerName: z.string().describe(
            "Name of the load balancer the forwarding rule belongs to. Empty for forwarding rules not related to load balancers (like PSC forwarding rules).",
          ).optional(),
          matchedPortRange: z.string().describe(
            "Port range defined in the forwarding rule that matches the packet.",
          ).optional(),
          matchedProtocol: z.string().describe(
            "Protocol defined in the forwarding rule that matches the packet.",
          ).optional(),
          networkUri: z.string().describe("Network URI.").optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target this forwarding rule targets (if applicable).",
          ).optional(),
          pscServiceAttachmentUri: z.string().describe(
            "URI of the PSC service attachment this forwarding rule targets (if applicable).",
          ).optional(),
          region: z.string().describe(
            "Region of the forwarding rule. Set only for regional forwarding rules.",
          ).optional(),
          target: z.string().describe("Target type of the forwarding rule.")
            .optional(),
          uri: z.string().describe("URI of the forwarding rule.").optional(),
          vip: z.string().describe("VIP of the forwarding rule.").optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine forwarding rule.",
        ).optional(),
        gkeMaster: z.object({
          clusterNetworkUri: z.string().describe(
            "URI of a GKE cluster network.",
          ).optional(),
          clusterUri: z.string().describe("URI of a GKE cluster.").optional(),
          dnsEndpoint: z.string().describe(
            "DNS endpoint of a GKE cluster control plane.",
          ).optional(),
          externalIp: z.string().describe(
            "External IP address of a GKE cluster control plane.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of a GKE cluster control plane.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.",
        ).optional(),
        gkeNetworkPolicy: z.object({
          action: z.string().describe("Possible values: ALLOW, DENY")
            .optional(),
          direction: z.string().describe("Possible values: INGRESS, EGRESS")
            .optional(),
          displayName: z.string().describe("The name of the Network Policy.")
            .optional(),
          uri: z.string().describe(
            "The URI of the Network Policy. Format for a Network Policy in a zonal cluster: `projects//zones//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/` Format for a Network Policy in a regional cluster: `projects//locations//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/`",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a GKE Network Policy.",
        ).optional(),
        gkeNetworkPolicySkipped: z.object({
          reason: z.enum([
            "REASON_UNSPECIFIED",
            "NETWORK_POLICY_DISABLED",
            "INGRESS_SOURCE_ON_SAME_NODE",
            "EGRESS_FROM_NODE_NETWORK_NAMESPACE_POD",
            "NETWORK_POLICY_NOT_APPLIED_TO_RESPONSE_TRAFFIC",
            "NETWORK_POLICY_ANALYSIS_UNSUPPORTED",
          ]).describe("Reason why Network Policy evaluation was skipped.")
            .optional(),
        }).describe(
          "For display only. Contains information about why GKE Network Policy evaluation was skipped.",
        ).optional(),
        gkePod: z.object({
          ipAddress: z.string().describe(
            "IP address of a GKE Pod. If the Pod is dual-stack, this is the IP address relevant to the trace.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of the network containing the GKE Pod.",
          ).optional(),
          podUri: z.string().describe(
            "URI of a GKE Pod. For Pods in regional Clusters, the URI format is: `projects/{project}/locations/{location}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}` For Pods in zonal Clusters, the URI format is: `projects/{project}/zones/{zone}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}`",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.",
        ).optional(),
        googleService: z.object({
          googleServiceType: z.enum([
            "GOOGLE_SERVICE_TYPE_UNSPECIFIED",
            "IAP",
            "GFE_PROXY_OR_HEALTH_CHECK_PROBER",
            "CLOUD_DNS",
            "GOOGLE_API",
            "GOOGLE_API_PSC",
            "GOOGLE_API_VPC_SC",
            "SERVERLESS_VPC_ACCESS",
          ]).describe("Recognized type of a Google Service.").optional(),
          sourceIp: z.string().describe("Source IP address.").optional(),
        }).describe(
          "For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths",
        ).optional(),
        hybridSubnet: z.object({
          displayName: z.string().describe("Name of a hybrid subnet.")
            .optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where the hybrid subnet is configured.",
          ).optional(),
          uri: z.string().describe("URI of a hybrid subnet.").optional(),
        }).describe(
          "For display only. Metadata associated with a hybrid subnet.",
        ).optional(),
        instance: z.object({
          displayName: z.string().describe("Name of a Compute Engine instance.")
            .optional(),
          externalIp: z.string().describe(
            "External IP address of the network interface.",
          ).optional(),
          interface: z.string().describe(
            "Name of the network interface of a Compute Engine instance.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of the network interface.",
          ).optional(),
          networkTags: z.array(z.string()).describe(
            "Network tags configured on the instance.",
          ).optional(),
          networkUri: z.string().describe("URI of a Compute Engine network.")
            .optional(),
          pscNetworkAttachmentUri: z.string().describe(
            "URI of the PSC network attachment the NIC is attached to (if relevant).",
          ).optional(),
          running: z.boolean().describe(
            "Indicates whether the Compute Engine instance is running. Deprecated: use the `status` field instead.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Service account authorized for the instance.",
          ).optional(),
          status: z.enum(["STATUS_UNSPECIFIED", "RUNNING", "NOT_RUNNING"])
            .describe("The status of the instance.").optional(),
          uri: z.string().describe("URI of a Compute Engine instance.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine instance.",
        ).optional(),
        interconnectAttachment: z.object({
          cloudRouterUri: z.string().describe(
            "URI of the Cloud Router to be used for dynamic routing.",
          ).optional(),
          displayName: z.string().describe(
            "Name of an Interconnect attachment.",
          ).optional(),
          interconnectUri: z.string().describe(
            "URI of the Interconnect where the Interconnect attachment is configured.",
          ).optional(),
          l2AttachmentMatchedIpAddress: z.string().describe(
            "Appliance IP address that was matched for L2_DEDICATED attachments.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where the Interconnect attachment is configured.",
          ).optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "DEDICATED",
            "PARTNER",
            "PARTNER_PROVIDER",
            "L2_DEDICATED",
          ]).describe("The type of interconnect attachment this is.")
            .optional(),
          uri: z.string().describe("URI of an Interconnect attachment.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with an Interconnect attachment.",
        ).optional(),
        ipMasqueradingSkipped: z.object({
          nonMasqueradeRange: z.string().describe(
            "The matched non-masquerade IP range. Only set if reason is DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE or DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE.",
          ).optional(),
          reason: z.enum([
            "REASON_UNSPECIFIED",
            "DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE",
            "DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE",
            "DESTINATION_ON_SAME_NODE",
            "DEFAULT_SNAT_DISABLED",
            "NO_MASQUERADING_FOR_IPV6",
            "POD_USES_NODE_NETWORK_NAMESPACE",
            "NO_MASQUERADING_FOR_RETURN_PACKET",
          ]).describe("Reason why IP masquerading was not applied.").optional(),
        }).describe(
          "For display only. Contains information about why IP masquerading was skipped for the packet.",
        ).optional(),
        loadBalancer: z.object({
          backendType: z.enum([
            "BACKEND_TYPE_UNSPECIFIED",
            "BACKEND_SERVICE",
            "TARGET_POOL",
            "TARGET_INSTANCE",
          ]).describe("Type of load balancer's backend configuration.")
            .optional(),
          backendUri: z.string().describe("Backend configuration URI.")
            .optional(),
          backends: z.array(z.object({
            displayName: z.string().describe(
              "Name of a Compute Engine instance or network endpoint.",
            ).optional(),
            healthCheckAllowingFirewallRules: z.array(z.string()).describe(
              "A list of firewall rule URIs allowing probes from health check IP ranges.",
            ).optional(),
            healthCheckBlockingFirewallRules: z.array(z.string()).describe(
              "A list of firewall rule URIs blocking probes from health check IP ranges.",
            ).optional(),
            healthCheckFirewallState: z.enum([
              "HEALTH_CHECK_FIREWALL_STATE_UNSPECIFIED",
              "CONFIGURED",
              "MISCONFIGURED",
            ]).describe("State of the health check firewall configuration.")
              .optional(),
            uri: z.string().describe(
              "URI of a Compute Engine instance or network endpoint.",
            ).optional(),
          })).describe("Information for the loadbalancer backends.").optional(),
          healthCheckUri: z.string().describe(
            "URI of the health check for the load balancer. Deprecated and no longer populated as different load balancer backends might have different health checks.",
          ).optional(),
          loadBalancerType: z.enum([
            "LOAD_BALANCER_TYPE_UNSPECIFIED",
            "INTERNAL_TCP_UDP",
            "NETWORK_TCP_UDP",
            "HTTP_PROXY",
            "TCP_PROXY",
            "SSL_PROXY",
          ]).describe("Type of the load balancer.").optional(),
        }).describe(
          "For display only. Metadata associated with a load balancer.",
        ).optional(),
        loadBalancerBackendInfo: z.object({
          backendBucketUri: z.string().describe(
            "URI of the backend bucket this backend targets (if applicable).",
          ).optional(),
          backendServiceUri: z.string().describe(
            "URI of the backend service this backend belongs to (if applicable).",
          ).optional(),
          healthCheckFirewallsConfigState: z.enum([
            "HEALTH_CHECK_FIREWALLS_CONFIG_STATE_UNSPECIFIED",
            "FIREWALLS_CONFIGURED",
            "FIREWALLS_PARTIALLY_CONFIGURED",
            "FIREWALLS_NOT_CONFIGURED",
            "FIREWALLS_UNSUPPORTED",
          ]).describe(
            "Output only. Health check firewalls configuration state for the backend. This is a result of the static firewall analysis (verifying that health check traffic from required IP ranges to the backend is allowed or not). The backend might still be unhealthy even if these firewalls are configured. Please refer to the documentation for more information: https://cloud.google.com/load-balancing/docs/firewall-rules",
          ).optional(),
          healthCheckUri: z.string().describe(
            "URI of the health check attached to this backend (if applicable).",
          ).optional(),
          instanceGroupUri: z.string().describe(
            "URI of the instance group this backend belongs to (if applicable).",
          ).optional(),
          instanceUri: z.string().describe(
            "URI of the backend instance (if applicable). Populated for instance group backends, and zonal NEG backends.",
          ).optional(),
          name: z.string().describe(
            "Display name of the backend. For example, it might be an instance name for the instance group backends, or an IP address and port for zonal network endpoint group backends.",
          ).optional(),
          networkEndpointGroupUri: z.string().describe(
            "URI of the network endpoint group this backend belongs to (if applicable).",
          ).optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target this PSC NEG backend targets (if applicable).",
          ).optional(),
          pscServiceAttachmentUri: z.string().describe(
            "URI of the PSC service attachment this PSC NEG backend targets (if applicable).",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with the load balancer backend.",
        ).optional(),
        nat: z.object({
          cloudNatGatewayType: z.enum([
            "CLOUD_NAT_GATEWAY_TYPE_UNSPECIFIED",
            "PUBLIC_NAT44",
            "PUBLIC_NAT64",
            "PRIVATE_NAT_NCC",
            "PRIVATE_NAT_HYBRID",
            "PRIVATE_NAT64",
          ]).describe(
            "Type of Cloud NAT gateway. Only valid when `type` is CLOUD_NAT.",
          ).optional(),
          natGatewayName: z.string().describe(
            "The name of Cloud NAT Gateway. Only valid when type is CLOUD_NAT.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of the network where NAT translation takes place.",
          ).optional(),
          newDestinationIp: z.string().describe(
            "Destination IP address after NAT translation.",
          ).optional(),
          newDestinationPort: z.number().int().describe(
            "Destination port after NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          newSourceIp: z.string().describe(
            "Source IP address after NAT translation.",
          ).optional(),
          newSourcePort: z.number().int().describe(
            "Source port after NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldDestinationIp: z.string().describe(
            "Destination IP address before NAT translation.",
          ).optional(),
          oldDestinationPort: z.number().int().describe(
            "Destination port before NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldSourceIp: z.string().describe(
            "Source IP address before NAT translation.",
          ).optional(),
          oldSourcePort: z.number().int().describe(
            "Source port before NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          routerUri: z.string().describe(
            "Uri of the Cloud Router. Only valid when type is CLOUD_NAT.",
          ).optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "INTERNAL_TO_EXTERNAL",
            "EXTERNAL_TO_INTERNAL",
            "CLOUD_NAT",
            "PRIVATE_SERVICE_CONNECT",
            "GKE_POD_IP_MASQUERADING",
          ]).describe("Type of NAT.").optional(),
        }).describe("For display only. Metadata associated with NAT.")
          .optional(),
        network: z.object({
          displayName: z.string().describe("Name of a Compute Engine network.")
            .optional(),
          matchedIpRange: z.string().describe(
            "The IP range of the subnet matching the source IP address of the test.",
          ).optional(),
          matchedSubnetUri: z.string().describe(
            "URI of the subnet matching the source IP address of the test.",
          ).optional(),
          region: z.string().describe(
            "The region of the subnet matching the source IP address of the test.",
          ).optional(),
          uri: z.string().describe("URI of a Compute Engine network.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine network.",
        ).optional(),
        ngfwPacketInspection: z.object({
          securityProfileGroupUri: z.string().describe(
            "URI of the security profile group associated with this firewall packet inspection.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a layer 7 packet inspection by the firewall.",
        ).optional(),
        projectId: z.string().describe(
          "Project ID that contains the configuration this step is validating.",
        ).optional(),
        proxyConnection: z.object({
          networkUri: z.string().describe(
            "URI of the network where connection is proxied.",
          ).optional(),
          newDestinationIp: z.string().describe(
            "Destination IP address of a new connection.",
          ).optional(),
          newDestinationPort: z.number().int().describe(
            "Destination port of a new connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          newSourceIp: z.string().describe(
            "Source IP address of a new connection.",
          ).optional(),
          newSourcePort: z.number().int().describe(
            "Source port of a new connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldDestinationIp: z.string().describe(
            "Destination IP address of an original connection",
          ).optional(),
          oldDestinationPort: z.number().int().describe(
            "Destination port of an original connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldSourceIp: z.string().describe(
            "Source IP address of an original connection.",
          ).optional(),
          oldSourcePort: z.number().int().describe(
            "Source port of an original connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          subnetUri: z.string().describe("Uri of proxy subnet.").optional(),
        }).describe(
          "For display only. Metadata associated with ProxyConnection.",
        ).optional(),
        redisCluster: z.object({
          discoveryEndpointIpAddress: z.string().describe(
            "Discovery endpoint IP address of a Redis Cluster.",
          ).optional(),
          displayName: z.string().describe("Name of a Redis Cluster.")
            .optional(),
          location: z.string().describe(
            'Name of the region in which the Redis Cluster is defined. For example, "us-central1".',
          ).optional(),
          networkUri: z.string().describe(
            'URI of the network containing the Redis Cluster endpoints in format "projects/{project_id}/global/networks/{network_id}".',
          ).optional(),
          secondaryEndpointIpAddress: z.string().describe(
            "Secondary endpoint IP address of a Redis Cluster.",
          ).optional(),
          uri: z.string().describe(
            'URI of a Redis Cluster in format "projects/{project_id}/locations/{location}/clusters/{cluster_id}"',
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Redis Cluster.",
        ).optional(),
        redisInstance: z.object({
          displayName: z.string().describe("Name of a Cloud Redis Instance.")
            .optional(),
          networkUri: z.string().describe(
            "URI of a Cloud Redis Instance network.",
          ).optional(),
          primaryEndpointIp: z.string().describe(
            "Primary endpoint IP address of a Cloud Redis Instance.",
          ).optional(),
          readEndpointIp: z.string().describe(
            "Read endpoint IP address of a Cloud Redis Instance (if applicable).",
          ).optional(),
          region: z.string().describe(
            "Region in which the Cloud Redis Instance is defined.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Redis Instance.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Redis Instance.",
        ).optional(),
        route: z.object({
          advertisedRouteNextHopUri: z.string().describe(
            "For ADVERTISED routes, the URI of their next hop, i.e. the URI of the hybrid endpoint (VPN tunnel, Interconnect attachment, NCC router appliance) the advertised prefix is advertised through, or URI of the source peered network. Deprecated in favor of the next_hop_uri field, not used in new tests.",
          ).optional(),
          advertisedRouteSourceRouterUri: z.string().describe(
            "For ADVERTISED dynamic routes, the URI of the Cloud Router that advertised the corresponding IP prefix.",
          ).optional(),
          destIpRange: z.string().describe("Destination IP range of the route.")
            .optional(),
          destPortRanges: z.array(z.string()).describe(
            "Destination port ranges of the route. POLICY_BASED routes only.",
          ).optional(),
          displayName: z.string().describe("Name of a route.").optional(),
          instanceTags: z.array(z.string()).describe(
            "Instance tags of the route.",
          ).optional(),
          nccHubRouteUri: z.string().describe(
            "For PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub, the URI of the corresponding route in NCC Hub's routing table.",
          ).optional(),
          nccHubUri: z.string().describe(
            "URI of the NCC Hub the route is advertised by. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only.",
          ).optional(),
          nccSpokeUri: z.string().describe(
            "URI of the destination NCC Spoke. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of a VPC network where route is located.",
          ).optional(),
          nextHop: z.string().describe(
            'String type of the next hop of the route (for example, "VPN tunnel"). Deprecated in favor of the next_hop_type and next_hop_uri fields, not used in new tests.',
          ).optional(),
          nextHopNetworkUri: z.string().describe(
            "URI of a VPC network where the next hop resource is located.",
          ).optional(),
          nextHopType: z.enum([
            "NEXT_HOP_TYPE_UNSPECIFIED",
            "NEXT_HOP_IP",
            "NEXT_HOP_INSTANCE",
            "NEXT_HOP_NETWORK",
            "NEXT_HOP_PEERING",
            "NEXT_HOP_INTERCONNECT",
            "NEXT_HOP_VPN_TUNNEL",
            "NEXT_HOP_VPN_GATEWAY",
            "NEXT_HOP_INTERNET_GATEWAY",
            "NEXT_HOP_BLACKHOLE",
            "NEXT_HOP_ILB",
            "NEXT_HOP_ROUTER_APPLIANCE",
            "NEXT_HOP_NCC_HUB",
            "SECURE_WEB_PROXY_GATEWAY",
          ]).describe("Type of next hop.").optional(),
          nextHopUri: z.string().describe("URI of the next hop resource.")
            .optional(),
          originatingRouteDisplayName: z.string().describe(
            "For PEERING_SUBNET, PEERING_STATIC and PEERING_DYNAMIC routes, the name of the originating SUBNET/STATIC/DYNAMIC route.",
          ).optional(),
          originatingRouteUri: z.string().describe(
            "For PEERING_SUBNET and PEERING_STATIC routes, the URI of the originating SUBNET/STATIC route.",
          ).optional(),
          priority: z.number().int().describe("Priority of the route.")
            .optional(),
          protocols: z.array(z.string()).describe(
            "Protocols of the route. POLICY_BASED routes only.",
          ).optional(),
          region: z.string().describe(
            "Region of the route. DYNAMIC, PEERING_DYNAMIC, POLICY_BASED and ADVERTISED routes only. If set for POLICY_BASED route, this is a region of VLAN attachments for Cloud Interconnect the route applies to.",
          ).optional(),
          routeScope: z.enum(["ROUTE_SCOPE_UNSPECIFIED", "NETWORK", "NCC_HUB"])
            .describe(
              "Indicates where route is applicable. Deprecated, routes with NCC_HUB scope are not included in the trace in new tests.",
            ).optional(),
          routeType: z.enum([
            "ROUTE_TYPE_UNSPECIFIED",
            "SUBNET",
            "STATIC",
            "DYNAMIC",
            "PEERING_SUBNET",
            "PEERING_STATIC",
            "PEERING_DYNAMIC",
            "POLICY_BASED",
            "ADVERTISED",
          ]).describe("Type of route.").optional(),
          srcIpRange: z.string().describe(
            "Source IP address range of the route. POLICY_BASED routes only.",
          ).optional(),
          srcPortRanges: z.array(z.string()).describe(
            "Source port ranges of the route. POLICY_BASED routes only.",
          ).optional(),
          uri: z.string().describe(
            "URI of a route. SUBNET, STATIC, PEERING_SUBNET (only for peering network) and POLICY_BASED routes only.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine route.",
        ).optional(),
        serverlessExternalConnection: z.object({
          selectedIpAddress: z.string().describe(
            "Selected starting IP address, from the Google dynamic address pool.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a serverless public connection.",
        ).optional(),
        serverlessNeg: z.object({
          negUri: z.string().describe(
            "URI of the serverless network endpoint group.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with the serverless network endpoint group backend.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "START_FROM_INSTANCE",
          "START_FROM_INTERNET",
          "START_FROM_GOOGLE_SERVICE",
          "START_FROM_PRIVATE_NETWORK",
          "START_FROM_GKE_MASTER",
          "START_FROM_CLOUD_SQL_INSTANCE",
          "START_FROM_GKE_POD",
          "START_FROM_REDIS_INSTANCE",
          "START_FROM_REDIS_CLUSTER",
          "START_FROM_CLOUD_FUNCTION",
          "START_FROM_APP_ENGINE_VERSION",
          "START_FROM_CLOUD_RUN_REVISION",
          "START_FROM_STORAGE_BUCKET",
          "START_FROM_PSC_PUBLISHED_SERVICE",
          "START_FROM_SERVERLESS_NEG",
          "APPLY_INGRESS_FIREWALL_RULE",
          "APPLY_EGRESS_FIREWALL_RULE",
          "APPLY_ROUTE",
          "APPLY_FORWARDING_RULE",
          "ANALYZE_LOAD_BALANCER_BACKEND",
          "SPOOFING_APPROVED",
          "ARRIVE_AT_INSTANCE",
          "ARRIVE_AT_INTERNAL_LOAD_BALANCER",
          "ARRIVE_AT_EXTERNAL_LOAD_BALANCER",
          "ARRIVE_AT_HYBRID_SUBNET",
          "ARRIVE_AT_VPN_GATEWAY",
          "ARRIVE_AT_VPN_TUNNEL",
          "ARRIVE_AT_INTERCONNECT_ATTACHMENT",
          "ARRIVE_AT_VPC_CONNECTOR",
          "ARRIVE_AT_GKE_POD",
          "DIRECT_VPC_EGRESS_CONNECTION",
          "SERVERLESS_EXTERNAL_CONNECTION",
          "NGFW_PACKET_INSPECTION",
          "NAT",
          "SKIP_GKE_POD_IP_MASQUERADING",
          "SKIP_GKE_INGRESS_NETWORK_POLICY",
          "SKIP_GKE_EGRESS_NETWORK_POLICY",
          "APPLY_INGRESS_GKE_NETWORK_POLICY",
          "APPLY_EGRESS_GKE_NETWORK_POLICY",
          "PROXY_CONNECTION",
          "DELIVER",
          "DROP",
          "FORWARD",
          "ABORT",
          "VIEWER_PERMISSION_MISSING",
        ]).describe("Each step is in one of the pre-defined states.")
          .optional(),
        storageBucket: z.object({
          bucket: z.string().describe("Cloud Storage Bucket name.").optional(),
        }).describe(
          "For display only. Metadata associated with Storage Bucket.",
        ).optional(),
        vpcConnector: z.object({
          displayName: z.string().describe("Name of a VPC connector.")
            .optional(),
          location: z.string().describe(
            "Location in which the VPC connector is deployed.",
          ).optional(),
          uri: z.string().describe("URI of a VPC connector.").optional(),
        }).describe(
          "For display only. Metadata associated with a VPC connector.",
        ).optional(),
        vpnGateway: z.object({
          displayName: z.string().describe("Name of a VPN gateway.").optional(),
          ipAddress: z.string().describe("IP address of the VPN gateway.")
            .optional(),
          networkUri: z.string().describe(
            "URI of a Compute Engine network where the VPN gateway is configured.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where this VPN gateway is configured.",
          ).optional(),
          uri: z.string().describe("URI of a VPN gateway.").optional(),
          vpnTunnelUri: z.string().describe(
            "A VPN tunnel that is associated with this VPN gateway. There may be multiple VPN tunnels configured on a VPN gateway, and only the one relevant to the test is displayed.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine VPN gateway.",
        ).optional(),
        vpnTunnel: z.object({
          displayName: z.string().describe("Name of a VPN tunnel.").optional(),
          networkUri: z.string().describe(
            "URI of a Compute Engine network where the VPN tunnel is configured.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where this VPN tunnel is configured.",
          ).optional(),
          remoteGateway: z.string().describe(
            "URI of a VPN gateway at remote end of the tunnel.",
          ).optional(),
          remoteGatewayIp: z.string().describe(
            "Remote VPN gateway's IP address.",
          ).optional(),
          routingType: z.enum([
            "ROUTING_TYPE_UNSPECIFIED",
            "ROUTE_BASED",
            "POLICY_BASED",
            "DYNAMIC",
          ]).describe("Type of the routing policy.").optional(),
          sourceGateway: z.string().describe(
            "URI of the VPN gateway at local end of the tunnel.",
          ).optional(),
          sourceGatewayIp: z.string().describe(
            "Local VPN gateway's IP address.",
          ).optional(),
          uri: z.string().describe("URI of a VPN tunnel.").optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine VPN tunnel.",
        ).optional(),
      })).describe(
        "A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them.",
      ).optional(),
    })).describe(
      "Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends.",
    ).optional(),
    verifyTime: z.string().describe("The time of the configuration analysis.")
      .optional(),
  }).describe(
    "Results of the configuration analysis from the last run of the test.",
  ).optional(),
  roundTrip: z.boolean().describe(
    "Whether run analysis for the return path from destination to source. Default value is false.",
  ).optional(),
  source: z.object({
    appEngineVersion: z.object({
      uri: z.string().describe(
        "An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name.",
      ).optional(),
    }).describe("Wrapper for the App Engine service version attributes.")
      .optional(),
    cloudFunction: z.object({
      uri: z.string().describe(
        "A [Cloud Function](https://cloud.google.com/functions) name.",
      ).optional(),
    }).describe("Wrapper for Cloud Function attributes.").optional(),
    cloudRunRevision: z.object({
      serviceUri: z.string().describe(
        "Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}",
      ).optional(),
      uri: z.string().describe(
        "A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision}",
      ).optional(),
    }).describe("Wrapper for Cloud Run revision attributes.").optional(),
    cloudSqlInstance: z.string().describe(
      "A [Cloud SQL](https://cloud.google.com/sql) instance URI.",
    ).optional(),
    forwardingRule: z.string().describe(
      "A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}`",
    ).optional(),
    forwardingRuleTarget: z.enum([
      "FORWARDING_RULE_TARGET_UNSPECIFIED",
      "INSTANCE",
      "LOAD_BALANCER",
      "VPN_GATEWAY",
      "PSC",
    ]).describe(
      "Output only. Specifies the type of the target of the forwarding rule.",
    ).optional(),
    fqdn: z.string().describe(
      "DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint.",
    ).optional(),
    gkeMasterCluster: z.string().describe(
      "A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).",
    ).optional(),
    gkePod: z.string().describe(
      "A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI.",
    ).optional(),
    instance: z.string().describe("A Compute Engine instance URI.").optional(),
    ipAddress: z.string().describe(
      "The IP address of the endpoint, which can be an external or internal IP.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers.",
    ).optional(),
    loadBalancerType: z.enum([
      "LOAD_BALANCER_TYPE_UNSPECIFIED",
      "HTTPS_ADVANCED_LOAD_BALANCER",
      "HTTPS_LOAD_BALANCER",
      "REGIONAL_HTTPS_LOAD_BALANCER",
      "INTERNAL_HTTPS_LOAD_BALANCER",
      "SSL_PROXY_LOAD_BALANCER",
      "TCP_PROXY_LOAD_BALANCER",
      "INTERNAL_TCP_PROXY_LOAD_BALANCER",
      "NETWORK_LOAD_BALANCER",
      "LEGACY_NETWORK_LOAD_BALANCER",
      "TCP_UDP_INTERNAL_LOAD_BALANCER",
    ]).describe(
      "Output only. Type of the load balancer the forwarding rule points to.",
    ).optional(),
    network: z.string().describe(
      "A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint.",
    ).optional(),
    networkType: z.enum([
      "NETWORK_TYPE_UNSPECIFIED",
      "GCP_NETWORK",
      "NON_GCP_NETWORK",
      "INTERNET",
    ]).describe(
      "For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints.",
    ).optional(),
    port: z.number().int().describe(
      "The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP.",
    ).optional(),
    projectId: z.string().describe(
      "For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints.",
    ).optional(),
    redisCluster: z.string().describe(
      "A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint.",
    ).optional(),
    redisInstance: z.string().describe(
      "A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint.",
    ).optional(),
  }).describe("Source or destination of the Connectivity Test.").optional(),
  testId: z.string().describe(
    "Required. The logical name of the Connectivity Test in your project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bypassFirewallChecks: z.boolean().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  destination: z.object({
    appEngineVersion: z.object({
      uri: z.string(),
    }),
    cloudFunction: z.object({
      uri: z.string(),
    }),
    cloudRunRevision: z.object({
      serviceUri: z.string(),
      uri: z.string(),
    }),
    cloudSqlInstance: z.string(),
    forwardingRule: z.string(),
    forwardingRuleTarget: z.string(),
    fqdn: z.string(),
    gkeMasterCluster: z.string(),
    gkePod: z.string(),
    instance: z.string(),
    ipAddress: z.string(),
    loadBalancerId: z.string(),
    loadBalancerType: z.string(),
    network: z.string(),
    networkType: z.string(),
    port: z.number(),
    projectId: z.string(),
    redisCluster: z.string(),
    redisInstance: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  probingDetails: z.object({
    abortCause: z.string(),
    destinationEgressLocation: z.object({
      metropolitanArea: z.string(),
    }),
    edgeResponses: z.array(z.object({
      destinationEgressLocation: z.object({
        metropolitanArea: z.string(),
      }),
      destinationRouter: z.string(),
      probingLatency: z.object({
        latencyPercentiles: z.array(z.object({
          latencyMicros: z.string(),
          percent: z.number(),
        })),
      }),
      result: z.string(),
      sentProbeCount: z.number(),
      successfulProbeCount: z.number(),
    })),
    endpointInfo: z.object({
      destinationIp: z.string(),
      destinationNetworkUri: z.string(),
      destinationPort: z.number(),
      protocol: z.string(),
      sourceAgentUri: z.string(),
      sourceIp: z.string(),
      sourceNetworkUri: z.string(),
      sourcePort: z.number(),
    }),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    probedAllDevices: z.boolean(),
    probingLatency: z.object({
      latencyPercentiles: z.array(z.object({
        latencyMicros: z.string(),
        percent: z.number(),
      })),
    }),
    result: z.string(),
    sentProbeCount: z.number(),
    successfulProbeCount: z.number(),
    verifyTime: z.string(),
  }).optional(),
  protocol: z.string().optional(),
  reachabilityDetails: z.object({
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    result: z.string(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string(),
        destinationNetworkUri: z.string(),
        destinationPort: z.number(),
        protocol: z.string(),
        sourceAgentUri: z.string(),
        sourceIp: z.string(),
        sourceNetworkUri: z.string(),
        sourcePort: z.number(),
      }),
      forwardTraceId: z.number(),
      steps: z.array(z.object({
        abort: z.object({
          cause: z.string(),
          ipAddress: z.string(),
          projectsMissingPermission: z.array(z.string()),
          resourceUri: z.string(),
        }),
        appEngineVersion: z.object({
          displayName: z.string(),
          environment: z.string(),
          runtime: z.string(),
          uri: z.string(),
        }),
        causesDrop: z.boolean(),
        cloudFunction: z.object({
          displayName: z.string(),
          location: z.string(),
          uri: z.string(),
          versionId: z.string(),
        }),
        cloudRunRevision: z.object({
          displayName: z.string(),
          location: z.string(),
          serviceUri: z.string(),
          uri: z.string(),
        }),
        cloudSqlInstance: z.object({
          displayName: z.string(),
          externalIp: z.string(),
          internalIp: z.string(),
          networkUri: z.string(),
          region: z.string(),
          uri: z.string(),
        }),
        deliver: z.object({
          googleServiceType: z.string(),
          ipAddress: z.string(),
          pscGoogleApiTarget: z.string(),
          resourceUri: z.string(),
          storageBucket: z.string(),
          target: z.string(),
        }),
        description: z.string(),
        directVpcEgressConnection: z.object({
          networkUri: z.string(),
          region: z.string(),
          selectedIpAddress: z.string(),
          selectedIpRange: z.string(),
          subnetworkUri: z.string(),
        }),
        drop: z.object({
          cause: z.string(),
          destinationGeolocationCode: z.string(),
          destinationIp: z.string(),
          region: z.string(),
          resourceUri: z.string(),
          sourceGeolocationCode: z.string(),
          sourceIp: z.string(),
        }),
        endpoint: z.object({
          destinationIp: z.string(),
          destinationNetworkUri: z.string(),
          destinationPort: z.number(),
          protocol: z.string(),
          sourceAgentUri: z.string(),
          sourceIp: z.string(),
          sourceNetworkUri: z.string(),
          sourcePort: z.number(),
        }),
        firewall: z.object({
          action: z.string(),
          direction: z.string(),
          displayName: z.string(),
          firewallRuleType: z.string(),
          networkUri: z.string(),
          policy: z.string(),
          policyPriority: z.number(),
          policyUri: z.string(),
          priority: z.number(),
          targetServiceAccounts: z.array(z.string()),
          targetTags: z.array(z.string()),
          targetType: z.string(),
          uri: z.string(),
        }),
        forward: z.object({
          ipAddress: z.string(),
          resourceUri: z.string(),
          target: z.string(),
        }),
        forwardingRule: z.object({
          displayName: z.string(),
          loadBalancerName: z.string(),
          matchedPortRange: z.string(),
          matchedProtocol: z.string(),
          networkUri: z.string(),
          pscGoogleApiTarget: z.string(),
          pscServiceAttachmentUri: z.string(),
          region: z.string(),
          target: z.string(),
          uri: z.string(),
          vip: z.string(),
        }),
        gkeMaster: z.object({
          clusterNetworkUri: z.string(),
          clusterUri: z.string(),
          dnsEndpoint: z.string(),
          externalIp: z.string(),
          internalIp: z.string(),
        }),
        gkeNetworkPolicy: z.object({
          action: z.string(),
          direction: z.string(),
          displayName: z.string(),
          uri: z.string(),
        }),
        gkeNetworkPolicySkipped: z.object({
          reason: z.string(),
        }),
        gkePod: z.object({
          ipAddress: z.string(),
          networkUri: z.string(),
          podUri: z.string(),
        }),
        googleService: z.object({
          googleServiceType: z.string(),
          sourceIp: z.string(),
        }),
        hybridSubnet: z.object({
          displayName: z.string(),
          region: z.string(),
          uri: z.string(),
        }),
        instance: z.object({
          displayName: z.string(),
          externalIp: z.string(),
          interface: z.string(),
          internalIp: z.string(),
          networkTags: z.array(z.string()),
          networkUri: z.string(),
          pscNetworkAttachmentUri: z.string(),
          running: z.boolean(),
          serviceAccount: z.string(),
          status: z.string(),
          uri: z.string(),
        }),
        interconnectAttachment: z.object({
          cloudRouterUri: z.string(),
          displayName: z.string(),
          interconnectUri: z.string(),
          l2AttachmentMatchedIpAddress: z.string(),
          region: z.string(),
          type: z.string(),
          uri: z.string(),
        }),
        ipMasqueradingSkipped: z.object({
          nonMasqueradeRange: z.string(),
          reason: z.string(),
        }),
        loadBalancer: z.object({
          backendType: z.string(),
          backendUri: z.string(),
          backends: z.array(z.object({
            displayName: z.string(),
            healthCheckAllowingFirewallRules: z.array(z.string()),
            healthCheckBlockingFirewallRules: z.array(z.string()),
            healthCheckFirewallState: z.string(),
            uri: z.string(),
          })),
          healthCheckUri: z.string(),
          loadBalancerType: z.string(),
        }),
        loadBalancerBackendInfo: z.object({
          backendBucketUri: z.string(),
          backendServiceUri: z.string(),
          healthCheckFirewallsConfigState: z.string(),
          healthCheckUri: z.string(),
          instanceGroupUri: z.string(),
          instanceUri: z.string(),
          name: z.string(),
          networkEndpointGroupUri: z.string(),
          pscGoogleApiTarget: z.string(),
          pscServiceAttachmentUri: z.string(),
        }),
        nat: z.object({
          cloudNatGatewayType: z.string(),
          natGatewayName: z.string(),
          networkUri: z.string(),
          newDestinationIp: z.string(),
          newDestinationPort: z.number(),
          newSourceIp: z.string(),
          newSourcePort: z.number(),
          oldDestinationIp: z.string(),
          oldDestinationPort: z.number(),
          oldSourceIp: z.string(),
          oldSourcePort: z.number(),
          protocol: z.string(),
          routerUri: z.string(),
          type: z.string(),
        }),
        network: z.object({
          displayName: z.string(),
          matchedIpRange: z.string(),
          matchedSubnetUri: z.string(),
          region: z.string(),
          uri: z.string(),
        }),
        ngfwPacketInspection: z.object({
          securityProfileGroupUri: z.string(),
        }),
        projectId: z.string(),
        proxyConnection: z.object({
          networkUri: z.string(),
          newDestinationIp: z.string(),
          newDestinationPort: z.number(),
          newSourceIp: z.string(),
          newSourcePort: z.number(),
          oldDestinationIp: z.string(),
          oldDestinationPort: z.number(),
          oldSourceIp: z.string(),
          oldSourcePort: z.number(),
          protocol: z.string(),
          subnetUri: z.string(),
        }),
        redisCluster: z.object({
          discoveryEndpointIpAddress: z.string(),
          displayName: z.string(),
          location: z.string(),
          networkUri: z.string(),
          secondaryEndpointIpAddress: z.string(),
          uri: z.string(),
        }),
        redisInstance: z.object({
          displayName: z.string(),
          networkUri: z.string(),
          primaryEndpointIp: z.string(),
          readEndpointIp: z.string(),
          region: z.string(),
          uri: z.string(),
        }),
        route: z.object({
          advertisedRouteNextHopUri: z.string(),
          advertisedRouteSourceRouterUri: z.string(),
          destIpRange: z.string(),
          destPortRanges: z.array(z.string()),
          displayName: z.string(),
          instanceTags: z.array(z.string()),
          nccHubRouteUri: z.string(),
          nccHubUri: z.string(),
          nccSpokeUri: z.string(),
          networkUri: z.string(),
          nextHop: z.string(),
          nextHopNetworkUri: z.string(),
          nextHopType: z.string(),
          nextHopUri: z.string(),
          originatingRouteDisplayName: z.string(),
          originatingRouteUri: z.string(),
          priority: z.number(),
          protocols: z.array(z.string()),
          region: z.string(),
          routeScope: z.string(),
          routeType: z.string(),
          srcIpRange: z.string(),
          srcPortRanges: z.array(z.string()),
          uri: z.string(),
        }),
        serverlessExternalConnection: z.object({
          selectedIpAddress: z.string(),
        }),
        serverlessNeg: z.object({
          negUri: z.string(),
        }),
        state: z.string(),
        storageBucket: z.object({
          bucket: z.string(),
        }),
        vpcConnector: z.object({
          displayName: z.string(),
          location: z.string(),
          uri: z.string(),
        }),
        vpnGateway: z.object({
          displayName: z.string(),
          ipAddress: z.string(),
          networkUri: z.string(),
          region: z.string(),
          uri: z.string(),
          vpnTunnelUri: z.string(),
        }),
        vpnTunnel: z.object({
          displayName: z.string(),
          networkUri: z.string(),
          region: z.string(),
          remoteGateway: z.string(),
          remoteGatewayIp: z.string(),
          routingType: z.string(),
          sourceGateway: z.string(),
          sourceGatewayIp: z.string(),
          uri: z.string(),
        }),
      })),
    })),
    verifyTime: z.string(),
  }).optional(),
  relatedProjects: z.array(z.string()).optional(),
  returnReachabilityDetails: z.object({
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    result: z.string(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string(),
        destinationNetworkUri: z.string(),
        destinationPort: z.number(),
        protocol: z.string(),
        sourceAgentUri: z.string(),
        sourceIp: z.string(),
        sourceNetworkUri: z.string(),
        sourcePort: z.number(),
      }),
      forwardTraceId: z.number(),
      steps: z.array(z.object({
        abort: z.object({
          cause: z.string(),
          ipAddress: z.string(),
          projectsMissingPermission: z.array(z.string()),
          resourceUri: z.string(),
        }),
        appEngineVersion: z.object({
          displayName: z.string(),
          environment: z.string(),
          runtime: z.string(),
          uri: z.string(),
        }),
        causesDrop: z.boolean(),
        cloudFunction: z.object({
          displayName: z.string(),
          location: z.string(),
          uri: z.string(),
          versionId: z.string(),
        }),
        cloudRunRevision: z.object({
          displayName: z.string(),
          location: z.string(),
          serviceUri: z.string(),
          uri: z.string(),
        }),
        cloudSqlInstance: z.object({
          displayName: z.string(),
          externalIp: z.string(),
          internalIp: z.string(),
          networkUri: z.string(),
          region: z.string(),
          uri: z.string(),
        }),
        deliver: z.object({
          googleServiceType: z.string(),
          ipAddress: z.string(),
          pscGoogleApiTarget: z.string(),
          resourceUri: z.string(),
          storageBucket: z.string(),
          target: z.string(),
        }),
        description: z.string(),
        directVpcEgressConnection: z.object({
          networkUri: z.string(),
          region: z.string(),
          selectedIpAddress: z.string(),
          selectedIpRange: z.string(),
          subnetworkUri: z.string(),
        }),
        drop: z.object({
          cause: z.string(),
          destinationGeolocationCode: z.string(),
          destinationIp: z.string(),
          region: z.string(),
          resourceUri: z.string(),
          sourceGeolocationCode: z.string(),
          sourceIp: z.string(),
        }),
        endpoint: z.object({
          destinationIp: z.string(),
          destinationNetworkUri: z.string(),
          destinationPort: z.number(),
          protocol: z.string(),
          sourceAgentUri: z.string(),
          sourceIp: z.string(),
          sourceNetworkUri: z.string(),
          sourcePort: z.number(),
        }),
        firewall: z.object({
          action: z.string(),
          direction: z.string(),
          displayName: z.string(),
          firewallRuleType: z.string(),
          networkUri: z.string(),
          policy: z.string(),
          policyPriority: z.number(),
          policyUri: z.string(),
          priority: z.number(),
          targetServiceAccounts: z.array(z.string()),
          targetTags: z.array(z.string()),
          targetType: z.string(),
          uri: z.string(),
        }),
        forward: z.object({
          ipAddress: z.string(),
          resourceUri: z.string(),
          target: z.string(),
        }),
        forwardingRule: z.object({
          displayName: z.string(),
          loadBalancerName: z.string(),
          matchedPortRange: z.string(),
          matchedProtocol: z.string(),
          networkUri: z.string(),
          pscGoogleApiTarget: z.string(),
          pscServiceAttachmentUri: z.string(),
          region: z.string(),
          target: z.string(),
          uri: z.string(),
          vip: z.string(),
        }),
        gkeMaster: z.object({
          clusterNetworkUri: z.string(),
          clusterUri: z.string(),
          dnsEndpoint: z.string(),
          externalIp: z.string(),
          internalIp: z.string(),
        }),
        gkeNetworkPolicy: z.object({
          action: z.string(),
          direction: z.string(),
          displayName: z.string(),
          uri: z.string(),
        }),
        gkeNetworkPolicySkipped: z.object({
          reason: z.string(),
        }),
        gkePod: z.object({
          ipAddress: z.string(),
          networkUri: z.string(),
          podUri: z.string(),
        }),
        googleService: z.object({
          googleServiceType: z.string(),
          sourceIp: z.string(),
        }),
        hybridSubnet: z.object({
          displayName: z.string(),
          region: z.string(),
          uri: z.string(),
        }),
        instance: z.object({
          displayName: z.string(),
          externalIp: z.string(),
          interface: z.string(),
          internalIp: z.string(),
          networkTags: z.array(z.string()),
          networkUri: z.string(),
          pscNetworkAttachmentUri: z.string(),
          running: z.boolean(),
          serviceAccount: z.string(),
          status: z.string(),
          uri: z.string(),
        }),
        interconnectAttachment: z.object({
          cloudRouterUri: z.string(),
          displayName: z.string(),
          interconnectUri: z.string(),
          l2AttachmentMatchedIpAddress: z.string(),
          region: z.string(),
          type: z.string(),
          uri: z.string(),
        }),
        ipMasqueradingSkipped: z.object({
          nonMasqueradeRange: z.string(),
          reason: z.string(),
        }),
        loadBalancer: z.object({
          backendType: z.string(),
          backendUri: z.string(),
          backends: z.array(z.object({
            displayName: z.string(),
            healthCheckAllowingFirewallRules: z.array(z.string()),
            healthCheckBlockingFirewallRules: z.array(z.string()),
            healthCheckFirewallState: z.string(),
            uri: z.string(),
          })),
          healthCheckUri: z.string(),
          loadBalancerType: z.string(),
        }),
        loadBalancerBackendInfo: z.object({
          backendBucketUri: z.string(),
          backendServiceUri: z.string(),
          healthCheckFirewallsConfigState: z.string(),
          healthCheckUri: z.string(),
          instanceGroupUri: z.string(),
          instanceUri: z.string(),
          name: z.string(),
          networkEndpointGroupUri: z.string(),
          pscGoogleApiTarget: z.string(),
          pscServiceAttachmentUri: z.string(),
        }),
        nat: z.object({
          cloudNatGatewayType: z.string(),
          natGatewayName: z.string(),
          networkUri: z.string(),
          newDestinationIp: z.string(),
          newDestinationPort: z.number(),
          newSourceIp: z.string(),
          newSourcePort: z.number(),
          oldDestinationIp: z.string(),
          oldDestinationPort: z.number(),
          oldSourceIp: z.string(),
          oldSourcePort: z.number(),
          protocol: z.string(),
          routerUri: z.string(),
          type: z.string(),
        }),
        network: z.object({
          displayName: z.string(),
          matchedIpRange: z.string(),
          matchedSubnetUri: z.string(),
          region: z.string(),
          uri: z.string(),
        }),
        ngfwPacketInspection: z.object({
          securityProfileGroupUri: z.string(),
        }),
        projectId: z.string(),
        proxyConnection: z.object({
          networkUri: z.string(),
          newDestinationIp: z.string(),
          newDestinationPort: z.number(),
          newSourceIp: z.string(),
          newSourcePort: z.number(),
          oldDestinationIp: z.string(),
          oldDestinationPort: z.number(),
          oldSourceIp: z.string(),
          oldSourcePort: z.number(),
          protocol: z.string(),
          subnetUri: z.string(),
        }),
        redisCluster: z.object({
          discoveryEndpointIpAddress: z.string(),
          displayName: z.string(),
          location: z.string(),
          networkUri: z.string(),
          secondaryEndpointIpAddress: z.string(),
          uri: z.string(),
        }),
        redisInstance: z.object({
          displayName: z.string(),
          networkUri: z.string(),
          primaryEndpointIp: z.string(),
          readEndpointIp: z.string(),
          region: z.string(),
          uri: z.string(),
        }),
        route: z.object({
          advertisedRouteNextHopUri: z.string(),
          advertisedRouteSourceRouterUri: z.string(),
          destIpRange: z.string(),
          destPortRanges: z.array(z.string()),
          displayName: z.string(),
          instanceTags: z.array(z.string()),
          nccHubRouteUri: z.string(),
          nccHubUri: z.string(),
          nccSpokeUri: z.string(),
          networkUri: z.string(),
          nextHop: z.string(),
          nextHopNetworkUri: z.string(),
          nextHopType: z.string(),
          nextHopUri: z.string(),
          originatingRouteDisplayName: z.string(),
          originatingRouteUri: z.string(),
          priority: z.number(),
          protocols: z.array(z.string()),
          region: z.string(),
          routeScope: z.string(),
          routeType: z.string(),
          srcIpRange: z.string(),
          srcPortRanges: z.array(z.string()),
          uri: z.string(),
        }),
        serverlessExternalConnection: z.object({
          selectedIpAddress: z.string(),
        }),
        serverlessNeg: z.object({
          negUri: z.string(),
        }),
        state: z.string(),
        storageBucket: z.object({
          bucket: z.string(),
        }),
        vpcConnector: z.object({
          displayName: z.string(),
          location: z.string(),
          uri: z.string(),
        }),
        vpnGateway: z.object({
          displayName: z.string(),
          ipAddress: z.string(),
          networkUri: z.string(),
          region: z.string(),
          uri: z.string(),
          vpnTunnelUri: z.string(),
        }),
        vpnTunnel: z.object({
          displayName: z.string(),
          networkUri: z.string(),
          region: z.string(),
          remoteGateway: z.string(),
          remoteGatewayIp: z.string(),
          routingType: z.string(),
          sourceGateway: z.string(),
          sourceGatewayIp: z.string(),
          uri: z.string(),
        }),
      })),
    })),
    verifyTime: z.string(),
  }).optional(),
  roundTrip: z.boolean().optional(),
  source: z.object({
    appEngineVersion: z.object({
      uri: z.string(),
    }),
    cloudFunction: z.object({
      uri: z.string(),
    }),
    cloudRunRevision: z.object({
      serviceUri: z.string(),
      uri: z.string(),
    }),
    cloudSqlInstance: z.string(),
    forwardingRule: z.string(),
    forwardingRuleTarget: z.string(),
    fqdn: z.string(),
    gkeMasterCluster: z.string(),
    gkePod: z.string(),
    instance: z.string(),
    ipAddress: z.string(),
    loadBalancerId: z.string(),
    loadBalancerType: z.string(),
    network: z.string(),
    networkType: z.string(),
    port: z.number(),
    projectId: z.string(),
    redisCluster: z.string(),
    redisInstance: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  bypassFirewallChecks: z.boolean().describe(
    "Whether the analysis should skip firewall checking. Default value is false.",
  ).optional(),
  description: z.string().describe(
    "The user-supplied description of the Connectivity Test. Maximum of 512 characters.",
  ).optional(),
  destination: z.object({
    appEngineVersion: z.object({
      uri: z.string().describe(
        "An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name.",
      ).optional(),
    }).describe("Wrapper for the App Engine service version attributes.")
      .optional(),
    cloudFunction: z.object({
      uri: z.string().describe(
        "A [Cloud Function](https://cloud.google.com/functions) name.",
      ).optional(),
    }).describe("Wrapper for Cloud Function attributes.").optional(),
    cloudRunRevision: z.object({
      serviceUri: z.string().describe(
        "Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}",
      ).optional(),
      uri: z.string().describe(
        "A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision}",
      ).optional(),
    }).describe("Wrapper for Cloud Run revision attributes.").optional(),
    cloudSqlInstance: z.string().describe(
      "A [Cloud SQL](https://cloud.google.com/sql) instance URI.",
    ).optional(),
    forwardingRule: z.string().describe(
      "A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}`",
    ).optional(),
    forwardingRuleTarget: z.enum([
      "FORWARDING_RULE_TARGET_UNSPECIFIED",
      "INSTANCE",
      "LOAD_BALANCER",
      "VPN_GATEWAY",
      "PSC",
    ]).describe(
      "Output only. Specifies the type of the target of the forwarding rule.",
    ).optional(),
    fqdn: z.string().describe(
      "DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint.",
    ).optional(),
    gkeMasterCluster: z.string().describe(
      "A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).",
    ).optional(),
    gkePod: z.string().describe(
      "A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI.",
    ).optional(),
    instance: z.string().describe("A Compute Engine instance URI.").optional(),
    ipAddress: z.string().describe(
      "The IP address of the endpoint, which can be an external or internal IP.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers.",
    ).optional(),
    loadBalancerType: z.enum([
      "LOAD_BALANCER_TYPE_UNSPECIFIED",
      "HTTPS_ADVANCED_LOAD_BALANCER",
      "HTTPS_LOAD_BALANCER",
      "REGIONAL_HTTPS_LOAD_BALANCER",
      "INTERNAL_HTTPS_LOAD_BALANCER",
      "SSL_PROXY_LOAD_BALANCER",
      "TCP_PROXY_LOAD_BALANCER",
      "INTERNAL_TCP_PROXY_LOAD_BALANCER",
      "NETWORK_LOAD_BALANCER",
      "LEGACY_NETWORK_LOAD_BALANCER",
      "TCP_UDP_INTERNAL_LOAD_BALANCER",
    ]).describe(
      "Output only. Type of the load balancer the forwarding rule points to.",
    ).optional(),
    network: z.string().describe(
      "A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint.",
    ).optional(),
    networkType: z.enum([
      "NETWORK_TYPE_UNSPECIFIED",
      "GCP_NETWORK",
      "NON_GCP_NETWORK",
      "INTERNET",
    ]).describe(
      "For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints.",
    ).optional(),
    port: z.number().int().describe(
      "The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP.",
    ).optional(),
    projectId: z.string().describe(
      "For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints.",
    ).optional(),
    redisCluster: z.string().describe(
      "A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint.",
    ).optional(),
    redisInstance: z.string().describe(
      "A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint.",
    ).optional(),
  }).describe("Source or destination of the Connectivity Test.").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user-provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Unique name of the resource using the form: `projects/{project_id}/locations/global/connectivityTests/{test_id}`",
  ).optional(),
  probingDetails: z.object({
    abortCause: z.enum([
      "PROBING_ABORT_CAUSE_UNSPECIFIED",
      "PERMISSION_DENIED",
      "NO_SOURCE_LOCATION",
    ]).describe("The reason probing was aborted.").optional(),
    destinationEgressLocation: z.object({
      metropolitanArea: z.string().describe("Name of the metropolitan area.")
        .optional(),
    }).describe(
      "Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.",
    ).optional(),
    edgeResponses: z.array(z.object({
      destinationEgressLocation: z.object({
        metropolitanArea: z.string().describe("Name of the metropolitan area.")
          .optional(),
      }).describe(
        "Representation of a network edge location as per https://cloud.google.com/vpc/docs/edge-locations.",
      ).optional(),
      destinationRouter: z.string().describe(
        "Router name in the format '{router}.{metroshard}'. For example: pf01.aaa01, pr02.aaa01.",
      ).optional(),
      probingLatency: z.object({
        latencyPercentiles: z.array(z.object({
          latencyMicros: z.string().describe(
            "percent-th percentile of latency observed, in microseconds. Fraction of percent/100 of samples have latency lower or equal to the value of this field.",
          ).optional(),
          percent: z.number().int().describe(
            "Percentage of samples this data point applies to.",
          ).optional(),
        })).describe("Representative latency percentiles.").optional(),
      }).describe("Describes measured latency distribution.").optional(),
      result: z.enum([
        "PROBING_RESULT_UNSPECIFIED",
        "REACHABLE",
        "UNREACHABLE",
        "REACHABILITY_INCONSISTENT",
        "UNDETERMINED",
      ]).describe(
        "The overall result of active probing for this egress device.",
      ).optional(),
      sentProbeCount: z.number().int().describe("Number of probes sent.")
        .optional(),
      successfulProbeCount: z.number().int().describe(
        "Number of probes that reached the destination.",
      ).optional(),
    })).describe("Probing results for all edge devices.").optional(),
    endpointInfo: z.object({
      destinationIp: z.string().describe("Destination IP address.").optional(),
      destinationNetworkUri: z.string().describe(
        "URI of the network where this packet is sent to.",
      ).optional(),
      destinationPort: z.number().int().describe(
        "Destination port. Only valid when protocol is TCP or UDP.",
      ).optional(),
      protocol: z.string().describe(
        'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
      ).optional(),
      sourceAgentUri: z.string().describe(
        "URI of the source telemetry agent this packet originates from.",
      ).optional(),
      sourceIp: z.string().describe("Source IP address.").optional(),
      sourceNetworkUri: z.string().describe(
        "URI of the network where this packet originates from.",
      ).optional(),
      sourcePort: z.number().int().describe(
        "Source port. Only valid when protocol is TCP or UDP.",
      ).optional(),
    }).describe(
      "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
    ).optional(),
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
    probedAllDevices: z.boolean().describe(
      "Whether all relevant edge devices were probed.",
    ).optional(),
    probingLatency: z.object({
      latencyPercentiles: z.array(z.object({
        latencyMicros: z.string().describe(
          "percent-th percentile of latency observed, in microseconds. Fraction of percent/100 of samples have latency lower or equal to the value of this field.",
        ).optional(),
        percent: z.number().int().describe(
          "Percentage of samples this data point applies to.",
        ).optional(),
      })).describe("Representative latency percentiles.").optional(),
    }).describe("Describes measured latency distribution.").optional(),
    result: z.enum([
      "PROBING_RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "REACHABILITY_INCONSISTENT",
      "UNDETERMINED",
    ]).describe("The overall result of active probing.").optional(),
    sentProbeCount: z.number().int().describe("Number of probes sent.")
      .optional(),
    successfulProbeCount: z.number().int().describe(
      "Number of probes that reached the destination.",
    ).optional(),
    verifyTime: z.string().describe(
      "The time that reachability was assessed through active probing.",
    ).optional(),
  }).describe("Results of active probing from the last run of the test.")
    .optional(),
  protocol: z.string().describe(
    'IP Protocol of the test. When not provided, "TCP" is assumed.',
  ).optional(),
  reachabilityDetails: z.object({
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
    result: z.enum([
      "RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "AMBIGUOUS",
      "UNDETERMINED",
    ]).describe("The overall result of the test's configuration analysis.")
      .optional(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string().describe("Destination IP address.")
          .optional(),
        destinationNetworkUri: z.string().describe(
          "URI of the network where this packet is sent to.",
        ).optional(),
        destinationPort: z.number().int().describe(
          "Destination port. Only valid when protocol is TCP or UDP.",
        ).optional(),
        protocol: z.string().describe(
          'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
        ).optional(),
        sourceAgentUri: z.string().describe(
          "URI of the source telemetry agent this packet originates from.",
        ).optional(),
        sourceIp: z.string().describe("Source IP address.").optional(),
        sourceNetworkUri: z.string().describe(
          "URI of the network where this packet originates from.",
        ).optional(),
        sourcePort: z.number().int().describe(
          "Source port. Only valid when protocol is TCP or UDP.",
        ).optional(),
      }).describe(
        "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
      ).optional(),
      forwardTraceId: z.number().int().describe(
        "ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace.",
      ).optional(),
      steps: z.array(z.object({
        abort: z.object({
          cause: z.enum([
            "CAUSE_UNSPECIFIED",
            "UNKNOWN_NETWORK",
            "UNKNOWN_PROJECT",
            "NO_EXTERNAL_IP",
            "UNINTENDED_DESTINATION",
            "SOURCE_ENDPOINT_NOT_FOUND",
            "MISMATCHED_SOURCE_NETWORK",
            "DESTINATION_ENDPOINT_NOT_FOUND",
            "MISMATCHED_DESTINATION_NETWORK",
            "UNKNOWN_IP",
            "GOOGLE_MANAGED_SERVICE_UNKNOWN_IP",
            "SOURCE_IP_ADDRESS_NOT_IN_SOURCE_NETWORK",
            "PERMISSION_DENIED",
            "PERMISSION_DENIED_NO_CLOUD_NAT_CONFIGS",
            "PERMISSION_DENIED_NO_NEG_ENDPOINT_CONFIGS",
            "PERMISSION_DENIED_NO_CLOUD_ROUTER_CONFIGS",
            "NO_SOURCE_LOCATION",
            "NO_SOURCE_GCP_NETWORK_LOCATION",
            "NO_SOURCE_NON_GCP_NETWORK_LOCATION",
            "NO_SOURCE_INTERNET_LOCATION",
            "INVALID_ARGUMENT",
            "TRACE_TOO_LONG",
            "INTERNAL_ERROR",
            "UNSUPPORTED",
            "MISMATCHED_IP_VERSION",
            "GKE_KONNECTIVITY_PROXY_UNSUPPORTED",
            "RESOURCE_CONFIG_NOT_FOUND",
            "VM_INSTANCE_CONFIG_NOT_FOUND",
            "NETWORK_CONFIG_NOT_FOUND",
            "FIREWALL_CONFIG_NOT_FOUND",
            "ROUTE_CONFIG_NOT_FOUND",
            "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_PSC_ENDPOINT",
            "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_ENDPOINT",
            "SOURCE_PSC_CLOUD_SQL_UNSUPPORTED",
            "SOURCE_EXTERNAL_CLOUD_SQL_UNSUPPORTED",
            "SOURCE_REDIS_CLUSTER_UNSUPPORTED",
            "SOURCE_REDIS_INSTANCE_UNSUPPORTED",
            "SOURCE_FORWARDING_RULE_UNSUPPORTED",
            "NON_ROUTABLE_IP_ADDRESS",
            "UNKNOWN_ISSUE_IN_GOOGLE_MANAGED_PROJECT",
            "UNSUPPORTED_GOOGLE_MANAGED_PROJECT_CONFIG",
            "NO_SERVERLESS_IP_RANGES",
            "IP_VERSION_PROTOCOL_MISMATCH",
            "GKE_POD_UNKNOWN_ENDPOINT_LOCATION",
          ]).describe("Causes that the analysis is aborted.").optional(),
          ipAddress: z.string().describe("IP address that caused the abort.")
            .optional(),
          projectsMissingPermission: z.array(z.string()).describe(
            "List of project IDs the user specified in the request but lacks access to. In this case, analysis is aborted with the PERMISSION_DENIED cause.",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that caused the abort.",
          ).optional(),
        }).describe(
          'Details of the final state "abort" and associated resource.',
        ).optional(),
        appEngineVersion: z.object({
          displayName: z.string().describe("Name of an App Engine version.")
            .optional(),
          environment: z.string().describe(
            "App Engine execution environment for a version.",
          ).optional(),
          runtime: z.string().describe("Runtime of the App Engine version.")
            .optional(),
          uri: z.string().describe("URI of an App Engine version.").optional(),
        }).describe(
          "For display only. Metadata associated with an App Engine version.",
        ).optional(),
        causesDrop: z.boolean().describe(
          "This is a step that leads to the final state Drop.",
        ).optional(),
        cloudFunction: z.object({
          displayName: z.string().describe("Name of a Cloud Function.")
            .optional(),
          location: z.string().describe(
            "Location in which the Cloud Function is deployed.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Function.").optional(),
          versionId: z.string().describe(
            "Latest successfully deployed version id of the Cloud Function.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Function.",
        ).optional(),
        cloudRunRevision: z.object({
          displayName: z.string().describe("Name of a Cloud Run revision.")
            .optional(),
          location: z.string().describe(
            "Location in which this revision is deployed.",
          ).optional(),
          serviceUri: z.string().describe(
            "URI of Cloud Run service this revision belongs to.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Run revision.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Run revision.",
        ).optional(),
        cloudSqlInstance: z.object({
          displayName: z.string().describe("Name of a Cloud SQL instance.")
            .optional(),
          externalIp: z.string().describe(
            "External IP address of a Cloud SQL instance.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of a Cloud SQL instance.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of a Cloud SQL instance network or empty string if the instance does not have one.",
          ).optional(),
          region: z.string().describe(
            "Region in which the Cloud SQL instance is running.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud SQL instance.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud SQL instance.",
        ).optional(),
        deliver: z.object({
          googleServiceType: z.enum([
            "GOOGLE_SERVICE_TYPE_UNSPECIFIED",
            "IAP",
            "GFE_PROXY_OR_HEALTH_CHECK_PROBER",
            "CLOUD_DNS",
            "PRIVATE_GOOGLE_ACCESS",
            "SERVERLESS_VPC_ACCESS",
          ]).describe(
            "Recognized type of a Google Service the packet is delivered to (if applicable).",
          ).optional(),
          ipAddress: z.string().describe(
            "IP address of the target (if applicable).",
          ).optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target the packet is delivered to (if applicable).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that the packet is delivered to.",
          ).optional(),
          storageBucket: z.string().describe(
            "Name of the Cloud Storage Bucket the packet is delivered to (if applicable).",
          ).optional(),
          target: z.enum([
            "TARGET_UNSPECIFIED",
            "INSTANCE",
            "INTERNET",
            "GOOGLE_API",
            "GKE_MASTER",
            "CLOUD_SQL_INSTANCE",
            "PSC_PUBLISHED_SERVICE",
            "PSC_GOOGLE_API",
            "PSC_VPC_SC",
            "SERVERLESS_NEG",
            "STORAGE_BUCKET",
            "PRIVATE_NETWORK",
            "CLOUD_FUNCTION",
            "APP_ENGINE_VERSION",
            "CLOUD_RUN_REVISION",
            "GOOGLE_MANAGED_SERVICE",
            "REDIS_INSTANCE",
            "REDIS_CLUSTER",
            "GKE_POD",
          ]).describe("Target type where the packet is delivered to.")
            .optional(),
        }).describe(
          'Details of the final state "deliver" and associated resource.',
        ).optional(),
        description: z.string().describe(
          "A description of the step. Usually this is a summary of the state.",
        ).optional(),
        directVpcEgressConnection: z.object({
          networkUri: z.string().describe("URI of direct access network.")
            .optional(),
          region: z.string().describe(
            "Region in which the Direct VPC egress is deployed.",
          ).optional(),
          selectedIpAddress: z.string().describe(
            "Selected starting IP address, from the selected IP range.",
          ).optional(),
          selectedIpRange: z.string().describe("Selected IP range.").optional(),
          subnetworkUri: z.string().describe("URI of direct access subnetwork.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a serverless direct VPC egress connection.",
        ).optional(),
        drop: z.object({
          cause: z.enum([
            "CAUSE_UNSPECIFIED",
            "UNKNOWN_EXTERNAL_ADDRESS",
            "FOREIGN_IP_DISALLOWED",
            "FIREWALL_RULE",
            "NO_ROUTE",
            "ROUTE_BLACKHOLE",
            "ROUTE_WRONG_NETWORK",
            "ROUTE_NEXT_HOP_IP_ADDRESS_NOT_RESOLVED",
            "ROUTE_NEXT_HOP_RESOURCE_NOT_FOUND",
            "ROUTE_NEXT_HOP_INSTANCE_WRONG_NETWORK",
            "ROUTE_NEXT_HOP_INSTANCE_NON_PRIMARY_IP",
            "ROUTE_NEXT_HOP_FORWARDING_RULE_IP_MISMATCH",
            "ROUTE_NEXT_HOP_VPN_TUNNEL_NOT_ESTABLISHED",
            "ROUTE_NEXT_HOP_FORWARDING_RULE_TYPE_INVALID",
            "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV6_ADDRESS",
            "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV4_ADDRESS",
            "NO_ROUTE_FROM_EXTERNAL_IPV6_SOURCE_TO_PRIVATE_IPV6_ADDRESS",
            "VPN_TUNNEL_LOCAL_SELECTOR_MISMATCH",
            "VPN_TUNNEL_REMOTE_SELECTOR_MISMATCH",
            "PRIVATE_TRAFFIC_TO_INTERNET",
            "PRIVATE_GOOGLE_ACCESS_DISALLOWED",
            "PRIVATE_GOOGLE_ACCESS_VIA_VPN_TUNNEL_UNSUPPORTED",
            "NO_EXTERNAL_ADDRESS",
            "UNKNOWN_INTERNAL_ADDRESS",
            "FORWARDING_RULE_MISMATCH",
            "FORWARDING_RULE_NO_INSTANCES",
            "FIREWALL_BLOCKING_LOAD_BALANCER_BACKEND_HEALTH_CHECK",
            "INGRESS_FIREWALL_TAGS_UNSUPPORTED_BY_DIRECT_VPC_EGRESS",
            "INSTANCE_NOT_RUNNING",
            "GKE_CLUSTER_NOT_RUNNING",
            "GKE_POD_NOT_RUNNING",
            "CLOUD_SQL_INSTANCE_NOT_RUNNING",
            "REDIS_INSTANCE_NOT_RUNNING",
            "REDIS_CLUSTER_NOT_RUNNING",
            "TRAFFIC_TYPE_BLOCKED",
            "GKE_MASTER_UNAUTHORIZED_ACCESS",
            "CLOUD_SQL_INSTANCE_UNAUTHORIZED_ACCESS",
            "DROPPED_INSIDE_GKE_SERVICE",
            "DROPPED_INSIDE_CLOUD_SQL_SERVICE",
            "GOOGLE_MANAGED_SERVICE_NO_PEERING",
            "GOOGLE_MANAGED_SERVICE_NO_PSC_ENDPOINT",
            "GKE_PSC_ENDPOINT_MISSING",
            "CLOUD_SQL_INSTANCE_NO_IP_ADDRESS",
            "GKE_CONTROL_PLANE_REGION_MISMATCH",
            "PUBLIC_GKE_CONTROL_PLANE_TO_PRIVATE_DESTINATION",
            "GKE_CONTROL_PLANE_NO_ROUTE",
            "CLOUD_SQL_INSTANCE_NOT_CONFIGURED_FOR_EXTERNAL_TRAFFIC",
            "PUBLIC_CLOUD_SQL_INSTANCE_TO_PRIVATE_DESTINATION",
            "CLOUD_SQL_INSTANCE_NO_ROUTE",
            "CLOUD_SQL_CONNECTOR_REQUIRED",
            "CLOUD_FUNCTION_NOT_ACTIVE",
            "VPC_CONNECTOR_NOT_SET",
            "VPC_CONNECTOR_NOT_RUNNING",
            "VPC_CONNECTOR_SERVERLESS_TRAFFIC_BLOCKED",
            "VPC_CONNECTOR_HEALTH_CHECK_TRAFFIC_BLOCKED",
            "FORWARDING_RULE_REGION_MISMATCH",
            "PSC_CONNECTION_NOT_ACCEPTED",
            "PSC_ENDPOINT_ACCESSED_FROM_PEERED_NETWORK",
            "PSC_NEG_PRODUCER_ENDPOINT_NO_GLOBAL_ACCESS",
            "PSC_NEG_PRODUCER_FORWARDING_RULE_MULTIPLE_PORTS",
            "CLOUD_SQL_PSC_NEG_UNSUPPORTED",
            "NO_NAT_SUBNETS_FOR_PSC_SERVICE_ATTACHMENT",
            "PSC_TRANSITIVITY_NOT_PROPAGATED",
            "HYBRID_NEG_NON_DYNAMIC_ROUTE_MATCHED",
            "HYBRID_NEG_NON_LOCAL_DYNAMIC_ROUTE_MATCHED",
            "CLOUD_RUN_REVISION_NOT_READY",
            "DROPPED_INSIDE_PSC_SERVICE_PRODUCER",
            "LOAD_BALANCER_HAS_NO_PROXY_SUBNET",
            "CLOUD_NAT_NO_ADDRESSES",
            "ROUTING_LOOP",
            "DROPPED_INSIDE_GOOGLE_MANAGED_SERVICE",
            "LOAD_BALANCER_BACKEND_INVALID_NETWORK",
            "BACKEND_SERVICE_NAMED_PORT_NOT_DEFINED",
            "DESTINATION_IS_PRIVATE_NAT_IP_RANGE",
            "DROPPED_INSIDE_REDIS_INSTANCE_SERVICE",
            "REDIS_INSTANCE_UNSUPPORTED_PORT",
            "REDIS_INSTANCE_CONNECTING_FROM_PUPI_ADDRESS",
            "REDIS_INSTANCE_NO_ROUTE_TO_DESTINATION_NETWORK",
            "REDIS_INSTANCE_NO_EXTERNAL_IP",
            "REDIS_INSTANCE_UNSUPPORTED_PROTOCOL",
            "DROPPED_INSIDE_REDIS_CLUSTER_SERVICE",
            "REDIS_CLUSTER_UNSUPPORTED_PORT",
            "REDIS_CLUSTER_NO_EXTERNAL_IP",
            "REDIS_CLUSTER_UNSUPPORTED_PROTOCOL",
            "NO_ADVERTISED_ROUTE_TO_GCP_DESTINATION",
            "NO_TRAFFIC_SELECTOR_TO_GCP_DESTINATION",
            "NO_KNOWN_ROUTE_FROM_PEERED_NETWORK_TO_DESTINATION",
            "PRIVATE_NAT_TO_PSC_ENDPOINT_UNSUPPORTED",
            "PSC_PORT_MAPPING_PORT_MISMATCH",
            "PSC_PORT_MAPPING_WITHOUT_PSC_CONNECTION_UNSUPPORTED",
            "UNSUPPORTED_ROUTE_MATCHED_FOR_NAT64_DESTINATION",
            "TRAFFIC_FROM_HYBRID_ENDPOINT_TO_INTERNET_DISALLOWED",
            "NO_MATCHING_NAT64_GATEWAY",
            "NO_CONFIGURED_PRIVATE_NAT64_RULE",
            "LOAD_BALANCER_BACKEND_IP_VERSION_MISMATCH",
            "NO_KNOWN_ROUTE_FROM_NCC_NETWORK_TO_DESTINATION",
            "CLOUD_NAT_PROTOCOL_UNSUPPORTED",
            "L2_INTERCONNECT_UNSUPPORTED_PROTOCOL",
            "L2_INTERCONNECT_UNSUPPORTED_PORT",
            "L2_INTERCONNECT_DESTINATION_IP_MISMATCH",
            "NCC_ROUTE_WITHIN_HYBRID_SUBNET_UNSUPPORTED",
            "HYBRID_SUBNET_REGION_MISMATCH",
            "HYBRID_SUBNET_NO_ROUTE",
            "GKE_NETWORK_POLICY",
            "NO_VALID_ROUTE_FROM_GOOGLE_MANAGED_NETWORK_TO_DESTINATION",
          ]).describe("Cause that the packet is dropped.").optional(),
          destinationGeolocationCode: z.string().describe(
            "Geolocation (region code) of the destination IP address (if relevant).",
          ).optional(),
          destinationIp: z.string().describe(
            "Destination IP address of the dropped packet (if relevant).",
          ).optional(),
          region: z.string().describe(
            "Region of the dropped packet (if relevant).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that caused the drop.",
          ).optional(),
          sourceGeolocationCode: z.string().describe(
            "Geolocation (region code) of the source IP address (if relevant).",
          ).optional(),
          sourceIp: z.string().describe(
            "Source IP address of the dropped packet (if relevant).",
          ).optional(),
        }).describe(
          'Details of the final state "drop" and associated resource.',
        ).optional(),
        endpoint: z.object({
          destinationIp: z.string().describe("Destination IP address.")
            .optional(),
          destinationNetworkUri: z.string().describe(
            "URI of the network where this packet is sent to.",
          ).optional(),
          destinationPort: z.number().int().describe(
            "Destination port. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          sourceAgentUri: z.string().describe(
            "URI of the source telemetry agent this packet originates from.",
          ).optional(),
          sourceIp: z.string().describe("Source IP address.").optional(),
          sourceNetworkUri: z.string().describe(
            "URI of the network where this packet originates from.",
          ).optional(),
          sourcePort: z.number().int().describe(
            "Source port. Only valid when protocol is TCP or UDP.",
          ).optional(),
        }).describe(
          "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
        ).optional(),
        firewall: z.object({
          action: z.string().describe(
            "Possible values: ALLOW, DENY, APPLY_SECURITY_PROFILE_GROUP",
          ).optional(),
          direction: z.string().describe("Possible values: INGRESS, EGRESS")
            .optional(),
          displayName: z.string().describe(
            "The display name of the firewall rule. This field might be empty for firewall policy rules.",
          ).optional(),
          firewallRuleType: z.enum([
            "FIREWALL_RULE_TYPE_UNSPECIFIED",
            "HIERARCHICAL_FIREWALL_POLICY_RULE",
            "VPC_FIREWALL_RULE",
            "IMPLIED_VPC_FIREWALL_RULE",
            "SERVERLESS_VPC_ACCESS_MANAGED_FIREWALL_RULE",
            "NETWORK_FIREWALL_POLICY_RULE",
            "NETWORK_REGIONAL_FIREWALL_POLICY_RULE",
            "SYSTEM_NETWORK_FIREWALL_POLICY_RULE",
            "SYSTEM_REGIONAL_NETWORK_FIREWALL_POLICY_RULE",
            "UNSUPPORTED_FIREWALL_POLICY_RULE",
            "TRACKING_STATE",
            "ANALYSIS_SKIPPED",
          ]).describe("The firewall rule's type.").optional(),
          networkUri: z.string().describe(
            "The URI of the VPC network that the firewall rule is associated with. This field is not applicable to hierarchical firewall policy rules.",
          ).optional(),
          policy: z.string().describe(
            "The name of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          policyPriority: z.number().int().describe(
            "The priority of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          policyUri: z.string().describe(
            "The URI of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          priority: z.number().int().describe(
            "The priority of the firewall rule.",
          ).optional(),
          targetServiceAccounts: z.array(z.string()).describe(
            "The target service accounts specified by the firewall rule.",
          ).optional(),
          targetTags: z.array(z.string()).describe(
            "The target tags defined by the VPC firewall rule. This field is not applicable to firewall policy rules.",
          ).optional(),
          targetType: z.enum([
            "TARGET_TYPE_UNSPECIFIED",
            "INSTANCES",
            "INTERNAL_MANAGED_LB",
          ]).describe("Target type of the firewall rule.").optional(),
          uri: z.string().describe(
            "The URI of the firewall rule. This field is not applicable to implied VPC firewall rules.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.",
        ).optional(),
        forward: z.object({
          ipAddress: z.string().describe(
            "IP address of the target (if applicable).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that the packet is forwarded to.",
          ).optional(),
          target: z.enum([
            "TARGET_UNSPECIFIED",
            "PEERING_VPC",
            "VPN_GATEWAY",
            "INTERCONNECT",
            "GKE_MASTER",
            "IMPORTED_CUSTOM_ROUTE_NEXT_HOP",
            "CLOUD_SQL_INSTANCE",
            "ANOTHER_PROJECT",
            "NCC_HUB",
            "ROUTER_APPLIANCE",
            "SECURE_WEB_PROXY_GATEWAY",
          ]).describe("Target type where this packet is forwarded to.")
            .optional(),
        }).describe(
          'Details of the final state "forward" and associated resource.',
        ).optional(),
        forwardingRule: z.object({
          displayName: z.string().describe("Name of the forwarding rule.")
            .optional(),
          loadBalancerName: z.string().describe(
            "Name of the load balancer the forwarding rule belongs to. Empty for forwarding rules not related to load balancers (like PSC forwarding rules).",
          ).optional(),
          matchedPortRange: z.string().describe(
            "Port range defined in the forwarding rule that matches the packet.",
          ).optional(),
          matchedProtocol: z.string().describe(
            "Protocol defined in the forwarding rule that matches the packet.",
          ).optional(),
          networkUri: z.string().describe("Network URI.").optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target this forwarding rule targets (if applicable).",
          ).optional(),
          pscServiceAttachmentUri: z.string().describe(
            "URI of the PSC service attachment this forwarding rule targets (if applicable).",
          ).optional(),
          region: z.string().describe(
            "Region of the forwarding rule. Set only for regional forwarding rules.",
          ).optional(),
          target: z.string().describe("Target type of the forwarding rule.")
            .optional(),
          uri: z.string().describe("URI of the forwarding rule.").optional(),
          vip: z.string().describe("VIP of the forwarding rule.").optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine forwarding rule.",
        ).optional(),
        gkeMaster: z.object({
          clusterNetworkUri: z.string().describe(
            "URI of a GKE cluster network.",
          ).optional(),
          clusterUri: z.string().describe("URI of a GKE cluster.").optional(),
          dnsEndpoint: z.string().describe(
            "DNS endpoint of a GKE cluster control plane.",
          ).optional(),
          externalIp: z.string().describe(
            "External IP address of a GKE cluster control plane.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of a GKE cluster control plane.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.",
        ).optional(),
        gkeNetworkPolicy: z.object({
          action: z.string().describe("Possible values: ALLOW, DENY")
            .optional(),
          direction: z.string().describe("Possible values: INGRESS, EGRESS")
            .optional(),
          displayName: z.string().describe("The name of the Network Policy.")
            .optional(),
          uri: z.string().describe(
            "The URI of the Network Policy. Format for a Network Policy in a zonal cluster: `projects//zones//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/` Format for a Network Policy in a regional cluster: `projects//locations//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/`",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a GKE Network Policy.",
        ).optional(),
        gkeNetworkPolicySkipped: z.object({
          reason: z.enum([
            "REASON_UNSPECIFIED",
            "NETWORK_POLICY_DISABLED",
            "INGRESS_SOURCE_ON_SAME_NODE",
            "EGRESS_FROM_NODE_NETWORK_NAMESPACE_POD",
            "NETWORK_POLICY_NOT_APPLIED_TO_RESPONSE_TRAFFIC",
            "NETWORK_POLICY_ANALYSIS_UNSUPPORTED",
          ]).describe("Reason why Network Policy evaluation was skipped.")
            .optional(),
        }).describe(
          "For display only. Contains information about why GKE Network Policy evaluation was skipped.",
        ).optional(),
        gkePod: z.object({
          ipAddress: z.string().describe(
            "IP address of a GKE Pod. If the Pod is dual-stack, this is the IP address relevant to the trace.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of the network containing the GKE Pod.",
          ).optional(),
          podUri: z.string().describe(
            "URI of a GKE Pod. For Pods in regional Clusters, the URI format is: `projects/{project}/locations/{location}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}` For Pods in zonal Clusters, the URI format is: `projects/{project}/zones/{zone}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}`",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.",
        ).optional(),
        googleService: z.object({
          googleServiceType: z.enum([
            "GOOGLE_SERVICE_TYPE_UNSPECIFIED",
            "IAP",
            "GFE_PROXY_OR_HEALTH_CHECK_PROBER",
            "CLOUD_DNS",
            "GOOGLE_API",
            "GOOGLE_API_PSC",
            "GOOGLE_API_VPC_SC",
            "SERVERLESS_VPC_ACCESS",
          ]).describe("Recognized type of a Google Service.").optional(),
          sourceIp: z.string().describe("Source IP address.").optional(),
        }).describe(
          "For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths",
        ).optional(),
        hybridSubnet: z.object({
          displayName: z.string().describe("Name of a hybrid subnet.")
            .optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where the hybrid subnet is configured.",
          ).optional(),
          uri: z.string().describe("URI of a hybrid subnet.").optional(),
        }).describe(
          "For display only. Metadata associated with a hybrid subnet.",
        ).optional(),
        instance: z.object({
          displayName: z.string().describe("Name of a Compute Engine instance.")
            .optional(),
          externalIp: z.string().describe(
            "External IP address of the network interface.",
          ).optional(),
          interface: z.string().describe(
            "Name of the network interface of a Compute Engine instance.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of the network interface.",
          ).optional(),
          networkTags: z.array(z.string()).describe(
            "Network tags configured on the instance.",
          ).optional(),
          networkUri: z.string().describe("URI of a Compute Engine network.")
            .optional(),
          pscNetworkAttachmentUri: z.string().describe(
            "URI of the PSC network attachment the NIC is attached to (if relevant).",
          ).optional(),
          running: z.boolean().describe(
            "Indicates whether the Compute Engine instance is running. Deprecated: use the `status` field instead.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Service account authorized for the instance.",
          ).optional(),
          status: z.enum(["STATUS_UNSPECIFIED", "RUNNING", "NOT_RUNNING"])
            .describe("The status of the instance.").optional(),
          uri: z.string().describe("URI of a Compute Engine instance.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine instance.",
        ).optional(),
        interconnectAttachment: z.object({
          cloudRouterUri: z.string().describe(
            "URI of the Cloud Router to be used for dynamic routing.",
          ).optional(),
          displayName: z.string().describe(
            "Name of an Interconnect attachment.",
          ).optional(),
          interconnectUri: z.string().describe(
            "URI of the Interconnect where the Interconnect attachment is configured.",
          ).optional(),
          l2AttachmentMatchedIpAddress: z.string().describe(
            "Appliance IP address that was matched for L2_DEDICATED attachments.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where the Interconnect attachment is configured.",
          ).optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "DEDICATED",
            "PARTNER",
            "PARTNER_PROVIDER",
            "L2_DEDICATED",
          ]).describe("The type of interconnect attachment this is.")
            .optional(),
          uri: z.string().describe("URI of an Interconnect attachment.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with an Interconnect attachment.",
        ).optional(),
        ipMasqueradingSkipped: z.object({
          nonMasqueradeRange: z.string().describe(
            "The matched non-masquerade IP range. Only set if reason is DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE or DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE.",
          ).optional(),
          reason: z.enum([
            "REASON_UNSPECIFIED",
            "DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE",
            "DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE",
            "DESTINATION_ON_SAME_NODE",
            "DEFAULT_SNAT_DISABLED",
            "NO_MASQUERADING_FOR_IPV6",
            "POD_USES_NODE_NETWORK_NAMESPACE",
            "NO_MASQUERADING_FOR_RETURN_PACKET",
          ]).describe("Reason why IP masquerading was not applied.").optional(),
        }).describe(
          "For display only. Contains information about why IP masquerading was skipped for the packet.",
        ).optional(),
        loadBalancer: z.object({
          backendType: z.enum([
            "BACKEND_TYPE_UNSPECIFIED",
            "BACKEND_SERVICE",
            "TARGET_POOL",
            "TARGET_INSTANCE",
          ]).describe("Type of load balancer's backend configuration.")
            .optional(),
          backendUri: z.string().describe("Backend configuration URI.")
            .optional(),
          backends: z.array(z.object({
            displayName: z.string().describe(
              "Name of a Compute Engine instance or network endpoint.",
            ).optional(),
            healthCheckAllowingFirewallRules: z.array(z.string()).describe(
              "A list of firewall rule URIs allowing probes from health check IP ranges.",
            ).optional(),
            healthCheckBlockingFirewallRules: z.array(z.string()).describe(
              "A list of firewall rule URIs blocking probes from health check IP ranges.",
            ).optional(),
            healthCheckFirewallState: z.enum([
              "HEALTH_CHECK_FIREWALL_STATE_UNSPECIFIED",
              "CONFIGURED",
              "MISCONFIGURED",
            ]).describe("State of the health check firewall configuration.")
              .optional(),
            uri: z.string().describe(
              "URI of a Compute Engine instance or network endpoint.",
            ).optional(),
          })).describe("Information for the loadbalancer backends.").optional(),
          healthCheckUri: z.string().describe(
            "URI of the health check for the load balancer. Deprecated and no longer populated as different load balancer backends might have different health checks.",
          ).optional(),
          loadBalancerType: z.enum([
            "LOAD_BALANCER_TYPE_UNSPECIFIED",
            "INTERNAL_TCP_UDP",
            "NETWORK_TCP_UDP",
            "HTTP_PROXY",
            "TCP_PROXY",
            "SSL_PROXY",
          ]).describe("Type of the load balancer.").optional(),
        }).describe(
          "For display only. Metadata associated with a load balancer.",
        ).optional(),
        loadBalancerBackendInfo: z.object({
          backendBucketUri: z.string().describe(
            "URI of the backend bucket this backend targets (if applicable).",
          ).optional(),
          backendServiceUri: z.string().describe(
            "URI of the backend service this backend belongs to (if applicable).",
          ).optional(),
          healthCheckFirewallsConfigState: z.enum([
            "HEALTH_CHECK_FIREWALLS_CONFIG_STATE_UNSPECIFIED",
            "FIREWALLS_CONFIGURED",
            "FIREWALLS_PARTIALLY_CONFIGURED",
            "FIREWALLS_NOT_CONFIGURED",
            "FIREWALLS_UNSUPPORTED",
          ]).describe(
            "Output only. Health check firewalls configuration state for the backend. This is a result of the static firewall analysis (verifying that health check traffic from required IP ranges to the backend is allowed or not). The backend might still be unhealthy even if these firewalls are configured. Please refer to the documentation for more information: https://cloud.google.com/load-balancing/docs/firewall-rules",
          ).optional(),
          healthCheckUri: z.string().describe(
            "URI of the health check attached to this backend (if applicable).",
          ).optional(),
          instanceGroupUri: z.string().describe(
            "URI of the instance group this backend belongs to (if applicable).",
          ).optional(),
          instanceUri: z.string().describe(
            "URI of the backend instance (if applicable). Populated for instance group backends, and zonal NEG backends.",
          ).optional(),
          name: z.string().describe(
            "Display name of the backend. For example, it might be an instance name for the instance group backends, or an IP address and port for zonal network endpoint group backends.",
          ).optional(),
          networkEndpointGroupUri: z.string().describe(
            "URI of the network endpoint group this backend belongs to (if applicable).",
          ).optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target this PSC NEG backend targets (if applicable).",
          ).optional(),
          pscServiceAttachmentUri: z.string().describe(
            "URI of the PSC service attachment this PSC NEG backend targets (if applicable).",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with the load balancer backend.",
        ).optional(),
        nat: z.object({
          cloudNatGatewayType: z.enum([
            "CLOUD_NAT_GATEWAY_TYPE_UNSPECIFIED",
            "PUBLIC_NAT44",
            "PUBLIC_NAT64",
            "PRIVATE_NAT_NCC",
            "PRIVATE_NAT_HYBRID",
            "PRIVATE_NAT64",
          ]).describe(
            "Type of Cloud NAT gateway. Only valid when `type` is CLOUD_NAT.",
          ).optional(),
          natGatewayName: z.string().describe(
            "The name of Cloud NAT Gateway. Only valid when type is CLOUD_NAT.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of the network where NAT translation takes place.",
          ).optional(),
          newDestinationIp: z.string().describe(
            "Destination IP address after NAT translation.",
          ).optional(),
          newDestinationPort: z.number().int().describe(
            "Destination port after NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          newSourceIp: z.string().describe(
            "Source IP address after NAT translation.",
          ).optional(),
          newSourcePort: z.number().int().describe(
            "Source port after NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldDestinationIp: z.string().describe(
            "Destination IP address before NAT translation.",
          ).optional(),
          oldDestinationPort: z.number().int().describe(
            "Destination port before NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldSourceIp: z.string().describe(
            "Source IP address before NAT translation.",
          ).optional(),
          oldSourcePort: z.number().int().describe(
            "Source port before NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          routerUri: z.string().describe(
            "Uri of the Cloud Router. Only valid when type is CLOUD_NAT.",
          ).optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "INTERNAL_TO_EXTERNAL",
            "EXTERNAL_TO_INTERNAL",
            "CLOUD_NAT",
            "PRIVATE_SERVICE_CONNECT",
            "GKE_POD_IP_MASQUERADING",
          ]).describe("Type of NAT.").optional(),
        }).describe("For display only. Metadata associated with NAT.")
          .optional(),
        network: z.object({
          displayName: z.string().describe("Name of a Compute Engine network.")
            .optional(),
          matchedIpRange: z.string().describe(
            "The IP range of the subnet matching the source IP address of the test.",
          ).optional(),
          matchedSubnetUri: z.string().describe(
            "URI of the subnet matching the source IP address of the test.",
          ).optional(),
          region: z.string().describe(
            "The region of the subnet matching the source IP address of the test.",
          ).optional(),
          uri: z.string().describe("URI of a Compute Engine network.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine network.",
        ).optional(),
        ngfwPacketInspection: z.object({
          securityProfileGroupUri: z.string().describe(
            "URI of the security profile group associated with this firewall packet inspection.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a layer 7 packet inspection by the firewall.",
        ).optional(),
        projectId: z.string().describe(
          "Project ID that contains the configuration this step is validating.",
        ).optional(),
        proxyConnection: z.object({
          networkUri: z.string().describe(
            "URI of the network where connection is proxied.",
          ).optional(),
          newDestinationIp: z.string().describe(
            "Destination IP address of a new connection.",
          ).optional(),
          newDestinationPort: z.number().int().describe(
            "Destination port of a new connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          newSourceIp: z.string().describe(
            "Source IP address of a new connection.",
          ).optional(),
          newSourcePort: z.number().int().describe(
            "Source port of a new connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldDestinationIp: z.string().describe(
            "Destination IP address of an original connection",
          ).optional(),
          oldDestinationPort: z.number().int().describe(
            "Destination port of an original connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldSourceIp: z.string().describe(
            "Source IP address of an original connection.",
          ).optional(),
          oldSourcePort: z.number().int().describe(
            "Source port of an original connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          subnetUri: z.string().describe("Uri of proxy subnet.").optional(),
        }).describe(
          "For display only. Metadata associated with ProxyConnection.",
        ).optional(),
        redisCluster: z.object({
          discoveryEndpointIpAddress: z.string().describe(
            "Discovery endpoint IP address of a Redis Cluster.",
          ).optional(),
          displayName: z.string().describe("Name of a Redis Cluster.")
            .optional(),
          location: z.string().describe(
            'Name of the region in which the Redis Cluster is defined. For example, "us-central1".',
          ).optional(),
          networkUri: z.string().describe(
            'URI of the network containing the Redis Cluster endpoints in format "projects/{project_id}/global/networks/{network_id}".',
          ).optional(),
          secondaryEndpointIpAddress: z.string().describe(
            "Secondary endpoint IP address of a Redis Cluster.",
          ).optional(),
          uri: z.string().describe(
            'URI of a Redis Cluster in format "projects/{project_id}/locations/{location}/clusters/{cluster_id}"',
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Redis Cluster.",
        ).optional(),
        redisInstance: z.object({
          displayName: z.string().describe("Name of a Cloud Redis Instance.")
            .optional(),
          networkUri: z.string().describe(
            "URI of a Cloud Redis Instance network.",
          ).optional(),
          primaryEndpointIp: z.string().describe(
            "Primary endpoint IP address of a Cloud Redis Instance.",
          ).optional(),
          readEndpointIp: z.string().describe(
            "Read endpoint IP address of a Cloud Redis Instance (if applicable).",
          ).optional(),
          region: z.string().describe(
            "Region in which the Cloud Redis Instance is defined.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Redis Instance.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Redis Instance.",
        ).optional(),
        route: z.object({
          advertisedRouteNextHopUri: z.string().describe(
            "For ADVERTISED routes, the URI of their next hop, i.e. the URI of the hybrid endpoint (VPN tunnel, Interconnect attachment, NCC router appliance) the advertised prefix is advertised through, or URI of the source peered network. Deprecated in favor of the next_hop_uri field, not used in new tests.",
          ).optional(),
          advertisedRouteSourceRouterUri: z.string().describe(
            "For ADVERTISED dynamic routes, the URI of the Cloud Router that advertised the corresponding IP prefix.",
          ).optional(),
          destIpRange: z.string().describe("Destination IP range of the route.")
            .optional(),
          destPortRanges: z.array(z.string()).describe(
            "Destination port ranges of the route. POLICY_BASED routes only.",
          ).optional(),
          displayName: z.string().describe("Name of a route.").optional(),
          instanceTags: z.array(z.string()).describe(
            "Instance tags of the route.",
          ).optional(),
          nccHubRouteUri: z.string().describe(
            "For PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub, the URI of the corresponding route in NCC Hub's routing table.",
          ).optional(),
          nccHubUri: z.string().describe(
            "URI of the NCC Hub the route is advertised by. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only.",
          ).optional(),
          nccSpokeUri: z.string().describe(
            "URI of the destination NCC Spoke. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of a VPC network where route is located.",
          ).optional(),
          nextHop: z.string().describe(
            'String type of the next hop of the route (for example, "VPN tunnel"). Deprecated in favor of the next_hop_type and next_hop_uri fields, not used in new tests.',
          ).optional(),
          nextHopNetworkUri: z.string().describe(
            "URI of a VPC network where the next hop resource is located.",
          ).optional(),
          nextHopType: z.enum([
            "NEXT_HOP_TYPE_UNSPECIFIED",
            "NEXT_HOP_IP",
            "NEXT_HOP_INSTANCE",
            "NEXT_HOP_NETWORK",
            "NEXT_HOP_PEERING",
            "NEXT_HOP_INTERCONNECT",
            "NEXT_HOP_VPN_TUNNEL",
            "NEXT_HOP_VPN_GATEWAY",
            "NEXT_HOP_INTERNET_GATEWAY",
            "NEXT_HOP_BLACKHOLE",
            "NEXT_HOP_ILB",
            "NEXT_HOP_ROUTER_APPLIANCE",
            "NEXT_HOP_NCC_HUB",
            "SECURE_WEB_PROXY_GATEWAY",
          ]).describe("Type of next hop.").optional(),
          nextHopUri: z.string().describe("URI of the next hop resource.")
            .optional(),
          originatingRouteDisplayName: z.string().describe(
            "For PEERING_SUBNET, PEERING_STATIC and PEERING_DYNAMIC routes, the name of the originating SUBNET/STATIC/DYNAMIC route.",
          ).optional(),
          originatingRouteUri: z.string().describe(
            "For PEERING_SUBNET and PEERING_STATIC routes, the URI of the originating SUBNET/STATIC route.",
          ).optional(),
          priority: z.number().int().describe("Priority of the route.")
            .optional(),
          protocols: z.array(z.string()).describe(
            "Protocols of the route. POLICY_BASED routes only.",
          ).optional(),
          region: z.string().describe(
            "Region of the route. DYNAMIC, PEERING_DYNAMIC, POLICY_BASED and ADVERTISED routes only. If set for POLICY_BASED route, this is a region of VLAN attachments for Cloud Interconnect the route applies to.",
          ).optional(),
          routeScope: z.enum(["ROUTE_SCOPE_UNSPECIFIED", "NETWORK", "NCC_HUB"])
            .describe(
              "Indicates where route is applicable. Deprecated, routes with NCC_HUB scope are not included in the trace in new tests.",
            ).optional(),
          routeType: z.enum([
            "ROUTE_TYPE_UNSPECIFIED",
            "SUBNET",
            "STATIC",
            "DYNAMIC",
            "PEERING_SUBNET",
            "PEERING_STATIC",
            "PEERING_DYNAMIC",
            "POLICY_BASED",
            "ADVERTISED",
          ]).describe("Type of route.").optional(),
          srcIpRange: z.string().describe(
            "Source IP address range of the route. POLICY_BASED routes only.",
          ).optional(),
          srcPortRanges: z.array(z.string()).describe(
            "Source port ranges of the route. POLICY_BASED routes only.",
          ).optional(),
          uri: z.string().describe(
            "URI of a route. SUBNET, STATIC, PEERING_SUBNET (only for peering network) and POLICY_BASED routes only.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine route.",
        ).optional(),
        serverlessExternalConnection: z.object({
          selectedIpAddress: z.string().describe(
            "Selected starting IP address, from the Google dynamic address pool.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a serverless public connection.",
        ).optional(),
        serverlessNeg: z.object({
          negUri: z.string().describe(
            "URI of the serverless network endpoint group.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with the serverless network endpoint group backend.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "START_FROM_INSTANCE",
          "START_FROM_INTERNET",
          "START_FROM_GOOGLE_SERVICE",
          "START_FROM_PRIVATE_NETWORK",
          "START_FROM_GKE_MASTER",
          "START_FROM_CLOUD_SQL_INSTANCE",
          "START_FROM_GKE_POD",
          "START_FROM_REDIS_INSTANCE",
          "START_FROM_REDIS_CLUSTER",
          "START_FROM_CLOUD_FUNCTION",
          "START_FROM_APP_ENGINE_VERSION",
          "START_FROM_CLOUD_RUN_REVISION",
          "START_FROM_STORAGE_BUCKET",
          "START_FROM_PSC_PUBLISHED_SERVICE",
          "START_FROM_SERVERLESS_NEG",
          "APPLY_INGRESS_FIREWALL_RULE",
          "APPLY_EGRESS_FIREWALL_RULE",
          "APPLY_ROUTE",
          "APPLY_FORWARDING_RULE",
          "ANALYZE_LOAD_BALANCER_BACKEND",
          "SPOOFING_APPROVED",
          "ARRIVE_AT_INSTANCE",
          "ARRIVE_AT_INTERNAL_LOAD_BALANCER",
          "ARRIVE_AT_EXTERNAL_LOAD_BALANCER",
          "ARRIVE_AT_HYBRID_SUBNET",
          "ARRIVE_AT_VPN_GATEWAY",
          "ARRIVE_AT_VPN_TUNNEL",
          "ARRIVE_AT_INTERCONNECT_ATTACHMENT",
          "ARRIVE_AT_VPC_CONNECTOR",
          "ARRIVE_AT_GKE_POD",
          "DIRECT_VPC_EGRESS_CONNECTION",
          "SERVERLESS_EXTERNAL_CONNECTION",
          "NGFW_PACKET_INSPECTION",
          "NAT",
          "SKIP_GKE_POD_IP_MASQUERADING",
          "SKIP_GKE_INGRESS_NETWORK_POLICY",
          "SKIP_GKE_EGRESS_NETWORK_POLICY",
          "APPLY_INGRESS_GKE_NETWORK_POLICY",
          "APPLY_EGRESS_GKE_NETWORK_POLICY",
          "PROXY_CONNECTION",
          "DELIVER",
          "DROP",
          "FORWARD",
          "ABORT",
          "VIEWER_PERMISSION_MISSING",
        ]).describe("Each step is in one of the pre-defined states.")
          .optional(),
        storageBucket: z.object({
          bucket: z.string().describe("Cloud Storage Bucket name.").optional(),
        }).describe(
          "For display only. Metadata associated with Storage Bucket.",
        ).optional(),
        vpcConnector: z.object({
          displayName: z.string().describe("Name of a VPC connector.")
            .optional(),
          location: z.string().describe(
            "Location in which the VPC connector is deployed.",
          ).optional(),
          uri: z.string().describe("URI of a VPC connector.").optional(),
        }).describe(
          "For display only. Metadata associated with a VPC connector.",
        ).optional(),
        vpnGateway: z.object({
          displayName: z.string().describe("Name of a VPN gateway.").optional(),
          ipAddress: z.string().describe("IP address of the VPN gateway.")
            .optional(),
          networkUri: z.string().describe(
            "URI of a Compute Engine network where the VPN gateway is configured.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where this VPN gateway is configured.",
          ).optional(),
          uri: z.string().describe("URI of a VPN gateway.").optional(),
          vpnTunnelUri: z.string().describe(
            "A VPN tunnel that is associated with this VPN gateway. There may be multiple VPN tunnels configured on a VPN gateway, and only the one relevant to the test is displayed.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine VPN gateway.",
        ).optional(),
        vpnTunnel: z.object({
          displayName: z.string().describe("Name of a VPN tunnel.").optional(),
          networkUri: z.string().describe(
            "URI of a Compute Engine network where the VPN tunnel is configured.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where this VPN tunnel is configured.",
          ).optional(),
          remoteGateway: z.string().describe(
            "URI of a VPN gateway at remote end of the tunnel.",
          ).optional(),
          remoteGatewayIp: z.string().describe(
            "Remote VPN gateway's IP address.",
          ).optional(),
          routingType: z.enum([
            "ROUTING_TYPE_UNSPECIFIED",
            "ROUTE_BASED",
            "POLICY_BASED",
            "DYNAMIC",
          ]).describe("Type of the routing policy.").optional(),
          sourceGateway: z.string().describe(
            "URI of the VPN gateway at local end of the tunnel.",
          ).optional(),
          sourceGatewayIp: z.string().describe(
            "Local VPN gateway's IP address.",
          ).optional(),
          uri: z.string().describe("URI of a VPN tunnel.").optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine VPN tunnel.",
        ).optional(),
      })).describe(
        "A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them.",
      ).optional(),
    })).describe(
      "Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends.",
    ).optional(),
    verifyTime: z.string().describe("The time of the configuration analysis.")
      .optional(),
  }).describe(
    "Results of the configuration analysis from the last run of the test.",
  ).optional(),
  relatedProjects: z.array(z.string()).describe(
    "Other projects that may be relevant for reachability analysis. This is applicable to scenarios where a test can cross project boundaries.",
  ).optional(),
  returnReachabilityDetails: z.object({
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
    result: z.enum([
      "RESULT_UNSPECIFIED",
      "REACHABLE",
      "UNREACHABLE",
      "AMBIGUOUS",
      "UNDETERMINED",
    ]).describe("The overall result of the test's configuration analysis.")
      .optional(),
    traces: z.array(z.object({
      endpointInfo: z.object({
        destinationIp: z.string().describe("Destination IP address.")
          .optional(),
        destinationNetworkUri: z.string().describe(
          "URI of the network where this packet is sent to.",
        ).optional(),
        destinationPort: z.number().int().describe(
          "Destination port. Only valid when protocol is TCP or UDP.",
        ).optional(),
        protocol: z.string().describe(
          'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
        ).optional(),
        sourceAgentUri: z.string().describe(
          "URI of the source telemetry agent this packet originates from.",
        ).optional(),
        sourceIp: z.string().describe("Source IP address.").optional(),
        sourceNetworkUri: z.string().describe(
          "URI of the network where this packet originates from.",
        ).optional(),
        sourcePort: z.number().int().describe(
          "Source port. Only valid when protocol is TCP or UDP.",
        ).optional(),
      }).describe(
        "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
      ).optional(),
      forwardTraceId: z.number().int().describe(
        "ID of trace. For forward traces, this ID is unique for each trace. For return traces, it matches ID of associated forward trace. A single forward trace can be associated with none, one or more than one return trace.",
      ).optional(),
      steps: z.array(z.object({
        abort: z.object({
          cause: z.enum([
            "CAUSE_UNSPECIFIED",
            "UNKNOWN_NETWORK",
            "UNKNOWN_PROJECT",
            "NO_EXTERNAL_IP",
            "UNINTENDED_DESTINATION",
            "SOURCE_ENDPOINT_NOT_FOUND",
            "MISMATCHED_SOURCE_NETWORK",
            "DESTINATION_ENDPOINT_NOT_FOUND",
            "MISMATCHED_DESTINATION_NETWORK",
            "UNKNOWN_IP",
            "GOOGLE_MANAGED_SERVICE_UNKNOWN_IP",
            "SOURCE_IP_ADDRESS_NOT_IN_SOURCE_NETWORK",
            "PERMISSION_DENIED",
            "PERMISSION_DENIED_NO_CLOUD_NAT_CONFIGS",
            "PERMISSION_DENIED_NO_NEG_ENDPOINT_CONFIGS",
            "PERMISSION_DENIED_NO_CLOUD_ROUTER_CONFIGS",
            "NO_SOURCE_LOCATION",
            "NO_SOURCE_GCP_NETWORK_LOCATION",
            "NO_SOURCE_NON_GCP_NETWORK_LOCATION",
            "NO_SOURCE_INTERNET_LOCATION",
            "INVALID_ARGUMENT",
            "TRACE_TOO_LONG",
            "INTERNAL_ERROR",
            "UNSUPPORTED",
            "MISMATCHED_IP_VERSION",
            "GKE_KONNECTIVITY_PROXY_UNSUPPORTED",
            "RESOURCE_CONFIG_NOT_FOUND",
            "VM_INSTANCE_CONFIG_NOT_FOUND",
            "NETWORK_CONFIG_NOT_FOUND",
            "FIREWALL_CONFIG_NOT_FOUND",
            "ROUTE_CONFIG_NOT_FOUND",
            "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_PSC_ENDPOINT",
            "GOOGLE_MANAGED_SERVICE_AMBIGUOUS_ENDPOINT",
            "SOURCE_PSC_CLOUD_SQL_UNSUPPORTED",
            "SOURCE_EXTERNAL_CLOUD_SQL_UNSUPPORTED",
            "SOURCE_REDIS_CLUSTER_UNSUPPORTED",
            "SOURCE_REDIS_INSTANCE_UNSUPPORTED",
            "SOURCE_FORWARDING_RULE_UNSUPPORTED",
            "NON_ROUTABLE_IP_ADDRESS",
            "UNKNOWN_ISSUE_IN_GOOGLE_MANAGED_PROJECT",
            "UNSUPPORTED_GOOGLE_MANAGED_PROJECT_CONFIG",
            "NO_SERVERLESS_IP_RANGES",
            "IP_VERSION_PROTOCOL_MISMATCH",
            "GKE_POD_UNKNOWN_ENDPOINT_LOCATION",
          ]).describe("Causes that the analysis is aborted.").optional(),
          ipAddress: z.string().describe("IP address that caused the abort.")
            .optional(),
          projectsMissingPermission: z.array(z.string()).describe(
            "List of project IDs the user specified in the request but lacks access to. In this case, analysis is aborted with the PERMISSION_DENIED cause.",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that caused the abort.",
          ).optional(),
        }).describe(
          'Details of the final state "abort" and associated resource.',
        ).optional(),
        appEngineVersion: z.object({
          displayName: z.string().describe("Name of an App Engine version.")
            .optional(),
          environment: z.string().describe(
            "App Engine execution environment for a version.",
          ).optional(),
          runtime: z.string().describe("Runtime of the App Engine version.")
            .optional(),
          uri: z.string().describe("URI of an App Engine version.").optional(),
        }).describe(
          "For display only. Metadata associated with an App Engine version.",
        ).optional(),
        causesDrop: z.boolean().describe(
          "This is a step that leads to the final state Drop.",
        ).optional(),
        cloudFunction: z.object({
          displayName: z.string().describe("Name of a Cloud Function.")
            .optional(),
          location: z.string().describe(
            "Location in which the Cloud Function is deployed.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Function.").optional(),
          versionId: z.string().describe(
            "Latest successfully deployed version id of the Cloud Function.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Function.",
        ).optional(),
        cloudRunRevision: z.object({
          displayName: z.string().describe("Name of a Cloud Run revision.")
            .optional(),
          location: z.string().describe(
            "Location in which this revision is deployed.",
          ).optional(),
          serviceUri: z.string().describe(
            "URI of Cloud Run service this revision belongs to.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Run revision.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Run revision.",
        ).optional(),
        cloudSqlInstance: z.object({
          displayName: z.string().describe("Name of a Cloud SQL instance.")
            .optional(),
          externalIp: z.string().describe(
            "External IP address of a Cloud SQL instance.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of a Cloud SQL instance.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of a Cloud SQL instance network or empty string if the instance does not have one.",
          ).optional(),
          region: z.string().describe(
            "Region in which the Cloud SQL instance is running.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud SQL instance.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud SQL instance.",
        ).optional(),
        deliver: z.object({
          googleServiceType: z.enum([
            "GOOGLE_SERVICE_TYPE_UNSPECIFIED",
            "IAP",
            "GFE_PROXY_OR_HEALTH_CHECK_PROBER",
            "CLOUD_DNS",
            "PRIVATE_GOOGLE_ACCESS",
            "SERVERLESS_VPC_ACCESS",
          ]).describe(
            "Recognized type of a Google Service the packet is delivered to (if applicable).",
          ).optional(),
          ipAddress: z.string().describe(
            "IP address of the target (if applicable).",
          ).optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target the packet is delivered to (if applicable).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that the packet is delivered to.",
          ).optional(),
          storageBucket: z.string().describe(
            "Name of the Cloud Storage Bucket the packet is delivered to (if applicable).",
          ).optional(),
          target: z.enum([
            "TARGET_UNSPECIFIED",
            "INSTANCE",
            "INTERNET",
            "GOOGLE_API",
            "GKE_MASTER",
            "CLOUD_SQL_INSTANCE",
            "PSC_PUBLISHED_SERVICE",
            "PSC_GOOGLE_API",
            "PSC_VPC_SC",
            "SERVERLESS_NEG",
            "STORAGE_BUCKET",
            "PRIVATE_NETWORK",
            "CLOUD_FUNCTION",
            "APP_ENGINE_VERSION",
            "CLOUD_RUN_REVISION",
            "GOOGLE_MANAGED_SERVICE",
            "REDIS_INSTANCE",
            "REDIS_CLUSTER",
            "GKE_POD",
          ]).describe("Target type where the packet is delivered to.")
            .optional(),
        }).describe(
          'Details of the final state "deliver" and associated resource.',
        ).optional(),
        description: z.string().describe(
          "A description of the step. Usually this is a summary of the state.",
        ).optional(),
        directVpcEgressConnection: z.object({
          networkUri: z.string().describe("URI of direct access network.")
            .optional(),
          region: z.string().describe(
            "Region in which the Direct VPC egress is deployed.",
          ).optional(),
          selectedIpAddress: z.string().describe(
            "Selected starting IP address, from the selected IP range.",
          ).optional(),
          selectedIpRange: z.string().describe("Selected IP range.").optional(),
          subnetworkUri: z.string().describe("URI of direct access subnetwork.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a serverless direct VPC egress connection.",
        ).optional(),
        drop: z.object({
          cause: z.enum([
            "CAUSE_UNSPECIFIED",
            "UNKNOWN_EXTERNAL_ADDRESS",
            "FOREIGN_IP_DISALLOWED",
            "FIREWALL_RULE",
            "NO_ROUTE",
            "ROUTE_BLACKHOLE",
            "ROUTE_WRONG_NETWORK",
            "ROUTE_NEXT_HOP_IP_ADDRESS_NOT_RESOLVED",
            "ROUTE_NEXT_HOP_RESOURCE_NOT_FOUND",
            "ROUTE_NEXT_HOP_INSTANCE_WRONG_NETWORK",
            "ROUTE_NEXT_HOP_INSTANCE_NON_PRIMARY_IP",
            "ROUTE_NEXT_HOP_FORWARDING_RULE_IP_MISMATCH",
            "ROUTE_NEXT_HOP_VPN_TUNNEL_NOT_ESTABLISHED",
            "ROUTE_NEXT_HOP_FORWARDING_RULE_TYPE_INVALID",
            "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV6_ADDRESS",
            "NO_ROUTE_FROM_INTERNET_TO_PRIVATE_IPV4_ADDRESS",
            "NO_ROUTE_FROM_EXTERNAL_IPV6_SOURCE_TO_PRIVATE_IPV6_ADDRESS",
            "VPN_TUNNEL_LOCAL_SELECTOR_MISMATCH",
            "VPN_TUNNEL_REMOTE_SELECTOR_MISMATCH",
            "PRIVATE_TRAFFIC_TO_INTERNET",
            "PRIVATE_GOOGLE_ACCESS_DISALLOWED",
            "PRIVATE_GOOGLE_ACCESS_VIA_VPN_TUNNEL_UNSUPPORTED",
            "NO_EXTERNAL_ADDRESS",
            "UNKNOWN_INTERNAL_ADDRESS",
            "FORWARDING_RULE_MISMATCH",
            "FORWARDING_RULE_NO_INSTANCES",
            "FIREWALL_BLOCKING_LOAD_BALANCER_BACKEND_HEALTH_CHECK",
            "INGRESS_FIREWALL_TAGS_UNSUPPORTED_BY_DIRECT_VPC_EGRESS",
            "INSTANCE_NOT_RUNNING",
            "GKE_CLUSTER_NOT_RUNNING",
            "GKE_POD_NOT_RUNNING",
            "CLOUD_SQL_INSTANCE_NOT_RUNNING",
            "REDIS_INSTANCE_NOT_RUNNING",
            "REDIS_CLUSTER_NOT_RUNNING",
            "TRAFFIC_TYPE_BLOCKED",
            "GKE_MASTER_UNAUTHORIZED_ACCESS",
            "CLOUD_SQL_INSTANCE_UNAUTHORIZED_ACCESS",
            "DROPPED_INSIDE_GKE_SERVICE",
            "DROPPED_INSIDE_CLOUD_SQL_SERVICE",
            "GOOGLE_MANAGED_SERVICE_NO_PEERING",
            "GOOGLE_MANAGED_SERVICE_NO_PSC_ENDPOINT",
            "GKE_PSC_ENDPOINT_MISSING",
            "CLOUD_SQL_INSTANCE_NO_IP_ADDRESS",
            "GKE_CONTROL_PLANE_REGION_MISMATCH",
            "PUBLIC_GKE_CONTROL_PLANE_TO_PRIVATE_DESTINATION",
            "GKE_CONTROL_PLANE_NO_ROUTE",
            "CLOUD_SQL_INSTANCE_NOT_CONFIGURED_FOR_EXTERNAL_TRAFFIC",
            "PUBLIC_CLOUD_SQL_INSTANCE_TO_PRIVATE_DESTINATION",
            "CLOUD_SQL_INSTANCE_NO_ROUTE",
            "CLOUD_SQL_CONNECTOR_REQUIRED",
            "CLOUD_FUNCTION_NOT_ACTIVE",
            "VPC_CONNECTOR_NOT_SET",
            "VPC_CONNECTOR_NOT_RUNNING",
            "VPC_CONNECTOR_SERVERLESS_TRAFFIC_BLOCKED",
            "VPC_CONNECTOR_HEALTH_CHECK_TRAFFIC_BLOCKED",
            "FORWARDING_RULE_REGION_MISMATCH",
            "PSC_CONNECTION_NOT_ACCEPTED",
            "PSC_ENDPOINT_ACCESSED_FROM_PEERED_NETWORK",
            "PSC_NEG_PRODUCER_ENDPOINT_NO_GLOBAL_ACCESS",
            "PSC_NEG_PRODUCER_FORWARDING_RULE_MULTIPLE_PORTS",
            "CLOUD_SQL_PSC_NEG_UNSUPPORTED",
            "NO_NAT_SUBNETS_FOR_PSC_SERVICE_ATTACHMENT",
            "PSC_TRANSITIVITY_NOT_PROPAGATED",
            "HYBRID_NEG_NON_DYNAMIC_ROUTE_MATCHED",
            "HYBRID_NEG_NON_LOCAL_DYNAMIC_ROUTE_MATCHED",
            "CLOUD_RUN_REVISION_NOT_READY",
            "DROPPED_INSIDE_PSC_SERVICE_PRODUCER",
            "LOAD_BALANCER_HAS_NO_PROXY_SUBNET",
            "CLOUD_NAT_NO_ADDRESSES",
            "ROUTING_LOOP",
            "DROPPED_INSIDE_GOOGLE_MANAGED_SERVICE",
            "LOAD_BALANCER_BACKEND_INVALID_NETWORK",
            "BACKEND_SERVICE_NAMED_PORT_NOT_DEFINED",
            "DESTINATION_IS_PRIVATE_NAT_IP_RANGE",
            "DROPPED_INSIDE_REDIS_INSTANCE_SERVICE",
            "REDIS_INSTANCE_UNSUPPORTED_PORT",
            "REDIS_INSTANCE_CONNECTING_FROM_PUPI_ADDRESS",
            "REDIS_INSTANCE_NO_ROUTE_TO_DESTINATION_NETWORK",
            "REDIS_INSTANCE_NO_EXTERNAL_IP",
            "REDIS_INSTANCE_UNSUPPORTED_PROTOCOL",
            "DROPPED_INSIDE_REDIS_CLUSTER_SERVICE",
            "REDIS_CLUSTER_UNSUPPORTED_PORT",
            "REDIS_CLUSTER_NO_EXTERNAL_IP",
            "REDIS_CLUSTER_UNSUPPORTED_PROTOCOL",
            "NO_ADVERTISED_ROUTE_TO_GCP_DESTINATION",
            "NO_TRAFFIC_SELECTOR_TO_GCP_DESTINATION",
            "NO_KNOWN_ROUTE_FROM_PEERED_NETWORK_TO_DESTINATION",
            "PRIVATE_NAT_TO_PSC_ENDPOINT_UNSUPPORTED",
            "PSC_PORT_MAPPING_PORT_MISMATCH",
            "PSC_PORT_MAPPING_WITHOUT_PSC_CONNECTION_UNSUPPORTED",
            "UNSUPPORTED_ROUTE_MATCHED_FOR_NAT64_DESTINATION",
            "TRAFFIC_FROM_HYBRID_ENDPOINT_TO_INTERNET_DISALLOWED",
            "NO_MATCHING_NAT64_GATEWAY",
            "NO_CONFIGURED_PRIVATE_NAT64_RULE",
            "LOAD_BALANCER_BACKEND_IP_VERSION_MISMATCH",
            "NO_KNOWN_ROUTE_FROM_NCC_NETWORK_TO_DESTINATION",
            "CLOUD_NAT_PROTOCOL_UNSUPPORTED",
            "L2_INTERCONNECT_UNSUPPORTED_PROTOCOL",
            "L2_INTERCONNECT_UNSUPPORTED_PORT",
            "L2_INTERCONNECT_DESTINATION_IP_MISMATCH",
            "NCC_ROUTE_WITHIN_HYBRID_SUBNET_UNSUPPORTED",
            "HYBRID_SUBNET_REGION_MISMATCH",
            "HYBRID_SUBNET_NO_ROUTE",
            "GKE_NETWORK_POLICY",
            "NO_VALID_ROUTE_FROM_GOOGLE_MANAGED_NETWORK_TO_DESTINATION",
          ]).describe("Cause that the packet is dropped.").optional(),
          destinationGeolocationCode: z.string().describe(
            "Geolocation (region code) of the destination IP address (if relevant).",
          ).optional(),
          destinationIp: z.string().describe(
            "Destination IP address of the dropped packet (if relevant).",
          ).optional(),
          region: z.string().describe(
            "Region of the dropped packet (if relevant).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that caused the drop.",
          ).optional(),
          sourceGeolocationCode: z.string().describe(
            "Geolocation (region code) of the source IP address (if relevant).",
          ).optional(),
          sourceIp: z.string().describe(
            "Source IP address of the dropped packet (if relevant).",
          ).optional(),
        }).describe(
          'Details of the final state "drop" and associated resource.',
        ).optional(),
        endpoint: z.object({
          destinationIp: z.string().describe("Destination IP address.")
            .optional(),
          destinationNetworkUri: z.string().describe(
            "URI of the network where this packet is sent to.",
          ).optional(),
          destinationPort: z.number().int().describe(
            "Destination port. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          sourceAgentUri: z.string().describe(
            "URI of the source telemetry agent this packet originates from.",
          ).optional(),
          sourceIp: z.string().describe("Source IP address.").optional(),
          sourceNetworkUri: z.string().describe(
            "URI of the network where this packet originates from.",
          ).optional(),
          sourcePort: z.number().int().describe(
            "Source port. Only valid when protocol is TCP or UDP.",
          ).optional(),
        }).describe(
          "For display only. The specification of the endpoints for the test. EndpointInfo is derived from source and destination Endpoint and validated by the backend data plane model.",
        ).optional(),
        firewall: z.object({
          action: z.string().describe(
            "Possible values: ALLOW, DENY, APPLY_SECURITY_PROFILE_GROUP",
          ).optional(),
          direction: z.string().describe("Possible values: INGRESS, EGRESS")
            .optional(),
          displayName: z.string().describe(
            "The display name of the firewall rule. This field might be empty for firewall policy rules.",
          ).optional(),
          firewallRuleType: z.enum([
            "FIREWALL_RULE_TYPE_UNSPECIFIED",
            "HIERARCHICAL_FIREWALL_POLICY_RULE",
            "VPC_FIREWALL_RULE",
            "IMPLIED_VPC_FIREWALL_RULE",
            "SERVERLESS_VPC_ACCESS_MANAGED_FIREWALL_RULE",
            "NETWORK_FIREWALL_POLICY_RULE",
            "NETWORK_REGIONAL_FIREWALL_POLICY_RULE",
            "SYSTEM_NETWORK_FIREWALL_POLICY_RULE",
            "SYSTEM_REGIONAL_NETWORK_FIREWALL_POLICY_RULE",
            "UNSUPPORTED_FIREWALL_POLICY_RULE",
            "TRACKING_STATE",
            "ANALYSIS_SKIPPED",
          ]).describe("The firewall rule's type.").optional(),
          networkUri: z.string().describe(
            "The URI of the VPC network that the firewall rule is associated with. This field is not applicable to hierarchical firewall policy rules.",
          ).optional(),
          policy: z.string().describe(
            "The name of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          policyPriority: z.number().int().describe(
            "The priority of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          policyUri: z.string().describe(
            "The URI of the firewall policy that this rule is associated with. This field is not applicable to VPC firewall rules and implied VPC firewall rules.",
          ).optional(),
          priority: z.number().int().describe(
            "The priority of the firewall rule.",
          ).optional(),
          targetServiceAccounts: z.array(z.string()).describe(
            "The target service accounts specified by the firewall rule.",
          ).optional(),
          targetTags: z.array(z.string()).describe(
            "The target tags defined by the VPC firewall rule. This field is not applicable to firewall policy rules.",
          ).optional(),
          targetType: z.enum([
            "TARGET_TYPE_UNSPECIFIED",
            "INSTANCES",
            "INTERNAL_MANAGED_LB",
          ]).describe("Target type of the firewall rule.").optional(),
          uri: z.string().describe(
            "The URI of the firewall rule. This field is not applicable to implied VPC firewall rules.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a VPC firewall rule, an implied VPC firewall rule, or a firewall policy rule.",
        ).optional(),
        forward: z.object({
          ipAddress: z.string().describe(
            "IP address of the target (if applicable).",
          ).optional(),
          resourceUri: z.string().describe(
            "URI of the resource that the packet is forwarded to.",
          ).optional(),
          target: z.enum([
            "TARGET_UNSPECIFIED",
            "PEERING_VPC",
            "VPN_GATEWAY",
            "INTERCONNECT",
            "GKE_MASTER",
            "IMPORTED_CUSTOM_ROUTE_NEXT_HOP",
            "CLOUD_SQL_INSTANCE",
            "ANOTHER_PROJECT",
            "NCC_HUB",
            "ROUTER_APPLIANCE",
            "SECURE_WEB_PROXY_GATEWAY",
          ]).describe("Target type where this packet is forwarded to.")
            .optional(),
        }).describe(
          'Details of the final state "forward" and associated resource.',
        ).optional(),
        forwardingRule: z.object({
          displayName: z.string().describe("Name of the forwarding rule.")
            .optional(),
          loadBalancerName: z.string().describe(
            "Name of the load balancer the forwarding rule belongs to. Empty for forwarding rules not related to load balancers (like PSC forwarding rules).",
          ).optional(),
          matchedPortRange: z.string().describe(
            "Port range defined in the forwarding rule that matches the packet.",
          ).optional(),
          matchedProtocol: z.string().describe(
            "Protocol defined in the forwarding rule that matches the packet.",
          ).optional(),
          networkUri: z.string().describe("Network URI.").optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target this forwarding rule targets (if applicable).",
          ).optional(),
          pscServiceAttachmentUri: z.string().describe(
            "URI of the PSC service attachment this forwarding rule targets (if applicable).",
          ).optional(),
          region: z.string().describe(
            "Region of the forwarding rule. Set only for regional forwarding rules.",
          ).optional(),
          target: z.string().describe("Target type of the forwarding rule.")
            .optional(),
          uri: z.string().describe("URI of the forwarding rule.").optional(),
          vip: z.string().describe("VIP of the forwarding rule.").optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine forwarding rule.",
        ).optional(),
        gkeMaster: z.object({
          clusterNetworkUri: z.string().describe(
            "URI of a GKE cluster network.",
          ).optional(),
          clusterUri: z.string().describe("URI of a GKE cluster.").optional(),
          dnsEndpoint: z.string().describe(
            "DNS endpoint of a GKE cluster control plane.",
          ).optional(),
          externalIp: z.string().describe(
            "External IP address of a GKE cluster control plane.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of a GKE cluster control plane.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) cluster master.",
        ).optional(),
        gkeNetworkPolicy: z.object({
          action: z.string().describe("Possible values: ALLOW, DENY")
            .optional(),
          direction: z.string().describe("Possible values: INGRESS, EGRESS")
            .optional(),
          displayName: z.string().describe("The name of the Network Policy.")
            .optional(),
          uri: z.string().describe(
            "The URI of the Network Policy. Format for a Network Policy in a zonal cluster: `projects//zones//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/` Format for a Network Policy in a regional cluster: `projects//locations//clusters//k8s/namespaces//networking.k8s.io/networkpolicies/`",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a GKE Network Policy.",
        ).optional(),
        gkeNetworkPolicySkipped: z.object({
          reason: z.enum([
            "REASON_UNSPECIFIED",
            "NETWORK_POLICY_DISABLED",
            "INGRESS_SOURCE_ON_SAME_NODE",
            "EGRESS_FROM_NODE_NETWORK_NAMESPACE_POD",
            "NETWORK_POLICY_NOT_APPLIED_TO_RESPONSE_TRAFFIC",
            "NETWORK_POLICY_ANALYSIS_UNSUPPORTED",
          ]).describe("Reason why Network Policy evaluation was skipped.")
            .optional(),
        }).describe(
          "For display only. Contains information about why GKE Network Policy evaluation was skipped.",
        ).optional(),
        gkePod: z.object({
          ipAddress: z.string().describe(
            "IP address of a GKE Pod. If the Pod is dual-stack, this is the IP address relevant to the trace.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of the network containing the GKE Pod.",
          ).optional(),
          podUri: z.string().describe(
            "URI of a GKE Pod. For Pods in regional Clusters, the URI format is: `projects/{project}/locations/{location}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}` For Pods in zonal Clusters, the URI format is: `projects/{project}/zones/{zone}/clusters/{cluster}/k8s/namespaces/{namespace}/pods/{pod}`",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Google Kubernetes Engine (GKE) Pod.",
        ).optional(),
        googleService: z.object({
          googleServiceType: z.enum([
            "GOOGLE_SERVICE_TYPE_UNSPECIFIED",
            "IAP",
            "GFE_PROXY_OR_HEALTH_CHECK_PROBER",
            "CLOUD_DNS",
            "GOOGLE_API",
            "GOOGLE_API_PSC",
            "GOOGLE_API_VPC_SC",
            "SERVERLESS_VPC_ACCESS",
          ]).describe("Recognized type of a Google Service.").optional(),
          sourceIp: z.string().describe("Source IP address.").optional(),
        }).describe(
          "For display only. Details of a Google Service sending packets to a VPC network. Although the source IP might be a publicly routable address, some Google Services use special routes within Google production infrastructure to reach Compute Engine Instances. https://cloud.google.com/vpc/docs/routes#special_return_paths",
        ).optional(),
        hybridSubnet: z.object({
          displayName: z.string().describe("Name of a hybrid subnet.")
            .optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where the hybrid subnet is configured.",
          ).optional(),
          uri: z.string().describe("URI of a hybrid subnet.").optional(),
        }).describe(
          "For display only. Metadata associated with a hybrid subnet.",
        ).optional(),
        instance: z.object({
          displayName: z.string().describe("Name of a Compute Engine instance.")
            .optional(),
          externalIp: z.string().describe(
            "External IP address of the network interface.",
          ).optional(),
          interface: z.string().describe(
            "Name of the network interface of a Compute Engine instance.",
          ).optional(),
          internalIp: z.string().describe(
            "Internal IP address of the network interface.",
          ).optional(),
          networkTags: z.array(z.string()).describe(
            "Network tags configured on the instance.",
          ).optional(),
          networkUri: z.string().describe("URI of a Compute Engine network.")
            .optional(),
          pscNetworkAttachmentUri: z.string().describe(
            "URI of the PSC network attachment the NIC is attached to (if relevant).",
          ).optional(),
          running: z.boolean().describe(
            "Indicates whether the Compute Engine instance is running. Deprecated: use the `status` field instead.",
          ).optional(),
          serviceAccount: z.string().describe(
            "Service account authorized for the instance.",
          ).optional(),
          status: z.enum(["STATUS_UNSPECIFIED", "RUNNING", "NOT_RUNNING"])
            .describe("The status of the instance.").optional(),
          uri: z.string().describe("URI of a Compute Engine instance.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine instance.",
        ).optional(),
        interconnectAttachment: z.object({
          cloudRouterUri: z.string().describe(
            "URI of the Cloud Router to be used for dynamic routing.",
          ).optional(),
          displayName: z.string().describe(
            "Name of an Interconnect attachment.",
          ).optional(),
          interconnectUri: z.string().describe(
            "URI of the Interconnect where the Interconnect attachment is configured.",
          ).optional(),
          l2AttachmentMatchedIpAddress: z.string().describe(
            "Appliance IP address that was matched for L2_DEDICATED attachments.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where the Interconnect attachment is configured.",
          ).optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "DEDICATED",
            "PARTNER",
            "PARTNER_PROVIDER",
            "L2_DEDICATED",
          ]).describe("The type of interconnect attachment this is.")
            .optional(),
          uri: z.string().describe("URI of an Interconnect attachment.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with an Interconnect attachment.",
        ).optional(),
        ipMasqueradingSkipped: z.object({
          nonMasqueradeRange: z.string().describe(
            "The matched non-masquerade IP range. Only set if reason is DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE or DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE.",
          ).optional(),
          reason: z.enum([
            "REASON_UNSPECIFIED",
            "DESTINATION_IP_IN_CONFIGURED_NON_MASQUERADE_RANGE",
            "DESTINATION_IP_IN_DEFAULT_NON_MASQUERADE_RANGE",
            "DESTINATION_ON_SAME_NODE",
            "DEFAULT_SNAT_DISABLED",
            "NO_MASQUERADING_FOR_IPV6",
            "POD_USES_NODE_NETWORK_NAMESPACE",
            "NO_MASQUERADING_FOR_RETURN_PACKET",
          ]).describe("Reason why IP masquerading was not applied.").optional(),
        }).describe(
          "For display only. Contains information about why IP masquerading was skipped for the packet.",
        ).optional(),
        loadBalancer: z.object({
          backendType: z.enum([
            "BACKEND_TYPE_UNSPECIFIED",
            "BACKEND_SERVICE",
            "TARGET_POOL",
            "TARGET_INSTANCE",
          ]).describe("Type of load balancer's backend configuration.")
            .optional(),
          backendUri: z.string().describe("Backend configuration URI.")
            .optional(),
          backends: z.array(z.object({
            displayName: z.string().describe(
              "Name of a Compute Engine instance or network endpoint.",
            ).optional(),
            healthCheckAllowingFirewallRules: z.array(z.string()).describe(
              "A list of firewall rule URIs allowing probes from health check IP ranges.",
            ).optional(),
            healthCheckBlockingFirewallRules: z.array(z.string()).describe(
              "A list of firewall rule URIs blocking probes from health check IP ranges.",
            ).optional(),
            healthCheckFirewallState: z.enum([
              "HEALTH_CHECK_FIREWALL_STATE_UNSPECIFIED",
              "CONFIGURED",
              "MISCONFIGURED",
            ]).describe("State of the health check firewall configuration.")
              .optional(),
            uri: z.string().describe(
              "URI of a Compute Engine instance or network endpoint.",
            ).optional(),
          })).describe("Information for the loadbalancer backends.").optional(),
          healthCheckUri: z.string().describe(
            "URI of the health check for the load balancer. Deprecated and no longer populated as different load balancer backends might have different health checks.",
          ).optional(),
          loadBalancerType: z.enum([
            "LOAD_BALANCER_TYPE_UNSPECIFIED",
            "INTERNAL_TCP_UDP",
            "NETWORK_TCP_UDP",
            "HTTP_PROXY",
            "TCP_PROXY",
            "SSL_PROXY",
          ]).describe("Type of the load balancer.").optional(),
        }).describe(
          "For display only. Metadata associated with a load balancer.",
        ).optional(),
        loadBalancerBackendInfo: z.object({
          backendBucketUri: z.string().describe(
            "URI of the backend bucket this backend targets (if applicable).",
          ).optional(),
          backendServiceUri: z.string().describe(
            "URI of the backend service this backend belongs to (if applicable).",
          ).optional(),
          healthCheckFirewallsConfigState: z.enum([
            "HEALTH_CHECK_FIREWALLS_CONFIG_STATE_UNSPECIFIED",
            "FIREWALLS_CONFIGURED",
            "FIREWALLS_PARTIALLY_CONFIGURED",
            "FIREWALLS_NOT_CONFIGURED",
            "FIREWALLS_UNSUPPORTED",
          ]).describe(
            "Output only. Health check firewalls configuration state for the backend. This is a result of the static firewall analysis (verifying that health check traffic from required IP ranges to the backend is allowed or not). The backend might still be unhealthy even if these firewalls are configured. Please refer to the documentation for more information: https://cloud.google.com/load-balancing/docs/firewall-rules",
          ).optional(),
          healthCheckUri: z.string().describe(
            "URI of the health check attached to this backend (if applicable).",
          ).optional(),
          instanceGroupUri: z.string().describe(
            "URI of the instance group this backend belongs to (if applicable).",
          ).optional(),
          instanceUri: z.string().describe(
            "URI of the backend instance (if applicable). Populated for instance group backends, and zonal NEG backends.",
          ).optional(),
          name: z.string().describe(
            "Display name of the backend. For example, it might be an instance name for the instance group backends, or an IP address and port for zonal network endpoint group backends.",
          ).optional(),
          networkEndpointGroupUri: z.string().describe(
            "URI of the network endpoint group this backend belongs to (if applicable).",
          ).optional(),
          pscGoogleApiTarget: z.string().describe(
            "PSC Google API target this PSC NEG backend targets (if applicable).",
          ).optional(),
          pscServiceAttachmentUri: z.string().describe(
            "URI of the PSC service attachment this PSC NEG backend targets (if applicable).",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with the load balancer backend.",
        ).optional(),
        nat: z.object({
          cloudNatGatewayType: z.enum([
            "CLOUD_NAT_GATEWAY_TYPE_UNSPECIFIED",
            "PUBLIC_NAT44",
            "PUBLIC_NAT64",
            "PRIVATE_NAT_NCC",
            "PRIVATE_NAT_HYBRID",
            "PRIVATE_NAT64",
          ]).describe(
            "Type of Cloud NAT gateway. Only valid when `type` is CLOUD_NAT.",
          ).optional(),
          natGatewayName: z.string().describe(
            "The name of Cloud NAT Gateway. Only valid when type is CLOUD_NAT.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of the network where NAT translation takes place.",
          ).optional(),
          newDestinationIp: z.string().describe(
            "Destination IP address after NAT translation.",
          ).optional(),
          newDestinationPort: z.number().int().describe(
            "Destination port after NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          newSourceIp: z.string().describe(
            "Source IP address after NAT translation.",
          ).optional(),
          newSourcePort: z.number().int().describe(
            "Source port after NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldDestinationIp: z.string().describe(
            "Destination IP address before NAT translation.",
          ).optional(),
          oldDestinationPort: z.number().int().describe(
            "Destination port before NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldSourceIp: z.string().describe(
            "Source IP address before NAT translation.",
          ).optional(),
          oldSourcePort: z.number().int().describe(
            "Source port before NAT translation. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          routerUri: z.string().describe(
            "Uri of the Cloud Router. Only valid when type is CLOUD_NAT.",
          ).optional(),
          type: z.enum([
            "TYPE_UNSPECIFIED",
            "INTERNAL_TO_EXTERNAL",
            "EXTERNAL_TO_INTERNAL",
            "CLOUD_NAT",
            "PRIVATE_SERVICE_CONNECT",
            "GKE_POD_IP_MASQUERADING",
          ]).describe("Type of NAT.").optional(),
        }).describe("For display only. Metadata associated with NAT.")
          .optional(),
        network: z.object({
          displayName: z.string().describe("Name of a Compute Engine network.")
            .optional(),
          matchedIpRange: z.string().describe(
            "The IP range of the subnet matching the source IP address of the test.",
          ).optional(),
          matchedSubnetUri: z.string().describe(
            "URI of the subnet matching the source IP address of the test.",
          ).optional(),
          region: z.string().describe(
            "The region of the subnet matching the source IP address of the test.",
          ).optional(),
          uri: z.string().describe("URI of a Compute Engine network.")
            .optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine network.",
        ).optional(),
        ngfwPacketInspection: z.object({
          securityProfileGroupUri: z.string().describe(
            "URI of the security profile group associated with this firewall packet inspection.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a layer 7 packet inspection by the firewall.",
        ).optional(),
        projectId: z.string().describe(
          "Project ID that contains the configuration this step is validating.",
        ).optional(),
        proxyConnection: z.object({
          networkUri: z.string().describe(
            "URI of the network where connection is proxied.",
          ).optional(),
          newDestinationIp: z.string().describe(
            "Destination IP address of a new connection.",
          ).optional(),
          newDestinationPort: z.number().int().describe(
            "Destination port of a new connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          newSourceIp: z.string().describe(
            "Source IP address of a new connection.",
          ).optional(),
          newSourcePort: z.number().int().describe(
            "Source port of a new connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldDestinationIp: z.string().describe(
            "Destination IP address of an original connection",
          ).optional(),
          oldDestinationPort: z.number().int().describe(
            "Destination port of an original connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          oldSourceIp: z.string().describe(
            "Source IP address of an original connection.",
          ).optional(),
          oldSourcePort: z.number().int().describe(
            "Source port of an original connection. Only valid when protocol is TCP or UDP.",
          ).optional(),
          protocol: z.string().describe(
            'IP protocol in string format, for example: "TCP", "UDP", "ICMP".',
          ).optional(),
          subnetUri: z.string().describe("Uri of proxy subnet.").optional(),
        }).describe(
          "For display only. Metadata associated with ProxyConnection.",
        ).optional(),
        redisCluster: z.object({
          discoveryEndpointIpAddress: z.string().describe(
            "Discovery endpoint IP address of a Redis Cluster.",
          ).optional(),
          displayName: z.string().describe("Name of a Redis Cluster.")
            .optional(),
          location: z.string().describe(
            'Name of the region in which the Redis Cluster is defined. For example, "us-central1".',
          ).optional(),
          networkUri: z.string().describe(
            'URI of the network containing the Redis Cluster endpoints in format "projects/{project_id}/global/networks/{network_id}".',
          ).optional(),
          secondaryEndpointIpAddress: z.string().describe(
            "Secondary endpoint IP address of a Redis Cluster.",
          ).optional(),
          uri: z.string().describe(
            'URI of a Redis Cluster in format "projects/{project_id}/locations/{location}/clusters/{cluster_id}"',
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Redis Cluster.",
        ).optional(),
        redisInstance: z.object({
          displayName: z.string().describe("Name of a Cloud Redis Instance.")
            .optional(),
          networkUri: z.string().describe(
            "URI of a Cloud Redis Instance network.",
          ).optional(),
          primaryEndpointIp: z.string().describe(
            "Primary endpoint IP address of a Cloud Redis Instance.",
          ).optional(),
          readEndpointIp: z.string().describe(
            "Read endpoint IP address of a Cloud Redis Instance (if applicable).",
          ).optional(),
          region: z.string().describe(
            "Region in which the Cloud Redis Instance is defined.",
          ).optional(),
          uri: z.string().describe("URI of a Cloud Redis Instance.").optional(),
        }).describe(
          "For display only. Metadata associated with a Cloud Redis Instance.",
        ).optional(),
        route: z.object({
          advertisedRouteNextHopUri: z.string().describe(
            "For ADVERTISED routes, the URI of their next hop, i.e. the URI of the hybrid endpoint (VPN tunnel, Interconnect attachment, NCC router appliance) the advertised prefix is advertised through, or URI of the source peered network. Deprecated in favor of the next_hop_uri field, not used in new tests.",
          ).optional(),
          advertisedRouteSourceRouterUri: z.string().describe(
            "For ADVERTISED dynamic routes, the URI of the Cloud Router that advertised the corresponding IP prefix.",
          ).optional(),
          destIpRange: z.string().describe("Destination IP range of the route.")
            .optional(),
          destPortRanges: z.array(z.string()).describe(
            "Destination port ranges of the route. POLICY_BASED routes only.",
          ).optional(),
          displayName: z.string().describe("Name of a route.").optional(),
          instanceTags: z.array(z.string()).describe(
            "Instance tags of the route.",
          ).optional(),
          nccHubRouteUri: z.string().describe(
            "For PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub, the URI of the corresponding route in NCC Hub's routing table.",
          ).optional(),
          nccHubUri: z.string().describe(
            "URI of the NCC Hub the route is advertised by. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only.",
          ).optional(),
          nccSpokeUri: z.string().describe(
            "URI of the destination NCC Spoke. PEERING_SUBNET and PEERING_DYNAMIC routes that are advertised by NCC Hub only.",
          ).optional(),
          networkUri: z.string().describe(
            "URI of a VPC network where route is located.",
          ).optional(),
          nextHop: z.string().describe(
            'String type of the next hop of the route (for example, "VPN tunnel"). Deprecated in favor of the next_hop_type and next_hop_uri fields, not used in new tests.',
          ).optional(),
          nextHopNetworkUri: z.string().describe(
            "URI of a VPC network where the next hop resource is located.",
          ).optional(),
          nextHopType: z.enum([
            "NEXT_HOP_TYPE_UNSPECIFIED",
            "NEXT_HOP_IP",
            "NEXT_HOP_INSTANCE",
            "NEXT_HOP_NETWORK",
            "NEXT_HOP_PEERING",
            "NEXT_HOP_INTERCONNECT",
            "NEXT_HOP_VPN_TUNNEL",
            "NEXT_HOP_VPN_GATEWAY",
            "NEXT_HOP_INTERNET_GATEWAY",
            "NEXT_HOP_BLACKHOLE",
            "NEXT_HOP_ILB",
            "NEXT_HOP_ROUTER_APPLIANCE",
            "NEXT_HOP_NCC_HUB",
            "SECURE_WEB_PROXY_GATEWAY",
          ]).describe("Type of next hop.").optional(),
          nextHopUri: z.string().describe("URI of the next hop resource.")
            .optional(),
          originatingRouteDisplayName: z.string().describe(
            "For PEERING_SUBNET, PEERING_STATIC and PEERING_DYNAMIC routes, the name of the originating SUBNET/STATIC/DYNAMIC route.",
          ).optional(),
          originatingRouteUri: z.string().describe(
            "For PEERING_SUBNET and PEERING_STATIC routes, the URI of the originating SUBNET/STATIC route.",
          ).optional(),
          priority: z.number().int().describe("Priority of the route.")
            .optional(),
          protocols: z.array(z.string()).describe(
            "Protocols of the route. POLICY_BASED routes only.",
          ).optional(),
          region: z.string().describe(
            "Region of the route. DYNAMIC, PEERING_DYNAMIC, POLICY_BASED and ADVERTISED routes only. If set for POLICY_BASED route, this is a region of VLAN attachments for Cloud Interconnect the route applies to.",
          ).optional(),
          routeScope: z.enum(["ROUTE_SCOPE_UNSPECIFIED", "NETWORK", "NCC_HUB"])
            .describe(
              "Indicates where route is applicable. Deprecated, routes with NCC_HUB scope are not included in the trace in new tests.",
            ).optional(),
          routeType: z.enum([
            "ROUTE_TYPE_UNSPECIFIED",
            "SUBNET",
            "STATIC",
            "DYNAMIC",
            "PEERING_SUBNET",
            "PEERING_STATIC",
            "PEERING_DYNAMIC",
            "POLICY_BASED",
            "ADVERTISED",
          ]).describe("Type of route.").optional(),
          srcIpRange: z.string().describe(
            "Source IP address range of the route. POLICY_BASED routes only.",
          ).optional(),
          srcPortRanges: z.array(z.string()).describe(
            "Source port ranges of the route. POLICY_BASED routes only.",
          ).optional(),
          uri: z.string().describe(
            "URI of a route. SUBNET, STATIC, PEERING_SUBNET (only for peering network) and POLICY_BASED routes only.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine route.",
        ).optional(),
        serverlessExternalConnection: z.object({
          selectedIpAddress: z.string().describe(
            "Selected starting IP address, from the Google dynamic address pool.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a serverless public connection.",
        ).optional(),
        serverlessNeg: z.object({
          negUri: z.string().describe(
            "URI of the serverless network endpoint group.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with the serverless network endpoint group backend.",
        ).optional(),
        state: z.enum([
          "STATE_UNSPECIFIED",
          "START_FROM_INSTANCE",
          "START_FROM_INTERNET",
          "START_FROM_GOOGLE_SERVICE",
          "START_FROM_PRIVATE_NETWORK",
          "START_FROM_GKE_MASTER",
          "START_FROM_CLOUD_SQL_INSTANCE",
          "START_FROM_GKE_POD",
          "START_FROM_REDIS_INSTANCE",
          "START_FROM_REDIS_CLUSTER",
          "START_FROM_CLOUD_FUNCTION",
          "START_FROM_APP_ENGINE_VERSION",
          "START_FROM_CLOUD_RUN_REVISION",
          "START_FROM_STORAGE_BUCKET",
          "START_FROM_PSC_PUBLISHED_SERVICE",
          "START_FROM_SERVERLESS_NEG",
          "APPLY_INGRESS_FIREWALL_RULE",
          "APPLY_EGRESS_FIREWALL_RULE",
          "APPLY_ROUTE",
          "APPLY_FORWARDING_RULE",
          "ANALYZE_LOAD_BALANCER_BACKEND",
          "SPOOFING_APPROVED",
          "ARRIVE_AT_INSTANCE",
          "ARRIVE_AT_INTERNAL_LOAD_BALANCER",
          "ARRIVE_AT_EXTERNAL_LOAD_BALANCER",
          "ARRIVE_AT_HYBRID_SUBNET",
          "ARRIVE_AT_VPN_GATEWAY",
          "ARRIVE_AT_VPN_TUNNEL",
          "ARRIVE_AT_INTERCONNECT_ATTACHMENT",
          "ARRIVE_AT_VPC_CONNECTOR",
          "ARRIVE_AT_GKE_POD",
          "DIRECT_VPC_EGRESS_CONNECTION",
          "SERVERLESS_EXTERNAL_CONNECTION",
          "NGFW_PACKET_INSPECTION",
          "NAT",
          "SKIP_GKE_POD_IP_MASQUERADING",
          "SKIP_GKE_INGRESS_NETWORK_POLICY",
          "SKIP_GKE_EGRESS_NETWORK_POLICY",
          "APPLY_INGRESS_GKE_NETWORK_POLICY",
          "APPLY_EGRESS_GKE_NETWORK_POLICY",
          "PROXY_CONNECTION",
          "DELIVER",
          "DROP",
          "FORWARD",
          "ABORT",
          "VIEWER_PERMISSION_MISSING",
        ]).describe("Each step is in one of the pre-defined states.")
          .optional(),
        storageBucket: z.object({
          bucket: z.string().describe("Cloud Storage Bucket name.").optional(),
        }).describe(
          "For display only. Metadata associated with Storage Bucket.",
        ).optional(),
        vpcConnector: z.object({
          displayName: z.string().describe("Name of a VPC connector.")
            .optional(),
          location: z.string().describe(
            "Location in which the VPC connector is deployed.",
          ).optional(),
          uri: z.string().describe("URI of a VPC connector.").optional(),
        }).describe(
          "For display only. Metadata associated with a VPC connector.",
        ).optional(),
        vpnGateway: z.object({
          displayName: z.string().describe("Name of a VPN gateway.").optional(),
          ipAddress: z.string().describe("IP address of the VPN gateway.")
            .optional(),
          networkUri: z.string().describe(
            "URI of a Compute Engine network where the VPN gateway is configured.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where this VPN gateway is configured.",
          ).optional(),
          uri: z.string().describe("URI of a VPN gateway.").optional(),
          vpnTunnelUri: z.string().describe(
            "A VPN tunnel that is associated with this VPN gateway. There may be multiple VPN tunnels configured on a VPN gateway, and only the one relevant to the test is displayed.",
          ).optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine VPN gateway.",
        ).optional(),
        vpnTunnel: z.object({
          displayName: z.string().describe("Name of a VPN tunnel.").optional(),
          networkUri: z.string().describe(
            "URI of a Compute Engine network where the VPN tunnel is configured.",
          ).optional(),
          region: z.string().describe(
            "Name of a Google Cloud region where this VPN tunnel is configured.",
          ).optional(),
          remoteGateway: z.string().describe(
            "URI of a VPN gateway at remote end of the tunnel.",
          ).optional(),
          remoteGatewayIp: z.string().describe(
            "Remote VPN gateway's IP address.",
          ).optional(),
          routingType: z.enum([
            "ROUTING_TYPE_UNSPECIFIED",
            "ROUTE_BASED",
            "POLICY_BASED",
            "DYNAMIC",
          ]).describe("Type of the routing policy.").optional(),
          sourceGateway: z.string().describe(
            "URI of the VPN gateway at local end of the tunnel.",
          ).optional(),
          sourceGatewayIp: z.string().describe(
            "Local VPN gateway's IP address.",
          ).optional(),
          uri: z.string().describe("URI of a VPN tunnel.").optional(),
        }).describe(
          "For display only. Metadata associated with a Compute Engine VPN tunnel.",
        ).optional(),
      })).describe(
        "A trace of a test contains multiple steps from the initial state to the final state (delivered, dropped, forwarded, or aborted). The steps are ordered by the processing sequence within the simulated network state machine. It is critical to preserve the order of the steps and avoid reordering or sorting them.",
      ).optional(),
    })).describe(
      "Result may contain a list of traces if a test has multiple possible paths in the network, such as when destination endpoint is a load balancer with multiple backends.",
    ).optional(),
    verifyTime: z.string().describe("The time of the configuration analysis.")
      .optional(),
  }).describe(
    "Results of the configuration analysis from the last run of the test.",
  ).optional(),
  roundTrip: z.boolean().describe(
    "Whether run analysis for the return path from destination to source. Default value is false.",
  ).optional(),
  source: z.object({
    appEngineVersion: z.object({
      uri: z.string().describe(
        "An [App Engine](https://cloud.google.com/appengine) [service version](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions) name.",
      ).optional(),
    }).describe("Wrapper for the App Engine service version attributes.")
      .optional(),
    cloudFunction: z.object({
      uri: z.string().describe(
        "A [Cloud Function](https://cloud.google.com/functions) name.",
      ).optional(),
    }).describe("Wrapper for Cloud Function attributes.").optional(),
    cloudRunRevision: z.object({
      serviceUri: z.string().describe(
        "Output only. The URI of the Cloud Run service that the revision belongs to. The format is: projects/{project}/locations/{location}/services/{service}",
      ).optional(),
      uri: z.string().describe(
        "A [Cloud Run](https://cloud.google.com/run) [revision](https://cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions/get) URI. The format is: projects/{project}/locations/{location}/revisions/{revision}",
      ).optional(),
    }).describe("Wrapper for Cloud Run revision attributes.").optional(),
    cloudSqlInstance: z.string().describe(
      "A [Cloud SQL](https://cloud.google.com/sql) instance URI.",
    ).optional(),
    forwardingRule: z.string().describe(
      "A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules are also used for protocol forwarding, Private Service Connect and other network services to provide forwarding information in the control plane. Applicable only to destination endpoint. Format: `projects/{project}/global/forwardingRules/{id}` or `projects/{project}/regions/{region}/forwardingRules/{id}`",
    ).optional(),
    forwardingRuleTarget: z.enum([
      "FORWARDING_RULE_TARGET_UNSPECIFIED",
      "INSTANCE",
      "LOAD_BALANCER",
      "VPN_GATEWAY",
      "PSC",
    ]).describe(
      "Output only. Specifies the type of the target of the forwarding rule.",
    ).optional(),
    fqdn: z.string().describe(
      "DNS endpoint of [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture). Requires gke_master_cluster to be set, can't be used simultaneoulsly with ip_address or network. Applicable only to destination endpoint.",
    ).optional(),
    gkeMasterCluster: z.string().describe(
      "A cluster URI for [Google Kubernetes Engine cluster control plane](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).",
    ).optional(),
    gkePod: z.string().describe(
      "A [GKE Pod](https://cloud.google.com/kubernetes-engine/docs/concepts/pod) URI.",
    ).optional(),
    instance: z.string().describe("A Compute Engine instance URI.").optional(),
    ipAddress: z.string().describe(
      "The IP address of the endpoint, which can be an external or internal IP.",
    ).optional(),
    loadBalancerId: z.string().describe(
      "Output only. ID of the load balancer the forwarding rule points to. Empty for forwarding rules not related to load balancers.",
    ).optional(),
    loadBalancerType: z.enum([
      "LOAD_BALANCER_TYPE_UNSPECIFIED",
      "HTTPS_ADVANCED_LOAD_BALANCER",
      "HTTPS_LOAD_BALANCER",
      "REGIONAL_HTTPS_LOAD_BALANCER",
      "INTERNAL_HTTPS_LOAD_BALANCER",
      "SSL_PROXY_LOAD_BALANCER",
      "TCP_PROXY_LOAD_BALANCER",
      "INTERNAL_TCP_PROXY_LOAD_BALANCER",
      "NETWORK_LOAD_BALANCER",
      "LEGACY_NETWORK_LOAD_BALANCER",
      "TCP_UDP_INTERNAL_LOAD_BALANCER",
    ]).describe(
      "Output only. Type of the load balancer the forwarding rule points to.",
    ).optional(),
    network: z.string().describe(
      "A VPC network URI. For source endpoints, used according to the `network_type`. For destination endpoints, used only when the source is an external IP address endpoint, and the destination is an internal IP address endpoint.",
    ).optional(),
    networkType: z.enum([
      "NETWORK_TYPE_UNSPECIFIED",
      "GCP_NETWORK",
      "NON_GCP_NETWORK",
      "INTERNET",
    ]).describe(
      "For source endpoints, type of the network where the endpoint is located. Not relevant for destination endpoints.",
    ).optional(),
    port: z.number().int().describe(
      "The IP protocol port of the endpoint. Only applicable when protocol is TCP or UDP.",
    ).optional(),
    projectId: z.string().describe(
      "For source endpoints, endpoint project ID. Used according to the `network_type`. Not relevant for destination endpoints.",
    ).optional(),
    redisCluster: z.string().describe(
      "A [Redis Cluster](https://cloud.google.com/memorystore/docs/cluster) URI. Applicable only to destination endpoint.",
    ).optional(),
    redisInstance: z.string().describe(
      "A [Redis Instance](https://cloud.google.com/memorystore/docs/redis) URI. Applicable only to destination endpoint.",
    ).optional(),
  }).describe("Source or destination of the Connectivity Test.").optional(),
  testId: z.string().describe(
    "Required. The logical name of the Connectivity Test in your project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/networkmanagement/global-connectivitytests",
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
      description: "A Connectivity Test for a network reachability analysis.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a connectivityTests",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["bypassFirewallChecks"] !== undefined) {
          body["bypassFirewallChecks"] = g["bypassFirewallChecks"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["probingDetails"] !== undefined) {
          body["probingDetails"] = g["probingDetails"];
        }
        if (g["protocol"] !== undefined) body["protocol"] = g["protocol"];
        if (g["reachabilityDetails"] !== undefined) {
          body["reachabilityDetails"] = g["reachabilityDetails"];
        }
        if (g["relatedProjects"] !== undefined) {
          body["relatedProjects"] = g["relatedProjects"];
        }
        if (g["returnReachabilityDetails"] !== undefined) {
          body["returnReachabilityDetails"] = g["returnReachabilityDetails"];
        }
        if (g["roundTrip"] !== undefined) body["roundTrip"] = g["roundTrip"];
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["testId"] !== undefined) body["testId"] = g["testId"];
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
      description: "Get a connectivityTests",
      arguments: z.object({
        identifier: z.string().describe("The name of the connectivityTests"),
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
      description: "Update connectivityTests attributes",
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
        if (g["bypassFirewallChecks"] !== undefined) {
          body["bypassFirewallChecks"] = g["bypassFirewallChecks"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["destination"] !== undefined) {
          body["destination"] = g["destination"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["probingDetails"] !== undefined) {
          body["probingDetails"] = g["probingDetails"];
        }
        if (g["protocol"] !== undefined) body["protocol"] = g["protocol"];
        if (g["reachabilityDetails"] !== undefined) {
          body["reachabilityDetails"] = g["reachabilityDetails"];
        }
        if (g["relatedProjects"] !== undefined) {
          body["relatedProjects"] = g["relatedProjects"];
        }
        if (g["returnReachabilityDetails"] !== undefined) {
          body["returnReachabilityDetails"] = g["returnReachabilityDetails"];
        }
        if (g["roundTrip"] !== undefined) body["roundTrip"] = g["roundTrip"];
        if (g["source"] !== undefined) body["source"] = g["source"];
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
      description: "Delete the connectivityTests",
      arguments: z.object({
        identifier: z.string().describe("The name of the connectivityTests"),
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
      description: "Sync connectivityTests state from GCP",
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
    rerun: {
      description: "rerun",
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
              "networkmanagement.projects.locations.global.connectivityTests.rerun",
            "path": "v1/{+name}:rerun",
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
