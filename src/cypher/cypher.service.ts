import type { Random } from "random"
import { EncryptBuilder } from "./cypher.encrypt"
import { DecryptBuilder } from "./cypher.decrypt"
import { UTF16Tools } from "@utils/utf16tools"

export const MAX_NOISE = 100
export const HASH_LENGTH = 64

export class CypherService {
    static keywordToKeycode(keyword: string) {
        return UTF16Tools.splitGraphemes(keyword).map((grapheme) => {
            return Array.from(grapheme)
                .map((v) => v.codePointAt(0)!)
                .join("|")
        }).join(";")
    }

    static async getSHA256(value: string) {
        const message = new TextEncoder().encode(value)
        const hashBuffer = await self.crypto.subtle.digest("SHA-256", message)
        const hashArray = Array.from(new Uint8Array(hashBuffer))

        return hashArray
            .map((v) => v.toString(16).padStart(2, "0"))
            .join("")
    }

    static generateIndexes(random: Random, count: number, stringLength: number) {
        const maxIndex = stringLength - 1 + count
        const indexes = new Set<number>()

        while (indexes.size < count) {
            let num = random.int(0, maxIndex)
            indexes.add(num)
        }

        return Array.from(indexes)
            .sort((a, b) => a - b)
    }

    static shuffle(random: Random, mCharacters: string[], reverse = false) {
        const length = mCharacters.length
        const maxIndex = length - 1
        const swaps = new Array(maxIndex)

        for (let i = maxIndex; i > 0; i--) {
            const j = random.int(0, i)
            swaps[length - 1 - i] = [i, j]
        }

        if (reverse) swaps.reverse()

        swaps.forEach(([i, j]) => {
            [mCharacters[i], mCharacters[j]] = [mCharacters[j], mCharacters[i]]
        })
    }

    static async encrypt(keyword: string, input: string) {
        const keycode = CypherService.keywordToKeycode(keyword)
        const encrypter = new EncryptBuilder(keycode, input)

        await encrypter.addHash()
        encrypter.addNoise()
        encrypter.shuffle()
        encrypter.encrypt()

        return encrypter.getOutput()
    }

    static async decrypt(keyword: string, input: string) {
        const keycode = CypherService.keywordToKeycode(keyword)
        const decrypter = new DecryptBuilder(keycode, input)

        try {
            decrypter.decrypt()
            decrypter.shuffle()
            decrypter.removeNoise()
            await decrypter.removeHash()

            return decrypter.getOutput()
        } catch(e: any) {
            return e.message
        }
    }
}