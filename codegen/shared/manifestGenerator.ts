// Generates manifest.yaml for a swamp extension package

export interface ManifestInput {
  /** Extension name, e.g., "hetzner-cloud" */
  name: string;
  /** CalVer version string */
  version: string;
  /** Human-readable description */
  description: string;
  /** Labels for discovery */
  labels: string[];
  /** Model file paths relative to extensions/models/, e.g., ["servers.ts", "ssh_keys.ts"] */
  modelFiles: string[];
  /** Optional release notes describing model changes */
  releaseNotes?: string;
  /** Optional additional files to include in the package (e.g., ["README.md", "LICENSE.txt"]) */
  additionalFiles?: string[];
}

/**
 * Generates a manifest.yaml string for a swamp extension.
 */
export function generateManifest(input: ManifestInput): string {
  const lines: string[] = [
    "# Auto-generated manifest. Re-generate with the appropriate deno task.",
    `manifestVersion: 1`,
    `name: "${input.name}"`,
    `version: "${input.version}"`,
    `description: "${input.description}"`,
    `labels:`,
  ];

  for (const label of input.labels) {
    lines.push(`  - ${label}`);
  }

  if (input.releaseNotes) {
    lines.push(`releaseNotes: |`);
    for (const noteLine of input.releaseNotes.split("\n")) {
      lines.push(`  ${noteLine}`);
    }
  }

  lines.push(`models:`);
  for (const file of input.modelFiles.sort()) {
    lines.push(`  - ${file}`);
  }

  if (input.additionalFiles && input.additionalFiles.length > 0) {
    lines.push(`additionalFiles:`);
    for (const file of input.additionalFiles.sort()) {
      lines.push(`  - ${file}`);
    }
  }

  lines.push(""); // trailing newline
  return lines.join("\n");
}
