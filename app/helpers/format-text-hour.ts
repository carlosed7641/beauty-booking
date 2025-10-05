export const formatTextHour = (text: string) => {
    const [hours, minutes] = text.split(':').map(Number)
    if (isNaN(hours) || isNaN(minutes)) return text

    if (hours <= 12) return `${hours}:${minutes} AM`

    const period = hours < 12 ? 'AM' : 'PM'
    const adjustedHour = hours % 12 || 12 

    return `${adjustedHour}:${minutes.toString().padStart(2, '0')} ${period}`
} 