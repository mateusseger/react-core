import { createContext, useEffect, useState, type ReactNode } from "react"
import type { ThemeColor, ThemeMode, ThemeConfig } from "../types/theme-types"
import { THEMES } from "../config/theme-config"

interface ThemeContextType {
    theme: ThemeConfig
    setThemeColor: (color: ThemeColor) => void
    setThemeMode: (mode: ThemeMode) => void
    toggleMode: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_COLOR_KEY = "theme-color"
const THEME_MODE_KEY = "theme-mode"

function getDefaultThemeColor(): ThemeColor {
    // Prioriza localStorage sobre .env para preservar escolha do usuário
    const stored = localStorage.getItem(THEME_COLOR_KEY)
    if (stored && (stored === "herval" || stored === "taqi" || stored === "iplace")) {
        return stored as ThemeColor
    }

    // Fallback para tema do .env
    const envTheme = import.meta.env.VITE_APP_THEME as ThemeColor | undefined
    if (envTheme && (envTheme === "herval" || envTheme === "taqi" || envTheme === "iplace")) {
        return envTheme
    }

    return "herval"
}

function getDefaultThemeMode(): ThemeMode {
    const stored = localStorage.getItem(THEME_MODE_KEY)
    if (stored && (stored === "light" || stored === "dark")) {
        return stored as ThemeMode
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
    }

    return "light"
}

function applyTheme(color: ThemeColor, mode: ThemeMode) {
    const root = document.documentElement
    const themeColors = THEMES[color][mode]

    root.classList.remove("light", "dark")
    root.classList.add(mode)

    Object.entries(themeColors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value)
    })
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeConfig>({
        color: getDefaultThemeColor(),
        mode: getDefaultThemeMode(),
    })

    useEffect(() => {
        applyTheme(theme.color, theme.mode)
        localStorage.setItem(THEME_COLOR_KEY, theme.color)
        localStorage.setItem(THEME_MODE_KEY, theme.mode)
    }, [theme])

    const setThemeColor = (color: ThemeColor) => {
        setTheme((prev) => ({ ...prev, color }))
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
                setThemeColor,
                setThemeMode,
                toggleMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
