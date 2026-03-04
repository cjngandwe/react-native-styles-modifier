import { Modifier } from "./modifier.ts";
import { DesignTokens, TokenProvider, defaultTokens } from "./tokens.ts";

const _tokenProviderCache = new WeakMap<DesignTokens, TokenProvider>();

function getOrCreateTokenProvider(tokens: DesignTokens): TokenProvider {
  let provider = _tokenProviderCache.get(tokens);
  if (!provider) {
    provider = new TokenProvider(tokens);
    _tokenProviderCache.set(tokens, provider);
  }
  return provider;
}

// Extended Modifier class with token support
export class ModifierWithTheme extends Modifier {
  protected tokenProvider: TokenProvider;

  constructor(tokens: DesignTokens = defaultTokens) {
    super();
    this.tokenProvider = getOrCreateTokenProvider(tokens);
  }

  // Token-based spacing methods
  spacingToken(key: keyof DesignTokens["spacing"]): Modifier {
    const value = this.tokenProvider.getSpacing(key);
    return this.padding(value);
  }

  paddingToken(key: keyof DesignTokens["spacing"]): Modifier {
    const value = this.tokenProvider.getSpacing(key);
    return this.padding(value);
  }

  paddingVerticalToken(key: keyof DesignTokens["spacing"]): Modifier {
    const vertical = this.tokenProvider.getSpacing(key);
    return this.padding({ vertical });
  }

  paddingHorizontalToken(key: keyof DesignTokens["spacing"]): Modifier {
    const horizontal = this.tokenProvider.getSpacing(key);
    return this.padding({ horizontal });
  }

  paddingLeftToken(key: keyof DesignTokens["spacing"]): Modifier {
    const left = this.tokenProvider.getSpacing(key);
    return this.padding({ left });
  }

  paddingRightToken(key: keyof DesignTokens["spacing"]): Modifier {
    const right = this.tokenProvider.getSpacing(key);
    return this.padding({ right });
  }

  paddingTopToken(key: keyof DesignTokens["spacing"]): Modifier {
    const top = this.tokenProvider.getSpacing(key);
    return this.padding({ top });
  }

  paddingBottomToken(key: keyof DesignTokens["spacing"]): Modifier {
    const bottom = this.tokenProvider.getSpacing(key);
    return this.padding({ bottom });
  }

  marginToken(key: keyof DesignTokens["spacing"]): Modifier {
    const value = this.tokenProvider.getSpacing(key);
    return this.margin(value);
  }

  marginVerticalToken(key: keyof DesignTokens["spacing"]): Modifier {
    const vertical = this.tokenProvider.getSpacing(key);
    return this.margin({ vertical });
  }

  marginHorizontalToken(key: keyof DesignTokens["spacing"]): Modifier {
    const horizontal = this.tokenProvider.getSpacing(key);
    return this.margin({ horizontal });
  }

  marginLeftToken(key: keyof DesignTokens["spacing"]): Modifier {
    const left = this.tokenProvider.getSpacing(key);
    return this.margin({ left });
  }

  marginRightToken(key: keyof DesignTokens["spacing"]): Modifier {
    const right = this.tokenProvider.getSpacing(key);
    return this.margin({ right });
  }

  marginTopToken(key: keyof DesignTokens["spacing"]): Modifier {
    const top = this.tokenProvider.getSpacing(key);
    return this.margin({ top });
  }

  marginBottomToken(key: keyof DesignTokens["spacing"]): Modifier {
    const bottom = this.tokenProvider.getSpacing(key);
    return this.margin({ bottom });
  }

  gapToken(key: keyof DesignTokens["spacing"]): Modifier {
    const value = this.tokenProvider.getSpacing(key);
    return this.gap(value);
  }

  // Token-based border radius methods
  borderRadiusToken(key: keyof DesignTokens["borderRadius"]): Modifier {
    const value = this.tokenProvider.getBorderRadius(key);
    return this.borderRadius(value);
  }

  // Token-based font methods
  fontWeightToken(key: keyof DesignTokens["fontWeight"]): Modifier {
    const value = this.tokenProvider.getFontWeight(key);
    return this.fontWeight(value);
  }

  // Token-based shadow method
  shadowToken(key: keyof DesignTokens["shadows"]): this {
    const shadow = this.tokenProvider.getShadow(key);
    Object.assign(this.styles, shadow);
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
export function createModifier(tokens?: DesignTokens): () => ModifierWithTheme {
  return () => new ModifierWithTheme(tokens);
}
