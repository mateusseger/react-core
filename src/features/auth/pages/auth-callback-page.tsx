import { useEffect, useState } from "react"
import { handleCallback, login } from "../services/auth-service"
import { AuthLoading } from "../components/auth-loading"
import { AuthError } from "../components/auth-error"

export function AuthCallbackPage() {
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        handleCallback()
            .then((user) => {
                if (user) {
                    window.location.replace("/")
                } else {
                    return login()
                }
            })
            .catch((error) => {
                console.error("Erro no callback de autenticação:", error)
                setError("Não foi possível completar a autenticação.")
            })
    }, [])

    if (error) {
        return <AuthError title="Falha na Autenticação" message={error} />
    }

    return <AuthLoading title="Autenticando..." description="Aguarde enquanto processamos seu login." />
}
