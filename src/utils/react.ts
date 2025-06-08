import { Dispatch, SetStateAction, useEffect, useState } from "react"


export interface Storage<T> {
    value: T
    set: Dispatch<SetStateAction<T>>
}

export function useDebouncedEffect(delay: number, callback: () => any, dependencies: any[]) {
    useEffect(() => {
        const timer = setTimeout(() => {
            callback()
        }, delay)

        return () => clearTimeout(timer)
    }, dependencies)
}

export function useStorage <T>(value: T): Storage<T> {
    const [state, setState] = useState(value)
    return { value: state, set: setState }
}