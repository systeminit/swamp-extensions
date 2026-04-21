import {
  assertEquals,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { S3Client } from "npm:@aws-sdk/client-s3@3.1024.0";
import { IAMClient } from "npm:@aws-sdk/client-iam@3.1024.0";
import { STSClient } from "npm:@aws-sdk/client-sts@3.1024.0";
import {
  ensureBucket,
  ensurePolicy,
  getAccountId,
  GlobalArgsSchema,
  hardenBucket,
  model,
  policyDocumentFor,
  resolvePolicyName,
} from "./provisioner.ts";

const TEST_CREDS = { accessKeyId: "test", secretAccessKey: "test" };
const SILENT_LOGGER = { info: () => {}, warn: () => {} };

// ---------------------------------------------------------------------------
// Structural / schema tests
// ---------------------------------------------------------------------------

Deno.test("model export has expected shape", () => {
  assertEquals(model.type, "@swamp/s3-datastore-bootstrap/provisioner");
  assertEquals(typeof model.version, "string");
  assertEquals(Object.keys(model.methods), ["provision"]);
  assertEquals(Object.keys(model.resources), ["state"]);
  assertEquals(model.resources.state.lifetime, "infinite");
});

Deno.test("globalArgs accepts valid configs", () => {
  GlobalArgsSchema.parse({
    name: "my-store",
    bucket_name: "my-swamp-state",
    region: "us-east-1",
  });
  GlobalArgsSchema.parse({
    name: "my-store",
    bucket_name: "my-swamp-state",
    region: "eu-west-1",
    prefix: "swamp",
    policy_name: "custom-name",
  });
});

Deno.test("globalArgs rejects invalid bucket names", () => {
  assertThrows(() =>
    GlobalArgsSchema.parse({
      name: "x",
      bucket_name: "ab",
      region: "us-east-1",
    })
  );
  assertThrows(() =>
    GlobalArgsSchema.parse({
      name: "x",
      bucket_name: "My-Bucket",
      region: "us-east-1",
    })
  );
  assertThrows(() =>
    GlobalArgsSchema.parse({
      name: "x",
      bucket_name: "-leading-hyphen",
      region: "us-east-1",
    })
  );
});

Deno.test("globalArgs requires name, bucket_name, region", () => {
  assertThrows(() => GlobalArgsSchema.parse({}));
  assertThrows(() =>
    GlobalArgsSchema.parse({ bucket_name: "ok-bucket", region: "us-east-1" })
  );
  assertThrows(() =>
    GlobalArgsSchema.parse({ name: "x", region: "us-east-1" })
  );
});

// ---------------------------------------------------------------------------
// resolvePolicyName — empty string must fall back to the default
// ---------------------------------------------------------------------------

Deno.test("resolvePolicyName falls back when policy_name is undefined", () => {
  assertEquals(
    resolvePolicyName("my-bucket", undefined),
    "swamp-s3-datastore-my-bucket",
  );
});

Deno.test("resolvePolicyName falls back when policy_name is an empty string", () => {
  assertEquals(
    resolvePolicyName("my-bucket", ""),
    "swamp-s3-datastore-my-bucket",
  );
});

Deno.test("resolvePolicyName uses the override when non-empty", () => {
  assertEquals(resolvePolicyName("my-bucket", "custom"), "custom");
});

// ---------------------------------------------------------------------------
// policyDocumentFor — pure function, no network
// ---------------------------------------------------------------------------

Deno.test("policyDocumentFor scopes actions to the bucket ARN", () => {
  const doc = JSON.parse(policyDocumentFor("my-bucket"));
  assertEquals(doc.Version, "2012-10-17");
  assertEquals(doc.Statement.length, 2);

  const bucketStmt = doc.Statement.find(
    (s: { Sid: string }) => s.Sid === "SwampS3DatastoreBucketLevel",
  );
  assertEquals(bucketStmt.Action, ["s3:ListBucket"]);
  assertEquals(bucketStmt.Resource, "arn:aws:s3:::my-bucket");

  const objStmt = doc.Statement.find(
    (s: { Sid: string }) => s.Sid === "SwampS3DatastoreObjectLevel",
  );
  assertEquals(objStmt.Action, [
    "s3:GetObject",
    "s3:PutObject",
    "s3:DeleteObject",
  ]);
  assertEquals(objStmt.Resource, "arn:aws:s3:::my-bucket/*");
});

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

function extractAction(body: string): string | undefined {
  const m = body.match(/(?:^|&)Action=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : undefined;
}

// ---------------------------------------------------------------------------
// ensureBucket
// ---------------------------------------------------------------------------

Deno.test({
  name:
    "ensureBucket: creates bucket when HeadBucket is 404 (us-east-1, no LocationConstraint)",
  // S3Client keeps connection pools; the SDK expects the parent runtime to
  // shut down, which Deno's sanitizer flags as a leak.
  sanitizeResources: false,
  fn: async () => {
    const server = startMockServer((req) => {
      if (req.method === "HEAD") return new Response(null, { status: 404 });
      return new Response(null, { status: 200 });
    });
    try {
      const s3 = new S3Client({
        region: "us-east-1",
        endpoint: server.endpoint,
        forcePathStyle: true,
        credentials: TEST_CREDS,
      });

      await ensureBucket(s3, "us-east-1", "my-bucket", SILENT_LOGGER);

      const heads = server.records.filter((r) => r.method === "HEAD");
      const puts = server.records.filter((r) => r.method === "PUT");
      assertEquals(heads.length, 1);
      assertEquals(puts.length, 1);
      assertEquals(puts[0].body.includes("LocationConstraint"), false);
    } finally {
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "ensureBucket: sends LocationConstraint for non-us-east-1",
  sanitizeResources: false,
  fn: async () => {
    const server = startMockServer((req) => {
      if (req.method === "HEAD") return new Response(null, { status: 404 });
      return new Response(null, { status: 200 });
    });
    try {
      const s3 = new S3Client({
        region: "eu-west-1",
        endpoint: server.endpoint,
        forcePathStyle: true,
        credentials: TEST_CREDS,
      });

      await ensureBucket(s3, "eu-west-1", "my-bucket", SILENT_LOGGER);

      const puts = server.records.filter((r) => r.method === "PUT");
      assertEquals(puts.length, 1);
      assertStringIncludes(puts[0].body, "LocationConstraint");
      assertStringIncludes(puts[0].body, "eu-west-1");
    } finally {
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "ensureBucket: skips CreateBucket when HeadBucket is 200",
  sanitizeResources: false,
  fn: async () => {
    const server = startMockServer((req) => {
      if (req.method === "HEAD") return new Response(null, { status: 200 });
      return new Response(null, { status: 500 });
    });
    try {
      const s3 = new S3Client({
        region: "us-east-1",
        endpoint: server.endpoint,
        forcePathStyle: true,
        credentials: TEST_CREDS,
      });

      await ensureBucket(s3, "us-east-1", "my-bucket", SILENT_LOGGER);

      assertEquals(
        server.records.filter((r) => r.method === "PUT").length,
        0,
      );
    } finally {
      await server.shutdown();
    }
  },
});

// ---------------------------------------------------------------------------
// hardenBucket
// ---------------------------------------------------------------------------

Deno.test({
  name:
    "hardenBucket: sends PutPublicAccessBlock, PutBucketVersioning, PutBucketEncryption",
  sanitizeResources: false,
  fn: async () => {
    const server = startMockServer(() => new Response(null, { status: 200 }));
    try {
      const s3 = new S3Client({
        region: "us-east-1",
        endpoint: server.endpoint,
        forcePathStyle: true,
        credentials: TEST_CREDS,
      });

      await hardenBucket(s3, "my-bucket");

      const searches = server.records.map((r) => r.search);
      assertEquals(
        searches.some((q) => q.includes("publicAccessBlock")),
        true,
      );
      assertEquals(searches.some((q) => q.includes("versioning")), true);
      assertEquals(searches.some((q) => q.includes("encryption")), true);
    } finally {
      await server.shutdown();
    }
  },
});

// ---------------------------------------------------------------------------
// getAccountId (STS)
// ---------------------------------------------------------------------------

Deno.test({
  name: "getAccountId: parses Account from GetCallerIdentity response",
  sanitizeResources: false,
  fn: async () => {
    const server = startMockServer(() =>
      new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<GetCallerIdentityResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
  <GetCallerIdentityResult>
    <UserId>AIDACKCEVSQ6C2EXAMPLE</UserId>
    <Account>123456789012</Account>
    <Arn>arn:aws:iam::123456789012:user/test</Arn>
  </GetCallerIdentityResult>
</GetCallerIdentityResponse>`,
        { status: 200, headers: { "content-type": "text/xml" } },
      )
    );
    try {
      const sts = new STSClient({
        region: "us-east-1",
        endpoint: server.endpoint,
        credentials: TEST_CREDS,
      });

      const account = await getAccountId(sts);
      assertEquals(account, "123456789012");
    } finally {
      await server.shutdown();
    }
  },
});

// ---------------------------------------------------------------------------
// ensurePolicy (IAM)
// ---------------------------------------------------------------------------

Deno.test({
  name: "ensurePolicy: creates new policy when GetPolicy returns NoSuchEntity",
  sanitizeResources: false,
  fn: async () => {
    const server = startMockServer((_req, record) => {
      const action = extractAction(record.body);
      if (action === "GetPolicy") {
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>
<ErrorResponse xmlns="https://iam.amazonaws.com/doc/2010-05-08/">
  <Error>
    <Type>Sender</Type>
    <Code>NoSuchEntity</Code>
    <Message>Policy does not exist.</Message>
  </Error>
  <RequestId>req-1</RequestId>
</ErrorResponse>`,
          { status: 404, headers: { "content-type": "text/xml" } },
        );
      }
      if (action === "CreatePolicy") {
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>
<CreatePolicyResponse xmlns="https://iam.amazonaws.com/doc/2010-05-08/">
  <CreatePolicyResult>
    <Policy>
      <Arn>arn:aws:iam::123456789012:policy/my-policy</Arn>
      <PolicyId>ABC</PolicyId>
      <PolicyName>my-policy</PolicyName>
    </Policy>
  </CreatePolicyResult>
  <ResponseMetadata><RequestId>req-2</RequestId></ResponseMetadata>
</CreatePolicyResponse>`,
          { status: 200, headers: { "content-type": "text/xml" } },
        );
      }
      return new Response("", { status: 500 });
    });
    try {
      const iam = new IAMClient({
        region: "us-east-1",
        endpoint: server.endpoint,
        credentials: TEST_CREDS,
      });

      const arn = await ensurePolicy(
        iam,
        "123456789012",
        "my-policy",
        "my-bucket",
        SILENT_LOGGER,
      );
      assertEquals(arn, "arn:aws:iam::123456789012:policy/my-policy");

      const actions = server.records.map((r) => extractAction(r.body));
      assertEquals(actions.includes("GetPolicy"), true);
      assertEquals(actions.includes("CreatePolicy"), true);
    } finally {
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "ensurePolicy: reuses existing policy when GetPolicy returns 200",
  sanitizeResources: false,
  fn: async () => {
    const server = startMockServer((_req, record) => {
      const action = extractAction(record.body);
      if (action === "GetPolicy") {
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>
<GetPolicyResponse xmlns="https://iam.amazonaws.com/doc/2010-05-08/">
  <GetPolicyResult>
    <Policy>
      <Arn>arn:aws:iam::123456789012:policy/my-policy</Arn>
      <PolicyId>ABC</PolicyId>
      <PolicyName>my-policy</PolicyName>
    </Policy>
  </GetPolicyResult>
  <ResponseMetadata><RequestId>req-3</RequestId></ResponseMetadata>
</GetPolicyResponse>`,
          { status: 200, headers: { "content-type": "text/xml" } },
        );
      }
      return new Response("", { status: 500 });
    });
    try {
      const iam = new IAMClient({
        region: "us-east-1",
        endpoint: server.endpoint,
        credentials: TEST_CREDS,
      });

      const arn = await ensurePolicy(
        iam,
        "123456789012",
        "my-policy",
        "my-bucket",
        SILENT_LOGGER,
      );
      assertEquals(arn, "arn:aws:iam::123456789012:policy/my-policy");

      const actions = server.records.map((r) => extractAction(r.body));
      assertEquals(actions, ["GetPolicy"]);
    } finally {
      await server.shutdown();
    }
  },
});
