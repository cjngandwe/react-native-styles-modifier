// Core modifier
export { Modifier, createModifier } from "./modifier.ts";
export type {
  ViewStyle,
  TextStyle,
  StyleSheetLike,
  ModifierStyle,
} from "./modifier.ts";

// Theme system types
export type {
  ColorScheme,
  ThemeMode,
  ThemeManager,
  ExternalStateManager,
} from "./theme.ts";

export {
  lightColorScheme,
  darkColorScheme,
  getThemeManager,
  initializeTheme,
  createExternalStateAdapter,
} from "./theme.ts";

export { initializeColorScheme, useModifierTheme } from "./useColorScheme.ts";
