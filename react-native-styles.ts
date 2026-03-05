/**
 * React Native StyleSheet Types
 *
 * Cleaned and extracted from React Native's official StyleSheet types.
 * This file contains only the style properties used in StyleSheet.create({}).
 *
 * To extend with new React Native styles:
 * 1. Add new properties to the appropriate base interface (FlexStyle, ViewStyleBase, TextStyleBase, or ImageStyleBase)
 * 2. The main exported interfaces (ViewStyle, TextStyle, ImageStyle) will automatically include them
 * 3. Update DimensionValue or create new value types if needed
 */

// ============================================================================
// VALUE TYPES
// ============================================================================

/**
 * Color value type - supports various color formats
 */
export type ColorValue = string | number;

/**
 * Dimension value - supports numbers, percentages, and 'auto'
 */
export type DimensionValue = number | "auto" | `${number}%`;

/**
 * Cursor value for pointer interactions
 */
export type CursorValue = "auto" | "pointer";

// ============================================================================
// FLEX & LAYOUT STYLES
// ============================================================================

/**
 * Flexbox and layout-related style properties
 * Based on CSS Flexbox with React Native specific defaults
 */
export interface FlexStyle {
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;

  alignItems?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline"
    | undefined;

  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline"
    | undefined;

  aspectRatio?: number | string | undefined;

  borderBottomWidth?: number | undefined;
  borderEndWidth?: number | undefined;
  borderLeftWidth?: number | undefined;
  borderRightWidth?: number | undefined;
  borderStartWidth?: number | undefined;
  borderTopWidth?: number | undefined;
  borderWidth?: number | undefined;

  bottom?: DimensionValue | undefined;
  boxSizing?: "border-box" | "content-box" | undefined;

  columnGap?: number | string | undefined;

  direction?: "inherit" | "ltr" | "rtl" | undefined;
  display?: "none" | "flex" | "contents" | undefined;

  end?: DimensionValue | undefined;

  flex?: number | undefined;
  flexBasis?: DimensionValue | undefined;
  flexDirection?:
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse"
    | undefined;
  flexGrow?: number | undefined;
  flexShrink?: number | undefined;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse" | undefined;

  gap?: number | string | undefined;

  height?: DimensionValue | undefined;

  inset?: DimensionValue | undefined;
  insetBlock?: DimensionValue | undefined;
  insetBlockEnd?: DimensionValue | undefined;
  insetBlockStart?: DimensionValue | undefined;
  insetInline?: DimensionValue | undefined;
  insetInlineEnd?: DimensionValue | undefined;
  insetInlineStart?: DimensionValue | undefined;

  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;

  left?: DimensionValue | undefined;

  margin?: DimensionValue | undefined;
  marginBlock?: DimensionValue | undefined;
  marginBlockEnd?: DimensionValue | undefined;
  marginBlockStart?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  marginEnd?: DimensionValue | undefined;
  marginHorizontal?: DimensionValue | undefined;
  marginInline?: DimensionValue | undefined;
  marginInlineEnd?: DimensionValue | undefined;
  marginInlineStart?: DimensionValue | undefined;
  marginLeft?: DimensionValue | undefined;
  marginRight?: DimensionValue | undefined;
  marginStart?: DimensionValue | undefined;
  marginTop?: DimensionValue | undefined;
  marginVertical?: DimensionValue | undefined;

  maxHeight?: DimensionValue | undefined;
  maxWidth?: DimensionValue | undefined;
  minHeight?: DimensionValue | undefined;
  minWidth?: DimensionValue | undefined;

  overflow?: "visible" | "hidden" | "scroll" | undefined;

  padding?: DimensionValue | undefined;
  paddingBlock?: DimensionValue | undefined;
  paddingBlockEnd?: DimensionValue | undefined;
  paddingBlockStart?: DimensionValue | undefined;
  paddingBottom?: DimensionValue | undefined;
  paddingEnd?: DimensionValue | undefined;
  paddingHorizontal?: DimensionValue | undefined;
  paddingInline?: DimensionValue | undefined;
  paddingInlineEnd?: DimensionValue | undefined;
  paddingInlineStart?: DimensionValue | undefined;
  paddingLeft?: DimensionValue | undefined;
  paddingRight?: DimensionValue | undefined;
  paddingStart?: DimensionValue | undefined;
  paddingTop?: DimensionValue | undefined;
  paddingVertical?: DimensionValue | undefined;

  position?: "absolute" | "relative" | "static" | undefined;

  right?: DimensionValue | undefined;
  rowGap?: number | string | undefined;

  start?: DimensionValue | undefined;

  top?: DimensionValue | undefined;

  width?: DimensionValue | undefined;

  zIndex?: number | undefined;
}

// ============================================================================
// SHADOW STYLES
// ============================================================================

/**
 * Shadow-related style properties (iOS specific)
 */
export interface ShadowStyleIOS {
  shadowColor?: ColorValue | undefined;
  shadowOffset?: Readonly<{ width: number; height: number }> | undefined;
  shadowOpacity?: number | undefined;
  shadowRadius?: number | undefined;
}

// ============================================================================
// TRANSFORM STYLES
// ============================================================================

interface PerspectiveTransform {
  perspective: number;
}

interface RotateTransform {
  rotate: string;
}

interface RotateXTransform {
  rotateX: string;
}

interface RotateYTransform {
  rotateY: string;
}

interface RotateZTransform {
  rotateZ: string;
}

interface ScaleTransform {
  scale: number;
}

interface ScaleXTransform {
  scaleX: number;
}

interface ScaleYTransform {
  scaleY: number;
}

interface TranslateXTransform {
  translateX: number | `${number}%`;
}

interface TranslateYTransform {
  translateY: number | `${number}%`;
}

interface SkewXTransform {
  skewX: string;
}

interface SkewYTransform {
  skewY: string;
}

interface MatrixTransform {
  matrix: number[];
}

type MaximumOneOf<T, K extends keyof T = keyof T> = K extends keyof T
  ? { [P in K]: T[K] } & { [P in Exclude<keyof T, K>]?: never }
  : never;

/**
 * Transform-related style properties
 */
export interface TransformsStyle {
  transform?:
    | Readonly<
        MaximumOneOf<
          PerspectiveTransform &
            RotateTransform &
            RotateXTransform &
            RotateYTransform &
            RotateZTransform &
            ScaleTransform &
            ScaleXTransform &
            ScaleYTransform &
            TranslateXTransform &
            TranslateYTransform &
            SkewXTransform &
            SkewYTransform &
            MatrixTransform
        >[]
      >
    | string
    | undefined;
  transformOrigin?: Array<string | number> | string | undefined;
}

// ============================================================================
// FILTER & BLEND STYLES
// ============================================================================

export type DropShadowValue = {
  offsetX: number | string;
  offsetY: number | string;
  standardDeviation?: number | string | undefined;
  color?: ColorValue | number | undefined;
};

export type FilterFunction =
  | { brightness: number | string }
  | { blur: number | string }
  | { contrast: number | string }
  | { grayscale: number | string }
  | { hueRotate: number | string }
  | { invert: number | string }
  | { opacity: number | string }
  | { saturate: number | string }
  | { sepia: number | string }
  | { dropShadow: DropShadowValue | string };

export type BoxShadowValue = {
  offsetX: number | string;
  offsetY: number | string;
  color?: ColorValue | undefined;
  blurRadius?: string | number | undefined;
  spreadDistance?: number | string | undefined;
  inset?: boolean | undefined;
};

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

// ============================================================================
// BACKGROUND STYLES
// ============================================================================

export type LinearGradientValue = {
  type: "linear-gradient";
  direction?: string | undefined;
  colorStops: ReadonlyArray<{
    color: ColorValue | null;
    positions?: ReadonlyArray<string> | undefined;
  }>;
};

export type RadialGradientShape = "circle" | "ellipse";

export type RadialGradientPosition =
  | { top: number | string; left: number | string }
  | { top: number | string; right: number | string }
  | { bottom: number | string; left: number | string }
  | { bottom: number | string; right: number | string };

export type RadialGradientSize =
  | "closest-corner"
  | "closest-side"
  | "farthest-corner"
  | "farthest-side"
  | { x: string | number; y: string | number };

export type RadialGradientValue = {
  type: "radial-gradient";
  shape: RadialGradientShape;
  size: RadialGradientSize;
  position: RadialGradientPosition;
  colorStops: ReadonlyArray<{
    color: ColorValue | null;
    positions?: ReadonlyArray<string> | undefined;
  }>;
};

export type BackgroundImageValue = LinearGradientValue | RadialGradientValue;

export type BackgroundSizeValue =
  | { x: string | number; y: string | number }
  | "cover"
  | "contain";

export type BackgroundRepeatKeyword =
  | "repeat"
  | "space"
  | "round"
  | "no-repeat";

export type BackgroundPositionValue =
  | { top: number | string; left: number | string }
  | { top: number | string; right: number | string }
  | { bottom: number | string; left: number | string }
  | { bottom: number | string; right: number | string };

export type BackgroundRepeatValue = {
  x: BackgroundRepeatKeyword;
  y: BackgroundRepeatKeyword;
};

// ============================================================================
// VIEW STYLE
// ============================================================================

/**
 * View-specific style properties
 */
export interface ViewStyleBase {
  backfaceVisibility?: "visible" | "hidden" | undefined;
  backgroundColor?: ColorValue | undefined;

  borderBlockColor?: ColorValue | undefined;
  borderBlockEndColor?: ColorValue | undefined;
  borderBlockStartColor?: ColorValue | undefined;
  borderBottomColor?: ColorValue | undefined;
  borderBottomEndRadius?: number | string | undefined;
  borderBottomLeftRadius?: number | string | undefined;
  borderBottomRightRadius?: number | string | undefined;
  borderBottomStartRadius?: number | string | undefined;
  borderColor?: ColorValue | undefined;
  borderCurve?: "circular" | "continuous" | undefined;
  borderEndColor?: ColorValue | undefined;
  borderEndEndRadius?: number | string | undefined;
  borderEndStartRadius?: number | string | undefined;
  borderLeftColor?: ColorValue | undefined;
  borderRadius?: number | string | undefined;
  borderRightColor?: ColorValue | undefined;
  borderStartColor?: ColorValue | undefined;
  borderStartEndRadius?: number | string | undefined;
  borderStartStartRadius?: number | string | undefined;
  borderStyle?: "solid" | "dotted" | "dashed" | undefined;
  borderTopColor?: ColorValue | undefined;
  borderTopEndRadius?: number | string | undefined;
  borderTopLeftRadius?: number | string | undefined;
  borderTopRightRadius?: number | string | undefined;
  borderTopStartRadius?: number | string | undefined;

  boxShadow?: ReadonlyArray<BoxShadowValue> | string | undefined;

  cursor?: CursorValue | undefined;

  elevation?: number | undefined;

  experimental_backgroundImage?:
    | ReadonlyArray<BackgroundImageValue>
    | string
    | undefined;
  experimental_backgroundPosition?:
    | ReadonlyArray<BackgroundPositionValue>
    | string
    | undefined;
  experimental_backgroundRepeat?:
    | ReadonlyArray<BackgroundRepeatValue>
    | string
    | undefined;
  experimental_backgroundSize?:
    | ReadonlyArray<BackgroundSizeValue>
    | string
    | undefined;

  filter?: ReadonlyArray<FilterFunction> | string | undefined;

  isolation?: "auto" | "isolate" | undefined;

  mixBlendMode?: BlendMode | undefined;

  opacity?: number | undefined;
  outlineColor?: ColorValue | undefined;
  outlineOffset?: number | undefined;
  outlineStyle?: "solid" | "dotted" | "dashed" | undefined;
  outlineWidth?: number | undefined;

  pointerEvents?: "box-none" | "none" | "box-only" | "auto" | undefined;
}

/**
 * Complete View style interface
 * Combines FlexStyle, ShadowStyleIOS, TransformsStyle, and ViewStyleBase
 */
export interface ViewStyle
  extends FlexStyle, ShadowStyleIOS, TransformsStyle, ViewStyleBase {}

// ============================================================================
// TEXT STYLE
// ============================================================================

export type FontVariant =
  | "small-caps"
  | "oldstyle-nums"
  | "lining-nums"
  | "tabular-nums"
  | "common-ligatures"
  | "no-common-ligatures"
  | "discretionary-ligatures"
  | "no-discretionary-ligatures"
  | "historical-ligatures"
  | "no-historical-ligatures"
  | "contextual"
  | "no-contextual"
  | "proportional-nums"
  | "stylistic-one"
  | "stylistic-two"
  | "stylistic-three"
  | "stylistic-four"
  | "stylistic-five"
  | "stylistic-six"
  | "stylistic-seven"
  | "stylistic-eight"
  | "stylistic-nine"
  | "stylistic-ten"
  | "stylistic-eleven"
  | "stylistic-twelve"
  | "stylistic-thirteen"
  | "stylistic-fourteen"
  | "stylistic-fifteen"
  | "stylistic-sixteen"
  | "stylistic-seventeen"
  | "stylistic-eighteen"
  | "stylistic-nineteen"
  | "stylistic-twenty";

/**
 * Text-specific style properties
 */
export interface TextStyleBase {
  color?: ColorValue | undefined;

  fontFamily?: string | undefined;
  fontSize?: number | undefined;
  fontStyle?: "normal" | "italic" | undefined;
  fontVariant?: FontVariant[] | undefined;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | "ultralight"
    | "thin"
    | "light"
    | "medium"
    | "regular"
    | "semibold"
    | "condensedBold"
    | "condensed"
    | "heavy"
    | "black"
    | undefined;

  includeFontPadding?: boolean | undefined;

  letterSpacing?: number | undefined;
  lineHeight?: number | undefined;

  textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  textAlignVertical?: "auto" | "top" | "bottom" | "center" | undefined;
  textDecorationColor?: ColorValue | undefined;
  textDecorationLine?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through"
    | undefined;
  textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
  textShadowColor?: ColorValue | undefined;
  textShadowOffset?: { width: number; height: number } | undefined;
  textShadowRadius?: number | undefined;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | undefined;

  userSelect?: "auto" | "none" | "text" | "contain" | "all" | undefined;

  verticalAlign?: "auto" | "top" | "bottom" | "middle" | undefined;

  writingDirection?: "auto" | "ltr" | "rtl" | undefined;
}

/**
 * Complete Text style interface
 * Extends ViewStyle and adds text-specific properties
 */
export interface TextStyle extends ViewStyle, TextStyleBase {}

// ============================================================================
// IMAGE STYLE
// ============================================================================

export type ImageResizeMode =
  | "cover"
  | "contain"
  | "stretch"
  | "repeat"
  | "center";

/**
 * Image-specific style properties
 */
export interface ImageStyleBase {
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none" | undefined;
  overlayColor?: ColorValue | undefined;
  resizeMode?: ImageResizeMode | undefined;
  tintColor?: ColorValue | undefined;
}

/**
 * Complete Image style interface
 * Combines FlexStyle, ShadowStyleIOS, TransformsStyle, and ImageStyleBase
 * Note: Images have a more limited set of styles compared to Views
 */
export interface ImageStyle extends FlexStyle, ShadowStyleIOS, TransformsStyle {
  backfaceVisibility?: "visible" | "hidden" | undefined;
  backgroundColor?: ColorValue | undefined;
  borderBottomLeftRadius?: number | string | undefined;
  borderBottomRightRadius?: number | string | undefined;
  borderColor?: ColorValue | undefined;
  borderRadius?: number | string | undefined;
  borderTopLeftRadius?: number | string | undefined;
  borderTopRightRadius?: number | string | undefined;
  cursor?: CursorValue | undefined;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none" | undefined;
  opacity?: number | undefined;
  overflow?: "visible" | "hidden" | undefined;
  overlayColor?: ColorValue | undefined;
  resizeMode?: ImageResizeMode | undefined;
  tintColor?: ColorValue | undefined;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Generic style prop type that allows null, undefined, false, empty string,
 * or arrays of styles (for style composition)
 */
export type StyleProp<T> =
  | T
  | ReadonlyArray<T | null | undefined | false>
  | null
  | undefined
  | false;

/**
 * Space configuration for padding and margin
 */
export type Space = {
  vertical: number;
  bottom: number;
  top: number;
  horizontal: number;
  left: number;
  right: number;
};

/**
 * Partial space configuration for flexible layout spacing
 */
export type LayoutSpace = Partial<Space>;

/**
 * StyleSheet-like interface for creating styles
 */
export interface StyleSheetLike {
  create<T extends Record<string, any>>(styles: T): T;
}

/**
 * Combined modifier style type that includes both View and Text styles
 */
export type ModifierStyle = TextStyle & ViewStyle;
