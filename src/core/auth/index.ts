// Barrel export para feature auth

export { useAuth } from "./hooks/use-auth"
export { useAuthorization } from "./hooks/use-authorization"
export { AuthContext, AuthContextProvider } from "./context/auth-context"
export { handleCallback, logout, AUTH_ERRORS } from "./services/auth-service"
export type { IUser, AuthConfig, AuthContextType, UserProfile } from "./types/auth-types"
export { ProtectedRoute } from "./components/protected-route"
export { USER_ROLES, ROLE_HIERARCHY } from "./config/permissions-config"
export type { UserRole } from "./config/permissions-config"
export { getUserRoles, getUserDisplayName, getUserInitials } from "./utils/user-helpers"
export { hasRole, hasAnyRole, hasAllRoles, hasMinimumRoleLevel } from "./utils/permission-helpers"
export { authRoutes } from "./routes"
