export const THEMES = [
    { id: "herval", name: "Herval", primary: "#e10000" },
    { id: "taqi", name: "Taqi", primary: "#eb5c2e" },
    { id: "iplace", name: "iPlace", primary: "#c6d30d" },
] as const

export type ThemeName = (typeof THEMES)[number]["id"]

export const DEFAULT_THEME: ThemeName = "herval"

export function isValidTheme(value: unknown): value is ThemeName {
    return THEMES.some((t) => t.id === value)
}
