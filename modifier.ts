// Type definitions compatible with React Native StyleSheet
// Using DimensionValue to match React Native's type system
type DimensionValue = number | `${number}%` | "auto";

export interface ViewStyle {
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  alignSelf?:
    | "auto"
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "baseline";
  alignContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  flex?: number;
  flexBasis?: DimensionValue;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  backgroundColor?: string;
  gap?: number;
  height?: DimensionValue;
  width?: DimensionValue;
  maxWidth?: DimensionValue;
  maxHeight?: DimensionValue;
  borderRadius?: number;
  borderWidth?: number;
  borderStyle?: "solid" | "dotted" | "dashed";
  borderColor?: string;
  aspectRatio?: number;
  [key: string]: any;
}

export interface TextStyle extends ViewStyle {
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
    | "900";
  fontSize?: number;
  color?: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  [key: string]: any;
}

export interface StyleSheetLike {
  create<T extends Record<string, any>>(styles: T): T;
}

type AlignItems = "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
type AlignContent =
  | "center"
  | "flex-start"
  | "flex-end"
  | "stretch"
  | "space-between"
  | "space-around"
  | "space-evenly";
type JustifyContent =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
type AlignSelf =
  | "auto"
  | "center"
  | "flex-start"
  | "flex-end"
  | "stretch"
  | "baseline";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export interface RootStyle {
  root: Record<string, string | number>;
}

export class Modifier<T extends StyleSheetLike = StyleSheetLike> {
  private styles: ViewStyle & TextStyle = {};
  private root: T;

  constructor(root: T) {
    this.root = root;
  }

  //FLEX
  alignItems(value: AlignItems): this {
    this.styles.alignItems = value;
    return this;
  }
  alignSelf(value: AlignSelf): this {
    this.styles.alignSelf = value;
    return this;
  }
  justifyContent(value: JustifyContent): this {
    this.styles.justifyContent = value;
    return this;
  }
  alignContent(value: AlignContent): this {
    this.styles.alignContent = value;
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
  flexDirection(value: FlexDirection): this {
    this.styles.flexDirection = value;
    return this;
  }
  flexWrap(value: FlexWrap): this {
    this.styles.flexWrap = value;
    return this;
  }

  //PADDING
  padding(value: number): this {
    this.styles.padding = value;
    return this;
  }
  paddingVertical(value: number): this {
    this.styles.paddingVertical = value;
    return this;
  }
  paddingHorizontal(value: number): this {
    this.styles.paddingHorizontal = value;
    return this;
  }
  paddingLeft(value: number): this {
    this.styles.paddingLeft = value;
    return this;
  }
  paddingRight(value: number): this {
    this.styles.paddingRight = value;
    return this;
  }
  paddingTop(value: number): this {
    this.styles.paddingTop = value;
    return this;
  }
  paddingBottom(value: number): this {
    this.styles.paddingBottom = value;
    return this;
  }

  //MARGIN
  margin(value: number): this {
    this.styles.margin = value;
    return this;
  }
  marginVertical(value: number): this {
    this.styles.marginVertical = value;
    return this;
  }
  marginHorizontal(value: number): this {
    this.styles.marginHorizontal = value;
    return this;
  }
  marginLeft(value: number): this {
    this.styles.marginLeft = value;
    return this;
  }
  marginRight(value: number): this {
    this.styles.marginRight = value;
    return this;
  }
  marginTop(value: number): this {
    this.styles.marginTop = value;
    return this;
  }
  marginBottom(value: number): this {
    this.styles.marginBottom = value;
    return this;
  }
  backgroundColor(value: string): this {
    this.styles.backgroundColor = value;
    return this;
  }

  //SPACING
  gap(value: number): this {
    this.styles.gap = value;
    return this;
  }

  //SIZE
  height(value: DimensionValue): this {
    this.styles.height = value;
    return this;
  }
  width(value: DimensionValue): this {
    this.styles.width = value;
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

  //BORDER
  borderRadius(value: number): this {
    this.styles.borderRadius = value;
    return this;
  }
  borderWidth(value: number): this {
    this.styles.borderWidth = value;
    return this;
  }
  borderStyle(value: "solid" | "dotted" | "dashed"): this {
    this.styles.borderStyle = value;
    return this;
  }
  borderColor(value: string): this {
    this.styles.borderColor = value;
    return this;
  }
  //Font
  fontWeight(
    value:
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
      | "900",
  ): this {
    this.styles.fontWeight = value;
    return this;
  }
  //CONDITONAL
  applyIf(condition: boolean, callback: (styles: this) => this): this {
    if (condition) {
      return callback(this);
    }
    return this;
  }

  //ASPECT
  aspectRatio(value: number): this {
    this.styles.aspectRatio = value;
    return this;
  }

  build(): ViewStyle & TextStyle {
    const style = this.root.create({
      root: this.styles,
    });
    return style.root;
  }
}
