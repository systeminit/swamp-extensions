// Auto-generated extension model for @swamp/aws/servicecatalog/portfolio-product-association
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  SourcePortfolioId: z.string().describe(
    "The identifier of the source portfolio. The source portfolio must be a portfolio imported from a different account than the one creating the association. This account must have previously shared this portfolio with the account creating the association.",
  ).optional(),
  AcceptLanguage: z.string().describe("The language code.").optional(),
  PortfolioId: z.string().describe("The portfolio identifier.").optional(),
  ProductId: z.string().describe("The product identifier.").optional(),
});

const StateSchema = z.object({
  SourcePortfolioId: z.string().optional(),
  AcceptLanguage: z.string().optional(),
  PortfolioId: z.string(),
  ProductId: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  SourcePortfolioId: z.string().describe(
    "The identifier of the source portfolio. The source portfolio must be a portfolio imported from a different account than the one creating the association. This account must have previously shared this portfolio with the account creating the association.",
  ).optional(),
  AcceptLanguage: z.string().describe("The language code.").optional(),
  PortfolioId: z.string().describe("The portfolio identifier.").optional(),
  ProductId: z.string().describe("The product identifier.").optional(),
});

export const model = {
  type: "@swamp/aws/servicecatalog/portfolio-product-association",
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
      description: "ServiceCatalog PortfolioProductAssociation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ServiceCatalog PortfolioProductAssociation",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ServiceCatalog::PortfolioProductAssociation",
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
      description: "Get a ServiceCatalog PortfolioProductAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ServiceCatalog PortfolioProductAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ServiceCatalog::PortfolioProductAssociation",
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
    delete: {
      description: "Delete a ServiceCatalog PortfolioProductAssociation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ServiceCatalog PortfolioProductAssociation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ServiceCatalog::PortfolioProductAssociation",
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
      description:
        "Sync ServiceCatalog PortfolioProductAssociation state from AWS",
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
          existing.PortfolioId?.toString(),
          existing.ProductId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ServiceCatalog::PortfolioProductAssociation",
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
