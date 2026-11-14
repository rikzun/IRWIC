import { Random } from "random"
import { UnicodeTools } from "../utils/unicode"
import { CypherService, HASH_LENGTH, MAX_NOISE } from "./cypher.service"
import {
    SAFE_ALPHABET_SIZE,
    escapeCodePoints,
    randomSafeCodePoint,
    safeRank,
    safeUnrank,
} from "./alphabet"

export class EncryptBuilder {
    protected readonly keycode: string
    protected mCodePoints: number[]

    getOutput() {
        return UnicodeTools.fromCodePoints(this.mCodePoints)
    }

    constructor(keycode: string, input: string) {
        this.keycode = keycode
        this.mCodePoints = escapeCodePoints(UnicodeTools.toCodePoints(input))
    }

    async addHash() {
        const random = new Random("hash_" + this.keycode)
        const hash = await CypherService.getSHA256(this.getOutput())

        CypherService
            .generateIndexes(random, HASH_LENGTH, this.mCodePoints.length)
            .forEach((insertIndex, index) => {
                this.mCodePoints.splice(insertIndex, 0, hash.codePointAt(index)!)
            })

        return this
    }

    addNoise() {
        const random = new Random("noise_" + this.keycode)
        const noiseCount = random.int(0, MAX_NOISE)

        CypherService
            .generateIndexes(random, noiseCount, this.mCodePoints.length)
            .forEach((insertIndex) => {
                this.mCodePoints.splice(insertIndex, 0, randomSafeCodePoint(random))
            })

        return this
    }

    shuffle() {
        const random = new Random("shuffle_" + this.keycode)
        CypherService.shuffle(random, this.mCodePoints)

        return this
    }

    encrypt() {
        const random = new Random("offset_" + this.keycode)

        this.mCodePoints = this.mCodePoints.map((codePoint) => {
            const offset = random.int(0, SAFE_ALPHABET_SIZE - 1)
            const index = safeRank(codePoint)

            return safeUnrank((index + offset) % SAFE_ALPHABET_SIZE)
        })

        return this
    }
}
