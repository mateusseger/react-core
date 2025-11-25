import type { Theme } from "../types/theme-types"

export type ThemeName = "herval" | "taqi" | "iplace"

/**
 * Estrutura de Temas Corporativos
 * 
 * Cada tema segue a mesma estrutura de cores, diferenciando-se APENAS por:
 * - Primary: Cor principal da marca (Herval: vermelho, Taqi: laranja, iPlace: verde-limão)
 * - Ring: Cor de foco/destaque (geralmente igual ao primary)
 * 
 * Cores compartilhadas entre todos os temas:
 * - Base: background, foreground, card, popover (neutros clean)
 * - Secondary/Muted/Accent: Cinzas e tons sutis padronizados
 * - Destructive: Vermelho de erro padrão (#ef4444 light, #dc2626 dark)
 * - Borders/Inputs: Cinzas discretos
 * - Sidebar: Variações das cores base com primary aplicado
 * 
 * Esta consistência garante que ao trocar de tema, apenas elementos com cor
 * primária mudam, mantendo toda interface visual idêntica.
 */
export const THEMES: Record<ThemeName, Theme> = {
    herval: {
        light: {
            background: "#ffffff",
            foreground: "#0a0a0a",
            card: "#ffffff",
            "card-foreground": "#0a0a0a",
            popover: "#ffffff",
            "popover-foreground": "#0a0a0a",
            primary: "#e10000",
            "primary-foreground": "#ffffff",
            secondary: "#f5f5f5",
            "secondary-foreground": "#0a0a0a",
            muted: "#fafafa",
            "muted-foreground": "#737373",
            accent: "#fafafa",
            "accent-foreground": "#0a0a0a",
            destructive: "#ef4444",
            "destructive-foreground": "#ffffff",
            border: "#e5e5e5",
            input: "#e5e5e5",
            ring: "#e10000",
            sidebar: "#ffffff",
            "sidebar-foreground": "#0a0a0a",
            "sidebar-primary": "#e10000",
            "sidebar-primary-foreground": "#ffffff",
            "sidebar-accent": "#f5f5f5",
            "sidebar-accent-foreground": "#0a0a0a",
            "sidebar-border": "#e5e5e5",
            "sidebar-ring": "#e10000",
        },
        dark: {
            background: "#0a0a0a",
            foreground: "#fafafa",
            card: "#121212",
            "card-foreground": "#fafafa",
            popover: "#121212",
            "popover-foreground": "#fafafa",
            primary: "#e10000",
            "primary-foreground": "#ffffff",
            secondary: "#1a1a1a",
            "secondary-foreground": "#fafafa",
            muted: "#171717",
            "muted-foreground": "#a3a3a3",
            accent: "#1a1a1a",
            "accent-foreground": "#fafafa",
            destructive: "#dc2626",
            "destructive-foreground": "#fafafa",
            border: "#262626",
            input: "#262626",
            ring: "#e10000",
            sidebar: "#121212",
            "sidebar-foreground": "#fafafa",
            "sidebar-primary": "#e10000",
            "sidebar-primary-foreground": "#ffffff",
            "sidebar-accent": "#1a1a1a",
            "sidebar-accent-foreground": "#fafafa",
            "sidebar-border": "#262626",
            "sidebar-ring": "#e10000",
        },
    },
    taqi: {
        light: {
            background: "#ffffff",
            foreground: "#0a0a0a",
            card: "#ffffff",
            "card-foreground": "#0a0a0a",
            popover: "#ffffff",
            "popover-foreground": "#0a0a0a",
            primary: "#eb5c2e",
            "primary-foreground": "#ffffff",
            secondary: "#f5f5f5",
            "secondary-foreground": "#0a0a0a",
            muted: "#fafafa",
            "muted-foreground": "#737373",
            accent: "#fafafa",
            "accent-foreground": "#0a0a0a",
            destructive: "#ef4444",
            "destructive-foreground": "#ffffff",
            border: "#e5e5e5",
            input: "#e5e5e5",
            ring: "#eb5c2e",
            sidebar: "#ffffff",
            "sidebar-foreground": "#0a0a0a",
            "sidebar-primary": "#eb5c2e",
            "sidebar-primary-foreground": "#ffffff",
            "sidebar-accent": "#f5f5f5",
            "sidebar-accent-foreground": "#0a0a0a",
            "sidebar-border": "#e5e5e5",
            "sidebar-ring": "#eb5c2e",
        },
        dark: {
            background: "#0a0a0a",
            foreground: "#fafafa",
            card: "#121212",
            "card-foreground": "#fafafa",
            popover: "#121212",
            "popover-foreground": "#fafafa",
            primary: "#eb5c2e",
            "primary-foreground": "#ffffff",
            secondary: "#1a1a1a",
            "secondary-foreground": "#fafafa",
            muted: "#171717",
            "muted-foreground": "#a3a3a3",
            accent: "#1a1a1a",
            "accent-foreground": "#fafafa",
            destructive: "#dc2626",
            "destructive-foreground": "#fafafa",
            border: "#262626",
            input: "#262626",
            ring: "#eb5c2e",
            sidebar: "#121212",
            "sidebar-foreground": "#fafafa",
            "sidebar-primary": "#eb5c2e",
            "sidebar-primary-foreground": "#ffffff",
            "sidebar-accent": "#1a1a1a",
            "sidebar-accent-foreground": "#fafafa",
            "sidebar-border": "#262626",
            "sidebar-ring": "#eb5c2e",
        },
    },
    iplace: {
        light: {
            background: "#ffffff",
            foreground: "#0a0a0a",
            card: "#ffffff",
            "card-foreground": "#0a0a0a",
            popover: "#ffffff",
            "popover-foreground": "#0a0a0a",
            primary: "#c6d30d",
            "primary-foreground": "#0a0a0a",
            secondary: "#f5f5f5",
            "secondary-foreground": "#0a0a0a",
            muted: "#fafafa",
            "muted-foreground": "#737373",
            accent: "#fafafa",
            "accent-foreground": "#0a0a0a",
            destructive: "#ef4444",
            "destructive-foreground": "#ffffff",
            border: "#e5e5e5",
            input: "#e5e5e5",
            ring: "#c6d30d",
            sidebar: "#ffffff",
            "sidebar-foreground": "#0a0a0a",
            "sidebar-primary": "#c6d30d",
            "sidebar-primary-foreground": "#0a0a0a",
            "sidebar-accent": "#f5f5f5",
            "sidebar-accent-foreground": "#0a0a0a",
            "sidebar-border": "#e5e5e5",
            "sidebar-ring": "#c6d30d",
        },
        dark: {
            background: "#0a0a0a",
            foreground: "#fafafa",
            card: "#121212",
            "card-foreground": "#fafafa",
            popover: "#121212",
            "popover-foreground": "#fafafa",
            primary: "#c6d30d",
            "primary-foreground": "#0a0a0a",
            secondary: "#1a1a1a",
            "secondary-foreground": "#fafafa",
            muted: "#171717",
            "muted-foreground": "#a3a3a3",
            accent: "#1a1a1a",
            "accent-foreground": "#fafafa",
            destructive: "#dc2626",
            "destructive-foreground": "#fafafa",
            border: "#262626",
            input: "#262626",
            ring: "#c6d30d",
            sidebar: "#121212",
            "sidebar-foreground": "#fafafa",
            "sidebar-primary": "#c6d30d",
            "sidebar-primary-foreground": "#0a0a0a",
            "sidebar-accent": "#1a1a1a",
            "sidebar-accent-foreground": "#fafafa",
            "sidebar-border": "#262626",
            "sidebar-ring": "#c6d30d",
        },
    },
}

export const THEME_METADATA: Record<ThemeName, {
    name: string
    description: string
    characteristics: string[]
}> = {
    herval: {
        name: "Herval",
        description: "Clean e minimalista com destaque corporativo",
        characteristics: ["Minimalista", "Corporativo", "Elegante"],
    },
    taqi: {
        name: "Taqi",
        description: "Neutro e moderno com toque energético",
        characteristics: ["Clean", "Moderno", "Sofisticado"],
    },
    iplace: {
        name: "iPlace",
        description: "Design tech com contraste vibrante",
        characteristics: ["Tech", "Vibrante", "Contemporâneo"],
    },
}


export function getTheme(name: ThemeName): Theme {
    return THEMES[name]
}

export function getThemePrimaryColor(name: ThemeName): string {
    return THEMES[name].light.primary
}
