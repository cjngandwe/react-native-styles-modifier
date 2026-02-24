// Core modifier
export type {
  Modifier,
  ViewStyle,
  TextStyle,
  StyleSheetLike,
} from "./modifier.ts";

// Design tokens
export { type DesignTokens, TokenProvider, defaultTokens } from "./tokens.ts";

// Modifier with tokens (legacy, still supported)
export {
  ModifierWithTokens,
  createModifierWithTokens,
} from "./modifier-tokens.ts";

// Theme system
export {
  type ColorScheme,
  type ThemeMode,
  type ThemeManager,
  type ExternalStateManager,
  lightColorScheme,
  darkColorScheme,
  getThemeManager,
  initializeTheme,
  createExternalStateAdapter,
} from "./theme.ts";

// Modifier with theme support (recommended)
export { ModifierWithTheme, createModifier } from "./modifier-theme.ts";

// Color scheme hooks (for reactive theme access)
export {
  initializeColorScheme,
  useColorScheme,
  useThemeMode,
  useThemeToggle,
  useSetTheme,
} from "./useColorScheme.ts";

// External state management
export {
  type UseExternalState,
  createExternalState,
  useExternalState,
} from "./useExternalState.ts";
