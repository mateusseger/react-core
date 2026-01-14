import { createBrowserRouter, useRouteError } from "react-router-dom"
import { authRoutes } from "../../src/features/auth"
import { errorRoutes, ErrorFallback } from "../../src/features/errors"
import { ProtectedRoute } from "../../src/features/auth"
import { AppLayout } from "../../src/shared/components/layout"
import { appConfig } from "./app-config"
import { homeRoutes } from "../features/home"

function RouteError() {
    const error = useRouteError() as Error
    return <ErrorFallback error={error} showStack={import.meta.env.DEV} />
}

const withErrorElement = (routes: Parameters<typeof createBrowserRouter>[0]) =>
    routes.map(route => ({ ...route, errorElement: <RouteError /> }))

export const router = createBrowserRouter([
    ...withErrorElement(authRoutes),

    {
        path: "/",
        element: (
            <ProtectedRoute>
                <AppLayout
                    projectConfig={appConfig.project}
                    menuItems={appConfig.menu}
                />
            </ProtectedRoute>
        ),
        children: [
            ...homeRoutes,
        ],
        errorElement: <RouteError />
    },

    ...withErrorElement(errorRoutes),
])
