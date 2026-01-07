import { motion, AnimatePresence } from "framer-motion"
import { useOutlet, useLocation, ScrollRestoration } from "react-router-dom"

export function AppPageTransition() {
    const location = useLocation()
    const outlet = useOutlet()

    return (
        <>
            <ScrollRestoration />
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {outlet}
                </motion.div>
            </AnimatePresence>
        </>
    )
}
