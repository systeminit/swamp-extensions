import { assertSnapshot } from "@std/testing/snapshot";
import { generateHetznerExtensionModel } from "./extensionModelGenerator.ts";
import type { HetznerProperty, HetznerResource } from "./pipeline.ts";

function makeResource(
  overrides: Partial<HetznerResource> & {
    noun: string;
    modelSlug: string;
    fileName: string;
  },
): HetznerResource {
  return {
    createProperties: {},
    updateProperties: {},
    resourceProperties: {},
    requiredProperties: [],
    handlers: { create: true, read: true, update: true, delete: true },
    identifyingField: "id",
    ...overrides,
  };
}

const stringProp: HetznerProperty = { type: "string" };
const intProp: HetznerProperty = { type: "integer" };

// ---------------------------------------------------------------------------
// Snapshot: all CRUD handlers, natural name field
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - all handlers, natural name", async (t) => {
  const resource = makeResource({
    noun: "servers",
    modelSlug: "servers",
    fileName: "servers.ts",
    createProperties: {
      name: { type: "string", description: "Name of the server" },
      server_type: {
        type: "string",
        description: "ID or name of the server type",
      },
      image: { type: "string", description: "ID or name of the image" },
    },
    updateProperties: {
      name: { type: "string", description: "New name for the server" },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      status: stringProp,
      server_type: {
        type: "object",
        properties: { id: intProp, name: stringProp },
      },
      public_net: {
        type: "object",
        properties: {
          ipv4: { type: "object", properties: { ip: stringProp } },
        },
      },
    },
    requiredProperties: ["name", "server_type", "image"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: no update handler, no delete handler
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - read-only (no update, no delete)", async (t) => {
  const resource = makeResource({
    noun: "zones",
    modelSlug: "zones",
    fileName: "zones.ts",
    handlers: { create: true, read: true, update: false, delete: false },
    createProperties: {
      name: { type: "string", description: "Zone name" },
      ttl: { type: "integer", description: "TTL" },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      ttl: intProp,
      status: stringProp,
    },
    requiredProperties: ["name"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: synthetic name (no "name" or "label" in create properties)
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - synthetic name", async (t) => {
  const resource = makeResource({
    noun: "primary_ips",
    modelSlug: "primary-ips",
    fileName: "primary_ips.ts",
    createProperties: {
      type: {
        type: "string",
        description: "IP type (ipv4 or ipv6)",
        enum: ["ipv4", "ipv6"],
      },
      datacenter: { type: "string", description: "Datacenter name" },
      assignee_type: { type: "string", description: "Resource type (server)" },
    },
    updateProperties: {},
    resourceProperties: {
      id: intProp,
      ip: stringProp,
      type: stringProp,
      datacenter: {
        type: "object",
        properties: { id: intProp, name: stringProp },
      },
    },
    requiredProperties: ["type", "assignee_type"],
    handlers: { create: true, read: true, update: false, delete: true },
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: label-based naming (no "name", has "label")
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - label-based naming", async (t) => {
  const resource = makeResource({
    noun: "placement_groups",
    modelSlug: "placement-groups",
    fileName: "placement_groups.ts",
    createProperties: {
      label: { type: "string", description: "User-defined label" },
      type: { type: "string", description: "Placement group type" },
    },
    updateProperties: {
      label: { type: "string", description: "Updated label" },
    },
    resourceProperties: {
      id: intProp,
      label: stringProp,
      type: stringProp,
    },
    requiredProperties: ["label", "type"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: with upgrades block
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - with upgrades block", async (t) => {
  const resource = makeResource({
    noun: "ssh_keys",
    modelSlug: "ssh-keys",
    fileName: "ssh_keys.ts",
    createProperties: {
      name: { type: "string", description: "Name of the SSH key" },
      public_key: { type: "string", description: "Public key" },
    },
    updateProperties: {
      name: { type: "string", description: "New name" },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      public_key: stringProp,
      fingerprint: stringProp,
    },
    requiredProperties: ["name", "public_key"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.02.1",
      upgradesBlock:
        `  upgrades: [\n    {\n      toVersion: "2026.01.02.1",\n      description: "Removed: labels",\n      upgradeAttributes: (old: Record<string, unknown>) => {\n        const { labels: _labels, ...rest } = old;\n        return rest;\n      },\n    },\n  ],`,
    }),
  );
});

// ---------------------------------------------------------------------------
// Snapshot: enum and constraint properties
// ---------------------------------------------------------------------------

Deno.test("generateHetznerExtensionModel - properties with enums and constraints", async (t) => {
  const resource = makeResource({
    noun: "firewalls",
    modelSlug: "firewalls",
    fileName: "firewalls.ts",
    createProperties: {
      name: { type: "string", description: "Firewall name", maxLength: 128 },
      rules: {
        type: "array",
        description: "Array of rules",
        items: {
          type: "object",
          properties: {
            direction: { type: "string", enum: ["in", "out"] },
            protocol: {
              type: "string",
              enum: ["tcp", "udp", "icmp", "esp", "gre"],
            },
            port: { type: "string" },
          },
          requiredProperties: ["direction", "protocol"],
        },
      },
    },
    resourceProperties: {
      id: intProp,
      name: stringProp,
      rules: {
        type: "array",
        items: {
          type: "object",
          properties: { direction: stringProp, protocol: stringProp },
        },
      },
    },
    requiredProperties: ["name"],
  });

  await assertSnapshot(
    t,
    generateHetznerExtensionModel({
      resource,
      extensionName: "@swamp/hetzner-cloud",
      version: "2026.01.01.1",
    }),
  );
});
