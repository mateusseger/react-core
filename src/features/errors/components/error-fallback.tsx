import { Button } from "@/shared/components/ui/shadcn/button"
import { cn } from "@/shared/utils/cn"

export interface ErrorFallbackProps {
    error: Error | { message: string; stack?: string | null }
    resetErrorBoundary?: () => void
    showStack?: boolean
}

export function ErrorFallback({ error, resetErrorBoundary, showStack = false }: ErrorFallbackProps) {
    const message = error?.message ?? "Erro desconhecido"
    const stack = error?.stack

    const handleRetry = () => resetErrorBoundary?.() ?? window.location.reload()
    const handleBack = () => window.history.length > 1 ? window.history.back() : (window.location.href = "/")

    return (
        <div className={cn(
            "flex min-h-screen items-center justify-center bg-background",
            "p-4 sm:p-6"
        )}>
            <div className="w-full max-w-lg sm:max-w-2xl">
                <div className="text-center mb-6 sm:mb-8">
                    <div className={cn(
                        "inline-flex items-center justify-center rounded-full bg-destructive/10",
                        "w-12 h-12 sm:w-16 sm:h-16",
                        "mb-3 sm:mb-4"
                    )}>
                        <span className="text-2xl sm:text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Algo deu errado</h2>
                    <p className="text-sm sm:text-base text-muted-foreground">{message}</p>
                </div>

                {showStack && stack && (
                    <details className={cn(
                        "mb-4 sm:mb-6 rounded-lg bg-muted",
                        "p-3 sm:p-4",
                        "text-xs sm:text-sm"
                    )}>
                        <summary className="cursor-pointer font-medium mb-2">
                            Stack Trace
                        </summary>
                        <pre className="overflow-auto text-[10px] sm:text-xs whitespace-pre-wrap">
                            {stack}
                        </pre>
                    </details>
                )}

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                    <Button onClick={handleRetry} className="w-full sm:w-auto">
                        Tentar Novamente
                    </Button>
                    <Button variant="outline" onClick={handleBack} className="w-full sm:w-auto">
                        Voltar
                    </Button>
                </div>
            </div>
        </div>
    )
}
