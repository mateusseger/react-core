import { Link } from "react-router-dom"
import { FileQuestion, Home } from "lucide-react"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"

export function NotFoundPage() {
    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm text-center">
                <CardHeader className="items-center justify-items-center">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                        <FileQuestion className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">Página Não Encontrada</CardTitle>
                    <CardDescription>
                        A página que você procura não existe ou foi movida.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild className="w-full gap-2">
                        <Link to="/">
                            <Home className="h-4 w-4" />
                            Voltar ao Início
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
