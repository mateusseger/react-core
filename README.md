# 💙 @herval/react-core

Biblioteca React Core com componentes, features e utilitários base para aplicações corporativas Herval.

## 📋 Índice

- [Sobre](#-sobre)
- [Instalação](#-instalação)
- [Início Rápido](#-início-rápido)
- [Features](#-features)
- [Componentes](#-componentes)
- [Hooks e Utilitários](#-hooks-e-utilitários)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Desenvolvimento](#️-desenvolvimento)
- [Publicação](#-publicação)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)

## 📖 Sobre

O **@herval/react-core** é a biblioteca base que fornece componentes, features e utilitários essenciais para o desenvolvimento de aplicações React corporativas na Herval. Esta biblioteca é consumida principalmente pelo **@herval/react-template** e serve como fundação para todos os projetos React da organização.

### Principais Benefícios

- 🚀 **Features prontas**: Autenticação, temas, tratamento de erros
- 🎨 **Design System completo**: +50 componentes UI baseados em Shadcn/Radix
- 🔐 **Autenticação OIDC**: Integração nativa com Keycloak
- 🌓 **Sistema de temas**: Modos claro/escuro + temas de negócio personalizados
- 📱 **Layout responsivo**: Componentes de layout adaptáveis
- 🛠️ **Utilitários prontos**: Máscaras, validações e hooks customizados
- 📦 **TypeScript**: 100% tipado para segurança e prodprodutividade
- ⚡ **Tree-shaking**: Apenas o código necessário no bundle final

## 📥 Instalação

### Via pnpm (recomendado)

```bash
pnpm add @herval/react-core
```

### Via npm

```bash
npm install @herval/react-core
```

### Peer Dependencies

Esta biblioteca requer as seguintes dependências instaladas no seu projeto:

```bash
pnpm add react react-dom react-router-dom
pnpm add @radix-ui/react-* lucide-react tailwindcss
pnpm add oidc-client-ts framer-motion
```

> **Nota**: O **@herval/react-template** já inclui todas as dependências necessárias.

## 🚀 Início Rápido

### 1. Importar Estilos

No arquivo de estilos globais da sua aplicação (`global.css`):

```css
@import '@herval/react-core/styles';
```

### 2. Configurar Providers

```tsx
import { AuthProvider, ThemeProvider } from '@herval/react-core';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* Seu app aqui */}
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### 3. Usar Componentes

```tsx
import { 
  Button, 
  Card, 
  AppLayout, 
  useAuth, 
  useTheme 
} from '@herval/react-core';

function MyPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <AppLayout>
      <Card>
        <h1>Olá, {user?.name}!</h1>
        <Button onClick={() => setTheme('herval')}>
          Trocar Tema
        </Button>
      </Card>
    </AppLayout>
  );
}
```

## ✨ Features

### 🔐 Autenticação (`features/auth`)

Sistema completo de autenticação integrado com **Keycloak via OIDC**.

**Componentes:**
- `AuthProvider`: Provider para gerenciamento de estado de auth
- `ProtectedRoute`: Componente wrapper para proteção de rotas
- `AuthLoading`: Componente de loading durante autenticação
- `AuthError`: Componente de erro de autenticação

**Hooks:**
- `useAuth()`: Acesso ao usuário, token e funções de login/logout

**Páginas:**
- `AuthCallbackPage`: Callback do OIDC
- `UnauthorizedPage`: Página de acesso negado

**Serviços:**
- `authService`: Integração com Keycloak OIDC

**Exemplo de uso:**

```tsx
import { ProtectedRoute, useAuth } from '@herval/react-core';

function Dashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Bem-vindo, {user?.name}</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

// Proteger rota
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### 🎨 Temas (`features/themes`)

Sistema de temas com suporte a **modos de visualização** e **temas de negócio**.

**Modos:**
- `light`: Modo claro
- `dark`: Modo escuro

**Temas de Negócio:**
- `herval`: Tema padrão Herval
- `iplace`: Tema iPlace
- `taqi`: Tema Taqi
- E outros temas corporativos

**Componentes:**
- `ThemeProvider`: Provider para gerenciamento de temas

**Hooks:**
- `useTheme()`: Alternância de temas e modos

**Exemplo de uso:**

```tsx
import { useTheme } from '@herval/react-core';

function ThemeSwitcher() {
  const { theme, mode, setTheme, setMode } = useTheme();
  
  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="herval">Herval</option>
        <option value="iplace">iPlace</option>
        <option value="taqi">Taqi</option>
      </select>
      
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        {mode === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}
```

### ❌ Tratamento de Erros (`features/errors`)

Sistema completo de tratamento de erros e páginas de erro.

**Componentes:**
- `ErrorFallback`: Fallback para error boundaries
- `NotFoundPage`: Página 404 customizada

**Exemplo de uso:**

```tsx
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback, NotFoundPage } from '@herval/react-core';

// Error Boundary
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <YourApp />
</ErrorBoundary>

// Rota 404
<Route path="*" element={<NotFoundPage />} />
```

## 🧩 Componentes

### Layout

Componentes para estruturação de layouts responsivos e navegação.

```tsx
import {
  AppLayout,
  AppHeader,
  AppSidebar,
  AppSidebarMenu,
  AppSidebarSubmenu,
  AppBreadcrumb,
  AppPageHeader,
  AppPageTransition,
  AppLogo
} from '@herval/react-core';

<AppLayout>
  <AppHeader />
  <AppSidebar>
    <AppSidebarMenu />
  </AppSidebar>
  <main>
    <AppBreadcrumb />
    <AppPageHeader title="Página" />
    <AppPageTransition>
      {/* conteúdo */}
    </AppPageTransition>
  </main>
</AppLayout>
```

### UI - Componentes Shadcn/Radix

Biblioteca completa de componentes UI baseados em **Shadcn**, **Radix UI** e **Tailwind CSS**.

**Botões e Ações:**
```tsx
import { Button, ButtonGroup } from '@herval/react-core';

<Button variant="primary">Salvar</Button>
<Button variant="outline">Cancelar</Button>
<ButtonGroup>
  <Button>1</Button>
  <Button>2</Button>
  <Button>3</Button>
</ButtonGroup>
```

**Formulários e Inputs:**
```tsx
import { 
  Input, 
  InputGroup, 
  Select, 
  Checkbox, 
  Switch, 
  Field,
  DatePicker,
  Combobox
} from '@herval/react-core';

<Field label="Nome" required>
  <Input placeholder="Digite seu nome" />
</Field>

<Field label="Data">
  <DatePicker />
</Field>

<Combobox
  options={options}
  placeholder="Selecione..."
/>
```

**Cards e Containers:**
```tsx
import { Card, Separator, ScrollArea } from '@herval/react-core';

<Card>
  <Card.Header>
    <Card.Title>Título</Card.Title>
    <Card.Description>Descrição</Card.Description>
  </Card.Header>
  <Separator />
  <Card.Content>
    <ScrollArea>
      {/* conteúdo */}
    </ScrollArea>
  </Card.Content>
  <Card.Footer>
    <Button>Ação</Button>
  </Card.Footer>
</Card>
```

**Diálogos e Overlays:**
```tsx
import { 
  Dialog, 
  AlertDialog, 
  Drawer,
  DropdownMenu,
  Popover,
  HoverCard,
  Tooltip
} from '@herval/react-core';

<Dialog>
  <Dialog.Trigger asChild>
    <Button>Abrir</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Título</Dialog.Title>
    </Dialog.Header>
    {/* conteúdo */}
  </Dialog.Content>
</Dialog>
```

**Navegação:**
```tsx
import { 
  Tabs, 
  Accordion, 
  NavigationMenu,
  Menubar,
  Breadcrumb
} from '@herval/react-core';

<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Conteúdo 1</Tabs.Content>
  <Tabs.Content value="tab2">Conteúdo 2</Tabs.Content>
</Tabs>
```

**Feedback e Display:**
```tsx
import { 
  Alert, 
  Badge, 
  Skeleton, 
  Progress,
  Avatar,
  toast
} from '@herval/react-core';

<Alert variant="success">
  <Alert.Title>Sucesso!</Alert.Title>
  <Alert.Description>Operação concluída.</Alert.Description>
</Alert>

<Badge variant="success">Ativo</Badge>

// Toast notifications
toast.success('Salvo com sucesso!');
toast.error('Erro ao salvar');
```

**Tabelas e Listas:**
```tsx
import { 
  Table, 
  Sheet,
  Collapsible
} from '@herval/react-core';

<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Nome</Table.Head>
      <Table.Head>Email</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>João</Table.Cell>
      <Table.Cell>joao@email.com</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

**Outros:**
```tsx
import { 
  Calendar,
  Carousel,
  Command,
  ContextMenu,
  Label,
  RadioGroup,
  Slider,
  Sonner,
  Toggle,
  ToggleGroup
} from '@herval/react-core';
```

## 🪝 Hooks e Utilitários

### Hooks Customizados

```tsx
import { 
  useMobile,
  useBreakpoint,
  useBreadcrumbs,
  useSidebarMenu
} from '@herval/react-core';

// Detectar mobile
const isMobile = useMobile();

// Detectar breakpoint atual
const breakpoint = useBreakpoint();

// Gerenciar breadcrumbs
const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();

// Controlar sidebar
const { isOpen, toggle } = useSidebarMenu();
```

### Utilitários

```tsx
import { 
  cn,
  masks,
  regex,
  menuHelpers
} from '@herval/react-core';

// Merge de classes CSS
const className = cn('bg-red-500', isActive && 'bg-blue-500');

// Máscaras
const cpfMasked = masks.cpf('12345678900'); // 123.456.789-00
const phoneMasked = masks.phone('11999999999'); // (11) 99999-9999

// Regex
const isValidCPF = regex.cpf.test('123.456.789-00');
const isValidEmail = regex.email.test('email@example.com');

// Helpers de menu
const filteredMenu = menuHelpers.filterByRole(menu, userRoles);
```

## 📁 Estrutura do Projeto

```
react-core/
├── src/
│   ├── features/              # Features principais
│   │   ├── auth/             # Sistema de autenticação
│   │   │   ├── components/   # Componentes de auth
│   │   │   ├── context/      # Context API
│   │   │   ├── hooks/        # Hooks customizados
│   │   │   ├── pages/        # Páginas de auth
│   │   │   ├── services/     # Serviços de integração
│   │   │   ├── types/        # Tipos TypeScript
│   │   │   ├── utils/        # Utilitários
│   │   │   ├── routes.tsx    # Rotas da feature
│   │   │   └── index.ts      # Exports públicos
│   │   ├── themes/           # Sistema de temas
│   │   │   ├── config/       # Configurações de temas
│   │   │   ├── context/      # Context API
│   │   │   ├── hooks/        # Hooks customizados
│   │   │   ├── styles/       # CSS dos temas
│   │   │   ├── types/        # Tipos TypeScript
│   │   │   └── index.ts      # Exports públicos
│   │   └── errors/           # Tratamento de erros
│   │       ├── components/   # Componentes de erro
│   │       ├── pages/        # Páginas de erro
│   │       ├── routes.tsx    # Rotas da feature
│   │       └── index.ts      # Exports públicos
│   ├── shared/               # Código compartilhado
│   │   ├── components/       # Componentes compartilhados
│   │   │   ├── layout/       # Componentes de layout
│   │   │   │   ├── app-layout.tsx
│   │   │   │   ├── app-header.tsx
│   │   │   │   ├── app-sidebar-menu.tsx
│   │   │   │   ├── app-breadcrumb.tsx
│   │   │   │   └── ...
│   │   │   └── ui/           # Componentes UI
│   │   │       ├── shadcn/   # Componentes Shadcn
│   │   │       │   ├── button.tsx
│   │   │       │   ├── input.tsx
│   │   │       │   ├── dialog.tsx
│   │   │       │   └── ...
│   │   │       └── custom/   # Componentes customizados
│   │   │           ├── combobox.tsx
│   │   │           └── date-picker.tsx
│   │   ├── hooks/            # Hooks compartilhados
│   │   │   ├── use-mobile.ts
│   │   │   ├── use-breakpoint.ts
│   │   │   ├── use-breadcrumbs.ts
│   │   │   └── use-sidebar-menu.ts
│   │   ├── types/            # Tipos compartilhados
│   │   │   ├── config.ts
│   │   │   └── index.ts
│   │   └── utils/            # Utilitários compartilhados
│   │       ├── cn.ts
│   │       ├── masks.ts
│   │       ├── regex.ts
│   │       └── menu-helpers.ts
│   ├── global.css            # Estilos globais
│   └── index.ts              # Entry point principal
├── playground/               # App de desenvolvimento/testes
│   ├── app/                  # Configuração do playground
│   └── features/             # Features de exemplo
├── dist/                     # Build de produção
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Organização por Features

Cada feature segue o padrão:

```
feature-name/
├── components/     # Componentes da feature
├── context/        # Context API (se aplicável)
├── hooks/          # Hooks customizados
├── pages/          # Páginas da feature
├── services/       # Serviços e API calls
├── types/          # Tipos TypeScript
├── utils/          # Utilitários
├── routes.tsx      # Definição de rotas
└── index.ts        # Exports públicos
```

## 📜 Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento (porta 3000)
pnpm run dev
```

Inicia o playground para testar e desenvolver componentes localmente.

### Build

```bash
# Build de produção
pnpm run build
```

Gera os arquivos otimizados em `dist/`:
- `dist/index.js` - ESM bundle
- `dist/index.cjs` - CommonJS bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/react-core.css` - Estilos compilados

### Prepare (Pre-publish)

```bash
# Executado automaticamente antes do publish
pnpm run prepare
```

## 🛠️ Desenvolvimento

### Setup Local

```bash
# Clone o repositório
git clone <repo-url>
cd react-core

# Instale as dependências
pnpm install

# Inicie o playground
pnpm run dev
```

### Adicionar Novo Componente UI

```bash
# Usar CLI do Shadcn
npx shadcn@latest add <component-name>
```

### Estrutura de Desenvolvimento

O projeto inclui um **playground** completo para testar componentes e features:

- **playground/app**: Configuração da aplicação de testes
- **playground/features**: Features de exemplo e testes

### Boas Práticas

- ✅ Organize código por features, não por tipo
- ✅ Mantenha componentes pequenos e focados
- ✅ Use TypeScript para tipagem forte
- ✅ Documente props e interfaces públicas
- ✅ Teste componentes no playground antes de publicar

## 📦 Publicação

### Preparar Release

```bash
# Incrementar versão
npm version patch   # 5.0.0 → 5.0.1 (correções)
npm version minor   # 5.0.0 → 5.1.0 (novas features)
npm version major   # 5.0.0 → 6.0.0 (breaking changes)

# Build
pnpm run build

# Verificar arquivos que serão publicados
npm pack --dry-run
```

### Publicar no Azure Artifacts

```bash
npm publish
```

> **Nota**: O pacote está configurado para publicar no feed Azure DevOps da Herval (`herval-npm`).

### Versionamento Semântico

Seguimos o [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0): Breaking changes - mudanças incompatíveis com versões anteriores
- **MINOR** (0.x.0): Features - novas funcionalidades (compatível)
- **PATCH** (0.0.x): Fixes - correções de bugs

## 🔧 Tecnologias Utilizadas

### Core

- **React 19**: Biblioteca UI
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Tailwind CSS 4**: Framework CSS utilitário

### UI

- **Radix UI**: Componentes primitivos acessíveis
- **Shadcn**: Sistema de componentes
- **Lucide React**: Ícones
- **Framer Motion**: Animações
- **Sonner**: Toast notifications
- **Vaul**: Drawer component

### Autenticação

- **OIDC Client TS**: Cliente OpenID Connect
- **Keycloak**: Identity provider (integração)

### Roteamento

- **React Router DOM v7**: Navegação e rotas

### Utilitários

- **class-variance-authority**: Variantes de componentes
- **clsx**: Composição de classes CSS
- **tailwind-merge**: Merge inteligente de classes Tailwind
- **cmdk**: Command palette
- **date-fns**: Manipulação de datas
- **embla-carousel**: Carrossel

## 📄 Licença

© 2026 Herval. Todos os direitos reservados.

---

**Desenvolvido pela Equipe de Satélites - Herval**
