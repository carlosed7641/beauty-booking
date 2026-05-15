export const formatMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return hours > 0 ? `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${minutes > 0 ? 'y ' + minutes + ' min' : ''}` : `${minutes} min`
}

export const formatInputDate = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")

    return `${y}-${m}-${d}`
}