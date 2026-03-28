import { useCallback, useMemo } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { VscSettings } from 'react-icons/vsc'
import clsx from 'clsx'
import { useModal } from '@/store'
import { formatDate, isGreaterOrEqualThanToday, isLessOrEqualThan } from '@/helpers'
import { MONTHS_OF_YEAR } from '@/util/const'

interface Props {
    dateRange: Date[]
    setDateRange: React.Dispatch<React.SetStateAction<Date[]>>
    activeOption: TimeOptionItem
    foundationDate: Date
}

const shiftMonthToEnd = (date: Date, offset: number) =>
    new Date(date.getFullYear(), date.getMonth() + 1 + offset, 0)

const handleDateShift = (
    dates: Date[],
    value: -1 | 1,
    optionId: TimeOptionItem['id']
) => {
    return dates.map((date, index) => {
        const newDate = new Date(date)

        switch (optionId) {
            case 'day':
                newDate.setDate(newDate.getDate() + value)
                break

            case 'week':
                newDate.setDate(newDate.getDate() + 7 * value)
                break

            case 'fortnight': {
                const year = newDate.getFullYear()
                const monthIndex = newDate.getMonth()
                const isFirstHalf = newDate.getDate() <= 15

                const month = isFirstHalf
                    ? (monthIndex + (value === 1 ? 0 : value)) + (index === 0 ? 0 : 1)
                    : monthIndex + (value === 1 ? value : 0)

                const day = isFirstHalf
                    ? index === 0 ? 16 : 0
                    : index === 0 ? 1 : 15

                return new Date(year, month, day)
            }

            case 'month':
                return index === 0
                    ? new Date(newDate.getFullYear(), newDate.getMonth() + value, newDate.getDate())
                    : shiftMonthToEnd(newDate, value)

            case 'year':
                newDate.setFullYear(newDate.getFullYear() + value)
                break
        }

        return newDate
    })
}

export const DateSwitcher = ({
    dateRange,
    setDateRange,
    activeOption,
    foundationDate
}: Props) => {

    const setOpenModal = useModal(state => state.setOpenModal)
    
    const handleChangeDate = useCallback((value: -1 | 1) => {
        setDateRange(prev => handleDateShift(prev, value, activeOption.id))
    }, [activeOption.id, setDateRange])

    const getLabelByOption = useCallback(() => {
        const [start, end] = dateRange

        switch (activeOption.id) {
            case 'day':
                return formatDate({ date: start, weekday: 'long' }).toLowerCase()
            case 'week':
            case 'fortnight':
            case 'range':
                return `${formatDate({ date: start, month: '2-digit', year: '2-digit' })} al ${formatDate({ date: end, month: '2-digit', year: '2-digit' })}`
            case 'month':
                return `${MONTHS_OF_YEAR[start.getMonth()]} ${start.getFullYear()}`
            case 'year':
                return start.getFullYear().toString()
            default:
                return ''
        }
    }, [activeOption.id, dateRange])

    const label = useMemo(() => getLabelByOption(), [getLabelByOption])
    const canGoForward = useMemo(() => !isGreaterOrEqualThanToday(dateRange[1]), [dateRange])
    const canGoBack = useMemo(() => !isLessOrEqualThan(dateRange[0], foundationDate), [dateRange])
    const isRange = activeOption.id === 'range'

    return (
        <div className="flex items-center gap-3 justify-center py-3">
            {
                !isRange &&
                <button disabled={!canGoBack} onClick={() => handleChangeDate(-1)} className="text-2xl text-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50">
                    <IoIosArrowBack />
                </button>
            }
            <button className={
                clsx(
                    "flex-1 md:max-w-100 flex justify-center items-center gap-1" ,
                    { "cursor-pointer": isRange }
                )
            }
            onClick={()=> isRange && setOpenModal("DateRange")}> 
                {isRange && <VscSettings className="text-green-700" />}
                <span>{activeOption.label}: {label}</span>
            </button>
            {
                !isRange &&
                <button disabled={!canGoForward} onClick={() => handleChangeDate(1)} className="text-2xl text-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50">
                    <IoIosArrowForward />
                </button>
            }
        </div>
    )
}
