import { Fragment } from "react"
import { Link } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/components/ui/shadcn/breadcrumb"
import { Home } from "lucide-react"
import { useBreadcrumbs } from "@/shared/hooks/use-breadcrumbs"

export function AppBreadcrumb() {
    const items = useBreadcrumbs()

    if (items.length === 0) return null

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/" className="flex items-center gap-1 text-xs sm:text-sm">
                            <Home className="h-3.5 w-3.5" />
                            <span>Início</span>
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {items.map((item) => {
                    const Icon = item.icon
                    const showAsPage = item.isLast || !item.isNavigable

                    return (
                        <Fragment key={item.path}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {showAsPage ? (
                                    <BreadcrumbPage className="flex items-center gap-1 text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">
                                        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                                        <span>{item.label}</span>
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={item.path} className="flex items-center gap-1 text-xs sm:text-sm">
                                            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                                            <span>{item.label}</span>
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
