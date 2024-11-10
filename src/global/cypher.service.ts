import { create as Random } from "random-seed"
import { EncryptBuilder } from "./cypher.encrypt"
import stringHash from "string-hash"
import { DecryptBuilder } from "./cypher.decrypt"

export const MAX_NOISE = 100
export const HASH_LENGTH = 10

export class CypherService {
    static keyFromKeyword(keyword: string) {
        return Array.from(keyword).reduce((acc, char) => {
            let num = 0
        
            for (let i = 0; i < char.length; i++) {
                num += char.codePointAt(i)!
            }

            return acc + num
        }, '')
    }

    static getHash(value: string) {
        const hash = String(stringHash(value))
        const remaining = HASH_LENGTH - hash.length

        if (remaining === 0) return hash
        return '0'.repeat(remaining) + hash
    }

    static generateIndexes(key: string, count: number, maxIndex: number) {
        if (maxIndex + 1 < count) throw Error("generateIndexes: maxIndex too small")

        const ran = Random(key)
        const indexes: number[] = []

        for (let i = 0; i < count; i++) {
            let num = ran.range(maxIndex + 1)

            while (true) {
                if (indexes.includes(num)) {
                    if (num + 1 > maxIndex) num = 0
                    else num += 1

                    continue
                }

                indexes.push(num)
                break
            }
        }

        return indexes.sort((a, b) => a - b)
    }

    static encrypt(rawKey: string, rawInput: string) {
        const key = CypherService.keyFromKeyword(rawKey)

        const builder = new EncryptBuilder(key, rawInput)
            .addHash()
            .addNoise()
            // .shake()
            .build()
            
        return builder.getOutput()
    }

    static decrypt(rawKey: string, rawInput: string) {
        const key = CypherService.keyFromKeyword(rawKey)

        const builder = new DecryptBuilder(key, rawInput)
            .build()
            // .shake()
            .removeHoise()
            .removeHash()
            
        return builder.getOutput()
    }
}