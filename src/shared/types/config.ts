import { type LucideIcon } from "lucide-react"
import { type AuthConfig } from "@/features/auth"

// PROJECT CONFIG
export interface ProjectConfig {
    name: string
    version: string
    logo?: string
    logoAlt?: string
}

// MENU CONFIG
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

// AUTH CONFIG
export type { AuthConfig }

// APP CONFIG
export interface AppConfig {
    project: ProjectConfig
    menu: MenuItem[]
    auth: AuthConfig
}
