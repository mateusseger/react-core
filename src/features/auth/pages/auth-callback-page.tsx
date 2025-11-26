// Página de callback após autenticação OAuth/OIDC
// Processa tokens do Keycloak e redireciona para home

import { useEffect, useState, useRef } from "react"
import { handleCallback, AUTH_ERRORS } from "@/features/auth"

const AUTH_REDIRECTS = {
    AFTER_LOGIN: "/",
    AFTER_LOGOUT: "/",
}

export function AuthCallbackPage() {
    const [error, setError] = useState<string | null>(null)
    const hasProcessed = useRef(false)

    useEffect(() => {
        if (hasProcessed.current) {
            return
        }
        hasProcessed.current = true

        const processCallback = async () => {
            try {
                const user = await handleCallback()

                if (user) {
                    window.location.href = AUTH_REDIRECTS.AFTER_LOGIN
                } else {
                    setError(AUTH_ERRORS.INVALID_USER)
                }
            } catch (err) {
                console.error("[AuthCallback] Erro ao processar callback:", err)
                setError(
                    err instanceof Error
                        ? err.message
                        : AUTH_ERRORS.CALLBACK_FAILED
                )
            }
        }

        processCallback()
    }, [])

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>

                    <h2 className="text-xl font-semibold text-foreground mb-3">
                        Falha na Autenticação
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        {error}
                    </p>

                    <button
                        onClick={() => window.location.href = AUTH_REDIRECTS.AFTER_LOGOUT}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        Voltar ao Login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6" />

                <h2 className="text-xl font-semibold mb-3">
                    Autenticando...
                </h2>
                <p className="text-sm text-muted-foreground">
                    Aguarde enquanto completamos o processo de login.
                </p>
            </div>
        </div>
    )
}
