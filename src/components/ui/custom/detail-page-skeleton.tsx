import { Skeleton } from "../shadcn/skeleton"

// Skeleton compartilhado para páginas de detalhe
export function DetailPageSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}
