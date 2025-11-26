# @herval/react-core

Biblioteca React base com layout, UI, autenticação e temas para projetos Herval.

## 📦 Instalação

```bash
npm install @herval/react-core
```

## 🚀 Início Rápido

### 1. Instalar dependências peer

```bash
npm install react react-dom react-router-dom
```

### 2. Configurar a aplicação

```typescript
// src/config/app-config.ts
import { Home, Settings, Users } from 'lucide-react'
import type { AppConfig } from '@herval/react-core'

export const appConfig: AppConfig = {
  auth: {
    authority: import.meta.env.VITE_AUTH_AUTHORITY,
    client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI,
    post_logout_redirect_uri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid profile email',
    automaticSilentRenew: true,
    loadUserInfo: true,
  },
  project: {
    name: 'Meu Projeto',
    version: '1.0.0',
  },
  menu: [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Configurações', url: '/settings', icon: Settings },
    {
      name: 'Usuários',
      icon: Users,
      subItems: [
        { name: 'Listar', url: '/users', icon: Users },
        { name: 'Criar', url: '/users/new', icon: Users },
      ],
    },
  ],
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos
        retry: 1,
      },
    },
  }),
}
```

### 3. Configurar o entry point

```typescript
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProviders } from '@herval/react-core'
import '@herval/react-core/styles'
import { router } from './router'
import { appConfig } from './config/app-config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders
      authConfig={appConfig.auth}
      queryClient={appConfig.queryClient}
    >
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
```

### 4. Configurar o router

```typescript
// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout, ProtectedRoute, authRoutes, errorRoutes } from '@herval/react-core'
import { appConfig } from './config/app-config'
import { HomePage } from './pages/home'

export const router = createBrowserRouter([
  // Rotas de auth do core
  ...authRoutes,

  // Rotas protegidas
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout
          menuItems={appConfig.menu}
          projectConfig={appConfig.project}
        />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      // Outras rotas do projeto...
    ],
  },

  // Rotas de erro do core
  ...errorRoutes,
])
```

## 🎨 Funcionalidades

### ✅ Sistema de Autenticação OIDC
- Login e logout
- Proteção de rotas
- Gerenciamento de sessão
- Suporte a roles e permissões

### ✅ Sistema de Temas
- Temas Herval, Taqi e iPlace
- Modo claro/escuro
- Customização via CSS variables

### ✅ Layout Completo
- Sidebar colapsável
- Header com breadcrumb
- Menu de navegação com submenus
- Sidebar terciário para seções

### ✅ Biblioteca de Componentes UI
- shadcn/ui components
- Componentes customizados
- Totalmente tipados com TypeScript

## 📚 API Reference

### AppProviders

Wrapper de providers globais da aplicação.

```typescript
interface AppProvidersProps {
  children: ReactNode
  authConfig: AuthConfig
  queryClient: QueryClient
  devMode?: boolean
}
```

**Props:**
- `authConfig`: Configurações de autenticação OIDC (obrigatório)
- `queryClient`: Instância do React Query Client (obrigatório)
- `devMode`: Ativa modo de desenvolvimento sem autenticação real (opcional)

### AppLayout

Layout principal com sidebar, header e conteúdo.

```typescript
interface AppLayoutProps {
  menuItems: MenuItem[]
  projectConfig: ProjectConfig
}
```

**Props:**
- `menuItems`: Itens do menu de navegação (obrigatório)
- `projectConfig`: Configurações do projeto (nome, versão, logo) (obrigatório)

### AuthConfig

```typescript
interface AuthConfig {
  authority: string
  client_id: string
  redirect_uri: string
  post_logout_redirect_uri?: string
  response_type?: string
  scope?: string
  automaticSilentRenew?: boolean
  loadUserInfo?: boolean
  silentRedirectUri?: string
}
```

### MenuItem

```typescript
interface MenuItem {
  name: string
  url?: string
  icon: LucideIcon
  roles?: string[]
  subItems?: MenuSubItem[]
}
```

### ProjectConfig

```typescript
interface ProjectConfig {
  name: string
  version: string
  logo?: string
  logoAlt?: string
}
```

## 🔧 Desenvolvimento

### Rodar a aplicação demo

```bash
npm run dev:demo
```

### Build da biblioteca

```bash
npm run build
```

## 📖 Guia de Migração

### De um projeto template para @herval/react-core

1. **Instalar o pacote:**
   ```bash
   npm install @herval/react-core
   ```

2. **Remover código duplicado:**
   - Remover `src/features/core` (auth, theme, errors)
   - Remover `src/shared/components` (layout, ui)
   - Remover `src/shared/hooks`, `context`, `utils`, `assets`

3. **Atualizar imports:**
   ```typescript
   // Antes
   import { useAuth } from '@/features/core/auth'
   import { AppLayout } from '@/shared/components/layout/app-layout'

   // Depois
   import { useAuth, AppLayout } from '@herval/react-core'
   ```

4. **Criar arquivo de configuração:**
   - Mover configurações de `src/shared/config` para um arquivo local
   - Passar configurações via props para os componentes do core

5. **Atualizar AppProviders:**
   ```typescript
   // Antes
   <AppProviders>
     <App />
   </AppProviders>

   // Depois
   <AppProviders
     authConfig={myAuthConfig}
     queryClient={myQueryClient}
   >
     <App />
   </AppProviders>
   ```

6. **Atualizar AppLayout:**
   ```typescript
   // Antes
   <AppLayout />

   // Depois
   <AppLayout
     menuItems={myMenuItems}
     projectConfig={myProjectConfig}
   />
   ```

## 🐛 Troubleshooting

### Erro: "Module not found: Can't resolve '@herval/react-core/styles'"

Certifique-se de que está importando os estilos corretamente:

```typescript
import '@herval/react-core/styles'
```

### Erro: "AuthService not initialized"

O serviço de autenticação deve ser inicializado via `AppProviders`:

```typescript
<AppProviders authConfig={config} queryClient={client}>
  {children}
</AppProviders>
```

### Componentes não estão com os estilos corretos

1. Verifique se importou os estilos no entry point
2. Verifique se o Tailwind CSS está configurado no projeto
3. Certifique-se de que não há conflitos de CSS

## 📝 Licença

Propriedade da Herval.

## 🤝 Contribuindo

Este é um projeto interno. Para contribuir, entre em contato com a equipe de desenvolvimento.

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.
