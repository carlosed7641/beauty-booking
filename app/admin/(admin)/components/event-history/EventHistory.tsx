'use client'

import { EventList } from '../../components'

interface Props {
    events: EventDate[]
    currentTab: string
}

export const EventHistory = ({
    events,
    currentTab
}: Props) => {

    const setCustomerReview = (reviewPoints: number) => {
        //TODO: Api patch
        // event.customerReview
    }

    return (
        events.length > 0 ? (() => {
            const filteredEvents = events.filter(event => {
                if (currentTab === 'no-rated') return event.professionalRating === null
                if (currentTab === 'rated') return event.professionalRating !== null
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
                <EventList
                    events={filteredEvents}
                />
            )
        })() : (
            <h2 className="text-center text-zinc-600 py-10">
                No se encontraron agendas para este día
            </h2>
        )
    )
}
