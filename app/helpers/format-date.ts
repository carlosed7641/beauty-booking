export const formatDate = (date: Date, weekday?: boolean) => {
    const text =  date.toLocaleDateString('es-ES', {
        ...(weekday && { weekday: 'long' }),
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    return text.charAt(0).toUpperCase() + text.slice(1)
}
