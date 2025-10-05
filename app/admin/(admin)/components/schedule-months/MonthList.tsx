import { MONTHS_OF_YEAR } from '@/util/const'
import clsx from 'clsx'

interface Props {
    date: Date
    onChangeDate: (value: number, type: "month" | "year") => void
}

export const MonthList = ({ date, onChangeDate }: Props) => {
    return (
        <ul className="flex flex-col gap-2">
            {MONTHS_OF_YEAR.map((month, idx) => (
                <li onClick={() => onChangeDate(idx, 'month')} key={idx} className={
                    clsx(
                        "w-full text-white rounded-md px-3 py-2",
                        {
                            "bg-zinc-400": idx !== date.getMonth(),
                            "bg-green-700": idx === date.getMonth()
                        }
                    )
                }>
                    {month}
                </li>
            ))}
        </ul>
    )
}
