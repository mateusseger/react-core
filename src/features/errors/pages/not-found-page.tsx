import { Link } from "react-router-dom"
import { FileQuestion, Home } from "lucide-react"
import { Button } from "@/shared/components/ui/shadcn/button"

export function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 text-center">
                <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold">Página Não Encontrada</h1>
                    <p className="text-sm text-muted-foreground">
                        A página que você procura não existe ou foi movida.
                    </p>
                </div>
                <Button asChild className="w-full gap-2">
                    <Link to="/">
                        <Home className="h-4 w-4" />
                        Voltar ao Início
                    </Link>
                </Button>
            </div>
        </div>
    )
}
