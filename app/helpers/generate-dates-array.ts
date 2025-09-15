import { DATE_OPTIONS, DAYS_OF_WEEK, MONTHS_OF_YEAR } from '@/util/const'

export const generateDatesArray = () => {
    const dateArray = Array.from({ length: 30 }, (_, i) => {
        const currentDate = new Date()
        const date = new Date()
        date.setDate(date.getDate() + i)

        const day =
            i === 0
                ? 'Hoy' :
                i === 1
                    ? 'Mañana' : DAYS_OF_WEEK[(date.getDay() + 6) % 7] // % 7 for monday first day
        const month = (currentDate.getMonth() !== date.getMonth()) && MONTHS_OF_YEAR[date.getMonth()]
        const dateString = date.toLocaleDateString('es-ES', DATE_OPTIONS)
        return {
            dayNumber: date.getDate(),
            date,
            day,
            month,
            dateString
        }
    })

    return dateArray
}

export const generateMonthDatesArray = (inputDate: Date) => {
    // const today = new Date()
    const year = inputDate.getFullYear()
    const month = inputDate.getMonth()

    const lastDayOfMonth = new Date(year, month + 1, 0).getDate()
    const totalDays = lastDayOfMonth + 1

    const dateArray = Array.from({ length: totalDays }, (_, i) => {
        const date = new Date(year, month, i + 1)

        const day =
            date.toDateString() === new Date().toDateString()
            ? "Hoy"
            : date.toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()
            ? "Mañana"
            : DAYS_OF_WEEK[(date.getDay() + 6) % 7]

        const monthLabel =
            inputDate.getMonth() !== date.getMonth()
                ? MONTHS_OF_YEAR[date.getMonth()]
                : undefined

        const dateString = date.toLocaleDateString("es-ES", DATE_OPTIONS)

        return {
            dayNumber: date.getDate(),
            date,
            day,
            month: monthLabel,
            dateString,
        }
    })

    return dateArray
}