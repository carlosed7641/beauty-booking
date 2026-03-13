'use client'

import React, { useEffect, useState } from 'react'
import { useService } from '@/store'
import { DateList } from '@/components'
import { generateDatesArray, generateMonthDatesArray } from '@/helpers'
import { MONTHS_OF_YEAR } from '@/util/const'

const CURRENT_YEAR = new Date().getFullYear()
const availableDates = generateDatesArray()

interface Props {
    isAdmin?: boolean
    dates?: DateItem[]
    openYear?: number
    professionalWorkdays: WorkDays[]
}

export const SelectDate = ({ isAdmin, professionalWorkdays, openYear = CURRENT_YEAR, dates = availableDates }: Props) => {

    const [date, setDate] = useState(new Date(dates[0].date))
    const [days, setDays] = useState<DateItem[]>(dates)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)

    const onClickDate = (date: DateItem) => {
        setServiceState({
            ...serviceState,
            selectedDate: date.date
        })
    }

    const onChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value)
        const name = e.target.name

        setDate(prev => {
            const newDate = new Date(prev)
            name === 'year' ? newDate.setFullYear(value) : newDate.setMonth(value)
            return newDate
        })
    }

    useEffect(() => {
        if (!isAdmin) return
        const newDays = generateMonthDatesArray(date)
        setDays(newDays)
    }, [date.getMonth(), date.getFullYear()])

    const years = CURRENT_YEAR - openYear + 1

    return (
        <>
            <div className="flex justify-between">
                <p className="text-xl">Selecciona la fecha</p>
                {
                    isAdmin &&
                    <div className="flex items-center gap-2">
                        <select name="month" onChange={onChangeDate} value={days[0].date.getMonth()} className="text-zinc-600 underline cursor-pointer focus:outline-0">
                            {MONTHS_OF_YEAR.map((month, idx) => (
                                <option key={idx} value={idx}>{month}</option>
                            ))
                            }
                        </select>
                        <select name="year" onChange={onChangeDate} value={days[0].date.getFullYear()} className="text-zinc-600 underline cursor-pointer focus:outline-0">
                            {
                                Array.from({ length: years }, (_, idx) => {
                                    const year = CURRENT_YEAR - idx
                                    return (
                                        <option key={year} value={year}>{year}</option>
                                    )

                                })
                            }
                        </select>
                    </div>
                }
            </div>
            <div className="overflow-x-scroll md:overflow-auto scroll-none flex md:flex-wrap gap-2 md:gap-3">
                <DateList
                    datesList={days}
                    onClick={onClickDate}
                    workdays={professionalWorkdays.map(workday => workday.order) ?? []}
                    selectedDate={serviceState.selectedDate}
                />
            </div>
        </>
    )
}