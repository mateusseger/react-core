import type { User } from "../types/auth-types"

// =============================================================================
// Role Helpers
// =============================================================================

/** Retorna as roles do usuário */
export function getUserRoles(user: User | null): string[] {
    return user?.roles ?? []
}

/** Verifica se o usuário possui uma role específica */
export function hasRole(user: User | null, role: string): boolean {
    return getUserRoles(user).includes(role)
}

/** Verifica se o usuário possui pelo menos uma das roles */
export function hasAnyRole(user: User | null, roles: string[]): boolean {
    if (!roles.length) return true
    const userRoles = getUserRoles(user)
    return roles.some((role) => userRoles.includes(role))
}

/** Verifica se o usuário possui todas as roles */
export function hasAllRoles(user: User | null, roles: string[]): boolean {
    if (!roles.length) return true
    const userRoles = getUserRoles(user)
    return roles.every((role) => userRoles.includes(role))
}

// =============================================================================
// Display Helpers
// =============================================================================

/** Retorna o nome de exibição do usuário */
export function getUserDisplayName(user: User | null): string {
    return user?.name ?? user?.email ?? "User"
}

/** Retorna as iniciais do usuário para avatar */
export function getUserInitials(user: User | null): string {
    const name = getUserDisplayName(user)

    if (name.includes("@")) {
        return name[0].toUpperCase()
    }

    const parts = name.split(" ").filter(Boolean)
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }

    return name[0]?.toUpperCase() ?? "U"
}
