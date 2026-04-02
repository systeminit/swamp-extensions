// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/accounts-products
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const GET_CONFIG = {
  "id": "adexchangebuyer2.accounts.products.get",
  "path": "v2beta1/accounts/{accountId}/products/{productId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "productId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "productId": {
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
  availableEndTime: z.string().optional(),
  availableStartTime: z.string().optional(),
  createTime: z.string().optional(),
  creatorContacts: z.array(z.object({
    email: z.string(),
    name: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  hasCreatorSignedOff: z.boolean().optional(),
  productId: z.string().optional(),
  productRevision: z.string().optional(),
  publisherProfileId: z.string().optional(),
  seller: z.object({
    accountId: z.string(),
    subAccountId: z.string(),
  }).optional(),
  syndicationProduct: z.string().optional(),
  targetingCriterion: z.array(z.object({
    exclusions: z.array(z.object({
      creativeSizeValue: z.object({
        allowedFormats: z.array(z.string()),
        companionSizes: z.array(z.object({
          height: z.number(),
          width: z.number(),
        })),
        creativeSizeType: z.string(),
        nativeTemplate: z.string(),
        size: z.object({
          height: z.number(),
          width: z.number(),
        }),
        skippableAdType: z.string(),
      }),
      dayPartTargetingValue: z.object({
        dayParts: z.array(z.object({
          dayOfWeek: z.string(),
          endTime: z.object({
            hours: z.number(),
            minutes: z.number(),
            nanos: z.number(),
            seconds: z.number(),
          }),
          startTime: z.object({
            hours: z.number(),
            minutes: z.number(),
            nanos: z.number(),
            seconds: z.number(),
          }),
        })),
        timeZoneType: z.string(),
      }),
      longValue: z.string(),
      stringValue: z.string(),
    })),
    inclusions: z.array(z.object({
      creativeSizeValue: z.object({
        allowedFormats: z.array(z.string()),
        companionSizes: z.array(z.object({
          height: z.number(),
          width: z.number(),
        })),
        creativeSizeType: z.string(),
        nativeTemplate: z.string(),
        size: z.object({
          height: z.number(),
          width: z.number(),
        }),
        skippableAdType: z.string(),
      }),
      dayPartTargetingValue: z.object({
        dayParts: z.array(z.object({
          dayOfWeek: z.string(),
          endTime: z.object({
            hours: z.number(),
            minutes: z.number(),
            nanos: z.number(),
            seconds: z.number(),
          }),
          startTime: z.object({
            hours: z.number(),
            minutes: z.number(),
            nanos: z.number(),
            seconds: z.number(),
          }),
        })),
        timeZoneType: z.string(),
      }),
      longValue: z.string(),
      stringValue: z.string(),
    })),
    key: z.string(),
  })).optional(),
  terms: z.object({
    brandingType: z.string(),
    description: z.string(),
    estimatedGrossSpend: z.object({
      amount: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      pricingType: z.string(),
    }),
    estimatedImpressionsPerDay: z.string(),
    guaranteedFixedPriceTerms: z.object({
      fixedPrices: z.array(z.object({
        advertiserIds: z.array(z.string()),
        buyer: z.object({
          accountId: z.string(),
        }),
        price: z.object({
          amount: z.object({
            currencyCode: z.string(),
            nanos: z.number(),
            units: z.string(),
          }),
          pricingType: z.string(),
        }),
      })),
      guaranteedImpressions: z.string(),
      guaranteedLooks: z.string(),
      impressionCap: z.string(),
      minimumDailyLooks: z.string(),
      percentShareOfVoice: z.string(),
      reservationType: z.string(),
    }),
    nonGuaranteedAuctionTerms: z.object({
      autoOptimizePrivateAuction: z.boolean(),
      reservePricesPerBuyer: z.array(z.object({
        advertiserIds: z.array(z.string()),
        buyer: z.object({
          accountId: z.string(),
        }),
        price: z.object({
          amount: z.object({
            currencyCode: z.string(),
            nanos: z.number(),
            units: z.string(),
          }),
          pricingType: z.string(),
        }),
      })),
    }),
    nonGuaranteedFixedPriceTerms: z.object({
      fixedPrices: z.array(z.object({
        advertiserIds: z.array(z.string()),
        buyer: z.object({
          accountId: z.string(),
        }),
        price: z.object({
          amount: z.object({
            currencyCode: z.string(),
            nanos: z.number(),
            units: z.string(),
          }),
          pricingType: z.string(),
        }),
      })),
    }),
    sellerTimeZone: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  webPropertyCode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

export const model = {
  type: "@swamp/gcp/adexchangebuyer2/accounts-products",
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
      description:
        "A product is a segment of inventory that a seller wants to sell. It is associ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a products",
      arguments: z.object({
        identifier: z.string().describe("The name of the products"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        params["productId"] = args.identifier;
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
      description: "Sync products state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["productId"] = identifier;
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
