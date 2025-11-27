import { motion, AnimatePresence } from "framer-motion"
import { useOutlet, useLocation } from "react-router-dom"
import { cloneElement } from "react"

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
