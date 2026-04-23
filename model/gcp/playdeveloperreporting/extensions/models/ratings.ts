// Auto-generated extension model for @swamp/gcp/playdeveloperreporting/ratings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Developer Reporting Ratings.
 *
 * Singleton resource representing the set of Ratings metrics. **Supported aggregation periods:** * DAILY: metrics are aggregated in calendar date intervals in the Google Standard Time Zone (America/Los_Angeles). **Supported metrics:** * `dailyAvgRating` (`google.type.Decimal`): The average rating of the app on each day. * `dailyGooglePlayAvgRating` (`google.type.Decimal`): The average rating of the app shown to users on Google Play. * `totalAvgRating` (`google.type.Decimal`): The average rating of the app. **Supported dimensions:** * `apiLevel` (string): The API level of Android that was running on the user's device. * `deviceModel` (string): Unique identifier of the user's device model. The form of the identifier is 'deviceBrand/device', where deviceBrand corresponds to Build.BRAND and device corresponds to Build.DEVICE, e.g., google/coral. * `deviceBrand` (string): unique identifier of the user's device brand, e.g., google. * `deviceType` (string): The form factor of the user's device (e.g., PHONE, TABLET, CHROMEBOOK). * `language` (string): The user's device language, represented as a BCP-47 language tag (e.g. en-US for English as used in the United States). * `regionCode` (string): The country or region of the user's device, represented as a 2-letter Unicode CLDR region code (e.g. US for the United States). * `versionCode` (int64): The version of the app that was running on the user's device. * `carrier` (string): The mobile carrier or network of the user's device
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://playdeveloperreporting.googleapis.com/";

const GET_CONFIG = {
  "id": "playdeveloperreporting.ratings.get",
  "path": "v1beta1/{+name}",
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
});

const StateSchema = z.object({
  freshnessInfo: z.object({
    freshnesses: z.array(z.object({
      aggregationPeriod: z.string(),
      latestEndTime: z.object({
        day: z.number(),
        hours: z.number(),
        minutes: z.number(),
        month: z.number(),
        nanos: z.number(),
        seconds: z.number(),
        timeZone: z.object({
          id: z.unknown(),
          version: z.unknown(),
        }),
        utcOffset: z.string(),
        year: z.number(),
      }),
    })),
  }).optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Developer Reporting Ratings. Registered at `@swamp/gcp/playdeveloperreporting/ratings`. */
export const model = {
  type: "@swamp/gcp/playdeveloperreporting/ratings",
  version: "2026.04.23.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Singleton resource representing the set of Ratings metrics. **Supported aggre...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a ratings",
      arguments: z.object({
        identifier: z.string().describe("The name of the ratings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Sync ratings state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
    query: {
      description: "query",
      arguments: z.object({
        dimensions: z.any().optional(),
        filter: z.any().optional(),
        metrics: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        timelineSpec: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["dimensions"] !== undefined) {
          body["dimensions"] = args["dimensions"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["metrics"] !== undefined) body["metrics"] = args["metrics"];
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["timelineSpec"] !== undefined) {
          body["timelineSpec"] = args["timelineSpec"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "playdeveloperreporting.ratings.query",
            "path": "v1beta1/{+name}:query",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
