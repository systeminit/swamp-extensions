// Auto-generated extension model for @swamp/aws/iotwireless/device-profile
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
  Value: z.string().min(1).max(256).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().max(256).describe("Name of service profile").optional(),
  LoRaWAN: z.object({
    SupportsClassB: z.boolean().optional(),
    ClassBTimeout: z.number().int().min(0).max(1000).optional(),
    PingSlotPeriod: z.number().int().min(128).max(4096).optional(),
    PingSlotDr: z.number().int().min(0).max(15).optional(),
    PingSlotFreq: z.number().int().min(1000000).max(16700000).optional(),
    SupportsClassC: z.boolean().optional(),
    ClassCTimeout: z.number().int().min(0).max(1000).optional(),
    MacVersion: z.string().max(64).optional(),
    RegParamsRevision: z.string().max(64).optional(),
    RxDelay1: z.number().int().min(0).max(15).optional(),
    RxDrOffset1: z.number().int().min(0).max(7).optional(),
    RxFreq2: z.number().int().min(1000000).max(16700000).optional(),
    RxDataRate2: z.number().int().min(0).max(15).optional(),
    FactoryPresetFreqsList: z.array(z.number().int().min(1000000).max(16700000))
      .optional(),
    MaxEirp: z.number().int().min(0).max(15).optional(),
    MaxDutyCycle: z.number().int().min(0).max(100).optional(),
    SupportsJoin: z.boolean().optional(),
    RfRegion: z.string().max(64).optional(),
    Supports32BitFCnt: z.boolean().optional(),
  }).describe(
    "LoRaWANDeviceProfile supports all LoRa specific attributes for service profile for CreateDeviceProfile operation",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the device profile.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  LoRaWAN: z.object({
    SupportsClassB: z.boolean(),
    ClassBTimeout: z.number(),
    PingSlotPeriod: z.number(),
    PingSlotDr: z.number(),
    PingSlotFreq: z.number(),
    SupportsClassC: z.boolean(),
    ClassCTimeout: z.number(),
    MacVersion: z.string(),
    RegParamsRevision: z.string(),
    RxDelay1: z.number(),
    RxDrOffset1: z.number(),
    RxFreq2: z.number(),
    RxDataRate2: z.number(),
    FactoryPresetFreqsList: z.array(z.number()),
    MaxEirp: z.number(),
    MaxDutyCycle: z.number(),
    SupportsJoin: z.boolean(),
    RfRegion: z.string(),
    Supports32BitFCnt: z.boolean(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
  Id: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().max(256).describe("Name of service profile").optional(),
  LoRaWAN: z.object({
    SupportsClassB: z.boolean().optional(),
    ClassBTimeout: z.number().int().min(0).max(1000).optional(),
    PingSlotPeriod: z.number().int().min(128).max(4096).optional(),
    PingSlotDr: z.number().int().min(0).max(15).optional(),
    PingSlotFreq: z.number().int().min(1000000).max(16700000).optional(),
    SupportsClassC: z.boolean().optional(),
    ClassCTimeout: z.number().int().min(0).max(1000).optional(),
    MacVersion: z.string().max(64).optional(),
    RegParamsRevision: z.string().max(64).optional(),
    RxDelay1: z.number().int().min(0).max(15).optional(),
    RxDrOffset1: z.number().int().min(0).max(7).optional(),
    RxFreq2: z.number().int().min(1000000).max(16700000).optional(),
    RxDataRate2: z.number().int().min(0).max(15).optional(),
    FactoryPresetFreqsList: z.array(z.number().int().min(1000000).max(16700000))
      .optional(),
    MaxEirp: z.number().int().min(0).max(15).optional(),
    MaxDutyCycle: z.number().int().min(0).max(100).optional(),
    SupportsJoin: z.boolean().optional(),
    RfRegion: z.string().max(64).optional(),
    Supports32BitFCnt: z.boolean().optional(),
  }).describe(
    "LoRaWANDeviceProfile supports all LoRa specific attributes for service profile for CreateDeviceProfile operation",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the device profile.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotwireless/device-profile",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTWireless DeviceProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTWireless DeviceProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTWireless::DeviceProfile",
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
      description: "Get a IoTWireless DeviceProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless DeviceProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTWireless::DeviceProfile",
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
      description: "Update a IoTWireless DeviceProfile",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTWireless::DeviceProfile",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTWireless::DeviceProfile",
          identifier,
          currentState,
          desiredState,
          ["Name", "LoRaWAN"],
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
      description: "Delete a IoTWireless DeviceProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless DeviceProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTWireless::DeviceProfile",
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
      description: "Sync IoTWireless DeviceProfile state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTWireless::DeviceProfile",
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
