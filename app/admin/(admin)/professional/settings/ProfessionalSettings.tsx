'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { LuCopyCheck } from 'react-icons/lu'
import { TbClockHour3 } from 'react-icons/tb'
import { AiOutlineDollar, AiOutlinePlusCircle } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { LiaSave } from 'react-icons/lia'
import { AssignServices } from '.'
import { DAYS_OF_WEEK } from '@/util/const'

interface Props {
    professionals: ProfessionalSettings[]
    serviceList: { [key: string]: ServiceConfigAlt[] }
}

export const ProfessionalSettings = ({ professionals, serviceList }: Props) => {

    const [selectedProfessional, setSelectedProfessional] = useState(professionals[0])
    const [selectedOption, setSelectedOption] = useState(0)
    const [currentAddingIndexs, setIsCurrentAddingIndexs] = useState<number[]>([])

    useEffect(() => {
        setSelectedOption(0)
        console.log(selectedProfessional)
    }, [selectedProfessional])

    const handleChangeTime = (
        e: React.ChangeEvent<HTMLInputElement>,
        dayIndex: number,
        itemIndex: number
    ) => {
        const { name, value } = e.target

        setSelectedProfessional(prev => {
            const workdays = prev.workdays.map((workday, index) => {
                if (index !== dayIndex) return workday

                if (itemIndex === workday.length) {
                    setIsCurrentAddingIndexs(prev => prev.filter(value => value !== dayIndex))
                    return [...workday, { from: '', to: '', [name]: value }]
                }

                return workday.map((item, idx) =>
                    idx === itemIndex ? { ...item, [name]: value } : item
                )
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
            <div className="flex gap-3 justify-center mb-2">
                {professionals.map(professional => (
                    <div key={professional.id} onClick={() => setSelectedProfessional(professional)} className="flex flex-col items-center gap-1 cursor-pointer" >
                        <div className={
                            clsx(
                                {
                                    "border-4 border-white rounded-full": selectedProfessional.id !== professional.id,
                                    "border-4 border-green-900 rounded-full": selectedProfessional.id === professional.id
                                }
                            )
                        }>
                            {
                                professional.photo ?
                                    <Image src={professional.photo} alt={professional.name} width={64} height={64} className="object-cover border-white h-16 w-16 rounded-full" />
                                    : <div className="border border-white p-2 h-16 w-16 bg-green-700 text-white rounded-full flex items-center justify-center text-3xl">
                                        {professional.name[0]}
                                    </div>
                            }
                        </div>
                        <span className="text-sm">{professional.name}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mb-5">
                <button onClick={() => setSelectedOption(0)} aria-selected={selectedOption === 0} title="Disponibilidad" className="aria-selected:bg-green-700 aria-selected:text-white h-13 w-13 flex items-center justify-center border border-zinc-200 shadow-md rounded-full text-2xl text-green-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-all cursor-pointer focus:outline-0 ">
                    <RiCalendarScheduleLine />
                </button>
                <button onClick={() => setSelectedOption(1)} aria-selected={selectedOption === 1} title="Asignar servicios" className="aria-selected:bg-green-700 aria-selected:text-white h-13 w-13 flex items-center justify-center border border-zinc-200 shadow-md rounded-full text-2xl text-green-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-all cursor-pointer focus:outline-0 ">
                    <LuCopyCheck />
                </button>
                <button onClick={() => setSelectedOption(2)} aria-selected={selectedOption === 2} title="Asignar duración de servicios" className="aria-selected:bg-green-700 aria-selected:text-white h-13 w-13 flex items-center justify-center border border-zinc-200 shadow-md rounded-full text-2xl text-green-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-all cursor-pointer focus:outline-0 ">
                    <TbClockHour3 />
                </button>
                <button onClick={() => setSelectedOption(3)} aria-selected={selectedOption === 3} title="Asignar servicios" className="aria-selected:bg-green-700 aria-selected:text-white h-13 w-13 flex items-center justify-center border border-zinc-200 shadow-md rounded-full text-2xl text-green-700 hover:bg-green-700 hover:text-white focus:bg-green-700 focus:text-white transition-all cursor-pointer focus:outline-0 ">
                    <AiOutlineDollar />
                </button>
            </div>
            {selectedOption === 0 &&
                <>
                    <div className="grid md:grid-cols-3 gap-3">
                        {
                            selectedProfessional.workdays.map((workdays, dayIndex) => (
                                <div key={dayIndex} className="flex flex-col">
                                    <div className="bg-green-700 text-white py-1 px-2 text-center font-bold">{DAYS_OF_WEEK[dayIndex]}</div>
                                    <ul className="flex flex-col my-1">
                                        {
                                            workdays.map(({ from, to }, idx) => (
                                                <li key={idx} className="flex gap-2 items-center px-2 border-b border-zinc-200 last:border-0">
                                                    <input onChange={e => handleChangeTime(e, dayIndex, idx)} name="from" className="bg-zinc-200 p-1 my-1 rounded-md min-w-0 flex-1" type="time" value={from} />
                                                    <input onChange={e => handleChangeTime(e, dayIndex, idx)} name="to" className="bg-zinc-200 p-1 my-1 rounded-md min-w-0 flex-1" type="time" value={to} />
                                                    <FiTrash2 onClick={()=> handleRemoveEntry(dayIndex, idx)} className="shrink-0 text-lg cursor-pointer" title="Eliminar entrada" />
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
                                    <button onClick={() => setIsCurrentAddingIndexs(prev => [...prev, dayIndex])} className="bg-zinc-200 mt-auto flex justify-center py-1 px-2 text-2xl cursor-pointer hover:bg-zinc-300 transition-all disabled:opacity-30 disabled:pointer-events-none" disabled={currentAddingIndexs.includes(dayIndex)}>
                                        <AiOutlinePlusCircle />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <button className="fixed md:relative bottom-8 md:bottom-auto right-8 md:right-auto bg-green-700 p-1 rounded-full justify-center items-center flex gap-1 text-white cursor-pointer hover:bg-green-800 w-12 h-12 md:w-fit md:h-auto text-sm disabled:opacity-60 disabled:pointer-events-none focus:outline-0 md:px-8 md:justify-self-end mt-2" disabled={currentAddingIndexs.length > 0}>
                        <LiaSave className="text-2xl" />
                        <span className="hidden md:flex text-lg leading-[initial]">Guardar</span>
                    </button>
                </>
            }
            {selectedOption === 1 &&
                <>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-green-700">Asignar servicios</h2>
                        <span className="text-center">Elige qué servicios asignar al profesional</span>
                    </div>
                    <AssignServices
                        selectedProfessional={selectedProfessional}
                        serviceList={serviceList}
                    />
                </>
            }
            {selectedOption === 2 &&
                <>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-green-700">Asignar duración de servicios</h2>
                        <span className="text-center">Elige lo que puede tardar cada servicio por profesional</span>
                    </div>
                    <AssignServices
                        selectedProfessional={selectedProfessional}
                        type="duration"
                    />
                </>
            }
            {selectedOption === 3 &&
                <>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-green-700">Precios</h2>
                        <span className="text-center">Elige el precio de cada servicio por profesional</span>
                    </div>
                    <AssignServices
                        selectedProfessional={selectedProfessional}
                        type="price"
                    />
                </>
            }
        </>
    )
}
