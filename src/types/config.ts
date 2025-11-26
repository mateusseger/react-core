import { type LucideIcon } from "lucide-react"
import { type AuthConfig } from "@/core/auth"

// ==================== PROJECT CONFIG ====================
export interface ProjectConfig {
    name: string
    version: string
    logo?: string
    logoAlt?: string
}

// ==================== MENU CONFIG ====================
export interface MenuSubItem {
    name: string
    url: string
    icon: LucideIcon
    roles?: string[]
}

export interface MenuItem {
    name: string
    url?: string
    icon: LucideIcon
    roles?: string[]
    subItems?: MenuSubItem[]
}

// ==================== APP CONFIG ====================
export interface AppConfig {
    auth: AuthConfig
    project: ProjectConfig
    menu: MenuItem[]
}

// Re-export AuthConfig for convenience
export type { AuthConfig }
