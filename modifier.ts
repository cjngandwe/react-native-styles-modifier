import type {
  ViewStyle,
  TextStyle,
  ColorValue,
  DimensionValue,
  ModifierStyle,
  LayoutSpace,
  StyleSheetLike,
  FlexStyle,
  TransformsStyle,
  FontVariant,
} from "./react-native-styles";

export type { ViewStyle, TextStyle, ModifierStyle, StyleSheetLike };

export interface RootStyle {
  root: Record<string, string | number>;
}

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

  alignItems(value: NonNullable<FlexStyle["alignItems"]>): this {
    this.styles.alignItems = value;
    return this;
  }

  alignSelf(value: NonNullable<FlexStyle["alignSelf"]>): this {
    this.styles.alignSelf = value;
    return this;
  }

  alignContent(value: NonNullable<FlexStyle["alignContent"]>): this {
    this.styles.alignContent = value;
    return this;
  }

  justifyContent(value: NonNullable<FlexStyle["justifyContent"]>): this {
    this.styles.justifyContent = value;
    return this;
  }

  flex(value: number): this {
    this.styles.flex = value;
    return this;
  }

  flexBasis(value: DimensionValue): this {
    this.styles.flexBasis = value;
    return this;
  }

  flexDirection(value: NonNullable<FlexStyle["flexDirection"]>): this {
    this.styles.flexDirection = value;
    return this;
  }

  flexGrow(value: number): this {
    this.styles.flexGrow = value;
    return this;
  }

  flexShrink(value: number): this {
    this.styles.flexShrink = value;
    return this;
  }

  flexWrap(value: NonNullable<FlexStyle["flexWrap"]>): this {
    this.styles.flexWrap = value;
    return this;
  }

  padding(value: DimensionValue): this {
    this.styles.padding = value;
    return this;
  }

  paddingVertical(value: DimensionValue): this {
    this.styles.paddingVertical = value;
    return this;
  }

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

  margin(value: DimensionValue): this {
    this.margin(value);
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

  backgroundColor(value: ColorValue): this {
    this.styles.backgroundColor = value;
    return this;
  }

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

  height(value: DimensionValue): this {
    this.styles.height = value;
    return this;
  }

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

  color(value: ColorValue): this {
    this.styles.color = value;
    return this;
  }

  fontFamily(value: string): this {
    this.styles.fontFamily = value;
    return this;
  }

  fontSize(value: number): this {
    this.styles.fontSize = value;
    return this;
  }

  fontStyle(value: NonNullable<TextStyle["fontStyle"]>): this {
    this.styles.fontStyle = value;
    return this;
  }

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

  applyIf(condition: boolean, callback: (modifier: this) => this): this {
    if (condition) {
      return callback(this);
    }
    return this;
  }

  build(KEY_LOG?: string): ModifierStyle {
    if (this.isDev && KEY_LOG && typeof KEY_LOG === "string") {
      console.info("DEV BUILD LOG FOR:", KEY_LOG.toLocaleUpperCase());
    }
    return Object.freeze(this.styles) as ModifierStyle;
  }
}

//Factory
export function createModifier(isDev: boolean = false) {
  return new Modifier(isDev);
}
