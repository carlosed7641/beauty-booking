import { MONTHS_OF_YEAR } from '@/util/const'
import clsx from 'clsx'

interface Props {
    date: Date
    onChangeDate: (value: number, type: "month" | "year") => void
}

export const MonthList = ({ date, onChangeDate }: Props) => {
    return (
        <ul className="flex flex-col md:grid md:grid-cols-6 gap-2">
            {MONTHS_OF_YEAR.map((month, idx) => (
                <li onClick={() => onChangeDate(idx, 'month')} key={idx} className={
                    clsx(
                        "w-full text-white rounded-md text-center px-3 py-2 cursor-pointer hover:bg-green-700",
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
