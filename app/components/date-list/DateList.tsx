'use client'
import clsx from 'clsx'
import { isGreaterOrEqualThanToday, isLessOrEqualThanToday, compareDates } from '@/helpers'
interface Props {
    disabled?: 'afterToday' | 'none'
    datesList: DateItem[]
    selectedDate?: string | Date | null
    workdays?: number[]
    onClick: (dayItem: DateItem) => void
}

export const DateList = ({
    disabled,
    datesList,
    selectedDate,
    workdays,
    onClick,
}: Props) => {

    return (

        datesList.map(date => {
            const isSelectable = (() => {
                if (!disabled) {
                    return isGreaterOrEqualThanToday(date.date) && workdays?.includes(date.dayIndex)
                }
                if (disabled === 'afterToday') {
                    return isLessOrEqualThanToday(date.date)
                }

                return true
            })()

            const selected = selectedDate && compareDates(selectedDate as Date, date.date)

            return (
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
        })
    )
}
