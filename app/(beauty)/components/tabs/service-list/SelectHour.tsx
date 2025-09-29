import clsx from 'clsx'
import { useService } from '@/store'
import { generateHoursArray, getTotalMinutes } from '@/helpers'

export const SelectHour = () => {

    const { serviceState, setServiceState } = useService()
    const frecuencyMintues = getTotalMinutes(serviceState.selectedService?.duration!)
    const hours = generateHoursArray(frecuencyMintues, serviceState.selectedDate as Date)

    return (
        <>
            <p className="text-xl">Selecciona la hora</p>
            {
                hours?.length ?
                    <div className="flex gap-3 md:flex-wrap md:gap-2 overflow-x-scroll md:overflow-auto scroll-none">
                        {
                            hours?.map(hour => (
                                <div key={serviceState.selectedDate + hour} onClick={() => setServiceState({
                                    ...serviceState,
                                    selectedHour: hour,
                                    isCompleted: true
                                })}
                                    className={
                                        clsx(
                                            "w-[110px] shrink-0 text-center cursor-pointer text-sm p-2 rounded-md border border-green-700 transition-all hover:bg-green-700 hover:text-white",
                                            {
                                                "bg-green-700 text-white": serviceState.selectedHour === hour
                                            }
                                        )
                                    }>
                                    {hour}
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