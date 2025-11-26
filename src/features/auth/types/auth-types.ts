/**
 * Authentication Service Types
 *
 * Centralized type definitions for the authentication system
 */

import type { User as OidcUser } from "oidc-client"

/**
 * Extended user profile with additional information from OIDC provider
 */
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

/**
 * Application user interface extending OIDC User
 */
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

/**
 * Authentication state
 */
export interface AuthState {
    user: IUser | null
    isAuthenticated: boolean
    isLoading: boolean
}

/**
 * Authentication context type
 */
export interface AuthContextType extends AuthState {
    login: () => Promise<void>
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

/**
 * Authentication service configuration
 */
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
