/**
 * Sidebar Layout Context
 * Compartilha o estado do submenu entre componentes do layout
 */

import { createContext, useContext, useState, useMemo, type ReactNode } from "react"

interface SidebarLayoutContextValue {
    isSubmenuOpen: boolean
    setIsSubmenuOpen: (open: boolean) => void
}

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | undefined>(undefined)

export function SidebarLayoutProvider({ children }: { children: ReactNode }) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

    const value = useMemo(
        () => ({ isSubmenuOpen, setIsSubmenuOpen }),
        [isSubmenuOpen]
    )

    return (
        <SidebarLayoutContext.Provider value={value}>
            {children}
        </SidebarLayoutContext.Provider>
    )
}

export function useSidebarLayout() {
    const context = useContext(SidebarLayoutContext)
    if (!context) {
        throw new Error("useSidebarLayout must be used within SidebarLayoutProvider")
    }
    return context
}
