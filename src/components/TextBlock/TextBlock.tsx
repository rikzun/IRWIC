import './TextBlock.styles.scss'

export interface TextBlockProps {
    value: string | null
}

export function TextBlock({value}: TextBlockProps) {
    return (
        <div
            className="text-block-component"
            children={value}
        />
    )
}