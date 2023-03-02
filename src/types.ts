export interface ControlledFieldProps {
    value: string | null
    onChange: (value: string) => void
}

export abstract class CypherBuilderBase {
    protected abstract readonly key: number
    protected abstract readonly raw: string
    protected abstract readonly array: string[] //mutable
    protected abstract output: string | null

    abstract shake(): this
    abstract build(): this
    abstract getOutput(): string
}