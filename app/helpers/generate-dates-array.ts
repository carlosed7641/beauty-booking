import { DAYS_OF_WEEK, MONTHS_OF_YEAR } from '@/util/const'

const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
}

export const generateDatesArray = () => {
    const dateArray = Array.from({ length: 30 }, (_, i) => {
        const currentDate = new Date()
        const date = new Date()
        date.setDate(date.getDate() + i)

        const day =
            i === 0
                ? 'Hoy' :
                i === 1
                    ? 'Mañana' : DAYS_OF_WEEK[date.getDay()]
        const month = (currentDate.getMonth() !== date.getMonth()) && MONTHS_OF_YEAR[date.getMonth()]
        const dateString = date.toLocaleDateString('es-ES', options)
        return {
            dayNumber: date.getDate(),
            day,
            month,
            dateString
        }
    })

    return dateArray
}
