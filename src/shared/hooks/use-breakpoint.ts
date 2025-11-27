import { useState, useEffect } from "react"

const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const

type BreakpointKey = keyof typeof BREAKPOINTS

interface UseBreakpointOptions {
    onEnter?: () => void
}

export function useBreakpoint(breakpoint: BreakpointKey, options?: UseBreakpointOptions) {
    const [isBelow, setIsBelow] = useState(false)
    const value = BREAKPOINTS[breakpoint]

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${value - 1}px)`)
        const onChange = () => {
            setIsBelow(window.innerWidth < value)
            if (window.innerWidth < value && options?.onEnter) {
                options.onEnter()
            }
        }
        mql.addEventListener("change", onChange)
        setIsBelow(window.innerWidth < value)
        return () => mql.removeEventListener("change", onChange)
    }, [value, options?.onEnter])

    return isBelow
}
