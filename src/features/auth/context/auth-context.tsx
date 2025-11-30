import { createContext, useEffect, useState, type ReactNode } from "react"
import { getUser, login, logout, initAuth, isPublicRoute } from "../services/auth-service"
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

    useEffect(() => {
        initAuth(config, devMode)

        if (isPublicRoute(window.location.pathname)) {
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
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
