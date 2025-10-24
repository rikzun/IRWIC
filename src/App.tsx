import "./App.style.scss"
import { useDebouncedEffect, useState } from "./utils/hooks"
import { Switch } from "./components/Switch"
import { TextStats } from "./components/TextStats"
import { Workers } from "@workers"

const cypherWorker = Workers.Cypher()

export function App() {
    const mode = useState("encrypt")
    const key = useState("")
    const input = useState("")
    const output = useState("")

    useDebouncedEffect(100, () => {
        if (key.value == "" || input.value == "") {
            output.set("")
            return
        }

        const method = mode.value == "encrypt"
            ? cypherWorker.rpc.encrypt
            : cypherWorker.rpc.decrypt
        
        method(key.value, input.value).then((data) => {
            output.set(data)
        })
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
                        first={{title: "Encrypt", value: "encrypt"}}
                        second={{title: "Decrypt", value: "decrypt"}}
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

                <TextStats
                    text={input.value}
                />
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

                <TextStats
                    text={output.value}
                    comparable={input.value}
                />
            </div>
        </div>
    )
}