import type { LucideIcon } from "lucide-react"
import type { AuthConfig } from "@/features/auth"

export interface ProjectConfig {
    name: string
    version: string
    logo?: string
    logoAlt?: string
}

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

export interface AppConfig {
    project: ProjectConfig
    menu: MenuItem[]
    auth: AuthConfig
}

export type { AuthConfig }
