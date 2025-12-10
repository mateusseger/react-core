export interface UserProfile {
    sub: string
    name?: string
    email?: string
    preferred_username?: string
    given_name?: string
    family_name?: string
    picture?: string
    [key: string]: unknown
}

export interface User {
    profile: UserProfile
    roles: string[]
    accessToken: string
}

export interface AuthConfig {
    authority: string
    clientId: string
    redirectUri: string
    postLogoutRedirectUri?: string
    scope?: string
    devMockRoles?: string[]
    publicRoutes?: string[]
}

export interface AuthContextValue {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: () => Promise<void>
    logout: () => Promise<void>
    getAccessToken: () => Promise<string | null>
}
