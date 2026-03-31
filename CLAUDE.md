# Rules

- **Never hand-edit files under `model/`.** They are auto-generated. Fix the
  codegen pipeline in `codegen/<provider>/` and regenerate instead.
- Only touch what's necessary — don't refactor adjacent code.
- TypeScript strict mode, no `any` types in hand-written code (generated code
  may use `any`).
- Named exports only, no default exports.
- Pin all npm dependencies to exact versions (no ranges).
- `deno.lock` is committed — run `deno install --frozen` to verify.

## Testing Rules

- Never rely on live cloud services in tests.
- Use local HTTP servers (`Deno.serve({ port: 0 })`) or in-memory mock clients.
- Restore all env vars in a `finally` block.
- Tests that create SDK clients with connection pooling need
  `sanitizeResources: false` with a comment explaining why.
- Use `@systeminit/swamp-testing` conformance helpers
  (`assertVaultExportConformance`, `assertDatastoreExportConformance`, etc.).
- Canonical test example: `vault/aws-sm/extensions/vaults/aws_sm_test.ts`

## Commands

### Vault / Datastore extensions (run from extension directory)

```bash
cd vault/aws-sm  # or datastore/s3, etc.
deno check extensions/<type>/*.ts
deno lint extensions/<type>/
deno fmt extensions/<type>/
deno test <flags> extensions/<type>/
deno install --frozen
```

### Code generation (run from codegen/)

```bash
cd codegen
deno task fetch-schema:hetzner
deno task fetch-schema:digitalocean
deno task generate:hetzner
deno task generate:digitalocean
```

### Codegen verification (run from codegen/)

```bash
deno check main.ts
deno lint
deno fmt
```

After regenerating, review the diffs in `model/` to confirm only the intended
changes appear. Run generation a second time to verify idempotency — there
should be zero new diffs on the second run.

## Publishing

CI auto-publishes when `manifest.yaml` changes on main and the version is newer
than what's in the registry. Manual: `swamp extension push manifest.yaml` from
the extension directory.
