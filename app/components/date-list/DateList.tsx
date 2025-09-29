'use client'
import clsx from 'clsx'
import { isGreaterOrEqualThanToday, generateHoursArray } from '@/helpers'

interface Props {
    isAdmin?: boolean
    noDisabledDays?: boolean
    datesList: DateItem[]
    frequencyMintues?: number
    selectedDate?: string | Date | null
    onClick: (dayItem: DateItem) => void
}

export const DateList = ({
    isAdmin,
    noDisabledDays,
    datesList,
    frequencyMintues,
    selectedDate,
    onClick
}: Props) => {

    const compareDates = (date1: Date, date2: Date) => {
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
        return d1.getTime() === d2.getTime()
    }

    return (

        datesList.map(date => {

            // isAdmin, isToday, hasfrequencyMintues, hasHours
            const shouldShow = isAdmin || compareDates(date.date, new Date()) || !frequencyMintues || generateHoursArray(frequencyMintues, date.date)
            const isSelectable = noDisabledDays || isGreaterOrEqualThanToday(date.date) 
            const selected = compareDates(selectedDate as Date, date.date)
            //TODO: Deshabilitar hoy si no tiene horas disponibles

            return (
                shouldShow && (
                    <button disabled={!isSelectable} onClick={() => onClick(date)}
                        key={date.dateString}
                        className="cursor-pointer flex flex-col justify-end gap-1 items-center disabled:pointer-events-none">
                        {date.month && <p className="text-[14px] text-green-700">{date.month}</p>}
                        <div className={
                            clsx(
                                "flex h-10 w-10 items-center justify-center border-2 rounded-full transition-all font-bold",
                                {
                                    'border-zinc-300 text-zinc-300 opacity-70': !isSelectable,
                                    'border-green-700 text-green-700 hover:bg-green-700 hover:text-white': isSelectable,
                                    'bg-green-700 text-white': selected
                                }
                            )
                        }>
                            {date.dayNumber}
                        </div>
                        <p className={
                            clsx(
                                "text-[14px] text-zinc-500",
                                { 'opacity-50': !isSelectable }
                            )
                        }>{date.day}</p>
                    </button>
                )
            )
        })
    )
}
