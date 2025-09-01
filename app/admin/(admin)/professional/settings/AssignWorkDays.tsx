import { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { LiaSave } from 'react-icons/lia'
import { toMinutes } from '@/helpers'
import { DAYS_OF_WEEK, PROFESSIONAL_SETTINGS_ERRORS } from '@/util/const'

interface Props {
    selectedProfessional: ProfessionalSettings
    setSelectedProfessional: React.Dispatch<React.SetStateAction<ProfessionalSettings>>
    workDays: WorkDays[]
}

export const AssignWorkDays = ({
    selectedProfessional,
    setSelectedProfessional,
    workDays
}: Props) => {

    const [currentAddingIndexs, setIsCurrentAddingIndexs] = useState<number[]>([])

    const handleChangeTime = (
        e: React.ChangeEvent<HTMLInputElement>,
        dayIndex: number,
        itemIndex: number
    ) => {
        const { name, value } = e.target

        if (!value.length) return

        setSelectedProfessional(prev => {
            const workdays = prev.workdays.map((workday, index) => {
                if (index !== dayIndex) return workday

                const inputMinutes = toMinutes(value)
                let errorKey: keyof typeof PROFESSIONAL_SETTINGS_ERRORS | null = null

                if (itemIndex === workday.length) {
                    setIsCurrentAddingIndexs(prev => prev.filter(value => value !== dayIndex))
                    if (workday[workday.length - 1] && inputMinutes <= toMinutes(workday[workday.length - 1].to)) errorKey = 'inRange'
                    if (inputMinutes < toMinutes(workDays[dayIndex].from) ||
                        inputMinutes > toMinutes(workDays[dayIndex].to)) errorKey = 'outRange'

                    return [...workday, { from: '', to: '', [name]: value, ...(errorKey && { error: PROFESSIONAL_SETTINGS_ERRORS[errorKey] }) }]
                }

                return workday.map((item, idx) => {
                    if (idx === itemIndex) {
                        const otherTime = item[name === 'from' ? 'to' : 'from']
                        const otherMinutes = toMinutes(otherTime)

                        const newData = { ...item, [name]: value }

                        if (name === 'to' && inputMinutes <= otherMinutes) errorKey = 'to'
                        if (name === 'from' && inputMinutes >= otherMinutes) errorKey = 'from'
                        if (workday[idx - 1] && inputMinutes <= toMinutes(workday[idx - 1].to)) errorKey = 'inRange'
                        if (inputMinutes < toMinutes(workDays[dayIndex].from) ||
                            inputMinutes > toMinutes(workDays[dayIndex].to)) errorKey = 'outRange'

                        if (errorKey) newData.error = PROFESSIONAL_SETTINGS_ERRORS[errorKey]
                        else delete newData.error

                        return newData
                    }

                    return item
                })
            })

            return { ...prev, workdays }
        })
    }

    const handleRemoveEntry = (dayIndex: number, itemIndex: number) => {
        setSelectedProfessional(prev => {
            const workdays = prev.workdays.map((workday, index) => (
                index === dayIndex
                    ? workday.filter((_, idx) => idx !== itemIndex)
                    : workday
            ))

            return { ...prev, workdays }
        })
    }

    return (
        <>
            <div className="grid md:grid-cols-3 gap-3">
                {
                    selectedProfessional.workdays.map((workdays, dayIndex) => (
                        <div key={dayIndex} className="flex flex-col">
                            <div className="bg-green-700 text-white py-1 px-2 text-center font-bold">{DAYS_OF_WEEK[dayIndex]}</div>
                            <ul className="flex flex-col my-1">
                                {
                                    workdays.map(({ from, to, error }, idx) => (
                                        <li key={idx} className="border-b border-zinc-200 last:border-0 px-2">
                                            <div className="flex gap-2 items-center">
                                                <input onChange={e => handleChangeTime(e, dayIndex, idx)} name="from" className="bg-zinc-200 p-1 my-1 rounded-md min-w-0 flex-1" type="time" value={from} />
                                                <input onChange={e => handleChangeTime(e, dayIndex, idx)} name="to" className="bg-zinc-200 p-1 my-1 rounded-md min-w-0 flex-1" type="time" value={to} />
                                                <FiTrash2 onClick={() => handleRemoveEntry(dayIndex, idx)} className="shrink-0 text-lg cursor-pointer" title="Eliminar entrada" />
                                            </div>
                                            {error && <span className="text-red-500 block w-full">{error}</span>}
                                        </li>
                                    ))
                                }
                                {
                                    currentAddingIndexs.includes(dayIndex) &&
                                    <li key={dayIndex} className="flex gap-2 items-center px-2 border-b border-zinc-200 last:border-0">
                                        <input onChange={e => handleChangeTime(e, dayIndex, workdays.length)} name="from" className="bg-zinc-200 p-1 my-1 rounded-md min-w-0 flex-1" type="time"
                                            value={workdays[workdays.length]?.from ?? ''} />
                                        <input onChange={e => handleChangeTime(e, dayIndex, workdays.length)} name="to" className="bg-zinc-200 p-1 my-1 rounded-md min-w-0 flex-1" type="time" value={workdays[workdays.length]?.to ?? ''} />
                                        <FiTrash2 onClick={() => setIsCurrentAddingIndexs(prev => prev.filter(idx => idx !== dayIndex))} className="shrink-0 text-lg cursor-pointer" title="Eliminar entrada" />
                                    </li>

                                }
                            </ul>
                            <button onClick={() => setIsCurrentAddingIndexs(prev => [...prev, dayIndex])} className="bg-zinc-200 mt-auto flex justify-center py-1 px-2 text-2xl cursor-pointer hover:bg-zinc-300 transition-all disabled:opacity-30 disabled:pointer-events-none" disabled={currentAddingIndexs.includes(dayIndex) || workdays.some(({ from, to, error }) => !from || !to || error)}>
                                <AiOutlinePlusCircle />
                            </button>
                        </div>
                    ))
                }
            </div>
            <button className="fixed md:relative bottom-8 md:bottom-auto right-8 md:right-auto bg-green-700 p-1 rounded-full justify-center items-center flex gap-1 text-white cursor-pointer hover:bg-green-800 w-12 h-12 md:w-fit md:h-auto text-sm disabled:opacity-60 disabled:pointer-events-none focus:outline-0 md:px-8 md:justify-self-end mt-2" disabled={currentAddingIndexs.length > 0
                || selectedProfessional.workdays.flat().some(({ from, to, error }) => !from || !to || error)}>
                <LiaSave className="text-2xl" />
                <span className="hidden md:flex text-lg leading-[initial]">Guardar</span>
            </button>
        </>
    )
}
