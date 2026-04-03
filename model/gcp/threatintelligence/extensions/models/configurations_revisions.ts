// Auto-generated extension model for @swamp/gcp/threatintelligence/configurations-revisions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://threatintelligence.googleapis.com/";

const LIST_CONFIG = {
  "id": "threatintelligence.projects.configurations.revisions.list",
  "path": "v1beta/{+parent}/revisions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  name: z.string(),
  snapshot: z.object({
    audit: z.object({
      createTime: z.string(),
      creator: z.string(),
      updateTime: z.string(),
      updater: z.string(),
    }),
    description: z.string(),
    detail: z.object({
      customerProfile: z.object({
        citations: z.array(z.object({
          citationId: z.string(),
          document: z.string(),
          retrievalTime: z.string(),
          source: z.string(),
          uri: z.string(),
        })),
        contactInfo: z.array(z.object({
          address: z.string(),
          citationIds: z.array(z.string()),
          email: z.string(),
          label: z.string(),
          other: z.string(),
          phone: z.string(),
        })),
        executives: z.array(z.object({
          citationIds: z.array(z.string()),
          name: z.string(),
          title: z.string(),
        })),
        industries: z.array(z.object({
          citationIds: z.array(z.string()),
          industry: z.string(),
        })),
        locations: z.array(z.object({
          address: z.string(),
          brand: z.string(),
          citationIds: z.array(z.string()),
          facilityType: z.string(),
        })),
        org: z.string(),
        orgSummary: z.string(),
        parentCompanies: z.array(z.object({
          citationIds: z.array(z.string()),
          company: z.string(),
        })),
        products: z.array(z.object({
          brand: z.string(),
          citationIds: z.array(z.string()),
          product: z.string(),
        })),
        securityConsiderations: z.object({
          considerations: z.array(z.string()),
          note: z.string(),
        }),
        summary: z.object({
          areaServed: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          brands: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          entityType: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          founded: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          headquarters: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          industry: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          keyPeopleSummary: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          parentCompany: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          primaryWebsite: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          productsSummary: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          servicesSummary: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
          title: z.object({
            citationIds: z.array(z.string()),
            value: z.string(),
          }),
        }),
        technologyPresence: z.string(),
        webPresences: z.array(z.object({
          citationIds: z.array(z.string()),
          domain: z.string(),
        })),
      }),
      detailType: z.string(),
    }),
    displayName: z.string(),
    name: z.string(),
    provider: z.string(),
    state: z.string(),
    version: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/threatintelligence/configurations-revisions",
  version: "2026.04.03.3",
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
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A ConfigurationRevision is a snapshot of a Configuration at a point in time. ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a revisions",
      arguments: z.object({
        identifier: z.string().describe("The name of the revisions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
    sync: {
      description: "Sync revisions state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
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
