import { useAuth, getUserRoles, hasAnyRole, hasAllRoles, hasMinimumRoleLevel, type UserRole } from "@/features/auth"

export function useAuthorization() {
    const { user } = useAuth()
    const userRoles = getUserRoles(user)

    const canAccess = (requiredRoles: UserRole[]): boolean => {
        return hasAnyRole(userRoles, requiredRoles)
    }

    const canAccessAll = (requiredRoles: UserRole[]): boolean => {
        return hasAllRoles(userRoles, requiredRoles)
    }

    const hasMinimumLevel = (minimumRole: UserRole): boolean => {
        return hasMinimumRoleLevel(userRoles, minimumRole)
    }

    const hasRole = (role: UserRole): boolean => {
        return userRoles.includes(role)
    }

    return {
        userRoles,
        canAccess,
        canAccessAll,
        hasMinimumLevel,
        hasRole,
    }
}
