// Rotas da feature de autenticação

import { type RouteObject } from "react-router-dom"
import { AuthCallbackPage } from "./pages/auth-callback-page"
import { LogoutPage } from "./pages/logout-page"
import { UnauthorizedPage } from "./pages/unauthorized-page"

export const authRoutes: RouteObject[] = [
    {
        path: "/auth/callback",
        element: <AuthCallbackPage />,
    },
    {
        path: "/auth/logout",
        element: <LogoutPage />,
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
    },
]
