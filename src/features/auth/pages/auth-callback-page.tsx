import { useEffect, useState } from "react"
import { Loader2, XCircle, Home } from "lucide-react"
import { handleCallback, login } from "../services/auth-service"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"

const SESSION_ERRORS = ["expired", "invalid_grant", "unauthorized", "No matching state", "login_required"]

function isSessionError(message: string): boolean {
    return SESSION_ERRORS.some((err) => message.toLowerCase().includes(err.toLowerCase()))
}

export function AuthCallbackPage() {
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        handleCallback()
            .then((user) => {
                if (user) {
                    window.location.href = "/"
                } else {
                    login()
                }
            })
            .catch((err) => {
                const message = err instanceof Error ? err.message : "Falha na autenticação"
                isSessionError(message) ? login() : setError(message)
            })
    }, [])

    if (error) {
        return (
            <div className="flex min-h-svh items-center justify-center bg-background p-4">
                <Card className="w-full max-w-sm text-center">
                    <CardHeader className="items-center justify-items-center">
                        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                            <XCircle className="h-7 w-7 text-destructive" />
                        </div>
                        <CardTitle className="text-xl">Falha na Autenticação</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={() => (window.location.href = "/")} className="w-full gap-2">
                            <Home className="h-4 w-4" />
                            Voltar ao Início
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm border-0 text-center shadow-none">
                <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <div className="space-y-1">
                        <h1 className="text-lg font-semibold">Autenticando...</h1>
                        <p className="text-sm text-muted-foreground">Aguarde enquanto processamos seu login.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
