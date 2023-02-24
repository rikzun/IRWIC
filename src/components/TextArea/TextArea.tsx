import './TextArea.styles.scss'
import { ControlledFieldProps } from 'src/global/types';

export function TextArea({value, onChange}: ControlledFieldProps) {
    return (
        <textarea
            className="text-area-component"
            value={value ?? ''}
            onChange={(e) => onChange?.(e.target.value)}
        />
    )
}