// Auto-generated extension model for @swamp/aws/panorama/application-instance
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Panorama ApplicationInstance (AWS::Panorama::ApplicationInstance).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

const TagSchema = z.object({
  Value: z.string().min(0).max(256).regex(new RegExp("^.+$")),
  Key: z.string().min(1).max(128).regex(new RegExp("^.+$")),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DefaultRuntimeContextDevice: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\-\\_]+$"),
  ).describe("The device's ID."),
  Description: z.string().min(0).max(255).regex(new RegExp("^.*$")).describe(
    "A description for the application instance.",
  ).optional(),
  ApplicationInstanceIdToReplace: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\-\\_]+$"),
  ).describe(
    "The ID of an application instance to replace with the new instance.",
  ).optional(),
  ManifestOverridesPayload: z.object({
    PayloadData: z.string().min(0).max(51200).regex(new RegExp("^.+$"))
      .describe("The overrides document.").optional(),
  }).describe("Setting overrides for the application manifest.").optional(),
  RuntimeRoleArn: z.string().min(1).max(255).regex(
    new RegExp("^arn:[a-z0-9][-.a-z0-9]{0,62}:iam::[0-9]{12}:role/.+$"),
  ).describe("The ARN of a runtime role for the application instance.")
    .optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\-\\_]+$"))
    .describe("A name for the application instance.").optional(),
  ManifestPayload: z.object({
    PayloadData: z.string().min(1).max(51200).regex(new RegExp("^.+$"))
      .describe("The application manifest.").optional(),
  }).describe("The application's manifest document."),
  Tags: z.array(TagSchema).describe("Tags for the application instance.")
    .optional(),
});

const StateSchema = z.object({
  DefaultRuntimeContextDeviceName: z.string().optional(),
  Status: z.string().optional(),
  DefaultRuntimeContextDevice: z.string().optional(),
  Description: z.string().optional(),
  ApplicationInstanceIdToReplace: z.string().optional(),
  CreatedTime: z.number().optional(),
  HealthStatus: z.string().optional(),
  ManifestOverridesPayload: z.object({
    PayloadData: z.string(),
  }).optional(),
  LastUpdatedTime: z.number().optional(),
  RuntimeRoleArn: z.string().optional(),
  Name: z.string().optional(),
  ApplicationInstanceId: z.string(),
  StatusDescription: z.string().optional(),
  ManifestPayload: z.object({
    PayloadData: z.string(),
  }).optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DefaultRuntimeContextDevice: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\-\\_]+$"),
  ).describe("The device's ID.").optional(),
  Description: z.string().min(0).max(255).regex(new RegExp("^.*$")).describe(
    "A description for the application instance.",
  ).optional(),
  ApplicationInstanceIdToReplace: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\-\\_]+$"),
  ).describe(
    "The ID of an application instance to replace with the new instance.",
  ).optional(),
  ManifestOverridesPayload: z.object({
    PayloadData: z.string().min(0).max(51200).regex(new RegExp("^.+$"))
      .describe("The overrides document.").optional(),
  }).describe("Setting overrides for the application manifest.").optional(),
  RuntimeRoleArn: z.string().min(1).max(255).regex(
    new RegExp("^arn:[a-z0-9][-.a-z0-9]{0,62}:iam::[0-9]{12}:role/.+$"),
  ).describe("The ARN of a runtime role for the application instance.")
    .optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\-\\_]+$"))
    .describe("A name for the application instance.").optional(),
  ManifestPayload: z.object({
    PayloadData: z.string().min(1).max(51200).regex(new RegExp("^.+$"))
      .describe("The application manifest.").optional(),
  }).describe("The application's manifest document.").optional(),
  Tags: z.array(TagSchema).describe("Tags for the application instance.")
    .optional(),
});

/** Swamp extension model for Panorama ApplicationInstance. Registered at `@swamp/aws/panorama/application-instance`. */
export const model = {
  type: "@swamp/aws/panorama/application-instance",
  version: "2026.04.23.2",
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
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Panorama ApplicationInstance resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Panorama ApplicationInstance",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Panorama::ApplicationInstance",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Panorama ApplicationInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Panorama ApplicationInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Panorama::ApplicationInstance",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Panorama ApplicationInstance",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ApplicationInstanceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Panorama::ApplicationInstance",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Panorama::ApplicationInstance",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "Description",
            "ManifestPayload",
            "ManifestOverridesPayload",
            "RuntimeRoleArn",
            "DefaultRuntimeContextDevice",
            "ApplicationInstanceIdToReplace",
          ],
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
      description: "Delete a Panorama ApplicationInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Panorama ApplicationInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Panorama::ApplicationInstance",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Panorama ApplicationInstance state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ApplicationInstanceId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Panorama::ApplicationInstance",
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
