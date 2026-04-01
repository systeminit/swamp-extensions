// Bumps the CalVer version in every manifest.yaml under a given directory.
// Usage: deno run --allow-read --allow-write scripts/bump-versions.ts ../model/aws

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

  const manifestPath = `${target}/${entry.name}/manifest.yaml`;
  let content: string;
  try {
    content = await Deno.readTextFile(manifestPath);
  } catch {
    skipped++;
    continue;
  }

  const match = content.match(/version:\s*"(\d{4}\.\d{2}\.\d{2})\.(\d+)"/);
  if (!match) {
    console.warn(`  Skipping ${entry.name}: no version found`);
    skipped++;
    continue;
  }

  const existingDate = match[1];
  const existingMicro = parseInt(match[2], 10);

  const newVersion = existingDate === datePrefix
    ? `${datePrefix}.${existingMicro + 1}`
    : `${datePrefix}.1`;

  const updated = content.replace(
    /version:\s*"[^"]+"/,
    `version: "${newVersion}"`,
  );

  await Deno.writeTextFile(manifestPath, updated);
  console.log(`  ${entry.name}: ${match[0]} → version: "${newVersion}"`);
  bumped++;
}

console.log(`\nDone: ${bumped} bumped, ${skipped} skipped`);
