// Auto-generated extension model for @swamp/gcp/chromepolicy/customers-policyschemas
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/policySchemas/${shortName}`;
}

const BASE_URL = "https://chromepolicy.googleapis.com/";

const GET_CONFIG = {
  "id": "chromepolicy.customers.policySchemas.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessRestrictions: z.array(z.string()).optional(),
  additionalTargetKeyNames: z.array(z.object({
    key: z.string(),
    keyDescription: z.string(),
  })).optional(),
  categoryTitle: z.string().optional(),
  definition: z.object({
    editionDeprecated: z.string(),
    enumType: z.array(z.object({
      name: z.string(),
      value: z.array(z.object({
        name: z.string(),
        number: z.number(),
      })),
      visibility: z.string(),
    })),
    messageType: z.array(z.object({
      enumType: z.array(z.object({
        name: z.string(),
        value: z.array(z.object({
          name: z.string(),
          number: z.number(),
        })),
        visibility: z.string(),
      })),
      field: z.array(z.object({
        defaultValue: z.string(),
        jsonName: z.string(),
        label: z.string(),
        name: z.string(),
        number: z.number(),
        oneofIndex: z.number(),
        proto3Optional: z.boolean(),
        type: z.string(),
        typeName: z.string(),
      })),
      name: z.string(),
      nestedType: z.array(z.string()),
      oneofDecl: z.array(z.object({
        name: z.string(),
      })),
      visibility: z.string(),
    })),
    name: z.string(),
    optionDependency: z.array(z.string()),
    package: z.string(),
    syntax: z.string(),
  }).optional(),
  fieldDescriptions: z.array(z.object({
    defaultValue: z.string(),
    description: z.string(),
    field: z.string(),
    fieldConstraints: z.object({
      numericRangeConstraint: z.object({
        maximum: z.string(),
        minimum: z.string(),
      }),
      uploadedFileConstraints: z.object({
        sizeLimitBytes: z.string(),
        supportedContentTypes: z.array(z.string()),
      }),
    }),
    fieldDependencies: z.array(z.object({
      sourceField: z.string(),
      sourceFieldValue: z.string(),
    })),
    fieldDescription: z.string(),
    inputConstraint: z.string(),
    knownValueDescriptions: z.array(z.object({
      description: z.string(),
      fieldDependencies: z.array(z.object({
        sourceField: z.string(),
        sourceFieldValue: z.string(),
      })),
      value: z.string(),
    })),
    name: z.string(),
    nestedFieldDescriptions: z.array(z.string()),
    requiredItems: z.array(z.object({
      fieldConditions: z.array(z.string()),
      requiredFields: z.array(z.string()),
    })),
  })).optional(),
  name: z.string(),
  notices: z.array(z.object({
    acknowledgementRequired: z.boolean(),
    field: z.string(),
    noticeMessage: z.string(),
    noticeValue: z.string(),
  })).optional(),
  policyApiLifecycle: z.object({
    deprecatedInFavorOf: z.array(z.string()),
    description: z.string(),
    endSupport: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    policyApiLifecycleStage: z.string(),
    scheduledToDeprecatePolicies: z.array(z.string()),
  }).optional(),
  policyDescription: z.string().optional(),
  schemaName: z.string().optional(),
  supportUri: z.string().optional(),
  supportedPlatforms: z.array(z.string()).optional(),
  validTargetResources: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/chromepolicy/customers-policyschemas",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Resource representing a policy schema.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a policySchemas",
      arguments: z.object({
        identifier: z.string().describe("The name of the policySchemas"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = g.name?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync policySchemas state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
