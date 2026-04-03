// Auto-generated extension model for @swamp/aws/xray/sampling-rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

export const SamplingRateBoostSchema = z.object({
  MaxRate: z.number().min(0).max(1).describe(
    "The maximum sampling rate X-Ray will apply when it detects anomalies. X-Ray determines the appropriate rate between your baseline and the maximum, depending on anomaly activity.",
  ),
  CooldownWindowMinutes: z.number().int().min(1).describe(
    "Time window (in minutes) in which only one sampling rate boost can be triggered. After a boost occurs, no further boosts are allowed until the next window.",
  ),
});

export const SamplingRuleSchema = z.object({
  Attributes: z.record(z.string(), z.string()).describe(
    "Matches attributes derived from the request.",
  ).optional(),
  FixedRate: z.number().min(0).max(1).describe(
    "The percentage of matching requests to instrument, after the reservoir is exhausted.",
  ),
  Host: z.string().max(64).describe("Matches the hostname from a request URL."),
  HTTPMethod: z.string().max(10).describe(
    "Matches the HTTP method from a request URL.",
  ),
  Priority: z.number().int().min(1).max(9999).describe(
    "The priority of the sampling rule.",
  ),
  ReservoirSize: z.number().int().min(0).describe(
    "A fixed number of matching requests to instrument per second, prior to applying the fixed rate. The reservoir is not used directly by services, but applies to all services using the rule collectively.",
  ),
  ResourceARN: z.string().max(500).describe(
    "Matches the ARN of the AWS resource on which the service runs.",
  ),
  RuleName: z.string().min(1).max(32).describe(
    "The ARN of the sampling rule. Specify a rule by either name or ARN, but not both.",
  ).optional(),
  ServiceName: z.string().max(64).describe(
    "Matches the name that the service uses to identify itself in segments.",
  ),
  ServiceType: z.string().max(64).describe(
    "Matches the origin that the service uses to identify its type in segments.",
  ),
  URLPath: z.string().max(128).describe("Matches the path from a request URL."),
  Version: z.number().int().min(1).describe(
    "The version of the sampling rule format (1)",
  ).optional(),
  SamplingRateBoost: SamplingRateBoostSchema.optional(),
});

export const TagSchema = z.object({
  Key: z.string().describe("The key name of the tag."),
  Value: z.string().describe("The value for the tag."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  SamplingRule: z.object({
    Attributes: z.record(z.string(), z.string()).describe(
      "Matches attributes derived from the request.",
    ).optional(),
    FixedRate: z.number().min(0).max(1).describe(
      "The percentage of matching requests to instrument, after the reservoir is exhausted.",
    ),
    Host: z.string().max(64).describe(
      "Matches the hostname from a request URL.",
    ),
    HTTPMethod: z.string().max(10).describe(
      "Matches the HTTP method from a request URL.",
    ),
    Priority: z.number().int().min(1).max(9999).describe(
      "The priority of the sampling rule.",
    ),
    ReservoirSize: z.number().int().min(0).describe(
      "A fixed number of matching requests to instrument per second, prior to applying the fixed rate. The reservoir is not used directly by services, but applies to all services using the rule collectively.",
    ),
    ResourceARN: z.string().max(500).describe(
      "Matches the ARN of the AWS resource on which the service runs.",
    ),
    RuleName: z.string().min(1).max(32).describe(
      "The ARN of the sampling rule. Specify a rule by either name or ARN, but not both.",
    ).optional(),
    ServiceName: z.string().max(64).describe(
      "Matches the name that the service uses to identify itself in segments.",
    ),
    ServiceType: z.string().max(64).describe(
      "Matches the origin that the service uses to identify its type in segments.",
    ),
    URLPath: z.string().max(128).describe(
      "Matches the path from a request URL.",
    ),
    Version: z.number().int().min(1).describe(
      "The version of the sampling rule format (1)",
    ).optional(),
    SamplingRateBoost: SamplingRateBoostSchema.optional(),
  }).optional(),
  SamplingRuleRecord: z.object({
    CreatedAt: z.string().describe(
      "When the rule was created, in Unix time seconds.",
    ).optional(),
    ModifiedAt: z.string().describe(
      "When the rule was modified, in Unix time seconds.",
    ).optional(),
    SamplingRule: SamplingRuleSchema.optional(),
  }).optional(),
  SamplingRuleUpdate: z.object({
    Attributes: z.record(z.string(), z.string()).describe(
      "Matches attributes derived from the request.",
    ).optional(),
    FixedRate: z.number().min(0).max(1).describe(
      "The percentage of matching requests to instrument, after the reservoir is exhausted.",
    ).optional(),
    Host: z.string().max(64).describe(
      "Matches the hostname from a request URL.",
    ).optional(),
    HTTPMethod: z.string().max(10).describe(
      "Matches the HTTP method from a request URL.",
    ).optional(),
    Priority: z.number().int().min(1).max(9999).describe(
      "The priority of the sampling rule.",
    ).optional(),
    ReservoirSize: z.number().int().min(0).describe(
      "A fixed number of matching requests to instrument per second, prior to applying the fixed rate. The reservoir is not used directly by services, but applies to all services using the rule collectively.",
    ).optional(),
    ResourceARN: z.string().max(500).describe(
      "Matches the ARN of the AWS resource on which the service runs.",
    ).optional(),
    RuleName: z.string().min(1).max(32).describe(
      "The ARN of the sampling rule. Specify a rule by either name or ARN, but not both.",
    ).optional(),
    ServiceName: z.string().max(64).describe(
      "Matches the name that the service uses to identify itself in segments.",
    ).optional(),
    ServiceType: z.string().max(64).describe(
      "Matches the origin that the service uses to identify its type in segments.",
    ).optional(),
    URLPath: z.string().max(128).describe(
      "Matches the path from a request URL.",
    ).optional(),
    SamplingRateBoost: SamplingRateBoostSchema.optional(),
  }).optional(),
  RuleName: z.string().min(1).max(32).describe(
    "The ARN of the sampling rule. Specify a rule by either name or ARN, but not both.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  SamplingRule: SamplingRuleSchema.optional(),
  SamplingRuleRecord: z.object({
    CreatedAt: z.string(),
    ModifiedAt: z.string(),
    SamplingRule: SamplingRuleSchema,
  }).optional(),
  SamplingRuleUpdate: z.object({
    Attributes: z.record(z.string(), z.unknown()),
    FixedRate: z.number(),
    Host: z.string(),
    HTTPMethod: z.string(),
    Priority: z.number(),
    ReservoirSize: z.number(),
    ResourceARN: z.string(),
    RuleARN: z.string(),
    RuleName: z.string(),
    ServiceName: z.string(),
    ServiceType: z.string(),
    URLPath: z.string(),
    SamplingRateBoost: SamplingRateBoostSchema,
  }).optional(),
  RuleARN: z.string(),
  RuleName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  SamplingRule: z.object({
    Attributes: z.record(z.string(), z.string()).describe(
      "Matches attributes derived from the request.",
    ).optional(),
    FixedRate: z.number().min(0).max(1).describe(
      "The percentage of matching requests to instrument, after the reservoir is exhausted.",
    ).optional(),
    Host: z.string().max(64).describe(
      "Matches the hostname from a request URL.",
    ).optional(),
    HTTPMethod: z.string().max(10).describe(
      "Matches the HTTP method from a request URL.",
    ).optional(),
    Priority: z.number().int().min(1).max(9999).describe(
      "The priority of the sampling rule.",
    ).optional(),
    ReservoirSize: z.number().int().min(0).describe(
      "A fixed number of matching requests to instrument per second, prior to applying the fixed rate. The reservoir is not used directly by services, but applies to all services using the rule collectively.",
    ).optional(),
    ResourceARN: z.string().max(500).describe(
      "Matches the ARN of the AWS resource on which the service runs.",
    ).optional(),
    RuleName: z.string().min(1).max(32).describe(
      "The ARN of the sampling rule. Specify a rule by either name or ARN, but not both.",
    ).optional(),
    ServiceName: z.string().max(64).describe(
      "Matches the name that the service uses to identify itself in segments.",
    ).optional(),
    ServiceType: z.string().max(64).describe(
      "Matches the origin that the service uses to identify its type in segments.",
    ).optional(),
    URLPath: z.string().max(128).describe(
      "Matches the path from a request URL.",
    ).optional(),
    Version: z.number().int().min(1).describe(
      "The version of the sampling rule format (1)",
    ).optional(),
    SamplingRateBoost: SamplingRateBoostSchema.optional(),
  }).optional(),
  SamplingRuleRecord: z.object({
    CreatedAt: z.string().describe(
      "When the rule was created, in Unix time seconds.",
    ).optional(),
    ModifiedAt: z.string().describe(
      "When the rule was modified, in Unix time seconds.",
    ).optional(),
    SamplingRule: SamplingRuleSchema.optional(),
  }).optional(),
  SamplingRuleUpdate: z.object({
    Attributes: z.record(z.string(), z.string()).describe(
      "Matches attributes derived from the request.",
    ).optional(),
    FixedRate: z.number().min(0).max(1).describe(
      "The percentage of matching requests to instrument, after the reservoir is exhausted.",
    ).optional(),
    Host: z.string().max(64).describe(
      "Matches the hostname from a request URL.",
    ).optional(),
    HTTPMethod: z.string().max(10).describe(
      "Matches the HTTP method from a request URL.",
    ).optional(),
    Priority: z.number().int().min(1).max(9999).describe(
      "The priority of the sampling rule.",
    ).optional(),
    ReservoirSize: z.number().int().min(0).describe(
      "A fixed number of matching requests to instrument per second, prior to applying the fixed rate. The reservoir is not used directly by services, but applies to all services using the rule collectively.",
    ).optional(),
    ResourceARN: z.string().max(500).describe(
      "Matches the ARN of the AWS resource on which the service runs.",
    ).optional(),
    RuleName: z.string().min(1).max(32).describe(
      "The ARN of the sampling rule. Specify a rule by either name or ARN, but not both.",
    ).optional(),
    ServiceName: z.string().max(64).describe(
      "Matches the name that the service uses to identify itself in segments.",
    ).optional(),
    ServiceType: z.string().max(64).describe(
      "Matches the origin that the service uses to identify its type in segments.",
    ).optional(),
    URLPath: z.string().max(128).describe(
      "Matches the path from a request URL.",
    ).optional(),
    SamplingRateBoost: SamplingRateBoostSchema.optional(),
  }).optional(),
  RuleName: z.string().min(1).max(32).describe(
    "The ARN of the sampling rule. Specify a rule by either name or ARN, but not both.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/xray/sampling-rule",
  version: "2026.04.03.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      description: "XRay SamplingRule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a XRay SamplingRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::XRay::SamplingRule",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a XRay SamplingRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the XRay SamplingRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::XRay::SamplingRule",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a XRay SamplingRule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.RuleARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::XRay::SamplingRule",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::XRay::SamplingRule",
          identifier,
          currentState,
          desiredState,
          ["Version"],
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a XRay SamplingRule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the XRay SamplingRule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::XRay::SamplingRule",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync XRay SamplingRule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.RuleARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::XRay::SamplingRule",
            identifier,
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
              identifier,
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
