'use client'

import { useState } from 'react'
import { RxCaretDown } from 'react-icons/rx'
import clsx from 'clsx'
import { ReservationOptions } from '..'
import { useReservationOptions } from '@/hooks'
import { format12, formatDate, formatNumber } from '@/helpers'

interface Props {
    reservations: EventDate[]
}

export const ReservationList = ({ reservations }: Props) => {

    const [currentOpen, setCurrentOpen] = useState<string | number | null>(null)
    const { handleCancel, handleUpdate } = useReservationOptions()

    return (
        <>
            {

                reservations.length ?
                    <>
                        {reservations.map(r => (
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
                                        {r.selectedService.name}
                                        <p className="flex flex-col">
                                            {formatDate({date: r.start, month: 'numeric' })} - {format12(r.start)}
                                            {r.status === 'cancelled' && <span className="text-red-500 text-right">Cita cancelada</span>}
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
                                        <span>{r.selectedService.name}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Valor</span>
                                        <span>Desde ${formatNumber(r.selectedService.price)}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Duración</span>
                                        <span>{r.selectedService.duration.hours > 0 ? `${r.selectedService.duration.hours} ${r.selectedService.duration.hours === 1 ? 'hr' : 'hrs'} ${r.selectedService.duration.minutes > 0 ? 'y ' + r.selectedService.duration.minutes + ' min' : ''}` : `${r.selectedService.duration.minutes} min`}</span> 
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Fecha</span>
                                        <span>{formatDate({date: r.start, month: 'numeric' })}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Hora</span>
                                        <span>{format12(r.start)}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Profesional</span>
                                        <span>{r.selectedProfessional.name}</span>
                                    </li>
                                    <li className="py-2 flex gap-3">
                                        <span className="w-28 text-green-700 font-bold">Lugar</span>
                                        {/* <span>{r.selectedService.entityName}</span> */}
                                    </li>
                                    {
                                        r.status === 'pending' &&
                                        <li className="flex gap-2 mt-4">
                                            <button onClick={() => handleUpdate(r)} className="btn-primary rounded-full ">Modificar cita</button>
                                            <button onClick={() => handleCancel(r.id)} className="btn-secondary rounded-full">Cancelar cita</button>
                                        </li>
                                    }
                                </ul>

                            </div>
                        ))}
                        <ReservationOptions />
                    </>
                    :
                    <div>No hay reservas</div>
            }
        </>
    )
}
