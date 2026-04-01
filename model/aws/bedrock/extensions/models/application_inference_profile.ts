// Auto-generated extension model for @swamp/aws/bedrock/application-inference-profile
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
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("Tag Key"),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("Tag Value"),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Description: z.string().min(1).max(200).regex(
    new RegExp("^([0-9a-zA-Z:.][ _-]?)+$"),
  ).describe("Description of the inference profile").optional(),
  InferenceProfileName: z.string().min(1).max(64).regex(
    new RegExp("^([0-9a-zA-Z][ _-]?)+$"),
  ),
  ModelSource: z.object({
    CopyFrom: z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:aws(|-us-gov|-cn|-iso|-iso-b):bedrock:(|[0-9a-z-]{0,20}):(|[0-9]{12}):(inference-profile|foundation-model)/[a-zA-Z0-9-:.]+$",
      ),
    ).describe(
      "Source arns for a custom inference profile to copy its regional load balancing config from. This can either be a foundation model or predefined inference profile ARN.",
    ).optional(),
  }).describe(
    "Various ways to encode a list of models in a CreateInferenceProfile request",
  ).optional(),
  Tags: z.array(TagSchema).describe("List of Tags").optional(),
});

const StateSchema = z.object({
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  InferenceProfileArn: z.string().optional(),
  InferenceProfileId: z.string().optional(),
  InferenceProfileIdentifier: z.string(),
  InferenceProfileName: z.string().optional(),
  ModelSource: z.object({
    CopyFrom: z.string(),
  }).optional(),
  Models: z.array(z.object({
    ModelArn: z.string(),
  })).optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Description: z.string().min(1).max(200).regex(
    new RegExp("^([0-9a-zA-Z:.][ _-]?)+$"),
  ).describe("Description of the inference profile").optional(),
  InferenceProfileName: z.string().min(1).max(64).regex(
    new RegExp("^([0-9a-zA-Z][ _-]?)+$"),
  ).optional(),
  ModelSource: z.object({
    CopyFrom: z.string().min(1).max(2048).regex(
      new RegExp(
        "^arn:aws(|-us-gov|-cn|-iso|-iso-b):bedrock:(|[0-9a-z-]{0,20}):(|[0-9]{12}):(inference-profile|foundation-model)/[a-zA-Z0-9-:.]+$",
      ),
    ).describe(
      "Source arns for a custom inference profile to copy its regional load balancing config from. This can either be a foundation model or predefined inference profile ARN.",
    ).optional(),
  }).describe(
    "Various ways to encode a list of models in a CreateInferenceProfile request",
  ).optional(),
  Tags: z.array(TagSchema).describe("List of Tags").optional(),
});

export const model = {
  type: "@swamp/aws/bedrock/application-inference-profile",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bedrock ApplicationInferenceProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock ApplicationInferenceProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Bedrock::ApplicationInferenceProfile",
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
      description: "Get a Bedrock ApplicationInferenceProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock ApplicationInferenceProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Bedrock::ApplicationInferenceProfile",
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
      description: "Update a Bedrock ApplicationInferenceProfile",
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
        const identifier = existing.InferenceProfileIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Bedrock::ApplicationInferenceProfile",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Bedrock::ApplicationInferenceProfile",
          identifier,
          currentState,
          desiredState,
          ["Description", "InferenceProfileName", "ModelSource"],
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
      description: "Delete a Bedrock ApplicationInferenceProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock ApplicationInferenceProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Bedrock::ApplicationInferenceProfile",
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
      description: "Sync Bedrock ApplicationInferenceProfile state from AWS",
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
        const identifier = existing.InferenceProfileIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Bedrock::ApplicationInferenceProfile",
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
