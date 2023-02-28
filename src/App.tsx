import './App.style.scss'
import { useCallback, useState } from 'react'
import { TextArea } from './components/TextArea'
import { TextBlock } from './components/TextBlock'
import { TextField } from './components/TextField'
import { CypherService } from './global/cypher.service'

export function App() {
    const [keyword, setKeyword] = useState<string|null>(null)
    const [input, setInput] = useState<string|null>(null)
    const [output, setOutput] = useState<string|null>(null)

    const encrypt = useCallback((keyword: string, input: string) => {
        setOutput(CypherService.encrypt(keyword, input))
    }, [])

    const decrypt = useCallback((keyword: string, input: string) => {
        setOutput(CypherService.decrypt(keyword, input))
    }, [])

    return (
        <div className="container">
            <TextField label="Keyword:" value={keyword} onChange={setKeyword} />

            <TextArea value={input} onChange={setInput} />
            <TextBlock value={output} />

            <div className="buttons">
                <button
                    disabled={!keyword || !input}
                    children="ENCRYPT"
                    onClick={() => encrypt(keyword!, input!)}
                />
                <button
                    disabled={!keyword || !input}
                    children="DECRYPT"
                    onClick={() => decrypt(keyword!, input!)}
                />
            </div>
        </div>
    )
}