// Rotas da feature de temas

import { type RouteObject } from "react-router-dom"
import { ThemeSettingsPage } from "./pages/theme-settings-page"

export const themeRoutes: RouteObject[] = [
    {
        path: "/themes",
        element: <ThemeSettingsPage />
    },
]
