import { format24 } from './generate-hours-array'

export const getClosestTime = (hours: string[], inputHour: string) => {

    const inputHourDate = parseTime(inputHour)
    const hoursDate = hours.map(hora => parseTime(hora))

    const validHours = hoursDate.filter(hour => hour >= inputHourDate)

    if (!validHours.length) {
        return hours[hoursDate.length - 1]
    }

    const closestTime = validHours.reduce((prev, curr) => {
        const diffPrev = Math.abs(prev.getTime() - inputHourDate.getTime())
        const diffCurr = Math.abs(curr.getTime() - inputHourDate.getTime())
        return diffPrev < diffCurr ? prev : curr
    })

    return format24(closestTime)
}


const parseTime = (time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number)
    const now = new Date()
    now.setHours(hours, minutes, 0, 0)
    return now
}
