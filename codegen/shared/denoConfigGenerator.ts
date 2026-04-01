// Generates deno.json for output extension packages.
// Provides import mappings so bare specifiers resolve correctly
// both for swamp's bundler and for local type-checking.

/**
 * Generates a deno.json with import mappings for an AWS extension package.
 */
export function generateAwsDenoConfig(): string {
  return JSON.stringify(
    {
      imports: {
        "zod": "npm:zod@4.3.6",
        "@aws-sdk/client-cloudcontrol":
          "npm:@aws-sdk/client-cloudcontrol@3.1021.0",
        "fast-json-patch": "npm:fast-json-patch@3.1.1",
      },
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a GCP extension package.
 */
export function generateGcpDenoConfig(): string {
  return JSON.stringify(
    {
      imports: {
        "zod": "npm:zod@4.3.6",
      },
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a Hetzner extension package.
 */
export function generateHetznerDenoConfig(): string {
  return JSON.stringify(
    {
      imports: {
        "zod": "npm:zod@4.3.6",
      },
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a DigitalOcean extension package.
 */
export function generateDigitalOceanDenoConfig(): string {
  return JSON.stringify(
    {
      imports: {
        "zod": "npm:zod@4.3.6",
      },
    },
    null,
    2,
  ) + "\n";
}
