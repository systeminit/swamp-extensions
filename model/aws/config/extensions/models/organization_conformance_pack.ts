// Auto-generated extension model for @swamp/aws/config/organization-conformance-pack
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

export const ConformancePackInputParameterSchema = z.object({
  ParameterName: z.string().min(0).max(255),
  ParameterValue: z.string().min(0).max(4096),
});

const GlobalArgsSchema = z.object({
  OrganizationConformancePackName: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z][-a-zA-Z0-9]*"),
  ).describe("The name of the organization conformance pack."),
  TemplateS3Uri: z.string().min(1).max(1024).regex(new RegExp("s3://.*"))
    .describe("Location of file containing the template body.").optional(),
  TemplateBody: z.string().min(1).max(51200).describe(
    "A string containing full conformance pack template body.",
  ).optional(),
  DeliveryS3Bucket: z.string().min(0).max(63).describe(
    "AWS Config stores intermediate files while processing conformance pack template.",
  ).optional(),
  DeliveryS3KeyPrefix: z.string().min(0).max(1024).describe(
    "The prefix for the delivery S3 bucket.",
  ).optional(),
  ConformancePackInputParameters: z.array(ConformancePackInputParameterSchema)
    .describe("A list of ConformancePackInputParameter objects.").optional(),
  ExcludedAccounts: z.array(z.string()).describe(
    "A list of AWS accounts to be excluded from an organization conformance pack while deploying a conformance pack.",
  ).optional(),
});

const StateSchema = z.object({
  OrganizationConformancePackName: z.string(),
  TemplateS3Uri: z.string().optional(),
  TemplateBody: z.string().optional(),
  DeliveryS3Bucket: z.string().optional(),
  DeliveryS3KeyPrefix: z.string().optional(),
  ConformancePackInputParameters: z.array(ConformancePackInputParameterSchema)
    .optional(),
  ExcludedAccounts: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  OrganizationConformancePackName: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z][-a-zA-Z0-9]*"),
  ).describe("The name of the organization conformance pack.").optional(),
  TemplateS3Uri: z.string().min(1).max(1024).regex(new RegExp("s3://.*"))
    .describe("Location of file containing the template body.").optional(),
  TemplateBody: z.string().min(1).max(51200).describe(
    "A string containing full conformance pack template body.",
  ).optional(),
  DeliveryS3Bucket: z.string().min(0).max(63).describe(
    "AWS Config stores intermediate files while processing conformance pack template.",
  ).optional(),
  DeliveryS3KeyPrefix: z.string().min(0).max(1024).describe(
    "The prefix for the delivery S3 bucket.",
  ).optional(),
  ConformancePackInputParameters: z.array(ConformancePackInputParameterSchema)
    .describe("A list of ConformancePackInputParameter objects.").optional(),
  ExcludedAccounts: z.array(z.string()).describe(
    "A list of AWS accounts to be excluded from an organization conformance pack while deploying a conformance pack.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/config/organization-conformance-pack",
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
      description: "Config OrganizationConformancePack resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Config OrganizationConformancePack",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Config::OrganizationConformancePack",
          desiredState,
        ) as StateData;
        const instanceName = ((result.OrganizationConformancePackName ??
          g.OrganizationConformancePackName)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Config OrganizationConformancePack",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Config OrganizationConformancePack",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Config::OrganizationConformancePack",
          args.identifier,
        ) as StateData;
        const instanceName = ((result.OrganizationConformancePackName ??
          context.globalArgs.OrganizationConformancePackName)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
          .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Config OrganizationConformancePack",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName =
          (g.OrganizationConformancePackName?.toString() ?? "current").replace(
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
        const identifier = existing.OrganizationConformancePackName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Config::OrganizationConformancePack",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Config::OrganizationConformancePack",
          identifier,
          currentState,
          desiredState,
          ["OrganizationConformancePackName"],
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
      description: "Delete a Config OrganizationConformancePack",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Config OrganizationConformancePack",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Config::OrganizationConformancePack",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.OrganizationConformancePackName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync Config OrganizationConformancePack state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName =
          (g.OrganizationConformancePackName?.toString() ?? "current").replace(
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
        const identifier = existing.OrganizationConformancePackName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Config::OrganizationConformancePack",
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
