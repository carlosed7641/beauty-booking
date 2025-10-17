export const getTotalMinutes = ({ hours, minutes }:  { hours: number, minutes: number}) => {
    return hours * 60 + minutes
}

export const toMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}
