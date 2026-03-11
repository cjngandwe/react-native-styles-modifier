import type {
  ColorValue,
  DimensionValue,
  FlexStyle,
  FontVariant,
  ModifierStyle,
  StyleSheetLike,
  TextStyle,
  TransformsStyle,
  ViewStyle,
} from "./react-native-styles.ts";

export type { ModifierStyle, StyleSheetLike, TextStyle, ViewStyle };

/**
 * Root style interface for style objects.
 */
export interface RootStyle {
  root: Record<string, string | number>;
}

/**
 * A fluent API builder for creating React Native styles with method chaining.
 * Provides type-safe methods for all React Native style properties.
 *
 */
export class Modifier {
  protected styles: ModifierStyle = {};
  private isDev: boolean;

  constructor(isDev: boolean = false) {
    this.isDev = isDev;
  }

  /*
  // This function will be used and improved in the next future release to shorten naming for layout styles

  private parseSpaceStyleObject<T>(value: T, target = "") {
    if (typeof value === "number") this.styles.padding = value;
    const keys = Object.entries(value);
    if (!keys.length || Array.isArray(value)) return;
    for (const [key, value] of keys as [keyof T, number][]) {
      const propertyName = `${target}${key?.replace(/^./, (char) => char.toUpperCase())}`;
      if (value !== undefined) {
        (this.styles as Record<string, number>)[propertyName] = value;
      }
    }
  }
 */

  /**
   * Sets how flex items are aligned along the cross axis.
   * @param value - Alignment value ('flex-start', 'flex-end', 'center', 'stretch', 'baseline')
   * @returns The modifier instance for chaining
   */
  alignItems(value: NonNullable<FlexStyle["alignItems"]>): this {
    this.styles.alignItems = value;
    return this;
  }

  /**
   * Sets how a flex item is aligned along the cross axis, overriding alignItems.
   * @param value - Alignment value
   * @returns The modifier instance for chaining
   */
  alignSelf(value: NonNullable<FlexStyle["alignSelf"]>): this {
    this.styles.alignSelf = value;
    return this;
  }

  /**
   * Sets how flex lines are aligned in a multi-line flex container.
   * @param value - Alignment value
   * @returns The modifier instance for chaining
   */
  alignContent(value: NonNullable<FlexStyle["alignContent"]>): this {
    this.styles.alignContent = value;
    return this;
  }

  /**
   * Sets how flex items are aligned along the main axis.
   * @param value - Justification value ('flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly')
   * @returns The modifier instance for chaining
   */
  justifyContent(value: NonNullable<FlexStyle["justifyContent"]>): this {
    this.styles.justifyContent = value;
    return this;
  }

  /**
   * Sets the flex grow, shrink, and basis combined.
   * @param value - Flex value (typically 0 or 1)
   * @returns The modifier instance for chaining
   */
  flex(value: number): this {
    this.styles.flex = value;
    return this;
  }

  /**
   * Sets the initial main size of a flex item.
   * @param value - Dimension value (number or percentage string)
   * @returns The modifier instance for chaining
   */
  flexBasis(value: DimensionValue): this {
    this.styles.flexBasis = value;
    return this;
  }

  /**
   * Sets the direction of the main axis ('row', 'column', 'row-reverse', 'column-reverse').
   * @param value - Flex direction value
   * @returns The modifier instance for chaining
   */
  flexDirection(value: NonNullable<FlexStyle["flexDirection"]>): this {
    this.styles.flexDirection = value;
    return this;
  }

  /**
   * Sets how much a flex item will grow relative to other flex items.
   * @param value - Grow factor (default is 0)
   * @returns The modifier instance for chaining
   */
  flexGrow(value: number): this {
    this.styles.flexGrow = value;
    return this;
  }

  /**
   * Sets how much a flex item will shrink relative to other flex items.
   * @param value - Shrink factor (default is 1)
   * @returns The modifier instance for chaining
   */
  flexShrink(value: number): this {
    this.styles.flexShrink = value;
    return this;
  }

  /**
   * Sets whether flex items wrap onto multiple lines.
   * @param value - Wrap value ('wrap', 'nowrap', 'wrap-reverse')
   * @returns The modifier instance for chaining
   */
  flexWrap(value: NonNullable<FlexStyle["flexWrap"]>): this {
    this.styles.flexWrap = value;
    return this;
  }

  /**
   * Sets padding for all sides.
   * @param value - Padding value in pixels or percentage
   * @returns The modifier instance for chaining
   */
  padding(value: DimensionValue): this {
    this.styles.padding = value;
    return this;
  }

  /**
   * Sets padding for top and bottom.
   * @param value - Padding value
   * @returns The modifier instance for chaining
   */
  paddingVertical(value: DimensionValue): this {
    this.styles.paddingVertical = value;
    return this;
  }

  /**
   * Sets padding for left and right.
   * @param value - Padding value
   * @returns The modifier instance for chaining
   */
  paddingHorizontal(value: DimensionValue): this {
    this.styles.paddingHorizontal = value;
    return this;
  }

  paddingTop(value: DimensionValue): this {
    this.styles.paddingTop = value;
    return this;
  }

  paddingBottom(value: DimensionValue): this {
    this.styles.paddingBottom = value;
    return this;
  }

  paddingLeft(value: DimensionValue): this {
    this.styles.paddingLeft = value;
    return this;
  }

  paddingRight(value: DimensionValue): this {
    this.styles.paddingRight = value;
    return this;
  }

  paddingStart(value: DimensionValue): this {
    this.styles.paddingStart = value;
    return this;
  }

  paddingEnd(value: DimensionValue): this {
    this.styles.paddingEnd = value;
    return this;
  }

  paddingBlock(value: DimensionValue): this {
    this.styles.paddingBlock = value;
    return this;
  }

  paddingBlockStart(value: DimensionValue): this {
    this.styles.paddingBlockStart = value;
    return this;
  }

  paddingBlockEnd(value: DimensionValue): this {
    this.styles.paddingBlockEnd = value;
    return this;
  }

  paddingInline(value: DimensionValue): this {
    this.styles.paddingInline = value;
    return this;
  }

  paddingInlineStart(value: DimensionValue): this {
    this.styles.paddingInlineStart = value;
    return this;
  }

  paddingInlineEnd(value: DimensionValue): this {
    this.styles.paddingInlineEnd = value;
    return this;
  }

  /**
   * Sets margin for all sides.
   * @param value - Margin value in pixels or percentage
   * @returns The modifier instance for chaining
   */
  margin(value: DimensionValue): this {
    this.styles.margin = value;
    return this;
  }

  marginVertical(value: DimensionValue): this {
    this.styles.marginVertical = value;
    return this;
  }

  marginHorizontal(value: DimensionValue): this {
    this.styles.marginHorizontal = value;
    return this;
  }

  marginTop(value: DimensionValue): this {
    this.styles.marginTop = value;
    return this;
  }

  marginBottom(value: DimensionValue): this {
    this.styles.marginBottom = value;
    return this;
  }

  marginLeft(value: DimensionValue): this {
    this.styles.marginLeft = value;
    return this;
  }

  marginRight(value: DimensionValue): this {
    this.styles.marginRight = value;
    return this;
  }

  marginStart(value: DimensionValue): this {
    this.styles.marginStart = value;
    return this;
  }

  marginEnd(value: DimensionValue): this {
    this.styles.marginEnd = value;
    return this;
  }

  marginBlock(value: DimensionValue): this {
    this.styles.marginBlock = value;
    return this;
  }

  marginBlockStart(value: DimensionValue): this {
    this.styles.marginBlockStart = value;
    return this;
  }

  marginBlockEnd(value: DimensionValue): this {
    this.styles.marginBlockEnd = value;
    return this;
  }

  marginInline(value: DimensionValue): this {
    this.styles.marginInline = value;
    return this;
  }

  marginInlineStart(value: DimensionValue): this {
    this.styles.marginInlineStart = value;
    return this;
  }

  marginInlineEnd(value: DimensionValue): this {
    this.styles.marginInlineEnd = value;
    return this;
  }

  /**
   * Sets the background color.
   * @param value - Color value (hex, rgb, rgba, or named color)
   * @returns The modifier instance for chaining
   */
  backgroundColor(value: ColorValue): this {
    this.styles.backgroundColor = value;
    return this;
  }

  /**
   * Sets the gap between flex items.
   * @param value - Gap value
   * @returns The modifier instance for chaining
   */
  gap(value: number | string): this {
    this.styles.gap = value;
    return this;
  }

  rowGap(value: number | string): this {
    this.styles.rowGap = value;
    return this;
  }

  columnGap(value: number | string): this {
    this.styles.columnGap = value;
    return this;
  }

  /**
   * Sets the height.
   * @param value - Height value
   * @returns The modifier instance for chaining
   */
  height(value: DimensionValue): this {
    this.styles.height = value;
    return this;
  }

  /**
   * Sets the width.
   * @param value - Width value
   * @returns The modifier instance for chaining
   */
  width(value: DimensionValue): this {
    this.styles.width = value;
    return this;
  }

  minWidth(value: DimensionValue): this {
    this.styles.minWidth = value;
    return this;
  }

  minHeight(value: DimensionValue): this {
    this.styles.minHeight = value;
    return this;
  }

  maxWidth(value: DimensionValue = "100%"): this {
    this.styles.maxWidth = value;
    return this;
  }

  maxHeight(value: DimensionValue = "100%"): this {
    this.styles.maxHeight = value;
    return this;
  }

  /**
   * Sets border radius for all corners.
   * @param value - Radius value
   * @returns The modifier instance for chaining
   */
  borderRadius(value: number | string): this {
    this.styles.borderRadius = value;
    return this;
  }

  borderTopLeftRadius(value: number | string): this {
    this.styles.borderTopLeftRadius = value;
    return this;
  }

  borderTopRightRadius(value: number | string): this {
    this.styles.borderTopRightRadius = value;
    return this;
  }

  borderBottomLeftRadius(value: number | string): this {
    this.styles.borderBottomLeftRadius = value;
    return this;
  }

  borderBottomRightRadius(value: number | string): this {
    this.styles.borderBottomRightRadius = value;
    return this;
  }

  borderTopStartRadius(value: number | string): this {
    this.styles.borderTopStartRadius = value;
    return this;
  }

  borderTopEndRadius(value: number | string): this {
    this.styles.borderTopEndRadius = value;
    return this;
  }

  borderBottomStartRadius(value: number | string): this {
    this.styles.borderBottomStartRadius = value;
    return this;
  }

  borderBottomEndRadius(value: number | string): this {
    this.styles.borderBottomEndRadius = value;
    return this;
  }

  borderStartStartRadius(value: number | string): this {
    this.styles.borderStartStartRadius = value;
    return this;
  }

  borderStartEndRadius(value: number | string): this {
    this.styles.borderStartEndRadius = value;
    return this;
  }

  borderEndStartRadius(value: number | string): this {
    this.styles.borderEndStartRadius = value;
    return this;
  }

  borderEndEndRadius(value: number | string): this {
    this.styles.borderEndEndRadius = value;
    return this;
  }

  /**
   * Sets border width for all sides.
   * @param value - Border width in pixels
   * @returns The modifier instance for chaining
   */
  borderWidth(value: number): this {
    this.styles.borderWidth = value;
    return this;
  }

  borderTopWidth(value: number): this {
    this.styles.borderTopWidth = value;
    return this;
  }

  borderBottomWidth(value: number): this {
    this.styles.borderBottomWidth = value;
    return this;
  }

  borderLeftWidth(value: number): this {
    this.styles.borderLeftWidth = value;
    return this;
  }

  borderRightWidth(value: number): this {
    this.styles.borderRightWidth = value;
    return this;
  }

  borderStartWidth(value: number): this {
    this.styles.borderStartWidth = value;
    return this;
  }

  borderEndWidth(value: number): this {
    this.styles.borderEndWidth = value;
    return this;
  }

  borderStyle(value: NonNullable<ViewStyle["borderStyle"]>): this {
    this.styles.borderStyle = value;
    return this;
  }

  /**
   * Sets border color for all sides.
   * @param value - Color value
   * @returns The modifier instance for chaining
   */
  borderColor(value: ColorValue): this {
    this.styles.borderColor = value;
    return this;
  }

  borderTopColor(value: ColorValue): this {
    this.styles.borderTopColor = value;
    return this;
  }

  borderBottomColor(value: ColorValue): this {
    this.styles.borderBottomColor = value;
    return this;
  }

  borderLeftColor(value: ColorValue): this {
    this.styles.borderLeftColor = value;
    return this;
  }

  borderRightColor(value: ColorValue): this {
    this.styles.borderRightColor = value;
    return this;
  }

  borderStartColor(value: ColorValue): this {
    this.styles.borderStartColor = value;
    return this;
  }

  borderEndColor(value: ColorValue): this {
    this.styles.borderEndColor = value;
    return this;
  }

  borderBlockColor(value: ColorValue): this {
    this.styles.borderBlockColor = value;
    return this;
  }

  borderBlockStartColor(value: ColorValue): this {
    this.styles.borderBlockStartColor = value;
    return this;
  }

  borderBlockEndColor(value: ColorValue): this {
    this.styles.borderBlockEndColor = value;
    return this;
  }

  borderCurve(value: NonNullable<ViewStyle["borderCurve"]>): this {
    this.styles.borderCurve = value;
    return this;
  }

  /**
   * Sets the positioning type ('absolute' or 'relative').
   * @param value - Position value
   * @returns The modifier instance for chaining
   */
  position(value: NonNullable<FlexStyle["position"]>): this {
    this.styles.position = value;
    return this;
  }

  top(value: DimensionValue): this {
    this.styles.top = value;
    return this;
  }

  bottom(value: DimensionValue): this {
    this.styles.bottom = value;
    return this;
  }

  left(value: DimensionValue): this {
    this.styles.left = value;
    return this;
  }

  right(value: DimensionValue): this {
    this.styles.right = value;
    return this;
  }

  start(value: DimensionValue): this {
    this.styles.start = value;
    return this;
  }

  end(value: DimensionValue): this {
    this.styles.end = value;
    return this;
  }

  inset(value: DimensionValue): this {
    this.styles.inset = value;
    return this;
  }

  insetBlock(value: DimensionValue): this {
    this.styles.insetBlock = value;
    return this;
  }

  insetBlockStart(value: DimensionValue): this {
    this.styles.insetBlockStart = value;
    return this;
  }

  insetBlockEnd(value: DimensionValue): this {
    this.styles.insetBlockEnd = value;
    return this;
  }

  insetInline(value: DimensionValue): this {
    this.styles.insetInline = value;
    return this;
  }

  insetInlineStart(value: DimensionValue): this {
    this.styles.insetInlineStart = value;
    return this;
  }

  insetInlineEnd(value: DimensionValue): this {
    this.styles.insetInlineEnd = value;
    return this;
  }

  zIndex(value: number): this {
    this.styles.zIndex = value;
    return this;
  }

  display(value: NonNullable<FlexStyle["display"]>): this {
    this.styles.display = value;
    return this;
  }

  overflow(value: NonNullable<FlexStyle["overflow"]>): this {
    this.styles.overflow = value;
    return this;
  }

  direction(value: NonNullable<FlexStyle["direction"]>): this {
    this.styles.direction = value;
    return this;
  }

  boxSizing(value: NonNullable<FlexStyle["boxSizing"]>): this {
    this.styles.boxSizing = value;
    return this;
  }

  aspectRatio(value: number | string): this {
    this.styles.aspectRatio = value;
    return this;
  }

  /**
   * Sets the opacity (0 to 1).
   * @param value - Opacity value
   * @returns The modifier instance for chaining
   */
  opacity(value: number): this {
    this.styles.opacity = value;
    return this;
  }

  elevation(value: number): this {
    this.styles.elevation = value;
    return this;
  }

  backfaceVisibility(
    value: NonNullable<ViewStyle["backfaceVisibility"]>,
  ): this {
    this.styles.backfaceVisibility = value;
    return this;
  }

  pointerEvents(value: NonNullable<ViewStyle["pointerEvents"]>): this {
    this.styles.pointerEvents = value;
    return this;
  }

  cursor(value: NonNullable<ViewStyle["cursor"]>): this {
    this.styles.cursor = value;
    return this;
  }

  shadowColor(value: ColorValue): this {
    this.styles.shadowColor = value;
    return this;
  }

  shadowOffset(value: { width: number; height: number }): this {
    this.styles.shadowOffset = value;
    return this;
  }

  shadowOpacity(value: number): this {
    this.styles.shadowOpacity = value;
    return this;
  }

  shadowRadius(value: number): this {
    this.styles.shadowRadius = value;
    return this;
  }

  transform(value: NonNullable<TransformsStyle["transform"]>): this {
    this.styles.transform = value;
    return this;
  }

  transformOrigin(
    value: NonNullable<TransformsStyle["transformOrigin"]>,
  ): this {
    this.styles.transformOrigin = value;
    return this;
  }

  outlineColor(value: ColorValue): this {
    this.styles.outlineColor = value;
    return this;
  }

  outlineOffset(value: number): this {
    this.styles.outlineOffset = value;
    return this;
  }

  outlineStyle(value: NonNullable<ViewStyle["outlineStyle"]>): this {
    this.styles.outlineStyle = value;
    return this;
  }

  outlineWidth(value: number): this {
    this.styles.outlineWidth = value;
    return this;
  }

  /**
   * Sets the text color.
   * @param value - Color value
   * @returns The modifier instance for chaining
   */
  color(value: ColorValue): this {
    this.styles.color = value;
    return this;
  }

  fontFamily(value: string): this {
    this.styles.fontFamily = value;
    return this;
  }

  /**
   * Sets the font size.
   * @param value - Font size in pixels
   * @returns The modifier instance for chaining
   */
  fontSize(value: number): this {
    this.styles.fontSize = value;
    return this;
  }

  fontStyle(value: NonNullable<TextStyle["fontStyle"]>): this {
    this.styles.fontStyle = value;
    return this;
  }

  /**
   * Sets the font weight.
   * @param value - Font weight ('normal', 'bold', '100'-'900')
   * @returns The modifier instance for chaining
   */
  fontWeight(value: NonNullable<TextStyle["fontWeight"]>): this {
    this.styles.fontWeight = value;
    return this;
  }

  fontVariant(value: FontVariant[]): this {
    this.styles.fontVariant = value;
    return this;
  }

  letterSpacing(value: number): this {
    this.styles.letterSpacing = value;
    return this;
  }

  lineHeight(value: number): this {
    this.styles.lineHeight = value;
    return this;
  }

  /**
   * Sets the text alignment.
   * @param value - Alignment value ('left', 'right', 'center', 'justify')
   * @returns The modifier instance for chaining
   */
  textAlign(value: NonNullable<TextStyle["textAlign"]>): this {
    this.styles.textAlign = value;
    return this;
  }

  textAlignVertical(value: NonNullable<TextStyle["textAlignVertical"]>): this {
    this.styles.textAlignVertical = value;
    return this;
  }

  textDecorationColor(value: ColorValue): this {
    this.styles.textDecorationColor = value;
    return this;
  }

  textDecorationLine(
    value: NonNullable<TextStyle["textDecorationLine"]>,
  ): this {
    this.styles.textDecorationLine = value;
    return this;
  }

  textDecorationStyle(
    value: NonNullable<TextStyle["textDecorationStyle"]>,
  ): this {
    this.styles.textDecorationStyle = value;
    return this;
  }

  textShadowColor(value: ColorValue): this {
    this.styles.textShadowColor = value;
    return this;
  }

  textShadowOffset(value: { width: number; height: number }): this {
    this.styles.textShadowOffset = value;
    return this;
  }

  textShadowRadius(value: number): this {
    this.styles.textShadowRadius = value;
    return this;
  }

  textTransform(value: NonNullable<TextStyle["textTransform"]>): this {
    this.styles.textTransform = value;
    return this;
  }

  includeFontPadding(value: boolean): this {
    this.styles.includeFontPadding = value;
    return this;
  }

  userSelect(value: NonNullable<TextStyle["userSelect"]>): this {
    this.styles.userSelect = value;
    return this;
  }

  verticalAlign(value: NonNullable<TextStyle["verticalAlign"]>): this {
    this.styles.verticalAlign = value;
    return this;
  }

  writingDirection(value: NonNullable<TextStyle["writingDirection"]>): this {
    this.styles.writingDirection = value;
    return this;
  }

  /**
   * Conditionally applies styles based on a boolean condition.
   * @param condition - Boolean condition to check
   * @param callback - Function that receives the modifier and returns it with applied styles
   * @returns The modifier instance for chaining
   * @example
   * ```ts
   * createModifier()
   *   .padding(16)
   *   .applyIf(isActive, m => m.backgroundColor('blue'))
   *   .build();
   * ```
   */
  applyIf(condition: boolean, callback: (modifier: this) => this): this {
    if (condition) {
      return callback(this);
    }
    return this;
  }

  /**
   * Builds and freezes the final style object.
   * @param KEY_LOG - Optional key for development logging
   * @returns Frozen style object
   */
  build(KEY_LOG?: string): ModifierStyle {
    if (this.isDev && KEY_LOG && typeof KEY_LOG === "string") {
      console.info("DEV BUILD LOG FOR:", KEY_LOG.toLocaleUpperCase());
    }
    return Object.freeze(this.styles) as ModifierStyle;
  }
}

/**
 * Factory function to create a new Modifier instance.
 * @param isDev - Enable development mode with console logging
 * @returns A new Modifier instance
 * @example
 * ```ts
 * const style = createModifier()
 *   .padding(16)
 *   .backgroundColor('#fff')
 *   .build();
 * ```
 */
export const createModifier: (isDev?: boolean) => Modifier = (() => {
  return (isDev: boolean = false) => new Modifier(isDev);
})();
