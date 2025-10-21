'use client'

import { formatDate, isGreaterOrEqualThanToday, isLessOrEqualThanToday } from '@/helpers'
import { MONTHS_OF_YEAR } from '@/util/const'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'


type TimeOption = 'day' | 'week' | 'fortnight' | 'month' | 'year'
interface TimeOptionItem {
    id: TimeOption
    label: string
}

const timeOptions: TimeOptionItem[] = [
    {
        id: 'day',
        label: 'Día'
    },
    {
        id: 'week',
        label: 'Semana'
    },
    {
        id: 'fortnight',
        label: 'Quincena'
    },
    {
        id: 'month',
        label: 'Mes'
    },
    {
        id: 'year',
        label: 'Año'
    }
]

const foundationDate = new Date(2020, 9, 15)

export default function ReportPage() {

    const [activeOption, setActiveOption] = useState<TimeOptionItem>(timeOptions[0])
    const [currentDate, setCurrentDate] = useState(new Date())

    const handleChangeDate = (value: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev)
            switch (activeOption.id) {
                case 'day': newDate.setDate(newDate.getDate() + value); break
                case 'week': newDate.setDate(newDate.getDate() + 7 * value); break
                case 'fortnight': newDate.setDate(newDate.getDate() + 15 * value); break
                case 'month': newDate.setMonth(newDate.getMonth() + value); break
                case 'year': newDate.setFullYear(newDate.getFullYear() + value); break
            }
            return newDate
        })
    }

    const getDayLabel = () => formatDate({ date: currentDate, weekday: true }).toLocaleLowerCase()

    const getWeekLabel = () => {
        const startWeekDate = new Date(currentDate)
        startWeekDate.setDate(startWeekDate.getDate() - startWeekDate.getDay() + 1)
        const endWeekDate = new Date(startWeekDate)
        endWeekDate.setDate(endWeekDate.getDate() + 6)

        const start = formatDate({ date: startWeekDate, month: '2-digit', year: '2-digit' })
        const end = formatDate({ date: endWeekDate, month: '2-digit', year: '2-digit' })

        return `${start} al ${end}`
    }

    const getFortnightLabel = () => {
        const startDate = new Date(currentDate)
        const endDate = new Date(currentDate)
        const isSecondHalf = currentDate.getDate() > 15

        startDate.setDate(isSecondHalf ? 16 : 1)
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
        endDate.setDate(isSecondHalf ? lastDay : 15)

        const start = formatDate({ date: startDate, month: '2-digit', year: '2-digit' })
        const end = formatDate({ date: endDate, month: '2-digit', year: '2-digit' })

        return `${start} al ${end}`
    }

    const getMonthLabel = () => {
        return `${MONTHS_OF_YEAR[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    }

    const getYearLabel = () => currentDate.getFullYear().toString()


    const getDateLabel = () => {
        switch (activeOption.id) {
            case 'day': return getDayLabel()
            case 'week': return getWeekLabel()
            case 'fortnight': return getFortnightLabel()
            case 'month': return getMonthLabel()
            case 'year': return getYearLabel()
            default: return ''
        }
    }

    const showDates = useMemo(() => getDateLabel(), [activeOption, currentDate])
    const greaterOrEqualThanToday = useMemo(() => isGreaterOrEqualThanToday(currentDate), [currentDate])
    const lessOrEqualThanFoundationYear = useMemo(() => currentDate.getFullYear() <= foundationDate.getFullYear(), [currentDate])

    useEffect(() => {
        const currentDate = new Date()
        setCurrentDate(currentDate)
    }, [activeOption])

    return (
        <>
            <h1 className="text-lg text-green-700 mb-3 font-bold">Informes</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-white w-full rounded-md p-7 relative flex flex-col gap-4">
                    <ul className="flex overflow-scroll md:overflow-auto md:flex-wrap md:justify-center gap-2 scroll-none">
                        {
                            timeOptions.map(option => (
                                <li title={option.label} onClick={() => setActiveOption(option)} key={option.id}
                                    className={
                                        clsx(
                                            "flex items-center px-4 py-1 border rounded-full border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-sm cursor-pointer",
                                            { "bg-green-700 text-white": activeOption.id === option.id }
                                        )
                                    }>{option.label}</li>
                            ))
                        }
                    </ul>
                    <div className="flex items-center gap-3 justify-center py-5">
                        <button onClick={() => handleChangeDate(-1)} className="text-2xl text-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50" disabled={lessOrEqualThanFoundationYear}>
                            <IoIosArrowBack />
                        </button>
                        <span className="flex-1 md:max-w-[400px] text-center">{activeOption.label}: {showDates}</span>
                        <button onClick={() => handleChangeDate(1)} className="text-2xl text-green-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50" disabled={greaterOrEqualThanToday}>
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}