import { create as Random } from "random-seed"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value)
}

export class UTF16Tools {
    static range00 = 0x0000
    static range01 = 0xD7FF
    static freeSpace = 0x0801
    static range10 = 0xE000
    static range11 = 0x10FFFF

    static generateCode(key: string) {
        let code = Random(key).intBetween(this.range00, this.range11)
        if (code > this.range01 && code < this.range10) code += this.freeSpace

        return code
    }

    static generateChar(key: string) {
        return this.codeToChar(this.generateCode(key))
    }

    static verifyOffset(offset: number) {
        if (offset > this.range11) return offset - this.range11
        if (offset < 0) return offset + this.range11
        if (offset > this.range01 && offset < this.range10) return offset + this.freeSpace
        return offset
    }

    static codeToChar(code: number) { return String.fromCodePoint(code) }
    static codeFromChar(char: string) { return char.codePointAt(0)! }
}

export interface UseState<T> {
    value: T
    set: Dispatch<SetStateAction<T>>
}

export function useDebouncedEffect(callback: () => any, dependencies: any[], delay = 100) {
    useEffect(() => {
        const timer = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(timer);
    }, [...dependencies, delay]);
}

export function useStorage <T>(value: T): UseState<T> {
    const [state, setState] = useState(value)
    return { value: state, set: setState }
}