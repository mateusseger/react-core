// filepath: src/components/layout/detail-sections/Section.tsx
import { forwardRef, useEffect, useRef, type ReactNode } from "react"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/shared/utils/cn"
import { useDetailSections } from "./detail-sections-provider"

interface SectionProps {
    id: string
    label: string
    icon?: LucideIcon
    className?: string
    children: ReactNode
}

/**
 * Section - Componente para declarar seções em páginas de detalhe
 *
 * Mobile First: scroll-margin e tipografia responsivos
 *
 * Registra automaticamente a seção no DetailSectionsProvider e renderiza
 * um wrapper com propriedades de acessibilidade.
 *
 * @example
 * ```tsx
 * <Section id="dados-gerais" label="Dados Gerais" icon={Info}>
 *   <Section.Header />
 *   <div>Conteúdo...</div>
 * </Section>
 * ```
 */
const SectionComponent = forwardRef<HTMLDivElement, SectionProps>(
    ({ id, label, icon, className, children }, externalRef) => {
        const internalRef = useRef<HTMLDivElement>(null)
        const ref = (externalRef as React.RefObject<HTMLDivElement>) || internalRef
        const { registerSection, unregisterSection } = useDetailSections()

        useEffect(() => {
            registerSection({ id, label, icon }, ref)

            return () => {
                unregisterSection(id)
            }
        }, [id, label, icon, ref, registerSection, unregisterSection])

        return (
            <section
                ref={ref}
                id={id}
                aria-labelledby={`${id}-heading`}
                role="region"
                tabIndex={-1}
                className={cn(
                    "scroll-mt-16 sm:scroll-mt-20 outline-none",
                    className
                )}
            >
                {children}
            </section>
        )
    }
)

SectionComponent.displayName = "Section"

/**
 * Section.Header - Componente helper para renderizar o cabeçalho da seção
 *
 * Mobile First: Tipografia responsiva
 *
 * Renderiza o título da seção com o id apropriado para aria-labelledby.
 * Use dentro de um componente Section.
 */
interface SectionHeaderProps {
    id: string
    label: string
    icon?: LucideIcon
    className?: string
}

function SectionHeader({ id, label, icon: Icon, className }: SectionHeaderProps) {
    return (
        <h2
            id={`${id}-heading`}
            className={cn(
                "font-semibold tracking-tight flex items-center gap-2",
                "text-xl sm:text-2xl",
                "mb-3 sm:mb-4",
                className
            )}
        >
            {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6" />}
            {label}
        </h2>
    )
}

// Type the Section component with Header as a static property
type SectionWithHeader = typeof SectionComponent & {
    Header: typeof SectionHeader
}

// Attach Header to Section
const Section = SectionComponent as SectionWithHeader
Section.Header = SectionHeader

export { Section }
