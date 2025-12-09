import { useCallback } from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "../ui/shadcn/sidebar"
import { cn } from "@/shared/utils/cn"
import { useSidebarMenu } from "@/shared/hooks/use-sidebar-menu"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { AppSidebarSubmenu } from "./app-sidebar-submenu"
import { AppLogo } from "./app-logo"
import type { MenuItem, ProjectConfig } from "@/shared/types/config"

export interface AppSidebarMenuProps {
    menuItems: MenuItem[]
    projectConfig: ProjectConfig
}

export function AppSidebarMenu({ menuItems: allMenuItems, projectConfig }: AppSidebarMenuProps) {
    const { isMobile, setOpenMobile } = useSidebar()
    const {
        menuItems,
        openSubmenu,
        currentPath,
        getItemState,
        toggleSubmenu,
        closeSubmenu,
    } = useSidebarMenu(allMenuItems)

    // Fecha o sidebar mobile ao entrar no breakpoint md
    const handleBreakpointEnter = useCallback(() => {
        setOpenMobile(false)
    }, [setOpenMobile])

    useBreakpoint("md", { onEnter: handleBreakpointEnter })

    // Fecha o sidebar mobile após clicar em um item de navegação
    const handleMenuItemClick = (item: MenuItem) => {
        toggleSubmenu(item)

        // Em mobile: fecha o sidebar (tanto para itens com submenu quanto sem)
        // Para itens com submenu, o submenu vai abrir fullscreen
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    // Fecha o sidebar mobile ao clicar no logo/título
    const handleLogoClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    return (
        <>
            {/* Barra Lateral Principal */}
            <Sidebar collapsible="icon">
                <SidebarHeader className="border-b p-0">
                    <AppLogo
                        projectConfig={projectConfig}
                        onClick={handleLogoClick}
                        className="
                        group-data-[collapsible=icon]:px-1
                        [&_img]:group-data-[collapsible=icon]:object-contain
                        [&_h1]:group-data-[collapsible=icon]:hidden
                        hover:bg-accent/50
                        px-3 sm:px-4"
                    />
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.map((item) => {
                                    const { isActive, isExpanded, hasSubmenu } = getItemState(item)

                                    const buttonClasses = cn(
                                        "transition-all duration-200 hover:translate-x-1",
                                        hasSubmenu && "cursor-pointer",
                                        isActive && "font-medium shadow-sm",
                                        isExpanded && "bg-accent text-accent-foreground"
                                    )

                                    return (
                                        <SidebarMenuItem key={item.name}>
                                            {hasSubmenu ? (
                                                <SidebarMenuButton
                                                    onClick={() => handleMenuItemClick(item)}
                                                    tooltip={item.name}
                                                    isActive={isActive}
                                                    className={buttonClasses}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.name}</span>
                                                    <ChevronRight
                                                        className={cn(
                                                            "ml-auto h-4 w-4 transition-transform duration-200",
                                                            isExpanded && "rotate-180"
                                                        )}
                                                    />
                                                </SidebarMenuButton>
                                            ) : (
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isActive}
                                                    tooltip={item.name}
                                                >
                                                    <Link
                                                        to={item.url!}
                                                        onClick={() => handleMenuItemClick(item)}
                                                        className={buttonClasses}
                                                    >
                                                        <item.icon className="h-4 w-4" />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            )}
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarRail />
            </Sidebar>

            {/* Painel Secundário de Submenu - Animado */}
            <AppSidebarSubmenu
                parentItem={openSubmenu}
                currentPath={currentPath}
                onClose={closeSubmenu}
            />
        </>
    )
}
