'use client'

import clsx from 'clsx'
import { useService } from '@/store'
import { format24, generateHoursArray, getClosestTime, getTotalMinutes } from '@/helpers'
import { useEffect, useState } from 'react'
import { isSameDay } from '@/helpers'


const events: EventDate[] = [
    // {
    //     title: 'Corte hombre',
    //     start: new Date(2025, 9, 4, 17, 30, 0),
    //     end: new Date(2025, 9, 4, 18, 0, 0),
    //     customer: {
    //         id: "125",
    //         name: "David Ortiz",
    //         phone: '+573004394704'
    //     },
    //     selectedService: {
    //         serviceI: "006",
    //         name: "Cepillado",
    //         duration: "45m",
    //         price: 30_000
    //     },
    //     selectedProfessional: {
    //         id: 'bcf',
    //         name: "Carlos Castro"
    //     },
    //     selectedDate: "2025-10-03T00:00:00.000Z",
    //     isAdminBooking: false,
    //     customerReview: null,
    //     allDay: false
    // }
]

export const SelectHour = ({ scheduleHours, excludeHours }: { scheduleHours: string[], excludeHours: string[] }) => {

    const { serviceState, setServiceState } = useService()
    const frequencyMinutes = getTotalMinutes(serviceState.selectedService?.duration!)
    const [hours, setHours] = useState<{ label: string, value: string }[]>([])

    useEffect(() => {

        const { selectedDate, selectedProfessional } = serviceState

        const getProfessionalExcludeHoursHours = () => { // Use Memo

            const professionalEvents = events.filter(event => (
                ((event.selectedProfessional.id === selectedProfessional?.id) && isSameDay(selectedDate!, event.start))
            ))

            return professionalEvents.map(event => {
                const date = new Date(event.start)
                const formattedTime = format24(date)
                return formattedTime
            })
        } // TODO: Api

        const professionalExcludeHours = getProfessionalExcludeHoursHours()

        const hours = generateHoursArray({
            frequencyMinutes, inputDate: serviceState.selectedDate!, scheduleHours,
            excludeHours: [...excludeHours, ...professionalExcludeHours]
        }) // TODO: Api call
        setHours(hours ?? [])
        if (!hours || !hours.length) return

        const isHourSelected = hours.some(hour => hour.value === serviceState.selectedHour)

        if (isHourSelected) return

        if (hours.length === 1) {
            setServiceState({
                ...serviceState,
                selectedHour: hours[0].value
            })
            return
        }

        if (serviceState.selectedHour) {
            const parsedHours = hours.map(hour => hour.value)
            const closestTime = getClosestTime(parsedHours, serviceState.selectedHour)
            console.log({hr: serviceState.selectedHour, closestTime})
            setServiceState({ ...serviceState, selectedHour: closestTime })
        }

    }, [serviceState.selectedDate, serviceState.selectedProfessional])

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
                                            "w-27.5 shrink-0 text-center cursor-pointer text-sm p-2 rounded-md border border-green-700 transition-all hover:bg-green-700 hover:text-white",
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