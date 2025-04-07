export const getTotalMinutes = (time: string) => {
    if (time.includes('m')) return Number(time.split('m')[0])
    return Number(time.split('h')[0]) * 60
}
