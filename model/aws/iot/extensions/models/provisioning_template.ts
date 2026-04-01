// Auto-generated extension model for @swamp/aws/iot/provisioning-template
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
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  TemplateName: z.string().min(1).max(36).regex(new RegExp("^[0-9A-Za-z_-]+$"))
    .optional(),
  Description: z.string().max(500).optional(),
  Enabled: z.boolean().optional(),
  ProvisioningRoleArn: z.string(),
  TemplateBody: z.string(),
  TemplateType: z.enum(["FLEET_PROVISIONING", "JITP"]).optional(),
  PreProvisioningHook: z.object({
    TargetArn: z.string().optional(),
    PayloadVersion: z.string().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  TemplateArn: z.string().optional(),
  TemplateName: z.string(),
  Description: z.string().optional(),
  Enabled: z.boolean().optional(),
  ProvisioningRoleArn: z.string().optional(),
  TemplateBody: z.string().optional(),
  TemplateType: z.string().optional(),
  PreProvisioningHook: z.object({
    TargetArn: z.string(),
    PayloadVersion: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  TemplateName: z.string().min(1).max(36).regex(new RegExp("^[0-9A-Za-z_-]+$"))
    .optional(),
  Description: z.string().max(500).optional(),
  Enabled: z.boolean().optional(),
  ProvisioningRoleArn: z.string().optional(),
  TemplateBody: z.string().optional(),
  TemplateType: z.enum(["FLEET_PROVISIONING", "JITP"]).optional(),
  PreProvisioningHook: z.object({
    TargetArn: z.string().optional(),
    PayloadVersion: z.string().optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/iot/provisioning-template",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoT ProvisioningTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT ProvisioningTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoT::ProvisioningTemplate",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.TemplateName ?? g.TemplateName)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoT ProvisioningTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT ProvisioningTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoT::ProvisioningTemplate",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.TemplateName ?? context.globalArgs.TemplateName)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IoT ProvisioningTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.TemplateName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TemplateName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::ProvisioningTemplate",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::ProvisioningTemplate",
          identifier,
          currentState,
          desiredState,
          ["TemplateName", "TemplateType"],
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
      description: "Delete a IoT ProvisioningTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT ProvisioningTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoT::ProvisioningTemplate",
          args.identifier,
        );
        const instanceName = context.globalArgs.TemplateName?.toString() ??
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
      description: "Sync IoT ProvisioningTemplate state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.TemplateName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.TemplateName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::ProvisioningTemplate",
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
