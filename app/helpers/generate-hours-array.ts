'use client'

interface Props {
    frequencyMinutes: number,
    inputDate: Date
    scheduleHours: [string, string]
    excludeHours?: string[]
}

export const generateHoursArray = ({ frequencyMinutes, inputDate, scheduleHours, excludeHours = [] }: Props): {label: string, value: string }[] | null => {

    const now = new Date()
    const date = new Date(inputDate)

    if (!scheduleHours.length) return null

    const [startHour, startMinute] = scheduleHours[0]?.split(':').map(Number)  
    const [endHour, endMinute] = scheduleHours[1]?.split(':').map(Number)  

    if (
        typeof startHour !== 'number' ||
        typeof startMinute !== 'number' ||
        typeof endHour !== 'number' ||
        typeof endMinute !== 'number'
    ) return null

    const start = new Date()
    start.setHours(startHour, startMinute, 0, 0)

    const end = new Date()
    end.setHours(endHour, endMinute, 0, 0)

    let current: Date

    if (isSameDay(date, now)) {
        current = new Date(now)
        if (current < start) current = new Date(start)
    } else {
        current = new Date(start)
    }

    const minutes = current.getMinutes()
    const remainder = minutes % frequencyMinutes

    if (remainder !== 0) {
        current.setMinutes(minutes + (Math.min(frequencyMinutes, 60) - remainder), 0, 0)
    }

    const result = []

    let tempCurrent = new Date(current)
    tempCurrent.setMinutes(frequencyMinutes, 0, 0)


    while (tempCurrent <= end) {

        // if (!excludeHours.includes(format24(current))) {
        const newValue ={ label: format12(current), value: format24(current) } 
        result.push(newValue)
        // }
        
        tempCurrent = new Date(tempCurrent.getTime() + frequencyMinutes * 60000)
        current = new Date(current.getTime() + frequencyMinutes * 60000)

    }

    return result.length ? result : null
}

export const format12 = (date: Date) => {
    const hours = date.getHours()
    const mins = date.getMinutes()

    const period = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours % 12 === 0 ? 12 : hours % 12
    const displayMinutes = mins.toString().padStart(2, '0')

    return `${displayHour}:${displayMinutes} ${period}`
}

export const format24 = (date: Date): string => {
    const h = date.getHours().toString().padStart(2, '0')
    const m = date.getMinutes().toString().padStart(2, '0')
    return `${h}:${m}`
}

export const isSameDay = (d1: Date, d2: Date): boolean => {
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}
