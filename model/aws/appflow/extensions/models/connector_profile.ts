// Auto-generated extension model for @swamp/aws/appflow/connector-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

export const DatadogConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the Datadog resource",
  ),
});

export const DynatraceConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the Dynatrace resource",
  ),
});

export const InforNexusConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the InforNexus resource",
  ),
});

export const MarketoConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the Marketo resource",
  ),
});

export const RedshiftConnectorProfilePropertiesSchema = z.object({
  DatabaseUrl: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The JDBC URL of the Amazon Redshift cluster.",
  ).optional(),
  BucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")).describe(
    "The name of the Amazon S3 bucket associated with Redshift.",
  ),
  BucketPrefix: z.string().max(128).describe(
    "The object key for the destination bucket in which Amazon AppFlow will place the ﬁles.",
  ).optional(),
  RoleArn: z.string().max(512).regex(new RegExp("arn:aws:iam:.*:[0-9]+:.*"))
    .describe("The Amazon Resource Name (ARN) of the IAM role."),
  IsRedshiftServerless: z.boolean().describe(
    "If Amazon AppFlow will connect to Amazon Redshift Serverless or Amazon Redshift cluster.",
  ).optional(),
  DataApiRoleArn: z.string().max(512).regex(
    new RegExp("arn:aws:iam:.*:[0-9]+:.*"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that grants Amazon AppFlow access to the data through the Amazon Redshift Data API.",
  ).optional(),
  ClusterIdentifier: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The unique identifier of the Amazon Redshift cluster.",
  ).optional(),
  WorkgroupName: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The name of the Amazon Redshift serverless workgroup",
  ).optional(),
  DatabaseName: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The name of the Amazon Redshift database that will store the transferred data.",
  ).optional(),
});

export const OAuthPropertiesSchema = z.object({
  AuthCodeUrl: z.string().max(256).regex(
    new RegExp(
      "^(https?)://[-a-zA-Z0-9+&amp;@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&amp;@#/%=~_|]",
    ),
  ).optional(),
  TokenUrl: z.string().max(256).regex(
    new RegExp(
      "^(https?)://[-a-zA-Z0-9+&amp;@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&amp;@#/%=~_|]",
    ),
  ).optional(),
  OAuthScopes: z.array(z.string().max(128).regex(new RegExp("[/\\w]*")))
    .optional(),
});

export const SAPODataConnectorProfilePropertiesSchema = z.object({
  ApplicationHostUrl: z.string().max(256).regex(
    new RegExp(
      "^(https?)://[-a-zA-Z0-9+&amp;@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&amp;@#/%=~_|]",
    ),
  ).optional(),
  ApplicationServicePath: z.string().max(512).regex(new RegExp("\\S+"))
    .optional(),
  PortNumber: z.number().int().min(1).max(65535).optional(),
  ClientNumber: z.string().min(3).max(3).regex(new RegExp("^\\d{3}$"))
    .optional(),
  LogonLanguage: z.string().max(2).regex(new RegExp("^[a-zA-Z0-9_]*$"))
    .optional(),
  PrivateLinkServiceName: z.string().max(512).regex(new RegExp("\\S+"))
    .optional(),
  OAuthProperties: OAuthPropertiesSchema.optional(),
  DisableSSO: z.boolean().describe(
    "If you set this parameter to true, Amazon AppFlow bypasses the single sign-on (SSO) settings in your SAP account when it accesses your SAP OData instance.",
  ).optional(),
});

export const SalesforceConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the Salesforce resource",
  ).optional(),
  isSandboxEnvironment: z.boolean().describe(
    "Indicates whether the connector profile applies to a sandbox or production environment",
  ).optional(),
  usePrivateLinkForMetadataAndAuthorization: z.boolean().describe(
    "Indicates whether to make Metadata And Authorization calls over Pivate Network",
  ).optional(),
});

export const PardotConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the Salesforce Pardot resource",
  ).optional(),
  IsSandboxEnvironment: z.boolean().describe(
    "Indicates whether the connector profile applies to a demo or production environment",
  ).optional(),
  BusinessUnitId: z.string().max(18).regex(new RegExp("\\S+")).describe(
    "The Business unit id of Salesforce Pardot instance to be connected",
  ),
});

export const ServiceNowConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the ServiceNow resource",
  ),
});

export const SlackConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the Slack resource",
  ),
});

export const SnowflakeConnectorProfilePropertiesSchema = z.object({
  Warehouse: z.string().max(512).regex(new RegExp("[\\s\\w/!@#+=.-]*"))
    .describe("The name of the Snowﬂake warehouse."),
  Stage: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The name of the Amazon S3 stage that was created while setting up an Amazon S3 stage in the Snowﬂake account. This is written in the following format: .",
  ),
  BucketName: z.string().min(3).max(63).regex(new RegExp("\\S+")).describe(
    "The name of the Amazon S3 bucket associated with Snowﬂake.",
  ),
  BucketPrefix: z.string().max(128).describe(
    "The bucket prefix that refers to the Amazon S3 bucket associated with Snowﬂake.",
  ).optional(),
  PrivateLinkServiceName: z.string().max(512).regex(new RegExp("\\S+"))
    .describe(
      "The Snowﬂake Private Link service name to be used for private data transfers.",
    ).optional(),
  AccountName: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The name of the account.",
  ).optional(),
  Region: z.string().max(64).regex(new RegExp("\\S+")).describe(
    "The region of the Snowﬂake account.",
  ).optional(),
});

export const VeevaConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the Veeva resource",
  ),
});

export const ZendeskConnectorProfilePropertiesSchema = z.object({
  InstanceUrl: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The location of the Zendesk resource",
  ),
});

export const OAuth2PropertiesSchema = z.object({
  TokenUrl: z.string().min(0).max(256).regex(
    new RegExp(
      "^(https?)://[-a-zA-Z0-9+&amp;@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&amp;@#/%=~_|]",
    ),
  ).optional(),
  OAuth2GrantType: z.enum([
    "CLIENT_CREDENTIALS",
    "AUTHORIZATION_CODE",
    "JWT_BEARER",
  ]).optional(),
  TokenUrlCustomProperties: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(new RegExp("\\S+")),
  ).describe("A map for properties for custom connector Token Url.").optional(),
});

export const CustomConnectorProfilePropertiesSchema = z.object({
  ProfileProperties: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(new RegExp("\\S+")),
  ).describe("A map for properties for custom connector.").optional(),
  OAuth2Properties: OAuth2PropertiesSchema.optional(),
});

export const ConnectorProfilePropertiesSchema = z.object({
  Datadog: DatadogConnectorProfilePropertiesSchema.optional(),
  Dynatrace: DynatraceConnectorProfilePropertiesSchema.optional(),
  InforNexus: InforNexusConnectorProfilePropertiesSchema.optional(),
  Marketo: MarketoConnectorProfilePropertiesSchema.optional(),
  Redshift: RedshiftConnectorProfilePropertiesSchema.optional(),
  SAPOData: SAPODataConnectorProfilePropertiesSchema.optional(),
  Salesforce: SalesforceConnectorProfilePropertiesSchema.optional(),
  Pardot: PardotConnectorProfilePropertiesSchema.optional(),
  ServiceNow: ServiceNowConnectorProfilePropertiesSchema.optional(),
  Slack: SlackConnectorProfilePropertiesSchema.optional(),
  Snowflake: SnowflakeConnectorProfilePropertiesSchema.optional(),
  Veeva: VeevaConnectorProfilePropertiesSchema.optional(),
  Zendesk: ZendeskConnectorProfilePropertiesSchema.optional(),
  CustomConnector: CustomConnectorProfilePropertiesSchema.optional(),
});

export const AmplitudeConnectorProfileCredentialsSchema = z.object({
  ApiKey: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "A unique alphanumeric identiﬁer used to authenticate a user, developer, or calling program to your API.",
  ),
  SecretKey: z.string().max(256).regex(new RegExp("\\S+")),
});

export const DatadogConnectorProfileCredentialsSchema = z.object({
  ApiKey: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "A unique alphanumeric identiﬁer used to authenticate a user, developer, or calling program to your API.",
  ),
  ApplicationKey: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "Application keys, in conjunction with your API key, give you full access to Datadog’s programmatic API. Application keys are associated with the user account that created them. The application key is used to log all requests made to the API.",
  ),
});

export const DynatraceConnectorProfileCredentialsSchema = z.object({
  ApiToken: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The API tokens used by Dynatrace API to authenticate various API calls.",
  ),
});

export const ConnectorOAuthRequestSchema = z.object({
  AuthCode: z.string().describe(
    "The code provided by the connector when it has been authenticated via the connected app.",
  ).optional(),
  RedirectUri: z.string().describe(
    "The URL to which the authentication server redirects the browser after authorization has been granted.",
  ).optional(),
});

export const GoogleAnalyticsConnectorProfileCredentialsSchema = z.object({
  ClientId: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The identiﬁer for the desired client.",
  ),
  ClientSecret: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The client secret used by the oauth client to authenticate to the authorization server.",
  ),
  AccessToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to access protected resources.",
  ).optional(),
  RefreshToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to acquire new access tokens.",
  ).optional(),
  ConnectorOAuthRequest: ConnectorOAuthRequestSchema.describe(
    "The oauth needed to request security tokens from the connector endpoint.",
  ).optional(),
});

export const InforNexusConnectorProfileCredentialsSchema = z.object({
  AccessKeyId: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The Access Key portion of the credentials.",
  ),
  UserId: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The identiﬁer for the user.",
  ),
  SecretAccessKey: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The secret key used to sign requests.",
  ),
  Datakey: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The encryption keys used to encrypt data.",
  ),
});

export const MarketoConnectorProfileCredentialsSchema = z.object({
  ClientId: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The identiﬁer for the desired client.",
  ),
  ClientSecret: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The client secret used by the oauth client to authenticate to the authorization server.",
  ),
  AccessToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to access protected resources.",
  ).optional(),
  ConnectorOAuthRequest: ConnectorOAuthRequestSchema.describe(
    "The oauth needed to request security tokens from the connector endpoint.",
  ).optional(),
});

export const RedshiftConnectorProfileCredentialsSchema = z.object({
  Username: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The name of the user.",
  ).optional(),
  Password: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The password that corresponds to the username.",
  ).optional(),
});

export const BasicAuthCredentialsSchema = z.object({
  Username: z.string().max(512).regex(new RegExp("\\S+")),
  Password: z.string().max(512).regex(new RegExp("\\S+")),
});

export const SAPODataConnectorProfileCredentialsSchema = z.object({
  BasicAuthCredentials: BasicAuthCredentialsSchema.optional(),
  OAuthCredentials: z.object({
    AccessToken: z.string().max(4096).regex(new RegExp("\\S+")).optional(),
    RefreshToken: z.string().max(4096).regex(new RegExp("\\S+")).optional(),
    ConnectorOAuthRequest: ConnectorOAuthRequestSchema.optional(),
    ClientId: z.string().max(512).regex(new RegExp("\\S+")).optional(),
    ClientSecret: z.string().max(512).regex(new RegExp("\\S+")).optional(),
  }).optional(),
});

export const SalesforceConnectorProfileCredentialsSchema = z.object({
  AccessToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to access protected resources.",
  ).optional(),
  RefreshToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to acquire new access tokens.",
  ).optional(),
  ConnectorOAuthRequest: ConnectorOAuthRequestSchema.describe(
    "The oauth needed to request security tokens from the connector endpoint.",
  ).optional(),
  ClientCredentialsArn: z.string().max(2048).regex(
    new RegExp("arn:aws:secretsmanager:.*:[0-9]+:.*"),
  ).describe("The client credentials to fetch access token and refresh token.")
    .optional(),
  OAuth2GrantType: z.enum([
    "CLIENT_CREDENTIALS",
    "AUTHORIZATION_CODE",
    "JWT_BEARER",
  ]).describe("The grant types to fetch an access token").optional(),
  JwtToken: z.string().max(8000).regex(
    new RegExp("^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_.+/=]*$"),
  ).describe("The credentials used to access your Salesforce records")
    .optional(),
});

export const PardotConnectorProfileCredentialsSchema = z.object({
  AccessToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to access protected resources.",
  ).optional(),
  RefreshToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to acquire new access tokens.",
  ).optional(),
  ConnectorOAuthRequest: ConnectorOAuthRequestSchema.describe(
    "The oauth needed to request security tokens from the connector endpoint.",
  ).optional(),
  ClientCredentialsArn: z.string().max(2048).regex(
    new RegExp("arn:aws:secretsmanager:.*:[0-9]+:.*"),
  ).describe("The client credentials to fetch access token and refresh token.")
    .optional(),
});

export const OAuth2CredentialsSchema = z.object({
  ClientId: z.string().max(512).regex(new RegExp("\\S+")).optional(),
  ClientSecret: z.string().max(512).regex(new RegExp("\\S+")).optional(),
  AccessToken: z.string().max(4096).regex(new RegExp("\\S+")).optional(),
  RefreshToken: z.string().max(4096).regex(new RegExp("\\S+")).optional(),
  OAuthRequest: ConnectorOAuthRequestSchema.optional(),
});

export const ServiceNowConnectorProfileCredentialsSchema = z.object({
  Username: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The name of the user.",
  ).optional(),
  Password: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The password that corresponds to the username.",
  ).optional(),
  OAuth2Credentials: OAuth2CredentialsSchema.describe(
    "The OAuth 2.0 credentials required to authenticate the user.",
  ).optional(),
});

export const SingularConnectorProfileCredentialsSchema = z.object({
  ApiKey: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "A unique alphanumeric identiﬁer used to authenticate a user, developer, or calling program to your API.",
  ),
});

export const SlackConnectorProfileCredentialsSchema = z.object({
  ClientId: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The identiﬁer for the desired client.",
  ),
  ClientSecret: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The client secret used by the oauth client to authenticate to the authorization server.",
  ),
  AccessToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to access protected resources.",
  ).optional(),
  ConnectorOAuthRequest: ConnectorOAuthRequestSchema.describe(
    "The oauth needed to request security tokens from the connector endpoint.",
  ).optional(),
});

export const SnowflakeConnectorProfileCredentialsSchema = z.object({
  Username: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The name of the user.",
  ),
  Password: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The password that corresponds to the username.",
  ),
});

export const TrendmicroConnectorProfileCredentialsSchema = z.object({
  ApiSecretKey: z.string().max(256).regex(new RegExp("\\S+")).describe(
    "The Secret Access Key portion of the credentials.",
  ),
});

export const VeevaConnectorProfileCredentialsSchema = z.object({
  Username: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The name of the user.",
  ),
  Password: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The password that corresponds to the username.",
  ),
});

export const ZendeskConnectorProfileCredentialsSchema = z.object({
  ClientId: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The identiﬁer for the desired client.",
  ),
  ClientSecret: z.string().max(512).regex(new RegExp("\\S+")).describe(
    "The client secret used by the oauth client to authenticate to the authorization server.",
  ),
  AccessToken: z.string().max(4096).regex(new RegExp("\\S+")).describe(
    "The credentials used to access protected resources.",
  ).optional(),
  ConnectorOAuthRequest: ConnectorOAuthRequestSchema.describe(
    "The oauth needed to request security tokens from the connector endpoint.",
  ).optional(),
});

export const ApiKeyCredentialsSchema = z.object({
  ApiKey: z.string().max(256).regex(new RegExp("\\S+")),
  ApiSecretKey: z.string().max(256).regex(new RegExp("\\S+")).optional(),
});

export const CustomAuthCredentialsSchema = z.object({
  CustomAuthenticationType: z.string().max(256).regex(new RegExp("\\S+")),
  CredentialsMap: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(new RegExp("\\S+")),
  ).describe("A map for properties for custom authentication.").optional(),
});

export const CustomConnectorProfileCredentialsSchema = z.object({
  AuthenticationType: z.enum(["OAUTH2", "APIKEY", "BASIC", "CUSTOM"]),
  Basic: BasicAuthCredentialsSchema.optional(),
  Oauth2: OAuth2CredentialsSchema.optional(),
  ApiKey: ApiKeyCredentialsSchema.optional(),
  Custom: CustomAuthCredentialsSchema.optional(),
});

export const ConnectorProfileCredentialsSchema = z.object({
  Amplitude: AmplitudeConnectorProfileCredentialsSchema.optional(),
  Datadog: DatadogConnectorProfileCredentialsSchema.optional(),
  Dynatrace: DynatraceConnectorProfileCredentialsSchema.optional(),
  GoogleAnalytics: GoogleAnalyticsConnectorProfileCredentialsSchema.optional(),
  InforNexus: InforNexusConnectorProfileCredentialsSchema.optional(),
  Marketo: MarketoConnectorProfileCredentialsSchema.optional(),
  Redshift: RedshiftConnectorProfileCredentialsSchema.optional(),
  SAPOData: SAPODataConnectorProfileCredentialsSchema.optional(),
  Salesforce: SalesforceConnectorProfileCredentialsSchema.optional(),
  Pardot: PardotConnectorProfileCredentialsSchema.optional(),
  ServiceNow: ServiceNowConnectorProfileCredentialsSchema.optional(),
  Singular: SingularConnectorProfileCredentialsSchema.optional(),
  Slack: SlackConnectorProfileCredentialsSchema.optional(),
  Snowflake: SnowflakeConnectorProfileCredentialsSchema.optional(),
  Trendmicro: TrendmicroConnectorProfileCredentialsSchema.optional(),
  Veeva: VeevaConnectorProfileCredentialsSchema.optional(),
  Zendesk: ZendeskConnectorProfileCredentialsSchema.optional(),
  CustomConnector: CustomConnectorProfileCredentialsSchema.optional(),
});

const GlobalArgsSchema = z.object({
  ConnectorLabel: z.string().max(256).regex(new RegExp("[\\w!@#.-]+")).describe(
    "The label of the connector. The label is unique for each ConnectorRegistration in your AWS account. Only needed if calling for CUSTOMCONNECTOR connector type/.",
  ).optional(),
  ConnectorProfileName: z.string().max(256).regex(new RegExp("[\\w/!@#+=.-]+"))
    .describe("The maximum number of items to retrieve in a single batch."),
  KMSArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws:kms:.*:[0-9]+:.*"),
  ).describe(
    "The ARN of the AWS Key Management Service (AWS KMS) key that's used to encrypt your function's environment variables. If it's not provided, AWS Lambda uses a default service key.",
  ).optional(),
  ConnectorType: z.enum([
    "Salesforce",
    "Pardot",
    "Singular",
    "Slack",
    "Redshift",
    "Marketo",
    "Googleanalytics",
    "Zendesk",
    "Servicenow",
    "SAPOData",
    "Datadog",
    "Trendmicro",
    "Snowflake",
    "Dynatrace",
    "Infornexus",
    "Amplitude",
    "Veeva",
    "CustomConnector",
  ]).describe(
    "List of Saas providers that need connector profile to be created",
  ),
  ConnectionMode: z.enum(["Public", "Private"]).describe(
    "Mode in which data transfer should be enabled. Private connection mode is currently enabled for Salesforce, Snowflake, Trendmicro and Singular",
  ),
  ConnectorProfileConfig: z.object({
    ConnectorProfileProperties: ConnectorProfilePropertiesSchema.describe(
      "Connector specific properties needed to create connector profile - currently not needed for Amplitude, Trendmicro, Googleanalytics and Singular",
    ).optional(),
    ConnectorProfileCredentials: ConnectorProfileCredentialsSchema.describe(
      "Connector specific configuration needed to create connector profile based on Authentication mechanism",
    ).optional(),
  }).describe(
    "Connector specific configurations needed to create connector profile",
  ).optional(),
});

const StateSchema = z.object({
  ConnectorProfileArn: z.string().optional(),
  ConnectorLabel: z.string().optional(),
  ConnectorProfileName: z.string(),
  KMSArn: z.string().optional(),
  ConnectorType: z.string().optional(),
  ConnectionMode: z.string().optional(),
  ConnectorProfileConfig: z.object({
    ConnectorProfileProperties: ConnectorProfilePropertiesSchema,
    ConnectorProfileCredentials: ConnectorProfileCredentialsSchema,
  }).optional(),
  CredentialsArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ConnectorLabel: z.string().max(256).regex(new RegExp("[\\w!@#.-]+")).describe(
    "The label of the connector. The label is unique for each ConnectorRegistration in your AWS account. Only needed if calling for CUSTOMCONNECTOR connector type/.",
  ).optional(),
  ConnectorProfileName: z.string().max(256).regex(new RegExp("[\\w/!@#+=.-]+"))
    .describe("The maximum number of items to retrieve in a single batch.")
    .optional(),
  KMSArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws:kms:.*:[0-9]+:.*"),
  ).describe(
    "The ARN of the AWS Key Management Service (AWS KMS) key that's used to encrypt your function's environment variables. If it's not provided, AWS Lambda uses a default service key.",
  ).optional(),
  ConnectorType: z.enum([
    "Salesforce",
    "Pardot",
    "Singular",
    "Slack",
    "Redshift",
    "Marketo",
    "Googleanalytics",
    "Zendesk",
    "Servicenow",
    "SAPOData",
    "Datadog",
    "Trendmicro",
    "Snowflake",
    "Dynatrace",
    "Infornexus",
    "Amplitude",
    "Veeva",
    "CustomConnector",
  ]).describe(
    "List of Saas providers that need connector profile to be created",
  ).optional(),
  ConnectionMode: z.enum(["Public", "Private"]).describe(
    "Mode in which data transfer should be enabled. Private connection mode is currently enabled for Salesforce, Snowflake, Trendmicro and Singular",
  ).optional(),
  ConnectorProfileConfig: z.object({
    ConnectorProfileProperties: ConnectorProfilePropertiesSchema.describe(
      "Connector specific properties needed to create connector profile - currently not needed for Amplitude, Trendmicro, Googleanalytics and Singular",
    ).optional(),
    ConnectorProfileCredentials: ConnectorProfileCredentialsSchema.describe(
      "Connector specific configuration needed to create connector profile based on Authentication mechanism",
    ).optional(),
  }).describe(
    "Connector specific configurations needed to create connector profile",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/appflow/connector-profile",
  version: "2026.04.01.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppFlow ConnectorProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppFlow ConnectorProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::AppFlow::ConnectorProfile",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.ConnectorProfileName ?? g.ConnectorProfileName)?.toString() ??
            "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a AppFlow ConnectorProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppFlow ConnectorProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::AppFlow::ConnectorProfile",
          args.identifier,
        ) as StateData;
        const instanceName = (result.ConnectorProfileName ??
          context.globalArgs.ConnectorProfileName)?.toString() ??
          args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a AppFlow ConnectorProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ConnectorProfileName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConnectorProfileName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppFlow::ConnectorProfile",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::AppFlow::ConnectorProfile",
          identifier,
          currentState,
          desiredState,
          ["ConnectorProfileName", "ConnectorType", "ConnectorLabel"],
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a AppFlow ConnectorProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppFlow ConnectorProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::AppFlow::ConnectorProfile",
          args.identifier,
        );
        const instanceName =
          context.globalArgs.ConnectorProfileName?.toString() ??
            args.identifier;
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync AppFlow ConnectorProfile state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.ConnectorProfileName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.ConnectorProfileName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppFlow::ConnectorProfile",
            identifier,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              identifier,
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
  },
};
