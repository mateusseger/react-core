import { Link } from "react-router-dom"
import { useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/shared/components/ui/shadcn/sidebar"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "@/shared/components/ui/shadcn/sheet"
import { Button } from "@/shared/components/ui/shadcn/button"
import { X, ChevronLeft } from "lucide-react"
import { cn } from "@/shared/utils/cn"
import { useBreakpoint } from "@/shared/hooks"
import type { MenuItem } from "@/shared/types/config"

export interface SidebarSubmenuProps {
    parentItem: MenuItem | null
    currentPath: string
    onClose?: () => void
}

export function AppSidebarSubmenu({
    parentItem,
    currentPath,
    onClose,
}: SidebarSubmenuProps) {
    const { isMobile, setOpenMobile } = useSidebar()

    // Fecha o submenu ao entrar no breakpoint lg
    const handleBreakpointEnter = useCallback(() => {
        if (parentItem) {
            onClose?.()
        }
    }, [parentItem, onClose])

    useBreakpoint("lg", { onEnter: handleBreakpointEnter })

    // Fecha o submenu e o sidebar mobile após navegação
    const handleSubItemClick = () => {
        onClose?.()

        if (isMobile) {
            setOpenMobile(false)
        }
    }

    // Handler para voltar ao menu principal (mobile)
    const handleBackToMenu = () => {
        onClose?.()
        setOpenMobile(true)
    }

    // Handler para mudança de estado do Sheet
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose?.()
        }
    }

    // Conteúdo compartilhado do submenu
    const submenuContent = (showMobileButtons: boolean = false) => (
        <>
            <SidebarHeader className="border-b p-0">
                <div className={cn(
                    "flex items-center justify-between",
                    "h-12 sm:h-14 px-3 sm:px-4",
                    "min-w-0"
                )}>
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
                        {parentItem?.name}
                    </h3>
                    {showMobileButtons && (
                        <div className="flex items-center gap-1">
                            {/* Botão Voltar - Fecha submenu e volta ao menu principal */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleBackToMenu}
                                className="h-8 w-8 shrink-0"
                                aria-label="Voltar ao menu principal"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {/* Botão Fechar - Fecha submenu e o sidebar mobile */}
                            <SheetClose asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 shrink-0"
                                    aria-label="Fechar submenu"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </SheetClose>
                        </div>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent className="min-w-0">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {parentItem?.subItems?.map((subItem) => {
                                const isActive = subItem.url === currentPath

                                return (
                                    <SidebarMenuItem key={subItem.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link
                                                to={subItem.url}
                                                onClick={handleSubItemClick}
                                                className={cn(
                                                    "transition-all duration-200 hover:translate-x-1",
                                                    isActive && "font-medium shadow-sm"
                                                )}
                                            >
                                                <subItem.icon className="h-4 w-4" />
                                                <span>{subItem.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </>
    )

    // Mobile: Usa Sheet (mesmo padrão do Sidebar principal)
    // Desktop: Usa AnimatePresence com motion.aside para não bloquear o conteúdo
    if (isMobile) {
        return (
            <Sheet open={!!parentItem} onOpenChange={handleOpenChange}>
                <SheetContent
                    side="left"
                    className="bg-sidebar text-sidebar-foreground w-72 p-0 [&>button]:hidden"
                    aria-label={`Submenu de ${parentItem?.name}`}
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>{parentItem?.name}</SheetTitle>
                        <SheetDescription>Submenu de navegação</SheetDescription>
                    </SheetHeader>
                    <div className="flex h-full w-full flex-col">
                        {submenuContent(true)}
                    </div>
                </SheetContent>
            </Sheet>
        )
    }

    // Desktop: Usa AnimatePresence com motion.aside
    return (
        <AnimatePresence mode="wait">
            {parentItem && (
                <motion.aside
                    key={parentItem.name}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 256, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className={cn(
                        "bg-background flex flex-col overflow-hidden border-r",
                        "relative h-screen sticky top-0"
                    )}
                    id={`submenu-${parentItem.name}`}
                    aria-label={`Submenu de ${parentItem.name}`}
                >
                    {submenuContent(false)}
                </motion.aside>
            )}
        </AnimatePresence>
    )
}
