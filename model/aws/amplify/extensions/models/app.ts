// Auto-generated extension model for @swamp/aws/amplify/app
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

export const BasicAuthConfigSchema = z.object({
  EnableBasicAuth: z.boolean().optional(),
  Username: z.string().min(1).max(255).optional(),
  Password: z.string().min(1).max(255).optional(),
});

export const EnvironmentVariableSchema = z.object({
  Name: z.string().max(255).regex(new RegExp(".*", "s")),
  Value: z.string().max(5500).regex(new RegExp(".*", "s")),
});

export const CustomRuleSchema = z.object({
  Condition: z.string().min(0).max(2048).regex(new RegExp(".*", "s"))
    .optional(),
  Status: z.string().min(3).max(7).regex(new RegExp(".{3,7}")).optional(),
  Target: z.string().min(1).max(2048).regex(new RegExp(".+", "s")),
  Source: z.string().min(1).max(2048).regex(new RegExp(".+", "s")),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AccessToken: z.string().min(1).max(255).optional(),
  AutoBranchCreationConfig: z.object({
    AutoBranchCreationPatterns: z.array(z.string().min(1).max(2048)).optional(),
    BasicAuthConfig: BasicAuthConfigSchema.optional(),
    BuildSpec: z.string().min(1).max(25000).optional(),
    EnableAutoBranchCreation: z.boolean().optional(),
    EnableAutoBuild: z.boolean().optional(),
    EnablePerformanceMode: z.boolean().optional(),
    EnablePullRequestPreview: z.boolean().optional(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
    Framework: z.string().max(255).regex(new RegExp(".*", "s")).optional(),
    PullRequestEnvironmentName: z.string().max(20).regex(new RegExp(".*", "s"))
      .optional(),
    Stage: z.enum([
      "EXPERIMENTAL",
      "BETA",
      "PULL_REQUEST",
      "PRODUCTION",
      "DEVELOPMENT",
    ]).optional(),
  }).optional(),
  BasicAuthConfig: z.object({
    EnableBasicAuth: z.boolean().optional(),
    Username: z.string().min(1).max(255).optional(),
    Password: z.string().min(1).max(255).optional(),
  }).optional(),
  BuildSpec: z.string().min(1).max(25000).regex(new RegExp(".+", "s"))
    .optional(),
  CacheConfig: z.object({
    Type: z.enum(["AMPLIFY_MANAGED", "AMPLIFY_MANAGED_NO_COOKIES"]).optional(),
  }).optional(),
  ComputeRoleArn: z.string().min(0).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  CustomHeaders: z.string().min(0).max(25000).regex(new RegExp(".*", "s"))
    .optional(),
  CustomRules: z.array(CustomRuleSchema).optional(),
  Description: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  EnableBranchAutoDeletion: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  IAMServiceRole: z.string().min(1).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  Name: z.string().min(1).max(255).regex(new RegExp(".+", "s")),
  OauthToken: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  Platform: z.enum(["WEB", "WEB_DYNAMIC", "WEB_COMPUTE"]).optional(),
  Repository: z.string().regex(new RegExp(".*", "s")).optional(),
  Tags: z.array(TagSchema).optional(),
  JobConfig: z.object({
    BuildComputeType: z.enum(["STANDARD_8GB", "LARGE_16GB", "XLARGE_72GB"]),
  }).optional(),
});

const StateSchema = z.object({
  AccessToken: z.string().optional(),
  AppId: z.string().optional(),
  AppName: z.string().optional(),
  Arn: z.string(),
  AutoBranchCreationConfig: z.object({
    AutoBranchCreationPatterns: z.array(z.string()),
    BasicAuthConfig: BasicAuthConfigSchema,
    BuildSpec: z.string(),
    EnableAutoBranchCreation: z.boolean(),
    EnableAutoBuild: z.boolean(),
    EnablePerformanceMode: z.boolean(),
    EnablePullRequestPreview: z.boolean(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema),
    Framework: z.string(),
    PullRequestEnvironmentName: z.string(),
    Stage: z.string(),
  }).optional(),
  BasicAuthConfig: BasicAuthConfigSchema.optional(),
  BuildSpec: z.string().optional(),
  CacheConfig: z.object({
    Type: z.string(),
  }).optional(),
  ComputeRoleArn: z.string().optional(),
  CustomHeaders: z.string().optional(),
  CustomRules: z.array(CustomRuleSchema).optional(),
  DefaultDomain: z.string().optional(),
  Description: z.string().optional(),
  EnableBranchAutoDeletion: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  IAMServiceRole: z.string().optional(),
  Name: z.string().optional(),
  OauthToken: z.string().optional(),
  Platform: z.string().optional(),
  Repository: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  JobConfig: z.object({
    BuildComputeType: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AccessToken: z.string().min(1).max(255).optional(),
  AutoBranchCreationConfig: z.object({
    AutoBranchCreationPatterns: z.array(z.string().min(1).max(2048)).optional(),
    BasicAuthConfig: BasicAuthConfigSchema.optional(),
    BuildSpec: z.string().min(1).max(25000).optional(),
    EnableAutoBranchCreation: z.boolean().optional(),
    EnableAutoBuild: z.boolean().optional(),
    EnablePerformanceMode: z.boolean().optional(),
    EnablePullRequestPreview: z.boolean().optional(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
    Framework: z.string().max(255).regex(new RegExp(".*", "s")).optional(),
    PullRequestEnvironmentName: z.string().max(20).regex(new RegExp(".*", "s"))
      .optional(),
    Stage: z.enum([
      "EXPERIMENTAL",
      "BETA",
      "PULL_REQUEST",
      "PRODUCTION",
      "DEVELOPMENT",
    ]).optional(),
  }).optional(),
  BasicAuthConfig: z.object({
    EnableBasicAuth: z.boolean().optional(),
    Username: z.string().min(1).max(255).optional(),
    Password: z.string().min(1).max(255).optional(),
  }).optional(),
  BuildSpec: z.string().min(1).max(25000).regex(new RegExp(".+", "s"))
    .optional(),
  CacheConfig: z.object({
    Type: z.enum(["AMPLIFY_MANAGED", "AMPLIFY_MANAGED_NO_COOKIES"]).optional(),
  }).optional(),
  ComputeRoleArn: z.string().min(0).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  CustomHeaders: z.string().min(0).max(25000).regex(new RegExp(".*", "s"))
    .optional(),
  CustomRules: z.array(CustomRuleSchema).optional(),
  Description: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  EnableBranchAutoDeletion: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  IAMServiceRole: z.string().min(1).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  Name: z.string().min(1).max(255).regex(new RegExp(".+", "s")).optional(),
  OauthToken: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  Platform: z.enum(["WEB", "WEB_DYNAMIC", "WEB_COMPUTE"]).optional(),
  Repository: z.string().regex(new RegExp(".*", "s")).optional(),
  Tags: z.array(TagSchema).optional(),
  JobConfig: z.object({
    BuildComputeType: z.enum(["STANDARD_8GB", "LARGE_16GB", "XLARGE_72GB"])
      .optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/amplify/app",
  version: "2026.04.03.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Amplify App resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Amplify App",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Amplify::App",
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
      description: "Get a Amplify App",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Amplify App",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Amplify::App",
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
      description: "Update a Amplify App",
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
          "AWS::Amplify::App",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Amplify::App",
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
      description: "Delete a Amplify App",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Amplify App",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Amplify::App",
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
      description: "Sync Amplify App state from AWS",
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
            "AWS::Amplify::App",
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
