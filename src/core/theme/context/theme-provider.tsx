import { createContext, useEffect, useState, type ReactNode } from "react"
import type { ThemeMode, ThemeConfig, ThemeName } from "../types/theme-types"
import { THEMES } from "../config/theme-config"

export interface ThemeContextType {
    theme: ThemeConfig
    setThemeName: (name: ThemeName) => void
    setThemeMode: (mode: ThemeMode) => void
    toggleMode: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_NAME_KEY = "theme-name"
const THEME_MODE_KEY = "theme-mode"

function getDefaultThemeName(): ThemeName {
    // Prioriza localStorage sobre .env para preservar escolha do usuário
    const stored: string | null = localStorage.getItem(THEME_NAME_KEY)
    if (stored && stored in THEMES) {
        return stored as ThemeName
    }

    // Fallback para tema do .env
    const envTheme: string | undefined = import.meta.env.VITE_APP_THEME
    if (envTheme && envTheme in THEMES) {
        return envTheme as ThemeName
    }

    // Fallback para o primeiro tema disponível
    return Object.keys(THEMES)[0] as ThemeName
}

function getDefaultThemeMode(): ThemeMode {
    const stored: string | null = localStorage.getItem(THEME_MODE_KEY)
    if (stored && (stored === "light" || stored === "dark")) {
        return stored as ThemeMode
    }

    return "light"
}

function applyTheme(name: ThemeName, mode: ThemeMode) {
    const root = document.documentElement
    const themeColors = THEMES[name][mode]

    root.classList.remove("light", "dark")
    root.classList.add(mode)

    Object.entries(themeColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value)
    })
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeConfig>({
        name: getDefaultThemeName(),
        mode: getDefaultThemeMode(),
    })

    useEffect(() => {
        applyTheme(theme.name, theme.mode)
        localStorage.setItem(THEME_NAME_KEY, theme.name)
        localStorage.setItem(THEME_MODE_KEY, theme.mode)
    }, [theme])

    const setThemeName = (name: ThemeName) => {
        setTheme((prev) => ({ ...prev, name }))
    }

    const setThemeMode = (mode: ThemeMode) => {
        setTheme((prev) => ({ ...prev, mode }))
    }

    const toggleMode = () => {
        setTheme((prev) => ({
            ...prev,
            mode: prev.mode === "light" ? "dark" : "light",
        }))
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setThemeName,
                setThemeMode,
                toggleMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
