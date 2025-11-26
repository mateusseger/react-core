// Funções utilitárias para trabalhar com dados de usuário
// Extração de roles, formatação de nomes e iniciais para avatars

import type { IUser } from "@/features/auth/types/auth-types"

/**
 * Extracts roles from user object supporting multiple Keycloak formats
 * Checks: userRoles (root), userRoles (profile), roles, resource_access, realm_access
 *
 * @param user - User object or null/undefined
 * @returns Array of role strings, empty array if no roles found
 *
 * @example
 * ```ts
 * const roles = getUserRoles(user)
 * if (roles.includes('admin')) {
 *   // User is admin
 * }
 * ```
 */
export function getUserRoles(user: IUser | null | undefined): string[] {
    if (!user) {
        return []
    }

    // 1. userRoles no root (enriched pelo authService)
    if (Array.isArray(user.userRoles) && user.userRoles.length > 0) {
        return user.userRoles
    }

    // 2. userRoles no profile (custom claim)
    if (user.profile?.userRoles && Array.isArray(user.profile.userRoles) && user.profile.userRoles.length > 0) {
        return user.profile.userRoles
    }

    // 3. roles no profile (direct claim)
    if (user.profile?.roles && Array.isArray(user.profile.roles) && user.profile.roles.length > 0) {
        return user.profile.roles
    }

    // 4. resource_access[client_id].roles (Keycloak client-specific)
    // Note: Client ID should match the one used in authService initialization
    // Defaulting to 'react-app' as fallback
    if (user.profile?.resource_access?.['react-app']?.roles) {
        const clientRoles = user.profile.resource_access['react-app'].roles
        if (Array.isArray(clientRoles) && clientRoles.length > 0) {
            return clientRoles
        }
    }

    // 5. realm_access.roles (Keycloak realm-wide)
    if (user.profile?.realm_access?.roles) {
        const realmRoles = user.profile.realm_access.roles
        if (Array.isArray(realmRoles) && realmRoles.length > 0) {
            return realmRoles
        }
    }

    return []
}

/**
 * Gets user display name with safe fallbacks
 * Priority: name → profile.name → email → profile.email → 'User'
 *
 * @param user - User object or null/undefined
 * @returns Display name string, never null
 *
 * @example
 * ```ts
 * const displayName = getUserDisplayName(user)
 * console.log(`Welcome, ${displayName}`)
 * ```
 */
export function getUserDisplayName(user: IUser | null | undefined): string {
    if (!user) {
        return "User"
    }

    return (
        user.name ||
        user.profile?.name ||
        user.email ||
        user.profile?.email ||
        "User"
    )
}

/**
 * Generates user initials for avatar display
 * - Email format: First character
 * - Full name: First + Last name initials
 * - Single word: First character
 *
 * @param user - User object or null/undefined
 * @returns 1-2 character uppercase initials, 'U' as fallback
 *
 * @example
 * ```ts
 * const initials = getUserInitials(user)
 * // 'JD' for 'John Doe', 'J' for 'john@example.com'
 * ```
 */
export function getUserInitials(user: IUser | null | undefined): string {
    const displayName = getUserDisplayName(user)

    // Formato email: usar apenas primeiro caractere
    if (displayName.includes("@")) {
        return displayName[0].toUpperCase()
    }

    // Formato nome: tentar iniciais do primeiro e último nome
    const nameParts = displayName.split(" ").filter(Boolean)
    if (nameParts.length > 1) {
        return (
            nameParts[0][0].toUpperCase() +
            nameParts[nameParts.length - 1][0].toUpperCase()
        )
    }

    // Palavra única ou fallback: primeiro caractere
    return displayName[0]?.toUpperCase() || "U"
}

