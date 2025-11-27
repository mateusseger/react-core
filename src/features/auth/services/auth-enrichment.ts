import type { User } from "oidc-client"
import type { IUser, UserProfile } from "../types/auth-types"


export function extractRoles(profile: UserProfile | undefined, clientId: string): string[] {
    if (!profile) return []

    if (Array.isArray(profile.userRoles) && profile.userRoles.length > 0) {
        return profile.userRoles
    }

    if (profile.resource_access?.[clientId]?.roles) {
        const clientRoles = profile.resource_access[clientId].roles
        if (Array.isArray(clientRoles) && clientRoles.length > 0) {
            return clientRoles
        }
    }

    if (Array.isArray(profile.roles) && profile.roles.length > 0) {
        return profile.roles
    }

    if (profile.realm_access?.roles) {
        const realmRoles = profile.realm_access.roles
        if (Array.isArray(realmRoles) && realmRoles.length > 0) {
            return realmRoles
        }
    }

    return []
}

export function extractUserInfo(profile: UserProfile | undefined): { email?: string; name?: string } {
    if (!profile) return {}

    return {
        email: profile.email || profile.preferred_username,
        name: profile.name || profile.preferred_username || profile.email,
    }
}

export function enrichUser(user: User, clientId: string): IUser {
    const enrichedUser = user as IUser

    if (user.profile) {
        enrichedUser.userRoles = extractRoles(user.profile as UserProfile, clientId)
        const { email, name } = extractUserInfo(user.profile as UserProfile)
        enrichedUser.email = email
        enrichedUser.name = name
    } else {
        enrichedUser.userRoles = []
    }

    return enrichedUser
}
