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


    return (

        datesList.map(date => {

            const shouldShow = !frequencyMintues || generateHoursArray(frequencyMintues, date.dateString)

            return (
                shouldShow && (
                    <div onClick={() => onClick(date)}
                        key={date.dateString}
                        className="cursor-pointer flex flex-col justify-end gap-1 items-center">
                        {date.month && <p className="text-[14px] text-green-700">{date.month}</p>}
                        <div className={
                            clsx(
                                "flex h-10 w-10 items-center justify-center border-2 border-green-700 text-green-700 rounded-full transition-all hover:bg-green-700 hover:text-white font-bold",
                                {
                                    'bg-green-700 text-white': selectedDate === date.dateString
                                }
                            )
                        }>
                            {date.dayNumber}
                        </div>
                        <p className="text-[14px] text-zinc-500">{date.day}</p>
                    </div>
                )
            )
        })
    )
}
