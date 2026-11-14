export class UnicodeTools {
    static toCodePoints(value: string) {
        return Array.from(value, (char) => char.codePointAt(0)!)
    }

    static fromCodePoints(codePoints: Iterable<number>) {
        let result = ""

        for (const codePoint of codePoints) {
            result += String.fromCodePoint(codePoint)
        }

        return result
    }
}
