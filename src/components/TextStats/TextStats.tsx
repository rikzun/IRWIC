interface TextStatsProps {
    text: string
    comparable?: string
}

export function TextStats(props: TextStatsProps) {
    if (props.text.length == 0) return null
    const textLength = props.text.length
    const textSize = new Blob([props.text]).size

    const compLength = props.comparable ? Math.floor(((textLength / props.comparable.length) * 100) - 100) : null
    const compLengthSign = (compLength ?? 0) >= 0 ? '+' : ''
    const compSize = props.comparable ? Math.floor(((textSize / new Blob([props.comparable]).size) * 100) - 100) : null
    const compSizeSign = (compSize ?? 0) >= 0 ? '+' : ''

    return (
        <span className="text-stats">
            {textLength}{compLength && `(${compLengthSign}${compLength}%)`} chars {textSize}{compSize && `(${compSizeSign}${compSize}%)`} bytes
        </span>
    )
}