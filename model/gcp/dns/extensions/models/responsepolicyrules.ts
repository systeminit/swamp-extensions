// Auto-generated extension model for @swamp/gcp/dns/responsepolicyrules
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

const BASE_URL = "https://dns.googleapis.com/";

const GET_CONFIG = {
  "id": "dns.responsePolicyRules.get",
  "path":
    "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "responsePolicy",
    "responsePolicyRule",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "responsePolicy": {
      "location": "path",
      "required": true,
    },
    "responsePolicyRule": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dns.responsePolicyRules.create",
  "path": "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "responsePolicy",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "responsePolicy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dns.responsePolicyRules.update",
  "path":
    "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "responsePolicy",
    "responsePolicyRule",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "responsePolicy": {
      "location": "path",
      "required": true,
    },
    "responsePolicyRule": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dns.responsePolicyRules.delete",
  "path":
    "dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "responsePolicy",
    "responsePolicyRule",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "responsePolicy": {
      "location": "path",
      "required": true,
    },
    "responsePolicyRule": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  behavior: z.enum(["behaviorUnspecified", "bypassResponsePolicy"]).describe(
    "Answer this query with a behavior rather than DNS data.",
  ).optional(),
  dnsName: z.string().describe(
    "The DNS name (wildcard or exact) to apply this rule to. Must be unique within the Response Policy Rule.",
  ).optional(),
  localData: z.object({
    localDatas: z.array(z.object({
      kind: z.string().optional(),
      name: z.string().describe("For example, www.example.com.").optional(),
      routingPolicy: z.object({
        geo: z.object({
          enableFencing: z.boolean().describe(
            "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
          ).optional(),
          items: z.array(z.object({
            healthCheckedTargets: z.object({
              externalEndpoints: z.array(z.string()).describe(
                "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
              ).optional(),
              internalLoadBalancers: z.array(z.object({
                ipAddress: z.string().describe(
                  "The frontend IP address of the load balancer to health check.",
                ).optional(),
                ipProtocol: z.enum(["undefined", "tcp", "udp"]).describe(
                  "The protocol of the load balancer to health check.",
                ).optional(),
                kind: z.string().optional(),
                loadBalancerType: z.enum([
                  "none",
                  "globalL7ilb",
                  "regionalL4ilb",
                  "regionalL7ilb",
                ]).describe(
                  "The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer.",
                ).optional(),
                networkUrl: z.string().describe(
                  "The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`.",
                ).optional(),
                port: z.string().describe(
                  "The configured port of the load balancer.",
                ).optional(),
                project: z.string().describe(
                  "The project ID in which the load balancer is located.",
                ).optional(),
                region: z.string().describe(
                  "The region in which the load balancer is located.",
                ).optional(),
              })).describe(
                "Configuration for internal load balancers to be health checked.",
              ).optional(),
            }).describe(
              "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
            ).optional(),
            kind: z.string().optional(),
            location: z.string().describe(
              'The geo-location granularity is a GCP region. This location string should correspond to a GCP region. e.g. "us-east1", "southamerica-east1", "asia-east1", etc.',
            ).optional(),
            rrdatas: z.array(z.string()).optional(),
            signatureRrdatas: z.array(z.string()).describe(
              "DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item.",
            ).optional(),
          })).describe(
            "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
          ).optional(),
          kind: z.string().optional(),
        }).describe(
          "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
        ).optional(),
        healthCheck: z.string().describe(
          "The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks",
        ).optional(),
        kind: z.string().optional(),
        primaryBackup: z.object({
          backupGeoTargets: z.object({
            enableFencing: z.boolean().describe(
              "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
            ).optional(),
            items: z.array(z.object({
              healthCheckedTargets: z.object({
                externalEndpoints: z.array(z.string()).describe(
                  "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
                ).optional(),
                internalLoadBalancers: z.array(z.object({
                  ipAddress: z.string().describe(
                    "The frontend IP address of the load balancer to health check.",
                  ).optional(),
                  ipProtocol: z.enum(["undefined", "tcp", "udp"]).describe(
                    "The protocol of the load balancer to health check.",
                  ).optional(),
                  kind: z.string().optional(),
                  loadBalancerType: z.enum([
                    "none",
                    "globalL7ilb",
                    "regionalL4ilb",
                    "regionalL7ilb",
                  ]).describe(
                    "The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer.",
                  ).optional(),
                  networkUrl: z.string().describe(
                    "The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`.",
                  ).optional(),
                  port: z.string().describe(
                    "The configured port of the load balancer.",
                  ).optional(),
                  project: z.string().describe(
                    "The project ID in which the load balancer is located.",
                  ).optional(),
                  region: z.string().describe(
                    "The region in which the load balancer is located.",
                  ).optional(),
                })).describe(
                  "Configuration for internal load balancers to be health checked.",
                ).optional(),
              }).describe(
                "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
              ).optional(),
              kind: z.string().optional(),
              location: z.string().describe(
                'The geo-location granularity is a GCP region. This location string should correspond to a GCP region. e.g. "us-east1", "southamerica-east1", "asia-east1", etc.',
              ).optional(),
              rrdatas: z.array(z.string()).optional(),
              signatureRrdatas: z.array(z.string()).describe(
                "DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item.",
              ).optional(),
            })).describe(
              "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
            ).optional(),
            kind: z.string().optional(),
          }).describe(
            "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
          ).optional(),
          kind: z.string().optional(),
          primaryTargets: z.object({
            externalEndpoints: z.array(z.string()).describe(
              "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
            ).optional(),
            internalLoadBalancers: z.array(z.object({
              ipAddress: z.string().describe(
                "The frontend IP address of the load balancer to health check.",
              ).optional(),
              ipProtocol: z.enum(["undefined", "tcp", "udp"]).describe(
                "The protocol of the load balancer to health check.",
              ).optional(),
              kind: z.string().optional(),
              loadBalancerType: z.enum([
                "none",
                "globalL7ilb",
                "regionalL4ilb",
                "regionalL7ilb",
              ]).describe(
                "The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer.",
              ).optional(),
              networkUrl: z.string().describe(
                "The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`.",
              ).optional(),
              port: z.string().describe(
                "The configured port of the load balancer.",
              ).optional(),
              project: z.string().describe(
                "The project ID in which the load balancer is located.",
              ).optional(),
              region: z.string().describe(
                "The region in which the load balancer is located.",
              ).optional(),
            })).describe(
              "Configuration for internal load balancers to be health checked.",
            ).optional(),
          }).describe(
            "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
          ).optional(),
          trickleTraffic: z.number().describe(
            "When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets.",
          ).optional(),
        }).describe(
          "Configures a RRSetRoutingPolicy such that all queries are responded with the primary_targets if they are healthy. And if all of them are unhealthy, then we fallback to a geo localized policy.",
        ).optional(),
        wrr: z.object({
          items: z.array(z.object({
            healthCheckedTargets: z.object({
              externalEndpoints: z.array(z.string()).describe(
                "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
              ).optional(),
              internalLoadBalancers: z.array(z.object({
                ipAddress: z.string().describe(
                  "The frontend IP address of the load balancer to health check.",
                ).optional(),
                ipProtocol: z.enum(["undefined", "tcp", "udp"]).describe(
                  "The protocol of the load balancer to health check.",
                ).optional(),
                kind: z.string().optional(),
                loadBalancerType: z.enum([
                  "none",
                  "globalL7ilb",
                  "regionalL4ilb",
                  "regionalL7ilb",
                ]).describe(
                  "The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer.",
                ).optional(),
                networkUrl: z.string().describe(
                  "The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`.",
                ).optional(),
                port: z.string().describe(
                  "The configured port of the load balancer.",
                ).optional(),
                project: z.string().describe(
                  "The project ID in which the load balancer is located.",
                ).optional(),
                region: z.string().describe(
                  "The region in which the load balancer is located.",
                ).optional(),
              })).describe(
                "Configuration for internal load balancers to be health checked.",
              ).optional(),
            }).describe(
              "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
            ).optional(),
            kind: z.string().optional(),
            rrdatas: z.array(z.string()).optional(),
            signatureRrdatas: z.array(z.string()).describe(
              "DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item.",
            ).optional(),
            weight: z.number().describe(
              "The weight corresponding to this `WrrPolicyItem` object. When multiple `WrrPolicyItem` objects are configured, the probability of returning an `WrrPolicyItem` object's data is proportional to its weight relative to the sum of weights configured for all items. This weight must be non-negative.",
            ).optional(),
          })).optional(),
          kind: z.string().optional(),
        }).describe(
          "Configures a RRSetRoutingPolicy that routes in a weighted round robin fashion.",
        ).optional(),
      }).describe(
        "A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.",
      ).optional(),
      rrdatas: z.array(z.string()).describe(
        "As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples.",
      ).optional(),
      signatureRrdatas: z.array(z.string()).describe(
        "As defined in RFC 4034 (section 3.2).",
      ).optional(),
      ttl: z.number().int().describe(
        "Number of seconds that this `ResourceRecordSet` can be cached by resolvers.",
      ).optional(),
      type: z.string().describe(
        "The identifier of a supported record type. See the list of Supported DNS record types.",
      ).optional(),
    })).describe(
      "All resource record sets for this selector, one per resource record type. The name must match the dns_name.",
    ).optional(),
  }).optional(),
  ruleName: z.string().describe(
    "An identifier for this rule. Must be unique with the ResponsePolicy.",
  ).optional(),
  responsePolicy: z.string().describe(
    "User assigned name of the Response Policy containing the Response Policy Rule.",
  ),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

const StateSchema = z.object({
  behavior: z.string().optional(),
  dnsName: z.string().optional(),
  kind: z.string().optional(),
  localData: z.object({
    localDatas: z.array(z.object({
      kind: z.string(),
      name: z.string(),
      routingPolicy: z.object({
        geo: z.object({
          enableFencing: z.boolean(),
          items: z.array(z.object({
            healthCheckedTargets: z.object({
              externalEndpoints: z.array(z.string()),
              internalLoadBalancers: z.array(z.object({
                ipAddress: z.string(),
                ipProtocol: z.string(),
                kind: z.string(),
                loadBalancerType: z.string(),
                networkUrl: z.string(),
                port: z.string(),
                project: z.string(),
                region: z.string(),
              })),
            }),
            kind: z.string(),
            location: z.string(),
            rrdatas: z.array(z.string()),
            signatureRrdatas: z.array(z.string()),
          })),
          kind: z.string(),
        }),
        healthCheck: z.string(),
        kind: z.string(),
        primaryBackup: z.object({
          backupGeoTargets: z.object({
            enableFencing: z.boolean(),
            items: z.array(z.object({
              healthCheckedTargets: z.object({
                externalEndpoints: z.array(z.string()),
                internalLoadBalancers: z.array(z.object({
                  ipAddress: z.string(),
                  ipProtocol: z.string(),
                  kind: z.string(),
                  loadBalancerType: z.string(),
                  networkUrl: z.string(),
                  port: z.string(),
                  project: z.string(),
                  region: z.string(),
                })),
              }),
              kind: z.string(),
              location: z.string(),
              rrdatas: z.array(z.string()),
              signatureRrdatas: z.array(z.string()),
            })),
            kind: z.string(),
          }),
          kind: z.string(),
          primaryTargets: z.object({
            externalEndpoints: z.array(z.string()),
            internalLoadBalancers: z.array(z.object({
              ipAddress: z.string(),
              ipProtocol: z.string(),
              kind: z.string(),
              loadBalancerType: z.string(),
              networkUrl: z.string(),
              port: z.string(),
              project: z.string(),
              region: z.string(),
            })),
          }),
          trickleTraffic: z.number(),
        }),
        wrr: z.object({
          items: z.array(z.object({
            healthCheckedTargets: z.object({
              externalEndpoints: z.array(z.string()),
              internalLoadBalancers: z.array(z.object({
                ipAddress: z.string(),
                ipProtocol: z.string(),
                kind: z.string(),
                loadBalancerType: z.string(),
                networkUrl: z.string(),
                port: z.string(),
                project: z.string(),
                region: z.string(),
              })),
            }),
            kind: z.string(),
            rrdatas: z.array(z.string()),
            signatureRrdatas: z.array(z.string()),
            weight: z.number(),
          })),
          kind: z.string(),
        }),
      }),
      rrdatas: z.array(z.string()),
      signatureRrdatas: z.array(z.string()),
      ttl: z.number(),
      type: z.string(),
    })),
  }).optional(),
  ruleName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  behavior: z.enum(["behaviorUnspecified", "bypassResponsePolicy"]).describe(
    "Answer this query with a behavior rather than DNS data.",
  ).optional(),
  dnsName: z.string().describe(
    "The DNS name (wildcard or exact) to apply this rule to. Must be unique within the Response Policy Rule.",
  ).optional(),
  localData: z.object({
    localDatas: z.array(z.object({
      kind: z.string().optional(),
      name: z.string().describe("For example, www.example.com.").optional(),
      routingPolicy: z.object({
        geo: z.object({
          enableFencing: z.boolean().describe(
            "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
          ).optional(),
          items: z.array(z.object({
            healthCheckedTargets: z.object({
              externalEndpoints: z.array(z.string()).describe(
                "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
              ).optional(),
              internalLoadBalancers: z.array(z.object({
                ipAddress: z.string().describe(
                  "The frontend IP address of the load balancer to health check.",
                ).optional(),
                ipProtocol: z.enum(["undefined", "tcp", "udp"]).describe(
                  "The protocol of the load balancer to health check.",
                ).optional(),
                kind: z.string().optional(),
                loadBalancerType: z.enum([
                  "none",
                  "globalL7ilb",
                  "regionalL4ilb",
                  "regionalL7ilb",
                ]).describe(
                  "The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer.",
                ).optional(),
                networkUrl: z.string().describe(
                  "The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`.",
                ).optional(),
                port: z.string().describe(
                  "The configured port of the load balancer.",
                ).optional(),
                project: z.string().describe(
                  "The project ID in which the load balancer is located.",
                ).optional(),
                region: z.string().describe(
                  "The region in which the load balancer is located.",
                ).optional(),
              })).describe(
                "Configuration for internal load balancers to be health checked.",
              ).optional(),
            }).describe(
              "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
            ).optional(),
            kind: z.string().optional(),
            location: z.string().describe(
              'The geo-location granularity is a GCP region. This location string should correspond to a GCP region. e.g. "us-east1", "southamerica-east1", "asia-east1", etc.',
            ).optional(),
            rrdatas: z.array(z.string()).optional(),
            signatureRrdatas: z.array(z.string()).describe(
              "DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item.",
            ).optional(),
          })).describe(
            "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
          ).optional(),
          kind: z.string().optional(),
        }).describe(
          "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
        ).optional(),
        healthCheck: z.string().describe(
          "The fully qualified URL of the HealthCheck to use for this RRSetRoutingPolicy. Format this URL like `https://www.googleapis.com/compute/v1/projects/{project}/global/healthChecks/{healthCheck}`. https://cloud.google.com/compute/docs/reference/rest/v1/healthChecks",
        ).optional(),
        kind: z.string().optional(),
        primaryBackup: z.object({
          backupGeoTargets: z.object({
            enableFencing: z.boolean().describe(
              "Without fencing, if health check fails for all configured items in the current geo bucket, we failover to the next nearest geo bucket. With fencing, if health checking is enabled, as long as some targets in the current geo bucket are healthy, we return only the healthy targets. However, if all targets are unhealthy, we don't failover to the next nearest bucket; instead, we return all the items in the current bucket even when all targets are unhealthy.",
            ).optional(),
            items: z.array(z.object({
              healthCheckedTargets: z.object({
                externalEndpoints: z.array(z.string()).describe(
                  "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
                ).optional(),
                internalLoadBalancers: z.array(z.object({
                  ipAddress: z.string().describe(
                    "The frontend IP address of the load balancer to health check.",
                  ).optional(),
                  ipProtocol: z.enum(["undefined", "tcp", "udp"]).describe(
                    "The protocol of the load balancer to health check.",
                  ).optional(),
                  kind: z.string().optional(),
                  loadBalancerType: z.enum([
                    "none",
                    "globalL7ilb",
                    "regionalL4ilb",
                    "regionalL7ilb",
                  ]).describe(
                    "The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer.",
                  ).optional(),
                  networkUrl: z.string().describe(
                    "The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`.",
                  ).optional(),
                  port: z.string().describe(
                    "The configured port of the load balancer.",
                  ).optional(),
                  project: z.string().describe(
                    "The project ID in which the load balancer is located.",
                  ).optional(),
                  region: z.string().describe(
                    "The region in which the load balancer is located.",
                  ).optional(),
                })).describe(
                  "Configuration for internal load balancers to be health checked.",
                ).optional(),
              }).describe(
                "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
              ).optional(),
              kind: z.string().optional(),
              location: z.string().describe(
                'The geo-location granularity is a GCP region. This location string should correspond to a GCP region. e.g. "us-east1", "southamerica-east1", "asia-east1", etc.',
              ).optional(),
              rrdatas: z.array(z.string()).optional(),
              signatureRrdatas: z.array(z.string()).describe(
                "DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item.",
              ).optional(),
            })).describe(
              "The primary geo routing configuration. If there are multiple items with the same location, an error is returned instead.",
            ).optional(),
            kind: z.string().optional(),
          }).describe(
            "Configures a `RRSetRoutingPolicy` that routes based on the geo location of the querying user.",
          ).optional(),
          kind: z.string().optional(),
          primaryTargets: z.object({
            externalEndpoints: z.array(z.string()).describe(
              "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
            ).optional(),
            internalLoadBalancers: z.array(z.object({
              ipAddress: z.string().describe(
                "The frontend IP address of the load balancer to health check.",
              ).optional(),
              ipProtocol: z.enum(["undefined", "tcp", "udp"]).describe(
                "The protocol of the load balancer to health check.",
              ).optional(),
              kind: z.string().optional(),
              loadBalancerType: z.enum([
                "none",
                "globalL7ilb",
                "regionalL4ilb",
                "regionalL7ilb",
              ]).describe(
                "The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer.",
              ).optional(),
              networkUrl: z.string().describe(
                "The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`.",
              ).optional(),
              port: z.string().describe(
                "The configured port of the load balancer.",
              ).optional(),
              project: z.string().describe(
                "The project ID in which the load balancer is located.",
              ).optional(),
              region: z.string().describe(
                "The region in which the load balancer is located.",
              ).optional(),
            })).describe(
              "Configuration for internal load balancers to be health checked.",
            ).optional(),
          }).describe(
            "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
          ).optional(),
          trickleTraffic: z.number().describe(
            "When serving state is `PRIMARY`, this field provides the option of sending a small percentage of the traffic to the backup targets.",
          ).optional(),
        }).describe(
          "Configures a RRSetRoutingPolicy such that all queries are responded with the primary_targets if they are healthy. And if all of them are unhealthy, then we fallback to a geo localized policy.",
        ).optional(),
        wrr: z.object({
          items: z.array(z.object({
            healthCheckedTargets: z.object({
              externalEndpoints: z.array(z.string()).describe(
                "The Internet IP addresses to be health checked. The format matches the format of ResourceRecordSet.rrdata as defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1)",
              ).optional(),
              internalLoadBalancers: z.array(z.object({
                ipAddress: z.string().describe(
                  "The frontend IP address of the load balancer to health check.",
                ).optional(),
                ipProtocol: z.enum(["undefined", "tcp", "udp"]).describe(
                  "The protocol of the load balancer to health check.",
                ).optional(),
                kind: z.string().optional(),
                loadBalancerType: z.enum([
                  "none",
                  "globalL7ilb",
                  "regionalL4ilb",
                  "regionalL7ilb",
                ]).describe(
                  "The type of load balancer specified by this target. This value must match the configuration of the load balancer located at the LoadBalancerTarget's IP address, port, and region. Use the following: - *regionalL4ilb*: for a regional internal passthrough Network Load Balancer. - *regionalL7ilb*: for a regional internal Application Load Balancer. - *globalL7ilb*: for a global internal Application Load Balancer.",
                ).optional(),
                networkUrl: z.string().describe(
                  "The fully qualified URL of the network that the load balancer is attached to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`.",
                ).optional(),
                port: z.string().describe(
                  "The configured port of the load balancer.",
                ).optional(),
                project: z.string().describe(
                  "The project ID in which the load balancer is located.",
                ).optional(),
                region: z.string().describe(
                  "The region in which the load balancer is located.",
                ).optional(),
              })).describe(
                "Configuration for internal load balancers to be health checked.",
              ).optional(),
            }).describe(
              "HealthCheckTargets describes endpoints to health-check when responding to Routing Policy queries. Only the healthy endpoints will be included in the response. Set either `internal_load_balancer` or `external_endpoints`. Do not set both.",
            ).optional(),
            kind: z.string().optional(),
            rrdatas: z.array(z.string()).optional(),
            signatureRrdatas: z.array(z.string()).describe(
              "DNSSEC generated signatures for all the `rrdata` within this item. When using health-checked targets for DNSSEC-enabled zones, you can only use at most one health-checked IP address per item.",
            ).optional(),
            weight: z.number().describe(
              "The weight corresponding to this `WrrPolicyItem` object. When multiple `WrrPolicyItem` objects are configured, the probability of returning an `WrrPolicyItem` object's data is proportional to its weight relative to the sum of weights configured for all items. This weight must be non-negative.",
            ).optional(),
          })).optional(),
          kind: z.string().optional(),
        }).describe(
          "Configures a RRSetRoutingPolicy that routes in a weighted round robin fashion.",
        ).optional(),
      }).describe(
        "A RRSetRoutingPolicy represents ResourceRecordSet data that is returned dynamically with the response varying based on configured properties such as geolocation or by weighted random selection.",
      ).optional(),
      rrdatas: z.array(z.string()).describe(
        "As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples.",
      ).optional(),
      signatureRrdatas: z.array(z.string()).describe(
        "As defined in RFC 4034 (section 3.2).",
      ).optional(),
      ttl: z.number().int().describe(
        "Number of seconds that this `ResourceRecordSet` can be cached by resolvers.",
      ).optional(),
      type: z.string().describe(
        "The identifier of a supported record type. See the list of Supported DNS record types.",
      ).optional(),
    })).describe(
      "All resource record sets for this selector, one per resource record type. The name must match the dns_name.",
    ).optional(),
  }).optional(),
  ruleName: z.string().describe(
    "An identifier for this rule. Must be unique with the ResponsePolicy.",
  ).optional(),
  responsePolicy: z.string().describe(
    "User assigned name of the Response Policy containing the Response Policy Rule.",
  ).optional(),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dns/responsepolicyrules",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Response Policy Rule is a selector that applies its behavior to queries tha...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a responsePolicyRules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["responsePolicy"] !== undefined) {
          params["responsePolicy"] = String(g["responsePolicy"]);
        }
        const body: Record<string, unknown> = {};
        if (g["behavior"] !== undefined) body["behavior"] = g["behavior"];
        if (g["dnsName"] !== undefined) body["dnsName"] = g["dnsName"];
        if (g["localData"] !== undefined) body["localData"] = g["localData"];
        if (g["ruleName"] !== undefined) body["ruleName"] = g["ruleName"];
        if (g["clientOperationId"] !== undefined) {
          body["clientOperationId"] = g["clientOperationId"];
        }
        if (g["name"] !== undefined) {
          params["responsePolicyRule"] = String(g["name"]);
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
      description: "Get a responsePolicyRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the responsePolicyRules"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["responsePolicy"] !== undefined) {
          params["responsePolicy"] = String(g["responsePolicy"]);
        }
        params["responsePolicyRule"] = args.identifier;
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
      description: "Update responsePolicyRules attributes",
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
        if (g["responsePolicy"] !== undefined) {
          params["responsePolicy"] = String(g["responsePolicy"]);
        } else if (existing["responsePolicy"]) {
          params["responsePolicy"] = String(existing["responsePolicy"]);
        }
        params["responsePolicyRule"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["behavior"] !== undefined) body["behavior"] = g["behavior"];
        if (g["dnsName"] !== undefined) body["dnsName"] = g["dnsName"];
        if (g["localData"] !== undefined) body["localData"] = g["localData"];
        if (g["ruleName"] !== undefined) body["ruleName"] = g["ruleName"];
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
      description: "Delete the responsePolicyRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the responsePolicyRules"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["responsePolicy"] !== undefined) {
          params["responsePolicy"] = String(g["responsePolicy"]);
        }
        params["responsePolicyRule"] = args.identifier;
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
      description: "Sync responsePolicyRules state from GCP",
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
          if (g["responsePolicy"] !== undefined) {
            params["responsePolicy"] = String(g["responsePolicy"]);
          } else if (existing["responsePolicy"]) {
            params["responsePolicy"] = String(existing["responsePolicy"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["responsePolicyRule"] = identifier;
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
