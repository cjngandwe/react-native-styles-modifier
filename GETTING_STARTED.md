# Getting Started with React Native Modifier

A lightweight, zero-dependency library for simplifying React Native styles with design tokens and theme support.

## Installation

Since this is a pure TypeScript/JavaScript library with no external dependencies, you can simply copy the files into your project or install it as a local package.

### Requirements

- React Native (peer dependency)
- TypeScript (optional, but recommended)

## Quick Start

### 1. Basic Modifier Usage

```typescript
import { StyleSheet, View } from 'react-native';
import { Modifier } from './modifier';

const modifier = new Modifier(StyleSheet);

const styles = modifier
  .padding(16)
  .backgroundColor('#007AFF')
  .borderRadius(8)
  .flex(1)
  .build();

// Use in component
<View style={styles}>...</View>
```

### 2. Using Design Tokens

```typescript
import { createModifierWithTokens } from './modifier-tokens';
import { StyleSheet } from 'react-native';

const modifier = createModifierWithTokens(StyleSheet);

const styles = modifier
  .paddingToken('lg')           // Uses token: 24
  .backgroundColorToken('primary')  // Uses token color
  .borderRadiusToken('md')      // Uses token: 8
  .shadowToken('md')            // Applies shadow preset
  .build();
```

### 3. Using Theme System (Recommended)

```typescript
import { StyleSheet } from 'react-native';
import { createModifier, initializeTheme } from './modifier-theme';
import { createExternalState, useExternalState } from './useExternalState';

// Initialize theme
const themeManager = initializeTheme('light');

// Create external state for theme
const themeStore = createExternalState('light');

// Connect theme to state
themeManager.injectExternalState(
  createExternalStateAdapter(
    themeStore.getState,
    themeStore.setState,
    themeStore.subscribe
  )
);

// In your component
function MyComponent() {
  const [, forceUpdate] = useState({});
  const modifier = createModifier(StyleSheet);

  useEffect(() => {
    const unsubscribe = modifier.subscribeToTheme(() => forceUpdate({}));
    return () => unsubscribe();
  }, []);

  const styles = modifier
    .backgroundColor(modifier.colors.primary)  // Jetpack Compose style!
    .paddingToken('lg')
    .build();

  return <View style={styles}>...</View>;
}
```

## File Structure

```
react-native-modifier/
├── modifier.ts              # Core modifier class
├── tokens.ts                # Design token definitions
├── modifier-tokens.ts       # Modifier with token support
├── theme.ts                 # Theme system (light/dark)
├── modifier-theme.ts        # Modifier with theme support (recommended)
├── useExternalState.ts      # Lightweight state management
├── index.ts                 # Main exports
├── README.md                # Overview
├── TOKENS.md                # Token documentation
├── THEME.md                 # Theme documentation
├── GETTING_STARTED.md       # This file
├── modifier.example.ts      # Basic examples
├── modifier-tokens.example.ts # Token examples
└── theme.example.ts         # Theme examples (requires React/RN)
```

## Core Concepts

### 1. Modifier Pattern

Inspired by Jetpack Compose, the modifier pattern allows you to chain style modifications:

```typescript
modifier
  .padding(16)
  .backgroundColor('#fff')
  .borderRadius(8)
  .flex(1)
  .build();
```

### 2. Design Tokens

Centralized design values for consistency:

```typescript
// Spacing tokens
.paddingToken('sm')   // 8
.paddingToken('md')   // 16
.paddingToken('lg')   // 24

// Color tokens
.backgroundColorToken('primary')
.borderColorToken('danger')

// Border radius tokens
.borderRadiusToken('sm')   // 4
.borderRadiusToken('full') // 9999
```

### 3. Theme System

Jetpack Compose-inspired color scheme with automatic light/dark mode:

```typescript
// Access theme colors
modifier.colors.primary
modifier.colors.onPrimary
modifier.colors.surface
modifier.colors.onSurface

// Use in styles
modifier.backgroundColor(modifier.colors.primary)
```

## Integration Patterns

### Pattern 1: Custom Hook (Recommended)

```typescript
function useThemedModifier() {
  const [, forceUpdate] = useState({});
  const modifier = createModifier(StyleSheet);

  useEffect(() => {
    const unsubscribe = modifier.subscribeToTheme(() => forceUpdate({}));
    return () => unsubscribe();
  }, []);

  return modifier;
}

// Usage
function MyComponent() {
  const modifier = useThemedModifier();
  const styles = modifier.backgroundColor(modifier.colors.surface).build();
  return <View style={styles}>...</View>;
}
```

### Pattern 2: Context Provider

```typescript
import { createContext, useContext } from 'react';

const ModifierContext = createContext(null);

export function ModifierProvider({ children }) {
  const modifier = useThemedModifier();
  return (
    <ModifierContext.Provider value={modifier}>
      {children}
    </ModifierContext.Provider>
  );
}

export const useModifier = () => useContext(ModifierContext);
```

### Pattern 3: Direct Usage

```typescript
function MyComponent() {
  const modifier = createModifier(StyleSheet);
  
  // No theme subscription - static styles
  const styles = modifier
    .paddingToken('lg')
    .backgroundColor('#007AFF')
    .build();
    
  return <View style={styles}>...</View>;
}
```

## Customization

### Custom Design Tokens

```typescript
import { DesignTokens } from './tokens';

const customTokens: DesignTokens = {
  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    // ... more colors
  },
  // ... other tokens
};

const modifier = createModifier(StyleSheet, customTokens);
```

### Custom Color Schemes

```typescript
import { initializeTheme } from './theme';

const customLight = {
  primary: '#FF6B6B',
  onPrimary: '#FFFFFF',
  surface: '#FFFFFF',
  onSurface: '#000000',
  // ... other colors
};

const customDark = {
  primary: '#FF8787',
  onPrimary: '#000000',
  surface: '#1A1A1A',
  onSurface: '#FFFFFF',
  // ... other colors
};

initializeTheme('light', customLight, customDark);
```

## Performance Tips

1. **Reuse modifier instances** when possible
2. **Use tokens** instead of hardcoded values for consistency
3. **Subscribe to theme changes** only in components that need it
4. **Memoize styles** if they don't depend on theme or props
5. **Use the custom hook pattern** for cleaner code

## Migration Guide

### From Inline Styles

```typescript
// Before
<View style={{ padding: 16, backgroundColor: '#007AFF', borderRadius: 8 }}>

// After
const styles = modifier.padding(16).backgroundColor('#007AFF').borderRadius(8).build();
<View style={styles}>
```

### From StyleSheet.create

```typescript
// Before
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
});

// After
const containerStyle = modifier
  .padding(16)
  .backgroundColor('#007AFF')
  .borderRadius(8)
  .build();
```

### Adding Theme Support

```typescript
// Before (static colors)
.backgroundColor('#007AFF')

// After (theme-aware)
.backgroundColor(modifier.colors.primary)
```

## Next Steps

- Read [THEME.md](./THEME.md) for detailed theme documentation
- Read [TOKENS.md](./TOKENS.md) for design token reference
- Check [theme.example.ts](./theme.example.ts) for complete examples
- Customize color schemes and tokens for your brand

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
A: Yes! Use `injectExternalState()` to connect Zustand, Redux, or any state manager.

**Q: Is this compatible with Expo?**  
A: Yes! It works with any React Native setup.
