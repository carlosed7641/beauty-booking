import clsx from 'clsx'
import { useService } from '@/store'
import { format24, generateHoursArray, getClosestTime, getTotalMinutes } from '@/helpers'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

const events = [
    {
        title: 'Corte hombre',
        start: new Date(2025, 9, 3, 19, 0, 0),
        end: new Date(2025, 9, 3, 19, 30, 0),
        customer: {
            id: "125",
            name: "David Ortiz",
            phone: '+573004394704'
        },
        selectedService: {
            serviceI: "006",
            name: "Cepillado",
            duration: "45m",
            price: 30_000
        },
        selectedProfessional: {
            id: 'bcf',
            name: "Carlos Castro"
        },
        selectedDate: "2025-10-03T05:19:45.000Z",
        isAdminBooking: false,
        customerReview: null,
        allDay: false
    }
]


export const SelectHour = () => {

    const { serviceState, setServiceState } = useService()
    const frequencyMinutes = getTotalMinutes(serviceState.selectedService?.duration!)
    const [hours, setHours] = useState<{label: string, value: string}[]>([])

    useEffect(() => {

        const getScheduleHours = () => {
            return  ['10:00', '20:00']
        } // TODO: Api

        const getExcludeHours = () => {
            return ['12:00', '12:30', '13:00']
        } // TODO: Api

        const getProfessionalBusyHours = () => {
            return events.map(event => {
                if (event.selectedProfessional.id === serviceState.selectedProfessional?.id) {
                    const date = new Date(event.selectedDate)
                    const formattedTime  = format24(date)
                    return formattedTime
                }
            })
        } // TODO: Api

        console.log(getProfessionalBusyHours())

        // const scheduleHours = getScheduleHours()
        // const excludeHours = getProfessionalBusyHours()
        // console.log(excludeHours)

        // const hours = generateHoursArray({ frequencyMinutes, inputDate: serviceState.selectedDate!, scheduleHours, excludeHours: getExcludeHours() }) // TODO: Api call
        // if (!hours || !hours.length) return
        // setHours(hours)

        // const isHourSelected = hours.some(hour => hour.value === serviceState.selectedHour)

        // if (isHourSelected) return

        // if (hours.length === 1) {
        //     setServiceState({
        //         ...serviceState,
        //         selectedHour: hours[0].value
        //     })
        //     return
        // }

        // if (serviceState.selectedHour) {
        //     const parsedHours = hours.map(hour => hour.value)
        //     const closestTime = getClosestTime(parsedHours, serviceState.selectedHour)
        //     setServiceState({ ...serviceState, selectedHour: closestTime })
        // }

    }, [serviceState.selectedDate])

    return (
        <>
            <p className="text-xl">Selecciona la hora</p>
            {
                hours.length ?
                    <div className="flex gap-3 md:flex-wrap md:gap-2 overflow-x-scroll md:overflow-auto scroll-none">
                        {
                            hours.map(hour => (
                                <div key={serviceState.selectedDate + hour.value} onClick={() => setServiceState({
                                    ...serviceState,
                                    selectedHour: hour.value
                                })}
                                    className={
                                        clsx(
                                            "w-[110px] shrink-0 text-center cursor-pointer text-sm p-2 rounded-md border border-green-700 transition-all hover:bg-green-700 hover:text-white",
                                            {
                                                "bg-green-700 text-white": serviceState.selectedHour === hour.value
                                            }
                                        )
                                    }>
                                    {hour.label}
                                </div>
                            ))
                        }

                    </div>
                    :
                    <h4 className="text-center py-2">No hay horarios disponibles en el día seleccionado</h4>
            }
        </>
    )
}