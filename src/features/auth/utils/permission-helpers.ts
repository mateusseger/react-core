import { ROLE_HIERARCHY, type UserRole } from "@/features/auth"

export type { UserRole }

export function hasRole(userRoles: string[], requiredRole: UserRole): boolean {
    return userRoles.includes(requiredRole)
}

export function hasAnyRole(userRoles: string[], requiredRoles: UserRole[]): boolean {
    if (requiredRoles.length === 0) return true
    return requiredRoles.some((role) => userRoles.includes(role))
}

export function hasAllRoles(userRoles: string[], requiredRoles: UserRole[]): boolean {
    if (requiredRoles.length === 0) return true
    return requiredRoles.every((role) => userRoles.includes(role))
}

export function getRoleLevel(role: UserRole): number {
    return ROLE_HIERARCHY[role] ?? 0
}

export function hasMinimumRoleLevel(userRoles: string[], minimumRole: UserRole): boolean {
    const minimumLevel = getRoleLevel(minimumRole)
    return userRoles.some((role) => getRoleLevel(role as UserRole) >= minimumLevel)
}

export function getHighestRoleLevel(userRoles: string[]): number {
    return Math.max(
        0,
        ...userRoles.map((role) => getRoleLevel(role as UserRole))
    )
}

export function canAccess(userRoles: string[], requiredRoles: UserRole[]): boolean {
    return hasAnyRole(userRoles, requiredRoles)
}
