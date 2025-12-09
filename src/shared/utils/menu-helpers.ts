import type { MenuItem, MenuSubItem } from "@/shared/types/config"

function hasRoleAccess(
    item: MenuItem | MenuSubItem,
    userRoles: string[]
): boolean {
    if (!item.roles || item.roles.length === 0) {
        return true
    }
    return item.roles.some((role) => userRoles.includes(role))
}

export function filterMenuItemsByRoles(
    items: MenuItem[],
    userRoles: string[]
): MenuItem[] {
    return items.reduce<MenuItem[]>((visibleItems, item) => {
        if (!hasRoleAccess(item, userRoles)) {
            return visibleItems
        }

        const visibleSubItems = item.subItems?.filter((subItem) =>
            hasRoleAccess(subItem, userRoles)
        )

        if (!item.url && visibleSubItems?.length === 0) {
            return visibleItems
        }

        visibleItems.push(visibleSubItems ? { ...item, subItems: visibleSubItems } : item)
        return visibleItems
    }, [])
}
