// Auto-generated extension model for @swamp/aws/lambda/url
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
  TargetFunctionArn: z.string().regex(
    new RegExp(
      "^(arn:(aws[a-zA-Z-]*)?:lambda:)?([a-z]{2}((-gov)|(-iso(b?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:((?!\\d+)[0-9a-zA-Z-_]+))?$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the function associated with the Function URL.",
  ),
  Qualifier: z.string().min(1).max(128).regex(
    new RegExp("((?!^[0-9]+$)([a-zA-Z0-9-_]+))"),
  ).describe(
    "The alias qualifier for the target function. If TargetFunctionArn is unqualified then Qualifier must be passed.",
  ).optional(),
  AuthType: z.enum(["AWS_IAM", "NONE"]).describe(
    "Can be either AWS_IAM if the requests are authorized via IAM, or NONE if no authorization is configured on the Function URL.",
  ),
  InvokeMode: z.enum(["BUFFERED", "RESPONSE_STREAM"]).describe(
    "The invocation mode for the function's URL. Set to BUFFERED if you want to buffer responses before returning them to the client. Set to RESPONSE_STREAM if you want to stream responses, allowing faster time to first byte and larger response payload sizes. If not set, defaults to BUFFERED.",
  ).optional(),
  Cors: z.object({
    AllowCredentials: z.boolean().describe(
      "Specifies whether credentials are included in the CORS request.",
    ).optional(),
    AllowHeaders: z.array(z.string().min(1).max(1024)).describe(
      "Represents a collection of allowed headers.",
    ).optional(),
    AllowMethods: z.array(
      z.enum(["GET", "PUT", "HEAD", "POST", "PATCH", "DELETE", "*"]),
    ).describe("Represents a collection of allowed HTTP methods.").optional(),
    AllowOrigins: z.array(z.string().min(1).max(253)).describe(
      "Represents a collection of allowed origins.",
    ).optional(),
    ExposeHeaders: z.array(z.string().min(1).max(1024)).describe(
      "Represents a collection of exposed headers.",
    ).optional(),
    MaxAge: z.number().int().min(0).max(86400).optional(),
  }).optional(),
});

const StateSchema = z.object({
  TargetFunctionArn: z.string().optional(),
  Qualifier: z.string().optional(),
  AuthType: z.string().optional(),
  InvokeMode: z.string().optional(),
  FunctionArn: z.string(),
  FunctionUrl: z.string().optional(),
  Cors: z.object({
    AllowCredentials: z.boolean(),
    AllowHeaders: z.array(z.string()),
    AllowMethods: z.array(z.string()),
    AllowOrigins: z.array(z.string()),
    ExposeHeaders: z.array(z.string()),
    MaxAge: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TargetFunctionArn: z.string().regex(
    new RegExp(
      "^(arn:(aws[a-zA-Z-]*)?:lambda:)?([a-z]{2}((-gov)|(-iso(b?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:((?!\\d+)[0-9a-zA-Z-_]+))?$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the function associated with the Function URL.",
  ).optional(),
  Qualifier: z.string().min(1).max(128).regex(
    new RegExp("((?!^[0-9]+$)([a-zA-Z0-9-_]+))"),
  ).describe(
    "The alias qualifier for the target function. If TargetFunctionArn is unqualified then Qualifier must be passed.",
  ).optional(),
  AuthType: z.enum(["AWS_IAM", "NONE"]).describe(
    "Can be either AWS_IAM if the requests are authorized via IAM, or NONE if no authorization is configured on the Function URL.",
  ).optional(),
  InvokeMode: z.enum(["BUFFERED", "RESPONSE_STREAM"]).describe(
    "The invocation mode for the function's URL. Set to BUFFERED if you want to buffer responses before returning them to the client. Set to RESPONSE_STREAM if you want to stream responses, allowing faster time to first byte and larger response payload sizes. If not set, defaults to BUFFERED.",
  ).optional(),
  Cors: z.object({
    AllowCredentials: z.boolean().describe(
      "Specifies whether credentials are included in the CORS request.",
    ).optional(),
    AllowHeaders: z.array(z.string().min(1).max(1024)).describe(
      "Represents a collection of allowed headers.",
    ).optional(),
    AllowMethods: z.array(
      z.enum(["GET", "PUT", "HEAD", "POST", "PATCH", "DELETE", "*"]),
    ).describe("Represents a collection of allowed HTTP methods.").optional(),
    AllowOrigins: z.array(z.string().min(1).max(253)).describe(
      "Represents a collection of allowed origins.",
    ).optional(),
    ExposeHeaders: z.array(z.string().min(1).max(1024)).describe(
      "Represents a collection of exposed headers.",
    ).optional(),
    MaxAge: z.number().int().min(0).max(86400).optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/aws/lambda/url",
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
      description: "Lambda Url resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda Url",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lambda::Url",
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
      description: "Get a Lambda Url",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Url",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lambda::Url",
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
      description: "Update a Lambda Url",
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
        const identifier = existing.FunctionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lambda::Url",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lambda::Url",
          identifier,
          currentState,
          desiredState,
          ["TargetFunctionArn", "Qualifier"],
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
      description: "Delete a Lambda Url",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda Url",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lambda::Url",
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
      description: "Sync Lambda Url state from AWS",
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
        const identifier = existing.FunctionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lambda::Url",
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
