// Auto-generated extension model for @swamp/gcp/dfareporting/remarketinglists
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.remarketingLists.get",
  "path": "userprofiles/{+profileId}/remarketingLists/{+id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dfareporting.remarketingLists.insert",
  "path": "userprofiles/{+profileId}/remarketingLists",
  "httpMethod": "POST",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dfareporting.remarketingLists.update",
  "path": "userprofiles/{+profileId}/remarketingLists",
  "httpMethod": "PUT",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this remarketing list. This is a read-only, auto-generated field that is only returned in GET requests.",
  ).optional(),
  active: z.boolean().describe("Whether this remarketing list is active.")
    .optional(),
  advertiserId: z.string().describe(
    "Dimension value for the advertiser ID that owns this remarketing list. This is a required field.",
  ).optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  description: z.string().describe("Remarketing list description.").optional(),
  id: z.string().describe(
    "Remarketing list ID. This is a read-only, auto-generated field.",
  ).optional(),
  lifeSpan: z.string().describe(
    "Number of days that a user should remain in the remarketing list without an impression. Acceptable values are 1 to 540, inclusive.",
  ).optional(),
  listPopulationRule: z.object({
    floodlightActivityId: z.string().describe(
      "Floodlight activity ID associated with this rule. This field can be left blank.",
    ).optional(),
    floodlightActivityName: z.string().describe(
      "Name of floodlight activity associated with this rule. This is a read-only, auto-generated field.",
    ).optional(),
    listPopulationClauses: z.array(z.object({
      terms: z.array(z.object({
        contains: z.boolean().describe(
          "Will be true if the term should check if the user is in the list and false if the term should check if the user is not in the list. This field is only relevant when type is set to LIST_MEMBERSHIP_TERM. False by default.",
        ).optional(),
        negation: z.boolean().describe(
          "Whether to negate the comparison result of this term during rule evaluation. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM.",
        ).optional(),
        operator: z.enum([
          "NUM_EQUALS",
          "NUM_LESS_THAN",
          "NUM_LESS_THAN_EQUAL",
          "NUM_GREATER_THAN",
          "NUM_GREATER_THAN_EQUAL",
          "STRING_EQUALS",
          "STRING_CONTAINS",
        ]).describe(
          "Comparison operator of this term. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM.",
        ).optional(),
        remarketingListId: z.string().describe(
          "ID of the list in question. This field is only relevant when type is set to LIST_MEMBERSHIP_TERM.",
        ).optional(),
        type: z.enum([
          "CUSTOM_VARIABLE_TERM",
          "LIST_MEMBERSHIP_TERM",
          "REFERRER_TERM",
        ]).describe(
          "List population term type determines the applicable fields in this object. If left unset or set to CUSTOM_VARIABLE_TERM, then variableName, variableFriendlyName, operator, value, and negation are applicable. If set to LIST_MEMBERSHIP_TERM then remarketingListId and contains are applicable. If set to REFERRER_TERM then operator, value, and negation are applicable.",
        ).optional(),
        value: z.string().describe(
          "Literal to compare the variable to. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM.",
        ).optional(),
        variableFriendlyName: z.string().describe(
          "Friendly name of this term's variable. This is a read-only, auto-generated field. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM.",
        ).optional(),
        variableName: z.string().describe(
          "Name of the variable (U1, U2, etc.) being compared in this term. This field is only relevant when type is set to null, CUSTOM_VARIABLE_TERM or REFERRER_TERM.",
        ).optional(),
      })).describe(
        "Terms of this list population clause. Each clause is made up of list population terms representing constraints and are joined by ORs.",
      ).optional(),
    })).describe(
      "Clauses that make up this list population rule. Clauses are joined by ANDs, and the clauses themselves are made up of list population terms which are joined by ORs.",
    ).optional(),
  }).describe("Remarketing List Population Rule.").optional(),
  listSize: z.string().describe(
    "Number of users currently in the list. This is a read-only field.",
  ).optional(),
  listSource: z.enum([
    "REMARKETING_LIST_SOURCE_OTHER",
    "REMARKETING_LIST_SOURCE_ADX",
    "REMARKETING_LIST_SOURCE_DFP",
    "REMARKETING_LIST_SOURCE_XFP",
    "REMARKETING_LIST_SOURCE_DFA",
    "REMARKETING_LIST_SOURCE_GA",
    "REMARKETING_LIST_SOURCE_YOUTUBE",
    "REMARKETING_LIST_SOURCE_DBM",
    "REMARKETING_LIST_SOURCE_GPLUS",
    "REMARKETING_LIST_SOURCE_DMP",
    "REMARKETING_LIST_SOURCE_PLAY_STORE",
  ]).describe("Product from which this remarketing list was originated.")
    .optional(),
  name: z.string().describe(
    "Name of the remarketing list. This is a required field. Must be no greater than 128 characters long.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this remarketing list. This is a read-only, auto-generated field that is only returned in GET requests.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  active: z.boolean().optional(),
  advertiserId: z.string().optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  description: z.string().optional(),
  id: z.string(),
  kind: z.string().optional(),
  lifeSpan: z.string().optional(),
  listPopulationRule: z.object({
    floodlightActivityId: z.string(),
    floodlightActivityName: z.string(),
    listPopulationClauses: z.array(z.object({
      terms: z.array(z.object({
        contains: z.boolean(),
        negation: z.boolean(),
        operator: z.string(),
        remarketingListId: z.string(),
        type: z.string(),
        value: z.string(),
        variableFriendlyName: z.string(),
        variableName: z.string(),
      })),
    })),
  }).optional(),
  listSize: z.string().optional(),
  listSource: z.string().optional(),
  name: z.string().optional(),
  subaccountId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this remarketing list. This is a read-only, auto-generated field that is only returned in GET requests.",
  ).optional(),
  active: z.boolean().describe("Whether this remarketing list is active.")
    .optional(),
  advertiserId: z.string().describe(
    "Dimension value for the advertiser ID that owns this remarketing list. This is a required field.",
  ).optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  description: z.string().describe("Remarketing list description.").optional(),
  id: z.string().describe(
    "Remarketing list ID. This is a read-only, auto-generated field.",
  ).optional(),
  lifeSpan: z.string().describe(
    "Number of days that a user should remain in the remarketing list without an impression. Acceptable values are 1 to 540, inclusive.",
  ).optional(),
  listPopulationRule: z.object({
    floodlightActivityId: z.string().describe(
      "Floodlight activity ID associated with this rule. This field can be left blank.",
    ).optional(),
    floodlightActivityName: z.string().describe(
      "Name of floodlight activity associated with this rule. This is a read-only, auto-generated field.",
    ).optional(),
    listPopulationClauses: z.array(z.object({
      terms: z.array(z.object({
        contains: z.boolean().describe(
          "Will be true if the term should check if the user is in the list and false if the term should check if the user is not in the list. This field is only relevant when type is set to LIST_MEMBERSHIP_TERM. False by default.",
        ).optional(),
        negation: z.boolean().describe(
          "Whether to negate the comparison result of this term during rule evaluation. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM.",
        ).optional(),
        operator: z.enum([
          "NUM_EQUALS",
          "NUM_LESS_THAN",
          "NUM_LESS_THAN_EQUAL",
          "NUM_GREATER_THAN",
          "NUM_GREATER_THAN_EQUAL",
          "STRING_EQUALS",
          "STRING_CONTAINS",
        ]).describe(
          "Comparison operator of this term. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM.",
        ).optional(),
        remarketingListId: z.string().describe(
          "ID of the list in question. This field is only relevant when type is set to LIST_MEMBERSHIP_TERM.",
        ).optional(),
        type: z.enum([
          "CUSTOM_VARIABLE_TERM",
          "LIST_MEMBERSHIP_TERM",
          "REFERRER_TERM",
        ]).describe(
          "List population term type determines the applicable fields in this object. If left unset or set to CUSTOM_VARIABLE_TERM, then variableName, variableFriendlyName, operator, value, and negation are applicable. If set to LIST_MEMBERSHIP_TERM then remarketingListId and contains are applicable. If set to REFERRER_TERM then operator, value, and negation are applicable.",
        ).optional(),
        value: z.string().describe(
          "Literal to compare the variable to. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM or REFERRER_TERM.",
        ).optional(),
        variableFriendlyName: z.string().describe(
          "Friendly name of this term's variable. This is a read-only, auto-generated field. This field is only relevant when type is left unset or set to CUSTOM_VARIABLE_TERM.",
        ).optional(),
        variableName: z.string().describe(
          "Name of the variable (U1, U2, etc.) being compared in this term. This field is only relevant when type is set to null, CUSTOM_VARIABLE_TERM or REFERRER_TERM.",
        ).optional(),
      })).describe(
        "Terms of this list population clause. Each clause is made up of list population terms representing constraints and are joined by ORs.",
      ).optional(),
    })).describe(
      "Clauses that make up this list population rule. Clauses are joined by ANDs, and the clauses themselves are made up of list population terms which are joined by ORs.",
    ).optional(),
  }).describe("Remarketing List Population Rule.").optional(),
  listSize: z.string().describe(
    "Number of users currently in the list. This is a read-only field.",
  ).optional(),
  listSource: z.enum([
    "REMARKETING_LIST_SOURCE_OTHER",
    "REMARKETING_LIST_SOURCE_ADX",
    "REMARKETING_LIST_SOURCE_DFP",
    "REMARKETING_LIST_SOURCE_XFP",
    "REMARKETING_LIST_SOURCE_DFA",
    "REMARKETING_LIST_SOURCE_GA",
    "REMARKETING_LIST_SOURCE_YOUTUBE",
    "REMARKETING_LIST_SOURCE_DBM",
    "REMARKETING_LIST_SOURCE_GPLUS",
    "REMARKETING_LIST_SOURCE_DMP",
    "REMARKETING_LIST_SOURCE_PLAY_STORE",
  ]).describe("Product from which this remarketing list was originated.")
    .optional(),
  name: z.string().describe(
    "Name of the remarketing list. This is a required field. Must be no greater than 128 characters long.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this remarketing list. This is a read-only, auto-generated field that is only returned in GET requests.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dfareporting/remarketinglists",
  version: "2026.04.03.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Contains properties of a remarketing list. Remarketing enables you to create ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a remarketingLists",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["lifeSpan"] !== undefined) body["lifeSpan"] = g["lifeSpan"];
        if (g["listPopulationRule"] !== undefined) {
          body["listPopulationRule"] = g["listPopulationRule"];
        }
        if (g["listSize"] !== undefined) body["listSize"] = g["listSize"];
        if (g["listSource"] !== undefined) body["listSource"] = g["listSource"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = (result.id ?? g.id)?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a remarketingLists",
      arguments: z.object({
        identifier: z.string().describe("The id of the remarketingLists"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (result.id ?? g.id)?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update remarketingLists attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = g.id?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        params["profileId"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["lifeSpan"] !== undefined) body["lifeSpan"] = g["lifeSpan"];
        if (g["listPopulationRule"] !== undefined) {
          body["listPopulationRule"] = g["listPopulationRule"];
        }
        if (g["listSize"] !== undefined) body["listSize"] = g["listSize"];
        if (g["listSource"] !== undefined) body["listSource"] = g["listSource"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync remarketingLists state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = g.id?.toString() ?? "current";
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
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
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
