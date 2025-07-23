import { useEffect } from "react"

export function useDebouncedEffect(delay: number, callback: () => any, dependencies: any[]) {
    useEffect(() => {
        const timer = setTimeout(() => {
            callback()
        }, delay)

        return () => clearTimeout(timer)
    }, dependencies)
}