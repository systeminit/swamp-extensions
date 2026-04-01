// Auto-generated extension model for @swamp/aws/iotwireless/wireless-device
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

export const OtaaV11Schema = z.object({
  AppKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  NwkKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  JoinEui: z.string().regex(new RegExp("[a-fA-F0-9]{16}")),
});

export const OtaaV10xSchema = z.object({
  AppKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  AppEui: z.string().regex(new RegExp("[a-fA-F0-9]{16}")),
});

export const SessionKeysAbpV11Schema = z.object({
  FNwkSIntKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  SNwkSIntKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  NwkSEncKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  AppSKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
});

export const AbpV11Schema = z.object({
  DevAddr: z.string().regex(new RegExp("[a-fA-F0-9]{8}")),
  SessionKeys: SessionKeysAbpV11Schema,
});

export const SessionKeysAbpV10xSchema = z.object({
  NwkSKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
  AppSKey: z.string().regex(new RegExp("[a-fA-F0-9]{32}")),
});

export const AbpV10xSchema = z.object({
  DevAddr: z.string().regex(new RegExp("[a-fA-F0-9]{8}")),
  SessionKeys: SessionKeysAbpV10xSchema,
});

export const ApplicationSchema = z.object({
  DestinationName: z.string().max(128).regex(new RegExp("[a-zA-Z0-9-_]+"))
    .describe(
      "The name of the position data destination that describes the AWS IoT rule that processes the device's position data for use by AWS IoT Core for LoRaWAN.",
    ).optional(),
  FPort: z.number().int().min(1).max(223).describe("The Fport value.")
    .optional(),
  Type: z.enum([
    "SemtechGeolocation",
    "SemtechGNSS",
    "SemtechGNSSNG",
    "SemtechWiFi",
  ]).describe(
    "Application type, which can be specified to obtain real-time position information of your LoRaWAN device.",
  ).optional(),
});

export const FPortsSchema = z.object({
  Applications: z.array(ApplicationSchema).describe(
    "A list of optional LoRaWAN application information, which can be used for geolocation.",
  ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).optional(),
  Value: z.string().min(0).max(256).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Type: z.enum(["Sidewalk", "LoRaWAN"]).describe(
    "Wireless device type, currently only Sidewalk and LoRa",
  ),
  Name: z.string().max(256).describe("Wireless device name").optional(),
  Description: z.string().max(2048).describe("Wireless device description")
    .optional(),
  DestinationName: z.string().max(128).describe(
    "Wireless device destination name",
  ),
  LoRaWAN: z.object({
    DevEui: z.string().regex(new RegExp("[a-f0-9]{16}")).optional(),
    DeviceProfileId: z.string().max(256).optional(),
    ServiceProfileId: z.string().max(256).optional(),
    OtaaV11: OtaaV11Schema.optional(),
    OtaaV10x: OtaaV10xSchema.optional(),
    AbpV11: AbpV11Schema.optional(),
    AbpV10x: AbpV10xSchema.optional(),
    FPorts: FPortsSchema.optional(),
  }).describe(
    "The combination of Package, Station and Model which represents the version of the LoRaWAN Wireless Device.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the device. Currently not supported, will not create if tags are passed.",
  ).optional(),
  ThingArn: z.string().describe(
    "Thing arn. Passed into update to associate Thing with Wireless device.",
  ).optional(),
  LastUplinkReceivedAt: z.string().describe(
    "The date and time when the most recent uplink was received.",
  ).optional(),
  Positioning: z.enum(["Enabled", "Disabled"]).describe(
    "FPort values for the GNSS, stream, and ClockSync functions of the positioning information.",
  ).optional(),
});

const StateSchema = z.object({
  Type: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  DestinationName: z.string().optional(),
  LoRaWAN: z.object({
    DevEui: z.string(),
    DeviceProfileId: z.string(),
    ServiceProfileId: z.string(),
    OtaaV11: OtaaV11Schema,
    OtaaV10x: OtaaV10xSchema,
    AbpV11: AbpV11Schema,
    AbpV10x: AbpV10xSchema,
    FPorts: FPortsSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
  Id: z.string(),
  ThingArn: z.string().optional(),
  ThingName: z.string().optional(),
  LastUplinkReceivedAt: z.string().optional(),
  Positioning: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Type: z.enum(["Sidewalk", "LoRaWAN"]).describe(
    "Wireless device type, currently only Sidewalk and LoRa",
  ).optional(),
  Name: z.string().max(256).describe("Wireless device name").optional(),
  Description: z.string().max(2048).describe("Wireless device description")
    .optional(),
  DestinationName: z.string().max(128).describe(
    "Wireless device destination name",
  ).optional(),
  LoRaWAN: z.object({
    DevEui: z.string().regex(new RegExp("[a-f0-9]{16}")).optional(),
    DeviceProfileId: z.string().max(256).optional(),
    ServiceProfileId: z.string().max(256).optional(),
    OtaaV11: OtaaV11Schema.optional(),
    OtaaV10x: OtaaV10xSchema.optional(),
    AbpV11: AbpV11Schema.optional(),
    AbpV10x: AbpV10xSchema.optional(),
    FPorts: FPortsSchema.optional(),
  }).describe(
    "The combination of Package, Station and Model which represents the version of the LoRaWAN Wireless Device.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the device. Currently not supported, will not create if tags are passed.",
  ).optional(),
  ThingArn: z.string().describe(
    "Thing arn. Passed into update to associate Thing with Wireless device.",
  ).optional(),
  LastUplinkReceivedAt: z.string().describe(
    "The date and time when the most recent uplink was received.",
  ).optional(),
  Positioning: z.enum(["Enabled", "Disabled"]).describe(
    "FPort values for the GNSS, stream, and ClockSync functions of the positioning information.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotwireless/wireless-device",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTWireless WirelessDevice resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTWireless WirelessDevice",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTWireless::WirelessDevice",
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
      description: "Get a IoTWireless WirelessDevice",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless WirelessDevice",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTWireless::WirelessDevice",
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
      description: "Update a IoTWireless WirelessDevice",
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
          "AWS::IoTWireless::WirelessDevice",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTWireless::WirelessDevice",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a IoTWireless WirelessDevice",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless WirelessDevice",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTWireless::WirelessDevice",
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
      description: "Sync IoTWireless WirelessDevice state from AWS",
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
            "AWS::IoTWireless::WirelessDevice",
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
