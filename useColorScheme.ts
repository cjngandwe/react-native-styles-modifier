import { ThemeMode, ColorScheme, getThemeManager } from "./theme.ts";

// Type for useSyncExternalStore hook
type UseSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
) => T;

// Global reference to useSyncExternalStore - must be initialized
let globalUseSyncExternalStore: UseSyncExternalStore | null = null;

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
      "Color scheme hooks not initialized. Call initializeColorScheme(useSyncExternalStore) before using theme hooks.",
    );
  }
  return globalUseSyncExternalStore;
}

// Hook to get reactive color scheme
export function useColorScheme(): ColorScheme {
  const useSyncExternalStore = getUseSyncExternalStore();
  const themeManager = getThemeManager();

  const subscribe = (onStoreChange: () => void) => {
    return themeManager.subscribe(() => onStoreChange());
  };

  const getSnapshot = () => {
    return themeManager.getColorScheme();
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}

// Hook to get theme mode
export function useThemeMode(): ThemeMode {
  const useSyncExternalStore = getUseSyncExternalStore();
  const themeManager = getThemeManager();

  const subscribe = (onStoreChange: () => void) => {
    return themeManager.subscribe(() => onStoreChange());
  };

  const getSnapshot = () => {
    return themeManager.getThemeMode();
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}

// Hook to get theme toggle function
export function useThemeToggle(): () => void {
  const themeManager = getThemeManager();
  return () => themeManager.toggleTheme();
}

// Hook to get theme setter function
export function useSetTheme(): (mode: ThemeMode) => void {
  const themeManager = getThemeManager();
  return (mode: ThemeMode) => themeManager.setTheme(mode);
}
