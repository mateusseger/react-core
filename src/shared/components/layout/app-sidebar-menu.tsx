import { Link } from "react-router-dom"
import { useCallback } from "react"
import { Moon, Sun, ChevronRight } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "../ui/shadcn/sidebar"
import { Button } from "../ui/shadcn/button"
import { useTheme } from "@/features/themes"
import { cn } from "@/shared/utils/cn"
import { useSidebarMenu } from "@/shared/hooks/use-sidebar-menu"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { AppSidebarSubmenu } from "./app-sidebar-submenu"
import type { MenuItem, ProjectConfig } from "@/shared/types/config"
import logoHervalLight from "@/shared/assets/logos/herval-light.png"
import logoHervalDark from "@/shared/assets/logos/herval-dark.png"
import logoTaqiLight from "@/shared/assets/logos/taqi-light.svg"
import logoTaqiDark from "@/shared/assets/logos/taqi-dark.svg"
import logoIplaceLight from "@/shared/assets/logos/iplace-light.svg"
import logoIplaceDark from "@/shared/assets/logos/iplace-dark.svg"

export interface AppSidebarMenuProps {
    menuItems: MenuItem[]
    projectConfig: ProjectConfig
}

export function AppSidebarMenu({ menuItems: allMenuItems, projectConfig }: AppSidebarMenuProps) {
    const { theme, toggleMode } = useTheme()
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

    // Logos por tema e modo (light/dark)
    const logos = {
        herval: {
            light: logoHervalLight,
            dark: logoHervalDark,
        },
        taqi: {
            light: logoTaqiLight,
            dark: logoTaqiDark,
        },
        iplace: {
            light: logoIplaceLight,
            dark: logoIplaceDark,
        },
    }

    const currentLogo = projectConfig.logo || logos[theme.name][theme.mode]

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
                    <Link
                        to="/"
                        onClick={handleLogoClick}
                        className={cn(
                            "flex items-center gap-2 sm:gap-3 transition-all duration-200 ease-linear hover:bg-accent/50 cursor-pointer",
                            "h-12 sm:h-14 px-3 sm:px-4",
                            "group-data-[collapsible=icon]:px-1"
                        )}
                    >
                        <img
                            src={currentLogo}
                            alt="Logo"
                            className="h-5 sm:h-6 group-data-[collapsible=icon]:object-contain"
                        />

                        <h1 className="text-xs sm:text-sm font-bold group-data-[collapsible=icon]:hidden">{projectConfig.name}</h1>
                    </Link>
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

                <SidebarFooter className="border-t p-0">
                    <div className={cn(
                        "flex items-center justify-between group-data-[collapsible=icon]:justify-center",
                        "h-12 sm:h-14 px-3 sm:px-4"
                    )}>
                        <span className="text-xs sm:text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                            Aparência
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMode}
                            className="h-8 w-8 shrink-0"
                        >
                            {theme.mode === "light" ? (
                                <Moon className="h-4 w-4" />
                            ) : (
                                <Sun className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </SidebarFooter>

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
