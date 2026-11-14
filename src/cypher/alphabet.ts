import type { Random } from "random"

export const ESCAPE_LOW = 0x4E00
export const ESCAPE_HIGH = 0x4E01

type Range = readonly [start: number, end: number]

const RAW_EXCLUDED_RANGES: Range[] = [
    [0x0000, 0x001F], // C0 controls, включая \t, \n, \r
    [0x0020, 0x0020], // space
    [0x0022, 0x0022], // "
    [0x0026, 0x0026], // &
    [0x0027, 0x0027], // '
    [0x003C, 0x003C], // <
    [0x003E, 0x003E], // >
    [0x005C, 0x005C], // backslash
    [0x0060, 0x0060], // backtick
    [0x007F, 0x009F], // DEL + C1 controls
    [0x00A0, 0x00A0], // no-break space
    [0x00AD, 0x00AD], // soft hyphen
    [0x034F, 0x034F], // combining grapheme joiner
    [0x061C, 0x061C], // Arabic letter mark
    [0x115F, 0x1160], // Hangul fillers
    [0x1680, 0x1680], // Ogham space mark
    [0x17B4, 0x17B5], // Khmer inherent vowels
    [0x180B, 0x180F], // Mongolian FVS/MVS
    [0x2000, 0x200F], // spaces, zero-width, bidi marks
    [0x2028, 0x202E], // line/paragraph separators, bidi overrides
    [0x202F, 0x202F], // narrow no-break space
    [0x205F, 0x2064], // math space, word joiner, invisible operators
    [0x2066, 0x206F], // bidi isolates, deprecated format chars
    [0x3000, 0x3000], // ideographic space
    [0xD800, 0xDFFF], // surrogates
    [0xFDD0, 0xFDEF], // noncharacters
    [0xFE00, 0xFE0F], // variation selectors
    [0xFEFF, 0xFEFF], // BOM / zero-width no-break space
    [0xFFFD, 0xFFFD], // replacement character
    [0xE0000, 0xE007F], // tag characters
    [0xE0100, 0xE01EF], // variation selectors supplement
]

for (let plane = 0; plane <= 0x10; plane++) {
    const base = plane * 0x10000
    RAW_EXCLUDED_RANGES.push([base + 0xFFFE, base + 0xFFFF])
}

function mergeRanges(ranges: Range[]) {
    const sorted = ranges
        .map(([start, end]) => [start, end] as [number, number])
        .sort((a, b) => a[0] - b[0])

    const merged: [number, number][] = []

    for (const [start, end] of sorted) {
        const last = merged[merged.length - 1]

        if (last != null && start <= last[1] + 1) {
            last[1] = Math.max(last[1], end)
        } else {
            merged.push([start, end])
        }
    }

    return merged
}

const EXCLUDED_RANGES = mergeRanges(RAW_EXCLUDED_RANGES)

type AlphabetRange = {
    start: number
    end: number
    prefix: number
}

const ALLOWED_RANGES: AlphabetRange[] = []
let safeAlphabetSize = 0
let cursor = 0

for (const [excludedStart, excludedEnd] of EXCLUDED_RANGES) {
    if (cursor < excludedStart) {
        const end = excludedStart - 1
        ALLOWED_RANGES.push({ start: cursor, end, prefix: safeAlphabetSize })
        safeAlphabetSize += end - cursor + 1
    }

    cursor = Math.max(cursor, excludedEnd + 1)
}

if (cursor <= 0x10FFFF) {
    const end = 0x10FFFF
    ALLOWED_RANGES.push({ start: cursor, end, prefix: safeAlphabetSize })
    safeAlphabetSize += end - cursor + 1
}

export const SAFE_ALPHABET_SIZE = safeAlphabetSize

function findRangeIndex(codePoint: number) {
    let low = 0
    let high = ALLOWED_RANGES.length - 1

    while (low <= high) {
        const middle = (low + high) >> 1
        const range = ALLOWED_RANGES[middle]

        if (codePoint < range.start) {
            high = middle - 1
        } else if (codePoint > range.end) {
            low = middle + 1
        } else {
            return middle
        }
    }

    return -1
}

export function isSafeCodePoint(codePoint: number) {
    return findRangeIndex(codePoint) !== -1
}

export function safeRank(codePoint: number) {
    const rangeIndex = findRangeIndex(codePoint)
    if (rangeIndex === -1) {
        const hex = codePoint.toString(16).toUpperCase().padStart(4, "0")
        throw Error(`UNSAFE CODE POINT: U+${hex}`)
    }

    const range = ALLOWED_RANGES[rangeIndex]
    return range.prefix + codePoint - range.start
}

export function safeUnrank(index: number) {
    if (!Number.isInteger(index) || index < 0 || index >= SAFE_ALPHABET_SIZE) {
        throw Error(`ALPHABET INDEX OUT OF RANGE: ${index}`)
    }

    let low = 0
    let high = ALLOWED_RANGES.length - 1

    while (low <= high) {
        const middle = (low + high) >> 1
        const range = ALLOWED_RANGES[middle]
        const length = range.end - range.start + 1

        if (index < range.prefix) {
            high = middle - 1
        } else if (index >= range.prefix + length) {
            low = middle + 1
        } else {
            return range.start + index - range.prefix
        }
    }

    throw Error(`ALPHABET INDEX OUT OF RANGE: ${index}`)
}

export function randomSafeCodePoint(random: Random) {
    return safeUnrank(random.int(0, SAFE_ALPHABET_SIZE - 1))
}

export function escapeCodePoints(codePoints: Iterable<number>) {
    const escaped: number[] = []

    for (const codePoint of codePoints) {
        const isReserved = codePoint === ESCAPE_LOW || codePoint === ESCAPE_HIGH

        if (isReserved || !isSafeCodePoint(codePoint)) {
            // p < N  -> [ESCAPE_LOW,  safeUnrank(p)]
            // p >= N -> [ESCAPE_HIGH, safeUnrank(p - N)]
            if (codePoint < SAFE_ALPHABET_SIZE) {
                escaped.push(ESCAPE_LOW, safeUnrank(codePoint))
            } else {
                escaped.push(ESCAPE_HIGH, safeUnrank(codePoint - SAFE_ALPHABET_SIZE))
            }
        } else {
            escaped.push(codePoint)
        }
    }

    return escaped
}

export function unescapeCodePoints(codePoints: readonly number[]) {
    const unescaped: number[] = []

    for (let i = 0; i < codePoints.length; i++) {
        const codePoint = codePoints[i]

        if (codePoint === ESCAPE_LOW) {
            if (i + 1 >= codePoints.length) throw Error("BROKEN ESCAPE SEQUENCE")
            unescaped.push(safeRank(codePoints[++i]))
        } else if (codePoint === ESCAPE_HIGH) {
            if (i + 1 >= codePoints.length) throw Error("BROKEN ESCAPE SEQUENCE")
            unescaped.push(SAFE_ALPHABET_SIZE + safeRank(codePoints[++i]))
        } else {
            unescaped.push(codePoint)
        }
    }

    return unescaped
}
