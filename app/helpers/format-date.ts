export const formatDate = ({ date, weekday, day, month, year }: {
     date: Date,
     day?: 'numeric' | '2-digit',
     month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow',
     year?: 'numeric' | '2-digit',
     weekday?: boolean
}) => {
    const text =  date.toLocaleDateString('es-ES', {
        ...(weekday && { weekday: 'long' }),
        day: day || 'numeric',
        month: month || 'long',
        year: year || 'numeric'
    })
    return text.charAt(0).toUpperCase() + text.slice(1)
}
