interface TextStatsProps {
    text: string
}

export function TextStats(props: TextStatsProps) {
    if (props.text.length == 0) return null

    return (
        <span className="text-stats">
            {props.text.length} chars {(new Blob([props.text]).size)} bytes
        </span>
    )
}