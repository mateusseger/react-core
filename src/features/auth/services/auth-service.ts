import { UserManager, WebStorageStateStore, type User as OidcUser } from "oidc-client-ts"
import type { User, UserProfile, AuthConfig } from "../types/auth-types"

let userManager: UserManager | null = null
let clientId = ""
let devMode = false
let mockRoles: string[] = ["user"]
let publicRoutes: string[] = []
let callbackPromise: Promise<User | null> | null = null
let isRedirecting = false
let isInitialized = false

const DEFAULT_PUBLIC_ROUTES = ["/auth/callback", "/unauthorized"]

export function initAuth(config: AuthConfig, isDevMode = false): void {
    if (isInitialized) return
    isInitialized = true

    devMode = isDevMode
    clientId = config.clientId
    mockRoles = config.devMockRoles ?? ["user"]
    publicRoutes = [...DEFAULT_PUBLIC_ROUTES, ...(config.publicRoutes ?? [])]

    if (devMode) return

    userManager = new UserManager({
        authority: config.authority,
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        post_logout_redirect_uri: config.postLogoutRedirectUri ?? window.location.origin,
        response_type: "code",
        scope: config.scope ?? "openid profile email offline_access",
        userStore: new WebStorageStateStore({ store: window.localStorage }),
        automaticSilentRenew: true,
        accessTokenExpiringNotificationTimeInSeconds: 5
    })

    setupAuthEvents()
}

function setupAuthEvents(): void {
    if (!userManager) return

    userManager.events.addAccessTokenExpired(() => login())
    userManager.events.addSilentRenewError(() => login())

    window.addEventListener("storage", handleCrossTabAuthSync)
}

function handleCrossTabAuthSync(event: StorageEvent): void {
    if (!event.key?.startsWith("oidc.user:")) return

    if (event.oldValue && !event.newValue) window.location.href = "/"
    if (!event.oldValue && event.newValue) window.location.reload()
}

export async function getUser(): Promise<User | null> {
    if (devMode) return createMockUser()

    const oidcUser = await userManager?.getUser()
    if (!oidcUser || oidcUser.expired) return null

    return toUser(oidcUser)
}

export async function login(): Promise<void> {
    if (devMode || isRedirecting) return
    isRedirecting = true

    await userManager?.signinRedirect()
}

export async function handleCallback(): Promise<User | null> {
    if (devMode) return createMockUser()

    if (callbackPromise) return callbackPromise

    callbackPromise = userManager!.signinRedirectCallback().then((oidcUser) => {
        if (!oidcUser?.access_token) throw new Error("Dados de usuário inválidos")
        return toUser(oidcUser)
    })

    return callbackPromise
}

export async function logout(): Promise<void> {
    if (isRedirecting) return
    isRedirecting = true

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

function toUser(oidcUser: OidcUser): User {
    const profile = oidcUser.profile as UserProfile

    return {
        profile,
        roles: profile.resource_access?.[clientId]?.roles ?? [],
        accessToken: oidcUser.access_token,
    }
}

export function isPublicRoute(pathname: string): boolean {
    return publicRoutes.some((route) => pathname.startsWith(route))
}

function createMockUser(): User {
    return {
        profile: {
            sub: "mock-user",
            name: "Dev User",
            email: "dev@localhost",
        },
        roles: mockRoles,
        accessToken: "mock_token",
    }
}
