# Design Tokens System

A design tokens system that extends the Modifier class with support for reusable design values.

## Overview

The design tokens system provides a way to define and use consistent design values (colors, spacing, typography, etc.) throughout your application. It's implemented as a separate module that extends the base Modifier class.

## Files

- **`tokens.ts`** - Design tokens interface and default token definitions
- **`modifier-tokens.ts`** - Extended Modifier class with token support
- **`modifier.ts`** - Base Modifier class (no dependencies on tokens)

## Design Tokens Structure

```typescript
interface DesignTokens {
  spacing: Record<string, number>;
  colors: Record<string, string>;
  borderRadius: Record<string, number>;
  fontSize: Record<string, number>;
  fontWeight: Record<string, FontWeight>;
  shadows: Record<string, ShadowStyle>;
}
```

## Default Tokens

### Spacing
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `xxl`: 48px

### Colors
- `primary`: #0a7ea4
- `secondary`: #6c757d
- `success`: #28a745
- `danger`: #dc3545
- `warning`: #ffc107
- `info`: #17a2b8
- `light`: #f8f9fa
- `dark`: #343a40
- `white`: #ffffff
- `black`: #000000
- `transparent`: transparent

### Border Radius
- `none`: 0
- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `full`: 9999px

### Font Size
- `xs`: 12px
- `sm`: 14px
- `md`: 16px
- `lg`: 18px
- `xl`: 20px
- `xxl`: 24px

### Font Weight
- `light`: 300
- `normal`: normal
- `medium`: 500
- `semibold`: 600
- `bold`: bold

### Shadows
- `sm`: Small shadow (elevation 1)
- `md`: Medium shadow (elevation 5)
- `lg`: Large shadow (elevation 8)
- `xl`: Extra large shadow (elevation 12)

## Usage

### Basic Usage

```typescript
import { StyleSheet } from "react-native";
import { ModifierWithTokens } from "./modifier-tokens";

const styles = new ModifierWithTokens(StyleSheet)
  .paddingToken("md")
  .backgroundColorToken("primary")
  .borderRadiusToken("lg")
  .build();
```

### Using Factory Function

```typescript
import { createModifierWithTokens } from "./modifier-tokens";

const styles = createModifierWithTokens(StyleSheet)
  .marginToken("lg")
  .shadowToken("md")
  .backgroundColorToken("white")
  .build();
```

### Custom Tokens

```typescript
import { DesignTokens, defaultTokens } from "./tokens";

const customTokens: DesignTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    brand: "#ff6b6b",
    accent: "#4ecdc4",
  },
  spacing: {
    ...defaultTokens.spacing,
    xxxl: 64,
  },
};

const styles = new ModifierWithTokens(StyleSheet, customTokens)
  .paddingToken("md")
  .backgroundColorToken("brand")
  .build();
```

### Mixing Token and Regular Methods

```typescript
const styles = createModifierWithTokens(StyleSheet)
  .paddingToken("lg")           // Token-based
  .flexDirection("row")         // Regular method
  .justifyContent("space-between") // Regular method
  .backgroundColorToken("light") // Token-based
  .borderRadiusToken("md")      // Token-based
  .borderWidth(1)               // Regular method
  .build();
```

### Conditional Styling with Tokens

```typescript
const styles = createModifierWithTokens(StyleSheet)
  .paddingToken("md")
  .applyIf(isActive, (m) =>
    m.backgroundColorToken("primary").borderRadiusToken("lg")
  )
  .applyIf(!isActive, (m) =>
    m.backgroundColorToken("secondary").borderRadiusToken("sm")
  )
  .build();
```

### Accessing Token Values Directly

```typescript
const modifier = createModifierWithTokens(StyleSheet);
const primaryColor = modifier.getToken("colors", "primary");
const mdSpacing = modifier.getToken("spacing", "md");
```

## API Reference

### Token-Based Methods

#### Spacing Methods
- `spacingToken(key)` - Apply padding using spacing token
- `paddingToken(key)` - Apply padding using spacing token
- `paddingVerticalToken(key)` - Apply vertical padding
- `paddingHorizontalToken(key)` - Apply horizontal padding
- `paddingLeftToken(key)` - Apply left padding
- `paddingRightToken(key)` - Apply right padding
- `paddingTopToken(key)` - Apply top padding
- `paddingBottomToken(key)` - Apply bottom padding
- `marginToken(key)` - Apply margin using spacing token
- `marginVerticalToken(key)` - Apply vertical margin
- `marginHorizontalToken(key)` - Apply horizontal margin
- `marginLeftToken(key)` - Apply left margin
- `marginRightToken(key)` - Apply right margin
- `marginTopToken(key)` - Apply top margin
- `marginBottomToken(key)` - Apply bottom margin
- `gapToken(key)` - Apply gap using spacing token

#### Color Methods
- `backgroundColorToken(key)` - Apply background color from tokens
- `borderColorToken(key)` - Apply border color from tokens

#### Border Methods
- `borderRadiusToken(key)` - Apply border radius from tokens

#### Typography Methods
- `fontWeightToken(key)` - Apply font weight from tokens

#### Shadow Methods
- `shadowToken(key)` - Apply shadow from tokens (includes shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation)

#### Utility Methods
- `getTokenProvider()` - Get the token provider instance
- `getToken(category, key)` - Get any token value directly

## Creating a Custom Token System

You can create your own token system by extending or modifying the default tokens:

```typescript
// 1. Define your custom tokens
export const myAppTokens: DesignTokens = {
  spacing: {
    tiny: 2,
    small: 4,
    medium: 8,
    large: 16,
    huge: 32,
  },
  colors: {
    brandPrimary: "#ff6b6b",
    brandSecondary: "#4ecdc4",
    // ... more colors
  },
  // ... other token categories
};

// 2. Use with ModifierWithTokens
const modifier = new ModifierWithTokens(StyleSheet, myAppTokens);
```

## Benefits

1. **Consistency** - Ensures design consistency across your app
2. **Maintainability** - Change design values in one place
3. **Type Safety** - Full TypeScript support with autocomplete
4. **Flexibility** - Mix token-based and regular methods
5. **No Dependencies** - Base Modifier class remains dependency-free
6. **Extensibility** - Easy to add custom tokens or extend functionality

## Architecture

The token system is designed as a **separate module** that extends the base Modifier class:

- **Base Modifier** (`modifier.ts`) - Core functionality, no token dependencies
- **Token Extension** (`modifier-tokens.ts`) - Extends Modifier with token support
- **Tokens Definition** (`tokens.ts`) - Token interface and default values

This architecture allows you to:
- Use the base Modifier without tokens if you don't need them
- Share the base Modifier as a standalone package
- Customize tokens per project
- Keep the core clean and focused
