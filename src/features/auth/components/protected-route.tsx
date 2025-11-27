import { type ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, getUserRoles, hasAnyRole, type UserRole } from "@/features/auth"

interface ProtectedRouteProps {
    children: ReactNode
    requiredRoles?: UserRole[]
}

export function ProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()

    const userRoles = getUserRoles(user)
    const hasRequiredAccess = requiredRoles.length === 0 || hasAnyRole(userRoles, requiredRoles)

    useEffect(() => {
        if (!isAuthenticated) {
            return
        }

        if (!hasRequiredAccess) {
            navigate("/unauthorized", { replace: true })
        }
    }, [isAuthenticated, hasRequiredAccess, navigate])

    if (!isAuthenticated) {
        return null
    }

    if (!hasRequiredAccess) {
        return null
    }

    return <>{children}</>
}

