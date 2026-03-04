// Core modifier
export type {
  Modifier,
  ViewStyle,
  TextStyle,
  StyleSheetLike,
  createModifier,
} from "./modifier.ts";

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

// Color scheme hooks (for reactive theme access)
export { initializeColorScheme, useModifierTheme } from "./useColorScheme.ts";
