import { memo } from "react"

interface TextStatsProps {
    text: string
    comparable?: string
}

export const TextStats = memo((props: TextStatsProps) => {
    if (props.text.length == 0) return null
    if (props.comparable != null && props.comparable.length == 0) return null

    const textLength = props.text.length
    const textSize = new Blob([props.text]).size

    const compLength = props.comparable ? Math.floor(((textLength / props.comparable.length) * 100) - 100) : null
    const compLengthString = compLength ? ` (${compLength >= 0 ? "+" : ""}${compLength}%)` : ""

    const compSize = props.comparable ? Math.floor(((textSize / new Blob([props.comparable]).size) * 100) - 100) : null
    const compSizeString = compSize ? ` (${compSize >= 0 ? "+" : ""}${compSize}%)` : ""

    return (
        <span className="text-stats">
            {textLength} chars{compLengthString} {textSize} bytes{compSizeString}
        </span>
    )
}, (prev, next) => {
    return prev.text === next.text
})