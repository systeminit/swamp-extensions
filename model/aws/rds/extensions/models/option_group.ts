// Auto-generated extension model for @swamp/aws/rds/option-group
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

export const OptionSettingSchema = z.object({
  Name: z.string().describe(
    "The name of the option that has settings that you can set.",
  ).optional(),
  Value: z.string().describe("The current value of the option setting.")
    .optional(),
});

export const OptionConfigurationSchema = z.object({
  DBSecurityGroupMemberships: z.array(z.string()).describe(
    "A list of DB security groups used for this option.",
  ).optional(),
  OptionName: z.string().describe(
    "The configuration of options to include in a group.",
  ),
  OptionSettings: z.array(OptionSettingSchema).describe(
    "The option settings to include in an option group.",
  ).optional(),
  OptionVersion: z.string().describe("The version for the option.").optional(),
  Port: z.number().int().describe("The optional port for the option.")
    .optional(),
  VpcSecurityGroupMemberships: z.array(z.string()).describe(
    "A list of VPC security group names used for this option.",
  ).optional(),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A key is the required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ),
  Value: z.string().min(0).max(256).describe(
    "A value is the optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  OptionGroupName: z.string().describe(
    "The name of the option group to be created. Constraints: Must be 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a hyphen or contain two consecutive hyphens Example: myoptiongroup If you don't specify a value for OptionGroupName property, a name is automatically created for the option group. This value is stored as a lowercase string.",
  ).optional(),
  OptionGroupDescription: z.string().describe(
    "The description of the option group.",
  ),
  EngineName: z.string().describe(
    "Specifies the name of the engine that this option group should be associated with. Valid Values: mariadb mysql oracle-ee oracle-ee-cdb oracle-se2 oracle-se2-cdb postgres sqlserver-ee sqlserver-se sqlserver-ex sqlserver-web",
  ),
  MajorEngineVersion: z.string().describe(
    "Specifies the major version of the engine that this option group should be associated with.",
  ),
  OptionConfigurations: z.array(OptionConfigurationSchema).describe(
    "A list of all available options for an option group.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the option group.")
    .optional(),
});

const StateSchema = z.object({
  OptionGroupName: z.string(),
  OptionGroupDescription: z.string().optional(),
  EngineName: z.string().optional(),
  MajorEngineVersion: z.string().optional(),
  OptionConfigurations: z.array(OptionConfigurationSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  OptionGroupName: z.string().describe(
    "The name of the option group to be created. Constraints: Must be 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a hyphen or contain two consecutive hyphens Example: myoptiongroup If you don't specify a value for OptionGroupName property, a name is automatically created for the option group. This value is stored as a lowercase string.",
  ).optional(),
  OptionGroupDescription: z.string().describe(
    "The description of the option group.",
  ).optional(),
  EngineName: z.string().describe(
    "Specifies the name of the engine that this option group should be associated with. Valid Values: mariadb mysql oracle-ee oracle-ee-cdb oracle-se2 oracle-se2-cdb postgres sqlserver-ee sqlserver-se sqlserver-ex sqlserver-web",
  ).optional(),
  MajorEngineVersion: z.string().describe(
    "Specifies the major version of the engine that this option group should be associated with.",
  ).optional(),
  OptionConfigurations: z.array(OptionConfigurationSchema).describe(
    "A list of all available options for an option group.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the option group.")
    .optional(),
});

export const model = {
  type: "@swamp/aws/rds/option-group",
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
      description: "RDS OptionGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS OptionGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RDS::OptionGroup",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.OptionGroupName ?? g.OptionGroupName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a RDS OptionGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS OptionGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::RDS::OptionGroup",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.OptionGroupName ?? context.globalArgs.OptionGroupName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./,
              "_",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a RDS OptionGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.OptionGroupName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.OptionGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::OptionGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::OptionGroup",
          identifier,
          currentState,
          desiredState,
          [
            "EngineName",
            "MajorEngineVersion",
            "OptionGroupDescription",
            "OptionGroupName",
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
      description: "Delete a RDS OptionGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS OptionGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::RDS::OptionGroup",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.OptionGroupName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
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
      description: "Sync RDS OptionGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.OptionGroupName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.OptionGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::OptionGroup",
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
