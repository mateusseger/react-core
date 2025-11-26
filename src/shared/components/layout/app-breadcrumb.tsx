import { Link, useLocation, useMatches, useParams } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/components/ui/shadcn/breadcrumb"
import { Home } from "lucide-react"

// Tipagem para route handles customizados
interface RouteHandle {
    detailSectionsEnabled?: boolean
    breadcrumbLabel?: (params: Record<string, string>) => string
    breadcrumbTitle?: string
}

/**
 * AppBreadcrumb - Navegação breadcrumb automática baseada na rota atual
 *
 * Gera automaticamente a trilha de navegação com base no caminho da URL atual.
 * Suporta breadcrumbLabel dinâmico via route handle para páginas de detalhe.
 * Nota: Breadcrumb genérico que usa os segmentos da URL. Para labels customizados,
 * adicione breadcrumbTitle no handle da rota.
 */
export function AppBreadcrumb() {
    const location = useLocation()
    const matches = useMatches()
    const params = useParams()

    // Gera breadcrumbs baseado nos segmentos da URL
    const pathnames = location.pathname.split('/').filter((x) => x)

    const breadcrumbItems = pathnames.map((value, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`
        const match = matches.find(m => m.pathname === url)
        const handle = match?.handle as RouteHandle | undefined

        return {
            name: handle?.breadcrumbTitle || value.charAt(0).toUpperCase() + value.slice(1),
            url,
            icon: index === 0 ? Home : undefined,
        }
    })

    // Verifica se a rota atual tem handle.breadcrumbLabel
    const currentMatch = matches[matches.length - 1]
    const handle = currentMatch?.handle as RouteHandle | undefined
    const dynamicLabel = handle?.breadcrumbLabel?.(params as Record<string, string>)

    // Se há label dinâmico, substitui o último item
    const items = dynamicLabel && breadcrumbItems.length > 0
        ? [
            ...breadcrumbItems.slice(0, -1),
            { ...breadcrumbItems[breadcrumbItems.length - 1], name: dynamicLabel }
        ]
        : breadcrumbItems

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    const Icon = item.icon

                    return (
                        <div key={item.url || index} className="flex items-center gap-1.5">
                            {index > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                {isLast || !item.url ? (
                                    <BreadcrumbPage className="flex items-center gap-1">
                                        {Icon && <Icon className="h-3.5 w-3.5" />}
                                        {item.name}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={item.url} className="flex items-center gap-1">
                                            {Icon && <Icon className="h-3.5 w-3.5" />}
                                            {item.name}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
