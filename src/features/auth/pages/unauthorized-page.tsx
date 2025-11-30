import { useNavigate } from "react-router-dom"
import { ShieldX, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"

export function UnauthorizedPage() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm text-center">
                <CardHeader className="items-center justify-items-center">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                        <ShieldX className="h-7 w-7 text-destructive" />
                    </div>
                    <CardTitle className="text-xl">Acesso Negado</CardTitle>
                    <CardDescription>
                        Você não tem permissão para acessar esta página.
                        Entre em contato com o administrador se precisar de acesso.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={() => navigate(-1)} className="w-full gap-2 sm:flex-1">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar
                    </Button>
                    <Button onClick={() => navigate("/")} className="w-full gap-2 sm:flex-1">
                        <Home className="h-4 w-4" />
                        Início
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
