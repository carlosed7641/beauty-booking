'use client'

import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { toMinutes } from '@/helpers'
import { DAYS_OF_WEEK } from '@/util/const'

interface Props<T> {
    data: T
    workdays: WorkDays[]
    setData: (data: T) => void
}

export const WorkDays = <T,>({ data, setData, workdays }: Props<T>) => {
    const handleToggleDay = (index: number) => {
        setData({
            ...data,
            workdays: workdays.map((day, idx) => {
                if (idx !== index) return day

                const newData = { ...day }

                if ('disabled' in newData) {
                    delete newData.disabled
                } else {
                    newData.disabled = true
                }
                return newData
            })
        })
    }

    const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: 'from' | 'to') => {

        const value = e.target.value

        const updateWorkdays = workdays.map((day, idx) => {
            if (idx !== index) return day

            const inputMinutes = toMinutes(value)
            const otherTime = day[type === 'from' ? 'to' : 'from']
            const otherMinutes = toMinutes(otherTime)

            const isInvalid =
                (type === 'to' && inputMinutes <= otherMinutes) ||
                (type === 'from' && inputMinutes >= otherMinutes)

            const newData = { ...day, [type]: value }

            if (isInvalid) {
                newData.error = true
            } else if ('error' in newData) {
                delete newData.error
            }

            return newData
        })

        setData({
            ...data,
            workdays: updateWorkdays
        })
    }

    return (
        <div>
            <ul className="flex flex-col gap-3">
                {
                    workdays.map((day, idx) => (
                        <li className="flex flex-col gap-2" key={idx} >
                            <div className="flex gap-3 flex-col md:flex-row md:items-center">
                                <div className="flex gap-2 items-center w-[100px] cursor-pointer" onClick={() => handleToggleDay(idx)}>
                                    {day.disabled ? <FaToggleOff className="text-green-700 text-xl opacity-50" /> : <FaToggleOn className="text-green-700 text-xl" />}
                                    {DAYS_OF_WEEK[idx]}
                                </div>
                                <div className="grid grid-cols-2 md:flex gap-2 items-center">
                                    <input value={day.disabled ? '' : day.from} disabled={day.disabled} className="cursor-pointer border border-green-700 px-2 rounded-md disabled:opacity-50 disabled:bg-zinc-300 disabled:cursor-auto" type="time" onChange={(e) => handleChangeTime(e, idx, 'from')} />
                                    <input value={day.disabled ? '' : day.to} disabled={day.disabled} className="cursor-pointer border border-green-700 px-2 rounded-md disabled:opacity-50 disabled:bg-zinc-300 disabled:cursor-auto" type="time" onChange={(e) => handleChangeTime(e, idx, 'to')} />
                                </div>
                            </div>
                            {day.error && <div className="text-red-500">
                                <span className="font-bold">{DAYS_OF_WEEK[idx]}: </span>
                                La hora de inicio no debe ser igual o después de la hora de cierre.
                            </div>}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
