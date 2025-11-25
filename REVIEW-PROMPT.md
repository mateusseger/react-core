# PROMPT: Revisão e Otimização @herval/react-core

## Contexto

Você é um arquiteto de software sênior especializado em React, TypeScript e arquitetura de bibliotecas NPM. O projeto **@herval/react-core** é uma biblioteca React que fornece infraestrutura base (autenticação OIDC, temas, layout, UI components) para ser consumida por múltiplos projetos.

**Localização:** `c:\Develop\testes\react-core\`

## Objetivo da Revisão

Realizar uma análise completa de ponta a ponta do código, identificando e implementando melhorias focadas em:

1. **Código Limpo (Clean Code)**
   - Nomenclatura clara e consistente
   - Funções pequenas com responsabilidade única
   - Redução de complexidade ciclomática
   - Eliminação de código duplicado
   - Comentários significativos (apenas quando necessário)

2. **Clareza e Legibilidade**
   - Estrutura de código intuitiva
   - Padrões consistentes em todo o projeto
   - Type safety aprimorado
   - Documentação inline quando necessário

3. **Manutenibilidade**
   - Baixo acoplamento entre módulos
   - Alta coesão dentro dos módulos
   - Facilidade para adicionar novos recursos
   - Facilidade para corrigir bugs
   - Testes unitários (se aplicável)

4. **Escalabilidade**
   - Arquitetura que suporta crescimento
   - Performance otimizada
   - Bundle size reduzido
   - Tree-shaking eficiente
   - Lazy loading onde apropriado

## Estrutura do Projeto

```
react-core/
├── src/
│   ├── core/
│   │   ├── auth/          # Autenticação OIDC + Keycloak
│   │   ├── theme/         # Sistema de temas (light/dark)
│   │   └── errors/        # Páginas e tratamento de erros
│   ├── components/
│   │   ├── layout/        # AppLayout, Sidebar, Header, Breadcrumb
│   │   └── ui/            # shadcn/ui components
│   ├── hooks/             # Custom hooks (useSidebarMenu, useMobile)
│   ├── providers/         # AppProviders (auth, query, theme)
│   ├── context/           # React contexts
│   ├── utils/             # Utilitários (cn, helpers)
│   ├── types/             # TypeScript types centralizados
│   ├── assets/            # Logos e imagens
│   ├── styles/            # global.css (Tailwind)
│   └── index.ts           # Barrel export principal
├── demo/                  # Aplicação de demonstração
└── dist/                  # Build output (ESM + CJS)
```

## Áreas Críticas para Revisão

### 1. Core Modules

#### Auth (`src/core/auth/`)
- **auth-service.ts**: Serviço OIDC com gerenciamento de sessão
- **auth-context.tsx**: Context provider com estado de autenticação
- **auth-types.ts**: Tipos e interfaces
- **permissions-config.ts**: Roles e hierarquia de permissões
- **utils/**: Helpers para roles, permissões, dados do usuário

**Pontos de atenção:**
- Gestão do ciclo de vida da autenticação
- Tratamento de erros e expiração de token
- Injeção de dependências (config via props)
- Type safety nas permissões

#### Theme (`src/core/theme/`)
- Sistema de temas com next-themes
- Configuração de cores e variáveis CSS

#### Errors (`src/core/errors/`)
- Error boundaries
- Páginas de erro (404, etc)

### 2. Components

#### Layout (`src/components/layout/`)
- **app-layout.tsx**: Layout principal com sidebar
- **app-sidebar-menu.tsx**: Menu lateral com permissões
- **app-header.tsx**: Header com user dropdown
- **app-breadcrumb.tsx**: Breadcrumbs automáticos

**Pontos de atenção:**
- Responsividade (mobile/desktop)
- Acessibilidade (a11y)
- Performance de renderização
- Gerenciamento de estado do sidebar

#### UI (`src/components/ui/`)
- Components shadcn/ui customizados
- Consistência de API entre components

### 3. Hooks & Utils

- **useSidebarMenu**: Lógica de menu com filtro por permissões
- **useMobile**: Detection de viewport mobile
- **cn**: Utility para classes CSS (clsx + tailwind-merge)

### 4. Providers & Context

- **app-providers.tsx**: Composição de providers
- **sidebar-layout-context.tsx**: Estado global do sidebar

### 5. Types & Configuration

- **types/config.ts**: Tipos centralizados (AuthConfig, ProjectConfig, MenuItem)
- Validação de tipos em runtime
- Documentação de tipos

### 6. Build & Distribution

- **vite.config.ts**: Configuração de build da biblioteca
- **package.json**: Dependencies vs peerDependencies
- **tsconfig.json**: TypeScript configuration
- Tree-shaking e code splitting

## Checklist de Revisão

### Código Limpo
- [ ] Nomes de variáveis/funções descritivos e consistentes
- [ ] Funções com no máximo 20-30 linhas
- [ ] Máximo de 3-4 parâmetros por função
- [ ] Evitar flags booleanos como parâmetros
- [ ] Eliminar código comentado/morto
- [ ] Eliminar console.log() de debug
- [ ] Usar constantes para magic numbers/strings
- [ ] Aplicar princípios SOLID

### TypeScript
- [ ] Tipagem forte sem `any`
- [ ] Interfaces bem definidas
- [ ] Generics onde apropriado
- [ ] Type guards para runtime safety
- [ ] Enums vs Union Types (escolha apropriada)
- [ ] Utility types (Pick, Omit, Partial, etc)

### React Best Practices
- [ ] Evitar re-renders desnecessários (memo, useMemo, useCallback)
- [ ] Keys apropriadas em listas
- [ ] Cleanup de effects (useEffect return)
- [ ] Custom hooks para lógica reutilizável
- [ ] Composition over inheritance
- [ ] Props drilling vs Context (uso apropriado)

### Performance
- [ ] Bundle size otimizado
- [ ] Lazy loading de componentes pesados
- [ ] Code splitting estratégico
- [ ] Otimização de imports (tree-shaking)
- [ ] Memoização apropriada
- [ ] Virtualização para listas longas

### Acessibilidade
- [ ] Semântica HTML correta
- [ ] ARIA labels e roles
- [ ] Navegação por teclado
- [ ] Contraste de cores adequado
- [ ] Focus management

### Error Handling
- [ ] Try-catch apropriados
- [ ] Error boundaries
- [ ] Mensagens de erro amigáveis
- [ ] Logging estruturado
- [ ] Fallbacks e estados de loading

### Segurança
- [ ] Sanitização de inputs
- [ ] Prevenção de XSS
- [ ] Gestão segura de tokens
- [ ] CORS apropriado

### Documentação
- [ ] JSDoc para funções públicas
- [ ] README.md completo
- [ ] Exemplos de uso
- [ ] Changelog mantido
- [ ] Type definitions exportadas

### Testes (se aplicável)
- [ ] Testes unitários para utils
- [ ] Testes de integração para hooks
- [ ] Testes de componentes
- [ ] Coverage adequado

## Metodologia de Revisão

### Fase 1: Análise Inicial (Leitura)
1. Ler TODO o código do projeto
2. Identificar padrões e anti-patterns
3. Mapear dependências e acoplamentos
4. Listar todos os problemas encontrados

### Fase 2: Priorização
1. Categorizar problemas por severidade:
   - **CRÍTICO**: Bugs, vulnerabilidades, problemas de arquitetura
   - **ALTO**: Code smells significativos, performance issues
   - **MÉDIO**: Melhorias de clareza, inconsistências
   - **BAIXO**: Refinamentos, otimizações menores

2. Criar plano de ação ordenado por impacto

### Fase 3: Implementação
1. Implementar melhorias em ordem de prioridade
2. Garantir que cada mudança não quebra funcionalidade existente
3. Atualizar testes se necessário
4. Documentar mudanças significativas

### Fase 4: Validação
1. Executar build: `npm run build`
2. Verificar demo: `cd demo && npm run dev`
3. Testar funcionalidades principais
4. Verificar bundle size

## Diretrizes de Implementação

### Não Fazer (Evitar)
- ❌ Mudar a API pública sem necessidade extrema
- ❌ Adicionar dependências pesadas desnecessárias
- ❌ Over-engineering (complexidade desnecessária)
- ❌ Quebrar compatibilidade com demo existente
- ❌ Remover funcionalidades sem análise de impacto

### Fazer (Priorizar)
- ✅ Refatorações que melhoram clareza sem quebrar API
- ✅ Otimizações de performance mensuráveis
- ✅ Melhorias de type safety
- ✅ Redução de bundle size
- ✅ Melhor documentação inline
- ✅ Consistência de padrões
- ✅ Error handling robusto

## Formato de Entrega

Para cada melhoria implementada, documente:

```markdown
### [CATEGORIA] Nome da Melhoria

**Arquivo(s):** `caminho/do/arquivo.ts`

**Problema identificado:**
Descrição clara do problema ou oportunidade de melhoria

**Solução implementada:**
Descrição da mudança realizada

**Impacto:**
- Performance: +/- X%
- Bundle size: +/- X KB
- Legibilidade: Melhor/Igual
- Manutenibilidade: Melhor/Igual

**Código antes:**
```typescript
// código antigo
```

**Código depois:**
```typescript
// código novo
```
```

## Métricas de Sucesso

Ao final da revisão, o projeto deve apresentar:

1. **Qualidade de Código**
   - Complexidade ciclomática < 10 por função
   - Duplicação de código < 5%
   - TypeScript strict mode habilitado

2. **Performance**
   - Bundle size (gzipped) < 60 KB
   - Time to Interactive < 3s no demo
   - Tree-shaking efetivo (sem código morto no bundle)

3. **Manutenibilidade**
   - Acoplamento reduzido entre módulos
   - Padrões consistentes em 100% do código
   - Documentação inline em APIs públicas

4. **Developer Experience**
   - IntelliSense completo e preciso
   - Exemplos claros no demo
   - Erros de tipo significativos

## Comandos Úteis

```bash
# Build da biblioteca
cd c:\Develop\testes\react-core
npm run build

# Rodar demo
cd c:\Develop\testes\react-core\demo
npm run dev

# Análise de bundle (se configurado)
npm run analyze

# TypeScript check
npm run type-check
```

## Considerações Finais

- **Priorize mudanças incrementais**: Pequenas melhorias contínuas são melhores que refatoração massiva
- **Teste após cada mudança**: Garanta que o demo continua funcionando
- **Mantenha a simplicidade**: A biblioteca deve ser fácil de entender e usar
- **Documente decisões**: Se algo parece complexo, explique o porquê
- **Pense no consumidor**: Cada mudança deve melhorar a experiência de quem usa a lib

---

**Objetivo Final:** Uma biblioteca @herval/react-core que seja referência em qualidade de código, performance e experiência de desenvolvimento.
