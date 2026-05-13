'use client'

import { useState } from 'react'
import { RxCaretDown } from 'react-icons/rx'
import clsx from 'clsx'
import { ReservationOptions } from '..'
import { useReservationOptions } from '@/hooks'
import { format12, formatDate, formatDisplayNumber, formatNumber } from '@/helpers'
import { useModal, useService } from '@/store'

interface Props {
    reservations: EventDate[]
    professionals: ProfessionalSchedule[]
    userId: string
}

export const ReservationList = ({ reservations, professionals, userId }: Props) => {

    const [currentOpen, setCurrentOpen] = useState<string | number | null>(null)
    const { handleCancel, handleUpdate } = useReservationOptions()
    const setOpenModal = useModal(state => state.setOpenModal)
    const serviceState = useService(state => state.serviceState)
    const setServiceState = useService(state => state.setServiceState)

    const shouldDisable = (date: Date, minutes: number) => {
        const diffMs = new Date(date).getTime() - Date.now()
        return diffMs <= minutes * 60 * 1000
    }

    const handleRateExperience = (r: EventDate) => {

        const hours = String(r.start.getHours()).padStart(2, '0')
        const minutes = String(r.start.getMinutes()).padStart(2, '0')

        const selectedHour = `${hours}:${minutes}`

        setOpenModal('RateExperience')
        setServiceState({
            ...serviceState,
            id: r.id,
            selectedProfessional: r.selectedProfessional,
            selectedService: r.selectedService,
            selectedDate: r.start,
            selectedHour
        })
    }

    return (
        <>
            {
                reservations.length ?
                    <>
                        {reservations.map(r => {

                            const disabled = shouldDisable(r.start, r.entity?.cancelDateTime ?? 0)

                            return (
                                <div className="border-zinc-300 border-b select-none" key={r.id}>
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
                                                {formatDate({ date: r.start, month: 'numeric' })} - {format12(r.start)}
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
                                            <span>${formatDisplayNumber(r.selectedService.price)}</span>
                                        </li>
                                        <li className="py-2 flex gap-3">
                                            <span className="w-28 text-green-700 font-bold">Duración</span>
                                            <span>{r.selectedService.duration.hours > 0 ? `${r.selectedService.duration.hours} ${r.selectedService.duration.hours === 1 ? 'hr' : 'hrs'} ${r.selectedService.duration.minutes > 0 ? 'y ' + r.selectedService.duration.minutes + ' min' : ''}` : `${r.selectedService.duration.minutes} min`}</span>
                                        </li>
                                        <li className="py-2 flex gap-3">
                                            <span className="w-28 text-green-700 font-bold">Fecha</span>
                                            <span>{formatDate({ date: r.start, month: 'numeric' })}</span>
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
                                            <span>{r?.entity?.name}</span>
                                        </li>
                                        {
                                            r.status === 'pending' && r.start.getTime() >= new Date().getTime() && !disabled &&
                                            <li className="flex gap-2 mt-4">
                                                <button onClick={() => handleUpdate(r, userId)} className="btn-primary rounded-full ">Modificar cita</button>
                                                <button onClick={() => handleCancel(r.id, r.selectedProfessional.id)} className="btn-secondary rounded-full">Cancelar cita</button>
                                            </li>
                                        }
                                        {
                                            !r.customerRating && (r.status === 'completed' || r.status === 'pending') && r.start.getTime() < new Date().getTime() &&
                                            <button onClick={() => handleRateExperience(r)} className="btn-primary rounded-full mt-4">Calificar servicio</button>
                                        }
                                    </ul>

                                </div>
                            )
                        })}
                        <ReservationOptions professionals={professionals} />
                    </>
                    :
                    <div>No hay reservas</div>
            }
        </>
    )
}
