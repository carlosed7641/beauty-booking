export const getTotalMinutes = ({ hours, minutes }:  { hours: number, minutes: number}) => {
    return hours * 60 + minutes
}

export const toMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}

export const minutesToTime = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}