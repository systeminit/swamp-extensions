// Auto-generated extension model for @swamp/aws/apigateway/documentation-part
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Location: z.object({
    Method: z.string().optional(),
    Name: z.string().optional(),
    Path: z.string().optional(),
    StatusCode: z.string().optional(),
    Type: z.enum([
      "API",
      "AUTHORIZER",
      "MODEL",
      "RESOURCE",
      "METHOD",
      "PATH_PARAMETER",
      "QUERY_PARAMETER",
      "REQUEST_HEADER",
      "REQUEST_BODY",
      "RESPONSE",
      "RESPONSE_HEADER",
      "RESPONSE_BODY",
    ]).optional(),
  }),
  Properties: z.string(),
  RestApiId: z.string(),
});

const StateSchema = z.object({
  DocumentationPartId: z.string(),
  Location: z.object({
    Method: z.string(),
    Name: z.string(),
    Path: z.string(),
    StatusCode: z.string(),
    Type: z.string(),
  }).optional(),
  Properties: z.string().optional(),
  RestApiId: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Location: z.object({
    Method: z.string().optional(),
    Name: z.string().optional(),
    Path: z.string().optional(),
    StatusCode: z.string().optional(),
    Type: z.enum([
      "API",
      "AUTHORIZER",
      "MODEL",
      "RESOURCE",
      "METHOD",
      "PATH_PARAMETER",
      "QUERY_PARAMETER",
      "REQUEST_HEADER",
      "REQUEST_BODY",
      "RESPONSE",
      "RESPONSE_HEADER",
      "RESPONSE_BODY",
    ]).optional(),
  }).optional(),
  Properties: z.string().optional(),
  RestApiId: z.string().optional(),
});

export const model = {
  type: "@swamp/aws/apigateway/documentation-part",
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
      description: "ApiGateway DocumentationPart resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGateway DocumentationPart",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ApiGateway::DocumentationPart",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ApiGateway DocumentationPart",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway DocumentationPart",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ApiGateway::DocumentationPart",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ApiGateway DocumentationPart",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
        const idParts = [
          existing.DocumentationPartId?.toString(),
          existing.RestApiId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::ApiGateway::DocumentationPart",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ApiGateway::DocumentationPart",
          identifier,
          currentState,
          desiredState,
          ["Location", "RestApiId"],
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
      description: "Delete a ApiGateway DocumentationPart",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway DocumentationPart",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ApiGateway::DocumentationPart",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync ApiGateway DocumentationPart state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
        const idParts = [
          existing.DocumentationPartId?.toString(),
          existing.RestApiId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ApiGateway::DocumentationPart",
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
