import clsx from 'clsx'
import { useService } from '@/store'
import { generateHoursArray, getClosestTime, getTotalMinutes } from '@/helpers'
import { useEffect } from 'react'

export const SelectHour = () => {

    const { serviceState, setServiceState } = useService()
    const frecuencyMintues = getTotalMinutes(serviceState.selectedService?.duration!)
    const hours = generateHoursArray(frecuencyMintues, serviceState.selectedDate!)

    useEffect(() => {

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
            setServiceState({ ...serviceState, selectedHour: closestTime })
        }

    }, [serviceState.selectedDate])

    return (
        <>
            <p className="text-xl">Selecciona la hora</p>
            {
                hours?.length ?
                    <div className="flex gap-3 md:flex-wrap md:gap-2 overflow-x-scroll md:overflow-auto scroll-none">
                        {
                            hours?.map(hour => (
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