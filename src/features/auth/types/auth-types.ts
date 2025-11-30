import type { User as OidcUser } from "oidc-client"

// =============================================================================
// User
// =============================================================================

export interface UserProfile {
    sub: string
    name?: string
    email?: string
    preferred_username?: string
    given_name?: string
    family_name?: string
    picture?: string

    // Role claims (varia por provider)
    roles?: string[]
    userRoles?: string[]
    resource_access?: Record<string, { roles: string[] }>
    realm_access?: { roles: string[] }

    [key: string]: unknown
}

export interface User extends Omit<OidcUser, "profile"> {
    email?: string
    name?: string
    roles: string[]
    profile: UserProfile
}

// =============================================================================
// Auth Config
// =============================================================================

export interface AuthConfig {
    /** URL do servidor de autenticação (ex: https://auth.example.com/realms/app) */
    authority: string
    /** ID do cliente registrado no servidor de auth */
    clientId: string
    /** URL de callback após login */
    redirectUri: string
    /** URL de redirecionamento após logout */
    postLogoutRedirectUri?: string
    /** Escopos OAuth (default: "openid profile email") */
    scope?: string
    /** Roles para mock user em dev mode (default: ["user"]) */
    devMockRoles?: string[]
}

// =============================================================================
// Auth Context Value
// =============================================================================
export interface AuthContextValue {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    logout: () => Promise<void>
}
