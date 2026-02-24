import { ThemeMode, ColorScheme, getThemeManager } from "./theme.ts";

// Type for useSyncExternalStore hook
type UseSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
) => T;

// Hook to get reactive color scheme
export function useColorScheme(
  useSyncExternalStore: UseSyncExternalStore,
): ColorScheme {
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
export function useThemeMode(
  useSyncExternalStore: UseSyncExternalStore,
): ThemeMode {
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
