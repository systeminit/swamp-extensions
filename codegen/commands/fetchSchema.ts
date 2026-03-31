// fetch-schema command — delegates to the appropriate provider pipeline

import { fetchDigitalOceanSchema } from "../digitalocean/pipeline.ts";
import { fetchHetznerSchema } from "../hetzner/pipeline.ts";

/**
 * Fetches the latest schemas for the given provider.
 * Each provider pipeline implements its own fetch logic.
 */
export async function fetchSchema(options: {
  provider: string;
  outputPath?: string;
}): Promise<void> {
  switch (options.provider) {
    case "hetzner":
      await fetchHetznerSchema({ outputPath: options.outputPath });
      break;
    case "digitalocean":
      await fetchDigitalOceanSchema({ outputPath: options.outputPath });
      break;
    default:
      throw new Error(
        `Unsupported provider: ${options.provider}. Supported: "hetzner", "digitalocean".`,
      );
  }
}
