import { create as Random } from "random-seed"
import { CypherBuilderBase } from "../types"
import { UTF16Tools } from "../utils"
import { CypherService, HASH_LENGTH, MAX_NOISE } from "./cypher.service"

export class DecryptBuilder extends CypherBuilderBase {
    protected readonly key: string
    protected readonly raw: string
    protected readonly array: string[]

    protected output: string | null = null
    getOutput() { return this.array.join('') }

    constructor(key: string, raw: string) {
        super()
        
        this.key = key
        this.raw = raw
        this.array = Array.from(raw)
    }

    removeHoise() {
        const ran = Random(`${this.key}-noise-count`)

        const noiseCount = ran.range(MAX_NOISE)
        const maxIndex = this.array.length - 1
        if (maxIndex + 1 < noiseCount) return this

        CypherService
            .generateIndexes(`${this.key}-noise-index`, noiseCount, maxIndex)
            .reverse()
            .forEach((index) => this.array.splice(index, 1))

        return this
    }

    removeHash() {
        const maxIndex = this.array.length - 1
        if (maxIndex + 1 < HASH_LENGTH) {
            this.array.splice(0, this.array.length)
            this.array.push(...Array.from('HASH MISMATCH'))
            return this
        }

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
        const maxIndex = this.array.length - 1
        for (let i = 0; i < maxIndex; i++) {
            const j = Random(`${this.key + (maxIndex - i)}-shake`).range(maxIndex);
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]]
        }

        return this
    }

    build() {
        const decrypted = this.array.map((v, i) => {
            const offset = UTF16Tools.generateCode(`${this.key + i}-offset`)
            const code = UTF16Tools.codeFromChar(v)
            const final = UTF16Tools.verifyOffset(code - offset)

            return UTF16Tools.codeToChar(final)
        })

        this.array.splice(0, this.array.length)
        this.array.push(...decrypted)
        return this
    }
}