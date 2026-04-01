// Bumps the CalVer version in every manifest.yaml and model .ts file under a
// given directory. Adds a no-op upgrade entry to each model file so existing
// instances get their typeVersion updated on next method call.
//
// Usage: deno run --allow-read --allow-write --allow-run=deno scripts/bump-versions.ts ../model/aws

import {
  buildUpgradesBlock,
  extractExistingUpgrades,
  generateUpgradeEntry,
} from "../shared/upgradesGenerator.ts";

const target = Deno.args[0];
if (!target) {
  console.error("Usage: bump-versions.ts <directory>");
  console.error("  e.g.: bump-versions.ts ../model/aws");
  Deno.exit(1);
}

const now = new Date();
const datePrefix = `${now.getFullYear()}.${
  String(now.getMonth() + 1).padStart(2, "0")
}.${String(now.getDate()).padStart(2, "0")}`;

let bumped = 0;
let skipped = 0;

for await (const entry of Deno.readDir(target)) {
  if (!entry.isDirectory) continue;

  const serviceDir = `${target}/${entry.name}`;
  const manifestPath = `${serviceDir}/manifest.yaml`;
  let manifestContent: string;
  try {
    manifestContent = await Deno.readTextFile(manifestPath);
  } catch {
    skipped++;
    continue;
  }

  const match = manifestContent.match(
    /version:\s*"(\d{4}\.\d{2}\.\d{2})\.(\d+)"/,
  );
  if (!match) {
    console.warn(`  Skipping ${entry.name}: no version found in manifest`);
    skipped++;
    continue;
  }

  const existingDate = match[1];
  const existingMicro = parseInt(match[2], 10);

  const newVersion = existingDate === datePrefix
    ? `${datePrefix}.${existingMicro + 1}`
    : `${datePrefix}.1`;

  // Bump manifest.yaml
  const updatedManifest = manifestContent.replace(
    /version:\s*"[^"]+"/,
    `version: "${newVersion}"`,
  );
  await Deno.writeTextFile(manifestPath, updatedManifest);

  // Bump all model .ts files in extensions/models/
  const modelsDir = `${serviceDir}/extensions/models`;
  let modelsBumped = 0;
  try {
    for await (const modelEntry of Deno.readDir(modelsDir)) {
      if (
        !modelEntry.isFile || !modelEntry.name.endsWith(".ts") ||
        modelEntry.name.startsWith("_")
      ) {
        continue;
      }

      const modelPath = `${modelsDir}/${modelEntry.name}`;
      const modelContent = await Deno.readTextFile(modelPath);

      // Skip files that don't have a version field (e.g., shared helpers)
      if (!modelContent.includes('version: "')) continue;

      // Update the version
      let updated = modelContent.replace(
        /(\bversion:\s*)"[^"]+"/,
        `$1"${newVersion}"`,
      );

      // Extract existing upgrades and add a new no-op entry
      const existingEntries = extractExistingUpgrades(modelContent);
      const newEntry = generateUpgradeEntry(newVersion, [], []);
      const upgradesBlock = buildUpgradesBlock(existingEntries, newEntry);

      if (upgradesBlock) {
        // Replace existing upgrades block, or insert one
        const upgradesMarker = "upgrades: [";
        const hasExistingUpgrades = updated.includes(upgradesMarker);

        if (hasExistingUpgrades) {
          // Find and replace the entire upgrades: [...] block
          const startIdx = updated.indexOf(upgradesMarker);
          const arrayStart = startIdx + upgradesMarker.length;
          let depth = 1;
          let i = arrayStart;
          while (i < updated.length && depth > 0) {
            if (updated[i] === "[") depth++;
            else if (updated[i] === "]") depth--;
            i++;
          }
          // Include trailing comma if present
          let end = i;
          if (end < updated.length && updated[end] === ",") end++;

          // Find the start of the upgrades line
          let lineStart = startIdx;
          while (lineStart > 0 && updated[lineStart - 1] !== "\n") {
            lineStart--;
          }

          updated = updated.slice(0, lineStart) + upgradesBlock + "\n" +
            updated.slice(end);
        } else {
          // Insert upgrades block after the version line
          updated = updated.replace(
            /(\bversion:\s*"[^"]+",?\n)/,
            `$1${upgradesBlock}\n`,
          );
        }
      }

      await Deno.writeTextFile(modelPath, updated);

      // Format the file so CI fmt checks pass
      const fmtCmd = new Deno.Command("deno", {
        args: ["fmt", "--no-config", modelPath],
      });
      const fmtResult = await fmtCmd.output();
      if (!fmtResult.success) {
        throw new Error(`deno fmt failed for ${modelPath}`);
      }

      modelsBumped++;
    }
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) throw err;
    // No extensions/models/ directory — just bump the manifest
  }

  console.log(
    `  ${entry.name}: ${
      match[0]
    } → version: "${newVersion}" (${modelsBumped} models updated)`,
  );
  bumped++;
}

console.log(`\nDone: ${bumped} bumped, ${skipped} skipped`);
