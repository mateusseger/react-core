import { createContext, useEffect, useState, type ReactNode } from "react"
import { Loader2 } from "lucide-react"
import { getUser, login, logout, getAccessToken, initAuth, isPublicRoute } from "../services/auth-service"
import { Card, CardContent } from "@/shared/components/ui/shadcn/card"
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
            <div className="flex min-h-svh items-center justify-center bg-background p-4">
                <Card className="w-full max-w-sm border-0 text-center shadow-none">
                    <CardContent className="flex flex-col items-center gap-4 pt-6">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <div className="space-y-1">
                            <h1 className="text-lg font-semibold">Carregando...</h1>
                            <p className="text-sm text-muted-foreground">Aguarde enquanto verificamos sua sessão.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, getAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}
