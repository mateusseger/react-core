import { useState, useCallback, useMemo, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAuth, getUserRoles } from "@/features/auth"
import { type MenuItem } from "@/shared/types/config"
import { filterMenuItemsByRoles } from "@/shared/utils/menu-helpers"

export function useSidebarMenu(allMenuItems: MenuItem[]) {
    const { pathname: currentPath } = useLocation()
    const { user } = useAuth()
    const [openSubmenu, setOpenSubmenu] = useState<MenuItem | null>(null)

    const userRoles = useMemo(() => getUserRoles(user), [user])
    const menuItems = useMemo(() => filterMenuItemsByRoles(allMenuItems, userRoles), [allMenuItems, userRoles])

    const isSubRoute = useMemo(
        () => menuItems.flatMap((m) => m.subItems ?? []).some((sub) => sub.url === currentPath),
        [menuItems, currentPath]
    )

    useEffect(() => setOpenSubmenu(null), [currentPath])

    const getItemState = useCallback(
        (item: MenuItem) => {
            const hasSubmenu = !!item.subItems?.length
            const isExpanded = openSubmenu?.name === item.name

            const isActive = hasSubmenu
                ? item.subItems!.some((sub) => sub.url === currentPath)
                : item.url === currentPath && !isSubRoute

            return { isActive, isExpanded, hasSubmenu }
        },
        [openSubmenu, currentPath, isSubRoute]
    )

    const toggleSubmenu = useCallback((item: MenuItem) => {
        if (!item.subItems?.length) {
            setOpenSubmenu(null)
            return
        }
        setOpenSubmenu((current) => (current?.name === item.name ? null : item))
    }, [])

    return {
        menuItems,
        openSubmenu,
        currentPath,
        getItemState,
        toggleSubmenu,
        closeSubmenu: () => setOpenSubmenu(null),
    }
}
