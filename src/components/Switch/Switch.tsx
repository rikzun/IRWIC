import './Switch.style.scss'
import { Storage } from "@utils/react"

interface SwithProps {
    first?: SwitchValue
    second?: SwitchValue
    third?: SwitchValue
    fourth?: SwitchValue

    elements?: SwitchValue[]
    state: Storage<string>
}

interface SwitchValue {
    title: string
    value: string
}

export function Switch(props: SwithProps) {
    const elements = props.elements! ??
        [props.first, props.second, props.third, props.fourth]
            .filter((v) => v != null)

    return (
        <div className="switch">
            {elements.map((button) => (
                <button
                    key={button.value}
                    children={button.title}
                    className={props.state.value == button.value ? 'active' : undefined}
                    onClick={() => props.state.set(button.value)}
                />
            ))}
        </div>
    )
}