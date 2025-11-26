/**
 * Theme System
 * Sistema de temas com suporte a herval, taqi, iplace
 */

export { ThemeProvider } from "./context/theme-provider"
export { useTheme } from "./hooks/use-theme"
export { THEMES } from "./config/theme-config"
export type { Theme, ThemeColors, ThemeConfig, ThemeMode, ThemeName } from "./types/theme-types"
// Routes
export { themeRoutes } from "./routes"
