import { Button } from "@/shared/components/ui/shadcn/button"
import { useAuth } from "@/features/auth"
import { LogOut } from "lucide-react"
import { AppBreadcrumb } from "./app-breadcrumb"
import { Avatar, AvatarFallback } from "@/shared/components/ui/shadcn/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/shadcn/dropdown-menu"
import { SidebarTrigger } from "@/shared/components/ui/shadcn/sidebar"
import { Separator } from "@/shared/components/ui/shadcn/separator"
import { getUserInitials, getUserDisplayName } from "@/features/auth"
import { cn } from "@/shared/utils/cn"

export function AppHeader() {
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    const userDisplayName = getUserDisplayName(user)
    const userInitials = getUserInitials(user)

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300"
        >
            <div className={cn(
                "flex items-center",
                "h-12 sm:h-14",
                "px-3 sm:px-4",
                "gap-2 sm:gap-4"
            )}>
                <SidebarTrigger className="cursor-pointer" />
                <Separator orientation="vertical" className="hidden sm:block data-[orientation=vertical]:h-4" />
                <div className="flex-1 hidden sm:block">
                    <AppBreadcrumb />
                </div>
                <div className="flex-1 sm:hidden" />
                <div className={cn(
                    "flex items-center",
                    "gap-2 sm:gap-3"
                )}>
                    {user && (
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "relative rounded-full cursor-pointer",
                                        "h-8 w-8 sm:h-9 sm:w-9"
                                    )}
                                >
                                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                                            {userInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {userDisplayName}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.profile.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    )
}
