// filepath: src/components/layout/detail-sections/DetailSectionsSidebar.tsx
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/utils/cn"
import { useDetailSections } from "./detail-sections-provider"

/**
 * DetailSectionsSidebar - Terceiro sidebar para navegação entre seções
 *
 * Renderiza uma lista de seções registradas e permite navegação por scroll suave.
 * Layout não-fixed que flui naturalmente com o conteúdo.
 *
 * Comportamento:
 * - Sticky positioning interno para permanecer visível durante scroll
 * - Destaque da seção ativa
 * - Click para scroll suave
 * - Responsivo: escondido em mobile (< 1280px)
 * - Flui naturalmente ao lado do conteúdo sem position fixed
 * - Animação suave de entrada/saída
 *
 * Layout:
 * - Usa flexbox natural do SidebarProvider
 * - Sticky apenas no conteúdo interno
 * - Largura fixa de 14rem (224px)
 * - Animação: width e opacity (similar ao submenu)
 */
export function DetailSectionsSidebar() {
    const { sections, activeSectionId, scrollToSection } = useDetailSections()

    // Não renderiza se não houver seções
    const hasSections = sections.length > 0

    return (
        <AnimatePresence mode="wait">
            {hasSections && (
                <motion.aside
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 224, opacity: 1 }} // 224px = 14rem = w-56
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className="hidden xl:block"
                >
                    <div className="flex flex-col py-6 px-4 fixed h-screen w-56 border-r">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-2 whitespace-nowrap">
                            Nesta página
                        </h3>

                        <nav className="flex-1">
                            <ul className="space-y-1">
                                {sections.map((section) => {
                                    const isActive = activeSectionId === section.id
                                    const Icon = section.icon

                                    return (
                                        <li key={section.id}>
                                            <button
                                                onClick={() => scrollToSection(section.id)}
                                                className={cn(
                                                    "w-full text-left px-2 py-2 rounded-md text-sm transition-colors",
                                                    "hover:bg-accent hover:text-accent-foreground",
                                                    "flex items-center gap-2",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                    isActive && "bg-accent text-accent-foreground font-medium"
                                                )}
                                                aria-current={isActive ? "location" : undefined}
                                            >
                                                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                                                <span className="truncate">{section.label}</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                    </div>
                </motion.aside>
            )
            }
        </AnimatePresence >
    )
}
