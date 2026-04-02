// Auto-generated extension model for @swamp/gcp/networksecurity/authzpolicies
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
  return `${parent}/authzPolicies/${shortName}`;
}

const BASE_URL = "https://networksecurity.googleapis.com/";

const GET_CONFIG = {
  "id": "networksecurity.projects.locations.authzPolicies.get",
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
  "id": "networksecurity.projects.locations.authzPolicies.create",
  "path": "v1/{+parent}/authzPolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "authzPolicyId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networksecurity.projects.locations.authzPolicies.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networksecurity.projects.locations.authzPolicies.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  action: z.enum(["AUTHZ_ACTION_UNSPECIFIED", "ALLOW", "DENY", "CUSTOM"])
    .describe(
      "Required. Can be one of `ALLOW`, `DENY`, `CUSTOM`. When the action is `CUSTOM`, `customProvider` must be specified. When the action is `ALLOW`, only requests matching the policy will be allowed. When the action is `DENY`, only requests matching the policy will be denied. When a request arrives, the policies are evaluated in the following order: 1. If there is a `CUSTOM` policy that matches the request, the `CUSTOM` policy is evaluated using the custom authorization providers and the request is denied if the provider rejects the request. 2. If there are any `DENY` policies that match the request, the request is denied. 3. If there are no `ALLOW` policies for the resource or if any of the `ALLOW` policies match the request, the request is allowed. 4. Else the request is denied by default if none of the configured AuthzPolicies with `ALLOW` action match the request.",
    ).optional(),
  customProvider: z.object({
    authzExtension: z.object({
      resources: z.array(z.string()).describe(
        "Required. A list of references to authorization extensions that will be invoked for requests matching this policy. Limited to 1 custom provider.",
      ).optional(),
    }).describe(
      "Optional. Delegate authorization decision to user authored extension. Only one of cloudIap or authzExtension can be specified.",
    ).optional(),
    cloudIap: z.object({}).describe(
      "Optional. Delegates authorization decisions to Cloud IAP. Applicable only for managed load balancers. Enabling Cloud IAP at the AuthzPolicy level is not compatible with Cloud IAP settings in the BackendService. Enabling IAP in both places will result in request failure. Ensure that IAP is enabled in either the AuthzPolicy or the BackendService but not in both places.",
    ).optional(),
  }).describe(
    "Allows delegating authorization decisions to Cloud IAP or to Service Extensions.",
  ).optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  httpRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.array(z.object({
          length: z.number().int().describe(
            "Required. The length of the address range.",
          ).optional(),
          prefix: z.string().describe("Required. The address prefix.")
            .optional(),
        })).describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.array(z.object({
          principal: z.object({
            contains: z.string().describe(
              "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
            ).optional(),
            exact: z.string().describe(
              "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
            ).optional(),
            ignoreCase: z.boolean().describe(
              "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
            ).optional(),
            prefix: z.string().describe(
              "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
            ).optional(),
            suffix: z.string().describe(
              "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
            ).optional(),
          }).describe("Determines how a string value should be matched.")
            .optional(),
          principalSelector: z.enum([
            "PRINCIPAL_SELECTOR_UNSPECIFIED",
            "CLIENT_CERT_URI_SAN",
            "CLIENT_CERT_DNS_NAME_SAN",
            "CLIENT_CERT_COMMON_NAME",
          ]).describe(
            "Optional. An enum to decide what principal value the principal rule will match against. If not specified, the PrincipalSelector is CLIENT_CERT_URI_SAN.",
          ).optional(),
        })).describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.array(z.object({
          iamServiceAccount: z.object({
            contains: z.string().describe(
              "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
            ).optional(),
            exact: z.string().describe(
              "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
            ).optional(),
            ignoreCase: z.boolean().describe(
              "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
            ).optional(),
            prefix: z.string().describe(
              "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
            ).optional(),
            suffix: z.string().describe(
              "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
            ).optional(),
          }).describe("Determines how a string value should be matched.")
            .optional(),
          tagValueIdSet: z.object({
            ids: z.array(z.string()).describe(
              "Required. A list of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request. The match follows AND semantics which means all the ids must match. Limited to 5 ids in the Tag value id set.",
            ).optional(),
          }).describe(
            "Describes a set of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request.",
          ).optional(),
        })).describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of request sources. Matches requests from sources that do not match the criteria specified in this field. At least one of sources or notSources must be specified.",
      ).optional(),
      sources: z.array(z.object({
        ipBlocks: z.array(z.object({
          length: z.number().int().describe(
            "Required. The length of the address range.",
          ).optional(),
          prefix: z.string().describe("Required. The address prefix.")
            .optional(),
        })).describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.array(z.object({
          principal: z.object({
            contains: z.string().describe(
              "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
            ).optional(),
            exact: z.string().describe(
              "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
            ).optional(),
            ignoreCase: z.boolean().describe(
              "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
            ).optional(),
            prefix: z.string().describe(
              "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
            ).optional(),
            suffix: z.string().describe(
              "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
            ).optional(),
          }).describe("Determines how a string value should be matched.")
            .optional(),
          principalSelector: z.enum([
            "PRINCIPAL_SELECTOR_UNSPECIFIED",
            "CLIENT_CERT_URI_SAN",
            "CLIENT_CERT_DNS_NAME_SAN",
            "CLIENT_CERT_COMMON_NAME",
          ]).describe(
            "Optional. An enum to decide what principal value the principal rule will match against. If not specified, the PrincipalSelector is CLIENT_CERT_URI_SAN.",
          ).optional(),
        })).describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.array(z.object({
          iamServiceAccount: z.object({
            contains: z.string().describe(
              "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
            ).optional(),
            exact: z.string().describe(
              "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
            ).optional(),
            ignoreCase: z.boolean().describe(
              "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
            ).optional(),
            prefix: z.string().describe(
              "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
            ).optional(),
            suffix: z.string().describe(
              "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
            ).optional(),
          }).describe("Determines how a string value should be matched.")
            .optional(),
          tagValueIdSet: z.object({
            ids: z.array(z.string()).describe(
              "Required. A list of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request. The match follows AND semantics which means all the ids must match. Limited to 5 ids in the Tag value id set.",
            ).optional(),
          }).describe(
            "Describes a set of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request.",
          ).optional(),
        })).describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the properties of a request's sources. At least one of sources or notSources must be specified. Limited to 1 source. A match occurs when ANY source (in sources or notSources) matches the request. Within a single source, the match follows AND semantics across fields and OR semantics within a single field, i.e. a match occurs when ANY principal matches AND ANY ipBlocks match.",
      ).optional(),
    }).describe("Describes properties of one or more sources of a request.")
      .optional(),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.object({
          headers: z.array(z.object({
            name: z.string().describe(
              "Optional. Specifies the name of the header in the request.",
            ).optional(),
            value: z.object({
              contains: z.string().describe(
                "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
              ).optional(),
              exact: z.string().describe(
                "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
              ).optional(),
              ignoreCase: z.boolean().describe(
                "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
              ).optional(),
              prefix: z.string().describe(
                "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
              ).optional(),
              suffix: z.string().describe(
                "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
              ).optional(),
            }).describe("Determines how a string value should be matched.")
              .optional(),
          })).describe(
            "Required. A list of headers to match against in http header. The match can be one of exact, prefix, suffix, or contains (substring match). The match follows AND semantics which means all the headers must match. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 headers per Authorization Policy.",
          ).optional(),
        }).describe("Describes a set of HTTP headers to match against.")
          .optional(),
        hosts: z.array(z.object({
          contains: z.string().describe(
            "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
          ).optional(),
          exact: z.string().describe(
            "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
          ).optional(),
          ignoreCase: z.boolean().describe(
            "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
          ).optional(),
          prefix: z.string().describe(
            "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
          ).optional(),
          suffix: z.string().describe(
            "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
          ).optional(),
        })).describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.object({
          baseProtocolMethodsOption: z.enum([
            "BASE_PROTOCOL_METHODS_OPTION_UNSPECIFIED",
            "SKIP_BASE_PROTOCOL_METHODS",
            "MATCH_BASE_PROTOCOL_METHODS",
          ]).describe(
            "Optional. If specified, matches on the MCP protocol’s non-access specific methods namely: * initialize * completion/ * logging/ * notifications/ * ping Defaults to SKIP_BASE_PROTOCOL_METHODS if not specified.",
          ).optional(),
          methods: z.array(z.object({
            name: z.string().describe(
              "Required. The MCP method to match against. Allowed values are as follows: 1. `tools`, `prompts`, `resources` - these will match against all sub methods under the respective methods. 2. `prompts/list`, `tools/list`, `resources/list`, `resources/templates/list` 3. `prompts/get`, `tools/call`, `resources/subscribe`, `resources/unsubscribe`, `resources/read` Params cannot be specified for categories 1 and 2.",
            ).optional(),
            params: z.array(z.object({
              contains: z.string().describe(
                "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
              ).optional(),
              exact: z.string().describe(
                "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
              ).optional(),
              ignoreCase: z.boolean().describe(
                "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
              ).optional(),
              prefix: z.string().describe(
                "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
              ).optional(),
              suffix: z.string().describe(
                "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
              ).optional(),
            })).describe(
              "Optional. A list of MCP method parameters to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 MCP method parameters per Authorization Policy.",
            ).optional(),
          })).describe(
            "Optional. A list of MCP methods and associated parameters to match on. It is recommended to use this field to match on tools, prompts and resource accesses while setting the baseProtocolMethodsOption to MATCH_BASE_PROTOCOL_METHODS to match on all the other MCP protocol methods. Limited to 10 MCP methods per Authorization Policy.",
          ).optional(),
        }).describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.array(z.string()).describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.array(z.object({
          contains: z.string().describe(
            "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
          ).optional(),
          exact: z.string().describe(
            "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
          ).optional(),
          ignoreCase: z.boolean().describe(
            "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
          ).optional(),
          prefix: z.string().describe(
            "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
          ).optional(),
          suffix: z.string().describe(
            "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
          ).optional(),
        })).describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of the targets of a request. Matches requests for operations that do not match the criteria specified in this field. At least one of operations or notOperations must be specified.",
      ).optional(),
      operations: z.array(z.object({
        headerSet: z.object({
          headers: z.array(z.object({
            name: z.string().describe(
              "Optional. Specifies the name of the header in the request.",
            ).optional(),
            value: z.object({
              contains: z.string().describe(
                "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
              ).optional(),
              exact: z.string().describe(
                "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
              ).optional(),
              ignoreCase: z.boolean().describe(
                "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
              ).optional(),
              prefix: z.string().describe(
                "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
              ).optional(),
              suffix: z.string().describe(
                "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
              ).optional(),
            }).describe("Determines how a string value should be matched.")
              .optional(),
          })).describe(
            "Required. A list of headers to match against in http header. The match can be one of exact, prefix, suffix, or contains (substring match). The match follows AND semantics which means all the headers must match. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 headers per Authorization Policy.",
          ).optional(),
        }).describe("Describes a set of HTTP headers to match against.")
          .optional(),
        hosts: z.array(z.object({
          contains: z.string().describe(
            "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
          ).optional(),
          exact: z.string().describe(
            "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
          ).optional(),
          ignoreCase: z.boolean().describe(
            "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
          ).optional(),
          prefix: z.string().describe(
            "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
          ).optional(),
          suffix: z.string().describe(
            "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
          ).optional(),
        })).describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.object({
          baseProtocolMethodsOption: z.enum([
            "BASE_PROTOCOL_METHODS_OPTION_UNSPECIFIED",
            "SKIP_BASE_PROTOCOL_METHODS",
            "MATCH_BASE_PROTOCOL_METHODS",
          ]).describe(
            "Optional. If specified, matches on the MCP protocol’s non-access specific methods namely: * initialize * completion/ * logging/ * notifications/ * ping Defaults to SKIP_BASE_PROTOCOL_METHODS if not specified.",
          ).optional(),
          methods: z.array(z.object({
            name: z.string().describe(
              "Required. The MCP method to match against. Allowed values are as follows: 1. `tools`, `prompts`, `resources` - these will match against all sub methods under the respective methods. 2. `prompts/list`, `tools/list`, `resources/list`, `resources/templates/list` 3. `prompts/get`, `tools/call`, `resources/subscribe`, `resources/unsubscribe`, `resources/read` Params cannot be specified for categories 1 and 2.",
            ).optional(),
            params: z.array(z.object({
              contains: z.string().describe(
                "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
              ).optional(),
              exact: z.string().describe(
                "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
              ).optional(),
              ignoreCase: z.boolean().describe(
                "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
              ).optional(),
              prefix: z.string().describe(
                "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
              ).optional(),
              suffix: z.string().describe(
                "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
              ).optional(),
            })).describe(
              "Optional. A list of MCP method parameters to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 MCP method parameters per Authorization Policy.",
            ).optional(),
          })).describe(
            "Optional. A list of MCP methods and associated parameters to match on. It is recommended to use this field to match on tools, prompts and resource accesses while setting the baseProtocolMethodsOption to MATCH_BASE_PROTOCOL_METHODS to match on all the other MCP protocol methods. Limited to 10 MCP methods per Authorization Policy.",
          ).optional(),
        }).describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.array(z.string()).describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.array(z.object({
          contains: z.string().describe(
            "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
          ).optional(),
          exact: z.string().describe(
            "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
          ).optional(),
          ignoreCase: z.boolean().describe(
            "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
          ).optional(),
          prefix: z.string().describe(
            "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
          ).optional(),
          suffix: z.string().describe(
            "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
          ).optional(),
        })).describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
      })).describe(
        "Optional. Describes properties of one or more targets of a request. At least one of operations or notOperations must be specified. Limited to 1 operation. A match occurs when ANY operation (in operations or notOperations) matches. Within an operation, the match follows AND semantics across fields and OR semantics within a field, i.e. a match occurs when ANY path matches AND ANY header matches and ANY method matches.",
      ).optional(),
    }).describe("Describes properties of one or more targets of a request.")
      .optional(),
    when: z.string().describe(
      "Optional. CEL expression that describes the conditions to be satisfied for the action. The result of the CEL expression is ANDed with the from and to. Refer to the CEL language reference for a list of available attributes.",
    ).optional(),
  })).describe(
    "Optional. A list of authorization HTTP rules to match against the incoming request. A policy match occurs when at least one HTTP rule matches the request or when no HTTP rules are specified in the policy. At least one HTTP Rule is required for Allow or Deny Action. Limited to 5 rules.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `AuthzPolicy` resource. The format must comply with [the following requirements](/compute/docs/labeling-resources#requirements).",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. Name of the `AuthzPolicy` resource in the following format: `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`.",
  ).optional(),
  policyProfile: z.enum([
    "POLICY_PROFILE_UNSPECIFIED",
    "REQUEST_AUTHZ",
    "CONTENT_AUTHZ",
  ]).describe(
    "Optional. Immutable. Defines the type of authorization being performed. If not specified, `REQUEST_AUTHZ` is applied. This field cannot be changed once AuthzPolicy is created.",
  ).optional(),
  target: z.object({
    loadBalancingScheme: z.enum([
      "LOAD_BALANCING_SCHEME_UNSPECIFIED",
      "INTERNAL_MANAGED",
      "EXTERNAL_MANAGED",
      "INTERNAL_SELF_MANAGED",
    ]).describe(
      "Optional. All gateways and forwarding rules referenced by this policy and extensions must share the same load balancing scheme. Supported values: `INTERNAL_MANAGED` and `EXTERNAL_MANAGED`. For more information, refer to [Backend services overview](https://cloud.google.com/load-balancing/docs/backend-service).",
    ).optional(),
    resources: z.array(z.string()).describe(
      "Required. A list of references to the Forwarding Rules on which this policy will be applied.",
    ).optional(),
  }).describe(
    "Specifies the set of targets to which this policy should be applied to.",
  ).optional(),
  authzPolicyId: z.string().describe(
    "Required. User-provided ID of the `AuthzPolicy` resource to be created.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  action: z.string().optional(),
  createTime: z.string().optional(),
  customProvider: z.object({
    authzExtension: z.object({
      resources: z.array(z.string()),
    }),
    cloudIap: z.object({}),
  }).optional(),
  description: z.string().optional(),
  httpRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.array(z.object({
          length: z.number(),
          prefix: z.string(),
        })),
        principals: z.array(z.object({
          principal: z.object({
            contains: z.string(),
            exact: z.string(),
            ignoreCase: z.boolean(),
            prefix: z.string(),
            suffix: z.string(),
          }),
          principalSelector: z.string(),
        })),
        resources: z.array(z.object({
          iamServiceAccount: z.object({
            contains: z.string(),
            exact: z.string(),
            ignoreCase: z.boolean(),
            prefix: z.string(),
            suffix: z.string(),
          }),
          tagValueIdSet: z.object({
            ids: z.array(z.string()),
          }),
        })),
      })),
      sources: z.array(z.object({
        ipBlocks: z.array(z.object({
          length: z.number(),
          prefix: z.string(),
        })),
        principals: z.array(z.object({
          principal: z.object({
            contains: z.string(),
            exact: z.string(),
            ignoreCase: z.boolean(),
            prefix: z.string(),
            suffix: z.string(),
          }),
          principalSelector: z.string(),
        })),
        resources: z.array(z.object({
          iamServiceAccount: z.object({
            contains: z.string(),
            exact: z.string(),
            ignoreCase: z.boolean(),
            prefix: z.string(),
            suffix: z.string(),
          }),
          tagValueIdSet: z.object({
            ids: z.array(z.string()),
          }),
        })),
      })),
    }),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.object({
          headers: z.array(z.object({
            name: z.string(),
            value: z.object({
              contains: z.string(),
              exact: z.string(),
              ignoreCase: z.boolean(),
              prefix: z.string(),
              suffix: z.string(),
            }),
          })),
        }),
        hosts: z.array(z.object({
          contains: z.string(),
          exact: z.string(),
          ignoreCase: z.boolean(),
          prefix: z.string(),
          suffix: z.string(),
        })),
        mcp: z.object({
          baseProtocolMethodsOption: z.string(),
          methods: z.array(z.object({
            name: z.string(),
            params: z.array(z.object({
              contains: z.string(),
              exact: z.string(),
              ignoreCase: z.boolean(),
              prefix: z.string(),
              suffix: z.string(),
            })),
          })),
        }),
        methods: z.array(z.string()),
        paths: z.array(z.object({
          contains: z.string(),
          exact: z.string(),
          ignoreCase: z.boolean(),
          prefix: z.string(),
          suffix: z.string(),
        })),
      })),
      operations: z.array(z.object({
        headerSet: z.object({
          headers: z.array(z.object({
            name: z.string(),
            value: z.object({
              contains: z.string(),
              exact: z.string(),
              ignoreCase: z.boolean(),
              prefix: z.string(),
              suffix: z.string(),
            }),
          })),
        }),
        hosts: z.array(z.object({
          contains: z.string(),
          exact: z.string(),
          ignoreCase: z.boolean(),
          prefix: z.string(),
          suffix: z.string(),
        })),
        mcp: z.object({
          baseProtocolMethodsOption: z.string(),
          methods: z.array(z.object({
            name: z.string(),
            params: z.array(z.object({
              contains: z.string(),
              exact: z.string(),
              ignoreCase: z.boolean(),
              prefix: z.string(),
              suffix: z.string(),
            })),
          })),
        }),
        methods: z.array(z.string()),
        paths: z.array(z.object({
          contains: z.string(),
          exact: z.string(),
          ignoreCase: z.boolean(),
          prefix: z.string(),
          suffix: z.string(),
        })),
      })),
    }),
    when: z.string(),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  policyProfile: z.string().optional(),
  target: z.object({
    loadBalancingScheme: z.string(),
    resources: z.array(z.string()),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  action: z.enum(["AUTHZ_ACTION_UNSPECIFIED", "ALLOW", "DENY", "CUSTOM"])
    .describe(
      "Required. Can be one of `ALLOW`, `DENY`, `CUSTOM`. When the action is `CUSTOM`, `customProvider` must be specified. When the action is `ALLOW`, only requests matching the policy will be allowed. When the action is `DENY`, only requests matching the policy will be denied. When a request arrives, the policies are evaluated in the following order: 1. If there is a `CUSTOM` policy that matches the request, the `CUSTOM` policy is evaluated using the custom authorization providers and the request is denied if the provider rejects the request. 2. If there are any `DENY` policies that match the request, the request is denied. 3. If there are no `ALLOW` policies for the resource or if any of the `ALLOW` policies match the request, the request is allowed. 4. Else the request is denied by default if none of the configured AuthzPolicies with `ALLOW` action match the request.",
    ).optional(),
  customProvider: z.object({
    authzExtension: z.object({
      resources: z.array(z.string()).describe(
        "Required. A list of references to authorization extensions that will be invoked for requests matching this policy. Limited to 1 custom provider.",
      ).optional(),
    }).describe(
      "Optional. Delegate authorization decision to user authored extension. Only one of cloudIap or authzExtension can be specified.",
    ).optional(),
    cloudIap: z.object({}).describe(
      "Optional. Delegates authorization decisions to Cloud IAP. Applicable only for managed load balancers. Enabling Cloud IAP at the AuthzPolicy level is not compatible with Cloud IAP settings in the BackendService. Enabling IAP in both places will result in request failure. Ensure that IAP is enabled in either the AuthzPolicy or the BackendService but not in both places.",
    ).optional(),
  }).describe(
    "Allows delegating authorization decisions to Cloud IAP or to Service Extensions.",
  ).optional(),
  description: z.string().describe(
    "Optional. A human-readable description of the resource.",
  ).optional(),
  httpRules: z.array(z.object({
    from: z.object({
      notSources: z.array(z.object({
        ipBlocks: z.array(z.object({
          length: z.number().int().describe(
            "Required. The length of the address range.",
          ).optional(),
          prefix: z.string().describe("Required. The address prefix.")
            .optional(),
        })).describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.array(z.object({
          principal: z.object({
            contains: z.string().describe(
              "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
            ).optional(),
            exact: z.string().describe(
              "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
            ).optional(),
            ignoreCase: z.boolean().describe(
              "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
            ).optional(),
            prefix: z.string().describe(
              "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
            ).optional(),
            suffix: z.string().describe(
              "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
            ).optional(),
          }).describe("Determines how a string value should be matched.")
            .optional(),
          principalSelector: z.enum([
            "PRINCIPAL_SELECTOR_UNSPECIFIED",
            "CLIENT_CERT_URI_SAN",
            "CLIENT_CERT_DNS_NAME_SAN",
            "CLIENT_CERT_COMMON_NAME",
          ]).describe(
            "Optional. An enum to decide what principal value the principal rule will match against. If not specified, the PrincipalSelector is CLIENT_CERT_URI_SAN.",
          ).optional(),
        })).describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.array(z.object({
          iamServiceAccount: z.object({
            contains: z.string().describe(
              "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
            ).optional(),
            exact: z.string().describe(
              "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
            ).optional(),
            ignoreCase: z.boolean().describe(
              "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
            ).optional(),
            prefix: z.string().describe(
              "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
            ).optional(),
            suffix: z.string().describe(
              "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
            ).optional(),
          }).describe("Determines how a string value should be matched.")
            .optional(),
          tagValueIdSet: z.object({
            ids: z.array(z.string()).describe(
              "Required. A list of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request. The match follows AND semantics which means all the ids must match. Limited to 5 ids in the Tag value id set.",
            ).optional(),
          }).describe(
            "Describes a set of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request.",
          ).optional(),
        })).describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of request sources. Matches requests from sources that do not match the criteria specified in this field. At least one of sources or notSources must be specified.",
      ).optional(),
      sources: z.array(z.object({
        ipBlocks: z.array(z.object({
          length: z.number().int().describe(
            "Required. The length of the address range.",
          ).optional(),
          prefix: z.string().describe("Required. The address prefix.")
            .optional(),
        })).describe(
          "Optional. A list of IP addresses or IP address ranges to match against the source IP address of the request. Limited to 10 ip_blocks per Authorization Policy",
        ).optional(),
        principals: z.array(z.object({
          principal: z.object({
            contains: z.string().describe(
              "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
            ).optional(),
            exact: z.string().describe(
              "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
            ).optional(),
            ignoreCase: z.boolean().describe(
              "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
            ).optional(),
            prefix: z.string().describe(
              "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
            ).optional(),
            suffix: z.string().describe(
              "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
            ).optional(),
          }).describe("Determines how a string value should be matched.")
            .optional(),
          principalSelector: z.enum([
            "PRINCIPAL_SELECTOR_UNSPECIFIED",
            "CLIENT_CERT_URI_SAN",
            "CLIENT_CERT_DNS_NAME_SAN",
            "CLIENT_CERT_COMMON_NAME",
          ]).describe(
            "Optional. An enum to decide what principal value the principal rule will match against. If not specified, the PrincipalSelector is CLIENT_CERT_URI_SAN.",
          ).optional(),
        })).describe(
          "Optional. A list of identities derived from the client's certificate. This field will not match on a request unless frontend mutual TLS is enabled for the forwarding rule or Gateway and the client certificate has been successfully validated by mTLS. Each identity is a string whose value is matched against a list of URI SANs, DNS Name SANs, or the common name in the client's certificate. A match happens when any principal matches with the rule. Limited to 50 principals per Authorization Policy for regional internal Application Load Balancers, regional external Application Load Balancers, cross-region internal Application Load Balancers, and Cloud Service Mesh. This field is not supported for global external Application Load Balancers.",
        ).optional(),
        resources: z.array(z.object({
          iamServiceAccount: z.object({
            contains: z.string().describe(
              "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
            ).optional(),
            exact: z.string().describe(
              "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
            ).optional(),
            ignoreCase: z.boolean().describe(
              "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
            ).optional(),
            prefix: z.string().describe(
              "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
            ).optional(),
            suffix: z.string().describe(
              "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
            ).optional(),
          }).describe("Determines how a string value should be matched.")
            .optional(),
          tagValueIdSet: z.object({
            ids: z.array(z.string()).describe(
              "Required. A list of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request. The match follows AND semantics which means all the ids must match. Limited to 5 ids in the Tag value id set.",
            ).optional(),
          }).describe(
            "Describes a set of resource tag value permanent IDs to match against the resource manager tags value associated with the source VM of a request.",
          ).optional(),
        })).describe(
          "Optional. A list of resources to match against the resource of the source VM of a request. Limited to 10 resources per Authorization Policy.",
        ).optional(),
      })).describe(
        "Optional. Describes the properties of a request's sources. At least one of sources or notSources must be specified. Limited to 1 source. A match occurs when ANY source (in sources or notSources) matches the request. Within a single source, the match follows AND semantics across fields and OR semantics within a single field, i.e. a match occurs when ANY principal matches AND ANY ipBlocks match.",
      ).optional(),
    }).describe("Describes properties of one or more sources of a request.")
      .optional(),
    to: z.object({
      notOperations: z.array(z.object({
        headerSet: z.object({
          headers: z.array(z.object({
            name: z.string().describe(
              "Optional. Specifies the name of the header in the request.",
            ).optional(),
            value: z.object({
              contains: z.string().describe(
                "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
              ).optional(),
              exact: z.string().describe(
                "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
              ).optional(),
              ignoreCase: z.boolean().describe(
                "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
              ).optional(),
              prefix: z.string().describe(
                "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
              ).optional(),
              suffix: z.string().describe(
                "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
              ).optional(),
            }).describe("Determines how a string value should be matched.")
              .optional(),
          })).describe(
            "Required. A list of headers to match against in http header. The match can be one of exact, prefix, suffix, or contains (substring match). The match follows AND semantics which means all the headers must match. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 headers per Authorization Policy.",
          ).optional(),
        }).describe("Describes a set of HTTP headers to match against.")
          .optional(),
        hosts: z.array(z.object({
          contains: z.string().describe(
            "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
          ).optional(),
          exact: z.string().describe(
            "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
          ).optional(),
          ignoreCase: z.boolean().describe(
            "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
          ).optional(),
          prefix: z.string().describe(
            "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
          ).optional(),
          suffix: z.string().describe(
            "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
          ).optional(),
        })).describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.object({
          baseProtocolMethodsOption: z.enum([
            "BASE_PROTOCOL_METHODS_OPTION_UNSPECIFIED",
            "SKIP_BASE_PROTOCOL_METHODS",
            "MATCH_BASE_PROTOCOL_METHODS",
          ]).describe(
            "Optional. If specified, matches on the MCP protocol’s non-access specific methods namely: * initialize * completion/ * logging/ * notifications/ * ping Defaults to SKIP_BASE_PROTOCOL_METHODS if not specified.",
          ).optional(),
          methods: z.array(z.object({
            name: z.string().describe(
              "Required. The MCP method to match against. Allowed values are as follows: 1. `tools`, `prompts`, `resources` - these will match against all sub methods under the respective methods. 2. `prompts/list`, `tools/list`, `resources/list`, `resources/templates/list` 3. `prompts/get`, `tools/call`, `resources/subscribe`, `resources/unsubscribe`, `resources/read` Params cannot be specified for categories 1 and 2.",
            ).optional(),
            params: z.array(z.object({
              contains: z.string().describe(
                "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
              ).optional(),
              exact: z.string().describe(
                "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
              ).optional(),
              ignoreCase: z.boolean().describe(
                "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
              ).optional(),
              prefix: z.string().describe(
                "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
              ).optional(),
              suffix: z.string().describe(
                "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
              ).optional(),
            })).describe(
              "Optional. A list of MCP method parameters to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 MCP method parameters per Authorization Policy.",
            ).optional(),
          })).describe(
            "Optional. A list of MCP methods and associated parameters to match on. It is recommended to use this field to match on tools, prompts and resource accesses while setting the baseProtocolMethodsOption to MATCH_BASE_PROTOCOL_METHODS to match on all the other MCP protocol methods. Limited to 10 MCP methods per Authorization Policy.",
          ).optional(),
        }).describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.array(z.string()).describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.array(z.object({
          contains: z.string().describe(
            "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
          ).optional(),
          exact: z.string().describe(
            "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
          ).optional(),
          ignoreCase: z.boolean().describe(
            "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
          ).optional(),
          prefix: z.string().describe(
            "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
          ).optional(),
          suffix: z.string().describe(
            "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
          ).optional(),
        })).describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
      })).describe(
        "Optional. Describes the negated properties of the targets of a request. Matches requests for operations that do not match the criteria specified in this field. At least one of operations or notOperations must be specified.",
      ).optional(),
      operations: z.array(z.object({
        headerSet: z.object({
          headers: z.array(z.object({
            name: z.string().describe(
              "Optional. Specifies the name of the header in the request.",
            ).optional(),
            value: z.object({
              contains: z.string().describe(
                "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
              ).optional(),
              exact: z.string().describe(
                "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
              ).optional(),
              ignoreCase: z.boolean().describe(
                "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
              ).optional(),
              prefix: z.string().describe(
                "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
              ).optional(),
              suffix: z.string().describe(
                "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
              ).optional(),
            }).describe("Determines how a string value should be matched.")
              .optional(),
          })).describe(
            "Required. A list of headers to match against in http header. The match can be one of exact, prefix, suffix, or contains (substring match). The match follows AND semantics which means all the headers must match. Matches are always case sensitive unless the ignoreCase is set. Limited to 10 headers per Authorization Policy.",
          ).optional(),
        }).describe("Describes a set of HTTP headers to match against.")
          .optional(),
        hosts: z.array(z.object({
          contains: z.string().describe(
            "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
          ).optional(),
          exact: z.string().describe(
            "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
          ).optional(),
          ignoreCase: z.boolean().describe(
            "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
          ).optional(),
          prefix: z.string().describe(
            "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
          ).optional(),
          suffix: z.string().describe(
            "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
          ).optional(),
        })).describe(
          "Optional. A list of HTTP Hosts to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 hosts per Authorization Policy.",
        ).optional(),
        mcp: z.object({
          baseProtocolMethodsOption: z.enum([
            "BASE_PROTOCOL_METHODS_OPTION_UNSPECIFIED",
            "SKIP_BASE_PROTOCOL_METHODS",
            "MATCH_BASE_PROTOCOL_METHODS",
          ]).describe(
            "Optional. If specified, matches on the MCP protocol’s non-access specific methods namely: * initialize * completion/ * logging/ * notifications/ * ping Defaults to SKIP_BASE_PROTOCOL_METHODS if not specified.",
          ).optional(),
          methods: z.array(z.object({
            name: z.string().describe(
              "Required. The MCP method to match against. Allowed values are as follows: 1. `tools`, `prompts`, `resources` - these will match against all sub methods under the respective methods. 2. `prompts/list`, `tools/list`, `resources/list`, `resources/templates/list` 3. `prompts/get`, `tools/call`, `resources/subscribe`, `resources/unsubscribe`, `resources/read` Params cannot be specified for categories 1 and 2.",
            ).optional(),
            params: z.array(z.object({
              contains: z.string().describe(
                "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
              ).optional(),
              exact: z.string().describe(
                "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
              ).optional(),
              ignoreCase: z.boolean().describe(
                "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
              ).optional(),
              prefix: z.string().describe(
                "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
              ).optional(),
              suffix: z.string().describe(
                "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
              ).optional(),
            })).describe(
              "Optional. A list of MCP method parameters to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 MCP method parameters per Authorization Policy.",
            ).optional(),
          })).describe(
            "Optional. A list of MCP methods and associated parameters to match on. It is recommended to use this field to match on tools, prompts and resource accesses while setting the baseProtocolMethodsOption to MATCH_BASE_PROTOCOL_METHODS to match on all the other MCP protocol methods. Limited to 10 MCP methods per Authorization Policy.",
          ).optional(),
        }).describe(
          "Describes a set of MCP protocol attributes to match against for a given MCP request.",
        ).optional(),
        methods: z.array(z.string()).describe(
          "Optional. A list of HTTP methods to match against. Each entry must be a valid HTTP method name (GET, PUT, POST, HEAD, PATCH, DELETE, OPTIONS). It only allows exact match and is always case sensitive. Limited to 10 methods per Authorization Policy.",
        ).optional(),
        paths: z.array(z.object({
          contains: z.string().describe(
            "The input string must have the substring specified here. Note: empty contains match is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc.def",
          ).optional(),
          exact: z.string().describe(
            "The input string must match exactly the string specified here. Examples: * abc only matches the value abc.",
          ).optional(),
          ignoreCase: z.boolean().describe(
            "If true, indicates the exact/prefix/suffix/contains matching should be case insensitive. For example, the matcher data will match both input string Data and data if set to true.",
          ).optional(),
          prefix: z.string().describe(
            "The input string must have the prefix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value abc.xyz",
          ).optional(),
          suffix: z.string().describe(
            "The input string must have the suffix specified here. Note: empty prefix is not allowed, please use regex instead. Examples: * abc matches the value xyz.abc",
          ).optional(),
        })).describe(
          "Optional. A list of paths to match against. The match can be one of exact, prefix, suffix, or contains (substring match). Matches are always case sensitive unless the ignoreCase is set. Limited to 10 paths per Authorization Policy. Note that this path match includes the query parameters. For gRPC services, this should be a fully-qualified name of the form /package.service/method.",
        ).optional(),
      })).describe(
        "Optional. Describes properties of one or more targets of a request. At least one of operations or notOperations must be specified. Limited to 1 operation. A match occurs when ANY operation (in operations or notOperations) matches. Within an operation, the match follows AND semantics across fields and OR semantics within a field, i.e. a match occurs when ANY path matches AND ANY header matches and ANY method matches.",
      ).optional(),
    }).describe("Describes properties of one or more targets of a request.")
      .optional(),
    when: z.string().describe(
      "Optional. CEL expression that describes the conditions to be satisfied for the action. The result of the CEL expression is ANDed with the from and to. Refer to the CEL language reference for a list of available attributes.",
    ).optional(),
  })).describe(
    "Optional. A list of authorization HTTP rules to match against the incoming request. A policy match occurs when at least one HTTP rule matches the request or when no HTTP rules are specified in the policy. At least one HTTP Rule is required for Allow or Deny Action. Limited to 5 rules.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with the `AuthzPolicy` resource. The format must comply with [the following requirements](/compute/docs/labeling-resources#requirements).",
  ).optional(),
  name: z.string().describe(
    "Required. Identifier. Name of the `AuthzPolicy` resource in the following format: `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`.",
  ).optional(),
  policyProfile: z.enum([
    "POLICY_PROFILE_UNSPECIFIED",
    "REQUEST_AUTHZ",
    "CONTENT_AUTHZ",
  ]).describe(
    "Optional. Immutable. Defines the type of authorization being performed. If not specified, `REQUEST_AUTHZ` is applied. This field cannot be changed once AuthzPolicy is created.",
  ).optional(),
  target: z.object({
    loadBalancingScheme: z.enum([
      "LOAD_BALANCING_SCHEME_UNSPECIFIED",
      "INTERNAL_MANAGED",
      "EXTERNAL_MANAGED",
      "INTERNAL_SELF_MANAGED",
    ]).describe(
      "Optional. All gateways and forwarding rules referenced by this policy and extensions must share the same load balancing scheme. Supported values: `INTERNAL_MANAGED` and `EXTERNAL_MANAGED`. For more information, refer to [Backend services overview](https://cloud.google.com/load-balancing/docs/backend-service).",
    ).optional(),
    resources: z.array(z.string()).describe(
      "Required. A list of references to the Forwarding Rules on which this policy will be applied.",
    ).optional(),
  }).describe(
    "Specifies the set of targets to which this policy should be applied to.",
  ).optional(),
  authzPolicyId: z.string().describe(
    "Required. User-provided ID of the `AuthzPolicy` resource to be created.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/networksecurity/authzpolicies",
  version: "2026.04.02.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "Added: policyProfile",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
        "`AuthzPolicy` is a resource that allows to forward traffic to a callout backe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a authzPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["customProvider"] !== undefined) {
          body["customProvider"] = g["customProvider"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["httpRules"] !== undefined) body["httpRules"] = g["httpRules"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policyProfile"] !== undefined) {
          body["policyProfile"] = g["policyProfile"];
        }
        if (g["target"] !== undefined) body["target"] = g["target"];
        if (g["authzPolicyId"] !== undefined) {
          body["authzPolicyId"] = g["authzPolicyId"];
        }
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
      description: "Get a authzPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the authzPolicies"),
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
      description: "Update authzPolicies attributes",
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
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["customProvider"] !== undefined) {
          body["customProvider"] = g["customProvider"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["httpRules"] !== undefined) body["httpRules"] = g["httpRules"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["target"] !== undefined) body["target"] = g["target"];
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
      description: "Delete the authzPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the authzPolicies"),
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
      description: "Sync authzPolicies state from GCP",
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
