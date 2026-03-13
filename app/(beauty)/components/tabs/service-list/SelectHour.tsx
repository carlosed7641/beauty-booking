'use client'

import clsx from 'clsx'
import { useService } from '@/store'
import { format24, getClosestTime, getTotalMinutes } from '@/helpers'
import { useEffect, useMemo, useState } from 'react'
import { isSameDay } from '@/helpers'
import { getAvailableSlots } from '@/actions'
import { ImSpinner8 } from 'react-icons/im'

interface Props {
    duration: { hours: number, minutes: number }
    workdays: WorkDays[]
}


export const SelectHour = ({ duration, workdays }: Props) => {

    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)
    const [hours, setHours] = useState<{ label: string, value: string }[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const serviceDuration = getTotalMinutes(duration)

    useEffect(() => {

        setIsLoading(true)
        const { selectedDate, selectedProfessional } = serviceState
        const currentWorkday =
            workdays
                .find(w => w.order === ((selectedDate!.getDay() + 6) % 7) + 1)

        if (!currentWorkday) {
            setIsLoading(false)
            return
        }

        const getHours = async () => {

            try {
                const dbHours = await getAvailableSlots({
                    professionalId: selectedProfessional?.id ?? '',
                    date: selectedDate!,
                    workday: currentWorkday,
                    serviceDuration,
                    editingEventId: serviceState.id
                })

                setHours(dbHours)

                if (!dbHours?.length) return

                const hours = dbHours.map(h => h.value)
                let nextSelectedHour = serviceState.selectedHour

                if (!hours.includes(serviceState.selectedHour!)) {
                    if (hours.length === 1) {
                        nextSelectedHour = hours[0]
                    } else if (serviceState.selectedHour) {
                        nextSelectedHour = getClosestTime(hours, serviceState.selectedHour)
                    }
                }

                if (nextSelectedHour !== serviceState.selectedHour) {
                    setServiceState({
                        ...serviceState,
                        selectedHour: nextSelectedHour
                    })
                }

            } finally {
                setIsLoading(false)
            }
        }

        getHours()

    }, [serviceState.selectedDate, serviceState.selectedProfessional])

    return (
        <>
            <p className="text-xl">Selecciona la hora</p>

            {
                isLoading ?
                    <ImSpinner8 className="text-4xl text-green-700 animate-spin self-center" />
                    :
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