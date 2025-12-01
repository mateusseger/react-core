# PROMPT: Gerar README Completo do @herval/react-core

## Contexto

Você é um especialista em documentação técnica. Gere um README.md **completo, detalhado e profissional** para a biblioteca `@herval/react-core`, uma biblioteca React para aplicações empresariais do grupo Herval.

---

## Informações do Projeto

### Descrição Geral
- **Nome do pacote:** `@herval/react-core`
- **Versão:** 1.0.0
- **Descrição:** Biblioteca React Core com layout, UI, autenticação, temas e tratamento de erros
- **Tipo:** Biblioteca NPM (module + CommonJS)
- **Exports:**
  - `@herval/react-core` → componentes e funcionalidades principais
  - `@herval/react-core/styles` → arquivo CSS da biblioteca

### Stack Tecnológica
- React 18/19
- TypeScript
- Tailwind CSS v4
- Vite (build)
- Radix UI (primitivos de acessibilidade)
- Framer Motion (animações)
- OIDC Client TS (autenticação OpenID Connect)
- shadcn/ui (componentes base)

---

## Estrutura do Projeto

```
react-core/
├── src/
│   ├── index.ts                 # Entry point - exporta tudo
│   ├── global.css               # Estilos globais + temas
│   │
│   ├── features/
│   │   ├── auth/                # Feature de autenticação
│   │   │   ├── components/      # ProtectedRoute
│   │   │   ├── context/         # AuthProvider, AuthContext
│   │   │   ├── hooks/           # useAuth
│   │   │   ├── pages/           # AuthCallbackPage, UnauthorizedPage
│   │   │   ├── services/        # auth-service (OIDC)
│   │   │   ├── types/           # User, AuthConfig, UserProfile
│   │   │   ├── utils/           # hasRole, hasAnyRole, getUserDisplayName
│   │   │   └── routes.tsx       # Rotas de autenticação
│   │   │
│   │   ├── themes/              # Feature de temas
│   │   │   ├── config/          # THEMES, DEFAULT_THEME
│   │   │   ├── context/         # ThemeProvider
│   │   │   ├── hooks/           # useTheme
│   │   │   ├── styles/          # themes.css (Herval, Taqi, iPlace, Retro)
│   │   │   └── types/           # ThemeConfig, ThemeMode, ThemeName
│   │   │
│   │   └── errors/              # Feature de erros
│   │       ├── components/      # ErrorFallback
│   │       ├── pages/           # NotFoundPage
│   │       └── routes.tsx       # Rota wildcard (*)
│   │
│   └── shared/
│       ├── assets/              # Logos das marcas (Herval, Taqi, iPlace)
│       ├── components/
│       │   ├── layout/          # Componentes de layout
│       │   │   ├── AppLayout
│       │   │   ├── AppHeader
│       │   │   ├── AppSidebarMenu
│       │   │   ├── AppSidebarSubmenu
│       │   │   ├── AppBreadcrumb
│       │   │   ├── AppPageTransition
│       │   │   └── detail-sections/  # Sistema de seções (DetailSectionsProvider, Section)
│       │   │
│       │   └── ui/
│       │       ├── shadcn/      # 28+ componentes shadcn/ui
│       │       └── custom/      # Componentes customizados (DetailPageSkeleton)
│       │
│       ├── hooks/
│       │   ├── useBreakpoint    # Breakpoints responsivos
│       │   ├── useMobile        # Detecção de mobile
│       │   └── useSidebarMenu   # Gerenciamento de menu lateral
│       │
│       ├── types/
│       │   └── config.ts        # AppConfig, MenuItem, ProjectConfig
│       │
│       └── utils/
│           ├── cn.ts            # Utilitário clsx + tailwind-merge
│           └── menu-helpers.ts  # Filtro de menu por roles
```

---

## Features Detalhadas

### 1. Autenticação (Auth)

#### Componentes e Hooks
- **AuthProvider**: Context provider que gerencia estado de autenticação
- **useAuth**: Hook para acessar user, isAuthenticated, isLoading, logout
- **ProtectedRoute**: Componente wrapper para rotas protegidas por roles

#### Tipos
```typescript
interface User {
  profile: UserProfile
  roles: string[]
  accessToken: string
}

interface AuthConfig {
  authority: string          // URL do servidor OIDC
  clientId: string           // Client ID
  redirectUri: string        // URI de callback
  postLogoutRedirectUri?: string
  scope?: string             // Default: "openid profile email offline_access"
  devMockRoles?: string[]    // Roles para modo dev
  publicRoutes?: string[]    // Rotas públicas
}
```

#### Funcionalidades
- Login via OIDC (OpenID Connect)
- Refresh automático de tokens
- Sincronização cross-tab (logout em uma aba reflete nas outras)
- **Modo de desenvolvimento**: `devMode={true}` para bypass de autenticação
- Rotas públicas configuráveis
- Utilitários: `hasRole`, `hasAnyRole`, `hasAllRoles`, `getUserDisplayName`, `getUserInitials`

#### Rotas Incluídas
- `/auth/callback` - Callback do OIDC
- `/unauthorized` - Página de acesso negado

---

### 2. Temas (Themes)

#### Configuração
```typescript
const THEMES = [
  { id: "herval", name: "Herval", primary: "#e10000" },
  { id: "taqi", name: "Taqi", primary: "#eb5c2e" },
  { id: "iplace", name: "iPlace", primary: "#c6d30d" },
] as const

type ThemeMode = "light" | "dark"
```

#### Provider e Hook
- **ThemeProvider**: Gerencia nome do tema e modo (light/dark)
- **useTheme**: Retorna `{ theme, setThemeName, setThemeMode, toggleMode }`

#### Funcionalidades
- Persistência em localStorage
- Suporte a variável de ambiente `VITE_APP_THEME`
- Modo claro/escuro com toggle
- CSS variables para customização total
- Tema "retro" com design diferenciado (fontes, cores, sombras customizadas)

---

### 3. Erros (Errors)

#### Componentes
- **ErrorFallback**: Componente para error boundaries com opções de retry e voltar
- **NotFoundPage**: Página 404 estilizada

#### Rotas Incluídas
- `*` - Rota wildcard para 404

---

### 4. Layout

#### AppLayout
Componente principal que agrupa:
- Sidebar com menu de navegação
- Header com breadcrumb e avatar do usuário
- Sistema de transição de páginas
- Toaster para notificações
- Sistema de seções para páginas de detalhe

```tsx
<AppLayout 
  menuItems={menuItems} 
  projectConfig={projectConfig} 
/>
```

#### AppHeader
- SidebarTrigger (toggle do menu)
- Breadcrumb automático baseado na URL
- Avatar do usuário com dropdown (logout)

#### AppSidebarMenu
- Navegação com ícones
- Suporte a submenus
- Filtro automático por roles do usuário
- Logos dinâmicos por tema
- Toggle de modo claro/escuro
- Responsivo (drawer em mobile, sidebar em desktop)
- Modo "collapsible icon" para sidebar minimalista

#### AppPageTransition
- Animações suaves entre páginas usando Framer Motion
- Fade + slide up effect

#### Detail Sections
Sistema para páginas de detalhe com navegação por seções:

```tsx
<Section id="dados-gerais" label="Dados Gerais" icon={Info}>
  <Section.Header id="dados-gerais" label="Dados Gerais" icon={Info} />
  <div>Conteúdo...</div>
</Section>
```

- **DetailSectionsProvider**: Gerencia registro e scroll
- **Section**: Componente para declarar seções
- ** SectionsSidebar**: Sidebar de navegação entre seções
- Scroll suave com offset do header
- Detecção automática da seção ativa
- Acessibilidade (aria-labelledby, role="region")

---

### 5. Componentes UI (shadcn/ui)

28+ componentes prontos:
- **Feedback**: Alert, Badge, Progress, Skeleton, Spinner, Sonner (toast)
- **Formulários**: Button, Input, Textarea, Checkbox, Switch, Select, Label, Calendar
- **Layout**: Card, Separator, Tabs
- **Overlay**: Dialog, Drawer, Sheet, Popover, Dropdown Menu, Tooltip
- **Navegação**: Breadcrumb, Sidebar (completo com sub-componentes)
- **Data**: Avatar, Table
- **Interação**: Collapsible

---

### 6. Hooks Utilitários

#### useBreakpoint
```typescript
const isMobile = useBreakpoint("md") // true se < 768px
const isSmall = useBreakpoint("sm", { 
  onEnter: () => console.log("Entrou no breakpoint") 
})
```

Breakpoints: `sm` (640), `md` (768), `lg` (1024), `xl` (1280), `2xl` (1536)

#### useMobile
```typescript
const isMobile = useMobile() // Shortcut para useBreakpoint("md")
```

#### useSidebarMenu
Hook interno para gerenciamento do menu lateral com filtro por roles.

---

### 7. Assets

Logos incluídos para cada marca:
- `logoHervalLight`, `logoHervalDark`
- `logoTaqiLight`, `logoTaqiDark`
- `logoIplaceLight`, `logoIplaceDark`

Objeto consolidado:
```typescript
import { logos } from "@herval/react-core"
logos.herval.light // caminho para o logo
```

---

### 8. Utilitários

#### cn
```typescript
import { cn } from "@herval/react-core"
cn("base-class", condition && "conditional-class", "another-class")
```

#### filterMenuItemsByRoles
```typescript
import { filterMenuItemsByRoles } from "@herval/react-core"
const visibleItems = filterMenuItemsByRoles(menuItems, userRoles)
```

---

## Requisitos para o README

O README deve conter:

1. **Badges** (npm, license, build status placeholder)

2. **Descrição** clara e objetiva da biblioteca

3. **Instalação** (npm/yarn/pnpm)

4. **Peer Dependencies** listadas

5. **Quick Start** com exemplo mínimo funcional

6. **Configuração Completa** com exemplo de:
   - app-config.ts
   - app-router.tsx
   - main.tsx

7. **Guia de Features** detalhado:
   - Autenticação (setup, uso, modo dev)
   - Temas (configuração, customização)
   - Layout (AppLayout, menu, breadcrumb)
   - Componentes UI (lista com exemplos)
   - Hooks e utilitários

8. **Padrões e Boas Práticas**:
   - Feature-based architecture
   - Mobile-first design
   - Acessibilidade (ARIA, semantic HTML)
   - Controle de acesso por roles
   - Tipagem forte com TypeScript

9. **Customização**:
   - Como criar novos temas
   - Como adicionar componentes
   - Como estender funcionalidades

10. **API Reference** com tabelas de props para componentes principais

11. **Troubleshooting** comum

12. **Contribuição** (se aplicável)

13. **License**

---

## Estilo do README

- Use **português brasileiro**
- Formatação limpa com Markdown
- Blocos de código com syntax highlighting
- Tabelas para props/tipos
- Emojis para seções (moderadamente)
- Links âncora para navegação
- Exemplos práticos e funcionais

---

## Output Esperado

Gere o conteúdo completo do README.md pronto para ser salvo no projeto.
