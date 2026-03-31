// Generates deno.json for output extension packages.
// Provides import mappings so bare specifiers resolve correctly
// both for swamp's bundler and for local type-checking.

/**
 * Generates a deno.json with import mappings for a Hetzner extension package.
 */
export function generateHetznerDenoConfig(): string {
  return JSON.stringify(
    {
      imports: {
        "zod": "npm:zod@4",
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
        "zod": "npm:zod@4",
      },
    },
    null,
    2,
  ) + "\n";
}
