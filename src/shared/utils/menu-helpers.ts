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
    return items
        .filter((item) => hasRoleAccess(item, userRoles))
        .map((item) => {
            if (!item.subItems) {
                return item
            }

            const visibleSubItems = item.subItems.filter((subItem) =>
                hasRoleAccess(subItem, userRoles)
            )

            return { ...item, subItems: visibleSubItems }
        })
}
