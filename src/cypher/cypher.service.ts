import type { Random } from "random"
import { EncryptBuilder } from "./cypher.encrypt"
import { DecryptBuilder } from "./cypher.decrypt"
import { UnicodeTools } from "../utils/unicode"

export const MAX_NOISE = 100
export const HASH_LENGTH = 64

export class CypherService {
    static keywordToKeycode(keyword: string) {
        return UnicodeTools
            .toCodePoints(keyword.normalize("NFC"))
            .join(";")
    }

    static async getSHA256(value: string) {
        const message = new TextEncoder().encode(value)
        const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", message)
        const hashArray = Array.from(new Uint8Array(hashBuffer))

        return hashArray
            .map((v) => v.toString(16).padStart(2, "0"))
            .join("")
    }

    static generateIndexes(random: Random, count: number, stringLength: number) {
        const maxIndex = stringLength - 1 + count
        const indexes = new Set<number>()

        while (indexes.size < count) {
            indexes.add(random.int(0, maxIndex))
        }

        return Array.from(indexes)
            .sort((a, b) => a - b)
    }

    static shuffle<T>(random: Random, characters: T[], reverse = false) {
        const length = characters.length
        if (length < 2) return

        const maxIndex = length - 1
        const swaps: [number, number][] = []

        for (let i = maxIndex; i > 0; i--) {
            const j = random.int(0, i)
            swaps[length - 1 - i] = [i, j]
        }

        if (reverse) swaps.reverse()

        swaps.forEach(([i, j]) => {
            [characters[i], characters[j]] = [characters[j], characters[i]]
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
        } catch (error) {
            return error instanceof Error ? error.message : String(error)
        }
    }
}
