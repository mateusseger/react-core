import { useState, useCallback, useMemo, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAuth, getUserRoles } from "@/core/auth"
import type { MenuItem } from "@/types/config"

/**
 * Hook para gerenciar estado e lógica do menu lateral
 * Filtra itens baseados em permissões e gerencia submenu ativo
 *
 * @param allMenuItems - Todos os itens de menu disponíveis
 */
export function useSidebarMenu(allMenuItems: MenuItem[]) {
    const location = useLocation()
    const { user } = useAuth()
    const [activeSubmenu, setActiveSubmenu] = useState<MenuItem | null>(null)

    const userRoles = useMemo(() => getUserRoles(user), [user])

    // Filtra os itens de menu baseado nas roles do usuário
    const menuItems = useMemo(() => {
        return allMenuItems.filter((item) => {
            if (!item.roles || item.roles.length === 0) {
                return true
            }
            return item.roles.some((role) => userRoles.includes(role))
        }).map((item) => {
            if (item.subItems) {
                const visibleSubItems = item.subItems.filter((subItem) => {
                    if (!subItem.roles || subItem.roles.length === 0) {
                        return true
                    }
                    return subItem.roles.some((role) => userRoles.includes(role))
                })
                return { ...item, subItems: visibleSubItems }
            }
            return item
        })
    }, [allMenuItems, userRoles])

    const isRouteActive = useCallback(
        (url: string) => location.pathname === url,
        [location.pathname]
    )

    // Verifica se um item de menu pai tem algum subitem ativo
    const hasActiveSubitem = useCallback(
        (item: MenuItem) => {
            if (!item.subItems?.length) return false
            return item.subItems.some(subItem => isRouteActive(subItem.url))
        },
        [isRouteActive]
    )

    const isSubmenuOpen = useCallback(
        (item: MenuItem) => activeSubmenu?.name === item.name,
        [activeSubmenu]
    )

    const handleItemClick = useCallback(
        (item: MenuItem) => {
            if (item.subItems?.length) {
                setActiveSubmenu((current) =>
                    current?.name === item.name ? null : item
                )
            } else {
                setActiveSubmenu(null)
            }
        },
        []
    )

    const closeSubmenu = useCallback(() => {
        setActiveSubmenu(null)
    }, [])

    useEffect(() => {
        setActiveSubmenu(null)
    }, [location.pathname])

    return {
        menuItems,
        activeSubmenu,
        isRouteActive,
        isSubmenuOpen,
        hasActiveSubitem,
        handleItemClick,
        closeSubmenu,
    }
}
