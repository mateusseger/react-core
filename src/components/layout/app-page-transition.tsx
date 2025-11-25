import { motion, AnimatePresence } from "framer-motion"
import { useOutlet, useLocation } from "react-router-dom"
import { cloneElement } from "react"

/**
 * AppPageTransition - Provê animação suave de fade nas mudanças de rota usando Framer Motion
 *
 * Funcionalidades:
 * - Animação de transição entre páginas sem perder o estado dos componentes
 * - Fade in/out suave durante navegação
 * - Preserva o estado interno dos componentes durante a transição
 *
 * Como Funciona:
 * - Utiliza AnimatePresence para detectar mudanças de rota via location.pathname
 * - Anima a transição de opacidade sem forçar remontagem da árvore de componentes
 * - Componentes filhos mantêm seu estado interno durante a navegação
 * - useOutlet obtém o componente da rota atual
 * - cloneElement permite aplicar animações sem quebrar a hierarquia React
 *
 * Configuração da Animação:
 * - Initial: opacity 0 (invisível)
 * - Animate: opacity 1 (visível)
 * - Exit: opacity 0 (invisível)
 * - Duration: 0.2s com easing suave
 *
 * Modo de Animação:
 * - "wait": Aguarda a animação de saída antes de iniciar a de entrada
 * - Evita sobreposição de conteúdo durante transições
 *
 * @see https://www.framer.com/motion/animate-presence/
 */
export function AppPageTransition() {
    const location = useLocation()
    const element = useOutlet()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                {element && cloneElement(element, { key: location.pathname })}
            </motion.div>
        </AnimatePresence>
    )
}

