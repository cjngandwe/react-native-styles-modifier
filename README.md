# React Native Modifier

**A fluent, chainable style builder for React Native** — inspired by [Material UI](https://mui.com/)'s sx prop and [Jetpack Compose](https://developer.android.com/jetpack/compose)'s Modifier pattern.

## Why This Exists

This library was created to solve a practical problem I encountered while working with React Native styling.

While I enjoy using `StyleSheet` and `object-based styles`, I often needed a more structured and reusable way to define styles across an application. In many projects, styles become scattered across components, making them harder to reuse, maintain, and evolve as the design system grows.

This library provides a centralized styling approach built around a fluent API that makes styles easier to compose, extend, and standardize.

## Key Benefits

With this approach, you can:

- **Define a theme** once and use it consistently across your application
- **Create custom design tokens** (colors, spacing, typography, etc.)
- **Build reusable style patterns** that can be extended or modified easily
- **Maintain a consistent design language** through a predictable API
- **Keep styling logic centralized** instead of spreading `StyleSheet.create()` calls across multiple components

Because styles are built using a fluent API, you can compose and adjust them flexibly while keeping the code readable and predictable.

The goal is to make styling simpler to scale, easier to maintain, and more consistent across the entire application.

## What You Get

**Chainable Style API** — Build styles fluently without worrying about object keys  
**Built-in Theme System** — Colors, modes, and palettes ready to use (customizable)  
**Extensible Modifier Class** — Add your own custom style methods once, use everywhere  
**Design Tokens** — Pre-configured spacing, border radius, font sizes, shadows, and more  
**Zero Configuration** — Works out of the box, customize only what you need  
**Zero Dependencies** — Pure TypeScript, no external packages  
⚡ **Type-Safe** — Full TypeScript support with autocomplete for all style properties

## Installation

```bash
npm install react-native-styles-modifier
# or
yarn add react-native-styles-modifier
# or
pnpm add react-native-styles-modifier
```

## Quick Start

### Basic Usage (No Theme)

The simplest way to use the library — just import and start chaining styles:

```typescript
import { View, Text } from "react-native";
import { createModifier } from "react-native-styles-modifier";

// Create a modifier instance
const modifier = createModifier();

function MyComponent() {
  // Build styles with a fluent API
  const containerStyle = modifier()
    .padding(16)
    .backgroundColor("#ffffff")
    .borderRadius(8)
    .flexDirection("row")
    .justifyContent("space-between")
    .alignItems("center")
    .build();

  const textStyle = modifier()
    .fontSize(16)
    .fontWeight("600")
    .color("#333333")
    .build();

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>Hello, Modifier!</Text>
    </View>
  );
}
```

### With Theme Support (Recommended)

Unlock the full power with built-in theming. Initialize once in your app root:

```typescript
// App.tsx or index.tsx
import { useSyncExternalStore } from "react";
import { useColorScheme } from "react-native";
import {
  initializeTheme,
  initializeColorScheme,
} from "react-native-styles-modifier";

// Step 1: Initialize theme (light or dark)
initializeTheme("light");

// OR
// Using the useColorScheme hook from React Native, to get the current system theme
const colorScheme = useColorScheme();

initializeTheme(colorScheme as ThemeMode);

// OR
// Using the async localStorage to persist the current theme

const currentTheme = await storage.getItem(CURRENT_THEME);
const theme = currentTheme ?? colorScheme;

initializeTheme(theme);

// Step 2: Initialize color scheme with React's useSyncExternalStore
initializeColorScheme(useSyncExternalStore);
```

Then use the theme anywhere in your app:

```typescript
import { View, Text, Button } from "react-native";
import { createModifier, useModifierTheme } from "react-native-styles-modifier";

const modifier = createModifier();

function ThemedComponent() {
  // Get colors, mode, and theme controls in one hook
  const { colors, mode, toggleTheme } = useModifierTheme();

  // Option 1: Extract style to a variable
  const containerStyle = modifier()
    .backgroundColor(colors.surface)
    .padding(24)
    .borderRadius(12)
    .build();

  return (
    <View style={containerStyle}>
      <Text style={{ color: colors.onSurface }}>
        Current theme: {mode}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />

      {/* Option 2: Inline style (great for one-off styles) */}
      <View
        style={modifier()
          .backgroundColor(colors.background)
          .marginHorizontal(8)
          .borderRadius(12)
          .padding(12)
          .build()}
      />
    </View>
  );
}
```

### Debugging Re-renders

Track when styles are being rebuilt during development by passing `__DEV__`:

```typescript
// Pass __DEV__ to enable logging in development only
const modifier = createModifier(__DEV__);

// Use build() with a label to track rebuilds
const containerStyle = modifier()
  .backgroundColor(colors.surface)
  .padding(24)
  .borderRadius(12)
  .build("CONTAINER");

// Console output (dev only): "BUILD LOG FOR: CONTAINER"
```

**Important:** Always pass `__DEV__` (React Native's global) instead of hardcoding `true` or `false`. This ensures:

- Logging works in development
- Zero logging in production builds

### Conditional Styling

Apply styles conditionally with the `applyIf` method:

```typescript
const modifier = createModifier();

function TodoItem({ todo }) {
  const { colors } = useModifierTheme();

  // Option 1: Extract to variable
  const itemStyle = modifier()
    .padding(12)
    .borderRadius(8)
    .backgroundColor(colors.surface)
    .applyIf(todo.completed, (m) =>
      m.backgroundColor(colors.inversePrimary)
    )
    .build();

  return <View style={itemStyle}>...</View>;
}

function TodoItemInline({ todo }) {
  const { colors } = useModifierTheme();

  // Option 2: Inline with conditional styling
  return (
    <View
      style={modifier()
        .backgroundColor(colors.background)
        .marginHorizontal(8)
        .borderRadius(12)
        .padding(12)
        .applyIf(todo.completed, (m) =>
          m.backgroundColor(colors.inversePrimary)
        )
        .build()}
    >
      <Text>{todo.title}</Text>
    </View>
  );
}
```

## Extending the Modifier Class

One of the most powerful features is the ability to extend the `Modifier` class with your own custom style methods. Define them once, use them everywhere.

### Creating Custom Style Methods

```typescript
import { Modifier } from "react-native-styles-modifier";

// Extend the Modifier class with your custom methods
class CustomModifier extends Modifier {
  // Conditional method for platform-specific styling
  android(callback: (modifier: this) => this) {
    if (Platform.OS === "android") {
      return callback(this);
    }
    return this;
  }

  // Custom card style
  card() {
    this.styles.backgroundColor = "#ffffff";
    this.styles.borderRadius = 12;
    this.styles.padding = 16;
    this.styles.shadowColor = "#000";
    this.styles.shadowOffset = { width: 0, height: 2 };
    this.styles.shadowOpacity = 0.1;
    this.styles.shadowRadius = 8;
    this.styles.elevation = 3;
    return this;
  }

  // Custom button style
  primaryButton() {
    this.styles.backgroundColor = "#007AFF";
    this.styles.paddingVertical = 12;
    this.styles.paddingHorizontal = 24;
    this.styles.borderRadius = 8;
    this.styles.alignItems = "center";
    this.styles.justifyContent = "center";
    return this;
  }

  // Custom text preset
  heading() {
    this.styles.fontSize = 24;
    this.styles.fontWeight = "bold";
    this.styles.marginBottom = 8;
    return this;
  }

  // Custom spacing using your design system
  spacingLarge() {
    this.styles.padding = 24;
    return this;
  }
}

// Create your custom factory function
export function createCustomModifier() {
  return () => new CustomModifier();
}
```

Now use your custom methods anywhere:

```typescript
import { createCustomModifier } from "./CustomModifier";

const modifier = createCustomModifier();

function MyScreen() {
  const cardStyle = modifier().card().spacingLarge().build();
  const buttonStyle = modifier().primaryButton().build();
  const titleStyle = modifier()
    .android((m) => m.paddingBottom(0).backgroundColor("#fff"))
    .heading()
    .color("#333")
    .build();

  return (
    <View style={cardStyle}>
      <Text style={titleStyle}>Welcome</Text>
      <Pressable style={buttonStyle}>
        <Text>Click Me</Text>
      </Pressable>
    </View>
  );
}
```

### Custom Design Tokens

Extend the Modifier with your design system's tokens:

```typescript
class DesignSystemModifier extends Modifier {
  // Spacing tokens
  spacingXs() {
    this.styles.padding = 4;
    return this;
  }
  spacingSm() {
    this.styles.padding = 8;
    return this;
  }
  spacingMd() {
    this.styles.padding = 16;
    return this;
  }
  spacingLg() {
    this.styles.padding = 24;
    return this;
  }
  spacingXl() {
    this.styles.padding = 32;
    return this;
  }

  // Border radius tokens
  roundedSm() {
    this.styles.borderRadius = 4;
    return this;
  }
  roundedMd() {
    this.styles.borderRadius = 8;
    return this;
  }
  roundedLg() {
    this.styles.borderRadius = 12;
    return this;
  }
  roundedFull() {
    this.styles.borderRadius = 9999;
    return this;
  }

  // Font size tokens
  textXs() {
    this.styles.fontSize = 12;
    return this;
  }
  textSm() {
    this.styles.fontSize = 14;
    return this;
  }
  textBase() {
    this.styles.fontSize = 16;
    return this;
  }
  textLg() {
    this.styles.fontSize = 18;
    return this;
  }
  textXl() {
    this.styles.fontSize = 20;
    return this;
  }
  text2xl() {
    this.styles.fontSize = 24;
    return this;
  }

  // Shadow tokens
  shadowSm() {
    this.styles.shadowColor = "#000";
    this.styles.shadowOffset = { width: 0, height: 1 };
    this.styles.shadowOpacity = 0.05;
    this.styles.shadowRadius = 2;
    this.styles.elevation = 1;
    return this;
  }

  shadowMd() {
    this.styles.shadowColor = "#000";
    this.styles.shadowOffset = { width: 0, height: 2 };
    this.styles.shadowOpacity = 0.1;
    this.styles.shadowRadius = 4;
    this.styles.elevation = 3;
    return this;
  }
}

export function createModifier() {
  return new DesignSystemModifier();
}
```

Use your tokens:

```typescript
const modifier = createModifier();

const style = modifier().spacingMd().roundedLg().textBase().shadowMd().build();
```

## Theme System

### Available Colors

24 semantic colors following Material Design 3 guidelines:

| Category       | Colors                                                                   |
| -------------- | ------------------------------------------------------------------------ |
| **Primary**    | `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`         |
| **Secondary**  | `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer` |
| **Tertiary**   | `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`     |
| **Error**      | `error`, `onError`, `errorContainer`, `onErrorContainer`                 |
| **Background** | `background`, `onBackground`                                             |
| **Surface**    | `surface`, `onSurface`, `surfaceVariant`, `onSurfaceVariant`             |
| **Outline**    | `outline`, `outlineVariant`                                              |
| **Inverse**    | `inverseSurface`, `inverseOnSurface`, `inversePrimary`                   |
| **Other**      | `shadow`, `scrim`                                                        |

### Theme Controls

```typescript
const { colors, mode, toggleTheme, setTheme } = useModifierTheme();
```

- `colors` — Current color palette (light or dark)
- `mode` — Current theme mode (`"light"` | `"dark"`)
- `toggleTheme()` — Toggle between light/dark
- `setTheme(mode)` — Set specific theme mode
- `await storage.setItem(mode)` — To save the theme in the async storage

### Custom Colors

Add your own brand colors:

```typescript
// Declare custom colors
declare module "react-native-styles-modifier" {
  interface CustomColorScheme {
    brandPrimary: string;
    success: string;
  }
}

// Initialize with custom colors (Material Design 3 colors included automatically)
const light = { brandPrimary: "#FF6B6B", success: "#51CF66" };
const dark = { brandPrimary: "#FF8787", success: "#69DB7C" };
initializeTheme("light", light, dark);

// Use anywhere
const { colors } = useModifierTheme();
modifier.backgroundColor(colors.brandPrimary).build();
```

## Complete API Reference

The `Modifier` class provides **121+ style methods** covering all React Native StyleSheet properties.

### Layout & Flexbox (20 methods)

```typescript
// Flex container
.flex(1)
.flexDirection("row" | "column" | "row-reverse" | "column-reverse")
.flexWrap("wrap" | "nowrap" | "wrap-reverse")
.flexGrow(1)
.flexShrink(1)
.flexBasis(100)

// Alignment
.alignItems("center" | "flex-start" | "flex-end" | "stretch" | "baseline")
.alignSelf("auto" | "center" | "flex-start" | "flex-end" | "stretch" | "baseline")
.alignContent("center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | "space-evenly")
.justifyContent("center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly")

// Spacing
.gap(8)
.rowGap(8)
.columnGap(8)

// Position
.position("absolute" | "relative" | "static")
.display("flex" | "none" | "contents")
.overflow("visible" | "hidden" | "scroll")
.direction("ltr" | "rtl" | "inherit")
.boxSizing("border-box" | "content-box")
.zIndex(10)
```

### Spacing - Padding (14 methods)

```typescript
.padding(16)
.paddingVertical(16)
.paddingHorizontal(16)
.paddingTop(16)
.paddingBottom(16)
.paddingLeft(16)
.paddingRight(16)
.paddingStart(16)
.paddingEnd(16)
.paddingBlock(16)
.paddingBlockStart(16)
.paddingBlockEnd(16)
.paddingInline(16)
.paddingInlineStart(16)
.paddingInlineEnd(16)
```

### Spacing - Margin (14 methods)

```typescript
.margin(16)
.marginVertical(16)
.marginHorizontal(16)
.marginTop(16)
.marginBottom(16)
.marginLeft(16)
.marginRight(16)
.marginStart(16)
.marginEnd(16)
.marginBlock(16)
.marginBlockStart(16)
.marginBlockEnd(16)
.marginInline(16)
.marginInlineStart(16)
.marginInlineEnd(16)
```

### Dimensions (6 methods)

```typescript
.width(100)
.height(100)
.minWidth(50)
.minHeight(50)
.maxWidth(200)
.maxHeight(200)
```

### Positioning (13 methods)

```typescript
.top(0)
.bottom(0)
.left(0)
.right(0)
.start(0)
.end(0)
.inset(0)
.insetBlock(0)
.insetBlockStart(0)
.insetBlockEnd(0)
.insetInline(0)
.insetInlineStart(0)
.insetInlineEnd(0)
```

### Borders (25 methods)

```typescript
// Border width
.borderWidth(1)
.borderTopWidth(1)
.borderBottomWidth(1)
.borderLeftWidth(1)
.borderRightWidth(1)
.borderStartWidth(1)
.borderEndWidth(1)

// Border color
.borderColor("#000")
.borderTopColor("#000")
.borderBottomColor("#000")
.borderLeftColor("#000")
.borderRightColor("#000")
.borderStartColor("#000")
.borderEndColor("#000")
.borderBlockColor("#000")
.borderBlockStartColor("#000")
.borderBlockEndColor("#000")

// Border radius
.borderRadius(8)
.borderTopLeftRadius(8)
.borderTopRightRadius(8)
.borderBottomLeftRadius(8)
.borderBottomRightRadius(8)
.borderTopStartRadius(8)
.borderTopEndRadius(8)
.borderBottomStartRadius(8)
.borderBottomEndRadius(8)
.borderStartStartRadius(8)
.borderStartEndRadius(8)
.borderEndStartRadius(8)
.borderEndEndRadius(8)

// Border style
.borderStyle("solid" | "dotted" | "dashed")
.borderCurve("circular" | "continuous")
```

### Colors & Visual (5 methods)

```typescript
.backgroundColor("#fff")
.opacity(0.5)
.elevation(3)  // Android shadow
.backfaceVisibility("visible" | "hidden")
.cursor("auto" | "pointer")
```

### Shadows (4 methods)

```typescript
.shadowColor("#000")
.shadowOffset({ width: 0, height: 2 })
.shadowOpacity(0.25)
.shadowRadius(3.84)
```

### Transforms (2 methods)

```typescript
.transform([{ rotate: "45deg" }, { scale: 1.2 }])
.transformOrigin(["50%", "50%"])
```

### Outline (4 methods)

```typescript
.outlineColor("#000")
.outlineOffset(2)
.outlineStyle("solid" | "dotted" | "dashed")
.outlineWidth(1)
```

### Text Styles (17 methods)

```typescript
.color("#000")
.fontFamily("Arial")
.fontSize(16)
.fontStyle("normal" | "italic")
.fontWeight("normal" | "bold" | "100" | "200" | ... | "900")
.fontVariant(["small-caps"])
.letterSpacing(1)
.lineHeight(24)
.textAlign("auto" | "left" | "right" | "center" | "justify")
.textAlignVertical("auto" | "top" | "bottom" | "center")
.textDecorationColor("#000")
.textDecorationLine("none" | "underline" | "line-through" | "underline line-through")
.textDecorationStyle("solid" | "double" | "dotted" | "dashed")
.textShadowColor("#000")
.textShadowOffset({ width: 0, height: 1 })
.textShadowRadius(2)
.textTransform("none" | "capitalize" | "uppercase" | "lowercase")
.includeFontPadding(false)
.userSelect("auto" | "none" | "text" | "contain" | "all")
.verticalAlign("auto" | "top" | "bottom" | "middle")
.writingDirection("auto" | "ltr" | "rtl")
```

### Utilities (2 methods)

```typescript
// Conditional styling
.applyIf(condition, (m) => m.backgroundColor("red"))

// Build final style object
.build()
```

## Real-World Examples

### Button with Variants

```typescript
function CustomButton({ title, variant = "primary", onPress }) {
  const { colors } = useModifierTheme();

  const buttonStyle = createModifier()
    .paddingVertical(12)
    .paddingHorizontal(24)
    .borderRadius(8)
    .alignItems("center")
    .applyIf(variant === "primary", (m) => m.backgroundColor(colors.primary))
    .applyIf(variant === "outline", (m) =>
      m.backgroundColor("transparent").borderWidth(1).borderColor(colors.outline)
    )
    .build();

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text>{title}</Text>
    </Pressable>
  );
}
```

## Advanced Usage

### Responsive Styles

```typescript
const { width } = Dimensions.get("window");
const isSmall = width < 375;

const style = createModifier()
  .padding(16)
  .applyIf(isSmall, (m) => m.padding(12).fontSize(14))
  .applyIf(!isSmall, (m) => m.padding(20).fontSize(16))
  .build();
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  Modifier,
  ViewStyle,
  TextStyle,
  ModifierStyle,
  StyleSheetLike,
  ColorScheme,
  ThemeMode,
  ThemeManager,
  ExternalStateManager,
} from "react-native-styles-modifier";
```

| Type                      | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `Modifier`                | Main modifier class                                  |
| `ViewStyle`               | View style properties (all React Native view styles) |
| `TextStyle`               | Text style properties (extends ViewStyle)            |
| `ModifierStyle`           | Combined style type (ViewStyle & TextStyle)          |
| `StyleSheetLike`          | Interface for StyleSheet-compatible objects          |
| `ColorScheme`             | Theme color scheme interface (24 semantic colors)    |
| `ThemeMode`               | `"light" \| "dark"`                                  |
| `ThemeManager`            | Theme manager class                                  |
| `ExternalStateManager<T>` | External state adapter interface                     |

## FAQ

**Q: Do I need to install any dependencies?**  
A: No! This library has zero dependencies. You only need React Native.

**Q: Does this affect performance?**  
A: No. The modifier compiles to standard React Native styles. Theme changes only re-render components that use `useModifierTheme()`.

**Q: How do I toggle between light and dark mode?**  
A: Use the `toggleTheme()` function from `useModifierTheme()` hook, or call `getThemeManager().toggleTheme()`.

**Q: Do I need to initialize the theme system?**  
A: Only if you want to use theme features. For basic styling without themes, just use `createModifier()` directly.

**Q: What is `useSyncExternalStore` and why do I need it?**  
A: It's React's built-in hook (React 18+, React Native 0.70+) that enables reactive theme updates. You pass it once during initialization with `initializeColorScheme(useSyncExternalStore)`.

**Q: Can I extend the Modifier class with my own methods?**  
A: Yes! Extend the `Modifier` class and create your own factory function. See the "Extending the Modifier Class" section.

**Q: Is this compatible with Expo?**  
A: Yes! Works with Expo, bare React Native, and any React Native setup.

**Q: Can I customize the color palette?**  
A: Yes! Pass your custom colors to `initializeTheme("light", customLightColors, customDarkColors)`. Material Design 3 colors are included by default.

**Q: How do I create reusable components?**  
A: Extend the `Modifier` class with custom methods (like `.card()`, `.button()`) and use them throughout your app.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

---

**Made for React Native developers who love clean, reusable styles**
