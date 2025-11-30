import { useEffect, useState, useRef } from "react"
import { Loader2, XCircle } from "lucide-react"
import { handleCallback, login } from "../services/auth-service"
import { Button } from "@/shared/components/ui/shadcn/button"

export function AuthCallbackPage() {
    const [error, setError] = useState<string | null>(null)
    const hasProcessed = useRef(false)

    useEffect(() => {
        if (hasProcessed.current) return
        hasProcessed.current = true

        handleCallback()
            .then((user) => {
                if (user) {
                    window.location.href = "/"
                } else {
                    // Token inválido ou expirado → redireciona para login
                    login()
                }
            })
            .catch((err) => {
                console.error("[AuthCallback] Erro:", err)
                const message = err instanceof Error ? err.message : "Falha na autenticação"

                // Erros de sessão/token → redireciona para login
                if (isSessionError(message)) {
                    login()
                    return
                }

                setError(message)
            })
    }, [])

    function isSessionError(message: string): boolean {
        const sessionErrors = [
            "expired",
            "invalid_grant",
            "unauthorized",
            "No matching state",
            "login_required",
        ]
        return sessionErrors.some((e) => message.toLowerCase().includes(e.toLowerCase()))
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-sm space-y-6 text-center">
                    <XCircle className="mx-auto h-12 w-12 text-destructive" />
                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold">Falha na Autenticação</h1>
                        <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                    <Button onClick={() => (window.location.href = "/")} className="w-full">
                        Voltar ao Início
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Autenticando...</h1>
                    <p className="text-sm text-muted-foreground">
                        Aguarde enquanto processamos seu login.
                    </p>
                </div>
            </div>
        </div>
    )
}
