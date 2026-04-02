// Auto-generated extension model for @swamp/gcp/securityposture/posturetemplates
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
  return `${parent}/postureTemplates/${shortName}`;
}

const BASE_URL = "https://securityposture.googleapis.com/";

const GET_CONFIG = {
  "id": "securityposture.organizations.locations.postureTemplates.get",
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
    "revisionId": {
      "location": "query",
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
  categories: z.array(z.string()).optional(),
  description: z.string().optional(),
  name: z.string(),
  policySets: z.array(z.object({
    description: z.string(),
    policies: z.array(z.object({
      complianceStandards: z.array(z.object({
        control: z.string(),
        standard: z.string(),
      })),
      constraint: z.object({
        orgPolicyConstraint: z.object({
          cannedConstraintId: z.string(),
          policyRules: z.array(z.object({
            allowAll: z.boolean(),
            condition: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            denyAll: z.boolean(),
            enforce: z.boolean(),
            parameters: z.record(z.string(), z.unknown()),
            resourceTypes: z.object({
              included: z.array(z.string()),
            }),
            values: z.object({
              allowedValues: z.array(z.string()),
              deniedValues: z.array(z.string()),
            }),
          })),
        }),
        orgPolicyConstraintCustom: z.object({
          customConstraint: z.object({
            actionType: z.string(),
            condition: z.string(),
            description: z.string(),
            displayName: z.string(),
            methodTypes: z.array(z.string()),
            name: z.string(),
            resourceTypes: z.array(z.string()),
            updateTime: z.string(),
          }),
          policyRules: z.array(z.object({
            allowAll: z.boolean(),
            condition: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            denyAll: z.boolean(),
            enforce: z.boolean(),
            parameters: z.record(z.string(), z.unknown()),
            resourceTypes: z.object({
              included: z.array(z.string()),
            }),
            values: z.object({
              allowedValues: z.array(z.string()),
              deniedValues: z.array(z.string()),
            }),
          })),
        }),
        securityHealthAnalyticsCustomModule: z.object({
          config: z.object({
            customOutput: z.object({
              properties: z.array(z.object({
                name: z.string(),
                valueExpression: z.object({
                  description: z.string(),
                  expression: z.string(),
                  location: z.string(),
                  title: z.string(),
                }),
              })),
            }),
            description: z.string(),
            predicate: z.object({
              description: z.string(),
              expression: z.string(),
              location: z.string(),
              title: z.string(),
            }),
            recommendation: z.string(),
            resourceSelector: z.object({
              resourceTypes: z.array(z.string()),
            }),
            severity: z.string(),
          }),
          displayName: z.string(),
          id: z.string(),
          moduleEnablementState: z.string(),
        }),
        securityHealthAnalyticsModule: z.object({
          moduleEnablementState: z.string(),
          moduleName: z.string(),
        }),
      }),
      description: z.string(),
      policyId: z.string(),
    })),
    policySetId: z.string(),
  })).optional(),
  revisionId: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/securityposture/posturetemplates",
  version: "2026.04.02.2",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The details of a posture template.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a postureTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the postureTemplates"),
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
      description: "Sync postureTemplates state from GCP",
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
