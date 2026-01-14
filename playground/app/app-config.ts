import { Home } from 'lucide-react'
import type { AppConfig } from '../../src/shared/types/config'

export const appConfig: AppConfig = {
    auth: {
        authority: import.meta.env.VITE_AUTH_AUTHORITY,
        clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
        redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI,
        postLogoutRedirectUri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
        scope: import.meta.env.VITE_AUTH_SCOPE,
        devMockRoles: import.meta.env.VITE_AUTH_DEV_MOCK_ROLES ? import.meta.env.VITE_AUTH_DEV_MOCK_ROLES.split(',') : [],
    },
    project: { title: 'Playground' },
    menu: [
        {
            name: "Home",
            url: "/",
            icon: Home
        },
    ],
}
