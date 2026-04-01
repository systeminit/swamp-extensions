// Auto-generated extension model for @swamp/gcp/dlp/dlpjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dlp.googleapis.com/";

const LIST_CONFIG = {
  "id": "dlp.organizations.locations.dlpJobs.list",
  "path": "v2/{+parent}/dlpJobs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "locationId": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "type": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  actionDetails: z.array(z.object({
    deidentifyDetails: z.object({
      deidentifyStats: z.object({
        transformationCount: z.string(),
        transformationErrorCount: z.string(),
        transformedBytes: z.string(),
      }),
      requestedOptions: z.object({
        snapshotDeidentifyTemplate: z.object({
          createTime: z.string(),
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
          }),
          description: z.string(),
          displayName: z.string(),
          name: z.string(),
          updateTime: z.string(),
        }),
        snapshotImageRedactTemplate: z.object({
          createTime: z.string(),
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
          }),
          description: z.string(),
          displayName: z.string(),
          name: z.string(),
          updateTime: z.string(),
        }),
        snapshotStructuredDeidentifyTemplate: z.object({
          createTime: z.string(),
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
          }),
          description: z.string(),
          displayName: z.string(),
          name: z.string(),
          updateTime: z.string(),
        }),
      }),
    }),
  })).optional(),
  createTime: z.string().optional(),
  endTime: z.string().optional(),
  errors: z.array(z.object({
    details: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    extraInfo: z.string(),
    timestamps: z.array(z.string()),
  })).optional(),
  inspectDetails: z.object({
    requestedOptions: z.object({
      jobConfig: z.object({
        actions: z.array(z.object({
          deidentify: z.object({
            cloudStorageOutput: z.string(),
            fileTypesToTransform: z.array(z.string()),
            transformationConfig: z.object({
              deidentifyTemplate: z.string(),
              imageRedactTemplate: z.string(),
              structuredDeidentifyTemplate: z.string(),
            }),
            transformationDetailsStorageConfig: z.object({
              table: z.object({
                datasetId: z.string(),
                projectId: z.string(),
                tableId: z.string(),
              }),
            }),
          }),
          jobNotificationEmails: z.object({}),
          pubSub: z.object({
            topic: z.string(),
          }),
          publishFindingsToCloudDataCatalog: z.object({}),
          publishFindingsToDataplexCatalog: z.object({}),
          publishSummaryToCscc: z.object({}),
          publishToStackdriver: z.object({}),
          saveFindings: z.object({
            outputConfig: z.object({
              outputSchema: z.string(),
              storagePath: z.object({
                path: z.string(),
              }),
              table: z.object({
                datasetId: z.string(),
                projectId: z.string(),
                tableId: z.string(),
              }),
            }),
          }),
        })),
        inspectConfig: z.object({
          contentOptions: z.array(z.string()),
          customInfoTypes: z.array(z.object({
            detectionRules: z.array(z.object({
              hotwordRule: z.object({
                hotwordRegex: z.object({
                  groupIndexes: z.array(z.number()),
                  pattern: z.string(),
                }),
                likelihoodAdjustment: z.object({
                  fixedLikelihood: z.string(),
                  relativeLikelihood: z.number(),
                }),
                proximity: z.object({
                  windowAfter: z.number(),
                  windowBefore: z.number(),
                }),
              }),
            })),
            dictionary: z.object({
              cloudStoragePath: z.object({
                path: z.string(),
              }),
              wordList: z.object({
                words: z.array(z.string()),
              }),
            }),
            exclusionType: z.string(),
            infoType: z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            }),
            likelihood: z.string(),
            metadataKeyValueExpression: z.object({
              keyRegex: z.string(),
              valueRegex: z.string(),
            }),
            regex: z.object({
              groupIndexes: z.array(z.number()),
              pattern: z.string(),
            }),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            storedType: z.object({
              createTime: z.string(),
              name: z.string(),
            }),
            surrogateType: z.object({}),
          })),
          excludeInfoTypes: z.boolean(),
          includeQuote: z.boolean(),
          infoTypes: z.array(z.object({
            name: z.string(),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            version: z.string(),
          })),
          limits: z.object({
            maxFindingsPerInfoType: z.array(z.object({
              infoType: z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              }),
              maxFindings: z.number(),
            })),
            maxFindingsPerItem: z.number(),
            maxFindingsPerRequest: z.number(),
          }),
          minLikelihood: z.string(),
          minLikelihoodPerInfoType: z.array(z.object({
            infoType: z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            }),
            minLikelihood: z.string(),
          })),
          ruleSet: z.array(z.object({
            infoTypes: z.array(z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            })),
            rules: z.array(z.object({
              adjustmentRule: z.object({
                adjustByImageFindings: z.object({
                  imageContainmentType: z.object({
                    encloses: z.object({}),
                    fullyInside: z.object({}),
                    overlaps: z.object({}),
                  }),
                  infoTypes: z.array(z.object({
                    name: z.string(),
                    sensitivityScore: z.object({
                      score: z.string(),
                    }),
                    version: z.string(),
                  })),
                  minLikelihood: z.string(),
                }),
                adjustByMatchingInfoTypes: z.object({
                  infoTypes: z.array(z.object({
                    name: z.string(),
                    sensitivityScore: z.object({
                      score: z.string(),
                    }),
                    version: z.string(),
                  })),
                  matchingType: z.string(),
                  minLikelihood: z.string(),
                }),
                likelihoodAdjustment: z.object({
                  fixedLikelihood: z.string(),
                  relativeLikelihood: z.number(),
                }),
              }),
              exclusionRule: z.object({
                dictionary: z.object({
                  cloudStoragePath: z.object({
                    path: z.string(),
                  }),
                  wordList: z.object({
                    words: z.array(z.string()),
                  }),
                }),
                excludeByHotword: z.object({
                  hotwordRegex: z.object({
                    groupIndexes: z.array(z.number()),
                    pattern: z.string(),
                  }),
                  proximity: z.object({
                    windowAfter: z.number(),
                    windowBefore: z.number(),
                  }),
                }),
                excludeByImageFindings: z.object({
                  imageContainmentType: z.object({
                    encloses: z.object({}),
                    fullyInside: z.object({}),
                    overlaps: z.object({}),
                  }),
                  infoTypes: z.array(z.object({
                    name: z.string(),
                    sensitivityScore: z.object({
                      score: z.string(),
                    }),
                    version: z.string(),
                  })),
                }),
                excludeInfoTypes: z.object({
                  infoTypes: z.array(z.object({
                    name: z.string(),
                    sensitivityScore: z.object({
                      score: z.string(),
                    }),
                    version: z.string(),
                  })),
                }),
                matchingType: z.string(),
                regex: z.object({
                  groupIndexes: z.array(z.number()),
                  pattern: z.string(),
                }),
              }),
              hotwordRule: z.object({
                hotwordRegex: z.object({
                  groupIndexes: z.array(z.number()),
                  pattern: z.string(),
                }),
                likelihoodAdjustment: z.object({
                  fixedLikelihood: z.string(),
                  relativeLikelihood: z.number(),
                }),
                proximity: z.object({
                  windowAfter: z.number(),
                  windowBefore: z.number(),
                }),
              }),
            })),
          })),
        }),
        inspectTemplateName: z.string(),
        storageConfig: z.object({
          bigQueryOptions: z.object({
            excludedFields: z.array(z.object({
              name: z.string(),
            })),
            identifyingFields: z.array(z.object({
              name: z.string(),
            })),
            includedFields: z.array(z.object({
              name: z.string(),
            })),
            rowsLimit: z.string(),
            rowsLimitPercent: z.number(),
            sampleMethod: z.string(),
            tableReference: z.object({
              datasetId: z.string(),
              projectId: z.string(),
              tableId: z.string(),
            }),
          }),
          cloudStorageOptions: z.object({
            bytesLimitPerFile: z.string(),
            bytesLimitPerFilePercent: z.number(),
            fileSet: z.object({
              regexFileSet: z.object({
                bucketName: z.string(),
                excludeRegex: z.array(z.string()),
                includeRegex: z.array(z.string()),
              }),
              url: z.string(),
            }),
            fileTypes: z.array(z.string()),
            filesLimitPercent: z.number(),
            sampleMethod: z.string(),
          }),
          datastoreOptions: z.object({
            kind: z.object({
              name: z.string(),
            }),
            partitionId: z.object({
              namespaceId: z.string(),
              projectId: z.string(),
            }),
          }),
          hybridOptions: z.object({
            description: z.string(),
            labels: z.record(z.string(), z.unknown()),
            requiredFindingLabelKeys: z.array(z.string()),
            tableOptions: z.object({
              identifyingFields: z.array(z.object({
                name: z.string(),
              })),
            }),
          }),
          timespanConfig: z.object({
            enableAutoPopulationOfTimespanConfig: z.boolean(),
            endTime: z.string(),
            startTime: z.string(),
            timestampField: z.object({
              name: z.string(),
            }),
          }),
        }),
      }),
      snapshotInspectTemplate: z.object({
        createTime: z.string(),
        description: z.string(),
        displayName: z.string(),
        inspectConfig: z.object({
          contentOptions: z.array(z.string()),
          customInfoTypes: z.array(z.object({
            detectionRules: z.array(z.object({
              hotwordRule: z.object({
                hotwordRegex: z.object({
                  groupIndexes: z.array(z.number()),
                  pattern: z.string(),
                }),
                likelihoodAdjustment: z.object({
                  fixedLikelihood: z.string(),
                  relativeLikelihood: z.number(),
                }),
                proximity: z.object({
                  windowAfter: z.number(),
                  windowBefore: z.number(),
                }),
              }),
            })),
            dictionary: z.object({
              cloudStoragePath: z.object({
                path: z.string(),
              }),
              wordList: z.object({
                words: z.array(z.string()),
              }),
            }),
            exclusionType: z.string(),
            infoType: z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            }),
            likelihood: z.string(),
            metadataKeyValueExpression: z.object({
              keyRegex: z.string(),
              valueRegex: z.string(),
            }),
            regex: z.object({
              groupIndexes: z.array(z.number()),
              pattern: z.string(),
            }),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            storedType: z.object({
              createTime: z.string(),
              name: z.string(),
            }),
            surrogateType: z.object({}),
          })),
          excludeInfoTypes: z.boolean(),
          includeQuote: z.boolean(),
          infoTypes: z.array(z.object({
            name: z.string(),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            version: z.string(),
          })),
          limits: z.object({
            maxFindingsPerInfoType: z.array(z.object({
              infoType: z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              }),
              maxFindings: z.number(),
            })),
            maxFindingsPerItem: z.number(),
            maxFindingsPerRequest: z.number(),
          }),
          minLikelihood: z.string(),
          minLikelihoodPerInfoType: z.array(z.object({
            infoType: z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            }),
            minLikelihood: z.string(),
          })),
          ruleSet: z.array(z.object({
            infoTypes: z.array(z.object({
              name: z.string(),
              sensitivityScore: z.object({
                score: z.string(),
              }),
              version: z.string(),
            })),
            rules: z.array(z.object({
              adjustmentRule: z.object({
                adjustByImageFindings: z.object({
                  imageContainmentType: z.object({
                    encloses: z.object({}),
                    fullyInside: z.object({}),
                    overlaps: z.object({}),
                  }),
                  infoTypes: z.array(z.object({
                    name: z.string(),
                    sensitivityScore: z.object({
                      score: z.string(),
                    }),
                    version: z.string(),
                  })),
                  minLikelihood: z.string(),
                }),
                adjustByMatchingInfoTypes: z.object({
                  infoTypes: z.array(z.object({
                    name: z.string(),
                    sensitivityScore: z.object({
                      score: z.string(),
                    }),
                    version: z.string(),
                  })),
                  matchingType: z.string(),
                  minLikelihood: z.string(),
                }),
                likelihoodAdjustment: z.object({
                  fixedLikelihood: z.string(),
                  relativeLikelihood: z.number(),
                }),
              }),
              exclusionRule: z.object({
                dictionary: z.object({
                  cloudStoragePath: z.object({
                    path: z.string(),
                  }),
                  wordList: z.object({
                    words: z.array(z.string()),
                  }),
                }),
                excludeByHotword: z.object({
                  hotwordRegex: z.object({
                    groupIndexes: z.array(z.number()),
                    pattern: z.string(),
                  }),
                  proximity: z.object({
                    windowAfter: z.number(),
                    windowBefore: z.number(),
                  }),
                }),
                excludeByImageFindings: z.object({
                  imageContainmentType: z.object({
                    encloses: z.object({}),
                    fullyInside: z.object({}),
                    overlaps: z.object({}),
                  }),
                  infoTypes: z.array(z.object({
                    name: z.string(),
                    sensitivityScore: z.object({
                      score: z.string(),
                    }),
                    version: z.string(),
                  })),
                }),
                excludeInfoTypes: z.object({
                  infoTypes: z.array(z.object({
                    name: z.string(),
                    sensitivityScore: z.object({
                      score: z.string(),
                    }),
                    version: z.string(),
                  })),
                }),
                matchingType: z.string(),
                regex: z.object({
                  groupIndexes: z.array(z.number()),
                  pattern: z.string(),
                }),
              }),
              hotwordRule: z.object({
                hotwordRegex: z.object({
                  groupIndexes: z.array(z.number()),
                  pattern: z.string(),
                }),
                likelihoodAdjustment: z.object({
                  fixedLikelihood: z.string(),
                  relativeLikelihood: z.number(),
                }),
                proximity: z.object({
                  windowAfter: z.number(),
                  windowBefore: z.number(),
                }),
              }),
            })),
          })),
        }),
        name: z.string(),
        updateTime: z.string(),
      }),
    }),
    result: z.object({
      hybridStats: z.object({
        abortedCount: z.string(),
        pendingCount: z.string(),
        processedCount: z.string(),
      }),
      infoTypeStats: z.array(z.object({
        count: z.string(),
        infoType: z.object({
          name: z.string(),
          sensitivityScore: z.object({
            score: z.string(),
          }),
          version: z.string(),
        }),
      })),
      numRowsProcessed: z.string(),
      processedBytes: z.string(),
      totalEstimatedBytes: z.string(),
    }),
  }).optional(),
  jobTriggerName: z.string().optional(),
  lastModified: z.string().optional(),
  name: z.string(),
  riskDetails: z.object({
    categoricalStatsResult: z.object({
      valueFrequencyHistogramBuckets: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.object({
          count: z.string(),
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
        valueFrequencyLowerBound: z.string(),
        valueFrequencyUpperBound: z.string(),
      })),
    }),
    deltaPresenceEstimationResult: z.object({
      deltaPresenceEstimationHistogram: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.object({
          estimatedProbability: z.number(),
          quasiIdsValues: z.array(z.object({
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
          })),
        })),
        maxProbability: z.number(),
        minProbability: z.number(),
      })),
    }),
    kAnonymityResult: z.object({
      equivalenceClassHistogramBuckets: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.object({
          equivalenceClassSize: z.string(),
          quasiIdsValues: z.array(z.object({
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
          })),
        })),
        equivalenceClassSizeLowerBound: z.string(),
        equivalenceClassSizeUpperBound: z.string(),
      })),
    }),
    kMapEstimationResult: z.object({
      kMapEstimationHistogram: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.object({
          estimatedAnonymity: z.string(),
          quasiIdsValues: z.array(z.object({
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
          })),
        })),
        maxAnonymity: z.string(),
        minAnonymity: z.string(),
      })),
    }),
    lDiversityResult: z.object({
      sensitiveValueFrequencyHistogramBuckets: z.array(z.object({
        bucketSize: z.string(),
        bucketValueCount: z.string(),
        bucketValues: z.array(z.object({
          equivalenceClassSize: z.string(),
          numDistinctSensitiveValues: z.string(),
          quasiIdsValues: z.array(z.object({
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
          })),
          topSensitiveValues: z.array(z.object({
            count: z.string(),
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
        })),
        sensitiveValueFrequencyLowerBound: z.string(),
        sensitiveValueFrequencyUpperBound: z.string(),
      })),
    }),
    numericalStatsResult: z.object({
      maxValue: z.object({
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
      minValue: z.object({
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
      quantileValues: z.array(z.object({
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
      })),
    }),
    requestedOptions: z.object({
      jobConfig: z.object({
        actions: z.array(z.object({
          deidentify: z.object({
            cloudStorageOutput: z.string(),
            fileTypesToTransform: z.array(z.string()),
            transformationConfig: z.object({
              deidentifyTemplate: z.string(),
              imageRedactTemplate: z.string(),
              structuredDeidentifyTemplate: z.string(),
            }),
            transformationDetailsStorageConfig: z.object({
              table: z.object({
                datasetId: z.string(),
                projectId: z.string(),
                tableId: z.string(),
              }),
            }),
          }),
          jobNotificationEmails: z.object({}),
          pubSub: z.object({
            topic: z.string(),
          }),
          publishFindingsToCloudDataCatalog: z.object({}),
          publishFindingsToDataplexCatalog: z.object({}),
          publishSummaryToCscc: z.object({}),
          publishToStackdriver: z.object({}),
          saveFindings: z.object({
            outputConfig: z.object({
              outputSchema: z.string(),
              storagePath: z.object({
                path: z.string(),
              }),
              table: z.object({
                datasetId: z.string(),
                projectId: z.string(),
                tableId: z.string(),
              }),
            }),
          }),
        })),
        privacyMetric: z.object({
          categoricalStatsConfig: z.object({
            field: z.object({
              name: z.string(),
            }),
          }),
          deltaPresenceEstimationConfig: z.object({
            auxiliaryTables: z.array(z.object({
              quasiIds: z.array(z.object({
                customTag: z.string(),
                field: z.object({
                  name: z.string(),
                }),
              })),
              relativeFrequency: z.object({
                name: z.string(),
              }),
              table: z.object({
                datasetId: z.string(),
                projectId: z.string(),
                tableId: z.string(),
              }),
            })),
            quasiIds: z.array(z.object({
              customTag: z.string(),
              field: z.object({
                name: z.string(),
              }),
              inferred: z.object({}),
              infoType: z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              }),
            })),
            regionCode: z.string(),
          }),
          kAnonymityConfig: z.object({
            entityId: z.object({
              field: z.object({
                name: z.string(),
              }),
            }),
            quasiIds: z.array(z.object({
              name: z.string(),
            })),
          }),
          kMapEstimationConfig: z.object({
            auxiliaryTables: z.array(z.object({
              quasiIds: z.array(z.object({
                customTag: z.string(),
                field: z.object({
                  name: z.string(),
                }),
              })),
              relativeFrequency: z.object({
                name: z.string(),
              }),
              table: z.object({
                datasetId: z.string(),
                projectId: z.string(),
                tableId: z.string(),
              }),
            })),
            quasiIds: z.array(z.object({
              customTag: z.string(),
              field: z.object({
                name: z.string(),
              }),
              inferred: z.object({}),
              infoType: z.object({
                name: z.string(),
                sensitivityScore: z.object({
                  score: z.string(),
                }),
                version: z.string(),
              }),
            })),
            regionCode: z.string(),
          }),
          lDiversityConfig: z.object({
            quasiIds: z.array(z.object({
              name: z.string(),
            })),
            sensitiveAttribute: z.object({
              name: z.string(),
            }),
          }),
          numericalStatsConfig: z.object({
            field: z.object({
              name: z.string(),
            }),
          }),
        }),
        sourceTable: z.object({
          datasetId: z.string(),
          projectId: z.string(),
          tableId: z.string(),
        }),
      }),
    }),
    requestedPrivacyMetric: z.object({
      categoricalStatsConfig: z.object({
        field: z.object({
          name: z.string(),
        }),
      }),
      deltaPresenceEstimationConfig: z.object({
        auxiliaryTables: z.array(z.object({
          quasiIds: z.array(z.object({
            customTag: z.string(),
            field: z.object({
              name: z.string(),
            }),
          })),
          relativeFrequency: z.object({
            name: z.string(),
          }),
          table: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
        })),
        quasiIds: z.array(z.object({
          customTag: z.string(),
          field: z.object({
            name: z.string(),
          }),
          inferred: z.object({}),
          infoType: z.object({
            name: z.string(),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            version: z.string(),
          }),
        })),
        regionCode: z.string(),
      }),
      kAnonymityConfig: z.object({
        entityId: z.object({
          field: z.object({
            name: z.string(),
          }),
        }),
        quasiIds: z.array(z.object({
          name: z.string(),
        })),
      }),
      kMapEstimationConfig: z.object({
        auxiliaryTables: z.array(z.object({
          quasiIds: z.array(z.object({
            customTag: z.string(),
            field: z.object({
              name: z.string(),
            }),
          })),
          relativeFrequency: z.object({
            name: z.string(),
          }),
          table: z.object({
            datasetId: z.string(),
            projectId: z.string(),
            tableId: z.string(),
          }),
        })),
        quasiIds: z.array(z.object({
          customTag: z.string(),
          field: z.object({
            name: z.string(),
          }),
          inferred: z.object({}),
          infoType: z.object({
            name: z.string(),
            sensitivityScore: z.object({
              score: z.string(),
            }),
            version: z.string(),
          }),
        })),
        regionCode: z.string(),
      }),
      lDiversityConfig: z.object({
        quasiIds: z.array(z.object({
          name: z.string(),
        })),
        sensitiveAttribute: z.object({
          name: z.string(),
        }),
      }),
      numericalStatsConfig: z.object({
        field: z.object({
          name: z.string(),
        }),
      }),
    }),
    requestedSourceTable: z.object({
      datasetId: z.string(),
      projectId: z.string(),
      tableId: z.string(),
    }),
  }).optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/dlp/dlpjobs",
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
      description: "Combines all of the information about a DLP job.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a dlpJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the dlpJobs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync dlpJobs state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
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
