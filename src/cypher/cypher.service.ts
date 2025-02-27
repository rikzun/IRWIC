import type { RandomSeed } from "random-seed"
import { EncryptBuilder } from "./cypher.encrypt"
import { DecryptBuilder } from "./cypher.decrypt"
import { UTF16Tools } from "src/utils/utf16tools"
import stringHash from "string-hash"

export const MAX_NOISE = 100
export const HASH_LENGTH = 10

export class CypherService {
    static keywordToKeycode(keyword: string) {
        return UTF16Tools.splitGraphemes(keyword).map((grapheme) => `(${
            Array.from(grapheme)
                .map((v) => v.codePointAt(0)!)
                .join('|')
        })`).join('')
    }

    static getHash(value: string) {
        return stringHash(value)
            .toString()
            .padStart(HASH_LENGTH, '0')
    }

    static generateIndexes(random: RandomSeed, count: number, stringLength: number) {
        const maxIndex = stringLength - 1 + count
        const indexes = new Set<number>()

        while (indexes.size < count) {
            let num = random.intBetween(0, maxIndex)
            indexes.add(num)
        }

        return Array.from(indexes)
            .sort((a, b) => a - b)
    }

    static shuffle(random: RandomSeed, mCharacters: string[], reverse = false) {
        const maxIndex = mCharacters.length - 1
        const indexes = new Array(maxIndex)

        for (let i = maxIndex; i > 0; i--) {
            indexes[maxIndex - i] = [i, random.intBetween(0, i)]
        }

        if (reverse) indexes.reverse()
        
        indexes.forEach(([i, j]) => {
            [mCharacters[i], mCharacters[j]] = [mCharacters[j], mCharacters[i]]
        })
    }

    static encrypt(keyword: string, input: string) {
        const keycode = CypherService.keywordToKeycode(keyword)

        return new EncryptBuilder(keycode, input)
            .addHash()
            .addNoise()
            .shuffle()
            .encrypt()
            .getOutput()
    }

    static decrypt(keyword: string, input: string) {
        const keycode = CypherService.keywordToKeycode(keyword)

        try {
            return new DecryptBuilder(keycode, input)
                .decrypt()
                .shuffle()
                .removeNoise()
                .removeHash()
                .getOutput()
        } catch(e: any) {
            return e.message
        }
    }
}