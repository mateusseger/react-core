import { useEffect, useState, useRef } from "react"
import { Loader2, XCircle } from "lucide-react"
import { handleCallback, AUTH_ERRORS } from "@/features/auth"
import { Button } from "@/shared/components/ui/shadcn/button"

const REDIRECT_HOME = "/"

export function AuthCallbackPage() {
    const [error, setError] = useState<string | null>(null)
    const hasProcessed = useRef(false)

    useEffect(() => {
        if (hasProcessed.current) return
        hasProcessed.current = true

        const processCallback = async () => {
            try {
                const user = await handleCallback()
                if (user) {
                    window.location.href = REDIRECT_HOME
                } else {
                    setError(AUTH_ERRORS.INVALID_USER)
                }
            } catch (err) {
                console.error("[AuthCallback] Erro:", err)
                setError(err instanceof Error ? err.message : AUTH_ERRORS.CALLBACK_FAILED)
            }
        }

        processCallback()
    }, [])

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-sm space-y-6 text-center">
                    <XCircle className="mx-auto h-12 w-12 text-destructive" />
                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold">Falha na Autenticação</h1>
                        <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                    <Button onClick={() => (window.location.href = REDIRECT_HOME)} className="w-full">
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
