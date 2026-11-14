declare global {
    const ROOT: HTMLDivElement

    interface Window {
        readonly ROOT: HTMLDivElement
    }
}

export {}