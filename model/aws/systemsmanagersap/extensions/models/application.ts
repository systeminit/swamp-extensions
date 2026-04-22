// Auto-generated extension model for @swamp/aws/systemsmanagersap/application
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SystemsManagerSAP Application (AWS::SystemsManagerSAP::Application).
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

const CredentialSchema = z.object({
  DatabaseName: z.string().regex(new RegExp("^(?=.{1,100}$).*")).optional(),
  CredentialType: z.enum(["ADMIN"]).optional(),
  SecretId: z.string().regex(new RegExp("^(?=.{1,100}$).*")).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const ComponentInfoSchema = z.object({
  ComponentType: z.enum([
    "HANA",
    "HANA_NODE",
    "ABAP",
    "ASCS",
    "DIALOG",
    "WEBDISP",
    "WD",
    "ERS",
  ]).optional(),
  Ec2InstanceId: z.string().regex(
    new RegExp("^i-[\\w\\d]{8}$|^i-[\\w\\d]{17}$"),
  ).optional(),
  Sid: z.string().regex(new RegExp("[A-Z][A-Z0-9]{2}")).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ApplicationId: z.string().regex(new RegExp("[\\w\\d\\.-]{1,60}")),
  ApplicationType: z.enum(["HANA", "SAP_ABAP"]),
  Credentials: z.array(CredentialSchema).optional(),
  Instances: z.array(
    z.string().regex(new RegExp("^i-[\\w\\d]{8}$|^i-[\\w\\d]{17}$")),
  ).optional(),
  SapInstanceNumber: z.string().regex(new RegExp("[0-9]{2}")).optional(),
  Sid: z.string().regex(new RegExp("[A-Z][A-Z0-9]{2}")).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags of a SystemsManagerSAP application.",
  ).optional(),
  DatabaseArn: z.string().regex(
    new RegExp("^arn:(.+:){2,4}.+$|^arn:(.+:){1,3}.+\\/.+$"),
  ).describe("The ARN of the SAP HANA database").optional(),
  ComponentsInfo: z.array(ComponentInfoSchema).describe(
    "This is an optional parameter for component details to which the SAP ABAP application is attached, such as Web Dispatcher.",
  ).optional(),
});

const StateSchema = z.object({
  ApplicationId: z.string().optional(),
  ApplicationType: z.string().optional(),
  Arn: z.string(),
  Credentials: z.array(CredentialSchema).optional(),
  Instances: z.array(z.string()).optional(),
  SapInstanceNumber: z.string().optional(),
  Sid: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  DatabaseArn: z.string().optional(),
  ComponentsInfo: z.array(ComponentInfoSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ApplicationId: z.string().regex(new RegExp("[\\w\\d\\.-]{1,60}")).optional(),
  ApplicationType: z.enum(["HANA", "SAP_ABAP"]).optional(),
  Credentials: z.array(CredentialSchema).optional(),
  Instances: z.array(
    z.string().regex(new RegExp("^i-[\\w\\d]{8}$|^i-[\\w\\d]{17}$")),
  ).optional(),
  SapInstanceNumber: z.string().regex(new RegExp("[0-9]{2}")).optional(),
  Sid: z.string().regex(new RegExp("[A-Z][A-Z0-9]{2}")).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags of a SystemsManagerSAP application.",
  ).optional(),
  DatabaseArn: z.string().regex(
    new RegExp("^arn:(.+:){2,4}.+$|^arn:(.+:){1,3}.+\\/.+$"),
  ).describe("The ARN of the SAP HANA database").optional(),
  ComponentsInfo: z.array(ComponentInfoSchema).describe(
    "This is an optional parameter for component details to which the SAP ABAP application is attached, such as Web Dispatcher.",
  ).optional(),
});

/** Swamp extension model for SystemsManagerSAP Application. Registered at `@swamp/aws/systemsmanagersap/application`. */
export const model = {
  type: "@swamp/aws/systemsmanagersap/application",
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
      description: "SystemsManagerSAP Application resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SystemsManagerSAP Application",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SystemsManagerSAP::Application",
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
      description: "Get a SystemsManagerSAP Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SystemsManagerSAP Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SystemsManagerSAP::Application",
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
      description: "Update a SystemsManagerSAP Application",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SystemsManagerSAP::Application",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SystemsManagerSAP::Application",
          identifier,
          currentState,
          desiredState,
          [
            "Credentials",
            "Instances",
            "SapInstanceNumber",
            "Sid",
            "DatabaseArn",
            "ComponentsInfo",
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
      description: "Delete a SystemsManagerSAP Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SystemsManagerSAP Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SystemsManagerSAP::Application",
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
      description: "Sync SystemsManagerSAP Application state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SystemsManagerSAP::Application",
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
