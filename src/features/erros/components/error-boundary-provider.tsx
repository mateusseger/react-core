import { type ReactNode, type ComponentType } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"
import { ErrorFallback } from "./error-fallback"

/**
 * ErrorBoundaryProvider - Provider para capturar erros de runtime
 * 
 * Wrapper do react-error-boundary com fallback customizável
 * 
 * @param children - Conteúdo protegido pelo boundary
 * @param fallback - Componente customizado para exibir erros (opcional, usa ErrorFallback por padrão)
 * @param onError - Callback chamado quando erro é capturado (opcional)
 * @param onReset - Callback chamado quando boundary é resetado (opcional)
 * 
 * @example
 * ```tsx
 * // Uso padrão
 * <ErrorBoundaryProvider>
 *   <App />
 * </ErrorBoundaryProvider>
 * 
 * // Com fallback customizado
 * <ErrorBoundaryProvider fallback={CustomErrorPage}>
 *   <App />
 * </ErrorBoundaryProvider>
 * 
 * // Com callbacks
 * <ErrorBoundaryProvider 
 *   onError={(error, info) => logToSentry(error, info)}
 *   onReset={() => navigate('/')}
 * >
 *   <App />
 * </ErrorBoundaryProvider>
 * ```
 */
export interface ErrorBoundaryProviderProps {
    children: ReactNode
    fallback?: ComponentType<FallbackProps>
    onError?: (error: Error, info: { componentStack?: string | null }) => void
    onReset?: () => void
}

export function ErrorBoundaryProvider({
    children,
    fallback: FallbackComponent = ErrorFallback,
    onError,
    onReset
}: ErrorBoundaryProviderProps) {
    return (
        <ErrorBoundary
            FallbackComponent={FallbackComponent}
            onError={onError}
            onReset={onReset}
        >
            {children}
        </ErrorBoundary>
    )
}
