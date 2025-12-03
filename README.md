# @herval/react-core

![NPM Version](https://img.shields.io/npm/v/@herval/react-core)
![License](https://img.shields.io/npm/l/@herval/react-core)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

Biblioteca React Core desenvolvida para padronizar e acelerar o desenvolvimento de aplicações empresariais do grupo Herval. Inclui sistema completo de layout, componentes de UI baseados em shadcn/ui, autenticação OIDC, gerenciamento de temas multi-marca e tratamento de erros.

---

## 📋 Índice

- [Instalação](#-instalação)
- [Peer Dependencies](#-peer-dependencies)
- [Quick Start](#-quick-start)
- [Configuração](#-configuração)
- [Features](#-features)
  - [Autenticação](#autenticação)
  - [Temas](#temas)
  - [Layout](#layout)
  - [Componentes UI](#componentes-ui)
  - [Hooks Utilitários](#hooks-utilitários)
- [Padrões e Boas Práticas](#-padrões-e-boas-práticas)
- [API Reference](#-api-reference)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Instalação

```bash
npm install @herval/react-core
# ou
yarn add @herval/react-core
# ou
pnpm add @herval/react-core
```

Certifique-se de importar o CSS global no ponto de entrada da sua aplicação (ex: `main.tsx` ou `App.tsx`):

```typescript
import "@herval/react-core/styles";
```

---

## 📦 Peer Dependencies

Esta biblioteca depende das seguintes bibliotecas que devem estar instaladas no seu projeto:

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "react-router-dom": "^7.0.0",
  "oidc-client-ts": "^3.1.0",
  "framer-motion": "^12.0.0",
  "lucide-react": "^0.400.0",
  "sonner": "^2.0.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^3.4.0"
}
```

Além disso, diversos pacotes `@radix-ui/*` são necessários para os componentes de UI.

---

## ⚡ Quick Start

Exemplo mínimo de configuração no `main.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider, ThemeProvider } from '@herval/react-core'
import "@herval/react-core/styles" // Importante: estilos globais
import { router } from './app-router'
import { authConfig } from './app-config'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider config={authConfig} devMode={import.meta.env.DEV}>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
```

---

## ⚙️ Configuração

### 1. Configuração da Aplicação (`app-config.ts`)

Defina as configurações de autenticação, menu e projeto.

```typescript
import { AppConfig } from "@herval/react-core";
import { Home, Users } from "lucide-react";

export const appConfig: AppConfig = {
  project: {
    name: "Minha App Herval",
    version: "1.0.0",
    // logo: opcional, usa o logo do tema por padrão
  },
  auth: {
    authority: "https://sso.herval.com.br/auth/realms/herval",
    clientId: "minha-app-client-id",
    redirectUri: window.location.origin + "/auth/callback",
    postLogoutRedirectUri: window.location.origin,
    scope: "openid profile email offline_access",
    devMockRoles: ["admin", "user"], // Roles simuladas em devMode
  },
  menu: [
    {
      name: "Início",
      url: "/",
      icon: Home,
    },
    {
      name: "Administração",
      icon: Users,
      roles: ["admin"], // Visível apenas para role 'admin'
      subItems: [
        { name: "Usuários", url: "/admin/users", icon: Users },
      ]
    }
  ]
};
```

### 2. Roteador (`app-router.tsx`)

Configure as rotas utilizando o `AppLayout` e as rotas utilitárias da biblioteca.

```tsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppLayout, authRoutes, errorRoutes, ProtectedRoute } from "@herval/react-core";
import { appConfig } from "./app-config";

export const router = createBrowserRouter([
  {
    element: (
      <AppLayout 
        menuItems={appConfig.menu} 
        projectConfig={appConfig.project} 
      />
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Rotas de autenticação (/auth/callback, /unauthorized)
  ...authRoutes,
  // Rota de erro 404 (*)
  ...errorRoutes,
]);
```

---

## 🧩 Features

### Autenticação

O sistema utiliza `oidc-client-ts` para autenticação OpenID Connect.

- **AuthProvider**: Gerencia o estado global de autenticação.
- **useAuth**: Hook para acessar dados do usuário.
- **ProtectedRoute**: Protege rotas baseadas em roles.
- **Modo Desenvolvimento**: Defina `devMode={true}` no `AuthProvider` para simular um usuário logado sem precisar do servidor SSO.

```tsx
const { user, logout, isAuthenticated } = useAuth();

console.log(user?.profile.name);
console.log(user?.roles);
```

### Temas

Suporte nativo para múltiplos temas visuais das empresas do grupo.

- **Temas Disponíveis**: `herval` (Vermelho), `taqi` (Laranja), `iplace` (Verde-limão).
- **Modos**: `light` e `dark`.
- **Persistência**: Salva preferência no `localStorage`.

```tsx
const { theme, setThemeName, toggleMode } = useTheme();

// Mudar para tema Taqi
setThemeName("taqi");

// Alternar Light/Dark
toggleMode();
```

### Erros

Sistema de tratamento de erros com componentes e rotas pré-configuradas.

- **ErrorFallback**: Componente para exibição de erros genéricos com opção de retry.
- **NotFoundPage**: Página 404 estilizada e consistente.
- **errorRoutes**: Rotas utilitárias para captura de páginas não encontradas.

```tsx
import { createBrowserRouter } from "react-router-dom";
import { errorRoutes, ErrorFallback } from "@herval/react-core";

// Adicione errorRoutes ao seu router para capturar rotas não encontradas
export const router = createBrowserRouter([
  // ... suas rotas
  ...errorRoutes, // Rota 404 (*)
]);

// Use ErrorFallback para error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

### Layout

O `AppLayout` fornece uma estrutura responsiva completa "out-of-the-box":

- **Sidebar**: Menu lateral colapsável, responsivo (drawer em mobile), com suporte a submenus e filtro de permissões.
- **Header**: Breadcrumbs automáticos, avatar do usuário e logout.
- **Page Transition**: Animações suaves de entrada/saída entre rotas.
- **Detail Sections**: Sistema de navegação interna para páginas longas (scroll spy).

#### Usando Detail Sections

Para páginas de detalhe com muito conteúdo, use o sistema de seções:

```tsx
import { Section } from "@herval/react-core";
import { Info, Settings } from "lucide-react";

export function MinhaPaginaDetalhe() {
  return (
    <div className="space-y-8">
      <Section id="geral" label="Geral" icon={Info}>
        <Section.Header id="geral" label="Geral" icon={Info} />
        <Card>...</Card>
      </Section>

      <Section id="config" label="Configurações" icon={Settings}>
        <Section.Header id="config" label="Configurações" icon={Settings} />
        <Card>...</Card>
      </Section>
    </div>
  );
}
```

### Componentes UI

A biblioteca exporta mais de 28 componentes baseados no **shadcn/ui**, estilizados e acessíveis via Radix UI.

Importação:
```tsx
import { Button, Input, Card, Dialog, useToast } from "@herval/react-core";
```

Lista parcial de componentes:
- **Form**: Button, Input, Select, Checkbox, Switch, Form, Label
- **Feedback**: Alert, Badge, Skeleton, Spinner, Sonner (Toast)
- **Overlay**: Dialog, Sheet, Popover, Tooltip, DropdownMenu
- **Layout**: Card, Separator, Tabs, ScrollArea

### Hooks Utilitários

- **`useBreakpoint(breakpoint)`**: Retorna `true` se a tela for menor que o breakpoint (`sm`, `md`, `lg`, `xl`, `2xl`).
- **`useMobile()`**: Atalho para `useBreakpoint("md")`.
- **`cn(...)`**: Utilitário para combinar classes Tailwind condicionalmente (clsx + tailwind-merge).

### Validação e Máscaras

A biblioteca fornece utilitários para validação e formatação de inputs comuns em aplicações brasileiras.

#### Regex

Expressões regulares pré-definidas para validação:

```typescript
import { REGEX, testRegex } from "@herval/react-core";

// Uso direto
const isValidEmail = REGEX.EMAIL.test("user@example.com");
const isValidCPF = REGEX.CPF.test("123.456.789-00");

// Ou via função helper
const isValid = testRegex("PHONE_BR", "(11) 98765-4321");
```

**Principais regex disponíveis:**

| Chave | Descrição | Exemplo |
|-------|-----------|---------|
| `EMAIL` | Email válido | `user@example.com` |
| `PHONE_BR` | Telefone BR | `(11) 98765-4321` |
| `CPF` | CPF formatado | `123.456.789-00` |
| `CNPJ` | CNPJ formatado | `12.345.678/0001-90` |
| `CEP` | CEP formatado | `01234-567` |

#### Máscaras

Funções para formatação automática de inputs:

```typescript
import { maskPhone, maskCPF, maskCurrency, applyMask, unmask } from "@herval/react-core";

// Uso direto
const phone = maskPhone("11987654321"); // "(11) 98765-4321"
const cpf = maskCPF("12345678900"); // "123.456.789-00"
const money = maskCurrency("123456"); // "R$ 1.234,56"

// Via função genérica
const formatted = applyMask("cnpj", "12345678000190"); // "12.345.678/0001-90"

// Remover máscara
const numbers = unmask("(11) 98765-4321"); // "11987654321"
```

**Principais máscaras disponíveis:**

| Função | Descrição |
|--------|-----------|
| `maskPhone` | Telefone BR com DDD |
| `maskCPF` | CPF com pontos e traço |
| `maskCNPJ` | CNPJ completo |
| `maskCEP` | CEP com traço |
| `maskCurrency` | Moeda brasileira |

#### Uso com React Hook Form + Zod

```typescript
import { z } from "zod";
import { REGEX, maskPhone, unmask } from "@herval/react-core";

const schema = z.object({
  telefone: z
    .string()
    .regex(REGEX.PHONE_BR, "Telefone inválido")
    .optional()
    .or(z.literal("")),
  cpf: z
    .string()
    .regex(REGEX.CPF, "CPF inválido"),
});

// No componente, aplique a máscara no onChange
<Input
  {...field}
  onChange={(e) => field.onChange(maskPhone(e.target.value))}
/>
```

---

## 🛡️ Padrões e Boas Práticas

1.  **Mobile-First**: Todos os componentes de layout e UI são responsivos por padrão.
2.  **Acessibilidade**: Uso extensivo de Radix UI garante navegação por teclado e suporte a leitores de tela (ARIA).
3.  **Feature-Based**: Arquitetura interna organizada por features (`auth`, `themes`, `errors`), facilitando manutenção.
4.  **Tipagem Estrita**: TypeScript é utilizado em todo o core para garantir segurança de tipos e DX (Developer Experience).

---

## 📚 API Reference

### `AuthProvider` Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `config` | `AuthConfig` | Sim | Configurações do OIDC (authority, clientId, etc) |
| `devMode` | `boolean` | Não | Se `true`, bypassa o SSO e usa mock user |
| `children` | `ReactNode` | Sim | Componentes filhos |

### `AppLayout` Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `menuItems` | `MenuItem[]` | Sim | Estrutura do menu lateral |
| `projectConfig` | `ProjectConfig` | Sim | Nome do projeto, versão e logo opcional |

### `Section` Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `id` | `string` | Sim | ID único para âncora e URL |
| `label` | `string` | Sim | Nome exibido na sidebar de navegação |
| `icon` | `LucideIcon` | Não | Ícone opcional |
| `children` | `ReactNode` | Sim | Conteúdo da seção |

---

## 🔧 Troubleshooting

**Erro: Estilos não carregam**
Verifique se você importou `@herval/react-core/styles` no seu arquivo de entrada (`main.tsx`).

**Erro: Loop de redirecionamento no Login**
Verifique se a `redirectUri` no `authConfig` corresponde exatamente à URL configurada no servidor OIDC (Keycloak/IdentityServer) e se a rota `/auth/callback` está registrada no seu Router.

**Erro: Ícones não aparecem**
Certifique-se de ter `lucide-react` instalado no projeto principal.

---

## 📄 Licença

Proprietário: Grupo Herval. Todos os direitos reservados.
