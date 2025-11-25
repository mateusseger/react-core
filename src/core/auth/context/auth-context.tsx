// Context de autenticação - Gerencia estado global de autenticação
// Refatorado para aceitar configuração via props

import { createContext, type ReactNode, useEffect, useState, useCallback } from "react"
import { getUser, login, logout as authLogout, PUBLIC_ROUTES, initAuthService } from "../services/auth-service"
import type { IUser, AuthConfig } from "../types/auth-types"
import { logger } from "@/utils/logger"

export type AuthContextType = {
    user: IUser | null
    isAuthenticated: boolean
    isLoading: boolean
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

interface AuthContextProviderProps {
    children: ReactNode
    config: AuthConfig
    devMode?: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthContextProvider({ children, config, devMode = false }: AuthContextProviderProps) {
    // Inicializa o serviço de autenticação com a configuração fornecida
    useEffect(() => {
        initAuthService(config, devMode)
    }, [config, devMode])
    const [user, setUser] = useState<IUser | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const isPublicRoute = useCallback((): boolean => {
        const pathname = window.location.pathname
        return PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
    }, [])

    const refreshUser = useCallback(async () => {
        try {
            const currentUser = await getUser()

            if (currentUser) {
                setUser(currentUser)
                setIsAuthenticated(true)
            } else {
                setUser(null)
                setIsAuthenticated(false)
            }
        } catch (error) {
            logger.error("Failed to refresh user", error)
            setUser(null)
            setIsAuthenticated(false)
        }
    }, [])

    const handleLogout = useCallback(async () => {
        try {
            await authLogout()
            setUser(null)
            setIsAuthenticated(false)
        } catch (error) {
            logger.error("Logout error", error)
            setUser(null)
            setIsAuthenticated(false)
            window.location.href = "/"
        }
    }, [])

    useEffect(() => {
        let isMounted = true

        async function initAuth() {
            if (isPublicRoute()) {
                setIsLoading(false)
                return
            }

            try {
                const currentUser = await getUser()

                if (!isMounted) return

                if (currentUser) {
                    setUser(currentUser)
                    setIsAuthenticated(true)
                } else {
                    await login()
                }
            } catch (error) {
                logger.error("Auth initialization failed", error)

                if (!isMounted) return

                try {
                    await login()
                } catch (loginError) {
                    logger.error("Login failed", loginError)
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        initAuth()

        return () => {
            isMounted = false
        }
    }, [isPublicRoute])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <h2 className="text-lg font-semibold mb-2">Carregando...</h2>
                    <p className="text-sm text-muted-foreground">
                        Verificando autenticação
                    </p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                logout: handleLogout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
