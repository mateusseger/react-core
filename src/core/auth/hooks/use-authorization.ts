// Hook de autorização - Verifica roles e permissões do usuário

import { useAuth, getUserRoles, hasAnyRole, hasAllRoles, hasMinimumRoleLevel, type UserRole } from "@/core/auth"

export function useAuthorization() {
    const { user } = useAuth()
    const userRoles = getUserRoles(user)

    // Verifica se o usuário tem alguma das roles necessárias
    const canAccess = (requiredRoles: UserRole[]): boolean => {
        return hasAnyRole(userRoles, requiredRoles)
    }

    // Verifica se o usuário tem todas as roles necessárias
    const canAccessAll = (requiredRoles: UserRole[]): boolean => {
        return hasAllRoles(userRoles, requiredRoles)
    }

    // Verifica se o usuário tem pelo menos o nível mínimo de role
    const hasMinimumLevel = (minimumRole: UserRole): boolean => {
        return hasMinimumRoleLevel(userRoles, minimumRole)
    }

    // Verifica se o usuário tem uma role específica
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
