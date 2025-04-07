import clsx from 'clsx'
import { useService } from '@/store'
import { generateHoursArray, getTotalMinutes } from '@/helpers'
import { availableDates } from '@/util/fake-data'

export const SelectDate = () => {

    const { serviceState, setServiceState } = useService()
    const frecuencyMintues = getTotalMinutes(serviceState.selectedService?.duration!)

    return (
        <>
            <p className="text-xl">Selecciona la fecha</p>
            <div className="overflow-x-scroll md:overflow-auto scroll-none flex gap-2 md:grid md:[grid-template-columns:repeat(10,minmax(0,55px))] md:gap-3">
                {
                    availableDates.map(date => (
                        generateHoursArray(frecuencyMintues, date.dateString) &&
                        <div onClick={() => setServiceState({
                            ...serviceState,
                            selectedDate: date.dateString
                        })}
                            key={date.dateString}
                            className="cursor-pointer flex flex-col justify-end gap-1 items-center">
                            {date.month && <p className="text-[14px] text-green-700">{date.month}</p>}
                            <div className={
                                clsx(
                                    "flex h-10 w-10 items-center justify-center border-2 border-green-700 text-green-700 rounded-full transition-all hover:bg-green-700 hover:text-white font-bold",
                                    {
                                        'bg-green-700 text-white': serviceState.selectedDate === date.dateString
                                    }
                                )
                            }>
                                {date.dayNumber}
                            </div>
                            <p className="text-[14px] text-zinc-500">{date.day}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
