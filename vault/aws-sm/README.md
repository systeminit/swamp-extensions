# @swamp/aws-sm

Swamp vault provider backed by
[AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/). Stores,
retrieves, and lists secrets through the AWS SDK v3, using the default AWS
credential chain for authentication.

## Installation

```sh
swamp extension pull @swamp/aws-sm
```

## Configuration

Credentials are resolved via the standard AWS credential chain — no credentials
in config. Provide them via one of:

- Environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- AWS profile: `~/.aws/credentials`
- IAM role attached to the instance, task, or pod

The calling principal must have the following IAM permissions on the target
secrets:

- `secretsmanager:GetSecretValue`
- `secretsmanager:PutSecretValue`
- `secretsmanager:CreateSecret`
- `secretsmanager:ListSecrets`

## Usage

Create a vault bound to a specific region:

```bash
swamp vault create @swamp/aws-sm my-aws-sm \
  --config '{"region": "us-east-1"}' --json
```

Read, write, and list secrets:

```bash
swamp vault get my-aws-sm my/secret/name --json
swamp vault put my-aws-sm my/secret/name "s3cr3t" --json
swamp vault list-keys my-aws-sm --json
```

## Secret key format

Secret keys map directly to AWS Secrets Manager secret names, including
path-style names such as `myapp/production/db-password`. A `put` against a
non-existent secret will create it on demand.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
