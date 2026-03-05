import { ThemeMode, ColorScheme, getThemeManager } from "./theme.ts";

// Type for useSyncExternalStore hook
type UseSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
) => T;

// Global reference to useSyncExternalStore - must be initialized
let globalUseSyncExternalStore: UseSyncExternalStore | null = null;

/**
 * Augmentable interface for custom color schemes.
 * Users can extend this via module augmentation to add custom color properties.
 * @example
 * ```ts
 * declare module '@rnative-modifier/react-native-modifier-build' {
 *   interface CustomColorScheme {
 *     customColor: string;
 *   }
 * }
 * ```
 */
export interface CustomColorScheme extends ColorScheme {}

/**
 * Initializes the color scheme system with React's useSyncExternalStore.
 * Must be called before using useModifierTheme hook.
 * @param useSyncExternalStore - React's useSyncExternalStore hook
 * @example
 * ```ts
 * import { useSyncExternalStore } from 'react';
 * import { initializeColorScheme } from '@rnative-modifier/react-native-modifier-build';
 *
 * initializeColorScheme(useSyncExternalStore);
 * ```
 */
export function initializeColorScheme(
  useSyncExternalStore: UseSyncExternalStore,
): void {
  globalUseSyncExternalStore = useSyncExternalStore;
}

// Internal helper to get useSyncExternalStore with error handling
function getUseSyncExternalStore(): UseSyncExternalStore {
  if (!globalUseSyncExternalStore) {
    throw new Error(
      "Color scheme hooks not initialized. Call initializeColorScheme(useSyncExternalStore, colorSchemeType) before using theme hooks.",
    );
  }
  return globalUseSyncExternalStore;
}

// Stable references hoisted out of the hook to avoid re-subscriptions
const _subscribe = (onStoreChange: () => void): (() => void) => {
  return getThemeManager().subscribe(() => onStoreChange());
};
const _getColorSnapshot = (): CustomColorScheme => {
  return getThemeManager().getColorScheme() as CustomColorScheme;
};
const _getModeSnapshot = (): ThemeMode => {
  return getThemeManager().getThemeMode();
};
const _toggleTheme = (): void => {
  getThemeManager().toggleTheme();
};
const _setTheme = (mode: ThemeMode): void => {
  getThemeManager().setTheme(mode);
};

/**
 * React hook that provides access to the current theme colors, mode, and theme controls.
 * This is the primary way to access theme in React components.
 * @returns Object containing colors, mode, toggleTheme, and setTheme
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { colors, mode, toggleTheme } = useModifierTheme();
 *
 *   return (
 *     <View style={{ backgroundColor: colors.background }}>
 *       <Text style={{ color: colors.onBackground }}>
 *         Current mode: {mode}
 *       </Text>
 *       <Button onPress={toggleTheme} title="Toggle Theme" />
 *     </View>
 *   );
 * }
 * ```
 */
export function useModifierTheme(): {
  colors: CustomColorScheme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
} {
  const useSyncExternalStore = getUseSyncExternalStore();

  const colors = useSyncExternalStore(_subscribe, _getColorSnapshot);
  const mode = useSyncExternalStore(_subscribe, _getModeSnapshot);

  return {
    colors,
    mode,
    toggleTheme: _toggleTheme,
    setTheme: _setTheme,
  };
}
