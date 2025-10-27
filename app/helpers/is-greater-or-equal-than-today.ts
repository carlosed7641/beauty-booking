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

export const isLessOrEqualThan = (inputDate: Date, limitDate: Date) => {
    const d1 = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate())
    const dLimit = new Date(limitDate.getFullYear(), limitDate.getMonth(), limitDate.getDate())
    return d1.getTime() <= dLimit.getTime()
}