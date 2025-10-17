export const isGreaterOrEqualThanToday = (date: Date) => {
    const today = new Date()
    const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d1.getTime() >= dToday.getTime()
}

export const isLessOrEqualThanToday = (date: Date) => {
    const today = new Date()
    const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d1.getTime() <= dToday.getTime()
}