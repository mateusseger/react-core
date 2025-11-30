// Types
export type { User, AuthConfig, UserProfile } from "./types/auth-types"

// Provider & Hook
export { AuthProvider } from "./context/auth-context"
export { useAuth } from "./hooks/use-auth"

// Components
export { ProtectedRoute } from "./components/protected-route"

// Utils
export { getUserRoles, hasRole, hasAnyRole, hasAllRoles, getUserDisplayName, getUserInitials } from "./utils/auth-utils"

// Service (uso avançado)
export { handleCallback, logout } from "./services/auth-service"

// Routes
export { authRoutes } from "./routes"
