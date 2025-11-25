/**
 * Auth Service - User Enrichment Module
 * Handles extraction and enrichment of user data from OIDC tokens
 */

import type { User } from "oidc-client"
import type { IUser, UserProfile } from "../types/auth-types"

/**
 * Extracts roles from user profile supporting multiple Keycloak formats
 * @param profile - User profile from OIDC token
 * @param clientId - Client ID for resource_access lookup
 * @returns Array of role strings
 */
export function extractRoles(profile: UserProfile | undefined, clientId: string): string[] {
    if (!profile) return []

    // 1. Custom userRoles claim
    if (Array.isArray(profile.userRoles) && profile.userRoles.length > 0) {
        return profile.userRoles
    }

    // 2. Client-specific roles
    if (profile.resource_access?.[clientId]?.roles) {
        const clientRoles = profile.resource_access[clientId].roles
        if (Array.isArray(clientRoles) && clientRoles.length > 0) {
            return clientRoles
        }
    }

    // 3. Direct roles claim
    if (Array.isArray(profile.roles) && profile.roles.length > 0) {
        return profile.roles
    }

    // 4. Realm-wide roles
    if (profile.realm_access?.roles) {
        const realmRoles = profile.realm_access.roles
        if (Array.isArray(realmRoles) && realmRoles.length > 0) {
            return realmRoles
        }
    }

    return []
}

/**
 * Extracts user info (email, name) from profile with fallbacks
 * @param profile - User profile from OIDC token
 * @returns Object with email and name
 */
export function extractUserInfo(profile: UserProfile | undefined): { email?: string; name?: string } {
    if (!profile) return {}

    return {
        email: profile.email || profile.preferred_username,
        name: profile.name || profile.preferred_username || profile.email,
    }
}

/**
 * Enriches OIDC user with additional extracted information
 * @param user - Base OIDC user object
 * @param clientId - Client ID for role extraction
 * @returns Enriched IUser object
 */
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
