// Rotas da feature de temas

import { type RouteObject } from "react-router-dom"
import { ProtectedRoute, USER_ROLES } from "@/core/auth"
import { ThemeSettingsPage } from "./pages/theme-settings-page"

export const themeRoutes: RouteObject[] = [
    {
        path: "/themes",
        element: (
            <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
                <ThemeSettingsPage />
            </ProtectedRoute>
        ),
    },
]
