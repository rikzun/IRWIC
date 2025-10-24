import { Random } from "random"
import { UTF16Tools } from "../utils/utf16tools"
import { CypherService, HASH_LENGTH, MAX_NOISE } from "./cypher.service"

export class EncryptBuilder {
    protected readonly keycode: string
    protected mCharacters: string[]

    getOutput() { return this.mCharacters.join("") }

    constructor(keycode: string, input: string) {
        this.keycode = keycode
        this.mCharacters = UTF16Tools.splitGraphemes(input)
    }

    async addHash() {
        const random = new Random("hash_" + this.keycode)
        const hash = await CypherService.getSHA256(this.mCharacters.join(""))

        CypherService
            .generateIndexes(random, HASH_LENGTH, this.mCharacters.length)
            .forEach((insertIndex, index) => {
                this.mCharacters.splice(insertIndex, 0, hash[index])
            })

        return this
    }

    addNoise() {
        const random = new Random("noise_" + this.keycode)
        const noiseCount = random.int(0, MAX_NOISE)

        CypherService
            .generateIndexes(random, noiseCount, this.mCharacters.length)
            .forEach((insertIndex) => {
                const char = UTF16Tools.generateChar(random)
                this.mCharacters.splice(insertIndex, 0, char)
            })

        return this
    }

    shuffle() {
        const random = new Random("shuffle_" + this.keycode)
        CypherService.shuffle(random, this.mCharacters)

        return this
    }

    encrypt() {
        const random = new Random("offset_" + this.keycode)

        this.mCharacters = this.mCharacters.map((char) => {
            const codePoints = UTF16Tools.codePointsFromChar(char)
            const offset = UTF16Tools.generateCodePoint(random)
            const final = UTF16Tools.verifyOffset(codePoints.shift()! + offset)

            return UTF16Tools.codePointsToChar([final, ...codePoints])
        })

        return this
    }
}