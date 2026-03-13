export const format12 = (date: Date) => {
    const hours = date.getHours()
    const mins = date.getMinutes()

    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours % 12 === 0 ? 12 : hours % 12
    const displayMinutes = mins.toString().padStart(2, '0')

    return `${displayHour}:${displayMinutes} ${period}`
}

export const format24 = (date: Date): string => {
    const h = date.getHours().toString().padStart(2, '0')
    const m = date.getMinutes().toString().padStart(2, '0')
    return `${h}:${m}`
}

export const isSameDay = (d1: Date, d2: Date): boolean => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}

export const roundToNextInterval = (date: Date, interval: number) => {
    const minutes = date.getMinutes()
    const remainder = minutes % interval

    if (remainder === 0) return date

    const diff = interval - remainder
    const rounded = new Date(date)
    rounded.setMinutes(minutes + diff, 0, 0)

    return rounded
}