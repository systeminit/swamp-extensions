// Auto-generated extension model for @swamp/aws/appsync/resolver
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

export const LambdaConflictHandlerConfigSchema = z.object({
  LambdaConflictHandlerArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the Lambda function to use as the Conflict Handler.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ApiId: z.string().describe(
    "The APSYlong GraphQL API to which you want to attach this resolver.",
  ),
  CachingConfig: z.object({
    CachingKeys: z.array(z.string()).describe(
      "The caching keys for a resolver that has caching activated. Valid values are entries from the $context.arguments, $context.source, and $context.identity maps.",
    ).optional(),
    Ttl: z.number().describe(
      "The TTL in seconds for a resolver that has caching activated. Valid values are 1–3,600 seconds.",
    ),
  }).describe("The caching configuration for the resolver.").optional(),
  Code: z.string().describe(
    "The resolver code that contains the request and response functions. When code is used, the runtime is required. The runtime value must be APPSYNC_JS.",
  ).optional(),
  CodeS3Location: z.string().describe("The Amazon S3 endpoint.").optional(),
  DataSourceName: z.string().describe("The resolver data source name.")
    .optional(),
  FieldName: z.string().describe(
    "The GraphQL field on a type that invokes the resolver.",
  ),
  Kind: z.string().describe(
    "The resolver type. *UNIT*: A UNIT resolver type. A UNIT resolver is the default resolver type. You can use a UNIT resolver to run a GraphQL query against a single data source. *PIPELINE*: A PIPELINE resolver type. You can use a PIPELINE resolver to invoke a series of Function objects in a serial manner. You can use a pipeline resolver to run a GraphQL query against multiple data sources.",
  ).optional(),
  MaxBatchSize: z.number().int().describe(
    "The maximum number of resolver request inputs that will be sent to a single LAMlong function in a BatchInvoke operation.",
  ).optional(),
  PipelineConfig: z.object({
    Functions: z.array(z.string()).describe("A list of Function objects.")
      .optional(),
  }).describe("Functions linked with the pipeline resolver.").optional(),
  RequestMappingTemplate: z.string().describe(
    "The request mapping template. Request mapping templates are optional when using a Lambda data source. For all other data sources, a request mapping template is required.",
  ).optional(),
  RequestMappingTemplateS3Location: z.string().describe(
    "The location of a request mapping template in an S3 bucket. Use this if you want to provision with a template file in S3 rather than embedding it in your CFNshort template.",
  ).optional(),
  ResponseMappingTemplate: z.string().describe("The response mapping template.")
    .optional(),
  ResponseMappingTemplateS3Location: z.string().describe(
    "The location of a response mapping template in an S3 bucket. Use this if you want to provision with a template file in S3 rather than embedding it in your CFNshort template.",
  ).optional(),
  Runtime: z.object({
    RuntimeVersion: z.string().describe(
      "The version of the runtime to use. Currently, the only allowed version is 1.0.0.",
    ),
    Name: z.string().describe(
      "The name of the runtime to use. Currently, the only allowed value is APPSYNC_JS.",
    ),
  }).describe(
    "Describes a runtime used by an APSYlong resolver or APSYlong function. Specifies the name and version of the runtime to use. Note that if a runtime is specified, code must also be specified.",
  ).optional(),
  SyncConfig: z.object({
    ConflictHandler: z.string().describe(
      "The Conflict Resolution strategy to perform in the event of a conflict. *OPTIMISTIC_CONCURRENCY*: Resolve conflicts by rejecting mutations when versions don't match the latest version at the server. *AUTOMERGE*: Resolve conflicts with the Automerge conflict resolution strategy. *LAMBDA*: Resolve conflicts with an LAMlong function supplied in the LambdaConflictHandlerConfig.",
    ).optional(),
    ConflictDetection: z.string().describe(
      "The Conflict Detection strategy to use. *VERSION*: Detect conflicts based on object versions for this resolver. *NONE*: Do not detect conflicts when invoking this resolver.",
    ),
    LambdaConflictHandlerConfig: LambdaConflictHandlerConfigSchema.describe(
      "The LambdaConflictHandlerConfig when configuring LAMBDA as the Conflict Handler.",
    ).optional(),
  }).describe(
    "The SyncConfig for a resolver attached to a versioned data source.",
  ).optional(),
  TypeName: z.string().describe("The GraphQL type that invokes this resolver."),
  MetricsConfig: z.enum(["ENABLED", "DISABLED"]).describe(
    "Enables or disables enhanced resolver metrics for specified resolvers. Note that MetricsConfig won't be used unless the resolverLevelMetricsBehavior value is set to PER_RESOLVER_METRICS. If the resolverLevelMetricsBehavior is set to FULL_REQUEST_RESOLVER_METRICS instead, MetricsConfig will be ignored. However, you can still set its value.",
  ).optional(),
});

const StateSchema = z.object({
  ApiId: z.string().optional(),
  CachingConfig: z.object({
    CachingKeys: z.array(z.string()),
    Ttl: z.number(),
  }).optional(),
  Code: z.string().optional(),
  CodeS3Location: z.string().optional(),
  DataSourceName: z.string().optional(),
  FieldName: z.string().optional(),
  Kind: z.string().optional(),
  MaxBatchSize: z.number().optional(),
  PipelineConfig: z.object({
    Functions: z.array(z.string()),
  }).optional(),
  RequestMappingTemplate: z.string().optional(),
  RequestMappingTemplateS3Location: z.string().optional(),
  ResolverArn: z.string(),
  ResponseMappingTemplate: z.string().optional(),
  ResponseMappingTemplateS3Location: z.string().optional(),
  Runtime: z.object({
    RuntimeVersion: z.string(),
    Name: z.string(),
  }).optional(),
  SyncConfig: z.object({
    ConflictHandler: z.string(),
    ConflictDetection: z.string(),
    LambdaConflictHandlerConfig: LambdaConflictHandlerConfigSchema,
  }).optional(),
  TypeName: z.string().optional(),
  MetricsConfig: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ApiId: z.string().describe(
    "The APSYlong GraphQL API to which you want to attach this resolver.",
  ).optional(),
  CachingConfig: z.object({
    CachingKeys: z.array(z.string()).describe(
      "The caching keys for a resolver that has caching activated. Valid values are entries from the $context.arguments, $context.source, and $context.identity maps.",
    ).optional(),
    Ttl: z.number().describe(
      "The TTL in seconds for a resolver that has caching activated. Valid values are 1–3,600 seconds.",
    ).optional(),
  }).describe("The caching configuration for the resolver.").optional(),
  Code: z.string().describe(
    "The resolver code that contains the request and response functions. When code is used, the runtime is required. The runtime value must be APPSYNC_JS.",
  ).optional(),
  CodeS3Location: z.string().describe("The Amazon S3 endpoint.").optional(),
  DataSourceName: z.string().describe("The resolver data source name.")
    .optional(),
  FieldName: z.string().describe(
    "The GraphQL field on a type that invokes the resolver.",
  ).optional(),
  Kind: z.string().describe(
    "The resolver type. *UNIT*: A UNIT resolver type. A UNIT resolver is the default resolver type. You can use a UNIT resolver to run a GraphQL query against a single data source. *PIPELINE*: A PIPELINE resolver type. You can use a PIPELINE resolver to invoke a series of Function objects in a serial manner. You can use a pipeline resolver to run a GraphQL query against multiple data sources.",
  ).optional(),
  MaxBatchSize: z.number().int().describe(
    "The maximum number of resolver request inputs that will be sent to a single LAMlong function in a BatchInvoke operation.",
  ).optional(),
  PipelineConfig: z.object({
    Functions: z.array(z.string()).describe("A list of Function objects.")
      .optional(),
  }).describe("Functions linked with the pipeline resolver.").optional(),
  RequestMappingTemplate: z.string().describe(
    "The request mapping template. Request mapping templates are optional when using a Lambda data source. For all other data sources, a request mapping template is required.",
  ).optional(),
  RequestMappingTemplateS3Location: z.string().describe(
    "The location of a request mapping template in an S3 bucket. Use this if you want to provision with a template file in S3 rather than embedding it in your CFNshort template.",
  ).optional(),
  ResponseMappingTemplate: z.string().describe("The response mapping template.")
    .optional(),
  ResponseMappingTemplateS3Location: z.string().describe(
    "The location of a response mapping template in an S3 bucket. Use this if you want to provision with a template file in S3 rather than embedding it in your CFNshort template.",
  ).optional(),
  Runtime: z.object({
    RuntimeVersion: z.string().describe(
      "The version of the runtime to use. Currently, the only allowed version is 1.0.0.",
    ).optional(),
    Name: z.string().describe(
      "The name of the runtime to use. Currently, the only allowed value is APPSYNC_JS.",
    ).optional(),
  }).describe(
    "Describes a runtime used by an APSYlong resolver or APSYlong function. Specifies the name and version of the runtime to use. Note that if a runtime is specified, code must also be specified.",
  ).optional(),
  SyncConfig: z.object({
    ConflictHandler: z.string().describe(
      "The Conflict Resolution strategy to perform in the event of a conflict. *OPTIMISTIC_CONCURRENCY*: Resolve conflicts by rejecting mutations when versions don't match the latest version at the server. *AUTOMERGE*: Resolve conflicts with the Automerge conflict resolution strategy. *LAMBDA*: Resolve conflicts with an LAMlong function supplied in the LambdaConflictHandlerConfig.",
    ).optional(),
    ConflictDetection: z.string().describe(
      "The Conflict Detection strategy to use. *VERSION*: Detect conflicts based on object versions for this resolver. *NONE*: Do not detect conflicts when invoking this resolver.",
    ).optional(),
    LambdaConflictHandlerConfig: LambdaConflictHandlerConfigSchema.describe(
      "The LambdaConflictHandlerConfig when configuring LAMBDA as the Conflict Handler.",
    ).optional(),
  }).describe(
    "The SyncConfig for a resolver attached to a versioned data source.",
  ).optional(),
  TypeName: z.string().describe("The GraphQL type that invokes this resolver.")
    .optional(),
  MetricsConfig: z.enum(["ENABLED", "DISABLED"]).describe(
    "Enables or disables enhanced resolver metrics for specified resolvers. Note that MetricsConfig won't be used unless the resolverLevelMetricsBehavior value is set to PER_RESOLVER_METRICS. If the resolverLevelMetricsBehavior is set to FULL_REQUEST_RESOLVER_METRICS instead, MetricsConfig will be ignored. However, you can still set its value.",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/appsync/resolver",
  version: "2026.04.01.3",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppSync Resolver resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppSync Resolver",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppSync::Resolver",
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
      description: "Get a AppSync Resolver",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync Resolver",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppSync::Resolver",
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
      description: "Update a AppSync Resolver",
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
        const identifier = existing.ResolverArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppSync::Resolver",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppSync::Resolver",
          identifier,
          currentState,
          desiredState,
          ["ApiId", "FieldName", "TypeName"],
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
      description: "Delete a AppSync Resolver",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync Resolver",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppSync::Resolver",
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
      description: "Sync AppSync Resolver state from AWS",
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
        const identifier = existing.ResolverArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppSync::Resolver",
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
