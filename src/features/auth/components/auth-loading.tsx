import { Card, CardContent } from "@/shared/components/ui/shadcn/card"
import { Spinner } from "@/shared/components/ui/shadcn/spinner"

interface AuthLoadingProps {
    title: string
    description: string
}

export function AuthLoading({ title, description }: AuthLoadingProps) {
    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm border-0 text-center shadow-none">
                <CardContent className="flex flex-col items-center gap-4 pt-6">
                    <Spinner className="h-10 w-10" />
                    <div className="space-y-1">
                        <h1 className="text-lg font-semibold">{title}</h1>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
