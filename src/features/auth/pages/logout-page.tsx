import { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { logout } from "../services/auth-service"

export function LogoutPage() {
    const hasLoggedOut = useRef(false)

    useEffect(() => {
        if (hasLoggedOut.current) return
        hasLoggedOut.current = true

        logout().catch((error) => {
            console.error("[Logout] Erro:", error)
            window.location.href = "/"
        })
    }, [])

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Saindo...</h1>
                    <p className="text-sm text-muted-foreground">
                        Aguarde enquanto encerramos sua sessão.
                    </p>
                </div>
            </div>
        </div>
    )
}
