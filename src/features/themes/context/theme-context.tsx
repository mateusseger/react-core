import { createContext, useEffect, useState, type ReactNode } from "react"
import type { ThemeMode, ThemeConfig, ThemeName, ThemeContextValue } from "../types/theme-types"
import { isValidTheme, DEFAULT_THEME } from "../config/themes-config"

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_NAME_KEY = "theme-name"
const THEME_MODE_KEY = "theme-mode"

function getDefaultThemeName(): ThemeName {
    const stored = localStorage.getItem(THEME_NAME_KEY)
    if (isValidTheme(stored)) {
        return stored
    }

    const envTheme = import.meta.env.VITE_APP_THEME
    if (isValidTheme(envTheme)) {
        return envTheme
    }

    return DEFAULT_THEME
}

function getDefaultThemeMode(): ThemeMode {
    const stored = localStorage.getItem(THEME_MODE_KEY)
    if (stored === "light" || stored === "dark") {
        return stored as ThemeMode
    }
    return "light"
}

function applyTheme(name: ThemeName, mode: ThemeMode) {
    const root = document.documentElement

    root.classList.remove("light", "dark")
    root.removeAttribute("data-theme")

    root.classList.add(mode)
    root.setAttribute("data-theme", name)
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
