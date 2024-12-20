import { create as Random } from "random-seed"
import { CypherBuilderBase } from "../types"
import { UTF16Tools } from "../utils"
import { CypherService, HASH_LENGTH, MAX_NOISE } from "./cypher.service"

export class EncryptBuilder extends CypherBuilderBase {
    protected readonly key: string
    protected readonly raw: string
    protected readonly array: string[]

    protected output: string | null = null
    getOutput() { return this.output! }

    constructor(key: string, raw: string) {
        super()
        
        this.key = key
        this.raw = raw
        this.array = Array.from(raw)
    }

    addHash() {
        const hash = CypherService.getHash(this.raw)
        const maxIndex = (this.array.length + HASH_LENGTH) - 1

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
        const maxIndex = (this.array.length + noiseCount) - 1

        CypherService
            .generateIndexes(`${this.key}-noise-index`, noiseCount, maxIndex)
            .forEach((insertIndex) => {
                const char = UTF16Tools.generateChar(`${this.key}-noise-char`)
                this.array.splice(insertIndex, 0, char)
            })

        return this
    }

    shake() {
        const maxIndex = this.array.length - 1
        for (let i = maxIndex; i > 0; i--) {
            const j = Random(`${this.key + i}-shake`).range(maxIndex);
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]]
        }

        return this
    }

    build() {
        const encrypted = this.array.map((v, i) => {
            const code = UTF16Tools.codeFromChar(v)
            const offset = UTF16Tools.generateCode(`${this.key + i}-offset`)
            const final = UTF16Tools.verifyOffset(code + offset)

            return UTF16Tools.codeToChar(final)
        })

        this.output = encrypted.join('')
        return this
    }
}