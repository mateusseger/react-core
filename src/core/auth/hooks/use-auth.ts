// Hook de autenticação - Fornece acesso ao contexto de autenticação

import { useContext } from "react"
import { AuthContext } from "@/core/auth"

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider")
    }

    return context
}
