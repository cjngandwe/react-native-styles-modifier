# Theme System Documentation

A Jetpack Compose-inspired theme system for React Native with light/dark mode support, built with pure TypeScript/JavaScript and zero performance overhead.

## Features

- 🎨 **Jetpack Compose-inspired API** - Familiar color scheme structure
- 🌓 **Light/Dark Mode** - Built-in theme switching
- 🔌 **External State Integration** - Connect with any state management solution
- ⚡ **Zero Dependencies** - No external libraries required
- 🎯 **Type-Safe** - Full TypeScript support
- 🚀 **Performance-First** - Only mounted components re-render on theme change

## Quick Start

### 1. Basic Setup

```typescript
import { initializeTheme, getThemeManager } from './theme';
import { createModifier } from './modifier-theme';
import { StyleSheet } from 'react-native';

// Initialize theme (optional - uses defaults if not called)
const themeManager = initializeTheme('light');

// Create modifier instance
const modifier = createModifier(StyleSheet);

// Use theme colors - Jetpack Compose style!
const styles = modifier
  .backgroundColor(modifier.colors.primary)
  .padding(16)
  .build();
```

### 2. Toggle Theme

```typescript
import { getThemeManager } from './theme';

// Toggle between light and dark
const themeManager = getThemeManager();
themeManager.toggleTheme();

// Or set specific theme
themeManager.setTheme('dark');
```

## Integration with State Management

### Option 1: Using Built-in External State (Recommended)

```typescript
import { createExternalState, useExternalState } from './useExternalState';
import { initializeTheme, createExternalStateAdapter } from './theme';
import { ThemeMode } from './theme';

// Create external state store
const themeStore = createExternalState<ThemeMode>('light');

// Initialize theme and connect to external state
const themeManager = initializeTheme('light');
themeManager.injectExternalState(
  createExternalStateAdapter(
    themeStore.getState,
    themeStore.setState,
    themeStore.subscribe
  )
);

// In your React component
function ThemeToggleButton() {
  const [theme, setTheme] = useExternalState(themeStore);
  
  return (
    <Button 
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  );
}
```

### Option 2: Using Zustand

```typescript
import create from 'zustand';
import { initializeTheme, createExternalStateAdapter } from './theme';
import { ThemeMode } from './theme';

// Create Zustand store
const useThemeStore = create<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));

// Connect to theme manager
const themeManager = initializeTheme('light');
themeManager.injectExternalState(
  createExternalStateAdapter(
    () => useThemeStore.getState().theme,
    (theme) => useThemeStore.getState().setTheme(theme),
    (listener) => useThemeStore.subscribe((state) => listener(state.theme))
  )
);
```

### Option 3: Using React Context (No External Library)

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getThemeManager, ThemeMode } from './theme';

const ThemeContext = createContext<{
  theme: ThemeMode;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const themeManager = getThemeManager();

  useEffect(() => {
    // Subscribe to theme changes
    const unsubscribe = themeManager.subscribe((_, mode) => {
      setTheme(mode);
    });
    return unsubscribe;
  }, []);

  const toggleTheme = () => {
    themeManager.toggleTheme();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

## Using Theme Colors in Components

### Basic Usage

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createModifier } from './modifier-theme';

function MyComponent() {
  const [, forceUpdate] = useState({});
  const modifier = createModifier(StyleSheet);

  useEffect(() => {
    // Subscribe to theme changes - component will re-render
    const unsubscribe = modifier.subscribeToTheme(() => {
      forceUpdate({});
    });
    return () => unsubscribe();
  }, []);

  // Access theme colors - Jetpack Compose style!
  const containerStyle = modifier
    .backgroundColor(modifier.colors.surface)
    .padding(16)
    .borderRadius(8)
    .build();

  const textStyle = modifier
    .backgroundColor(modifier.colors.primary)
    .paddingToken('md')
    .borderRadiusToken('md')
    .build();

  return (
    <View style={containerStyle}>
      <Text style={{ color: modifier.colors.onSurface }}>
        Hello, themed world!
      </Text>
    </View>
  );
}
```

### Advanced: Custom Hook for Theme-Aware Styles

```typescript
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createModifier } from './modifier-theme';

export function useThemedModifier() {
  const [, forceUpdate] = useState({});
  const modifier = createModifier(StyleSheet);

  useEffect(() => {
    const unsubscribe = modifier.subscribeToTheme(() => {
      forceUpdate({});
    });
    return () => unsubscribe();
  }, []);

  return modifier;
}

// Usage in component
function MyComponent() {
  const modifier = useThemedModifier();

  const styles = modifier
    .backgroundColor(modifier.colors.primaryContainer)
    .padding(20)
    .build();

  return <View style={styles}>...</View>;
}
```

## Color Scheme Reference

### Available Colors (Jetpack Compose Material 3)

```typescript
modifier.colors.primary              // Primary brand color
modifier.colors.onPrimary            // Text/icons on primary
modifier.colors.primaryContainer     // Containers using primary
modifier.colors.onPrimaryContainer   // Text/icons on primary container

modifier.colors.secondary            // Secondary brand color
modifier.colors.onSecondary          // Text/icons on secondary
modifier.colors.secondaryContainer   // Containers using secondary
modifier.colors.onSecondaryContainer // Text/icons on secondary container

modifier.colors.tertiary             // Tertiary brand color
modifier.colors.onTertiary           // Text/icons on tertiary
modifier.colors.tertiaryContainer    // Containers using tertiary
modifier.colors.onTertiaryContainer  // Text/icons on tertiary container

modifier.colors.error                // Error state color
modifier.colors.onError              // Text/icons on error
modifier.colors.errorContainer       // Error containers
modifier.colors.onErrorContainer     // Text/icons on error container

modifier.colors.background           // App background
modifier.colors.onBackground         // Text/icons on background

modifier.colors.surface              // Surface color (cards, sheets)
modifier.colors.onSurface            // Text/icons on surface
modifier.colors.surfaceVariant       // Variant surface color
modifier.colors.onSurfaceVariant     // Text/icons on surface variant

modifier.colors.outline              // Border/outline color
modifier.colors.outlineVariant       // Variant outline color

modifier.colors.inverseSurface       // Inverse surface (e.g., tooltips)
modifier.colors.inverseOnSurface     // Text on inverse surface
modifier.colors.inversePrimary       // Primary in inverse theme

modifier.colors.shadow               // Shadow color
modifier.colors.scrim                // Scrim/overlay color
```

## Custom Color Schemes

```typescript
import { initializeTheme } from './theme';

const customLight = {
  primary: '#FF6B6B',
  onPrimary: '#FFFFFF',
  primaryContainer: '#FFE5E5',
  // ... other colors
};

const customDark = {
  primary: '#FF8787',
  onPrimary: '#000000',
  primaryContainer: '#4A1F1F',
  // ... other colors
};

const themeManager = initializeTheme('light', customLight, customDark);
```

## Examples

### Complete Example: Card Component

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createModifier } from './modifier-theme';

function ThemedCard({ title, description, onPress }) {
  const [, forceUpdate] = useState({});
  const modifier = createModifier(StyleSheet);

  useEffect(() => {
    const unsubscribe = modifier.subscribeToTheme(() => forceUpdate({}));
    return () => unsubscribe();
  }, []);

  const cardStyle = modifier
    .backgroundColor(modifier.colors.surface)
    .paddingToken('lg')
    .borderRadiusToken('md')
    .shadowToken('md')
    .build();

  const titleStyle = modifier
    .backgroundColor('transparent')
    .marginBottomToken('sm')
    .build();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={cardStyle}>
        <Text style={[titleStyle, { color: modifier.colors.onSurface, fontSize: 18, fontWeight: 'bold' }]}>
          {title}
        </Text>
        <Text style={{ color: modifier.colors.onSurfaceVariant }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
```

### Complete Example: Theme Toggle Button

```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getThemeManager } from './theme';
import { useThemedModifier } from './hooks'; // Custom hook from above

function ThemeToggleButton() {
  const modifier = useThemedModifier();
  const themeManager = getThemeManager();

  const buttonStyle = modifier
    .backgroundColor(modifier.colors.primary)
    .paddingHorizontalToken('lg')
    .paddingVerticalToken('md')
    .borderRadiusToken('full')
    .build();

  return (
    <TouchableOpacity 
      style={buttonStyle}
      onPress={() => themeManager.toggleTheme()}
    >
      <Text style={{ color: modifier.colors.onPrimary, fontWeight: '600' }}>
        Toggle Theme
      </Text>
    </TouchableOpacity>
  );
}
```

## Performance Considerations

- **Only mounted components update**: Components subscribe individually, so only active components re-render on theme change
- **No global re-renders**: Unlike Context-based solutions, this doesn't cause full tree re-renders
- **Efficient subscriptions**: Automatic cleanup on component unmount prevents memory leaks
- **Zero runtime overhead**: No proxies, no middleware, just direct function calls

## Best Practices

1. **Use the custom hook pattern** for cleaner component code
2. **Subscribe in useEffect** to ensure proper cleanup
3. **Leverage design tokens** for spacing, shadows, and other non-color values
4. **Use semantic color names** (e.g., `surface`, `primary`) instead of hardcoded colors
5. **Initialize theme early** in your app's entry point

## Migration from modifier-tokens.ts

If you're currently using `ModifierWithTokens`, you can easily migrate:

```typescript
// Old
import { createModifierWithTokens } from './modifier-tokens';
const modifier = createModifierWithTokens(StyleSheet);

// New (with theme support)
import { createModifier } from './modifier-theme';
const modifier = createModifier(StyleSheet);

// All token methods still work!
modifier.paddingToken('md').backgroundColorToken('primary');

// Plus new theme colors!
modifier.backgroundColor(modifier.colors.primary);
```

## API Reference

### ThemeManager Methods

- `toggleTheme()` - Toggle between light and dark
- `setTheme(mode: 'light' | 'dark')` - Set specific theme
- `getThemeMode()` - Get current theme mode
- `getColorScheme()` - Get current color scheme object
- `getColor(key)` - Get specific color from current scheme
- `subscribe(listener)` - Subscribe to theme changes
- `injectExternalState(stateManager)` - Connect external state
- `updateColorSchemes(light?, dark?)` - Update color schemes
- `dispose()` - Cleanup all subscriptions

### ModifierWithTheme Methods

All methods from `Modifier` and `ModifierWithTokens`, plus:

- `colors` - Access current theme color scheme
- `subscribeToTheme(callback)` - Subscribe to theme changes
- `unsubscribeFromTheme()` - Unsubscribe from theme changes
- `getThemeManager()` - Get theme manager instance
