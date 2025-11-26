/**
 * Auth Service - Main Module
 * Centralized authentication service with Keycloak/OIDC
 * Refactored to accept configuration via props
 */

import { UserManager, type UserManagerSettings, WebStorageStateStore } from "oidc-client"
import type { IUser, AuthConfig } from "../types/auth-types"
import { createMockUser } from "./auth-mock"
import { enrichUser } from "./auth-enrichment"

// ==================== STATE MANAGEMENT ====================

let userManager: UserManager | null = null
let authConfig: AuthConfig | null = null
let DEV_MODE = false
let CLIENT_ID = "react-app"

/**
 * Initializes the authentication service with provided configuration.
 * MUST be called before using any other function in this service.
 * 
 * @param config - Authentication configuration (OIDC/Keycloak settings)
 * @param devMode - Enable development mode (bypasses actual authentication)
 * @throws {Error} If configuration is invalid
 * 
 * @example
 * ```ts
 * initAuthService({
 *   authority: 'https://keycloak.example.com/realms/myrealm',
 *   client_id: 'my-app',
 *   redirect_uri: 'https://myapp.com/auth/callback',
 *   post_logout_redirect_uri: 'https://myapp.com'
 * })
 * ```
 */
export function initAuthService(config: AuthConfig, devMode = false): void {
    authConfig = config
    DEV_MODE = devMode
    CLIENT_ID = config.client_id

    if (!DEV_MODE) {
        const oidcConfig: UserManagerSettings = {
            authority: config.authority,
            client_id: config.client_id,
            redirect_uri: config.redirect_uri,
            silent_redirect_uri: config.silentRedirectUri || config.redirect_uri,
            response_type: config.response_type || "code",
            scope: config.scope || "openid profile email",
            post_logout_redirect_uri: config.post_logout_redirect_uri || window.location.origin,
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            stateStore: new WebStorageStateStore({ store: window.localStorage }),
            revokeAccessTokenOnSignout: true,
            automaticSilentRenew: config.automaticSilentRenew ?? true,
            loadUserInfo: config.loadUserInfo ?? true,
        }

        userManager = new UserManager(oidcConfig)
    }
}

function ensureInitialized(): void {
    if (!authConfig) {
        const error = "Service not initialized. Call initAuthService(config) first."
        console.error(error)
        throw new Error(`[AuthService] ${error}`)
    }
}

function getUserManager(): UserManager {
    ensureInitialized()
    if (!userManager) {
        const error = "UserManager not available in dev mode"
        console.error(error)
        throw new Error(`[AuthService] ${error}`)
    }
    return userManager
}

// ==================== HELPER FUNCTIONS ====================
// Mock and enrichment functions moved to separate modules

// ==================== PUBLIC API ====================

/**
 * Retrieves the currently authenticated user with enriched profile data
 * 
 * @returns Promise resolving to IUser object or null if not authenticated
 * @throws {Error} If service is not initialized
 * 
 * @example
 * ```ts
 * const user = await getUser()
 * if (user) {
 *   console.log(user.email, user.userRoles)
 * }
 * ```
 */
export async function getUser(): Promise<IUser | null> {
    ensureInitialized()

    if (DEV_MODE) {
        const mockUser = createMockUser()
        localStorage.setItem("app-token", mockUser.access_token)
        return mockUser
    }

    try {
        const manager = getUserManager()
        const user = await manager.getUser()

        if (!user || user.expired) {
            return null
        }

        return enrichUser(user, CLIENT_ID)
    } catch (error) {
        console.error("Failed to get user", error)
        return null
    }
}

/**
 * Checks if user is currently authenticated with valid token
 * 
 * @returns Promise resolving to boolean indicating authentication status
 * 
 * @example
 * ```ts
 * if (await isAuthenticated()) {
 *   // User is logged in
 * }
 * ```
 */
export async function isAuthenticated(): Promise<boolean> {
    if (DEV_MODE) return true

    const user = await getUser()
    return !!user && !!user.access_token && !user.expired
}

/**
 * Initiates the login flow (redirects to Keycloak/OIDC provider)
 * 
 * @throws {Error} If service is not initialized or login fails
 * 
 * @example
 * ```ts
 * await login() // User will be redirected to Keycloak
 * ```
 */
export async function login(): Promise<void> {
    ensureInitialized()

    if (DEV_MODE) return

    try {
        const manager = getUserManager()
        await manager.signinRedirect()
    } catch (error) {
        console.error("Login failed", error)
        throw new Error("Failed to initiate login")
    }
}

/**
 * Processes authentication callback after redirect from Keycloak/OIDC
 * Should be called on the redirect_uri page
 * 
 * @returns Promise resolving to authenticated IUser or null on failure
 * @throws {Error} If callback processing fails or user data is invalid
 * 
 * @example
 * ```ts
 * // In /auth/callback page
 * try {
 *   const user = await handleCallback()
 *   if (user) {
 *     navigate('/dashboard')
 *   }
 * } catch (error) {
 *   navigate('/login?error=callback_failed')
 * }
 * ```
 */
export async function handleCallback(): Promise<IUser | null> {
    ensureInitialized()

    if (DEV_MODE) {
        return createMockUser()
    }

    try {
        const manager = getUserManager()
        const user = await manager.signinRedirectCallback()

        if (!user || !user.access_token) {
            throw new Error("Dados de usuário inválidos")
        }

        const enrichedUser = enrichUser(user, CLIENT_ID)
        localStorage.setItem("app-token", user.access_token)

        return enrichedUser
    } catch (error) {
        console.error("Authentication callback failed", error)
        throw new Error("Failed to process authentication callback")
    }
}

/**
 * Performs complete logout (clears session and redirects to provider)
 * Clears all local storage and session storage
 * 
 * @throws {Error} If service is not initialized
 * 
 * @example
 * ```ts
 * await logout() // User will be logged out and redirected
 * ```
 */
export async function logout(): Promise<void> {
    ensureInitialized()

    if (DEV_MODE) {
        localStorage.clear()
        sessionStorage.clear()
        window.location.href = "/"
        return
    }

    try {
        const manager = getUserManager()
        await manager.signoutRedirect()
        localStorage.clear()
        sessionStorage.clear()
    } catch (error) {
        console.error("Logout failed, attempting fallback", error)

        try {
            const manager = getUserManager()
            await manager.removeUser()
        } catch (e) {
            console.error("Failed to remove user", e)
        }

        localStorage.clear()
        sessionStorage.clear()

        const authority = authConfig!.authority
        const redirectUri = encodeURIComponent(authConfig!.post_logout_redirect_uri || window.location.origin)
        window.location.href = `${authority}/protocol/openid-connect/logout?post_logout_redirect_uri=${redirectUri}`
    }
}

/**
 * Retrieves the current access token
 * 
 * @returns Promise resolving to access token string or null if not authenticated
 * 
 * @example
 * ```ts
 * const token = await getToken()
 * if (token) {
 *   // Use token for API calls
 *   fetch('/api/data', {
 *     headers: { Authorization: `Bearer ${token}` }
 *   })
 * }
 * ```
 */
export async function getToken(): Promise<string | null> {
    if (DEV_MODE) return "mock_access_token"

    const user = await getUser()
    return user?.access_token || null
}

/**
 * Renews the access token using refresh token (silent refresh)
 * 
 * @returns Promise resolving to updated IUser or null on failure
 * 
 * @example
 * ```ts
 * const updatedUser = await renewToken()
 * if (!updatedUser) {
 *   // Token renewal failed, redirect to login
 *   await login()
 * }
 * ```
 */
export async function renewToken(): Promise<IUser | null> {
    ensureInitialized()

    if (DEV_MODE) return createMockUser()

    try {
        const manager = getUserManager()
        const user = await manager.signinSilent()
        return enrichUser(user, CLIENT_ID)
    } catch (error) {
        console.error("Token renewal failed", error)
        return null
    }
}

// ==================== CONSTANTS ====================

export const AUTH_STORAGE_KEYS = {
    TOKEN: "app-token",
    USER: "app-user",
    STATE: "oidc-state",
} as const

export const PUBLIC_ROUTES = [
    "/auth/callback",
    "/auth/logout",
    "/unauthorized",
] as const

export const AUTH_ERRORS = {
    CALLBACK_FAILED: "Failed to process authentication callback",
    LOGOUT_FAILED: "Failed to complete logout",
    TOKEN_EXPIRED: "Your session has expired. Please log in again",
    UNAUTHORIZED: "You don't have permission to access this resource",
    INVALID_USER: "Invalid user data received",
    NETWORK_ERROR: "Network error during authentication",
} as const

// Re-export from modules
export { createMockUser } from "./auth-mock"

