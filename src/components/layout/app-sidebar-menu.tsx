import { Link } from "react-router-dom"
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
} from "../ui/shadcn/sidebar"
import { Button } from "../ui/shadcn/button"
import { useTheme } from "@/core/theme"
import { cn } from "@/utils/cn"
import { useSidebarMenu } from "@/hooks/use-sidebar-menu"
import { AppSidebarSubmenu } from "./app-sidebar-submenu"
import { useSidebarLayout } from "@/context/sidebar-layout-context"
import { useEffect } from "react"
import type { MenuItem, ProjectConfig } from "@/types/config"
import logoHervalLight from "@/assets/logos/herval-light.png"
import logoHervalDark from "@/assets/logos/herval-dark.png"
import logoTaqiLight from "@/assets/logos/taqi-light.svg"
import logoTaqiDark from "@/assets/logos/taqi-dark.svg"
import logoIplaceLight from "@/assets/logos/iplace-light.svg"
import logoIplaceDark from "@/assets/logos/iplace-dark.svg"

/**
 * AppSidebarMenu - Barra lateral principal de navegação
 *
 * Refatorado para aceitar configuração via props.
 *
 * Arquitetura:
 * - Utiliza o hook useSidebarMenu para encapsular estado e lógica
 * - Delega a renderização de submenus ao componente AppSidebarSubmenu
 * - Publica estado do submenu via SidebarLayoutContext
 * - Foco em composição e apresentação
 *
 * Funcionalidades:
 * - Menu colapsável com ícones
 * - Suporte a submenus com painel secundário animado
 * - Alternador de tema no rodapé
 * - Estado ativo baseado na rota atual
 * - Filtragem de menu baseada em permissões (via hook)
 * - Acessibilidade completa com atributos ARIA
 * - Logo dinâmico baseado no tema ativo
 * - Nome do projeto configurável
 *
 * @param menuItems - Itens do menu de navegação
 * @param projectConfig - Configurações do projeto (nome, logo, etc)
 */
export interface AppSidebarMenuProps {
    menuItems: MenuItem[]
    projectConfig: ProjectConfig
}

export function AppSidebarMenu({ menuItems: allMenuItems, projectConfig }: AppSidebarMenuProps) {
    const { theme, toggleMode } = useTheme()
    const {
        menuItems,
        activeSubmenu,
        isRouteActive,
        isSubmenuOpen,
        hasActiveSubitem,
        handleItemClick,
        closeSubmenu,
    } = useSidebarMenu(allMenuItems)
    const { setIsSubmenuOpen } = useSidebarLayout()

    // Publica mudanças no estado do submenu para o layout context
    useEffect(() => {
        setIsSubmenuOpen(!!activeSubmenu)
    }, [activeSubmenu, setIsSubmenuOpen])

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

    return (
        <>
            {/* Barra Lateral Principal */}
            <Sidebar collapsible="icon">
                <SidebarHeader className="border-b p-0">
                    <Link
                        to="/"
                        className="h-14 px-4 flex items-center gap-3 transition-all duration-200 ease-linear group-data-[collapsible=icon]:px-1 hover:bg-accent/50 cursor-pointer"
                    >
                        <img
                            src={currentLogo}
                            alt="Logo"
                            className="h-6 group-data-[collapsible=icon]:object-contain"
                        />

                        <h1 className="text-sm font-bold group-data-[collapsible=icon]:hidden">{projectConfig.name}</h1>
                    </Link>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.map((item) => {
                                    const hasSubmenu = !!item.subItems?.length
                                    const isExpanded = isSubmenuOpen(item)
                                    const isActive = hasSubmenu
                                        ? hasActiveSubitem(item)
                                        : (!activeSubmenu && item.url ? isRouteActive(item.url) : false)

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
                                                    onClick={() => handleItemClick(item)}
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
                                                        onClick={() => handleItemClick(item)}
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
                    <div className="h-14 px-4 flex items-center justify-between group-data-[collapsible=icon]:justify-center">
                        <span className="text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
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
                parentItem={activeSubmenu}
                isRouteActive={isRouteActive}
                onClose={closeSubmenu}
            />
        </>
    )
}
