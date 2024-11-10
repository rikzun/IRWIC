interface TextStatsProps {
    text: string
    comparable?: string
}

export function TextStats(props: TextStatsProps) {
    if (props.text.length == 0) return null
    const textLength = props.text.length
    const textSize = new Blob([props.text]).size

    const compLength = props.comparable && Math.floor(((textLength / props.comparable.length) * 100) - 100)
    const compSize = props.comparable && Math.floor(((textSize / new Blob([props.comparable]).size) * 100) - 100)

    return (
        <span className="text-stats">
            {textLength}{compLength && `(+${compLength}%)`} chars {textSize}{compSize && `(+${compSize}%)`} bytes
        </span>
    )
}