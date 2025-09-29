'use client'

import React, { useEffect, useState } from 'react'
import { useService } from '@/store'
import { DateList } from '@/components'
import { generateMonthDatesArray, getTotalMinutes } from '@/helpers'
import { availableDates } from '@/util/fake-data'
import { MONTHS_OF_YEAR } from '@/util/const'

const INITIAL_YEAR = 2020
const CURRENT_YEAR = new Date().getFullYear()
const years = CURRENT_YEAR - INITIAL_YEAR + 1

export const SelectDate = ({ isAdmin, dates = availableDates }: { isAdmin?: boolean, dates?: DateItem[] }) => {

    const [date, setDate] = useState(new Date(dates[0].date))
    const [days, setDays] = useState<DateItem[]>(dates)
    const { serviceState, setServiceState } = useService()
    const frecuencyMintues = getTotalMinutes(serviceState.selectedService?.duration!)

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
                                        <option value={year}>{year}</option>
                                    )

                                })
                            }
                        </select>
                    </div>
                }
            </div>
            <div className="overflow-x-scroll md:overflow-auto scroll-none flex gap-2 md:grid md:[grid-template-columns:repeat(10,minmax(0,55px))] md:gap-3">
                <DateList
                    isAdmin={isAdmin}
                    datesList={days}
                    onClick={onClickDate}
                    frequencyMintues={frecuencyMintues}
                    selectedDate={serviceState.selectedDate}
                />
            </div>
        </>
    )
}