// Auto-generated extension model for @swamp/aws/iot/software-package-version
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

export const S3LocationSchema = z.object({
  Bucket: z.string().min(1).describe("The S3 bucket"),
  Key: z.string().min(1).describe("The S3 key"),
  Version: z.string().describe("The S3 version"),
});

export const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Attributes: z.record(
    z.string(),
    z.string().min(1).regex(new RegExp("^[^\\p{C}]+$", "u")),
  ).optional(),
  Artifact: z.object({
    S3Location: S3LocationSchema.describe("The Amazon S3 location"),
  }).describe("The artifact location of the package version").optional(),
  Description: z.string().min(0).max(1024).regex(
    new RegExp("^[^\\p{C}]+$", "u"),
  ).optional(),
  PackageName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9-_.]+$"),
  ),
  Recipe: z.string().describe(
    "The inline json job document associated with a software package version",
  ).optional(),
  Sbom: z.object({
    S3Location: S3LocationSchema.describe("The Amazon S3 location"),
  }).describe("The sbom zip archive location of the package version")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  VersionName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9-_.]+$"))
    .optional(),
});

const StateSchema = z.object({
  Attributes: z.record(z.string(), z.unknown()).optional(),
  Artifact: z.object({
    S3Location: S3LocationSchema,
  }).optional(),
  Description: z.string().optional(),
  ErrorReason: z.string().optional(),
  PackageName: z.string(),
  PackageVersionArn: z.string().optional(),
  Recipe: z.string().optional(),
  Sbom: z.object({
    S3Location: S3LocationSchema,
  }).optional(),
  SbomValidationStatus: z.string().optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  VersionName: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Attributes: z.record(
    z.string(),
    z.string().min(1).regex(new RegExp("^[^\\p{C}]+$", "u")),
  ).optional(),
  Artifact: z.object({
    S3Location: S3LocationSchema.describe("The Amazon S3 location").optional(),
  }).describe("The artifact location of the package version").optional(),
  Description: z.string().min(0).max(1024).regex(
    new RegExp("^[^\\p{C}]+$", "u"),
  ).optional(),
  PackageName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-_.]+$"))
    .optional(),
  Recipe: z.string().describe(
    "The inline json job document associated with a software package version",
  ).optional(),
  Sbom: z.object({
    S3Location: S3LocationSchema.describe("The Amazon S3 location").optional(),
  }).describe("The sbom zip archive location of the package version")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  VersionName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9-_.]+$"))
    .optional(),
});

export const model = {
  type: "@swamp/aws/iot/software-package-version",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoT SoftwarePackageVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT SoftwarePackageVersion",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoT::SoftwarePackageVersion",
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
      description: "Get a IoT SoftwarePackageVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT SoftwarePackageVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoT::SoftwarePackageVersion",
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
      description: "Update a IoT SoftwarePackageVersion",
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
        const idParts = [
          existing.PackageName?.toString(),
          existing.VersionName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::IoT::SoftwarePackageVersion",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::SoftwarePackageVersion",
          identifier,
          currentState,
          desiredState,
          ["PackageName", "VersionName"],
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
      description: "Delete a IoT SoftwarePackageVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT SoftwarePackageVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoT::SoftwarePackageVersion",
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
      description: "Sync IoT SoftwarePackageVersion state from AWS",
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
        const idParts = [
          existing.PackageName?.toString(),
          existing.VersionName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::IoT::SoftwarePackageVersion",
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
