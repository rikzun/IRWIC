import type { RandomSeed } from "random-seed"

export class UTF16Tools {
    static range00 = 0x0000
    static range01 = 0xD7FF
    static freeSpace = 0x0801
    static range10 = 0xE000
    static range11 = 0x10FFFF

    static generateChar(random: RandomSeed) {
        return this.codePointsToChar([this.generateCodePoint(random)])
    }

    static generateCodePoint(random: RandomSeed) {
        let code = random.intBetween(this.range00, this.range11)
        if (code > this.range01 && code < this.range10) code += this.freeSpace

        return code
    }

    static verifyOffset(offset: number) {
        if (offset > this.range11) return offset - this.range11
        if (offset < 0) return offset + this.range11
        if (offset > this.range01 && offset < this.range10) return offset + this.freeSpace
        return offset
    }

    static codePointsToChar(codePoints: number[]) {
        return String.fromCodePoint(...codePoints)
    }

    static codePointsFromChar(char: string) {
        return Array.from(char)
            .map((v) => v.codePointAt(0)!)
    }

    private static segmenter = new Intl.Segmenter("en", { granularity: "grapheme" })
    static splitGraphemes(value: string) {
        return [...this.segmenter.segment(value)]
            .map((v) => v.segment)
    }
}