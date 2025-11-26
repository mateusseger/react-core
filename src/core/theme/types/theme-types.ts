export type ThemeName = "herval" | "taqi" | "iplace"
export type ThemeMode = "light" | "dark"

export interface ThemeConfig {
    name: ThemeName
    mode: ThemeMode
}

/**
 * ThemeColors - Apenas cores específicas de cada tema
 * 
 * Cores neutras (background, foreground, secondary, muted, accent, destructive, borders)
 * são definidas no global.css e aplicadas via CSS variables.
 * 
 * Este tipo define apenas as cores que mudam entre temas:
 * - primary/primary-foreground: Cor da marca
 * - ring: Cor de foco
 * - sidebar-primary/sidebar-primary-foreground/sidebar-ring: Aplicação na sidebar
 */
export interface ThemeColors {
    primary: string
    "primary-foreground": string
    secondary: string
    "secondary-foreground": string
    accent: string
    "accent-foreground": string
    muted: string
    "muted-foreground": string
    destructive: string
    "destructive-foreground": string
    border: string
    input: string
    ring: string
    background: string
    foreground: string
    card: string
    "card-foreground": string
    popover: string
    "popover-foreground": string
    sidebar: string
    "sidebar-foreground": string
    "sidebar-primary": string
    "sidebar-primary-foreground": string
    "sidebar-accent": string
    "sidebar-accent-foreground": string
    "sidebar-border": string
    "sidebar-ring": string
}

export interface Theme {
    light: ThemeColors
    dark: ThemeColors
}
