// Auto-generated extension model for @swamp/aws/wafv2/rule-group
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

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).optional(),
  Value: z.string().min(0).max(256).optional(),
});

export const CustomResponseBodySchema = z.object({
  ContentType: z.enum(["TEXT_PLAIN", "TEXT_HTML", "APPLICATION_JSON"]).describe(
    "Valid values are TEXT_PLAIN, TEXT_HTML, and APPLICATION_JSON.",
  ),
  Content: z.string().min(1).max(10240).describe("Response content."),
});

export const LabelSummarySchema = z.object({
  Name: z.string().regex(new RegExp("^[0-9A-Za-z_:-]{1,1024}$")).describe(
    "Name of the Label.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Capacity: z.number().int().min(0),
  Description: z.string().regex(
    new RegExp(
      "^[a-zA-Z0-9=:#@/\\-,.][a-zA-Z0-9+=:#@/\\-,.\\s]+[a-zA-Z0-9+=:#@/\\-,.]{1,256}$",
    ),
  ).describe("Description of the entity.").optional(),
  Scope: z.enum(["CLOUDFRONT", "REGIONAL"]).describe(
    "Use CLOUDFRONT for CloudFront RuleGroup, use REGIONAL for Application Load Balancer and API Gateway.",
  ),
  Rules: z.array(z.string()).describe("Collection of Rules.").optional(),
  VisibilityConfig: z.object({
    SampledRequestsEnabled: z.boolean(),
    CloudWatchMetricsEnabled: z.boolean(),
    MetricName: z.string().min(1).max(128),
  }).describe("Visibility Metric of the RuleGroup."),
  Tags: z.array(TagSchema).optional(),
  CustomResponseBodies: z.record(z.string(), CustomResponseBodySchema).describe(
    "Custom response key and body map.",
  ).optional(),
  AvailableLabels: z.array(LabelSummarySchema).describe(
    "Collection of Available Labels.",
  ).optional(),
  ConsumedLabels: z.array(LabelSummarySchema).describe(
    "Collection of Consumed Labels.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Capacity: z.number().optional(),
  Description: z.string().optional(),
  Name: z.string(),
  Id: z.string(),
  Scope: z.string(),
  Rules: z.array(z.string()).optional(),
  VisibilityConfig: z.object({
    SampledRequestsEnabled: z.boolean(),
    CloudWatchMetricsEnabled: z.boolean(),
    MetricName: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  LabelNamespace: z.string().optional(),
  CustomResponseBodies: z.record(z.string(), z.unknown()).optional(),
  AvailableLabels: z.array(LabelSummarySchema).optional(),
  ConsumedLabels: z.array(LabelSummarySchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Capacity: z.number().int().min(0).optional(),
  Description: z.string().regex(
    new RegExp(
      "^[a-zA-Z0-9=:#@/\\-,.][a-zA-Z0-9+=:#@/\\-,.\\s]+[a-zA-Z0-9+=:#@/\\-,.]{1,256}$",
    ),
  ).describe("Description of the entity.").optional(),
  Scope: z.enum(["CLOUDFRONT", "REGIONAL"]).describe(
    "Use CLOUDFRONT for CloudFront RuleGroup, use REGIONAL for Application Load Balancer and API Gateway.",
  ).optional(),
  Rules: z.array(z.string()).describe("Collection of Rules.").optional(),
  VisibilityConfig: z.object({
    SampledRequestsEnabled: z.boolean().optional(),
    CloudWatchMetricsEnabled: z.boolean().optional(),
    MetricName: z.string().min(1).max(128).optional(),
  }).describe("Visibility Metric of the RuleGroup.").optional(),
  Tags: z.array(TagSchema).optional(),
  CustomResponseBodies: z.record(z.string(), CustomResponseBodySchema).describe(
    "Custom response key and body map.",
  ).optional(),
  AvailableLabels: z.array(LabelSummarySchema).describe(
    "Collection of Available Labels.",
  ).optional(),
  ConsumedLabels: z.array(LabelSummarySchema).describe(
    "Collection of Consumed Labels.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/wafv2/rule-group",
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
      description: "WAFv2 RuleGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WAFv2 RuleGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::WAFv2::RuleGroup",
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
      description: "Get a WAFv2 RuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 RuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::WAFv2::RuleGroup",
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
      description: "Update a WAFv2 RuleGroup",
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
        const idParts = [
          existing.Name?.toString(),
          existing.Id?.toString(),
          existing.Scope?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::WAFv2::RuleGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::WAFv2::RuleGroup",
          identifier,
          currentState,
          desiredState,
          ["Name", "Scope"],
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
      description: "Delete a WAFv2 RuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WAFv2 RuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::WAFv2::RuleGroup",
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
      description: "Sync WAFv2 RuleGroup state from AWS",
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
        const idParts = [
          existing.Name?.toString(),
          existing.Id?.toString(),
          existing.Scope?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::WAFv2::RuleGroup",
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
