import { useNavigate } from "react-router-dom"
import { ShieldX, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/shared/components/ui/shadcn/button"

export function UnauthorizedPage() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 text-center">
                <ShieldX className="mx-auto h-12 w-12 text-destructive" />
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Acesso Negado</h1>
                    <p className="text-sm text-muted-foreground">
                        Você não tem permissão para acessar esta página.
                        Entre em contato com o administrador se precisar de acesso.
                    </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button variant="outline" onClick={() => navigate(-1)} className="flex-1 gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar
                    </Button>
                    <Button onClick={() => navigate("/")} className="flex-1 gap-2">
                        <Home className="h-4 w-4" />
                        Início
                    </Button>
                </div>
            </div>
        </div>
    )
}
