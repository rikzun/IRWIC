import { create as Random } from "random-seed"
import stringHash from "string-hash"

export const CypherService = new class {
    private MAX_UTF16 = 1114111
    private HASH_LENGTH = 10
    private MIN_NOISE = 5

    private getCode(char: string, strict: boolean = false) {
        if (!strict) return char.codePointAt(0)

        return Array(char.length).fill(undefined).reduce((acc, _, i) => {
            return acc + char.codePointAt(i)
        }, 0)
    }

    private codeToChar(code: number) {
        return String.fromCodePoint(code)
    }

    private generateNumber(key: number, index: number, max: number = this.MAX_UTF16) {
        return Random(String(key + index)).range(max)
    }

    private getHash(str: string) {
        const hash = String(stringHash(str))
        const num = this.HASH_LENGTH - hash.length

        if (num === 0) return hash
        return '0'.repeat(num) + hash
    }

    private generateIndexes(key: number, length: number, max: number) {
        const ran = Random(String(key))

        const indexes: number[] = []
        for (let i = 0; i < length; i++) {
            let num = ran.range(max)

            while (true) {
                if (indexes.includes(num)) {
                    if (num + 1 > max) num = 0
                    else num += 1

                    continue
                }

                indexes.push(num)
                break
            }
        }

        return indexes.sort((a, b) => a - b)
    }

    handleKeyword(keyword: string) {
        return Array.from(keyword).reduce((acc, v) => {
            return acc + this.getCode(v, true)
        }, 0)
    }

    injectHash(key: number, rawInput: string) {
        const arr = Array.from(rawInput)
        const hash = this.getHash(rawInput)

        let maxIndex = rawInput.length - 1
        if (maxIndex < this.HASH_LENGTH - 1) maxIndex += this.HASH_LENGTH - 1

        const indexes = this.generateIndexes(key, this.HASH_LENGTH, maxIndex)
        indexes.forEach((v, i) => arr.splice(v, 0, hash[i]))

        return arr
    }

    injectNoise(key: number, rawInput: string[]) {
        const arr = [...rawInput]

        const ran = Random(String(key))
        const num = ran.range(rawInput.length - 1) || this.MIN_NOISE

        const noiseChars: string[] = []
        for (let i = 0; i < num; i++) noiseChars.push(this.codeToChar(ran.range(this.MAX_UTF16)))

        let maxIndex = rawInput.length - 1
        if (maxIndex < noiseChars.length - 1) maxIndex += noiseChars.length - 1

        const indexes = this.generateIndexes(key, num, maxIndex)
        indexes.forEach((v, i) => arr.splice(v, 0, noiseChars[i]))

        return arr
    }

    encrypt(key: number, rawInput: string) {
        const arr1 = this.injectHash(key, rawInput)
        const arr2 = this.injectNoise(key, arr1)
        const arr3 = arr2.map((v, i) => {
            const code = this.getCode(v)
            const offset = this.generateNumber(key, i)

            let final = code + offset
            if (final > this.MAX_UTF16) final -= this.MAX_UTF16

            return String.fromCodePoint(final)
        })

        return arr3.join('')
    }
}