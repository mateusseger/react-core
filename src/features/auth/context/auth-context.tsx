import { createContext, useEffect, useState, type ReactNode } from "react"
import { getUser, login, logout, getAccessToken, initAuth, isPublicRoute } from "../services/auth-service"
import { AuthLoading } from "../components/auth-loading"
import { AuthError } from "../components/auth-error"
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
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const initializeAuth = async () => {
            initAuth(config, devMode)

            if (isPublicRoute(window.location.pathname)) {
                setIsLoading(false)
                return
            }

            try {
                const user = await getUser()
                if (user) {
                    setUser(user)
                } else {
                    await login()
                }
            } catch (error) {
                console.error("Erro na verificação de sessão:", error)
                setError("Não foi possível verificar sua sessão.")
            } finally {
                setIsLoading(false)
            }
        }

        initializeAuth()
    }, [config, devMode])

    if (isLoading) {
        return <AuthLoading title="Verificando Sessão" description="Aguarde enquanto verificamos sua sessão." />
    }

    if (error) {
        return <AuthError title="Erro na Verificação" message={error} />
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, getAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}
