import { Random } from "random"
import { UnicodeTools } from "../utils/unicode"
import { CypherService, HASH_LENGTH, MAX_NOISE } from "./cypher.service"
import {
    SAFE_ALPHABET_SIZE,
    safeRank,
    safeUnrank,
    unescapeCodePoints,
} from "./alphabet"

export class DecryptBuilder {
    protected readonly keycode: string
    protected mCodePoints: number[]

    getOutput() {
        return UnicodeTools.fromCodePoints(this.mCodePoints)
    }

    constructor(keycode: string, input: string) {
        this.keycode = keycode
        this.mCodePoints = UnicodeTools.toCodePoints(input)
    }

    async removeHash() {
        const random = new Random("hash_" + this.keycode)
        const length = this.mCodePoints.length - HASH_LENGTH
        if (length < 0) throw Error("WRONG STRING")

        const indexes = CypherService.generateIndexes(random, HASH_LENGTH, length)
        const currentHash = indexes
            .map((index) => String.fromCodePoint(this.mCodePoints[index]))
            .join("")

        indexes.reverse().forEach((index) => this.mCodePoints.splice(index, 1))

        const hash = await CypherService.getSHA256(this.getOutput())
        if (hash !== currentHash) throw Error("HASH MISMATCH")

        this.mCodePoints = unescapeCodePoints(this.mCodePoints)

        return this
    }

    removeNoise() {
        const random = new Random("noise_" + this.keycode)
        const noiseCount = random.int(0, MAX_NOISE)
        const length = this.mCodePoints.length - noiseCount
        if (length < 0) throw Error("WRONG STRING")

        CypherService
            .generateIndexes(random, noiseCount, length)
            .reverse()
            .forEach((index) => this.mCodePoints.splice(index, 1))

        return this
    }

    shuffle() {
        const random = new Random("shuffle_" + this.keycode)
        CypherService.shuffle(random, this.mCodePoints, true)

        return this
    }

    decrypt() {
        const random = new Random("offset_" + this.keycode)

        this.mCodePoints = this.mCodePoints.map((codePoint) => {
            const offset = random.int(0, SAFE_ALPHABET_SIZE - 1)
            const index = safeRank(codePoint)

            return safeUnrank((index - offset + SAFE_ALPHABET_SIZE) % SAFE_ALPHABET_SIZE)
        })

        return this
    }
}
