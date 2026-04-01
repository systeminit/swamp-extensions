// Auto-generated extension model for @swamp/aws/iotevents/detector-model
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

export const ClearTimerSchema = z.object({
  TimerName: z.string().min(1).max(128).describe(
    "The name of the timer to clear.",
  ),
});

export const PayloadSchema = z.object({
  ContentExpression: z.string().min(1).describe(
    "The content of the payload. You can use a string expression that includes quoted strings ( ''), variables ( $variable.), input values ( $input..), string concatenations, and quoted strings that contain ${} as the content. The recommended maximum size of a content expression is 1 KB.",
  ),
  Type: z.string().describe(
    "The value of the payload type can be either STRING or JSON.",
  ),
});

export const DynamoDBSchema = z.object({
  HashKeyField: z.string().describe(
    "The name of the hash key (also called the partition key). The hashKeyField value must match the partition key of the target DynamoDB table.",
  ),
  HashKeyType: z.string().describe(
    "The data type for the hash key (also called the partition key). You can specify the following values: 'STRING' - The hash key is a string. 'NUMBER' - The hash key is a number. If you don't specify hashKeyType, the default value is 'STRING'.",
  ).optional(),
  HashKeyValue: z.string().describe(
    "The value of the hash key (also called the partition key).",
  ),
  Operation: z.string().describe(
    "The type of operation to perform. You can specify the following values: 'INSERT' - Insert data as a new item into the DynamoDB table. This item uses the specified hash key as a partition key. If you specified a range key, the item uses the range key as a sort key. 'UPDATE' - Update an existing item of the DynamoDB table with new data. This item's partition key must match the specified hash key. If you specified a range key, the range key must match the item's sort key. 'DELETE' - Delete an existing item of the DynamoDB table. This item's partition key must match the specified hash key. If you specified a range key, the range key must match the item's sort key. If you don't specify this parameter, ITE triggers the 'INSERT' operation.",
  ).optional(),
  Payload: PayloadSchema.describe(
    "Information needed to configure the payload. By default, ITE generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use contentExpression.",
  ).optional(),
  PayloadField: z.string().describe(
    "The name of the DynamoDB column that receives the action payload. If you don't specify this parameter, the name of the DynamoDB column is payload.",
  ).optional(),
  RangeKeyField: z.string().describe(
    "The name of the range key (also called the sort key). The rangeKeyField value must match the sort key of the target DynamoDB table.",
  ).optional(),
  RangeKeyType: z.string().describe(
    "The data type for the range key (also called the sort key), You can specify the following values: 'STRING' - The range key is a string. 'NUMBER' - The range key is number. If you don't specify rangeKeyField, the default value is 'STRING'.",
  ).optional(),
  RangeKeyValue: z.string().describe(
    "The value of the range key (also called the sort key).",
  ).optional(),
  TableName: z.string().describe(
    "The name of the DynamoDB table. The tableName value must match the table name of the target DynamoDB table.",
  ),
});

export const DynamoDBv2Schema = z.object({
  Payload: PayloadSchema.describe(
    "Information needed to configure the payload. By default, ITE generates a standard payload in JSON for any action. This action payload contains all attribute-value pairs that have the information about the detector model instance and the event triggered the action. To configure the action payload, you can use contentExpression.",
  ).optional(),
  TableName: z.string().describe("The name of the DynamoDB table."),
});

export const FirehoseSchema = z.object({
  DeliveryStreamName: z.string().describe(
    "The name of the Kinesis Data Firehose delivery stream where the data is written.",
  ),
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message to an Amazon Data Firehose delivery stream.",
  ).optional(),
  Separator: z.string().regex(new RegExp("([\\n\\t])|(\\r\\n)|(,)")).describe(
    "A character separator that is used to separate records written to the Kinesis Data Firehose delivery stream. Valid values are: '\\n' (newline), '\\t' (tab), '\\r\\n' (Windows newline), ',' (comma).",
  ).optional(),
});

export const IotEventsSchema = z.object({
  InputName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$"),
  ).describe("The name of the ITE input where the data is sent."),
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message to an ITE input.",
  ).optional(),
});

export const AssetPropertyTimestampSchema = z.object({
  OffsetInNanos: z.string().describe(
    "The nanosecond offset converted from timeInSeconds. The valid range is between 0-999999999.",
  ).optional(),
  TimeInSeconds: z.string().describe(
    "The timestamp, in seconds, in the Unix epoch format. The valid range is between 1-31556889864403199.",
  ),
});

export const AssetPropertyVariantSchema = z.object({
  BooleanValue: z.string().describe(
    "The asset property value is a Boolean value that must be 'TRUE' or 'FALSE'. You must use an expression, and the evaluated result should be a Boolean value.",
  ).optional(),
  DoubleValue: z.string().describe(
    "The asset property value is a double. You must use an expression, and the evaluated result should be a double.",
  ).optional(),
  IntegerValue: z.string().describe(
    "The asset property value is an integer. You must use an expression, and the evaluated result should be an integer.",
  ).optional(),
  StringValue: z.string().describe(
    "The asset property value is a string. You must use an expression, and the evaluated result should be a string.",
  ).optional(),
});

export const AssetPropertyValueSchema = z.object({
  Quality: z.string().describe(
    "The quality of the asset property value. The value must be 'GOOD', 'BAD', or 'UNCERTAIN'.",
  ).optional(),
  Timestamp: AssetPropertyTimestampSchema.describe(
    "The timestamp associated with the asset property value. The default is the current event time.",
  ).optional(),
  Value: AssetPropertyVariantSchema.describe(
    "The value to send to an asset property.",
  ),
});

export const IotSiteWiseSchema = z.object({
  AssetId: z.string().describe(
    "The ID of the asset that has the specified property.",
  ).optional(),
  EntryId: z.string().describe(
    "A unique identifier for this entry. You can use the entry ID to track which data entry causes an error in case of failure. The default is a new unique identifier.",
  ).optional(),
  PropertyAlias: z.string().describe("The alias of the asset property.")
    .optional(),
  PropertyId: z.string().describe("The ID of the asset property.").optional(),
  PropertyValue: AssetPropertyValueSchema.describe(
    "The value to send to the asset property. This value contains timestamp, quality, and value (TQV) information.",
  ),
});

export const IotTopicPublishSchema = z.object({
  MqttTopic: z.string().min(1).max(128).describe(
    "The MQTT topic of the message. You can use a string expression that includes variables ( $variable.) and input values ( $input..) as the topic string.",
  ),
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you publish a message to an IoTCore topic.",
  ).optional(),
});

export const LambdaSchema = z.object({
  FunctionArn: z.string().min(1).max(2048).describe(
    "The ARN of the Lambda function that is executed.",
  ),
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message to a Lambda function.",
  ).optional(),
});

export const ResetTimerSchema = z.object({
  TimerName: z.string().min(1).max(128).describe(
    "The name of the timer to reset.",
  ),
});

export const SetTimerSchema = z.object({
  DurationExpression: z.string().min(1).max(1024).describe(
    "The duration of the timer, in seconds. You can use a string expression that includes numbers, variables ( $variable.), and input values ( $input..) as the duration. The range of the duration is 1-31622400 seconds. To ensure accuracy, the minimum duration is 60 seconds. The evaluated result of the duration is rounded down to the nearest whole number.",
  ).optional(),
  Seconds: z.number().int().min(60).max(31622400).describe(
    "The number of seconds until the timer expires. The minimum value is 60 seconds to ensure accuracy. The maximum value is 31622400 seconds.",
  ).optional(),
  TimerName: z.string().min(1).max(128).describe("The name of the timer."),
});

export const SetVariableSchema = z.object({
  Value: z.string().min(1).max(1024).describe("The new value of the variable."),
  VariableName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$"),
  ).describe("The name of the variable."),
});

export const SnsSchema = z.object({
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message as an Amazon SNS push notification.",
  ).optional(),
  TargetArn: z.string().min(1).max(2048).describe(
    "The ARN of the Amazon SNS target where the message is sent.",
  ),
});

export const SqsSchema = z.object({
  Payload: PayloadSchema.describe(
    "You can configure the action payload when you send a message to an Amazon SQS queue.",
  ).optional(),
  QueueUrl: z.string().describe(
    "The URL of the SQS queue where the data is written.",
  ),
  UseBase64: z.boolean().describe(
    "Set this to TRUE if you want the data to be base-64 encoded before it is written to the queue. Otherwise, set this to FALSE.",
  ).optional(),
});

export const ActionSchema = z.object({
  ClearTimer: ClearTimerSchema.describe(
    "Information needed to clear the timer.",
  ).optional(),
  DynamoDB: DynamoDBSchema.describe(
    "Writes to the DynamoDB table that you created. The default action payload contains all attribute-value pairs that have the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html). One column of the DynamoDB table receives all attribute-value pairs in the payload that you specify. For more information, see [Actions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-event-actions.html) in *Developer Guide*.",
  ).optional(),
  DynamoDBv2: DynamoDBv2Schema.describe(
    "Writes to the DynamoDB table that you created. The default action payload contains all attribute-value pairs that have the information about the detector model instance and the event that triggered the action. You can customize the [payload](https://docs.aws.amazon.com/iotevents/latest/apireference/API_Payload.html). A separate column of the DynamoDB table receives one attribute-value pair in the payload that you specify. For more information, see [Actions](https://docs.aws.amazon.com/iotevents/latest/developerguide/iotevents-event-actions.html) in *Developer Guide*.",
  ).optional(),
  Firehose: FirehoseSchema.describe(
    "Sends information about the detector model instance and the event that triggered the action to an Amazon Kinesis Data Firehose delivery stream.",
  ).optional(),
  IotEvents: IotEventsSchema.describe(
    "Sends ITE input, which passes information about the detector model instance and the event that triggered the action.",
  ).optional(),
  IotSiteWise: IotSiteWiseSchema.describe(
    "Sends information about the detector model instance and the event that triggered the action to an asset property in ITSW.",
  ).optional(),
  IotTopicPublish: IotTopicPublishSchema.describe(
    "Publishes an MQTT message with the given topic to the IoT message broker.",
  ).optional(),
  Lambda: LambdaSchema.describe(
    "Calls a Lambda function, passing in information about the detector model instance and the event that triggered the action.",
  ).optional(),
  ResetTimer: ResetTimerSchema.describe(
    "Information needed to reset the timer.",
  ).optional(),
  SetTimer: SetTimerSchema.describe("Information needed to set the timer.")
    .optional(),
  SetVariable: SetVariableSchema.describe(
    "Sets a variable to a specified value.",
  ).optional(),
  Sns: SnsSchema.describe("Sends an Amazon SNS message.").optional(),
  Sqs: SqsSchema.describe("Sends an Amazon SNS message.").optional(),
});

export const EventSchema = z.object({
  Actions: z.array(ActionSchema).describe("The actions to be performed.")
    .optional(),
  Condition: z.string().max(512).describe(
    "Optional. The Boolean expression that, when TRUE, causes the actions to be performed. If not present, the actions are performed (=TRUE). If the expression result is not a Boolean value, the actions are not performed (=FALSE).",
  ).optional(),
  EventName: z.string().max(128).describe("The name of the event."),
});

export const OnEnterSchema = z.object({
  Events: z.array(EventSchema).describe(
    "Specifies the actions that are performed when the state is entered and the condition is TRUE.",
  ).optional(),
});

export const OnExitSchema = z.object({
  Events: z.array(EventSchema).describe(
    "Specifies the actions that are performed when the state is exited and the condition is TRUE.",
  ).optional(),
});

export const TransitionEventSchema = z.object({
  Actions: z.array(ActionSchema).describe("The actions to be performed.")
    .optional(),
  Condition: z.string().max(512).describe(
    "Required. A Boolean expression that when TRUE causes the actions to be performed and the nextState to be entered.",
  ),
  EventName: z.string().min(1).max(128).describe(
    "The name of the transition event.",
  ),
  NextState: z.string().min(1).max(128).describe("The next state to enter."),
});

export const OnInputSchema = z.object({
  Events: z.array(EventSchema).describe(
    "Specifies the actions performed when the condition evaluates to TRUE.",
  ).optional(),
  TransitionEvents: z.array(TransitionEventSchema).describe(
    "Specifies the actions performed, and the next state entered, when a condition evaluates to TRUE.",
  ).optional(),
});

export const StateSchema = z.object({
  OnEnter: OnEnterSchema.describe(
    "When entering this state, perform these actions if the condition is TRUE.",
  ).optional(),
  OnExit: OnExitSchema.describe(
    "When exiting this state, perform these actions if the specified condition is TRUE.",
  ).optional(),
  OnInput: OnInputSchema.describe(
    "When an input is received and the condition is TRUE, perform the specified actions.",
  ).optional(),
  StateName: z.string().min(1).max(128).describe("The name of the state."),
});

export const TagSchema = z.object({
  Key: z.string().describe("The tag's key."),
  Value: z.string().describe("The tag's value."),
});

const GlobalArgsSchema = z.object({
  DetectorModelDefinition: z.object({
    InitialStateName: z.string().min(1).max(128).describe(
      "The state that is entered at the creation of each detector (instance).",
    ),
    States: z.array(StateSchema).describe(
      "Information about the states of the detector.",
    ),
  }).describe("Information that defines how a detector operates."),
  DetectorModelDescription: z.string().max(1024).describe(
    "A brief description of the detector model.",
  ).optional(),
  DetectorModelName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The name of the detector model.").optional(),
  EvaluationMethod: z.enum(["BATCH", "SERIAL"]).describe(
    "Information about the order in which events are evaluated and how actions are executed.",
  ).optional(),
  Key: z.string().min(1).max(128).regex(
    new RegExp(
      "^((`[\\w\\- ]+`)|([\\w\\-]+))(\\.((`[\\w\\- ]+`)|([\\w\\-]+)))*$",
    ),
  ).describe(
    "The value used to identify a detector instance. When a device or system sends input, a new detector instance with a unique key value is created. ITE can continue to route input to its corresponding detector instance based on this identifying information. This parameter uses a JSON-path expression to select the attribute-value pair in the message payload that is used for identification. To route the message to the correct detector instance, the device must send a message payload that contains the same attribute-value.",
  ).optional(),
  RoleArn: z.string().min(1).max(2048).describe(
    "The ARN of the role that grants permission to ITE to perform its operations.",
  ),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource. For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ).optional(),
});

const _StateSchema = z.object({
  DetectorModelDefinition: z.object({
    InitialStateName: z.string(),
    States: z.array(StateSchema),
  }).optional(),
  DetectorModelDescription: z.string().optional(),
  DetectorModelName: z.string(),
  EvaluationMethod: z.string().optional(),
  Key: z.string().optional(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof _StateSchema>;

const InputsSchema = z.object({
  DetectorModelDefinition: z.object({
    InitialStateName: z.string().min(1).max(128).describe(
      "The state that is entered at the creation of each detector (instance).",
    ).optional(),
    States: z.array(StateSchema).describe(
      "Information about the states of the detector.",
    ).optional(),
  }).describe("Information that defines how a detector operates.").optional(),
  DetectorModelDescription: z.string().max(1024).describe(
    "A brief description of the detector model.",
  ).optional(),
  DetectorModelName: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe("The name of the detector model.").optional(),
  EvaluationMethod: z.enum(["BATCH", "SERIAL"]).describe(
    "Information about the order in which events are evaluated and how actions are executed.",
  ).optional(),
  Key: z.string().min(1).max(128).regex(
    new RegExp(
      "^((`[\\w\\- ]+`)|([\\w\\-]+))(\\.((`[\\w\\- ]+`)|([\\w\\-]+)))*$",
    ),
  ).describe(
    "The value used to identify a detector instance. When a device or system sends input, a new detector instance with a unique key value is created. ITE can continue to route input to its corresponding detector instance based on this identifying information. This parameter uses a JSON-path expression to select the attribute-value pair in the message payload that is used for identification. To route the message to the correct detector instance, the device must send a message payload that contains the same attribute-value.",
  ).optional(),
  RoleArn: z.string().min(1).max(2048).describe(
    "The ARN of the role that grants permission to ITE to perform its operations.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource. For more information, see [Tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html).",
  ).optional(),
});

export const model = {
  type: "@swamp/aws/iotevents/detector-model",
  version: "2026.03.19.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoTEvents DetectorModel resource state",
      schema: _StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTEvents DetectorModel",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoTEvents::DetectorModel",
          desiredState,
        ) as StateData;
        const instanceName =
          (result.DetectorModelName ?? g.DetectorModelName)?.toString() ??
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
      description: "Get a IoTEvents DetectorModel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTEvents DetectorModel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::IoTEvents::DetectorModel",
          args.identifier,
        ) as StateData;
        const instanceName =
          (result.DetectorModelName ?? context.globalArgs.DetectorModelName)
            ?.toString() ?? args.identifier;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IoTEvents DetectorModel",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DetectorModelName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DetectorModelName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTEvents::DetectorModel",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTEvents::DetectorModel",
          identifier,
          currentState,
          desiredState,
          ["DetectorModelName", "Key"],
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
      description: "Delete a IoTEvents DetectorModel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTEvents DetectorModel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::IoTEvents::DetectorModel",
          args.identifier,
        );
        const instanceName = context.globalArgs.DetectorModelName?.toString() ??
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
      description: "Sync IoTEvents DetectorModel state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = g.DetectorModelName?.toString() ?? "current";
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DetectorModelName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTEvents::DetectorModel",
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
