import { createContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { getUser, login, logout as authLogout, initAuth, PUBLIC_ROUTES } from "../services/auth-service"
import type { User, AuthConfig, AuthContextValue } from "../types/auth-types"

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
    children: ReactNode
    config: AuthConfig
    devMode?: boolean
}

export function AuthProvider({ children, config, devMode = false }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const handleLogout = useCallback(async () => {
        await authLogout()
        setUser(null)
    }, [])

    useEffect(() => {
        initAuth(config, devMode)

        const isPublicRoute = PUBLIC_ROUTES.some((r) => window.location.pathname.startsWith(r))
        if (isPublicRoute) {
            setIsLoading(false)
            return
        }

        getUser()
            .then((u) => (u ? setUser(u) : login()))
            .catch(() => login())
            .finally(() => setIsLoading(false))
    }, [config, devMode])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Carregando...</p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}
