import clsx from 'clsx'
import { MONTHS_OF_YEAR } from '@/util/const'

interface Props {
    yearLimit?: number
    date: Date
    type: 'month' | 'year'
    onChangeDate: (value: number, type: 'month' | 'year') => void
}

export const ScheduleList = ({ date, yearLimit, type, onChangeDate }: Props) => {

    const isMonth = type === 'month'

    const list: (string | number)[] = isMonth
        ? MONTHS_OF_YEAR
        : Array.from({ length: (new Date().getFullYear() - (yearLimit ?? 2015) + 1) })

    const isActive = (value: number) => {
        return isMonth
            ? value === date.getMonth()
            : value === date.getFullYear()
    }

    return (
        <ul className="flex flex-col md:grid md:grid-cols-6 gap-2">
            {list.map((value, idx) => {
                const dataValue = isMonth ? idx : (yearLimit ?? 2015) + idx
                const label = isMonth ? value : dataValue
                return (
                    <li onClick={() => onChangeDate(dataValue, type)} key={idx} className={
                        clsx(
                            "w-full text-white rounded-md md:text-center px-3 py-2 cursor-pointer hover:bg-green-700",
                            {
                                "bg-zinc-400": !isActive(dataValue),
                                "bg-green-700": isActive(dataValue)
                            }
                        )
                    }>
                        {label}
                    </li>
                )
            })}
        </ul>
    )
}
