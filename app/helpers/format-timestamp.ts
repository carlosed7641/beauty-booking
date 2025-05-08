export const formatedDate = (timestamp: number) => {
    const date: Date = new Date(timestamp)
    return date.toLocaleDateString('es-ES')
}