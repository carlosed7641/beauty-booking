'use client'

import { useState } from 'react'
import { RxCaretDown } from 'react-icons/rx'
import clsx from 'clsx'

interface Props {
    reservations: Reservation[]
}

export const ReservationList = ({ reservations }: Props) => {

    const [currentOpen, setCurrentOpen] = useState<string | number | null>(null)

    return (
        <>
            {

                reservations.length ? 
                    reservations.map(r => (
                        <div className="border-zinc-300 border-b" key={r.id}>
                            <div className="font-bold py-3 cursor-pointer flex items-center gap-2"
                                onClick={() => setCurrentOpen(prev => (prev === r.id ? '' : r.id))}>
                                <RxCaretDown className={
                                    clsx(
                                        "text-2xl transition-all duration-500 text-green-700",
                                        {
                                            "rotate-180": r.id === currentOpen
                                        }
                                    )
                                } />
                                <div className="flex items-center justify-between w-full">
                                    {r.name}
                                    <p className="flex flex-col">
                                        {r.date.substring(0, 9)} - {r.hour}
                                        {r.status === 'canceled' && <span className="text-red-500 text-right">Cita cancelada</span>}
                                    </p>
                                </div>
                            </div>
                            <ul className={
                                clsx(
                                    "transition-all duration-300",
                                    {
                                        'max-h-0 opacity-0 overflow-hidden': r.id !== currentOpen,
                                        'opacity-100 max-h-screen border-zinc-300 border-t pl-4 py-3': r.id === currentOpen
                                    }
                                )
                            }>
                                <li className="py-2 flex gap-3">
                                    <span className="w-28 text-green-700 font-bold">Servicio</span>
                                    <span>{r.name}</span>
                                </li>
                                <li className="py-2 flex gap-3">
                                    <span className="w-28 text-green-700 font-bold">Valor</span>
                                    <span>Desde ${r.price}</span>
                                </li>
                                <li className="py-2 flex gap-3">
                                    <span className="w-28 text-green-700 font-bold">Duración</span>
                                    <span>{r.duration}</span>
                                </li>
                                <li className="py-2 flex gap-3">
                                    <span className="w-28 text-green-700 font-bold">Fecha</span>
                                    <span>{r.date}</span>
                                </li>
                                <li className="py-2 flex gap-3">
                                    <span className="w-28 text-green-700 font-bold">Hora</span>
                                    <span>{r.hour}</span>
                                </li>
                                <li className="py-2 flex gap-3">
                                    <span className="w-28 text-green-700 font-bold">Profesional</span>
                                    <span>{r.professional}</span>
                                </li>
                                <li className="py-2 flex gap-3">
                                    <span className="w-28 text-green-700 font-bold">Lugar</span>
                                    <span>{r.entity}</span>
                                </li>
                            </ul>

                        </div>
                    ))
                :
                <div>No hay reservas</div>
            }
        </>
    )
}
