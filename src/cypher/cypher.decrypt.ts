import { Random } from "random"
import { UTF16Tools } from "../utils/utf16tools"
import { CypherService, HASH_LENGTH, MAX_NOISE } from "./cypher.service"

export class DecryptBuilder {
    protected readonly keycode: string
    protected mCharacters: string[]

    getOutput() { return this.mCharacters.join("") }

    constructor(keycode: string, input: string) {
        this.keycode = keycode
        this.mCharacters = UTF16Tools.splitGraphemes(input)
    }

    async removeHash() {
        const random = new Random("hash_" + this.keycode)
        const length = this.mCharacters.length - HASH_LENGTH
        if (length < 1) throw Error("WRONG STRING")

        const indexes = CypherService.generateIndexes(random, HASH_LENGTH, length)
        const currentHash = indexes.map((index) => this.mCharacters[index]).join("")
        indexes.reverse().forEach((index) => this.mCharacters.splice(index, 1))

        const hash = await CypherService.getSHA256(this.mCharacters.join(""))
        if (hash !== currentHash) throw Error("HASH MISMATCH")

        return this
    }

    removeNoise() {
        const random = new Random("noise_" + this.keycode)
        const noiseCount = random.int(0, MAX_NOISE)
        const length = this.mCharacters.length - noiseCount
        if (length < 1) throw Error("WRONG STRING")

        CypherService
            .generateIndexes(random, noiseCount, length)
            .reverse()
            .forEach((index) => this.mCharacters.splice(index, 1))

        return this
    }

    shuffle() {
        const random = new Random("shuffle_" + this.keycode)
        CypherService.shuffle(random, this.mCharacters, true)

        return this
    }

    decrypt() {
        const random = new Random("offset_" + this.keycode)

        this.mCharacters = this.mCharacters.map((char) => {
            const offset = UTF16Tools.generateCodePoint(random)
            const codePoints = UTF16Tools.codePointsFromChar(char)
            const final = UTF16Tools.verifyOffset(codePoints.shift()! - offset)

            return UTF16Tools.codePointsToChar([final, ...codePoints])
        })

        return this
    }
}