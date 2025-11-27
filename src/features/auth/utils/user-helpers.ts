import type { IUser } from "@/features/auth/types/auth-types"

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

