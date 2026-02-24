# React Native Modifier

A fluent, type-safe style builder for React Native inspired by Jetpack Compose. Write styles with a chainable API, design tokens, and built-in light/dark theme support - all with zero dependencies and zero performance overhead.

## Features

- 🎨 **Fluent API**: Chain style methods for clean, readable code
- 🌓 **Theme System**: Jetpack Compose-inspired color schemes with light/dark mode
- 📦 **Zero Dependencies**: Pure TypeScript/JavaScript with no external packages
- 🔒 **Type-Safe**: Full TypeScript support with proper type definitions
- ⚡ **Performance-First**: Only mounted components re-render on theme changes
- 🎯 **Conditional Styling**: Built-in support for conditional styles
- 🎨 **Design Tokens**: Token system for consistent spacing, colors, shadows, and more
- 🔌 **State Integration**: Connect with any state management (Zustand, Redux, Context, etc.)

## Installation

```bash
npm install react-native-modifier
# or
yarn add react-native-modifier
```

## Quick Start

### With Theme Support (Recommended)

```typescript
import React, { useSyncExternalStore } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {
  createModifier,
  initializeTheme,
  initializeColorScheme,
  useColorScheme,
  useThemeToggle
} from "react-native-modifier";

// Initialize once in your App.tsx or index.tsx
initializeTheme('light');
initializeColorScheme(useSyncExternalStore);

// Create modifier factory (outside component)
const modifier = createModifier(StyleSheet);

// Now use anywhere in your app - no need to pass useSyncExternalStore!
function MyComponent() {
  // Get reactive colors - component re-renders when theme changes
  const colors = useColorScheme();
  const toggleTheme = useThemeToggle();

  // Build styles with theme colors
  const containerStyle = modifier()
    .backgroundColor(colors.surface)
    .paddingToken('lg')
    .borderRadiusToken('md')
    .build();

  return (
    <View style={containerStyle}>
      <Text style={{ color: colors.onSurface }}>
        Hello, themed world!
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
```

### Basic Usage (No Theme)

```typescript
import { StyleSheet } from "react-native";
import { Modifier } from "react-native-modifier";

const styles = new Modifier(StyleSheet)
  .padding(16)
  .backgroundColor("#fff")
  .borderRadius(8)
  .flexDirection("row")
  .justifyContent("space-between")
  .alignItems("center")
  .build();
```

### Conditional Styling

```typescript
const buttonStyle = new Modifier(StyleSheet)
  .padding(10)
  .applyIf(isActive, (m) => m.backgroundColor("blue").borderRadius(10))
  .applyIf(!isActive, (m) => m.backgroundColor("gray"))
  .build();
```

## API Reference

### Layout Methods

- `flex(value: number)`
- `flexDirection(value: "row" | "row-reverse" | "column" | "column-reverse")`
- `flexWrap(value: "nowrap" | "wrap" | "wrap-reverse")`
- `flexBasis(value: string | number)`
- `alignItems(value: AlignItems)`
- `alignSelf(value: AlignSelf)`
- `alignContent(value: AlignContent)`
- `justifyContent(value: JustifyContent)`

### Spacing Methods

- `padding(value: number)`
- `paddingVertical(value: number)`
- `paddingHorizontal(value: number)`
- `paddingLeft/Right/Top/Bottom(value: number)`
- `margin(value: number)`
- `marginVertical(value: number)`
- `marginHorizontal(value: number)`
- `marginLeft/Right/Top/Bottom(value: number)`
- `gap(value: number)`

### Size Methods

- `width(value: number)`
- `height(value: number)`
- `maxWidth(value: string | number)`
- `maxHeight(value: string | number)`
- `aspectRatio(value: number)`

### Border Methods

- `borderRadius(value: number)`
- `borderWidth(value: number)`
- `borderStyle(value: "solid" | "dotted" | "dashed")`
- `borderColor(value: string)`

### Color & Text Methods

- `backgroundColor(value: string)`
- `fontWeight(value: FontWeight)`

### Utility Methods

- `applyIf(condition: boolean, callback: (m: Modifier) => Modifier)` - Conditional styling
- `build()` - Returns the final style object

## Theme System

Jetpack Compose-inspired theme system with automatic light/dark mode support.

### Quick Example

```typescript
import { createModifier, getThemeManager } from "react-native-modifier";
import { StyleSheet } from "react-native";

const modifier = createModifier(StyleSheet);

// Access theme colors
const styles = modifier
  .backgroundColor(modifier.colors.surface)
  .paddingToken("lg")
  .build();

// Toggle theme
getThemeManager().toggleTheme();
```

### Available Theme Colors

The theme system provides 24 semantic colors following Material Design 3 guidelines:

**Primary Colors**: `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`  
**Secondary Colors**: `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`  
**Tertiary Colors**: `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`  
**Error Colors**: `error`, `onError`, `errorContainer`, `onErrorContainer`  
**Background**: `background`, `onBackground`  
**Surface**: `surface`, `onSurface`, `surfaceVariant`, `onSurfaceVariant`  
**Outline**: `outline`, `outlineVariant`  
**Inverse**: `inverseSurface`, `inverseOnSurface`, `inversePrimary`  
**Other**: `shadow`, `scrim`

### Using Theme Colors in Components

```typescript
import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {
  createModifier,
  useColorScheme,
  useThemeToggle
} from "react-native-modifier";

const modifier = createModifier(StyleSheet);

function ThemedCard({ title, description }) {
  // Get reactive colors - component re-renders when theme changes
  const colors = useColorScheme();
  const toggleTheme = useThemeToggle();

  const cardStyle = modifier()
    .backgroundColor(colors.surface)
    .paddingToken('lg')
    .borderRadiusToken('lg')
    .shadowToken('md')
    .build();

  const titleStyle = modifier()
    .fontSize(18)
    .fontWeightToken('bold')
    .marginBottomToken('sm')
    .build();

  return (
    <View style={cardStyle}>
      <Text style={{ ...titleStyle, color: colors.onSurface }}>
        {title}
      </Text>
      <Text style={{ color: colors.onSurfaceVariant }}>
        {description}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
```

### Custom Color Schemes

You can extend the color scheme with your own custom color names while maintaining full TypeScript support. Use module augmentation to declare your custom colors once, then use them everywhere without type parameters:

````typescript
// types.ts - Declare your custom color names once
declare module "react-native-modifier" {
  interface CustomColorScheme {
    red100: string;
    red200: string;
    blue100: string;
    blue200: string;
    brandPrimary: string;
    brandSecondary: string;
  }
}

// theme.ts - Define ONLY your custom colors
// All Material Design 3 colors are handled automatically!
const lightColors = {
  red100: "#FFEBEE",
  red200: "#EF5350",
  blue100: "#E3F2FD",
  blue200: "#42A5F5",
  brandPrimary: "#FF6B6B",
  brandSecondary: "#4ECDC4",
};

const darkColors = {
  red100: "#B71C1C",
  red200: "#D32F2F",
  blue100: "#0D47A1",
  blue200: "#1976D2",
  brandPrimary: "#FF8787",
  brandSecondary: "#5FE3D8",
};

// App.tsx - Initialize with ONLY your custom colors
import { useSyncExternalStore } from "react";
import { initializeTheme, initializeColorScheme } from "react-native-modifier";

// Pass only your custom colors - defaults are merged automatically!
initializeTheme("light", lightColors, darkColors);
initializeColorScheme(useSyncExternalStore);

// MyComponent.tsx - Use anywhere!
import { useColorScheme } from "react-native-modifier";

function MyComponent() {
  // Get all colors: your custom ones + Material Design 3 defaults
  const colors = useColorScheme();

  return (
    <View style={{ backgroundColor: colors.brandPrimary }}>
      <Text style={{ color: colors.red200 }}>Custom colors!</Text>
      <Text style={{ color: colors.primary }}>Standard colors work too!</Text>
    </View>
  );
}

## Design Tokens

Design tokens provide consistent spacing, colors, shadows, and other design values across your app.

### Quick Example

```typescript
import { StyleSheet } from "react-native";
import { createModifier } from "react-native-modifier";

const modifier = createModifier(StyleSheet);

const styles = modifier
  .paddingToken("md") // Uses 16px from tokens
  .marginToken("lg") // Uses 24px from tokens
  .borderRadiusToken("lg") // Uses 12px from tokens
  .shadowToken("md") // Applies medium shadow
  .build();
````

### Available Tokens

#### Spacing Tokens

- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `xxl`: 48px

#### Border Radius Tokens

- `none`: 0
- `sm`: 4px
- `md`: 8px
- `lg`: 12px
- `xl`: 16px
- `full`: 9999px (fully rounded)

#### Font Weight Tokens

- `light`: 300
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

#### Shadow Tokens

- `sm`: Small shadow with elevation 1
- `md`: Medium shadow with elevation 5
- `lg`: Large shadow with elevation 8
- `xl`: Extra large shadow with elevation 12

### Custom Tokens

```typescript
import { createModifier, DesignTokens } from "react-native-modifier";

const customTokens: DesignTokens = {
  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    full: 9999,
  },
  // ... other token categories
};

const modifier = createModifier(StyleSheet, customTokens);
```

## Key Benefits

### 1. Zero Dependencies

Pure TypeScript/JavaScript with no external packages. Works with any React Native setup.

### 2. Zero Performance Overhead

- No proxies, no middleware, just direct function calls
- Only mounted components re-render on theme changes
- Compiles to standard React Native styles

### 3. Jetpack Compose-Inspired

Familiar API if you've used Jetpack Compose:

```typescript
modifier.backgroundColor(modifier.colors.primary);
```

### 4. Flexible State Integration

Connect with any state management solution:

- Built-in `useExternalState` (zero dependencies)
- Zustand, Redux, MobX, Jotai, etc.
- React Context
- Any custom solution

### 5. Type-Safe

Full TypeScript support with autocomplete for all colors, tokens, and methods.

## Complete Examples

### Theme-Aware Card Component

```typescript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createModifier, useColorScheme } from "react-native-modifier";

const modifier = createModifier(StyleSheet);

function ThemedCard({ title, description }) {
  // Get reactive colors - component re-renders when theme changes
  const colors = useColorScheme();

  const cardStyle = modifier()
    .backgroundColor(colors.surface)
    .paddingToken('lg')
    .borderRadiusToken('lg')
    .shadowToken('md')
    .marginToken('md')
    .build();

  return (
    <View style={cardStyle}>
      <Text style={{ color: colors.onSurface, fontSize: 18, fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text style={{ color: colors.onSurfaceVariant, marginTop: 8 }}>
        {description}
      </Text>
    </View>
  );
}
```

### Conditional Styling with Theme

```typescript
import React from "react";
import { Pressable } from "react-native";
import { useColorScheme } from "react-native-modifier";

function MyButton({ isActive }) {
  const colors = useColorScheme();

  const buttonStyle = modifier()
    .backgroundColor(
      isActive ? colors.primary : colors.surfaceVariant,
    )
    .paddingToken("md")
    .borderRadiusToken("md")
    .applyIf(isActive, (m) => m.shadowToken("lg"))
    .build();

  return <Pressable style={buttonStyle}>...</Pressable>;
}
```

### Error Banner Component

```typescript
import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "react-native-modifier";

function ErrorBanner({ message }) {
  const colors = useColorScheme();

  const bannerStyle = modifier()
    .backgroundColor(colors.errorContainer)
    .paddingToken('md')
    .borderRadiusToken('sm')
    .marginToken('md')
    .build();

  return (
    <View style={bannerStyle}>
      <Text style={{ color: colors.onErrorContainer, fontWeight: '600' }}>
        ⚠️ {message}
      </Text>
    </View>
  );}
```

### Integration with Zustand

```typescript
import create from "zustand";
import {
  initializeTheme,
  createExternalStateAdapter,
  ThemeMode,
} from "react-native-modifier";

const useThemeStore = create<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));

// Connect to theme manager
const themeManager = initializeTheme("light");
themeManager.injectExternalState(
  createExternalStateAdapter(
    () => useThemeStore.getState().theme,
    (theme) => useThemeStore.getState().setTheme(theme),
    (listener) => useThemeStore.subscribe((state) => listener(state.theme)),
  ),
);
```

## Type Definitions

The package exports the following types for TypeScript users:

```typescript
import type {
  ViewStyle,
  TextStyle,
  StyleSheetLike,
  ColorScheme,
  ThemeMode,
  DesignTokens,
  ThemeManager,
  ExternalStateManager,
} from "react-native-modifier";
```

- **`ViewStyle`** - View style properties
- **`TextStyle`** - Text style properties (extends ViewStyle)
- **`StyleSheetLike`** - Interface for StyleSheet-compatible objects
- **`ColorScheme`** - Theme color scheme interface (24 semantic colors)
- **`ThemeMode`** - `'light' | 'dark'`
- **`DesignTokens`** - Design tokens interface
- **`ThemeManager`** - Theme manager class
- **`ExternalStateManager<T>`** - External state adapter interface

## FAQ

**Q: Do I need to install any dependencies?**  
A: No! This library has zero dependencies. You only need React Native (which you already have).

**Q: Does this affect performance?**  
A: No. The modifier pattern compiles to standard React Native styles. Theme changes only re-render subscribed components.

**Q: Can I use this without TypeScript?**  
A: Yes! All features work in JavaScript. TypeScript just provides better autocomplete.

**Q: How do I toggle between light and dark mode?**  
A: Call `getThemeManager().toggleTheme()` or `setTheme('dark')`.

**Q: Can I use my own state management?**  
A: Yes! Use `injectExternalState()` to connect Zustand, Redux, or any state manager. Or use the built-in `createExternalState()`. Note: `useExternalState` requires passing `useSyncExternalStore` from React (available in React 18+ and React Native 0.70+).

**Q: Is this compatible with Expo?**  
A: Yes! It works with any React Native setup including Expo.

**Q: Can I customize the color schemes?**  
A: Yes! Pass partial or complete color schemes to `initializeTheme()`.

**Q: How do I create reusable styled components?**  
A: Create custom hooks that use `useThemedModifier()` or wrap the modifier in a context provider.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
