import { useState, useEffect, useRef } from "react"

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
    const value = BREAKPOINTS[breakpoint]
    const [isBelow, setIsBelow] = useState<boolean | undefined>(undefined)
    const onEnterRef = useRef(options?.onEnter)

    onEnterRef.current = options?.onEnter

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${value - 1}px)`)

        const onChange = () => {
            setIsBelow(mql.matches)
            if (mql.matches && onEnterRef.current) {
                onEnterRef.current()
            }
        }

        onChange()
        mql.addEventListener("change", onChange)
        return () => mql.removeEventListener("change", onChange)
    }, [value])

    return !!isBelow
}
