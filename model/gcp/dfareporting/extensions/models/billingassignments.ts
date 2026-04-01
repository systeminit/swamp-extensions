// Auto-generated extension model for @swamp/gcp/dfareporting/billingassignments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const INSERT_CONFIG = {
  "id": "dfareporting.billingAssignments.insert",
  "path":
    "userprofiles/{+profileId}/billingProfiles/{+billingProfileId}/billingAssignments",
  "httpMethod": "POST",
  "parameterOrder": [
    "profileId",
    "billingProfileId",
  ],
  "parameters": {
    "billingProfileId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dfareporting.billingAssignments.list",
  "path":
    "userprofiles/{+profileId}/billingProfiles/{+billingProfileId}/billingAssignments",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "billingProfileId",
  ],
  "parameters": {
    "billingProfileId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accountId: z.string().describe(
    "ID of the account associated with the billing assignment.This is a read-only, auto-generated field.",
  ).optional(),
  advertiserId: z.string().describe(
    "ID of the advertiser associated with the billing assignment.Wildcard (*) means this assignment is not limited to a single advertiser",
  ).optional(),
  campaignId: z.string().describe(
    "ID of the campaign associated with the billing assignment. Wildcard (*) means this assignment is not limited to a single campaign",
  ).optional(),
  subaccountId: z.string().describe(
    "ID of the subaccount associated with the billing assignment.Wildcard (*) means this assignment is not limited to a single subaccountThis is a read-only, auto-generated field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
  billingProfileId: z.string().describe(
    "Billing profile ID of this billing assignment.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  advertiserId: z.string().optional(),
  campaignId: z.string().optional(),
  kind: z.string().optional(),
  subaccountId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accountId: z.string().describe(
    "ID of the account associated with the billing assignment.This is a read-only, auto-generated field.",
  ).optional(),
  advertiserId: z.string().describe(
    "ID of the advertiser associated with the billing assignment.Wildcard (*) means this assignment is not limited to a single advertiser",
  ).optional(),
  campaignId: z.string().describe(
    "ID of the campaign associated with the billing assignment. Wildcard (*) means this assignment is not limited to a single campaign",
  ).optional(),
  subaccountId: z.string().describe(
    "ID of the subaccount associated with the billing assignment.Wildcard (*) means this assignment is not limited to a single subaccountThis is a read-only, auto-generated field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
  billingProfileId: z.string().describe(
    "Billing profile ID of this billing assignment.",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dfareporting/billingassignments",
  version: "2026.03.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "List account, subaccount, advertiser, and campaign associated with a given Bi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a billingAssignments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (g["billingProfileId"] !== undefined) {
          params["billingProfileId"] = String(g["billingProfileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
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
      description: "Get a billingAssignments",
      arguments: z.object({
        identifier: z.string().describe("The name of the billingAssignments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (g["billingProfileId"] !== undefined) {
          params["billingProfileId"] = String(g["billingProfileId"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync billingAssignments state from GCP",
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          if (g["billingProfileId"] !== undefined) {
            params["billingProfileId"] = String(g["billingProfileId"]);
          } else if (existing["billingProfileId"]) {
            params["billingProfileId"] = String(existing["billingProfileId"]);
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
