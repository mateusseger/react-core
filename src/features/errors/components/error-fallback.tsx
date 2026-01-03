import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"

export interface ErrorFallbackProps {
    error: Error | { message: string; stack?: string | null }
    resetErrorBoundary?: () => void
    showStack?: boolean
}

export function ErrorFallback({ error, resetErrorBoundary, showStack = false }: ErrorFallbackProps) {
    const message = error?.message ?? "Erro desconhecido"
    const stack = error?.stack

    const handleRetry = () => resetErrorBoundary?.() ?? window.location.reload()

    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm text-center sm:max-w-md">
                <CardHeader className="items-center justify-items-center">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="h-7 w-7 text-destructive" />
                    </div>
                    <CardTitle className="text-xl">Algo deu errado</CardTitle>
                    <CardDescription>{message}</CardDescription>
                </CardHeader>

                {showStack && stack && (
                    <CardContent>
                        <details className="rounded-lg bg-muted p-3 text-left text-xs">
                            <summary className="cursor-pointer font-medium">Stack Trace</summary>
                            <pre className="mt-2 overflow-auto whitespace-pre-wrap text-[10px]">
                                {stack}
                            </pre>
                        </details>
                    </CardContent>
                )}

                <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={() => window.location.replace("/")} className="w-full gap-2 sm:flex-1">
                        <Home className="h-4 w-4" />
                        Voltar ao Início
                    </Button>
                    <Button onClick={handleRetry} className="w-full gap-2 sm:flex-1">
                        <RefreshCw className="h-4 w-4" />
                        Tentar Novamente
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
