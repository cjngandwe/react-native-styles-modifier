import { ThemeMode, ColorScheme, getThemeManager } from "./theme.ts";

// Type for useSyncExternalStore hook
type UseSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
) => T;

// Global reference to useSyncExternalStore - must be initialized
let globalUseSyncExternalStore: UseSyncExternalStore | null = null;

// Augmentable interface for custom color schemes
// Users can extend this via module augmentation
export interface CustomColorScheme extends ColorScheme {}

// Initialize the color scheme system with React's useSyncExternalStore
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

// Consolidated hook that returns everything theme-related
// This is the primary way to access theme in components
export function useModifierTheme(): {
  colors: CustomColorScheme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
} {
  const useSyncExternalStore = getUseSyncExternalStore();
  const themeManager = getThemeManager();

  // Get reactive colors
  const subscribe = (onStoreChange: () => void) => {
    return themeManager.subscribe(() => onStoreChange());
  };

  const getColorSnapshot = () => {
    return themeManager.getColorScheme();
  };

  const getModeSnapshot = () => {
    return themeManager.getThemeMode();
  };

  const colors = useSyncExternalStore(
    subscribe,
    getColorSnapshot,
  ) as CustomColorScheme;
  const mode = useSyncExternalStore(subscribe, getModeSnapshot);

  // Theme control functions
  const toggleTheme = () => {
    themeManager.toggleTheme();
  };

  const setTheme = (newMode: ThemeMode) => {
    themeManager.setTheme(newMode);
  };

  return {
    colors,
    mode,
    toggleTheme,
    setTheme,
  };
}
