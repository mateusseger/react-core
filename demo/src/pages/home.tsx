// Página inicial da demo
export function HomePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao @herval/react-core</h1>
                <p className="text-muted-foreground mt-2">
                    Esta é uma aplicação de demonstração da biblioteca @herval/react-core.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold">Sistema de Autenticação</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Sistema completo de autenticação OIDC com Keycloak, incluindo login, logout e gerenciamento de sessão.
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold">Layout Completo</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Sidebar colapsável, header com breadcrumb, e menu de navegação com submenus.
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold">Sistema de Temas</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Suporte a múltiplos temas (Herval, Taqi, iPlace) com modo claro/escuro.
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold">Componentes UI</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Biblioteca completa de componentes shadcn/ui e componentes customizados.
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold">TypeScript</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Totalmente tipado com TypeScript para melhor experiência de desenvolvimento.
                    </p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold">Configurável</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Todas as configurações são passadas via props, sem hard-coding.
                    </p>
                </div>
            </div>

            <div className="rounded-lg border bg-muted/50 p-6">
                <h2 className="text-xl font-semibold mb-4">Como usar</h2>
                <div className="space-y-4 text-sm">
                    <div>
                        <h4 className="font-medium mb-1">1. Instalar</h4>
                        <code className="bg-background px-2 py-1 rounded">npm install @herval/react-core</code>
                    </div>
                    <div>
                        <h4 className="font-medium mb-1">2. Configurar</h4>
                        <p className="text-muted-foreground">Crie arquivos de configuração para auth, menu e projeto.</p>
                    </div>
                    <div>
                        <h4 className="font-medium mb-1">3. Usar</h4>
                        <p className="text-muted-foreground">
                            Envolva sua aplicação com AppProviders e use AppLayout para ter o layout completo.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
