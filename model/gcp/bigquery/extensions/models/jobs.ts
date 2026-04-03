// Auto-generated extension model for @swamp/gcp/bigquery/jobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://bigquery.googleapis.com/bigquery/v2/";

const GET_CONFIG = {
  "id": "bigquery.jobs.get",
  "path": "projects/{+projectId}/jobs/{+jobId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "bigquery.jobs.insert",
  "path": "projects/{+projectId}/jobs",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
  ],
  "parameters": {
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "bigquery.jobs.delete",
  "path": "projects/{+projectId}/jobs/{+jobId}/delete",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "projectId",
    "jobId",
  ],
  "parameters": {
    "jobId": {
      "location": "path",
      "required": true,
    },
    "location": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  configuration: z.object({
    copy: z.object({
      createDisposition: z.string().describe(
        "Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string().describe(
          "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
        ).optional(),
      }).describe("Configuration for Cloud KMS encryption settings.")
        .optional(),
      destinationExpirationTime: z.string().describe(
        "Optional. The time when the destination table expires. Expired tables will be deleted and their storage reclaimed.",
      ).optional(),
      destinationTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      operationType: z.enum([
        "OPERATION_TYPE_UNSPECIFIED",
        "COPY",
        "SNAPSHOT",
        "RESTORE",
        "CLONE",
      ]).describe("Optional. Supported operation types in table copy job.")
        .optional(),
      sourceTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      sourceTables: z.array(z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      })).describe("[Pick one] Source tables to copy.").optional(),
      writeDisposition: z.string().describe(
        "Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the table data and uses the schema and table constraints from the source table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
    }).describe(
      "JobConfigurationTableCopy configures a job that copies data from one table to another. For more information on copying tables, see [Copy a table](https://cloud.google.com/bigquery/docs/managing-tables#copy-table).",
    ).optional(),
    dryRun: z.boolean().describe(
      "Optional. If set, don't actually run this job. A valid query will return a mostly empty response with some processing statistics, while an invalid query will return the same error it would if it wasn't a dry run. Behavior of non-query jobs is undefined.",
    ).optional(),
    extract: z.object({
      compression: z.string().describe(
        "Optional. The compression type to use for exported files. Possible values include DEFLATE, GZIP, NONE, SNAPPY, and ZSTD. The default value is NONE. Not all compression formats are support for all file formats. DEFLATE is only supported for Avro. ZSTD is only supported for Parquet. Not applicable when extracting models.",
      ).optional(),
      destinationFormat: z.string().describe(
        "Optional. The exported file format. Possible values include CSV, NEWLINE_DELIMITED_JSON, PARQUET, or AVRO for tables and ML_TF_SAVED_MODEL or ML_XGBOOST_BOOSTER for models. The default value for tables is CSV. Tables with nested or repeated fields cannot be exported as CSV. The default value for models is ML_TF_SAVED_MODEL.",
      ).optional(),
      destinationUri: z.string().describe(
        "[Pick one] DEPRECATED: Use destinationUris instead, passing only one URI as necessary. The fully-qualified Google Cloud Storage URI where the extracted table should be written.",
      ).optional(),
      destinationUris: z.array(z.string()).describe(
        "[Pick one] A list of fully-qualified Google Cloud Storage URIs where the extracted table should be written.",
      ).optional(),
      fieldDelimiter: z.string().describe(
        "Optional. When extracting data in CSV format, this defines the delimiter to use between fields in the exported data. Default is ','. Not applicable when extracting models.",
      ).optional(),
      modelExtractOptions: z.object({
        trialId: z.string().describe(
          "The 1-based ID of the trial to be exported from a hyperparameter tuning model. If not specified, the trial with id = [Model](https://cloud.google.com/bigquery/docs/reference/rest/v2/models#resource:-model).defaultTrialId is exported. This field is ignored for models not trained with hyperparameter tuning.",
        ).optional(),
      }).describe("Options related to model extraction.").optional(),
      printHeader: z.boolean().describe(
        "Optional. Whether to print out a header row in the results. Default is true. Not applicable when extracting models.",
      ).optional(),
      sourceModel: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this model.",
        ).optional(),
        modelId: z.string().describe(
          "Required. The ID of the model. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this model.",
        ).optional(),
      }).describe("Id path of a model.").optional(),
      sourceTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      useAvroLogicalTypes: z.boolean().describe(
        "Whether to use logical types when extracting to AVRO format. Not applicable when extracting models.",
      ).optional(),
    }).describe(
      "JobConfigurationExtract configures a job that exports data from a BigQuery table into Google Cloud Storage.",
    ).optional(),
    jobTimeoutMs: z.string().describe(
      "Optional. Job timeout in milliseconds relative to the job creation time. If this time limit is exceeded, BigQuery attempts to stop the job, but might not always succeed in canceling it before the job completes. For example, a job that takes more than 60 seconds to complete has a better chance of being stopped than a job that takes 10 seconds to complete.",
    ).optional(),
    jobType: z.string().describe(
      "Output only. The type of the job. Can be QUERY, LOAD, EXTRACT, COPY or UNKNOWN.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels associated with this job. You can use these to organize and group your jobs. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key.",
    ).optional(),
    load: z.object({
      allowJaggedRows: z.boolean().describe(
        "Optional. Accept rows that are missing trailing optional columns. The missing values are treated as nulls. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. Only applicable to CSV, ignored for other formats.",
      ).optional(),
      allowQuotedNewlines: z.boolean().describe(
        "Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false.",
      ).optional(),
      autodetect: z.boolean().describe(
        "Optional. Indicates if we should automatically infer the options and schema for CSV and JSON sources.",
      ).optional(),
      clustering: z.object({
        fields: z.array(z.string()).describe(
          "One or more fields on which data should be clustered. Only top-level, non-repeated, simple-type fields are supported. The ordering of the clustering fields should be prioritized from most to least important for filtering purposes. For additional information, see [Introduction to clustered tables](https://cloud.google.com/bigquery/docs/clustered-tables#limitations).",
        ).optional(),
      }).describe("Configures table clustering.").optional(),
      columnNameCharacterMap: z.enum([
        "COLUMN_NAME_CHARACTER_MAP_UNSPECIFIED",
        "STRICT",
        "V1",
        "V2",
      ]).describe(
        "Optional. Character map supported for column names in CSV/Parquet loads. Defaults to STRICT and can be overridden by Project Config Service. Using this option with unsupporting load formats will result in an error.",
      ).optional(),
      connectionProperties: z.array(z.object({
        key: z.string().describe("The key of the property to set.").optional(),
        value: z.string().describe("The value of the property to set.")
          .optional(),
      })).describe(
        "Optional. Connection properties which can modify the load job behavior. Currently, only the 'session_id' connection property is supported, and is used to resolve _SESSION appearing as the dataset id.",
      ).optional(),
      copyFilesOnly: z.boolean().describe(
        "Optional. [Experimental] Configures the load job to copy files directly to the destination BigLake managed table, bypassing file content reading and rewriting. Copying files only is supported when all the following are true: * `source_uris` are located in the same Cloud Storage location as the destination table's `storage_uri` location. * `source_format` is `PARQUET`. * `destination_table` is an existing BigLake managed table. The table's schema does not have flexible column names. The table's columns do not have type parameters other than precision and scale. * No options other than the above are specified.",
      ).optional(),
      createDisposition: z.string().describe(
        "Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
      createSession: z.boolean().describe(
        "Optional. If this property is true, the job creates a new session using a randomly generated session_id. To continue using a created session with subsequent queries, pass the existing session identifier as a `ConnectionProperty` value. The session identifier is returned as part of the `SessionInfo` message within the query statistics. The new session's location will be set to `Job.JobReference.location` if it is present, otherwise it's set to the default location based on existing routing logic.",
      ).optional(),
      dateFormat: z.string().describe(
        "Optional. Date format used for parsing DATE values.",
      ).optional(),
      datetimeFormat: z.string().describe(
        "Optional. Date format used for parsing DATETIME values.",
      ).optional(),
      decimalTargetTypes: z.array(
        z.enum([
          "DECIMAL_TARGET_TYPE_UNSPECIFIED",
          "NUMERIC",
          "BIGNUMERIC",
          "STRING",
        ]),
      ).describe(
        'Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: * (38,9) -> NUMERIC; * (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); * (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); * (76,38) -> BIGNUMERIC; * (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats.',
      ).optional(),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string().describe(
          "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
        ).optional(),
      }).describe("Configuration for Cloud KMS encryption settings.")
        .optional(),
      destinationTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      destinationTableProperties: z.object({
        description: z.string().describe(
          "Optional. The description for the destination table. This will only be used if the destination table is newly created. If the table already exists and a value different than the current description is provided, the job will fail.",
        ).optional(),
        expirationTime: z.string().describe("Internal use only.").optional(),
        friendlyName: z.string().describe(
          "Optional. Friendly name for the destination table. If the table already exists, it should be same as the existing friendly name.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Optional. The labels associated with this table. You can use these to organize and group your tables. This will only be used if the destination table is newly created. If the table already exists and labels are different than the current labels are provided, the job will fail.",
        ).optional(),
      }).describe("Properties for the destination table.").optional(),
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the `quote` and `fieldDelimiter` properties. If you don't specify an encoding, or if you specify a UTF-8 encoding when the CSV file is not UTF-8 encoded, BigQuery attempts to convert the data to UTF-8. Generally, your data loads successfully, but it may not match byte-for-byte what you expect. To avoid this, specify the correct encoding by using the `--encoding` flag. If BigQuery can't convert a character other than the ASCII `0` character, BigQuery converts the character to the standard Unicode replacement character: �.",
      ).optional(),
      fieldDelimiter: z.string().describe(
        'Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C).',
      ).optional(),
      fileSetSpecType: z.enum([
        "FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH",
        "FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST",
      ]).describe(
        "Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default, source URIs are expanded against the underlying storage. You can also specify manifest files to control how the file set is constructed. This option is only applicable to object storage systems.",
      ).optional(),
      hivePartitioningOptions: z.object({
        fields: z.array(z.string()).describe(
          "Output only. For permanent external tables, this field is populated with the hive partition keys in the order they were inferred. The types of the partition keys can be deduced by checking the table schema (which will include the partition keys). Not every API will populate this field in the output. For example, Tables.Get will populate it, but Tables.List will not contain this field.",
        ).optional(),
        mode: z.string().describe(
          "Optional. When set, what mode of hive partitioning to use when reading data. The following modes are supported: * AUTO: automatically infer partition key name(s) and type(s). * STRINGS: automatically infer partition key name(s). All types are strings. * CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported formats are: JSON, CSV, ORC, Avro and Parquet.",
        ).optional(),
        requirePartitionFilter: z.boolean().describe(
          "Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with require_partition_filter explicitly set to true will fail.",
        ).optional(),
        sourceUriPrefix: z.string().describe(
          "Optional. When hive partition detection is requested, a common prefix for all source uris must be required. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout: gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/. CUSTOM detection requires encoding the partitioning schema immediately after the common prefix. For CUSTOM, any of * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING} would all be valid source URI prefixes.",
        ).optional(),
      }).describe("Options for configuring hive partitioning detect.")
        .optional(),
      ignoreUnknownValues: z.boolean().describe(
        "Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names in the table schema Avro, Parquet, ORC: Fields in the file schema that don't exist in the table schema.",
      ).optional(),
      jsonExtension: z.enum(["JSON_EXTENSION_UNSPECIFIED", "GEOJSON"]).describe(
        "Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON).",
      ).optional(),
      maxBadRecords: z.number().int().describe(
        "Optional. The maximum number of bad records that BigQuery can ignore when running the job. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This is only supported for CSV and NEWLINE_DELIMITED_JSON file formats.",
      ).optional(),
      nullMarker: z.string().describe(
        'Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\\N", BigQuery interprets "\\N" as a null value when loading a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value.',
      ).optional(),
      nullMarkers: z.array(z.string()).describe(
        "Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types.",
      ).optional(),
      parquetOptions: z.object({
        enableListInference: z.boolean().describe(
          "Optional. Indicates whether to use schema inference specifically for Parquet LIST logical type.",
        ).optional(),
        enumAsString: z.boolean().describe(
          "Optional. Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default.",
        ).optional(),
        mapTargetType: z.enum([
          "MAP_TARGET_TYPE_UNSPECIFIED",
          "ARRAY_OF_STRUCT",
        ]).describe(
          "Optional. Indicates how to represent a Parquet map if present.",
        ).optional(),
      }).describe("Parquet Options for load and make external tables.")
        .optional(),
      preserveAsciiControlCharacters: z.boolean().describe(
        "Optional. When sourceFormat is set to \"CSV\", this indicates whether the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\\x00' to '\\x1F') are preserved.",
      ).optional(),
      projectionFields: z.array(z.string()).describe(
        'If sourceFormat is set to "DATASTORE_BACKUP", indicates which entity properties to load into BigQuery from a Cloud Datastore backup. Property names are case sensitive and must be top-level properties. If no properties are specified, BigQuery loads all properties. If any named property isn\'t found in the Cloud Datastore backup, an invalid error is returned in the job result.',
      ).optional(),
      quote: z.string().regex(new RegExp(".?")).describe(
        "Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote ('\"'). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' \" ', use ' \"\" '. @default \"",
      ).optional(),
      rangePartitioning: z.object({
        field: z.string().describe(
          "Required. The name of the column to partition the table on. It must be a top-level, INT64 column whose mode is NULLABLE or REQUIRED.",
        ).optional(),
        range: z.object({
          end: z.string().describe(
            "[Experimental] The end of range partitioning, exclusive.",
          ).optional(),
          interval: z.string().describe(
            "[Experimental] The width of each interval.",
          ).optional(),
          start: z.string().describe(
            "[Experimental] The start of range partitioning, inclusive.",
          ).optional(),
        }).describe("[Experimental] Defines the ranges for range partitioning.")
          .optional(),
      }).optional(),
      referenceFileSchemaUri: z.string().describe(
        "Optional. The user can provide a reference file with the reader schema. This file is only loaded if it is part of source URIs, but is not loaded otherwise. It is enabled for the following formats: AVRO, PARQUET, ORC.",
      ).optional(),
      schema: z.object({
        fields: z.array(z.object({
          categories: z.object({
            names: z.array(z.string()).describe("Deprecated.").optional(),
          }).describe("Deprecated.").optional(),
          collation: z.string().describe(
            "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
          ).optional(),
          dataPolicies: z.array(z.object({
            name: z.string().describe(
              "Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id.",
            ).optional(),
          })).describe(
            "Optional. Data policies attached to this field, used for field-level access control.",
          ).optional(),
          defaultValueExpression: z.string().describe(
            "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
          ).optional(),
          description: z.string().describe(
            "Optional. The field description. The maximum length is 1,024 characters.",
          ).optional(),
          fields: z.array(z.string()).describe(
            "Optional. Describes the nested schema fields if the type property is set to RECORD.",
          ).optional(),
          foreignTypeDefinition: z.string().describe(
            "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
          ).optional(),
          generatedColumn: z.object({
            generatedExpressionInfo: z.object({
              asynchronous: z.boolean().describe(
                "Optional. Whether the column generation is done asynchronously.",
              ).optional(),
              generationExpression: z.string().describe(
                "Optional. The generation expression (e.g. AI.EMBED(...)) used to generated the field.",
              ).optional(),
              stored: z.boolean().describe(
                "Optional. Whether the generated column is stored in the table.",
              ).optional(),
            }).describe(
              "Definition of the expression used to generate the field.",
            ).optional(),
            generatedMode: z.enum([
              "GENERATED_MODE_UNSPECIFIED",
              "GENERATED_ALWAYS",
              "GENERATED_BY_DEFAULT",
            ]).describe(
              "Optional. Dictates when system generated values are used to populate the field.",
            ).optional(),
          }).describe(
            "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
          ).optional(),
          maxLength: z.string().describe(
            'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
          ).optional(),
          mode: z.string().describe(
            "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
          ).optional(),
          name: z.string().describe(
            "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
          ).optional(),
          policyTags: z.object({
            names: z.array(z.string()).describe(
              'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
            ).optional(),
          }).describe(
            "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
          ).optional(),
          precision: z.string().describe(
            'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
          ).optional(),
          rangeElementType: z.object({
            type: z.string().describe(
              "Required. The type of a field element. For more information, see TableFieldSchema.type.",
            ).optional(),
          }).describe("Represents the type of a field element.").optional(),
          roundingMode: z.enum([
            "ROUNDING_MODE_UNSPECIFIED",
            "ROUND_HALF_AWAY_FROM_ZERO",
            "ROUND_HALF_EVEN",
          ]).describe(
            "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
          ).optional(),
          scale: z.string().describe(
            "Optional. See documentation for precision.",
          ).optional(),
          timestampPrecision: z.string().describe(
            "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
          ).optional(),
          type: z.string().describe(
            "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
          ).optional(),
        })).describe("Describes the fields in a table.").optional(),
        foreignTypeInfo: z.object({
          typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
            "Required. Specifies the system which defines the foreign data type.",
          ).optional(),
        }).describe(
          "Metadata about the foreign data type definition such as the system in which the type is defined.",
        ).optional(),
      }).describe("Schema of a table").optional(),
      schemaInline: z.string().describe(
        '[Deprecated] The inline schema. For CSV schemas, specify as "Field1:Type1[,Field2:Type2]*". For example, "foo:STRING, bar:INTEGER, baz:FLOAT".',
      ).optional(),
      schemaInlineFormat: z.string().describe(
        "[Deprecated] The format of the schemaInline property.",
      ).optional(),
      schemaUpdateOptions: z.array(z.string()).describe(
        "Allows the schema of the destination table to be updated as a side effect of the load job if a schema is autodetected or supplied in the job configuration. Schema update options are supported in three cases: when writeDisposition is WRITE_APPEND; when writeDisposition is WRITE_TRUNCATE_DATA; when writeDisposition is WRITE_TRUNCATE and the destination table is a partition of a table, specified by partition decorators. For normal tables, WRITE_TRUNCATE will always overwrite the schema. One or more of the following values are specified: * ALLOW_FIELD_ADDITION: allow adding a nullable field to the schema. * ALLOW_FIELD_RELAXATION: allow relaxing a required field in the original schema to nullable.",
      ).optional(),
      skipLeadingRows: z.number().int().describe(
        "Optional. The number of rows at the top of a CSV file that BigQuery will skip when loading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
      ).optional(),
      sourceColumnMatch: z.enum([
        "SOURCE_COLUMN_MATCH_UNSPECIFIED",
        "POSITION",
        "NAME",
      ]).describe(
        "Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible.",
      ).optional(),
      sourceFormat: z.string().describe(
        'Optional. The format of the data files. For CSV files, specify "CSV". For datastore backups, specify "DATASTORE_BACKUP". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro, specify "AVRO". For parquet, specify "PARQUET". For orc, specify "ORC". The default value is CSV.',
      ).optional(),
      sourceUris: z.array(z.string()).describe(
        "[Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups: Exactly one URI can be specified. Also, the '*' wildcard character is not allowed.",
      ).optional(),
      timeFormat: z.string().describe(
        "Optional. Date format used for parsing TIME values.",
      ).optional(),
      timePartitioning: z.object({
        expirationMs: z.string().describe(
          "Optional. Number of milliseconds for which to keep the storage for a partition. A wrapper is used here because 0 is an invalid value.",
        ).optional(),
        field: z.string().describe(
          "Optional. If not set, the table is partitioned by pseudo column '_PARTITIONTIME'; if set, the table is partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED. A wrapper is used here because an empty string is an invalid value.",
        ).optional(),
        requirePartitionFilter: z.boolean().describe(
          "If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. This field is deprecated; please set the field with the same name on the table itself instead. This field needs a wrapper because we want to output the default value, false, if the user explicitly set it.",
        ).optional(),
        type: z.string().describe(
          "Required. The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively.",
        ).optional(),
      }).optional(),
      timeZone: z.string().describe(
        "Optional. Default time zone that will apply when parsing timestamp values that have no specific time zone.",
      ).optional(),
      timestampFormat: z.string().describe(
        "Optional. Date format used for parsing TIMESTAMP values.",
      ).optional(),
      timestampTargetPrecision: z.array(z.number().int()).describe(
        "Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV, PARQUET, and AVRO. Possible values include: Not Specified, [], or [6]: timestamp(6) for all auto detected TIMESTAMP columns [6, 12]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. [12]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated.",
      ).optional(),
      useAvroLogicalTypes: z.boolean().describe(
        'Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER).',
      ).optional(),
      writeDisposition: z.string().describe(
        "Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the data, removes the constraints and uses the schema from the load job. * WRITE_TRUNCATE_DATA: If the table already exists, BigQuery overwrites the data, but keeps the constraints and schema of the existing table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_APPEND. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
    }).describe(
      "JobConfigurationLoad contains the configuration properties for loading data into a destination table.",
    ).optional(),
    maxSlots: z.number().int().describe(
      "Optional. A target limit on the rate of slot consumption by this job. If set to a value > 0, BigQuery will attempt to limit the rate of slot consumption by this job to keep it below the configured limit, even if the job is eligible for more slots based on fair scheduling. The unused slots will be available for other jobs and queries to use. Note: This feature is not yet generally available.",
    ).optional(),
    query: z.object({
      allowLargeResults: z.boolean().describe(
        "Optional. If true and query uses legacy SQL dialect, allows the query to produce arbitrarily large result tables at a slight cost in performance. Requires destinationTable to be set. For GoogleSQL queries, this flag is ignored and large results are always allowed. However, you must still set destinationTable when result size exceeds the allowed maximum response size.",
      ).optional(),
      clustering: z.object({
        fields: z.array(z.string()).describe(
          "One or more fields on which data should be clustered. Only top-level, non-repeated, simple-type fields are supported. The ordering of the clustering fields should be prioritized from most to least important for filtering purposes. For additional information, see [Introduction to clustered tables](https://cloud.google.com/bigquery/docs/clustered-tables#limitations).",
        ).optional(),
      }).describe("Configures table clustering.").optional(),
      connectionProperties: z.array(z.object({
        key: z.string().describe("The key of the property to set.").optional(),
        value: z.string().describe("The value of the property to set.")
          .optional(),
      })).describe("Connection properties which can modify the query behavior.")
        .optional(),
      continuous: z.boolean().describe(
        "[Optional] Specifies whether the query should be executed as a continuous query. The default value is false.",
      ).optional(),
      createDisposition: z.string().describe(
        "Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
      createSession: z.boolean().describe(
        "If this property is true, the job creates a new session using a randomly generated session_id. To continue using a created session with subsequent queries, pass the existing session identifier as a `ConnectionProperty` value. The session identifier is returned as part of the `SessionInfo` message within the query statistics. The new session's location will be set to `Job.JobReference.location` if it is present, otherwise it's set to the default location based on existing routing logic.",
      ).optional(),
      defaultDataset: z.object({
        datasetId: z.string().describe(
          "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. The ID of the project containing this dataset.",
        ).optional(),
      }).describe("Identifier for a dataset.").optional(),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string().describe(
          "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
        ).optional(),
      }).describe("Configuration for Cloud KMS encryption settings.")
        .optional(),
      destinationTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      flattenResults: z.boolean().describe(
        "Optional. If true and query uses legacy SQL dialect, flattens all nested and repeated fields in the query results. allowLargeResults must be true if this is set to false. For GoogleSQL queries, this flag is ignored and results are never flattened.",
      ).optional(),
      maximumBillingTier: z.number().int().describe(
        "Optional. [Deprecated] Maximum billing tier allowed for this query. The billing tier controls the amount of compute resources allotted to the query, and multiplies the on-demand cost of the query accordingly. A query that runs within its allotted resources will succeed and indicate its billing tier in statistics.query.billingTier, but if the query exceeds its allotted resources, it will fail with billingTierLimitExceeded. WARNING: The billed byte amount can be multiplied by an amount up to this number! Most users should not need to alter this setting, and we recommend that you avoid introducing new uses of it.",
      ).optional(),
      maximumBytesBilled: z.string().describe(
        "Limits the bytes billed for this job. Queries that will have bytes billed beyond this limit will fail (without incurring a charge). If unspecified, this will be set to your project default.",
      ).optional(),
      parameterMode: z.string().describe(
        "GoogleSQL only. Set to POSITIONAL to use positional (?) query parameters or to NAMED to use named (@myparam) query parameters in this query.",
      ).optional(),
      preserveNulls: z.boolean().describe(
        "[Deprecated] This property is deprecated.",
      ).optional(),
      priority: z.string().describe(
        "Optional. Specifies a priority for the query. Possible values include INTERACTIVE and BATCH. The default value is INTERACTIVE.",
      ).optional(),
      query: z.string().describe(
        "[Required] SQL query text to execute. The useLegacySql field can be used to indicate whether the query uses legacy SQL or GoogleSQL.",
      ).optional(),
      queryParameters: z.array(z.object({
        name: z.string().describe(
          "Optional. If unset, this is a positional parameter. Otherwise, should be unique within a query.",
        ).optional(),
        parameterType: z.object({
          arrayType: z.string().describe(
            "Circular reference to QueryParameterType",
          ).optional(),
          rangeElementType: z.string().describe(
            "Circular reference to QueryParameterType",
          ).optional(),
          structTypes: z.array(z.object({
            description: z.string().describe(
              "Optional. Human-oriented description of the field.",
            ).optional(),
            name: z.string().describe("Optional. The name of this field.")
              .optional(),
            type: z.string().describe(
              "Circular reference to QueryParameterType",
            ).optional(),
          })).describe(
            "Optional. The types of the fields of this struct, in order, if this is a struct.",
          ).optional(),
          timestampPrecision: z.string().describe(
            "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
          ).optional(),
          type: z.string().describe(
            "Required. The top level type of this field.",
          ).optional(),
        }).describe("The type of a query parameter.").optional(),
        parameterValue: z.object({
          arrayValues: z.array(z.string()).describe(
            "Optional. The array values, if this is an array type.",
          ).optional(),
          rangeValue: z.object({
            end: z.string().describe(
              "Circular reference to QueryParameterValue",
            ).optional(),
            start: z.string().describe(
              "Circular reference to QueryParameterValue",
            ).optional(),
          }).describe("Represents the value of a range.").optional(),
          structValues: z.record(z.string(), z.string()).describe(
            "The struct field values.",
          ).optional(),
          value: z.string().describe(
            "Optional. The value of this value, if a simple scalar type.",
          ).optional(),
        }).describe("The value of a query parameter.").optional(),
      })).describe("Query parameters for GoogleSQL queries.").optional(),
      rangePartitioning: z.object({
        field: z.string().describe(
          "Required. The name of the column to partition the table on. It must be a top-level, INT64 column whose mode is NULLABLE or REQUIRED.",
        ).optional(),
        range: z.object({
          end: z.string().describe(
            "[Experimental] The end of range partitioning, exclusive.",
          ).optional(),
          interval: z.string().describe(
            "[Experimental] The width of each interval.",
          ).optional(),
          start: z.string().describe(
            "[Experimental] The start of range partitioning, inclusive.",
          ).optional(),
        }).describe("[Experimental] Defines the ranges for range partitioning.")
          .optional(),
      }).optional(),
      schemaUpdateOptions: z.array(z.string()).describe(
        "Allows the schema of the destination table to be updated as a side effect of the query job. Schema update options are supported in three cases: when writeDisposition is WRITE_APPEND; when writeDisposition is WRITE_TRUNCATE_DATA; when writeDisposition is WRITE_TRUNCATE and the destination table is a partition of a table, specified by partition decorators. For normal tables, WRITE_TRUNCATE will always overwrite the schema. One or more of the following values are specified: * ALLOW_FIELD_ADDITION: allow adding a nullable field to the schema. * ALLOW_FIELD_RELAXATION: allow relaxing a required field in the original schema to nullable.",
      ).optional(),
      scriptOptions: z.object({
        keyResultStatement: z.enum([
          "KEY_RESULT_STATEMENT_KIND_UNSPECIFIED",
          "LAST",
          "FIRST_SELECT",
        ]).describe(
          'Determines which statement in the script represents the "key result", used to populate the schema and query results of the script job. Default is LAST.',
        ).optional(),
        statementByteBudget: z.string().describe(
          "Limit on the number of bytes billed per statement. Exceeding this budget results in an error.",
        ).optional(),
        statementTimeoutMs: z.string().describe(
          "Timeout period for each statement in a script.",
        ).optional(),
      }).describe("Options related to script execution.").optional(),
      systemVariables: z.object({
        types: z.record(
          z.string(),
          z.object({
            arrayElementType: z.string().describe(
              "Circular reference to StandardSqlDataType",
            ).optional(),
            rangeElementType: z.string().describe(
              "Circular reference to StandardSqlDataType",
            ).optional(),
            structType: z.object({
              fields: z.array(z.object({
                name: z.string().describe(
                  "Optional. The name of this field. Can be absent for struct fields.",
                ).optional(),
                type: z.string().describe(
                  "Circular reference to StandardSqlDataType",
                ).optional(),
              })).describe("Fields within the struct.").optional(),
            }).describe("The representation of a SQL STRUCT type.").optional(),
            typeKind: z.enum([
              "TYPE_KIND_UNSPECIFIED",
              "INT64",
              "BOOL",
              "FLOAT64",
              "STRING",
              "BYTES",
              "TIMESTAMP",
              "DATE",
              "TIME",
              "DATETIME",
              "INTERVAL",
              "GEOGRAPHY",
              "NUMERIC",
              "BIGNUMERIC",
              "JSON",
              "ARRAY",
              "STRUCT",
              "RANGE",
            ]).describe(
              'Required. The top level type of this field. Can be any GoogleSQL data type (e.g., "INT64", "DATE", "ARRAY").',
            ).optional(),
          }),
        ).describe("Output only. Data type for each system variable.")
          .optional(),
        values: z.record(z.string(), z.string()).describe(
          "Output only. Value for each system variable.",
        ).optional(),
      }).describe("System variables given to a query.").optional(),
      tableDefinitions: z.record(
        z.string(),
        z.object({
          autodetect: z.boolean().describe(
            "Try to detect schema and format options automatically. Any option specified explicitly will be honored.",
          ).optional(),
          avroOptions: z.object({
            useAvroLogicalTypes: z.boolean().describe(
              'Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER).',
            ).optional(),
          }).describe("Options for external data sources.").optional(),
          bigtableOptions: z.object({
            columnFamilies: z.array(z.object({
              columns: z.array(z.object({
                encoding: z.string().describe(
                  "Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. 'encoding' can also be set at the column family level. However, the setting at this level takes precedence if 'encoding' is set at both levels.",
                ).optional(),
                fieldName: z.string().describe(
                  "Optional. If the qualifier is not a valid BigQuery field identifier i.e. does not match a-zA-Z*, a valid identifier must be provided as the column field name and is used as field name in queries.",
                ).optional(),
                onlyReadLatest: z.boolean().describe(
                  "Optional. If this is set, only the latest version of value in this column are exposed. 'onlyReadLatest' can also be set at the column family level. However, the setting at this level takes precedence if 'onlyReadLatest' is set at both levels.",
                ).optional(),
                protoConfig: z.object({
                  protoMessageName: z.string().describe(
                    'Optional. The fully qualified proto message name of the protobuf. In the format of "foo.bar.Message".',
                  ).optional(),
                  schemaBundleId: z.string().describe(
                    "Optional. The ID of the Bigtable SchemaBundle resource associated with this protobuf. The ID should be referred to within the parent table, e.g., `foo` rather than `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/foo`. See [more details on Bigtable SchemaBundles](https://docs.cloud.google.com/bigtable/docs/create-manage-protobuf-schemas).",
                  ).optional(),
                }).describe(
                  "Information related to a Bigtable protobuf column.",
                ).optional(),
                qualifierEncoded: z.string().describe(
                  "[Required] Qualifier of the column. Columns in the parent column family that has this exact qualifier are exposed as `.` field. If the qualifier is valid UTF-8 string, it can be specified in the qualifier_string field. Otherwise, a base-64 encoded value must be set to qualifier_encoded. The column field name is the same as the column qualifier. However, if the qualifier is not a valid BigQuery field identifier i.e. does not match a-zA-Z*, a valid identifier must be provided as field_name.",
                ).optional(),
                qualifierString: z.string().describe("Qualifier string.")
                  .optional(),
                type: z.string().describe(
                  "Optional. The type to convert the value in cells of this column. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): * BYTES * STRING * INTEGER * FLOAT * BOOLEAN * JSON Default type is BYTES. 'type' can also be set at the column family level. However, the setting at this level takes precedence if 'type' is set at both levels.",
                ).optional(),
              })).describe(
                "Optional. Lists of columns that should be exposed as individual fields as opposed to a list of (column name, value) pairs. All columns whose qualifier matches a qualifier in this list can be accessed as `.`. Other columns can be accessed as a list through the `.Column` field.",
              ).optional(),
              encoding: z.string().describe(
                "Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. This can be overridden for a specific column by listing that column in 'columns' and specifying an encoding for it.",
              ).optional(),
              familyId: z.string().describe("Identifier of the column family.")
                .optional(),
              onlyReadLatest: z.boolean().describe(
                "Optional. If this is set only the latest version of value are exposed for all columns in this column family. This can be overridden for a specific column by listing that column in 'columns' and specifying a different setting for that column.",
              ).optional(),
              protoConfig: z.object({
                protoMessageName: z.string().describe(
                  'Optional. The fully qualified proto message name of the protobuf. In the format of "foo.bar.Message".',
                ).optional(),
                schemaBundleId: z.string().describe(
                  "Optional. The ID of the Bigtable SchemaBundle resource associated with this protobuf. The ID should be referred to within the parent table, e.g., `foo` rather than `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/foo`. See [more details on Bigtable SchemaBundles](https://docs.cloud.google.com/bigtable/docs/create-manage-protobuf-schemas).",
                ).optional(),
              }).describe("Information related to a Bigtable protobuf column.")
                .optional(),
              type: z.string().describe(
                "Optional. The type to convert the value in cells of this column family. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): * BYTES * STRING * INTEGER * FLOAT * BOOLEAN * JSON Default type is BYTES. This can be overridden for a specific column by listing that column in 'columns' and specifying a type for it.",
              ).optional(),
            })).describe(
              "Optional. List of column families to expose in the table schema along with their types. This list restricts the column families that can be referenced in queries and specifies their value types. You can use this list to do type conversions - see the 'type' field for more details. If you leave this list empty, all column families are present in the table schema and their values are read as BYTES. During a query only the column families referenced in that query are read from Bigtable.",
            ).optional(),
            ignoreUnspecifiedColumnFamilies: z.boolean().describe(
              "Optional. If field is true, then the column families that are not specified in columnFamilies list are not exposed in the table schema. Otherwise, they are read with BYTES type values. The default value is false.",
            ).optional(),
            outputColumnFamiliesAsJson: z.boolean().describe(
              "Optional. If field is true, then each column family will be read as a single JSON column. Otherwise they are read as a repeated cell structure containing timestamp/value tuples. The default value is false.",
            ).optional(),
            readRowkeyAsString: z.boolean().describe(
              "Optional. If field is true, then the rowkey column families will be read and converted to string. Otherwise they are read with BYTES type values and users need to manually cast them with CAST if necessary. The default value is false.",
            ).optional(),
          }).describe("Options specific to Google Cloud Bigtable data sources.")
            .optional(),
          compression: z.string().describe(
            "Optional. The compression type of the data source. Possible values include GZIP and NONE. The default value is NONE. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats. An empty string is an invalid value.",
          ).optional(),
          connectionId: z.string().describe(
            "Optional. The connection specifying the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or S3. The connection_id can have the form `{project_id}.{location_id};{connection_id}` or `projects/{project_id}/locations/{location_id}/connections/{connection_id}`.",
          ).optional(),
          csvOptions: z.object({
            allowJaggedRows: z.boolean().describe(
              "Optional. Indicates if BigQuery should accept rows that are missing trailing optional columns. If true, BigQuery treats missing trailing columns as null values. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false.",
            ).optional(),
            allowQuotedNewlines: z.boolean().describe(
              "Optional. Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false.",
            ).optional(),
            encoding: z.string().describe(
              "Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the quote and fieldDelimiter properties.",
            ).optional(),
            fieldDelimiter: z.string().describe(
              'Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C).',
            ).optional(),
            nullMarker: z.string().describe(
              'Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\\N", BigQuery interprets "\\N" as a null value when querying a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value.',
            ).optional(),
            nullMarkers: z.array(z.string()).describe(
              "Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types.",
            ).optional(),
            preserveAsciiControlCharacters: z.boolean().describe(
              "Optional. Indicates if the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\\x00' to '\\x1F') are preserved.",
            ).optional(),
            quote: z.string().regex(new RegExp(".?")).describe(
              "Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote (\"). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' \" ', use ' \"\" '.",
            ).optional(),
            skipLeadingRows: z.string().describe(
              "Optional. The number of rows at the top of a CSV file that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
            ).optional(),
            sourceColumnMatch: z.string().describe(
              "Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible. Acceptable values are: POSITION - matches by position. This assumes that the columns are ordered the same way as the schema. NAME - matches by name. This reads the header row as column names and reorders columns to match the field names in the schema.",
            ).optional(),
          }).describe("Information related to a CSV data source.").optional(),
          dateFormat: z.string().describe(
            "Optional. Format used to parse DATE values. Supports C-style and SQL-style values.",
          ).optional(),
          datetimeFormat: z.string().describe(
            "Optional. Format used to parse DATETIME values. Supports C-style and SQL-style values.",
          ).optional(),
          decimalTargetTypes: z.array(
            z.enum([
              "DECIMAL_TARGET_TYPE_UNSPECIFIED",
              "NUMERIC",
              "BIGNUMERIC",
              "STRING",
            ]),
          ).describe(
            'Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: * (38,9) -> NUMERIC; * (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); * (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); * (76,38) -> BIGNUMERIC; * (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats.',
          ).optional(),
          fileSetSpecType: z.enum([
            "FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH",
            "FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST",
          ]).describe(
            "Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default source URIs are expanded against the underlying storage. Other options include specifying manifest files. Only applicable to object storage systems.",
          ).optional(),
          googleSheetsOptions: z.object({
            range: z.string().describe(
              "Optional. Range of a sheet to query from. Only used when non-empty. Typical format: sheet_name!top_left_cell_id:bottom_right_cell_id For example: sheet1!A1:B20",
            ).optional(),
            skipLeadingRows: z.string().describe(
              "Optional. The number of rows at the top of a sheet that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
            ).optional(),
          }).describe("Options specific to Google Sheets data sources.")
            .optional(),
          hivePartitioningOptions: z.object({
            fields: z.array(z.string()).describe(
              "Output only. For permanent external tables, this field is populated with the hive partition keys in the order they were inferred. The types of the partition keys can be deduced by checking the table schema (which will include the partition keys). Not every API will populate this field in the output. For example, Tables.Get will populate it, but Tables.List will not contain this field.",
            ).optional(),
            mode: z.string().describe(
              "Optional. When set, what mode of hive partitioning to use when reading data. The following modes are supported: * AUTO: automatically infer partition key name(s) and type(s). * STRINGS: automatically infer partition key name(s). All types are strings. * CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported formats are: JSON, CSV, ORC, Avro and Parquet.",
            ).optional(),
            requirePartitionFilter: z.boolean().describe(
              "Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with require_partition_filter explicitly set to true will fail.",
            ).optional(),
            sourceUriPrefix: z.string().describe(
              "Optional. When hive partition detection is requested, a common prefix for all source uris must be required. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout: gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/. CUSTOM detection requires encoding the partitioning schema immediately after the common prefix. For CUSTOM, any of * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING} would all be valid source URI prefixes.",
            ).optional(),
          }).describe("Options for configuring hive partitioning detect.")
            .optional(),
          ignoreUnknownValues: z.boolean().describe(
            "Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names Google Cloud Bigtable: This setting is ignored. Google Cloud Datastore backups: This setting is ignored. Avro: This setting is ignored. ORC: This setting is ignored. Parquet: This setting is ignored.",
          ).optional(),
          jsonExtension: z.enum(["JSON_EXTENSION_UNSPECIFIED", "GEOJSON"])
            .describe(
              "Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON).",
            ).optional(),
          jsonOptions: z.object({
            encoding: z.string().describe(
              "Optional. The character encoding of the data. The supported values are UTF-8, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8.",
            ).optional(),
          }).describe("Json Options for load and make external tables.")
            .optional(),
          maxBadRecords: z.number().int().describe(
            "Optional. The maximum number of bad records that BigQuery can ignore when reading data. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats.",
          ).optional(),
          metadataCacheMode: z.enum([
            "METADATA_CACHE_MODE_UNSPECIFIED",
            "AUTOMATIC",
            "MANUAL",
          ]).describe(
            "Optional. Metadata Cache Mode for the table. Set this to enable caching of metadata from external data source.",
          ).optional(),
          objectMetadata: z.enum([
            "OBJECT_METADATA_UNSPECIFIED",
            "DIRECTORY",
            "SIMPLE",
          ]).describe(
            "Optional. ObjectMetadata is used to create Object Tables. Object Tables contain a listing of objects (with their metadata) found at the source_uris. If ObjectMetadata is set, source_format should be omitted. Currently SIMPLE is the only supported Object Metadata type.",
          ).optional(),
          parquetOptions: z.object({
            enableListInference: z.boolean().describe(
              "Optional. Indicates whether to use schema inference specifically for Parquet LIST logical type.",
            ).optional(),
            enumAsString: z.boolean().describe(
              "Optional. Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default.",
            ).optional(),
            mapTargetType: z.enum([
              "MAP_TARGET_TYPE_UNSPECIFIED",
              "ARRAY_OF_STRUCT",
            ]).describe(
              "Optional. Indicates how to represent a Parquet map if present.",
            ).optional(),
          }).describe("Parquet Options for load and make external tables.")
            .optional(),
          referenceFileSchemaUri: z.string().describe(
            "Optional. When creating an external table, the user can provide a reference file with the table schema. This is enabled for the following formats: AVRO, PARQUET, ORC.",
          ).optional(),
          schema: z.object({
            fields: z.array(z.object({
              categories: z.object({
                names: z.array(z.string()).describe("Deprecated.").optional(),
              }).describe("Deprecated.").optional(),
              collation: z.string().describe(
                "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
              ).optional(),
              dataPolicies: z.array(z.object({
                name: z.string().describe(
                  "Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id.",
                ).optional(),
              })).describe(
                "Optional. Data policies attached to this field, used for field-level access control.",
              ).optional(),
              defaultValueExpression: z.string().describe(
                "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
              ).optional(),
              description: z.string().describe(
                "Optional. The field description. The maximum length is 1,024 characters.",
              ).optional(),
              fields: z.array(z.string()).describe(
                "Optional. Describes the nested schema fields if the type property is set to RECORD.",
              ).optional(),
              foreignTypeDefinition: z.string().describe(
                "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
              ).optional(),
              generatedColumn: z.object({
                generatedExpressionInfo: z.object({
                  asynchronous: z.boolean().describe(
                    "Optional. Whether the column generation is done asynchronously.",
                  ).optional(),
                  generationExpression: z.string().describe(
                    "Optional. The generation expression (e.g. AI.EMBED(...)) used to generated the field.",
                  ).optional(),
                  stored: z.boolean().describe(
                    "Optional. Whether the generated column is stored in the table.",
                  ).optional(),
                }).describe(
                  "Definition of the expression used to generate the field.",
                ).optional(),
                generatedMode: z.enum([
                  "GENERATED_MODE_UNSPECIFIED",
                  "GENERATED_ALWAYS",
                  "GENERATED_BY_DEFAULT",
                ]).describe(
                  "Optional. Dictates when system generated values are used to populate the field.",
                ).optional(),
              }).describe(
                "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
              ).optional(),
              maxLength: z.string().describe(
                'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
              ).optional(),
              mode: z.string().describe(
                "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
              ).optional(),
              name: z.string().describe(
                "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
              ).optional(),
              policyTags: z.object({
                names: z.array(z.string()).describe(
                  'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
                ).optional(),
              }).describe(
                "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
              ).optional(),
              precision: z.string().describe(
                'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
              ).optional(),
              rangeElementType: z.object({
                type: z.string().describe(
                  "Required. The type of a field element. For more information, see TableFieldSchema.type.",
                ).optional(),
              }).describe("Represents the type of a field element.").optional(),
              roundingMode: z.enum([
                "ROUNDING_MODE_UNSPECIFIED",
                "ROUND_HALF_AWAY_FROM_ZERO",
                "ROUND_HALF_EVEN",
              ]).describe(
                "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
              ).optional(),
              scale: z.string().describe(
                "Optional. See documentation for precision.",
              ).optional(),
              timestampPrecision: z.string().describe(
                "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
              ).optional(),
              type: z.string().describe(
                "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
              ).optional(),
            })).describe("Describes the fields in a table.").optional(),
            foreignTypeInfo: z.object({
              typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
                "Required. Specifies the system which defines the foreign data type.",
              ).optional(),
            }).describe(
              "Metadata about the foreign data type definition such as the system in which the type is defined.",
            ).optional(),
          }).describe("Schema of a table").optional(),
          sourceFormat: z.string().describe(
            '[Required] The data format. For CSV files, specify "CSV". For Google sheets, specify "GOOGLE_SHEETS". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro files, specify "AVRO". For Google Cloud Datastore backups, specify "DATASTORE_BACKUP". For Apache Iceberg tables, specify "ICEBERG". For ORC files, specify "ORC". For Parquet files, specify "PARQUET". [Beta] For Google Cloud Bigtable, specify "BIGTABLE".',
          ).optional(),
          sourceUris: z.array(z.string()).describe(
            "[Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups, exactly one URI can be specified. Also, the '*' wildcard character is not allowed.",
          ).optional(),
          timeFormat: z.string().describe(
            "Optional. Format used to parse TIME values. Supports C-style and SQL-style values.",
          ).optional(),
          timeZone: z.string().describe(
            "Optional. Time zone used when parsing timestamp values that do not have specific time zone information (e.g. 2024-04-20 12:34:56). The expected format is a IANA timezone string (e.g. America/Los_Angeles).",
          ).optional(),
          timestampFormat: z.string().describe(
            "Optional. Format used to parse TIMESTAMP values. Supports C-style and SQL-style values.",
          ).optional(),
          timestampTargetPrecision: z.array(z.number().int()).describe(
            "Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV, PARQUET, and AVRO. Possible values include: Not Specified, [], or [6]: timestamp(6) for all auto detected TIMESTAMP columns [6, 12]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. [12]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated.",
          ).optional(),
        }),
      ).describe(
        "Optional. You can specify external table definitions, which operate as ephemeral tables that can be queried. These definitions are configured using a JSON map, where the string key represents the table identifier, and the value is the corresponding external data configuration object.",
      ).optional(),
      timePartitioning: z.object({
        expirationMs: z.string().describe(
          "Optional. Number of milliseconds for which to keep the storage for a partition. A wrapper is used here because 0 is an invalid value.",
        ).optional(),
        field: z.string().describe(
          "Optional. If not set, the table is partitioned by pseudo column '_PARTITIONTIME'; if set, the table is partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED. A wrapper is used here because an empty string is an invalid value.",
        ).optional(),
        requirePartitionFilter: z.boolean().describe(
          "If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. This field is deprecated; please set the field with the same name on the table itself instead. This field needs a wrapper because we want to output the default value, false, if the user explicitly set it.",
        ).optional(),
        type: z.string().describe(
          "Required. The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively.",
        ).optional(),
      }).optional(),
      useLegacySql: z.boolean().describe(
        "Optional. Specifies whether to use BigQuery's legacy SQL dialect for this query. The default value is true. If set to false, the query uses BigQuery's [GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql). When useLegacySql is set to false, the value of flattenResults is ignored; query will be run as if flattenResults is false.",
      ).optional(),
      useQueryCache: z.boolean().describe(
        "Optional. Whether to look for the result in the query cache. The query cache is a best-effort cache that will be flushed whenever tables in the query are modified. Moreover, the query cache is only available when a query does not have a destination table specified. The default value is true.",
      ).optional(),
      userDefinedFunctionResources: z.array(z.object({
        inlineCode: z.string().describe(
          "[Pick one] An inline resource that contains code for a user-defined function (UDF). Providing a inline code resource is equivalent to providing a URI for a file containing the same code.",
        ).optional(),
        resourceUri: z.string().describe(
          "[Pick one] A code resource to load from a Google Cloud Storage URI (gs://bucket/path).",
        ).optional(),
      })).describe(
        "Describes user-defined function resources used in the query.",
      ).optional(),
      writeDisposition: z.string().describe(
        "Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the data, removes the constraints, and uses the schema from the query result. * WRITE_TRUNCATE_DATA: If the table already exists, BigQuery overwrites the data, but keeps the constraints and schema of the existing table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
      writeIncrementalResults: z.boolean().describe(
        "Optional. This is only supported for a SELECT query using a temporary table. If set, the query is allowed to write results incrementally to the temporary result table. This may incur a performance penalty. This option cannot be used with Legacy SQL. This feature is not yet available.",
      ).optional(),
    }).describe("JobConfigurationQuery configures a BigQuery query job.")
      .optional(),
    reservation: z.string().describe(
      "Optional. The reservation that job would use. User can specify a reservation to execute the job. If reservation is not set, reservation is determined based on the rules defined by the reservation assignments. The expected format is `projects/{project}/locations/{location}/reservations/{reservation}`.",
    ).optional(),
  }).optional(),
  jobCreationReason: z.object({
    code: z.enum([
      "CODE_UNSPECIFIED",
      "REQUESTED",
      "LONG_RUNNING",
      "LARGE_RESULTS",
      "OTHER",
    ]).describe(
      "Output only. Specifies the high level reason why a Job was created.",
    ).optional(),
  }).describe(
    "Reason about why a Job was created from a [`jobs.query`](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query) method when used with `JOB_CREATION_OPTIONAL` Job creation mode. For [`jobs.insert`](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/insert) method calls it will always be `REQUESTED`.",
  ).optional(),
  jobReference: z.object({
    jobId: z.string().describe(
      "Required. The ID of the job. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-). The maximum length is 1,024 characters.",
    ).optional(),
    location: z.string().describe(
      "Optional. The geographic location of the job. The default value is US. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations",
    ).optional(),
    projectId: z.string().describe(
      "Required. The ID of the project containing this job.",
    ).optional(),
  }).describe(
    "A job reference is a fully qualified identifier for referring to a job.",
  ).optional(),
  statistics: z.object({
    completionRatio: z.number().describe(
      "Output only. [TrustedTester] Job progress (0.0 -> 1.0) for LOAD and EXTRACT jobs.",
    ).optional(),
    copy: z.object({
      copiedLogicalBytes: z.string().describe(
        "Output only. Number of logical bytes copied to the destination table.",
      ).optional(),
      copiedRows: z.string().describe(
        "Output only. Number of rows copied to the destination table.",
      ).optional(),
    }).describe("Statistics for a copy job.").optional(),
    creationTime: z.string().describe(
      "Output only. Creation time of this job, in milliseconds since the epoch. This field will be present on all jobs.",
    ).optional(),
    dataMaskingStatistics: z.object({
      dataMaskingApplied: z.boolean().describe(
        "Whether any accessed data was protected by the data masking.",
      ).optional(),
    }).describe("Statistics for data-masking.").optional(),
    edition: z.enum([
      "RESERVATION_EDITION_UNSPECIFIED",
      "STANDARD",
      "ENTERPRISE",
      "ENTERPRISE_PLUS",
    ]).describe(
      "Output only. Name of edition corresponding to the reservation for this job at the time of this update.",
    ).optional(),
    endTime: z.string().describe(
      "Output only. End time of this job, in milliseconds since the epoch. This field will be present whenever a job is in the DONE state.",
    ).optional(),
    extract: z.object({
      destinationUriFileCounts: z.array(z.string()).describe(
        "Output only. Number of files per destination URI or URI pattern specified in the extract configuration. These values will be in the same order as the URIs specified in the 'destinationUris' field.",
      ).optional(),
      inputBytes: z.string().describe(
        "Output only. Number of user bytes extracted into the result. This is the byte count as computed by BigQuery for billing purposes and doesn't have any relationship with the number of actual result bytes extracted in the desired format.",
      ).optional(),
      timeline: z.array(z.object({
        activeUnits: z.string().describe(
          "Total number of active workers. This does not correspond directly to slot usage. This is the largest value observed since the last sample.",
        ).optional(),
        completedUnits: z.string().describe(
          "Total parallel units of work completed by this query.",
        ).optional(),
        elapsedMs: z.string().describe(
          "Milliseconds elapsed since the start of query execution.",
        ).optional(),
        estimatedRunnableUnits: z.string().describe(
          "Units of work that can be scheduled immediately. Providing additional slots for these units of work will accelerate the query, if no other query in the reservation needs additional slots.",
        ).optional(),
        pendingUnits: z.string().describe(
          "Total units of work remaining for the query. This number can be revised (increased or decreased) while the query is running.",
        ).optional(),
        shuffleRamUsageRatio: z.number().describe(
          "Total shuffle usage ratio in shuffle RAM per reservation of this query. This will be provided for reservation customers only.",
        ).optional(),
        totalSlotMs: z.string().describe(
          "Cumulative slot-ms consumed by the query.",
        ).optional(),
      })).describe("Output only. Describes a timeline of job execution.")
        .optional(),
    }).describe("Statistics for an extract job.").optional(),
    finalExecutionDurationMs: z.string().describe(
      "Output only. The duration in milliseconds of the execution of the final attempt of this job, as BigQuery may internally re-attempt to execute the job.",
    ).optional(),
    load: z.object({
      badRecords: z.string().describe(
        "Output only. The number of bad records encountered. Note that if the job has failed because of more bad records encountered than the maximum allowed in the load job configuration, then this number can be less than the total number of bad records present in the input data.",
      ).optional(),
      inputFileBytes: z.string().describe(
        "Output only. Number of bytes of source data in a load job.",
      ).optional(),
      inputFiles: z.string().describe(
        "Output only. Number of source files in a load job.",
      ).optional(),
      outputBytes: z.string().describe(
        "Output only. Size of the loaded data in bytes. Note that while a load job is in the running state, this value may change.",
      ).optional(),
      outputRows: z.string().describe(
        "Output only. Number of rows imported in a load job. Note that while an import job is in the running state, this value may change.",
      ).optional(),
      timeline: z.array(z.object({
        activeUnits: z.string().describe(
          "Total number of active workers. This does not correspond directly to slot usage. This is the largest value observed since the last sample.",
        ).optional(),
        completedUnits: z.string().describe(
          "Total parallel units of work completed by this query.",
        ).optional(),
        elapsedMs: z.string().describe(
          "Milliseconds elapsed since the start of query execution.",
        ).optional(),
        estimatedRunnableUnits: z.string().describe(
          "Units of work that can be scheduled immediately. Providing additional slots for these units of work will accelerate the query, if no other query in the reservation needs additional slots.",
        ).optional(),
        pendingUnits: z.string().describe(
          "Total units of work remaining for the query. This number can be revised (increased or decreased) while the query is running.",
        ).optional(),
        shuffleRamUsageRatio: z.number().describe(
          "Total shuffle usage ratio in shuffle RAM per reservation of this query. This will be provided for reservation customers only.",
        ).optional(),
        totalSlotMs: z.string().describe(
          "Cumulative slot-ms consumed by the query.",
        ).optional(),
      })).describe("Output only. Describes a timeline of job execution.")
        .optional(),
    }).describe("Statistics for a load job.").optional(),
    numChildJobs: z.string().describe(
      "Output only. Number of child jobs executed.",
    ).optional(),
    parentJobId: z.string().describe(
      "Output only. If this is a child job, specifies the job ID of the parent.",
    ).optional(),
    query: z.object({
      biEngineStatistics: z.object({
        accelerationMode: z.enum([
          "BI_ENGINE_ACCELERATION_MODE_UNSPECIFIED",
          "BI_ENGINE_DISABLED",
          "PARTIAL_INPUT",
          "FULL_INPUT",
          "FULL_QUERY",
        ]).describe(
          "Output only. Specifies which mode of BI Engine acceleration was performed (if any).",
        ).optional(),
        biEngineMode: z.enum([
          "ACCELERATION_MODE_UNSPECIFIED",
          "DISABLED",
          "PARTIAL",
          "FULL",
        ]).describe(
          "Output only. Specifies which mode of BI Engine acceleration was performed (if any).",
        ).optional(),
        biEngineReasons: z.array(z.object({
          code: z.enum([
            "CODE_UNSPECIFIED",
            "NO_RESERVATION",
            "INSUFFICIENT_RESERVATION",
            "UNSUPPORTED_SQL_TEXT",
            "INPUT_TOO_LARGE",
            "OTHER_REASON",
            "TABLE_EXCLUDED",
          ]).describe(
            "Output only. High-level BI Engine reason for partial or disabled acceleration",
          ).optional(),
          message: z.string().describe(
            "Output only. Free form human-readable reason for partial or disabled acceleration.",
          ).optional(),
        })).describe(
          "In case of DISABLED or PARTIAL bi_engine_mode, these contain the explanatory reasons as to why BI Engine could not accelerate. In case the full query was accelerated, this field is not populated.",
        ).optional(),
      }).describe(
        "Statistics for a BI Engine specific query. Populated as part of JobStatistics2",
      ).optional(),
      billingTier: z.number().int().describe(
        'Output only. Billing tier for the job. This is a BigQuery-specific concept which is not related to the Google Cloud notion of "free tier". The value here is a measure of the query\'s resource consumption relative to the amount of data scanned. For on-demand queries, the limit is 100, and all queries within this limit are billed at the standard on-demand rates. On-demand queries that exceed this limit will fail with a billingTierLimitExceeded error.',
      ).optional(),
      cacheHit: z.boolean().describe(
        "Output only. Whether the query result was fetched from the query cache.",
      ).optional(),
      dclTargetDataset: z.object({
        datasetId: z.string().describe(
          "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. The ID of the project containing this dataset.",
        ).optional(),
      }).describe("Identifier for a dataset.").optional(),
      dclTargetTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      dclTargetView: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      ddlAffectedRowAccessPolicyCount: z.string().describe(
        "Output only. The number of row access policies affected by a DDL statement. Present only for DROP ALL ROW ACCESS POLICIES queries.",
      ).optional(),
      ddlDestinationTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      ddlOperationPerformed: z.string().describe(
        "Output only. The DDL operation performed, possibly dependent on the pre-existence of the DDL target.",
      ).optional(),
      ddlTargetDataset: z.object({
        datasetId: z.string().describe(
          "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. The ID of the project containing this dataset.",
        ).optional(),
      }).describe("Identifier for a dataset.").optional(),
      ddlTargetRoutine: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this routine.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this routine.",
        ).optional(),
        routineId: z.string().describe(
          "Required. The ID of the routine. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
        ).optional(),
      }).describe("Id path of a routine.").optional(),
      ddlTargetRowAccessPolicy: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this row access policy.",
        ).optional(),
        policyId: z.string().describe(
          "Required. The ID of the row access policy. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this row access policy.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table containing this row access policy.",
        ).optional(),
      }).describe("Id path of a row access policy.").optional(),
      ddlTargetTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      dmlStats: z.object({
        deletedRowCount: z.string().describe(
          "Output only. Number of deleted Rows. populated by DML DELETE, MERGE and TRUNCATE statements.",
        ).optional(),
        dmlMode: z.enum([
          "DML_MODE_UNSPECIFIED",
          "COARSE_GRAINED_DML",
          "FINE_GRAINED_DML",
        ]).describe("Output only. DML mode used.").optional(),
        fineGrainedDmlUnusedReason: z.enum([
          "FINE_GRAINED_DML_UNUSED_REASON_UNSPECIFIED",
          "MAX_PARTITION_SIZE_EXCEEDED",
          "TABLE_NOT_ENROLLED",
          "DML_IN_MULTI_STATEMENT_TRANSACTION",
        ]).describe(
          "Output only. Reason for disabling fine-grained DML if applicable.",
        ).optional(),
        insertedRowCount: z.string().describe(
          "Output only. Number of inserted Rows. Populated by DML INSERT and MERGE statements",
        ).optional(),
        updatedRowCount: z.string().describe(
          "Output only. Number of updated Rows. Populated by DML UPDATE and MERGE statements.",
        ).optional(),
      }).describe("Detailed statistics for DML statements").optional(),
      estimatedBytesProcessed: z.string().describe(
        "Output only. The original estimate of bytes processed for the job.",
      ).optional(),
      exportDataStatistics: z.object({
        fileCount: z.string().describe(
          "Number of destination files generated in case of EXPORT DATA statement only.",
        ).optional(),
        rowCount: z.string().describe(
          "[Alpha] Number of destination rows generated in case of EXPORT DATA statement only.",
        ).optional(),
      }).describe(
        "Statistics for the EXPORT DATA statement as part of Query Job. EXTRACT JOB statistics are populated in JobStatistics4.",
      ).optional(),
      externalServiceCosts: z.array(z.object({
        billingMethod: z.string().describe(
          "The billing method used for the external job. This field, set to `SERVICES_SKU`, is only used when billing under the services SKU. Otherwise, it is unspecified for backward compatibility.",
        ).optional(),
        bytesBilled: z.string().describe(
          "External service cost in terms of bigquery bytes billed.",
        ).optional(),
        bytesProcessed: z.string().describe(
          "External service cost in terms of bigquery bytes processed.",
        ).optional(),
        externalService: z.string().describe("External service name.")
          .optional(),
        reservedSlotCount: z.string().describe(
          "Non-preemptable reserved slots used for external job. For example, reserved slots for Cloua AI Platform job are the VM usages converted to BigQuery slot with equivalent mount of price.",
        ).optional(),
        slotMs: z.string().describe(
          "External service cost in terms of bigquery slot milliseconds.",
        ).optional(),
      })).describe(
        "Output only. Job cost breakdown as bigquery internal cost and external service costs.",
      ).optional(),
      genAiStats: z.object({
        errorStats: z.object({
          errors: z.array(z.string()).describe(
            "A list of unique errors at query level (up to 5, truncated to 100 chars)",
          ).optional(),
        }).describe(
          "Provides error statistics for the query job across all AI function calls.",
        ).optional(),
        functionStats: z.array(z.object({
          costOptimizationStats: z.object({
            message: z.string().describe(
              "System generated message to provide insights into cost optimization state.",
            ).optional(),
            numCostOptimizedRows: z.string().describe(
              "Number of rows inferred via cost optimized workflow.",
            ).optional(),
          }).describe(
            "Provides cost optimization statistics for a GenAi function call.",
          ).optional(),
          errorStats: z.object({
            errors: z.array(z.string()).describe(
              "A list of unique errors at function level (up to 5, truncated to 100 chars).",
            ).optional(),
            numFailedRows: z.string().describe(
              "Number of failed rows processed by the function",
            ).optional(),
          }).describe("Provides error statistics for a GenAi function call.")
            .optional(),
          functionName: z.string().describe("Name of the function.").optional(),
          numProcessedRows: z.string().describe(
            "Number of rows processed by this GenAi function. This includes all cost_optimized, llm_inferred and failed_rows.",
          ).optional(),
          prompt: z.string().describe(
            "User input prompt of the function (truncated to 20 chars).",
          ).optional(),
        })).describe(
          "Function level stats for GenAi Functions. See https://docs.cloud.google.com/bigquery/docs/generative-ai-overview",
        ).optional(),
      }).describe("GenAi stats for the query job.").optional(),
      incrementalResultStats: z.object({
        disabledReason: z.enum([
          "DISABLED_REASON_UNSPECIFIED",
          "OTHER",
          "UNSUPPORTED_OPERATOR",
        ]).describe(
          "Output only. Reason why incremental query results are/were not written by the query.",
        ).optional(),
        disabledReasonDetails: z.string().describe(
          "Output only. Additional human-readable clarification, if available, for DisabledReason.",
        ).optional(),
        firstIncrementalRowTime: z.string().describe(
          "Output only. The time at which the first incremental result was written. If the query needed to restart internally, this only describes the final attempt.",
        ).optional(),
        incrementalRowCount: z.string().describe(
          "Output only. Number of rows that were in the latest result set before query completion.",
        ).optional(),
        lastIncrementalRowTime: z.string().describe(
          "Output only. The time at which the last incremental result was written. Does not include the final result written after query completion.",
        ).optional(),
        resultSetLastModifyTime: z.string().describe(
          "Output only. The time at which the result table's contents were modified. May be absent if no results have been written or the query has completed.",
        ).optional(),
        resultSetLastReplaceTime: z.string().describe(
          "Output only. The time at which the result table's contents were completely replaced. May be absent if no results have been written or the query has completed.",
        ).optional(),
      }).describe(
        "Statistics related to Incremental Query Results. Populated as part of JobStatistics2. This feature is not yet available.",
      ).optional(),
      loadQueryStatistics: z.object({
        badRecords: z.string().describe(
          "Output only. The number of bad records encountered while processing a LOAD query. Note that if the job has failed because of more bad records encountered than the maximum allowed in the load job configuration, then this number can be less than the total number of bad records present in the input data.",
        ).optional(),
        bytesTransferred: z.string().describe(
          "Output only. This field is deprecated. The number of bytes of source data copied over the network for a `LOAD` query. `transferred_bytes` has the canonical value for physical transferred bytes, which is used for BigQuery Omni billing.",
        ).optional(),
        inputFileBytes: z.string().describe(
          "Output only. Number of bytes of source data in a LOAD query.",
        ).optional(),
        inputFiles: z.string().describe(
          "Output only. Number of source files in a LOAD query.",
        ).optional(),
        outputBytes: z.string().describe(
          "Output only. Size of the loaded data in bytes. Note that while a LOAD query is in the running state, this value may change.",
        ).optional(),
        outputRows: z.string().describe(
          "Output only. Number of rows imported in a LOAD query. Note that while a LOAD query is in the running state, this value may change.",
        ).optional(),
      }).describe("Statistics for a LOAD query.").optional(),
      materializedViewStatistics: z.object({
        materializedView: z.array(z.object({
          chosen: z.boolean().describe(
            "Whether the materialized view is chosen for the query. A materialized view can be chosen to rewrite multiple parts of the same query. If a materialized view is chosen to rewrite any part of the query, then this field is true, even if the materialized view was not chosen to rewrite others parts.",
          ).optional(),
          estimatedBytesSaved: z.string().describe(
            "If present, specifies a best-effort estimation of the bytes saved by using the materialized view rather than its base tables.",
          ).optional(),
          rejectedReason: z.enum([
            "REJECTED_REASON_UNSPECIFIED",
            "NO_DATA",
            "COST",
            "BASE_TABLE_TRUNCATED",
            "BASE_TABLE_DATA_CHANGE",
            "BASE_TABLE_PARTITION_EXPIRATION_CHANGE",
            "BASE_TABLE_EXPIRED_PARTITION",
            "BASE_TABLE_INCOMPATIBLE_METADATA_CHANGE",
            "TIME_ZONE",
            "OUT_OF_TIME_TRAVEL_WINDOW",
            "BASE_TABLE_FINE_GRAINED_SECURITY_POLICY",
            "BASE_TABLE_TOO_STALE",
          ]).describe(
            "If present, specifies the reason why the materialized view was not chosen for the query.",
          ).optional(),
          tableReference: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
        })).describe(
          "Materialized views considered for the query job. Only certain materialized views are used. For a detailed list, see the child message. If many materialized views are considered, then the list might be incomplete.",
        ).optional(),
      }).describe("Statistics of materialized views considered in a query job.")
        .optional(),
      metadataCacheStatistics: z.object({
        tableMetadataCacheUsage: z.array(z.object({
          explanation: z.string().describe(
            "Free form human-readable reason metadata caching was unused for the job.",
          ).optional(),
          pruningStats: z.object({
            postCmetaPruningParallelInputCount: z.string().describe(
              "The number of parallel inputs matched.",
            ).optional(),
            postCmetaPruningPartitionCount: z.string().describe(
              "The number of partitions matched.",
            ).optional(),
            preCmetaPruningParallelInputCount: z.string().describe(
              "The number of parallel inputs scanned.",
            ).optional(),
          }).describe("The column metadata index pruning statistics.")
            .optional(),
          staleness: z.string().describe(
            "Duration since last refresh as of this job for managed tables (indicates metadata cache staleness as seen by this job).",
          ).optional(),
          tableReference: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          tableType: z.string().describe(
            "[Table type](https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type).",
          ).optional(),
          unusedReason: z.enum([
            "UNUSED_REASON_UNSPECIFIED",
            "EXCEEDED_MAX_STALENESS",
            "METADATA_CACHING_NOT_ENABLED",
            "OTHER_REASON",
          ]).describe("Reason for not using metadata caching for the table.")
            .optional(),
        })).describe(
          "Set for the Metadata caching eligible tables referenced in the query.",
        ).optional(),
      }).describe("Statistics for metadata caching in queried tables.")
        .optional(),
      mlStatistics: z.object({
        hparamTrials: z.array(z.object({
          endTimeMs: z.string().describe("Ending time of the trial.")
            .optional(),
          errorMessage: z.string().describe(
            "Error message for FAILED and INFEASIBLE trial.",
          ).optional(),
          evalLoss: z.number().describe(
            "Loss computed on the eval data at the end of trial.",
          ).optional(),
          evaluationMetrics: z.object({
            arimaForecastingMetrics: z.object({
              arimaFittingMetrics: z.array(z.object({
                aic: z.number().describe("AIC.").optional(),
                logLikelihood: z.number().describe("Log-likelihood.")
                  .optional(),
                variance: z.number().describe("Variance.").optional(),
              })).describe("Arima model fitting metrics.").optional(),
              arimaSingleModelForecastingMetrics: z.array(z.object({
                arimaFittingMetrics: z.object({
                  aic: z.number().describe("AIC.").optional(),
                  logLikelihood: z.number().describe("Log-likelihood.")
                    .optional(),
                  variance: z.number().describe("Variance.").optional(),
                }).describe("ARIMA model fitting metrics.").optional(),
                hasDrift: z.boolean().describe(
                  "Is arima model fitted with drift or not. It is always false when d is not 1.",
                ).optional(),
                hasHolidayEffect: z.boolean().describe(
                  "If true, holiday_effect is a part of time series decomposition result.",
                ).optional(),
                hasSpikesAndDips: z.boolean().describe(
                  "If true, spikes_and_dips is a part of time series decomposition result.",
                ).optional(),
                hasStepChanges: z.boolean().describe(
                  "If true, step_changes is a part of time series decomposition result.",
                ).optional(),
                nonSeasonalOrder: z.object({
                  d: z.string().describe("Order of the differencing part.")
                    .optional(),
                  p: z.string().describe("Order of the autoregressive part.")
                    .optional(),
                  q: z.string().describe("Order of the moving-average part.")
                    .optional(),
                }).describe(
                  "Arima order, can be used for both non-seasonal and seasonal parts.",
                ).optional(),
                seasonalPeriods: z.array(
                  z.enum([
                    "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                    "NO_SEASONALITY",
                    "DAILY",
                    "WEEKLY",
                    "MONTHLY",
                    "QUARTERLY",
                    "YEARLY",
                    "HOURLY",
                  ]),
                ).describe(
                  "Seasonal periods. Repeated because multiple periods are supported for one time series.",
                ).optional(),
                timeSeriesId: z.string().describe(
                  "The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used.",
                ).optional(),
                timeSeriesIds: z.array(z.string()).describe(
                  "The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns.",
                ).optional(),
              })).describe(
                "Repeated as there can be many metric sets (one for each model) in auto-arima and the large-scale case.",
              ).optional(),
              hasDrift: z.array(z.boolean()).describe(
                "Whether Arima model fitted with drift or not. It is always false when d is not 1.",
              ).optional(),
              nonSeasonalOrder: z.array(z.object({
                d: z.string().describe("Order of the differencing part.")
                  .optional(),
                p: z.string().describe("Order of the autoregressive part.")
                  .optional(),
                q: z.string().describe("Order of the moving-average part.")
                  .optional(),
              })).describe("Non-seasonal order.").optional(),
              seasonalPeriods: z.array(
                z.enum([
                  "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                  "NO_SEASONALITY",
                  "DAILY",
                  "WEEKLY",
                  "MONTHLY",
                  "QUARTERLY",
                  "YEARLY",
                  "HOURLY",
                ]),
              ).describe(
                "Seasonal periods. Repeated because multiple periods are supported for one time series.",
              ).optional(),
              timeSeriesId: z.array(z.string()).describe(
                "Id to differentiate different time series for the large-scale case.",
              ).optional(),
            }).describe(
              "Model evaluation metrics for ARIMA forecasting models.",
            ).optional(),
            binaryClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number().describe(
                  "Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric.",
                ).optional(),
                f1Score: z.number().describe(
                  "The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric.",
                ).optional(),
                logLoss: z.number().describe(
                  "Logarithmic Loss. For multiclass this is a macro-averaged metric.",
                ).optional(),
                precision: z.number().describe(
                  "Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier.",
                ).optional(),
                recall: z.number().describe(
                  "Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric.",
                ).optional(),
                rocAuc: z.number().describe(
                  "Area Under a ROC Curve. For multiclass this is a macro-averaged metric.",
                ).optional(),
                threshold: z.number().describe(
                  "Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold.",
                ).optional(),
              }).describe(
                "Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.",
              ).optional(),
              binaryConfusionMatrixList: z.array(z.object({
                accuracy: z.number().describe(
                  "The fraction of predictions given the correct label.",
                ).optional(),
                f1Score: z.number().describe(
                  "The equally weighted average of recall and precision.",
                ).optional(),
                falseNegatives: z.string().describe(
                  "Number of false samples predicted as false.",
                ).optional(),
                falsePositives: z.string().describe(
                  "Number of false samples predicted as true.",
                ).optional(),
                positiveClassThreshold: z.number().describe(
                  "Threshold value used when computing each of the following metric.",
                ).optional(),
                precision: z.number().describe(
                  "The fraction of actual positive predictions that had positive actual labels.",
                ).optional(),
                recall: z.number().describe(
                  "The fraction of actual positive labels that were given a positive prediction.",
                ).optional(),
                trueNegatives: z.string().describe(
                  "Number of true samples predicted as false.",
                ).optional(),
                truePositives: z.string().describe(
                  "Number of true samples predicted as true.",
                ).optional(),
              })).describe("Binary confusion matrix at multiple thresholds.")
                .optional(),
              negativeLabel: z.string().describe(
                "Label representing the negative class.",
              ).optional(),
              positiveLabel: z.string().describe(
                "Label representing the positive class.",
              ).optional(),
            }).describe(
              "Evaluation metrics for binary classification/classifier models.",
            ).optional(),
            clusteringMetrics: z.object({
              clusters: z.array(z.object({
                centroidId: z.string().describe("Centroid id.").optional(),
                count: z.string().describe(
                  "Count of training data rows that were assigned to this cluster.",
                ).optional(),
                featureValues: z.array(z.object({
                  categoricalValue: z.object({
                    categoryCounts: z.array(z.object({
                      category: z.string().describe("The name of category.")
                        .optional(),
                      count: z.string().describe(
                        "The count of training samples matching the category within the cluster.",
                      ).optional(),
                    })).describe(
                      'Counts of all categories for the categorical feature. If there are more than ten categories, we return top ten (by count) and return one more CategoryCount with category "_OTHER_" and count as aggregate counts of remaining categories.',
                    ).optional(),
                  }).describe("Representative value of a categorical feature.")
                    .optional(),
                  featureColumn: z.string().describe("The feature column name.")
                    .optional(),
                  numericalValue: z.number().describe(
                    "The numerical feature value. This is the centroid value for this feature.",
                  ).optional(),
                })).describe(
                  "Values of highly variant features for this cluster.",
                ).optional(),
              })).describe("Information for all clusters.").optional(),
              daviesBouldinIndex: z.number().describe("Davies-Bouldin index.")
                .optional(),
              meanSquaredDistance: z.number().describe(
                "Mean of squared distances between each sample to its cluster centroid.",
              ).optional(),
            }).describe("Evaluation metrics for clustering models.").optional(),
            dimensionalityReductionMetrics: z.object({
              totalExplainedVarianceRatio: z.number().describe(
                "Total percentage of variance explained by the selected principal components.",
              ).optional(),
            }).describe(
              "Model evaluation metrics for dimensionality reduction models.",
            ).optional(),
            multiClassClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number().describe(
                  "Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric.",
                ).optional(),
                f1Score: z.number().describe(
                  "The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric.",
                ).optional(),
                logLoss: z.number().describe(
                  "Logarithmic Loss. For multiclass this is a macro-averaged metric.",
                ).optional(),
                precision: z.number().describe(
                  "Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier.",
                ).optional(),
                recall: z.number().describe(
                  "Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric.",
                ).optional(),
                rocAuc: z.number().describe(
                  "Area Under a ROC Curve. For multiclass this is a macro-averaged metric.",
                ).optional(),
                threshold: z.number().describe(
                  "Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold.",
                ).optional(),
              }).describe(
                "Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.",
              ).optional(),
              confusionMatrixList: z.array(z.object({
                confidenceThreshold: z.number().describe(
                  "Confidence threshold used when computing the entries of the confusion matrix.",
                ).optional(),
                rows: z.array(z.object({
                  actualLabel: z.string().describe(
                    "The original label of this row.",
                  ).optional(),
                  entries: z.array(z.object({
                    itemCount: z.string().describe(
                      "Number of items being predicted as this label.",
                    ).optional(),
                    predictedLabel: z.string().describe(
                      "The predicted label. For confidence_threshold > 0, we will also add an entry indicating the number of items under the confidence threshold.",
                    ).optional(),
                  })).describe("Info describing predicted label distribution.")
                    .optional(),
                })).describe("One row per actual label.").optional(),
              })).describe("Confusion matrix at different thresholds.")
                .optional(),
            }).describe(
              "Evaluation metrics for multi-class classification/classifier models.",
            ).optional(),
            rankingMetrics: z.object({
              averageRank: z.number().describe(
                "Determines the goodness of a ranking by computing the percentile rank from the predicted confidence and dividing it by the original rank.",
              ).optional(),
              meanAveragePrecision: z.number().describe(
                "Calculates a precision per user for all the items by ranking them and then averages all the precisions across all the users.",
              ).optional(),
              meanSquaredError: z.number().describe(
                "Similar to the mean squared error computed in regression and explicit recommendation models except instead of computing the rating directly, the output from evaluate is computed against a preference which is 1 or 0 depending on if the rating exists or not.",
              ).optional(),
              normalizedDiscountedCumulativeGain: z.number().describe(
                "A metric to determine the goodness of a ranking calculated from the predicted confidence by comparing it to an ideal rank measured by the original ratings.",
              ).optional(),
            }).describe(
              "Evaluation metrics used by weighted-ALS models specified by feedback_type=implicit.",
            ).optional(),
            regressionMetrics: z.object({
              meanAbsoluteError: z.number().describe("Mean absolute error.")
                .optional(),
              meanSquaredError: z.number().describe("Mean squared error.")
                .optional(),
              meanSquaredLogError: z.number().describe(
                "Mean squared log error.",
              ).optional(),
              medianAbsoluteError: z.number().describe("Median absolute error.")
                .optional(),
              rSquared: z.number().describe(
                "R^2 score. This corresponds to r2_score in ML.EVALUATE.",
              ).optional(),
            }).describe(
              "Evaluation metrics for regression and explicit feedback type matrix factorization models.",
            ).optional(),
          }).describe(
            "Evaluation metrics of a model. These are either computed on all training data or just the eval data based on whether eval data was used during training. These are not present for imported models.",
          ).optional(),
          hparamTuningEvaluationMetrics: z.object({
            arimaForecastingMetrics: z.object({
              arimaFittingMetrics: z.array(z.object({
                aic: z.number().describe("AIC.").optional(),
                logLikelihood: z.number().describe("Log-likelihood.")
                  .optional(),
                variance: z.number().describe("Variance.").optional(),
              })).describe("Arima model fitting metrics.").optional(),
              arimaSingleModelForecastingMetrics: z.array(z.object({
                arimaFittingMetrics: z.object({
                  aic: z.number().describe("AIC.").optional(),
                  logLikelihood: z.number().describe("Log-likelihood.")
                    .optional(),
                  variance: z.number().describe("Variance.").optional(),
                }).describe("ARIMA model fitting metrics.").optional(),
                hasDrift: z.boolean().describe(
                  "Is arima model fitted with drift or not. It is always false when d is not 1.",
                ).optional(),
                hasHolidayEffect: z.boolean().describe(
                  "If true, holiday_effect is a part of time series decomposition result.",
                ).optional(),
                hasSpikesAndDips: z.boolean().describe(
                  "If true, spikes_and_dips is a part of time series decomposition result.",
                ).optional(),
                hasStepChanges: z.boolean().describe(
                  "If true, step_changes is a part of time series decomposition result.",
                ).optional(),
                nonSeasonalOrder: z.object({
                  d: z.string().describe("Order of the differencing part.")
                    .optional(),
                  p: z.string().describe("Order of the autoregressive part.")
                    .optional(),
                  q: z.string().describe("Order of the moving-average part.")
                    .optional(),
                }).describe(
                  "Arima order, can be used for both non-seasonal and seasonal parts.",
                ).optional(),
                seasonalPeriods: z.array(
                  z.enum([
                    "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                    "NO_SEASONALITY",
                    "DAILY",
                    "WEEKLY",
                    "MONTHLY",
                    "QUARTERLY",
                    "YEARLY",
                    "HOURLY",
                  ]),
                ).describe(
                  "Seasonal periods. Repeated because multiple periods are supported for one time series.",
                ).optional(),
                timeSeriesId: z.string().describe(
                  "The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used.",
                ).optional(),
                timeSeriesIds: z.array(z.string()).describe(
                  "The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns.",
                ).optional(),
              })).describe(
                "Repeated as there can be many metric sets (one for each model) in auto-arima and the large-scale case.",
              ).optional(),
              hasDrift: z.array(z.boolean()).describe(
                "Whether Arima model fitted with drift or not. It is always false when d is not 1.",
              ).optional(),
              nonSeasonalOrder: z.array(z.object({
                d: z.string().describe("Order of the differencing part.")
                  .optional(),
                p: z.string().describe("Order of the autoregressive part.")
                  .optional(),
                q: z.string().describe("Order of the moving-average part.")
                  .optional(),
              })).describe("Non-seasonal order.").optional(),
              seasonalPeriods: z.array(
                z.enum([
                  "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                  "NO_SEASONALITY",
                  "DAILY",
                  "WEEKLY",
                  "MONTHLY",
                  "QUARTERLY",
                  "YEARLY",
                  "HOURLY",
                ]),
              ).describe(
                "Seasonal periods. Repeated because multiple periods are supported for one time series.",
              ).optional(),
              timeSeriesId: z.array(z.string()).describe(
                "Id to differentiate different time series for the large-scale case.",
              ).optional(),
            }).describe(
              "Model evaluation metrics for ARIMA forecasting models.",
            ).optional(),
            binaryClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number().describe(
                  "Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric.",
                ).optional(),
                f1Score: z.number().describe(
                  "The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric.",
                ).optional(),
                logLoss: z.number().describe(
                  "Logarithmic Loss. For multiclass this is a macro-averaged metric.",
                ).optional(),
                precision: z.number().describe(
                  "Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier.",
                ).optional(),
                recall: z.number().describe(
                  "Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric.",
                ).optional(),
                rocAuc: z.number().describe(
                  "Area Under a ROC Curve. For multiclass this is a macro-averaged metric.",
                ).optional(),
                threshold: z.number().describe(
                  "Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold.",
                ).optional(),
              }).describe(
                "Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.",
              ).optional(),
              binaryConfusionMatrixList: z.array(z.object({
                accuracy: z.number().describe(
                  "The fraction of predictions given the correct label.",
                ).optional(),
                f1Score: z.number().describe(
                  "The equally weighted average of recall and precision.",
                ).optional(),
                falseNegatives: z.string().describe(
                  "Number of false samples predicted as false.",
                ).optional(),
                falsePositives: z.string().describe(
                  "Number of false samples predicted as true.",
                ).optional(),
                positiveClassThreshold: z.number().describe(
                  "Threshold value used when computing each of the following metric.",
                ).optional(),
                precision: z.number().describe(
                  "The fraction of actual positive predictions that had positive actual labels.",
                ).optional(),
                recall: z.number().describe(
                  "The fraction of actual positive labels that were given a positive prediction.",
                ).optional(),
                trueNegatives: z.string().describe(
                  "Number of true samples predicted as false.",
                ).optional(),
                truePositives: z.string().describe(
                  "Number of true samples predicted as true.",
                ).optional(),
              })).describe("Binary confusion matrix at multiple thresholds.")
                .optional(),
              negativeLabel: z.string().describe(
                "Label representing the negative class.",
              ).optional(),
              positiveLabel: z.string().describe(
                "Label representing the positive class.",
              ).optional(),
            }).describe(
              "Evaluation metrics for binary classification/classifier models.",
            ).optional(),
            clusteringMetrics: z.object({
              clusters: z.array(z.object({
                centroidId: z.string().describe("Centroid id.").optional(),
                count: z.string().describe(
                  "Count of training data rows that were assigned to this cluster.",
                ).optional(),
                featureValues: z.array(z.object({
                  categoricalValue: z.object({
                    categoryCounts: z.array(z.object({
                      category: z.string().describe("The name of category.")
                        .optional(),
                      count: z.string().describe(
                        "The count of training samples matching the category within the cluster.",
                      ).optional(),
                    })).describe(
                      'Counts of all categories for the categorical feature. If there are more than ten categories, we return top ten (by count) and return one more CategoryCount with category "_OTHER_" and count as aggregate counts of remaining categories.',
                    ).optional(),
                  }).describe("Representative value of a categorical feature.")
                    .optional(),
                  featureColumn: z.string().describe("The feature column name.")
                    .optional(),
                  numericalValue: z.number().describe(
                    "The numerical feature value. This is the centroid value for this feature.",
                  ).optional(),
                })).describe(
                  "Values of highly variant features for this cluster.",
                ).optional(),
              })).describe("Information for all clusters.").optional(),
              daviesBouldinIndex: z.number().describe("Davies-Bouldin index.")
                .optional(),
              meanSquaredDistance: z.number().describe(
                "Mean of squared distances between each sample to its cluster centroid.",
              ).optional(),
            }).describe("Evaluation metrics for clustering models.").optional(),
            dimensionalityReductionMetrics: z.object({
              totalExplainedVarianceRatio: z.number().describe(
                "Total percentage of variance explained by the selected principal components.",
              ).optional(),
            }).describe(
              "Model evaluation metrics for dimensionality reduction models.",
            ).optional(),
            multiClassClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number().describe(
                  "Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric.",
                ).optional(),
                f1Score: z.number().describe(
                  "The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric.",
                ).optional(),
                logLoss: z.number().describe(
                  "Logarithmic Loss. For multiclass this is a macro-averaged metric.",
                ).optional(),
                precision: z.number().describe(
                  "Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier.",
                ).optional(),
                recall: z.number().describe(
                  "Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric.",
                ).optional(),
                rocAuc: z.number().describe(
                  "Area Under a ROC Curve. For multiclass this is a macro-averaged metric.",
                ).optional(),
                threshold: z.number().describe(
                  "Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold.",
                ).optional(),
              }).describe(
                "Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.",
              ).optional(),
              confusionMatrixList: z.array(z.object({
                confidenceThreshold: z.number().describe(
                  "Confidence threshold used when computing the entries of the confusion matrix.",
                ).optional(),
                rows: z.array(z.object({
                  actualLabel: z.string().describe(
                    "The original label of this row.",
                  ).optional(),
                  entries: z.array(z.object({
                    itemCount: z.string().describe(
                      "Number of items being predicted as this label.",
                    ).optional(),
                    predictedLabel: z.string().describe(
                      "The predicted label. For confidence_threshold > 0, we will also add an entry indicating the number of items under the confidence threshold.",
                    ).optional(),
                  })).describe("Info describing predicted label distribution.")
                    .optional(),
                })).describe("One row per actual label.").optional(),
              })).describe("Confusion matrix at different thresholds.")
                .optional(),
            }).describe(
              "Evaluation metrics for multi-class classification/classifier models.",
            ).optional(),
            rankingMetrics: z.object({
              averageRank: z.number().describe(
                "Determines the goodness of a ranking by computing the percentile rank from the predicted confidence and dividing it by the original rank.",
              ).optional(),
              meanAveragePrecision: z.number().describe(
                "Calculates a precision per user for all the items by ranking them and then averages all the precisions across all the users.",
              ).optional(),
              meanSquaredError: z.number().describe(
                "Similar to the mean squared error computed in regression and explicit recommendation models except instead of computing the rating directly, the output from evaluate is computed against a preference which is 1 or 0 depending on if the rating exists or not.",
              ).optional(),
              normalizedDiscountedCumulativeGain: z.number().describe(
                "A metric to determine the goodness of a ranking calculated from the predicted confidence by comparing it to an ideal rank measured by the original ratings.",
              ).optional(),
            }).describe(
              "Evaluation metrics used by weighted-ALS models specified by feedback_type=implicit.",
            ).optional(),
            regressionMetrics: z.object({
              meanAbsoluteError: z.number().describe("Mean absolute error.")
                .optional(),
              meanSquaredError: z.number().describe("Mean squared error.")
                .optional(),
              meanSquaredLogError: z.number().describe(
                "Mean squared log error.",
              ).optional(),
              medianAbsoluteError: z.number().describe("Median absolute error.")
                .optional(),
              rSquared: z.number().describe(
                "R^2 score. This corresponds to r2_score in ML.EVALUATE.",
              ).optional(),
            }).describe(
              "Evaluation metrics for regression and explicit feedback type matrix factorization models.",
            ).optional(),
          }).describe(
            "Evaluation metrics of a model. These are either computed on all training data or just the eval data based on whether eval data was used during training. These are not present for imported models.",
          ).optional(),
          hparams: z.object({
            activationFn: z.string().describe(
              "Activation function of the neural nets.",
            ).optional(),
            adjustStepChanges: z.boolean().describe(
              "If true, detect step changes and make data adjustment in the input time series.",
            ).optional(),
            approxGlobalFeatureContrib: z.boolean().describe(
              "Whether to use approximate feature contribution method in XGBoost model explanation for global explain.",
            ).optional(),
            autoArima: z.boolean().describe(
              "Whether to enable auto ARIMA or not.",
            ).optional(),
            autoArimaMaxOrder: z.string().describe(
              "The max value of the sum of non-seasonal p and q.",
            ).optional(),
            autoArimaMinOrder: z.string().describe(
              "The min value of the sum of non-seasonal p and q.",
            ).optional(),
            autoClassWeights: z.boolean().describe(
              "Whether to calculate class weights automatically based on the popularity of each label.",
            ).optional(),
            batchSize: z.string().describe("Batch size for dnn models.")
              .optional(),
            boosterType: z.enum(["BOOSTER_TYPE_UNSPECIFIED", "GBTREE", "DART"])
              .describe("Booster type for boosted tree models.").optional(),
            budgetHours: z.number().describe(
              "Budget in hours for AutoML training.",
            ).optional(),
            calculatePValues: z.boolean().describe(
              "Whether or not p-value test should be computed for this model. Only available for linear and logistic regression models.",
            ).optional(),
            categoryEncodingMethod: z.enum([
              "ENCODING_METHOD_UNSPECIFIED",
              "ONE_HOT_ENCODING",
              "LABEL_ENCODING",
              "DUMMY_ENCODING",
            ]).describe("Categorical feature encoding method.").optional(),
            cleanSpikesAndDips: z.boolean().describe(
              "If true, clean spikes and dips in the input time series.",
            ).optional(),
            colorSpace: z.enum([
              "COLOR_SPACE_UNSPECIFIED",
              "RGB",
              "HSV",
              "YIQ",
              "YUV",
              "GRAYSCALE",
            ]).describe(
              "Enums for color space, used for processing images in Object Table. See more details at https://www.tensorflow.org/io/tutorials/colorspace.",
            ).optional(),
            colsampleBylevel: z.number().describe(
              "Subsample ratio of columns for each level for boosted tree models.",
            ).optional(),
            colsampleBynode: z.number().describe(
              "Subsample ratio of columns for each node(split) for boosted tree models.",
            ).optional(),
            colsampleBytree: z.number().describe(
              "Subsample ratio of columns when constructing each tree for boosted tree models.",
            ).optional(),
            contributionMetric: z.string().describe(
              "The contribution metric. Applies to contribution analysis models. Allowed formats supported are for summable and summable ratio contribution metrics. These include expressions such as `SUM(x)` or `SUM(x)/SUM(y)`, where x and y are column names from the base table.",
            ).optional(),
            dartNormalizeType: z.enum([
              "DART_NORMALIZE_TYPE_UNSPECIFIED",
              "TREE",
              "FOREST",
            ]).describe(
              "Type of normalization algorithm for boosted tree models using dart booster.",
            ).optional(),
            dataFrequency: z.enum([
              "DATA_FREQUENCY_UNSPECIFIED",
              "AUTO_FREQUENCY",
              "YEARLY",
              "QUARTERLY",
              "MONTHLY",
              "WEEKLY",
              "DAILY",
              "HOURLY",
              "PER_MINUTE",
            ]).describe("The data frequency of a time series.").optional(),
            dataSplitColumn: z.string().describe(
              "The column to split data with. This column won't be used as a feature. 1. When data_split_method is CUSTOM, the corresponding column should be boolean. The rows with true value tag are eval data, and the false are training data. 2. When data_split_method is SEQ, the first DATA_SPLIT_EVAL_FRACTION rows (from smallest to largest) in the corresponding column are used as training data, and the rest are eval data. It respects the order in Orderable data types: https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties",
            ).optional(),
            dataSplitEvalFraction: z.number().describe(
              "The fraction of evaluation data over the whole input data. The rest of data will be used as training data. The format should be double. Accurate to two decimal places. Default value is 0.2.",
            ).optional(),
            dataSplitMethod: z.enum([
              "DATA_SPLIT_METHOD_UNSPECIFIED",
              "RANDOM",
              "CUSTOM",
              "SEQUENTIAL",
              "NO_SPLIT",
              "AUTO_SPLIT",
            ]).describe(
              "The data split type for training and evaluation, e.g. RANDOM.",
            ).optional(),
            decomposeTimeSeries: z.boolean().describe(
              "If true, perform decompose time series and save the results.",
            ).optional(),
            dimensionIdColumns: z.array(z.string()).describe(
              "Optional. Names of the columns to slice on. Applies to contribution analysis models.",
            ).optional(),
            distanceType: z.enum([
              "DISTANCE_TYPE_UNSPECIFIED",
              "EUCLIDEAN",
              "COSINE",
            ]).describe("Distance type for clustering models.").optional(),
            dropout: z.number().describe("Dropout probability for dnn models.")
              .optional(),
            earlyStop: z.boolean().describe(
              "Whether to stop early when the loss doesn't improve significantly any more (compared to min_relative_progress). Used only for iterative training algorithms.",
            ).optional(),
            enableGlobalExplain: z.boolean().describe(
              "If true, enable global explanation during training.",
            ).optional(),
            endpointIdleTtl: z.string().describe(
              "The idle TTL of the endpoint before the resources get destroyed. The default value is 6.5 hours.",
            ).optional(),
            feedbackType: z.enum([
              "FEEDBACK_TYPE_UNSPECIFIED",
              "IMPLICIT",
              "EXPLICIT",
            ]).describe(
              "Feedback type that specifies which algorithm to run for matrix factorization.",
            ).optional(),
            fitIntercept: z.boolean().describe(
              "Whether the model should include intercept during model training.",
            ).optional(),
            forecastLimitLowerBound: z.number().describe(
              "The forecast limit lower bound that was used during ARIMA model training with limits. To see more details of the algorithm: https://otexts.com/fpp2/limits.html",
            ).optional(),
            forecastLimitUpperBound: z.number().describe(
              "The forecast limit upper bound that was used during ARIMA model training with limits.",
            ).optional(),
            hiddenUnits: z.array(z.string()).describe(
              "Hidden units for dnn models.",
            ).optional(),
            holidayRegion: z.enum([
              "HOLIDAY_REGION_UNSPECIFIED",
              "GLOBAL",
              "NA",
              "JAPAC",
              "EMEA",
              "LAC",
              "AE",
              "AR",
              "AT",
              "AU",
              "BE",
              "BR",
              "CA",
              "CH",
              "CL",
              "CN",
              "CO",
              "CS",
              "CZ",
              "DE",
              "DK",
              "DZ",
              "EC",
              "EE",
              "EG",
              "ES",
              "FI",
              "FR",
              "GB",
              "GR",
              "HK",
              "HU",
              "ID",
              "IE",
              "IL",
              "IN",
              "IR",
              "IT",
              "JP",
              "KR",
              "LV",
              "MA",
              "MX",
              "MY",
              "NG",
              "NL",
              "NO",
              "NZ",
              "PE",
              "PH",
              "PK",
              "PL",
              "PT",
              "RO",
              "RS",
              "RU",
              "SA",
              "SE",
              "SG",
              "SI",
              "SK",
              "TH",
              "TR",
              "TW",
              "UA",
              "US",
              "VE",
              "VN",
              "ZA",
            ]).describe(
              "The geographical region based on which the holidays are considered in time series modeling. If a valid value is specified, then holiday effects modeling is enabled.",
            ).optional(),
            holidayRegions: z.array(
              z.enum([
                "HOLIDAY_REGION_UNSPECIFIED",
                "GLOBAL",
                "NA",
                "JAPAC",
                "EMEA",
                "LAC",
                "AE",
                "AR",
                "AT",
                "AU",
                "BE",
                "BR",
                "CA",
                "CH",
                "CL",
                "CN",
                "CO",
                "CS",
                "CZ",
                "DE",
                "DK",
                "DZ",
                "EC",
                "EE",
                "EG",
                "ES",
                "FI",
                "FR",
                "GB",
                "GR",
                "HK",
                "HU",
                "ID",
                "IE",
                "IL",
                "IN",
                "IR",
                "IT",
                "JP",
                "KR",
                "LV",
                "MA",
                "MX",
                "MY",
                "NG",
                "NL",
                "NO",
                "NZ",
                "PE",
                "PH",
                "PK",
                "PL",
                "PT",
                "RO",
                "RS",
                "RU",
                "SA",
                "SE",
                "SG",
                "SI",
                "SK",
                "TH",
                "TR",
                "TW",
                "UA",
                "US",
                "VE",
                "VN",
                "ZA",
              ]),
            ).describe(
              "A list of geographical regions that are used for time series modeling.",
            ).optional(),
            horizon: z.string().describe(
              "The number of periods ahead that need to be forecasted.",
            ).optional(),
            hparamTuningObjectives: z.array(
              z.enum([
                "HPARAM_TUNING_OBJECTIVE_UNSPECIFIED",
                "MEAN_ABSOLUTE_ERROR",
                "MEAN_SQUARED_ERROR",
                "MEAN_SQUARED_LOG_ERROR",
                "MEDIAN_ABSOLUTE_ERROR",
                "R_SQUARED",
                "EXPLAINED_VARIANCE",
                "PRECISION",
                "RECALL",
                "ACCURACY",
                "F1_SCORE",
                "LOG_LOSS",
                "ROC_AUC",
                "DAVIES_BOULDIN_INDEX",
                "MEAN_AVERAGE_PRECISION",
                "NORMALIZED_DISCOUNTED_CUMULATIVE_GAIN",
                "AVERAGE_RANK",
              ]),
            ).describe(
              "The target evaluation metrics to optimize the hyperparameters for.",
            ).optional(),
            huggingFaceModelId: z.string().describe(
              "The id of a Hugging Face model. For example, `google/gemma-2-2b-it`.",
            ).optional(),
            includeDrift: z.boolean().describe(
              "Include drift when fitting an ARIMA model.",
            ).optional(),
            initialLearnRate: z.number().describe(
              "Specifies the initial learning rate for the line search learn rate strategy.",
            ).optional(),
            inputLabelColumns: z.array(z.string()).describe(
              "Name of input label columns in training data.",
            ).optional(),
            instanceWeightColumn: z.string().describe(
              "Name of the instance weight column for training data. This column isn't be used as a feature.",
            ).optional(),
            integratedGradientsNumSteps: z.string().describe(
              "Number of integral steps for the integrated gradients explain method.",
            ).optional(),
            isTestColumn: z.string().describe(
              "Name of the column used to determine the rows corresponding to control and test. Applies to contribution analysis models.",
            ).optional(),
            itemColumn: z.string().describe(
              "Item column specified for matrix factorization models.",
            ).optional(),
            kmeansInitializationColumn: z.string().describe(
              "The column used to provide the initial centroids for kmeans algorithm when kmeans_initialization_method is CUSTOM.",
            ).optional(),
            kmeansInitializationMethod: z.enum([
              "KMEANS_INITIALIZATION_METHOD_UNSPECIFIED",
              "RANDOM",
              "CUSTOM",
              "KMEANS_PLUS_PLUS",
            ]).describe(
              "The method used to initialize the centroids for kmeans algorithm.",
            ).optional(),
            l1RegActivation: z.number().describe(
              "L1 regularization coefficient to activations.",
            ).optional(),
            l1Regularization: z.number().describe(
              "L1 regularization coefficient.",
            ).optional(),
            l2Regularization: z.number().describe(
              "L2 regularization coefficient.",
            ).optional(),
            labelClassWeights: z.record(z.string(), z.number()).describe(
              "Weights associated with each label class, for rebalancing the training data. Only applicable for classification models.",
            ).optional(),
            learnRate: z.number().describe(
              "Learning rate in training. Used only for iterative training algorithms.",
            ).optional(),
            learnRateStrategy: z.enum([
              "LEARN_RATE_STRATEGY_UNSPECIFIED",
              "LINE_SEARCH",
              "CONSTANT",
            ]).describe(
              "The strategy to determine learn rate for the current iteration.",
            ).optional(),
            lossType: z.enum([
              "LOSS_TYPE_UNSPECIFIED",
              "MEAN_SQUARED_LOSS",
              "MEAN_LOG_LOSS",
            ]).describe("Type of loss function used during training run.")
              .optional(),
            machineType: z.string().describe(
              "The type of the machine used to deploy and serve the model.",
            ).optional(),
            maxIterations: z.string().describe(
              "The maximum number of iterations in training. Used only for iterative training algorithms.",
            ).optional(),
            maxParallelTrials: z.string().describe(
              "Maximum number of trials to run in parallel.",
            ).optional(),
            maxReplicaCount: z.string().describe(
              "The maximum number of machine replicas that will be deployed on an endpoint. The default value is equal to min_replica_count.",
            ).optional(),
            maxTimeSeriesLength: z.string().describe(
              "The maximum number of time points in a time series that can be used in modeling the trend component of the time series. Don't use this option with the `timeSeriesLengthFraction` or `minTimeSeriesLength` options.",
            ).optional(),
            maxTreeDepth: z.string().describe(
              "Maximum depth of a tree for boosted tree models.",
            ).optional(),
            minAprioriSupport: z.number().describe(
              "The apriori support minimum. Applies to contribution analysis models.",
            ).optional(),
            minRelativeProgress: z.number().describe(
              "When early_stop is true, stops training when accuracy improvement is less than 'min_relative_progress'. Used only for iterative training algorithms.",
            ).optional(),
            minReplicaCount: z.string().describe(
              "The minimum number of machine replicas that will be always deployed on an endpoint. This value must be greater than or equal to 1. The default value is 1.",
            ).optional(),
            minSplitLoss: z.number().describe(
              "Minimum split loss for boosted tree models.",
            ).optional(),
            minTimeSeriesLength: z.string().describe(
              "The minimum number of time points in a time series that are used in modeling the trend component of the time series. If you use this option you must also set the `timeSeriesLengthFraction` option. This training option ensures that enough time points are available when you use `timeSeriesLengthFraction` in trend modeling. This is particularly important when forecasting multiple time series in a single query using `timeSeriesIdColumn`. If the total number of time points is less than the `minTimeSeriesLength` value, then the query uses all available time points.",
            ).optional(),
            minTreeChildWeight: z.string().describe(
              "Minimum sum of instance weight needed in a child for boosted tree models.",
            ).optional(),
            modelGardenModelName: z.string().describe(
              "The name of a Vertex model garden publisher model. Format is `publishers/{publisher}/models/{model}@{optional_version_id}`.",
            ).optional(),
            modelRegistry: z.enum(["MODEL_REGISTRY_UNSPECIFIED", "VERTEX_AI"])
              .describe("The model registry.").optional(),
            modelUri: z.string().describe(
              "Google Cloud Storage URI from which the model was imported. Only applicable for imported models.",
            ).optional(),
            nonSeasonalOrder: z.object({
              d: z.string().describe("Order of the differencing part.")
                .optional(),
              p: z.string().describe("Order of the autoregressive part.")
                .optional(),
              q: z.string().describe("Order of the moving-average part.")
                .optional(),
            }).describe(
              "Arima order, can be used for both non-seasonal and seasonal parts.",
            ).optional(),
            numClusters: z.string().describe(
              "Number of clusters for clustering models.",
            ).optional(),
            numFactors: z.string().describe(
              "Num factors specified for matrix factorization models.",
            ).optional(),
            numParallelTree: z.string().describe(
              "Number of parallel trees constructed during each iteration for boosted tree models.",
            ).optional(),
            numPrincipalComponents: z.string().describe(
              "Number of principal components to keep in the PCA model. Must be <= the number of features.",
            ).optional(),
            numTrials: z.string().describe(
              "Number of trials to run this hyperparameter tuning job.",
            ).optional(),
            optimizationStrategy: z.enum([
              "OPTIMIZATION_STRATEGY_UNSPECIFIED",
              "BATCH_GRADIENT_DESCENT",
              "NORMAL_EQUATION",
            ]).describe(
              "Optimization strategy for training linear regression models.",
            ).optional(),
            optimizer: z.string().describe(
              "Optimizer used for training the neural nets.",
            ).optional(),
            pcaExplainedVarianceRatio: z.number().describe(
              "The minimum ratio of cumulative explained variance that needs to be given by the PCA model.",
            ).optional(),
            pcaSolver: z.enum(["UNSPECIFIED", "FULL", "RANDOMIZED", "AUTO"])
              .describe("The solver for PCA.").optional(),
            reservationAffinityKey: z.string().describe(
              "Corresponds to the label key of a reservation resource used by Vertex AI. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.",
            ).optional(),
            reservationAffinityType: z.enum([
              "RESERVATION_AFFINITY_TYPE_UNSPECIFIED",
              "NO_RESERVATION",
              "ANY_RESERVATION",
              "SPECIFIC_RESERVATION",
            ]).describe(
              "Specifies the reservation affinity type used to configure a Vertex AI resource. The default value is `NO_RESERVATION`.",
            ).optional(),
            reservationAffinityValues: z.array(z.string()).describe(
              "Corresponds to the label values of a reservation resource used by Vertex AI. This must be the full resource name of the reservation or reservation block.",
            ).optional(),
            sampledShapleyNumPaths: z.string().describe(
              "Number of paths for the sampled Shapley explain method.",
            ).optional(),
            scaleFeatures: z.boolean().describe(
              "If true, scale the feature values by dividing the feature standard deviation. Currently only apply to PCA.",
            ).optional(),
            standardizeFeatures: z.boolean().describe(
              "Whether to standardize numerical features. Default to true.",
            ).optional(),
            subsample: z.number().describe(
              "Subsample fraction of the training data to grow tree to prevent overfitting for boosted tree models.",
            ).optional(),
            tfVersion: z.string().describe(
              "Based on the selected TF version, the corresponding docker image is used to train external models.",
            ).optional(),
            timeSeriesDataColumn: z.string().describe(
              "Column to be designated as time series data for ARIMA model.",
            ).optional(),
            timeSeriesIdColumn: z.string().describe(
              "The time series id column that was used during ARIMA model training.",
            ).optional(),
            timeSeriesIdColumns: z.array(z.string()).describe(
              "The time series id columns that were used during ARIMA model training.",
            ).optional(),
            timeSeriesLengthFraction: z.number().describe(
              "The fraction of the interpolated length of the time series that's used to model the time series trend component. All of the time points of the time series are used to model the non-trend component. This training option accelerates modeling training without sacrificing much forecasting accuracy. You can use this option with `minTimeSeriesLength` but not with `maxTimeSeriesLength`.",
            ).optional(),
            timeSeriesTimestampColumn: z.string().describe(
              "Column to be designated as time series timestamp for ARIMA model.",
            ).optional(),
            treeMethod: z.enum([
              "TREE_METHOD_UNSPECIFIED",
              "AUTO",
              "EXACT",
              "APPROX",
              "HIST",
            ]).describe("Tree construction algorithm for boosted tree models.")
              .optional(),
            trendSmoothingWindowSize: z.string().describe(
              "Smoothing window size for the trend component. When a positive value is specified, a center moving average smoothing is applied on the history trend. When the smoothing window is out of the boundary at the beginning or the end of the trend, the first element or the last element is padded to fill the smoothing window before the average is applied.",
            ).optional(),
            userColumn: z.string().describe(
              "User column specified for matrix factorization models.",
            ).optional(),
            vertexAiModelVersionAliases: z.array(z.string()).describe(
              "The version aliases to apply in Vertex AI model registry. Always overwrite if the version aliases exists in a existing model.",
            ).optional(),
            walsAlpha: z.number().describe(
              "Hyperparameter for matrix factoration when implicit feedback type is specified.",
            ).optional(),
            warmStart: z.boolean().describe(
              "Whether to train a model from the last checkpoint.",
            ).optional(),
            xgboostVersion: z.string().describe(
              "User-selected XGBoost versions for training of XGBoost models.",
            ).optional(),
          }).describe("Options used in model training.").optional(),
          startTimeMs: z.string().describe("Starting time of the trial.")
            .optional(),
          status: z.enum([
            "TRIAL_STATUS_UNSPECIFIED",
            "NOT_STARTED",
            "RUNNING",
            "SUCCEEDED",
            "FAILED",
            "INFEASIBLE",
            "STOPPED_EARLY",
          ]).describe("The status of the trial.").optional(),
          trainingLoss: z.number().describe(
            "Loss computed on the training data at the end of trial.",
          ).optional(),
          trialId: z.string().describe("1-based index of the trial.")
            .optional(),
        })).describe(
          "Output only. Trials of a [hyperparameter tuning job](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) sorted by trial_id.",
        ).optional(),
        iterationResults: z.array(z.object({
          arimaResult: z.object({
            arimaModelInfo: z.array(z.object({
              arimaCoefficients: z.object({
                autoRegressiveCoefficients: z.array(z.number()).describe(
                  "Auto-regressive coefficients, an array of double.",
                ).optional(),
                interceptCoefficient: z.number().describe(
                  "Intercept coefficient, just a double not an array.",
                ).optional(),
                movingAverageCoefficients: z.array(z.number()).describe(
                  "Moving-average coefficients, an array of double.",
                ).optional(),
              }).describe("Arima coefficients.").optional(),
              arimaFittingMetrics: z.object({
                aic: z.number().describe("AIC.").optional(),
                logLikelihood: z.number().describe("Log-likelihood.")
                  .optional(),
                variance: z.number().describe("Variance.").optional(),
              }).describe("ARIMA model fitting metrics.").optional(),
              hasDrift: z.boolean().describe(
                "Whether Arima model fitted with drift or not. It is always false when d is not 1.",
              ).optional(),
              hasHolidayEffect: z.boolean().describe(
                "If true, holiday_effect is a part of time series decomposition result.",
              ).optional(),
              hasSpikesAndDips: z.boolean().describe(
                "If true, spikes_and_dips is a part of time series decomposition result.",
              ).optional(),
              hasStepChanges: z.boolean().describe(
                "If true, step_changes is a part of time series decomposition result.",
              ).optional(),
              nonSeasonalOrder: z.object({
                d: z.string().describe("Order of the differencing part.")
                  .optional(),
                p: z.string().describe("Order of the autoregressive part.")
                  .optional(),
                q: z.string().describe("Order of the moving-average part.")
                  .optional(),
              }).describe(
                "Arima order, can be used for both non-seasonal and seasonal parts.",
              ).optional(),
              seasonalPeriods: z.array(
                z.enum([
                  "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                  "NO_SEASONALITY",
                  "DAILY",
                  "WEEKLY",
                  "MONTHLY",
                  "QUARTERLY",
                  "YEARLY",
                  "HOURLY",
                ]),
              ).describe(
                "Seasonal periods. Repeated because multiple periods are supported for one time series.",
              ).optional(),
              timeSeriesId: z.string().describe(
                "The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used.",
              ).optional(),
              timeSeriesIds: z.array(z.string()).describe(
                "The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns.",
              ).optional(),
            })).describe(
              "This message is repeated because there are multiple arima models fitted in auto-arima. For non-auto-arima model, its size is one.",
            ).optional(),
            seasonalPeriods: z.array(
              z.enum([
                "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                "NO_SEASONALITY",
                "DAILY",
                "WEEKLY",
                "MONTHLY",
                "QUARTERLY",
                "YEARLY",
                "HOURLY",
              ]),
            ).describe(
              "Seasonal periods. Repeated because multiple periods are supported for one time series.",
            ).optional(),
          }).describe(
            "(Auto-)arima fitting result. Wrap everything in ArimaResult for easier refactoring if we want to use model-specific iteration results.",
          ).optional(),
          clusterInfos: z.array(z.object({
            centroidId: z.string().describe("Centroid id.").optional(),
            clusterRadius: z.number().describe(
              "Cluster radius, the average distance from centroid to each point assigned to the cluster.",
            ).optional(),
            clusterSize: z.string().describe(
              "Cluster size, the total number of points assigned to the cluster.",
            ).optional(),
          })).describe("Information about top clusters for clustering models.")
            .optional(),
          durationMs: z.string().describe(
            "Time taken to run the iteration in milliseconds.",
          ).optional(),
          evalLoss: z.number().describe(
            "Loss computed on the eval data at the end of iteration.",
          ).optional(),
          index: z.number().int().describe("Index of the iteration, 0 based.")
            .optional(),
          learnRate: z.number().describe("Learn rate used for this iteration.")
            .optional(),
          principalComponentInfos: z.array(z.object({
            cumulativeExplainedVarianceRatio: z.number().describe(
              "The explained_variance is pre-ordered in the descending order to compute the cumulative explained variance ratio.",
            ).optional(),
            explainedVariance: z.number().describe(
              "Explained variance by this principal component, which is simply the eigenvalue.",
            ).optional(),
            explainedVarianceRatio: z.number().describe(
              "Explained_variance over the total explained variance.",
            ).optional(),
            principalComponentId: z.string().describe(
              "Id of the principal component.",
            ).optional(),
          })).describe("The information of the principal components.")
            .optional(),
          trainingLoss: z.number().describe(
            "Loss computed on the training data at the end of iteration.",
          ).optional(),
        })).describe(
          "Results for all completed iterations. Empty for [hyperparameter tuning jobs](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview).",
        ).optional(),
        maxIterations: z.string().describe(
          "Output only. Maximum number of iterations specified as max_iterations in the 'CREATE MODEL' query. The actual number of iterations may be less than this number due to early stop.",
        ).optional(),
        modelType: z.enum([
          "MODEL_TYPE_UNSPECIFIED",
          "LINEAR_REGRESSION",
          "LOGISTIC_REGRESSION",
          "KMEANS",
          "MATRIX_FACTORIZATION",
          "DNN_CLASSIFIER",
          "TENSORFLOW",
          "DNN_REGRESSOR",
          "XGBOOST",
          "BOOSTED_TREE_REGRESSOR",
          "BOOSTED_TREE_CLASSIFIER",
          "ARIMA",
          "AUTOML_REGRESSOR",
          "AUTOML_CLASSIFIER",
          "PCA",
          "DNN_LINEAR_COMBINED_CLASSIFIER",
          "DNN_LINEAR_COMBINED_REGRESSOR",
          "AUTOENCODER",
          "ARIMA_PLUS",
          "ARIMA_PLUS_XREG",
          "RANDOM_FOREST_REGRESSOR",
          "RANDOM_FOREST_CLASSIFIER",
          "TENSORFLOW_LITE",
          "ONNX",
          "TRANSFORM_ONLY",
          "CONTRIBUTION_ANALYSIS",
        ]).describe("Output only. The type of the model that is being trained.")
          .optional(),
        trainingType: z.enum([
          "TRAINING_TYPE_UNSPECIFIED",
          "SINGLE_TRAINING",
          "HPARAM_TUNING",
        ]).describe("Output only. Training type of the job.").optional(),
      }).describe("Job statistics specific to a BigQuery ML training job.")
        .optional(),
      modelTraining: z.object({
        currentIteration: z.number().int().describe("Deprecated.").optional(),
        expectedTotalIterations: z.string().describe("Deprecated.").optional(),
      }).optional(),
      modelTrainingCurrentIteration: z.number().int().describe("Deprecated.")
        .optional(),
      modelTrainingExpectedTotalIteration: z.string().describe("Deprecated.")
        .optional(),
      numDmlAffectedRows: z.string().describe(
        "Output only. The number of rows affected by a DML statement. Present only for DML statements INSERT, UPDATE or DELETE.",
      ).optional(),
      performanceInsights: z.object({
        avgPreviousExecutionMs: z.string().describe(
          "Output only. Average execution ms of previous runs. Indicates the job ran slow compared to previous executions. To find previous executions, use INFORMATION_SCHEMA tables and filter jobs with same query hash.",
        ).optional(),
        stagePerformanceChangeInsights: z.array(z.object({
          inputDataChange: z.object({
            recordsReadDiffPercentage: z.number().describe(
              "Output only. Records read difference percentage compared to a previous run.",
            ).optional(),
          }).describe("Details about the input data change insight.")
            .optional(),
          stageId: z.string().describe(
            "Output only. The stage id that the insight mapped to.",
          ).optional(),
        })).describe(
          "Output only. Query stage performance insights compared to previous runs, for diagnosing performance regression.",
        ).optional(),
        stagePerformanceStandaloneInsights: z.array(z.object({
          biEngineReasons: z.array(z.object({
            code: z.enum([
              "CODE_UNSPECIFIED",
              "NO_RESERVATION",
              "INSUFFICIENT_RESERVATION",
              "UNSUPPORTED_SQL_TEXT",
              "INPUT_TOO_LARGE",
              "OTHER_REASON",
              "TABLE_EXCLUDED",
            ]).describe(
              "Output only. High-level BI Engine reason for partial or disabled acceleration",
            ).optional(),
            message: z.string().describe(
              "Output only. Free form human-readable reason for partial or disabled acceleration.",
            ).optional(),
          })).describe(
            "Output only. If present, the stage had the following reasons for being disqualified from BI Engine execution.",
          ).optional(),
          highCardinalityJoins: z.array(z.object({
            leftRows: z.string().describe(
              "Output only. Count of left input rows.",
            ).optional(),
            outputRows: z.string().describe(
              "Output only. Count of the output rows.",
            ).optional(),
            rightRows: z.string().describe(
              "Output only. Count of right input rows.",
            ).optional(),
            stepIndex: z.number().int().describe(
              "Output only. The index of the join operator in the ExplainQueryStep lists.",
            ).optional(),
          })).describe("Output only. High cardinality joins in the stage.")
            .optional(),
          insufficientShuffleQuota: z.boolean().describe(
            "Output only. True if the stage has insufficient shuffle quota.",
          ).optional(),
          partitionSkew: z.object({
            skewSources: z.array(z.object({
              stageId: z.string().describe(
                "Output only. Stage id of the skew source stage.",
              ).optional(),
            })).describe(
              "Output only. Source stages which produce skewed data.",
            ).optional(),
          }).describe("Partition skew detailed information.").optional(),
          slotContention: z.boolean().describe(
            "Output only. True if the stage has a slot contention issue.",
          ).optional(),
          stageId: z.string().describe(
            "Output only. The stage id that the insight mapped to.",
          ).optional(),
        })).describe(
          "Output only. Standalone query stage performance insights, for exploring potential improvements.",
        ).optional(),
      }).describe("Performance insights for the job.").optional(),
      queryInfo: z.object({
        optimizationDetails: z.record(z.string(), z.string()).describe(
          "Output only. Information about query optimizations.",
        ).optional(),
      }).describe("Query optimization information for a QUERY job.").optional(),
      queryPlan: z.array(z.object({
        completedParallelInputs: z.string().describe(
          "Number of parallel input segments completed.",
        ).optional(),
        computeMode: z.enum([
          "COMPUTE_MODE_UNSPECIFIED",
          "BIGQUERY",
          "BI_ENGINE",
        ]).describe("Output only. Compute mode for this stage.").optional(),
        computeMsAvg: z.string().describe(
          "Milliseconds the average shard spent on CPU-bound tasks.",
        ).optional(),
        computeMsMax: z.string().describe(
          "Milliseconds the slowest shard spent on CPU-bound tasks.",
        ).optional(),
        computeRatioAvg: z.number().describe(
          "Relative amount of time the average shard spent on CPU-bound tasks.",
        ).optional(),
        computeRatioMax: z.number().describe(
          "Relative amount of time the slowest shard spent on CPU-bound tasks.",
        ).optional(),
        endMs: z.string().describe(
          "Stage end time represented as milliseconds since the epoch.",
        ).optional(),
        id: z.string().describe("Unique ID for the stage within the plan.")
          .optional(),
        inputStages: z.array(z.string()).describe(
          "IDs for stages that are inputs to this stage.",
        ).optional(),
        name: z.string().describe("Human-readable name for the stage.")
          .optional(),
        parallelInputs: z.string().describe(
          "Number of parallel input segments to be processed",
        ).optional(),
        readMsAvg: z.string().describe(
          "Milliseconds the average shard spent reading input.",
        ).optional(),
        readMsMax: z.string().describe(
          "Milliseconds the slowest shard spent reading input.",
        ).optional(),
        readRatioAvg: z.number().describe(
          "Relative amount of time the average shard spent reading input.",
        ).optional(),
        readRatioMax: z.number().describe(
          "Relative amount of time the slowest shard spent reading input.",
        ).optional(),
        recordsRead: z.string().describe(
          "Number of records read into the stage.",
        ).optional(),
        recordsWritten: z.string().describe(
          "Number of records written by the stage.",
        ).optional(),
        shuffleOutputBytes: z.string().describe(
          "Total number of bytes written to shuffle.",
        ).optional(),
        shuffleOutputBytesSpilled: z.string().describe(
          "Total number of bytes written to shuffle and spilled to disk.",
        ).optional(),
        slotMs: z.string().describe("Slot-milliseconds used by the stage.")
          .optional(),
        startMs: z.string().describe(
          "Stage start time represented as milliseconds since the epoch.",
        ).optional(),
        status: z.string().describe("Current status for this stage.")
          .optional(),
        steps: z.array(z.object({
          kind: z.string().describe("Machine-readable operation type.")
            .optional(),
          substeps: z.array(z.string()).describe(
            "Human-readable description of the step(s).",
          ).optional(),
        })).describe(
          "List of operations within the stage in dependency order (approximately chronological).",
        ).optional(),
        waitMsAvg: z.string().describe(
          "Milliseconds the average shard spent waiting to be scheduled.",
        ).optional(),
        waitMsMax: z.string().describe(
          "Milliseconds the slowest shard spent waiting to be scheduled.",
        ).optional(),
        waitRatioAvg: z.number().describe(
          "Relative amount of time the average shard spent waiting to be scheduled.",
        ).optional(),
        waitRatioMax: z.number().describe(
          "Relative amount of time the slowest shard spent waiting to be scheduled.",
        ).optional(),
        writeMsAvg: z.string().describe(
          "Milliseconds the average shard spent on writing output.",
        ).optional(),
        writeMsMax: z.string().describe(
          "Milliseconds the slowest shard spent on writing output.",
        ).optional(),
        writeRatioAvg: z.number().describe(
          "Relative amount of time the average shard spent on writing output.",
        ).optional(),
        writeRatioMax: z.number().describe(
          "Relative amount of time the slowest shard spent on writing output.",
        ).optional(),
      })).describe("Output only. Describes execution plan for the query.")
        .optional(),
      referencedPropertyGraphs: z.array(z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this property graph.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this property graph.",
        ).optional(),
        propertyGraphId: z.string().describe(
          "Required. The ID of the property graph. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
        ).optional(),
      })).describe(
        "Output only. Referenced property graphs for the job. Queries that reference more than 50 property graphs will not have a complete list.",
      ).optional(),
      referencedRoutines: z.array(z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this routine.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this routine.",
        ).optional(),
        routineId: z.string().describe(
          "Required. The ID of the routine. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
        ).optional(),
      })).describe("Output only. Referenced routines for the job.").optional(),
      referencedTables: z.array(z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      })).describe("Output only. Referenced tables for the job.").optional(),
      reservationUsage: z.array(z.object({
        name: z.string().describe(
          'Reservation name or "unreserved" for on-demand resource usage and multi-statement queries.',
        ).optional(),
        slotMs: z.string().describe(
          "Total slot milliseconds used by the reservation for a particular job.",
        ).optional(),
      })).describe(
        "Output only. Job resource usage breakdown by reservation. This field reported misleading information and will no longer be populated.",
      ).optional(),
      schema: z.object({
        fields: z.array(z.object({
          categories: z.object({
            names: z.array(z.string()).describe("Deprecated.").optional(),
          }).describe("Deprecated.").optional(),
          collation: z.string().describe(
            "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
          ).optional(),
          dataPolicies: z.array(z.object({
            name: z.string().describe(
              "Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id.",
            ).optional(),
          })).describe(
            "Optional. Data policies attached to this field, used for field-level access control.",
          ).optional(),
          defaultValueExpression: z.string().describe(
            "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
          ).optional(),
          description: z.string().describe(
            "Optional. The field description. The maximum length is 1,024 characters.",
          ).optional(),
          fields: z.array(z.string()).describe(
            "Optional. Describes the nested schema fields if the type property is set to RECORD.",
          ).optional(),
          foreignTypeDefinition: z.string().describe(
            "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
          ).optional(),
          generatedColumn: z.object({
            generatedExpressionInfo: z.object({
              asynchronous: z.boolean().describe(
                "Optional. Whether the column generation is done asynchronously.",
              ).optional(),
              generationExpression: z.string().describe(
                "Optional. The generation expression (e.g. AI.EMBED(...)) used to generated the field.",
              ).optional(),
              stored: z.boolean().describe(
                "Optional. Whether the generated column is stored in the table.",
              ).optional(),
            }).describe(
              "Definition of the expression used to generate the field.",
            ).optional(),
            generatedMode: z.enum([
              "GENERATED_MODE_UNSPECIFIED",
              "GENERATED_ALWAYS",
              "GENERATED_BY_DEFAULT",
            ]).describe(
              "Optional. Dictates when system generated values are used to populate the field.",
            ).optional(),
          }).describe(
            "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
          ).optional(),
          maxLength: z.string().describe(
            'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
          ).optional(),
          mode: z.string().describe(
            "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
          ).optional(),
          name: z.string().describe(
            "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
          ).optional(),
          policyTags: z.object({
            names: z.array(z.string()).describe(
              'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
            ).optional(),
          }).describe(
            "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
          ).optional(),
          precision: z.string().describe(
            'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
          ).optional(),
          rangeElementType: z.object({
            type: z.string().describe(
              "Required. The type of a field element. For more information, see TableFieldSchema.type.",
            ).optional(),
          }).describe("Represents the type of a field element.").optional(),
          roundingMode: z.enum([
            "ROUNDING_MODE_UNSPECIFIED",
            "ROUND_HALF_AWAY_FROM_ZERO",
            "ROUND_HALF_EVEN",
          ]).describe(
            "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
          ).optional(),
          scale: z.string().describe(
            "Optional. See documentation for precision.",
          ).optional(),
          timestampPrecision: z.string().describe(
            "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
          ).optional(),
          type: z.string().describe(
            "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
          ).optional(),
        })).describe("Describes the fields in a table.").optional(),
        foreignTypeInfo: z.object({
          typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
            "Required. Specifies the system which defines the foreign data type.",
          ).optional(),
        }).describe(
          "Metadata about the foreign data type definition such as the system in which the type is defined.",
        ).optional(),
      }).describe("Schema of a table").optional(),
      searchStatistics: z.object({
        indexPruningStats: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          indexId: z.string().describe("The index id.").optional(),
          postIndexPruningParallelInputCount: z.string().describe(
            "The number of parallel inputs after index pruning.",
          ).optional(),
          preIndexPruningParallelInputCount: z.string().describe(
            "The number of parallel inputs before index pruning.",
          ).optional(),
        })).describe(
          "Search index pruning statistics, one for each base table that has a search index. If a base table does not have a search index or the index does not help with pruning on the base table, then there is no pruning statistics for that table.",
        ).optional(),
        indexUnusedReasons: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          code: z.enum([
            "CODE_UNSPECIFIED",
            "INDEX_CONFIG_NOT_AVAILABLE",
            "PENDING_INDEX_CREATION",
            "BASE_TABLE_TRUNCATED",
            "INDEX_CONFIG_MODIFIED",
            "TIME_TRAVEL_QUERY",
            "NO_PRUNING_POWER",
            "UNINDEXED_SEARCH_FIELDS",
            "UNSUPPORTED_SEARCH_PATTERN",
            "OPTIMIZED_WITH_MATERIALIZED_VIEW",
            "SECURED_BY_DATA_MASKING",
            "MISMATCHED_TEXT_ANALYZER",
            "BASE_TABLE_TOO_SMALL",
            "BASE_TABLE_TOO_LARGE",
            "ESTIMATED_PERFORMANCE_GAIN_TOO_LOW",
            "COLUMN_METADATA_INDEX_NOT_USED",
            "NOT_SUPPORTED_IN_STANDARD_EDITION",
            "INDEX_SUPPRESSED_BY_FUNCTION_OPTION",
            "QUERY_CACHE_HIT",
            "STALE_INDEX",
            "INTERNAL_ERROR",
            "OTHER_REASON",
          ]).describe(
            "Specifies the high-level reason for the scenario when no search index was used.",
          ).optional(),
          indexName: z.string().describe(
            "Specifies the name of the unused search index, if available.",
          ).optional(),
          message: z.string().describe(
            "Free form human-readable reason for the scenario when no search index was used.",
          ).optional(),
        })).describe(
          "When `indexUsageMode` is `UNUSED` or `PARTIALLY_USED`, this field explains why indexes were not used in all or part of the search query. If `indexUsageMode` is `FULLY_USED`, this field is not populated.",
        ).optional(),
        indexUsageMode: z.enum([
          "INDEX_USAGE_MODE_UNSPECIFIED",
          "UNUSED",
          "PARTIALLY_USED",
          "FULLY_USED",
        ]).describe("Specifies the index usage mode for the query.").optional(),
      }).describe(
        "Statistics for a search query. Populated as part of JobStatistics2.",
      ).optional(),
      sparkStatistics: z.object({
        endpoints: z.record(z.string(), z.string()).describe(
          "Output only. Endpoints returned from Dataproc. Key list: - history_server_endpoint: A link to Spark job UI.",
        ).optional(),
        gcsStagingBucket: z.string().describe(
          "Output only. The Google Cloud Storage bucket that is used as the default file system by the Spark application. This field is only filled when the Spark procedure uses the invoker security mode. The `gcsStagingBucket` bucket is inferred from the `@@spark_proc_properties.staging_bucket` system variable (if it is provided). Otherwise, BigQuery creates a default staging bucket for the job and returns the bucket name in this field. Example: * `gs://[bucket_name]`",
        ).optional(),
        kmsKeyName: z.string().describe(
          "Output only. The Cloud KMS encryption key that is used to protect the resources created by the Spark job. If the Spark procedure uses the invoker security mode, the Cloud KMS encryption key is either inferred from the provided system variable, `@@spark_proc_properties.kms_key_name`, or the default key of the BigQuery job's project (if the CMEK organization policy is enforced). Otherwise, the Cloud KMS key is either inferred from the Spark connection associated with the procedure (if it is provided), or from the default key of the Spark connection's project if the CMEK organization policy is enforced. Example: * `projects/[kms_project_id]/locations/[region]/keyRings/[key_region]/cryptoKeys/[key]`",
        ).optional(),
        loggingInfo: z.object({
          projectId: z.string().describe(
            "Output only. Project ID where the Spark logs were written.",
          ).optional(),
          resourceType: z.string().describe(
            "Output only. Resource type used for logging.",
          ).optional(),
        }).describe(
          "Spark job logs can be filtered by these fields in Cloud Logging.",
        ).optional(),
        sparkJobId: z.string().describe(
          "Output only. Spark job ID if a Spark job is created successfully.",
        ).optional(),
        sparkJobLocation: z.string().describe(
          "Output only. Location where the Spark job is executed. A location is selected by BigQueury for jobs configured to run in a multi-region.",
        ).optional(),
      }).describe(
        "Statistics for a BigSpark query. Populated as part of JobStatistics2",
      ).optional(),
      statementType: z.string().describe(
        "Output only. The type of query statement, if valid. Possible values: * `SELECT`: [`SELECT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#select_list) statement. * `ASSERT`: [`ASSERT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements#assert) statement. * `INSERT`: [`INSERT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#insert_statement) statement. * `UPDATE`: [`UPDATE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#update_statement) statement. * `DELETE`: [`DELETE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. * `MERGE`: [`MERGE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. * `CREATE_TABLE`: [`CREATE TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement, without `AS SELECT`. * `CREATE_TABLE_AS_SELECT`: [`CREATE TABLE AS SELECT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement. * `CREATE_VIEW`: [`CREATE VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_view_statement) statement. * `CREATE_MODEL`: [`CREATE MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-create#create_model_statement) statement. * `CREATE_MATERIALIZED_VIEW`: [`CREATE MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_materialized_view_statement) statement. * `CREATE_FUNCTION`: [`CREATE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_function_statement) statement. * `CREATE_TABLE_FUNCTION`: [`CREATE TABLE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_function_statement) statement. * `CREATE_PROCEDURE`: [`CREATE PROCEDURE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_procedure) statement. * `CREATE_ROW_ACCESS_POLICY`: [`CREATE ROW ACCESS POLICY`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_row_access_policy_statement) statement. * `CREATE_SCHEMA`: [`CREATE SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_schema_statement) statement. * `CREATE_SNAPSHOT_TABLE`: [`CREATE SNAPSHOT TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_snapshot_table_statement) statement. * `CREATE_SEARCH_INDEX`: [`CREATE SEARCH INDEX`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_search_index_statement) statement. * `DROP_TABLE`: [`DROP TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_statement) statement. * `DROP_EXTERNAL_TABLE`: [`DROP EXTERNAL TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_external_table_statement) statement. * `DROP_VIEW`: [`DROP VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_view_statement) statement. * `DROP_MODEL`: [`DROP MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-drop-model) statement. * `DROP_MATERIALIZED_VIEW`: [`DROP MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_materialized_view_statement) statement. * `DROP_FUNCTION`: [`DROP FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_function_statement) statement. * `DROP_TABLE_FUNCTION`: [`DROP TABLE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_function) statement. * `DROP_PROCEDURE`: [`DROP PROCEDURE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_procedure_statement) statement. * `DROP_SEARCH_INDEX`: [`DROP SEARCH INDEX`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_search_index) statement. * `DROP_SCHEMA`: [`DROP SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_schema_statement) statement. * `DROP_SNAPSHOT_TABLE`: [`DROP SNAPSHOT TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_snapshot_table_statement) statement. * `DROP_ROW_ACCESS_POLICY`: [`DROP [ALL] ROW ACCESS POLICY|POLICIES`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_row_access_policy_statement) statement. * `ALTER_TABLE`: [`ALTER TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_table_set_options_statement) statement. * `ALTER_VIEW`: [`ALTER VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_view_set_options_statement) statement. * `ALTER_MATERIALIZED_VIEW`: [`ALTER MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_materialized_view_set_options_statement) statement. * `ALTER_SCHEMA`: [`ALTER SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_schema_set_options_statement) statement. * `SCRIPT`: [`SCRIPT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language). * `TRUNCATE_TABLE`: [`TRUNCATE TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#truncate_table_statement) statement. * `CREATE_EXTERNAL_TABLE`: [`CREATE EXTERNAL TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_external_table_statement) statement. * `EXPORT_DATA`: [`EXPORT DATA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements#export_data_statement) statement. * `EXPORT_MODEL`: [`EXPORT MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-export-model) statement. * `LOAD_DATA`: [`LOAD DATA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements#load_data_statement) statement. * `CALL`: [`CALL`](https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#call) statement.",
      ).optional(),
      timeline: z.array(z.object({
        activeUnits: z.string().describe(
          "Total number of active workers. This does not correspond directly to slot usage. This is the largest value observed since the last sample.",
        ).optional(),
        completedUnits: z.string().describe(
          "Total parallel units of work completed by this query.",
        ).optional(),
        elapsedMs: z.string().describe(
          "Milliseconds elapsed since the start of query execution.",
        ).optional(),
        estimatedRunnableUnits: z.string().describe(
          "Units of work that can be scheduled immediately. Providing additional slots for these units of work will accelerate the query, if no other query in the reservation needs additional slots.",
        ).optional(),
        pendingUnits: z.string().describe(
          "Total units of work remaining for the query. This number can be revised (increased or decreased) while the query is running.",
        ).optional(),
        shuffleRamUsageRatio: z.number().describe(
          "Total shuffle usage ratio in shuffle RAM per reservation of this query. This will be provided for reservation customers only.",
        ).optional(),
        totalSlotMs: z.string().describe(
          "Cumulative slot-ms consumed by the query.",
        ).optional(),
      })).describe("Output only. Describes a timeline of job execution.")
        .optional(),
      totalBytesBilled: z.string().describe(
        "Output only. If the project is configured to use on-demand pricing, then this field contains the total bytes billed for the job. If the project is configured to use flat-rate pricing, then you are not billed for bytes and this field is informational only.",
      ).optional(),
      totalBytesProcessed: z.string().describe(
        "Output only. Total bytes processed for the job.",
      ).optional(),
      totalBytesProcessedAccuracy: z.string().describe(
        "Output only. For dry-run jobs, totalBytesProcessed is an estimate and this field specifies the accuracy of the estimate. Possible values can be: UNKNOWN: accuracy of the estimate is unknown. PRECISE: estimate is precise. LOWER_BOUND: estimate is lower bound of what the query would cost. UPPER_BOUND: estimate is upper bound of what the query would cost.",
      ).optional(),
      totalPartitionsProcessed: z.string().describe(
        "Output only. Total number of partitions processed from all partitioned tables referenced in the job.",
      ).optional(),
      totalServicesSkuSlotMs: z.string().describe(
        'Output only. Total slot milliseconds for the job that ran on external services and billed on the services SKU. This field is only populated for jobs that have external service costs, and is the total of the usage for costs whose billing method is `"SERVICES_SKU"`.',
      ).optional(),
      totalSlotMs: z.string().describe(
        "Output only. Slot-milliseconds for the job.",
      ).optional(),
      transferredBytes: z.string().describe(
        "Output only. Total bytes transferred for cross-cloud queries such as Cross Cloud Transfer and CREATE TABLE AS SELECT (CTAS).",
      ).optional(),
      undeclaredQueryParameters: z.array(z.object({
        name: z.string().describe(
          "Optional. If unset, this is a positional parameter. Otherwise, should be unique within a query.",
        ).optional(),
        parameterType: z.object({
          arrayType: z.string().describe(
            "Circular reference to QueryParameterType",
          ).optional(),
          rangeElementType: z.string().describe(
            "Circular reference to QueryParameterType",
          ).optional(),
          structTypes: z.array(z.object({
            description: z.string().describe(
              "Optional. Human-oriented description of the field.",
            ).optional(),
            name: z.string().describe("Optional. The name of this field.")
              .optional(),
            type: z.string().describe(
              "Circular reference to QueryParameterType",
            ).optional(),
          })).describe(
            "Optional. The types of the fields of this struct, in order, if this is a struct.",
          ).optional(),
          timestampPrecision: z.string().describe(
            "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
          ).optional(),
          type: z.string().describe(
            "Required. The top level type of this field.",
          ).optional(),
        }).describe("The type of a query parameter.").optional(),
        parameterValue: z.object({
          arrayValues: z.array(z.string()).describe(
            "Optional. The array values, if this is an array type.",
          ).optional(),
          rangeValue: z.object({
            end: z.string().describe(
              "Circular reference to QueryParameterValue",
            ).optional(),
            start: z.string().describe(
              "Circular reference to QueryParameterValue",
            ).optional(),
          }).describe("Represents the value of a range.").optional(),
          structValues: z.record(z.string(), z.string()).describe(
            "The struct field values.",
          ).optional(),
          value: z.string().describe(
            "Optional. The value of this value, if a simple scalar type.",
          ).optional(),
        }).describe("The value of a query parameter.").optional(),
      })).describe(
        "Output only. GoogleSQL only: list of undeclared query parameters detected during a dry run validation.",
      ).optional(),
      vectorSearchStatistics: z.object({
        indexUnusedReasons: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          code: z.enum([
            "CODE_UNSPECIFIED",
            "INDEX_CONFIG_NOT_AVAILABLE",
            "PENDING_INDEX_CREATION",
            "BASE_TABLE_TRUNCATED",
            "INDEX_CONFIG_MODIFIED",
            "TIME_TRAVEL_QUERY",
            "NO_PRUNING_POWER",
            "UNINDEXED_SEARCH_FIELDS",
            "UNSUPPORTED_SEARCH_PATTERN",
            "OPTIMIZED_WITH_MATERIALIZED_VIEW",
            "SECURED_BY_DATA_MASKING",
            "MISMATCHED_TEXT_ANALYZER",
            "BASE_TABLE_TOO_SMALL",
            "BASE_TABLE_TOO_LARGE",
            "ESTIMATED_PERFORMANCE_GAIN_TOO_LOW",
            "COLUMN_METADATA_INDEX_NOT_USED",
            "NOT_SUPPORTED_IN_STANDARD_EDITION",
            "INDEX_SUPPRESSED_BY_FUNCTION_OPTION",
            "QUERY_CACHE_HIT",
            "STALE_INDEX",
            "INTERNAL_ERROR",
            "OTHER_REASON",
          ]).describe(
            "Specifies the high-level reason for the scenario when no search index was used.",
          ).optional(),
          indexName: z.string().describe(
            "Specifies the name of the unused search index, if available.",
          ).optional(),
          message: z.string().describe(
            "Free form human-readable reason for the scenario when no search index was used.",
          ).optional(),
        })).describe(
          "When `indexUsageMode` is `UNUSED` or `PARTIALLY_USED`, this field explains why indexes were not used in all or part of the vector search query. If `indexUsageMode` is `FULLY_USED`, this field is not populated.",
        ).optional(),
        indexUsageMode: z.enum([
          "INDEX_USAGE_MODE_UNSPECIFIED",
          "UNUSED",
          "PARTIALLY_USED",
          "FULLY_USED",
        ]).describe("Specifies the index usage mode for the query.").optional(),
        storedColumnsUsages: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          isQueryAccelerated: z.boolean().describe(
            "Specifies whether the query was accelerated with stored columns.",
          ).optional(),
          storedColumnsUnusedReasons: z.array(z.object({
            code: z.enum([
              "CODE_UNSPECIFIED",
              "STORED_COLUMNS_COVER_INSUFFICIENT",
              "BASE_TABLE_HAS_RLS",
              "BASE_TABLE_HAS_CLS",
              "UNSUPPORTED_PREFILTER",
              "INTERNAL_ERROR",
              "OTHER_REASON",
            ]).describe(
              "Specifies the high-level reason for the unused scenario, each reason must have a code associated.",
            ).optional(),
            message: z.string().describe(
              "Specifies the detailed description for the scenario.",
            ).optional(),
            uncoveredColumns: z.array(z.string()).describe(
              "Specifies which columns were not covered by the stored columns for the specified code up to 20 columns. This is populated when the code is STORED_COLUMNS_COVER_INSUFFICIENT and BASE_TABLE_HAS_CLS.",
            ).optional(),
          })).describe("If stored columns were not used, explain why.")
            .optional(),
        })).describe(
          "Specifies the usage of stored columns in the query when stored columns are used in the query.",
        ).optional(),
      }).describe(
        "Statistics for a vector search query. Populated as part of JobStatistics2.",
      ).optional(),
    }).describe("Statistics for a query job.").optional(),
    quotaDeferments: z.array(z.string()).describe(
      "Output only. Quotas which delayed this job's start time.",
    ).optional(),
    reservationGroupPath: z.array(z.string()).describe(
      "Output only. The reservation group path of the reservation assigned to this job. This field has a limit of 10 nested reservation groups. This is to maintain consistency between reservatins info schema and jobs info schema. The first reservation group is the root reservation group and the last is the leaf or lowest level reservation group.",
    ).optional(),
    reservationUsage: z.array(z.object({
      name: z.string().describe(
        'Reservation name or "unreserved" for on-demand resource usage and multi-statement queries.',
      ).optional(),
      slotMs: z.string().describe(
        "Total slot milliseconds used by the reservation for a particular job.",
      ).optional(),
    })).describe(
      "Output only. Job resource usage breakdown by reservation. This field reported misleading information and will no longer be populated.",
    ).optional(),
    reservation_id: z.string().describe(
      "Output only. Name of the primary reservation assigned to this job. Note that this could be different than reservations reported in the reservation usage field if parent reservations were used to execute this job.",
    ).optional(),
    rowLevelSecurityStatistics: z.object({
      rowLevelSecurityApplied: z.boolean().describe(
        "Whether any accessed data was protected by row access policies.",
      ).optional(),
    }).describe("Statistics for row-level security.").optional(),
    scriptStatistics: z.object({
      evaluationKind: z.enum([
        "EVALUATION_KIND_UNSPECIFIED",
        "STATEMENT",
        "EXPRESSION",
      ]).describe("Whether this child job was a statement or expression.")
        .optional(),
      stackFrames: z.array(z.object({
        endColumn: z.number().int().describe(
          "Output only. One-based end column.",
        ).optional(),
        endLine: z.number().int().describe("Output only. One-based end line.")
          .optional(),
        procedureId: z.string().describe(
          "Output only. Name of the active procedure, empty if in a top-level script.",
        ).optional(),
        startColumn: z.number().int().describe(
          "Output only. One-based start column.",
        ).optional(),
        startLine: z.number().int().describe(
          "Output only. One-based start line.",
        ).optional(),
        text: z.string().describe(
          "Output only. Text of the current statement/expression.",
        ).optional(),
      })).describe(
        "Stack trace showing the line/column/procedure name of each frame on the stack at the point where the current evaluation happened. The leaf frame is first, the primary script is last. Never empty.",
      ).optional(),
    }).describe("Job statistics specific to the child job of a script.")
      .optional(),
    sessionInfo: z.object({
      sessionId: z.string().describe("Output only. The id of the session.")
        .optional(),
    }).describe("[Preview] Information related to sessions.").optional(),
    startTime: z.string().describe(
      "Output only. Start time of this job, in milliseconds since the epoch. This field will be present when the job transitions from the PENDING state to either RUNNING or DONE.",
    ).optional(),
    totalBytesProcessed: z.string().describe(
      "Output only. Total bytes processed for the job.",
    ).optional(),
    totalSlotMs: z.string().describe(
      "Output only. Slot-milliseconds for the job.",
    ).optional(),
    transactionInfo: z.object({
      transactionId: z.string().describe(
        "Output only. [Alpha] Id of the transaction.",
      ).optional(),
    }).describe("[Alpha] Information of a multi-statement transaction.")
      .optional(),
  }).describe("Statistics for a single job execution.").optional(),
  status: z.object({
    errorResult: z.object({
      debugInfo: z.string().describe(
        "Debugging information. This property is internal to Google and should not be used.",
      ).optional(),
      location: z.string().describe(
        "Specifies where the error occurred, if present.",
      ).optional(),
      message: z.string().describe("A human-readable description of the error.")
        .optional(),
      reason: z.string().describe(
        "A short error code that summarizes the error.",
      ).optional(),
    }).describe("Error details.").optional(),
    errors: z.array(z.object({
      debugInfo: z.string().describe(
        "Debugging information. This property is internal to Google and should not be used.",
      ).optional(),
      location: z.string().describe(
        "Specifies where the error occurred, if present.",
      ).optional(),
      message: z.string().describe("A human-readable description of the error.")
        .optional(),
      reason: z.string().describe(
        "A short error code that summarizes the error.",
      ).optional(),
    })).describe(
      "Output only. The first errors encountered during the running of the job. The final message includes the number of errors that caused the process to stop. Errors here do not necessarily mean that the job has not completed or was unsuccessful.",
    ).optional(),
    state: z.string().describe(
      "Output only. Running state of the job. Valid states include 'PENDING', 'RUNNING', and 'DONE'.",
    ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  configuration: z.object({
    copy: z.object({
      createDisposition: z.string(),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string(),
      }),
      destinationExpirationTime: z.string(),
      destinationTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      operationType: z.string(),
      sourceTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      sourceTables: z.array(z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      })),
      writeDisposition: z.string(),
    }),
    dryRun: z.boolean(),
    extract: z.object({
      compression: z.string(),
      destinationFormat: z.string(),
      destinationUri: z.string(),
      destinationUris: z.array(z.string()),
      fieldDelimiter: z.string(),
      modelExtractOptions: z.object({
        trialId: z.string(),
      }),
      printHeader: z.boolean(),
      sourceModel: z.object({
        datasetId: z.string(),
        modelId: z.string(),
        projectId: z.string(),
      }),
      sourceTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      useAvroLogicalTypes: z.boolean(),
    }),
    jobTimeoutMs: z.string(),
    jobType: z.string(),
    labels: z.record(z.string(), z.unknown()),
    load: z.object({
      allowJaggedRows: z.boolean(),
      allowQuotedNewlines: z.boolean(),
      autodetect: z.boolean(),
      clustering: z.object({
        fields: z.array(z.string()),
      }),
      columnNameCharacterMap: z.string(),
      connectionProperties: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      copyFilesOnly: z.boolean(),
      createDisposition: z.string(),
      createSession: z.boolean(),
      dateFormat: z.string(),
      datetimeFormat: z.string(),
      decimalTargetTypes: z.array(z.string()),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string(),
      }),
      destinationTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      destinationTableProperties: z.object({
        description: z.string(),
        expirationTime: z.string(),
        friendlyName: z.string(),
        labels: z.record(z.string(), z.unknown()),
      }),
      encoding: z.string(),
      fieldDelimiter: z.string(),
      fileSetSpecType: z.string(),
      hivePartitioningOptions: z.object({
        fields: z.array(z.string()),
        mode: z.string(),
        requirePartitionFilter: z.boolean(),
        sourceUriPrefix: z.string(),
      }),
      ignoreUnknownValues: z.boolean(),
      jsonExtension: z.string(),
      maxBadRecords: z.number(),
      nullMarker: z.string(),
      nullMarkers: z.array(z.string()),
      parquetOptions: z.object({
        enableListInference: z.boolean(),
        enumAsString: z.boolean(),
        mapTargetType: z.string(),
      }),
      preserveAsciiControlCharacters: z.boolean(),
      projectionFields: z.array(z.string()),
      quote: z.string(),
      rangePartitioning: z.object({
        field: z.string(),
        range: z.object({
          end: z.string(),
          interval: z.string(),
          start: z.string(),
        }),
      }),
      referenceFileSchemaUri: z.string(),
      schema: z.object({
        fields: z.array(z.object({
          categories: z.object({
            names: z.array(z.string()),
          }),
          collation: z.string(),
          dataPolicies: z.array(z.object({
            name: z.string(),
          })),
          defaultValueExpression: z.string(),
          description: z.string(),
          fields: z.array(z.string()),
          foreignTypeDefinition: z.string(),
          generatedColumn: z.object({
            generatedExpressionInfo: z.object({
              asynchronous: z.boolean(),
              generationExpression: z.string(),
              stored: z.boolean(),
            }),
            generatedMode: z.string(),
          }),
          maxLength: z.string(),
          mode: z.string(),
          name: z.string(),
          policyTags: z.object({
            names: z.array(z.string()),
          }),
          precision: z.string(),
          rangeElementType: z.object({
            type: z.string(),
          }),
          roundingMode: z.string(),
          scale: z.string(),
          timestampPrecision: z.string(),
          type: z.string(),
        })),
        foreignTypeInfo: z.object({
          typeSystem: z.string(),
        }),
      }),
      schemaInline: z.string(),
      schemaInlineFormat: z.string(),
      schemaUpdateOptions: z.array(z.string()),
      skipLeadingRows: z.number(),
      sourceColumnMatch: z.string(),
      sourceFormat: z.string(),
      sourceUris: z.array(z.string()),
      timeFormat: z.string(),
      timePartitioning: z.object({
        expirationMs: z.string(),
        field: z.string(),
        requirePartitionFilter: z.boolean(),
        type: z.string(),
      }),
      timeZone: z.string(),
      timestampFormat: z.string(),
      timestampTargetPrecision: z.array(z.number()),
      useAvroLogicalTypes: z.boolean(),
      writeDisposition: z.string(),
    }),
    maxSlots: z.number(),
    query: z.object({
      allowLargeResults: z.boolean(),
      clustering: z.object({
        fields: z.array(z.string()),
      }),
      connectionProperties: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      continuous: z.boolean(),
      createDisposition: z.string(),
      createSession: z.boolean(),
      defaultDataset: z.object({
        datasetId: z.string(),
        projectId: z.string(),
      }),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string(),
      }),
      destinationTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      flattenResults: z.boolean(),
      maximumBillingTier: z.number(),
      maximumBytesBilled: z.string(),
      parameterMode: z.string(),
      preserveNulls: z.boolean(),
      priority: z.string(),
      query: z.string(),
      queryParameters: z.array(z.object({
        name: z.string(),
        parameterType: z.object({
          arrayType: z.string(),
          rangeElementType: z.string(),
          structTypes: z.array(z.object({
            description: z.string(),
            name: z.string(),
            type: z.string(),
          })),
          timestampPrecision: z.string(),
          type: z.string(),
        }),
        parameterValue: z.object({
          arrayValues: z.array(z.string()),
          rangeValue: z.object({
            end: z.string(),
            start: z.string(),
          }),
          structValues: z.record(z.string(), z.unknown()),
          value: z.string(),
        }),
      })),
      rangePartitioning: z.object({
        field: z.string(),
        range: z.object({
          end: z.string(),
          interval: z.string(),
          start: z.string(),
        }),
      }),
      schemaUpdateOptions: z.array(z.string()),
      scriptOptions: z.object({
        keyResultStatement: z.string(),
        statementByteBudget: z.string(),
        statementTimeoutMs: z.string(),
      }),
      systemVariables: z.object({
        types: z.record(z.string(), z.unknown()),
        values: z.record(z.string(), z.unknown()),
      }),
      tableDefinitions: z.record(z.string(), z.unknown()),
      timePartitioning: z.object({
        expirationMs: z.string(),
        field: z.string(),
        requirePartitionFilter: z.boolean(),
        type: z.string(),
      }),
      useLegacySql: z.boolean(),
      useQueryCache: z.boolean(),
      userDefinedFunctionResources: z.array(z.object({
        inlineCode: z.string(),
        resourceUri: z.string(),
      })),
      writeDisposition: z.string(),
      writeIncrementalResults: z.boolean(),
    }),
    reservation: z.string(),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  jobCreationReason: z.object({
    code: z.string(),
  }).optional(),
  jobReference: z.object({
    jobId: z.string(),
    location: z.string(),
    projectId: z.string(),
  }).optional(),
  kind: z.string().optional(),
  principal_subject: z.string().optional(),
  selfLink: z.string().optional(),
  statistics: z.object({
    completionRatio: z.number(),
    copy: z.object({
      copiedLogicalBytes: z.string(),
      copiedRows: z.string(),
    }),
    creationTime: z.string(),
    dataMaskingStatistics: z.object({
      dataMaskingApplied: z.boolean(),
    }),
    edition: z.string(),
    endTime: z.string(),
    extract: z.object({
      destinationUriFileCounts: z.array(z.string()),
      inputBytes: z.string(),
      timeline: z.array(z.object({
        activeUnits: z.string(),
        completedUnits: z.string(),
        elapsedMs: z.string(),
        estimatedRunnableUnits: z.string(),
        pendingUnits: z.string(),
        shuffleRamUsageRatio: z.number(),
        totalSlotMs: z.string(),
      })),
    }),
    finalExecutionDurationMs: z.string(),
    load: z.object({
      badRecords: z.string(),
      inputFileBytes: z.string(),
      inputFiles: z.string(),
      outputBytes: z.string(),
      outputRows: z.string(),
      timeline: z.array(z.object({
        activeUnits: z.string(),
        completedUnits: z.string(),
        elapsedMs: z.string(),
        estimatedRunnableUnits: z.string(),
        pendingUnits: z.string(),
        shuffleRamUsageRatio: z.number(),
        totalSlotMs: z.string(),
      })),
    }),
    numChildJobs: z.string(),
    parentJobId: z.string(),
    query: z.object({
      biEngineStatistics: z.object({
        accelerationMode: z.string(),
        biEngineMode: z.string(),
        biEngineReasons: z.array(z.object({
          code: z.string(),
          message: z.string(),
        })),
      }),
      billingTier: z.number(),
      cacheHit: z.boolean(),
      dclTargetDataset: z.object({
        datasetId: z.string(),
        projectId: z.string(),
      }),
      dclTargetTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      dclTargetView: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      ddlAffectedRowAccessPolicyCount: z.string(),
      ddlDestinationTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      ddlOperationPerformed: z.string(),
      ddlTargetDataset: z.object({
        datasetId: z.string(),
        projectId: z.string(),
      }),
      ddlTargetRoutine: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        routineId: z.string(),
      }),
      ddlTargetRowAccessPolicy: z.object({
        datasetId: z.string(),
        policyId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      ddlTargetTable: z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      }),
      dmlStats: z.object({
        deletedRowCount: z.string(),
        dmlMode: z.string(),
        fineGrainedDmlUnusedReason: z.string(),
        insertedRowCount: z.string(),
        updatedRowCount: z.string(),
      }),
      estimatedBytesProcessed: z.string(),
      exportDataStatistics: z.object({
        fileCount: z.string(),
        rowCount: z.string(),
      }),
      externalServiceCosts: z.array(z.object({
        billingMethod: z.string(),
        bytesBilled: z.string(),
        bytesProcessed: z.string(),
        externalService: z.string(),
        reservedSlotCount: z.string(),
        slotMs: z.string(),
      })),
      genAiStats: z.object({
        errorStats: z.object({
          errors: z.array(z.string()),
        }),
        functionStats: z.array(z.object({
          costOptimizationStats: z.object({
            message: z.string(),
            numCostOptimizedRows: z.string(),
          }),
          errorStats: z.object({
            errors: z.array(z.string()),
            numFailedRows: z.string(),
          }),
          functionName: z.string(),
          numProcessedRows: z.string(),
          prompt: z.string(),
        })),
      }),
      incrementalResultStats: z.object({
        disabledReason: z.string(),
        disabledReasonDetails: z.string(),
        firstIncrementalRowTime: z.string(),
        incrementalRowCount: z.string(),
        lastIncrementalRowTime: z.string(),
        resultSetLastModifyTime: z.string(),
        resultSetLastReplaceTime: z.string(),
      }),
      loadQueryStatistics: z.object({
        badRecords: z.string(),
        bytesTransferred: z.string(),
        inputFileBytes: z.string(),
        inputFiles: z.string(),
        outputBytes: z.string(),
        outputRows: z.string(),
      }),
      materializedViewStatistics: z.object({
        materializedView: z.array(z.object({
          chosen: z.boolean(),
          estimatedBytesSaved: z.string(),
          rejectedReason: z.string(),
          tableReference: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
        })),
      }),
      metadataCacheStatistics: z.object({
        tableMetadataCacheUsage: z.array(z.object({
          explanation: z.string(),
          pruningStats: z.object({
            postCmetaPruningParallelInputCount: z.string(),
            postCmetaPruningPartitionCount: z.string(),
            preCmetaPruningParallelInputCount: z.string(),
          }),
          staleness: z.string(),
          tableReference: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
          tableType: z.string(),
          unusedReason: z.string(),
        })),
      }),
      mlStatistics: z.object({
        hparamTrials: z.array(z.object({
          endTimeMs: z.string(),
          errorMessage: z.string(),
          evalLoss: z.number(),
          evaluationMetrics: z.object({
            arimaForecastingMetrics: z.object({
              arimaFittingMetrics: z.array(z.object({
                aic: z.number(),
                logLikelihood: z.number(),
                variance: z.number(),
              })),
              arimaSingleModelForecastingMetrics: z.array(z.object({
                arimaFittingMetrics: z.object({
                  aic: z.number(),
                  logLikelihood: z.number(),
                  variance: z.number(),
                }),
                hasDrift: z.boolean(),
                hasHolidayEffect: z.boolean(),
                hasSpikesAndDips: z.boolean(),
                hasStepChanges: z.boolean(),
                nonSeasonalOrder: z.object({
                  d: z.string(),
                  p: z.string(),
                  q: z.string(),
                }),
                seasonalPeriods: z.array(z.string()),
                timeSeriesId: z.string(),
                timeSeriesIds: z.array(z.string()),
              })),
              hasDrift: z.array(z.boolean()),
              nonSeasonalOrder: z.array(z.object({
                d: z.string(),
                p: z.string(),
                q: z.string(),
              })),
              seasonalPeriods: z.array(z.string()),
              timeSeriesId: z.array(z.string()),
            }),
            binaryClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number(),
                f1Score: z.number(),
                logLoss: z.number(),
                precision: z.number(),
                recall: z.number(),
                rocAuc: z.number(),
                threshold: z.number(),
              }),
              binaryConfusionMatrixList: z.array(z.object({
                accuracy: z.number(),
                f1Score: z.number(),
                falseNegatives: z.string(),
                falsePositives: z.string(),
                positiveClassThreshold: z.number(),
                precision: z.number(),
                recall: z.number(),
                trueNegatives: z.string(),
                truePositives: z.string(),
              })),
              negativeLabel: z.string(),
              positiveLabel: z.string(),
            }),
            clusteringMetrics: z.object({
              clusters: z.array(z.object({
                centroidId: z.string(),
                count: z.string(),
                featureValues: z.array(z.object({
                  categoricalValue: z.object({
                    categoryCounts: z.array(z.object({
                      category: z.string(),
                      count: z.string(),
                    })),
                  }),
                  featureColumn: z.string(),
                  numericalValue: z.number(),
                })),
              })),
              daviesBouldinIndex: z.number(),
              meanSquaredDistance: z.number(),
            }),
            dimensionalityReductionMetrics: z.object({
              totalExplainedVarianceRatio: z.number(),
            }),
            multiClassClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number(),
                f1Score: z.number(),
                logLoss: z.number(),
                precision: z.number(),
                recall: z.number(),
                rocAuc: z.number(),
                threshold: z.number(),
              }),
              confusionMatrixList: z.array(z.object({
                confidenceThreshold: z.number(),
                rows: z.array(z.object({
                  actualLabel: z.string(),
                  entries: z.array(z.object({
                    itemCount: z.string(),
                    predictedLabel: z.string(),
                  })),
                })),
              })),
            }),
            rankingMetrics: z.object({
              averageRank: z.number(),
              meanAveragePrecision: z.number(),
              meanSquaredError: z.number(),
              normalizedDiscountedCumulativeGain: z.number(),
            }),
            regressionMetrics: z.object({
              meanAbsoluteError: z.number(),
              meanSquaredError: z.number(),
              meanSquaredLogError: z.number(),
              medianAbsoluteError: z.number(),
              rSquared: z.number(),
            }),
          }),
          hparamTuningEvaluationMetrics: z.object({
            arimaForecastingMetrics: z.object({
              arimaFittingMetrics: z.array(z.object({
                aic: z.number(),
                logLikelihood: z.number(),
                variance: z.number(),
              })),
              arimaSingleModelForecastingMetrics: z.array(z.object({
                arimaFittingMetrics: z.object({
                  aic: z.number(),
                  logLikelihood: z.number(),
                  variance: z.number(),
                }),
                hasDrift: z.boolean(),
                hasHolidayEffect: z.boolean(),
                hasSpikesAndDips: z.boolean(),
                hasStepChanges: z.boolean(),
                nonSeasonalOrder: z.object({
                  d: z.string(),
                  p: z.string(),
                  q: z.string(),
                }),
                seasonalPeriods: z.array(z.string()),
                timeSeriesId: z.string(),
                timeSeriesIds: z.array(z.string()),
              })),
              hasDrift: z.array(z.boolean()),
              nonSeasonalOrder: z.array(z.object({
                d: z.string(),
                p: z.string(),
                q: z.string(),
              })),
              seasonalPeriods: z.array(z.string()),
              timeSeriesId: z.array(z.string()),
            }),
            binaryClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number(),
                f1Score: z.number(),
                logLoss: z.number(),
                precision: z.number(),
                recall: z.number(),
                rocAuc: z.number(),
                threshold: z.number(),
              }),
              binaryConfusionMatrixList: z.array(z.object({
                accuracy: z.number(),
                f1Score: z.number(),
                falseNegatives: z.string(),
                falsePositives: z.string(),
                positiveClassThreshold: z.number(),
                precision: z.number(),
                recall: z.number(),
                trueNegatives: z.string(),
                truePositives: z.string(),
              })),
              negativeLabel: z.string(),
              positiveLabel: z.string(),
            }),
            clusteringMetrics: z.object({
              clusters: z.array(z.object({
                centroidId: z.string(),
                count: z.string(),
                featureValues: z.array(z.object({
                  categoricalValue: z.object({
                    categoryCounts: z.array(z.object({
                      category: z.string(),
                      count: z.string(),
                    })),
                  }),
                  featureColumn: z.string(),
                  numericalValue: z.number(),
                })),
              })),
              daviesBouldinIndex: z.number(),
              meanSquaredDistance: z.number(),
            }),
            dimensionalityReductionMetrics: z.object({
              totalExplainedVarianceRatio: z.number(),
            }),
            multiClassClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number(),
                f1Score: z.number(),
                logLoss: z.number(),
                precision: z.number(),
                recall: z.number(),
                rocAuc: z.number(),
                threshold: z.number(),
              }),
              confusionMatrixList: z.array(z.object({
                confidenceThreshold: z.number(),
                rows: z.array(z.object({
                  actualLabel: z.string(),
                  entries: z.array(z.object({
                    itemCount: z.string(),
                    predictedLabel: z.string(),
                  })),
                })),
              })),
            }),
            rankingMetrics: z.object({
              averageRank: z.number(),
              meanAveragePrecision: z.number(),
              meanSquaredError: z.number(),
              normalizedDiscountedCumulativeGain: z.number(),
            }),
            regressionMetrics: z.object({
              meanAbsoluteError: z.number(),
              meanSquaredError: z.number(),
              meanSquaredLogError: z.number(),
              medianAbsoluteError: z.number(),
              rSquared: z.number(),
            }),
          }),
          hparams: z.object({
            activationFn: z.string(),
            adjustStepChanges: z.boolean(),
            approxGlobalFeatureContrib: z.boolean(),
            autoArima: z.boolean(),
            autoArimaMaxOrder: z.string(),
            autoArimaMinOrder: z.string(),
            autoClassWeights: z.boolean(),
            batchSize: z.string(),
            boosterType: z.string(),
            budgetHours: z.number(),
            calculatePValues: z.boolean(),
            categoryEncodingMethod: z.string(),
            cleanSpikesAndDips: z.boolean(),
            colorSpace: z.string(),
            colsampleBylevel: z.number(),
            colsampleBynode: z.number(),
            colsampleBytree: z.number(),
            contributionMetric: z.string(),
            dartNormalizeType: z.string(),
            dataFrequency: z.string(),
            dataSplitColumn: z.string(),
            dataSplitEvalFraction: z.number(),
            dataSplitMethod: z.string(),
            decomposeTimeSeries: z.boolean(),
            dimensionIdColumns: z.array(z.string()),
            distanceType: z.string(),
            dropout: z.number(),
            earlyStop: z.boolean(),
            enableGlobalExplain: z.boolean(),
            endpointIdleTtl: z.string(),
            feedbackType: z.string(),
            fitIntercept: z.boolean(),
            forecastLimitLowerBound: z.number(),
            forecastLimitUpperBound: z.number(),
            hiddenUnits: z.array(z.string()),
            holidayRegion: z.string(),
            holidayRegions: z.array(z.string()),
            horizon: z.string(),
            hparamTuningObjectives: z.array(z.string()),
            huggingFaceModelId: z.string(),
            includeDrift: z.boolean(),
            initialLearnRate: z.number(),
            inputLabelColumns: z.array(z.string()),
            instanceWeightColumn: z.string(),
            integratedGradientsNumSteps: z.string(),
            isTestColumn: z.string(),
            itemColumn: z.string(),
            kmeansInitializationColumn: z.string(),
            kmeansInitializationMethod: z.string(),
            l1RegActivation: z.number(),
            l1Regularization: z.number(),
            l2Regularization: z.number(),
            labelClassWeights: z.record(z.string(), z.unknown()),
            learnRate: z.number(),
            learnRateStrategy: z.string(),
            lossType: z.string(),
            machineType: z.string(),
            maxIterations: z.string(),
            maxParallelTrials: z.string(),
            maxReplicaCount: z.string(),
            maxTimeSeriesLength: z.string(),
            maxTreeDepth: z.string(),
            minAprioriSupport: z.number(),
            minRelativeProgress: z.number(),
            minReplicaCount: z.string(),
            minSplitLoss: z.number(),
            minTimeSeriesLength: z.string(),
            minTreeChildWeight: z.string(),
            modelGardenModelName: z.string(),
            modelRegistry: z.string(),
            modelUri: z.string(),
            nonSeasonalOrder: z.object({
              d: z.string(),
              p: z.string(),
              q: z.string(),
            }),
            numClusters: z.string(),
            numFactors: z.string(),
            numParallelTree: z.string(),
            numPrincipalComponents: z.string(),
            numTrials: z.string(),
            optimizationStrategy: z.string(),
            optimizer: z.string(),
            pcaExplainedVarianceRatio: z.number(),
            pcaSolver: z.string(),
            reservationAffinityKey: z.string(),
            reservationAffinityType: z.string(),
            reservationAffinityValues: z.array(z.string()),
            sampledShapleyNumPaths: z.string(),
            scaleFeatures: z.boolean(),
            standardizeFeatures: z.boolean(),
            subsample: z.number(),
            tfVersion: z.string(),
            timeSeriesDataColumn: z.string(),
            timeSeriesIdColumn: z.string(),
            timeSeriesIdColumns: z.array(z.string()),
            timeSeriesLengthFraction: z.number(),
            timeSeriesTimestampColumn: z.string(),
            treeMethod: z.string(),
            trendSmoothingWindowSize: z.string(),
            userColumn: z.string(),
            vertexAiModelVersionAliases: z.array(z.string()),
            walsAlpha: z.number(),
            warmStart: z.boolean(),
            xgboostVersion: z.string(),
          }),
          startTimeMs: z.string(),
          status: z.string(),
          trainingLoss: z.number(),
          trialId: z.string(),
        })),
        iterationResults: z.array(z.object({
          arimaResult: z.object({
            arimaModelInfo: z.array(z.object({
              arimaCoefficients: z.object({
                autoRegressiveCoefficients: z.array(z.number()),
                interceptCoefficient: z.number(),
                movingAverageCoefficients: z.array(z.number()),
              }),
              arimaFittingMetrics: z.object({
                aic: z.number(),
                logLikelihood: z.number(),
                variance: z.number(),
              }),
              hasDrift: z.boolean(),
              hasHolidayEffect: z.boolean(),
              hasSpikesAndDips: z.boolean(),
              hasStepChanges: z.boolean(),
              nonSeasonalOrder: z.object({
                d: z.string(),
                p: z.string(),
                q: z.string(),
              }),
              seasonalPeriods: z.array(z.string()),
              timeSeriesId: z.string(),
              timeSeriesIds: z.array(z.string()),
            })),
            seasonalPeriods: z.array(z.string()),
          }),
          clusterInfos: z.array(z.object({
            centroidId: z.string(),
            clusterRadius: z.number(),
            clusterSize: z.string(),
          })),
          durationMs: z.string(),
          evalLoss: z.number(),
          index: z.number(),
          learnRate: z.number(),
          principalComponentInfos: z.array(z.object({
            cumulativeExplainedVarianceRatio: z.number(),
            explainedVariance: z.number(),
            explainedVarianceRatio: z.number(),
            principalComponentId: z.string(),
          })),
          trainingLoss: z.number(),
        })),
        maxIterations: z.string(),
        modelType: z.string(),
        trainingType: z.string(),
      }),
      modelTraining: z.object({
        currentIteration: z.number(),
        expectedTotalIterations: z.string(),
      }),
      modelTrainingCurrentIteration: z.number(),
      modelTrainingExpectedTotalIteration: z.string(),
      numDmlAffectedRows: z.string(),
      performanceInsights: z.object({
        avgPreviousExecutionMs: z.string(),
        stagePerformanceChangeInsights: z.array(z.object({
          inputDataChange: z.object({
            recordsReadDiffPercentage: z.number(),
          }),
          stageId: z.string(),
        })),
        stagePerformanceStandaloneInsights: z.array(z.object({
          biEngineReasons: z.array(z.object({
            code: z.string(),
            message: z.string(),
          })),
          highCardinalityJoins: z.array(z.object({
            leftRows: z.string(),
            outputRows: z.string(),
            rightRows: z.string(),
            stepIndex: z.number(),
          })),
          insufficientShuffleQuota: z.boolean(),
          partitionSkew: z.object({
            skewSources: z.array(z.object({
              stageId: z.string(),
            })),
          }),
          slotContention: z.boolean(),
          stageId: z.string(),
        })),
      }),
      queryInfo: z.object({
        optimizationDetails: z.record(z.string(), z.unknown()),
      }),
      queryPlan: z.array(z.object({
        completedParallelInputs: z.string(),
        computeMode: z.string(),
        computeMsAvg: z.string(),
        computeMsMax: z.string(),
        computeRatioAvg: z.number(),
        computeRatioMax: z.number(),
        endMs: z.string(),
        id: z.string(),
        inputStages: z.array(z.string()),
        name: z.string(),
        parallelInputs: z.string(),
        readMsAvg: z.string(),
        readMsMax: z.string(),
        readRatioAvg: z.number(),
        readRatioMax: z.number(),
        recordsRead: z.string(),
        recordsWritten: z.string(),
        shuffleOutputBytes: z.string(),
        shuffleOutputBytesSpilled: z.string(),
        slotMs: z.string(),
        startMs: z.string(),
        status: z.string(),
        steps: z.array(z.object({
          kind: z.string(),
          substeps: z.array(z.string()),
        })),
        waitMsAvg: z.string(),
        waitMsMax: z.string(),
        waitRatioAvg: z.number(),
        waitRatioMax: z.number(),
        writeMsAvg: z.string(),
        writeMsMax: z.string(),
        writeRatioAvg: z.number(),
        writeRatioMax: z.number(),
      })),
      referencedPropertyGraphs: z.array(z.object({
        datasetId: z.string(),
        projectId: z.string(),
        propertyGraphId: z.string(),
      })),
      referencedRoutines: z.array(z.object({
        datasetId: z.string(),
        projectId: z.string(),
        routineId: z.string(),
      })),
      referencedTables: z.array(z.object({
        datasetId: z.string(),
        projectId: z.string(),
        tableId: z.string(),
      })),
      reservationUsage: z.array(z.object({
        name: z.string(),
        slotMs: z.string(),
      })),
      schema: z.object({
        fields: z.array(z.object({
          categories: z.object({
            names: z.array(z.string()),
          }),
          collation: z.string(),
          dataPolicies: z.array(z.object({
            name: z.string(),
          })),
          defaultValueExpression: z.string(),
          description: z.string(),
          fields: z.array(z.string()),
          foreignTypeDefinition: z.string(),
          generatedColumn: z.object({
            generatedExpressionInfo: z.object({
              asynchronous: z.boolean(),
              generationExpression: z.string(),
              stored: z.boolean(),
            }),
            generatedMode: z.string(),
          }),
          maxLength: z.string(),
          mode: z.string(),
          name: z.string(),
          policyTags: z.object({
            names: z.array(z.string()),
          }),
          precision: z.string(),
          rangeElementType: z.object({
            type: z.string(),
          }),
          roundingMode: z.string(),
          scale: z.string(),
          timestampPrecision: z.string(),
          type: z.string(),
        })),
        foreignTypeInfo: z.object({
          typeSystem: z.string(),
        }),
      }),
      searchStatistics: z.object({
        indexPruningStats: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
          indexId: z.string(),
          postIndexPruningParallelInputCount: z.string(),
          preIndexPruningParallelInputCount: z.string(),
        })),
        indexUnusedReasons: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
          code: z.string(),
          indexName: z.string(),
          message: z.string(),
        })),
        indexUsageMode: z.string(),
      }),
      sparkStatistics: z.object({
        endpoints: z.record(z.string(), z.unknown()),
        gcsStagingBucket: z.string(),
        kmsKeyName: z.string(),
        loggingInfo: z.object({
          projectId: z.string(),
          resourceType: z.string(),
        }),
        sparkJobId: z.string(),
        sparkJobLocation: z.string(),
      }),
      statementType: z.string(),
      timeline: z.array(z.object({
        activeUnits: z.string(),
        completedUnits: z.string(),
        elapsedMs: z.string(),
        estimatedRunnableUnits: z.string(),
        pendingUnits: z.string(),
        shuffleRamUsageRatio: z.number(),
        totalSlotMs: z.string(),
      })),
      totalBytesBilled: z.string(),
      totalBytesProcessed: z.string(),
      totalBytesProcessedAccuracy: z.string(),
      totalPartitionsProcessed: z.string(),
      totalServicesSkuSlotMs: z.string(),
      totalSlotMs: z.string(),
      transferredBytes: z.string(),
      undeclaredQueryParameters: z.array(z.object({
        name: z.string(),
        parameterType: z.object({
          arrayType: z.string(),
          rangeElementType: z.string(),
          structTypes: z.array(z.object({
            description: z.string(),
            name: z.string(),
            type: z.string(),
          })),
          timestampPrecision: z.string(),
          type: z.string(),
        }),
        parameterValue: z.object({
          arrayValues: z.array(z.string()),
          rangeValue: z.object({
            end: z.string(),
            start: z.string(),
          }),
          structValues: z.record(z.string(), z.unknown()),
          value: z.string(),
        }),
      })),
      vectorSearchStatistics: z.object({
        indexUnusedReasons: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
          code: z.string(),
          indexName: z.string(),
          message: z.string(),
        })),
        indexUsageMode: z.string(),
        storedColumnsUsages: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
          isQueryAccelerated: z.boolean(),
          storedColumnsUnusedReasons: z.array(z.object({
            code: z.string(),
            message: z.string(),
            uncoveredColumns: z.array(z.string()),
          })),
        })),
      }),
    }),
    quotaDeferments: z.array(z.string()),
    reservationGroupPath: z.array(z.string()),
    reservationUsage: z.array(z.object({
      name: z.string(),
      slotMs: z.string(),
    })),
    reservation_id: z.string(),
    rowLevelSecurityStatistics: z.object({
      rowLevelSecurityApplied: z.boolean(),
    }),
    scriptStatistics: z.object({
      evaluationKind: z.string(),
      stackFrames: z.array(z.object({
        endColumn: z.number(),
        endLine: z.number(),
        procedureId: z.string(),
        startColumn: z.number(),
        startLine: z.number(),
        text: z.string(),
      })),
    }),
    sessionInfo: z.object({
      sessionId: z.string(),
    }),
    startTime: z.string(),
    totalBytesProcessed: z.string(),
    totalSlotMs: z.string(),
    transactionInfo: z.object({
      transactionId: z.string(),
    }),
  }).optional(),
  status: z.object({
    errorResult: z.object({
      debugInfo: z.string(),
      location: z.string(),
      message: z.string(),
      reason: z.string(),
    }),
    errors: z.array(z.object({
      debugInfo: z.string(),
      location: z.string(),
      message: z.string(),
      reason: z.string(),
    })),
    state: z.string(),
  }).optional(),
  user_email: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  configuration: z.object({
    copy: z.object({
      createDisposition: z.string().describe(
        "Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string().describe(
          "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
        ).optional(),
      }).describe("Configuration for Cloud KMS encryption settings.")
        .optional(),
      destinationExpirationTime: z.string().describe(
        "Optional. The time when the destination table expires. Expired tables will be deleted and their storage reclaimed.",
      ).optional(),
      destinationTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      operationType: z.enum([
        "OPERATION_TYPE_UNSPECIFIED",
        "COPY",
        "SNAPSHOT",
        "RESTORE",
        "CLONE",
      ]).describe("Optional. Supported operation types in table copy job.")
        .optional(),
      sourceTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      sourceTables: z.array(z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      })).describe("[Pick one] Source tables to copy.").optional(),
      writeDisposition: z.string().describe(
        "Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the table data and uses the schema and table constraints from the source table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
    }).describe(
      "JobConfigurationTableCopy configures a job that copies data from one table to another. For more information on copying tables, see [Copy a table](https://cloud.google.com/bigquery/docs/managing-tables#copy-table).",
    ).optional(),
    dryRun: z.boolean().describe(
      "Optional. If set, don't actually run this job. A valid query will return a mostly empty response with some processing statistics, while an invalid query will return the same error it would if it wasn't a dry run. Behavior of non-query jobs is undefined.",
    ).optional(),
    extract: z.object({
      compression: z.string().describe(
        "Optional. The compression type to use for exported files. Possible values include DEFLATE, GZIP, NONE, SNAPPY, and ZSTD. The default value is NONE. Not all compression formats are support for all file formats. DEFLATE is only supported for Avro. ZSTD is only supported for Parquet. Not applicable when extracting models.",
      ).optional(),
      destinationFormat: z.string().describe(
        "Optional. The exported file format. Possible values include CSV, NEWLINE_DELIMITED_JSON, PARQUET, or AVRO for tables and ML_TF_SAVED_MODEL or ML_XGBOOST_BOOSTER for models. The default value for tables is CSV. Tables with nested or repeated fields cannot be exported as CSV. The default value for models is ML_TF_SAVED_MODEL.",
      ).optional(),
      destinationUri: z.string().describe(
        "[Pick one] DEPRECATED: Use destinationUris instead, passing only one URI as necessary. The fully-qualified Google Cloud Storage URI where the extracted table should be written.",
      ).optional(),
      destinationUris: z.array(z.string()).describe(
        "[Pick one] A list of fully-qualified Google Cloud Storage URIs where the extracted table should be written.",
      ).optional(),
      fieldDelimiter: z.string().describe(
        "Optional. When extracting data in CSV format, this defines the delimiter to use between fields in the exported data. Default is ','. Not applicable when extracting models.",
      ).optional(),
      modelExtractOptions: z.object({
        trialId: z.string().describe(
          "The 1-based ID of the trial to be exported from a hyperparameter tuning model. If not specified, the trial with id = [Model](https://cloud.google.com/bigquery/docs/reference/rest/v2/models#resource:-model).defaultTrialId is exported. This field is ignored for models not trained with hyperparameter tuning.",
        ).optional(),
      }).describe("Options related to model extraction.").optional(),
      printHeader: z.boolean().describe(
        "Optional. Whether to print out a header row in the results. Default is true. Not applicable when extracting models.",
      ).optional(),
      sourceModel: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this model.",
        ).optional(),
        modelId: z.string().describe(
          "Required. The ID of the model. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this model.",
        ).optional(),
      }).describe("Id path of a model.").optional(),
      sourceTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      useAvroLogicalTypes: z.boolean().describe(
        "Whether to use logical types when extracting to AVRO format. Not applicable when extracting models.",
      ).optional(),
    }).describe(
      "JobConfigurationExtract configures a job that exports data from a BigQuery table into Google Cloud Storage.",
    ).optional(),
    jobTimeoutMs: z.string().describe(
      "Optional. Job timeout in milliseconds relative to the job creation time. If this time limit is exceeded, BigQuery attempts to stop the job, but might not always succeed in canceling it before the job completes. For example, a job that takes more than 60 seconds to complete has a better chance of being stopped than a job that takes 10 seconds to complete.",
    ).optional(),
    jobType: z.string().describe(
      "Output only. The type of the job. Can be QUERY, LOAD, EXTRACT, COPY or UNKNOWN.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels associated with this job. You can use these to organize and group your jobs. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key.",
    ).optional(),
    load: z.object({
      allowJaggedRows: z.boolean().describe(
        "Optional. Accept rows that are missing trailing optional columns. The missing values are treated as nulls. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. Only applicable to CSV, ignored for other formats.",
      ).optional(),
      allowQuotedNewlines: z.boolean().describe(
        "Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false.",
      ).optional(),
      autodetect: z.boolean().describe(
        "Optional. Indicates if we should automatically infer the options and schema for CSV and JSON sources.",
      ).optional(),
      clustering: z.object({
        fields: z.array(z.string()).describe(
          "One or more fields on which data should be clustered. Only top-level, non-repeated, simple-type fields are supported. The ordering of the clustering fields should be prioritized from most to least important for filtering purposes. For additional information, see [Introduction to clustered tables](https://cloud.google.com/bigquery/docs/clustered-tables#limitations).",
        ).optional(),
      }).describe("Configures table clustering.").optional(),
      columnNameCharacterMap: z.enum([
        "COLUMN_NAME_CHARACTER_MAP_UNSPECIFIED",
        "STRICT",
        "V1",
        "V2",
      ]).describe(
        "Optional. Character map supported for column names in CSV/Parquet loads. Defaults to STRICT and can be overridden by Project Config Service. Using this option with unsupporting load formats will result in an error.",
      ).optional(),
      connectionProperties: z.array(z.object({
        key: z.string().describe("The key of the property to set.").optional(),
        value: z.string().describe("The value of the property to set.")
          .optional(),
      })).describe(
        "Optional. Connection properties which can modify the load job behavior. Currently, only the 'session_id' connection property is supported, and is used to resolve _SESSION appearing as the dataset id.",
      ).optional(),
      copyFilesOnly: z.boolean().describe(
        "Optional. [Experimental] Configures the load job to copy files directly to the destination BigLake managed table, bypassing file content reading and rewriting. Copying files only is supported when all the following are true: * `source_uris` are located in the same Cloud Storage location as the destination table's `storage_uri` location. * `source_format` is `PARQUET`. * `destination_table` is an existing BigLake managed table. The table's schema does not have flexible column names. The table's columns do not have type parameters other than precision and scale. * No options other than the above are specified.",
      ).optional(),
      createDisposition: z.string().describe(
        "Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
      createSession: z.boolean().describe(
        "Optional. If this property is true, the job creates a new session using a randomly generated session_id. To continue using a created session with subsequent queries, pass the existing session identifier as a `ConnectionProperty` value. The session identifier is returned as part of the `SessionInfo` message within the query statistics. The new session's location will be set to `Job.JobReference.location` if it is present, otherwise it's set to the default location based on existing routing logic.",
      ).optional(),
      dateFormat: z.string().describe(
        "Optional. Date format used for parsing DATE values.",
      ).optional(),
      datetimeFormat: z.string().describe(
        "Optional. Date format used for parsing DATETIME values.",
      ).optional(),
      decimalTargetTypes: z.array(
        z.enum([
          "DECIMAL_TARGET_TYPE_UNSPECIFIED",
          "NUMERIC",
          "BIGNUMERIC",
          "STRING",
        ]),
      ).describe(
        'Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: * (38,9) -> NUMERIC; * (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); * (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); * (76,38) -> BIGNUMERIC; * (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats.',
      ).optional(),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string().describe(
          "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
        ).optional(),
      }).describe("Configuration for Cloud KMS encryption settings.")
        .optional(),
      destinationTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      destinationTableProperties: z.object({
        description: z.string().describe(
          "Optional. The description for the destination table. This will only be used if the destination table is newly created. If the table already exists and a value different than the current description is provided, the job will fail.",
        ).optional(),
        expirationTime: z.string().describe("Internal use only.").optional(),
        friendlyName: z.string().describe(
          "Optional. Friendly name for the destination table. If the table already exists, it should be same as the existing friendly name.",
        ).optional(),
        labels: z.record(z.string(), z.string()).describe(
          "Optional. The labels associated with this table. You can use these to organize and group your tables. This will only be used if the destination table is newly created. If the table already exists and labels are different than the current labels are provided, the job will fail.",
        ).optional(),
      }).describe("Properties for the destination table.").optional(),
      encoding: z.string().describe(
        "Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the `quote` and `fieldDelimiter` properties. If you don't specify an encoding, or if you specify a UTF-8 encoding when the CSV file is not UTF-8 encoded, BigQuery attempts to convert the data to UTF-8. Generally, your data loads successfully, but it may not match byte-for-byte what you expect. To avoid this, specify the correct encoding by using the `--encoding` flag. If BigQuery can't convert a character other than the ASCII `0` character, BigQuery converts the character to the standard Unicode replacement character: �.",
      ).optional(),
      fieldDelimiter: z.string().describe(
        'Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C).',
      ).optional(),
      fileSetSpecType: z.enum([
        "FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH",
        "FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST",
      ]).describe(
        "Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default, source URIs are expanded against the underlying storage. You can also specify manifest files to control how the file set is constructed. This option is only applicable to object storage systems.",
      ).optional(),
      hivePartitioningOptions: z.object({
        fields: z.array(z.string()).describe(
          "Output only. For permanent external tables, this field is populated with the hive partition keys in the order they were inferred. The types of the partition keys can be deduced by checking the table schema (which will include the partition keys). Not every API will populate this field in the output. For example, Tables.Get will populate it, but Tables.List will not contain this field.",
        ).optional(),
        mode: z.string().describe(
          "Optional. When set, what mode of hive partitioning to use when reading data. The following modes are supported: * AUTO: automatically infer partition key name(s) and type(s). * STRINGS: automatically infer partition key name(s). All types are strings. * CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported formats are: JSON, CSV, ORC, Avro and Parquet.",
        ).optional(),
        requirePartitionFilter: z.boolean().describe(
          "Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with require_partition_filter explicitly set to true will fail.",
        ).optional(),
        sourceUriPrefix: z.string().describe(
          "Optional. When hive partition detection is requested, a common prefix for all source uris must be required. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout: gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/. CUSTOM detection requires encoding the partitioning schema immediately after the common prefix. For CUSTOM, any of * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING} would all be valid source URI prefixes.",
        ).optional(),
      }).describe("Options for configuring hive partitioning detect.")
        .optional(),
      ignoreUnknownValues: z.boolean().describe(
        "Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names in the table schema Avro, Parquet, ORC: Fields in the file schema that don't exist in the table schema.",
      ).optional(),
      jsonExtension: z.enum(["JSON_EXTENSION_UNSPECIFIED", "GEOJSON"]).describe(
        "Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON).",
      ).optional(),
      maxBadRecords: z.number().int().describe(
        "Optional. The maximum number of bad records that BigQuery can ignore when running the job. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This is only supported for CSV and NEWLINE_DELIMITED_JSON file formats.",
      ).optional(),
      nullMarker: z.string().describe(
        'Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\\N", BigQuery interprets "\\N" as a null value when loading a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value.',
      ).optional(),
      nullMarkers: z.array(z.string()).describe(
        "Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types.",
      ).optional(),
      parquetOptions: z.object({
        enableListInference: z.boolean().describe(
          "Optional. Indicates whether to use schema inference specifically for Parquet LIST logical type.",
        ).optional(),
        enumAsString: z.boolean().describe(
          "Optional. Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default.",
        ).optional(),
        mapTargetType: z.enum([
          "MAP_TARGET_TYPE_UNSPECIFIED",
          "ARRAY_OF_STRUCT",
        ]).describe(
          "Optional. Indicates how to represent a Parquet map if present.",
        ).optional(),
      }).describe("Parquet Options for load and make external tables.")
        .optional(),
      preserveAsciiControlCharacters: z.boolean().describe(
        "Optional. When sourceFormat is set to \"CSV\", this indicates whether the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\\x00' to '\\x1F') are preserved.",
      ).optional(),
      projectionFields: z.array(z.string()).describe(
        'If sourceFormat is set to "DATASTORE_BACKUP", indicates which entity properties to load into BigQuery from a Cloud Datastore backup. Property names are case sensitive and must be top-level properties. If no properties are specified, BigQuery loads all properties. If any named property isn\'t found in the Cloud Datastore backup, an invalid error is returned in the job result.',
      ).optional(),
      quote: z.string().regex(new RegExp(".?")).describe(
        "Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote ('\"'). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' \" ', use ' \"\" '. @default \"",
      ).optional(),
      rangePartitioning: z.object({
        field: z.string().describe(
          "Required. The name of the column to partition the table on. It must be a top-level, INT64 column whose mode is NULLABLE or REQUIRED.",
        ).optional(),
        range: z.object({
          end: z.string().describe(
            "[Experimental] The end of range partitioning, exclusive.",
          ).optional(),
          interval: z.string().describe(
            "[Experimental] The width of each interval.",
          ).optional(),
          start: z.string().describe(
            "[Experimental] The start of range partitioning, inclusive.",
          ).optional(),
        }).describe("[Experimental] Defines the ranges for range partitioning.")
          .optional(),
      }).optional(),
      referenceFileSchemaUri: z.string().describe(
        "Optional. The user can provide a reference file with the reader schema. This file is only loaded if it is part of source URIs, but is not loaded otherwise. It is enabled for the following formats: AVRO, PARQUET, ORC.",
      ).optional(),
      schema: z.object({
        fields: z.array(z.object({
          categories: z.object({
            names: z.array(z.string()).describe("Deprecated.").optional(),
          }).describe("Deprecated.").optional(),
          collation: z.string().describe(
            "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
          ).optional(),
          dataPolicies: z.array(z.object({
            name: z.string().describe(
              "Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id.",
            ).optional(),
          })).describe(
            "Optional. Data policies attached to this field, used for field-level access control.",
          ).optional(),
          defaultValueExpression: z.string().describe(
            "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
          ).optional(),
          description: z.string().describe(
            "Optional. The field description. The maximum length is 1,024 characters.",
          ).optional(),
          fields: z.array(z.string()).describe(
            "Optional. Describes the nested schema fields if the type property is set to RECORD.",
          ).optional(),
          foreignTypeDefinition: z.string().describe(
            "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
          ).optional(),
          generatedColumn: z.object({
            generatedExpressionInfo: z.object({
              asynchronous: z.boolean().describe(
                "Optional. Whether the column generation is done asynchronously.",
              ).optional(),
              generationExpression: z.string().describe(
                "Optional. The generation expression (e.g. AI.EMBED(...)) used to generated the field.",
              ).optional(),
              stored: z.boolean().describe(
                "Optional. Whether the generated column is stored in the table.",
              ).optional(),
            }).describe(
              "Definition of the expression used to generate the field.",
            ).optional(),
            generatedMode: z.enum([
              "GENERATED_MODE_UNSPECIFIED",
              "GENERATED_ALWAYS",
              "GENERATED_BY_DEFAULT",
            ]).describe(
              "Optional. Dictates when system generated values are used to populate the field.",
            ).optional(),
          }).describe(
            "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
          ).optional(),
          maxLength: z.string().describe(
            'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
          ).optional(),
          mode: z.string().describe(
            "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
          ).optional(),
          name: z.string().describe(
            "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
          ).optional(),
          policyTags: z.object({
            names: z.array(z.string()).describe(
              'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
            ).optional(),
          }).describe(
            "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
          ).optional(),
          precision: z.string().describe(
            'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
          ).optional(),
          rangeElementType: z.object({
            type: z.string().describe(
              "Required. The type of a field element. For more information, see TableFieldSchema.type.",
            ).optional(),
          }).describe("Represents the type of a field element.").optional(),
          roundingMode: z.enum([
            "ROUNDING_MODE_UNSPECIFIED",
            "ROUND_HALF_AWAY_FROM_ZERO",
            "ROUND_HALF_EVEN",
          ]).describe(
            "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
          ).optional(),
          scale: z.string().describe(
            "Optional. See documentation for precision.",
          ).optional(),
          timestampPrecision: z.string().describe(
            "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
          ).optional(),
          type: z.string().describe(
            "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
          ).optional(),
        })).describe("Describes the fields in a table.").optional(),
        foreignTypeInfo: z.object({
          typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
            "Required. Specifies the system which defines the foreign data type.",
          ).optional(),
        }).describe(
          "Metadata about the foreign data type definition such as the system in which the type is defined.",
        ).optional(),
      }).describe("Schema of a table").optional(),
      schemaInline: z.string().describe(
        '[Deprecated] The inline schema. For CSV schemas, specify as "Field1:Type1[,Field2:Type2]*". For example, "foo:STRING, bar:INTEGER, baz:FLOAT".',
      ).optional(),
      schemaInlineFormat: z.string().describe(
        "[Deprecated] The format of the schemaInline property.",
      ).optional(),
      schemaUpdateOptions: z.array(z.string()).describe(
        "Allows the schema of the destination table to be updated as a side effect of the load job if a schema is autodetected or supplied in the job configuration. Schema update options are supported in three cases: when writeDisposition is WRITE_APPEND; when writeDisposition is WRITE_TRUNCATE_DATA; when writeDisposition is WRITE_TRUNCATE and the destination table is a partition of a table, specified by partition decorators. For normal tables, WRITE_TRUNCATE will always overwrite the schema. One or more of the following values are specified: * ALLOW_FIELD_ADDITION: allow adding a nullable field to the schema. * ALLOW_FIELD_RELAXATION: allow relaxing a required field in the original schema to nullable.",
      ).optional(),
      skipLeadingRows: z.number().int().describe(
        "Optional. The number of rows at the top of a CSV file that BigQuery will skip when loading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
      ).optional(),
      sourceColumnMatch: z.enum([
        "SOURCE_COLUMN_MATCH_UNSPECIFIED",
        "POSITION",
        "NAME",
      ]).describe(
        "Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible.",
      ).optional(),
      sourceFormat: z.string().describe(
        'Optional. The format of the data files. For CSV files, specify "CSV". For datastore backups, specify "DATASTORE_BACKUP". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro, specify "AVRO". For parquet, specify "PARQUET". For orc, specify "ORC". The default value is CSV.',
      ).optional(),
      sourceUris: z.array(z.string()).describe(
        "[Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups: Exactly one URI can be specified. Also, the '*' wildcard character is not allowed.",
      ).optional(),
      timeFormat: z.string().describe(
        "Optional. Date format used for parsing TIME values.",
      ).optional(),
      timePartitioning: z.object({
        expirationMs: z.string().describe(
          "Optional. Number of milliseconds for which to keep the storage for a partition. A wrapper is used here because 0 is an invalid value.",
        ).optional(),
        field: z.string().describe(
          "Optional. If not set, the table is partitioned by pseudo column '_PARTITIONTIME'; if set, the table is partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED. A wrapper is used here because an empty string is an invalid value.",
        ).optional(),
        requirePartitionFilter: z.boolean().describe(
          "If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. This field is deprecated; please set the field with the same name on the table itself instead. This field needs a wrapper because we want to output the default value, false, if the user explicitly set it.",
        ).optional(),
        type: z.string().describe(
          "Required. The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively.",
        ).optional(),
      }).optional(),
      timeZone: z.string().describe(
        "Optional. Default time zone that will apply when parsing timestamp values that have no specific time zone.",
      ).optional(),
      timestampFormat: z.string().describe(
        "Optional. Date format used for parsing TIMESTAMP values.",
      ).optional(),
      timestampTargetPrecision: z.array(z.number().int()).describe(
        "Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV, PARQUET, and AVRO. Possible values include: Not Specified, [], or [6]: timestamp(6) for all auto detected TIMESTAMP columns [6, 12]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. [12]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated.",
      ).optional(),
      useAvroLogicalTypes: z.boolean().describe(
        'Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER).',
      ).optional(),
      writeDisposition: z.string().describe(
        "Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the data, removes the constraints and uses the schema from the load job. * WRITE_TRUNCATE_DATA: If the table already exists, BigQuery overwrites the data, but keeps the constraints and schema of the existing table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_APPEND. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
    }).describe(
      "JobConfigurationLoad contains the configuration properties for loading data into a destination table.",
    ).optional(),
    maxSlots: z.number().int().describe(
      "Optional. A target limit on the rate of slot consumption by this job. If set to a value > 0, BigQuery will attempt to limit the rate of slot consumption by this job to keep it below the configured limit, even if the job is eligible for more slots based on fair scheduling. The unused slots will be available for other jobs and queries to use. Note: This feature is not yet generally available.",
    ).optional(),
    query: z.object({
      allowLargeResults: z.boolean().describe(
        "Optional. If true and query uses legacy SQL dialect, allows the query to produce arbitrarily large result tables at a slight cost in performance. Requires destinationTable to be set. For GoogleSQL queries, this flag is ignored and large results are always allowed. However, you must still set destinationTable when result size exceeds the allowed maximum response size.",
      ).optional(),
      clustering: z.object({
        fields: z.array(z.string()).describe(
          "One or more fields on which data should be clustered. Only top-level, non-repeated, simple-type fields are supported. The ordering of the clustering fields should be prioritized from most to least important for filtering purposes. For additional information, see [Introduction to clustered tables](https://cloud.google.com/bigquery/docs/clustered-tables#limitations).",
        ).optional(),
      }).describe("Configures table clustering.").optional(),
      connectionProperties: z.array(z.object({
        key: z.string().describe("The key of the property to set.").optional(),
        value: z.string().describe("The value of the property to set.")
          .optional(),
      })).describe("Connection properties which can modify the query behavior.")
        .optional(),
      continuous: z.boolean().describe(
        "[Optional] Specifies whether the query should be executed as a continuous query. The default value is false.",
      ).optional(),
      createDisposition: z.string().describe(
        "Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
      createSession: z.boolean().describe(
        "If this property is true, the job creates a new session using a randomly generated session_id. To continue using a created session with subsequent queries, pass the existing session identifier as a `ConnectionProperty` value. The session identifier is returned as part of the `SessionInfo` message within the query statistics. The new session's location will be set to `Job.JobReference.location` if it is present, otherwise it's set to the default location based on existing routing logic.",
      ).optional(),
      defaultDataset: z.object({
        datasetId: z.string().describe(
          "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. The ID of the project containing this dataset.",
        ).optional(),
      }).describe("Identifier for a dataset.").optional(),
      destinationEncryptionConfiguration: z.object({
        kmsKeyName: z.string().describe(
          "Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.",
        ).optional(),
      }).describe("Configuration for Cloud KMS encryption settings.")
        .optional(),
      destinationTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      flattenResults: z.boolean().describe(
        "Optional. If true and query uses legacy SQL dialect, flattens all nested and repeated fields in the query results. allowLargeResults must be true if this is set to false. For GoogleSQL queries, this flag is ignored and results are never flattened.",
      ).optional(),
      maximumBillingTier: z.number().int().describe(
        "Optional. [Deprecated] Maximum billing tier allowed for this query. The billing tier controls the amount of compute resources allotted to the query, and multiplies the on-demand cost of the query accordingly. A query that runs within its allotted resources will succeed and indicate its billing tier in statistics.query.billingTier, but if the query exceeds its allotted resources, it will fail with billingTierLimitExceeded. WARNING: The billed byte amount can be multiplied by an amount up to this number! Most users should not need to alter this setting, and we recommend that you avoid introducing new uses of it.",
      ).optional(),
      maximumBytesBilled: z.string().describe(
        "Limits the bytes billed for this job. Queries that will have bytes billed beyond this limit will fail (without incurring a charge). If unspecified, this will be set to your project default.",
      ).optional(),
      parameterMode: z.string().describe(
        "GoogleSQL only. Set to POSITIONAL to use positional (?) query parameters or to NAMED to use named (@myparam) query parameters in this query.",
      ).optional(),
      preserveNulls: z.boolean().describe(
        "[Deprecated] This property is deprecated.",
      ).optional(),
      priority: z.string().describe(
        "Optional. Specifies a priority for the query. Possible values include INTERACTIVE and BATCH. The default value is INTERACTIVE.",
      ).optional(),
      query: z.string().describe(
        "[Required] SQL query text to execute. The useLegacySql field can be used to indicate whether the query uses legacy SQL or GoogleSQL.",
      ).optional(),
      queryParameters: z.array(z.object({
        name: z.string().describe(
          "Optional. If unset, this is a positional parameter. Otherwise, should be unique within a query.",
        ).optional(),
        parameterType: z.object({
          arrayType: z.string().describe(
            "Circular reference to QueryParameterType",
          ).optional(),
          rangeElementType: z.string().describe(
            "Circular reference to QueryParameterType",
          ).optional(),
          structTypes: z.array(z.object({
            description: z.string().describe(
              "Optional. Human-oriented description of the field.",
            ).optional(),
            name: z.string().describe("Optional. The name of this field.")
              .optional(),
            type: z.string().describe(
              "Circular reference to QueryParameterType",
            ).optional(),
          })).describe(
            "Optional. The types of the fields of this struct, in order, if this is a struct.",
          ).optional(),
          timestampPrecision: z.string().describe(
            "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
          ).optional(),
          type: z.string().describe(
            "Required. The top level type of this field.",
          ).optional(),
        }).describe("The type of a query parameter.").optional(),
        parameterValue: z.object({
          arrayValues: z.array(z.string()).describe(
            "Optional. The array values, if this is an array type.",
          ).optional(),
          rangeValue: z.object({
            end: z.string().describe(
              "Circular reference to QueryParameterValue",
            ).optional(),
            start: z.string().describe(
              "Circular reference to QueryParameterValue",
            ).optional(),
          }).describe("Represents the value of a range.").optional(),
          structValues: z.record(z.string(), z.string()).describe(
            "The struct field values.",
          ).optional(),
          value: z.string().describe(
            "Optional. The value of this value, if a simple scalar type.",
          ).optional(),
        }).describe("The value of a query parameter.").optional(),
      })).describe("Query parameters for GoogleSQL queries.").optional(),
      rangePartitioning: z.object({
        field: z.string().describe(
          "Required. The name of the column to partition the table on. It must be a top-level, INT64 column whose mode is NULLABLE or REQUIRED.",
        ).optional(),
        range: z.object({
          end: z.string().describe(
            "[Experimental] The end of range partitioning, exclusive.",
          ).optional(),
          interval: z.string().describe(
            "[Experimental] The width of each interval.",
          ).optional(),
          start: z.string().describe(
            "[Experimental] The start of range partitioning, inclusive.",
          ).optional(),
        }).describe("[Experimental] Defines the ranges for range partitioning.")
          .optional(),
      }).optional(),
      schemaUpdateOptions: z.array(z.string()).describe(
        "Allows the schema of the destination table to be updated as a side effect of the query job. Schema update options are supported in three cases: when writeDisposition is WRITE_APPEND; when writeDisposition is WRITE_TRUNCATE_DATA; when writeDisposition is WRITE_TRUNCATE and the destination table is a partition of a table, specified by partition decorators. For normal tables, WRITE_TRUNCATE will always overwrite the schema. One or more of the following values are specified: * ALLOW_FIELD_ADDITION: allow adding a nullable field to the schema. * ALLOW_FIELD_RELAXATION: allow relaxing a required field in the original schema to nullable.",
      ).optional(),
      scriptOptions: z.object({
        keyResultStatement: z.enum([
          "KEY_RESULT_STATEMENT_KIND_UNSPECIFIED",
          "LAST",
          "FIRST_SELECT",
        ]).describe(
          'Determines which statement in the script represents the "key result", used to populate the schema and query results of the script job. Default is LAST.',
        ).optional(),
        statementByteBudget: z.string().describe(
          "Limit on the number of bytes billed per statement. Exceeding this budget results in an error.",
        ).optional(),
        statementTimeoutMs: z.string().describe(
          "Timeout period for each statement in a script.",
        ).optional(),
      }).describe("Options related to script execution.").optional(),
      systemVariables: z.object({
        types: z.record(
          z.string(),
          z.object({
            arrayElementType: z.string().describe(
              "Circular reference to StandardSqlDataType",
            ).optional(),
            rangeElementType: z.string().describe(
              "Circular reference to StandardSqlDataType",
            ).optional(),
            structType: z.object({
              fields: z.array(z.object({
                name: z.string().describe(
                  "Optional. The name of this field. Can be absent for struct fields.",
                ).optional(),
                type: z.string().describe(
                  "Circular reference to StandardSqlDataType",
                ).optional(),
              })).describe("Fields within the struct.").optional(),
            }).describe("The representation of a SQL STRUCT type.").optional(),
            typeKind: z.enum([
              "TYPE_KIND_UNSPECIFIED",
              "INT64",
              "BOOL",
              "FLOAT64",
              "STRING",
              "BYTES",
              "TIMESTAMP",
              "DATE",
              "TIME",
              "DATETIME",
              "INTERVAL",
              "GEOGRAPHY",
              "NUMERIC",
              "BIGNUMERIC",
              "JSON",
              "ARRAY",
              "STRUCT",
              "RANGE",
            ]).describe(
              'Required. The top level type of this field. Can be any GoogleSQL data type (e.g., "INT64", "DATE", "ARRAY").',
            ).optional(),
          }),
        ).describe("Output only. Data type for each system variable.")
          .optional(),
        values: z.record(z.string(), z.string()).describe(
          "Output only. Value for each system variable.",
        ).optional(),
      }).describe("System variables given to a query.").optional(),
      tableDefinitions: z.record(
        z.string(),
        z.object({
          autodetect: z.boolean().describe(
            "Try to detect schema and format options automatically. Any option specified explicitly will be honored.",
          ).optional(),
          avroOptions: z.object({
            useAvroLogicalTypes: z.boolean().describe(
              'Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER).',
            ).optional(),
          }).describe("Options for external data sources.").optional(),
          bigtableOptions: z.object({
            columnFamilies: z.array(z.object({
              columns: z.array(z.object({
                encoding: z.string().describe(
                  "Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. 'encoding' can also be set at the column family level. However, the setting at this level takes precedence if 'encoding' is set at both levels.",
                ).optional(),
                fieldName: z.string().describe(
                  "Optional. If the qualifier is not a valid BigQuery field identifier i.e. does not match a-zA-Z*, a valid identifier must be provided as the column field name and is used as field name in queries.",
                ).optional(),
                onlyReadLatest: z.boolean().describe(
                  "Optional. If this is set, only the latest version of value in this column are exposed. 'onlyReadLatest' can also be set at the column family level. However, the setting at this level takes precedence if 'onlyReadLatest' is set at both levels.",
                ).optional(),
                protoConfig: z.object({
                  protoMessageName: z.string().describe(
                    'Optional. The fully qualified proto message name of the protobuf. In the format of "foo.bar.Message".',
                  ).optional(),
                  schemaBundleId: z.string().describe(
                    "Optional. The ID of the Bigtable SchemaBundle resource associated with this protobuf. The ID should be referred to within the parent table, e.g., `foo` rather than `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/foo`. See [more details on Bigtable SchemaBundles](https://docs.cloud.google.com/bigtable/docs/create-manage-protobuf-schemas).",
                  ).optional(),
                }).describe(
                  "Information related to a Bigtable protobuf column.",
                ).optional(),
                qualifierEncoded: z.string().describe(
                  "[Required] Qualifier of the column. Columns in the parent column family that has this exact qualifier are exposed as `.` field. If the qualifier is valid UTF-8 string, it can be specified in the qualifier_string field. Otherwise, a base-64 encoded value must be set to qualifier_encoded. The column field name is the same as the column qualifier. However, if the qualifier is not a valid BigQuery field identifier i.e. does not match a-zA-Z*, a valid identifier must be provided as field_name.",
                ).optional(),
                qualifierString: z.string().describe("Qualifier string.")
                  .optional(),
                type: z.string().describe(
                  "Optional. The type to convert the value in cells of this column. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): * BYTES * STRING * INTEGER * FLOAT * BOOLEAN * JSON Default type is BYTES. 'type' can also be set at the column family level. However, the setting at this level takes precedence if 'type' is set at both levels.",
                ).optional(),
              })).describe(
                "Optional. Lists of columns that should be exposed as individual fields as opposed to a list of (column name, value) pairs. All columns whose qualifier matches a qualifier in this list can be accessed as `.`. Other columns can be accessed as a list through the `.Column` field.",
              ).optional(),
              encoding: z.string().describe(
                "Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. This can be overridden for a specific column by listing that column in 'columns' and specifying an encoding for it.",
              ).optional(),
              familyId: z.string().describe("Identifier of the column family.")
                .optional(),
              onlyReadLatest: z.boolean().describe(
                "Optional. If this is set only the latest version of value are exposed for all columns in this column family. This can be overridden for a specific column by listing that column in 'columns' and specifying a different setting for that column.",
              ).optional(),
              protoConfig: z.object({
                protoMessageName: z.string().describe(
                  'Optional. The fully qualified proto message name of the protobuf. In the format of "foo.bar.Message".',
                ).optional(),
                schemaBundleId: z.string().describe(
                  "Optional. The ID of the Bigtable SchemaBundle resource associated with this protobuf. The ID should be referred to within the parent table, e.g., `foo` rather than `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/foo`. See [more details on Bigtable SchemaBundles](https://docs.cloud.google.com/bigtable/docs/create-manage-protobuf-schemas).",
                ).optional(),
              }).describe("Information related to a Bigtable protobuf column.")
                .optional(),
              type: z.string().describe(
                "Optional. The type to convert the value in cells of this column family. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): * BYTES * STRING * INTEGER * FLOAT * BOOLEAN * JSON Default type is BYTES. This can be overridden for a specific column by listing that column in 'columns' and specifying a type for it.",
              ).optional(),
            })).describe(
              "Optional. List of column families to expose in the table schema along with their types. This list restricts the column families that can be referenced in queries and specifies their value types. You can use this list to do type conversions - see the 'type' field for more details. If you leave this list empty, all column families are present in the table schema and their values are read as BYTES. During a query only the column families referenced in that query are read from Bigtable.",
            ).optional(),
            ignoreUnspecifiedColumnFamilies: z.boolean().describe(
              "Optional. If field is true, then the column families that are not specified in columnFamilies list are not exposed in the table schema. Otherwise, they are read with BYTES type values. The default value is false.",
            ).optional(),
            outputColumnFamiliesAsJson: z.boolean().describe(
              "Optional. If field is true, then each column family will be read as a single JSON column. Otherwise they are read as a repeated cell structure containing timestamp/value tuples. The default value is false.",
            ).optional(),
            readRowkeyAsString: z.boolean().describe(
              "Optional. If field is true, then the rowkey column families will be read and converted to string. Otherwise they are read with BYTES type values and users need to manually cast them with CAST if necessary. The default value is false.",
            ).optional(),
          }).describe("Options specific to Google Cloud Bigtable data sources.")
            .optional(),
          compression: z.string().describe(
            "Optional. The compression type of the data source. Possible values include GZIP and NONE. The default value is NONE. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats. An empty string is an invalid value.",
          ).optional(),
          connectionId: z.string().describe(
            "Optional. The connection specifying the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or S3. The connection_id can have the form `{project_id}.{location_id};{connection_id}` or `projects/{project_id}/locations/{location_id}/connections/{connection_id}`.",
          ).optional(),
          csvOptions: z.object({
            allowJaggedRows: z.boolean().describe(
              "Optional. Indicates if BigQuery should accept rows that are missing trailing optional columns. If true, BigQuery treats missing trailing columns as null values. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false.",
            ).optional(),
            allowQuotedNewlines: z.boolean().describe(
              "Optional. Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false.",
            ).optional(),
            encoding: z.string().describe(
              "Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the quote and fieldDelimiter properties.",
            ).optional(),
            fieldDelimiter: z.string().describe(
              'Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C).',
            ).optional(),
            nullMarker: z.string().describe(
              'Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\\N", BigQuery interprets "\\N" as a null value when querying a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value.',
            ).optional(),
            nullMarkers: z.array(z.string()).describe(
              "Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types.",
            ).optional(),
            preserveAsciiControlCharacters: z.boolean().describe(
              "Optional. Indicates if the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\\x00' to '\\x1F') are preserved.",
            ).optional(),
            quote: z.string().regex(new RegExp(".?")).describe(
              "Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote (\"). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' \" ', use ' \"\" '.",
            ).optional(),
            skipLeadingRows: z.string().describe(
              "Optional. The number of rows at the top of a CSV file that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
            ).optional(),
            sourceColumnMatch: z.string().describe(
              "Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible. Acceptable values are: POSITION - matches by position. This assumes that the columns are ordered the same way as the schema. NAME - matches by name. This reads the header row as column names and reorders columns to match the field names in the schema.",
            ).optional(),
          }).describe("Information related to a CSV data source.").optional(),
          dateFormat: z.string().describe(
            "Optional. Format used to parse DATE values. Supports C-style and SQL-style values.",
          ).optional(),
          datetimeFormat: z.string().describe(
            "Optional. Format used to parse DATETIME values. Supports C-style and SQL-style values.",
          ).optional(),
          decimalTargetTypes: z.array(
            z.enum([
              "DECIMAL_TARGET_TYPE_UNSPECIFIED",
              "NUMERIC",
              "BIGNUMERIC",
              "STRING",
            ]),
          ).describe(
            'Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: * (38,9) -> NUMERIC; * (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); * (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); * (76,38) -> BIGNUMERIC; * (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats.',
          ).optional(),
          fileSetSpecType: z.enum([
            "FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH",
            "FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST",
          ]).describe(
            "Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default source URIs are expanded against the underlying storage. Other options include specifying manifest files. Only applicable to object storage systems.",
          ).optional(),
          googleSheetsOptions: z.object({
            range: z.string().describe(
              "Optional. Range of a sheet to query from. Only used when non-empty. Typical format: sheet_name!top_left_cell_id:bottom_right_cell_id For example: sheet1!A1:B20",
            ).optional(),
            skipLeadingRows: z.string().describe(
              "Optional. The number of rows at the top of a sheet that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.",
            ).optional(),
          }).describe("Options specific to Google Sheets data sources.")
            .optional(),
          hivePartitioningOptions: z.object({
            fields: z.array(z.string()).describe(
              "Output only. For permanent external tables, this field is populated with the hive partition keys in the order they were inferred. The types of the partition keys can be deduced by checking the table schema (which will include the partition keys). Not every API will populate this field in the output. For example, Tables.Get will populate it, but Tables.List will not contain this field.",
            ).optional(),
            mode: z.string().describe(
              "Optional. When set, what mode of hive partitioning to use when reading data. The following modes are supported: * AUTO: automatically infer partition key name(s) and type(s). * STRINGS: automatically infer partition key name(s). All types are strings. * CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported formats are: JSON, CSV, ORC, Avro and Parquet.",
            ).optional(),
            requirePartitionFilter: z.boolean().describe(
              "Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with require_partition_filter explicitly set to true will fail.",
            ).optional(),
            sourceUriPrefix: z.string().describe(
              "Optional. When hive partition detection is requested, a common prefix for all source uris must be required. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout: gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/. CUSTOM detection requires encoding the partitioning schema immediately after the common prefix. For CUSTOM, any of * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING} would all be valid source URI prefixes.",
            ).optional(),
          }).describe("Options for configuring hive partitioning detect.")
            .optional(),
          ignoreUnknownValues: z.boolean().describe(
            "Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names Google Cloud Bigtable: This setting is ignored. Google Cloud Datastore backups: This setting is ignored. Avro: This setting is ignored. ORC: This setting is ignored. Parquet: This setting is ignored.",
          ).optional(),
          jsonExtension: z.enum(["JSON_EXTENSION_UNSPECIFIED", "GEOJSON"])
            .describe(
              "Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON).",
            ).optional(),
          jsonOptions: z.object({
            encoding: z.string().describe(
              "Optional. The character encoding of the data. The supported values are UTF-8, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8.",
            ).optional(),
          }).describe("Json Options for load and make external tables.")
            .optional(),
          maxBadRecords: z.number().int().describe(
            "Optional. The maximum number of bad records that BigQuery can ignore when reading data. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats.",
          ).optional(),
          metadataCacheMode: z.enum([
            "METADATA_CACHE_MODE_UNSPECIFIED",
            "AUTOMATIC",
            "MANUAL",
          ]).describe(
            "Optional. Metadata Cache Mode for the table. Set this to enable caching of metadata from external data source.",
          ).optional(),
          objectMetadata: z.enum([
            "OBJECT_METADATA_UNSPECIFIED",
            "DIRECTORY",
            "SIMPLE",
          ]).describe(
            "Optional. ObjectMetadata is used to create Object Tables. Object Tables contain a listing of objects (with their metadata) found at the source_uris. If ObjectMetadata is set, source_format should be omitted. Currently SIMPLE is the only supported Object Metadata type.",
          ).optional(),
          parquetOptions: z.object({
            enableListInference: z.boolean().describe(
              "Optional. Indicates whether to use schema inference specifically for Parquet LIST logical type.",
            ).optional(),
            enumAsString: z.boolean().describe(
              "Optional. Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default.",
            ).optional(),
            mapTargetType: z.enum([
              "MAP_TARGET_TYPE_UNSPECIFIED",
              "ARRAY_OF_STRUCT",
            ]).describe(
              "Optional. Indicates how to represent a Parquet map if present.",
            ).optional(),
          }).describe("Parquet Options for load and make external tables.")
            .optional(),
          referenceFileSchemaUri: z.string().describe(
            "Optional. When creating an external table, the user can provide a reference file with the table schema. This is enabled for the following formats: AVRO, PARQUET, ORC.",
          ).optional(),
          schema: z.object({
            fields: z.array(z.object({
              categories: z.object({
                names: z.array(z.string()).describe("Deprecated.").optional(),
              }).describe("Deprecated.").optional(),
              collation: z.string().describe(
                "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
              ).optional(),
              dataPolicies: z.array(z.object({
                name: z.string().describe(
                  "Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id.",
                ).optional(),
              })).describe(
                "Optional. Data policies attached to this field, used for field-level access control.",
              ).optional(),
              defaultValueExpression: z.string().describe(
                "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
              ).optional(),
              description: z.string().describe(
                "Optional. The field description. The maximum length is 1,024 characters.",
              ).optional(),
              fields: z.array(z.string()).describe(
                "Optional. Describes the nested schema fields if the type property is set to RECORD.",
              ).optional(),
              foreignTypeDefinition: z.string().describe(
                "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
              ).optional(),
              generatedColumn: z.object({
                generatedExpressionInfo: z.object({
                  asynchronous: z.boolean().describe(
                    "Optional. Whether the column generation is done asynchronously.",
                  ).optional(),
                  generationExpression: z.string().describe(
                    "Optional. The generation expression (e.g. AI.EMBED(...)) used to generated the field.",
                  ).optional(),
                  stored: z.boolean().describe(
                    "Optional. Whether the generated column is stored in the table.",
                  ).optional(),
                }).describe(
                  "Definition of the expression used to generate the field.",
                ).optional(),
                generatedMode: z.enum([
                  "GENERATED_MODE_UNSPECIFIED",
                  "GENERATED_ALWAYS",
                  "GENERATED_BY_DEFAULT",
                ]).describe(
                  "Optional. Dictates when system generated values are used to populate the field.",
                ).optional(),
              }).describe(
                "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
              ).optional(),
              maxLength: z.string().describe(
                'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
              ).optional(),
              mode: z.string().describe(
                "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
              ).optional(),
              name: z.string().describe(
                "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
              ).optional(),
              policyTags: z.object({
                names: z.array(z.string()).describe(
                  'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
                ).optional(),
              }).describe(
                "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
              ).optional(),
              precision: z.string().describe(
                'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
              ).optional(),
              rangeElementType: z.object({
                type: z.string().describe(
                  "Required. The type of a field element. For more information, see TableFieldSchema.type.",
                ).optional(),
              }).describe("Represents the type of a field element.").optional(),
              roundingMode: z.enum([
                "ROUNDING_MODE_UNSPECIFIED",
                "ROUND_HALF_AWAY_FROM_ZERO",
                "ROUND_HALF_EVEN",
              ]).describe(
                "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
              ).optional(),
              scale: z.string().describe(
                "Optional. See documentation for precision.",
              ).optional(),
              timestampPrecision: z.string().describe(
                "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
              ).optional(),
              type: z.string().describe(
                "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
              ).optional(),
            })).describe("Describes the fields in a table.").optional(),
            foreignTypeInfo: z.object({
              typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
                "Required. Specifies the system which defines the foreign data type.",
              ).optional(),
            }).describe(
              "Metadata about the foreign data type definition such as the system in which the type is defined.",
            ).optional(),
          }).describe("Schema of a table").optional(),
          sourceFormat: z.string().describe(
            '[Required] The data format. For CSV files, specify "CSV". For Google sheets, specify "GOOGLE_SHEETS". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro files, specify "AVRO". For Google Cloud Datastore backups, specify "DATASTORE_BACKUP". For Apache Iceberg tables, specify "ICEBERG". For ORC files, specify "ORC". For Parquet files, specify "PARQUET". [Beta] For Google Cloud Bigtable, specify "BIGTABLE".',
          ).optional(),
          sourceUris: z.array(z.string()).describe(
            "[Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups, exactly one URI can be specified. Also, the '*' wildcard character is not allowed.",
          ).optional(),
          timeFormat: z.string().describe(
            "Optional. Format used to parse TIME values. Supports C-style and SQL-style values.",
          ).optional(),
          timeZone: z.string().describe(
            "Optional. Time zone used when parsing timestamp values that do not have specific time zone information (e.g. 2024-04-20 12:34:56). The expected format is a IANA timezone string (e.g. America/Los_Angeles).",
          ).optional(),
          timestampFormat: z.string().describe(
            "Optional. Format used to parse TIMESTAMP values. Supports C-style and SQL-style values.",
          ).optional(),
          timestampTargetPrecision: z.array(z.number().int()).describe(
            "Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV, PARQUET, and AVRO. Possible values include: Not Specified, [], or [6]: timestamp(6) for all auto detected TIMESTAMP columns [6, 12]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. [12]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated.",
          ).optional(),
        }),
      ).describe(
        "Optional. You can specify external table definitions, which operate as ephemeral tables that can be queried. These definitions are configured using a JSON map, where the string key represents the table identifier, and the value is the corresponding external data configuration object.",
      ).optional(),
      timePartitioning: z.object({
        expirationMs: z.string().describe(
          "Optional. Number of milliseconds for which to keep the storage for a partition. A wrapper is used here because 0 is an invalid value.",
        ).optional(),
        field: z.string().describe(
          "Optional. If not set, the table is partitioned by pseudo column '_PARTITIONTIME'; if set, the table is partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED. A wrapper is used here because an empty string is an invalid value.",
        ).optional(),
        requirePartitionFilter: z.boolean().describe(
          "If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. This field is deprecated; please set the field with the same name on the table itself instead. This field needs a wrapper because we want to output the default value, false, if the user explicitly set it.",
        ).optional(),
        type: z.string().describe(
          "Required. The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively.",
        ).optional(),
      }).optional(),
      useLegacySql: z.boolean().describe(
        "Optional. Specifies whether to use BigQuery's legacy SQL dialect for this query. The default value is true. If set to false, the query uses BigQuery's [GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql). When useLegacySql is set to false, the value of flattenResults is ignored; query will be run as if flattenResults is false.",
      ).optional(),
      useQueryCache: z.boolean().describe(
        "Optional. Whether to look for the result in the query cache. The query cache is a best-effort cache that will be flushed whenever tables in the query are modified. Moreover, the query cache is only available when a query does not have a destination table specified. The default value is true.",
      ).optional(),
      userDefinedFunctionResources: z.array(z.object({
        inlineCode: z.string().describe(
          "[Pick one] An inline resource that contains code for a user-defined function (UDF). Providing a inline code resource is equivalent to providing a URI for a file containing the same code.",
        ).optional(),
        resourceUri: z.string().describe(
          "[Pick one] A code resource to load from a Google Cloud Storage URI (gs://bucket/path).",
        ).optional(),
      })).describe(
        "Describes user-defined function resources used in the query.",
      ).optional(),
      writeDisposition: z.string().describe(
        "Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the data, removes the constraints, and uses the schema from the query result. * WRITE_TRUNCATE_DATA: If the table already exists, BigQuery overwrites the data, but keeps the constraints and schema of the existing table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion.",
      ).optional(),
      writeIncrementalResults: z.boolean().describe(
        "Optional. This is only supported for a SELECT query using a temporary table. If set, the query is allowed to write results incrementally to the temporary result table. This may incur a performance penalty. This option cannot be used with Legacy SQL. This feature is not yet available.",
      ).optional(),
    }).describe("JobConfigurationQuery configures a BigQuery query job.")
      .optional(),
    reservation: z.string().describe(
      "Optional. The reservation that job would use. User can specify a reservation to execute the job. If reservation is not set, reservation is determined based on the rules defined by the reservation assignments. The expected format is `projects/{project}/locations/{location}/reservations/{reservation}`.",
    ).optional(),
  }).optional(),
  jobCreationReason: z.object({
    code: z.enum([
      "CODE_UNSPECIFIED",
      "REQUESTED",
      "LONG_RUNNING",
      "LARGE_RESULTS",
      "OTHER",
    ]).describe(
      "Output only. Specifies the high level reason why a Job was created.",
    ).optional(),
  }).describe(
    "Reason about why a Job was created from a [`jobs.query`](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query) method when used with `JOB_CREATION_OPTIONAL` Job creation mode. For [`jobs.insert`](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/insert) method calls it will always be `REQUESTED`.",
  ).optional(),
  jobReference: z.object({
    jobId: z.string().describe(
      "Required. The ID of the job. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-). The maximum length is 1,024 characters.",
    ).optional(),
    location: z.string().describe(
      "Optional. The geographic location of the job. The default value is US. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations",
    ).optional(),
    projectId: z.string().describe(
      "Required. The ID of the project containing this job.",
    ).optional(),
  }).describe(
    "A job reference is a fully qualified identifier for referring to a job.",
  ).optional(),
  statistics: z.object({
    completionRatio: z.number().describe(
      "Output only. [TrustedTester] Job progress (0.0 -> 1.0) for LOAD and EXTRACT jobs.",
    ).optional(),
    copy: z.object({
      copiedLogicalBytes: z.string().describe(
        "Output only. Number of logical bytes copied to the destination table.",
      ).optional(),
      copiedRows: z.string().describe(
        "Output only. Number of rows copied to the destination table.",
      ).optional(),
    }).describe("Statistics for a copy job.").optional(),
    creationTime: z.string().describe(
      "Output only. Creation time of this job, in milliseconds since the epoch. This field will be present on all jobs.",
    ).optional(),
    dataMaskingStatistics: z.object({
      dataMaskingApplied: z.boolean().describe(
        "Whether any accessed data was protected by the data masking.",
      ).optional(),
    }).describe("Statistics for data-masking.").optional(),
    edition: z.enum([
      "RESERVATION_EDITION_UNSPECIFIED",
      "STANDARD",
      "ENTERPRISE",
      "ENTERPRISE_PLUS",
    ]).describe(
      "Output only. Name of edition corresponding to the reservation for this job at the time of this update.",
    ).optional(),
    endTime: z.string().describe(
      "Output only. End time of this job, in milliseconds since the epoch. This field will be present whenever a job is in the DONE state.",
    ).optional(),
    extract: z.object({
      destinationUriFileCounts: z.array(z.string()).describe(
        "Output only. Number of files per destination URI or URI pattern specified in the extract configuration. These values will be in the same order as the URIs specified in the 'destinationUris' field.",
      ).optional(),
      inputBytes: z.string().describe(
        "Output only. Number of user bytes extracted into the result. This is the byte count as computed by BigQuery for billing purposes and doesn't have any relationship with the number of actual result bytes extracted in the desired format.",
      ).optional(),
      timeline: z.array(z.object({
        activeUnits: z.string().describe(
          "Total number of active workers. This does not correspond directly to slot usage. This is the largest value observed since the last sample.",
        ).optional(),
        completedUnits: z.string().describe(
          "Total parallel units of work completed by this query.",
        ).optional(),
        elapsedMs: z.string().describe(
          "Milliseconds elapsed since the start of query execution.",
        ).optional(),
        estimatedRunnableUnits: z.string().describe(
          "Units of work that can be scheduled immediately. Providing additional slots for these units of work will accelerate the query, if no other query in the reservation needs additional slots.",
        ).optional(),
        pendingUnits: z.string().describe(
          "Total units of work remaining for the query. This number can be revised (increased or decreased) while the query is running.",
        ).optional(),
        shuffleRamUsageRatio: z.number().describe(
          "Total shuffle usage ratio in shuffle RAM per reservation of this query. This will be provided for reservation customers only.",
        ).optional(),
        totalSlotMs: z.string().describe(
          "Cumulative slot-ms consumed by the query.",
        ).optional(),
      })).describe("Output only. Describes a timeline of job execution.")
        .optional(),
    }).describe("Statistics for an extract job.").optional(),
    finalExecutionDurationMs: z.string().describe(
      "Output only. The duration in milliseconds of the execution of the final attempt of this job, as BigQuery may internally re-attempt to execute the job.",
    ).optional(),
    load: z.object({
      badRecords: z.string().describe(
        "Output only. The number of bad records encountered. Note that if the job has failed because of more bad records encountered than the maximum allowed in the load job configuration, then this number can be less than the total number of bad records present in the input data.",
      ).optional(),
      inputFileBytes: z.string().describe(
        "Output only. Number of bytes of source data in a load job.",
      ).optional(),
      inputFiles: z.string().describe(
        "Output only. Number of source files in a load job.",
      ).optional(),
      outputBytes: z.string().describe(
        "Output only. Size of the loaded data in bytes. Note that while a load job is in the running state, this value may change.",
      ).optional(),
      outputRows: z.string().describe(
        "Output only. Number of rows imported in a load job. Note that while an import job is in the running state, this value may change.",
      ).optional(),
      timeline: z.array(z.object({
        activeUnits: z.string().describe(
          "Total number of active workers. This does not correspond directly to slot usage. This is the largest value observed since the last sample.",
        ).optional(),
        completedUnits: z.string().describe(
          "Total parallel units of work completed by this query.",
        ).optional(),
        elapsedMs: z.string().describe(
          "Milliseconds elapsed since the start of query execution.",
        ).optional(),
        estimatedRunnableUnits: z.string().describe(
          "Units of work that can be scheduled immediately. Providing additional slots for these units of work will accelerate the query, if no other query in the reservation needs additional slots.",
        ).optional(),
        pendingUnits: z.string().describe(
          "Total units of work remaining for the query. This number can be revised (increased or decreased) while the query is running.",
        ).optional(),
        shuffleRamUsageRatio: z.number().describe(
          "Total shuffle usage ratio in shuffle RAM per reservation of this query. This will be provided for reservation customers only.",
        ).optional(),
        totalSlotMs: z.string().describe(
          "Cumulative slot-ms consumed by the query.",
        ).optional(),
      })).describe("Output only. Describes a timeline of job execution.")
        .optional(),
    }).describe("Statistics for a load job.").optional(),
    numChildJobs: z.string().describe(
      "Output only. Number of child jobs executed.",
    ).optional(),
    parentJobId: z.string().describe(
      "Output only. If this is a child job, specifies the job ID of the parent.",
    ).optional(),
    query: z.object({
      biEngineStatistics: z.object({
        accelerationMode: z.enum([
          "BI_ENGINE_ACCELERATION_MODE_UNSPECIFIED",
          "BI_ENGINE_DISABLED",
          "PARTIAL_INPUT",
          "FULL_INPUT",
          "FULL_QUERY",
        ]).describe(
          "Output only. Specifies which mode of BI Engine acceleration was performed (if any).",
        ).optional(),
        biEngineMode: z.enum([
          "ACCELERATION_MODE_UNSPECIFIED",
          "DISABLED",
          "PARTIAL",
          "FULL",
        ]).describe(
          "Output only. Specifies which mode of BI Engine acceleration was performed (if any).",
        ).optional(),
        biEngineReasons: z.array(z.object({
          code: z.enum([
            "CODE_UNSPECIFIED",
            "NO_RESERVATION",
            "INSUFFICIENT_RESERVATION",
            "UNSUPPORTED_SQL_TEXT",
            "INPUT_TOO_LARGE",
            "OTHER_REASON",
            "TABLE_EXCLUDED",
          ]).describe(
            "Output only. High-level BI Engine reason for partial or disabled acceleration",
          ).optional(),
          message: z.string().describe(
            "Output only. Free form human-readable reason for partial or disabled acceleration.",
          ).optional(),
        })).describe(
          "In case of DISABLED or PARTIAL bi_engine_mode, these contain the explanatory reasons as to why BI Engine could not accelerate. In case the full query was accelerated, this field is not populated.",
        ).optional(),
      }).describe(
        "Statistics for a BI Engine specific query. Populated as part of JobStatistics2",
      ).optional(),
      billingTier: z.number().int().describe(
        'Output only. Billing tier for the job. This is a BigQuery-specific concept which is not related to the Google Cloud notion of "free tier". The value here is a measure of the query\'s resource consumption relative to the amount of data scanned. For on-demand queries, the limit is 100, and all queries within this limit are billed at the standard on-demand rates. On-demand queries that exceed this limit will fail with a billingTierLimitExceeded error.',
      ).optional(),
      cacheHit: z.boolean().describe(
        "Output only. Whether the query result was fetched from the query cache.",
      ).optional(),
      dclTargetDataset: z.object({
        datasetId: z.string().describe(
          "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. The ID of the project containing this dataset.",
        ).optional(),
      }).describe("Identifier for a dataset.").optional(),
      dclTargetTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      dclTargetView: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      ddlAffectedRowAccessPolicyCount: z.string().describe(
        "Output only. The number of row access policies affected by a DDL statement. Present only for DROP ALL ROW ACCESS POLICIES queries.",
      ).optional(),
      ddlDestinationTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      ddlOperationPerformed: z.string().describe(
        "Output only. The DDL operation performed, possibly dependent on the pre-existence of the DDL target.",
      ).optional(),
      ddlTargetDataset: z.object({
        datasetId: z.string().describe(
          "Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Optional. The ID of the project containing this dataset.",
        ).optional(),
      }).describe("Identifier for a dataset.").optional(),
      ddlTargetRoutine: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this routine.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this routine.",
        ).optional(),
        routineId: z.string().describe(
          "Required. The ID of the routine. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
        ).optional(),
      }).describe("Id path of a routine.").optional(),
      ddlTargetRowAccessPolicy: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this row access policy.",
        ).optional(),
        policyId: z.string().describe(
          "Required. The ID of the row access policy. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this row access policy.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table containing this row access policy.",
        ).optional(),
      }).describe("Id path of a row access policy.").optional(),
      ddlTargetTable: z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      }).optional(),
      dmlStats: z.object({
        deletedRowCount: z.string().describe(
          "Output only. Number of deleted Rows. populated by DML DELETE, MERGE and TRUNCATE statements.",
        ).optional(),
        dmlMode: z.enum([
          "DML_MODE_UNSPECIFIED",
          "COARSE_GRAINED_DML",
          "FINE_GRAINED_DML",
        ]).describe("Output only. DML mode used.").optional(),
        fineGrainedDmlUnusedReason: z.enum([
          "FINE_GRAINED_DML_UNUSED_REASON_UNSPECIFIED",
          "MAX_PARTITION_SIZE_EXCEEDED",
          "TABLE_NOT_ENROLLED",
          "DML_IN_MULTI_STATEMENT_TRANSACTION",
        ]).describe(
          "Output only. Reason for disabling fine-grained DML if applicable.",
        ).optional(),
        insertedRowCount: z.string().describe(
          "Output only. Number of inserted Rows. Populated by DML INSERT and MERGE statements",
        ).optional(),
        updatedRowCount: z.string().describe(
          "Output only. Number of updated Rows. Populated by DML UPDATE and MERGE statements.",
        ).optional(),
      }).describe("Detailed statistics for DML statements").optional(),
      estimatedBytesProcessed: z.string().describe(
        "Output only. The original estimate of bytes processed for the job.",
      ).optional(),
      exportDataStatistics: z.object({
        fileCount: z.string().describe(
          "Number of destination files generated in case of EXPORT DATA statement only.",
        ).optional(),
        rowCount: z.string().describe(
          "[Alpha] Number of destination rows generated in case of EXPORT DATA statement only.",
        ).optional(),
      }).describe(
        "Statistics for the EXPORT DATA statement as part of Query Job. EXTRACT JOB statistics are populated in JobStatistics4.",
      ).optional(),
      externalServiceCosts: z.array(z.object({
        billingMethod: z.string().describe(
          "The billing method used for the external job. This field, set to `SERVICES_SKU`, is only used when billing under the services SKU. Otherwise, it is unspecified for backward compatibility.",
        ).optional(),
        bytesBilled: z.string().describe(
          "External service cost in terms of bigquery bytes billed.",
        ).optional(),
        bytesProcessed: z.string().describe(
          "External service cost in terms of bigquery bytes processed.",
        ).optional(),
        externalService: z.string().describe("External service name.")
          .optional(),
        reservedSlotCount: z.string().describe(
          "Non-preemptable reserved slots used for external job. For example, reserved slots for Cloua AI Platform job are the VM usages converted to BigQuery slot with equivalent mount of price.",
        ).optional(),
        slotMs: z.string().describe(
          "External service cost in terms of bigquery slot milliseconds.",
        ).optional(),
      })).describe(
        "Output only. Job cost breakdown as bigquery internal cost and external service costs.",
      ).optional(),
      genAiStats: z.object({
        errorStats: z.object({
          errors: z.array(z.string()).describe(
            "A list of unique errors at query level (up to 5, truncated to 100 chars)",
          ).optional(),
        }).describe(
          "Provides error statistics for the query job across all AI function calls.",
        ).optional(),
        functionStats: z.array(z.object({
          costOptimizationStats: z.object({
            message: z.string().describe(
              "System generated message to provide insights into cost optimization state.",
            ).optional(),
            numCostOptimizedRows: z.string().describe(
              "Number of rows inferred via cost optimized workflow.",
            ).optional(),
          }).describe(
            "Provides cost optimization statistics for a GenAi function call.",
          ).optional(),
          errorStats: z.object({
            errors: z.array(z.string()).describe(
              "A list of unique errors at function level (up to 5, truncated to 100 chars).",
            ).optional(),
            numFailedRows: z.string().describe(
              "Number of failed rows processed by the function",
            ).optional(),
          }).describe("Provides error statistics for a GenAi function call.")
            .optional(),
          functionName: z.string().describe("Name of the function.").optional(),
          numProcessedRows: z.string().describe(
            "Number of rows processed by this GenAi function. This includes all cost_optimized, llm_inferred and failed_rows.",
          ).optional(),
          prompt: z.string().describe(
            "User input prompt of the function (truncated to 20 chars).",
          ).optional(),
        })).describe(
          "Function level stats for GenAi Functions. See https://docs.cloud.google.com/bigquery/docs/generative-ai-overview",
        ).optional(),
      }).describe("GenAi stats for the query job.").optional(),
      incrementalResultStats: z.object({
        disabledReason: z.enum([
          "DISABLED_REASON_UNSPECIFIED",
          "OTHER",
          "UNSUPPORTED_OPERATOR",
        ]).describe(
          "Output only. Reason why incremental query results are/were not written by the query.",
        ).optional(),
        disabledReasonDetails: z.string().describe(
          "Output only. Additional human-readable clarification, if available, for DisabledReason.",
        ).optional(),
        firstIncrementalRowTime: z.string().describe(
          "Output only. The time at which the first incremental result was written. If the query needed to restart internally, this only describes the final attempt.",
        ).optional(),
        incrementalRowCount: z.string().describe(
          "Output only. Number of rows that were in the latest result set before query completion.",
        ).optional(),
        lastIncrementalRowTime: z.string().describe(
          "Output only. The time at which the last incremental result was written. Does not include the final result written after query completion.",
        ).optional(),
        resultSetLastModifyTime: z.string().describe(
          "Output only. The time at which the result table's contents were modified. May be absent if no results have been written or the query has completed.",
        ).optional(),
        resultSetLastReplaceTime: z.string().describe(
          "Output only. The time at which the result table's contents were completely replaced. May be absent if no results have been written or the query has completed.",
        ).optional(),
      }).describe(
        "Statistics related to Incremental Query Results. Populated as part of JobStatistics2. This feature is not yet available.",
      ).optional(),
      loadQueryStatistics: z.object({
        badRecords: z.string().describe(
          "Output only. The number of bad records encountered while processing a LOAD query. Note that if the job has failed because of more bad records encountered than the maximum allowed in the load job configuration, then this number can be less than the total number of bad records present in the input data.",
        ).optional(),
        bytesTransferred: z.string().describe(
          "Output only. This field is deprecated. The number of bytes of source data copied over the network for a `LOAD` query. `transferred_bytes` has the canonical value for physical transferred bytes, which is used for BigQuery Omni billing.",
        ).optional(),
        inputFileBytes: z.string().describe(
          "Output only. Number of bytes of source data in a LOAD query.",
        ).optional(),
        inputFiles: z.string().describe(
          "Output only. Number of source files in a LOAD query.",
        ).optional(),
        outputBytes: z.string().describe(
          "Output only. Size of the loaded data in bytes. Note that while a LOAD query is in the running state, this value may change.",
        ).optional(),
        outputRows: z.string().describe(
          "Output only. Number of rows imported in a LOAD query. Note that while a LOAD query is in the running state, this value may change.",
        ).optional(),
      }).describe("Statistics for a LOAD query.").optional(),
      materializedViewStatistics: z.object({
        materializedView: z.array(z.object({
          chosen: z.boolean().describe(
            "Whether the materialized view is chosen for the query. A materialized view can be chosen to rewrite multiple parts of the same query. If a materialized view is chosen to rewrite any part of the query, then this field is true, even if the materialized view was not chosen to rewrite others parts.",
          ).optional(),
          estimatedBytesSaved: z.string().describe(
            "If present, specifies a best-effort estimation of the bytes saved by using the materialized view rather than its base tables.",
          ).optional(),
          rejectedReason: z.enum([
            "REJECTED_REASON_UNSPECIFIED",
            "NO_DATA",
            "COST",
            "BASE_TABLE_TRUNCATED",
            "BASE_TABLE_DATA_CHANGE",
            "BASE_TABLE_PARTITION_EXPIRATION_CHANGE",
            "BASE_TABLE_EXPIRED_PARTITION",
            "BASE_TABLE_INCOMPATIBLE_METADATA_CHANGE",
            "TIME_ZONE",
            "OUT_OF_TIME_TRAVEL_WINDOW",
            "BASE_TABLE_FINE_GRAINED_SECURITY_POLICY",
            "BASE_TABLE_TOO_STALE",
          ]).describe(
            "If present, specifies the reason why the materialized view was not chosen for the query.",
          ).optional(),
          tableReference: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
        })).describe(
          "Materialized views considered for the query job. Only certain materialized views are used. For a detailed list, see the child message. If many materialized views are considered, then the list might be incomplete.",
        ).optional(),
      }).describe("Statistics of materialized views considered in a query job.")
        .optional(),
      metadataCacheStatistics: z.object({
        tableMetadataCacheUsage: z.array(z.object({
          explanation: z.string().describe(
            "Free form human-readable reason metadata caching was unused for the job.",
          ).optional(),
          pruningStats: z.object({
            postCmetaPruningParallelInputCount: z.string().describe(
              "The number of parallel inputs matched.",
            ).optional(),
            postCmetaPruningPartitionCount: z.string().describe(
              "The number of partitions matched.",
            ).optional(),
            preCmetaPruningParallelInputCount: z.string().describe(
              "The number of parallel inputs scanned.",
            ).optional(),
          }).describe("The column metadata index pruning statistics.")
            .optional(),
          staleness: z.string().describe(
            "Duration since last refresh as of this job for managed tables (indicates metadata cache staleness as seen by this job).",
          ).optional(),
          tableReference: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          tableType: z.string().describe(
            "[Table type](https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type).",
          ).optional(),
          unusedReason: z.enum([
            "UNUSED_REASON_UNSPECIFIED",
            "EXCEEDED_MAX_STALENESS",
            "METADATA_CACHING_NOT_ENABLED",
            "OTHER_REASON",
          ]).describe("Reason for not using metadata caching for the table.")
            .optional(),
        })).describe(
          "Set for the Metadata caching eligible tables referenced in the query.",
        ).optional(),
      }).describe("Statistics for metadata caching in queried tables.")
        .optional(),
      mlStatistics: z.object({
        hparamTrials: z.array(z.object({
          endTimeMs: z.string().describe("Ending time of the trial.")
            .optional(),
          errorMessage: z.string().describe(
            "Error message for FAILED and INFEASIBLE trial.",
          ).optional(),
          evalLoss: z.number().describe(
            "Loss computed on the eval data at the end of trial.",
          ).optional(),
          evaluationMetrics: z.object({
            arimaForecastingMetrics: z.object({
              arimaFittingMetrics: z.array(z.object({
                aic: z.number().describe("AIC.").optional(),
                logLikelihood: z.number().describe("Log-likelihood.")
                  .optional(),
                variance: z.number().describe("Variance.").optional(),
              })).describe("Arima model fitting metrics.").optional(),
              arimaSingleModelForecastingMetrics: z.array(z.object({
                arimaFittingMetrics: z.object({
                  aic: z.number().describe("AIC.").optional(),
                  logLikelihood: z.number().describe("Log-likelihood.")
                    .optional(),
                  variance: z.number().describe("Variance.").optional(),
                }).describe("ARIMA model fitting metrics.").optional(),
                hasDrift: z.boolean().describe(
                  "Is arima model fitted with drift or not. It is always false when d is not 1.",
                ).optional(),
                hasHolidayEffect: z.boolean().describe(
                  "If true, holiday_effect is a part of time series decomposition result.",
                ).optional(),
                hasSpikesAndDips: z.boolean().describe(
                  "If true, spikes_and_dips is a part of time series decomposition result.",
                ).optional(),
                hasStepChanges: z.boolean().describe(
                  "If true, step_changes is a part of time series decomposition result.",
                ).optional(),
                nonSeasonalOrder: z.object({
                  d: z.string().describe("Order of the differencing part.")
                    .optional(),
                  p: z.string().describe("Order of the autoregressive part.")
                    .optional(),
                  q: z.string().describe("Order of the moving-average part.")
                    .optional(),
                }).describe(
                  "Arima order, can be used for both non-seasonal and seasonal parts.",
                ).optional(),
                seasonalPeriods: z.array(
                  z.enum([
                    "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                    "NO_SEASONALITY",
                    "DAILY",
                    "WEEKLY",
                    "MONTHLY",
                    "QUARTERLY",
                    "YEARLY",
                    "HOURLY",
                  ]),
                ).describe(
                  "Seasonal periods. Repeated because multiple periods are supported for one time series.",
                ).optional(),
                timeSeriesId: z.string().describe(
                  "The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used.",
                ).optional(),
                timeSeriesIds: z.array(z.string()).describe(
                  "The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns.",
                ).optional(),
              })).describe(
                "Repeated as there can be many metric sets (one for each model) in auto-arima and the large-scale case.",
              ).optional(),
              hasDrift: z.array(z.boolean()).describe(
                "Whether Arima model fitted with drift or not. It is always false when d is not 1.",
              ).optional(),
              nonSeasonalOrder: z.array(z.object({
                d: z.string().describe("Order of the differencing part.")
                  .optional(),
                p: z.string().describe("Order of the autoregressive part.")
                  .optional(),
                q: z.string().describe("Order of the moving-average part.")
                  .optional(),
              })).describe("Non-seasonal order.").optional(),
              seasonalPeriods: z.array(
                z.enum([
                  "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                  "NO_SEASONALITY",
                  "DAILY",
                  "WEEKLY",
                  "MONTHLY",
                  "QUARTERLY",
                  "YEARLY",
                  "HOURLY",
                ]),
              ).describe(
                "Seasonal periods. Repeated because multiple periods are supported for one time series.",
              ).optional(),
              timeSeriesId: z.array(z.string()).describe(
                "Id to differentiate different time series for the large-scale case.",
              ).optional(),
            }).describe(
              "Model evaluation metrics for ARIMA forecasting models.",
            ).optional(),
            binaryClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number().describe(
                  "Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric.",
                ).optional(),
                f1Score: z.number().describe(
                  "The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric.",
                ).optional(),
                logLoss: z.number().describe(
                  "Logarithmic Loss. For multiclass this is a macro-averaged metric.",
                ).optional(),
                precision: z.number().describe(
                  "Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier.",
                ).optional(),
                recall: z.number().describe(
                  "Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric.",
                ).optional(),
                rocAuc: z.number().describe(
                  "Area Under a ROC Curve. For multiclass this is a macro-averaged metric.",
                ).optional(),
                threshold: z.number().describe(
                  "Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold.",
                ).optional(),
              }).describe(
                "Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.",
              ).optional(),
              binaryConfusionMatrixList: z.array(z.object({
                accuracy: z.number().describe(
                  "The fraction of predictions given the correct label.",
                ).optional(),
                f1Score: z.number().describe(
                  "The equally weighted average of recall and precision.",
                ).optional(),
                falseNegatives: z.string().describe(
                  "Number of false samples predicted as false.",
                ).optional(),
                falsePositives: z.string().describe(
                  "Number of false samples predicted as true.",
                ).optional(),
                positiveClassThreshold: z.number().describe(
                  "Threshold value used when computing each of the following metric.",
                ).optional(),
                precision: z.number().describe(
                  "The fraction of actual positive predictions that had positive actual labels.",
                ).optional(),
                recall: z.number().describe(
                  "The fraction of actual positive labels that were given a positive prediction.",
                ).optional(),
                trueNegatives: z.string().describe(
                  "Number of true samples predicted as false.",
                ).optional(),
                truePositives: z.string().describe(
                  "Number of true samples predicted as true.",
                ).optional(),
              })).describe("Binary confusion matrix at multiple thresholds.")
                .optional(),
              negativeLabel: z.string().describe(
                "Label representing the negative class.",
              ).optional(),
              positiveLabel: z.string().describe(
                "Label representing the positive class.",
              ).optional(),
            }).describe(
              "Evaluation metrics for binary classification/classifier models.",
            ).optional(),
            clusteringMetrics: z.object({
              clusters: z.array(z.object({
                centroidId: z.string().describe("Centroid id.").optional(),
                count: z.string().describe(
                  "Count of training data rows that were assigned to this cluster.",
                ).optional(),
                featureValues: z.array(z.object({
                  categoricalValue: z.object({
                    categoryCounts: z.array(z.object({
                      category: z.string().describe("The name of category.")
                        .optional(),
                      count: z.string().describe(
                        "The count of training samples matching the category within the cluster.",
                      ).optional(),
                    })).describe(
                      'Counts of all categories for the categorical feature. If there are more than ten categories, we return top ten (by count) and return one more CategoryCount with category "_OTHER_" and count as aggregate counts of remaining categories.',
                    ).optional(),
                  }).describe("Representative value of a categorical feature.")
                    .optional(),
                  featureColumn: z.string().describe("The feature column name.")
                    .optional(),
                  numericalValue: z.number().describe(
                    "The numerical feature value. This is the centroid value for this feature.",
                  ).optional(),
                })).describe(
                  "Values of highly variant features for this cluster.",
                ).optional(),
              })).describe("Information for all clusters.").optional(),
              daviesBouldinIndex: z.number().describe("Davies-Bouldin index.")
                .optional(),
              meanSquaredDistance: z.number().describe(
                "Mean of squared distances between each sample to its cluster centroid.",
              ).optional(),
            }).describe("Evaluation metrics for clustering models.").optional(),
            dimensionalityReductionMetrics: z.object({
              totalExplainedVarianceRatio: z.number().describe(
                "Total percentage of variance explained by the selected principal components.",
              ).optional(),
            }).describe(
              "Model evaluation metrics for dimensionality reduction models.",
            ).optional(),
            multiClassClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number().describe(
                  "Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric.",
                ).optional(),
                f1Score: z.number().describe(
                  "The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric.",
                ).optional(),
                logLoss: z.number().describe(
                  "Logarithmic Loss. For multiclass this is a macro-averaged metric.",
                ).optional(),
                precision: z.number().describe(
                  "Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier.",
                ).optional(),
                recall: z.number().describe(
                  "Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric.",
                ).optional(),
                rocAuc: z.number().describe(
                  "Area Under a ROC Curve. For multiclass this is a macro-averaged metric.",
                ).optional(),
                threshold: z.number().describe(
                  "Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold.",
                ).optional(),
              }).describe(
                "Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.",
              ).optional(),
              confusionMatrixList: z.array(z.object({
                confidenceThreshold: z.number().describe(
                  "Confidence threshold used when computing the entries of the confusion matrix.",
                ).optional(),
                rows: z.array(z.object({
                  actualLabel: z.string().describe(
                    "The original label of this row.",
                  ).optional(),
                  entries: z.array(z.object({
                    itemCount: z.string().describe(
                      "Number of items being predicted as this label.",
                    ).optional(),
                    predictedLabel: z.string().describe(
                      "The predicted label. For confidence_threshold > 0, we will also add an entry indicating the number of items under the confidence threshold.",
                    ).optional(),
                  })).describe("Info describing predicted label distribution.")
                    .optional(),
                })).describe("One row per actual label.").optional(),
              })).describe("Confusion matrix at different thresholds.")
                .optional(),
            }).describe(
              "Evaluation metrics for multi-class classification/classifier models.",
            ).optional(),
            rankingMetrics: z.object({
              averageRank: z.number().describe(
                "Determines the goodness of a ranking by computing the percentile rank from the predicted confidence and dividing it by the original rank.",
              ).optional(),
              meanAveragePrecision: z.number().describe(
                "Calculates a precision per user for all the items by ranking them and then averages all the precisions across all the users.",
              ).optional(),
              meanSquaredError: z.number().describe(
                "Similar to the mean squared error computed in regression and explicit recommendation models except instead of computing the rating directly, the output from evaluate is computed against a preference which is 1 or 0 depending on if the rating exists or not.",
              ).optional(),
              normalizedDiscountedCumulativeGain: z.number().describe(
                "A metric to determine the goodness of a ranking calculated from the predicted confidence by comparing it to an ideal rank measured by the original ratings.",
              ).optional(),
            }).describe(
              "Evaluation metrics used by weighted-ALS models specified by feedback_type=implicit.",
            ).optional(),
            regressionMetrics: z.object({
              meanAbsoluteError: z.number().describe("Mean absolute error.")
                .optional(),
              meanSquaredError: z.number().describe("Mean squared error.")
                .optional(),
              meanSquaredLogError: z.number().describe(
                "Mean squared log error.",
              ).optional(),
              medianAbsoluteError: z.number().describe("Median absolute error.")
                .optional(),
              rSquared: z.number().describe(
                "R^2 score. This corresponds to r2_score in ML.EVALUATE.",
              ).optional(),
            }).describe(
              "Evaluation metrics for regression and explicit feedback type matrix factorization models.",
            ).optional(),
          }).describe(
            "Evaluation metrics of a model. These are either computed on all training data or just the eval data based on whether eval data was used during training. These are not present for imported models.",
          ).optional(),
          hparamTuningEvaluationMetrics: z.object({
            arimaForecastingMetrics: z.object({
              arimaFittingMetrics: z.array(z.object({
                aic: z.number().describe("AIC.").optional(),
                logLikelihood: z.number().describe("Log-likelihood.")
                  .optional(),
                variance: z.number().describe("Variance.").optional(),
              })).describe("Arima model fitting metrics.").optional(),
              arimaSingleModelForecastingMetrics: z.array(z.object({
                arimaFittingMetrics: z.object({
                  aic: z.number().describe("AIC.").optional(),
                  logLikelihood: z.number().describe("Log-likelihood.")
                    .optional(),
                  variance: z.number().describe("Variance.").optional(),
                }).describe("ARIMA model fitting metrics.").optional(),
                hasDrift: z.boolean().describe(
                  "Is arima model fitted with drift or not. It is always false when d is not 1.",
                ).optional(),
                hasHolidayEffect: z.boolean().describe(
                  "If true, holiday_effect is a part of time series decomposition result.",
                ).optional(),
                hasSpikesAndDips: z.boolean().describe(
                  "If true, spikes_and_dips is a part of time series decomposition result.",
                ).optional(),
                hasStepChanges: z.boolean().describe(
                  "If true, step_changes is a part of time series decomposition result.",
                ).optional(),
                nonSeasonalOrder: z.object({
                  d: z.string().describe("Order of the differencing part.")
                    .optional(),
                  p: z.string().describe("Order of the autoregressive part.")
                    .optional(),
                  q: z.string().describe("Order of the moving-average part.")
                    .optional(),
                }).describe(
                  "Arima order, can be used for both non-seasonal and seasonal parts.",
                ).optional(),
                seasonalPeriods: z.array(
                  z.enum([
                    "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                    "NO_SEASONALITY",
                    "DAILY",
                    "WEEKLY",
                    "MONTHLY",
                    "QUARTERLY",
                    "YEARLY",
                    "HOURLY",
                  ]),
                ).describe(
                  "Seasonal periods. Repeated because multiple periods are supported for one time series.",
                ).optional(),
                timeSeriesId: z.string().describe(
                  "The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used.",
                ).optional(),
                timeSeriesIds: z.array(z.string()).describe(
                  "The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns.",
                ).optional(),
              })).describe(
                "Repeated as there can be many metric sets (one for each model) in auto-arima and the large-scale case.",
              ).optional(),
              hasDrift: z.array(z.boolean()).describe(
                "Whether Arima model fitted with drift or not. It is always false when d is not 1.",
              ).optional(),
              nonSeasonalOrder: z.array(z.object({
                d: z.string().describe("Order of the differencing part.")
                  .optional(),
                p: z.string().describe("Order of the autoregressive part.")
                  .optional(),
                q: z.string().describe("Order of the moving-average part.")
                  .optional(),
              })).describe("Non-seasonal order.").optional(),
              seasonalPeriods: z.array(
                z.enum([
                  "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                  "NO_SEASONALITY",
                  "DAILY",
                  "WEEKLY",
                  "MONTHLY",
                  "QUARTERLY",
                  "YEARLY",
                  "HOURLY",
                ]),
              ).describe(
                "Seasonal periods. Repeated because multiple periods are supported for one time series.",
              ).optional(),
              timeSeriesId: z.array(z.string()).describe(
                "Id to differentiate different time series for the large-scale case.",
              ).optional(),
            }).describe(
              "Model evaluation metrics for ARIMA forecasting models.",
            ).optional(),
            binaryClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number().describe(
                  "Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric.",
                ).optional(),
                f1Score: z.number().describe(
                  "The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric.",
                ).optional(),
                logLoss: z.number().describe(
                  "Logarithmic Loss. For multiclass this is a macro-averaged metric.",
                ).optional(),
                precision: z.number().describe(
                  "Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier.",
                ).optional(),
                recall: z.number().describe(
                  "Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric.",
                ).optional(),
                rocAuc: z.number().describe(
                  "Area Under a ROC Curve. For multiclass this is a macro-averaged metric.",
                ).optional(),
                threshold: z.number().describe(
                  "Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold.",
                ).optional(),
              }).describe(
                "Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.",
              ).optional(),
              binaryConfusionMatrixList: z.array(z.object({
                accuracy: z.number().describe(
                  "The fraction of predictions given the correct label.",
                ).optional(),
                f1Score: z.number().describe(
                  "The equally weighted average of recall and precision.",
                ).optional(),
                falseNegatives: z.string().describe(
                  "Number of false samples predicted as false.",
                ).optional(),
                falsePositives: z.string().describe(
                  "Number of false samples predicted as true.",
                ).optional(),
                positiveClassThreshold: z.number().describe(
                  "Threshold value used when computing each of the following metric.",
                ).optional(),
                precision: z.number().describe(
                  "The fraction of actual positive predictions that had positive actual labels.",
                ).optional(),
                recall: z.number().describe(
                  "The fraction of actual positive labels that were given a positive prediction.",
                ).optional(),
                trueNegatives: z.string().describe(
                  "Number of true samples predicted as false.",
                ).optional(),
                truePositives: z.string().describe(
                  "Number of true samples predicted as true.",
                ).optional(),
              })).describe("Binary confusion matrix at multiple thresholds.")
                .optional(),
              negativeLabel: z.string().describe(
                "Label representing the negative class.",
              ).optional(),
              positiveLabel: z.string().describe(
                "Label representing the positive class.",
              ).optional(),
            }).describe(
              "Evaluation metrics for binary classification/classifier models.",
            ).optional(),
            clusteringMetrics: z.object({
              clusters: z.array(z.object({
                centroidId: z.string().describe("Centroid id.").optional(),
                count: z.string().describe(
                  "Count of training data rows that were assigned to this cluster.",
                ).optional(),
                featureValues: z.array(z.object({
                  categoricalValue: z.object({
                    categoryCounts: z.array(z.object({
                      category: z.string().describe("The name of category.")
                        .optional(),
                      count: z.string().describe(
                        "The count of training samples matching the category within the cluster.",
                      ).optional(),
                    })).describe(
                      'Counts of all categories for the categorical feature. If there are more than ten categories, we return top ten (by count) and return one more CategoryCount with category "_OTHER_" and count as aggregate counts of remaining categories.',
                    ).optional(),
                  }).describe("Representative value of a categorical feature.")
                    .optional(),
                  featureColumn: z.string().describe("The feature column name.")
                    .optional(),
                  numericalValue: z.number().describe(
                    "The numerical feature value. This is the centroid value for this feature.",
                  ).optional(),
                })).describe(
                  "Values of highly variant features for this cluster.",
                ).optional(),
              })).describe("Information for all clusters.").optional(),
              daviesBouldinIndex: z.number().describe("Davies-Bouldin index.")
                .optional(),
              meanSquaredDistance: z.number().describe(
                "Mean of squared distances between each sample to its cluster centroid.",
              ).optional(),
            }).describe("Evaluation metrics for clustering models.").optional(),
            dimensionalityReductionMetrics: z.object({
              totalExplainedVarianceRatio: z.number().describe(
                "Total percentage of variance explained by the selected principal components.",
              ).optional(),
            }).describe(
              "Model evaluation metrics for dimensionality reduction models.",
            ).optional(),
            multiClassClassificationMetrics: z.object({
              aggregateClassificationMetrics: z.object({
                accuracy: z.number().describe(
                  "Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric.",
                ).optional(),
                f1Score: z.number().describe(
                  "The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric.",
                ).optional(),
                logLoss: z.number().describe(
                  "Logarithmic Loss. For multiclass this is a macro-averaged metric.",
                ).optional(),
                precision: z.number().describe(
                  "Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier.",
                ).optional(),
                recall: z.number().describe(
                  "Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric.",
                ).optional(),
                rocAuc: z.number().describe(
                  "Area Under a ROC Curve. For multiclass this is a macro-averaged metric.",
                ).optional(),
                threshold: z.number().describe(
                  "Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold.",
                ).optional(),
              }).describe(
                "Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.",
              ).optional(),
              confusionMatrixList: z.array(z.object({
                confidenceThreshold: z.number().describe(
                  "Confidence threshold used when computing the entries of the confusion matrix.",
                ).optional(),
                rows: z.array(z.object({
                  actualLabel: z.string().describe(
                    "The original label of this row.",
                  ).optional(),
                  entries: z.array(z.object({
                    itemCount: z.string().describe(
                      "Number of items being predicted as this label.",
                    ).optional(),
                    predictedLabel: z.string().describe(
                      "The predicted label. For confidence_threshold > 0, we will also add an entry indicating the number of items under the confidence threshold.",
                    ).optional(),
                  })).describe("Info describing predicted label distribution.")
                    .optional(),
                })).describe("One row per actual label.").optional(),
              })).describe("Confusion matrix at different thresholds.")
                .optional(),
            }).describe(
              "Evaluation metrics for multi-class classification/classifier models.",
            ).optional(),
            rankingMetrics: z.object({
              averageRank: z.number().describe(
                "Determines the goodness of a ranking by computing the percentile rank from the predicted confidence and dividing it by the original rank.",
              ).optional(),
              meanAveragePrecision: z.number().describe(
                "Calculates a precision per user for all the items by ranking them and then averages all the precisions across all the users.",
              ).optional(),
              meanSquaredError: z.number().describe(
                "Similar to the mean squared error computed in regression and explicit recommendation models except instead of computing the rating directly, the output from evaluate is computed against a preference which is 1 or 0 depending on if the rating exists or not.",
              ).optional(),
              normalizedDiscountedCumulativeGain: z.number().describe(
                "A metric to determine the goodness of a ranking calculated from the predicted confidence by comparing it to an ideal rank measured by the original ratings.",
              ).optional(),
            }).describe(
              "Evaluation metrics used by weighted-ALS models specified by feedback_type=implicit.",
            ).optional(),
            regressionMetrics: z.object({
              meanAbsoluteError: z.number().describe("Mean absolute error.")
                .optional(),
              meanSquaredError: z.number().describe("Mean squared error.")
                .optional(),
              meanSquaredLogError: z.number().describe(
                "Mean squared log error.",
              ).optional(),
              medianAbsoluteError: z.number().describe("Median absolute error.")
                .optional(),
              rSquared: z.number().describe(
                "R^2 score. This corresponds to r2_score in ML.EVALUATE.",
              ).optional(),
            }).describe(
              "Evaluation metrics for regression and explicit feedback type matrix factorization models.",
            ).optional(),
          }).describe(
            "Evaluation metrics of a model. These are either computed on all training data or just the eval data based on whether eval data was used during training. These are not present for imported models.",
          ).optional(),
          hparams: z.object({
            activationFn: z.string().describe(
              "Activation function of the neural nets.",
            ).optional(),
            adjustStepChanges: z.boolean().describe(
              "If true, detect step changes and make data adjustment in the input time series.",
            ).optional(),
            approxGlobalFeatureContrib: z.boolean().describe(
              "Whether to use approximate feature contribution method in XGBoost model explanation for global explain.",
            ).optional(),
            autoArima: z.boolean().describe(
              "Whether to enable auto ARIMA or not.",
            ).optional(),
            autoArimaMaxOrder: z.string().describe(
              "The max value of the sum of non-seasonal p and q.",
            ).optional(),
            autoArimaMinOrder: z.string().describe(
              "The min value of the sum of non-seasonal p and q.",
            ).optional(),
            autoClassWeights: z.boolean().describe(
              "Whether to calculate class weights automatically based on the popularity of each label.",
            ).optional(),
            batchSize: z.string().describe("Batch size for dnn models.")
              .optional(),
            boosterType: z.enum(["BOOSTER_TYPE_UNSPECIFIED", "GBTREE", "DART"])
              .describe("Booster type for boosted tree models.").optional(),
            budgetHours: z.number().describe(
              "Budget in hours for AutoML training.",
            ).optional(),
            calculatePValues: z.boolean().describe(
              "Whether or not p-value test should be computed for this model. Only available for linear and logistic regression models.",
            ).optional(),
            categoryEncodingMethod: z.enum([
              "ENCODING_METHOD_UNSPECIFIED",
              "ONE_HOT_ENCODING",
              "LABEL_ENCODING",
              "DUMMY_ENCODING",
            ]).describe("Categorical feature encoding method.").optional(),
            cleanSpikesAndDips: z.boolean().describe(
              "If true, clean spikes and dips in the input time series.",
            ).optional(),
            colorSpace: z.enum([
              "COLOR_SPACE_UNSPECIFIED",
              "RGB",
              "HSV",
              "YIQ",
              "YUV",
              "GRAYSCALE",
            ]).describe(
              "Enums for color space, used for processing images in Object Table. See more details at https://www.tensorflow.org/io/tutorials/colorspace.",
            ).optional(),
            colsampleBylevel: z.number().describe(
              "Subsample ratio of columns for each level for boosted tree models.",
            ).optional(),
            colsampleBynode: z.number().describe(
              "Subsample ratio of columns for each node(split) for boosted tree models.",
            ).optional(),
            colsampleBytree: z.number().describe(
              "Subsample ratio of columns when constructing each tree for boosted tree models.",
            ).optional(),
            contributionMetric: z.string().describe(
              "The contribution metric. Applies to contribution analysis models. Allowed formats supported are for summable and summable ratio contribution metrics. These include expressions such as `SUM(x)` or `SUM(x)/SUM(y)`, where x and y are column names from the base table.",
            ).optional(),
            dartNormalizeType: z.enum([
              "DART_NORMALIZE_TYPE_UNSPECIFIED",
              "TREE",
              "FOREST",
            ]).describe(
              "Type of normalization algorithm for boosted tree models using dart booster.",
            ).optional(),
            dataFrequency: z.enum([
              "DATA_FREQUENCY_UNSPECIFIED",
              "AUTO_FREQUENCY",
              "YEARLY",
              "QUARTERLY",
              "MONTHLY",
              "WEEKLY",
              "DAILY",
              "HOURLY",
              "PER_MINUTE",
            ]).describe("The data frequency of a time series.").optional(),
            dataSplitColumn: z.string().describe(
              "The column to split data with. This column won't be used as a feature. 1. When data_split_method is CUSTOM, the corresponding column should be boolean. The rows with true value tag are eval data, and the false are training data. 2. When data_split_method is SEQ, the first DATA_SPLIT_EVAL_FRACTION rows (from smallest to largest) in the corresponding column are used as training data, and the rest are eval data. It respects the order in Orderable data types: https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties",
            ).optional(),
            dataSplitEvalFraction: z.number().describe(
              "The fraction of evaluation data over the whole input data. The rest of data will be used as training data. The format should be double. Accurate to two decimal places. Default value is 0.2.",
            ).optional(),
            dataSplitMethod: z.enum([
              "DATA_SPLIT_METHOD_UNSPECIFIED",
              "RANDOM",
              "CUSTOM",
              "SEQUENTIAL",
              "NO_SPLIT",
              "AUTO_SPLIT",
            ]).describe(
              "The data split type for training and evaluation, e.g. RANDOM.",
            ).optional(),
            decomposeTimeSeries: z.boolean().describe(
              "If true, perform decompose time series and save the results.",
            ).optional(),
            dimensionIdColumns: z.array(z.string()).describe(
              "Optional. Names of the columns to slice on. Applies to contribution analysis models.",
            ).optional(),
            distanceType: z.enum([
              "DISTANCE_TYPE_UNSPECIFIED",
              "EUCLIDEAN",
              "COSINE",
            ]).describe("Distance type for clustering models.").optional(),
            dropout: z.number().describe("Dropout probability for dnn models.")
              .optional(),
            earlyStop: z.boolean().describe(
              "Whether to stop early when the loss doesn't improve significantly any more (compared to min_relative_progress). Used only for iterative training algorithms.",
            ).optional(),
            enableGlobalExplain: z.boolean().describe(
              "If true, enable global explanation during training.",
            ).optional(),
            endpointIdleTtl: z.string().describe(
              "The idle TTL of the endpoint before the resources get destroyed. The default value is 6.5 hours.",
            ).optional(),
            feedbackType: z.enum([
              "FEEDBACK_TYPE_UNSPECIFIED",
              "IMPLICIT",
              "EXPLICIT",
            ]).describe(
              "Feedback type that specifies which algorithm to run for matrix factorization.",
            ).optional(),
            fitIntercept: z.boolean().describe(
              "Whether the model should include intercept during model training.",
            ).optional(),
            forecastLimitLowerBound: z.number().describe(
              "The forecast limit lower bound that was used during ARIMA model training with limits. To see more details of the algorithm: https://otexts.com/fpp2/limits.html",
            ).optional(),
            forecastLimitUpperBound: z.number().describe(
              "The forecast limit upper bound that was used during ARIMA model training with limits.",
            ).optional(),
            hiddenUnits: z.array(z.string()).describe(
              "Hidden units for dnn models.",
            ).optional(),
            holidayRegion: z.enum([
              "HOLIDAY_REGION_UNSPECIFIED",
              "GLOBAL",
              "NA",
              "JAPAC",
              "EMEA",
              "LAC",
              "AE",
              "AR",
              "AT",
              "AU",
              "BE",
              "BR",
              "CA",
              "CH",
              "CL",
              "CN",
              "CO",
              "CS",
              "CZ",
              "DE",
              "DK",
              "DZ",
              "EC",
              "EE",
              "EG",
              "ES",
              "FI",
              "FR",
              "GB",
              "GR",
              "HK",
              "HU",
              "ID",
              "IE",
              "IL",
              "IN",
              "IR",
              "IT",
              "JP",
              "KR",
              "LV",
              "MA",
              "MX",
              "MY",
              "NG",
              "NL",
              "NO",
              "NZ",
              "PE",
              "PH",
              "PK",
              "PL",
              "PT",
              "RO",
              "RS",
              "RU",
              "SA",
              "SE",
              "SG",
              "SI",
              "SK",
              "TH",
              "TR",
              "TW",
              "UA",
              "US",
              "VE",
              "VN",
              "ZA",
            ]).describe(
              "The geographical region based on which the holidays are considered in time series modeling. If a valid value is specified, then holiday effects modeling is enabled.",
            ).optional(),
            holidayRegions: z.array(
              z.enum([
                "HOLIDAY_REGION_UNSPECIFIED",
                "GLOBAL",
                "NA",
                "JAPAC",
                "EMEA",
                "LAC",
                "AE",
                "AR",
                "AT",
                "AU",
                "BE",
                "BR",
                "CA",
                "CH",
                "CL",
                "CN",
                "CO",
                "CS",
                "CZ",
                "DE",
                "DK",
                "DZ",
                "EC",
                "EE",
                "EG",
                "ES",
                "FI",
                "FR",
                "GB",
                "GR",
                "HK",
                "HU",
                "ID",
                "IE",
                "IL",
                "IN",
                "IR",
                "IT",
                "JP",
                "KR",
                "LV",
                "MA",
                "MX",
                "MY",
                "NG",
                "NL",
                "NO",
                "NZ",
                "PE",
                "PH",
                "PK",
                "PL",
                "PT",
                "RO",
                "RS",
                "RU",
                "SA",
                "SE",
                "SG",
                "SI",
                "SK",
                "TH",
                "TR",
                "TW",
                "UA",
                "US",
                "VE",
                "VN",
                "ZA",
              ]),
            ).describe(
              "A list of geographical regions that are used for time series modeling.",
            ).optional(),
            horizon: z.string().describe(
              "The number of periods ahead that need to be forecasted.",
            ).optional(),
            hparamTuningObjectives: z.array(
              z.enum([
                "HPARAM_TUNING_OBJECTIVE_UNSPECIFIED",
                "MEAN_ABSOLUTE_ERROR",
                "MEAN_SQUARED_ERROR",
                "MEAN_SQUARED_LOG_ERROR",
                "MEDIAN_ABSOLUTE_ERROR",
                "R_SQUARED",
                "EXPLAINED_VARIANCE",
                "PRECISION",
                "RECALL",
                "ACCURACY",
                "F1_SCORE",
                "LOG_LOSS",
                "ROC_AUC",
                "DAVIES_BOULDIN_INDEX",
                "MEAN_AVERAGE_PRECISION",
                "NORMALIZED_DISCOUNTED_CUMULATIVE_GAIN",
                "AVERAGE_RANK",
              ]),
            ).describe(
              "The target evaluation metrics to optimize the hyperparameters for.",
            ).optional(),
            huggingFaceModelId: z.string().describe(
              "The id of a Hugging Face model. For example, `google/gemma-2-2b-it`.",
            ).optional(),
            includeDrift: z.boolean().describe(
              "Include drift when fitting an ARIMA model.",
            ).optional(),
            initialLearnRate: z.number().describe(
              "Specifies the initial learning rate for the line search learn rate strategy.",
            ).optional(),
            inputLabelColumns: z.array(z.string()).describe(
              "Name of input label columns in training data.",
            ).optional(),
            instanceWeightColumn: z.string().describe(
              "Name of the instance weight column for training data. This column isn't be used as a feature.",
            ).optional(),
            integratedGradientsNumSteps: z.string().describe(
              "Number of integral steps for the integrated gradients explain method.",
            ).optional(),
            isTestColumn: z.string().describe(
              "Name of the column used to determine the rows corresponding to control and test. Applies to contribution analysis models.",
            ).optional(),
            itemColumn: z.string().describe(
              "Item column specified for matrix factorization models.",
            ).optional(),
            kmeansInitializationColumn: z.string().describe(
              "The column used to provide the initial centroids for kmeans algorithm when kmeans_initialization_method is CUSTOM.",
            ).optional(),
            kmeansInitializationMethod: z.enum([
              "KMEANS_INITIALIZATION_METHOD_UNSPECIFIED",
              "RANDOM",
              "CUSTOM",
              "KMEANS_PLUS_PLUS",
            ]).describe(
              "The method used to initialize the centroids for kmeans algorithm.",
            ).optional(),
            l1RegActivation: z.number().describe(
              "L1 regularization coefficient to activations.",
            ).optional(),
            l1Regularization: z.number().describe(
              "L1 regularization coefficient.",
            ).optional(),
            l2Regularization: z.number().describe(
              "L2 regularization coefficient.",
            ).optional(),
            labelClassWeights: z.record(z.string(), z.number()).describe(
              "Weights associated with each label class, for rebalancing the training data. Only applicable for classification models.",
            ).optional(),
            learnRate: z.number().describe(
              "Learning rate in training. Used only for iterative training algorithms.",
            ).optional(),
            learnRateStrategy: z.enum([
              "LEARN_RATE_STRATEGY_UNSPECIFIED",
              "LINE_SEARCH",
              "CONSTANT",
            ]).describe(
              "The strategy to determine learn rate for the current iteration.",
            ).optional(),
            lossType: z.enum([
              "LOSS_TYPE_UNSPECIFIED",
              "MEAN_SQUARED_LOSS",
              "MEAN_LOG_LOSS",
            ]).describe("Type of loss function used during training run.")
              .optional(),
            machineType: z.string().describe(
              "The type of the machine used to deploy and serve the model.",
            ).optional(),
            maxIterations: z.string().describe(
              "The maximum number of iterations in training. Used only for iterative training algorithms.",
            ).optional(),
            maxParallelTrials: z.string().describe(
              "Maximum number of trials to run in parallel.",
            ).optional(),
            maxReplicaCount: z.string().describe(
              "The maximum number of machine replicas that will be deployed on an endpoint. The default value is equal to min_replica_count.",
            ).optional(),
            maxTimeSeriesLength: z.string().describe(
              "The maximum number of time points in a time series that can be used in modeling the trend component of the time series. Don't use this option with the `timeSeriesLengthFraction` or `minTimeSeriesLength` options.",
            ).optional(),
            maxTreeDepth: z.string().describe(
              "Maximum depth of a tree for boosted tree models.",
            ).optional(),
            minAprioriSupport: z.number().describe(
              "The apriori support minimum. Applies to contribution analysis models.",
            ).optional(),
            minRelativeProgress: z.number().describe(
              "When early_stop is true, stops training when accuracy improvement is less than 'min_relative_progress'. Used only for iterative training algorithms.",
            ).optional(),
            minReplicaCount: z.string().describe(
              "The minimum number of machine replicas that will be always deployed on an endpoint. This value must be greater than or equal to 1. The default value is 1.",
            ).optional(),
            minSplitLoss: z.number().describe(
              "Minimum split loss for boosted tree models.",
            ).optional(),
            minTimeSeriesLength: z.string().describe(
              "The minimum number of time points in a time series that are used in modeling the trend component of the time series. If you use this option you must also set the `timeSeriesLengthFraction` option. This training option ensures that enough time points are available when you use `timeSeriesLengthFraction` in trend modeling. This is particularly important when forecasting multiple time series in a single query using `timeSeriesIdColumn`. If the total number of time points is less than the `minTimeSeriesLength` value, then the query uses all available time points.",
            ).optional(),
            minTreeChildWeight: z.string().describe(
              "Minimum sum of instance weight needed in a child for boosted tree models.",
            ).optional(),
            modelGardenModelName: z.string().describe(
              "The name of a Vertex model garden publisher model. Format is `publishers/{publisher}/models/{model}@{optional_version_id}`.",
            ).optional(),
            modelRegistry: z.enum(["MODEL_REGISTRY_UNSPECIFIED", "VERTEX_AI"])
              .describe("The model registry.").optional(),
            modelUri: z.string().describe(
              "Google Cloud Storage URI from which the model was imported. Only applicable for imported models.",
            ).optional(),
            nonSeasonalOrder: z.object({
              d: z.string().describe("Order of the differencing part.")
                .optional(),
              p: z.string().describe("Order of the autoregressive part.")
                .optional(),
              q: z.string().describe("Order of the moving-average part.")
                .optional(),
            }).describe(
              "Arima order, can be used for both non-seasonal and seasonal parts.",
            ).optional(),
            numClusters: z.string().describe(
              "Number of clusters for clustering models.",
            ).optional(),
            numFactors: z.string().describe(
              "Num factors specified for matrix factorization models.",
            ).optional(),
            numParallelTree: z.string().describe(
              "Number of parallel trees constructed during each iteration for boosted tree models.",
            ).optional(),
            numPrincipalComponents: z.string().describe(
              "Number of principal components to keep in the PCA model. Must be <= the number of features.",
            ).optional(),
            numTrials: z.string().describe(
              "Number of trials to run this hyperparameter tuning job.",
            ).optional(),
            optimizationStrategy: z.enum([
              "OPTIMIZATION_STRATEGY_UNSPECIFIED",
              "BATCH_GRADIENT_DESCENT",
              "NORMAL_EQUATION",
            ]).describe(
              "Optimization strategy for training linear regression models.",
            ).optional(),
            optimizer: z.string().describe(
              "Optimizer used for training the neural nets.",
            ).optional(),
            pcaExplainedVarianceRatio: z.number().describe(
              "The minimum ratio of cumulative explained variance that needs to be given by the PCA model.",
            ).optional(),
            pcaSolver: z.enum(["UNSPECIFIED", "FULL", "RANDOMIZED", "AUTO"])
              .describe("The solver for PCA.").optional(),
            reservationAffinityKey: z.string().describe(
              "Corresponds to the label key of a reservation resource used by Vertex AI. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.",
            ).optional(),
            reservationAffinityType: z.enum([
              "RESERVATION_AFFINITY_TYPE_UNSPECIFIED",
              "NO_RESERVATION",
              "ANY_RESERVATION",
              "SPECIFIC_RESERVATION",
            ]).describe(
              "Specifies the reservation affinity type used to configure a Vertex AI resource. The default value is `NO_RESERVATION`.",
            ).optional(),
            reservationAffinityValues: z.array(z.string()).describe(
              "Corresponds to the label values of a reservation resource used by Vertex AI. This must be the full resource name of the reservation or reservation block.",
            ).optional(),
            sampledShapleyNumPaths: z.string().describe(
              "Number of paths for the sampled Shapley explain method.",
            ).optional(),
            scaleFeatures: z.boolean().describe(
              "If true, scale the feature values by dividing the feature standard deviation. Currently only apply to PCA.",
            ).optional(),
            standardizeFeatures: z.boolean().describe(
              "Whether to standardize numerical features. Default to true.",
            ).optional(),
            subsample: z.number().describe(
              "Subsample fraction of the training data to grow tree to prevent overfitting for boosted tree models.",
            ).optional(),
            tfVersion: z.string().describe(
              "Based on the selected TF version, the corresponding docker image is used to train external models.",
            ).optional(),
            timeSeriesDataColumn: z.string().describe(
              "Column to be designated as time series data for ARIMA model.",
            ).optional(),
            timeSeriesIdColumn: z.string().describe(
              "The time series id column that was used during ARIMA model training.",
            ).optional(),
            timeSeriesIdColumns: z.array(z.string()).describe(
              "The time series id columns that were used during ARIMA model training.",
            ).optional(),
            timeSeriesLengthFraction: z.number().describe(
              "The fraction of the interpolated length of the time series that's used to model the time series trend component. All of the time points of the time series are used to model the non-trend component. This training option accelerates modeling training without sacrificing much forecasting accuracy. You can use this option with `minTimeSeriesLength` but not with `maxTimeSeriesLength`.",
            ).optional(),
            timeSeriesTimestampColumn: z.string().describe(
              "Column to be designated as time series timestamp for ARIMA model.",
            ).optional(),
            treeMethod: z.enum([
              "TREE_METHOD_UNSPECIFIED",
              "AUTO",
              "EXACT",
              "APPROX",
              "HIST",
            ]).describe("Tree construction algorithm for boosted tree models.")
              .optional(),
            trendSmoothingWindowSize: z.string().describe(
              "Smoothing window size for the trend component. When a positive value is specified, a center moving average smoothing is applied on the history trend. When the smoothing window is out of the boundary at the beginning or the end of the trend, the first element or the last element is padded to fill the smoothing window before the average is applied.",
            ).optional(),
            userColumn: z.string().describe(
              "User column specified for matrix factorization models.",
            ).optional(),
            vertexAiModelVersionAliases: z.array(z.string()).describe(
              "The version aliases to apply in Vertex AI model registry. Always overwrite if the version aliases exists in a existing model.",
            ).optional(),
            walsAlpha: z.number().describe(
              "Hyperparameter for matrix factoration when implicit feedback type is specified.",
            ).optional(),
            warmStart: z.boolean().describe(
              "Whether to train a model from the last checkpoint.",
            ).optional(),
            xgboostVersion: z.string().describe(
              "User-selected XGBoost versions for training of XGBoost models.",
            ).optional(),
          }).describe("Options used in model training.").optional(),
          startTimeMs: z.string().describe("Starting time of the trial.")
            .optional(),
          status: z.enum([
            "TRIAL_STATUS_UNSPECIFIED",
            "NOT_STARTED",
            "RUNNING",
            "SUCCEEDED",
            "FAILED",
            "INFEASIBLE",
            "STOPPED_EARLY",
          ]).describe("The status of the trial.").optional(),
          trainingLoss: z.number().describe(
            "Loss computed on the training data at the end of trial.",
          ).optional(),
          trialId: z.string().describe("1-based index of the trial.")
            .optional(),
        })).describe(
          "Output only. Trials of a [hyperparameter tuning job](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) sorted by trial_id.",
        ).optional(),
        iterationResults: z.array(z.object({
          arimaResult: z.object({
            arimaModelInfo: z.array(z.object({
              arimaCoefficients: z.object({
                autoRegressiveCoefficients: z.array(z.number()).describe(
                  "Auto-regressive coefficients, an array of double.",
                ).optional(),
                interceptCoefficient: z.number().describe(
                  "Intercept coefficient, just a double not an array.",
                ).optional(),
                movingAverageCoefficients: z.array(z.number()).describe(
                  "Moving-average coefficients, an array of double.",
                ).optional(),
              }).describe("Arima coefficients.").optional(),
              arimaFittingMetrics: z.object({
                aic: z.number().describe("AIC.").optional(),
                logLikelihood: z.number().describe("Log-likelihood.")
                  .optional(),
                variance: z.number().describe("Variance.").optional(),
              }).describe("ARIMA model fitting metrics.").optional(),
              hasDrift: z.boolean().describe(
                "Whether Arima model fitted with drift or not. It is always false when d is not 1.",
              ).optional(),
              hasHolidayEffect: z.boolean().describe(
                "If true, holiday_effect is a part of time series decomposition result.",
              ).optional(),
              hasSpikesAndDips: z.boolean().describe(
                "If true, spikes_and_dips is a part of time series decomposition result.",
              ).optional(),
              hasStepChanges: z.boolean().describe(
                "If true, step_changes is a part of time series decomposition result.",
              ).optional(),
              nonSeasonalOrder: z.object({
                d: z.string().describe("Order of the differencing part.")
                  .optional(),
                p: z.string().describe("Order of the autoregressive part.")
                  .optional(),
                q: z.string().describe("Order of the moving-average part.")
                  .optional(),
              }).describe(
                "Arima order, can be used for both non-seasonal and seasonal parts.",
              ).optional(),
              seasonalPeriods: z.array(
                z.enum([
                  "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                  "NO_SEASONALITY",
                  "DAILY",
                  "WEEKLY",
                  "MONTHLY",
                  "QUARTERLY",
                  "YEARLY",
                  "HOURLY",
                ]),
              ).describe(
                "Seasonal periods. Repeated because multiple periods are supported for one time series.",
              ).optional(),
              timeSeriesId: z.string().describe(
                "The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used.",
              ).optional(),
              timeSeriesIds: z.array(z.string()).describe(
                "The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns.",
              ).optional(),
            })).describe(
              "This message is repeated because there are multiple arima models fitted in auto-arima. For non-auto-arima model, its size is one.",
            ).optional(),
            seasonalPeriods: z.array(
              z.enum([
                "SEASONAL_PERIOD_TYPE_UNSPECIFIED",
                "NO_SEASONALITY",
                "DAILY",
                "WEEKLY",
                "MONTHLY",
                "QUARTERLY",
                "YEARLY",
                "HOURLY",
              ]),
            ).describe(
              "Seasonal periods. Repeated because multiple periods are supported for one time series.",
            ).optional(),
          }).describe(
            "(Auto-)arima fitting result. Wrap everything in ArimaResult for easier refactoring if we want to use model-specific iteration results.",
          ).optional(),
          clusterInfos: z.array(z.object({
            centroidId: z.string().describe("Centroid id.").optional(),
            clusterRadius: z.number().describe(
              "Cluster radius, the average distance from centroid to each point assigned to the cluster.",
            ).optional(),
            clusterSize: z.string().describe(
              "Cluster size, the total number of points assigned to the cluster.",
            ).optional(),
          })).describe("Information about top clusters for clustering models.")
            .optional(),
          durationMs: z.string().describe(
            "Time taken to run the iteration in milliseconds.",
          ).optional(),
          evalLoss: z.number().describe(
            "Loss computed on the eval data at the end of iteration.",
          ).optional(),
          index: z.number().int().describe("Index of the iteration, 0 based.")
            .optional(),
          learnRate: z.number().describe("Learn rate used for this iteration.")
            .optional(),
          principalComponentInfos: z.array(z.object({
            cumulativeExplainedVarianceRatio: z.number().describe(
              "The explained_variance is pre-ordered in the descending order to compute the cumulative explained variance ratio.",
            ).optional(),
            explainedVariance: z.number().describe(
              "Explained variance by this principal component, which is simply the eigenvalue.",
            ).optional(),
            explainedVarianceRatio: z.number().describe(
              "Explained_variance over the total explained variance.",
            ).optional(),
            principalComponentId: z.string().describe(
              "Id of the principal component.",
            ).optional(),
          })).describe("The information of the principal components.")
            .optional(),
          trainingLoss: z.number().describe(
            "Loss computed on the training data at the end of iteration.",
          ).optional(),
        })).describe(
          "Results for all completed iterations. Empty for [hyperparameter tuning jobs](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview).",
        ).optional(),
        maxIterations: z.string().describe(
          "Output only. Maximum number of iterations specified as max_iterations in the 'CREATE MODEL' query. The actual number of iterations may be less than this number due to early stop.",
        ).optional(),
        modelType: z.enum([
          "MODEL_TYPE_UNSPECIFIED",
          "LINEAR_REGRESSION",
          "LOGISTIC_REGRESSION",
          "KMEANS",
          "MATRIX_FACTORIZATION",
          "DNN_CLASSIFIER",
          "TENSORFLOW",
          "DNN_REGRESSOR",
          "XGBOOST",
          "BOOSTED_TREE_REGRESSOR",
          "BOOSTED_TREE_CLASSIFIER",
          "ARIMA",
          "AUTOML_REGRESSOR",
          "AUTOML_CLASSIFIER",
          "PCA",
          "DNN_LINEAR_COMBINED_CLASSIFIER",
          "DNN_LINEAR_COMBINED_REGRESSOR",
          "AUTOENCODER",
          "ARIMA_PLUS",
          "ARIMA_PLUS_XREG",
          "RANDOM_FOREST_REGRESSOR",
          "RANDOM_FOREST_CLASSIFIER",
          "TENSORFLOW_LITE",
          "ONNX",
          "TRANSFORM_ONLY",
          "CONTRIBUTION_ANALYSIS",
        ]).describe("Output only. The type of the model that is being trained.")
          .optional(),
        trainingType: z.enum([
          "TRAINING_TYPE_UNSPECIFIED",
          "SINGLE_TRAINING",
          "HPARAM_TUNING",
        ]).describe("Output only. Training type of the job.").optional(),
      }).describe("Job statistics specific to a BigQuery ML training job.")
        .optional(),
      modelTraining: z.object({
        currentIteration: z.number().int().describe("Deprecated.").optional(),
        expectedTotalIterations: z.string().describe("Deprecated.").optional(),
      }).optional(),
      modelTrainingCurrentIteration: z.number().int().describe("Deprecated.")
        .optional(),
      modelTrainingExpectedTotalIteration: z.string().describe("Deprecated.")
        .optional(),
      numDmlAffectedRows: z.string().describe(
        "Output only. The number of rows affected by a DML statement. Present only for DML statements INSERT, UPDATE or DELETE.",
      ).optional(),
      performanceInsights: z.object({
        avgPreviousExecutionMs: z.string().describe(
          "Output only. Average execution ms of previous runs. Indicates the job ran slow compared to previous executions. To find previous executions, use INFORMATION_SCHEMA tables and filter jobs with same query hash.",
        ).optional(),
        stagePerformanceChangeInsights: z.array(z.object({
          inputDataChange: z.object({
            recordsReadDiffPercentage: z.number().describe(
              "Output only. Records read difference percentage compared to a previous run.",
            ).optional(),
          }).describe("Details about the input data change insight.")
            .optional(),
          stageId: z.string().describe(
            "Output only. The stage id that the insight mapped to.",
          ).optional(),
        })).describe(
          "Output only. Query stage performance insights compared to previous runs, for diagnosing performance regression.",
        ).optional(),
        stagePerformanceStandaloneInsights: z.array(z.object({
          biEngineReasons: z.array(z.object({
            code: z.enum([
              "CODE_UNSPECIFIED",
              "NO_RESERVATION",
              "INSUFFICIENT_RESERVATION",
              "UNSUPPORTED_SQL_TEXT",
              "INPUT_TOO_LARGE",
              "OTHER_REASON",
              "TABLE_EXCLUDED",
            ]).describe(
              "Output only. High-level BI Engine reason for partial or disabled acceleration",
            ).optional(),
            message: z.string().describe(
              "Output only. Free form human-readable reason for partial or disabled acceleration.",
            ).optional(),
          })).describe(
            "Output only. If present, the stage had the following reasons for being disqualified from BI Engine execution.",
          ).optional(),
          highCardinalityJoins: z.array(z.object({
            leftRows: z.string().describe(
              "Output only. Count of left input rows.",
            ).optional(),
            outputRows: z.string().describe(
              "Output only. Count of the output rows.",
            ).optional(),
            rightRows: z.string().describe(
              "Output only. Count of right input rows.",
            ).optional(),
            stepIndex: z.number().int().describe(
              "Output only. The index of the join operator in the ExplainQueryStep lists.",
            ).optional(),
          })).describe("Output only. High cardinality joins in the stage.")
            .optional(),
          insufficientShuffleQuota: z.boolean().describe(
            "Output only. True if the stage has insufficient shuffle quota.",
          ).optional(),
          partitionSkew: z.object({
            skewSources: z.array(z.object({
              stageId: z.string().describe(
                "Output only. Stage id of the skew source stage.",
              ).optional(),
            })).describe(
              "Output only. Source stages which produce skewed data.",
            ).optional(),
          }).describe("Partition skew detailed information.").optional(),
          slotContention: z.boolean().describe(
            "Output only. True if the stage has a slot contention issue.",
          ).optional(),
          stageId: z.string().describe(
            "Output only. The stage id that the insight mapped to.",
          ).optional(),
        })).describe(
          "Output only. Standalone query stage performance insights, for exploring potential improvements.",
        ).optional(),
      }).describe("Performance insights for the job.").optional(),
      queryInfo: z.object({
        optimizationDetails: z.record(z.string(), z.string()).describe(
          "Output only. Information about query optimizations.",
        ).optional(),
      }).describe("Query optimization information for a QUERY job.").optional(),
      queryPlan: z.array(z.object({
        completedParallelInputs: z.string().describe(
          "Number of parallel input segments completed.",
        ).optional(),
        computeMode: z.enum([
          "COMPUTE_MODE_UNSPECIFIED",
          "BIGQUERY",
          "BI_ENGINE",
        ]).describe("Output only. Compute mode for this stage.").optional(),
        computeMsAvg: z.string().describe(
          "Milliseconds the average shard spent on CPU-bound tasks.",
        ).optional(),
        computeMsMax: z.string().describe(
          "Milliseconds the slowest shard spent on CPU-bound tasks.",
        ).optional(),
        computeRatioAvg: z.number().describe(
          "Relative amount of time the average shard spent on CPU-bound tasks.",
        ).optional(),
        computeRatioMax: z.number().describe(
          "Relative amount of time the slowest shard spent on CPU-bound tasks.",
        ).optional(),
        endMs: z.string().describe(
          "Stage end time represented as milliseconds since the epoch.",
        ).optional(),
        id: z.string().describe("Unique ID for the stage within the plan.")
          .optional(),
        inputStages: z.array(z.string()).describe(
          "IDs for stages that are inputs to this stage.",
        ).optional(),
        name: z.string().describe("Human-readable name for the stage.")
          .optional(),
        parallelInputs: z.string().describe(
          "Number of parallel input segments to be processed",
        ).optional(),
        readMsAvg: z.string().describe(
          "Milliseconds the average shard spent reading input.",
        ).optional(),
        readMsMax: z.string().describe(
          "Milliseconds the slowest shard spent reading input.",
        ).optional(),
        readRatioAvg: z.number().describe(
          "Relative amount of time the average shard spent reading input.",
        ).optional(),
        readRatioMax: z.number().describe(
          "Relative amount of time the slowest shard spent reading input.",
        ).optional(),
        recordsRead: z.string().describe(
          "Number of records read into the stage.",
        ).optional(),
        recordsWritten: z.string().describe(
          "Number of records written by the stage.",
        ).optional(),
        shuffleOutputBytes: z.string().describe(
          "Total number of bytes written to shuffle.",
        ).optional(),
        shuffleOutputBytesSpilled: z.string().describe(
          "Total number of bytes written to shuffle and spilled to disk.",
        ).optional(),
        slotMs: z.string().describe("Slot-milliseconds used by the stage.")
          .optional(),
        startMs: z.string().describe(
          "Stage start time represented as milliseconds since the epoch.",
        ).optional(),
        status: z.string().describe("Current status for this stage.")
          .optional(),
        steps: z.array(z.object({
          kind: z.string().describe("Machine-readable operation type.")
            .optional(),
          substeps: z.array(z.string()).describe(
            "Human-readable description of the step(s).",
          ).optional(),
        })).describe(
          "List of operations within the stage in dependency order (approximately chronological).",
        ).optional(),
        waitMsAvg: z.string().describe(
          "Milliseconds the average shard spent waiting to be scheduled.",
        ).optional(),
        waitMsMax: z.string().describe(
          "Milliseconds the slowest shard spent waiting to be scheduled.",
        ).optional(),
        waitRatioAvg: z.number().describe(
          "Relative amount of time the average shard spent waiting to be scheduled.",
        ).optional(),
        waitRatioMax: z.number().describe(
          "Relative amount of time the slowest shard spent waiting to be scheduled.",
        ).optional(),
        writeMsAvg: z.string().describe(
          "Milliseconds the average shard spent on writing output.",
        ).optional(),
        writeMsMax: z.string().describe(
          "Milliseconds the slowest shard spent on writing output.",
        ).optional(),
        writeRatioAvg: z.number().describe(
          "Relative amount of time the average shard spent on writing output.",
        ).optional(),
        writeRatioMax: z.number().describe(
          "Relative amount of time the slowest shard spent on writing output.",
        ).optional(),
      })).describe("Output only. Describes execution plan for the query.")
        .optional(),
      referencedPropertyGraphs: z.array(z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this property graph.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this property graph.",
        ).optional(),
        propertyGraphId: z.string().describe(
          "Required. The ID of the property graph. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
        ).optional(),
      })).describe(
        "Output only. Referenced property graphs for the job. Queries that reference more than 50 property graphs will not have a complete list.",
      ).optional(),
      referencedRoutines: z.array(z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this routine.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this routine.",
        ).optional(),
        routineId: z.string().describe(
          "Required. The ID of the routine. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters.",
        ).optional(),
      })).describe("Output only. Referenced routines for the job.").optional(),
      referencedTables: z.array(z.object({
        datasetId: z.string().describe(
          "Required. The ID of the dataset containing this table.",
        ).optional(),
        projectId: z.string().describe(
          "Required. The ID of the project containing this table.",
        ).optional(),
        tableId: z.string().describe(
          "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
        ).optional(),
      })).describe("Output only. Referenced tables for the job.").optional(),
      reservationUsage: z.array(z.object({
        name: z.string().describe(
          'Reservation name or "unreserved" for on-demand resource usage and multi-statement queries.',
        ).optional(),
        slotMs: z.string().describe(
          "Total slot milliseconds used by the reservation for a particular job.",
        ).optional(),
      })).describe(
        "Output only. Job resource usage breakdown by reservation. This field reported misleading information and will no longer be populated.",
      ).optional(),
      schema: z.object({
        fields: z.array(z.object({
          categories: z.object({
            names: z.array(z.string()).describe("Deprecated.").optional(),
          }).describe("Deprecated.").optional(),
          collation: z.string().describe(
            "Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior.",
          ).optional(),
          dataPolicies: z.array(z.object({
            name: z.string().describe(
              "Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id.",
            ).optional(),
          })).describe(
            "Optional. Data policies attached to this field, used for field-level access control.",
          ).optional(),
          defaultValueExpression: z.string().describe(
            "Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field.",
          ).optional(),
          description: z.string().describe(
            "Optional. The field description. The maximum length is 1,024 characters.",
          ).optional(),
          fields: z.array(z.string()).describe(
            "Optional. Describes the nested schema fields if the type property is set to RECORD.",
          ).optional(),
          foreignTypeDefinition: z.string().describe(
            "Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required.",
          ).optional(),
          generatedColumn: z.object({
            generatedExpressionInfo: z.object({
              asynchronous: z.boolean().describe(
                "Optional. Whether the column generation is done asynchronously.",
              ).optional(),
              generationExpression: z.string().describe(
                "Optional. The generation expression (e.g. AI.EMBED(...)) used to generated the field.",
              ).optional(),
              stored: z.boolean().describe(
                "Optional. Whether the generated column is stored in the table.",
              ).optional(),
            }).describe(
              "Definition of the expression used to generate the field.",
            ).optional(),
            generatedMode: z.enum([
              "GENERATED_MODE_UNSPECIFIED",
              "GENERATED_ALWAYS",
              "GENERATED_BY_DEFAULT",
            ]).describe(
              "Optional. Dictates when system generated values are used to populate the field.",
            ).optional(),
          }).describe(
            "Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).",
          ).optional(),
          maxLength: z.string().describe(
            'Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES".',
          ).optional(),
          mode: z.string().describe(
            "Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE.",
          ).optional(),
          name: z.string().describe(
            "Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters.",
          ).optional(),
          policyTags: z.object({
            names: z.array(z.string()).describe(
              'A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed.',
            ).optional(),
          }).describe(
            "Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags.",
          ).optional(),
          precision: z.string().describe(
            'Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid.',
          ).optional(),
          rangeElementType: z.object({
            type: z.string().describe(
              "Required. The type of a field element. For more information, see TableFieldSchema.type.",
            ).optional(),
          }).describe("Represents the type of a field element.").optional(),
          roundingMode: z.enum([
            "ROUNDING_MODE_UNSPECIFIED",
            "ROUND_HALF_AWAY_FROM_ZERO",
            "ROUND_HALF_EVEN",
          ]).describe(
            "Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type.",
          ).optional(),
          scale: z.string().describe(
            "Optional. See documentation for precision.",
          ).optional(),
          timestampPrecision: z.string().describe(
            "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
          ).optional(),
          type: z.string().describe(
            "Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema.",
          ).optional(),
        })).describe("Describes the fields in a table.").optional(),
        foreignTypeInfo: z.object({
          typeSystem: z.enum(["TYPE_SYSTEM_UNSPECIFIED", "HIVE"]).describe(
            "Required. Specifies the system which defines the foreign data type.",
          ).optional(),
        }).describe(
          "Metadata about the foreign data type definition such as the system in which the type is defined.",
        ).optional(),
      }).describe("Schema of a table").optional(),
      searchStatistics: z.object({
        indexPruningStats: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          indexId: z.string().describe("The index id.").optional(),
          postIndexPruningParallelInputCount: z.string().describe(
            "The number of parallel inputs after index pruning.",
          ).optional(),
          preIndexPruningParallelInputCount: z.string().describe(
            "The number of parallel inputs before index pruning.",
          ).optional(),
        })).describe(
          "Search index pruning statistics, one for each base table that has a search index. If a base table does not have a search index or the index does not help with pruning on the base table, then there is no pruning statistics for that table.",
        ).optional(),
        indexUnusedReasons: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          code: z.enum([
            "CODE_UNSPECIFIED",
            "INDEX_CONFIG_NOT_AVAILABLE",
            "PENDING_INDEX_CREATION",
            "BASE_TABLE_TRUNCATED",
            "INDEX_CONFIG_MODIFIED",
            "TIME_TRAVEL_QUERY",
            "NO_PRUNING_POWER",
            "UNINDEXED_SEARCH_FIELDS",
            "UNSUPPORTED_SEARCH_PATTERN",
            "OPTIMIZED_WITH_MATERIALIZED_VIEW",
            "SECURED_BY_DATA_MASKING",
            "MISMATCHED_TEXT_ANALYZER",
            "BASE_TABLE_TOO_SMALL",
            "BASE_TABLE_TOO_LARGE",
            "ESTIMATED_PERFORMANCE_GAIN_TOO_LOW",
            "COLUMN_METADATA_INDEX_NOT_USED",
            "NOT_SUPPORTED_IN_STANDARD_EDITION",
            "INDEX_SUPPRESSED_BY_FUNCTION_OPTION",
            "QUERY_CACHE_HIT",
            "STALE_INDEX",
            "INTERNAL_ERROR",
            "OTHER_REASON",
          ]).describe(
            "Specifies the high-level reason for the scenario when no search index was used.",
          ).optional(),
          indexName: z.string().describe(
            "Specifies the name of the unused search index, if available.",
          ).optional(),
          message: z.string().describe(
            "Free form human-readable reason for the scenario when no search index was used.",
          ).optional(),
        })).describe(
          "When `indexUsageMode` is `UNUSED` or `PARTIALLY_USED`, this field explains why indexes were not used in all or part of the search query. If `indexUsageMode` is `FULLY_USED`, this field is not populated.",
        ).optional(),
        indexUsageMode: z.enum([
          "INDEX_USAGE_MODE_UNSPECIFIED",
          "UNUSED",
          "PARTIALLY_USED",
          "FULLY_USED",
        ]).describe("Specifies the index usage mode for the query.").optional(),
      }).describe(
        "Statistics for a search query. Populated as part of JobStatistics2.",
      ).optional(),
      sparkStatistics: z.object({
        endpoints: z.record(z.string(), z.string()).describe(
          "Output only. Endpoints returned from Dataproc. Key list: - history_server_endpoint: A link to Spark job UI.",
        ).optional(),
        gcsStagingBucket: z.string().describe(
          "Output only. The Google Cloud Storage bucket that is used as the default file system by the Spark application. This field is only filled when the Spark procedure uses the invoker security mode. The `gcsStagingBucket` bucket is inferred from the `@@spark_proc_properties.staging_bucket` system variable (if it is provided). Otherwise, BigQuery creates a default staging bucket for the job and returns the bucket name in this field. Example: * `gs://[bucket_name]`",
        ).optional(),
        kmsKeyName: z.string().describe(
          "Output only. The Cloud KMS encryption key that is used to protect the resources created by the Spark job. If the Spark procedure uses the invoker security mode, the Cloud KMS encryption key is either inferred from the provided system variable, `@@spark_proc_properties.kms_key_name`, or the default key of the BigQuery job's project (if the CMEK organization policy is enforced). Otherwise, the Cloud KMS key is either inferred from the Spark connection associated with the procedure (if it is provided), or from the default key of the Spark connection's project if the CMEK organization policy is enforced. Example: * `projects/[kms_project_id]/locations/[region]/keyRings/[key_region]/cryptoKeys/[key]`",
        ).optional(),
        loggingInfo: z.object({
          projectId: z.string().describe(
            "Output only. Project ID where the Spark logs were written.",
          ).optional(),
          resourceType: z.string().describe(
            "Output only. Resource type used for logging.",
          ).optional(),
        }).describe(
          "Spark job logs can be filtered by these fields in Cloud Logging.",
        ).optional(),
        sparkJobId: z.string().describe(
          "Output only. Spark job ID if a Spark job is created successfully.",
        ).optional(),
        sparkJobLocation: z.string().describe(
          "Output only. Location where the Spark job is executed. A location is selected by BigQueury for jobs configured to run in a multi-region.",
        ).optional(),
      }).describe(
        "Statistics for a BigSpark query. Populated as part of JobStatistics2",
      ).optional(),
      statementType: z.string().describe(
        "Output only. The type of query statement, if valid. Possible values: * `SELECT`: [`SELECT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#select_list) statement. * `ASSERT`: [`ASSERT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements#assert) statement. * `INSERT`: [`INSERT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#insert_statement) statement. * `UPDATE`: [`UPDATE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#update_statement) statement. * `DELETE`: [`DELETE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. * `MERGE`: [`MERGE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. * `CREATE_TABLE`: [`CREATE TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement, without `AS SELECT`. * `CREATE_TABLE_AS_SELECT`: [`CREATE TABLE AS SELECT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement. * `CREATE_VIEW`: [`CREATE VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_view_statement) statement. * `CREATE_MODEL`: [`CREATE MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-create#create_model_statement) statement. * `CREATE_MATERIALIZED_VIEW`: [`CREATE MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_materialized_view_statement) statement. * `CREATE_FUNCTION`: [`CREATE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_function_statement) statement. * `CREATE_TABLE_FUNCTION`: [`CREATE TABLE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_function_statement) statement. * `CREATE_PROCEDURE`: [`CREATE PROCEDURE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_procedure) statement. * `CREATE_ROW_ACCESS_POLICY`: [`CREATE ROW ACCESS POLICY`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_row_access_policy_statement) statement. * `CREATE_SCHEMA`: [`CREATE SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_schema_statement) statement. * `CREATE_SNAPSHOT_TABLE`: [`CREATE SNAPSHOT TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_snapshot_table_statement) statement. * `CREATE_SEARCH_INDEX`: [`CREATE SEARCH INDEX`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_search_index_statement) statement. * `DROP_TABLE`: [`DROP TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_statement) statement. * `DROP_EXTERNAL_TABLE`: [`DROP EXTERNAL TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_external_table_statement) statement. * `DROP_VIEW`: [`DROP VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_view_statement) statement. * `DROP_MODEL`: [`DROP MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-drop-model) statement. * `DROP_MATERIALIZED_VIEW`: [`DROP MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_materialized_view_statement) statement. * `DROP_FUNCTION`: [`DROP FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_function_statement) statement. * `DROP_TABLE_FUNCTION`: [`DROP TABLE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_function) statement. * `DROP_PROCEDURE`: [`DROP PROCEDURE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_procedure_statement) statement. * `DROP_SEARCH_INDEX`: [`DROP SEARCH INDEX`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_search_index) statement. * `DROP_SCHEMA`: [`DROP SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_schema_statement) statement. * `DROP_SNAPSHOT_TABLE`: [`DROP SNAPSHOT TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_snapshot_table_statement) statement. * `DROP_ROW_ACCESS_POLICY`: [`DROP [ALL] ROW ACCESS POLICY|POLICIES`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_row_access_policy_statement) statement. * `ALTER_TABLE`: [`ALTER TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_table_set_options_statement) statement. * `ALTER_VIEW`: [`ALTER VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_view_set_options_statement) statement. * `ALTER_MATERIALIZED_VIEW`: [`ALTER MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_materialized_view_set_options_statement) statement. * `ALTER_SCHEMA`: [`ALTER SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_schema_set_options_statement) statement. * `SCRIPT`: [`SCRIPT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language). * `TRUNCATE_TABLE`: [`TRUNCATE TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#truncate_table_statement) statement. * `CREATE_EXTERNAL_TABLE`: [`CREATE EXTERNAL TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_external_table_statement) statement. * `EXPORT_DATA`: [`EXPORT DATA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements#export_data_statement) statement. * `EXPORT_MODEL`: [`EXPORT MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-export-model) statement. * `LOAD_DATA`: [`LOAD DATA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements#load_data_statement) statement. * `CALL`: [`CALL`](https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#call) statement.",
      ).optional(),
      timeline: z.array(z.object({
        activeUnits: z.string().describe(
          "Total number of active workers. This does not correspond directly to slot usage. This is the largest value observed since the last sample.",
        ).optional(),
        completedUnits: z.string().describe(
          "Total parallel units of work completed by this query.",
        ).optional(),
        elapsedMs: z.string().describe(
          "Milliseconds elapsed since the start of query execution.",
        ).optional(),
        estimatedRunnableUnits: z.string().describe(
          "Units of work that can be scheduled immediately. Providing additional slots for these units of work will accelerate the query, if no other query in the reservation needs additional slots.",
        ).optional(),
        pendingUnits: z.string().describe(
          "Total units of work remaining for the query. This number can be revised (increased or decreased) while the query is running.",
        ).optional(),
        shuffleRamUsageRatio: z.number().describe(
          "Total shuffle usage ratio in shuffle RAM per reservation of this query. This will be provided for reservation customers only.",
        ).optional(),
        totalSlotMs: z.string().describe(
          "Cumulative slot-ms consumed by the query.",
        ).optional(),
      })).describe("Output only. Describes a timeline of job execution.")
        .optional(),
      totalBytesBilled: z.string().describe(
        "Output only. If the project is configured to use on-demand pricing, then this field contains the total bytes billed for the job. If the project is configured to use flat-rate pricing, then you are not billed for bytes and this field is informational only.",
      ).optional(),
      totalBytesProcessed: z.string().describe(
        "Output only. Total bytes processed for the job.",
      ).optional(),
      totalBytesProcessedAccuracy: z.string().describe(
        "Output only. For dry-run jobs, totalBytesProcessed is an estimate and this field specifies the accuracy of the estimate. Possible values can be: UNKNOWN: accuracy of the estimate is unknown. PRECISE: estimate is precise. LOWER_BOUND: estimate is lower bound of what the query would cost. UPPER_BOUND: estimate is upper bound of what the query would cost.",
      ).optional(),
      totalPartitionsProcessed: z.string().describe(
        "Output only. Total number of partitions processed from all partitioned tables referenced in the job.",
      ).optional(),
      totalServicesSkuSlotMs: z.string().describe(
        'Output only. Total slot milliseconds for the job that ran on external services and billed on the services SKU. This field is only populated for jobs that have external service costs, and is the total of the usage for costs whose billing method is `"SERVICES_SKU"`.',
      ).optional(),
      totalSlotMs: z.string().describe(
        "Output only. Slot-milliseconds for the job.",
      ).optional(),
      transferredBytes: z.string().describe(
        "Output only. Total bytes transferred for cross-cloud queries such as Cross Cloud Transfer and CREATE TABLE AS SELECT (CTAS).",
      ).optional(),
      undeclaredQueryParameters: z.array(z.object({
        name: z.string().describe(
          "Optional. If unset, this is a positional parameter. Otherwise, should be unique within a query.",
        ).optional(),
        parameterType: z.object({
          arrayType: z.string().describe(
            "Circular reference to QueryParameterType",
          ).optional(),
          rangeElementType: z.string().describe(
            "Circular reference to QueryParameterType",
          ).optional(),
          structTypes: z.array(z.object({
            description: z.string().describe(
              "Optional. Human-oriented description of the field.",
            ).optional(),
            name: z.string().describe("Optional. The name of this field.")
              .optional(),
            type: z.string().describe(
              "Circular reference to QueryParameterType",
            ).optional(),
          })).describe(
            "Optional. The types of the fields of this struct, in order, if this is a struct.",
          ).optional(),
          timestampPrecision: z.string().describe(
            "Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision)",
          ).optional(),
          type: z.string().describe(
            "Required. The top level type of this field.",
          ).optional(),
        }).describe("The type of a query parameter.").optional(),
        parameterValue: z.object({
          arrayValues: z.array(z.string()).describe(
            "Optional. The array values, if this is an array type.",
          ).optional(),
          rangeValue: z.object({
            end: z.string().describe(
              "Circular reference to QueryParameterValue",
            ).optional(),
            start: z.string().describe(
              "Circular reference to QueryParameterValue",
            ).optional(),
          }).describe("Represents the value of a range.").optional(),
          structValues: z.record(z.string(), z.string()).describe(
            "The struct field values.",
          ).optional(),
          value: z.string().describe(
            "Optional. The value of this value, if a simple scalar type.",
          ).optional(),
        }).describe("The value of a query parameter.").optional(),
      })).describe(
        "Output only. GoogleSQL only: list of undeclared query parameters detected during a dry run validation.",
      ).optional(),
      vectorSearchStatistics: z.object({
        indexUnusedReasons: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          code: z.enum([
            "CODE_UNSPECIFIED",
            "INDEX_CONFIG_NOT_AVAILABLE",
            "PENDING_INDEX_CREATION",
            "BASE_TABLE_TRUNCATED",
            "INDEX_CONFIG_MODIFIED",
            "TIME_TRAVEL_QUERY",
            "NO_PRUNING_POWER",
            "UNINDEXED_SEARCH_FIELDS",
            "UNSUPPORTED_SEARCH_PATTERN",
            "OPTIMIZED_WITH_MATERIALIZED_VIEW",
            "SECURED_BY_DATA_MASKING",
            "MISMATCHED_TEXT_ANALYZER",
            "BASE_TABLE_TOO_SMALL",
            "BASE_TABLE_TOO_LARGE",
            "ESTIMATED_PERFORMANCE_GAIN_TOO_LOW",
            "COLUMN_METADATA_INDEX_NOT_USED",
            "NOT_SUPPORTED_IN_STANDARD_EDITION",
            "INDEX_SUPPRESSED_BY_FUNCTION_OPTION",
            "QUERY_CACHE_HIT",
            "STALE_INDEX",
            "INTERNAL_ERROR",
            "OTHER_REASON",
          ]).describe(
            "Specifies the high-level reason for the scenario when no search index was used.",
          ).optional(),
          indexName: z.string().describe(
            "Specifies the name of the unused search index, if available.",
          ).optional(),
          message: z.string().describe(
            "Free form human-readable reason for the scenario when no search index was used.",
          ).optional(),
        })).describe(
          "When `indexUsageMode` is `UNUSED` or `PARTIALLY_USED`, this field explains why indexes were not used in all or part of the vector search query. If `indexUsageMode` is `FULLY_USED`, this field is not populated.",
        ).optional(),
        indexUsageMode: z.enum([
          "INDEX_USAGE_MODE_UNSPECIFIED",
          "UNUSED",
          "PARTIALLY_USED",
          "FULLY_USED",
        ]).describe("Specifies the index usage mode for the query.").optional(),
        storedColumnsUsages: z.array(z.object({
          baseTable: z.object({
            datasetId: z.string().describe(
              "Required. The ID of the dataset containing this table.",
            ).optional(),
            projectId: z.string().describe(
              "Required. The ID of the project containing this table.",
            ).optional(),
            tableId: z.string().describe(
              "Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`.",
            ).optional(),
          }).optional(),
          isQueryAccelerated: z.boolean().describe(
            "Specifies whether the query was accelerated with stored columns.",
          ).optional(),
          storedColumnsUnusedReasons: z.array(z.object({
            code: z.enum([
              "CODE_UNSPECIFIED",
              "STORED_COLUMNS_COVER_INSUFFICIENT",
              "BASE_TABLE_HAS_RLS",
              "BASE_TABLE_HAS_CLS",
              "UNSUPPORTED_PREFILTER",
              "INTERNAL_ERROR",
              "OTHER_REASON",
            ]).describe(
              "Specifies the high-level reason for the unused scenario, each reason must have a code associated.",
            ).optional(),
            message: z.string().describe(
              "Specifies the detailed description for the scenario.",
            ).optional(),
            uncoveredColumns: z.array(z.string()).describe(
              "Specifies which columns were not covered by the stored columns for the specified code up to 20 columns. This is populated when the code is STORED_COLUMNS_COVER_INSUFFICIENT and BASE_TABLE_HAS_CLS.",
            ).optional(),
          })).describe("If stored columns were not used, explain why.")
            .optional(),
        })).describe(
          "Specifies the usage of stored columns in the query when stored columns are used in the query.",
        ).optional(),
      }).describe(
        "Statistics for a vector search query. Populated as part of JobStatistics2.",
      ).optional(),
    }).describe("Statistics for a query job.").optional(),
    quotaDeferments: z.array(z.string()).describe(
      "Output only. Quotas which delayed this job's start time.",
    ).optional(),
    reservationGroupPath: z.array(z.string()).describe(
      "Output only. The reservation group path of the reservation assigned to this job. This field has a limit of 10 nested reservation groups. This is to maintain consistency between reservatins info schema and jobs info schema. The first reservation group is the root reservation group and the last is the leaf or lowest level reservation group.",
    ).optional(),
    reservationUsage: z.array(z.object({
      name: z.string().describe(
        'Reservation name or "unreserved" for on-demand resource usage and multi-statement queries.',
      ).optional(),
      slotMs: z.string().describe(
        "Total slot milliseconds used by the reservation for a particular job.",
      ).optional(),
    })).describe(
      "Output only. Job resource usage breakdown by reservation. This field reported misleading information and will no longer be populated.",
    ).optional(),
    reservation_id: z.string().describe(
      "Output only. Name of the primary reservation assigned to this job. Note that this could be different than reservations reported in the reservation usage field if parent reservations were used to execute this job.",
    ).optional(),
    rowLevelSecurityStatistics: z.object({
      rowLevelSecurityApplied: z.boolean().describe(
        "Whether any accessed data was protected by row access policies.",
      ).optional(),
    }).describe("Statistics for row-level security.").optional(),
    scriptStatistics: z.object({
      evaluationKind: z.enum([
        "EVALUATION_KIND_UNSPECIFIED",
        "STATEMENT",
        "EXPRESSION",
      ]).describe("Whether this child job was a statement or expression.")
        .optional(),
      stackFrames: z.array(z.object({
        endColumn: z.number().int().describe(
          "Output only. One-based end column.",
        ).optional(),
        endLine: z.number().int().describe("Output only. One-based end line.")
          .optional(),
        procedureId: z.string().describe(
          "Output only. Name of the active procedure, empty if in a top-level script.",
        ).optional(),
        startColumn: z.number().int().describe(
          "Output only. One-based start column.",
        ).optional(),
        startLine: z.number().int().describe(
          "Output only. One-based start line.",
        ).optional(),
        text: z.string().describe(
          "Output only. Text of the current statement/expression.",
        ).optional(),
      })).describe(
        "Stack trace showing the line/column/procedure name of each frame on the stack at the point where the current evaluation happened. The leaf frame is first, the primary script is last. Never empty.",
      ).optional(),
    }).describe("Job statistics specific to the child job of a script.")
      .optional(),
    sessionInfo: z.object({
      sessionId: z.string().describe("Output only. The id of the session.")
        .optional(),
    }).describe("[Preview] Information related to sessions.").optional(),
    startTime: z.string().describe(
      "Output only. Start time of this job, in milliseconds since the epoch. This field will be present when the job transitions from the PENDING state to either RUNNING or DONE.",
    ).optional(),
    totalBytesProcessed: z.string().describe(
      "Output only. Total bytes processed for the job.",
    ).optional(),
    totalSlotMs: z.string().describe(
      "Output only. Slot-milliseconds for the job.",
    ).optional(),
    transactionInfo: z.object({
      transactionId: z.string().describe(
        "Output only. [Alpha] Id of the transaction.",
      ).optional(),
    }).describe("[Alpha] Information of a multi-statement transaction.")
      .optional(),
  }).describe("Statistics for a single job execution.").optional(),
  status: z.object({
    errorResult: z.object({
      debugInfo: z.string().describe(
        "Debugging information. This property is internal to Google and should not be used.",
      ).optional(),
      location: z.string().describe(
        "Specifies where the error occurred, if present.",
      ).optional(),
      message: z.string().describe("A human-readable description of the error.")
        .optional(),
      reason: z.string().describe(
        "A short error code that summarizes the error.",
      ).optional(),
    }).describe("Error details.").optional(),
    errors: z.array(z.object({
      debugInfo: z.string().describe(
        "Debugging information. This property is internal to Google and should not be used.",
      ).optional(),
      location: z.string().describe(
        "Specifies where the error occurred, if present.",
      ).optional(),
      message: z.string().describe("A human-readable description of the error.")
        .optional(),
      reason: z.string().describe(
        "A short error code that summarizes the error.",
      ).optional(),
    })).describe(
      "Output only. The first errors encountered during the running of the job. The final message includes the number of errors that caused the process to stop. Errors here do not necessarily mean that the job has not completed or was unsuccessful.",
    ).optional(),
    state: z.string().describe(
      "Output only. Running state of the job. Valid states include 'PENDING', 'RUNNING', and 'DONE'.",
    ).optional(),
  }).optional(),
});

export const model = {
  type: "@swamp/gcp/bigquery/jobs",
  version: "2026.04.03.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Returns information about a specific job. Job information is available for a ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["configuration"] !== undefined) {
          body["configuration"] = g["configuration"];
        }
        if (g["jobCreationReason"] !== undefined) {
          body["jobCreationReason"] = g["jobCreationReason"];
        }
        if (g["jobReference"] !== undefined) {
          body["jobReference"] = g["jobReference"];
        }
        if (g["statistics"] !== undefined) body["statistics"] = g["statistics"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["name"] !== undefined) params["jobId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = g.name?.toString() ?? "current";
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["jobId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = g.name?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the jobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["jobId"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = g.name?.toString() ?? args.identifier;
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
      description: "Sync jobs state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = g.name?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["jobId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["jobId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigquery.jobs.cancel",
            "path": "projects/{+projectId}/jobs/{+jobId}/cancel",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "jobId"],
            "parameters": {
              "jobId": { "location": "path", "required": true },
              "location": { "location": "query" },
              "projectId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_query_results: {
      description: "get query results",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          g.name?.toString() ?? "current",
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["jobId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigquery.jobs.getQueryResults",
            "path": "projects/{+projectId}/queries/{+jobId}",
            "httpMethod": "GET",
            "parameterOrder": ["projectId", "jobId"],
            "parameters": {
              "formatOptions.timestampOutputFormat": { "location": "query" },
              "formatOptions.useInt64Timestamp": { "location": "query" },
              "jobId": { "location": "path", "required": true },
              "location": { "location": "query" },
              "maxResults": { "location": "query" },
              "pageToken": { "location": "query" },
              "projectId": { "location": "path", "required": true },
              "startIndex": { "location": "query" },
              "timeoutMs": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    query: {
      description: "query",
      arguments: z.object({
        connectionProperties: z.any().optional(),
        continuous: z.any().optional(),
        createSession: z.any().optional(),
        defaultDataset: z.any().optional(),
        destinationEncryptionConfiguration: z.any().optional(),
        dryRun: z.any().optional(),
        formatOptions: z.any().optional(),
        jobCreationMode: z.any().optional(),
        jobTimeoutMs: z.any().optional(),
        kind: z.any().optional(),
        labels: z.any().optional(),
        location: z.any().optional(),
        maxResults: z.any().optional(),
        maxSlots: z.any().optional(),
        maximumBytesBilled: z.any().optional(),
        parameterMode: z.any().optional(),
        preserveNulls: z.any().optional(),
        query: z.any().optional(),
        queryParameters: z.any().optional(),
        requestId: z.any().optional(),
        reservation: z.any().optional(),
        timeoutMs: z.any().optional(),
        useLegacySql: z.any().optional(),
        useQueryCache: z.any().optional(),
        writeIncrementalResults: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["connectionProperties"] !== undefined) {
          body["connectionProperties"] = args["connectionProperties"];
        }
        if (args["continuous"] !== undefined) {
          body["continuous"] = args["continuous"];
        }
        if (args["createSession"] !== undefined) {
          body["createSession"] = args["createSession"];
        }
        if (args["defaultDataset"] !== undefined) {
          body["defaultDataset"] = args["defaultDataset"];
        }
        if (args["destinationEncryptionConfiguration"] !== undefined) {
          body["destinationEncryptionConfiguration"] =
            args["destinationEncryptionConfiguration"];
        }
        if (args["dryRun"] !== undefined) body["dryRun"] = args["dryRun"];
        if (args["formatOptions"] !== undefined) {
          body["formatOptions"] = args["formatOptions"];
        }
        if (args["jobCreationMode"] !== undefined) {
          body["jobCreationMode"] = args["jobCreationMode"];
        }
        if (args["jobTimeoutMs"] !== undefined) {
          body["jobTimeoutMs"] = args["jobTimeoutMs"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["location"] !== undefined) body["location"] = args["location"];
        if (args["maxResults"] !== undefined) {
          body["maxResults"] = args["maxResults"];
        }
        if (args["maxSlots"] !== undefined) body["maxSlots"] = args["maxSlots"];
        if (args["maximumBytesBilled"] !== undefined) {
          body["maximumBytesBilled"] = args["maximumBytesBilled"];
        }
        if (args["parameterMode"] !== undefined) {
          body["parameterMode"] = args["parameterMode"];
        }
        if (args["preserveNulls"] !== undefined) {
          body["preserveNulls"] = args["preserveNulls"];
        }
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["queryParameters"] !== undefined) {
          body["queryParameters"] = args["queryParameters"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["reservation"] !== undefined) {
          body["reservation"] = args["reservation"];
        }
        if (args["timeoutMs"] !== undefined) {
          body["timeoutMs"] = args["timeoutMs"];
        }
        if (args["useLegacySql"] !== undefined) {
          body["useLegacySql"] = args["useLegacySql"];
        }
        if (args["useQueryCache"] !== undefined) {
          body["useQueryCache"] = args["useQueryCache"];
        }
        if (args["writeIncrementalResults"] !== undefined) {
          body["writeIncrementalResults"] = args["writeIncrementalResults"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigquery.jobs.query",
            "path": "projects/{+projectId}/queries",
            "httpMethod": "POST",
            "parameterOrder": ["projectId"],
            "parameters": {
              "projectId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
