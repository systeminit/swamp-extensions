// Auto-generated extension model for @swamp/aws/quicksight/dashboard
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

import { z } from "zod";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

export const StringParameterSchema = z.object({
  Values: z.array(z.string()).describe("The values of a string parameter."),
  Name: z.string().regex(new RegExp("\\S")).describe(
    "A display name for a string parameter.",
  ),
});

export const DecimalParameterSchema = z.object({
  Values: z.array(z.number()).describe("The values for the decimal parameter."),
  Name: z.string().regex(new RegExp("\\S")).describe(
    "A display name for the decimal parameter.",
  ),
});

export const IntegerParameterSchema = z.object({
  Values: z.array(z.number()).describe("The values for the integer parameter."),
  Name: z.string().regex(new RegExp("\\S")).describe(
    "The name of the integer parameter.",
  ),
});

export const DateTimeParameterSchema = z.object({
  Values: z.array(z.string()).describe(
    "The values for the date-time parameter.",
  ),
  Name: z.string().regex(new RegExp("\\S")).describe(
    "A display name for the date-time parameter.",
  ),
});

export const DataSetReferenceSchema = z.object({
  DataSetArn: z.string().describe("Dataset Amazon Resource Name (ARN)."),
  DataSetPlaceholder: z.string().regex(new RegExp("\\S")).describe(
    "Dataset placeholder.",
  ),
});

export const DashboardSourceTemplateSchema = z.object({
  DataSetReferences: z.array(DataSetReferenceSchema).describe(
    "Dataset references.",
  ),
});

export const AssetOptionsSchema = z.object({
  Timezone: z.string().optional(),
  WeekStart: z.enum([
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ]).optional(),
  QBusinessInsightsStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
  ExcludedDataSetArns: z.array(z.string()).optional(),
});

export const ColumnIdentifierSchema = z.object({
  ColumnName: z.string().min(1).max(127),
  DataSetIdentifier: z.string().min(1).max(2048),
});

export const CustomFilterListConfigurationSchema = z.object({
  CategoryValues: z.array(z.string().min(0).max(512)).optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  MatchOperator: z.enum([
    "EQUALS",
    "DOES_NOT_EQUAL",
    "CONTAINS",
    "DOES_NOT_CONTAIN",
    "STARTS_WITH",
    "ENDS_WITH",
  ]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
});

export const CustomFilterConfigurationSchema = z.object({
  CategoryValue: z.string().min(0).max(512).optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  MatchOperator: z.enum([
    "EQUALS",
    "DOES_NOT_EQUAL",
    "CONTAINS",
    "DOES_NOT_CONTAIN",
    "STARTS_WITH",
    "ENDS_WITH",
  ]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
});

export const FilterListConfigurationSchema = z.object({
  CategoryValues: z.array(z.string().min(0).max(512)).optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]).optional(),
  MatchOperator: z.enum([
    "EQUALS",
    "DOES_NOT_EQUAL",
    "CONTAINS",
    "DOES_NOT_CONTAIN",
    "STARTS_WITH",
    "ENDS_WITH",
  ]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
});

export const CategoryFilterConfigurationSchema = z.object({
  CustomFilterListConfiguration: CustomFilterListConfigurationSchema.optional(),
  CustomFilterConfiguration: CustomFilterConfigurationSchema.optional(),
  FilterListConfiguration: FilterListConfigurationSchema.optional(),
});

export const FontSizeSchema = z.object({
  Relative: z.enum(["EXTRA_SMALL", "SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"])
    .optional(),
  Absolute: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

export const FontWeightSchema = z.object({
  Name: z.enum(["NORMAL", "BOLD"]).optional(),
});

export const FontConfigurationSchema = z.object({
  FontFamily: z.string().optional(),
  FontStyle: z.enum(["NORMAL", "ITALIC"]).optional(),
  FontSize: FontSizeSchema.optional(),
  FontDecoration: z.enum(["UNDERLINE", "NONE"]).optional(),
  FontColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  FontWeight: FontWeightSchema.optional(),
});

export const LabelOptionsSchema = z.object({
  CustomLabel: z.string().optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
});

export const SheetControlInfoIconLabelOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  InfoIconText: z.string().min(1).max(100).optional(),
});

export const SliderControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

export const DefaultSliderControlOptionsSchema = z.object({
  Type: z.enum(["SINGLE_POINT", "RANGE"]).optional(),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsSchema.optional(),
  MaximumValue: z.number(),
  MinimumValue: z.number(),
});

export const RelativeDateTimeControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
  DateTimeFormat: z.string().min(1).max(128).optional(),
});

export const DefaultRelativeDateTimeControlOptionsSchema = z.object({
  DisplayOptions: RelativeDateTimeControlDisplayOptionsSchema.optional(),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
});

export const TextControlPlaceholderOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const TextFieldControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  PlaceholderOptions: TextControlPlaceholderOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

export const DefaultTextFieldControlOptionsSchema = z.object({
  DisplayOptions: TextFieldControlDisplayOptionsSchema.optional(),
});

export const TextAreaControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  PlaceholderOptions: TextControlPlaceholderOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

export const DefaultTextAreaControlOptionsSchema = z.object({
  Delimiter: z.string().min(1).max(2048).optional(),
  DisplayOptions: TextAreaControlDisplayOptionsSchema.optional(),
});

export const ListControlSelectAllOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const DropDownControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  SelectAllOptions: ListControlSelectAllOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

export const FilterSelectableValuesSchema = z.object({
  Values: z.array(z.string()).optional(),
});

export const DefaultFilterDropDownControlOptionsSchema = z.object({
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: DropDownControlDisplayOptionsSchema.optional(),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SelectableValues: FilterSelectableValuesSchema.optional(),
});

export const DateTimePickerControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
  HelperTextVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  DateIconVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  DateTimeFormat: z.string().min(1).max(128).optional(),
});

export const DefaultDateTimePickerControlOptionsSchema = z.object({
  Type: z.enum(["SINGLE_VALUED", "DATE_RANGE"]).optional(),
  DisplayOptions: DateTimePickerControlDisplayOptionsSchema.optional(),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
});

export const ListControlSearchOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const ListControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  SearchOptions: ListControlSearchOptionsSchema.optional(),
  SelectAllOptions: ListControlSelectAllOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

export const DefaultFilterListControlOptionsSchema = z.object({
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: ListControlDisplayOptionsSchema.optional(),
  SelectableValues: FilterSelectableValuesSchema.optional(),
});

export const DefaultFilterControlOptionsSchema = z.object({
  DefaultSliderOptions: DefaultSliderControlOptionsSchema.optional(),
  DefaultRelativeDateTimeOptions: DefaultRelativeDateTimeControlOptionsSchema
    .optional(),
  DefaultTextFieldOptions: DefaultTextFieldControlOptionsSchema.optional(),
  DefaultTextAreaOptions: DefaultTextAreaControlOptionsSchema.optional(),
  DefaultDropdownOptions: DefaultFilterDropDownControlOptionsSchema.optional(),
  DefaultDateTimePickerOptions: DefaultDateTimePickerControlOptionsSchema
    .optional(),
  DefaultListOptions: DefaultFilterListControlOptionsSchema.optional(),
});

export const DefaultFilterControlConfigurationSchema = z.object({
  ControlOptions: DefaultFilterControlOptionsSchema,
  Title: z.string().min(1).max(2048),
});

export const CategoryInnerFilterSchema = z.object({
  Configuration: CategoryFilterConfigurationSchema,
  Column: ColumnIdentifierSchema,
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
});

export const InnerFilterSchema = z.object({
  CategoryInnerFilter: CategoryInnerFilterSchema.optional(),
});

export const NestedFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  InnerFilter: InnerFilterSchema,
  IncludeInnerSet: z.boolean(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const AttributeAggregationFunctionSchema = z.object({
  SimpleAttributeAggregation: z.enum(["UNIQUE_VALUE"]).optional(),
  ValueForMultipleValues: z.string().optional(),
});

export const PercentileAggregationSchema = z.object({
  PercentileValue: z.number().min(0).max(100).optional(),
});

export const NumericalAggregationFunctionSchema = z.object({
  PercentileAggregation: PercentileAggregationSchema.optional(),
  SimpleNumericalAggregation: z.enum([
    "SUM",
    "AVERAGE",
    "MIN",
    "MAX",
    "COUNT",
    "DISTINCT_COUNT",
    "VAR",
    "VARP",
    "STDEV",
    "STDEVP",
    "MEDIAN",
  ]).optional(),
});

export const AggregationFunctionSchema = z.object({
  AttributeAggregationFunction: AttributeAggregationFunctionSchema.optional(),
  DateAggregationFunction: z.enum(["COUNT", "DISTINCT_COUNT", "MIN", "MAX"])
    .optional(),
  NumericalAggregationFunction: NumericalAggregationFunctionSchema.optional(),
  CategoricalAggregationFunction: z.enum(["COUNT", "DISTINCT_COUNT"])
    .optional(),
});

export const NumericEqualityFilterSchema = z.object({
  AggregationFunction: AggregationFunctionSchema.optional(),
  Column: ColumnIdentifierSchema,
  Value: z.number().optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  MatchOperator: z.enum(["EQUALS", "DOES_NOT_EQUAL"]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const NumericRangeFilterValueSchema = z.object({
  StaticValue: z.number().optional(),
  Parameter: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
});

export const NumericRangeFilterSchema = z.object({
  AggregationFunction: AggregationFunctionSchema.optional(),
  Column: ColumnIdentifierSchema,
  IncludeMaximum: z.boolean().optional(),
  RangeMinimum: NumericRangeFilterValueSchema.optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  RangeMaximum: NumericRangeFilterValueSchema.optional(),
  IncludeMinimum: z.boolean().optional(),
});

export const RollingDateConfigurationSchema = z.object({
  Expression: z.string().min(1).max(4096),
  DataSetIdentifier: z.string().min(1).max(2048).optional(),
});

export const TimeRangeFilterValueSchema = z.object({
  RollingDate: RollingDateConfigurationSchema.optional(),
  StaticValue: z.string().optional(),
  Parameter: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
});

export const ExcludePeriodConfigurationSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Amount: z.number(),
  Granularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]),
});

export const TimeRangeFilterSchema = z.object({
  RangeMinimumValue: TimeRangeFilterValueSchema.optional(),
  Column: ColumnIdentifierSchema,
  RangeMaximumValue: TimeRangeFilterValueSchema.optional(),
  IncludeMaximum: z.boolean().optional(),
  TimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  IncludeMinimum: z.boolean().optional(),
  ExcludePeriodConfiguration: ExcludePeriodConfigurationSchema.optional(),
});

export const AnchorDateConfigurationSchema = z.object({
  AnchorOption: z.enum(["NOW"]).optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
});

export const RelativeDatesFilterSchema = z.object({
  RelativeDateValue: z.number().optional(),
  Column: ColumnIdentifierSchema,
  RelativeDateType: z.enum(["PREVIOUS", "THIS", "LAST", "NOW", "NEXT"]),
  TimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  AnchorDateConfiguration: AnchorDateConfigurationSchema,
  MinimumGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
  ExcludePeriodConfiguration: ExcludePeriodConfigurationSchema.optional(),
});

export const AggregationSortConfigurationSchema = z.object({
  AggregationFunction: AggregationFunctionSchema.optional(),
  SortDirection: z.enum(["ASC", "DESC"]),
  Column: ColumnIdentifierSchema,
});

export const TopBottomFilterSchema = z.object({
  AggregationSortConfigurations: z.array(AggregationSortConfigurationSchema),
  Column: ColumnIdentifierSchema,
  TimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  Limit: z.number().optional(),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const TimeEqualityFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  RollingDate: RollingDateConfigurationSchema.optional(),
  Value: z.string().optional(),
  TimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const CategoryFilterSchema = z.object({
  Configuration: CategoryFilterConfigurationSchema,
  Column: ColumnIdentifierSchema,
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const FilterSchema = z.object({
  NestedFilter: NestedFilterSchema.optional(),
  NumericEqualityFilter: NumericEqualityFilterSchema.optional(),
  NumericRangeFilter: NumericRangeFilterSchema.optional(),
  TimeRangeFilter: TimeRangeFilterSchema.optional(),
  RelativeDatesFilter: RelativeDatesFilterSchema.optional(),
  TopBottomFilter: TopBottomFilterSchema.optional(),
  TimeEqualityFilter: TimeEqualityFilterSchema.optional(),
  CategoryFilter: CategoryFilterSchema.optional(),
});

export const SheetVisualScopingConfigurationSchema = z.object({
  Scope: z.enum(["ALL_VISUALS", "SELECTED_VISUALS"]),
  SheetId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  VisualIds: z.array(
    z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ).optional(),
});

export const SelectedSheetsFilterScopeConfigurationSchema = z.object({
  SheetVisualScopingConfigurations: z.array(
    SheetVisualScopingConfigurationSchema,
  ).optional(),
});

export const FilterScopeConfigurationSchema = z.object({
  AllSheets: z.string().optional(),
  SelectedSheets: SelectedSheetsFilterScopeConfigurationSchema.optional(),
});

export const FilterGroupSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Filters: z.array(FilterSchema),
  CrossDataset: z.enum(["ALL_DATASETS", "SINGLE_DATASET"]),
  ScopeConfiguration: FilterScopeConfigurationSchema,
  FilterGroupId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const StaticFileUrlSourceOptionsSchema = z.object({
  Url: z.string(),
});

export const StaticFileS3SourceOptionsSchema = z.object({
  BucketName: z.string(),
  ObjectKey: z.string(),
  Region: z.string(),
});

export const StaticFileSourceSchema = z.object({
  UrlOptions: StaticFileUrlSourceOptionsSchema.optional(),
  S3Options: StaticFileS3SourceOptionsSchema.optional(),
});

export const ImageStaticFileSchema = z.object({
  StaticFileId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Source: StaticFileSourceSchema.optional(),
});

export const SpatialStaticFileSchema = z.object({
  StaticFileId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Source: StaticFileSourceSchema.optional(),
});

export const StaticFileSchema = z.object({
  ImageStaticFile: ImageStaticFileSchema.optional(),
  SpatialStaticFile: SpatialStaticFileSchema.optional(),
});

export const CalculatedFieldSchema = z.object({
  Expression: z.string().min(1).max(32000),
  DataSetIdentifier: z.string().min(1).max(2048),
  Name: z.string().min(1).max(127),
});

export const DataSetIdentifierDeclarationSchema = z.object({
  Identifier: z.string().min(1).max(2048),
  DataSetArn: z.string(),
});

export const NegativeValueConfigurationSchema = z.object({
  DisplayMode: z.enum(["POSITIVE", "NEGATIVE"]),
});

export const DecimalPlacesConfigurationSchema = z.object({
  DecimalPlaces: z.number().min(0).max(20),
});

export const NullValueFormatConfigurationSchema = z.object({
  NullString: z.string().min(1).max(128),
});

export const ThousandSeparatorOptionsSchema = z.object({
  Symbol: z.enum(["COMMA", "DOT", "SPACE"]).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  GroupingStyle: z.enum(["DEFAULT", "LAKHS"]).optional(),
});

export const NumericSeparatorConfigurationSchema = z.object({
  DecimalSeparator: z.enum(["COMMA", "DOT", "SPACE"]).optional(),
  ThousandsSeparator: ThousandSeparatorOptionsSchema.optional(),
});

export const NumberDisplayFormatConfigurationSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationSchema.optional(),
  DecimalPlacesConfiguration: DecimalPlacesConfigurationSchema.optional(),
  NumberScale: z.enum([
    "NONE",
    "AUTO",
    "THOUSANDS",
    "MILLIONS",
    "BILLIONS",
    "TRILLIONS",
    "LAKHS",
    "CRORES",
  ]).optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
  Suffix: z.string().min(1).max(128).optional(),
  SeparatorConfiguration: NumericSeparatorConfigurationSchema.optional(),
  Prefix: z.string().min(1).max(128).optional(),
});

export const CurrencyDisplayFormatConfigurationSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationSchema.optional(),
  DecimalPlacesConfiguration: DecimalPlacesConfigurationSchema.optional(),
  NumberScale: z.enum([
    "NONE",
    "AUTO",
    "THOUSANDS",
    "MILLIONS",
    "BILLIONS",
    "TRILLIONS",
    "LAKHS",
    "CRORES",
  ]).optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
  Suffix: z.string().min(1).max(128).optional(),
  SeparatorConfiguration: NumericSeparatorConfigurationSchema.optional(),
  Symbol: z.string().regex(new RegExp("^[A-Z]{3}$")).optional(),
  Prefix: z.string().min(1).max(128).optional(),
});

export const PercentageDisplayFormatConfigurationSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationSchema.optional(),
  DecimalPlacesConfiguration: DecimalPlacesConfigurationSchema.optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
  Suffix: z.string().min(1).max(128).optional(),
  SeparatorConfiguration: NumericSeparatorConfigurationSchema.optional(),
  Prefix: z.string().min(1).max(128).optional(),
});

export const NumericFormatConfigurationSchema = z.object({
  NumberDisplayFormatConfiguration: NumberDisplayFormatConfigurationSchema
    .optional(),
  CurrencyDisplayFormatConfiguration: CurrencyDisplayFormatConfigurationSchema
    .optional(),
  PercentageDisplayFormatConfiguration:
    PercentageDisplayFormatConfigurationSchema.optional(),
});

export const NumberFormatConfigurationSchema = z.object({
  FormatConfiguration: NumericFormatConfigurationSchema.optional(),
});

export const DateTimeFormatConfigurationSchema = z.object({
  NumericFormatConfiguration: NumericFormatConfigurationSchema.optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
  DateTimeFormat: z.string().min(1).max(128).optional(),
});

export const StringFormatConfigurationSchema = z.object({
  NumericFormatConfiguration: NumericFormatConfigurationSchema.optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
});

export const FormatConfigurationSchema = z.object({
  NumberFormatConfiguration: NumberFormatConfigurationSchema.optional(),
  DateTimeFormatConfiguration: DateTimeFormatConfigurationSchema.optional(),
  StringFormatConfiguration: StringFormatConfigurationSchema.optional(),
});

export const CustomColorSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")),
  FieldValue: z.string().min(0).max(2048).optional(),
  SpecialValue: z.enum(["EMPTY", "NULL", "OTHER"]).optional(),
});

export const ColorsConfigurationSchema = z.object({
  CustomColors: z.array(CustomColorSchema).optional(),
});

export const ColumnConfigurationSchema = z.object({
  Role: z.enum(["DIMENSION", "MEASURE"]).optional(),
  FormatConfiguration: FormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  ColorsConfiguration: ColorsConfigurationSchema.optional(),
});

export const FreeFormLayoutScreenCanvasSizeOptionsSchema = z.object({
  OptimizedViewPortWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ),
});

export const FreeFormLayoutCanvasSizeOptionsSchema = z.object({
  ScreenCanvasSizeOptions: FreeFormLayoutScreenCanvasSizeOptionsSchema
    .optional(),
});

export const DefaultFreeFormLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: FreeFormLayoutCanvasSizeOptionsSchema,
});

export const GridLayoutScreenCanvasSizeOptionsSchema = z.object({
  OptimizedViewPortWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  ResizeOption: z.enum(["FIXED", "RESPONSIVE"]),
});

export const GridLayoutCanvasSizeOptionsSchema = z.object({
  ScreenCanvasSizeOptions: GridLayoutScreenCanvasSizeOptionsSchema.optional(),
});

export const DefaultGridLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: GridLayoutCanvasSizeOptionsSchema,
});

export const DefaultInteractiveLayoutConfigurationSchema = z.object({
  FreeForm: DefaultFreeFormLayoutConfigurationSchema.optional(),
  Grid: DefaultGridLayoutConfigurationSchema.optional(),
});

export const SpacingSchema = z.object({
  Left: z.string().describe(
    "String based length that is composed of value and unit",
  ).optional(),
  Top: z.string().describe(
    "String based length that is composed of value and unit",
  ).optional(),
  Right: z.string().describe(
    "String based length that is composed of value and unit",
  ).optional(),
  Bottom: z.string().describe(
    "String based length that is composed of value and unit",
  ).optional(),
});

export const SectionBasedLayoutPaperCanvasSizeOptionsSchema = z.object({
  PaperMargin: SpacingSchema.optional(),
  PaperSize: z.enum([
    "US_LETTER",
    "US_LEGAL",
    "US_TABLOID_LEDGER",
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "JIS_B4",
    "JIS_B5",
  ]).optional(),
  PaperOrientation: z.enum(["PORTRAIT", "LANDSCAPE"]).optional(),
});

export const SectionBasedLayoutCanvasSizeOptionsSchema = z.object({
  PaperCanvasSizeOptions: SectionBasedLayoutPaperCanvasSizeOptionsSchema
    .optional(),
});

export const DefaultSectionBasedLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptionsSchema,
});

export const DefaultPaginatedLayoutConfigurationSchema = z.object({
  SectionBased: DefaultSectionBasedLayoutConfigurationSchema.optional(),
});

export const DefaultNewSheetConfigurationSchema = z.object({
  SheetContentType: z.enum(["PAGINATED", "INTERACTIVE"]).optional(),
  InteractiveLayoutConfiguration: DefaultInteractiveLayoutConfigurationSchema
    .optional(),
  PaginatedLayoutConfiguration: DefaultPaginatedLayoutConfigurationSchema
    .optional(),
});

export const AnalysisDefaultsSchema = z.object({
  DefaultNewSheetConfiguration: DefaultNewSheetConfigurationSchema,
});

export const ParameterSliderControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Title: z.string().min(1).max(2048),
  MaximumValue: z.number(),
  MinimumValue: z.number(),
});

export const ParameterTextAreaControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  Delimiter: z.string().min(1).max(2048).optional(),
  DisplayOptions: TextAreaControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Title: z.string().min(1).max(2048),
});

export const CascadingControlSourceSchema = z.object({
  SourceSheetControlId: z.string().optional(),
  ColumnToMatch: ColumnIdentifierSchema.optional(),
});

export const CascadingControlConfigurationSchema = z.object({
  SourceControls: z.array(CascadingControlSourceSchema).optional(),
});

export const ParameterSelectableValuesSchema = z.object({
  LinkToDataSetColumn: ColumnIdentifierSchema.optional(),
  Values: z.array(z.string()).optional(),
});

export const ParameterDropDownControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: DropDownControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  Title: z.string().min(1).max(2048),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SelectableValues: ParameterSelectableValuesSchema.optional(),
});

export const ParameterTextFieldControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  DisplayOptions: TextFieldControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Title: z.string().min(1).max(2048),
});

export const ParameterListControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: ListControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  Title: z.string().min(1).max(2048),
  SelectableValues: ParameterSelectableValuesSchema.optional(),
});

export const ParameterDateTimePickerControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  DisplayOptions: DateTimePickerControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Title: z.string().min(1).max(2048),
});

export const ParameterControlSchema = z.object({
  Slider: ParameterSliderControlSchema.optional(),
  TextArea: ParameterTextAreaControlSchema.optional(),
  Dropdown: ParameterDropDownControlSchema.optional(),
  TextField: ParameterTextFieldControlSchema.optional(),
  List: ParameterListControlSchema.optional(),
  DateTimePicker: ParameterDateTimePickerControlSchema.optional(),
});

export const LocalNavigationConfigurationSchema = z.object({
  TargetSheetId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const CustomActionNavigationOperationSchema = z.object({
  LocalNavigationConfiguration: LocalNavigationConfigurationSchema.optional(),
});

export const CustomParameterValuesSchema = z.object({
  DecimalValues: z.array(z.number()).optional(),
  IntegerValues: z.array(z.number()).optional(),
  StringValues: z.array(z.string()).optional(),
  DateTimeValues: z.array(z.string()).optional(),
});

export const CustomValuesConfigurationSchema = z.object({
  IncludeNullValue: z.boolean().optional(),
  CustomValues: CustomParameterValuesSchema,
});

export const DestinationParameterValueConfigurationSchema = z.object({
  CustomValuesConfiguration: CustomValuesConfigurationSchema.optional(),
  SourceParameterName: z.string().optional(),
  SelectAllValueOptions: z.enum(["ALL_VALUES"]).optional(),
  SourceField: z.string().min(1).max(512).optional(),
  SourceColumn: ColumnIdentifierSchema.optional(),
});

export const SetParameterValueConfigurationSchema = z.object({
  DestinationParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Value: DestinationParameterValueConfigurationSchema,
});

export const CustomActionSetParametersOperationSchema = z.object({
  ParameterValueConfigurations: z.array(SetParameterValueConfigurationSchema),
});

export const CustomActionURLOperationSchema = z.object({
  URLTemplate: z.string().min(1).max(2048),
  URLTarget: z.enum(["NEW_TAB", "NEW_WINDOW", "SAME_TAB"]),
});

export const ImageCustomActionOperationSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationSchema.optional(),
  SetParametersOperation: CustomActionSetParametersOperationSchema.optional(),
  URLOperation: CustomActionURLOperationSchema.optional(),
});

export const ImageCustomActionSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Trigger: z.enum(["CLICK", "MENU"]),
  CustomActionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().min(1).max(256),
  ActionOperations: z.array(ImageCustomActionOperationSchema),
});

export const SheetImageTooltipTextSchema = z.object({
  PlainText: z.string().min(1).max(1024).optional(),
});

export const SheetImageTooltipConfigurationSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  TooltipText: SheetImageTooltipTextSchema.optional(),
});

export const SheetImageScalingConfigurationSchema = z.object({
  ScalingType: z.enum([
    "SCALE_TO_WIDTH",
    "SCALE_TO_HEIGHT",
    "SCALE_TO_CONTAINER",
    "SCALE_NONE",
  ]).optional(),
});

export const ImageMenuOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const ImageInteractionOptionsSchema = z.object({
  ImageMenuOption: ImageMenuOptionSchema.optional(),
});

export const SheetImageStaticFileSourceSchema = z.object({
  StaticFileId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const SheetImageSourceSchema = z.object({
  SheetImageStaticFileSource: SheetImageStaticFileSourceSchema.optional(),
});

export const SheetImageSchema = z.object({
  Actions: z.array(ImageCustomActionSchema).optional(),
  SheetImageId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Tooltip: SheetImageTooltipConfigurationSchema.optional(),
  Scaling: SheetImageScalingConfigurationSchema.optional(),
  Interactions: ImageInteractionOptionsSchema.optional(),
  Source: SheetImageSourceSchema,
  ImageContentAltText: z.string().min(1).max(1024).optional(),
});

export const GridLayoutElementBorderStyleSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Width: z.string().min(0).max(50).describe(
    "String to encapsulate the most generic way Width can be formatted with whatever units (px, em etc)",
  ).optional(),
});

export const LoadingAnimationSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const GridLayoutElementBackgroundStyleSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const GridLayoutElementSchema = z.object({
  ElementType: z.enum([
    "VISUAL",
    "FILTER_CONTROL",
    "PARAMETER_CONTROL",
    "TEXT_BOX",
    "IMAGE",
  ]),
  ColumnSpan: z.number().min(1).max(36),
  ColumnIndex: z.number().min(0).max(35).optional(),
  RowIndex: z.number().min(0).max(9009).optional(),
  BorderStyle: GridLayoutElementBorderStyleSchema.optional(),
  BorderRadius: z.string().min(0).max(50).optional(),
  RowSpan: z.number().min(1).max(21),
  Padding: z.string().min(0).max(200).optional(),
  LoadingAnimation: LoadingAnimationSchema.optional(),
  BackgroundStyle: GridLayoutElementBackgroundStyleSchema.optional(),
  ElementId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  SelectedBorderStyle: GridLayoutElementBorderStyleSchema.optional(),
});

export const GridLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: GridLayoutCanvasSizeOptionsSchema.optional(),
  Elements: z.array(GridLayoutElementSchema),
});

export const SheetControlLayoutConfigurationSchema = z.object({
  GridLayout: GridLayoutConfigurationSchema.optional(),
});

export const SheetControlLayoutSchema = z.object({
  Configuration: SheetControlLayoutConfigurationSchema,
});

export const SheetTextBoxSchema = z.object({
  SheetTextBoxId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Content: z.string().min(0).max(150000).optional(),
});

export const FreeFormLayoutElementBorderStyleSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Width: z.string().min(0).max(50).describe(
    "String to encapsulate the most generic way Width can be formatted with whatever units (px, em etc)",
  ).optional(),
});

export const SheetElementConfigurationOverridesSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const SheetElementRenderingRuleSchema = z.object({
  Expression: z.string().min(1).max(4096),
  ConfigurationOverrides: SheetElementConfigurationOverridesSchema,
});

export const FreeFormLayoutElementBackgroundStyleSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const FreeFormLayoutElementSchema = z.object({
  ElementType: z.enum([
    "VISUAL",
    "FILTER_CONTROL",
    "PARAMETER_CONTROL",
    "TEXT_BOX",
    "IMAGE",
  ]),
  BorderStyle: FreeFormLayoutElementBorderStyleSchema.optional(),
  BorderRadius: z.string().min(0).max(50).optional(),
  RenderingRules: z.array(SheetElementRenderingRuleSchema).optional(),
  YAxisLocation: z.string().describe(
    "String based length that is composed of value and unit in px with Integer.MAX_VALUE as maximum value",
  ),
  BackgroundStyle: FreeFormLayoutElementBackgroundStyleSchema.optional(),
  XAxisLocation: z.string().describe(
    "String based length that is composed of value and unit in px",
  ),
  Padding: z.string().min(0).max(200).optional(),
  Height: z.string().describe(
    "String based length that is composed of value and unit in px",
  ),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LoadingAnimation: LoadingAnimationSchema.optional(),
  Width: z.string().describe(
    "String based length that is composed of value and unit in px",
  ),
  ElementId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  SelectedBorderStyle: FreeFormLayoutElementBorderStyleSchema.optional(),
});

export const FreeFormLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: FreeFormLayoutCanvasSizeOptionsSchema.optional(),
  Elements: z.array(FreeFormLayoutElementSchema),
});

export const FreeFormSectionLayoutConfigurationSchema = z.object({
  Elements: z.array(FreeFormLayoutElementSchema),
});

export const SectionLayoutConfigurationSchema = z.object({
  FreeFormLayout: FreeFormSectionLayoutConfigurationSchema,
});

export const SectionStyleSchema = z.object({
  Padding: SpacingSchema.optional(),
  Height: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

export const HeaderFooterSectionConfigurationSchema = z.object({
  Layout: SectionLayoutConfigurationSchema,
  Style: SectionStyleSchema.optional(),
  SectionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const BodySectionContentSchema = z.object({
  Layout: SectionLayoutConfigurationSchema.optional(),
});

export const SectionAfterPageBreakSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const SectionPageBreakConfigurationSchema = z.object({
  After: SectionAfterPageBreakSchema.optional(),
});

export const ColumnSortSchema = z.object({
  AggregationFunction: AggregationFunctionSchema.optional(),
  SortBy: ColumnIdentifierSchema,
  Direction: z.enum(["ASC", "DESC"]),
});

export const BodySectionDynamicNumericDimensionConfigurationSchema = z.object({
  Column: ColumnIdentifierSchema,
  SortByMetrics: z.array(ColumnSortSchema).optional(),
  Limit: z.number().min(1).max(1000).optional(),
});

export const BodySectionDynamicCategoryDimensionConfigurationSchema = z.object({
  Column: ColumnIdentifierSchema,
  SortByMetrics: z.array(ColumnSortSchema).optional(),
  Limit: z.number().min(1).max(1000).optional(),
});

export const BodySectionRepeatDimensionConfigurationSchema = z.object({
  DynamicNumericDimensionConfiguration:
    BodySectionDynamicNumericDimensionConfigurationSchema.optional(),
  DynamicCategoryDimensionConfiguration:
    BodySectionDynamicCategoryDimensionConfigurationSchema.optional(),
});

export const BodySectionRepeatPageBreakConfigurationSchema = z.object({
  After: SectionAfterPageBreakSchema.optional(),
});

export const BodySectionRepeatConfigurationSchema = z.object({
  DimensionConfigurations: z.array(
    BodySectionRepeatDimensionConfigurationSchema,
  ).optional(),
  NonRepeatingVisuals: z.array(
    z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ).optional(),
  PageBreakConfiguration: BodySectionRepeatPageBreakConfigurationSchema
    .optional(),
});

export const BodySectionConfigurationSchema = z.object({
  Content: BodySectionContentSchema,
  Style: SectionStyleSchema.optional(),
  PageBreakConfiguration: SectionPageBreakConfigurationSchema.optional(),
  SectionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  RepeatConfiguration: BodySectionRepeatConfigurationSchema.optional(),
});

export const SectionBasedLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptionsSchema,
  FooterSections: z.array(HeaderFooterSectionConfigurationSchema),
  BodySections: z.array(BodySectionConfigurationSchema),
  HeaderSections: z.array(HeaderFooterSectionConfigurationSchema),
});

export const LayoutConfigurationSchema = z.object({
  GridLayout: GridLayoutConfigurationSchema.optional(),
  FreeFormLayout: FreeFormLayoutConfigurationSchema.optional(),
  SectionBasedLayout: SectionBasedLayoutConfigurationSchema.optional(),
});

export const LayoutSchema = z.object({
  Configuration: LayoutConfigurationSchema,
});

export const FilterSliderControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Type: z.enum(["SINGLE_POINT", "RANGE"]).optional(),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  MaximumValue: z.number(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  MinimumValue: z.number(),
});

export const FilterTextAreaControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Delimiter: z.string().min(1).max(2048).optional(),
  DisplayOptions: TextAreaControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const FilterDropDownControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: DropDownControlDisplayOptionsSchema.optional(),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  Title: z.string().min(1).max(2048),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  SelectableValues: FilterSelectableValuesSchema.optional(),
});

export const FilterTextFieldControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  DisplayOptions: TextFieldControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const FilterListControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: ListControlDisplayOptionsSchema.optional(),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  Title: z.string().min(1).max(2048),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  SelectableValues: FilterSelectableValuesSchema.optional(),
});

export const FilterDateTimePickerControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Type: z.enum(["SINGLE_VALUED", "DATE_RANGE"]).optional(),
  DisplayOptions: DateTimePickerControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const FilterRelativeDateTimeControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  DisplayOptions: RelativeDateTimeControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const FilterCrossSheetControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const FilterControlSchema = z.object({
  Slider: FilterSliderControlSchema.optional(),
  TextArea: FilterTextAreaControlSchema.optional(),
  Dropdown: FilterDropDownControlSchema.optional(),
  TextField: FilterTextFieldControlSchema.optional(),
  List: FilterListControlSchema.optional(),
  DateTimePicker: FilterDateTimePickerControlSchema.optional(),
  RelativeDateTime: FilterRelativeDateTimeControlSchema.optional(),
  CrossSheet: FilterCrossSheetControlSchema.optional(),
});

export const LongFormatTextSchema = z.object({
  RichText: z.string().min(1).max(2048).optional(),
  PlainText: z.string().min(1).max(1024).optional(),
});

export const VisualSubtitleLabelOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FormatText: LongFormatTextSchema.optional(),
});

export const ItemsLimitConfigurationSchema = z.object({
  ItemsLimit: z.number().optional(),
  OtherCategories: z.enum(["INCLUDE", "EXCLUDE"]).optional(),
});

export const FieldSortSchema = z.object({
  FieldId: z.string().min(1).max(512),
  Direction: z.enum(["ASC", "DESC"]),
});

export const FieldSortOptionsSchema = z.object({
  FieldSort: FieldSortSchema.optional(),
  ColumnSort: ColumnSortSchema.optional(),
});

export const FunnelChartSortConfigurationSchema = z.object({
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

export const FunnelChartDataLabelOptionsSchema = z.object({
  MeasureLabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Position: z.enum(["INSIDE", "OUTSIDE", "LEFT", "TOP", "BOTTOM", "RIGHT"])
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  CategoryLabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LabelColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  MeasureDataLabelStyle: z.enum([
    "VALUE_ONLY",
    "PERCENTAGE_BY_FIRST_STAGE",
    "PERCENTAGE_BY_PREVIOUS_STAGE",
    "VALUE_AND_PERCENTAGE_BY_FIRST_STAGE",
    "VALUE_AND_PERCENTAGE_BY_PREVIOUS_STAGE",
  ]).optional(),
  LabelFontConfiguration: FontConfigurationSchema.optional(),
});

export const AxisLabelReferenceOptionsSchema = z.object({
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

export const AxisLabelOptionsSchema = z.object({
  CustomLabel: z.string().optional(),
  ApplyTo: AxisLabelReferenceOptionsSchema.optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
});

export const ChartAxisLabelOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  SortIconVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  AxisLabelOptions: z.array(AxisLabelOptionsSchema).optional(),
});

export const DateDimensionFieldSchema = z.object({
  HierarchyId: z.string().min(1).max(512).optional(),
  FormatConfiguration: DateTimeFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
  DateGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
});

export const NumericalDimensionFieldSchema = z.object({
  HierarchyId: z.string().min(1).max(512).optional(),
  FormatConfiguration: NumberFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

export const CategoricalDimensionFieldSchema = z.object({
  HierarchyId: z.string().min(1).max(512).optional(),
  FormatConfiguration: StringFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

export const DimensionFieldSchema = z.object({
  DateDimensionField: DateDimensionFieldSchema.optional(),
  NumericalDimensionField: NumericalDimensionFieldSchema.optional(),
  CategoricalDimensionField: CategoricalDimensionFieldSchema.optional(),
});

export const DateMeasureFieldSchema = z.object({
  AggregationFunction: z.enum(["COUNT", "DISTINCT_COUNT", "MIN", "MAX"])
    .optional(),
  FormatConfiguration: DateTimeFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

export const NumericalMeasureFieldSchema = z.object({
  AggregationFunction: NumericalAggregationFunctionSchema.optional(),
  FormatConfiguration: NumberFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

export const CategoricalMeasureFieldSchema = z.object({
  AggregationFunction: z.enum(["COUNT", "DISTINCT_COUNT"]).optional(),
  FormatConfiguration: StringFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

export const CalculatedMeasureFieldSchema = z.object({
  Expression: z.string().min(1).max(4096),
  FieldId: z.string().min(1).max(512),
});

export const MeasureFieldSchema = z.object({
  DateMeasureField: DateMeasureFieldSchema.optional(),
  NumericalMeasureField: NumericalMeasureFieldSchema.optional(),
  CategoricalMeasureField: CategoricalMeasureFieldSchema.optional(),
  CalculatedMeasureField: CalculatedMeasureFieldSchema.optional(),
});

export const FunnelChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

export const FunnelChartFieldWellsSchema = z.object({
  FunnelChartAggregatedFieldWells: FunnelChartAggregatedFieldWellsSchema
    .optional(),
});

export const FieldTooltipItemSchema = z.object({
  TooltipTarget: z.enum(["BOTH", "BAR", "LINE"]).optional(),
  FieldId: z.string().min(1).max(512),
  Label: z.string().optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const ColumnTooltipItemSchema = z.object({
  Aggregation: AggregationFunctionSchema.optional(),
  TooltipTarget: z.enum(["BOTH", "BAR", "LINE"]).optional(),
  Column: ColumnIdentifierSchema,
  Label: z.string().optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const TooltipItemSchema = z.object({
  FieldTooltipItem: FieldTooltipItemSchema.optional(),
  ColumnTooltipItem: ColumnTooltipItemSchema.optional(),
});

export const FieldBasedTooltipSchema = z.object({
  TooltipFields: z.array(TooltipItemSchema).optional(),
  AggregationVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  TooltipTitleType: z.enum(["NONE", "PRIMARY_VALUE"]).optional(),
});

export const TooltipOptionsSchema = z.object({
  SelectedTooltipType: z.enum(["BASIC", "DETAILED"]).optional(),
  TooltipVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FieldBasedTooltip: FieldBasedTooltipSchema.optional(),
});

export const ContextMenuOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const VisualMenuOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const VisualInteractionOptionsSchema = z.object({
  ContextMenuOption: ContextMenuOptionSchema.optional(),
  VisualMenuOption: VisualMenuOptionSchema.optional(),
});

export const DataPathTypeSchema = z.object({
  PivotTableDataPathType: z.enum([
    "HIERARCHY_ROWS_LAYOUT_COLUMN",
    "MULTIPLE_ROW_METRICS_COLUMN",
    "EMPTY_COLUMN_HEADER",
    "COUNT_METRIC_COLUMN",
  ]).optional(),
});

export const DataPathValueSchema = z.object({
  DataPathType: DataPathTypeSchema.optional(),
  FieldId: z.string().min(1).max(512).optional(),
  FieldValue: z.string().min(0).max(2048).optional(),
});

export const DataPathColorSchema = z.object({
  Element: DataPathValueSchema,
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")),
  TimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
});

export const VisualPaletteSchema = z.object({
  ChartColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  ColorMap: z.array(DataPathColorSchema).optional(),
});

export const FunnelChartConfigurationSchema = z.object({
  SortConfiguration: FunnelChartSortConfigurationSchema.optional(),
  DataLabelOptions: FunnelChartDataLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: FunnelChartFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  ValueLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

export const FilterOperationSelectedFieldsConfigurationSchema = z.object({
  SelectedColumns: z.array(ColumnIdentifierSchema).describe(
    "The selected columns of a dataset.",
  ).optional(),
  SelectedFields: z.array(z.string().min(1).max(512)).optional(),
  SelectedFieldOptions: z.enum(["ALL_FIELDS"]).optional(),
});

export const SameSheetTargetVisualConfigurationSchema = z.object({
  TargetVisualOptions: z.enum(["ALL_VISUALS"]).optional(),
  TargetVisuals: z.array(
    z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ).optional(),
});

export const FilterOperationTargetVisualsConfigurationSchema = z.object({
  SameSheetTargetVisualConfiguration: SameSheetTargetVisualConfigurationSchema
    .optional(),
});

export const CustomActionFilterOperationSchema = z.object({
  SelectedFieldsConfiguration: FilterOperationSelectedFieldsConfigurationSchema,
  TargetVisualsConfiguration: FilterOperationTargetVisualsConfigurationSchema,
});

export const VisualCustomActionOperationSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationSchema.optional(),
  SetParametersOperation: CustomActionSetParametersOperationSchema.optional(),
  FilterOperation: CustomActionFilterOperationSchema.optional(),
  URLOperation: CustomActionURLOperationSchema.optional(),
});

export const VisualCustomActionSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Trigger: z.enum(["DATA_POINT_CLICK", "DATA_POINT_MENU"]),
  CustomActionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().min(1).max(256),
  ActionOperations: z.array(VisualCustomActionOperationSchema),
});

export const ShortFormatTextSchema = z.object({
  RichText: z.string().min(1).max(1024).optional(),
  PlainText: z.string().min(1).max(512).optional(),
});

export const VisualTitleLabelOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FormatText: ShortFormatTextSchema.optional(),
});

export const NumericEqualityDrillDownFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  Value: z.number(),
});

export const TimeRangeDrillDownFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  RangeMinimum: z.string(),
  TimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]),
  RangeMaximum: z.string(),
});

export const CategoryDrillDownFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  CategoryValues: z.array(z.string().min(0).max(512)),
});

export const DrillDownFilterSchema = z.object({
  NumericEqualityFilter: NumericEqualityDrillDownFilterSchema.optional(),
  TimeRangeFilter: TimeRangeDrillDownFilterSchema.optional(),
  CategoryFilter: CategoryDrillDownFilterSchema.optional(),
});

export const DateTimeHierarchySchema = z.object({
  HierarchyId: z.string().min(1).max(512),
  DrillDownFilters: z.array(DrillDownFilterSchema).optional(),
});

export const ExplicitHierarchySchema = z.object({
  HierarchyId: z.string().min(1).max(512),
  DrillDownFilters: z.array(DrillDownFilterSchema).optional(),
  Columns: z.array(ColumnIdentifierSchema),
});

export const PredefinedHierarchySchema = z.object({
  HierarchyId: z.string().min(1).max(512),
  DrillDownFilters: z.array(DrillDownFilterSchema).optional(),
  Columns: z.array(ColumnIdentifierSchema),
});

export const ColumnHierarchySchema = z.object({
  DateTimeHierarchy: DateTimeHierarchySchema.optional(),
  ExplicitHierarchy: ExplicitHierarchySchema.optional(),
  PredefinedHierarchy: PredefinedHierarchySchema.optional(),
});

export const FunnelChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: FunnelChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const PaginationConfigurationSchema = z.object({
  PageSize: z.number(),
  PageNumber: z.number().min(0),
});

export const BoxPlotSortConfigurationSchema = z.object({
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
  PaginationConfiguration: PaginationConfigurationSchema.optional(),
});

export const LegendOptionsSchema = z.object({
  Position: z.enum(["AUTO", "RIGHT", "BOTTOM", "TOP"]).optional(),
  ValueFontConfiguration: FontConfigurationSchema.optional(),
  Title: LabelOptionsSchema.optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Height: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  Width: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

export const ReferenceLineDynamicDataConfigurationSchema = z.object({
  Column: ColumnIdentifierSchema,
  MeasureAggregationFunction: AggregationFunctionSchema.optional(),
  Calculation: NumericalAggregationFunctionSchema,
});

export const ReferenceLineStaticDataConfigurationSchema = z.object({
  Value: z.number(),
});

export const ReferenceLineDataConfigurationSchema = z.object({
  DynamicConfiguration: ReferenceLineDynamicDataConfigurationSchema.optional(),
  AxisBinding: z.enum(["PRIMARY_YAXIS", "SECONDARY_YAXIS"]).optional(),
  SeriesType: z.enum(["BAR", "LINE"]).optional(),
  StaticConfiguration: ReferenceLineStaticDataConfigurationSchema.optional(),
});

export const ReferenceLineValueLabelConfigurationSchema = z.object({
  FormatConfiguration: NumericFormatConfigurationSchema.optional(),
  RelativePosition: z.enum(["BEFORE_CUSTOM_LABEL", "AFTER_CUSTOM_LABEL"])
    .optional(),
});

export const ReferenceLineCustomLabelConfigurationSchema = z.object({
  CustomLabel: z.string().regex(new RegExp("\\S")),
});

export const ReferenceLineLabelConfigurationSchema = z.object({
  HorizontalPosition: z.enum(["LEFT", "CENTER", "RIGHT"]).optional(),
  ValueLabelConfiguration: ReferenceLineValueLabelConfigurationSchema
    .optional(),
  CustomLabelConfiguration: ReferenceLineCustomLabelConfigurationSchema
    .optional(),
  FontColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
  VerticalPosition: z.enum(["ABOVE", "BELOW"]).optional(),
});

export const ReferenceLineStyleConfigurationSchema = z.object({
  Pattern: z.enum(["SOLID", "DASHED", "DOTTED"]).optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const ReferenceLineSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  DataConfiguration: ReferenceLineDataConfigurationSchema,
  LabelConfiguration: ReferenceLineLabelConfigurationSchema.optional(),
  StyleConfiguration: ReferenceLineStyleConfigurationSchema.optional(),
});

export const DateAxisOptionsSchema = z.object({
  MissingDateVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const AxisLogarithmicScaleSchema = z.object({
  Base: z.number().optional(),
});

export const AxisLinearScaleSchema = z.object({
  StepSize: z.number().optional(),
  StepCount: z.number().optional(),
});

export const AxisScaleSchema = z.object({
  Logarithmic: AxisLogarithmicScaleSchema.optional(),
  Linear: AxisLinearScaleSchema.optional(),
});

export const AxisDisplayMinMaxRangeSchema = z.object({
  Minimum: z.number().optional(),
  Maximum: z.number().optional(),
});

export const AxisDisplayRangeSchema = z.object({
  DataDriven: z.string().optional(),
  MinMax: AxisDisplayMinMaxRangeSchema.optional(),
});

export const NumericAxisOptionsSchema = z.object({
  Scale: AxisScaleSchema.optional(),
  Range: AxisDisplayRangeSchema.optional(),
});

export const AxisDataOptionsSchema = z.object({
  DateAxisOptions: DateAxisOptionsSchema.optional(),
  NumericAxisOptions: NumericAxisOptionsSchema.optional(),
});

export const AxisTickLabelOptionsSchema = z.object({
  RotationAngle: z.number().optional(),
  LabelOptions: LabelOptionsSchema.optional(),
});

export const PercentVisibleRangeSchema = z.object({
  From: z.number().min(0).max(100).optional(),
  To: z.number().min(0).max(100).optional(),
});

export const VisibleRangeOptionsSchema = z.object({
  PercentRange: PercentVisibleRangeSchema.optional(),
});

export const ScrollBarOptionsSchema = z.object({
  VisibleRange: VisibleRangeOptionsSchema.optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const AxisDisplayOptionsSchema = z.object({
  DataOptions: AxisDataOptionsSchema.optional(),
  TickLabelOptions: AxisTickLabelOptionsSchema.optional(),
  AxisOffset: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  AxisLineVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  GridLineVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  ScrollbarOptions: ScrollBarOptionsSchema.optional(),
});

export const BoxPlotAggregatedFieldWellsSchema = z.object({
  GroupBy: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

export const BoxPlotFieldWellsSchema = z.object({
  BoxPlotAggregatedFieldWells: BoxPlotAggregatedFieldWellsSchema.optional(),
});

export const BoxPlotStyleOptionsSchema = z.object({
  FillStyle: z.enum(["SOLID", "TRANSPARENT"]).optional(),
});

export const BoxPlotOptionsSchema = z.object({
  StyleOptions: BoxPlotStyleOptionsSchema.optional(),
  OutlierVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  AllDataPointsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const BoxPlotChartConfigurationSchema = z.object({
  SortConfiguration: BoxPlotSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  ReferenceLines: z.array(ReferenceLineSchema).optional(),
  CategoryAxis: AxisDisplayOptionsSchema.optional(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: BoxPlotFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  BoxPlotOptions: BoxPlotOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

export const BoxPlotVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: BoxPlotChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const GeospatialCoordinateBoundsSchema = z.object({
  West: z.number().min(-1800).max(1800),
  South: z.number().min(-90).max(90),
  North: z.number().min(-90).max(90),
  East: z.number().min(-1800).max(1800),
});

export const GeospatialMapStateSchema = z.object({
  Bounds: GeospatialCoordinateBoundsSchema.optional(),
  MapNavigation: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const GeospatialMapStyleSchema = z.object({
  BaseMapStyle: z.enum(["LIGHT_GRAY", "DARK_GRAY", "STREET", "IMAGERY"])
    .optional(),
  BaseMapVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BackgroundColor: z.string().regex(
    new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"),
  ).optional(),
});

export const GeospatialLayerColorFieldSchema = z.object({
  ColorValuesFields: z.array(MeasureFieldSchema).optional(),
  ColorDimensionsFields: z.array(DimensionFieldSchema).optional(),
});

export const UnaggregatedFieldSchema = z.object({
  FormatConfiguration: FormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

export const GeospatialLayerJoinDefinitionSchema = z.object({
  ColorField: GeospatialLayerColorFieldSchema.optional(),
  ShapeKeyField: z.string().optional(),
  DatasetKeyField: UnaggregatedFieldSchema.optional(),
});

export const LayerCustomActionOperationSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationSchema.optional(),
  SetParametersOperation: CustomActionSetParametersOperationSchema.optional(),
  FilterOperation: CustomActionFilterOperationSchema.optional(),
  URLOperation: CustomActionURLOperationSchema.optional(),
});

export const LayerCustomActionSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Trigger: z.enum(["DATA_POINT_CLICK", "DATA_POINT_MENU"]),
  CustomActionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().min(1).max(256),
  ActionOperations: z.array(LayerCustomActionOperationSchema),
});

export const GeospatialGradientStepColorSchema = z.object({
  DataValue: z.number(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$")),
});

export const GeospatialNullSymbolStyleSchema = z.object({
  FillColor: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  StrokeWidth: z.number().min(0).optional(),
  StrokeColor: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
});

export const GeospatialNullDataSettingsSchema = z.object({
  SymbolStyle: GeospatialNullSymbolStyleSchema,
});

export const GeospatialGradientColorSchema = z.object({
  DefaultOpacity: z.number().min(0).max(1).optional(),
  StepColors: z.array(GeospatialGradientStepColorSchema),
  NullDataVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  NullDataSettings: GeospatialNullDataSettingsSchema.optional(),
});

export const GeospatialCategoricalDataColorSchema = z.object({
  DataValue: z.string(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$")),
});

export const GeospatialCategoricalColorSchema = z.object({
  CategoryDataColors: z.array(GeospatialCategoricalDataColorSchema),
  DefaultOpacity: z.number().min(0).max(1).optional(),
  NullDataVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  NullDataSettings: GeospatialNullDataSettingsSchema.optional(),
});

export const GeospatialSolidColorSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "Defines view state of the color",
  ).optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$")),
});

export const GeospatialColorSchema = z.object({
  Gradient: GeospatialGradientColorSchema.optional(),
  Categorical: GeospatialCategoricalColorSchema.optional(),
  Solid: GeospatialSolidColorSchema.describe(
    "Describes the properties for a solid color",
  ).optional(),
});

export const GeospatialLineWidthSchema = z.object({
  LineWidth: z.number().min(0).optional(),
});

export const GeospatialCircleRadiusSchema = z.object({
  Radius: z.number().min(0).optional(),
});

export const GeospatialCircleSymbolStyleSchema = z.object({
  FillColor: GeospatialColorSchema.optional(),
  StrokeWidth: GeospatialLineWidthSchema.optional(),
  StrokeColor: GeospatialColorSchema.optional(),
  CircleRadius: GeospatialCircleRadiusSchema.optional(),
});

export const GeospatialPointStyleSchema = z.object({
  CircleSymbolStyle: GeospatialCircleSymbolStyleSchema.optional(),
});

export const GeospatialPointLayerSchema = z.object({
  Style: GeospatialPointStyleSchema,
});

export const GeospatialPolygonSymbolStyleSchema = z.object({
  FillColor: GeospatialColorSchema.optional(),
  StrokeWidth: GeospatialLineWidthSchema.optional(),
  StrokeColor: GeospatialColorSchema.optional(),
});

export const GeospatialPolygonStyleSchema = z.object({
  PolygonSymbolStyle: GeospatialPolygonSymbolStyleSchema.optional(),
});

export const GeospatialPolygonLayerSchema = z.object({
  Style: GeospatialPolygonStyleSchema,
});

export const GeospatialLineSymbolStyleSchema = z.object({
  FillColor: GeospatialColorSchema.optional(),
  LineWidth: GeospatialLineWidthSchema.optional(),
});

export const GeospatialLineStyleSchema = z.object({
  LineSymbolStyle: GeospatialLineSymbolStyleSchema.optional(),
});

export const GeospatialLineLayerSchema = z.object({
  Style: GeospatialLineStyleSchema,
});

export const GeospatialLayerDefinitionSchema = z.object({
  PointLayer: GeospatialPointLayerSchema.optional(),
  PolygonLayer: GeospatialPolygonLayerSchema.optional(),
  LineLayer: GeospatialLineLayerSchema.optional(),
});

export const GeospatialStaticFileSourceSchema = z.object({
  StaticFileId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

export const GeospatialDataSourceItemSchema = z.object({
  StaticFileDataSource: GeospatialStaticFileSourceSchema.optional(),
});

export const GeospatialLayerItemSchema = z.object({
  LayerId: z.string(),
  JoinDefinition: GeospatialLayerJoinDefinitionSchema.optional(),
  Actions: z.array(LayerCustomActionSchema).optional(),
  LayerType: z.enum(["POINT", "LINE", "POLYGON"]).optional(),
  LayerDefinition: GeospatialLayerDefinitionSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  Label: z.string().optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  DataSource: GeospatialDataSourceItemSchema.optional(),
});

export const GeospatialLayerMapConfigurationSchema = z.object({
  Legend: LegendOptionsSchema.optional(),
  MapState: GeospatialMapStateSchema.optional(),
  MapStyle: GeospatialMapStyleSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  MapLayers: z.array(GeospatialLayerItemSchema).optional(),
});

export const LayerMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: GeospatialLayerMapConfigurationSchema.optional(),
  DataSetIdentifier: z.string().min(1).max(2048),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const GeospatialMapStyleOptionsSchema = z.object({
  BaseMapStyle: z.enum(["LIGHT_GRAY", "DARK_GRAY", "STREET", "IMAGERY"])
    .optional(),
});

export const GeospatialMapAggregatedFieldWellsSchema = z.object({
  Colors: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
  Geospatial: z.array(DimensionFieldSchema).optional(),
});

export const GeospatialMapFieldWellsSchema = z.object({
  GeospatialMapAggregatedFieldWells: GeospatialMapAggregatedFieldWellsSchema
    .optional(),
});

export const GeospatialWindowOptionsSchema = z.object({
  Bounds: GeospatialCoordinateBoundsSchema.optional(),
  MapZoomMode: z.enum(["AUTO", "MANUAL"]).optional(),
});

export const SimpleClusterMarkerSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const ClusterMarkerSchema = z.object({
  SimpleClusterMarker: SimpleClusterMarkerSchema.optional(),
});

export const ClusterMarkerConfigurationSchema = z.object({
  ClusterMarker: ClusterMarkerSchema.optional(),
});

export const GeospatialHeatmapDataColorSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")),
});

export const GeospatialHeatmapColorScaleSchema = z.object({
  Colors: z.array(GeospatialHeatmapDataColorSchema).optional(),
});

export const GeospatialHeatmapConfigurationSchema = z.object({
  HeatmapColor: GeospatialHeatmapColorScaleSchema.optional(),
});

export const GeospatialPointStyleOptionsSchema = z.object({
  SelectedPointStyle: z.enum(["POINT", "CLUSTER", "HEATMAP"]).optional(),
  ClusterMarkerConfiguration: ClusterMarkerConfigurationSchema.optional(),
  HeatmapConfiguration: GeospatialHeatmapConfigurationSchema.optional(),
});

export const GeospatialMapConfigurationSchema = z.object({
  Legend: LegendOptionsSchema.optional(),
  MapStyleOptions: GeospatialMapStyleOptionsSchema.optional(),
  FieldWells: GeospatialMapFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  WindowOptions: GeospatialWindowOptionsSchema.optional(),
  PointStyleOptions: GeospatialPointStyleOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

export const GeospatialMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: GeospatialMapConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const ScatterPlotSortConfigurationSchema = z.object({
  ScatterPlotLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

export const MaximumLabelTypeSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const DataPathLabelTypeSchema = z.object({
  FieldId: z.string().min(1).max(512).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FieldValue: z.string().min(0).max(2048).optional(),
});

export const RangeEndsLabelTypeSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const FieldLabelTypeSchema = z.object({
  FieldId: z.string().min(1).max(512).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const MinimumLabelTypeSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const DataLabelTypeSchema = z.object({
  MaximumLabelType: MaximumLabelTypeSchema.optional(),
  DataPathLabelType: DataPathLabelTypeSchema.optional(),
  RangeEndsLabelType: RangeEndsLabelTypeSchema.optional(),
  FieldLabelType: FieldLabelTypeSchema.optional(),
  MinimumLabelType: MinimumLabelTypeSchema.optional(),
});

export const DataLabelOptionsSchema = z.object({
  DataLabelTypes: z.array(DataLabelTypeSchema).optional(),
  MeasureLabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Position: z.enum(["INSIDE", "OUTSIDE", "LEFT", "TOP", "BOTTOM", "RIGHT"])
    .optional(),
  LabelContent: z.enum(["VALUE", "PERCENT", "VALUE_AND_PERCENT"]).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  TotalsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Overlap: z.enum(["DISABLE_OVERLAP", "ENABLE_OVERLAP"]).optional(),
  CategoryLabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LabelColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  LabelFontConfiguration: FontConfigurationSchema.optional(),
});

export const ScatterPlotUnaggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Size: z.array(MeasureFieldSchema).optional(),
  Label: z.array(DimensionFieldSchema).optional(),
  XAxis: z.array(DimensionFieldSchema).optional(),
  YAxis: z.array(DimensionFieldSchema).optional(),
});

export const ScatterPlotCategoricallyAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Size: z.array(MeasureFieldSchema).optional(),
  Label: z.array(DimensionFieldSchema).optional(),
  XAxis: z.array(MeasureFieldSchema).optional(),
  YAxis: z.array(MeasureFieldSchema).optional(),
});

export const ScatterPlotFieldWellsSchema = z.object({
  ScatterPlotUnaggregatedFieldWells: ScatterPlotUnaggregatedFieldWellsSchema
    .optional(),
  ScatterPlotCategoricallyAggregatedFieldWells:
    ScatterPlotCategoricallyAggregatedFieldWellsSchema.optional(),
});

export const ScatterPlotConfigurationSchema = z.object({
  YAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  SortConfiguration: ScatterPlotSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  YAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  FieldWells: ScatterPlotFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  XAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  XAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
});

export const ScatterPlotVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: ScatterPlotConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const RadarChartSortConfigurationSchema = z.object({
  ColorSort: z.array(FieldSortOptionsSchema).optional(),
  ColorItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

export const RadarChartAreaStyleSettingsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const RadarChartSeriesSettingsSchema = z.object({
  AreaStyleSettings: RadarChartAreaStyleSettingsSchema.optional(),
});

export const RadarChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Color: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

export const RadarChartFieldWellsSchema = z.object({
  RadarChartAggregatedFieldWells: RadarChartAggregatedFieldWellsSchema
    .optional(),
});

export const RadarChartConfigurationSchema = z.object({
  SortConfiguration: RadarChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  Shape: z.enum(["CIRCLE", "POLYGON"]).optional(),
  BaseSeriesSettings: RadarChartSeriesSettingsSchema.optional(),
  ColorLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  AxesRangeScale: z.enum(["AUTO", "INDEPENDENT", "SHARED"]).optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  AlternateBandColorsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  StartAngle: z.number().min(-360).max(360).optional(),
  CategoryAxis: AxisDisplayOptionsSchema.optional(),
  FieldWells: RadarChartFieldWellsSchema.optional(),
  ColorAxis: AxisDisplayOptionsSchema.optional(),
  AlternateBandOddColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$"))
    .optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  AlternateBandEvenColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$"))
    .optional(),
});

export const RadarChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: RadarChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const ComboChartSortConfigurationSchema = z.object({
  ColorSort: z.array(FieldSortOptionsSchema).optional(),
  ColorItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

export const YAxisOptionsSchema = z.object({
  YAxis: z.enum(["PRIMARY_Y_AXIS"]),
});

export const SingleAxisOptionsSchema = z.object({
  YAxisOptions: YAxisOptionsSchema.optional(),
});

export const ComboChartAggregatedFieldWellsSchema = z.object({
  BarValues: z.array(MeasureFieldSchema).optional(),
  Category: z.array(DimensionFieldSchema).optional(),
  Colors: z.array(DimensionFieldSchema).optional(),
  LineValues: z.array(MeasureFieldSchema).optional(),
});

export const ComboChartFieldWellsSchema = z.object({
  ComboChartAggregatedFieldWells: ComboChartAggregatedFieldWellsSchema
    .optional(),
});

export const ComboChartConfigurationSchema = z.object({
  SortConfiguration: ComboChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  ReferenceLines: z.array(ReferenceLineSchema).optional(),
  ColorLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  BarDataLabels: DataLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  SingleAxisOptions: SingleAxisOptionsSchema.optional(),
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  BarsArrangement: z.enum(["CLUSTERED", "STACKED", "STACKED_PERCENT"])
    .optional(),
  SecondaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  LineDataLabels: DataLabelOptionsSchema.optional(),
  CategoryAxis: AxisDisplayOptionsSchema.optional(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: ComboChartFieldWellsSchema.optional(),
  SecondaryYAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

export const ComboChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: ComboChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const WordCloudSortConfigurationSchema = z.object({
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

export const WordCloudAggregatedFieldWellsSchema = z.object({
  GroupBy: z.array(DimensionFieldSchema).optional(),
  Size: z.array(MeasureFieldSchema).optional(),
});

export const WordCloudFieldWellsSchema = z.object({
  WordCloudAggregatedFieldWells: WordCloudAggregatedFieldWellsSchema.optional(),
});

export const WordCloudOptionsSchema = z.object({
  WordOrientation: z.enum(["HORIZONTAL", "HORIZONTAL_AND_VERTICAL"]).optional(),
  WordScaling: z.enum(["EMPHASIZE", "NORMAL"]).optional(),
  CloudLayout: z.enum(["FLUID", "NORMAL"]).optional(),
  MaximumStringLength: z.number().min(1).max(100).optional(),
  WordCasing: z.enum(["LOWER_CASE", "EXISTING_CASE"]).optional(),
  WordPadding: z.enum(["NONE", "SMALL", "MEDIUM", "LARGE"]).optional(),
});

export const WordCloudChartConfigurationSchema = z.object({
  SortConfiguration: WordCloudSortConfigurationSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: WordCloudFieldWellsSchema.optional(),
  WordCloudOptions: WordCloudOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

export const WordCloudVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: WordCloudChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const SankeyDiagramSortConfigurationSchema = z.object({
  WeightSort: z.array(FieldSortOptionsSchema).optional(),
  SourceItemsLimit: ItemsLimitConfigurationSchema.optional(),
  DestinationItemsLimit: ItemsLimitConfigurationSchema.optional(),
});

export const SankeyDiagramAggregatedFieldWellsSchema = z.object({
  Destination: z.array(DimensionFieldSchema).optional(),
  Source: z.array(DimensionFieldSchema).optional(),
  Weight: z.array(MeasureFieldSchema).optional(),
});

export const SankeyDiagramFieldWellsSchema = z.object({
  SankeyDiagramAggregatedFieldWells: SankeyDiagramAggregatedFieldWellsSchema
    .optional(),
});

export const SankeyDiagramChartConfigurationSchema = z.object({
  SortConfiguration: SankeyDiagramSortConfigurationSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  FieldWells: SankeyDiagramFieldWellsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

export const SankeyDiagramVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: SankeyDiagramChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const GradientStopSchema = z.object({
  GradientOffset: z.number(),
  DataValue: z.number().optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const GradientColorSchema = z.object({
  Stops: z.array(GradientStopSchema).optional(),
});

export const ConditionalFormattingGradientColorSchema = z.object({
  Expression: z.string().min(1).max(4096),
  Color: GradientColorSchema,
});

export const ConditionalFormattingSolidColorSchema = z.object({
  Expression: z.string().min(1).max(4096),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const ConditionalFormattingColorSchema = z.object({
  Gradient: ConditionalFormattingGradientColorSchema.optional(),
  Solid: ConditionalFormattingSolidColorSchema.optional(),
});

export const GaugeChartArcConditionalFormattingSchema = z.object({
  ForegroundColor: ConditionalFormattingColorSchema.optional(),
});

export const ConditionalFormattingIconDisplayConfigurationSchema = z.object({
  IconDisplayOption: z.enum(["ICON_ONLY"]).optional(),
});

export const ConditionalFormattingCustomIconOptionsSchema = z.object({
  UnicodeIcon: z.string().regex(new RegExp("^[^\\u0000-\\u00FF]$")).optional(),
  Icon: z.enum([
    "CARET_UP",
    "CARET_DOWN",
    "PLUS",
    "MINUS",
    "ARROW_UP",
    "ARROW_DOWN",
    "ARROW_LEFT",
    "ARROW_UP_LEFT",
    "ARROW_DOWN_LEFT",
    "ARROW_RIGHT",
    "ARROW_UP_RIGHT",
    "ARROW_DOWN_RIGHT",
    "FACE_UP",
    "FACE_DOWN",
    "FACE_FLAT",
    "ONE_BAR",
    "TWO_BAR",
    "THREE_BAR",
    "CIRCLE",
    "TRIANGLE",
    "SQUARE",
    "FLAG",
    "THUMBS_UP",
    "THUMBS_DOWN",
    "CHECKMARK",
    "X",
  ]).optional(),
});

export const ConditionalFormattingCustomIconConditionSchema = z.object({
  Expression: z.string().min(1).max(4096),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  DisplayConfiguration: ConditionalFormattingIconDisplayConfigurationSchema
    .optional(),
  IconOptions: ConditionalFormattingCustomIconOptionsSchema,
});

export const ConditionalFormattingIconSetSchema = z.object({
  Expression: z.string().min(1).max(4096),
  IconSetType: z.enum([
    "PLUS_MINUS",
    "CHECK_X",
    "THREE_COLOR_ARROW",
    "THREE_GRAY_ARROW",
    "CARET_UP_MINUS_DOWN",
    "THREE_SHAPE",
    "THREE_CIRCLE",
    "FLAGS",
    "BARS",
    "FOUR_COLOR_ARROW",
    "FOUR_GRAY_ARROW",
  ]).optional(),
});

export const ConditionalFormattingIconSchema = z.object({
  CustomCondition: ConditionalFormattingCustomIconConditionSchema.optional(),
  IconSet: ConditionalFormattingIconSetSchema.optional(),
});

export const GaugeChartPrimaryValueConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
});

export const GaugeChartConditionalFormattingOptionSchema = z.object({
  Arc: GaugeChartArcConditionalFormattingSchema.optional(),
  PrimaryValue: GaugeChartPrimaryValueConditionalFormattingSchema.optional(),
});

export const GaugeChartConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(
    GaugeChartConditionalFormattingOptionSchema,
  ).optional(),
});

export const GaugeChartFieldWellsSchema = z.object({
  TargetValues: z.array(MeasureFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

export const ArcConfigurationSchema = z.object({
  ArcAngle: z.number().optional(),
  ArcThickness: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
});

export const ComparisonFormatConfigurationSchema = z.object({
  NumberDisplayFormatConfiguration: NumberDisplayFormatConfigurationSchema
    .optional(),
  PercentageDisplayFormatConfiguration:
    PercentageDisplayFormatConfigurationSchema.optional(),
});

export const ComparisonConfigurationSchema = z.object({
  ComparisonMethod: z.enum(["DIFFERENCE", "PERCENT_DIFFERENCE", "PERCENT"])
    .optional(),
  ComparisonFormat: ComparisonFormatConfigurationSchema.optional(),
});

export const ArcAxisDisplayRangeSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

export const ArcAxisConfigurationSchema = z.object({
  Range: ArcAxisDisplayRangeSchema.optional(),
  ReserveRange: z.number().optional(),
});

export const GaugeChartOptionsSchema = z.object({
  Arc: ArcConfigurationSchema.optional(),
  Comparison: ComparisonConfigurationSchema.optional(),
  PrimaryValueDisplayType: z.enum(["HIDDEN", "COMPARISON", "ACTUAL"])
    .optional(),
  ArcAxis: ArcAxisConfigurationSchema.optional(),
  PrimaryValueFontConfiguration: FontConfigurationSchema.optional(),
});

export const GaugeChartColorConfigurationSchema = z.object({
  ForegroundColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  BackgroundColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const GaugeChartConfigurationSchema = z.object({
  DataLabels: DataLabelOptionsSchema.optional(),
  FieldWells: GaugeChartFieldWellsSchema.optional(),
  TooltipOptions: TooltipOptionsSchema.optional(),
  GaugeChartOptions: GaugeChartOptionsSchema.optional(),
  ColorConfiguration: GaugeChartColorConfigurationSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

export const GaugeChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: GaugeChartConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: GaugeChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const ShapeConditionalFormatSchema = z.object({
  BackgroundColor: ConditionalFormattingColorSchema,
});

export const FilledMapShapeConditionalFormattingSchema = z.object({
  Format: ShapeConditionalFormatSchema.optional(),
  FieldId: z.string().min(1).max(512),
});

export const FilledMapConditionalFormattingOptionSchema = z.object({
  Shape: FilledMapShapeConditionalFormattingSchema,
});

export const FilledMapConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(
    FilledMapConditionalFormattingOptionSchema,
  ),
});

export const FilledMapSortConfigurationSchema = z.object({
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

export const FilledMapAggregatedFieldWellsSchema = z.object({
  Values: z.array(MeasureFieldSchema).optional(),
  Geospatial: z.array(DimensionFieldSchema).optional(),
});

export const FilledMapFieldWellsSchema = z.object({
  FilledMapAggregatedFieldWells: FilledMapAggregatedFieldWellsSchema.optional(),
});

export const FilledMapConfigurationSchema = z.object({
  SortConfiguration: FilledMapSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  MapStyleOptions: GeospatialMapStyleOptionsSchema.optional(),
  FieldWells: FilledMapFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  WindowOptions: GeospatialWindowOptionsSchema.optional(),
});

export const FilledMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: FilledMapConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: FilledMapConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const WaterfallChartSortConfigurationSchema = z.object({
  BreakdownItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

export const WaterfallChartAggregatedFieldWellsSchema = z.object({
  Categories: z.array(DimensionFieldSchema).optional(),
  Breakdowns: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

export const WaterfallChartFieldWellsSchema = z.object({
  WaterfallChartAggregatedFieldWells: WaterfallChartAggregatedFieldWellsSchema
    .optional(),
});

export const WaterfallChartOptionsSchema = z.object({
  TotalBarLabel: z.string().optional(),
});

export const WaterfallChartGroupColorConfigurationSchema = z.object({
  NegativeBarColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  TotalBarColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  PositiveBarColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const WaterfallChartColorConfigurationSchema = z.object({
  GroupColorConfiguration: WaterfallChartGroupColorConfigurationSchema
    .optional(),
});

export const WaterfallChartConfigurationSchema = z.object({
  CategoryAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  SortConfiguration: WaterfallChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: WaterfallChartFieldWellsSchema.optional(),
  WaterfallChartOptions: WaterfallChartOptionsSchema.optional(),
  ColorConfiguration: WaterfallChartColorConfigurationSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  CategoryAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

export const WaterfallVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: WaterfallChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const CustomContentConfigurationSchema = z.object({
  ContentUrl: z.string().min(1).max(2048).optional(),
  ContentType: z.enum(["IMAGE", "OTHER_EMBEDDED_CONTENT"]).optional(),
  ImageScaling: z.enum([
    "FIT_TO_HEIGHT",
    "FIT_TO_WIDTH",
    "DO_NOT_SCALE",
    "SCALE_TO_VISUAL",
  ]).optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

export const CustomContentVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: CustomContentConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  DataSetIdentifier: z.string().min(1).max(2048),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const PieChartSortConfigurationSchema = z.object({
  SmallMultiplesSort: z.array(FieldSortOptionsSchema).optional(),
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

export const ContributionAnalysisDefaultSchema = z.object({
  MeasureFieldId: z.string().min(1).max(512),
  ContributorDimensions: z.array(ColumnIdentifierSchema),
});

export const PieChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
  SmallMultiples: z.array(DimensionFieldSchema).optional(),
});

export const PieChartFieldWellsSchema = z.object({
  PieChartAggregatedFieldWells: PieChartAggregatedFieldWellsSchema.optional(),
});

export const DonutCenterOptionsSchema = z.object({
  LabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const ArcOptionsSchema = z.object({
  ArcThickness: z.enum(["SMALL", "MEDIUM", "LARGE", "WHOLE"]).optional(),
});

export const DonutOptionsSchema = z.object({
  DonutCenterOptions: DonutCenterOptionsSchema.optional(),
  ArcOptions: ArcOptionsSchema.optional(),
});

export const PanelTitleOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
  HorizontalTextAlignment: z.enum(["LEFT", "CENTER", "RIGHT", "AUTO"])
    .optional(),
});

export const PanelConfigurationSchema = z.object({
  BorderThickness: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  BorderStyle: z.enum(["SOLID", "DASHED", "DOTTED"]).optional(),
  GutterSpacing: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  BackgroundVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BorderVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BorderColor: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Title: PanelTitleOptionsSchema.optional(),
  GutterVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BackgroundColor: z.string().regex(
    new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"),
  ).optional(),
});

export const SmallMultiplesAxisPropertiesSchema = z.object({
  Placement: z.enum(["OUTSIDE", "INSIDE"]).optional(),
  Scale: z.enum(["SHARED", "INDEPENDENT"]).optional(),
});

export const SmallMultiplesOptionsSchema = z.object({
  MaxVisibleRows: z.number().min(1).max(10).optional(),
  PanelConfiguration: PanelConfigurationSchema.optional(),
  MaxVisibleColumns: z.number().min(1).max(10).optional(),
  XAxis: SmallMultiplesAxisPropertiesSchema.optional(),
  YAxis: SmallMultiplesAxisPropertiesSchema.optional(),
});

export const PieChartConfigurationSchema = z.object({
  SortConfiguration: PieChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultSchema)
    .optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: PieChartFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  DonutOptions: DonutOptionsSchema.optional(),
  SmallMultiplesOptions: SmallMultiplesOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  ValueLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

export const PieChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: PieChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const KPIPrimaryValueConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
});

export const KPIActualValueConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
});

export const KPIComparisonValueConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
});

export const KPIProgressBarConditionalFormattingSchema = z.object({
  ForegroundColor: ConditionalFormattingColorSchema.optional(),
});

export const KPIConditionalFormattingOptionSchema = z.object({
  PrimaryValue: KPIPrimaryValueConditionalFormattingSchema.optional(),
  ActualValue: KPIActualValueConditionalFormattingSchema.optional(),
  ComparisonValue: KPIComparisonValueConditionalFormattingSchema.optional(),
  ProgressBar: KPIProgressBarConditionalFormattingSchema.optional(),
});

export const KPIConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(KPIConditionalFormattingOptionSchema)
    .optional(),
});

export const KPISortConfigurationSchema = z.object({
  TrendGroupSort: z.array(FieldSortOptionsSchema).optional(),
});

export const KPIVisualStandardLayoutSchema = z.object({
  Type: z.enum(["CLASSIC", "VERTICAL"]),
});

export const KPIVisualLayoutOptionsSchema = z.object({
  StandardLayout: KPIVisualStandardLayoutSchema.optional(),
});

export const TrendArrowOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const SecondaryValueOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const ProgressBarOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const KPISparklineOptionsSchema = z.object({
  Type: z.enum(["LINE", "AREA"]),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  TooltipVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const KPIOptionsSchema = z.object({
  SecondaryValueFontConfiguration: FontConfigurationSchema.optional(),
  VisualLayoutOptions: KPIVisualLayoutOptionsSchema.optional(),
  TrendArrows: TrendArrowOptionsSchema.optional(),
  SecondaryValue: SecondaryValueOptionsSchema.optional(),
  Comparison: ComparisonConfigurationSchema.optional(),
  PrimaryValueDisplayType: z.enum(["HIDDEN", "COMPARISON", "ACTUAL"])
    .optional(),
  ProgressBar: ProgressBarOptionsSchema.optional(),
  PrimaryValueFontConfiguration: FontConfigurationSchema.optional(),
  Sparkline: KPISparklineOptionsSchema.optional(),
});

export const KPIFieldWellsSchema = z.object({
  TargetValues: z.array(MeasureFieldSchema).optional(),
  TrendGroups: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

export const KPIConfigurationSchema = z.object({
  SortConfiguration: KPISortConfigurationSchema.optional(),
  KPIOptions: KPIOptionsSchema.optional(),
  FieldWells: KPIFieldWellsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

export const KPIVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: KPIConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: KPIConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const BinWidthOptionsSchema = z.object({
  BinCountLimit: z.number().min(0).max(1000).optional(),
  Value: z.number().min(0).optional(),
});

export const BinCountOptionsSchema = z.object({
  Value: z.number().min(0).optional(),
});

export const HistogramBinOptionsSchema = z.object({
  BinWidth: BinWidthOptionsSchema.optional(),
  StartValue: z.number().optional(),
  SelectedBinType: z.enum(["BIN_COUNT", "BIN_WIDTH"]).optional(),
  BinCount: BinCountOptionsSchema.optional(),
});

export const HistogramAggregatedFieldWellsSchema = z.object({
  Values: z.array(MeasureFieldSchema).optional(),
});

export const HistogramFieldWellsSchema = z.object({
  HistogramAggregatedFieldWells: HistogramAggregatedFieldWellsSchema.optional(),
});

export const HistogramConfigurationSchema = z.object({
  YAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  BinOptions: HistogramBinOptionsSchema.optional(),
  FieldWells: HistogramFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  XAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  XAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
});

export const HistogramVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: HistogramConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const PluginVisualItemsLimitConfigurationSchema = z.object({
  ItemsLimit: z.number().optional(),
});

export const PluginVisualTableQuerySortSchema = z.object({
  ItemsLimitConfiguration: PluginVisualItemsLimitConfigurationSchema.optional(),
  RowSort: z.array(FieldSortOptionsSchema).optional(),
});

export const PluginVisualSortConfigurationSchema = z.object({
  PluginVisualTableQuerySort: PluginVisualTableQuerySortSchema.optional(),
});

export const PluginVisualPropertySchema = z.object({
  Value: z.string().optional(),
  Name: z.string().optional(),
});

export const PluginVisualOptionsSchema = z.object({
  VisualProperties: z.array(PluginVisualPropertySchema).optional(),
});

export const PluginVisualFieldWellSchema = z.object({
  Unaggregated: z.array(UnaggregatedFieldSchema).optional(),
  AxisName: z.enum(["GROUP_BY", "VALUE"]).optional(),
  Measures: z.array(MeasureFieldSchema).optional(),
  Dimensions: z.array(DimensionFieldSchema).optional(),
});

export const PluginVisualConfigurationSchema = z.object({
  SortConfiguration: PluginVisualSortConfigurationSchema.optional(),
  VisualOptions: PluginVisualOptionsSchema.optional(),
  FieldWells: z.array(PluginVisualFieldWellSchema).optional(),
});

export const PluginVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  PluginArn: z.string(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: PluginVisualConfigurationSchema.optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const TableRowConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  BackgroundColor: ConditionalFormattingColorSchema.optional(),
});

export const TextConditionalFormatSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
  BackgroundColor: ConditionalFormattingColorSchema.optional(),
});

export const TableCellConditionalFormattingSchema = z.object({
  FieldId: z.string().min(1).max(512),
  TextFormat: TextConditionalFormatSchema.optional(),
});

export const TableConditionalFormattingOptionSchema = z.object({
  Row: TableRowConditionalFormattingSchema.optional(),
  Cell: TableCellConditionalFormattingSchema.optional(),
});

export const TableConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(TableConditionalFormattingOptionSchema)
    .optional(),
});

export const TableSortConfigurationSchema = z.object({
  RowSort: z.array(FieldSortOptionsSchema).optional(),
  PaginationConfiguration: PaginationConfigurationSchema.optional(),
});

export const TablePaginatedReportOptionsSchema = z.object({
  OverflowColumnHeaderVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  VerticalOverflowVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const TableBorderOptionsSchema = z.object({
  Thickness: z.number().min(1).max(4).optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  Style: z.enum(["NONE", "SOLID"]).optional(),
});

export const TableSideBorderOptionsSchema = z.object({
  Left: TableBorderOptionsSchema.optional(),
  Top: TableBorderOptionsSchema.optional(),
  InnerHorizontal: TableBorderOptionsSchema.optional(),
  Right: TableBorderOptionsSchema.optional(),
  Bottom: TableBorderOptionsSchema.optional(),
  InnerVertical: TableBorderOptionsSchema.optional(),
});

export const GlobalTableBorderOptionsSchema = z.object({
  UniformBorder: TableBorderOptionsSchema.optional(),
  SideSpecificBorder: TableSideBorderOptionsSchema.optional(),
});

export const TableCellStyleSchema = z.object({
  VerticalTextAlignment: z.enum(["TOP", "MIDDLE", "BOTTOM", "AUTO"]).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Height: z.number().min(8).max(500).optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
  Border: GlobalTableBorderOptionsSchema.optional(),
  TextWrap: z.enum(["NONE", "WRAP"]).optional(),
  HorizontalTextAlignment: z.enum(["LEFT", "CENTER", "RIGHT", "AUTO"])
    .optional(),
  BackgroundColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const RowAlternateColorOptionsSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  UsePrimaryBackgroundColor: z.enum(["ENABLED", "DISABLED"]).optional(),
  RowAlternateColors: z.array(z.string().regex(new RegExp("^#[A-F0-9]{6}$")))
    .optional(),
});

export const TableOptionsSchema = z.object({
  HeaderStyle: TableCellStyleSchema.optional(),
  CellStyle: TableCellStyleSchema.optional(),
  Orientation: z.enum(["VERTICAL", "HORIZONTAL"]).optional(),
  RowAlternateColorOptions: RowAlternateColorOptionsSchema.optional(),
});

export const DataBarsOptionsSchema = z.object({
  PositiveColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  FieldId: z.string().min(1).max(512),
  NegativeColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const TableInlineVisualizationSchema = z.object({
  DataBars: DataBarsOptionsSchema.optional(),
});

export const TableUnaggregatedFieldWellsSchema = z.object({
  Values: z.array(UnaggregatedFieldSchema).optional(),
});

export const TableAggregatedFieldWellsSchema = z.object({
  GroupBy: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

export const TableFieldWellsSchema = z.object({
  TableUnaggregatedFieldWells: TableUnaggregatedFieldWellsSchema.optional(),
  TableAggregatedFieldWells: TableAggregatedFieldWellsSchema.optional(),
});

export const TablePinnedFieldOptionsSchema = z.object({
  PinnedLeftFields: z.array(z.string().min(1).max(512)).optional(),
});

export const TransposedTableOptionSchema = z.object({
  ColumnWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  ColumnIndex: z.number().min(0).max(9999).optional(),
  ColumnType: z.enum(["ROW_HEADER_COLUMN", "VALUE_COLUMN"]),
});

export const TableFieldCustomIconContentSchema = z.object({
  Icon: z.enum(["LINK"]).optional(),
});

export const TableFieldCustomTextContentSchema = z.object({
  Value: z.string().optional(),
  FontConfiguration: FontConfigurationSchema,
});

export const TableFieldLinkContentConfigurationSchema = z.object({
  CustomIconContent: TableFieldCustomIconContentSchema.optional(),
  CustomTextContent: TableFieldCustomTextContentSchema.optional(),
});

export const TableFieldLinkConfigurationSchema = z.object({
  Target: z.enum(["NEW_TAB", "NEW_WINDOW", "SAME_TAB"]),
  Content: TableFieldLinkContentConfigurationSchema,
});

export const TableCellImageSizingConfigurationSchema = z.object({
  TableCellImageScalingConfiguration: z.enum([
    "FIT_TO_CELL_HEIGHT",
    "FIT_TO_CELL_WIDTH",
    "DO_NOT_SCALE",
  ]).optional(),
});

export const TableFieldImageConfigurationSchema = z.object({
  SizingOptions: TableCellImageSizingConfigurationSchema.optional(),
});

export const TableFieldURLConfigurationSchema = z.object({
  LinkConfiguration: TableFieldLinkConfigurationSchema.optional(),
  ImageConfiguration: TableFieldImageConfigurationSchema.optional(),
});

export const TableFieldOptionSchema = z.object({
  CustomLabel: z.string().min(1).max(2048).optional(),
  URLStyling: TableFieldURLConfigurationSchema.optional(),
  FieldId: z.string().min(1).max(512),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Width: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

export const TableFieldOptionsSchema = z.object({
  Order: z.array(z.string().min(1).max(512)).optional(),
  PinnedFieldOptions: TablePinnedFieldOptionsSchema.optional(),
  TransposedTableOptions: z.array(TransposedTableOptionSchema).optional(),
  SelectedFieldOptions: z.array(TableFieldOptionSchema).optional(),
});

export const TotalAggregationFunctionSchema = z.object({
  SimpleTotalAggregationFunction: z.enum([
    "DEFAULT",
    "SUM",
    "AVERAGE",
    "MIN",
    "MAX",
    "NONE",
  ]).optional(),
});

export const TotalAggregationOptionSchema = z.object({
  TotalAggregationFunction: TotalAggregationFunctionSchema,
  FieldId: z.string().min(1).max(512),
});

export const TotalOptionsSchema = z.object({
  TotalAggregationOptions: z.array(TotalAggregationOptionSchema).optional(),
  CustomLabel: z.string().optional(),
  ScrollStatus: z.enum(["PINNED", "SCROLLED"]).optional(),
  Placement: z.enum(["START", "END", "AUTO"]).optional(),
  TotalCellStyle: TableCellStyleSchema.optional(),
  TotalsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const TableConfigurationSchema = z.object({
  SortConfiguration: TableSortConfigurationSchema.optional(),
  PaginatedReportOptions: TablePaginatedReportOptionsSchema.optional(),
  TableOptions: TableOptionsSchema.optional(),
  TableInlineVisualizations: z.array(TableInlineVisualizationSchema).optional(),
  FieldWells: TableFieldWellsSchema.optional(),
  FieldOptions: TableFieldOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  TotalOptions: TotalOptionsSchema.optional(),
});

export const TableVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: TableConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: TableConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const PivotTableConditionalFormattingScopeSchema = z.object({
  Role: z.enum(["FIELD", "FIELD_TOTAL", "GRAND_TOTAL"]).optional(),
});

export const PivotTableCellConditionalFormattingSchema = z.object({
  Scope: PivotTableConditionalFormattingScopeSchema.optional(),
  Scopes: z.array(PivotTableConditionalFormattingScopeSchema).optional(),
  FieldId: z.string().min(1).max(512),
  TextFormat: TextConditionalFormatSchema.optional(),
});

export const PivotTableConditionalFormattingOptionSchema = z.object({
  Cell: PivotTableCellConditionalFormattingSchema.optional(),
});

export const PivotTableConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(
    PivotTableConditionalFormattingOptionSchema,
  ).optional(),
});

export const DataPathSortSchema = z.object({
  SortPaths: z.array(DataPathValueSchema),
  Direction: z.enum(["ASC", "DESC"]),
});

export const PivotTableSortBySchema = z.object({
  Field: FieldSortSchema.optional(),
  DataPath: DataPathSortSchema.optional(),
  Column: ColumnSortSchema.optional(),
});

export const PivotFieldSortOptionsSchema = z.object({
  SortBy: PivotTableSortBySchema,
  FieldId: z.string().min(1).max(512),
});

export const PivotTableSortConfigurationSchema = z.object({
  FieldSortOptions: z.array(PivotFieldSortOptionsSchema).optional(),
});

export const PivotTablePaginatedReportOptionsSchema = z.object({
  OverflowColumnHeaderVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  VerticalOverflowVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const PivotTableRowsLabelOptionsSchema = z.object({
  CustomLabel: z.string().min(1).max(1024).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const PivotTableOptionsSchema = z.object({
  RowFieldNamesStyle: TableCellStyleSchema.optional(),
  RowHeaderStyle: TableCellStyleSchema.optional(),
  CollapsedRowDimensionsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  RowsLayout: z.enum(["TABULAR", "HIERARCHY"]).optional(),
  MetricPlacement: z.enum(["ROW", "COLUMN"]).optional(),
  DefaultCellWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  ColumnNamesVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  RowsLabelOptions: PivotTableRowsLabelOptionsSchema.optional(),
  SingleMetricVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  ColumnHeaderStyle: TableCellStyleSchema.optional(),
  ToggleButtonsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  CellStyle: TableCellStyleSchema.optional(),
  RowAlternateColorOptions: RowAlternateColorOptionsSchema.optional(),
});

export const PivotTableAggregatedFieldWellsSchema = z.object({
  Values: z.array(MeasureFieldSchema).optional(),
  Columns: z.array(DimensionFieldSchema).optional(),
  Rows: z.array(DimensionFieldSchema).optional(),
});

export const PivotTableFieldWellsSchema = z.object({
  PivotTableAggregatedFieldWells: PivotTableAggregatedFieldWellsSchema
    .optional(),
});

export const PivotTableFieldCollapseStateTargetSchema = z.object({
  FieldId: z.string().optional(),
  FieldDataPathValues: z.array(DataPathValueSchema).optional(),
});

export const PivotTableFieldCollapseStateOptionSchema = z.object({
  Target: PivotTableFieldCollapseStateTargetSchema,
  State: z.enum(["COLLAPSED", "EXPANDED"]).optional(),
});

export const PivotTableDataPathOptionSchema = z.object({
  DataPathList: z.array(DataPathValueSchema),
  Width: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

export const PivotTableFieldOptionSchema = z.object({
  CustomLabel: z.string().min(1).max(2048).optional(),
  FieldId: z.string().min(1).max(512),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

export const PivotTableFieldOptionsSchema = z.object({
  CollapseStateOptions: z.array(PivotTableFieldCollapseStateOptionSchema)
    .optional(),
  DataPathOptions: z.array(PivotTableDataPathOptionSchema).optional(),
  SelectedFieldOptions: z.array(PivotTableFieldOptionSchema).optional(),
});

export const PivotTableFieldSubtotalOptionsSchema = z.object({
  FieldId: z.string().min(1).max(512).optional(),
});

export const TableStyleTargetSchema = z.object({
  CellType: z.enum(["TOTAL", "METRIC_HEADER", "VALUE"]),
});

export const SubtotalOptionsSchema = z.object({
  CustomLabel: z.string().optional(),
  FieldLevelOptions: z.array(PivotTableFieldSubtotalOptionsSchema).optional(),
  ValueCellStyle: TableCellStyleSchema.optional(),
  TotalCellStyle: TableCellStyleSchema.optional(),
  TotalsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FieldLevel: z.enum(["ALL", "CUSTOM", "LAST"]).optional(),
  MetricHeaderCellStyle: TableCellStyleSchema.optional(),
  StyleTargets: z.array(TableStyleTargetSchema).optional(),
});

export const PivotTotalOptionsSchema = z.object({
  TotalAggregationOptions: z.array(TotalAggregationOptionSchema).optional(),
  CustomLabel: z.string().optional(),
  ValueCellStyle: TableCellStyleSchema.optional(),
  ScrollStatus: z.enum(["PINNED", "SCROLLED"]).optional(),
  Placement: z.enum(["START", "END", "AUTO"]).optional(),
  TotalCellStyle: TableCellStyleSchema.optional(),
  TotalsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  MetricHeaderCellStyle: TableCellStyleSchema.optional(),
});

export const PivotTableTotalOptionsSchema = z.object({
  ColumnSubtotalOptions: SubtotalOptionsSchema.optional(),
  RowSubtotalOptions: SubtotalOptionsSchema.optional(),
  RowTotalOptions: PivotTotalOptionsSchema.optional(),
  ColumnTotalOptions: PivotTotalOptionsSchema.optional(),
});

export const PivotTableConfigurationSchema = z.object({
  SortConfiguration: PivotTableSortConfigurationSchema.optional(),
  PaginatedReportOptions: PivotTablePaginatedReportOptionsSchema.optional(),
  TableOptions: PivotTableOptionsSchema.optional(),
  FieldWells: PivotTableFieldWellsSchema.optional(),
  FieldOptions: PivotTableFieldOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  TotalOptions: PivotTableTotalOptionsSchema.optional(),
});

export const PivotTableVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: PivotTableConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: PivotTableConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const BarChartSortConfigurationSchema = z.object({
  SmallMultiplesSort: z.array(FieldSortOptionsSchema).optional(),
  ColorSort: z.array(FieldSortOptionsSchema).optional(),
  ColorItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

export const BarChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Colors: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
  SmallMultiples: z.array(DimensionFieldSchema).optional(),
});

export const BarChartFieldWellsSchema = z.object({
  BarChartAggregatedFieldWells: BarChartAggregatedFieldWellsSchema.optional(),
});

export const BarChartConfigurationSchema = z.object({
  SortConfiguration: BarChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  ReferenceLines: z.array(ReferenceLineSchema).optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  ColorLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  SmallMultiplesOptions: SmallMultiplesOptionsSchema.optional(),
  Orientation: z.enum(["HORIZONTAL", "VERTICAL"]).optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  ValueLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  BarsArrangement: z.enum(["CLUSTERED", "STACKED", "STACKED_PERCENT"])
    .optional(),
  CategoryAxis: AxisDisplayOptionsSchema.optional(),
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultSchema)
    .optional(),
  FieldWells: BarChartFieldWellsSchema.optional(),
  ValueAxis: AxisDisplayOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

export const BarChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: BarChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const HeatMapSortConfigurationSchema = z.object({
  HeatMapRowSort: z.array(FieldSortOptionsSchema).optional(),
  HeatMapRowItemsLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
  HeatMapColumnItemsLimitConfiguration: ItemsLimitConfigurationSchema
    .optional(),
  HeatMapColumnSort: z.array(FieldSortOptionsSchema).optional(),
});

export const HeatMapAggregatedFieldWellsSchema = z.object({
  Values: z.array(MeasureFieldSchema).optional(),
  Columns: z.array(DimensionFieldSchema).optional(),
  Rows: z.array(DimensionFieldSchema).optional(),
});

export const HeatMapFieldWellsSchema = z.object({
  HeatMapAggregatedFieldWells: HeatMapAggregatedFieldWellsSchema.optional(),
});

export const DataColorSchema = z.object({
  DataValue: z.number().optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const ColorScaleSchema = z.object({
  Colors: z.array(DataColorSchema),
  ColorFillType: z.enum(["DISCRETE", "GRADIENT"]),
  NullValueColor: DataColorSchema.optional(),
});

export const HeatMapConfigurationSchema = z.object({
  SortConfiguration: HeatMapSortConfigurationSchema.optional(),
  ColumnLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  FieldWells: HeatMapFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  ColorScale: ColorScaleSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  RowLabelOptions: ChartAxisLabelOptionsSchema.optional(),
});

export const HeatMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: HeatMapConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const TreeMapSortConfigurationSchema = z.object({
  TreeMapSort: z.array(FieldSortOptionsSchema).optional(),
  TreeMapGroupItemsLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

export const TreeMapAggregatedFieldWellsSchema = z.object({
  Sizes: z.array(MeasureFieldSchema).optional(),
  Colors: z.array(MeasureFieldSchema).optional(),
  Groups: z.array(DimensionFieldSchema).optional(),
});

export const TreeMapFieldWellsSchema = z.object({
  TreeMapAggregatedFieldWells: TreeMapAggregatedFieldWellsSchema.optional(),
});

export const TreeMapConfigurationSchema = z.object({
  SortConfiguration: TreeMapSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  ColorLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  SizeLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: TreeMapFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  ColorScale: ColorScaleSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  GroupLabelOptions: ChartAxisLabelOptionsSchema.optional(),
});

export const TreeMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: TreeMapConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const PeriodToDateComputationSchema = z.object({
  PeriodTimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

export const GrowthRateComputationSchema = z.object({
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  PeriodSize: z.number().min(2).max(52).optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

export const TopBottomRankedComputationSchema = z.object({
  Type: z.enum(["TOP", "BOTTOM"]),
  Category: DimensionFieldSchema.optional(),
  ResultSize: z.number().min(1).max(20).optional(),
  Value: MeasureFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

export const TotalAggregationComputationSchema = z.object({
  Value: MeasureFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

export const ForecastComputationSchema = z.object({
  PeriodsBackward: z.number().min(0).max(1000).optional(),
  PeriodsForward: z.number().min(1).max(1000).optional(),
  PredictionInterval: z.number().min(50).max(95).optional(),
  Seasonality: z.enum(["AUTOMATIC", "CUSTOM"]).optional(),
  CustomSeasonalityValue: z.number().min(1).max(180).optional(),
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  UpperBoundary: z.number().optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
  LowerBoundary: z.number().optional(),
});

export const MaximumMinimumComputationSchema = z.object({
  Type: z.enum(["MAXIMUM", "MINIMUM"]),
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

export const PeriodOverPeriodComputationSchema = z.object({
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

export const MetricComparisonComputationSchema = z.object({
  TargetValue: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  FromValue: MeasureFieldSchema.optional(),
  Name: z.string().optional(),
});

export const TopBottomMoversComputationSchema = z.object({
  Type: z.enum(["TOP", "BOTTOM"]),
  Category: DimensionFieldSchema.optional(),
  Value: MeasureFieldSchema.optional(),
  SortOrder: z.enum(["PERCENT_DIFFERENCE", "ABSOLUTE_DIFFERENCE"]).optional(),
  Time: DimensionFieldSchema.optional(),
  MoverSize: z.number().min(1).max(20).optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

export const UniqueValuesComputationSchema = z.object({
  Category: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

export const ComputationSchema = z.object({
  PeriodToDate: PeriodToDateComputationSchema.optional(),
  GrowthRate: GrowthRateComputationSchema.optional(),
  TopBottomRanked: TopBottomRankedComputationSchema.optional(),
  TotalAggregation: TotalAggregationComputationSchema.optional(),
  Forecast: ForecastComputationSchema.optional(),
  MaximumMinimum: MaximumMinimumComputationSchema.optional(),
  PeriodOverPeriod: PeriodOverPeriodComputationSchema.optional(),
  MetricComparison: MetricComparisonComputationSchema.optional(),
  TopBottomMovers: TopBottomMoversComputationSchema.optional(),
  UniqueValues: UniqueValuesComputationSchema.optional(),
});

export const CustomNarrativeOptionsSchema = z.object({
  Narrative: z.string().min(0).max(150000),
});

export const InsightConfigurationSchema = z.object({
  Computations: z.array(ComputationSchema).optional(),
  CustomNarrative: CustomNarrativeOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

export const InsightVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Actions: z.array(VisualCustomActionSchema).optional(),
  DataSetIdentifier: z.string().min(1).max(2048),
  InsightConfiguration: InsightConfigurationSchema.optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

export const LineChartSortConfigurationSchema = z.object({
  CategoryItemsLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
  ColorItemsLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
  SmallMultiplesSort: z.array(FieldSortOptionsSchema).optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

export const MissingDataConfigurationSchema = z.object({
  TreatmentOption: z.enum(["INTERPOLATE", "SHOW_AS_ZERO", "SHOW_AS_BLANK"])
    .optional(),
});

export const LineSeriesAxisDisplayOptionsSchema = z.object({
  MissingDataConfigurations: z.array(MissingDataConfigurationSchema).optional(),
  AxisOptions: AxisDisplayOptionsSchema.optional(),
});

export const LineChartLineStyleSettingsSchema = z.object({
  LineInterpolation: z.enum(["LINEAR", "SMOOTH", "STEPPED"]).optional(),
  LineStyle: z.enum(["SOLID", "DOTTED", "DASHED"]).optional(),
  LineVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LineWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

export const LineChartMarkerStyleSettingsSchema = z.object({
  MarkerShape: z.enum([
    "CIRCLE",
    "TRIANGLE",
    "SQUARE",
    "DIAMOND",
    "ROUNDED_SQUARE",
  ]).optional(),
  MarkerSize: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  MarkerVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  MarkerColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

export const LineChartDefaultSeriesSettingsSchema = z.object({
  LineStyleSettings: LineChartLineStyleSettingsSchema.optional(),
  AxisBinding: z.enum(["PRIMARY_YAXIS", "SECONDARY_YAXIS"]).optional(),
  MarkerStyleSettings: LineChartMarkerStyleSettingsSchema.optional(),
});

export const TimeBasedForecastPropertiesSchema = z.object({
  PeriodsBackward: z.number().min(0).max(1000).optional(),
  PeriodsForward: z.number().min(1).max(1000).optional(),
  PredictionInterval: z.number().min(50).max(95).optional(),
  Seasonality: z.number().min(1).max(180).optional(),
  UpperBoundary: z.number().optional(),
  LowerBoundary: z.number().optional(),
});

export const WhatIfRangeScenarioSchema = z.object({
  StartDate: z.string(),
  Value: z.number(),
  EndDate: z.string(),
});

export const WhatIfPointScenarioSchema = z.object({
  Value: z.number(),
  Date: z.string(),
});

export const ForecastScenarioSchema = z.object({
  WhatIfRangeScenario: WhatIfRangeScenarioSchema.optional(),
  WhatIfPointScenario: WhatIfPointScenarioSchema.optional(),
});

export const ForecastConfigurationSchema = z.object({
  ForecastProperties: TimeBasedForecastPropertiesSchema.optional(),
  Scenario: ForecastScenarioSchema.optional(),
});

export const LineChartSeriesSettingsSchema = z.object({
  LineStyleSettings: LineChartLineStyleSettingsSchema.optional(),
  MarkerStyleSettings: LineChartMarkerStyleSettingsSchema.optional(),
});

export const FieldSeriesItemSchema = z.object({
  FieldId: z.string().min(1).max(512),
  AxisBinding: z.enum(["PRIMARY_YAXIS", "SECONDARY_YAXIS"]),
  Settings: LineChartSeriesSettingsSchema.optional(),
});

export const DataFieldSeriesItemSchema = z.object({
  FieldId: z.string().min(1).max(512),
  AxisBinding: z.enum(["PRIMARY_YAXIS", "SECONDARY_YAXIS"]),
  FieldValue: z.string().optional(),
  Settings: LineChartSeriesSettingsSchema.optional(),
});

export const SeriesItemSchema = z.object({
  FieldSeriesItem: FieldSeriesItemSchema.optional(),
  DataFieldSeriesItem: DataFieldSeriesItemSchema.optional(),
});

export const LineChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Colors: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
  SmallMultiples: z.array(DimensionFieldSchema).optional(),
});

export const LineChartFieldWellsSchema = z.object({
  LineChartAggregatedFieldWells: LineChartAggregatedFieldWellsSchema.optional(),
});

export const LineChartConfigurationSchema = z.object({
  SortConfiguration: LineChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  ReferenceLines: z.array(ReferenceLineSchema).optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  SingleAxisOptions: SingleAxisOptionsSchema.optional(),
  SmallMultiplesOptions: SmallMultiplesOptionsSchema.optional(),
  PrimaryYAxisDisplayOptions: LineSeriesAxisDisplayOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  XAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  DefaultSeriesSettings: LineChartDefaultSeriesSettingsSchema.optional(),
  SecondaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  ForecastConfigurations: z.array(ForecastConfigurationSchema).optional(),
  Series: z.array(SeriesItemSchema).optional(),
  Type: z.enum(["LINE", "AREA", "STACKED_AREA"]).optional(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultSchema)
    .optional(),
  FieldWells: LineChartFieldWellsSchema.optional(),
  SecondaryYAxisDisplayOptions: LineSeriesAxisDisplayOptionsSchema.optional(),
  XAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

export const LineChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: LineChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

export const EmptyVisualSchema = z.object({
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Actions: z.array(VisualCustomActionSchema).optional(),
  DataSetIdentifier: z.string().min(1).max(2048),
});

export const VisualSchema = z.object({
  FunnelChartVisual: FunnelChartVisualSchema.optional(),
  BoxPlotVisual: BoxPlotVisualSchema.optional(),
  LayerMapVisual: LayerMapVisualSchema.optional(),
  GeospatialMapVisual: GeospatialMapVisualSchema.optional(),
  ScatterPlotVisual: ScatterPlotVisualSchema.optional(),
  RadarChartVisual: RadarChartVisualSchema.optional(),
  ComboChartVisual: ComboChartVisualSchema.optional(),
  WordCloudVisual: WordCloudVisualSchema.optional(),
  SankeyDiagramVisual: SankeyDiagramVisualSchema.optional(),
  GaugeChartVisual: GaugeChartVisualSchema.optional(),
  FilledMapVisual: FilledMapVisualSchema.optional(),
  WaterfallVisual: WaterfallVisualSchema.optional(),
  CustomContentVisual: CustomContentVisualSchema.optional(),
  PieChartVisual: PieChartVisualSchema.optional(),
  KPIVisual: KPIVisualSchema.optional(),
  HistogramVisual: HistogramVisualSchema.optional(),
  PluginVisual: PluginVisualSchema.optional(),
  TableVisual: TableVisualSchema.optional(),
  PivotTableVisual: PivotTableVisualSchema.optional(),
  BarChartVisual: BarChartVisualSchema.optional(),
  HeatMapVisual: HeatMapVisualSchema.optional(),
  TreeMapVisual: TreeMapVisualSchema.optional(),
  InsightVisual: InsightVisualSchema.optional(),
  LineChartVisual: LineChartVisualSchema.optional(),
  EmptyVisual: EmptyVisualSchema.optional(),
});

export const SheetDefinitionSchema = z.object({
  Description: z.string().min(1).max(1024).optional(),
  ParameterControls: z.array(ParameterControlSchema).optional(),
  ContentType: z.enum(["PAGINATED", "INTERACTIVE"]).optional(),
  SheetId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Images: z.array(SheetImageSchema).optional(),
  SheetControlLayouts: z.array(SheetControlLayoutSchema).optional(),
  Title: z.string().min(1).max(1024).optional(),
  Name: z.string().min(1).max(2048).optional(),
  TextBoxes: z.array(SheetTextBoxSchema).optional(),
  Layouts: z.array(LayoutSchema).optional(),
  FilterControls: z.array(FilterControlSchema).optional(),
  Visuals: z.array(VisualSchema).optional(),
});

export const MappedDataSetParameterSchema = z.object({
  DataSetParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  DataSetIdentifier: z.string().min(1).max(2048),
});

export const DynamicDefaultValueSchema = z.object({
  GroupNameColumn: ColumnIdentifierSchema.optional(),
  DefaultValueColumn: ColumnIdentifierSchema,
  UserNameColumn: ColumnIdentifierSchema.optional(),
});

export const StringDefaultValuesSchema = z.object({
  DynamicValue: DynamicDefaultValueSchema.optional(),
  StaticValues: z.array(z.string()).optional(),
});

export const StringValueWhenUnsetConfigurationSchema = z.object({
  ValueWhenUnsetOption: z.enum(["RECOMMENDED_VALUE", "NULL"]).optional(),
  CustomValue: z.string().optional(),
});

export const StringParameterDeclarationSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterSchema).optional(),
  DefaultValues: StringDefaultValuesSchema.optional(),
  ParameterValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  ValueWhenUnset: StringValueWhenUnsetConfigurationSchema.optional(),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$")),
});

export const DateTimeDefaultValuesSchema = z.object({
  RollingDate: RollingDateConfigurationSchema.optional(),
  DynamicValue: DynamicDefaultValueSchema.optional(),
  StaticValues: z.array(z.string()).optional(),
});

export const DateTimeValueWhenUnsetConfigurationSchema = z.object({
  ValueWhenUnsetOption: z.enum(["RECOMMENDED_VALUE", "NULL"]).optional(),
  CustomValue: z.string().optional(),
});

export const DateTimeParameterDeclarationSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterSchema).optional(),
  DefaultValues: DateTimeDefaultValuesSchema.optional(),
  TimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
  ValueWhenUnset: DateTimeValueWhenUnsetConfigurationSchema.optional(),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$")),
});

export const DecimalDefaultValuesSchema = z.object({
  DynamicValue: DynamicDefaultValueSchema.optional(),
  StaticValues: z.array(z.number()).optional(),
});

export const DecimalValueWhenUnsetConfigurationSchema = z.object({
  ValueWhenUnsetOption: z.enum(["RECOMMENDED_VALUE", "NULL"]).optional(),
  CustomValue: z.number().optional(),
});

export const DecimalParameterDeclarationSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterSchema).optional(),
  DefaultValues: DecimalDefaultValuesSchema.optional(),
  ParameterValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  ValueWhenUnset: DecimalValueWhenUnsetConfigurationSchema.optional(),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$")),
});

export const IntegerDefaultValuesSchema = z.object({
  DynamicValue: DynamicDefaultValueSchema.optional(),
  StaticValues: z.array(z.number()).optional(),
});

export const IntegerValueWhenUnsetConfigurationSchema = z.object({
  ValueWhenUnsetOption: z.enum(["RECOMMENDED_VALUE", "NULL"]).optional(),
  CustomValue: z.number().optional(),
});

export const IntegerParameterDeclarationSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterSchema).optional(),
  DefaultValues: IntegerDefaultValuesSchema.optional(),
  ParameterValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  ValueWhenUnset: IntegerValueWhenUnsetConfigurationSchema.optional(),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$")),
});

export const ParameterDeclarationSchema = z.object({
  StringParameterDeclaration: StringParameterDeclarationSchema.optional(),
  DateTimeParameterDeclaration: DateTimeParameterDeclarationSchema.optional(),
  DecimalParameterDeclaration: DecimalParameterDeclarationSchema.optional(),
  IntegerParameterDeclaration: IntegerParameterDeclarationSchema.optional(),
});

export const ResourcePermissionSchema = z.object({
  Actions: z.array(z.string()).describe(
    "The IAM action to grant or revoke permissions on.",
  ),
  Principal: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the principal. This can be one of the following:   The ARN of an Amazon QuickSight user or group associated with a data source or dataset. (This is common.)   The ARN of an Amazon QuickSight user, group, or namespace associated with an analysis, dashboard, template, or theme. (This is common.)   The ARN of an Amazon Web Services account root: This is an IAM ARN rather than a QuickSight ARN. Use this option only to share resources (templates) across Amazon Web Services accounts. (This is less common.)",
  ),
});

export const SheetControlsOptionSchema = z.object({
  VisibilityState: z.enum(["EXPANDED", "COLLAPSED"]).optional(),
});

export const DataPointDrillUpDownOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const AdHocFilteringOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const ExportHiddenFieldsOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const DashboardVisualPublishOptionsSchema = z.object({
  ExportHiddenFieldsOption: ExportHiddenFieldsOptionSchema.describe(
    "Determines if hidden fields are included in an exported dashboard.",
  ).optional(),
});

export const DataStoriesSharingOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const VisualAxisSortOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const ExportWithHiddenFieldsOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const QuickSuiteActionsOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const ExecutiveSummaryOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const ExportToCSVOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const DataPointMenuLabelOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const DataPointTooltipOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const DataQAEnabledOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const SheetLayoutElementMaximizationOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export const EntitySchema = z.object({
  Path: z.string().regex(new RegExp("\\S")).optional(),
});

export const DashboardErrorSchema = z.object({
  Type: z.enum([
    "ACCESS_DENIED",
    "SOURCE_NOT_FOUND",
    "DATA_SET_NOT_FOUND",
    "INTERNAL_FAILURE",
    "PARAMETER_VALUE_INCOMPATIBLE",
    "PARAMETER_TYPE_INVALID",
    "PARAMETER_NOT_FOUND",
    "COLUMN_TYPE_MISMATCH",
    "COLUMN_GEOGRAPHIC_ROLE_MISMATCH",
    "COLUMN_REPLACEMENT_MISSING",
  ]).optional(),
  Message: z.string().regex(new RegExp("\\S")).describe("Message.").optional(),
  ViolatedEntities: z.array(EntitySchema).describe(
    "Lists the violated entities that caused the dashboard error.",
  ).optional(),
});

export const SheetSchema = z.object({
  SheetId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")).describe(
    "The unique identifier associated with a sheet.",
  ).optional(),
  Name: z.string().min(1).max(2048).describe(
    "The name of a sheet. This name is displayed on the sheet's tab in the Amazon QuickSight console.",
  ).optional(),
});

export const TagSchema = z.object({
  Value: z.string().min(1).max(256).describe("Tag value."),
  Key: z.string().min(1).max(128).describe("Tag key."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Parameters: z.object({
    StringParameters: z.array(StringParameterSchema).describe(
      "The parameters that have a data type of string.",
    ).optional(),
    DecimalParameters: z.array(DecimalParameterSchema).describe(
      "The parameters that have a data type of decimal.",
    ).optional(),
    IntegerParameters: z.array(IntegerParameterSchema).describe(
      "The parameters that have a data type of integer.",
    ).optional(),
    DateTimeParameters: z.array(DateTimeParameterSchema).describe(
      "The parameters that have a data type of date-time.",
    ).optional(),
  }).describe(
    "A list of Amazon QuickSight parameters and the list's override values.",
  ).optional(),
  VersionDescription: z.string().min(1).max(512).optional(),
  SourceEntity: z.object({
    SourceTemplate: DashboardSourceTemplateSchema.describe(
      "Dashboard source template.",
    ).optional(),
  }).describe("Dashboard source entity.").optional(),
  ThemeArn: z.string().optional(),
  Definition: z.object({
    Options: AssetOptionsSchema.optional(),
    FilterGroups: z.array(FilterGroupSchema).optional(),
    StaticFiles: z.array(StaticFileSchema).optional(),
    CalculatedFields: z.array(CalculatedFieldSchema).optional(),
    DataSetIdentifierDeclarations: z.array(DataSetIdentifierDeclarationSchema),
    ColumnConfigurations: z.array(ColumnConfigurationSchema).optional(),
    AnalysisDefaults: AnalysisDefaultsSchema.optional(),
    Sheets: z.array(SheetDefinitionSchema).optional(),
    ParameterDeclarations: z.array(ParameterDeclarationSchema).optional(),
  }).optional(),
  ValidationStrategy: z.object({
    Mode: z.enum(["STRICT", "LENIENT"]),
  }).describe(
    "The option to relax the validation that is required to create and update analyses, dashboards, and templates with definition objects. When you set this value to LENIENT, validation is skipped for specific errors.",
  ).optional(),
  FolderArns: z.array(z.string()).optional(),
  DashboardId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  LinkSharingConfiguration: z.object({
    Permissions: z.array(ResourcePermissionSchema).optional(),
  }).optional(),
  Name: z.string().min(1).max(2048),
  DashboardPublishOptions: z.object({
    SheetControlsOption: SheetControlsOptionSchema.describe(
      "Sheet controls option.",
    ).optional(),
    DataPointDrillUpDownOption: DataPointDrillUpDownOptionSchema.describe(
      "The drill down options for data points in a dashbaord.",
    ).optional(),
    AdHocFilteringOption: AdHocFilteringOptionSchema.describe(
      "An ad hoc (one-time) filtering option.",
    ).optional(),
    VisualPublishOptions: DashboardVisualPublishOptionsSchema.describe(
      "The visual publish options of a visual in a dashboard",
    ).optional(),
    DataStoriesSharingOption: DataStoriesSharingOptionSchema.optional(),
    VisualAxisSortOption: VisualAxisSortOptionSchema.optional(),
    ExportWithHiddenFieldsOption: ExportWithHiddenFieldsOptionSchema.describe(
      "Determines whether or not hidden fields are visible on exported dashbaords.",
    ).optional(),
    QuickSuiteActionsOption: QuickSuiteActionsOptionSchema.optional(),
    ExecutiveSummaryOption: ExecutiveSummaryOptionSchema.optional(),
    ExportToCSVOption: ExportToCSVOptionSchema.describe("Export to.csv option.")
      .optional(),
    DataPointMenuLabelOption: DataPointMenuLabelOptionSchema.describe(
      "The data point menu options of a dashboard.",
    ).optional(),
    VisualMenuOption: VisualMenuOptionSchema.optional(),
    DataPointTooltipOption: DataPointTooltipOptionSchema.describe(
      "The data point tooltip options.",
    ).optional(),
    DataQAEnabledOption: DataQAEnabledOptionSchema.optional(),
    SheetLayoutElementMaximizationOption:
      SheetLayoutElementMaximizationOptionSchema.describe(
        "The sheet layout maximization options of a dashbaord.",
      ).optional(),
  }).describe("Dashboard publish options.").optional(),
  Version: z.object({
    Status: z.enum([
      "CREATION_IN_PROGRESS",
      "CREATION_SUCCESSFUL",
      "CREATION_FAILED",
      "UPDATE_IN_PROGRESS",
      "UPDATE_SUCCESSFUL",
      "UPDATE_FAILED",
      "PENDING_UPDATE",
      "DELETED",
    ]).optional(),
    Errors: z.array(DashboardErrorSchema).describe(
      "Errors associated with this dashboard version.",
    ).optional(),
    Description: z.string().min(1).max(512).describe("Description.").optional(),
    DataSetArns: z.array(z.string()).describe(
      "The Amazon Resource Numbers (ARNs) for the datasets that are associated with this version of the dashboard.",
    ).optional(),
    ThemeArn: z.string().describe(
      "The ARN of the theme associated with a version of the dashboard.",
    ).optional(),
    SourceEntityArn: z.string().describe("Source entity ARN.").optional(),
    VersionNumber: z.number().min(1).describe(
      "Version number for this version of the dashboard.",
    ).optional(),
    Sheets: z.array(SheetSchema).describe(
      "A list of the associated sheets with the unique identifier and name of each sheet.",
    ).optional(),
  }).describe("Dashboard version.").optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$")),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  LinkEntities: z.array(
    z.string().min(1).max(1024).regex(
      new RegExp(
        "^arn:aws[\\w\\-]*:quicksight:[\\w\\-]+:\\d+:analysis/[\\w\\-]{1,512}$",
      ),
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  CreatedTime: z.string().optional(),
  Parameters: z.object({
    StringParameters: z.array(StringParameterSchema),
    DecimalParameters: z.array(DecimalParameterSchema),
    IntegerParameters: z.array(IntegerParameterSchema),
    DateTimeParameters: z.array(DateTimeParameterSchema),
  }).optional(),
  VersionDescription: z.string().optional(),
  SourceEntity: z.object({
    SourceTemplate: DashboardSourceTemplateSchema,
  }).optional(),
  ThemeArn: z.string().optional(),
  Definition: z.object({
    Options: AssetOptionsSchema,
    FilterGroups: z.array(FilterGroupSchema),
    StaticFiles: z.array(StaticFileSchema),
    CalculatedFields: z.array(CalculatedFieldSchema),
    DataSetIdentifierDeclarations: z.array(DataSetIdentifierDeclarationSchema),
    ColumnConfigurations: z.array(ColumnConfigurationSchema),
    AnalysisDefaults: AnalysisDefaultsSchema,
    Sheets: z.array(SheetDefinitionSchema),
    ParameterDeclarations: z.array(ParameterDeclarationSchema),
  }).optional(),
  LastUpdatedTime: z.string().optional(),
  ValidationStrategy: z.object({
    Mode: z.string(),
  }).optional(),
  FolderArns: z.array(z.string()).optional(),
  DashboardId: z.string(),
  LinkSharingConfiguration: z.object({
    Permissions: z.array(ResourcePermissionSchema),
  }).optional(),
  Name: z.string().optional(),
  DashboardPublishOptions: z.object({
    SheetControlsOption: SheetControlsOptionSchema,
    DataPointDrillUpDownOption: DataPointDrillUpDownOptionSchema,
    AdHocFilteringOption: AdHocFilteringOptionSchema,
    VisualPublishOptions: DashboardVisualPublishOptionsSchema,
    DataStoriesSharingOption: DataStoriesSharingOptionSchema,
    VisualAxisSortOption: VisualAxisSortOptionSchema,
    ExportWithHiddenFieldsOption: ExportWithHiddenFieldsOptionSchema,
    QuickSuiteActionsOption: QuickSuiteActionsOptionSchema,
    ExecutiveSummaryOption: ExecutiveSummaryOptionSchema,
    ExportToCSVOption: ExportToCSVOptionSchema,
    DataPointMenuLabelOption: DataPointMenuLabelOptionSchema,
    VisualMenuOption: VisualMenuOptionSchema,
    DataPointTooltipOption: DataPointTooltipOptionSchema,
    DataQAEnabledOption: DataQAEnabledOptionSchema,
    SheetLayoutElementMaximizationOption:
      SheetLayoutElementMaximizationOptionSchema,
  }).optional(),
  LastPublishedTime: z.string().optional(),
  Version: z.object({
    Status: z.string(),
    Errors: z.array(DashboardErrorSchema),
    CreatedTime: z.string(),
    Description: z.string(),
    DataSetArns: z.array(z.string()),
    ThemeArn: z.string(),
    Arn: z.string(),
    SourceEntityArn: z.string(),
    VersionNumber: z.number(),
    Sheets: z.array(SheetSchema),
  }).optional(),
  AwsAccountId: z.string(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  LinkEntities: z.array(z.string()).optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Parameters: z.object({
    StringParameters: z.array(StringParameterSchema).describe(
      "The parameters that have a data type of string.",
    ).optional(),
    DecimalParameters: z.array(DecimalParameterSchema).describe(
      "The parameters that have a data type of decimal.",
    ).optional(),
    IntegerParameters: z.array(IntegerParameterSchema).describe(
      "The parameters that have a data type of integer.",
    ).optional(),
    DateTimeParameters: z.array(DateTimeParameterSchema).describe(
      "The parameters that have a data type of date-time.",
    ).optional(),
  }).describe(
    "A list of Amazon QuickSight parameters and the list's override values.",
  ).optional(),
  VersionDescription: z.string().min(1).max(512).optional(),
  SourceEntity: z.object({
    SourceTemplate: DashboardSourceTemplateSchema.describe(
      "Dashboard source template.",
    ).optional(),
  }).describe("Dashboard source entity.").optional(),
  ThemeArn: z.string().optional(),
  Definition: z.object({
    Options: AssetOptionsSchema.optional(),
    FilterGroups: z.array(FilterGroupSchema).optional(),
    StaticFiles: z.array(StaticFileSchema).optional(),
    CalculatedFields: z.array(CalculatedFieldSchema).optional(),
    DataSetIdentifierDeclarations: z.array(DataSetIdentifierDeclarationSchema)
      .optional(),
    ColumnConfigurations: z.array(ColumnConfigurationSchema).optional(),
    AnalysisDefaults: AnalysisDefaultsSchema.optional(),
    Sheets: z.array(SheetDefinitionSchema).optional(),
    ParameterDeclarations: z.array(ParameterDeclarationSchema).optional(),
  }).optional(),
  ValidationStrategy: z.object({
    Mode: z.enum(["STRICT", "LENIENT"]).optional(),
  }).describe(
    "The option to relax the validation that is required to create and update analyses, dashboards, and templates with definition objects. When you set this value to LENIENT, validation is skipped for specific errors.",
  ).optional(),
  FolderArns: z.array(z.string()).optional(),
  DashboardId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$"))
    .optional(),
  LinkSharingConfiguration: z.object({
    Permissions: z.array(ResourcePermissionSchema).optional(),
  }).optional(),
  Name: z.string().min(1).max(2048).optional(),
  DashboardPublishOptions: z.object({
    SheetControlsOption: SheetControlsOptionSchema.describe(
      "Sheet controls option.",
    ).optional(),
    DataPointDrillUpDownOption: DataPointDrillUpDownOptionSchema.describe(
      "The drill down options for data points in a dashbaord.",
    ).optional(),
    AdHocFilteringOption: AdHocFilteringOptionSchema.describe(
      "An ad hoc (one-time) filtering option.",
    ).optional(),
    VisualPublishOptions: DashboardVisualPublishOptionsSchema.describe(
      "The visual publish options of a visual in a dashboard",
    ).optional(),
    DataStoriesSharingOption: DataStoriesSharingOptionSchema.optional(),
    VisualAxisSortOption: VisualAxisSortOptionSchema.optional(),
    ExportWithHiddenFieldsOption: ExportWithHiddenFieldsOptionSchema.describe(
      "Determines whether or not hidden fields are visible on exported dashbaords.",
    ).optional(),
    QuickSuiteActionsOption: QuickSuiteActionsOptionSchema.optional(),
    ExecutiveSummaryOption: ExecutiveSummaryOptionSchema.optional(),
    ExportToCSVOption: ExportToCSVOptionSchema.describe("Export to.csv option.")
      .optional(),
    DataPointMenuLabelOption: DataPointMenuLabelOptionSchema.describe(
      "The data point menu options of a dashboard.",
    ).optional(),
    VisualMenuOption: VisualMenuOptionSchema.optional(),
    DataPointTooltipOption: DataPointTooltipOptionSchema.describe(
      "The data point tooltip options.",
    ).optional(),
    DataQAEnabledOption: DataQAEnabledOptionSchema.optional(),
    SheetLayoutElementMaximizationOption:
      SheetLayoutElementMaximizationOptionSchema.describe(
        "The sheet layout maximization options of a dashbaord.",
      ).optional(),
  }).describe("Dashboard publish options.").optional(),
  Version: z.object({
    Status: z.enum([
      "CREATION_IN_PROGRESS",
      "CREATION_SUCCESSFUL",
      "CREATION_FAILED",
      "UPDATE_IN_PROGRESS",
      "UPDATE_SUCCESSFUL",
      "UPDATE_FAILED",
      "PENDING_UPDATE",
      "DELETED",
    ]).optional(),
    Errors: z.array(DashboardErrorSchema).describe(
      "Errors associated with this dashboard version.",
    ).optional(),
    Description: z.string().min(1).max(512).describe("Description.").optional(),
    DataSetArns: z.array(z.string()).describe(
      "The Amazon Resource Numbers (ARNs) for the datasets that are associated with this version of the dashboard.",
    ).optional(),
    ThemeArn: z.string().describe(
      "The ARN of the theme associated with a version of the dashboard.",
    ).optional(),
    SourceEntityArn: z.string().describe("Source entity ARN.").optional(),
    VersionNumber: z.number().min(1).describe(
      "Version number for this version of the dashboard.",
    ).optional(),
    Sheets: z.array(SheetSchema).describe(
      "A list of the associated sheets with the unique identifier and name of each sheet.",
    ).optional(),
  }).describe("Dashboard version.").optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  LinkEntities: z.array(
    z.string().min(1).max(1024).regex(
      new RegExp(
        "^arn:aws[\\w\\-]*:quicksight:[\\w\\-]+:\\d+:analysis/[\\w\\-]{1,512}$",
      ),
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

export const model = {
  type: "@swamp/aws/quicksight/dashboard",
  version: "2026.04.03.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description: "QuickSight Dashboard resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight Dashboard",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::QuickSight::Dashboard",
          desiredState,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a QuickSight Dashboard",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Dashboard",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::QuickSight::Dashboard",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a QuickSight Dashboard",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const idParts = [
          existing.AwsAccountId?.toString(),
          existing.DashboardId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::Dashboard",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::QuickSight::Dashboard",
          identifier,
          currentState,
          desiredState,
          ["AwsAccountId", "DashboardId"],
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
      description: "Delete a QuickSight Dashboard",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Dashboard",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::QuickSight::Dashboard",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./, "_");
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
      description: "Sync QuickSight Dashboard state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./, "_");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const idParts = [
          existing.AwsAccountId?.toString(),
          existing.DashboardId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::Dashboard",
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
