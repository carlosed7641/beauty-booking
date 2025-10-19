'use client'

import { useState } from 'react'
import { Emotion } from '@/components'
import { CustomerReviewOptions } from '../../components'
import { formatDate, formatTextHour } from '@/helpers'

interface Props {
    events: EventDate[]
    currentTab: string
}

export const EventHistory = ({
    events,
    currentTab
}: Props) => {

    const [isUpdatingReview, setIsUpdatingReview] = useState(false)

    const setCustomerReview = (reviewPoints: number) => {
        //TODO: Api patch
        // event.customerReview
    }

    return (
        events.length > 0 ? (() => {
            const filteredEvents = events.filter(event => {
                if (currentTab === 'no-rated') return !event.customerReview
                if (currentTab === 'rated') return !!event.customerReview
                return true
            })

            if (!filteredEvents.length) {
                return (
                    <h2 className="text-center text-zinc-600 py-10">
                        No hay agendas
                    </h2>
                )
            }

            return (
                <ul className="flex flex-col gap-3">
                    {filteredEvents.map(event => {
                        const formatTime = (date: Date) =>
                            formatTextHour(`${date.getHours()}:${date.getMinutes()}`)
                        const duration = `De ${formatTime(event.start)} a ${formatTime(event.end)}`
                        const { customer, selectedService, start, isAdminBooking, customerReview } = event

                        return (
                            <li
                                key={event.id}
                                className="flex flex-col p-2 rounded-md border border-zinc-300"
                            >
                                <span className="text-green-700">{customer.name}</span>
                                <span>{selectedService.name}</span>
                                <span>{formatDate(start)}</span>

                                <p className="flex gap-2 items-center">
                                    <span>{duration}</span>
                                    {isAdminBooking && (
                                        <span className="px-2 py-0.5 bg-green-700 text-white text-xs rounded-full">
                                            Beauty Booking
                                        </span>
                                    )}
                                </p>

                                {customerReview && !isUpdatingReview ? (
                                    <div className="flex items-center gap-2">
                                        <Emotion showLabel averagePoints={customerReview} />
                                        <button
                                            onClick={() => setIsUpdatingReview(prev => !prev)}
                                            className="bg-green-700 text-sm text-white rounded-full px-5 py-1 hover:bg-green-800 cursor-pointer"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                ) : (
                                    <CustomerReviewOptions setCustomerReview={setCustomerReview} />
                                )}
                            </li>
                        )
                    })}
                </ul>
            )
        })() : (
            <h2 className="text-center text-zinc-600 py-10">
                No se encontraron agendas para este día
            </h2>
        )
    )
}
