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
            .addHash()
            .addNoise()
            .shake()
            .build()
            
        return builder.getOutput()
    }

    decrypt(rawKey: string, rawInput: string) {
        const key = this.keyFromKeyword(rawKey)

        const builder = new DecryptBuilder(key, rawInput)
            .build()
            .shake()
            .removeHoise()
            .removeHash()
            
        return builder.getOutput()
    }
}

abstract class CypherBuilderBase {
    protected abstract readonly key: number
    protected abstract readonly raw: string
    protected abstract readonly array: string[] //mutable
    protected abstract output: string | null

    abstract shake(): this
    abstract build(): this
    abstract getOutput(): string
}

class EncryptBuilder extends CypherBuilderBase {
    protected readonly key: number
    protected readonly raw: string
    protected readonly array: string[]

    protected output: string | null = null
    getOutput() { return this.output! }

    constructor(key: number, raw: string) {
        super()
        
        this.key = key
        this.raw = raw
        this.array = Array.from(raw)
    }

    addHash() {
        const hash = CypherService.getHash(this.raw)

        let maxIndex = this.array.length - 1
        if (maxIndex < HASH_LENGTH) maxIndex += HASH_LENGTH

        CypherService
            .generateIndexes(`${this.key}-hash`, HASH_LENGTH, maxIndex)
            .forEach((insertIndex, index) => {
                this.array.splice(insertIndex, 0, hash[index])
            })

        return this
    }

    addNoise() {
        const ran = Random(`${this.key}-noise-count`)
        const noiseCount = ran.range(MAX_NOISE)

        let maxIndex = this.array.length - 1
        if (maxIndex < noiseCount) maxIndex += noiseCount

        CypherService
            .generateIndexes(`${this.key}-noise`, noiseCount, maxIndex)
            .forEach((insertIndex) => {
                const char = CypherService.codeToChar(ran.range(MAX_UTF16))
                this.array.splice(insertIndex, 0, char)
            })

        return this
    }

    shake() {
        let i = 0

        this.array.sort(() =>
            Random(`${this.key + (i += 1)}-shake`).range(100)
        )

        return this
    }

    build() {
        const encrypted = this.array.map((v, i) => {
            const code = CypherService.codeFromChar(v)
            const offset = Random(`${this.key + i}-offset`).range(MAX_UTF16)

            let final = code + offset
            if (final > MAX_UTF16) final -= MAX_UTF16

            return CypherService.codeToChar(final)
        })

        this.output = encrypted.join('')
        return this
    }
}

class DecryptBuilder extends CypherBuilderBase {
    protected readonly key: number
    protected readonly raw: string
    protected readonly array: string[]

    protected output: string | null = null
    getOutput() { return this.array.join('') }

    constructor(key: number, raw: string) {
        super()
        
        this.key = key
        this.raw = raw
        this.array = Array.from(raw)
    }

    removeHoise() {
        const ran = Random(`${this.key}-noise-count`)

        const noiseCount = ran.range(MAX_NOISE)
        const maxIndex = this.array.length - 1

        CypherService
            .generateIndexes(`${this.key}-noise`, noiseCount, maxIndex)
            .reverse()
            .forEach((index) => this.array.splice(index, 1))

        return this
    }

    removeHash() {
        const maxIndex = this.array.length - 1 - HASH_LENGTH

        const indexes = CypherService
            .generateIndexes(`${this.key}-hash`, HASH_LENGTH, maxIndex)
            .reverse()

        const currentHash = indexes.map((v) => this.array[v]).reverse().join('')
        indexes.forEach((index) => this.array.splice(index, 1))

        const hash = CypherService.getHash(this.array.join(''))
        if (hash !== currentHash) {
            this.array.splice(0, this.array.length)
            this.array.push(...Array.from('HASH MISMATCH'))
        }

        return this
    }

    shake() {
        let i = 0

        this.array.sort(() =>
            Random(`${this.key + (i += 1)}-shake`).range(100)
        )

        return this
    }

    build() {
        const decrypted = this.array.map((v, i) => {
            const offset = Random(`${this.key + i}-offset`).range(MAX_UTF16)
            const code = CypherService.codeFromChar(v)

            let final = code - offset
            if (final < 0) final += MAX_UTF16

            return CypherService.codeToChar(final)
        })

        this.array.splice(0, this.array.length)
        this.array.push(...decrypted)
        return this
    }
}