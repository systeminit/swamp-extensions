// Auto-generated extension model for @swamp/aws/iotwireless/fuota-task
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().max(256).describe("Name of FUOTA task").optional(),
  Description: z.string().max(2048).describe("FUOTA task description")
    .optional(),
  LoRaWAN: z.object({
    RfRegion: z.string().min(1).max(64).describe(
      "FUOTA task LoRaWAN RF region",
    ),
  }).describe("FUOTA task LoRaWAN"),
  FirmwareUpdateImage: z.string().min(1).max(2048).describe(
    "FUOTA task firmware update image binary S3 link",
  ),
  FirmwareUpdateRole: z.string().min(1).max(256).describe(
    "FUOTA task firmware IAM role for reading S3",
  ),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the FUOTA task.",
  ).optional(),
  AssociateWirelessDevice: z.string().max(256).describe(
    "Wireless device to associate. Only for update request.",
  ).optional(),
  DisassociateWirelessDevice: z.string().max(256).describe(
    "Wireless device to disassociate. Only for update request.",
  ).optional(),
  AssociateMulticastGroup: z.string().max(256).describe(
    "Multicast group to associate. Only for update request.",
  ).optional(),
  DisassociateMulticastGroup: z.string().max(256).describe(
    "Multicast group to disassociate. Only for update request.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  LoRaWAN: z.object({
    StartTime: z.string(),
    RfRegion: z.string(),
  }).optional(),
  FirmwareUpdateImage: z.string().optional(),
  FirmwareUpdateRole: z.string().optional(),
  Arn: z.string().optional(),
  Id: z.string(),
  Tags: z.array(TagSchema).optional(),
  FuotaTaskStatus: z.string().optional(),
  AssociateWirelessDevice: z.string().optional(),
  DisassociateWirelessDevice: z.string().optional(),
  AssociateMulticastGroup: z.string().optional(),
  DisassociateMulticastGroup: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().max(256).describe("Name of FUOTA task").optional(),
  Description: z.string().max(2048).describe("FUOTA task description")
    .optional(),
  LoRaWAN: z.object({
    RfRegion: z.string().min(1).max(64).describe("FUOTA task LoRaWAN RF region")
      .optional(),
  }).describe("FUOTA task LoRaWAN").optional(),
  FirmwareUpdateImage: z.string().min(1).max(2048).describe(
    "FUOTA task firmware update image binary S3 link",
  ).optional(),
  FirmwareUpdateRole: z.string().min(1).max(256).describe(
    "FUOTA task firmware IAM role for reading S3",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the FUOTA task.",
  ).optional(),
  AssociateWirelessDevice: z.string().max(256).describe(
    "Wireless device to associate. Only for update request.",
  ).optional(),
  DisassociateWirelessDevice: z.string().max(256).describe(
    "Wireless device to disassociate. Only for update request.",
  ).optional(),
  AssociateMulticastGroup: z.string().max(256).describe(
    "Multicast group to associate. Only for update request.",
  ).optional(),
  DisassociateMulticastGroup: z.string().max(256).describe(
    "Multicast group to disassociate. Only for update request.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotwireless/fuota-task",
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
      description: "IoTWireless FuotaTask resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTWireless FuotaTask",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTWireless::FuotaTask",
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
      description: "Get a IoTWireless FuotaTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless FuotaTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTWireless::FuotaTask",
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
      description: "Update a IoTWireless FuotaTask",
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
          "AWS::IoTWireless::FuotaTask",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTWireless::FuotaTask",
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
      description: "Delete a IoTWireless FuotaTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless FuotaTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTWireless::FuotaTask",
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
      description: "Sync IoTWireless FuotaTask state from AWS",
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
            "AWS::IoTWireless::FuotaTask",
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
