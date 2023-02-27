import { create as Random } from "random-seed"
import stringHash from "string-hash"

export const MAX_UTF16 = 1114111
export const MAX_NOISE = 100
export const HASH_LENGTH = 10

export const CypherService = new class {

    codeToChar(code: number) { return String.fromCodePoint(code) }
    codeFromChar(char: string) { return char.codePointAt(0)! }

    keyFromKeyword(keyword: string) {
        return Array.from(keyword).reduce((acc, char) => {
            let num = 0
        
            for (let i = 0; i < char.length; i++) {
                num += char.codePointAt(i)!
            }

            return acc + num
        }, 0)
    }

    getHash(value: string) {
        const hash = String(stringHash(value))
        const remaining = HASH_LENGTH - hash.length

        if (remaining === 0) return hash
        return '0'.repeat(remaining) + hash
    }

    generateIndexes(key: string, count: number, maxIndex: number) {
        const ran = Random(key)
        const indexes: number[] = []

        for (let i = 0; i < count; i++) {
            let num = ran.range(maxIndex)

            while (true) {
                if (indexes.includes(num)) {
                    if (num + 1 > maxIndex) num = 0
                    else num += 1

                    continue
                }

                indexes.push(num)
                break
            }
        }

        return indexes.sort((a, b) => a - b)
    }

    encrypt(rawKey: string, rawInput: string) {
        const key = this.keyFromKeyword(rawKey)

        const builder = new EncryptBuilder(key, rawInput)
            .injectHash()
            .injectNoise()
            
        return builder.build()
    }
}

abstract class CypherBuilderBase {
    protected abstract readonly key: number
    protected abstract readonly raw: string
    protected abstract readonly array: string[] //mutable

    protected abstract shake(): string[]
    abstract build(): string
}

class EncryptBuilder extends CypherBuilderBase {
    protected readonly key: number
    protected readonly raw: string
    protected readonly array: string[]

    constructor(key: number, raw: string) {
        super()
        
        this.key = key
        this.raw = raw
        this.array = Array.from(raw)
    }

    injectHash() {
        const hash = CypherService.getHash(this.raw)

        let maxIndex = this.array.length - 1
        if (maxIndex < HASH_LENGTH - 1) {
            maxIndex += HASH_LENGTH - 1
        }

        CypherService
            .generateIndexes(`${this.key}-hash`, HASH_LENGTH, maxIndex)
            .forEach((insertIndex, index) => {
                this.array.splice(insertIndex, 0, hash[index])
            })

        return this
    }

    injectNoise() {
        const ran = Random(`${this.key}-noise-count`)
        const noiseCount = ran.range(MAX_NOISE)

        let maxIndex = this.array.length - 1
        if (maxIndex < noiseCount - 1) maxIndex += noiseCount - 1

        CypherService
            .generateIndexes(`${this.key}-noise`, noiseCount, maxIndex)
            .forEach((insertIndex) => {
                const char = CypherService.codeToChar(ran.range(MAX_UTF16))
                this.array.splice(insertIndex, 0, char)
            })

        return this
    }

    protected shake() {
        let i = 0

        return [...this.array].sort(() =>
            Random(`${this.key + (i += 1)}-shake`).range(100)
        )
    }

    build() {
        const encrypted = this.shake().map((v, i) => {
            const code = CypherService.codeFromChar(v)
            const offset = Random(`${this.key + i}-offset`).range(MAX_UTF16)

            let final = code + offset
            if (final > MAX_UTF16) final -= MAX_UTF16

            return CypherService.codeToChar(final)
        })

        return encrypted.join('')
    }
}