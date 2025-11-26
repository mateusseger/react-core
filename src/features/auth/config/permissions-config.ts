/**
 * Permissions & Role-Based Access Control (RBAC)
 * Definições de roles e hierarquia
 */

export const USER_ROLES = {
    ADMIN: "admin",
    EDITOR: "editor",
    VIEWER: "viewer",
    USER: "user",
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const ROLE_HIERARCHY: Record<UserRole, number> = {
    [USER_ROLES.ADMIN]: 4,
    [USER_ROLES.EDITOR]: 3,
    [USER_ROLES.VIEWER]: 2,
    [USER_ROLES.USER]: 1,
}
