import './App.style.scss'
import { useCallback, useEffect } from 'react'
import { CypherService } from './global/cypher.service'
import { copyToClipboard, useDefferedStorage, useStorage } from './utils'
import { Switch, TextStats } from './components'

export function App() {
    const mode = useStorage('encrypt')
    const key = useDefferedStorage('')
    const input = useDefferedStorage('')
    const output = useStorage('')

    const handler = useCallback((key: string, input: string) => {
        output.set((mode.value == 'encrypt'
            ? CypherService.encrypt
            : CypherService.decrypt
        )(key, input))
    }, [mode.value])

    useEffect(() => {
        if (key.deffered == '' || input.deffered == '') return
        handler(key.deffered, input.deffered)
    }, [key.deffered, input.deffered, mode.value])

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
                <textarea
                    spellCheck="false"
                    placeholder="Input"
                    className="text-input"
                    value={input.value}
                    onChange={(e) => input.set(e.target.value)}
                />
                <TextStats text={input.deffered} />
            </div>
            <div className="column">
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
                    onClick={() => copyToClipboard(output.value)}
                />
                <TextStats text={output.value} comparable={input.deffered} />
            </div>
        </div>
    )
}