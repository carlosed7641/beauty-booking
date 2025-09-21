import clsx from 'clsx'
import { generateHoursArray } from '@/helpers'

interface Props {
    datesList: DateItem[]
    frequencyMintues?: number
    selectedDate?: string | null
    onClick: (dayItem: DateItem) => void
}

export const DateList = ({
    datesList,
    frequencyMintues,
    selectedDate,
    onClick
}: Props) => {

    const compareWithToday = (date: Date) => {
        const today = new Date()
        const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const dToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        return d1.getTime() >= dToday.getTime()
    }

    return (

        datesList.map(date => {

            const shouldShow = !frequencyMintues || generateHoursArray(frequencyMintues, date.dateString)
            const isSelectable = compareWithToday(date.date)

            return (
                shouldShow && (
                    <button disabled={!compareWithToday(date.date)}  onClick={() => onClick(date)}
                        key={date.dateString}
                        className="cursor-pointer flex flex-col justify-end gap-1 items-center disabled:pointer-events-none">
                        {date.month && <p className="text-[14px] text-green-700">{date.month}</p>}
                        <div className={
                            clsx(
                                "flex h-10 w-10 items-center justify-center border-2 rounded-full transition-all font-bold",
                                {
                                    'border-zinc-300 text-zinc-300 opacity-70': !isSelectable,
                                    'border-green-700 text-green-700 hover:bg-green-700 hover:text-white': isSelectable,
                                    'bg-green-700 text-white': selectedDate === date.dateString 
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
