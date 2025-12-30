import { XCircle, Home } from "lucide-react"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"

interface AuthErrorProps {
    title: string
    message: string
}

export function AuthError({ title, message }: AuthErrorProps) {
    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm text-center">
                <CardHeader className="items-center justify-items-center">
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                        <XCircle className="h-7 w-7 text-destructive" />
                    </div>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{message}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button onClick={() => (window.location.href = "/")} className="w-full gap-2">
                        <Home className="h-4 w-4" />
                        Voltar ao Início
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
