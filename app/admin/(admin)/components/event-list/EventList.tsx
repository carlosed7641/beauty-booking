'use client'

import { useState } from 'react'
import { Emotion } from '@/components'
import { CustomerReviewOptions } from '..'
import { formatDate, formatTextHour } from '@/helpers'

interface Props {
    events: EventDate[]
    setCustomerReview: (reviewPoints: number) => void
}

export const EventList = ({ events, setCustomerReview }: Props) => {
    const [isUpdatingReview, setIsUpdatingReview] = useState(false)

    return (
        <ul className="flex flex-col gap-3">
            {events.map(event => {
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
                        <span>{formatDate({ date: start })}</span>

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
                                    className="btn-primary text-sm rounded-full"
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
}
