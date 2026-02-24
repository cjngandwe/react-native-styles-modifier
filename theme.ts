// Theme color scheme inspired by Jetpack Compose
export interface ColorScheme {
  // Primary colors
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  // Secondary colors
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  // Tertiary colors
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error colors
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Background colors
  background: string;
  onBackground: string;

  // Surface colors
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;

  // Outline
  outline: string;
  outlineVariant: string;

  // Other
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
}

// Default light color scheme
export const lightColorScheme: ColorScheme = {
  primary: "#6750A4",
  onPrimary: "#FFFFFF",
  primaryContainer: "#EADDFF",
  onPrimaryContainer: "#21005D",

  secondary: "#625B71",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#E8DEF8",
  onSecondaryContainer: "#1D192B",

  tertiary: "#7D5260",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#FFD8E4",
  onTertiaryContainer: "#31111D",

  error: "#B3261E",
  onError: "#FFFFFF",
  errorContainer: "#F9DEDC",
  onErrorContainer: "#410E0B",

  background: "#FFFBFE",
  onBackground: "#1C1B1F",

  surface: "#FFFBFE",
  onSurface: "#1C1B1F",
  surfaceVariant: "#E7E0EC",
  onSurfaceVariant: "#49454F",

  outline: "#79747E",
  outlineVariant: "#CAC4D0",

  inverseSurface: "#313033",
  inverseOnSurface: "#F4EFF4",
  inversePrimary: "#D0BCFF",
  shadow: "#000000",
  scrim: "#000000",
};

// Default dark color scheme
export const darkColorScheme: ColorScheme = {
  primary: "#D0BCFF",
  onPrimary: "#381E72",
  primaryContainer: "#4F378B",
  onPrimaryContainer: "#EADDFF",

  secondary: "#CCC2DC",
  onSecondary: "#332D41",
  secondaryContainer: "#4A4458",
  onSecondaryContainer: "#E8DEF8",

  tertiary: "#EFB8C8",
  onTertiary: "#492532",
  tertiaryContainer: "#633B48",
  onTertiaryContainer: "#FFD8E4",

  error: "#F2B8B5",
  onError: "#601410",
  errorContainer: "#8C1D18",
  onErrorContainer: "#F9DEDC",

  background: "#1C1B1F",
  onBackground: "#E6E1E5",

  surface: "#1C1B1F",
  onSurface: "#E6E1E5",
  surfaceVariant: "#49454F",
  onSurfaceVariant: "#CAC4D0",

  outline: "#938F99",
  outlineVariant: "#49454F",

  inverseSurface: "#E6E1E5",
  inverseOnSurface: "#313033",
  inversePrimary: "#6750A4",
  shadow: "#000000",
  scrim: "#000000",
};

// Theme mode type
export type ThemeMode = "light" | "dark";

// Listener type for theme changes
type ThemeChangeListener<T extends ColorScheme = ColorScheme> = (
  colorScheme: T,
  mode: ThemeMode,
) => void;

// External state manager interface
export interface ExternalStateManager<T> {
  getState: () => T;
  setState: (value: T) => void;
  subscribe: (listener: (value: T) => void) => () => void;
}

// Theme manager class with generic color scheme support
export class ThemeManager<T extends ColorScheme = ColorScheme> {
  private currentMode: ThemeMode = "light";
  private lightScheme: T;
  private darkScheme: T;
  private listeners: Set<ThemeChangeListener<T>> = new Set();
  private externalStateManager?: ExternalStateManager<ThemeMode>;
  private unsubscribeExternal?: () => void;

  constructor(
    initialMode: ThemeMode = "light",
    customLightColors?: Partial<T>,
    customDarkColors?: Partial<T>,
  ) {
    this.currentMode = initialMode;
    // Merge custom colors with defaults
    this.lightScheme = { ...lightColorScheme, ...customLightColors } as T;
    this.darkScheme = { ...darkColorScheme, ...customDarkColors } as T;
  }

  // Inject external state manager (e.g., from useExternalState or any state management)
  injectExternalState(stateManager: ExternalStateManager<ThemeMode>) {
    // Unsubscribe from previous external state if exists
    if (this.unsubscribeExternal) {
      this.unsubscribeExternal();
    }

    this.externalStateManager = stateManager;

    // Sync initial state
    this.currentMode = stateManager.getState();

    // Subscribe to external state changes
    this.unsubscribeExternal = stateManager.subscribe((newMode) => {
      this.currentMode = newMode;
      this.notifyListeners();
    });
  }

  // Toggle between light and dark mode
  toggleTheme() {
    const newMode: ThemeMode = this.currentMode === "light" ? "dark" : "light";
    this.setTheme(newMode);
  }

  // Set specific theme mode
  setTheme(mode: ThemeMode) {
    this.currentMode = mode;

    // Update external state if connected
    if (this.externalStateManager) {
      this.externalStateManager.setState(mode);
    } else {
      // If no external state, notify listeners directly
      this.notifyListeners();
    }
  }

  // Get current theme mode
  getThemeMode(): ThemeMode {
    return this.currentMode;
  }

  // Get current color scheme
  getColorScheme(): T {
    return this.currentMode === "light" ? this.lightScheme : this.darkScheme;
  }

  // Get specific color from current scheme
  getColor(key: keyof T): string {
    return this.getColorScheme()[key] as string;
  }

  // Subscribe to theme changes
  subscribe(listener: ThemeChangeListener<T>): () => void {
    this.listeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify all listeners of theme change
  private notifyListeners() {
    const colorScheme = this.getColorScheme();
    this.listeners.forEach((listener) => {
      listener(colorScheme, this.currentMode);
    });
  }

  // Update color schemes
  updateColorSchemes(newLightScheme?: Partial<T>, newDarkScheme?: Partial<T>) {
    if (newLightScheme) {
      this.lightScheme = { ...this.lightScheme, ...newLightScheme };
    }

    if (newDarkScheme) {
      this.darkScheme = { ...this.darkScheme, ...newDarkScheme };
    }

    this.notifyListeners();
  }

  // Cleanup
  dispose() {
    if (this.unsubscribeExternal) {
      this.unsubscribeExternal();
    }
    this.listeners.clear();
  }
}

// Global theme manager instance
let globalThemeManager: ThemeManager<any> | null = null;

// Get or create global theme manager
export function getThemeManager<
  T extends ColorScheme = ColorScheme,
>(): ThemeManager<T> {
  if (!globalThemeManager) {
    globalThemeManager = new ThemeManager<T>();
  }
  return globalThemeManager as ThemeManager<T>;
}

// Initialize theme manager with custom configuration
// Only pass your custom colors - defaults are handled automatically
export function initializeTheme<T extends ColorScheme = ColorScheme>(
  initialMode: ThemeMode = "light",
  customLightColors?: Partial<T>,
  customDarkColors?: Partial<T>,
): ThemeManager<T> {
  globalThemeManager = new ThemeManager<T>(
    initialMode,
    customLightColors,
    customDarkColors,
  );
  return globalThemeManager;
}

// Helper to create external state manager adapter
export function createExternalStateAdapter<T>(
  getState: () => T,
  setState: (value: T) => void,
  subscribe: (listener: (value: T) => void) => () => void,
): ExternalStateManager<T> {
  return {
    getState,
    setState,
    subscribe,
  };
}
