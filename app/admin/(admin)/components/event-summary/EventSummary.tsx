'use client'

import { useState, useTransition } from 'react'
import { Modal, ModalHeader, Emotion } from '@/components'
import { useEvents, useModal } from '@/store'
import { blockUser, cancelEvent, updateEventReview } from '@/actions'
import { useSchedule } from '../../store'
import { EventSummaryInfo } from './EventSummaryInfo'
import { CustomerReviewOptions } from './CustomerReviewOptions'
import { EventSummaryButtons } from './EventSummaryButtons'
import { BsPersonFillLock } from 'react-icons/bs'

export const EventSummary = ({ entityId, isAdmin }: { entityId: string, isAdmin: boolean }) => {

    const schedule = useSchedule(state => state.schedule)
    const setSchedule = useSchedule(state => state.setSchedule)

    const [isPending, startTransition] = useTransition()
    const allEvents = useEvents(state => state.events)
    const setAllEvents = useEvents(state => state.setEvents)

    const [isUpdatingReview, setIsUpdatingReview] = useState(false)
    const [isBlocking, setIsBlocking] = useState(false)

    const setOpenModal = useModal(state => state.setOpenModal)

    const now = new Date().getTime()
    const startDate = schedule.selectedEvent?.start.getTime()!

    const setCustomerReview = ({ eventId, reviewPoints }: { reviewPoints: number, eventId: string }) => {
        startTransition(async () => {
            try {
                await updateEventReview({ id: eventId, professionalRating: reviewPoints })

                const index = allEvents.findIndex(ev => ev.id === eventId)
                if (index === -1) return

                const updatedEvent = { ...allEvents[index], professionalRating: reviewPoints }

                const newEvents = [...allEvents]
                newEvents[index] = updatedEvent

                setAllEvents(newEvents)
                setSchedule({ ...schedule, selectedEvent: updatedEvent })

            } finally {
                setIsUpdatingReview(false)
            }
        })
    }

    const handleBlock = () => {
        if (!schedule.selectedEvent?.customer.userId) return
        startTransition(async () => {
            await blockUser(schedule.selectedEvent?.customer.userId!, entityId)
            if (schedule.selectedEvent?.status === 'pending' && now < startDate) {
                await cancelEvent(schedule.selectedEvent.id, schedule.selectedEvent.selectedProfessional.id)
            }

            const eventId = schedule.selectedEvent?.id

            if (!eventId) return

            const updatedEvents = allEvents.map(ev =>
                ev.id === eventId
                    ? { 
                        ...ev, 
                        customer: { ...ev.customer, isBlocked: true },
                        status: schedule.selectedEvent?.status === 'pending' && now < startDate ? 'cancelled' : ev.status
                    }
                    : ev
            )

            setOpenModal(null)
            setAllEvents(updatedEvents)
        })
    }

    return (
        <>
            <Modal className="overflow-hidden! md:w-175!">
                <ModalHeader>
                    <h1 className="text-green-700 font-bold">{schedule.selectedEvent?.title}</h1>
                </ModalHeader>
                <div className="flex flex-col text-sm">
                    <EventSummaryInfo />
                    {
                        schedule.selectedEvent?.status === 'cancelled' ?
                            <span className="text-red-500">Reserva cancelada</span>
                            :
                            isPending ? <span className="flex my-2">Procesando...</span> :

                                schedule.selectedEvent?.customer.isBlocked ?
                                    null
                                    :
                                    now > startDate ?
                                        <div className="mt-3">
                                            <span className="text-base font-bold">Indicanos si el cliente llegó a tiempo</span>
                                            {
                                                schedule.selectedEvent?.professionalRating && !isUpdatingReview ?
                                                    <div className="flex items-center gap-2">
                                                        <Emotion showLabel averagePoints={schedule.selectedEvent.professionalRating} />
                                                        <button onClick={() => setIsUpdatingReview(true)} className="btn-primary rounded-full">Editar</button>
                                                    </div>
                                                    :
                                                    <CustomerReviewOptions eventId={schedule.selectedEvent?.id ?? ''} setCustomerReview={setCustomerReview} />
                                            }
                                        </div>
                                        :
                                        <EventSummaryButtons />
                    }
                    {
                        schedule.selectedEvent?.customer.userId && !schedule.selectedEvent?.customer.isBlocked && !isPending &&
                        isAdmin &&
                        <>
                            <div className="py-3 flex gap-2 items-center text-red-500 cursor-pointer" onClick={() => setIsBlocking(true)}>
                                <BsPersonFillLock className="text-lg" />
                                Bloquear usuario
                            </div>
                            {
                                isBlocking &&
                                <div>
                                    Un usuario bloqueado no podrá agendar en este negocio, ¿confirmas?
                                    <div className="flex gap-2 mt-2">
                                        <button className="btn-primary rounded-md" onClick={handleBlock}>Confirmo</button>
                                        <button className="btn-secondary rounded-md" onClick={() => setIsBlocking(false)}>Cancelar</button>
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div>
            </Modal>
        </>
    )
}
