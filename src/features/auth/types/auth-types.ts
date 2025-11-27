import type { User as OidcUser } from "oidc-client"

export interface UserProfile {
    // OIDC Standard Claims
    iss: string
    aud: string
    exp: number
    iat: number
    sub: string

    // Optional Standard Claims
    name?: string
    email?: string
    email_verified?: boolean
    preferred_username?: string
    given_name?: string
    family_name?: string
    picture?: string

    // Keycloak Specific Claims
    roles?: string[]
    userRoles?: string[]
    resource_access?: Record<string, { roles: string[] }>
    realm_access?: { roles: string[] }

    // Allow additional claims with type safety
    [key: string]: unknown
}

export interface IUser extends OidcUser {
    /** User's email address */
    email?: string

    /** User's full name */
    name?: string

    /** User's roles/permissions */
    userRoles: string[]

    /** User's profile information */
    profile: UserProfile
}

export interface AuthState {
    user: IUser | null
    isAuthenticated: boolean
    isLoading: boolean
}

export interface AuthContextType extends AuthState {
    login: () => Promise<void>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

export interface AuthConfig {
    authority: string
    client_id: string
    redirect_uri: string
    post_logout_redirect_uri?: string
    response_type?: string
    scope?: string
    automaticSilentRenew?: boolean
    loadUserInfo?: boolean
    silentRedirectUri?: string
}
