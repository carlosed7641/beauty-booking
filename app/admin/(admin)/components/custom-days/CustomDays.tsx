'use client'

import { SetStateAction, useEffect, useState } from 'react'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { useModal } from '@/store'
import { DateList } from '@/components'
import { generateMonthDatesArray } from '@/helpers'
import { MONTHS_OF_YEAR } from '@/util/const'


interface Props {
    date: Date
    setDate: React.Dispatch<SetStateAction<Date>>
}

const INITIAL_DAYS_OF_MONTH = generateMonthDatesArray(new Date())

export const CustomDays = ({ date, setDate }: Props) => {

    const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState(INITIAL_DAYS_OF_MONTH)
    const { setOpenModal } = useModal()

    useEffect(() => {
        const newDays = generateMonthDatesArray(date)
        setDaysOfCurrentMonth(newDays)
    }, [date.getMonth(), date.getFullYear()])

    return (
        <div className="md:hidden">
            <div className="flex gap-3 justify-center">
                <button onClick={() => setOpenModal('ScheduleYears')} className="bg-green-700 py-0.5 px-3 rounded-full text-white flex gap-2 items-center">
                    <LiaExchangeAltSolid />
                    {date.getFullYear()}
                </button>
                <button onClick={() => setOpenModal('ScheduleMonths')} className="bg-green-700 py-0.5 px-3 rounded-full text-white flex gap-2 items-center">
                    <LiaExchangeAltSolid />
                    {MONTHS_OF_YEAR[date.getMonth()]}
                </button>
            </div>
            <div className="flex overflow-x-scroll md:overflow-auto scroll-none gap-2">
                <DateList
                    noDisabledDays
                    datesList={daysOfCurrentMonth}
                    selectedDate={date}
                    onClick={(dayItem) => setDate(dayItem.date)}
                />
            </div>
        </div>
    )
}
