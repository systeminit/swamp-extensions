import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  createGcpClient,
  ensureBucket,
  ensureCustomRole,
  type GcpClient,
  GlobalArgsSchema,
  hardenBucket,
  resolveRoleId,
  roleNameFor,
  SWAMP_GCS_PERMISSIONS,
} from "./_lib/provisioner_impl.ts";
import { model } from "./provisioner.ts";

const SILENT_LOGGER = { info: () => {}, warn: () => {} };

// ---------------------------------------------------------------------------
// Mock HTTP helpers
// ---------------------------------------------------------------------------

type RequestRecord = {
  method: string;
  path: string;
  search: string;
  body: string;
};

function startMockServer(
  handler: (
    req: Request,
    record: RequestRecord,
  ) => Response | Promise<Response>,
): {
  endpoint: string;
  records: RequestRecord[];
  shutdown: () => Promise<void>;
} {
  const records: RequestRecord[] = [];
  const server = Deno.serve({ port: 0, onListen() {} }, async (req) => {
    const url = new URL(req.url);
    const body = await req.text();
    const record: RequestRecord = {
      method: req.method,
      path: url.pathname,
      search: url.search,
      body,
    };
    records.push(record);
    return await handler(req, record);
  });
  const addr = server.addr as Deno.NetAddr;
  return {
    endpoint: `http://localhost:${addr.port}`,
    records,
    shutdown: () => server.shutdown(),
  };
}

function makeClient(endpoint: string): GcpClient {
  return createGcpClient({
    storageBase: endpoint,
    iamBase: endpoint,
    getToken: null,
  });
}

// ---------------------------------------------------------------------------
// Structural / schema tests
// ---------------------------------------------------------------------------

Deno.test("model export has expected shape", () => {
  assertEquals(model.type, "@swamp/gcs-datastore-bootstrap/provisioner");
  assertEquals(typeof model.version, "string");
  assertEquals(Object.keys(model.methods), ["provision"]);
  assertEquals(Object.keys(model.resources), ["state"]);
  assertEquals(model.resources.state.lifetime, "infinite");
});

Deno.test("SWAMP_GCS_PERMISSIONS is the exact set the datastore needs", () => {
  assertEquals([...SWAMP_GCS_PERMISSIONS].sort(), [
    "storage.buckets.get",
    "storage.objects.create",
    "storage.objects.delete",
    "storage.objects.get",
    "storage.objects.list",
  ]);
});

Deno.test("globalArgs accepts valid configs", () => {
  GlobalArgsSchema.parse({
    bucket_name: "my-swamp-state",
    project_id: "my-gcp-project",
    location: "US",
  });
  GlobalArgsSchema.parse({
    bucket_name: "my-swamp-state",
    project_id: "my-gcp-project",
    location: "us-central1",
    prefix: "swamp",
    role_id: "customRoleName",
  });
  GlobalArgsSchema.parse({
    bucket_name: "my-swamp-state",
    project_id: "my-gcp-project",
    location: "NAM4",
  });
});

Deno.test("globalArgs rejects invalid bucket names", () => {
  for (
    const bad of [
      "ab", // too short
      "My-Bucket", // uppercase
      "-leading-hyphen", // leading hyphen
      "goog-bucket", // forbidden prefix
      "my-google-bucket", // forbidden substring
    ]
  ) {
    assertThrows(() =>
      GlobalArgsSchema.parse({
        bucket_name: bad,
        project_id: "my-gcp-project",
        location: "US",
      })
    );
  }
});

Deno.test("globalArgs requires bucket_name, project_id, location", () => {
  assertThrows(() => GlobalArgsSchema.parse({}));
  assertThrows(() =>
    GlobalArgsSchema.parse({
      project_id: "my-gcp-project",
      location: "US",
    })
  );
  assertThrows(() =>
    GlobalArgsSchema.parse({
      bucket_name: "ok-bucket",
      location: "US",
    })
  );
  assertThrows(() =>
    GlobalArgsSchema.parse({
      bucket_name: "ok-bucket",
      project_id: "my-gcp-project",
    })
  );
});

Deno.test("globalArgs rejects shell/JSON injection in location", () => {
  for (
    const bad of [
      "US'",
      'US"',
      "US; rm -rf /",
      "US && echo pwned",
      "us central1",
      "us_central1", // underscores not allowed in GCS locations
      "us.central1", // dots not allowed
    ]
  ) {
    assertThrows(() =>
      GlobalArgsSchema.parse({
        bucket_name: "ok-bucket",
        project_id: "my-gcp-project",
        location: bad,
      })
    );
  }
});

Deno.test("globalArgs rejects shell/JSON injection in project_id", () => {
  for (
    const bad of [
      "project'id",
      'project"id',
      "project;rm",
      "Project-Id", // uppercase not allowed
      "1leading-digit", // must start with letter
      "too", // too short
    ]
  ) {
    assertThrows(() =>
      GlobalArgsSchema.parse({
        bucket_name: "ok-bucket",
        project_id: bad,
        location: "US",
      })
    );
  }
});

Deno.test("globalArgs rejects shell/JSON injection in prefix", () => {
  for (
    const bad of [
      "owner's-data",
      'prefix"with"quotes',
      "prefix; rm -rf /",
      "prefix with spaces",
      "prefix\nwith-newline",
    ]
  ) {
    assertThrows(() =>
      GlobalArgsSchema.parse({
        bucket_name: "ok-bucket",
        project_id: "my-gcp-project",
        location: "US",
        prefix: bad,
      })
    );
  }
});

Deno.test("globalArgs rejects shell/JSON injection and hyphens in role_id", () => {
  for (
    const bad of [
      "role'name",
      'role"name',
      "role;rm",
      "role-with-hyphens", // GCP role IDs forbid hyphens
      "ab", // too short
    ]
  ) {
    assertThrows(() =>
      GlobalArgsSchema.parse({
        bucket_name: "ok-bucket",
        project_id: "my-gcp-project",
        location: "US",
        role_id: bad,
      })
    );
  }
});

Deno.test("globalArgs accepts the empty-string default for prefix and role_id", () => {
  // The workflow YAML defaults both to "" — the provisioner's resolveRoleId
  // treats empty as "use the default", and the empty prefix is safe in both
  // shell quoting and JSON.
  GlobalArgsSchema.parse({
    bucket_name: "ok-bucket",
    project_id: "my-gcp-project",
    location: "US",
    prefix: "",
    role_id: "",
  });
});

// ---------------------------------------------------------------------------
// resolveRoleId / roleNameFor — pure functions
// ---------------------------------------------------------------------------

Deno.test("resolveRoleId falls back when role_id is undefined", () => {
  assertEquals(
    resolveRoleId("my-bucket", undefined),
    "swampGcsDatastore_my_bucket",
  );
});

Deno.test("resolveRoleId falls back when role_id is empty string", () => {
  assertEquals(
    resolveRoleId("my-bucket", ""),
    "swampGcsDatastore_my_bucket",
  );
});

Deno.test("resolveRoleId sanitizes hyphens to underscores", () => {
  // Custom role IDs forbid hyphens; bucket names allow them. The default
  // derivation has to sanitize or the API call fails.
  assertEquals(
    resolveRoleId("swamp-prod-state", undefined),
    "swampGcsDatastore_swamp_prod_state",
  );
});

Deno.test("resolveRoleId preserves dots and underscores in bucket name", () => {
  // Both are allowed in role IDs — leave them alone.
  assertEquals(
    resolveRoleId("bucket.with_special.chars", undefined),
    "swampGcsDatastore_bucket.with_special.chars",
  );
});

Deno.test("resolveRoleId uses the override when non-empty", () => {
  assertEquals(resolveRoleId("my-bucket", "customRole"), "customRole");
});

Deno.test("roleNameFor builds the full resource name", () => {
  assertEquals(
    roleNameFor("my-project", "myRole"),
    "projects/my-project/roles/myRole",
  );
});

// ---------------------------------------------------------------------------
// ensureBucket
// ---------------------------------------------------------------------------

Deno.test("ensureBucket: reuses existing bucket when probe GET is 200", async () => {
  const server = startMockServer((req) => {
    if (req.method === "GET") {
      return new Response(JSON.stringify({ name: "my-bucket" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("unexpected", { status: 500 });
  });
  try {
    const status = await ensureBucket(
      makeClient(server.endpoint),
      "my-project",
      "my-bucket",
      "US",
      SILENT_LOGGER,
    );
    assertEquals(status, "reused");
    assertEquals(
      server.records.filter((r) => r.method === "POST").length,
      0,
    );
  } finally {
    await server.shutdown();
  }
});

Deno.test(
  "ensureBucket: creates bucket with hardening inline when probe GET is 404",
  async () => {
    const server = startMockServer((req) => {
      if (req.method === "GET") {
        return new Response(
          JSON.stringify({ error: { code: 404, message: "Not Found" } }),
          { status: 404, headers: { "content-type": "application/json" } },
        );
      }
      if (req.method === "POST") {
        return new Response(
          JSON.stringify({ name: "my-bucket" }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      return new Response("unexpected", { status: 500 });
    });
    try {
      const status = await ensureBucket(
        makeClient(server.endpoint),
        "my-project",
        "my-bucket",
        "us-central1",
        SILENT_LOGGER,
      );
      assertEquals(status, "created");

      const post = server.records.find((r) => r.method === "POST");
      if (!post) throw new Error("expected POST request");
      assertStringIncludes(post.search, "project=my-project");
      assertStringIncludes(post.body, '"name":"my-bucket"');
      assertStringIncludes(post.body, '"location":"us-central1"');
      assertStringIncludes(post.body, "uniformBucketLevelAccess");
      assertStringIncludes(post.body, "publicAccessPrevention");
      assertStringIncludes(post.body, '"enforced"');
      assertStringIncludes(post.body, "versioning");
    } finally {
      await server.shutdown();
    }
  },
);

Deno.test(
  "ensureBucket: treats 409 race as reuse when re-probe returns 200 (owned by us)",
  async () => {
    // First GET: 404 (probe — bucket doesn't appear to exist yet).
    // POST: 409 (someone slipped in between our probe and our insert).
    // Second GET: 200 (we actually own it — concurrent bootstrap run).
    let getCount = 0;
    const server = startMockServer((req) => {
      if (req.method === "GET") {
        getCount++;
        if (getCount === 1) {
          return new Response(
            JSON.stringify({ error: { code: 404 } }),
            { status: 404, headers: { "content-type": "application/json" } },
          );
        }
        return new Response(
          JSON.stringify({ name: "my-bucket" }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      if (req.method === "POST") {
        return new Response(
          JSON.stringify({
            error: {
              code: 409,
              message: "You already own this bucket.",
              errors: [{ reason: "conflict" }],
            },
          }),
          { status: 409, headers: { "content-type": "application/json" } },
        );
      }
      return new Response("unexpected", { status: 500 });
    });
    try {
      const status = await ensureBucket(
        makeClient(server.endpoint),
        "my-project",
        "my-bucket",
        "US",
        SILENT_LOGGER,
      );
      assertEquals(status, "reused");
      assertEquals(getCount, 2);
    } finally {
      await server.shutdown();
    }
  },
);

Deno.test(
  "ensureBucket: fails on 409 when re-probe returns 403 (foreign owner)",
  async () => {
    // First GET: 404. POST: 409. Second GET: 403 — a different project owns
    // the globally-unique bucket name.
    let getCount = 0;
    const server = startMockServer((req) => {
      if (req.method === "GET") {
        getCount++;
        if (getCount === 1) {
          return new Response(
            JSON.stringify({ error: { code: 404 } }),
            { status: 404, headers: { "content-type": "application/json" } },
          );
        }
        return new Response(
          JSON.stringify({ error: { code: 403 } }),
          { status: 403, headers: { "content-type": "application/json" } },
        );
      }
      if (req.method === "POST") {
        return new Response(
          JSON.stringify({ error: { code: 409 } }),
          { status: 409, headers: { "content-type": "application/json" } },
        );
      }
      return new Response("unexpected", { status: 500 });
    });
    try {
      await assertRejects(
        () =>
          ensureBucket(
            makeClient(server.endpoint),
            "my-project",
            "my-bucket",
            "US",
            SILENT_LOGGER,
          ),
        Error,
        "taken by another project",
      );
    } finally {
      await server.shutdown();
    }
  },
);

// ---------------------------------------------------------------------------
// hardenBucket
// ---------------------------------------------------------------------------

Deno.test(
  "hardenBucket: sends a single PATCH with UBLA, PAP, and versioning",
  async () => {
    const server = startMockServer(() =>
      new Response(JSON.stringify({ name: "my-bucket" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );
    try {
      await hardenBucket(makeClient(server.endpoint), "my-bucket");
      const patches = server.records.filter((r) => r.method === "PATCH");
      assertEquals(patches.length, 1);
      assertStringIncludes(patches[0].body, "uniformBucketLevelAccess");
      assertStringIncludes(patches[0].body, '"enabled":true');
      assertStringIncludes(patches[0].body, "publicAccessPrevention");
      assertStringIncludes(patches[0].body, '"enforced"');
      assertStringIncludes(patches[0].body, "versioning");
    } finally {
      await server.shutdown();
    }
  },
);

// ---------------------------------------------------------------------------
// ensureCustomRole
// ---------------------------------------------------------------------------

Deno.test(
  "ensureCustomRole: reuses existing live role when probe GET is 200 and not deleted",
  async () => {
    const server = startMockServer((req) => {
      if (req.method === "GET") {
        return new Response(
          JSON.stringify({
            name: "projects/my-project/roles/swampGcsDatastore_my_bucket",
            title: "Swamp GCS Datastore",
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      return new Response("unexpected", { status: 500 });
    });
    try {
      const name = await ensureCustomRole(
        makeClient(server.endpoint),
        "my-project",
        "swampGcsDatastore_my_bucket",
        "my-bucket",
        SILENT_LOGGER,
      );
      assertEquals(
        name,
        "projects/my-project/roles/swampGcsDatastore_my_bucket",
      );
      assertEquals(
        server.records.filter((r) => r.method === "POST").length,
        0,
      );
    } finally {
      await server.shutdown();
    }
  },
);

Deno.test(
  "ensureCustomRole: refuses to proceed when role is soft-deleted (tombstone)",
  async () => {
    const server = startMockServer((req) => {
      if (req.method === "GET") {
        return new Response(
          JSON.stringify({
            name: "projects/my-project/roles/swampGcsDatastore_my_bucket",
            deleted: true,
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      return new Response("unexpected", { status: 500 });
    });
    try {
      await assertRejects(
        () =>
          ensureCustomRole(
            makeClient(server.endpoint),
            "my-project",
            "swampGcsDatastore_my_bucket",
            "my-bucket",
            SILENT_LOGGER,
          ),
        Error,
        "gcloud iam roles undelete",
      );
      // No create attempt should have been made.
      assertEquals(
        server.records.filter((r) => r.method === "POST").length,
        0,
      );
    } finally {
      await server.shutdown();
    }
  },
);

Deno.test(
  "ensureCustomRole: creates new role when probe returns 404, with correct body",
  async () => {
    const server = startMockServer((req) => {
      if (req.method === "GET") {
        return new Response(
          JSON.stringify({ error: { code: 404 } }),
          { status: 404, headers: { "content-type": "application/json" } },
        );
      }
      if (req.method === "POST") {
        return new Response(
          JSON.stringify({
            name: "projects/my-project/roles/swampGcsDatastore_my_bucket",
            title: "Swamp GCS Datastore",
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      return new Response("unexpected", { status: 500 });
    });
    try {
      const name = await ensureCustomRole(
        makeClient(server.endpoint),
        "my-project",
        "swampGcsDatastore_my_bucket",
        "my-bucket",
        SILENT_LOGGER,
      );
      assertEquals(
        name,
        "projects/my-project/roles/swampGcsDatastore_my_bucket",
      );
      const post = server.records.find((r) => r.method === "POST");
      if (!post) throw new Error("expected POST request");
      assertStringIncludes(post.body, '"roleId":"swampGcsDatastore_my_bucket"');
      assertStringIncludes(post.body, '"title":"Swamp GCS Datastore"');
      assertStringIncludes(post.body, '"stage":"GA"');
      assertStringIncludes(post.body, "storage.buckets.get");
      assertStringIncludes(post.body, "storage.objects.list");
    } finally {
      await server.shutdown();
    }
  },
);

Deno.test(
  "ensureCustomRole: returns deterministic role name on 409 race",
  async () => {
    // Concurrent bootstrap run: GET says 404, POST loses the race and returns
    // 409 ALREADY_EXISTS. The role name is derivable from projectId + roleId,
    // so we return it rather than failing.
    const server = startMockServer((req) => {
      if (req.method === "GET") {
        return new Response(
          JSON.stringify({ error: { code: 404 } }),
          { status: 404, headers: { "content-type": "application/json" } },
        );
      }
      if (req.method === "POST") {
        return new Response(
          JSON.stringify({
            error: {
              code: 409,
              message: "Role already exists.",
              status: "ALREADY_EXISTS",
            },
          }),
          { status: 409, headers: { "content-type": "application/json" } },
        );
      }
      return new Response("unexpected", { status: 500 });
    });
    try {
      const name = await ensureCustomRole(
        makeClient(server.endpoint),
        "my-project",
        "swampGcsDatastore_my_bucket",
        "my-bucket",
        SILENT_LOGGER,
      );
      assertEquals(
        name,
        "projects/my-project/roles/swampGcsDatastore_my_bucket",
      );
    } finally {
      await server.shutdown();
    }
  },
);
