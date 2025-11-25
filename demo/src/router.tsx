// Router da aplicação demo
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout, ProtectedRoute, authRoutes, errorRoutes } from '@herval/react-core'
import { menuItems } from './config/menu'
import { projectConfig } from './config/project'
import { HomePage } from './pages/home'
import { SettingsPage } from './pages/settings'

export const router = createBrowserRouter([
    // Rotas de autenticação do core
    ...authRoutes,

    // Rotas protegidas
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppLayout menuItems={menuItems} projectConfig={projectConfig} />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'settings',
                element: <SettingsPage />,
            },
            {
                path: 'themes',
                lazy: async () => {
                    const { ThemesPage } = await import('@herval/react-core')
                    return { Component: ThemesPage }
                },
            },
        ],
    },

    // Rotas de erro do core
    ...errorRoutes,
])
