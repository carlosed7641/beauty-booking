export const formatMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return hours > 0 ? `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${minutes > 0 ? 'y ' + minutes + ' min' : ''}` : `${minutes} min`
}