export const getTotalTime = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (months < 0) {
        years--
        months += 12
    }

    let result= ''
    if (years > 0) result += `${years} año${years > 1 ? 's' : ''}`
    if (months > 0) result += `${years > 0 ? ' ' : ''}${months} mes${months > 1 ? 'es' : ''}`

    return result || '1 mes'
}