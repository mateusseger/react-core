export type { User, AuthConfig, UserProfile, AuthContextValue } from "./types/auth-types"

export { AuthProvider } from "./context/auth-context"
export { useAuth } from "./hooks/use-auth"

export { ProtectedRoute } from "./components/protected-route"

export { hasRole, hasAnyRole, hasAllRoles, getUserDisplayName, getUserInitials } from "./utils/auth-utils"

export { authRoutes } from "./routes"
