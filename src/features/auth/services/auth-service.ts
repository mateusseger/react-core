import { UserManager, WebStorageStateStore, type User as OidcUser } from "oidc-client-ts"
import type { User, UserProfile, AuthConfig } from "../types/auth-types"

let userManager: UserManager | null = null
let clientId = ""
let devMode = false
let mockRoles: string[] = []
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
    mockRoles = config.devMockRoles ?? []
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

    if (event.oldValue && !event.newValue) window.location.replace("/")
    if (!event.oldValue && event.newValue) window.location.reload()
}

export async function login(): Promise<void> {
    if (devMode || isRedirecting) return
    isRedirecting = true

    try {
        await userManager?.signinRedirect()
    } finally {
        isRedirecting = false
    }
}

export async function logout(): Promise<void> {
    if (devMode || isRedirecting) return
    isRedirecting = true

    try {
        await userManager?.signoutRedirect()
    } finally {
        isRedirecting = false
    }
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

export async function getUser(): Promise<User | null> {
    if (devMode) return createMockUser()

    const oidcUser = await userManager?.getUser()
    if (!oidcUser || oidcUser.expired) return null

    return toUser(oidcUser)
}

export async function getAccessToken(): Promise<string | null> {
    if (devMode) return "mock_token"

    const user = await getUser();

    return user?.accessToken ?? null
}

export function isPublicRoute(pathname: string): boolean {
    return publicRoutes.some((route) => pathname.startsWith(route))
}

function decodeAccessToken(token: string): Record<string, unknown> | null {
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(atob(base64))
    } catch {
        return null
    }
}

function extractRoles(accessToken: string): string[] {
    const payload = decodeAccessToken(accessToken)
    if (!payload) return []

    const userRoles = payload.userRoles as string[] | undefined
    if (userRoles?.length) return userRoles

    const resourceAccess = payload.resource_access as Record<string, { roles: string[] }> | undefined
    const clientRoles = resourceAccess?.[clientId]?.roles
    if (clientRoles?.length) return clientRoles

    return []
}

function toUser(oidcUser: OidcUser): User {
    return {
        profile: oidcUser.profile as UserProfile,
        roles: extractRoles(oidcUser.access_token),
        accessToken: oidcUser.access_token,
    }
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
