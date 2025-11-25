/**
 * Theme System
 * Sistema de temas com suporte a herval, taqi, iplace
 */

export { ThemeProvider } from "./context/theme-provider"
export { useTheme } from "./hooks/use-theme"
export { THEMES, getTheme, type ThemeName } from "./config/theme-config"
export type { Theme, ThemeColors } from "./types/theme-types"
