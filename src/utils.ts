export function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value).then(
        () => console.log('COPY PASSED'),
        () => console.log('COPY FAILED')
    )
}