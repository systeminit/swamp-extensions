// Auto-generated extension model for @swamp/gcp/drivelabels/labels
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

const BASE_URL = "https://drivelabels.googleapis.com/";

const GET_CONFIG = {
  "id": "drivelabels.labels.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "useAdminAccess": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "drivelabels.labels.create",
  "path": "v2/labels",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "useAdminAccess": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "drivelabels.labels.delete",
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
    "useAdminAccess": {
      "location": "query",
    },
    "writeControl.requiredRevisionId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  appliedCapabilities: z.object({
    canApply: z.boolean().describe(
      "Whether the user can apply this label to items.",
    ).optional(),
    canRead: z.boolean().describe(
      "Whether the user can read applied metadata related to this label.",
    ).optional(),
    canRemove: z.boolean().describe(
      "Whether the user can remove this label from items.",
    ).optional(),
  }).describe("The capabilities a user has on this label's applied metadata.")
    .optional(),
  appliedLabelPolicy: z.object({
    copyMode: z.enum([
      "COPY_MODE_UNSPECIFIED",
      "DO_NOT_COPY",
      "ALWAYS_COPY",
      "COPY_APPLIABLE",
    ]).describe(
      "Indicates how the applied label and field values should be copied when a Drive item is copied.",
    ).optional(),
  }).describe("Behavior of this label when it's applied to Drive items.")
    .optional(),
  creator: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  disabler: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  displayHints: z.object({
    disabled: z.boolean().describe(
      "Whether the label should be shown in the UI as disabled.",
    ).optional(),
    hiddenInSearch: z.boolean().describe(
      "This label should be hidden in the search menu when searching for Drive items.",
    ).optional(),
    priority: z.string().describe("The order to display labels in a list.")
      .optional(),
    shownInApply: z.boolean().describe(
      "This label should be shown in the apply menu when applying values to a Drive item.",
    ).optional(),
  }).describe("The UI display hints for rendering the label.").optional(),
  enabledAppSettings: z.object({
    enabledApps: z.array(z.object({
      app: z.enum(["APP_UNSPECIFIED", "DRIVE", "GMAIL"]).describe(
        "Optional. The name of the app.",
      ).optional(),
    })).describe("Optional. The list of apps where the label can be used.")
      .optional(),
  }).describe(
    "Describes the Google Workspace apps in which the label can be used.",
  ).optional(),
  fields: z.array(z.object({
    appliedCapabilities: z.object({
      canRead: z.boolean().describe(
        "Whether the user can read related applied metadata on items.",
      ).optional(),
      canSearch: z.boolean().describe(
        "Whether the user can search for Drive items referencing this field.",
      ).optional(),
      canWrite: z.boolean().describe(
        "Whether the user can set this field on Drive items.",
      ).optional(),
    }).describe("The capabilities related to this field on applied metadata.")
      .optional(),
    createTime: z.string().describe(
      "Output only. The time this field was created.",
    ).optional(),
    creator: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    dateOptions: z.object({
      dateFormat: z.string().describe("Output only. ICU date format.")
        .optional(),
      dateFormatType: z.enum([
        "DATE_FORMAT_UNSPECIFIED",
        "LONG_DATE",
        "SHORT_DATE",
      ]).describe(
        "Localized date formatting option. Field values are rendered in this format according to their locale.",
      ).optional(),
      maxValue: z.object({
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
      minValue: z.object({
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
    }).describe("Options for the date field type.").optional(),
    disableTime: z.string().describe(
      "Output only. The time this field was disabled. This value has no meaning when the field is not disabled.",
    ).optional(),
    disabler: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    displayHints: z.object({
      disabled: z.boolean().describe(
        "Whether the field should be shown in the UI as disabled.",
      ).optional(),
      hiddenInSearch: z.boolean().describe(
        "This field should be hidden in the search menu when searching for Drive items.",
      ).optional(),
      required: z.boolean().describe(
        "Whether the field should be shown as required in the UI.",
      ).optional(),
      shownInApply: z.boolean().describe(
        "This field should be shown in the apply menu when applying values to a Drive item.",
      ).optional(),
    }).describe("UI display hints for rendering a field.").optional(),
    id: z.string().describe(
      "Output only. The key of a field, unique within a label or library. This value is autogenerated. Matches the regex: `([a-zA-Z0-9])+`.",
    ).optional(),
    integerOptions: z.object({
      maxValue: z.string().describe(
        "Output only. The maximum valid value for the integer field.",
      ).optional(),
      minValue: z.string().describe(
        "Output only. The minimum valid value for the integer field.",
      ).optional(),
    }).describe("Options for the Integer field type.").optional(),
    lifecycle: z.object({
      disabledPolicy: z.object({
        hideInSearch: z.boolean().describe(
          "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
        ).optional(),
        showInApply: z.boolean().describe(
          "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
        ).optional(),
      }).describe(
        "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
      ).optional(),
      hasUnpublishedChanges: z.boolean().describe(
        "Output only. Whether the object associated with this lifecycle has unpublished changes.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "UNPUBLISHED_DRAFT",
        "PUBLISHED",
        "DISABLED",
        "DELETED",
      ]).describe(
        "Output only. The state of the object associated with this lifecycle.",
      ).optional(),
    }).describe(
      "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
    ).optional(),
    lockStatus: z.object({
      locked: z.boolean().describe(
        "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
      ).optional(),
    }).describe(
      "Contains information about whether a label component should be considered locked.",
    ).optional(),
    properties: z.object({
      displayName: z.string().describe(
        "Required. The display text to show in the UI identifying this field.",
      ).optional(),
      insertBeforeField: z.string().describe(
        "Input only. Insert or move this field before the indicated field. If empty, the field is placed at the end of the list.",
      ).optional(),
      required: z.boolean().describe(
        "Whether the field should be marked as required.",
      ).optional(),
    }).describe("The basic properties of the field.").optional(),
    publisher: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    queryKey: z.string().describe(
      'Output only. The key to use when constructing Drive search queries to find files based on values defined for this field on files. For example, "`{query_key}` > 2001-01-01".',
    ).optional(),
    schemaCapabilities: z.object({
      canDelete: z.boolean().describe(
        "Whether the user can delete this field. The user must have permission and the field must be deprecated.",
      ).optional(),
      canDisable: z.boolean().describe(
        "Whether the user can disable this field. The user must have permission and this field must not already be disabled.",
      ).optional(),
      canEnable: z.boolean().describe(
        "Whether the user can enable this field. The user must have permission and this field must be disabled.",
      ).optional(),
      canUpdate: z.boolean().describe("Whether the user can change this field.")
        .optional(),
    }).describe(
      "The capabilities related to this field when editing the field.",
    ).optional(),
    selectionOptions: z.object({
      choices: z.array(z.object({
        appliedCapabilities: z.object({
          canRead: z.boolean().describe(
            "Whether the user can read related applied metadata on items.",
          ).optional(),
          canSearch: z.boolean().describe(
            "Whether the user can use this choice in search queries.",
          ).optional(),
          canSelect: z.boolean().describe(
            "Whether the user can select this choice on an item.",
          ).optional(),
        }).describe(
          "The capabilities related to this choice on applied metadata.",
        ).optional(),
        createTime: z.string().describe(
          "Output only. The time this choice was created.",
        ).optional(),
        creator: z.object({
          person: z.string().describe(
            "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
          ).optional(),
        }).describe("Information about a user.").optional(),
        disableTime: z.string().describe(
          "Output only. The time this choice was disabled. This value has no meaning when the choice is not disabled.",
        ).optional(),
        disabler: z.object({
          person: z.string().describe(
            "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
          ).optional(),
        }).describe("Information about a user.").optional(),
        displayHints: z.object({
          badgeColors: z.object({
            backgroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            foregroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            soloColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
          }).describe(
            "The color derived from BadgeConfig and changed to the closest recommended supported color.",
          ).optional(),
          badgePriority: z.string().describe(
            "The priority of this badge. Used to compare and sort between multiple badges. A lower number means the badge should be shown first. When a badging configuration is not present, this will be 0. Otherwise, this will be set to `BadgeConfig.priority_override` or the default heuristic which prefers creation date of the label, and field and option priority.",
          ).optional(),
          darkBadgeColors: z.object({
            backgroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            foregroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            soloColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
          }).describe(
            "The color derived from BadgeConfig and changed to the closest recommended supported color.",
          ).optional(),
          disabled: z.boolean().describe(
            "Whether the option should be shown in the UI as disabled.",
          ).optional(),
          hiddenInSearch: z.boolean().describe(
            "This option should be hidden in the search menu when searching for Drive items.",
          ).optional(),
          shownInApply: z.boolean().describe(
            "This option should be shown in the apply menu when applying values to a Drive item.",
          ).optional(),
        }).describe("UI display hints for rendering an option.").optional(),
        id: z.string().describe(
          "The unique value of the choice. This ID is autogenerated. Matches the regex: `([a-zA-Z0-9_])+`.",
        ).optional(),
        lifecycle: z.object({
          disabledPolicy: z.object({
            hideInSearch: z.boolean().describe(
              "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
            ).optional(),
            showInApply: z.boolean().describe(
              "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
            ).optional(),
          }).describe(
            "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
          ).optional(),
          hasUnpublishedChanges: z.boolean().describe(
            "Output only. Whether the object associated with this lifecycle has unpublished changes.",
          ).optional(),
          state: z.enum([
            "STATE_UNSPECIFIED",
            "UNPUBLISHED_DRAFT",
            "PUBLISHED",
            "DISABLED",
            "DELETED",
          ]).describe(
            "Output only. The state of the object associated with this lifecycle.",
          ).optional(),
        }).describe(
          "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
        ).optional(),
        lockStatus: z.object({
          locked: z.boolean().describe(
            "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
          ).optional(),
        }).describe(
          "Contains information about whether a label component should be considered locked.",
        ).optional(),
        properties: z.object({
          badgeConfig: z.object({
            color: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            priorityOverride: z.string().describe(
              "Override the default global priority of this badge. When set to 0, the default priority heuristic is used.",
            ).optional(),
          }).describe("Badge status of the label.").optional(),
          description: z.string().describe("The description of this label.")
            .optional(),
          displayName: z.string().describe(
            "Required. The display text to show in the UI identifying this field.",
          ).optional(),
          insertBeforeChoice: z.string().describe(
            "Input only. Insert or move this choice before the indicated choice. If empty, the choice is placed at the end of the list.",
          ).optional(),
        }).describe("Basic properties of the choice.").optional(),
        publishTime: z.string().describe(
          "Output only. The time this choice was published. This value has no meaning when the choice is not published.",
        ).optional(),
        publisher: z.object({
          person: z.string().describe(
            "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
          ).optional(),
        }).describe("Information about a user.").optional(),
        schemaCapabilities: z.object({
          canDelete: z.boolean().describe(
            "Whether the user can delete this choice.",
          ).optional(),
          canDisable: z.boolean().describe(
            "Whether the user can disable this choice.",
          ).optional(),
          canEnable: z.boolean().describe(
            "Whether the user can enable this choice.",
          ).optional(),
          canUpdate: z.boolean().describe(
            "Whether the user can update this choice.",
          ).optional(),
        }).describe(
          "The capabilities related to this choice when editing the choice.",
        ).optional(),
        updateTime: z.string().describe(
          "Output only. The time this choice was updated last.",
        ).optional(),
        updater: z.object({
          person: z.string().describe(
            "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
          ).optional(),
        }).describe("Information about a user.").optional(),
      })).describe(
        "The options available for this selection field. The list order is consistent, and modified with `insert_before_choice`.",
      ).optional(),
      listOptions: z.object({
        maxEntries: z.number().int().describe(
          "Maximum number of entries permitted.",
        ).optional(),
      }).describe(
        "Options for a multi-valued variant of an associated field type.",
      ).optional(),
    }).describe("Options for the selection field type.").optional(),
    textOptions: z.object({
      maxLength: z.number().int().describe(
        "Output only. The maximum valid length of values for the text field.",
      ).optional(),
      minLength: z.number().int().describe(
        "Output only. The minimum valid length of values for the text field.",
      ).optional(),
    }).describe("Options for the Text field type.").optional(),
    updateTime: z.string().describe(
      "Output only. The time this field was updated.",
    ).optional(),
    updater: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    userOptions: z.object({
      listOptions: z.object({
        maxEntries: z.number().int().describe(
          "Maximum number of entries permitted.",
        ).optional(),
      }).describe(
        "Options for a multi-valued variant of an associated field type.",
      ).optional(),
    }).describe("Options for the user field type.").optional(),
  })).describe("List of fields in descending priority order.").optional(),
  labelType: z.enum(["LABEL_TYPE_UNSPECIFIED", "SHARED", "ADMIN", "GOOGLE_APP"])
    .describe("Required. The type of label.").optional(),
  learnMoreUri: z.string().describe(
    "Custom URL to present to users to allow them to learn more about this label and how it should be used.",
  ).optional(),
  lifecycle: z.object({
    disabledPolicy: z.object({
      hideInSearch: z.boolean().describe(
        "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
      ).optional(),
      showInApply: z.boolean().describe(
        "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
      ).optional(),
    }).describe(
      "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
    ).optional(),
    hasUnpublishedChanges: z.boolean().describe(
      "Output only. Whether the object associated with this lifecycle has unpublished changes.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "UNPUBLISHED_DRAFT",
      "PUBLISHED",
      "DISABLED",
      "DELETED",
    ]).describe(
      "Output only. The state of the object associated with this lifecycle.",
    ).optional(),
  }).describe(
    "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
  ).optional(),
  lockStatus: z.object({
    locked: z.boolean().describe(
      "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
    ).optional(),
  }).describe(
    "Contains information about whether a label component should be considered locked.",
  ).optional(),
  properties: z.object({
    description: z.string().describe("The description of the label.")
      .optional(),
    title: z.string().describe("Required. Title of the label.").optional(),
  }).describe("Basic properties of the label.").optional(),
  publisher: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  revisionCreator: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  schemaCapabilities: z.object({
    canDelete: z.boolean().describe(
      "Whether the user can delete this label. The user must have permission and the label must be disabled.",
    ).optional(),
    canDisable: z.boolean().describe(
      "Whether the user can disable this label. The user must have permission and this label must not already be disabled.",
    ).optional(),
    canEnable: z.boolean().describe(
      "Whether the user can enable this label. The user must have permission and this label must be disabled.",
    ).optional(),
    canUpdate: z.boolean().describe("Whether the user can change this label.")
      .optional(),
  }).describe("The capabilities related to this label when editing the label.")
    .optional(),
  languageCode: z.string().describe(
    "The BCP-47 language code to use for evaluating localized field labels in response. When not specified, values in the default configured language will be used.",
  ).optional(),
  useAdminAccess: z.string().describe(
    "Set to `true` in order to use the user's admin privileges. The server will verify the user is an admin before allowing access.",
  ).optional(),
});

const StateSchema = z.object({
  appliedCapabilities: z.object({
    canApply: z.boolean(),
    canRead: z.boolean(),
    canRemove: z.boolean(),
  }).optional(),
  appliedLabelPolicy: z.object({
    copyMode: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  creator: z.object({
    person: z.string(),
  }).optional(),
  customer: z.string().optional(),
  disableTime: z.string().optional(),
  disabler: z.object({
    person: z.string(),
  }).optional(),
  displayHints: z.object({
    disabled: z.boolean(),
    hiddenInSearch: z.boolean(),
    priority: z.string(),
    shownInApply: z.boolean(),
  }).optional(),
  enabledAppSettings: z.object({
    enabledApps: z.array(z.object({
      app: z.string(),
    })),
  }).optional(),
  fields: z.array(z.object({
    appliedCapabilities: z.object({
      canRead: z.boolean(),
      canSearch: z.boolean(),
      canWrite: z.boolean(),
    }),
    createTime: z.string(),
    creator: z.object({
      person: z.string(),
    }),
    dateOptions: z.object({
      dateFormat: z.string(),
      dateFormatType: z.string(),
      maxValue: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      minValue: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
    }),
    disableTime: z.string(),
    disabler: z.object({
      person: z.string(),
    }),
    displayHints: z.object({
      disabled: z.boolean(),
      hiddenInSearch: z.boolean(),
      required: z.boolean(),
      shownInApply: z.boolean(),
    }),
    id: z.string(),
    integerOptions: z.object({
      maxValue: z.string(),
      minValue: z.string(),
    }),
    lifecycle: z.object({
      disabledPolicy: z.object({
        hideInSearch: z.boolean(),
        showInApply: z.boolean(),
      }),
      hasUnpublishedChanges: z.boolean(),
      state: z.string(),
    }),
    lockStatus: z.object({
      locked: z.boolean(),
    }),
    properties: z.object({
      displayName: z.string(),
      insertBeforeField: z.string(),
      required: z.boolean(),
    }),
    publisher: z.object({
      person: z.string(),
    }),
    queryKey: z.string(),
    schemaCapabilities: z.object({
      canDelete: z.boolean(),
      canDisable: z.boolean(),
      canEnable: z.boolean(),
      canUpdate: z.boolean(),
    }),
    selectionOptions: z.object({
      choices: z.array(z.object({
        appliedCapabilities: z.object({
          canRead: z.boolean(),
          canSearch: z.boolean(),
          canSelect: z.boolean(),
        }),
        createTime: z.string(),
        creator: z.object({
          person: z.string(),
        }),
        disableTime: z.string(),
        disabler: z.object({
          person: z.string(),
        }),
        displayHints: z.object({
          badgeColors: z.object({
            backgroundColor: z.object({
              alpha: z.number(),
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            foregroundColor: z.object({
              alpha: z.number(),
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            soloColor: z.object({
              alpha: z.number(),
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
          }),
          badgePriority: z.string(),
          darkBadgeColors: z.object({
            backgroundColor: z.object({
              alpha: z.number(),
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            foregroundColor: z.object({
              alpha: z.number(),
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            soloColor: z.object({
              alpha: z.number(),
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
          }),
          disabled: z.boolean(),
          hiddenInSearch: z.boolean(),
          shownInApply: z.boolean(),
        }),
        id: z.string(),
        lifecycle: z.object({
          disabledPolicy: z.object({
            hideInSearch: z.boolean(),
            showInApply: z.boolean(),
          }),
          hasUnpublishedChanges: z.boolean(),
          state: z.string(),
        }),
        lockStatus: z.object({
          locked: z.boolean(),
        }),
        properties: z.object({
          badgeConfig: z.object({
            color: z.object({
              alpha: z.number(),
              blue: z.number(),
              green: z.number(),
              red: z.number(),
            }),
            priorityOverride: z.string(),
          }),
          description: z.string(),
          displayName: z.string(),
          insertBeforeChoice: z.string(),
        }),
        publishTime: z.string(),
        publisher: z.object({
          person: z.string(),
        }),
        schemaCapabilities: z.object({
          canDelete: z.boolean(),
          canDisable: z.boolean(),
          canEnable: z.boolean(),
          canUpdate: z.boolean(),
        }),
        updateTime: z.string(),
        updater: z.object({
          person: z.string(),
        }),
      })),
      listOptions: z.object({
        maxEntries: z.number(),
      }),
    }),
    textOptions: z.object({
      maxLength: z.number(),
      minLength: z.number(),
    }),
    updateTime: z.string(),
    updater: z.object({
      person: z.string(),
    }),
    userOptions: z.object({
      listOptions: z.object({
        maxEntries: z.number(),
      }),
    }),
  })).optional(),
  id: z.string().optional(),
  labelType: z.string().optional(),
  learnMoreUri: z.string().optional(),
  lifecycle: z.object({
    disabledPolicy: z.object({
      hideInSearch: z.boolean(),
      showInApply: z.boolean(),
    }),
    hasUnpublishedChanges: z.boolean(),
    state: z.string(),
  }).optional(),
  lockStatus: z.object({
    locked: z.boolean(),
  }).optional(),
  name: z.string(),
  properties: z.object({
    description: z.string(),
    title: z.string(),
  }).optional(),
  publishTime: z.string().optional(),
  publisher: z.object({
    person: z.string(),
  }).optional(),
  revisionCreateTime: z.string().optional(),
  revisionCreator: z.object({
    person: z.string(),
  }).optional(),
  revisionId: z.string().optional(),
  schemaCapabilities: z.object({
    canDelete: z.boolean(),
    canDisable: z.boolean(),
    canEnable: z.boolean(),
    canUpdate: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  appliedCapabilities: z.object({
    canApply: z.boolean().describe(
      "Whether the user can apply this label to items.",
    ).optional(),
    canRead: z.boolean().describe(
      "Whether the user can read applied metadata related to this label.",
    ).optional(),
    canRemove: z.boolean().describe(
      "Whether the user can remove this label from items.",
    ).optional(),
  }).describe("The capabilities a user has on this label's applied metadata.")
    .optional(),
  appliedLabelPolicy: z.object({
    copyMode: z.enum([
      "COPY_MODE_UNSPECIFIED",
      "DO_NOT_COPY",
      "ALWAYS_COPY",
      "COPY_APPLIABLE",
    ]).describe(
      "Indicates how the applied label and field values should be copied when a Drive item is copied.",
    ).optional(),
  }).describe("Behavior of this label when it's applied to Drive items.")
    .optional(),
  creator: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  disabler: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  displayHints: z.object({
    disabled: z.boolean().describe(
      "Whether the label should be shown in the UI as disabled.",
    ).optional(),
    hiddenInSearch: z.boolean().describe(
      "This label should be hidden in the search menu when searching for Drive items.",
    ).optional(),
    priority: z.string().describe("The order to display labels in a list.")
      .optional(),
    shownInApply: z.boolean().describe(
      "This label should be shown in the apply menu when applying values to a Drive item.",
    ).optional(),
  }).describe("The UI display hints for rendering the label.").optional(),
  enabledAppSettings: z.object({
    enabledApps: z.array(z.object({
      app: z.enum(["APP_UNSPECIFIED", "DRIVE", "GMAIL"]).describe(
        "Optional. The name of the app.",
      ).optional(),
    })).describe("Optional. The list of apps where the label can be used.")
      .optional(),
  }).describe(
    "Describes the Google Workspace apps in which the label can be used.",
  ).optional(),
  fields: z.array(z.object({
    appliedCapabilities: z.object({
      canRead: z.boolean().describe(
        "Whether the user can read related applied metadata on items.",
      ).optional(),
      canSearch: z.boolean().describe(
        "Whether the user can search for Drive items referencing this field.",
      ).optional(),
      canWrite: z.boolean().describe(
        "Whether the user can set this field on Drive items.",
      ).optional(),
    }).describe("The capabilities related to this field on applied metadata.")
      .optional(),
    createTime: z.string().describe(
      "Output only. The time this field was created.",
    ).optional(),
    creator: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    dateOptions: z.object({
      dateFormat: z.string().describe("Output only. ICU date format.")
        .optional(),
      dateFormatType: z.enum([
        "DATE_FORMAT_UNSPECIFIED",
        "LONG_DATE",
        "SHORT_DATE",
      ]).describe(
        "Localized date formatting option. Field values are rendered in this format according to their locale.",
      ).optional(),
      maxValue: z.object({
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
      minValue: z.object({
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
    }).describe("Options for the date field type.").optional(),
    disableTime: z.string().describe(
      "Output only. The time this field was disabled. This value has no meaning when the field is not disabled.",
    ).optional(),
    disabler: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    displayHints: z.object({
      disabled: z.boolean().describe(
        "Whether the field should be shown in the UI as disabled.",
      ).optional(),
      hiddenInSearch: z.boolean().describe(
        "This field should be hidden in the search menu when searching for Drive items.",
      ).optional(),
      required: z.boolean().describe(
        "Whether the field should be shown as required in the UI.",
      ).optional(),
      shownInApply: z.boolean().describe(
        "This field should be shown in the apply menu when applying values to a Drive item.",
      ).optional(),
    }).describe("UI display hints for rendering a field.").optional(),
    id: z.string().describe(
      "Output only. The key of a field, unique within a label or library. This value is autogenerated. Matches the regex: `([a-zA-Z0-9])+`.",
    ).optional(),
    integerOptions: z.object({
      maxValue: z.string().describe(
        "Output only. The maximum valid value for the integer field.",
      ).optional(),
      minValue: z.string().describe(
        "Output only. The minimum valid value for the integer field.",
      ).optional(),
    }).describe("Options for the Integer field type.").optional(),
    lifecycle: z.object({
      disabledPolicy: z.object({
        hideInSearch: z.boolean().describe(
          "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
        ).optional(),
        showInApply: z.boolean().describe(
          "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
        ).optional(),
      }).describe(
        "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
      ).optional(),
      hasUnpublishedChanges: z.boolean().describe(
        "Output only. Whether the object associated with this lifecycle has unpublished changes.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "UNPUBLISHED_DRAFT",
        "PUBLISHED",
        "DISABLED",
        "DELETED",
      ]).describe(
        "Output only. The state of the object associated with this lifecycle.",
      ).optional(),
    }).describe(
      "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
    ).optional(),
    lockStatus: z.object({
      locked: z.boolean().describe(
        "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
      ).optional(),
    }).describe(
      "Contains information about whether a label component should be considered locked.",
    ).optional(),
    properties: z.object({
      displayName: z.string().describe(
        "Required. The display text to show in the UI identifying this field.",
      ).optional(),
      insertBeforeField: z.string().describe(
        "Input only. Insert or move this field before the indicated field. If empty, the field is placed at the end of the list.",
      ).optional(),
      required: z.boolean().describe(
        "Whether the field should be marked as required.",
      ).optional(),
    }).describe("The basic properties of the field.").optional(),
    publisher: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    queryKey: z.string().describe(
      'Output only. The key to use when constructing Drive search queries to find files based on values defined for this field on files. For example, "`{query_key}` > 2001-01-01".',
    ).optional(),
    schemaCapabilities: z.object({
      canDelete: z.boolean().describe(
        "Whether the user can delete this field. The user must have permission and the field must be deprecated.",
      ).optional(),
      canDisable: z.boolean().describe(
        "Whether the user can disable this field. The user must have permission and this field must not already be disabled.",
      ).optional(),
      canEnable: z.boolean().describe(
        "Whether the user can enable this field. The user must have permission and this field must be disabled.",
      ).optional(),
      canUpdate: z.boolean().describe("Whether the user can change this field.")
        .optional(),
    }).describe(
      "The capabilities related to this field when editing the field.",
    ).optional(),
    selectionOptions: z.object({
      choices: z.array(z.object({
        appliedCapabilities: z.object({
          canRead: z.boolean().describe(
            "Whether the user can read related applied metadata on items.",
          ).optional(),
          canSearch: z.boolean().describe(
            "Whether the user can use this choice in search queries.",
          ).optional(),
          canSelect: z.boolean().describe(
            "Whether the user can select this choice on an item.",
          ).optional(),
        }).describe(
          "The capabilities related to this choice on applied metadata.",
        ).optional(),
        createTime: z.string().describe(
          "Output only. The time this choice was created.",
        ).optional(),
        creator: z.object({
          person: z.string().describe(
            "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
          ).optional(),
        }).describe("Information about a user.").optional(),
        disableTime: z.string().describe(
          "Output only. The time this choice was disabled. This value has no meaning when the choice is not disabled.",
        ).optional(),
        disabler: z.object({
          person: z.string().describe(
            "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
          ).optional(),
        }).describe("Information about a user.").optional(),
        displayHints: z.object({
          badgeColors: z.object({
            backgroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            foregroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            soloColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
          }).describe(
            "The color derived from BadgeConfig and changed to the closest recommended supported color.",
          ).optional(),
          badgePriority: z.string().describe(
            "The priority of this badge. Used to compare and sort between multiple badges. A lower number means the badge should be shown first. When a badging configuration is not present, this will be 0. Otherwise, this will be set to `BadgeConfig.priority_override` or the default heuristic which prefers creation date of the label, and field and option priority.",
          ).optional(),
          darkBadgeColors: z.object({
            backgroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            foregroundColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            soloColor: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
          }).describe(
            "The color derived from BadgeConfig and changed to the closest recommended supported color.",
          ).optional(),
          disabled: z.boolean().describe(
            "Whether the option should be shown in the UI as disabled.",
          ).optional(),
          hiddenInSearch: z.boolean().describe(
            "This option should be hidden in the search menu when searching for Drive items.",
          ).optional(),
          shownInApply: z.boolean().describe(
            "This option should be shown in the apply menu when applying values to a Drive item.",
          ).optional(),
        }).describe("UI display hints for rendering an option.").optional(),
        id: z.string().describe(
          "The unique value of the choice. This ID is autogenerated. Matches the regex: `([a-zA-Z0-9_])+`.",
        ).optional(),
        lifecycle: z.object({
          disabledPolicy: z.object({
            hideInSearch: z.boolean().describe(
              "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
            ).optional(),
            showInApply: z.boolean().describe(
              "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
            ).optional(),
          }).describe(
            "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
          ).optional(),
          hasUnpublishedChanges: z.boolean().describe(
            "Output only. Whether the object associated with this lifecycle has unpublished changes.",
          ).optional(),
          state: z.enum([
            "STATE_UNSPECIFIED",
            "UNPUBLISHED_DRAFT",
            "PUBLISHED",
            "DISABLED",
            "DELETED",
          ]).describe(
            "Output only. The state of the object associated with this lifecycle.",
          ).optional(),
        }).describe(
          "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
        ).optional(),
        lockStatus: z.object({
          locked: z.boolean().describe(
            "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
          ).optional(),
        }).describe(
          "Contains information about whether a label component should be considered locked.",
        ).optional(),
        properties: z.object({
          badgeConfig: z.object({
            color: z.object({
              alpha: z.number().describe(
                "The fraction of this color that should be applied to the pixel. That is, the final pixel color is defined by the equation: `pixel color = alpha * (this color) + (1.0 - alpha) * (background color)` This means that a value of 1.0 corresponds to a solid color, whereas a value of 0.0 corresponds to a completely transparent color. This uses a wrapper message rather than a simple float scalar so that it is possible to distinguish between a default value and the value being unset. If omitted, this color object is rendered as a solid color (as if the alpha value had been explicitly given a value of 1.0).",
              ).optional(),
              blue: z.number().describe(
                "The amount of blue in the color as a value in the interval [0, 1].",
              ).optional(),
              green: z.number().describe(
                "The amount of green in the color as a value in the interval [0, 1].",
              ).optional(),
              red: z.number().describe(
                "The amount of red in the color as a value in the interval [0, 1].",
              ).optional(),
            }).describe(
              "Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to and from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of `java.awt.Color` in Java; it can also be trivially provided to UIColor's `+colorWithRed:green:blue:alpha` method in iOS; and, with just a little work, it can be easily formatted into a CSS `rgba()` string in JavaScript. This reference page doesn't have information about the absolute color space that should be used to interpret the RGB value—for example, sRGB, Adobe RGB, DCI-P3, and BT.2020. By default, applications should assume the sRGB color space. When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most `1e-5`. Example (Java): import com.google.type.Color; //... public static java.awt.Color fromProto(Color protocolor) { float alpha = protocolor.hasAlpha()? protocolor.getAlpha().getValue(): 1.0; return new java.awt.Color( protocolor.getRed(), protocolor.getGreen(), protocolor.getBlue(), alpha); } public static Color toProto(java.awt.Color color) { float red = (float) color.getRed(); float green = (float) color.getGreen(); float blue = (float) color.getBlue(); float denominator = 255.0; Color.Builder resultBuilder = Color.newBuilder().setRed(red / denominator).setGreen(green / denominator).setBlue(blue / denominator); int alpha = color.getAlpha(); if (alpha!= 255) { result.setAlpha( FloatValue.newBuilder().setValue(((float) alpha) / denominator).build()); } return resultBuilder.build(); } //... Example (iOS / Obj-C): //... static UIColor* fromProto(Color* protocolor) { float red = [protocolor red]; float green = [protocolor green]; float blue = [protocolor blue]; FloatValue* alpha_wrapper = [protocolor alpha]; float alpha = 1.0; if (alpha_wrapper!= nil) { alpha = [alpha_wrapper value]; } return [UIColor colorWithRed:red green:green blue:blue alpha:alpha]; } static Color* toProto(UIColor* color) { CGFloat red, green, blue, alpha; if (![color getRed:&red green:&green blue:&blue alpha:&alpha]) { return nil; } Color* result = [[Color alloc] init]; [result setRed:red]; [result setGreen:green]; [result setBlue:blue]; if (alpha <= 0.9999) { [result setAlpha:floatWrapperWithValue(alpha)]; } [result autorelease]; return result; } //... Example (JavaScript): //... var protoToCssColor = function(rgb_color) { var redFrac = rgb_color.red || 0.0; var greenFrac = rgb_color.green || 0.0; var blueFrac = rgb_color.blue || 0.0; var red = Math.floor(redFrac * 255); var green = Math.floor(greenFrac * 255); var blue = Math.floor(blueFrac * 255); if (!('alpha' in rgb_color)) { return rgbToCssColor(red, green, blue); } var alphaFrac = rgb_color.alpha.value || 0.0; var rgbParams = [red, green, blue].join(','); return ['rgba(', rgbParams, ',', alphaFrac, ')'].join(''); }; var rgbToCssColor = function(red, green, blue) { var rgbNumber = new Number((red << 16) | (green << 8) | blue); var hexString = rgbNumber.toString(16); var missingZeros = 6 - hexString.length; var resultBuilder = ['#']; for (var i = 0; i < missingZeros; i++) { resultBuilder.push('0'); } resultBuilder.push(hexString); return resultBuilder.join(''); }; //...",
            ).optional(),
            priorityOverride: z.string().describe(
              "Override the default global priority of this badge. When set to 0, the default priority heuristic is used.",
            ).optional(),
          }).describe("Badge status of the label.").optional(),
          description: z.string().describe("The description of this label.")
            .optional(),
          displayName: z.string().describe(
            "Required. The display text to show in the UI identifying this field.",
          ).optional(),
          insertBeforeChoice: z.string().describe(
            "Input only. Insert or move this choice before the indicated choice. If empty, the choice is placed at the end of the list.",
          ).optional(),
        }).describe("Basic properties of the choice.").optional(),
        publishTime: z.string().describe(
          "Output only. The time this choice was published. This value has no meaning when the choice is not published.",
        ).optional(),
        publisher: z.object({
          person: z.string().describe(
            "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
          ).optional(),
        }).describe("Information about a user.").optional(),
        schemaCapabilities: z.object({
          canDelete: z.boolean().describe(
            "Whether the user can delete this choice.",
          ).optional(),
          canDisable: z.boolean().describe(
            "Whether the user can disable this choice.",
          ).optional(),
          canEnable: z.boolean().describe(
            "Whether the user can enable this choice.",
          ).optional(),
          canUpdate: z.boolean().describe(
            "Whether the user can update this choice.",
          ).optional(),
        }).describe(
          "The capabilities related to this choice when editing the choice.",
        ).optional(),
        updateTime: z.string().describe(
          "Output only. The time this choice was updated last.",
        ).optional(),
        updater: z.object({
          person: z.string().describe(
            "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
          ).optional(),
        }).describe("Information about a user.").optional(),
      })).describe(
        "The options available for this selection field. The list order is consistent, and modified with `insert_before_choice`.",
      ).optional(),
      listOptions: z.object({
        maxEntries: z.number().int().describe(
          "Maximum number of entries permitted.",
        ).optional(),
      }).describe(
        "Options for a multi-valued variant of an associated field type.",
      ).optional(),
    }).describe("Options for the selection field type.").optional(),
    textOptions: z.object({
      maxLength: z.number().int().describe(
        "Output only. The maximum valid length of values for the text field.",
      ).optional(),
      minLength: z.number().int().describe(
        "Output only. The minimum valid length of values for the text field.",
      ).optional(),
    }).describe("Options for the Text field type.").optional(),
    updateTime: z.string().describe(
      "Output only. The time this field was updated.",
    ).optional(),
    updater: z.object({
      person: z.string().describe(
        "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
      ).optional(),
    }).describe("Information about a user.").optional(),
    userOptions: z.object({
      listOptions: z.object({
        maxEntries: z.number().int().describe(
          "Maximum number of entries permitted.",
        ).optional(),
      }).describe(
        "Options for a multi-valued variant of an associated field type.",
      ).optional(),
    }).describe("Options for the user field type.").optional(),
  })).describe("List of fields in descending priority order.").optional(),
  labelType: z.enum(["LABEL_TYPE_UNSPECIFIED", "SHARED", "ADMIN", "GOOGLE_APP"])
    .describe("Required. The type of label.").optional(),
  learnMoreUri: z.string().describe(
    "Custom URL to present to users to allow them to learn more about this label and how it should be used.",
  ).optional(),
  lifecycle: z.object({
    disabledPolicy: z.object({
      hideInSearch: z.boolean().describe(
        "Whether to hide this disabled object in the search menu for Drive items. * When `false`, the object is generally shown in the UI as disabled but it appears in the search results when searching for Drive items. * When `true`, the object is generally hidden in the UI when searching for Drive items.",
      ).optional(),
      showInApply: z.boolean().describe(
        "Whether to show this disabled object in the apply menu on Drive items. * When `true`, the object is generally shown in the UI as disabled and is unselectable. * When `false`, the object is generally hidden in the UI.",
      ).optional(),
    }).describe(
      "The policy that governs how to treat a disabled label, field, or selection choice in different contexts.",
    ).optional(),
    hasUnpublishedChanges: z.boolean().describe(
      "Output only. Whether the object associated with this lifecycle has unpublished changes.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "UNPUBLISHED_DRAFT",
      "PUBLISHED",
      "DISABLED",
      "DELETED",
    ]).describe(
      "Output only. The state of the object associated with this lifecycle.",
    ).optional(),
  }).describe(
    "The lifecycle state of an object, such as label, field, or choice. For more information, see [Label lifecycle](https://developers.google.com/workspace/drive/labels/guides/label-lifecycle). The lifecycle enforces the following transitions: * `UNPUBLISHED_DRAFT` (starting state) * `UNPUBLISHED_DRAFT` -> `PUBLISHED` * `UNPUBLISHED_DRAFT` -> (Deleted) * `PUBLISHED` -> `DISABLED` * `DISABLED` -> `PUBLISHED` * `DISABLED` -> (Deleted) The published and disabled states have some distinct characteristics: * `Published`: Some kinds of changes might be made to an object in this state, in which case `has_unpublished_changes` will be true. Also, some kinds of changes aren't permitted. Generally, any change that would invalidate or cause new restrictions on existing metadata related to the label are rejected. * `Disabled`: When disabled, the configured `DisabledPolicy` takes effect.",
  ).optional(),
  lockStatus: z.object({
    locked: z.boolean().describe(
      "Output only. Indicates whether this label component is the (direct) target of a label lock. A label component can be implicitly locked even if it's not the direct target of a label lock, in which case this field is set to false.",
    ).optional(),
  }).describe(
    "Contains information about whether a label component should be considered locked.",
  ).optional(),
  properties: z.object({
    description: z.string().describe("The description of the label.")
      .optional(),
    title: z.string().describe("Required. Title of the label.").optional(),
  }).describe("Basic properties of the label.").optional(),
  publisher: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  revisionCreator: z.object({
    person: z.string().describe(
      "The identifier for this user that can be used with the [People API](https://developers.google.com/people) to get more information. For example, `people/12345678`.",
    ).optional(),
  }).describe("Information about a user.").optional(),
  schemaCapabilities: z.object({
    canDelete: z.boolean().describe(
      "Whether the user can delete this label. The user must have permission and the label must be disabled.",
    ).optional(),
    canDisable: z.boolean().describe(
      "Whether the user can disable this label. The user must have permission and this label must not already be disabled.",
    ).optional(),
    canEnable: z.boolean().describe(
      "Whether the user can enable this label. The user must have permission and this label must be disabled.",
    ).optional(),
    canUpdate: z.boolean().describe("Whether the user can change this label.")
      .optional(),
  }).describe("The capabilities related to this label when editing the label.")
    .optional(),
  languageCode: z.string().describe(
    "The BCP-47 language code to use for evaluating localized field labels in response. When not specified, values in the default configured language will be used.",
  ).optional(),
  useAdminAccess: z.string().describe(
    "Set to `true` in order to use the user's admin privileges. The server will verify the user is an admin before allowing access.",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/drivelabels/labels",
  version: "2026.04.02.2",
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
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A label defines a taxonomy that can be applied to Drive items in order to org...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a labels",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["appliedCapabilities"] !== undefined) {
          body["appliedCapabilities"] = g["appliedCapabilities"];
        }
        if (g["appliedLabelPolicy"] !== undefined) {
          body["appliedLabelPolicy"] = g["appliedLabelPolicy"];
        }
        if (g["creator"] !== undefined) body["creator"] = g["creator"];
        if (g["disabler"] !== undefined) body["disabler"] = g["disabler"];
        if (g["displayHints"] !== undefined) {
          body["displayHints"] = g["displayHints"];
        }
        if (g["enabledAppSettings"] !== undefined) {
          body["enabledAppSettings"] = g["enabledAppSettings"];
        }
        if (g["fields"] !== undefined) body["fields"] = g["fields"];
        if (g["labelType"] !== undefined) body["labelType"] = g["labelType"];
        if (g["learnMoreUri"] !== undefined) {
          body["learnMoreUri"] = g["learnMoreUri"];
        }
        if (g["lifecycle"] !== undefined) body["lifecycle"] = g["lifecycle"];
        if (g["lockStatus"] !== undefined) body["lockStatus"] = g["lockStatus"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["publisher"] !== undefined) body["publisher"] = g["publisher"];
        if (g["revisionCreator"] !== undefined) {
          body["revisionCreator"] = g["revisionCreator"];
        }
        if (g["schemaCapabilities"] !== undefined) {
          body["schemaCapabilities"] = g["schemaCapabilities"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = g["useAdminAccess"];
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
      description: "Get a labels",
      arguments: z.object({
        identifier: z.string().describe("The name of the labels"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Delete the labels",
      arguments: z.object({
        identifier: z.string().describe("The name of the labels"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync labels state from GCP",
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
          params["name"] = identifier;
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
    delta: {
      description: "delta",
      arguments: z.object({
        languageCode: z.any().optional(),
        requests: z.any().optional(),
        useAdminAccess: z.any().optional(),
        view: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["view"] !== undefined) body["view"] = args["view"];
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.delta",
            "path": "v2/{+name}:delta",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    disable: {
      description: "disable",
      arguments: z.object({
        disabledPolicy: z.any().optional(),
        languageCode: z.any().optional(),
        updateMask: z.any().optional(),
        useAdminAccess: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["disabledPolicy"] !== undefined) {
          body["disabledPolicy"] = args["disabledPolicy"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.disable",
            "path": "v2/{+name}:disable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    enable: {
      description: "enable",
      arguments: z.object({
        languageCode: z.any().optional(),
        useAdminAccess: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.enable",
            "path": "v2/{+name}:enable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    publish: {
      description: "publish",
      arguments: z.object({
        languageCode: z.any().optional(),
        useAdminAccess: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.publish",
            "path": "v2/{+name}:publish",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_label_copy_mode: {
      description: "update label copy mode",
      arguments: z.object({
        copyMode: z.any().optional(),
        languageCode: z.any().optional(),
        useAdminAccess: z.any().optional(),
        view: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["copyMode"] !== undefined) body["copyMode"] = args["copyMode"];
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["view"] !== undefined) body["view"] = args["view"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.updateLabelCopyMode",
            "path": "v2/{+name}:updateLabelCopyMode",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_label_enabled_app_settings: {
      description: "update label enabled app settings",
      arguments: z.object({
        enabledAppSettings: z.any().optional(),
        languageCode: z.any().optional(),
        useAdminAccess: z.any().optional(),
        view: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["enabledAppSettings"] !== undefined) {
          body["enabledAppSettings"] = args["enabledAppSettings"];
        }
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["useAdminAccess"] !== undefined) {
          body["useAdminAccess"] = args["useAdminAccess"];
        }
        if (args["view"] !== undefined) body["view"] = args["view"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.updateLabelEnabledAppSettings",
            "path": "v2/{+name}:updateLabelEnabledAppSettings",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    update_permissions: {
      description: "update permissions",
      arguments: z.object({
        audience: z.any().optional(),
        email: z.any().optional(),
        group: z.any().optional(),
        name: z.any().optional(),
        person: z.any().optional(),
        role: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["audience"] !== undefined) body["audience"] = args["audience"];
        if (args["email"] !== undefined) body["email"] = args["email"];
        if (args["group"] !== undefined) body["group"] = args["group"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["person"] !== undefined) body["person"] = args["person"];
        if (args["role"] !== undefined) body["role"] = args["role"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "drivelabels.labels.updatePermissions",
            "path": "v2/{+parent}/permissions",
            "httpMethod": "PATCH",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "useAdminAccess": { "location": "query" },
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
