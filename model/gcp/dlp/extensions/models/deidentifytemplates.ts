// Auto-generated extension model for @swamp/gcp/dlp/deidentifytemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/deidentifyTemplates/${shortName}`;
}

const BASE_URL = "https://dlp.googleapis.com/";

const GET_CONFIG = {
  "id": "dlp.organizations.deidentifyTemplates.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dlp.organizations.deidentifyTemplates.create",
  "path": "v2/{+parent}/deidentifyTemplates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dlp.organizations.deidentifyTemplates.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dlp.organizations.deidentifyTemplates.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  deidentifyTemplate: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of an inspectTemplate.",
    ).optional(),
    deidentifyConfig: z.object({
      imageTransformations: z.object({
        transforms: z.array(z.object({
          allInfoTypes: z.object({}).describe(
            "Apply transformation to all findings.",
          ).optional(),
          allText: z.object({}).describe("Apply to all text.").optional(),
          redactionColor: z.object({
            blue: z.number().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.number().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.number().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("Represents a color in the RGB color space.").optional(),
          selectedInfoTypes: z.object({
            infoTypes: z.array(z.object({
              name: z.string().describe(
                "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
              ).optional(),
              sensitivityScore: z.object({
                score: z.enum([
                  "SENSITIVITY_SCORE_UNSPECIFIED",
                  "SENSITIVITY_LOW",
                  "SENSITIVITY_UNKNOWN",
                  "SENSITIVITY_MODERATE",
                  "SENSITIVITY_HIGH",
                ]).describe("The sensitivity score applied to the resource.")
                  .optional(),
              }).describe(
                "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
              ).optional(),
              version: z.string().describe(
                "Optional version name for this InfoType.",
              ).optional(),
            })).describe(
              "Required. InfoTypes to apply the transformation to. Required. Provided InfoType must be unique within the ImageTransformations message.",
            ).optional(),
          }).describe("Apply transformation to the selected info_types.")
            .optional(),
        })).describe("List of transforms to make.").optional(),
      }).describe("A type of transformation that is applied over images.")
        .optional(),
      infoTypeTransformations: z.object({
        transformations: z.array(z.object({
          infoTypes: z.array(z.object({
            name: z.string().describe(
              "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
            ).optional(),
            sensitivityScore: z.object({
              score: z.enum([
                "SENSITIVITY_SCORE_UNSPECIFIED",
                "SENSITIVITY_LOW",
                "SENSITIVITY_UNKNOWN",
                "SENSITIVITY_MODERATE",
                "SENSITIVITY_HIGH",
              ]).describe("The sensitivity score applied to the resource.")
                .optional(),
            }).describe(
              "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
            ).optional(),
            version: z.string().describe(
              "Optional version name for this InfoType.",
            ).optional(),
          })).describe(
            "InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`.",
          ).optional(),
          primitiveTransformation: z.object({
            bucketingConfig: z.object({
              buckets: z.array(z.object({
                max: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
                min: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
                replacementValue: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
              })).describe("Set of buckets. Ranges must be non-overlapping.")
                .optional(),
            }).describe(
              "Generalization function that buckets values based on ranges. The ranges and replacement values are dynamically provided by the user for custom behavior, such as 1-30 -> LOW, 31-65 -> MEDIUM, 66-100 -> HIGH. This can be used on data of type: number, long, string, timestamp. If the bound `Value` type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.",
            ).optional(),
            characterMaskConfig: z.object({
              charactersToIgnore: z.array(z.object({
                charactersToSkip: z.string().describe(
                  "Characters to not transform when masking.",
                ).optional(),
                commonCharactersToIgnore: z.enum([
                  "COMMON_CHARS_TO_IGNORE_UNSPECIFIED",
                  "NUMERIC",
                  "ALPHA_UPPER_CASE",
                  "ALPHA_LOWER_CASE",
                  "PUNCTUATION",
                  "WHITESPACE",
                ]).describe(
                  "Common characters to not transform when masking. Useful to avoid removing punctuation.",
                ).optional(),
              })).describe(
                "When masking a string, items in this list will be skipped when replacing characters. For example, if the input string is `555-555-5555` and you instruct Cloud DLP to skip `-` and mask 5 characters with `*`, Cloud DLP returns `***-**5-5555`.",
              ).optional(),
              maskingCharacter: z.string().describe(
                "Character to use to mask the sensitive values—for example, `*` for an alphabetic string such as a name, or `0` for a numeric string such as ZIP code or credit card number. This string must have a length of 1. If not supplied, this value defaults to `*` for strings, and `0` for digits.",
              ).optional(),
              numberToMask: z.number().int().describe(
                "Number of characters to mask. If not set, all matching chars will be masked. Skipped characters do not count towards this tally. If `number_to_mask` is negative, this denotes inverse masking. Cloud DLP masks all but a number of characters. For example, suppose you have the following values: - `masking_character` is `*` - `number_to_mask` is `-4` - `reverse_order` is `false` - `CharsToIgnore` includes `-` - Input string is `1234-5678-9012-3456` The resulting de-identified string is `****-****-****-3456`. Cloud DLP masks all but the last four characters. If `reverse_order` is `true`, all but the first four characters are masked as `1234-****-****-****`.",
              ).optional(),
              reverseOrder: z.boolean().describe(
                "Mask characters in reverse order. For example, if `masking_character` is `0`, `number_to_mask` is `14`, and `reverse_order` is `false`, then the input string `1234-5678-9012-3456` is masked as `00000000000000-3456`. If `masking_character` is `*`, `number_to_mask` is `3`, and `reverse_order` is `true`, then the string `12345` is masked as `12***`.",
              ).optional(),
            }).describe(
              "Partially mask a string by replacing a given number of characters with a fixed character. Masking can start from the beginning or end of the string. This can be used on data of any type (numbers, longs, and so on) and when de-identifying structured data we'll attempt to preserve the original data's type. (This allows you to take a long like 123 and modify it to a string like **3.",
            ).optional(),
            cryptoDeterministicConfig: z.object({
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              surrogateInfoType: z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              }).describe("Type of information detected by the API.")
                .optional(),
            }).describe(
              "Pseudonymization method that generates deterministic encryption for the given input. Outputs a base64 encoded representation of the encrypted output. Uses AES-SIV based on the RFC https://tools.ietf.org/html/rfc5297.",
            ).optional(),
            cryptoHashConfig: z.object({
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
            }).describe(
              "Pseudonymization method that generates surrogates via cryptographic hashing. Uses SHA-256. The key size must be either 32 or 64 bytes. Outputs a base64 encoded representation of the hashed output (for example, L7k0BHmF1ha5U3NfGykjro4xWi1MPVQPjhMAZbSV9mM=). Currently, only string and integer values can be hashed. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more.",
            ).optional(),
            cryptoReplaceFfxFpeConfig: z.object({
              commonAlphabet: z.enum([
                "FFX_COMMON_NATIVE_ALPHABET_UNSPECIFIED",
                "NUMERIC",
                "HEXADECIMAL",
                "UPPER_CASE_ALPHA_NUMERIC",
                "ALPHA_NUMERIC",
              ]).describe("Common alphabets.").optional(),
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              customAlphabet: z.string().describe(
                "This is supported by mapping these to the alphanumeric characters that the FFX mode natively supports. This happens before/after encryption/decryption. Each character listed must appear only once. Number of characters must be in the range [2, 95]. This must be encoded as ASCII. The order of characters does not matter. The full list of allowed characters is: ``0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_-+={[}]|\\:;\"'.?/``",
              ).optional(),
              radix: z.number().int().describe(
                "The native way to select the alphabet. Must be in the range [2, 95].",
              ).optional(),
              surrogateInfoType: z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              }).describe("Type of information detected by the API.")
                .optional(),
            }).describe(
              "Replaces an identifier with a surrogate using Format Preserving Encryption (FPE) with the FFX mode of operation; however when used in the `ReidentifyContent` API method, it serves the opposite function by reversing the surrogate back into the original identifier. The identifier must be encoded as ASCII. For a given crypto key and context, the same identifier will be replaced with the same surrogate. Identifiers must be at least two characters long. In the case that the identifier is the empty string, it will be skipped. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more. Note: We recommend using CryptoDeterministicConfig for all use cases which do not require preserving the input alphabet space and size, plus warrant referential integrity. FPE incurs significant latency costs.",
            ).optional(),
            dateShiftConfig: z.object({
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              lowerBoundDays: z.number().int().describe(
                "Required. For example, -5 means shift date to at most 5 days back in the past.",
              ).optional(),
              upperBoundDays: z.number().int().describe(
                "Required. Range of shift in days. Actual shift will be selected at random within this range (inclusive ends). Negative means shift to earlier in time. Must not be more than 365250 days (1000 years) each direction. For example, 3 means shift date to at most 3 days into the future.",
              ).optional(),
            }).describe(
              "Shifts dates by random number of days, with option to be consistent for the same context. See https://cloud.google.com/sensitive-data-protection/docs/concepts-date-shifting to learn more.",
            ).optional(),
            fixedSizeBucketingConfig: z.object({
              bucketSize: z.number().describe(
                "Required. Size of each bucket (except for minimum and maximum buckets). So if `lower_bound` = 10, `upper_bound` = 89, and `bucket_size` = 10, then the following buckets would be used: -10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70, 70-80, 80-89, 89+. Precision up to 2 decimals works.",
              ).optional(),
              lowerBound: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
              upperBound: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
            }).describe(
              'Buckets values based on fixed size ranges. The Bucketing transformation can provide all of this functionality, but requires more configuration. This message is provided as a convenience to the user for simple bucketing strategies. The transformed value will be a hyphenated string of {lower_bound}-{upper_bound}. For example, if lower_bound = 10 and upper_bound = 20, all values that are within this bucket will be replaced with "10-20". This can be used on data of type: double, long. If the bound Value type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.',
            ).optional(),
            redactConfig: z.object({}).describe(
              "Redact a given value. For example, if used with an `InfoTypeTransformation` transforming PHONE_NUMBER, and input 'My phone number is 206-555-0123', the output would be 'My phone number is '.",
            ).optional(),
            replaceConfig: z.object({
              newValue: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
            }).describe("Replace each input value with a given `Value`.")
              .optional(),
            replaceDictionaryConfig: z.object({
              wordList: z.object({
                words: z.array(z.string()).describe(
                  "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
                ).optional(),
              }).describe(
                "Message defining a list of words or phrases to search for in the data.",
              ).optional(),
            }).describe(
              "Replace each input value with a value randomly selected from the dictionary.",
            ).optional(),
            replaceWithInfoTypeConfig: z.object({}).describe(
              "Replace each matching finding with the name of the info_type.",
            ).optional(),
            timePartConfig: z.object({
              partToExtract: z.enum([
                "TIME_PART_UNSPECIFIED",
                "YEAR",
                "MONTH",
                "DAY_OF_MONTH",
                "DAY_OF_WEEK",
                "WEEK_OF_YEAR",
                "HOUR_OF_DAY",
              ]).describe("The part of the time to keep.").optional(),
            }).describe(
              "For use with `Date`, `Timestamp`, and `TimeOfDay`, extract or preserve a portion of the value.",
            ).optional(),
          }).describe("A rule for transforming a value.").optional(),
        })).describe(
          "Required. Transformation for each infoType. Cannot specify more than one for a given infoType.",
        ).optional(),
      }).describe(
        "A type of transformation that will scan unstructured text and apply various `PrimitiveTransformation`s to each finding, where the transformation is applied to only values that were identified as a specific info_type.",
      ).optional(),
      recordTransformations: z.object({
        fieldTransformations: z.array(z.object({
          condition: z.object({
            expressions: z.object({
              conditions: z.object({
                conditions: z.array(z.object({
                  field: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  operator: z.enum([
                    "RELATIONAL_OPERATOR_UNSPECIFIED",
                    "EQUAL_TO",
                    "NOT_EQUAL_TO",
                    "GREATER_THAN",
                    "LESS_THAN",
                    "GREATER_THAN_OR_EQUALS",
                    "LESS_THAN_OR_EQUALS",
                    "EXISTS",
                  ]).describe(
                    "Required. Operator used to compare the field or infoType to the value.",
                  ).optional(),
                  value: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                })).describe("A collection of conditions.").optional(),
              }).describe("A collection of conditions.").optional(),
              logicalOperator: z.enum(["LOGICAL_OPERATOR_UNSPECIFIED", "AND"])
                .describe(
                  "The operator to apply to the result of conditions. Default and currently only supported value is `AND`.",
                ).optional(),
            }).describe(
              "An expression, consisting of an operator and conditions.",
            ).optional(),
          }).describe(
            "A condition for determining whether a transformation should be applied to a field.",
          ).optional(),
          fields: z.array(z.object({
            name: z.string().describe("Name describing the field.").optional(),
          })).describe(
            'Required. Input field(s) to apply the transformation to. When you have columns that reference their position within a list, omit the index from the FieldId. FieldId name matching ignores the index. For example, instead of "contact.nums[0].type", use "contact.nums.type".',
          ).optional(),
          infoTypeTransformations: z.object({
            transformations: z.array(z.object({
              infoTypes: z.array(z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              })).describe(
                "InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`.",
              ).optional(),
              primitiveTransformation: z.object({
                bucketingConfig: z.object({
                  buckets: z.array(z.object({
                    max: z.object({
                      booleanValue: z.boolean().describe("boolean").optional(),
                      dateValue: z.object({
                        day: z.number().int().describe(
                          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                        ).optional(),
                        month: z.number().int().describe(
                          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                        ).optional(),
                        year: z.number().int().describe(
                          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                        ).optional(),
                      }).describe(
                        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                      ).optional(),
                      dayOfWeekValue: z.enum([
                        "DAY_OF_WEEK_UNSPECIFIED",
                        "MONDAY",
                        "TUESDAY",
                        "WEDNESDAY",
                        "THURSDAY",
                        "FRIDAY",
                        "SATURDAY",
                        "SUNDAY",
                      ]).describe("day of week").optional(),
                      floatValue: z.number().describe("float").optional(),
                      integerValue: z.string().describe("integer").optional(),
                      stringValue: z.string().describe("string").optional(),
                      timeValue: z.object({
                        hours: z.number().int().describe(
                          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                        ).optional(),
                        minutes: z.number().int().describe(
                          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                        ).optional(),
                        nanos: z.number().int().describe(
                          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                        ).optional(),
                        seconds: z.number().int().describe(
                          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                        ).optional(),
                      }).describe(
                        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                      ).optional(),
                      timestampValue: z.string().describe("timestamp")
                        .optional(),
                    }).describe(
                      "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                    ).optional(),
                    min: z.object({
                      booleanValue: z.boolean().describe("boolean").optional(),
                      dateValue: z.object({
                        day: z.number().int().describe(
                          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                        ).optional(),
                        month: z.number().int().describe(
                          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                        ).optional(),
                        year: z.number().int().describe(
                          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                        ).optional(),
                      }).describe(
                        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                      ).optional(),
                      dayOfWeekValue: z.enum([
                        "DAY_OF_WEEK_UNSPECIFIED",
                        "MONDAY",
                        "TUESDAY",
                        "WEDNESDAY",
                        "THURSDAY",
                        "FRIDAY",
                        "SATURDAY",
                        "SUNDAY",
                      ]).describe("day of week").optional(),
                      floatValue: z.number().describe("float").optional(),
                      integerValue: z.string().describe("integer").optional(),
                      stringValue: z.string().describe("string").optional(),
                      timeValue: z.object({
                        hours: z.number().int().describe(
                          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                        ).optional(),
                        minutes: z.number().int().describe(
                          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                        ).optional(),
                        nanos: z.number().int().describe(
                          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                        ).optional(),
                        seconds: z.number().int().describe(
                          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                        ).optional(),
                      }).describe(
                        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                      ).optional(),
                      timestampValue: z.string().describe("timestamp")
                        .optional(),
                    }).describe(
                      "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                    ).optional(),
                    replacementValue: z.object({
                      booleanValue: z.boolean().describe("boolean").optional(),
                      dateValue: z.object({
                        day: z.number().int().describe(
                          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                        ).optional(),
                        month: z.number().int().describe(
                          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                        ).optional(),
                        year: z.number().int().describe(
                          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                        ).optional(),
                      }).describe(
                        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                      ).optional(),
                      dayOfWeekValue: z.enum([
                        "DAY_OF_WEEK_UNSPECIFIED",
                        "MONDAY",
                        "TUESDAY",
                        "WEDNESDAY",
                        "THURSDAY",
                        "FRIDAY",
                        "SATURDAY",
                        "SUNDAY",
                      ]).describe("day of week").optional(),
                      floatValue: z.number().describe("float").optional(),
                      integerValue: z.string().describe("integer").optional(),
                      stringValue: z.string().describe("string").optional(),
                      timeValue: z.object({
                        hours: z.number().int().describe(
                          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                        ).optional(),
                        minutes: z.number().int().describe(
                          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                        ).optional(),
                        nanos: z.number().int().describe(
                          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                        ).optional(),
                        seconds: z.number().int().describe(
                          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                        ).optional(),
                      }).describe(
                        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                      ).optional(),
                      timestampValue: z.string().describe("timestamp")
                        .optional(),
                    }).describe(
                      "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                    ).optional(),
                  })).describe(
                    "Set of buckets. Ranges must be non-overlapping.",
                  ).optional(),
                }).describe(
                  "Generalization function that buckets values based on ranges. The ranges and replacement values are dynamically provided by the user for custom behavior, such as 1-30 -> LOW, 31-65 -> MEDIUM, 66-100 -> HIGH. This can be used on data of type: number, long, string, timestamp. If the bound `Value` type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.",
                ).optional(),
                characterMaskConfig: z.object({
                  charactersToIgnore: z.array(z.object({
                    charactersToSkip: z.string().describe(
                      "Characters to not transform when masking.",
                    ).optional(),
                    commonCharactersToIgnore: z.enum([
                      "COMMON_CHARS_TO_IGNORE_UNSPECIFIED",
                      "NUMERIC",
                      "ALPHA_UPPER_CASE",
                      "ALPHA_LOWER_CASE",
                      "PUNCTUATION",
                      "WHITESPACE",
                    ]).describe(
                      "Common characters to not transform when masking. Useful to avoid removing punctuation.",
                    ).optional(),
                  })).describe(
                    "When masking a string, items in this list will be skipped when replacing characters. For example, if the input string is `555-555-5555` and you instruct Cloud DLP to skip `-` and mask 5 characters with `*`, Cloud DLP returns `***-**5-5555`.",
                  ).optional(),
                  maskingCharacter: z.string().describe(
                    "Character to use to mask the sensitive values—for example, `*` for an alphabetic string such as a name, or `0` for a numeric string such as ZIP code or credit card number. This string must have a length of 1. If not supplied, this value defaults to `*` for strings, and `0` for digits.",
                  ).optional(),
                  numberToMask: z.number().int().describe(
                    "Number of characters to mask. If not set, all matching chars will be masked. Skipped characters do not count towards this tally. If `number_to_mask` is negative, this denotes inverse masking. Cloud DLP masks all but a number of characters. For example, suppose you have the following values: - `masking_character` is `*` - `number_to_mask` is `-4` - `reverse_order` is `false` - `CharsToIgnore` includes `-` - Input string is `1234-5678-9012-3456` The resulting de-identified string is `****-****-****-3456`. Cloud DLP masks all but the last four characters. If `reverse_order` is `true`, all but the first four characters are masked as `1234-****-****-****`.",
                  ).optional(),
                  reverseOrder: z.boolean().describe(
                    "Mask characters in reverse order. For example, if `masking_character` is `0`, `number_to_mask` is `14`, and `reverse_order` is `false`, then the input string `1234-5678-9012-3456` is masked as `00000000000000-3456`. If `masking_character` is `*`, `number_to_mask` is `3`, and `reverse_order` is `true`, then the string `12345` is masked as `12***`.",
                  ).optional(),
                }).describe(
                  "Partially mask a string by replacing a given number of characters with a fixed character. Masking can start from the beginning or end of the string. This can be used on data of any type (numbers, longs, and so on) and when de-identifying structured data we'll attempt to preserve the original data's type. (This allows you to take a long like 123 and modify it to a string like **3.",
                ).optional(),
                cryptoDeterministicConfig: z.object({
                  context: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  cryptoKey: z.object({
                    kmsWrapped: z.object({
                      cryptoKeyName: z.string().describe(
                        "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                      ).optional(),
                      wrappedKey: z.string().describe(
                        "Required. The wrapped data crypto key.",
                      ).optional(),
                    }).describe(
                      "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                    ).optional(),
                    transient: z.object({
                      name: z.string().describe(
                        "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                      ).optional(),
                    }).describe(
                      "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                    ).optional(),
                    unwrapped: z.object({
                      key: z.string().describe(
                        "Required. A 128/192/256 bit key.",
                      ).optional(),
                    }).describe(
                      "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                    ).optional(),
                  }).describe(
                    "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
                  ).optional(),
                  surrogateInfoType: z.object({
                    name: z.string().describe(
                      "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                    ).optional(),
                    sensitivityScore: z.object({
                      score: z.enum([
                        "SENSITIVITY_SCORE_UNSPECIFIED",
                        "SENSITIVITY_LOW",
                        "SENSITIVITY_UNKNOWN",
                        "SENSITIVITY_MODERATE",
                        "SENSITIVITY_HIGH",
                      ]).describe(
                        "The sensitivity score applied to the resource.",
                      ).optional(),
                    }).describe(
                      "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                    ).optional(),
                    version: z.string().describe(
                      "Optional version name for this InfoType.",
                    ).optional(),
                  }).describe("Type of information detected by the API.")
                    .optional(),
                }).describe(
                  "Pseudonymization method that generates deterministic encryption for the given input. Outputs a base64 encoded representation of the encrypted output. Uses AES-SIV based on the RFC https://tools.ietf.org/html/rfc5297.",
                ).optional(),
                cryptoHashConfig: z.object({
                  cryptoKey: z.object({
                    kmsWrapped: z.object({
                      cryptoKeyName: z.string().describe(
                        "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                      ).optional(),
                      wrappedKey: z.string().describe(
                        "Required. The wrapped data crypto key.",
                      ).optional(),
                    }).describe(
                      "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                    ).optional(),
                    transient: z.object({
                      name: z.string().describe(
                        "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                      ).optional(),
                    }).describe(
                      "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                    ).optional(),
                    unwrapped: z.object({
                      key: z.string().describe(
                        "Required. A 128/192/256 bit key.",
                      ).optional(),
                    }).describe(
                      "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                    ).optional(),
                  }).describe(
                    "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
                  ).optional(),
                }).describe(
                  "Pseudonymization method that generates surrogates via cryptographic hashing. Uses SHA-256. The key size must be either 32 or 64 bytes. Outputs a base64 encoded representation of the hashed output (for example, L7k0BHmF1ha5U3NfGykjro4xWi1MPVQPjhMAZbSV9mM=). Currently, only string and integer values can be hashed. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more.",
                ).optional(),
                cryptoReplaceFfxFpeConfig: z.object({
                  commonAlphabet: z.enum([
                    "FFX_COMMON_NATIVE_ALPHABET_UNSPECIFIED",
                    "NUMERIC",
                    "HEXADECIMAL",
                    "UPPER_CASE_ALPHA_NUMERIC",
                    "ALPHA_NUMERIC",
                  ]).describe("Common alphabets.").optional(),
                  context: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  cryptoKey: z.object({
                    kmsWrapped: z.object({
                      cryptoKeyName: z.string().describe(
                        "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                      ).optional(),
                      wrappedKey: z.string().describe(
                        "Required. The wrapped data crypto key.",
                      ).optional(),
                    }).describe(
                      "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                    ).optional(),
                    transient: z.object({
                      name: z.string().describe(
                        "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                      ).optional(),
                    }).describe(
                      "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                    ).optional(),
                    unwrapped: z.object({
                      key: z.string().describe(
                        "Required. A 128/192/256 bit key.",
                      ).optional(),
                    }).describe(
                      "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                    ).optional(),
                  }).describe(
                    "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
                  ).optional(),
                  customAlphabet: z.string().describe(
                    "This is supported by mapping these to the alphanumeric characters that the FFX mode natively supports. This happens before/after encryption/decryption. Each character listed must appear only once. Number of characters must be in the range [2, 95]. This must be encoded as ASCII. The order of characters does not matter. The full list of allowed characters is: ``0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_-+={[}]|\\:;\"'.?/``",
                  ).optional(),
                  radix: z.number().int().describe(
                    "The native way to select the alphabet. Must be in the range [2, 95].",
                  ).optional(),
                  surrogateInfoType: z.object({
                    name: z.string().describe(
                      "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                    ).optional(),
                    sensitivityScore: z.object({
                      score: z.enum([
                        "SENSITIVITY_SCORE_UNSPECIFIED",
                        "SENSITIVITY_LOW",
                        "SENSITIVITY_UNKNOWN",
                        "SENSITIVITY_MODERATE",
                        "SENSITIVITY_HIGH",
                      ]).describe(
                        "The sensitivity score applied to the resource.",
                      ).optional(),
                    }).describe(
                      "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                    ).optional(),
                    version: z.string().describe(
                      "Optional version name for this InfoType.",
                    ).optional(),
                  }).describe("Type of information detected by the API.")
                    .optional(),
                }).describe(
                  "Replaces an identifier with a surrogate using Format Preserving Encryption (FPE) with the FFX mode of operation; however when used in the `ReidentifyContent` API method, it serves the opposite function by reversing the surrogate back into the original identifier. The identifier must be encoded as ASCII. For a given crypto key and context, the same identifier will be replaced with the same surrogate. Identifiers must be at least two characters long. In the case that the identifier is the empty string, it will be skipped. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more. Note: We recommend using CryptoDeterministicConfig for all use cases which do not require preserving the input alphabet space and size, plus warrant referential integrity. FPE incurs significant latency costs.",
                ).optional(),
                dateShiftConfig: z.object({
                  context: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  cryptoKey: z.object({
                    kmsWrapped: z.object({
                      cryptoKeyName: z.string().describe(
                        "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                      ).optional(),
                      wrappedKey: z.string().describe(
                        "Required. The wrapped data crypto key.",
                      ).optional(),
                    }).describe(
                      "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                    ).optional(),
                    transient: z.object({
                      name: z.string().describe(
                        "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                      ).optional(),
                    }).describe(
                      "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                    ).optional(),
                    unwrapped: z.object({
                      key: z.string().describe(
                        "Required. A 128/192/256 bit key.",
                      ).optional(),
                    }).describe(
                      "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                    ).optional(),
                  }).describe(
                    "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
                  ).optional(),
                  lowerBoundDays: z.number().int().describe(
                    "Required. For example, -5 means shift date to at most 5 days back in the past.",
                  ).optional(),
                  upperBoundDays: z.number().int().describe(
                    "Required. Range of shift in days. Actual shift will be selected at random within this range (inclusive ends). Negative means shift to earlier in time. Must not be more than 365250 days (1000 years) each direction. For example, 3 means shift date to at most 3 days into the future.",
                  ).optional(),
                }).describe(
                  "Shifts dates by random number of days, with option to be consistent for the same context. See https://cloud.google.com/sensitive-data-protection/docs/concepts-date-shifting to learn more.",
                ).optional(),
                fixedSizeBucketingConfig: z.object({
                  bucketSize: z.number().describe(
                    "Required. Size of each bucket (except for minimum and maximum buckets). So if `lower_bound` = 10, `upper_bound` = 89, and `bucket_size` = 10, then the following buckets would be used: -10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70, 70-80, 80-89, 89+. Precision up to 2 decimals works.",
                  ).optional(),
                  lowerBound: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                  upperBound: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                }).describe(
                  'Buckets values based on fixed size ranges. The Bucketing transformation can provide all of this functionality, but requires more configuration. This message is provided as a convenience to the user for simple bucketing strategies. The transformed value will be a hyphenated string of {lower_bound}-{upper_bound}. For example, if lower_bound = 10 and upper_bound = 20, all values that are within this bucket will be replaced with "10-20". This can be used on data of type: double, long. If the bound Value type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.',
                ).optional(),
                redactConfig: z.object({}).describe(
                  "Redact a given value. For example, if used with an `InfoTypeTransformation` transforming PHONE_NUMBER, and input 'My phone number is 206-555-0123', the output would be 'My phone number is '.",
                ).optional(),
                replaceConfig: z.object({
                  newValue: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                }).describe("Replace each input value with a given `Value`.")
                  .optional(),
                replaceDictionaryConfig: z.object({
                  wordList: z.object({
                    words: z.array(z.string()).describe(
                      "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
                    ).optional(),
                  }).describe(
                    "Message defining a list of words or phrases to search for in the data.",
                  ).optional(),
                }).describe(
                  "Replace each input value with a value randomly selected from the dictionary.",
                ).optional(),
                replaceWithInfoTypeConfig: z.object({}).describe(
                  "Replace each matching finding with the name of the info_type.",
                ).optional(),
                timePartConfig: z.object({
                  partToExtract: z.enum([
                    "TIME_PART_UNSPECIFIED",
                    "YEAR",
                    "MONTH",
                    "DAY_OF_MONTH",
                    "DAY_OF_WEEK",
                    "WEEK_OF_YEAR",
                    "HOUR_OF_DAY",
                  ]).describe("The part of the time to keep.").optional(),
                }).describe(
                  "For use with `Date`, `Timestamp`, and `TimeOfDay`, extract or preserve a portion of the value.",
                ).optional(),
              }).describe("A rule for transforming a value.").optional(),
            })).describe(
              "Required. Transformation for each infoType. Cannot specify more than one for a given infoType.",
            ).optional(),
          }).describe(
            "A type of transformation that will scan unstructured text and apply various `PrimitiveTransformation`s to each finding, where the transformation is applied to only values that were identified as a specific info_type.",
          ).optional(),
          primitiveTransformation: z.object({
            bucketingConfig: z.object({
              buckets: z.array(z.object({
                max: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
                min: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
                replacementValue: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
              })).describe("Set of buckets. Ranges must be non-overlapping.")
                .optional(),
            }).describe(
              "Generalization function that buckets values based on ranges. The ranges and replacement values are dynamically provided by the user for custom behavior, such as 1-30 -> LOW, 31-65 -> MEDIUM, 66-100 -> HIGH. This can be used on data of type: number, long, string, timestamp. If the bound `Value` type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.",
            ).optional(),
            characterMaskConfig: z.object({
              charactersToIgnore: z.array(z.object({
                charactersToSkip: z.string().describe(
                  "Characters to not transform when masking.",
                ).optional(),
                commonCharactersToIgnore: z.enum([
                  "COMMON_CHARS_TO_IGNORE_UNSPECIFIED",
                  "NUMERIC",
                  "ALPHA_UPPER_CASE",
                  "ALPHA_LOWER_CASE",
                  "PUNCTUATION",
                  "WHITESPACE",
                ]).describe(
                  "Common characters to not transform when masking. Useful to avoid removing punctuation.",
                ).optional(),
              })).describe(
                "When masking a string, items in this list will be skipped when replacing characters. For example, if the input string is `555-555-5555` and you instruct Cloud DLP to skip `-` and mask 5 characters with `*`, Cloud DLP returns `***-**5-5555`.",
              ).optional(),
              maskingCharacter: z.string().describe(
                "Character to use to mask the sensitive values—for example, `*` for an alphabetic string such as a name, or `0` for a numeric string such as ZIP code or credit card number. This string must have a length of 1. If not supplied, this value defaults to `*` for strings, and `0` for digits.",
              ).optional(),
              numberToMask: z.number().int().describe(
                "Number of characters to mask. If not set, all matching chars will be masked. Skipped characters do not count towards this tally. If `number_to_mask` is negative, this denotes inverse masking. Cloud DLP masks all but a number of characters. For example, suppose you have the following values: - `masking_character` is `*` - `number_to_mask` is `-4` - `reverse_order` is `false` - `CharsToIgnore` includes `-` - Input string is `1234-5678-9012-3456` The resulting de-identified string is `****-****-****-3456`. Cloud DLP masks all but the last four characters. If `reverse_order` is `true`, all but the first four characters are masked as `1234-****-****-****`.",
              ).optional(),
              reverseOrder: z.boolean().describe(
                "Mask characters in reverse order. For example, if `masking_character` is `0`, `number_to_mask` is `14`, and `reverse_order` is `false`, then the input string `1234-5678-9012-3456` is masked as `00000000000000-3456`. If `masking_character` is `*`, `number_to_mask` is `3`, and `reverse_order` is `true`, then the string `12345` is masked as `12***`.",
              ).optional(),
            }).describe(
              "Partially mask a string by replacing a given number of characters with a fixed character. Masking can start from the beginning or end of the string. This can be used on data of any type (numbers, longs, and so on) and when de-identifying structured data we'll attempt to preserve the original data's type. (This allows you to take a long like 123 and modify it to a string like **3.",
            ).optional(),
            cryptoDeterministicConfig: z.object({
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              surrogateInfoType: z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              }).describe("Type of information detected by the API.")
                .optional(),
            }).describe(
              "Pseudonymization method that generates deterministic encryption for the given input. Outputs a base64 encoded representation of the encrypted output. Uses AES-SIV based on the RFC https://tools.ietf.org/html/rfc5297.",
            ).optional(),
            cryptoHashConfig: z.object({
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
            }).describe(
              "Pseudonymization method that generates surrogates via cryptographic hashing. Uses SHA-256. The key size must be either 32 or 64 bytes. Outputs a base64 encoded representation of the hashed output (for example, L7k0BHmF1ha5U3NfGykjro4xWi1MPVQPjhMAZbSV9mM=). Currently, only string and integer values can be hashed. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more.",
            ).optional(),
            cryptoReplaceFfxFpeConfig: z.object({
              commonAlphabet: z.enum([
                "FFX_COMMON_NATIVE_ALPHABET_UNSPECIFIED",
                "NUMERIC",
                "HEXADECIMAL",
                "UPPER_CASE_ALPHA_NUMERIC",
                "ALPHA_NUMERIC",
              ]).describe("Common alphabets.").optional(),
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              customAlphabet: z.string().describe(
                "This is supported by mapping these to the alphanumeric characters that the FFX mode natively supports. This happens before/after encryption/decryption. Each character listed must appear only once. Number of characters must be in the range [2, 95]. This must be encoded as ASCII. The order of characters does not matter. The full list of allowed characters is: ``0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_-+={[}]|\\:;\"'.?/``",
              ).optional(),
              radix: z.number().int().describe(
                "The native way to select the alphabet. Must be in the range [2, 95].",
              ).optional(),
              surrogateInfoType: z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              }).describe("Type of information detected by the API.")
                .optional(),
            }).describe(
              "Replaces an identifier with a surrogate using Format Preserving Encryption (FPE) with the FFX mode of operation; however when used in the `ReidentifyContent` API method, it serves the opposite function by reversing the surrogate back into the original identifier. The identifier must be encoded as ASCII. For a given crypto key and context, the same identifier will be replaced with the same surrogate. Identifiers must be at least two characters long. In the case that the identifier is the empty string, it will be skipped. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more. Note: We recommend using CryptoDeterministicConfig for all use cases which do not require preserving the input alphabet space and size, plus warrant referential integrity. FPE incurs significant latency costs.",
            ).optional(),
            dateShiftConfig: z.object({
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              lowerBoundDays: z.number().int().describe(
                "Required. For example, -5 means shift date to at most 5 days back in the past.",
              ).optional(),
              upperBoundDays: z.number().int().describe(
                "Required. Range of shift in days. Actual shift will be selected at random within this range (inclusive ends). Negative means shift to earlier in time. Must not be more than 365250 days (1000 years) each direction. For example, 3 means shift date to at most 3 days into the future.",
              ).optional(),
            }).describe(
              "Shifts dates by random number of days, with option to be consistent for the same context. See https://cloud.google.com/sensitive-data-protection/docs/concepts-date-shifting to learn more.",
            ).optional(),
            fixedSizeBucketingConfig: z.object({
              bucketSize: z.number().describe(
                "Required. Size of each bucket (except for minimum and maximum buckets). So if `lower_bound` = 10, `upper_bound` = 89, and `bucket_size` = 10, then the following buckets would be used: -10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70, 70-80, 80-89, 89+. Precision up to 2 decimals works.",
              ).optional(),
              lowerBound: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
              upperBound: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
            }).describe(
              'Buckets values based on fixed size ranges. The Bucketing transformation can provide all of this functionality, but requires more configuration. This message is provided as a convenience to the user for simple bucketing strategies. The transformed value will be a hyphenated string of {lower_bound}-{upper_bound}. For example, if lower_bound = 10 and upper_bound = 20, all values that are within this bucket will be replaced with "10-20". This can be used on data of type: double, long. If the bound Value type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.',
            ).optional(),
            redactConfig: z.object({}).describe(
              "Redact a given value. For example, if used with an `InfoTypeTransformation` transforming PHONE_NUMBER, and input 'My phone number is 206-555-0123', the output would be 'My phone number is '.",
            ).optional(),
            replaceConfig: z.object({
              newValue: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
            }).describe("Replace each input value with a given `Value`.")
              .optional(),
            replaceDictionaryConfig: z.object({
              wordList: z.object({
                words: z.array(z.string()).describe(
                  "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
                ).optional(),
              }).describe(
                "Message defining a list of words or phrases to search for in the data.",
              ).optional(),
            }).describe(
              "Replace each input value with a value randomly selected from the dictionary.",
            ).optional(),
            replaceWithInfoTypeConfig: z.object({}).describe(
              "Replace each matching finding with the name of the info_type.",
            ).optional(),
            timePartConfig: z.object({
              partToExtract: z.enum([
                "TIME_PART_UNSPECIFIED",
                "YEAR",
                "MONTH",
                "DAY_OF_MONTH",
                "DAY_OF_WEEK",
                "WEEK_OF_YEAR",
                "HOUR_OF_DAY",
              ]).describe("The part of the time to keep.").optional(),
            }).describe(
              "For use with `Date`, `Timestamp`, and `TimeOfDay`, extract or preserve a portion of the value.",
            ).optional(),
          }).describe("A rule for transforming a value.").optional(),
        })).describe(
          "Transform the record by applying various field transformations.",
        ).optional(),
        recordSuppressions: z.array(z.object({
          condition: z.object({
            expressions: z.object({
              conditions: z.object({
                conditions: z.array(z.object({
                  field: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  operator: z.enum([
                    "RELATIONAL_OPERATOR_UNSPECIFIED",
                    "EQUAL_TO",
                    "NOT_EQUAL_TO",
                    "GREATER_THAN",
                    "LESS_THAN",
                    "GREATER_THAN_OR_EQUALS",
                    "LESS_THAN_OR_EQUALS",
                    "EXISTS",
                  ]).describe(
                    "Required. Operator used to compare the field or infoType to the value.",
                  ).optional(),
                  value: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                })).describe("A collection of conditions.").optional(),
              }).describe("A collection of conditions.").optional(),
              logicalOperator: z.enum(["LOGICAL_OPERATOR_UNSPECIFIED", "AND"])
                .describe(
                  "The operator to apply to the result of conditions. Default and currently only supported value is `AND`.",
                ).optional(),
            }).describe(
              "An expression, consisting of an operator and conditions.",
            ).optional(),
          }).describe(
            "A condition for determining whether a transformation should be applied to a field.",
          ).optional(),
        })).describe(
          "Configuration defining which records get suppressed entirely. Records that match any suppression rule are omitted from the output.",
        ).optional(),
      }).describe(
        "A type of transformation that is applied over structured data such as a table.",
      ).optional(),
      transformationErrorHandling: z.object({
        leaveUntransformed: z.object({}).describe(
          "Skips the data without modifying it if the requested transformation would cause an error. For example, if a `DateShift` transformation were applied an an IP address, this mode would leave the IP address unchanged in the response.",
        ).optional(),
        throwError: z.object({}).describe(
          "Throw an error and fail the request when a transformation error occurs.",
        ).optional(),
      }).describe(
        "How to handle transformation errors during de-identification. A transformation error occurs when the requested transformation is incompatible with the data. For example, trying to de-identify an IP address using a `DateShift` transformation would result in a transformation error, since date info cannot be extracted from an IP address. Information about any incompatible transformations, and how they were handled, is returned in the response as part of the `TransformationOverviews`.",
      ).optional(),
    }).describe("The configuration that controls how the data will change.")
      .optional(),
    description: z.string().describe("Short description (max 256 chars).")
      .optional(),
    displayName: z.string().describe("Display name (max 256 chars).")
      .optional(),
    name: z.string().describe(
      "Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/deidentifyTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/deidentifyTemplates/TEMPLATE_ID`",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of an inspectTemplate.",
    ).optional(),
  }).describe(
    "DeidentifyTemplates contains instructions on how to de-identify content. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.",
  ).optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  templateId: z.string().describe(
    "The template id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  deidentifyConfig: z.object({
    imageTransformations: z.object({
      transforms: z.array(z.object({
        allInfoTypes: z.object({}),
        allText: z.object({}),
        redactionColor: z.object({
          blue: z.number(),
          green: z.number(),
          red: z.number(),
        }),
        selectedInfoTypes: z.object({
          infoTypes: z.array(z.object({
            name: z.string(),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            version: z.string(),
          })),
        }),
      })),
    }),
    infoTypeTransformations: z.object({
      transformations: z.array(z.object({
        infoTypes: z.array(z.object({
          name: z.string(),
          sensitivityScore: z.object({
            score: z.string(),
          }),
          version: z.string(),
        })),
        primitiveTransformation: z.object({
          bucketingConfig: z.object({
            buckets: z.array(z.object({
              max: z.object({
                booleanValue: z.boolean(),
                dateValue: z.object({
                  day: z.number(),
                  month: z.number(),
                  year: z.number(),
                }),
                dayOfWeekValue: z.string(),
                floatValue: z.number(),
                integerValue: z.string(),
                stringValue: z.string(),
                timeValue: z.object({
                  hours: z.number(),
                  minutes: z.number(),
                  nanos: z.number(),
                  seconds: z.number(),
                }),
                timestampValue: z.string(),
              }),
              min: z.object({
                booleanValue: z.boolean(),
                dateValue: z.object({
                  day: z.number(),
                  month: z.number(),
                  year: z.number(),
                }),
                dayOfWeekValue: z.string(),
                floatValue: z.number(),
                integerValue: z.string(),
                stringValue: z.string(),
                timeValue: z.object({
                  hours: z.number(),
                  minutes: z.number(),
                  nanos: z.number(),
                  seconds: z.number(),
                }),
                timestampValue: z.string(),
              }),
              replacementValue: z.object({
                booleanValue: z.boolean(),
                dateValue: z.object({
                  day: z.number(),
                  month: z.number(),
                  year: z.number(),
                }),
                dayOfWeekValue: z.string(),
                floatValue: z.number(),
                integerValue: z.string(),
                stringValue: z.string(),
                timeValue: z.object({
                  hours: z.number(),
                  minutes: z.number(),
                  nanos: z.number(),
                  seconds: z.number(),
                }),
                timestampValue: z.string(),
              }),
            })),
          }),
          characterMaskConfig: z.object({
            charactersToIgnore: z.array(z.object({
              charactersToSkip: z.string(),
              commonCharactersToIgnore: z.string(),
            })),
            maskingCharacter: z.string(),
            numberToMask: z.number(),
            reverseOrder: z.boolean(),
          }),
          cryptoDeterministicConfig: z.object({
            context: z.object({
              name: z.string(),
            }),
            cryptoKey: z.object({
              kmsWrapped: z.object({
                cryptoKeyName: z.string(),
                wrappedKey: z.string(),
              }),
              transient: z.object({
                name: z.string(),
              }),
              unwrapped: z.object({
                key: z.string(),
              }),
            }),
            surrogateInfoType: z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            }),
          }),
          cryptoHashConfig: z.object({
            cryptoKey: z.object({
              kmsWrapped: z.object({
                cryptoKeyName: z.string(),
                wrappedKey: z.string(),
              }),
              transient: z.object({
                name: z.string(),
              }),
              unwrapped: z.object({
                key: z.string(),
              }),
            }),
          }),
          cryptoReplaceFfxFpeConfig: z.object({
            commonAlphabet: z.string(),
            context: z.object({
              name: z.string(),
            }),
            cryptoKey: z.object({
              kmsWrapped: z.object({
                cryptoKeyName: z.string(),
                wrappedKey: z.string(),
              }),
              transient: z.object({
                name: z.string(),
              }),
              unwrapped: z.object({
                key: z.string(),
              }),
            }),
            customAlphabet: z.string(),
            radix: z.number(),
            surrogateInfoType: z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            }),
          }),
          dateShiftConfig: z.object({
            context: z.object({
              name: z.string(),
            }),
            cryptoKey: z.object({
              kmsWrapped: z.object({
                cryptoKeyName: z.string(),
                wrappedKey: z.string(),
              }),
              transient: z.object({
                name: z.string(),
              }),
              unwrapped: z.object({
                key: z.string(),
              }),
            }),
            lowerBoundDays: z.number(),
            upperBoundDays: z.number(),
          }),
          fixedSizeBucketingConfig: z.object({
            bucketSize: z.number(),
            lowerBound: z.object({
              booleanValue: z.boolean(),
              dateValue: z.object({
                day: z.number(),
                month: z.number(),
                year: z.number(),
              }),
              dayOfWeekValue: z.string(),
              floatValue: z.number(),
              integerValue: z.string(),
              stringValue: z.string(),
              timeValue: z.object({
                hours: z.number(),
                minutes: z.number(),
                nanos: z.number(),
                seconds: z.number(),
              }),
              timestampValue: z.string(),
            }),
            upperBound: z.object({
              booleanValue: z.boolean(),
              dateValue: z.object({
                day: z.number(),
                month: z.number(),
                year: z.number(),
              }),
              dayOfWeekValue: z.string(),
              floatValue: z.number(),
              integerValue: z.string(),
              stringValue: z.string(),
              timeValue: z.object({
                hours: z.number(),
                minutes: z.number(),
                nanos: z.number(),
                seconds: z.number(),
              }),
              timestampValue: z.string(),
            }),
          }),
          redactConfig: z.object({}),
          replaceConfig: z.object({
            newValue: z.object({
              booleanValue: z.boolean(),
              dateValue: z.object({
                day: z.number(),
                month: z.number(),
                year: z.number(),
              }),
              dayOfWeekValue: z.string(),
              floatValue: z.number(),
              integerValue: z.string(),
              stringValue: z.string(),
              timeValue: z.object({
                hours: z.number(),
                minutes: z.number(),
                nanos: z.number(),
                seconds: z.number(),
              }),
              timestampValue: z.string(),
            }),
          }),
          replaceDictionaryConfig: z.object({
            wordList: z.object({
              words: z.array(z.string()),
            }),
          }),
          replaceWithInfoTypeConfig: z.object({}),
          timePartConfig: z.object({
            partToExtract: z.string(),
          }),
        }),
      })),
    }),
    recordTransformations: z.object({
      fieldTransformations: z.array(z.object({
        condition: z.object({
          expressions: z.object({
            conditions: z.object({
              conditions: z.array(z.object({
                field: z.object({
                  name: z.string(),
                }),
                operator: z.string(),
                value: z.object({
                  booleanValue: z.boolean(),
                  dateValue: z.object({
                    day: z.number(),
                    month: z.number(),
                    year: z.number(),
                  }),
                  dayOfWeekValue: z.string(),
                  floatValue: z.number(),
                  integerValue: z.string(),
                  stringValue: z.string(),
                  timeValue: z.object({
                    hours: z.number(),
                    minutes: z.number(),
                    nanos: z.number(),
                    seconds: z.number(),
                  }),
                  timestampValue: z.string(),
                }),
              })),
            }),
            logicalOperator: z.string(),
          }),
        }),
        fields: z.array(z.object({
          name: z.string(),
        })),
        infoTypeTransformations: z.object({
          transformations: z.array(z.object({
            infoTypes: z.array(z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            })),
            primitiveTransformation: z.object({
              bucketingConfig: z.object({
                buckets: z.array(z.object({
                  max: z.object({
                    booleanValue: z.boolean(),
                    dateValue: z.object({
                      day: z.number(),
                      month: z.number(),
                      year: z.number(),
                    }),
                    dayOfWeekValue: z.string(),
                    floatValue: z.number(),
                    integerValue: z.string(),
                    stringValue: z.string(),
                    timeValue: z.object({
                      hours: z.number(),
                      minutes: z.number(),
                      nanos: z.number(),
                      seconds: z.number(),
                    }),
                    timestampValue: z.string(),
                  }),
                  min: z.object({
                    booleanValue: z.boolean(),
                    dateValue: z.object({
                      day: z.number(),
                      month: z.number(),
                      year: z.number(),
                    }),
                    dayOfWeekValue: z.string(),
                    floatValue: z.number(),
                    integerValue: z.string(),
                    stringValue: z.string(),
                    timeValue: z.object({
                      hours: z.number(),
                      minutes: z.number(),
                      nanos: z.number(),
                      seconds: z.number(),
                    }),
                    timestampValue: z.string(),
                  }),
                  replacementValue: z.object({
                    booleanValue: z.boolean(),
                    dateValue: z.object({
                      day: z.number(),
                      month: z.number(),
                      year: z.number(),
                    }),
                    dayOfWeekValue: z.string(),
                    floatValue: z.number(),
                    integerValue: z.string(),
                    stringValue: z.string(),
                    timeValue: z.object({
                      hours: z.number(),
                      minutes: z.number(),
                      nanos: z.number(),
                      seconds: z.number(),
                    }),
                    timestampValue: z.string(),
                  }),
                })),
              }),
              characterMaskConfig: z.object({
                charactersToIgnore: z.array(z.object({
                  charactersToSkip: z.string(),
                  commonCharactersToIgnore: z.string(),
                })),
                maskingCharacter: z.string(),
                numberToMask: z.number(),
                reverseOrder: z.boolean(),
              }),
              cryptoDeterministicConfig: z.object({
                context: z.object({
                  name: z.string(),
                }),
                cryptoKey: z.object({
                  kmsWrapped: z.object({
                    cryptoKeyName: z.string(),
                    wrappedKey: z.string(),
                  }),
                  transient: z.object({
                    name: z.string(),
                  }),
                  unwrapped: z.object({
                    key: z.string(),
                  }),
                }),
                surrogateInfoType: z.object({
                  name: z.string(),
                  sensitivityScore: z.object({
                    score: z.string(),
                  }),
                  version: z.string(),
                }),
              }),
              cryptoHashConfig: z.object({
                cryptoKey: z.object({
                  kmsWrapped: z.object({
                    cryptoKeyName: z.string(),
                    wrappedKey: z.string(),
                  }),
                  transient: z.object({
                    name: z.string(),
                  }),
                  unwrapped: z.object({
                    key: z.string(),
                  }),
                }),
              }),
              cryptoReplaceFfxFpeConfig: z.object({
                commonAlphabet: z.string(),
                context: z.object({
                  name: z.string(),
                }),
                cryptoKey: z.object({
                  kmsWrapped: z.object({
                    cryptoKeyName: z.string(),
                    wrappedKey: z.string(),
                  }),
                  transient: z.object({
                    name: z.string(),
                  }),
                  unwrapped: z.object({
                    key: z.string(),
                  }),
                }),
                customAlphabet: z.string(),
                radix: z.number(),
                surrogateInfoType: z.object({
                  name: z.string(),
                  sensitivityScore: z.object({
                    score: z.string(),
                  }),
                  version: z.string(),
                }),
              }),
              dateShiftConfig: z.object({
                context: z.object({
                  name: z.string(),
                }),
                cryptoKey: z.object({
                  kmsWrapped: z.object({
                    cryptoKeyName: z.string(),
                    wrappedKey: z.string(),
                  }),
                  transient: z.object({
                    name: z.string(),
                  }),
                  unwrapped: z.object({
                    key: z.string(),
                  }),
                }),
                lowerBoundDays: z.number(),
                upperBoundDays: z.number(),
              }),
              fixedSizeBucketingConfig: z.object({
                bucketSize: z.number(),
                lowerBound: z.object({
                  booleanValue: z.boolean(),
                  dateValue: z.object({
                    day: z.number(),
                    month: z.number(),
                    year: z.number(),
                  }),
                  dayOfWeekValue: z.string(),
                  floatValue: z.number(),
                  integerValue: z.string(),
                  stringValue: z.string(),
                  timeValue: z.object({
                    hours: z.number(),
                    minutes: z.number(),
                    nanos: z.number(),
                    seconds: z.number(),
                  }),
                  timestampValue: z.string(),
                }),
                upperBound: z.object({
                  booleanValue: z.boolean(),
                  dateValue: z.object({
                    day: z.number(),
                    month: z.number(),
                    year: z.number(),
                  }),
                  dayOfWeekValue: z.string(),
                  floatValue: z.number(),
                  integerValue: z.string(),
                  stringValue: z.string(),
                  timeValue: z.object({
                    hours: z.number(),
                    minutes: z.number(),
                    nanos: z.number(),
                    seconds: z.number(),
                  }),
                  timestampValue: z.string(),
                }),
              }),
              redactConfig: z.object({}),
              replaceConfig: z.object({
                newValue: z.object({
                  booleanValue: z.boolean(),
                  dateValue: z.object({
                    day: z.number(),
                    month: z.number(),
                    year: z.number(),
                  }),
                  dayOfWeekValue: z.string(),
                  floatValue: z.number(),
                  integerValue: z.string(),
                  stringValue: z.string(),
                  timeValue: z.object({
                    hours: z.number(),
                    minutes: z.number(),
                    nanos: z.number(),
                    seconds: z.number(),
                  }),
                  timestampValue: z.string(),
                }),
              }),
              replaceDictionaryConfig: z.object({
                wordList: z.object({
                  words: z.array(z.string()),
                }),
              }),
              replaceWithInfoTypeConfig: z.object({}),
              timePartConfig: z.object({
                partToExtract: z.string(),
              }),
            }),
          })),
        }),
        primitiveTransformation: z.object({
          bucketingConfig: z.object({
            buckets: z.array(z.object({
              max: z.object({
                booleanValue: z.boolean(),
                dateValue: z.object({
                  day: z.number(),
                  month: z.number(),
                  year: z.number(),
                }),
                dayOfWeekValue: z.string(),
                floatValue: z.number(),
                integerValue: z.string(),
                stringValue: z.string(),
                timeValue: z.object({
                  hours: z.number(),
                  minutes: z.number(),
                  nanos: z.number(),
                  seconds: z.number(),
                }),
                timestampValue: z.string(),
              }),
              min: z.object({
                booleanValue: z.boolean(),
                dateValue: z.object({
                  day: z.number(),
                  month: z.number(),
                  year: z.number(),
                }),
                dayOfWeekValue: z.string(),
                floatValue: z.number(),
                integerValue: z.string(),
                stringValue: z.string(),
                timeValue: z.object({
                  hours: z.number(),
                  minutes: z.number(),
                  nanos: z.number(),
                  seconds: z.number(),
                }),
                timestampValue: z.string(),
              }),
              replacementValue: z.object({
                booleanValue: z.boolean(),
                dateValue: z.object({
                  day: z.number(),
                  month: z.number(),
                  year: z.number(),
                }),
                dayOfWeekValue: z.string(),
                floatValue: z.number(),
                integerValue: z.string(),
                stringValue: z.string(),
                timeValue: z.object({
                  hours: z.number(),
                  minutes: z.number(),
                  nanos: z.number(),
                  seconds: z.number(),
                }),
                timestampValue: z.string(),
              }),
            })),
          }),
          characterMaskConfig: z.object({
            charactersToIgnore: z.array(z.object({
              charactersToSkip: z.string(),
              commonCharactersToIgnore: z.string(),
            })),
            maskingCharacter: z.string(),
            numberToMask: z.number(),
            reverseOrder: z.boolean(),
          }),
          cryptoDeterministicConfig: z.object({
            context: z.object({
              name: z.string(),
            }),
            cryptoKey: z.object({
              kmsWrapped: z.object({
                cryptoKeyName: z.string(),
                wrappedKey: z.string(),
              }),
              transient: z.object({
                name: z.string(),
              }),
              unwrapped: z.object({
                key: z.string(),
              }),
            }),
            surrogateInfoType: z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            }),
          }),
          cryptoHashConfig: z.object({
            cryptoKey: z.object({
              kmsWrapped: z.object({
                cryptoKeyName: z.string(),
                wrappedKey: z.string(),
              }),
              transient: z.object({
                name: z.string(),
              }),
              unwrapped: z.object({
                key: z.string(),
              }),
            }),
          }),
          cryptoReplaceFfxFpeConfig: z.object({
            commonAlphabet: z.string(),
            context: z.object({
              name: z.string(),
            }),
            cryptoKey: z.object({
              kmsWrapped: z.object({
                cryptoKeyName: z.string(),
                wrappedKey: z.string(),
              }),
              transient: z.object({
                name: z.string(),
              }),
              unwrapped: z.object({
                key: z.string(),
              }),
            }),
            customAlphabet: z.string(),
            radix: z.number(),
            surrogateInfoType: z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            }),
          }),
          dateShiftConfig: z.object({
            context: z.object({
              name: z.string(),
            }),
            cryptoKey: z.object({
              kmsWrapped: z.object({
                cryptoKeyName: z.string(),
                wrappedKey: z.string(),
              }),
              transient: z.object({
                name: z.string(),
              }),
              unwrapped: z.object({
                key: z.string(),
              }),
            }),
            lowerBoundDays: z.number(),
            upperBoundDays: z.number(),
          }),
          fixedSizeBucketingConfig: z.object({
            bucketSize: z.number(),
            lowerBound: z.object({
              booleanValue: z.boolean(),
              dateValue: z.object({
                day: z.number(),
                month: z.number(),
                year: z.number(),
              }),
              dayOfWeekValue: z.string(),
              floatValue: z.number(),
              integerValue: z.string(),
              stringValue: z.string(),
              timeValue: z.object({
                hours: z.number(),
                minutes: z.number(),
                nanos: z.number(),
                seconds: z.number(),
              }),
              timestampValue: z.string(),
            }),
            upperBound: z.object({
              booleanValue: z.boolean(),
              dateValue: z.object({
                day: z.number(),
                month: z.number(),
                year: z.number(),
              }),
              dayOfWeekValue: z.string(),
              floatValue: z.number(),
              integerValue: z.string(),
              stringValue: z.string(),
              timeValue: z.object({
                hours: z.number(),
                minutes: z.number(),
                nanos: z.number(),
                seconds: z.number(),
              }),
              timestampValue: z.string(),
            }),
          }),
          redactConfig: z.object({}),
          replaceConfig: z.object({
            newValue: z.object({
              booleanValue: z.boolean(),
              dateValue: z.object({
                day: z.number(),
                month: z.number(),
                year: z.number(),
              }),
              dayOfWeekValue: z.string(),
              floatValue: z.number(),
              integerValue: z.string(),
              stringValue: z.string(),
              timeValue: z.object({
                hours: z.number(),
                minutes: z.number(),
                nanos: z.number(),
                seconds: z.number(),
              }),
              timestampValue: z.string(),
            }),
          }),
          replaceDictionaryConfig: z.object({
            wordList: z.object({
              words: z.array(z.string()),
            }),
          }),
          replaceWithInfoTypeConfig: z.object({}),
          timePartConfig: z.object({
            partToExtract: z.string(),
          }),
        }),
      })),
      recordSuppressions: z.array(z.object({
        condition: z.object({
          expressions: z.object({
            conditions: z.object({
              conditions: z.array(z.object({
                field: z.object({
                  name: z.string(),
                }),
                operator: z.string(),
                value: z.object({
                  booleanValue: z.boolean(),
                  dateValue: z.object({
                    day: z.number(),
                    month: z.number(),
                    year: z.number(),
                  }),
                  dayOfWeekValue: z.string(),
                  floatValue: z.number(),
                  integerValue: z.string(),
                  stringValue: z.string(),
                  timeValue: z.object({
                    hours: z.number(),
                    minutes: z.number(),
                    nanos: z.number(),
                    seconds: z.number(),
                  }),
                  timestampValue: z.string(),
                }),
              })),
            }),
            logicalOperator: z.string(),
          }),
        }),
      })),
    }),
    transformationErrorHandling: z.object({
      leaveUntransformed: z.object({}),
      throwError: z.object({}),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  deidentifyTemplate: z.object({
    createTime: z.string().describe(
      "Output only. The creation timestamp of an inspectTemplate.",
    ).optional(),
    deidentifyConfig: z.object({
      imageTransformations: z.object({
        transforms: z.array(z.object({
          allInfoTypes: z.object({}).describe(
            "Apply transformation to all findings.",
          ).optional(),
          allText: z.object({}).describe("Apply to all text.").optional(),
          redactionColor: z.object({
            blue: z.number().describe(
              "The amount of blue in the color as a value in the interval [0, 1].",
            ).optional(),
            green: z.number().describe(
              "The amount of green in the color as a value in the interval [0, 1].",
            ).optional(),
            red: z.number().describe(
              "The amount of red in the color as a value in the interval [0, 1].",
            ).optional(),
          }).describe("Represents a color in the RGB color space.").optional(),
          selectedInfoTypes: z.object({
            infoTypes: z.array(z.object({
              name: z.string().describe(
                "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
              ).optional(),
              sensitivityScore: z.object({
                score: z.enum([
                  "SENSITIVITY_SCORE_UNSPECIFIED",
                  "SENSITIVITY_LOW",
                  "SENSITIVITY_UNKNOWN",
                  "SENSITIVITY_MODERATE",
                  "SENSITIVITY_HIGH",
                ]).describe("The sensitivity score applied to the resource.")
                  .optional(),
              }).describe(
                "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
              ).optional(),
              version: z.string().describe(
                "Optional version name for this InfoType.",
              ).optional(),
            })).describe(
              "Required. InfoTypes to apply the transformation to. Required. Provided InfoType must be unique within the ImageTransformations message.",
            ).optional(),
          }).describe("Apply transformation to the selected info_types.")
            .optional(),
        })).describe("List of transforms to make.").optional(),
      }).describe("A type of transformation that is applied over images.")
        .optional(),
      infoTypeTransformations: z.object({
        transformations: z.array(z.object({
          infoTypes: z.array(z.object({
            name: z.string().describe(
              "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
            ).optional(),
            sensitivityScore: z.object({
              score: z.enum([
                "SENSITIVITY_SCORE_UNSPECIFIED",
                "SENSITIVITY_LOW",
                "SENSITIVITY_UNKNOWN",
                "SENSITIVITY_MODERATE",
                "SENSITIVITY_HIGH",
              ]).describe("The sensitivity score applied to the resource.")
                .optional(),
            }).describe(
              "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
            ).optional(),
            version: z.string().describe(
              "Optional version name for this InfoType.",
            ).optional(),
          })).describe(
            "InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`.",
          ).optional(),
          primitiveTransformation: z.object({
            bucketingConfig: z.object({
              buckets: z.array(z.object({
                max: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
                min: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
                replacementValue: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
              })).describe("Set of buckets. Ranges must be non-overlapping.")
                .optional(),
            }).describe(
              "Generalization function that buckets values based on ranges. The ranges and replacement values are dynamically provided by the user for custom behavior, such as 1-30 -> LOW, 31-65 -> MEDIUM, 66-100 -> HIGH. This can be used on data of type: number, long, string, timestamp. If the bound `Value` type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.",
            ).optional(),
            characterMaskConfig: z.object({
              charactersToIgnore: z.array(z.object({
                charactersToSkip: z.string().describe(
                  "Characters to not transform when masking.",
                ).optional(),
                commonCharactersToIgnore: z.enum([
                  "COMMON_CHARS_TO_IGNORE_UNSPECIFIED",
                  "NUMERIC",
                  "ALPHA_UPPER_CASE",
                  "ALPHA_LOWER_CASE",
                  "PUNCTUATION",
                  "WHITESPACE",
                ]).describe(
                  "Common characters to not transform when masking. Useful to avoid removing punctuation.",
                ).optional(),
              })).describe(
                "When masking a string, items in this list will be skipped when replacing characters. For example, if the input string is `555-555-5555` and you instruct Cloud DLP to skip `-` and mask 5 characters with `*`, Cloud DLP returns `***-**5-5555`.",
              ).optional(),
              maskingCharacter: z.string().describe(
                "Character to use to mask the sensitive values—for example, `*` for an alphabetic string such as a name, or `0` for a numeric string such as ZIP code or credit card number. This string must have a length of 1. If not supplied, this value defaults to `*` for strings, and `0` for digits.",
              ).optional(),
              numberToMask: z.number().int().describe(
                "Number of characters to mask. If not set, all matching chars will be masked. Skipped characters do not count towards this tally. If `number_to_mask` is negative, this denotes inverse masking. Cloud DLP masks all but a number of characters. For example, suppose you have the following values: - `masking_character` is `*` - `number_to_mask` is `-4` - `reverse_order` is `false` - `CharsToIgnore` includes `-` - Input string is `1234-5678-9012-3456` The resulting de-identified string is `****-****-****-3456`. Cloud DLP masks all but the last four characters. If `reverse_order` is `true`, all but the first four characters are masked as `1234-****-****-****`.",
              ).optional(),
              reverseOrder: z.boolean().describe(
                "Mask characters in reverse order. For example, if `masking_character` is `0`, `number_to_mask` is `14`, and `reverse_order` is `false`, then the input string `1234-5678-9012-3456` is masked as `00000000000000-3456`. If `masking_character` is `*`, `number_to_mask` is `3`, and `reverse_order` is `true`, then the string `12345` is masked as `12***`.",
              ).optional(),
            }).describe(
              "Partially mask a string by replacing a given number of characters with a fixed character. Masking can start from the beginning or end of the string. This can be used on data of any type (numbers, longs, and so on) and when de-identifying structured data we'll attempt to preserve the original data's type. (This allows you to take a long like 123 and modify it to a string like **3.",
            ).optional(),
            cryptoDeterministicConfig: z.object({
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              surrogateInfoType: z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              }).describe("Type of information detected by the API.")
                .optional(),
            }).describe(
              "Pseudonymization method that generates deterministic encryption for the given input. Outputs a base64 encoded representation of the encrypted output. Uses AES-SIV based on the RFC https://tools.ietf.org/html/rfc5297.",
            ).optional(),
            cryptoHashConfig: z.object({
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
            }).describe(
              "Pseudonymization method that generates surrogates via cryptographic hashing. Uses SHA-256. The key size must be either 32 or 64 bytes. Outputs a base64 encoded representation of the hashed output (for example, L7k0BHmF1ha5U3NfGykjro4xWi1MPVQPjhMAZbSV9mM=). Currently, only string and integer values can be hashed. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more.",
            ).optional(),
            cryptoReplaceFfxFpeConfig: z.object({
              commonAlphabet: z.enum([
                "FFX_COMMON_NATIVE_ALPHABET_UNSPECIFIED",
                "NUMERIC",
                "HEXADECIMAL",
                "UPPER_CASE_ALPHA_NUMERIC",
                "ALPHA_NUMERIC",
              ]).describe("Common alphabets.").optional(),
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              customAlphabet: z.string().describe(
                "This is supported by mapping these to the alphanumeric characters that the FFX mode natively supports. This happens before/after encryption/decryption. Each character listed must appear only once. Number of characters must be in the range [2, 95]. This must be encoded as ASCII. The order of characters does not matter. The full list of allowed characters is: ``0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_-+={[}]|\\:;\"'.?/``",
              ).optional(),
              radix: z.number().int().describe(
                "The native way to select the alphabet. Must be in the range [2, 95].",
              ).optional(),
              surrogateInfoType: z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              }).describe("Type of information detected by the API.")
                .optional(),
            }).describe(
              "Replaces an identifier with a surrogate using Format Preserving Encryption (FPE) with the FFX mode of operation; however when used in the `ReidentifyContent` API method, it serves the opposite function by reversing the surrogate back into the original identifier. The identifier must be encoded as ASCII. For a given crypto key and context, the same identifier will be replaced with the same surrogate. Identifiers must be at least two characters long. In the case that the identifier is the empty string, it will be skipped. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more. Note: We recommend using CryptoDeterministicConfig for all use cases which do not require preserving the input alphabet space and size, plus warrant referential integrity. FPE incurs significant latency costs.",
            ).optional(),
            dateShiftConfig: z.object({
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              lowerBoundDays: z.number().int().describe(
                "Required. For example, -5 means shift date to at most 5 days back in the past.",
              ).optional(),
              upperBoundDays: z.number().int().describe(
                "Required. Range of shift in days. Actual shift will be selected at random within this range (inclusive ends). Negative means shift to earlier in time. Must not be more than 365250 days (1000 years) each direction. For example, 3 means shift date to at most 3 days into the future.",
              ).optional(),
            }).describe(
              "Shifts dates by random number of days, with option to be consistent for the same context. See https://cloud.google.com/sensitive-data-protection/docs/concepts-date-shifting to learn more.",
            ).optional(),
            fixedSizeBucketingConfig: z.object({
              bucketSize: z.number().describe(
                "Required. Size of each bucket (except for minimum and maximum buckets). So if `lower_bound` = 10, `upper_bound` = 89, and `bucket_size` = 10, then the following buckets would be used: -10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70, 70-80, 80-89, 89+. Precision up to 2 decimals works.",
              ).optional(),
              lowerBound: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
              upperBound: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
            }).describe(
              'Buckets values based on fixed size ranges. The Bucketing transformation can provide all of this functionality, but requires more configuration. This message is provided as a convenience to the user for simple bucketing strategies. The transformed value will be a hyphenated string of {lower_bound}-{upper_bound}. For example, if lower_bound = 10 and upper_bound = 20, all values that are within this bucket will be replaced with "10-20". This can be used on data of type: double, long. If the bound Value type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.',
            ).optional(),
            redactConfig: z.object({}).describe(
              "Redact a given value. For example, if used with an `InfoTypeTransformation` transforming PHONE_NUMBER, and input 'My phone number is 206-555-0123', the output would be 'My phone number is '.",
            ).optional(),
            replaceConfig: z.object({
              newValue: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
            }).describe("Replace each input value with a given `Value`.")
              .optional(),
            replaceDictionaryConfig: z.object({
              wordList: z.object({
                words: z.array(z.string()).describe(
                  "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
                ).optional(),
              }).describe(
                "Message defining a list of words or phrases to search for in the data.",
              ).optional(),
            }).describe(
              "Replace each input value with a value randomly selected from the dictionary.",
            ).optional(),
            replaceWithInfoTypeConfig: z.object({}).describe(
              "Replace each matching finding with the name of the info_type.",
            ).optional(),
            timePartConfig: z.object({
              partToExtract: z.enum([
                "TIME_PART_UNSPECIFIED",
                "YEAR",
                "MONTH",
                "DAY_OF_MONTH",
                "DAY_OF_WEEK",
                "WEEK_OF_YEAR",
                "HOUR_OF_DAY",
              ]).describe("The part of the time to keep.").optional(),
            }).describe(
              "For use with `Date`, `Timestamp`, and `TimeOfDay`, extract or preserve a portion of the value.",
            ).optional(),
          }).describe("A rule for transforming a value.").optional(),
        })).describe(
          "Required. Transformation for each infoType. Cannot specify more than one for a given infoType.",
        ).optional(),
      }).describe(
        "A type of transformation that will scan unstructured text and apply various `PrimitiveTransformation`s to each finding, where the transformation is applied to only values that were identified as a specific info_type.",
      ).optional(),
      recordTransformations: z.object({
        fieldTransformations: z.array(z.object({
          condition: z.object({
            expressions: z.object({
              conditions: z.object({
                conditions: z.array(z.object({
                  field: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  operator: z.enum([
                    "RELATIONAL_OPERATOR_UNSPECIFIED",
                    "EQUAL_TO",
                    "NOT_EQUAL_TO",
                    "GREATER_THAN",
                    "LESS_THAN",
                    "GREATER_THAN_OR_EQUALS",
                    "LESS_THAN_OR_EQUALS",
                    "EXISTS",
                  ]).describe(
                    "Required. Operator used to compare the field or infoType to the value.",
                  ).optional(),
                  value: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                })).describe("A collection of conditions.").optional(),
              }).describe("A collection of conditions.").optional(),
              logicalOperator: z.enum(["LOGICAL_OPERATOR_UNSPECIFIED", "AND"])
                .describe(
                  "The operator to apply to the result of conditions. Default and currently only supported value is `AND`.",
                ).optional(),
            }).describe(
              "An expression, consisting of an operator and conditions.",
            ).optional(),
          }).describe(
            "A condition for determining whether a transformation should be applied to a field.",
          ).optional(),
          fields: z.array(z.object({
            name: z.string().describe("Name describing the field.").optional(),
          })).describe(
            'Required. Input field(s) to apply the transformation to. When you have columns that reference their position within a list, omit the index from the FieldId. FieldId name matching ignores the index. For example, instead of "contact.nums[0].type", use "contact.nums.type".',
          ).optional(),
          infoTypeTransformations: z.object({
            transformations: z.array(z.object({
              infoTypes: z.array(z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              })).describe(
                "InfoTypes to apply the transformation to. An empty list will cause this transformation to apply to all findings that correspond to infoTypes that were requested in `InspectConfig`.",
              ).optional(),
              primitiveTransformation: z.object({
                bucketingConfig: z.object({
                  buckets: z.array(z.object({
                    max: z.object({
                      booleanValue: z.boolean().describe("boolean").optional(),
                      dateValue: z.object({
                        day: z.number().int().describe(
                          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                        ).optional(),
                        month: z.number().int().describe(
                          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                        ).optional(),
                        year: z.number().int().describe(
                          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                        ).optional(),
                      }).describe(
                        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                      ).optional(),
                      dayOfWeekValue: z.enum([
                        "DAY_OF_WEEK_UNSPECIFIED",
                        "MONDAY",
                        "TUESDAY",
                        "WEDNESDAY",
                        "THURSDAY",
                        "FRIDAY",
                        "SATURDAY",
                        "SUNDAY",
                      ]).describe("day of week").optional(),
                      floatValue: z.number().describe("float").optional(),
                      integerValue: z.string().describe("integer").optional(),
                      stringValue: z.string().describe("string").optional(),
                      timeValue: z.object({
                        hours: z.number().int().describe(
                          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                        ).optional(),
                        minutes: z.number().int().describe(
                          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                        ).optional(),
                        nanos: z.number().int().describe(
                          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                        ).optional(),
                        seconds: z.number().int().describe(
                          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                        ).optional(),
                      }).describe(
                        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                      ).optional(),
                      timestampValue: z.string().describe("timestamp")
                        .optional(),
                    }).describe(
                      "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                    ).optional(),
                    min: z.object({
                      booleanValue: z.boolean().describe("boolean").optional(),
                      dateValue: z.object({
                        day: z.number().int().describe(
                          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                        ).optional(),
                        month: z.number().int().describe(
                          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                        ).optional(),
                        year: z.number().int().describe(
                          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                        ).optional(),
                      }).describe(
                        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                      ).optional(),
                      dayOfWeekValue: z.enum([
                        "DAY_OF_WEEK_UNSPECIFIED",
                        "MONDAY",
                        "TUESDAY",
                        "WEDNESDAY",
                        "THURSDAY",
                        "FRIDAY",
                        "SATURDAY",
                        "SUNDAY",
                      ]).describe("day of week").optional(),
                      floatValue: z.number().describe("float").optional(),
                      integerValue: z.string().describe("integer").optional(),
                      stringValue: z.string().describe("string").optional(),
                      timeValue: z.object({
                        hours: z.number().int().describe(
                          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                        ).optional(),
                        minutes: z.number().int().describe(
                          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                        ).optional(),
                        nanos: z.number().int().describe(
                          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                        ).optional(),
                        seconds: z.number().int().describe(
                          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                        ).optional(),
                      }).describe(
                        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                      ).optional(),
                      timestampValue: z.string().describe("timestamp")
                        .optional(),
                    }).describe(
                      "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                    ).optional(),
                    replacementValue: z.object({
                      booleanValue: z.boolean().describe("boolean").optional(),
                      dateValue: z.object({
                        day: z.number().int().describe(
                          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                        ).optional(),
                        month: z.number().int().describe(
                          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                        ).optional(),
                        year: z.number().int().describe(
                          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                        ).optional(),
                      }).describe(
                        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                      ).optional(),
                      dayOfWeekValue: z.enum([
                        "DAY_OF_WEEK_UNSPECIFIED",
                        "MONDAY",
                        "TUESDAY",
                        "WEDNESDAY",
                        "THURSDAY",
                        "FRIDAY",
                        "SATURDAY",
                        "SUNDAY",
                      ]).describe("day of week").optional(),
                      floatValue: z.number().describe("float").optional(),
                      integerValue: z.string().describe("integer").optional(),
                      stringValue: z.string().describe("string").optional(),
                      timeValue: z.object({
                        hours: z.number().int().describe(
                          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                        ).optional(),
                        minutes: z.number().int().describe(
                          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                        ).optional(),
                        nanos: z.number().int().describe(
                          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                        ).optional(),
                        seconds: z.number().int().describe(
                          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                        ).optional(),
                      }).describe(
                        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                      ).optional(),
                      timestampValue: z.string().describe("timestamp")
                        .optional(),
                    }).describe(
                      "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                    ).optional(),
                  })).describe(
                    "Set of buckets. Ranges must be non-overlapping.",
                  ).optional(),
                }).describe(
                  "Generalization function that buckets values based on ranges. The ranges and replacement values are dynamically provided by the user for custom behavior, such as 1-30 -> LOW, 31-65 -> MEDIUM, 66-100 -> HIGH. This can be used on data of type: number, long, string, timestamp. If the bound `Value` type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.",
                ).optional(),
                characterMaskConfig: z.object({
                  charactersToIgnore: z.array(z.object({
                    charactersToSkip: z.string().describe(
                      "Characters to not transform when masking.",
                    ).optional(),
                    commonCharactersToIgnore: z.enum([
                      "COMMON_CHARS_TO_IGNORE_UNSPECIFIED",
                      "NUMERIC",
                      "ALPHA_UPPER_CASE",
                      "ALPHA_LOWER_CASE",
                      "PUNCTUATION",
                      "WHITESPACE",
                    ]).describe(
                      "Common characters to not transform when masking. Useful to avoid removing punctuation.",
                    ).optional(),
                  })).describe(
                    "When masking a string, items in this list will be skipped when replacing characters. For example, if the input string is `555-555-5555` and you instruct Cloud DLP to skip `-` and mask 5 characters with `*`, Cloud DLP returns `***-**5-5555`.",
                  ).optional(),
                  maskingCharacter: z.string().describe(
                    "Character to use to mask the sensitive values—for example, `*` for an alphabetic string such as a name, or `0` for a numeric string such as ZIP code or credit card number. This string must have a length of 1. If not supplied, this value defaults to `*` for strings, and `0` for digits.",
                  ).optional(),
                  numberToMask: z.number().int().describe(
                    "Number of characters to mask. If not set, all matching chars will be masked. Skipped characters do not count towards this tally. If `number_to_mask` is negative, this denotes inverse masking. Cloud DLP masks all but a number of characters. For example, suppose you have the following values: - `masking_character` is `*` - `number_to_mask` is `-4` - `reverse_order` is `false` - `CharsToIgnore` includes `-` - Input string is `1234-5678-9012-3456` The resulting de-identified string is `****-****-****-3456`. Cloud DLP masks all but the last four characters. If `reverse_order` is `true`, all but the first four characters are masked as `1234-****-****-****`.",
                  ).optional(),
                  reverseOrder: z.boolean().describe(
                    "Mask characters in reverse order. For example, if `masking_character` is `0`, `number_to_mask` is `14`, and `reverse_order` is `false`, then the input string `1234-5678-9012-3456` is masked as `00000000000000-3456`. If `masking_character` is `*`, `number_to_mask` is `3`, and `reverse_order` is `true`, then the string `12345` is masked as `12***`.",
                  ).optional(),
                }).describe(
                  "Partially mask a string by replacing a given number of characters with a fixed character. Masking can start from the beginning or end of the string. This can be used on data of any type (numbers, longs, and so on) and when de-identifying structured data we'll attempt to preserve the original data's type. (This allows you to take a long like 123 and modify it to a string like **3.",
                ).optional(),
                cryptoDeterministicConfig: z.object({
                  context: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  cryptoKey: z.object({
                    kmsWrapped: z.object({
                      cryptoKeyName: z.string().describe(
                        "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                      ).optional(),
                      wrappedKey: z.string().describe(
                        "Required. The wrapped data crypto key.",
                      ).optional(),
                    }).describe(
                      "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                    ).optional(),
                    transient: z.object({
                      name: z.string().describe(
                        "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                      ).optional(),
                    }).describe(
                      "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                    ).optional(),
                    unwrapped: z.object({
                      key: z.string().describe(
                        "Required. A 128/192/256 bit key.",
                      ).optional(),
                    }).describe(
                      "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                    ).optional(),
                  }).describe(
                    "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
                  ).optional(),
                  surrogateInfoType: z.object({
                    name: z.string().describe(
                      "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                    ).optional(),
                    sensitivityScore: z.object({
                      score: z.enum([
                        "SENSITIVITY_SCORE_UNSPECIFIED",
                        "SENSITIVITY_LOW",
                        "SENSITIVITY_UNKNOWN",
                        "SENSITIVITY_MODERATE",
                        "SENSITIVITY_HIGH",
                      ]).describe(
                        "The sensitivity score applied to the resource.",
                      ).optional(),
                    }).describe(
                      "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                    ).optional(),
                    version: z.string().describe(
                      "Optional version name for this InfoType.",
                    ).optional(),
                  }).describe("Type of information detected by the API.")
                    .optional(),
                }).describe(
                  "Pseudonymization method that generates deterministic encryption for the given input. Outputs a base64 encoded representation of the encrypted output. Uses AES-SIV based on the RFC https://tools.ietf.org/html/rfc5297.",
                ).optional(),
                cryptoHashConfig: z.object({
                  cryptoKey: z.object({
                    kmsWrapped: z.object({
                      cryptoKeyName: z.string().describe(
                        "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                      ).optional(),
                      wrappedKey: z.string().describe(
                        "Required. The wrapped data crypto key.",
                      ).optional(),
                    }).describe(
                      "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                    ).optional(),
                    transient: z.object({
                      name: z.string().describe(
                        "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                      ).optional(),
                    }).describe(
                      "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                    ).optional(),
                    unwrapped: z.object({
                      key: z.string().describe(
                        "Required. A 128/192/256 bit key.",
                      ).optional(),
                    }).describe(
                      "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                    ).optional(),
                  }).describe(
                    "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
                  ).optional(),
                }).describe(
                  "Pseudonymization method that generates surrogates via cryptographic hashing. Uses SHA-256. The key size must be either 32 or 64 bytes. Outputs a base64 encoded representation of the hashed output (for example, L7k0BHmF1ha5U3NfGykjro4xWi1MPVQPjhMAZbSV9mM=). Currently, only string and integer values can be hashed. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more.",
                ).optional(),
                cryptoReplaceFfxFpeConfig: z.object({
                  commonAlphabet: z.enum([
                    "FFX_COMMON_NATIVE_ALPHABET_UNSPECIFIED",
                    "NUMERIC",
                    "HEXADECIMAL",
                    "UPPER_CASE_ALPHA_NUMERIC",
                    "ALPHA_NUMERIC",
                  ]).describe("Common alphabets.").optional(),
                  context: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  cryptoKey: z.object({
                    kmsWrapped: z.object({
                      cryptoKeyName: z.string().describe(
                        "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                      ).optional(),
                      wrappedKey: z.string().describe(
                        "Required. The wrapped data crypto key.",
                      ).optional(),
                    }).describe(
                      "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                    ).optional(),
                    transient: z.object({
                      name: z.string().describe(
                        "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                      ).optional(),
                    }).describe(
                      "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                    ).optional(),
                    unwrapped: z.object({
                      key: z.string().describe(
                        "Required. A 128/192/256 bit key.",
                      ).optional(),
                    }).describe(
                      "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                    ).optional(),
                  }).describe(
                    "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
                  ).optional(),
                  customAlphabet: z.string().describe(
                    "This is supported by mapping these to the alphanumeric characters that the FFX mode natively supports. This happens before/after encryption/decryption. Each character listed must appear only once. Number of characters must be in the range [2, 95]. This must be encoded as ASCII. The order of characters does not matter. The full list of allowed characters is: ``0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_-+={[}]|\\:;\"'.?/``",
                  ).optional(),
                  radix: z.number().int().describe(
                    "The native way to select the alphabet. Must be in the range [2, 95].",
                  ).optional(),
                  surrogateInfoType: z.object({
                    name: z.string().describe(
                      "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                    ).optional(),
                    sensitivityScore: z.object({
                      score: z.enum([
                        "SENSITIVITY_SCORE_UNSPECIFIED",
                        "SENSITIVITY_LOW",
                        "SENSITIVITY_UNKNOWN",
                        "SENSITIVITY_MODERATE",
                        "SENSITIVITY_HIGH",
                      ]).describe(
                        "The sensitivity score applied to the resource.",
                      ).optional(),
                    }).describe(
                      "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                    ).optional(),
                    version: z.string().describe(
                      "Optional version name for this InfoType.",
                    ).optional(),
                  }).describe("Type of information detected by the API.")
                    .optional(),
                }).describe(
                  "Replaces an identifier with a surrogate using Format Preserving Encryption (FPE) with the FFX mode of operation; however when used in the `ReidentifyContent` API method, it serves the opposite function by reversing the surrogate back into the original identifier. The identifier must be encoded as ASCII. For a given crypto key and context, the same identifier will be replaced with the same surrogate. Identifiers must be at least two characters long. In the case that the identifier is the empty string, it will be skipped. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more. Note: We recommend using CryptoDeterministicConfig for all use cases which do not require preserving the input alphabet space and size, plus warrant referential integrity. FPE incurs significant latency costs.",
                ).optional(),
                dateShiftConfig: z.object({
                  context: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  cryptoKey: z.object({
                    kmsWrapped: z.object({
                      cryptoKeyName: z.string().describe(
                        "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                      ).optional(),
                      wrappedKey: z.string().describe(
                        "Required. The wrapped data crypto key.",
                      ).optional(),
                    }).describe(
                      "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                    ).optional(),
                    transient: z.object({
                      name: z.string().describe(
                        "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                      ).optional(),
                    }).describe(
                      "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                    ).optional(),
                    unwrapped: z.object({
                      key: z.string().describe(
                        "Required. A 128/192/256 bit key.",
                      ).optional(),
                    }).describe(
                      "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                    ).optional(),
                  }).describe(
                    "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
                  ).optional(),
                  lowerBoundDays: z.number().int().describe(
                    "Required. For example, -5 means shift date to at most 5 days back in the past.",
                  ).optional(),
                  upperBoundDays: z.number().int().describe(
                    "Required. Range of shift in days. Actual shift will be selected at random within this range (inclusive ends). Negative means shift to earlier in time. Must not be more than 365250 days (1000 years) each direction. For example, 3 means shift date to at most 3 days into the future.",
                  ).optional(),
                }).describe(
                  "Shifts dates by random number of days, with option to be consistent for the same context. See https://cloud.google.com/sensitive-data-protection/docs/concepts-date-shifting to learn more.",
                ).optional(),
                fixedSizeBucketingConfig: z.object({
                  bucketSize: z.number().describe(
                    "Required. Size of each bucket (except for minimum and maximum buckets). So if `lower_bound` = 10, `upper_bound` = 89, and `bucket_size` = 10, then the following buckets would be used: -10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70, 70-80, 80-89, 89+. Precision up to 2 decimals works.",
                  ).optional(),
                  lowerBound: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                  upperBound: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                }).describe(
                  'Buckets values based on fixed size ranges. The Bucketing transformation can provide all of this functionality, but requires more configuration. This message is provided as a convenience to the user for simple bucketing strategies. The transformed value will be a hyphenated string of {lower_bound}-{upper_bound}. For example, if lower_bound = 10 and upper_bound = 20, all values that are within this bucket will be replaced with "10-20". This can be used on data of type: double, long. If the bound Value type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.',
                ).optional(),
                redactConfig: z.object({}).describe(
                  "Redact a given value. For example, if used with an `InfoTypeTransformation` transforming PHONE_NUMBER, and input 'My phone number is 206-555-0123', the output would be 'My phone number is '.",
                ).optional(),
                replaceConfig: z.object({
                  newValue: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                }).describe("Replace each input value with a given `Value`.")
                  .optional(),
                replaceDictionaryConfig: z.object({
                  wordList: z.object({
                    words: z.array(z.string()).describe(
                      "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
                    ).optional(),
                  }).describe(
                    "Message defining a list of words or phrases to search for in the data.",
                  ).optional(),
                }).describe(
                  "Replace each input value with a value randomly selected from the dictionary.",
                ).optional(),
                replaceWithInfoTypeConfig: z.object({}).describe(
                  "Replace each matching finding with the name of the info_type.",
                ).optional(),
                timePartConfig: z.object({
                  partToExtract: z.enum([
                    "TIME_PART_UNSPECIFIED",
                    "YEAR",
                    "MONTH",
                    "DAY_OF_MONTH",
                    "DAY_OF_WEEK",
                    "WEEK_OF_YEAR",
                    "HOUR_OF_DAY",
                  ]).describe("The part of the time to keep.").optional(),
                }).describe(
                  "For use with `Date`, `Timestamp`, and `TimeOfDay`, extract or preserve a portion of the value.",
                ).optional(),
              }).describe("A rule for transforming a value.").optional(),
            })).describe(
              "Required. Transformation for each infoType. Cannot specify more than one for a given infoType.",
            ).optional(),
          }).describe(
            "A type of transformation that will scan unstructured text and apply various `PrimitiveTransformation`s to each finding, where the transformation is applied to only values that were identified as a specific info_type.",
          ).optional(),
          primitiveTransformation: z.object({
            bucketingConfig: z.object({
              buckets: z.array(z.object({
                max: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
                min: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
                replacementValue: z.object({
                  booleanValue: z.boolean().describe("boolean").optional(),
                  dateValue: z.object({
                    day: z.number().int().describe(
                      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                    ).optional(),
                    month: z.number().int().describe(
                      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                    ).optional(),
                    year: z.number().int().describe(
                      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                    ).optional(),
                  }).describe(
                    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                  ).optional(),
                  dayOfWeekValue: z.enum([
                    "DAY_OF_WEEK_UNSPECIFIED",
                    "MONDAY",
                    "TUESDAY",
                    "WEDNESDAY",
                    "THURSDAY",
                    "FRIDAY",
                    "SATURDAY",
                    "SUNDAY",
                  ]).describe("day of week").optional(),
                  floatValue: z.number().describe("float").optional(),
                  integerValue: z.string().describe("integer").optional(),
                  stringValue: z.string().describe("string").optional(),
                  timeValue: z.object({
                    hours: z.number().int().describe(
                      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                    ).optional(),
                    minutes: z.number().int().describe(
                      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                    ).optional(),
                    nanos: z.number().int().describe(
                      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                    ).optional(),
                    seconds: z.number().int().describe(
                      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                    ).optional(),
                  }).describe(
                    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                  ).optional(),
                  timestampValue: z.string().describe("timestamp").optional(),
                }).describe(
                  "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                ).optional(),
              })).describe("Set of buckets. Ranges must be non-overlapping.")
                .optional(),
            }).describe(
              "Generalization function that buckets values based on ranges. The ranges and replacement values are dynamically provided by the user for custom behavior, such as 1-30 -> LOW, 31-65 -> MEDIUM, 66-100 -> HIGH. This can be used on data of type: number, long, string, timestamp. If the bound `Value` type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.",
            ).optional(),
            characterMaskConfig: z.object({
              charactersToIgnore: z.array(z.object({
                charactersToSkip: z.string().describe(
                  "Characters to not transform when masking.",
                ).optional(),
                commonCharactersToIgnore: z.enum([
                  "COMMON_CHARS_TO_IGNORE_UNSPECIFIED",
                  "NUMERIC",
                  "ALPHA_UPPER_CASE",
                  "ALPHA_LOWER_CASE",
                  "PUNCTUATION",
                  "WHITESPACE",
                ]).describe(
                  "Common characters to not transform when masking. Useful to avoid removing punctuation.",
                ).optional(),
              })).describe(
                "When masking a string, items in this list will be skipped when replacing characters. For example, if the input string is `555-555-5555` and you instruct Cloud DLP to skip `-` and mask 5 characters with `*`, Cloud DLP returns `***-**5-5555`.",
              ).optional(),
              maskingCharacter: z.string().describe(
                "Character to use to mask the sensitive values—for example, `*` for an alphabetic string such as a name, or `0` for a numeric string such as ZIP code or credit card number. This string must have a length of 1. If not supplied, this value defaults to `*` for strings, and `0` for digits.",
              ).optional(),
              numberToMask: z.number().int().describe(
                "Number of characters to mask. If not set, all matching chars will be masked. Skipped characters do not count towards this tally. If `number_to_mask` is negative, this denotes inverse masking. Cloud DLP masks all but a number of characters. For example, suppose you have the following values: - `masking_character` is `*` - `number_to_mask` is `-4` - `reverse_order` is `false` - `CharsToIgnore` includes `-` - Input string is `1234-5678-9012-3456` The resulting de-identified string is `****-****-****-3456`. Cloud DLP masks all but the last four characters. If `reverse_order` is `true`, all but the first four characters are masked as `1234-****-****-****`.",
              ).optional(),
              reverseOrder: z.boolean().describe(
                "Mask characters in reverse order. For example, if `masking_character` is `0`, `number_to_mask` is `14`, and `reverse_order` is `false`, then the input string `1234-5678-9012-3456` is masked as `00000000000000-3456`. If `masking_character` is `*`, `number_to_mask` is `3`, and `reverse_order` is `true`, then the string `12345` is masked as `12***`.",
              ).optional(),
            }).describe(
              "Partially mask a string by replacing a given number of characters with a fixed character. Masking can start from the beginning or end of the string. This can be used on data of any type (numbers, longs, and so on) and when de-identifying structured data we'll attempt to preserve the original data's type. (This allows you to take a long like 123 and modify it to a string like **3.",
            ).optional(),
            cryptoDeterministicConfig: z.object({
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              surrogateInfoType: z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              }).describe("Type of information detected by the API.")
                .optional(),
            }).describe(
              "Pseudonymization method that generates deterministic encryption for the given input. Outputs a base64 encoded representation of the encrypted output. Uses AES-SIV based on the RFC https://tools.ietf.org/html/rfc5297.",
            ).optional(),
            cryptoHashConfig: z.object({
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
            }).describe(
              "Pseudonymization method that generates surrogates via cryptographic hashing. Uses SHA-256. The key size must be either 32 or 64 bytes. Outputs a base64 encoded representation of the hashed output (for example, L7k0BHmF1ha5U3NfGykjro4xWi1MPVQPjhMAZbSV9mM=). Currently, only string and integer values can be hashed. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more.",
            ).optional(),
            cryptoReplaceFfxFpeConfig: z.object({
              commonAlphabet: z.enum([
                "FFX_COMMON_NATIVE_ALPHABET_UNSPECIFIED",
                "NUMERIC",
                "HEXADECIMAL",
                "UPPER_CASE_ALPHA_NUMERIC",
                "ALPHA_NUMERIC",
              ]).describe("Common alphabets.").optional(),
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              customAlphabet: z.string().describe(
                "This is supported by mapping these to the alphanumeric characters that the FFX mode natively supports. This happens before/after encryption/decryption. Each character listed must appear only once. Number of characters must be in the range [2, 95]. This must be encoded as ASCII. The order of characters does not matter. The full list of allowed characters is: ``0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_-+={[}]|\\:;\"'.?/``",
              ).optional(),
              radix: z.number().int().describe(
                "The native way to select the alphabet. Must be in the range [2, 95].",
              ).optional(),
              surrogateInfoType: z.object({
                name: z.string().describe(
                  "Name of the information type. Either a name of your choosing when creating a CustomInfoType, or one of the names listed at https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference when specifying a built-in type. When sending Cloud DLP results to Data Catalog, infoType names should conform to the pattern `[A-Za-z0-9$_-]{1,64}`.",
                ).optional(),
                sensitivityScore: z.object({
                  score: z.enum([
                    "SENSITIVITY_SCORE_UNSPECIFIED",
                    "SENSITIVITY_LOW",
                    "SENSITIVITY_UNKNOWN",
                    "SENSITIVITY_MODERATE",
                    "SENSITIVITY_HIGH",
                  ]).describe("The sensitivity score applied to the resource.")
                    .optional(),
                }).describe(
                  "Score is calculated from of all elements in the data profile. A higher level means the data is more sensitive.",
                ).optional(),
                version: z.string().describe(
                  "Optional version name for this InfoType.",
                ).optional(),
              }).describe("Type of information detected by the API.")
                .optional(),
            }).describe(
              "Replaces an identifier with a surrogate using Format Preserving Encryption (FPE) with the FFX mode of operation; however when used in the `ReidentifyContent` API method, it serves the opposite function by reversing the surrogate back into the original identifier. The identifier must be encoded as ASCII. For a given crypto key and context, the same identifier will be replaced with the same surrogate. Identifiers must be at least two characters long. In the case that the identifier is the empty string, it will be skipped. See https://cloud.google.com/sensitive-data-protection/docs/pseudonymization to learn more. Note: We recommend using CryptoDeterministicConfig for all use cases which do not require preserving the input alphabet space and size, plus warrant referential integrity. FPE incurs significant latency costs.",
            ).optional(),
            dateShiftConfig: z.object({
              context: z.object({
                name: z.string().describe("Name describing the field.")
                  .optional(),
              }).describe(
                "General identifier of a data field in a storage service.",
              ).optional(),
              cryptoKey: z.object({
                kmsWrapped: z.object({
                  cryptoKeyName: z.string().describe(
                    "Required. The resource name of the KMS CryptoKey to use for unwrapping.",
                  ).optional(),
                  wrappedKey: z.string().describe(
                    "Required. The wrapped data crypto key.",
                  ).optional(),
                }).describe(
                  "Include to use an existing data crypto key wrapped by KMS. The wrapped key must be a 128-, 192-, or 256-bit key. Authorization requires the following IAM permissions when sending a request to perform a crypto transformation using a KMS-wrapped crypto key: dlp.kms.encrypt For more information, see [Creating a wrapped key] (https://cloud.google.com/sensitive-data-protection/docs/create-wrapped-key). Note: When you use Cloud KMS for cryptographic operations, [charges apply](https://cloud.google.com/kms/pricing).",
                ).optional(),
                transient: z.object({
                  name: z.string().describe(
                    "Required. Name of the key. This is an arbitrary string used to differentiate different keys. A unique key is generated per name: two separate `TransientCryptoKey` protos share the same generated key if their names are the same. When the data crypto key is generated, this name is not used in any way (repeating the api call will result in a different key being generated).",
                  ).optional(),
                }).describe(
                  "Use this to have a random data crypto key generated. It will be discarded after the request finishes.",
                ).optional(),
                unwrapped: z.object({
                  key: z.string().describe("Required. A 128/192/256 bit key.")
                    .optional(),
                }).describe(
                  "Using raw keys is prone to security risks due to accidentally leaking the key. Choose another type of key if possible.",
                ).optional(),
              }).describe(
                "This is a data encryption key (DEK) (as opposed to a key encryption key (KEK) stored by Cloud Key Management Service (Cloud KMS). When using Cloud KMS to wrap or unwrap a DEK, be sure to set an appropriate IAM policy on the KEK to ensure an attacker cannot unwrap the DEK.",
              ).optional(),
              lowerBoundDays: z.number().int().describe(
                "Required. For example, -5 means shift date to at most 5 days back in the past.",
              ).optional(),
              upperBoundDays: z.number().int().describe(
                "Required. Range of shift in days. Actual shift will be selected at random within this range (inclusive ends). Negative means shift to earlier in time. Must not be more than 365250 days (1000 years) each direction. For example, 3 means shift date to at most 3 days into the future.",
              ).optional(),
            }).describe(
              "Shifts dates by random number of days, with option to be consistent for the same context. See https://cloud.google.com/sensitive-data-protection/docs/concepts-date-shifting to learn more.",
            ).optional(),
            fixedSizeBucketingConfig: z.object({
              bucketSize: z.number().describe(
                "Required. Size of each bucket (except for minimum and maximum buckets). So if `lower_bound` = 10, `upper_bound` = 89, and `bucket_size` = 10, then the following buckets would be used: -10, 10-20, 20-30, 30-40, 40-50, 50-60, 60-70, 70-80, 80-89, 89+. Precision up to 2 decimals works.",
              ).optional(),
              lowerBound: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
              upperBound: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
            }).describe(
              'Buckets values based on fixed size ranges. The Bucketing transformation can provide all of this functionality, but requires more configuration. This message is provided as a convenience to the user for simple bucketing strategies. The transformed value will be a hyphenated string of {lower_bound}-{upper_bound}. For example, if lower_bound = 10 and upper_bound = 20, all values that are within this bucket will be replaced with "10-20". This can be used on data of type: double, long. If the bound Value type differs from the type of data being transformed, we will first attempt converting the type of the data to be transformed to match the type of the bound before comparing. See https://cloud.google.com/sensitive-data-protection/docs/concepts-bucketing to learn more.',
            ).optional(),
            redactConfig: z.object({}).describe(
              "Redact a given value. For example, if used with an `InfoTypeTransformation` transforming PHONE_NUMBER, and input 'My phone number is 206-555-0123', the output would be 'My phone number is '.",
            ).optional(),
            replaceConfig: z.object({
              newValue: z.object({
                booleanValue: z.boolean().describe("boolean").optional(),
                dateValue: z.object({
                  day: z.number().int().describe(
                    "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                  ).optional(),
                  month: z.number().int().describe(
                    "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                  ).optional(),
                  year: z.number().int().describe(
                    "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                  ).optional(),
                }).describe(
                  "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                ).optional(),
                dayOfWeekValue: z.enum([
                  "DAY_OF_WEEK_UNSPECIFIED",
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]).describe("day of week").optional(),
                floatValue: z.number().describe("float").optional(),
                integerValue: z.string().describe("integer").optional(),
                stringValue: z.string().describe("string").optional(),
                timeValue: z.object({
                  hours: z.number().int().describe(
                    'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                  ).optional(),
                  minutes: z.number().int().describe(
                    "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                  ).optional(),
                  nanos: z.number().int().describe(
                    "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                  ).optional(),
                  seconds: z.number().int().describe(
                    "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                  ).optional(),
                }).describe(
                  "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                ).optional(),
                timestampValue: z.string().describe("timestamp").optional(),
              }).describe(
                "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
              ).optional(),
            }).describe("Replace each input value with a given `Value`.")
              .optional(),
            replaceDictionaryConfig: z.object({
              wordList: z.object({
                words: z.array(z.string()).describe(
                  "Words or phrases defining the dictionary. The dictionary must contain at least one phrase and every phrase must contain at least 2 characters that are letters or digits. [required]",
                ).optional(),
              }).describe(
                "Message defining a list of words or phrases to search for in the data.",
              ).optional(),
            }).describe(
              "Replace each input value with a value randomly selected from the dictionary.",
            ).optional(),
            replaceWithInfoTypeConfig: z.object({}).describe(
              "Replace each matching finding with the name of the info_type.",
            ).optional(),
            timePartConfig: z.object({
              partToExtract: z.enum([
                "TIME_PART_UNSPECIFIED",
                "YEAR",
                "MONTH",
                "DAY_OF_MONTH",
                "DAY_OF_WEEK",
                "WEEK_OF_YEAR",
                "HOUR_OF_DAY",
              ]).describe("The part of the time to keep.").optional(),
            }).describe(
              "For use with `Date`, `Timestamp`, and `TimeOfDay`, extract or preserve a portion of the value.",
            ).optional(),
          }).describe("A rule for transforming a value.").optional(),
        })).describe(
          "Transform the record by applying various field transformations.",
        ).optional(),
        recordSuppressions: z.array(z.object({
          condition: z.object({
            expressions: z.object({
              conditions: z.object({
                conditions: z.array(z.object({
                  field: z.object({
                    name: z.string().describe("Name describing the field.")
                      .optional(),
                  }).describe(
                    "General identifier of a data field in a storage service.",
                  ).optional(),
                  operator: z.enum([
                    "RELATIONAL_OPERATOR_UNSPECIFIED",
                    "EQUAL_TO",
                    "NOT_EQUAL_TO",
                    "GREATER_THAN",
                    "LESS_THAN",
                    "GREATER_THAN_OR_EQUALS",
                    "LESS_THAN_OR_EQUALS",
                    "EXISTS",
                  ]).describe(
                    "Required. Operator used to compare the field or infoType to the value.",
                  ).optional(),
                  value: z.object({
                    booleanValue: z.boolean().describe("boolean").optional(),
                    dateValue: z.object({
                      day: z.number().int().describe(
                        "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
                      ).optional(),
                      month: z.number().int().describe(
                        "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
                      ).optional(),
                      year: z.number().int().describe(
                        "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
                      ).optional(),
                    }).describe(
                      "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
                    ).optional(),
                    dayOfWeekValue: z.enum([
                      "DAY_OF_WEEK_UNSPECIFIED",
                      "MONDAY",
                      "TUESDAY",
                      "WEDNESDAY",
                      "THURSDAY",
                      "FRIDAY",
                      "SATURDAY",
                      "SUNDAY",
                    ]).describe("day of week").optional(),
                    floatValue: z.number().describe("float").optional(),
                    integerValue: z.string().describe("integer").optional(),
                    stringValue: z.string().describe("string").optional(),
                    timeValue: z.object({
                      hours: z.number().int().describe(
                        'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
                      ).optional(),
                      minutes: z.number().int().describe(
                        "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
                      ).optional(),
                      nanos: z.number().int().describe(
                        "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
                      ).optional(),
                      seconds: z.number().int().describe(
                        "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
                      ).optional(),
                    }).describe(
                      "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
                    ).optional(),
                    timestampValue: z.string().describe("timestamp").optional(),
                  }).describe(
                    "Set of primitive values supported by the system. Note that for the purposes of inspection or transformation, the number of bytes considered to comprise a 'Value' is based on its representation as a UTF-8 encoded string. For example, if 'integer_value' is set to 123456789, the number of bytes would be counted as 9, even though an int64 only holds up to 8 bytes of data.",
                  ).optional(),
                })).describe("A collection of conditions.").optional(),
              }).describe("A collection of conditions.").optional(),
              logicalOperator: z.enum(["LOGICAL_OPERATOR_UNSPECIFIED", "AND"])
                .describe(
                  "The operator to apply to the result of conditions. Default and currently only supported value is `AND`.",
                ).optional(),
            }).describe(
              "An expression, consisting of an operator and conditions.",
            ).optional(),
          }).describe(
            "A condition for determining whether a transformation should be applied to a field.",
          ).optional(),
        })).describe(
          "Configuration defining which records get suppressed entirely. Records that match any suppression rule are omitted from the output.",
        ).optional(),
      }).describe(
        "A type of transformation that is applied over structured data such as a table.",
      ).optional(),
      transformationErrorHandling: z.object({
        leaveUntransformed: z.object({}).describe(
          "Skips the data without modifying it if the requested transformation would cause an error. For example, if a `DateShift` transformation were applied an an IP address, this mode would leave the IP address unchanged in the response.",
        ).optional(),
        throwError: z.object({}).describe(
          "Throw an error and fail the request when a transformation error occurs.",
        ).optional(),
      }).describe(
        "How to handle transformation errors during de-identification. A transformation error occurs when the requested transformation is incompatible with the data. For example, trying to de-identify an IP address using a `DateShift` transformation would result in a transformation error, since date info cannot be extracted from an IP address. Information about any incompatible transformations, and how they were handled, is returned in the response as part of the `TransformationOverviews`.",
      ).optional(),
    }).describe("The configuration that controls how the data will change.")
      .optional(),
    description: z.string().describe("Short description (max 256 chars).")
      .optional(),
    displayName: z.string().describe("Display name (max 256 chars).")
      .optional(),
    name: z.string().describe(
      "Output only. The template name. The template will have one of the following formats: `projects/PROJECT_ID/deidentifyTemplates/TEMPLATE_ID` OR `organizations/ORGANIZATION_ID/deidentifyTemplates/TEMPLATE_ID`",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last update timestamp of an inspectTemplate.",
    ).optional(),
  }).describe(
    "DeidentifyTemplates contains instructions on how to de-identify content. See https://cloud.google.com/sensitive-data-protection/docs/concepts-templates to learn more.",
  ).optional(),
  locationId: z.string().describe("Deprecated. This field has no effect.")
    .optional(),
  templateId: z.string().describe(
    "The template id can contain uppercase and lowercase letters, numbers, and hyphens; that is, it must match the regular expression: `[a-zA-Z\\d-_]+`. The maximum length is 100 characters. Can be empty to allow the system to generate one.",
  ).optional(),
  updateMask: z.string().describe("Mask to control which fields get updated.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dlp/deidentifytemplates",
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
        "DeidentifyTemplates contains instructions on how to de-identify content. See ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deidentifyTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["deidentifyTemplate"] !== undefined) {
          body["deidentifyTemplate"] = g["deidentifyTemplate"];
        }
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["templateId"] !== undefined) body["templateId"] = g["templateId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
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
      description: "Get a deidentifyTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the deidentifyTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
    update: {
      description: "Update deidentifyTemplates attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["deidentifyTemplate"] !== undefined) {
          body["deidentifyTemplate"] = g["deidentifyTemplate"];
        }
        if (g["updateMask"] !== undefined) body["updateMask"] = g["updateMask"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the deidentifyTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the deidentifyTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync deidentifyTemplates state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
  },
};
