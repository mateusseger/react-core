/**
 * Permission Helpers
 * Funções auxiliares para checagem de permissões e roles
 */

import { ROLE_HIERARCHY, type UserRole } from "@/core/auth"

export type { UserRole }

/**
 * Checks if user has a specific role
 * 
 * @param userRoles - Array of user's roles
 * @param requiredRole - Role to check for
 * @returns True if user has the role
 * 
 * @example
 * ```ts
 * if (hasRole(userRoles, 'admin')) {
 *   // User is admin
 * }
 * ```
 */
export function hasRole(userRoles: string[], requiredRole: UserRole): boolean {
    return userRoles.includes(requiredRole)
}

/**
 * Checks if user has ANY of the required roles (OR logic)
 * Returns true if requiredRoles is empty (public access)
 * 
 * @param userRoles - Array of user's roles
 * @param requiredRoles - Array of roles to check (OR)
 * @returns True if user has at least one role
 * 
 * @example
 * ```ts
 * if (hasAnyRole(userRoles, ['admin', 'moderator'])) {
 *   // User is admin OR moderator
 * }
 * ```
 */
export function hasAnyRole(userRoles: string[], requiredRoles: UserRole[]): boolean {
    if (requiredRoles.length === 0) return true
    return requiredRoles.some((role) => userRoles.includes(role))
}

/**
 * Checks if user has ALL of the required roles (AND logic)
 * Returns true if requiredRoles is empty
 * 
 * @param userRoles - Array of user's roles
 * @param requiredRoles - Array of roles to check (AND)
 * @returns True if user has all roles
 * 
 * @example
 * ```ts
 * if (hasAllRoles(userRoles, ['admin', 'verified'])) {
 *   // User is admin AND verified
 * }
 * ```
 */
export function hasAllRoles(userRoles: string[], requiredRoles: UserRole[]): boolean {
    if (requiredRoles.length === 0) return true
    return requiredRoles.every((role) => userRoles.includes(role))
}

/**
 * Gets hierarchical level of a role (based on ROLE_HIERARCHY)
 * Higher number = more privileged role
 * 
 * @param role - Role to get level for
 * @returns Numeric level, 0 if role not found
 * 
 * @example
 * ```ts
 * getRoleLevel('admin') // 3
 * getRoleLevel('user')  // 1
 * ```
 */
export function getRoleLevel(role: UserRole): number {
    return ROLE_HIERARCHY[role] ?? 0
}

/**
 * Checks if user has at least the minimum role level
 * Useful for hierarchical permission checks
 * 
 * @param userRoles - Array of user's roles
 * @param minimumRole - Minimum required role level
 * @returns True if user has role with >= level
 * 
 * @example
 * ```ts
 * if (hasMinimumRoleLevel(userRoles, 'manager')) {
 *   // User is manager OR admin (higher level)
 * }
 * ```
 */
export function hasMinimumRoleLevel(userRoles: string[], minimumRole: UserRole): boolean {
    const minimumLevel = getRoleLevel(minimumRole)
    return userRoles.some((role) => getRoleLevel(role as UserRole) >= minimumLevel)
}

/**
 * Obtém o maior nível de role do usuário
 */
export function getHighestRoleLevel(userRoles: string[]): number {
    return Math.max(
        0,
        ...userRoles.map((role) => getRoleLevel(role as UserRole))
    )
}

/**
 * Verifica se usuário pode acessar um recurso
 * (Alias para hasAnyRole)
 */
export function canAccess(userRoles: string[], requiredRoles: UserRole[]): boolean {
    return hasAnyRole(userRoles, requiredRoles)
}
