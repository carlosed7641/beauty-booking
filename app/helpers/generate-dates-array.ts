const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
}

export const generateDatesArray = () => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const dateArray = Array.from({ length: 30 }, (_, i) => {
        const currentDate = new Date()
        const date = new Date()
        date.setDate(date.getDate() + i)

        const day =
            i === 0
                ? 'Hoy' :
                i === 1
                    ? 'Mañana' : daysOfWeek[date.getDay()]
        const month = (currentDate.getMonth() !== date.getMonth()) && monthsOfYear[date.getMonth()]
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
