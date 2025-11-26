// Providers globais da aplicação (Theme, Auth, Query, ErrorBoundary)
// Refatorado para aceitar configurações via props

import { type ReactNode } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"
import { AuthContextProvider, type AuthConfig } from "@/core/auth"
import { ThemeProvider } from "@/core/theme"
import { logger } from "@/utils/logger"

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const isDev = import.meta.env.DEV

    const handleReportError = () => {
        // TODO: Integrar com serviço de monitoramento (Sentry, Datadog, etc)
        logger.error("Error reported by user", error, {
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
                    <button
                        onClick={resetErrorBoundary}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Tentar Novamente
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        Recarregar Página
                    </button>
                    <button
                        onClick={handleReportError}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        Reportar Erro
                    </button>
                </div>
            </div>
        </div>
    )
}

/**
 * AppProviders - Wrapper de providers globais da aplicação
 * 
 * @param children - Conteúdo da aplicação
 * @param authConfig - Configurações de autenticação (obrigatório)
 * @param queryClient - Cliente do React Query (obrigatório)
 * @param devMode - Ativa modo de desenvolvimento (bypass de auth)
 */
export interface AppProvidersProps {
    children: ReactNode
    authConfig: AuthConfig
    devMode?: boolean
}

export function AppProviders({
    children,
    authConfig,
    devMode = false
}: AppProvidersProps) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ThemeProvider>
                <AuthContextProvider config={authConfig} devMode={devMode}>
                    {children}
                </AuthContextProvider>
            </ThemeProvider>
        </ErrorBoundary>
    )
}
