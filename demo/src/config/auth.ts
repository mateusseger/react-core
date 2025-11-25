// Configuração de autenticação para a demo
import type { AuthConfig } from '@herval/react-core'

export const authConfig: AuthConfig = {
    authority: import.meta.env.VITE_AUTH_AUTHORITY || 'http://localhost:8080/realms/herval',
    client_id: import.meta.env.VITE_AUTH_CLIENT_ID || 'react-app',
    redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI || `${window.location.origin}/auth/callback`,
    post_logout_redirect_uri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI || window.location.origin,
    response_type: 'code',
    scope: 'openid profile email',
    automaticSilentRenew: true,
    loadUserInfo: true,
}
