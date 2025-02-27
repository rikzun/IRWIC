import { create } from "random-seed"
import { UTF16Tools } from "../utils/utf16tools"
import { CypherService, HASH_LENGTH, MAX_NOISE } from "./cypher.service"

export class DecryptBuilder {
    protected readonly keycode: string
    protected mCharacters: string[]

    getOutput() { return this.mCharacters.join('') }

    constructor(keycode: string, input: string) {
        this.keycode = keycode
        this.mCharacters = UTF16Tools.splitGraphemes(input)
    }

    removeHash() {
        const random = create('hash_' + this.keycode)
        const length = this.mCharacters.length - HASH_LENGTH
        if (length < 1) throw Error("WRONG STRING")

        const indexes = CypherService.generateIndexes(random, HASH_LENGTH, length)
        const currentHash = indexes.map((index) => this.mCharacters[index]).join('')
        indexes.reverse().forEach((index) => this.mCharacters.splice(index, 1))

        const hash = CypherService.getHash(this.mCharacters.join(''))
        if (hash !== currentHash) throw Error('HASH MISMATCH')

        return this
    }

    removeNoise() {
        const random = create('noise_' + this.keycode)
        const noiseCount = random.intBetween(0, MAX_NOISE)
        const length = this.mCharacters.length - noiseCount
        if (length < 1) throw Error("WRONG STRING")

        CypherService
            .generateIndexes(random, noiseCount, length)
            .reverse()
            .forEach((index) => this.mCharacters.splice(index, 1))

        return this
    }

    shuffle() {
        const random = create('shuffle_' + this.keycode)
        CypherService.shuffle(random, this.mCharacters, true)

        return this
    }

    decrypt() {
        const random = create('offset_' + this.keycode)

        this.mCharacters = this.mCharacters.map((char) => {
            const offset = UTF16Tools.generateCodePoint(random)
            const codePoints = UTF16Tools.codePointsFromChar(char)
            const final = UTF16Tools.verifyOffset(codePoints.shift()! - offset)

            return UTF16Tools.codePointsToChar([final, ...codePoints])
        })

        return this
    }
}