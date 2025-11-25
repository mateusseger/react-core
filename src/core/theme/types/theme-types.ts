export type ThemeColor = "herval" | "taqi" | "iplace"
export type ThemeMode = "light" | "dark"

export interface ThemeConfig {
    color: ThemeColor
    mode: ThemeMode
}

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
