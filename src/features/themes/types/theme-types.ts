import type { ThemeName } from "../config/themes-config"

export { type ThemeName, THEMES, DEFAULT_THEME, isValidTheme } from "../config/themes-config"

export type ThemeMode = "light" | "dark"

export interface ThemeConfig {
    name: import("../config/themes-config").ThemeName
    mode: ThemeMode
}

export interface ThemeContextValue {
    theme: ThemeConfig
    setThemeName: (name: ThemeName) => void
    setThemeMode: (mode: ThemeMode) => void
    toggleMode: () => void
}
