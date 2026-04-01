// Auto-generated extension model for @swamp/aws/iotwireless/network-analyzer-configuration
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  Name: z.string().max(1024).regex(new RegExp("^[a-zA-Z0-9-_]+$")).describe(
    "Name of the network analyzer configuration",
  ),
  Description: z.string().max(2048).describe(
    "The description of the new resource",
  ).optional(),
  TraceContent: z.object({
    WirelessDeviceFrameInfo: z.enum(["ENABLED", "DISABLED"]).optional(),
    LogLevel: z.enum(["INFO", "ERROR", "DISABLED"]).optional(),
  }).describe(
    "Trace content for your wireless gateway and wireless device resources",
  ).optional(),
  WirelessDevices: z.array(z.string()).describe(
    "List of wireless gateway resources that have been added to the network analyzer configuration",
  ).optional(),
  WirelessGateways: z.array(z.string()).describe(
    "List of wireless gateway resources that have been added to the network analyzer configuration",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  TraceContent: z.object({
    WirelessDeviceFrameInfo: z.string(),
    LogLevel: z.string(),
  }).optional(),
  WirelessDevices: z.array(z.string()).optional(),
  WirelessGateways: z.array(z.string()).optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Name: z.string().max(1024).regex(new RegExp("^[a-zA-Z0-9-_]+$")).describe(
    "Name of the network analyzer configuration",
  ).optional(),
  Description: z.string().max(2048).describe(
    "The description of the new resource",
  ).optional(),
  TraceContent: z.object({
    WirelessDeviceFrameInfo: z.enum(["ENABLED", "DISABLED"]).optional(),
    LogLevel: z.enum(["INFO", "ERROR", "DISABLED"]).optional(),
  }).describe(
    "Trace content for your wireless gateway and wireless device resources",
  ).optional(),
  WirelessDevices: z.array(z.string()).describe(
    "List of wireless gateway resources that have been added to the network analyzer configuration",
  ).optional(),
  WirelessGateways: z.array(z.string()).describe(
    "List of wireless gateway resources that have been added to the network analyzer configuration",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotwireless/network-analyzer-configuration",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTWireless NetworkAnalyzerConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTWireless NetworkAnalyzerConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTWireless::NetworkAnalyzerConfiguration",
          desiredState,
        ) as StateData;
        const instanceName = (result.Name ?? g.Name)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoTWireless NetworkAnalyzerConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless NetworkAnalyzerConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTWireless::NetworkAnalyzerConfiguration",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a IoTWireless NetworkAnalyzerConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
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
          "AWS::IoTWireless::NetworkAnalyzerConfiguration",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTWireless::NetworkAnalyzerConfiguration",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a IoTWireless NetworkAnalyzerConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless NetworkAnalyzerConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTWireless::NetworkAnalyzerConfiguration",
          args.identifier,
        );
        const instanceName = context.globalArgs.Name?.toString() ??
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
      description:
        "Sync IoTWireless NetworkAnalyzerConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.Name?.toString() ?? "current";
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
            "AWS::IoTWireless::NetworkAnalyzerConfiguration",
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
