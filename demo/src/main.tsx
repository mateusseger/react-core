// Entry point da aplicação demo
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProviders } from '@herval/react-core'
import '@herval/react-core/styles'
import { router } from './router'
import { authConfig } from './config/auth'
import { queryClient } from './config/query-client'

// Modo de desenvolvimento: bypass de autenticação
const devMode = import.meta.env.VITE_DEV_AUTH_BYPASS === 'true'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProviders
            authConfig={authConfig}
            queryClient={queryClient}
            devMode={devMode}
        >
            <RouterProvider router={router} />
        </AppProviders>
    </StrictMode>,
)
