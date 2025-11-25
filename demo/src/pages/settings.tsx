// Página de configurações
export function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
                <p className="text-muted-foreground mt-2">
                    Gerencie as configurações da aplicação.
                </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Configurações Gerais</h3>
                <p className="text-sm text-muted-foreground">
                    Esta é uma página de exemplo. Em uma aplicação real, aqui estariam as configurações.
                </p>
            </div>
        </div>
    )
}
