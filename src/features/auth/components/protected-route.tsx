import { type ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/use-auth"
import { hasAnyRole } from "../utils/auth-utils"

interface ProtectedRouteProps {
    children: ReactNode
    roles?: string[]
}

export function ProtectedRoute({ children, roles = [] }: ProtectedRouteProps) {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()

    const hasAccess = !roles.length || hasAnyRole(user, roles)

    useEffect(() => {
        if (isAuthenticated && !hasAccess) {
            navigate("/unauthorized", { replace: true })
        }
    }, [isAuthenticated, hasAccess, navigate])

    if (!isAuthenticated || !hasAccess) {
        return null
    }

    return <>{children}</>
}

