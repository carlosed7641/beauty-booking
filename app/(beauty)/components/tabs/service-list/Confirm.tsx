'use client'

import { useState, useTransition } from 'react'
import { useModal, useService, useEvents } from '@/store'
import { formatDate, formatDisplayNumber, formatTextHour } from '@/helpers'
import { upsertEvent } from '@/actions'

interface Props {
    duration: {
        hours: number
        minutes: number
    }
    price: number,
    entityId: string
}

export const Confirm = ({ duration, price, entityId }: Props) => {

    const serviceState = useService(state => state.serviceState)
    const setOpenModal = useModal(state => state.setOpenModal)
    const events = useEvents(state => state.events)
    const setEvents = useEvents(state => state.setEvents)
    const [error, setError] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleConfirmBooking = () => {
        setError(false)

        startTransition(async () => {
            try {
                const event = await upsertEvent(
                    {
                        ...serviceState,
                        price, 
                        durationHours: duration.hours, 
                        durationMinutes: duration.minutes,
                        entityId,
                       
                    }
                )
                setOpenModal(null)
                const newEvents = events.filter(ev => ev.id !== event.id)
                setEvents([...newEvents, event])
            } catch {
                setError(true)
            }
        })
    }

    return (
        <div className="flex flex-col">
            <div className="flex gap-5">
                <p className="text-green-700 w-25">Servicio</p>
                <span>{serviceState.selectedService?.name}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-25">Valor</p>
                <span>${formatDisplayNumber(price)}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-25">Duración</p>
                {serviceState.selectedService?.duration &&
                    <span>{duration.hours > 0 ? `${duration.hours} ${duration.hours === 1 ? 'hr' : 'hrs'} ${duration.minutes > 0 ? 'y ' + duration.minutes + ' min' : ''}` : `${duration.minutes} min`} aprox</span>}
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-25">Fecha</p>
                <span>{formatDate({ date: serviceState.selectedDate! })}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-25">Hora</p>
                <span>{formatTextHour(serviceState.selectedHour!)}</span>
            </div>
            <div className="flex gap-5">
                <p className="text-green-700 w-25">Profesional</p>
                <span>{serviceState.selectedProfessional?.name}</span>
            </div>
            <button disabled={isPending} onClick={handleConfirmBooking} className="btn-primary w-fit self-center font-bold my-3 rounded-md">Confirmar reserva</button>
            {error && <span className="text-red-500">Ocurrió un error, inténtelo más tarde</span>}
        </div>
    )
}