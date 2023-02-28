import { copyToClipboard } from '../../utils'
import './TextBlock.styles.scss'

export interface TextBlockProps {
    value: string | null
}

export function TextBlock({value}: TextBlockProps) {
    return (
        <div
            className="text-block-component"
            style={{cursor: value ? 'pointer' : 'default'}}
            children={value}
            onClick={(e) => {
                if (e.altKey) return
                copyToClipboard(value ?? '')
            }}
        />
    )
}