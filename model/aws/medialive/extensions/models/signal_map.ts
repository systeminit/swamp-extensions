// Auto-generated extension model for @swamp/aws/medialive/signal-map
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  CloudWatchAlarmTemplateGroupIdentifiers: z.array(
    z.string().regex(new RegExp("^[^\\s]+$")),
  ).optional(),
  Description: z.string().min(0).max(1024).describe(
    "A resource's optional description.",
  ).optional(),
  DiscoveryEntryPointArn: z.string().min(1).max(2048).describe(
    "A top-level supported AWS resource ARN to discovery a signal map from.",
  ),
  EventBridgeRuleTemplateGroupIdentifiers: z.array(
    z.string().regex(new RegExp("^[^\\s]+$")),
  ).optional(),
  ForceRediscovery: z.boolean().describe(
    "If true, will force a rediscovery of a signal map if an unchanged discoveryEntryPointArn is provided.",
  ).optional(),
  LastSuccessfulMonitorDeployment: z.object({
    DetailsUri: z.string().min(0).max(2048).describe(
      "URI associated with a signal map's monitor deployment.",
    ),
  }).describe(
    "Represents the latest successful monitor deployment of a signal map.",
  ).optional(),
  MonitorDeployment: z.object({
    DetailsUri: z.string().min(0).max(2048).describe(
      "URI associated with a signal map's monitor deployment.",
    ).optional(),
  }).describe("Represents the latest monitor deployment of a signal map.")
    .optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[^\\s]+$")).describe(
    "A resource's name. Names must be unique within the scope of a resource type in a specific region.",
  ),
  Tags: z.record(z.string(), z.string()).describe(
    "Represents the tags associated with a resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CloudWatchAlarmTemplateGroupIdentifiers: z.array(z.string()).optional(),
  CloudWatchAlarmTemplateGroupIds: z.array(z.string()).optional(),
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  DiscoveryEntryPointArn: z.string().optional(),
  ErrorMessage: z.string().optional(),
  EventBridgeRuleTemplateGroupIdentifiers: z.array(z.string()).optional(),
  EventBridgeRuleTemplateGroupIds: z.array(z.string()).optional(),
  FailedMediaResourceMap: z.record(z.string(), z.unknown()).optional(),
  ForceRediscovery: z.boolean().optional(),
  Id: z.string().optional(),
  Identifier: z.string(),
  LastDiscoveredAt: z.string().optional(),
  LastSuccessfulMonitorDeployment: z.object({
    DetailsUri: z.string(),
    Status: z.string(),
  }).optional(),
  MediaResourceMap: z.record(z.string(), z.unknown()).optional(),
  ModifiedAt: z.string().optional(),
  MonitorChangesPendingDeployment: z.boolean().optional(),
  MonitorDeployment: z.object({
    DetailsUri: z.string(),
    ErrorMessage: z.string(),
    Status: z.string(),
  }).optional(),
  Name: z.string().optional(),
  Status: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CloudWatchAlarmTemplateGroupIdentifiers: z.array(
    z.string().regex(new RegExp("^[^\\s]+$")),
  ).optional(),
  Description: z.string().min(0).max(1024).describe(
    "A resource's optional description.",
  ).optional(),
  DiscoveryEntryPointArn: z.string().min(1).max(2048).describe(
    "A top-level supported AWS resource ARN to discovery a signal map from.",
  ).optional(),
  EventBridgeRuleTemplateGroupIdentifiers: z.array(
    z.string().regex(new RegExp("^[^\\s]+$")),
  ).optional(),
  ForceRediscovery: z.boolean().describe(
    "If true, will force a rediscovery of a signal map if an unchanged discoveryEntryPointArn is provided.",
  ).optional(),
  LastSuccessfulMonitorDeployment: z.object({
    DetailsUri: z.string().min(0).max(2048).describe(
      "URI associated with a signal map's monitor deployment.",
    ).optional(),
  }).describe(
    "Represents the latest successful monitor deployment of a signal map.",
  ).optional(),
  MonitorDeployment: z.object({
    DetailsUri: z.string().min(0).max(2048).describe(
      "URI associated with a signal map's monitor deployment.",
    ).optional(),
  }).describe("Represents the latest monitor deployment of a signal map.")
    .optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[^\\s]+$")).describe(
    "A resource's name. Names must be unique within the scope of a resource type in a specific region.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "Represents the tags associated with a resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/medialive/signal-map",
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
      description: "MediaLive SignalMap resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaLive SignalMap",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MediaLive::SignalMap",
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
      description: "Get a MediaLive SignalMap",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaLive SignalMap",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MediaLive::SignalMap",
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
      description: "Update a MediaLive SignalMap",
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
        const identifier = existing.Identifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaLive::SignalMap",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaLive::SignalMap",
          identifier,
          currentState,
          desiredState,
          ["Tags"],
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
      description: "Delete a MediaLive SignalMap",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaLive SignalMap",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MediaLive::SignalMap",
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
      description: "Sync MediaLive SignalMap state from AWS",
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
        const identifier = existing.Identifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaLive::SignalMap",
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
