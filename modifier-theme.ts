import { Modifier, StyleSheetLike } from "./modifier.ts";
import { DesignTokens, TokenProvider, defaultTokens } from "./tokens.ts";

// Extended Modifier class with token support
export class ModifierWithTheme<
  T extends StyleSheetLike = StyleSheetLike,
> extends Modifier<T> {
  protected tokenProvider: TokenProvider;

  constructor(root: T, tokens: DesignTokens = defaultTokens) {
    super(root);
    this.tokenProvider = new TokenProvider(tokens);
  }

  // Token-based spacing methods
  spacingToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.padding(value);
  }

  paddingToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.padding(value);
  }

  paddingVerticalToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.paddingVertical(value);
  }

  paddingHorizontalToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.paddingHorizontal(value);
  }

  paddingLeftToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.paddingLeft(value);
  }

  paddingRightToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.paddingRight(value);
  }

  paddingTopToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.paddingTop(value);
  }

  paddingBottomToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.paddingBottom(value);
  }

  marginToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.margin(value);
  }

  marginVerticalToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.marginVertical(value);
  }

  marginHorizontalToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.marginHorizontal(value);
  }

  marginLeftToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.marginLeft(value);
  }

  marginRightToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.marginRight(value);
  }

  marginTopToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.marginTop(value);
  }

  marginBottomToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.marginBottom(value);
  }

  gapToken(key: keyof DesignTokens["spacing"]): Modifier<T> {
    const value = this.tokenProvider.getSpacing(key);
    return this.gap(value);
  }

  // Token-based color methods (legacy support)
  backgroundColorToken(key: keyof DesignTokens["colors"]): Modifier<T> {
    const value = this.tokenProvider.getColor(key);
    return this.backgroundColor(value);
  }

  borderColorToken(key: keyof DesignTokens["colors"]): Modifier<T> {
    const value = this.tokenProvider.getColor(key);
    return this.borderColor(value);
  }

  // Token-based border radius methods
  borderRadiusToken(key: keyof DesignTokens["borderRadius"]): Modifier<T> {
    const value = this.tokenProvider.getBorderRadius(key);
    return this.borderRadius(value);
  }

  // Token-based font methods
  fontWeightToken(key: keyof DesignTokens["fontWeight"]): Modifier<T> {
    const value = this.tokenProvider.getFontWeight(key);
    return this.fontWeight(value);
  }

  // Token-based shadow method
  shadowToken(key: keyof DesignTokens["shadows"]): Modifier<T> {
    const shadow = this.tokenProvider.getShadow(key);
    Object.assign(this["styles"], shadow);
    return this;
  }

  // Access to token provider for custom usage
  getTokenProvider(): TokenProvider {
    return this.tokenProvider;
  }

  // Helper to get any token value
  getToken<K extends keyof DesignTokens>(
    category: K,
    key: keyof DesignTokens[K],
  ): any {
    return this.tokenProvider.tokens[category][key];
  }
}

// Factory function for easier usage
export function createModifier<T extends StyleSheetLike>(
  root: T,
  tokens?: DesignTokens,
): () => ModifierWithTheme<T> {
  return () => new ModifierWithTheme(root, tokens);
}
