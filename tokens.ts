// Design tokens interface
export interface DesignTokens {
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  fontSize: Record<string, number>;
  fontWeight: Record<
    string,
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
  >;
  shadows: Record<
    string,
    {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    }
  >;
}

// Default design tokens
export const defaultTokens: DesignTokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  fontWeight: {
    light: "300",
    normal: "normal",
    medium: "500",
    semibold: "600",
    bold: "bold",
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
};

// Token provider class that can be extended
export class TokenProvider {
  constructor(public tokens: DesignTokens = defaultTokens) {}

  // Helper methods to get token values
  getSpacing(key: keyof DesignTokens["spacing"]): number {
    return this.tokens.spacing[key];
  }

  getBorderRadius(key: keyof DesignTokens["borderRadius"]): number {
    return this.tokens.borderRadius[key];
  }

  getFontSize(key: keyof DesignTokens["fontSize"]): number {
    return this.tokens.fontSize[key];
  }

  getFontWeight(
    key: keyof DesignTokens["fontWeight"],
  ):
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
    | "900" {
    return this.tokens.fontWeight[key];
  }

  getShadow(key: keyof DesignTokens["shadows"]): {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  } {
    return this.tokens.shadows[key];
  }
}
