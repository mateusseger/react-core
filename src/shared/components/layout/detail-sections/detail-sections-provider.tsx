// filepath: src/components/layout/detail-sections/DetailSectionsProvider.tsx
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef,
    type ReactNode,
    type RefObject,
} from "react"
import { type LucideIcon } from "lucide-react"

export interface SectionData {
    id: string
    label: string
    icon?: LucideIcon
}

interface DetailSectionsContextValue {
    sections: SectionData[]
    activeSectionId: string | null
    registerSection: (section: SectionData, ref: RefObject<HTMLElement>) => void
    unregisterSection: (id: string) => void
    scrollToSection: (id: string) => void
}

const DetailSectionsContext = createContext<DetailSectionsContextValue | undefined>(undefined)

/**
 * DetailSectionsProvider - Gerencia registro, navegação e detecção de seções ativas
 *
 * Comportamento:
 * - Define a primeira seção como ativa ao carregar
 * - Detecta automaticamente a seção ativa durante scroll manual
 * - Trata o último item corretamente (pode não chegar ao topo)
 * - Atualiza imediatamente ao clicar em um item do menu
 * - Scroll suave com offset para o header
 *
 * Estratégia de Detecção:
 * 1. Durante scroll manual: calcula qual seção está mais próxima da "zona de ativação" (logo abaixo do header)
 * 2. Último item: ativado automaticamente quando o usuário rola até o final da página
 * 3. Durante scroll programático (click): pausa detecção temporariamente para evitar conflitos
 * 4. Usa throttle para otimizar performance
 */
export function DetailSectionsProvider({ children }: { children: ReactNode }) {
    const [sections, setSections] = useState<SectionData[]>([])
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
    const sectionRefs = useRef<Map<string, RefObject<HTMLElement>>>(new Map())
    
    // Refs para evitar recriação de callbacks
    const sectionsRef = useRef<SectionData[]>([])
    const activeSectionIdRef = useRef<string | null>(null)
    
    // Flag para pausar detecção durante scroll programático
    const isScrollingProgrammaticallyRef = useRef(false)
    
    // Timer para throttle
    const scrollTimeoutRef = useRef<number | null>(null)
    
    // Timer para limpar a flag de scroll programático
    const programmaticScrollTimeoutRef = useRef<number | null>(null)

    // Constantes de configuração
    const HEADER_OFFSET = 81 // Zona de ativação: 81px abaixo do topo
    const SCROLL_END_THRESHOLD = 50 // Considera "final da página" quando faltam 50px
    const PROGRAMMATIC_SCROLL_DURATION = 1000 // Duração do scroll programático em ms
    const THROTTLE_DELAY = 100 // Delay do throttle em ms
    
    // Sincroniza refs com states
    useEffect(() => {
        sectionsRef.current = sections
    }, [sections])
    
    useEffect(() => {
        activeSectionIdRef.current = activeSectionId
    }, [activeSectionId])

    /**
     * Registra uma nova seção no provider
     */
    const registerSection = useCallback((section: SectionData, ref: RefObject<HTMLElement>) => {
        sectionRefs.current.set(section.id, ref)

        setSections((prev) => {
            // Evita duplicatas
            if (prev.some((s) => s.id === section.id)) {
                return prev
            }
            return [...prev, section]
        })
    }, [])

    /**
     * Remove uma seção do provider
     */
    const unregisterSection = useCallback((id: string) => {
        sectionRefs.current.delete(id)
        setSections((prev) => prev.filter((s) => s.id !== id))
    }, [])

    /**
     * Calcula qual seção deve estar ativa com base na posição do scroll
     */
    const calculateActiveSection = useCallback(() => {
        // Não calcula se está em scroll programático
        if (isScrollingProgrammaticallyRef.current) {
            return
        }

        const currentSections = sectionsRef.current
        const currentActiveId = activeSectionIdRef.current

        if (currentSections.length === 0) {
            return
        }

        const scrollPosition = window.scrollY + HEADER_OFFSET
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        // Verifica se está no final da página
        const isNearBottom = windowHeight + window.scrollY >= documentHeight - SCROLL_END_THRESHOLD

        // Se está no final, ativa o último item
        if (isNearBottom) {
            const lastSection = currentSections[currentSections.length - 1]
            if (lastSection && currentActiveId !== lastSection.id) {
                setActiveSectionId(lastSection.id)
            }
            return
        }

        // Calcula qual seção está mais próxima da zona de ativação
        let closestSection: SectionData | null = null
        let closestDistance = Infinity

        currentSections.forEach((section) => {
            const ref = sectionRefs.current.get(section.id)
            const element = ref?.current

            if (!element) return

            const rect = element.getBoundingClientRect()
            const elementTop = rect.top + window.scrollY

            // Distância entre o topo do elemento e a zona de ativação
            const distance = Math.abs(elementTop - scrollPosition)

            // Se o elemento está acima da zona de ativação e é o mais próximo
            if (elementTop <= scrollPosition && distance < closestDistance) {
                closestDistance = distance
                closestSection = section
            }
        })

        // Se nenhuma seção está acima da zona de ativação, usa a primeira
        if (!closestSection) {
            closestSection = currentSections[0]
        }

        // Atualiza apenas se mudou
        if (closestSection && currentActiveId !== closestSection.id) {
            setActiveSectionId(closestSection.id)
        }
    }, [])

    /**
     * Handler de scroll com throttle melhorado
     * Garante que a última chamada sempre execute
     */
    const handleScroll = useCallback(() => {
        // Se já tem um timeout agendado, limpa para reagendar
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
        }

        // Agenda nova verificação
        scrollTimeoutRef.current = window.setTimeout(() => {
            calculateActiveSection()
            scrollTimeoutRef.current = null
        }, THROTTLE_DELAY)
    }, [calculateActiveSection])

    /**
     * Realiza scroll suave para uma seção específica
     */
    const scrollToSection = useCallback((id: string) => {
        const ref = sectionRefs.current.get(id)
        const element = ref?.current

        if (!element) return

        // Atualiza imediatamente o item ativo
        setActiveSectionId(id)

        // Limpa timer anterior se existir
        if (programmaticScrollTimeoutRef.current) {
            clearTimeout(programmaticScrollTimeoutRef.current)
        }

        // Ativa flag de scroll programático
        isScrollingProgrammaticallyRef.current = true

        // Calcula posição com offset do header
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset

        // Realiza scroll suave
        window.scrollTo({ top: y, behavior: "smooth" })

        // Desativa flag após a duração estimada do scroll
        programmaticScrollTimeoutRef.current = window.setTimeout(() => {
            isScrollingProgrammaticallyRef.current = false
            programmaticScrollTimeoutRef.current = null
            // Recalcula para garantir consistência
            calculateActiveSection()
        }, PROGRAMMATIC_SCROLL_DURATION)

        // Foco para acessibilidade
        setTimeout(() => {
            element.focus({ preventScroll: true })
        }, PROGRAMMATIC_SCROLL_DURATION / 2)
    }, [calculateActiveSection])

    /**
     * Define a primeira seção como ativa ao carregar ou quando sections mudam
     */
    useEffect(() => {
        if (sections.length > 0 && !activeSectionId) {
            setActiveSectionId(sections[0].id)
        }
    }, [sections, activeSectionId])

    /**
     * Configura listener de scroll
     */
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true })
        
        // Calcula inicialmente
        calculateActiveSection()

        return () => {
            window.removeEventListener("scroll", handleScroll)
            
            // Limpa todos os timers
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
                scrollTimeoutRef.current = null
            }
            
            if (programmaticScrollTimeoutRef.current) {
                clearTimeout(programmaticScrollTimeoutRef.current)
                programmaticScrollTimeoutRef.current = null
            }
        }
    }, [handleScroll, calculateActiveSection])

    return (
        <DetailSectionsContext.Provider
            value={{
                sections,
                activeSectionId,
                registerSection,
                unregisterSection,
                scrollToSection,
            }}
        >
            {children}
        </DetailSectionsContext.Provider>
    )
}

/**
 * useDetailSections - Hook para acessar a API de detail sections
 *
 * @throws {Error} Se usado fora do DetailSectionsProvider
 */
export function useDetailSections() {
    const context = useContext(DetailSectionsContext)
    if (!context) {
        throw new Error("useDetailSections must be used within DetailSectionsProvider")
    }
    return context
}
