'use client'

import { useModal, useService } from '@/store'
import { useSchedule } from '../../store'
import { format24 } from '@/helpers'

export const EventSummaryButtons = () => {

    const setServiceState = useService(state => state.setServiceState)
    const setOpenModal = useModal(state => state.setOpenModal)
    const selectedEvent = useSchedule(state => state.schedule.selectedEvent)

    const handleUpdateEvent = () => {
        if (!selectedEvent) return
        const { title, isAdminBooking, customer, start: selectedDate, end, selectedProfessional, status, ...rest } = selectedEvent
        const selectedHour = format24(selectedDate)
        setServiceState({
            ...rest,
            selectedDate,
            selectedHour,
            customer: {
                id: customer.id,
                name: customer.name
            },
            selectedProfessional: {
                id: selectedProfessional.id,
                name: selectedProfessional.name
            }
        })
        setOpenModal('ServiceList')
    }

    return (
        <div className="flex gap-2 mt-2">
            <button onClick={handleUpdateEvent} disabled={!selectedEvent?.isAdminBooking} className="flex items-center py-0.5 px-3 border border-green-700 rounded-full cursor-pointer disabled:bg-zinc-400 disabled:border-0 disabled:cursor-not-allowed">Modificar cita</button>
            <button onClick={() => setOpenModal('CancelEvent')} className="flex items-center py-0.5 px-3 border border-red-500 rounded-full cursor-pointer">Cancelar cita</button>
        </div>
    )
}
