'use client'
import clsx from 'clsx'
import { isGreaterOrEqualThanToday, generateHoursArray } from '@/helpers'
import { useService } from '@/store'
import { useEffect } from 'react'

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

    const { serviceState, setServiceState } = useService()


    const compareDates = (date1: Date, date2: Date) => {
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
        const dToday = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
        return d1.getTime() === dToday.getTime()
    }

    useEffect(() => {
        if (isAdmin) return

        const hasHidden = datesList.some(date => {
            const shouldShow = !frequencyMintues || generateHoursArray(frequencyMintues, date.date)
            return !shouldShow
        })

        if (hasHidden) {
            const tempDate = new Date(selectedDate as Date)
            tempDate.setDate(tempDate.getDate() + 1)
            setServiceState({ ...serviceState, selectedDate: tempDate })
        }
    }, [datesList, frequencyMintues])

    return (

        datesList.map(date => {

            const shouldShow = isAdmin || !frequencyMintues || generateHoursArray(frequencyMintues, date.date)
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
