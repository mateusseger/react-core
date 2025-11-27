import { memo } from "react"
import { AppHeader } from "./app-header"
import { AppSidebarMenu } from "./app-sidebar-menu"
import { AppPageTransition } from "./app-page-transition"
import { SidebarProvider } from "../ui/shadcn/sidebar"
import { DetailSectionsProvider } from "./detail-sections/detail-sections-provider"
import { DetailSectionsSidebar } from "./detail-sections/detail-sections-sidebar"
import { Toaster } from "../ui/shadcn/sonner"
import { cn } from "@/shared/utils/cn"
import type { MenuItem, ProjectConfig } from "@/shared/types/config"

export interface AppLayoutProps {
    menuItems: MenuItem[]
    projectConfig: ProjectConfig
}

export const AppLayout = memo(function AppLayout({ menuItems, projectConfig }: AppLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebarMenu menuItems={menuItems} projectConfig={projectConfig} />

            <DetailSectionsProvider>
                <div className="flex-1 flex flex-col min-w-0">
                    <AppHeader />

                    <div className="flex flex-1 min-w-0 flex-col lg:flex-row">
                        <DetailSectionsSidebar />

                        <main className="flex-1 min-w-0">
                            <div className={cn(
                                "container mx-auto",
                                "p-4 sm:p-6",
                                "max-w-full lg:max-w-7xl"
                            )}>
                                <AppPageTransition />
                                <Toaster position="top-right" />
                            </div>
                        </main>
                    </div>
                </div>
            </DetailSectionsProvider>
        </SidebarProvider>
    )
})
