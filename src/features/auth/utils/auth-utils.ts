import type { User } from "../types/auth-types"

function getUserRoles(user: User | null): string[] {
    return user?.roles ?? []
}

export function hasRole(user: User | null, role: string): boolean {
    return getUserRoles(user).includes(role)
}

export function hasAnyRole(user: User | null, roles: string[]): boolean {
    if (!roles.length) return true
    const userRoles = getUserRoles(user)
    return roles.some((role) => userRoles.includes(role))
}

export function hasAllRoles(user: User | null, roles: string[]): boolean {
    if (!roles.length) return true
    const userRoles = getUserRoles(user)
    return roles.every((role) => userRoles.includes(role))
}

export function getUserDisplayName(user: User | null): string {
    return user?.profile.name ?? user?.profile.preferred_username ?? "User"
}

export function getUserInitials(user: User | null): string {
    const name = getUserDisplayName(user)

    if (name.includes("@")) return name[0].toUpperCase()

    const parts = name.split(" ").filter(Boolean)
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }

    return name[0]?.toUpperCase() ?? "U"
}
