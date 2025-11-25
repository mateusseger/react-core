# @herval/react-core - Demo

Aplicação de demonstração da biblioteca @herval/react-core.

## Como rodar

```bash
npm install
npm run dev
```

## Modo de Desenvolvimento

Para rodar sem autenticação real, crie um arquivo `.env`:

```env
VITE_DEV_AUTH_BYPASS=true
```

## Estrutura

```
demo/
├── src/
│   ├── config/          # Configurações (auth, menu, project)
│   ├── pages/           # Páginas de exemplo
│   ├── router.tsx       # Configuração de rotas
│   └── main.tsx         # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Funcionalidades Demonstradas

- ✅ Sistema de autenticação
- ✅ Layout com sidebar e header
- ✅ Menu de navegação com submenus
- ✅ Sistema de temas
- ✅ Componentes UI
- ✅ Proteção de rotas
- ✅ Tratamento de erros
