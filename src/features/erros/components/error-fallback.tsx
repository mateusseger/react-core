import type { FallbackProps } from "react-error-boundary"
import { Button } from "@/shared/components/ui/shadcn/button"

export type { FallbackProps as ErrorFallbackProps }

/**
 * ErrorFallback - Componente padrão para exibir erros
 *
 * Pode ser usado como fallback do ErrorBoundary ou customizado pelo consumidor
 *
 * @param error - Erro capturado
 * @param resetErrorBoundary - Função para resetar o boundary
 */
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const isDev = import.meta.env.DEV

    const handleReportError = () => {
        // TODO: Integrar com serviço de monitoramento (Sentry, Datadog, etc)
        console.error("Error reported by user", error, {
            timestamp: new Date().toISOString(),
        })
        alert("Erro reportado com sucesso!")
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-6 bg-background">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Algo deu errado</h2>
                    <p className="text-muted-foreground mb-4">{error.message}</p>
                </div>

                {isDev && error.stack && (
                    <details className="mb-6 p-4 rounded-lg bg-muted text-sm">
                        <summary className="cursor-pointer font-medium mb-2">
                            Stack Trace (Dev Mode)
                        </summary>
                        <pre className="overflow-auto text-xs">{error.stack}</pre>
                    </details>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={resetErrorBoundary}>
                        Tentar Novamente
                    </Button>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Recarregar Página
                    </Button>
                    <Button variant="outline" onClick={handleReportError}>
                        Reportar Erro
                    </Button>
                </div>
            </div>
        </div>
    )
}
