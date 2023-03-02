import './TextField.styles.scss'
import { ControlledFieldProps } from "src/types";

export interface TextFieldProps extends ControlledFieldProps {
    label?: string | null
}

export function TextField({label, value, onChange}: TextFieldProps) {
    return (
        <div className="text-field-component">
            {label && <label>{label}</label>}

            <input
                type="text"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}