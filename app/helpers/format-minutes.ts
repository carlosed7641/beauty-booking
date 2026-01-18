export const formatMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return hours > 0 ? `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${minutes > 0 ? 'y ' + minutes + ' min' : ''}` : `${minutes} min`
}

export const formatInputDate = (date: Date) => {
    const y = date.getUTCFullYear()
    const m = String(date.getUTCMonth() + 1).padStart(2, "0")
    const d = String(date.getUTCDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
}