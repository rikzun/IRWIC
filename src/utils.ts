import { create as Random } from "random-seed"

export function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value).then(
        () => console.log('COPY PASSED'),
        () => console.log('COPY FAILED')
    )
}

export const UTF16Tools = new class {
    range00 = 0x0000
    range01 = 0xD7FF
    freeSpace = 0x0801
    range10 = 0xE000
    range11 = 0x10FFFF

    generateCode(key: string) {
        let code = Random(key).intBetween(this.range00, this.range11)
        if (code > this.range01 && code < this.range10) code += this.freeSpace

        return code
    }

    generateChar(key: string) {
        return this.codeToChar(this.generateCode(key))
    }

    verifyOffset(offset: number) {
        if (offset > this.range11) return offset - this.range11
        if (offset < 0) return offset + this.range11
        if (offset > this.range01 && offset < this.range10) return offset + this.freeSpace
        return offset
    }

    codeToChar(code: number) { return String.fromCodePoint(code) }
    codeFromChar(char: string) { return char.codePointAt(0)! }
}