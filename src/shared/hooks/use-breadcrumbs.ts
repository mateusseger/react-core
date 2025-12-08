import { useMatches, useParams } from "react-router-dom"
import type { LucideIcon } from "lucide-react"

interface BreadcrumbHandle {
    breadcrumbLabel?: string | ((params: Record<string, string>) => string)
    breadcrumbIcon?: LucideIcon
    breadcrumbNavigable?: boolean
}

interface BreadcrumbItem {
    label: string
    path: string
    icon?: LucideIcon
    isNavigable: boolean
    isLast: boolean
}

function formatSegment(segment: string): string {
    return segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

function extractLastSegment(pathname: string): string {
    const segments = pathname.split("/").filter(Boolean)
    return segments[segments.length - 1] || ""
}

export function useBreadcrumbs(): BreadcrumbItem[] {
    const matches = useMatches()
    const params = useParams()

    const items: BreadcrumbItem[] = []

    const filteredMatches = matches.filter((match) => {
        if (!match.pathname || match.pathname === "/") return false
        return true
    })

    filteredMatches.forEach((match, index) => {
        const handle = match.handle as BreadcrumbHandle | undefined
        const isLast = index === filteredMatches.length - 1

        let label: string
        if (handle?.breadcrumbLabel) {
            label =
                typeof handle.breadcrumbLabel === "function"
                    ? handle.breadcrumbLabel(params as Record<string, string>)
                    : handle.breadcrumbLabel
        } else {
            const segment = extractLastSegment(match.pathname)
            label = formatSegment(segment)
        }

        const isNavigable = handle?.breadcrumbNavigable !== false

        items.push({
            label,
            path: match.pathname,
            icon: handle?.breadcrumbIcon,
            isNavigable,
            isLast,
        })
    })

    return items
}
