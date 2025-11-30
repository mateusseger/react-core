import { UserManager, type UserManagerSettings, WebStorageStateStore } from "oidc-client"
import type { User, UserProfile, AuthConfig } from "../types/auth-types"

// =============================================================================
// State
// =============================================================================

let userManager: UserManager | null = null
let clientId = ""
let devMode = false
let mockRoles: string[] = ["user"]

// =============================================================================
// Public API
// =============================================================================

export function initAuth(config: AuthConfig, isDevMode = false): void {
    devMode = isDevMode
    clientId = config.clientId
    mockRoles = config.devMockRoles ?? ["user"]

    if (!devMode) {
        const settings: UserManagerSettings = {
            authority: config.authority,
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            post_logout_redirect_uri: config.postLogoutRedirectUri ?? window.location.origin,
            response_type: "code",
            scope: config.scope ?? "openid profile email",
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            automaticSilentRenew: true,
            loadUserInfo: true,
        }
        userManager = new UserManager(settings)
        setupAuthEvents()
    }
}

function setupAuthEvents(): void {
    if (!userManager) return

    // Token expirou
    userManager.events.addAccessTokenExpired(() => {
        console.warn("[Auth] Token expirado")
        login()
    })

    // Renovação silenciosa falhou TODO: TIRAR A RENOVACAO AUTOMATICA
    userManager.events.addSilentRenewError((error) => {
        console.warn("[Auth] Falha na renovação silenciosa:", error)
        login()
    })

    // Usuário fez logout (em outra aba, por exemplo)
    userManager.events.addUserSignedOut(() => {
        console.warn("[Auth] Usuário deslogado")
        login()
    })

    // Token renovado com sucesso (opcional, para debug)
    userManager.events.addAccessTokenExpiring(() => {
        console.info("[Auth] Token expirando, renovando...")
    })
}

export async function getUser(): Promise<User | null> {
    if (devMode) return createMockUser()

    try {
        const oidcUser = await userManager?.getUser()
        if (!oidcUser || oidcUser.expired) return null
        return enrichUser(oidcUser)
    } catch {
        return null
    }
}

export async function login(): Promise<void> {
    if (devMode) return
    await userManager?.signinRedirect()
}

export async function handleCallback(): Promise<User | null> {
    if (devMode) return createMockUser()

    const oidcUser = await userManager?.signinRedirectCallback()
    if (!oidcUser?.access_token) {
        throw new Error("Dados de usuário inválidos")
    }
    return enrichUser(oidcUser)
}

export async function logout(): Promise<void> {
    if (devMode) {
        localStorage.clear()
        window.location.href = "/"
        return
    }

    try {
        await userManager?.signoutRedirect()
    } catch {
        localStorage.clear()
        window.location.href = "/"
    }
}

export const PUBLIC_ROUTES = ["/auth/callback", "/auth/logout", "/unauthorized"]

// =============================================================================
// Internal Helpers
// =============================================================================

function enrichUser(oidcUser: import("oidc-client").User): User {
    const profile = oidcUser.profile as UserProfile
    return {
        ...oidcUser,
        profile,
        roles: extractRoles(profile),
        email: profile.email ?? profile.preferred_username,
        name: profile.name ?? profile.preferred_username,
    } as User
}

function extractRoles(profile: UserProfile): string[] {
    // Prioridade: userRoles > resource_access > roles > realm_access
    if (profile.userRoles?.length) return profile.userRoles
    if (profile.resource_access?.[clientId]?.roles?.length) {
        return profile.resource_access[clientId].roles
    }
    if (profile.roles?.length) return profile.roles
    if (profile.realm_access?.roles?.length) return profile.realm_access.roles
    return []
}

function createMockUser(): User {
    const now = Math.floor(Date.now() / 1000)

    return {
        access_token: "mock_token",
        token_type: "Bearer",
        expires_at: now + 3600,
        expired: false,
        scopes: ["openid", "profile", "email"],
        toStorageString: () => "{}",
        profile: {
            sub: "mock-user",
            name: "Dev User",
            email: "dev@localhost",
            userRoles: mockRoles,
        },
        roles: mockRoles,
        email: "dev@localhost",
        name: "Dev User",
    } as User
}
