import { MONTHS_OF_YEAR } from '@/util/const'

export const formatDate = ({ date, weekday, day, month, year }: {
     date: Date,
     day?: 'numeric' | '2-digit',
     month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow',
     year?: 'numeric' | '2-digit',
     weekday?: 'short' | 'long'
}) => {
    const text =  date.toLocaleDateString('es-ES', {
        ...(weekday && { weekday }),
        day: day || 'numeric',
        month: month || 'long',
        year: year || 'numeric'
    })
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formaDateShort = (date: Date) => {
    const month = MONTHS_OF_YEAR[date.getMonth()].toLocaleLowerCase()
    return `${month} ${date.getDate()}`
}
