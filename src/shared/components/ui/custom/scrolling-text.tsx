import { motion } from "framer-motion"

interface ScrollingTextProps {
    text: string
    className?: string
}

/**
 * ScrollingText - Componente de texto com efeito de carrossel
 *
 * Funcionalidades:
 * - Animação de scroll horizontal contínua
 * - Animação suave e fluida em loop infinito
 *
 * @param text - Texto a ser exibido
 * @param className - Classes CSS adicionais
 */
export function ScrollingText({ text, className = "" }: ScrollingTextProps) {
    // Duração baseada no comprimento do texto (aproximadamente 50px por segundo)
    const animationDuration = text.length / 1

    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div
                className="inline-flex"
                animate={{
                    x: ["0%", "-50%"]
                }}
                transition={{
                    duration: animationDuration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                <div className="flex shrink-0">
                    <span className="px-4">{text}</span>
                    <span className="px-4">{text}</span>
                </div>
            </motion.div>
        </div>
    )
}
