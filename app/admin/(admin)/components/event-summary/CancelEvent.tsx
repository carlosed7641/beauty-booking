'use client'

import { useTransition } from 'react'
import { useEvents, useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { cancelEvent } from '@/actions'
import { useSchedule } from '../../store'

export const CancelEvent = () => {

    const setOpenModal = useModal(state => state.setOpenModal)
    const events = useEvents(state => state.events)
    const setEvents = useEvents(state => state.setEvents)
    const selectedEvent = useSchedule(state => state.schedule.selectedEvent)
    const [isPending, startTransition] = useTransition()


    const handleCancelEvent = () => {
        if (!selectedEvent) return
        startTransition(async () => {
            await cancelEvent(selectedEvent.id, selectedEvent.selectedProfessional.id)
            const newEvents = events.map(ev => ev.id === selectedEvent.id ? { ...ev, status: 'cancelled' } : ev) as EventDate[]
            setEvents(newEvents)
            setOpenModal(null)
        })
    }

    return (
        <Modal className="overflow-hidden! md:w-112.5!">
            <ModalHeader>
                <h2 className="text-green-700 font-bold">¿Está seguro que desea cancelar la cita?</h2>
            </ModalHeader>
            {
                isPending ?
                    <span className='my-0.5'>Procesando...</span>
                    :
                    <div className="flex gap-1.5">
                        <button onClick={handleCancelEvent} className="btn-primary w-1/2 rounded-md">Sí, cancelar</button>
                        <button onClick={() => setOpenModal('ScheduleEvent')} className="btn-secondary w-1/2 rounded-md">No, regresar</button>
                    </div>
            }
        </Modal>
    )
}
