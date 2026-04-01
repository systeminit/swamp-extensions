// Auto-generated extension model for @swamp/aws/iotsitewise/gateway
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

export const GreengrassV2Schema = z.object({
  CoreDeviceThingName: z.string().describe(
    "The name of the CoreDevice in GreenGrass V2.",
  ),
  CoreDeviceOperatingSystem: z.enum([
    "LINUX_AARCH64",
    "LINUX_AMD64",
    "WINDOWS_AMD64",
  ]).describe(
    "The operating system of the core device in AWS IoT Greengrass V2.",
  ).optional(),
});

export const SiemensIESchema = z.object({
  IotCoreThingName: z.string().describe("The name of the IoT Core Thing."),
});

export const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

export const GatewayCapabilitySummarySchema = z.object({
  CapabilityNamespace: z.string().describe(
    "The namespace of the capability configuration.",
  ),
  CapabilityConfiguration: z.string().describe(
    "The JSON document that defines the gateway capability's configuration.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  GatewayName: z.string().describe("A unique, friendly name for the gateway."),
  GatewayPlatform: z.object({
    GreengrassV2: GreengrassV2Schema.describe(
      "A gateway that runs on AWS IoT Greengrass V2.",
    ).optional(),
    SiemensIE: SiemensIESchema.describe(
      "A gateway that runs on Siemens Industrial Edge.",
    ).optional(),
  }).describe(
    "The gateway's platform. You can only specify one platform in a gateway.",
  ),
  GatewayVersion: z.string().describe(
    "The version of the gateway you want to create.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the gateway.",
  ).optional(),
  GatewayCapabilitySummaries: z.array(GatewayCapabilitySummarySchema).describe(
    "A list of gateway capability summaries that each contain a namespace and status.",
  ).optional(),
});

const StateSchema = z.object({
  GatewayName: z.string().optional(),
  GatewayPlatform: z.object({
    GreengrassV2: GreengrassV2Schema,
    SiemensIE: SiemensIESchema,
  }).optional(),
  GatewayVersion: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  GatewayId: z.string(),
  GatewayCapabilitySummaries: z.array(GatewayCapabilitySummarySchema)
    .optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  GatewayName: z.string().describe("A unique, friendly name for the gateway.")
    .optional(),
  GatewayPlatform: z.object({
    GreengrassV2: GreengrassV2Schema.describe(
      "A gateway that runs on AWS IoT Greengrass V2.",
    ).optional(),
    SiemensIE: SiemensIESchema.describe(
      "A gateway that runs on Siemens Industrial Edge.",
    ).optional(),
  }).describe(
    "The gateway's platform. You can only specify one platform in a gateway.",
  ).optional(),
  GatewayVersion: z.string().describe(
    "The version of the gateway you want to create.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the gateway.",
  ).optional(),
  GatewayCapabilitySummaries: z.array(GatewayCapabilitySummarySchema).describe(
    "A list of gateway capability summaries that each contain a namespace and status.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotsitewise/gateway",
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
      description: "IoTSiteWise Gateway resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTSiteWise Gateway",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTSiteWise::Gateway",
          desiredState,
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
      description: "Get a IoTSiteWise Gateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise Gateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTSiteWise::Gateway",
          args.identifier,
        ) as StateData;
        const instanceName = context.globalArgs.name?.toString() ??
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
      description: "Update a IoTSiteWise Gateway",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.GatewayId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTSiteWise::Gateway",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTSiteWise::Gateway",
          identifier,
          currentState,
          desiredState,
          ["GatewayPlatform", "GatewayVersion"],
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
      description: "Delete a IoTSiteWise Gateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTSiteWise Gateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTSiteWise::Gateway",
          args.identifier,
        );
        const instanceName = context.globalArgs.name?.toString() ??
          args.identifier;
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
      description: "Sync IoTSiteWise Gateway state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.GatewayId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTSiteWise::Gateway",
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
