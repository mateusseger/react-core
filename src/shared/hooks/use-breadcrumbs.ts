import { useMemo } from "react"
import { useMatches, useParams } from "react-router-dom"
import type { LucideIcon } from "lucide-react"

interface BreadcrumbHandle {
    breadcrumbLabel: string | ((params: Record<string, string>) => string)
    breadcrumbIcon?: LucideIcon
    breadcrumbNavigable?: boolean
}

export interface BreadcrumbItem {
    label: string
    path: string
    icon?: LucideIcon
    isNavigable: boolean
    isLast: boolean
}

type RouteParams = Record<string, string>

function hasBreadcrumbHandle(handle: unknown): handle is BreadcrumbHandle {
    return (
        typeof handle === "object" &&
        handle !== null &&
        "breadcrumbLabel" in handle
    )
}

function resolveLabel(
    breadcrumbLabel: BreadcrumbHandle["breadcrumbLabel"],
    params: RouteParams
): string {
    return typeof breadcrumbLabel === "function"
        ? breadcrumbLabel(params)
        : breadcrumbLabel
}

export function useBreadcrumbs(): BreadcrumbItem[] {
    const matches = useMatches()
    const params = useParams() as RouteParams

    return useMemo(() => {
        const validMatches = matches.filter(
            (match) =>
                match.pathname &&
                match.pathname !== "/" &&
                hasBreadcrumbHandle(match.handle)
        )

        return validMatches.map((match, index) => {
            const handle = match.handle as BreadcrumbHandle

            return {
                label: resolveLabel(handle.breadcrumbLabel, params),
                path: match.pathname,
                icon: handle.breadcrumbIcon,
                isNavigable: handle.breadcrumbNavigable !== false,
                isLast: index === validMatches.length - 1,
            }
        })
    }, [matches, params])
}
