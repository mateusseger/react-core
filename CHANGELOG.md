# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-11-25

### Adicionado
- Sistema completo de autenticação OIDC com Keycloak
- Sistema de temas (Herval, Taqi, iPlace) com modo claro/escuro
- Layout base com sidebar colapsável, header e breadcrumb
- Menu de navegação com suporte a submenus e permissões
- Sidebar terciário para seções de detalhes
- Biblioteca completa de componentes shadcn/ui
- Componentes customizados (DetailPageSkeleton, ScrollingText)
- Sistema de providers globais (Auth, Theme, Query, ErrorBoundary)
- Hooks utilitários (useMobile, useSidebarMenu, useAuth, useTheme)
- Proteção de rotas com ProtectedRoute
- Tratamento centralizado de erros
- Suporte completo a TypeScript
- Aplicação demo para desenvolvimento e teste
- Documentação completa em português
- 📊 Logger service estruturado e configurável
- 📚 JSDoc completo em 24+ funções públicas com exemplos

### Melhorias de Qualidade (Revisão Completa)
- 🔧 Refatorado auth-service: modularizado em 3 arquivos (auth-service, auth-mock, auth-enrichment)
- 🎯 Type safety aprimorado: removido `any` de UserProfile, agora usa `unknown`
- 📝 Logger estruturado com níveis configuráveis (debug, info, warn, error)
- ⚡ Performance: React.memo em AppLayout, useMemo em context providers
- 🌍 Mensagens de erro em inglês para internacionalização
- 📖 JSDoc completo com @param, @returns, @throws e @example
- 🧹 Código duplicado eliminado, SRP aplicado
- 🔒 Removidas dependências de import.meta.env em runtime

### Características
- 🎯 Zero configurações hard-coded - tudo via props
- 📦 Distribuível via NPM
- 🎨 Customizável via CSS variables
- 🔐 Autenticação OIDC completa
- ✅ Arquitetura modular e escalável
- ⚡ Performance otimizada com memoização estratégica
- 🎭 Múltiplos temas com modo claro/escuro
- 📱 Responsivo (mobile-first)
- ♿ Acessível (ARIA compliant)
- 🚀 Performance otimizada
- 📚 Totalmente documentado
- 🧪 App demo incluída

### Requisitos
- React ^19.0.0
- React DOM ^19.0.0
- React Router DOM ^7.0.0
- @tanstack/react-query ^5.0.0

### Peer Dependencies
Certifique-se de instalar as peer dependencies no seu projeto consumidor.
