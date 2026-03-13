'use client'

import { useState, useTransition } from 'react'
import { useEvents, useModal } from '@/store'
import { updateEventReview } from '@/actions'
import { formatDate, formatTextHour } from '@/helpers'
import { Emotion } from '@/components'
import { CustomerReviewOptions } from '..'
import { useSchedule } from '../../store'

interface Props {
    event: EventDate
}

export const EventItem = ({ event }: Props) => {

    const [isPending, startTransition] = useTransition()
    const [isUpdatingReview, setIsUpdatingReview] = useState(false)
    const allEvents = useEvents(state => state.events)
    const setAllEvents = useEvents(state => state.setEvents)
    const setOpenModal = useModal(state => state.setOpenModal)

    const schedule = useSchedule(state => state.schedule)
    const setSchedule = useSchedule(state => state.setSchedule)

    const setCustomerReview = ({ eventId, reviewPoints }: { reviewPoints: number, eventId: string }) => {
        startTransition(async () => {
            try {
                await updateEventReview({ id: eventId, professionalRating: reviewPoints })
                const newEvents = allEvents.map(ev => ev.id === eventId ? { ...ev, professionalRating: reviewPoints } : ev)
                setAllEvents(newEvents)
            } finally {
                setIsUpdatingReview(false)
            }
        })
    }

    const formatTime = (date: Date) =>
        formatTextHour(`${date.getHours()}:${date.getMinutes()}`)
    const duration = `De ${formatTime(event.start)} a ${formatTime(event.end)}`
    const { customer, selectedService, start, status, professionalRating, id } = event
    const now = new Date().getTime()
    const startDate = start.getTime()

    const onSelectEvent = () => {
        setOpenModal('ScheduleEvent')
        setSchedule({ ...schedule, selectedEvent: event })
    }


    return (
        <li
            key={event.id}
            className="flex flex-col p-2 rounded-md border border-zinc-300 cursor-pointer"
            onClick={onSelectEvent}
        >
            <span className="text-green-700">{customer.name}</span>
            <span>{selectedService.name}</span>
            <span>{formatDate({ date: start })}</span>

            <p className="flex gap-2 items-center">
                <span>{duration}</span>
                {customer.userId && (
                    <span className="px-2 py-0.5 bg-green-700 text-white text-xs rounded-full">
                        Beauty Booking
                    </span>
                )}
            </p>

            {

                status === 'cancelled' ?
                    <span className="text-red-500">Reserva cancelada</span>
                    :
                    isPending ? <span className="flex my-2">Procesando...</span> :
                        now > startDate ?
                            (
                                professionalRating && !isUpdatingReview ? (
                                    <div className="flex items-center gap-2">
                                        <Emotion showLabel averagePoints={professionalRating} />
                                        <button
                                            onClick={() => setIsUpdatingReview(prev => !prev)}
                                            className="btn-primary text-sm rounded-full"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                ) : (
                                    <CustomerReviewOptions eventId={id} setCustomerReview={setCustomerReview} />
                                )
                            )
                            : null
            }
        </li>
    )
}
