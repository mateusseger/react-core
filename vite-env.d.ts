/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AUTH_AUTHORITY: string
    readonly VITE_AUTH_CLIENT_ID: string
    readonly VITE_AUTH_REDIRECT_URI: string
    readonly VITE_AUTH_POST_LOGOUT_REDIRECT_URI: string
    readonly VITE_AUTH_SCOPE: string
    readonly VITE_AUTH_DEV_MODE?: 'false' | 'true'
    readonly VITE_AUTH_DEV_MOCK_ROLES?: string
    readonly VITE_API_BASE_URL: string
    readonly VITE_APP_THEME: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
