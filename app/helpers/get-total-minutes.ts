export const getTotalMinutes = (time: string) => {
    if (time.includes('m')) return Number(time.split('m')[0])
    return Number(time.split('h')[0]) * 60
}

export const toMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}
