// Auto-generated extension model for @swamp/aws/iotfleetwise/decoder-manifest
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

export const CanInterfaceSchema = z.object({
  Name: z.string().min(1).max(100),
  ProtocolName: z.string().min(1).max(50).optional(),
  ProtocolVersion: z.string().min(1).max(50).optional(),
});

export const ObdInterfaceSchema = z.object({
  Name: z.string().min(1).max(100),
  RequestMessageId: z.number().int(),
  ObdStandard: z.string().min(1).max(50).optional(),
  PidRequestIntervalSeconds: z.number().int().optional(),
  DtcRequestIntervalSeconds: z.number().int().optional(),
  UseExtendedIds: z.boolean().optional(),
  HasTransmissionEcu: z.boolean().optional(),
});

export const CustomDecodingInterfaceSchema = z.object({
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z\\d\\-_:]+$")),
});

export const CanSignalSchema = z.object({
  MessageId: z.number().int(),
  IsBigEndian: z.boolean(),
  IsSigned: z.boolean(),
  StartBit: z.number().int(),
  Offset: z.number(),
  Factor: z.number(),
  Length: z.number().int(),
  Name: z.string().min(1).max(100).optional(),
  SignalValueType: z.enum(["INTEGER", "FLOATING_POINT"]).optional(),
});

export const ObdSignalSchema = z.object({
  PidResponseLength: z.number().int(),
  ServiceMode: z.number().int(),
  Pid: z.number().int(),
  Scaling: z.number(),
  Offset: z.number(),
  StartByte: z.number().int(),
  ByteLength: z.number().int(),
  BitRightShift: z.number().int().optional(),
  BitMaskLength: z.number().int().optional(),
  IsSigned: z.boolean().optional(),
  SignalValueType: z.enum(["INTEGER", "FLOATING_POINT"]).optional(),
});

export const CustomDecodingSignalSchema = z.object({
  Id: z.string().min(1).max(150).regex(
    new RegExp("^(?!.*\\.\\.)[a-zA-Z0-9_\\-#:.]+$"),
  ),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  Description: z.string().min(1).max(2048).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F]+$"),
  ).optional(),
  ModelManifestArn: z.string(),
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z\\d\\-_:]+$")),
  NetworkInterfaces: z.array(z.object({
    InterfaceId: z.string().min(1).max(50).optional(),
    Type: z.enum(["CUSTOM_DECODING_INTERFACE"]).optional(),
    CanInterface: CanInterfaceSchema.optional(),
    ObdInterface: ObdInterfaceSchema.optional(),
    CustomDecodingInterface: CustomDecodingInterfaceSchema.optional(),
  })).optional(),
  SignalDecoders: z.array(z.object({
    FullyQualifiedName: z.string().min(1).max(150).optional(),
    Type: z.enum(["CUSTOM_DECODING_SIGNAL"]).optional(),
    InterfaceId: z.string().min(1).max(50).optional(),
    CanSignal: CanSignalSchema.optional(),
    ObdSignal: ObdSignalSchema.optional(),
    CustomDecodingSignal: CustomDecodingSignalSchema.optional(),
  })).optional(),
  Status: z.enum(["ACTIVE", "DRAFT"]).optional(),
  DefaultForUnmappedSignals: z.enum(["CUSTOM_DECODING"]).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CreationTime: z.string().optional(),
  Description: z.string().optional(),
  LastModificationTime: z.string().optional(),
  ModelManifestArn: z.string().optional(),
  Name: z.string(),
  NetworkInterfaces: z.array(z.object({
    InterfaceId: z.string(),
    Type: z.string(),
    CanInterface: CanInterfaceSchema,
    ObdInterface: ObdInterfaceSchema,
    CustomDecodingInterface: CustomDecodingInterfaceSchema,
  })).optional(),
  SignalDecoders: z.array(z.object({
    FullyQualifiedName: z.string(),
    Type: z.string(),
    InterfaceId: z.string(),
    CanSignal: CanSignalSchema,
    ObdSignal: ObdSignalSchema,
    CustomDecodingSignal: CustomDecodingSignalSchema,
  })).optional(),
  Status: z.string().optional(),
  DefaultForUnmappedSignals: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Description: z.string().min(1).max(2048).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F]+$"),
  ).optional(),
  ModelManifestArn: z.string().optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z\\d\\-_:]+$"))
    .optional(),
  NetworkInterfaces: z.array(z.object({
    InterfaceId: z.string().min(1).max(50).optional(),
    Type: z.enum(["CUSTOM_DECODING_INTERFACE"]).optional(),
    CanInterface: CanInterfaceSchema.optional(),
    ObdInterface: ObdInterfaceSchema.optional(),
    CustomDecodingInterface: CustomDecodingInterfaceSchema.optional(),
  })).optional(),
  SignalDecoders: z.array(z.object({
    FullyQualifiedName: z.string().min(1).max(150).optional(),
    Type: z.enum(["CUSTOM_DECODING_SIGNAL"]).optional(),
    InterfaceId: z.string().min(1).max(50).optional(),
    CanSignal: CanSignalSchema.optional(),
    ObdSignal: ObdSignalSchema.optional(),
    CustomDecodingSignal: CustomDecodingSignalSchema.optional(),
  })).optional(),
  Status: z.enum(["ACTIVE", "DRAFT"]).optional(),
  DefaultForUnmappedSignals: z.enum(["CUSTOM_DECODING"]).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/iotfleetwise/decoder-manifest",
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
      description: "IoTFleetWise DecoderManifest resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTFleetWise DecoderManifest",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTFleetWise::DecoderManifest",
          desiredState,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a IoTFleetWise DecoderManifest",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTFleetWise DecoderManifest",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTFleetWise::DecoderManifest",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IoTFleetWise DecoderManifest",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTFleetWise::DecoderManifest",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTFleetWise::DecoderManifest",
          identifier,
          currentState,
          desiredState,
          ["Name", "ModelManifestArn"],
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
      description: "Delete a IoTFleetWise DecoderManifest",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTFleetWise DecoderManifest",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTFleetWise::DecoderManifest",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync IoTFleetWise DecoderManifest state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTFleetWise::DecoderManifest",
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
