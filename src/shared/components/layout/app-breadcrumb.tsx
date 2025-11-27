import { Fragment } from "react"
import { Link, useLocation } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/components/ui/shadcn/breadcrumb"
import { Home } from "lucide-react"

function formatName(segment: string): string {
    return segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())
}

export function AppBreadcrumb() {
    const { pathname } = useLocation()

    if (pathname === "/") return null

    const segments = pathname.split("/").filter(Boolean)

    const items = segments.map((segment, i) => ({
        name: formatName(segment),
        url: "/" + segments.slice(0, i + 1).join("/"),
    }))

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Home */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/" className="flex items-center gap-1 text-xs sm:text-sm">
                            <Home className="h-3.5 w-3.5" />
                            <span>Início</span>
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {/* Segmentos */}
                {items.map((item, i) => {
                    const isLast = i === items.length - 1

                    return (
                        <Fragment key={item.url}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">
                                        {item.name}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={item.url} className="text-xs sm:text-sm">
                                            {item.name}
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
