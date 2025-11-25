import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/shadcn/sidebar"
import { cn } from "@/utils/cn"
import type { MenuItem } from "@/types/config"

/**
 * AppSidebarSubmenu - Painel de navegação secundário para itens de submenu
 *
 * Arquitetura:
 * - Usa componentes nativos do shadcn para consistência com AppSidebarMenu
 * - Animações suaves via Framer Motion
 * - Estrutura idêntica ao menu principal (Header + Content + Group)
 *
 * Funcionalidades:
 * - Estado ativo baseado na rota atual
 * - Animação de abertura/fechamento sincronizada com menu principal
 * - Suporte a tooltips e acessibilidade
 * - Fecha automaticamente ao navegar
 *
 * Design:
 * - Largura fixa (256px) quando aberto, 0 quando fechado
 * - Transição suave de largura com fade de opacidade
 * - Mantém alinhamento visual com a barra lateral principal
 * - Reutiliza tokens de design do sistema (cores, espaçamentos, etc.)
 *
 * Animação:
 * - AnimatePresence gerencia entrada/saída do componente
 * - Motion.aside anima largura e opacidade
 * - Duração de 0.3s com easing suave (igual ao AppSidebarMenu)
 *
 * @param parentItem - Item de menu pai contendo subItems
 * @param isRouteActive - Callback para verificar se uma rota está ativa
 * @param onClose - Callback para fechar o submenu
 */

interface SidebarSubmenuProps {
    /** Item de menu pai contendo subItems */
    parentItem: MenuItem | null
    /** Callback para verificar se uma rota está atualmente ativa */
    isRouteActive: (url: string) => boolean
    /** Callback para fechar o submenu */
    onClose?: () => void
}

export function AppSidebarSubmenu({
    parentItem,
    isRouteActive,
    onClose,
}: SidebarSubmenuProps) {
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
                    className="bg-background flex flex-col overflow-hidden border-r h-screen sticky top-0"
                    id={`submenu-${parentItem.name}`}
                    aria-label={`Submenu de ${parentItem.name}`}
                >
                    <SidebarHeader className="border-b p-0">
                        <div className="h-14 px-4 flex items-center min-w-64">
                            <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">
                                {parentItem.name}
                            </h3>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="min-w-64">
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {parentItem.subItems?.map((subItem) => {
                                        const isActive = isRouteActive(subItem.url)

                                        return (
                                            <SidebarMenuItem key={subItem.url}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isActive}
                                                >
                                                    <Link
                                                        to={subItem.url}
                                                        onClick={onClose}
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
                </motion.aside>

            )}
        </AnimatePresence>
    )
}
