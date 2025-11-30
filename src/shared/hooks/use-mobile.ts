import { useBreakpoint } from "./use-breakpoint"

export function useMobile() {
    return useBreakpoint("md")
}
