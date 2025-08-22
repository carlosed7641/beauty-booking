'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { LuCopyCheck } from 'react-icons/lu'
import { TbClockHour3 } from 'react-icons/tb'
import { AiOutlineDollar, AiOutlinePlusCircle } from 'react-icons/ai'
import { DAYS_OF_WEEK, SERVICES_LIST } from '@/util/const'
import { FiTrash2 } from 'react-icons/fi'

interface Props {
    professionals: ProfessionalSettings[]
}

export const ProfessionalSettings = ({ professionals }: Props) => {

    const [selectedProfessional, setSelectedProfessional] = useState(professionals[0])
    const [selectedOption, setSelectedOption] = useState(0)

    return (
        <>
            <div className="flex justify-center mb-2">
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
            {
                selectedOption === 0 &&
                <div className="grid md:grid-cols-4 gap-3">
                    {
                        selectedProfessional.workdays.map((workdays, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="bg-green-700 text-white py-1 px-2 text-center font-bold">{DAYS_OF_WEEK[idx]}</div>
                                <ul className="flex flex-col my-1">
                                    {
                                        workdays.map(({ from, to }, idx) => (
                                            <li key={idx} className="flex items-center px-2 border-b border-zinc-200 last:border-0">
                                                <input className="bg-zinc-200 p-1 my-1 rounded-md" type="time" value={from} />
                                                <span className="mx-6">-</span>
                                                <input className="bg-zinc-200 p-1 my-1 rounded-md" type="time" value={to} />
                                                <FiTrash2 className="ml-auto text-lg cursor-pointer" title="Eliminar entrada" />
                                            </li>
                                        ))
                                    }
                                </ul>
                                <button className="bg-zinc-200 mt-auto flex justify-center py-1 px-2 text-2xl cursor-pointer hover:bg-zinc-300 transition-all">
                                    <AiOutlinePlusCircle />
                                </button>
                            </div>
                        ))
                    }
                </div>
            }
            {
                selectedOption === 1 &&
                <>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-green-700">Asignar servicios</h2>
                        <span>Elige qué servicios asignar al profesional</span>
                    </div>
                    <div>
                        {
                            Object.entries(SERVICES_LIST).map(([key, values]) => (
                                <details className="p-2 border-b border-zinc-300 list-none">
                                    <summary>{key}</summary>
                                    <div className="flex flex-col">
                                        {
                                            values.map(value => (
                                                <label>
                                                    <input className="w-[14px] h-[14px]" type="checkbox" />
                                                    {value}
                                                </label>
                                            ))
                                        }
                                    </div>
                                </details>
                            ))
                        }
                    </div>
                </>
            }
        </>

    )
}
