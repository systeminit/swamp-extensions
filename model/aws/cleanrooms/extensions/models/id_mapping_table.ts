// Auto-generated extension model for @swamp/aws/cleanrooms/id-mapping-table
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

export const IdMappingTableInputSourceSchema = z.object({
  IdNamespaceAssociationId: z.string(),
  Type: z.enum(["SOURCE", "TARGET"]),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  InputReferenceConfig: z.object({
    InputReferenceArn: z.string().min(20).max(2048),
    ManageResourcePolicies: z.boolean(),
  }),
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  Name: z.string().max(128).regex(
    new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
  ),
  InputReferenceProperties: z.object({
    IdMappingTableInputSource: z.array(IdMappingTableInputSourceSchema),
  }).optional(),
  KmsKeyArn: z.string().min(4).max(2048).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  IdMappingTableIdentifier: z.string(),
  Arn: z.string().optional(),
  InputReferenceConfig: z.object({
    InputReferenceArn: z.string(),
    ManageResourcePolicies: z.boolean(),
  }).optional(),
  MembershipIdentifier: z.string(),
  MembershipArn: z.string().optional(),
  CollaborationIdentifier: z.string().optional(),
  CollaborationArn: z.string().optional(),
  Description: z.string().optional(),
  Name: z.string().optional(),
  InputReferenceProperties: z.object({
    IdMappingTableInputSource: z.array(IdMappingTableInputSourceSchema),
  }).optional(),
  KmsKeyArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  InputReferenceConfig: z.object({
    InputReferenceArn: z.string().min(20).max(2048).optional(),
    ManageResourcePolicies: z.boolean().optional(),
  }).optional(),
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp(
      "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).optional(),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  Name: z.string().max(128).regex(
    new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
  ).optional(),
  InputReferenceProperties: z.object({
    IdMappingTableInputSource: z.array(IdMappingTableInputSourceSchema)
      .optional(),
  }).optional(),
  KmsKeyArn: z.string().min(4).max(2048).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/cleanrooms/id-mapping-table",
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
      description: "CleanRooms IdMappingTable resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CleanRooms IdMappingTable",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CleanRooms::IdMappingTable",
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
      description: "Get a CleanRooms IdMappingTable",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms IdMappingTable",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CleanRooms::IdMappingTable",
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
      description: "Update a CleanRooms IdMappingTable",
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
        const idParts = [
          existing.IdMappingTableIdentifier?.toString(),
          existing.MembershipIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CleanRooms::IdMappingTable",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CleanRooms::IdMappingTable",
          identifier,
          currentState,
          desiredState,
          ["MembershipIdentifier", "Name", "InputReferenceConfig"],
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
      description: "Delete a CleanRooms IdMappingTable",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms IdMappingTable",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CleanRooms::IdMappingTable",
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
      description: "Sync CleanRooms IdMappingTable state from AWS",
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
        const idParts = [
          existing.IdMappingTableIdentifier?.toString(),
          existing.MembershipIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CleanRooms::IdMappingTable",
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
