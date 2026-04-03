// Auto-generated extension model for @swamp/gcp/forms/forms
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

import { z } from "zod";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://forms.googleapis.com/";

const GET_CONFIG = {
  "id": "forms.forms.get",
  "path": "v1/forms/{formId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "formId",
  ],
  "parameters": {
    "formId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "forms.forms.create",
  "path": "v1/forms",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "unpublished": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  info: z.object({
    description: z.string().describe("The description of the form.").optional(),
    documentTitle: z.string().describe(
      "Output only. The title of the document which is visible in Drive. If Info.title is empty, `document_title` may appear in its place in the Google Forms UI and be visible to responders. `document_title` can be set on create, but cannot be modified by a batchUpdate request. Please use the [Google Drive API](https://developers.google.com/drive/api/v3/reference/files/update) if you need to programmatically update `document_title`.",
    ).optional(),
    title: z.string().describe(
      "Required. The title of the form which is visible to responders.",
    ).optional(),
  }).describe("The general information for a form.").optional(),
  items: z.array(z.object({
    description: z.string().describe("The description of the item.").optional(),
    imageItem: z.object({
      image: z.object({
        altText: z.string().describe(
          "A description of the image that is shown on hover and read by screenreaders.",
        ).optional(),
        contentUri: z.string().describe(
          "Output only. A URI from which you can download the image; this is valid only for a limited time.",
        ).optional(),
        properties: z.object({
          alignment: z.enum([
            "ALIGNMENT_UNSPECIFIED",
            "LEFT",
            "RIGHT",
            "CENTER",
          ]).describe("Position of the media.").optional(),
          width: z.number().int().describe(
            "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
          ).optional(),
        }).describe("Properties of the media.").optional(),
        sourceUri: z.string().describe(
          "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
        ).optional(),
      }).describe("Data representing an image.").optional(),
    }).describe("An item containing an image.").optional(),
    itemId: z.string().describe(
      "The item ID. On creation, it can be provided but the ID must not be already used in the form. If not provided, a new ID is assigned.",
    ).optional(),
    pageBreakItem: z.object({}).describe(
      "A page break. The title and description of this item are shown at the top of the new page.",
    ).optional(),
    questionGroupItem: z.object({
      grid: z.object({
        columns: z.object({
          options: z.array(z.object({
            goToAction: z.enum([
              "GO_TO_ACTION_UNSPECIFIED",
              "NEXT_SECTION",
              "RESTART_FORM",
              "SUBMIT_FORM",
            ]).describe("Section navigation type.").optional(),
            goToSectionId: z.string().describe(
              "Item ID of section header to go to.",
            ).optional(),
            image: z.object({
              altText: z.string().describe(
                "A description of the image that is shown on hover and read by screenreaders.",
              ).optional(),
              contentUri: z.string().describe(
                "Output only. A URI from which you can download the image; this is valid only for a limited time.",
              ).optional(),
              properties: z.object({
                alignment: z.enum([
                  "ALIGNMENT_UNSPECIFIED",
                  "LEFT",
                  "RIGHT",
                  "CENTER",
                ]).describe("Position of the media.").optional(),
                width: z.number().int().describe(
                  "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
                ).optional(),
              }).describe("Properties of the media.").optional(),
              sourceUri: z.string().describe(
                "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
              ).optional(),
            }).describe("Data representing an image.").optional(),
            isOther: z.boolean().describe(
              'Whether the option is "other". Currently only applies to `RADIO` and `CHECKBOX` choice types, but is not allowed in a QuestionGroupItem.',
            ).optional(),
            value: z.string().describe(
              "Required. The choice as presented to the user.",
            ).optional(),
          })).describe(
            "Required. List of options that a respondent must choose from.",
          ).optional(),
          shuffle: z.boolean().describe(
            "Whether the options should be displayed in random order for different instances of the quiz. This is often used to prevent cheating by respondents who might be looking at another respondent's screen, or to address bias in a survey that might be introduced by always putting the same options first or last.",
          ).optional(),
          type: z.enum([
            "CHOICE_TYPE_UNSPECIFIED",
            "RADIO",
            "CHECKBOX",
            "DROP_DOWN",
          ]).describe("Required. The type of choice question.").optional(),
        }).describe("A radio/checkbox/dropdown question.").optional(),
        shuffleQuestions: z.boolean().describe(
          "If `true`, the questions are randomly ordered. In other words, the rows appear in a different order for every respondent.",
        ).optional(),
      }).describe(
        "A grid of choices (radio or check boxes) with each row constituting a separate question. Each row has the same choices, which are shown as the columns.",
      ).optional(),
      image: z.object({
        altText: z.string().describe(
          "A description of the image that is shown on hover and read by screenreaders.",
        ).optional(),
        contentUri: z.string().describe(
          "Output only. A URI from which you can download the image; this is valid only for a limited time.",
        ).optional(),
        properties: z.object({
          alignment: z.enum([
            "ALIGNMENT_UNSPECIFIED",
            "LEFT",
            "RIGHT",
            "CENTER",
          ]).describe("Position of the media.").optional(),
          width: z.number().int().describe(
            "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
          ).optional(),
        }).describe("Properties of the media.").optional(),
        sourceUri: z.string().describe(
          "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
        ).optional(),
      }).describe("Data representing an image.").optional(),
      questions: z.array(z.object({
        choiceQuestion: z.object({
          options: z.array(z.object({
            goToAction: z.enum([
              "GO_TO_ACTION_UNSPECIFIED",
              "NEXT_SECTION",
              "RESTART_FORM",
              "SUBMIT_FORM",
            ]).describe("Section navigation type.").optional(),
            goToSectionId: z.string().describe(
              "Item ID of section header to go to.",
            ).optional(),
            image: z.object({
              altText: z.string().describe(
                "A description of the image that is shown on hover and read by screenreaders.",
              ).optional(),
              contentUri: z.string().describe(
                "Output only. A URI from which you can download the image; this is valid only for a limited time.",
              ).optional(),
              properties: z.object({
                alignment: z.enum([
                  "ALIGNMENT_UNSPECIFIED",
                  "LEFT",
                  "RIGHT",
                  "CENTER",
                ]).describe("Position of the media.").optional(),
                width: z.number().int().describe(
                  "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
                ).optional(),
              }).describe("Properties of the media.").optional(),
              sourceUri: z.string().describe(
                "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
              ).optional(),
            }).describe("Data representing an image.").optional(),
            isOther: z.boolean().describe(
              'Whether the option is "other". Currently only applies to `RADIO` and `CHECKBOX` choice types, but is not allowed in a QuestionGroupItem.',
            ).optional(),
            value: z.string().describe(
              "Required. The choice as presented to the user.",
            ).optional(),
          })).describe(
            "Required. List of options that a respondent must choose from.",
          ).optional(),
          shuffle: z.boolean().describe(
            "Whether the options should be displayed in random order for different instances of the quiz. This is often used to prevent cheating by respondents who might be looking at another respondent's screen, or to address bias in a survey that might be introduced by always putting the same options first or last.",
          ).optional(),
          type: z.enum([
            "CHOICE_TYPE_UNSPECIFIED",
            "RADIO",
            "CHECKBOX",
            "DROP_DOWN",
          ]).describe("Required. The type of choice question.").optional(),
        }).describe("A radio/checkbox/dropdown question.").optional(),
        dateQuestion: z.object({
          includeTime: z.boolean().describe(
            "Whether to include the time as part of the question.",
          ).optional(),
          includeYear: z.boolean().describe(
            "Whether to include the year as part of the question.",
          ).optional(),
        }).describe(
          "A date question. Date questions default to just month + day.",
        ).optional(),
        fileUploadQuestion: z.object({
          folderId: z.string().describe(
            "Required. The ID of the Drive folder where uploaded files are stored.",
          ).optional(),
          maxFileSize: z.string().describe(
            "Maximum number of bytes allowed for any single file uploaded to this question.",
          ).optional(),
          maxFiles: z.number().int().describe(
            "Maximum number of files that can be uploaded for this question in a single response.",
          ).optional(),
          types: z.array(
            z.enum([
              "FILE_TYPE_UNSPECIFIED",
              "ANY",
              "DOCUMENT",
              "PRESENTATION",
              "SPREADSHEET",
              "DRAWING",
              "PDF",
              "IMAGE",
              "VIDEO",
              "AUDIO",
            ]),
          ).describe("File types accepted by this question.").optional(),
        }).describe(
          "A file upload question. The API currently does not support creating file upload questions.",
        ).optional(),
        grading: z.object({
          correctAnswers: z.object({
            answers: z.array(z.object({
              value: z.string().describe(
                "Required. The correct answer value. See the documentation for TextAnswer.value for details on how various value types are formatted.",
              ).optional(),
            })).describe(
              "A list of correct answers. A quiz response can be automatically graded based on these answers. For single-valued questions, a response is marked correct if it matches any value in this list (in other words, multiple correct answers are possible). For multiple-valued (`CHECKBOX`) questions, a response is marked correct if it contains exactly the values in this list.",
            ).optional(),
          }).describe("The answer key for a question.").optional(),
          generalFeedback: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
          pointValue: z.number().int().describe(
            "Required. The maximum number of points a respondent can automatically get for a correct answer. This must not be negative.",
          ).optional(),
          whenRight: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
          whenWrong: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
        }).describe("Grading for a single question").optional(),
        questionId: z.string().describe(
          "Read only. The question ID. On creation, it can be provided but the ID must not be already used in the form. If not provided, a new ID is assigned.",
        ).optional(),
        ratingQuestion: z.object({
          iconType: z.enum([
            "RATING_ICON_TYPE_UNSPECIFIED",
            "STAR",
            "HEART",
            "THUMB_UP",
          ]).describe("Required. The icon type to use for the rating.")
            .optional(),
          ratingScaleLevel: z.number().int().describe(
            "Required. The rating scale level of the rating question.",
          ).optional(),
        }).describe(
          "A rating question. The user has a range of icons to choose from.",
        ).optional(),
        required: z.boolean().describe(
          "Whether the question must be answered in order for a respondent to submit their response.",
        ).optional(),
        rowQuestion: z.object({
          title: z.string().describe(
            "Required. The title for the single row in the QuestionGroupItem.",
          ).optional(),
        }).describe(
          "Configuration for a question that is part of a question group.",
        ).optional(),
        scaleQuestion: z.object({
          high: z.number().int().describe(
            "Required. The highest possible value for the scale.",
          ).optional(),
          highLabel: z.string().describe(
            "The label to display describing the highest point on the scale.",
          ).optional(),
          low: z.number().int().describe(
            "Required. The lowest possible value for the scale.",
          ).optional(),
          lowLabel: z.string().describe(
            "The label to display describing the lowest point on the scale.",
          ).optional(),
        }).describe(
          "A scale question. The user has a range of numeric values to choose from.",
        ).optional(),
        textQuestion: z.object({
          paragraph: z.boolean().describe(
            "Whether the question is a paragraph question or not. If not, the question is a short text question.",
          ).optional(),
        }).describe("A text-based question.").optional(),
        timeQuestion: z.object({
          duration: z.boolean().describe(
            "`true` if the question is about an elapsed time. Otherwise it is about a time of day.",
          ).optional(),
        }).describe("A time question.").optional(),
      })).describe(
        "Required. A list of questions that belong in this question group. A question must only belong to one group. The `kind` of the group may affect what types of questions are allowed.",
      ).optional(),
    }).describe(
      "Defines a question that comprises multiple questions grouped together.",
    ).optional(),
    questionItem: z.object({
      image: z.object({
        altText: z.string().describe(
          "A description of the image that is shown on hover and read by screenreaders.",
        ).optional(),
        contentUri: z.string().describe(
          "Output only. A URI from which you can download the image; this is valid only for a limited time.",
        ).optional(),
        properties: z.object({
          alignment: z.enum([
            "ALIGNMENT_UNSPECIFIED",
            "LEFT",
            "RIGHT",
            "CENTER",
          ]).describe("Position of the media.").optional(),
          width: z.number().int().describe(
            "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
          ).optional(),
        }).describe("Properties of the media.").optional(),
        sourceUri: z.string().describe(
          "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
        ).optional(),
      }).describe("Data representing an image.").optional(),
      question: z.object({
        choiceQuestion: z.object({
          options: z.array(z.object({
            goToAction: z.enum([
              "GO_TO_ACTION_UNSPECIFIED",
              "NEXT_SECTION",
              "RESTART_FORM",
              "SUBMIT_FORM",
            ]).describe("Section navigation type.").optional(),
            goToSectionId: z.string().describe(
              "Item ID of section header to go to.",
            ).optional(),
            image: z.object({
              altText: z.string().describe(
                "A description of the image that is shown on hover and read by screenreaders.",
              ).optional(),
              contentUri: z.string().describe(
                "Output only. A URI from which you can download the image; this is valid only for a limited time.",
              ).optional(),
              properties: z.object({
                alignment: z.enum([
                  "ALIGNMENT_UNSPECIFIED",
                  "LEFT",
                  "RIGHT",
                  "CENTER",
                ]).describe("Position of the media.").optional(),
                width: z.number().int().describe(
                  "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
                ).optional(),
              }).describe("Properties of the media.").optional(),
              sourceUri: z.string().describe(
                "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
              ).optional(),
            }).describe("Data representing an image.").optional(),
            isOther: z.boolean().describe(
              'Whether the option is "other". Currently only applies to `RADIO` and `CHECKBOX` choice types, but is not allowed in a QuestionGroupItem.',
            ).optional(),
            value: z.string().describe(
              "Required. The choice as presented to the user.",
            ).optional(),
          })).describe(
            "Required. List of options that a respondent must choose from.",
          ).optional(),
          shuffle: z.boolean().describe(
            "Whether the options should be displayed in random order for different instances of the quiz. This is often used to prevent cheating by respondents who might be looking at another respondent's screen, or to address bias in a survey that might be introduced by always putting the same options first or last.",
          ).optional(),
          type: z.enum([
            "CHOICE_TYPE_UNSPECIFIED",
            "RADIO",
            "CHECKBOX",
            "DROP_DOWN",
          ]).describe("Required. The type of choice question.").optional(),
        }).describe("A radio/checkbox/dropdown question.").optional(),
        dateQuestion: z.object({
          includeTime: z.boolean().describe(
            "Whether to include the time as part of the question.",
          ).optional(),
          includeYear: z.boolean().describe(
            "Whether to include the year as part of the question.",
          ).optional(),
        }).describe(
          "A date question. Date questions default to just month + day.",
        ).optional(),
        fileUploadQuestion: z.object({
          folderId: z.string().describe(
            "Required. The ID of the Drive folder where uploaded files are stored.",
          ).optional(),
          maxFileSize: z.string().describe(
            "Maximum number of bytes allowed for any single file uploaded to this question.",
          ).optional(),
          maxFiles: z.number().int().describe(
            "Maximum number of files that can be uploaded for this question in a single response.",
          ).optional(),
          types: z.array(
            z.enum([
              "FILE_TYPE_UNSPECIFIED",
              "ANY",
              "DOCUMENT",
              "PRESENTATION",
              "SPREADSHEET",
              "DRAWING",
              "PDF",
              "IMAGE",
              "VIDEO",
              "AUDIO",
            ]),
          ).describe("File types accepted by this question.").optional(),
        }).describe(
          "A file upload question. The API currently does not support creating file upload questions.",
        ).optional(),
        grading: z.object({
          correctAnswers: z.object({
            answers: z.array(z.object({
              value: z.string().describe(
                "Required. The correct answer value. See the documentation for TextAnswer.value for details on how various value types are formatted.",
              ).optional(),
            })).describe(
              "A list of correct answers. A quiz response can be automatically graded based on these answers. For single-valued questions, a response is marked correct if it matches any value in this list (in other words, multiple correct answers are possible). For multiple-valued (`CHECKBOX`) questions, a response is marked correct if it contains exactly the values in this list.",
            ).optional(),
          }).describe("The answer key for a question.").optional(),
          generalFeedback: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
          pointValue: z.number().int().describe(
            "Required. The maximum number of points a respondent can automatically get for a correct answer. This must not be negative.",
          ).optional(),
          whenRight: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
          whenWrong: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
        }).describe("Grading for a single question").optional(),
        questionId: z.string().describe(
          "Read only. The question ID. On creation, it can be provided but the ID must not be already used in the form. If not provided, a new ID is assigned.",
        ).optional(),
        ratingQuestion: z.object({
          iconType: z.enum([
            "RATING_ICON_TYPE_UNSPECIFIED",
            "STAR",
            "HEART",
            "THUMB_UP",
          ]).describe("Required. The icon type to use for the rating.")
            .optional(),
          ratingScaleLevel: z.number().int().describe(
            "Required. The rating scale level of the rating question.",
          ).optional(),
        }).describe(
          "A rating question. The user has a range of icons to choose from.",
        ).optional(),
        required: z.boolean().describe(
          "Whether the question must be answered in order for a respondent to submit their response.",
        ).optional(),
        rowQuestion: z.object({
          title: z.string().describe(
            "Required. The title for the single row in the QuestionGroupItem.",
          ).optional(),
        }).describe(
          "Configuration for a question that is part of a question group.",
        ).optional(),
        scaleQuestion: z.object({
          high: z.number().int().describe(
            "Required. The highest possible value for the scale.",
          ).optional(),
          highLabel: z.string().describe(
            "The label to display describing the highest point on the scale.",
          ).optional(),
          low: z.number().int().describe(
            "Required. The lowest possible value for the scale.",
          ).optional(),
          lowLabel: z.string().describe(
            "The label to display describing the lowest point on the scale.",
          ).optional(),
        }).describe(
          "A scale question. The user has a range of numeric values to choose from.",
        ).optional(),
        textQuestion: z.object({
          paragraph: z.boolean().describe(
            "Whether the question is a paragraph question or not. If not, the question is a short text question.",
          ).optional(),
        }).describe("A text-based question.").optional(),
        timeQuestion: z.object({
          duration: z.boolean().describe(
            "`true` if the question is about an elapsed time. Otherwise it is about a time of day.",
          ).optional(),
        }).describe("A time question.").optional(),
      }).describe(
        "Any question. The specific type of question is known by its `kind`.",
      ).optional(),
    }).describe("A form item containing a single question.").optional(),
    textItem: z.object({}).describe("A text item.").optional(),
    title: z.string().describe("The title of the item.").optional(),
    videoItem: z.object({
      caption: z.string().describe("The text displayed below the video.")
        .optional(),
      video: z.object({
        properties: z.object({
          alignment: z.enum([
            "ALIGNMENT_UNSPECIFIED",
            "LEFT",
            "RIGHT",
            "CENTER",
          ]).describe("Position of the media.").optional(),
          width: z.number().int().describe(
            "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
          ).optional(),
        }).describe("Properties of the media.").optional(),
        youtubeUri: z.string().describe("Required. A YouTube URI.").optional(),
      }).describe("Data representing a video.").optional(),
    }).describe("An item containing a video.").optional(),
  })).describe(
    "Required. A list of the form's items, which can include section headers, questions, embedded media, etc.",
  ).optional(),
  publishSettings: z.object({
    publishState: z.object({
      isAcceptingResponses: z.boolean().describe(
        "Required. Whether the form accepts responses. If `is_published` is set to `false`, this field is forced to `false`.",
      ).optional(),
      isPublished: z.boolean().describe(
        "Required. Whether the form is published and visible to others.",
      ).optional(),
    }).describe("The publishing state of a form.").optional(),
  }).describe("The publishing settings of a form.").optional(),
  settings: z.object({
    emailCollectionType: z.enum([
      "EMAIL_COLLECTION_TYPE_UNSPECIFIED",
      "DO_NOT_COLLECT",
      "VERIFIED",
      "RESPONDER_INPUT",
    ]).describe(
      "Optional. The setting that determines whether the form collects email addresses from respondents.",
    ).optional(),
    quizSettings: z.object({
      isQuiz: z.boolean().describe(
        "Whether this form is a quiz or not. When true, responses are graded based on question Grading. Upon setting to false, all question Grading is deleted.",
      ).optional(),
    }).describe(
      "Settings related to quiz forms and grading. These must be updated with the UpdateSettingsRequest.",
    ).optional(),
  }).describe("A form's settings.").optional(),
  unpublished: z.string().describe(
    "Optional. Whether the form is unpublished. If set to `true`, the form doesn't accept responses. If set to `false` or unset, the form is published and accepts responses.",
  ).optional(),
});

const StateSchema = z.object({
  formId: z.string().optional(),
  info: z.object({
    description: z.string(),
    documentTitle: z.string(),
    title: z.string(),
  }).optional(),
  items: z.array(z.object({
    description: z.string(),
    imageItem: z.object({
      image: z.object({
        altText: z.string(),
        contentUri: z.string(),
        properties: z.object({
          alignment: z.string(),
          width: z.number(),
        }),
        sourceUri: z.string(),
      }),
    }),
    itemId: z.string(),
    pageBreakItem: z.object({}),
    questionGroupItem: z.object({
      grid: z.object({
        columns: z.object({
          options: z.array(z.object({
            goToAction: z.string(),
            goToSectionId: z.string(),
            image: z.object({
              altText: z.string(),
              contentUri: z.string(),
              properties: z.object({
                alignment: z.string(),
                width: z.number(),
              }),
              sourceUri: z.string(),
            }),
            isOther: z.boolean(),
            value: z.string(),
          })),
          shuffle: z.boolean(),
          type: z.string(),
        }),
        shuffleQuestions: z.boolean(),
      }),
      image: z.object({
        altText: z.string(),
        contentUri: z.string(),
        properties: z.object({
          alignment: z.string(),
          width: z.number(),
        }),
        sourceUri: z.string(),
      }),
      questions: z.array(z.object({
        choiceQuestion: z.object({
          options: z.array(z.object({
            goToAction: z.string(),
            goToSectionId: z.string(),
            image: z.object({
              altText: z.string(),
              contentUri: z.string(),
              properties: z.object({
                alignment: z.string(),
                width: z.number(),
              }),
              sourceUri: z.string(),
            }),
            isOther: z.boolean(),
            value: z.string(),
          })),
          shuffle: z.boolean(),
          type: z.string(),
        }),
        dateQuestion: z.object({
          includeTime: z.boolean(),
          includeYear: z.boolean(),
        }),
        fileUploadQuestion: z.object({
          folderId: z.string(),
          maxFileSize: z.string(),
          maxFiles: z.number(),
          types: z.array(z.string()),
        }),
        grading: z.object({
          correctAnswers: z.object({
            answers: z.array(z.object({
              value: z.string(),
            })),
          }),
          generalFeedback: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string(),
                uri: z.string(),
              }),
              video: z.object({
                displayText: z.string(),
                youtubeUri: z.string(),
              }),
            })),
            text: z.string(),
          }),
          pointValue: z.number(),
          whenRight: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string(),
                uri: z.string(),
              }),
              video: z.object({
                displayText: z.string(),
                youtubeUri: z.string(),
              }),
            })),
            text: z.string(),
          }),
          whenWrong: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string(),
                uri: z.string(),
              }),
              video: z.object({
                displayText: z.string(),
                youtubeUri: z.string(),
              }),
            })),
            text: z.string(),
          }),
        }),
        questionId: z.string(),
        ratingQuestion: z.object({
          iconType: z.string(),
          ratingScaleLevel: z.number(),
        }),
        required: z.boolean(),
        rowQuestion: z.object({
          title: z.string(),
        }),
        scaleQuestion: z.object({
          high: z.number(),
          highLabel: z.string(),
          low: z.number(),
          lowLabel: z.string(),
        }),
        textQuestion: z.object({
          paragraph: z.boolean(),
        }),
        timeQuestion: z.object({
          duration: z.boolean(),
        }),
      })),
    }),
    questionItem: z.object({
      image: z.object({
        altText: z.string(),
        contentUri: z.string(),
        properties: z.object({
          alignment: z.string(),
          width: z.number(),
        }),
        sourceUri: z.string(),
      }),
      question: z.object({
        choiceQuestion: z.object({
          options: z.array(z.object({
            goToAction: z.string(),
            goToSectionId: z.string(),
            image: z.object({
              altText: z.string(),
              contentUri: z.string(),
              properties: z.object({
                alignment: z.string(),
                width: z.number(),
              }),
              sourceUri: z.string(),
            }),
            isOther: z.boolean(),
            value: z.string(),
          })),
          shuffle: z.boolean(),
          type: z.string(),
        }),
        dateQuestion: z.object({
          includeTime: z.boolean(),
          includeYear: z.boolean(),
        }),
        fileUploadQuestion: z.object({
          folderId: z.string(),
          maxFileSize: z.string(),
          maxFiles: z.number(),
          types: z.array(z.string()),
        }),
        grading: z.object({
          correctAnswers: z.object({
            answers: z.array(z.object({
              value: z.string(),
            })),
          }),
          generalFeedback: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string(),
                uri: z.string(),
              }),
              video: z.object({
                displayText: z.string(),
                youtubeUri: z.string(),
              }),
            })),
            text: z.string(),
          }),
          pointValue: z.number(),
          whenRight: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string(),
                uri: z.string(),
              }),
              video: z.object({
                displayText: z.string(),
                youtubeUri: z.string(),
              }),
            })),
            text: z.string(),
          }),
          whenWrong: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string(),
                uri: z.string(),
              }),
              video: z.object({
                displayText: z.string(),
                youtubeUri: z.string(),
              }),
            })),
            text: z.string(),
          }),
        }),
        questionId: z.string(),
        ratingQuestion: z.object({
          iconType: z.string(),
          ratingScaleLevel: z.number(),
        }),
        required: z.boolean(),
        rowQuestion: z.object({
          title: z.string(),
        }),
        scaleQuestion: z.object({
          high: z.number(),
          highLabel: z.string(),
          low: z.number(),
          lowLabel: z.string(),
        }),
        textQuestion: z.object({
          paragraph: z.boolean(),
        }),
        timeQuestion: z.object({
          duration: z.boolean(),
        }),
      }),
    }),
    textItem: z.object({}),
    title: z.string(),
    videoItem: z.object({
      caption: z.string(),
      video: z.object({
        properties: z.object({
          alignment: z.string(),
          width: z.number(),
        }),
        youtubeUri: z.string(),
      }),
    }),
  })).optional(),
  linkedSheetId: z.string().optional(),
  publishSettings: z.object({
    publishState: z.object({
      isAcceptingResponses: z.boolean(),
      isPublished: z.boolean(),
    }),
  }).optional(),
  responderUri: z.string().optional(),
  revisionId: z.string().optional(),
  settings: z.object({
    emailCollectionType: z.string(),
    quizSettings: z.object({
      isQuiz: z.boolean(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  info: z.object({
    description: z.string().describe("The description of the form.").optional(),
    documentTitle: z.string().describe(
      "Output only. The title of the document which is visible in Drive. If Info.title is empty, `document_title` may appear in its place in the Google Forms UI and be visible to responders. `document_title` can be set on create, but cannot be modified by a batchUpdate request. Please use the [Google Drive API](https://developers.google.com/drive/api/v3/reference/files/update) if you need to programmatically update `document_title`.",
    ).optional(),
    title: z.string().describe(
      "Required. The title of the form which is visible to responders.",
    ).optional(),
  }).describe("The general information for a form.").optional(),
  items: z.array(z.object({
    description: z.string().describe("The description of the item.").optional(),
    imageItem: z.object({
      image: z.object({
        altText: z.string().describe(
          "A description of the image that is shown on hover and read by screenreaders.",
        ).optional(),
        contentUri: z.string().describe(
          "Output only. A URI from which you can download the image; this is valid only for a limited time.",
        ).optional(),
        properties: z.object({
          alignment: z.enum([
            "ALIGNMENT_UNSPECIFIED",
            "LEFT",
            "RIGHT",
            "CENTER",
          ]).describe("Position of the media.").optional(),
          width: z.number().int().describe(
            "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
          ).optional(),
        }).describe("Properties of the media.").optional(),
        sourceUri: z.string().describe(
          "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
        ).optional(),
      }).describe("Data representing an image.").optional(),
    }).describe("An item containing an image.").optional(),
    itemId: z.string().describe(
      "The item ID. On creation, it can be provided but the ID must not be already used in the form. If not provided, a new ID is assigned.",
    ).optional(),
    pageBreakItem: z.object({}).describe(
      "A page break. The title and description of this item are shown at the top of the new page.",
    ).optional(),
    questionGroupItem: z.object({
      grid: z.object({
        columns: z.object({
          options: z.array(z.object({
            goToAction: z.enum([
              "GO_TO_ACTION_UNSPECIFIED",
              "NEXT_SECTION",
              "RESTART_FORM",
              "SUBMIT_FORM",
            ]).describe("Section navigation type.").optional(),
            goToSectionId: z.string().describe(
              "Item ID of section header to go to.",
            ).optional(),
            image: z.object({
              altText: z.string().describe(
                "A description of the image that is shown on hover and read by screenreaders.",
              ).optional(),
              contentUri: z.string().describe(
                "Output only. A URI from which you can download the image; this is valid only for a limited time.",
              ).optional(),
              properties: z.object({
                alignment: z.enum([
                  "ALIGNMENT_UNSPECIFIED",
                  "LEFT",
                  "RIGHT",
                  "CENTER",
                ]).describe("Position of the media.").optional(),
                width: z.number().int().describe(
                  "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
                ).optional(),
              }).describe("Properties of the media.").optional(),
              sourceUri: z.string().describe(
                "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
              ).optional(),
            }).describe("Data representing an image.").optional(),
            isOther: z.boolean().describe(
              'Whether the option is "other". Currently only applies to `RADIO` and `CHECKBOX` choice types, but is not allowed in a QuestionGroupItem.',
            ).optional(),
            value: z.string().describe(
              "Required. The choice as presented to the user.",
            ).optional(),
          })).describe(
            "Required. List of options that a respondent must choose from.",
          ).optional(),
          shuffle: z.boolean().describe(
            "Whether the options should be displayed in random order for different instances of the quiz. This is often used to prevent cheating by respondents who might be looking at another respondent's screen, or to address bias in a survey that might be introduced by always putting the same options first or last.",
          ).optional(),
          type: z.enum([
            "CHOICE_TYPE_UNSPECIFIED",
            "RADIO",
            "CHECKBOX",
            "DROP_DOWN",
          ]).describe("Required. The type of choice question.").optional(),
        }).describe("A radio/checkbox/dropdown question.").optional(),
        shuffleQuestions: z.boolean().describe(
          "If `true`, the questions are randomly ordered. In other words, the rows appear in a different order for every respondent.",
        ).optional(),
      }).describe(
        "A grid of choices (radio or check boxes) with each row constituting a separate question. Each row has the same choices, which are shown as the columns.",
      ).optional(),
      image: z.object({
        altText: z.string().describe(
          "A description of the image that is shown on hover and read by screenreaders.",
        ).optional(),
        contentUri: z.string().describe(
          "Output only. A URI from which you can download the image; this is valid only for a limited time.",
        ).optional(),
        properties: z.object({
          alignment: z.enum([
            "ALIGNMENT_UNSPECIFIED",
            "LEFT",
            "RIGHT",
            "CENTER",
          ]).describe("Position of the media.").optional(),
          width: z.number().int().describe(
            "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
          ).optional(),
        }).describe("Properties of the media.").optional(),
        sourceUri: z.string().describe(
          "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
        ).optional(),
      }).describe("Data representing an image.").optional(),
      questions: z.array(z.object({
        choiceQuestion: z.object({
          options: z.array(z.object({
            goToAction: z.enum([
              "GO_TO_ACTION_UNSPECIFIED",
              "NEXT_SECTION",
              "RESTART_FORM",
              "SUBMIT_FORM",
            ]).describe("Section navigation type.").optional(),
            goToSectionId: z.string().describe(
              "Item ID of section header to go to.",
            ).optional(),
            image: z.object({
              altText: z.string().describe(
                "A description of the image that is shown on hover and read by screenreaders.",
              ).optional(),
              contentUri: z.string().describe(
                "Output only. A URI from which you can download the image; this is valid only for a limited time.",
              ).optional(),
              properties: z.object({
                alignment: z.enum([
                  "ALIGNMENT_UNSPECIFIED",
                  "LEFT",
                  "RIGHT",
                  "CENTER",
                ]).describe("Position of the media.").optional(),
                width: z.number().int().describe(
                  "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
                ).optional(),
              }).describe("Properties of the media.").optional(),
              sourceUri: z.string().describe(
                "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
              ).optional(),
            }).describe("Data representing an image.").optional(),
            isOther: z.boolean().describe(
              'Whether the option is "other". Currently only applies to `RADIO` and `CHECKBOX` choice types, but is not allowed in a QuestionGroupItem.',
            ).optional(),
            value: z.string().describe(
              "Required. The choice as presented to the user.",
            ).optional(),
          })).describe(
            "Required. List of options that a respondent must choose from.",
          ).optional(),
          shuffle: z.boolean().describe(
            "Whether the options should be displayed in random order for different instances of the quiz. This is often used to prevent cheating by respondents who might be looking at another respondent's screen, or to address bias in a survey that might be introduced by always putting the same options first or last.",
          ).optional(),
          type: z.enum([
            "CHOICE_TYPE_UNSPECIFIED",
            "RADIO",
            "CHECKBOX",
            "DROP_DOWN",
          ]).describe("Required. The type of choice question.").optional(),
        }).describe("A radio/checkbox/dropdown question.").optional(),
        dateQuestion: z.object({
          includeTime: z.boolean().describe(
            "Whether to include the time as part of the question.",
          ).optional(),
          includeYear: z.boolean().describe(
            "Whether to include the year as part of the question.",
          ).optional(),
        }).describe(
          "A date question. Date questions default to just month + day.",
        ).optional(),
        fileUploadQuestion: z.object({
          folderId: z.string().describe(
            "Required. The ID of the Drive folder where uploaded files are stored.",
          ).optional(),
          maxFileSize: z.string().describe(
            "Maximum number of bytes allowed for any single file uploaded to this question.",
          ).optional(),
          maxFiles: z.number().int().describe(
            "Maximum number of files that can be uploaded for this question in a single response.",
          ).optional(),
          types: z.array(
            z.enum([
              "FILE_TYPE_UNSPECIFIED",
              "ANY",
              "DOCUMENT",
              "PRESENTATION",
              "SPREADSHEET",
              "DRAWING",
              "PDF",
              "IMAGE",
              "VIDEO",
              "AUDIO",
            ]),
          ).describe("File types accepted by this question.").optional(),
        }).describe(
          "A file upload question. The API currently does not support creating file upload questions.",
        ).optional(),
        grading: z.object({
          correctAnswers: z.object({
            answers: z.array(z.object({
              value: z.string().describe(
                "Required. The correct answer value. See the documentation for TextAnswer.value for details on how various value types are formatted.",
              ).optional(),
            })).describe(
              "A list of correct answers. A quiz response can be automatically graded based on these answers. For single-valued questions, a response is marked correct if it matches any value in this list (in other words, multiple correct answers are possible). For multiple-valued (`CHECKBOX`) questions, a response is marked correct if it contains exactly the values in this list.",
            ).optional(),
          }).describe("The answer key for a question.").optional(),
          generalFeedback: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
          pointValue: z.number().int().describe(
            "Required. The maximum number of points a respondent can automatically get for a correct answer. This must not be negative.",
          ).optional(),
          whenRight: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
          whenWrong: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
        }).describe("Grading for a single question").optional(),
        questionId: z.string().describe(
          "Read only. The question ID. On creation, it can be provided but the ID must not be already used in the form. If not provided, a new ID is assigned.",
        ).optional(),
        ratingQuestion: z.object({
          iconType: z.enum([
            "RATING_ICON_TYPE_UNSPECIFIED",
            "STAR",
            "HEART",
            "THUMB_UP",
          ]).describe("Required. The icon type to use for the rating.")
            .optional(),
          ratingScaleLevel: z.number().int().describe(
            "Required. The rating scale level of the rating question.",
          ).optional(),
        }).describe(
          "A rating question. The user has a range of icons to choose from.",
        ).optional(),
        required: z.boolean().describe(
          "Whether the question must be answered in order for a respondent to submit their response.",
        ).optional(),
        rowQuestion: z.object({
          title: z.string().describe(
            "Required. The title for the single row in the QuestionGroupItem.",
          ).optional(),
        }).describe(
          "Configuration for a question that is part of a question group.",
        ).optional(),
        scaleQuestion: z.object({
          high: z.number().int().describe(
            "Required. The highest possible value for the scale.",
          ).optional(),
          highLabel: z.string().describe(
            "The label to display describing the highest point on the scale.",
          ).optional(),
          low: z.number().int().describe(
            "Required. The lowest possible value for the scale.",
          ).optional(),
          lowLabel: z.string().describe(
            "The label to display describing the lowest point on the scale.",
          ).optional(),
        }).describe(
          "A scale question. The user has a range of numeric values to choose from.",
        ).optional(),
        textQuestion: z.object({
          paragraph: z.boolean().describe(
            "Whether the question is a paragraph question or not. If not, the question is a short text question.",
          ).optional(),
        }).describe("A text-based question.").optional(),
        timeQuestion: z.object({
          duration: z.boolean().describe(
            "`true` if the question is about an elapsed time. Otherwise it is about a time of day.",
          ).optional(),
        }).describe("A time question.").optional(),
      })).describe(
        "Required. A list of questions that belong in this question group. A question must only belong to one group. The `kind` of the group may affect what types of questions are allowed.",
      ).optional(),
    }).describe(
      "Defines a question that comprises multiple questions grouped together.",
    ).optional(),
    questionItem: z.object({
      image: z.object({
        altText: z.string().describe(
          "A description of the image that is shown on hover and read by screenreaders.",
        ).optional(),
        contentUri: z.string().describe(
          "Output only. A URI from which you can download the image; this is valid only for a limited time.",
        ).optional(),
        properties: z.object({
          alignment: z.enum([
            "ALIGNMENT_UNSPECIFIED",
            "LEFT",
            "RIGHT",
            "CENTER",
          ]).describe("Position of the media.").optional(),
          width: z.number().int().describe(
            "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
          ).optional(),
        }).describe("Properties of the media.").optional(),
        sourceUri: z.string().describe(
          "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
        ).optional(),
      }).describe("Data representing an image.").optional(),
      question: z.object({
        choiceQuestion: z.object({
          options: z.array(z.object({
            goToAction: z.enum([
              "GO_TO_ACTION_UNSPECIFIED",
              "NEXT_SECTION",
              "RESTART_FORM",
              "SUBMIT_FORM",
            ]).describe("Section navigation type.").optional(),
            goToSectionId: z.string().describe(
              "Item ID of section header to go to.",
            ).optional(),
            image: z.object({
              altText: z.string().describe(
                "A description of the image that is shown on hover and read by screenreaders.",
              ).optional(),
              contentUri: z.string().describe(
                "Output only. A URI from which you can download the image; this is valid only for a limited time.",
              ).optional(),
              properties: z.object({
                alignment: z.enum([
                  "ALIGNMENT_UNSPECIFIED",
                  "LEFT",
                  "RIGHT",
                  "CENTER",
                ]).describe("Position of the media.").optional(),
                width: z.number().int().describe(
                  "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
                ).optional(),
              }).describe("Properties of the media.").optional(),
              sourceUri: z.string().describe(
                "Input only. The source URI is the URI used to insert the image. The source URI can be empty when fetched.",
              ).optional(),
            }).describe("Data representing an image.").optional(),
            isOther: z.boolean().describe(
              'Whether the option is "other". Currently only applies to `RADIO` and `CHECKBOX` choice types, but is not allowed in a QuestionGroupItem.',
            ).optional(),
            value: z.string().describe(
              "Required. The choice as presented to the user.",
            ).optional(),
          })).describe(
            "Required. List of options that a respondent must choose from.",
          ).optional(),
          shuffle: z.boolean().describe(
            "Whether the options should be displayed in random order for different instances of the quiz. This is often used to prevent cheating by respondents who might be looking at another respondent's screen, or to address bias in a survey that might be introduced by always putting the same options first or last.",
          ).optional(),
          type: z.enum([
            "CHOICE_TYPE_UNSPECIFIED",
            "RADIO",
            "CHECKBOX",
            "DROP_DOWN",
          ]).describe("Required. The type of choice question.").optional(),
        }).describe("A radio/checkbox/dropdown question.").optional(),
        dateQuestion: z.object({
          includeTime: z.boolean().describe(
            "Whether to include the time as part of the question.",
          ).optional(),
          includeYear: z.boolean().describe(
            "Whether to include the year as part of the question.",
          ).optional(),
        }).describe(
          "A date question. Date questions default to just month + day.",
        ).optional(),
        fileUploadQuestion: z.object({
          folderId: z.string().describe(
            "Required. The ID of the Drive folder where uploaded files are stored.",
          ).optional(),
          maxFileSize: z.string().describe(
            "Maximum number of bytes allowed for any single file uploaded to this question.",
          ).optional(),
          maxFiles: z.number().int().describe(
            "Maximum number of files that can be uploaded for this question in a single response.",
          ).optional(),
          types: z.array(
            z.enum([
              "FILE_TYPE_UNSPECIFIED",
              "ANY",
              "DOCUMENT",
              "PRESENTATION",
              "SPREADSHEET",
              "DRAWING",
              "PDF",
              "IMAGE",
              "VIDEO",
              "AUDIO",
            ]),
          ).describe("File types accepted by this question.").optional(),
        }).describe(
          "A file upload question. The API currently does not support creating file upload questions.",
        ).optional(),
        grading: z.object({
          correctAnswers: z.object({
            answers: z.array(z.object({
              value: z.string().describe(
                "Required. The correct answer value. See the documentation for TextAnswer.value for details on how various value types are formatted.",
              ).optional(),
            })).describe(
              "A list of correct answers. A quiz response can be automatically graded based on these answers. For single-valued questions, a response is marked correct if it matches any value in this list (in other words, multiple correct answers are possible). For multiple-valued (`CHECKBOX`) questions, a response is marked correct if it contains exactly the values in this list.",
            ).optional(),
          }).describe("The answer key for a question.").optional(),
          generalFeedback: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
          pointValue: z.number().int().describe(
            "Required. The maximum number of points a respondent can automatically get for a correct answer. This must not be negative.",
          ).optional(),
          whenRight: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
          whenWrong: z.object({
            material: z.array(z.object({
              link: z.object({
                displayText: z.string().describe(
                  "Required. Display text for the URI.",
                ).optional(),
                uri: z.string().describe("Required. The URI.").optional(),
              }).describe("Link for text.").optional(),
              video: z.object({
                displayText: z.string().describe(
                  "Required. The display text for the link.",
                ).optional(),
                youtubeUri: z.string().describe("The URI of a YouTube video.")
                  .optional(),
              }).describe("Link to a video.").optional(),
            })).describe(
              "Additional information provided as part of the feedback, often used to point the respondent to more reading and resources.",
            ).optional(),
            text: z.string().describe(
              "Required. The main text of the feedback.",
            ).optional(),
          }).describe(
            "Feedback for a respondent about their response to a question.",
          ).optional(),
        }).describe("Grading for a single question").optional(),
        questionId: z.string().describe(
          "Read only. The question ID. On creation, it can be provided but the ID must not be already used in the form. If not provided, a new ID is assigned.",
        ).optional(),
        ratingQuestion: z.object({
          iconType: z.enum([
            "RATING_ICON_TYPE_UNSPECIFIED",
            "STAR",
            "HEART",
            "THUMB_UP",
          ]).describe("Required. The icon type to use for the rating.")
            .optional(),
          ratingScaleLevel: z.number().int().describe(
            "Required. The rating scale level of the rating question.",
          ).optional(),
        }).describe(
          "A rating question. The user has a range of icons to choose from.",
        ).optional(),
        required: z.boolean().describe(
          "Whether the question must be answered in order for a respondent to submit their response.",
        ).optional(),
        rowQuestion: z.object({
          title: z.string().describe(
            "Required. The title for the single row in the QuestionGroupItem.",
          ).optional(),
        }).describe(
          "Configuration for a question that is part of a question group.",
        ).optional(),
        scaleQuestion: z.object({
          high: z.number().int().describe(
            "Required. The highest possible value for the scale.",
          ).optional(),
          highLabel: z.string().describe(
            "The label to display describing the highest point on the scale.",
          ).optional(),
          low: z.number().int().describe(
            "Required. The lowest possible value for the scale.",
          ).optional(),
          lowLabel: z.string().describe(
            "The label to display describing the lowest point on the scale.",
          ).optional(),
        }).describe(
          "A scale question. The user has a range of numeric values to choose from.",
        ).optional(),
        textQuestion: z.object({
          paragraph: z.boolean().describe(
            "Whether the question is a paragraph question or not. If not, the question is a short text question.",
          ).optional(),
        }).describe("A text-based question.").optional(),
        timeQuestion: z.object({
          duration: z.boolean().describe(
            "`true` if the question is about an elapsed time. Otherwise it is about a time of day.",
          ).optional(),
        }).describe("A time question.").optional(),
      }).describe(
        "Any question. The specific type of question is known by its `kind`.",
      ).optional(),
    }).describe("A form item containing a single question.").optional(),
    textItem: z.object({}).describe("A text item.").optional(),
    title: z.string().describe("The title of the item.").optional(),
    videoItem: z.object({
      caption: z.string().describe("The text displayed below the video.")
        .optional(),
      video: z.object({
        properties: z.object({
          alignment: z.enum([
            "ALIGNMENT_UNSPECIFIED",
            "LEFT",
            "RIGHT",
            "CENTER",
          ]).describe("Position of the media.").optional(),
          width: z.number().int().describe(
            "The width of the media in pixels. When the media is displayed, it is scaled to the smaller of this value or the width of the displayed form. The original aspect ratio of the media is preserved. If a width is not specified when the media is added to the form, it is set to the width of the media source. Width must be between 0 and 740, inclusive. Setting width to 0 or unspecified is only permitted when updating the media source.",
          ).optional(),
        }).describe("Properties of the media.").optional(),
        youtubeUri: z.string().describe("Required. A YouTube URI.").optional(),
      }).describe("Data representing a video.").optional(),
    }).describe("An item containing a video.").optional(),
  })).describe(
    "Required. A list of the form's items, which can include section headers, questions, embedded media, etc.",
  ).optional(),
  publishSettings: z.object({
    publishState: z.object({
      isAcceptingResponses: z.boolean().describe(
        "Required. Whether the form accepts responses. If `is_published` is set to `false`, this field is forced to `false`.",
      ).optional(),
      isPublished: z.boolean().describe(
        "Required. Whether the form is published and visible to others.",
      ).optional(),
    }).describe("The publishing state of a form.").optional(),
  }).describe("The publishing settings of a form.").optional(),
  settings: z.object({
    emailCollectionType: z.enum([
      "EMAIL_COLLECTION_TYPE_UNSPECIFIED",
      "DO_NOT_COLLECT",
      "VERIFIED",
      "RESPONDER_INPUT",
    ]).describe(
      "Optional. The setting that determines whether the form collects email addresses from respondents.",
    ).optional(),
    quizSettings: z.object({
      isQuiz: z.boolean().describe(
        "Whether this form is a quiz or not. When true, responses are graded based on question Grading. Upon setting to false, all question Grading is deleted.",
      ).optional(),
    }).describe(
      "Settings related to quiz forms and grading. These must be updated with the UpdateSettingsRequest.",
    ).optional(),
  }).describe("A form's settings.").optional(),
  unpublished: z.string().describe(
    "Optional. Whether the form is unpublished. If set to `true`, the form doesn't accept responses. If set to `false` or unset, the form is published and accepts responses.",
  ).optional(),
});

export const model = {
  type: "@swamp/gcp/forms/forms",
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
        "A Google Forms document. A form is created in Drive, and deleting a form or c...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a forms",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["info"] !== undefined) body["info"] = g["info"];
        if (g["items"] !== undefined) body["items"] = g["items"];
        if (g["publishSettings"] !== undefined) {
          body["publishSettings"] = g["publishSettings"];
        }
        if (g["settings"] !== undefined) body["settings"] = g["settings"];
        if (g["unpublished"] !== undefined) {
          body["unpublished"] = g["unpublished"];
        }
        if (g["name"] !== undefined) params["formId"] = String(g["name"]);
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
      description: "Get a forms",
      arguments: z.object({
        identifier: z.string().describe("The name of the forms"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["formId"] = args.identifier;
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
    sync: {
      description: "Sync forms state from GCP",
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
          params["formId"] = identifier;
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        includeFormInResponse: z.any().optional(),
        requests: z.any().optional(),
        writeControl: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["formId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["includeFormInResponse"] !== undefined) {
          body["includeFormInResponse"] = args["includeFormInResponse"];
        }
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        if (args["writeControl"] !== undefined) {
          body["writeControl"] = args["writeControl"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "forms.forms.batchUpdate",
            "path": "v1/forms/{formId}:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["formId"],
            "parameters": {
              "formId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_publish_settings: {
      description: "set publish settings",
      arguments: z.object({
        publishSettings: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["formId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["publishSettings"] !== undefined) {
          body["publishSettings"] = args["publishSettings"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "forms.forms.setPublishSettings",
            "path": "v1/forms/{formId}:setPublishSettings",
            "httpMethod": "POST",
            "parameterOrder": ["formId"],
            "parameters": {
              "formId": { "location": "path", "required": true },
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
