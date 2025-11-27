import { UserManager, type UserManagerSettings, WebStorageStateStore } from "oidc-client"
import type { IUser, AuthConfig } from "../types/auth-types"
import { createMockUser } from "./auth-mock"
import { enrichUser } from "./auth-enrichment"

let userManager: UserManager | null = null
let authConfig: AuthConfig | null = null
let DEV_MODE = false
let CLIENT_ID = "react-app"

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

export async function isAuthenticated(): Promise<boolean> {
    if (DEV_MODE) return true

    const user = await getUser()
    return !!user && !!user.access_token && !user.expired
}

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

export async function getToken(): Promise<string | null> {
    if (DEV_MODE) return "mock_access_token"

    const user = await getUser()
    return user?.access_token || null
}

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

export { createMockUser } from "./auth-mock"
