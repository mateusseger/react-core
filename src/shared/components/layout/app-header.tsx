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

/**
 * AppHeader - Barra de navegação superior com acionador da barra lateral, breadcrumb e menu do usuário
 *
 * Componente responsável por exibir o cabeçalho da aplicação, incluindo:
 * - Botão para alternar a visibilidade da barra lateral
 * - Navegação breadcrumb
 * - Menu dropdown do usuário com opção de logout
 */
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
            <div className="flex h-14 items-center px-4 gap-4">
                <SidebarTrigger className="cursor-pointer" />
                <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
                <div className="flex-1">
                    <AppBreadcrumb />
                </div>
                <div className="flex items-center gap-3">
                    {user && (
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full cursor-pointer"
                                >
                                    <Avatar className="h-9 w-9">
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
                                            {user.email}
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
