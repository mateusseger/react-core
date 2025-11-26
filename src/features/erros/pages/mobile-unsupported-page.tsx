import { Monitor, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"

/**
 * MobileUnsupported - Tela exibida quando o dispositivo é mobile
 *
 * Componente que informa ao usuário que a aplicação não é suportada em dispositivos móveis
 */
export function MobileUnsupportedPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto relative">
                        <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                            <Smartphone className="h-10 w-10 text-destructive" />
                        </div>
                        <div className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Monitor className="h-4 w-4 text-primary" />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-2xl mb-2">
                            Dispositivo Não Suportado
                        </CardTitle>
                        <CardDescription className="text-base">
                            Esta aplicação foi projetada para uso em desktop
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <div className="p-4 rounded-lg bg-muted">
                        <p className="text-sm text-muted-foreground">
                            Para uma melhor experiência, acesse esta aplicação através de um
                            computador ou dispositivo com tela maior.
                        </p>
                    </div>
                    <div className="pt-2">
                        <p className="text-xs text-muted-foreground">
                            Largura mínima recomendada: <strong>768px</strong>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
