import { z } from "npm:zod@4.3.6";
import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutBucketEncryptionCommand,
  PutBucketVersioningCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from "npm:@aws-sdk/client-s3@3.1024.0";
import {
  CreatePolicyCommand,
  GetPolicyCommand,
  IAMClient,
} from "npm:@aws-sdk/client-iam@3.1024.0";
import {
  GetCallerIdentityCommand,
  STSClient,
} from "npm:@aws-sdk/client-sts@3.1024.0";

const S3_BUCKET_NAME_RE = /^[a-z0-9][a-z0-9.\-]{1,61}[a-z0-9]$/;

export const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this provisioner (used as the unique identifier).",
  ),
  bucket_name: z.string().min(3).max(63).regex(
    S3_BUCKET_NAME_RE,
    "Bucket names must be 3-63 chars, lowercase, letters/numbers/hyphens/dots.",
  ).describe("S3 bucket name to create."),
  region: z.string().describe("AWS region for the bucket (e.g. us-east-1)."),
  prefix: z.string().optional().describe(
    "Optional key prefix within the bucket (surfaced in state for the setup step).",
  ),
  policy_name: z.string().optional().describe(
    "IAM managed policy name. Defaults to `swamp-s3-datastore-<bucket_name>`.",
  ),
});

export const StateSchema = z.object({
  bucket_name: z.string(),
  bucket_arn: z.string(),
  region: z.string(),
  prefix: z.string(),
  policy_name: z.string(),
  policy_arn: z.string(),
  created_at: z.string(),
});

type StateData = z.infer<typeof StateSchema>;

export type ProvisionerLogger = {
  info: (msg: string) => void;
  warn: (msg: string) => void;
};

type ProvisionerContext = {
  globalArgs: z.infer<typeof GlobalArgsSchema>;
  logger: ProvisionerLogger;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

export function resolvePolicyName(
  bucketName: string,
  policyName: string | undefined,
): string {
  return policyName && policyName.length > 0
    ? policyName
    : `swamp-s3-datastore-${bucketName}`;
}

export function policyDocumentFor(bucketName: string): string {
  return JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "SwampS3DatastoreBucketLevel",
        Effect: "Allow",
        Action: ["s3:ListBucket"],
        Resource: `arn:aws:s3:::${bucketName}`,
      },
      {
        Sid: "SwampS3DatastoreObjectLevel",
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
        ],
        Resource: `arn:aws:s3:::${bucketName}/*`,
      },
    ],
  });
}

export async function ensureBucket(
  s3: S3Client,
  region: string,
  bucketName: string,
  logger: ProvisionerLogger,
): Promise<void> {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    logger.info(`Bucket ${bucketName} already exists — reusing.`);
    return;
  } catch (err) {
    const name = (err as { name?: string }).name;
    if (name !== "NotFound" && name !== "NoSuchBucket") throw err;
  }

  logger.info(`Creating bucket ${bucketName} in ${region}.`);
  await s3.send(
    new CreateBucketCommand({
      Bucket: bucketName,
      // us-east-1 rejects LocationConstraint; every other region requires it.
      CreateBucketConfiguration: region === "us-east-1"
        ? undefined
        : { LocationConstraint: region as never },
    }),
  );
}

export async function hardenBucket(
  s3: S3Client,
  bucketName: string,
): Promise<void> {
  await s3.send(
    new PutPublicAccessBlockCommand({
      Bucket: bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        IgnorePublicAcls: true,
        BlockPublicPolicy: true,
        RestrictPublicBuckets: true,
      },
    }),
  );
  await s3.send(
    new PutBucketVersioningCommand({
      Bucket: bucketName,
      VersioningConfiguration: { Status: "Enabled" },
    }),
  );
  await s3.send(
    new PutBucketEncryptionCommand({
      Bucket: bucketName,
      ServerSideEncryptionConfiguration: {
        Rules: [
          {
            ApplyServerSideEncryptionByDefault: { SSEAlgorithm: "AES256" },
            BucketKeyEnabled: true,
          },
        ],
      },
    }),
  );
}

export async function getAccountId(sts: STSClient): Promise<string> {
  const resp = await sts.send(new GetCallerIdentityCommand({}));
  if (!resp.Account) {
    throw new Error("STS GetCallerIdentity returned no Account.");
  }
  return resp.Account;
}

export async function ensurePolicy(
  iam: IAMClient,
  accountId: string,
  policyName: string,
  bucketName: string,
  logger: ProvisionerLogger,
): Promise<string> {
  const expectedArn = `arn:aws:iam::${accountId}:policy/${policyName}`;
  try {
    const existing = await iam.send(
      new GetPolicyCommand({ PolicyArn: expectedArn }),
    );
    if (existing.Policy?.Arn) {
      logger.info(
        `Managed policy ${policyName} already exists — reusing. ` +
          `Not updating policy document; delete and re-run if it drifted.`,
      );
      return existing.Policy.Arn;
    }
  } catch (err) {
    const name = (err as { name?: string }).name;
    if (name !== "NoSuchEntityException") throw err;
  }

  logger.info(`Creating IAM managed policy ${policyName}.`);
  const created = await iam.send(
    new CreatePolicyCommand({
      PolicyName: policyName,
      Description:
        `Least-privilege policy for @swamp/s3-datastore on bucket ${bucketName}.`,
      PolicyDocument: policyDocumentFor(bucketName),
    }),
  );
  const arn = created.Policy?.Arn;
  if (!arn) throw new Error("IAM CreatePolicy returned no ARN.");
  return arn;
}

export const model = {
  type: "@swamp/s3-datastore-bootstrap/provisioner",
  version: "2026.04.21.1",
  globalArguments: GlobalArgsSchema,
  resources: {
    state: {
      description: "S3 bucket + IAM managed policy provisioned for swamp.",
      schema: StateSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
  },
  methods: {
    provision: {
      description:
        "Create/verify the S3 bucket and the scoped IAM managed policy for @swamp/s3-datastore.",
      arguments: z.object({}),
      execute: async (
        _args: Record<string, never>,
        context: ProvisionerContext,
      ) => {
        const g = context.globalArgs;
        const policyName = resolvePolicyName(g.bucket_name, g.policy_name);

        const s3 = new S3Client({ region: g.region });
        const iam = new IAMClient({ region: g.region });
        const sts = new STSClient({ region: g.region });

        const accountId = await getAccountId(sts);

        await ensureBucket(s3, g.region, g.bucket_name, context.logger);
        await hardenBucket(s3, g.bucket_name);

        const policyArn = await ensurePolicy(
          iam,
          accountId,
          policyName,
          g.bucket_name,
          context.logger,
        );

        const state: StateData = {
          bucket_name: g.bucket_name,
          bucket_arn: `arn:aws:s3:::${g.bucket_name}`,
          region: g.region,
          prefix: g.prefix ?? "",
          policy_name: policyName,
          policy_arn: policyArn,
          created_at: new Date().toISOString(),
        };
        const handle = await context.writeResource("state", g.name, state);
        return { dataHandles: [handle] };
      },
    },
  },
};
