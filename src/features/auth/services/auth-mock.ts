/**
 * Auth Service - Mock User Module
 * Handles mock user creation for development mode
 */

import { USER_ROLES } from "../config/permissions-config"
import type { IUser } from "../types/auth-types"

/**
 * Retrieves mock roles from environment variable
 */
export function getDevMockRoles(): string[] {
    if (typeof import.meta === 'undefined' || !import.meta.env) {
        return [USER_ROLES.USER]
    }

    const rolesEnv = import.meta.env.VITE_DEV_MOCK_ROLES
    if (rolesEnv && typeof rolesEnv === "string") {
        return rolesEnv
            .split(",")
            .map((role) => role.trim())
            .filter(Boolean)
    }
    return [USER_ROLES.USER]
}

/**
 * Creates a mock user for development/testing
 * @param customRoles - Optional custom roles array
 * @returns Mock IUser object with valid structure
 */
export function createMockUser(customRoles?: string[]): IUser {
    const roles = customRoles ?? getDevMockRoles()
    const now = Math.floor(Date.now() / 1000)
    const expiresIn = 3600

    return {
        id_token: "mock_id_token",
        session_state: "mock_session_state",
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
        token_type: "Bearer",
        scope: "openid profile email roles",
        profile: {
            iss: "http://localhost:8080/realms/herval",
            aud: "react-app",
            exp: now + expiresIn,
            iat: now,
            sub: "mock-user-id-12345",
            name: "Mock User (Dev Mode)",
            email: "mock.user@dev.local",
            email_verified: true,
            preferred_username: "mockuser",
            given_name: "Mock",
            family_name: "User",
            userRoles: roles,
        },
        expires_at: now + expiresIn,
        expired: false,
        scopes: ["openid", "profile", "email", "roles"],
        toStorageString: () => JSON.stringify({}),
        state: "mock_state",
        expires_in: expiresIn,
        email: "mock.user@dev.local",
        name: "Mock User (Dev Mode)",
        userRoles: roles,
    } as IUser
}
