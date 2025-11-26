// Página de logout - Limpa sessão do Keycloak e local storage

import { useEffect, useRef } from "react"
import { logout } from "@/features/auth"

const AUTH_REDIRECTS = {
    AFTER_LOGOUT: "/",
}

export function LogoutPage() {
    const hasLoggedOut = useRef(false)

    useEffect(() => {
        if (hasLoggedOut.current) {
            return
        }
        hasLoggedOut.current = true

        const performLogout = async () => {
            try {
                await logout()
            } catch (error) {
                console.error("[Logout] Erro ao fazer logout:", error)
                window.location.href = AUTH_REDIRECTS.AFTER_LOGOUT
            }
        }

        performLogout()
    }, [])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6" />

                <h2 className="text-xl font-semibold mb-3">
                    Saindo...
                </h2>
                <p className="text-sm text-muted-foreground">
                    Aguarde enquanto completamos o processo de logout.
                </p>
            </div>
        </div>
    )
}
