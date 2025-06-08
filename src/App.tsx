import './App.style.scss'
import { CypherService } from './cypher/cypher.service'
import { useDebouncedEffect, useStorage } from './utils/react'
import { Switch, TextStats } from './components'

export function App() {
    const mode = useStorage('encrypt')
    const key = useStorage('')
    const input = useStorage('')
    const output = useStorage('')

    useDebouncedEffect(100, () => {
        if (key.value == '' || input.value == '') {
            output.set('')
            return
        }
        
        output.set((mode.value == 'encrypt'
            ? CypherService.encrypt
            : CypherService.decrypt
        )(key.value, input.value))
    }, [mode.value, key.value, input.value])

    return (
        <div className="container">
            <div className="column">
                <div className="key-field">
                    <input
                        type="text"
                        spellCheck="false"
                        placeholder="Key"
                        className="text-input"
                        value={key.value}
                        onChange={(e) => key.set(e.target.value)}
                    />
                    <Switch
                        first={{title: 'Encrypt', value: 'encrypt'}}
                        second={{title: 'Decrypt', value: 'decrypt'}}
                        state={mode}
                    />
                </div>
                <div className="textarea-container">
                    <textarea
                        spellCheck="false"
                        placeholder="Input"
                        className="text-input"
                        value={input.value}
                        onChange={(e) => input.set(e.target.value)}
                    />
                </div>
                <TextStats text={input.value} />
            </div>
            <div className="column">
                <div className="textarea-container">
                    <textarea
                        spellCheck="false"
                        placeholder="Output"
                        className="text-input output"
                        value={output.value}
                        disabled
                    />
                    <button
                        className="copy-button active"
                        children="Copy"
                        onClick={() => navigator.clipboard.writeText(output.value)}
                    />
                </div>
                <TextStats text={output.value} comparable={input.value} />
            </div>
        </div>
    )
}