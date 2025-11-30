import type { RouteObject } from "react-router-dom"
import { AuthCallbackPage } from "./pages/auth-callback-page"
import { UnauthorizedPage } from "./pages/unauthorized-page"

export const authRoutes: RouteObject[] = [
    {
        path: "/auth/callback",
        element: <AuthCallbackPage />
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />
    },
]
