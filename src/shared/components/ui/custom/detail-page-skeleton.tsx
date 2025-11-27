import { Skeleton } from "../shadcn/skeleton"
import { cn } from "@/shared/utils/cn"

export function DetailPageSkeleton() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <Skeleton className={cn(
                "h-8 sm:h-12",
                "w-48 sm:w-64"
            )} />
            <Skeleton className={cn(
                "h-64 sm:h-96",
                "w-full"
            )} />
        </div>
    )
}
