'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { updateEventUserRate, updateExpiredEvents } from '@/actions'
import { useModal } from '@/store'
import { Modal, ModalHeader } from '@/components'
import { formatDate, formatTextHour } from '@/helpers'
import { MdStar, MdStarOutline } from 'react-icons/md'

export const ExpiredEventsModal = ({
    events
}: {
    events: EventReview[]
}) => {

    const mounted = useRef(false)
    const [filteredEvents, setFilteredEvents] = useState(events)
    const openModal = useModal(state => state.openModal)
    const setOpenModal = useModal(state => state.setOpenModal)
    const [hovered, setHovered] = useState(
        Object.fromEntries(
            events.map(ev => [ev.id, 0])
        ))
    const [rating, setRating] = useState(
        Object.fromEntries(
            events.map(ev => [ev.id, 0])
        )
    )
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!openModal && mounted.current) {
           handleUpdateExpiredEvents()
        }
    }, [openModal])

    useEffect(() => {
        if (events.length > 0) {
            setOpenModal('ExpiredEventsModal')
            mounted.current = true
        }
    }, [events])

    const handleUpdateExpiredEvents = async () => {
        await updateExpiredEvents(events)
    }

    const handleRate = async (evId: string, rating: number) => {
        if (isLoading) return
        setIsLoading(true)
        setRating(prev => ({
            ...prev,
            [evId]: rating
        }))

        await updateEventUserRate({ id: evId, customerRating: rating })
        setFilteredEvents(prev => prev.filter(ev => ev.id !== evId))
        setIsLoading(false)
    }


    return (
        openModal === 'ExpiredEventsModal' &&
        <Modal>
            <ModalHeader>
                <h2 className="text-green-700">¡Califica tu experiencia!</h2>
            </ModalHeader>
            <ul>
                {filteredEvents.map((ev, idx) => {
                    const hours = String(ev.start.getHours()).padStart(2, '0')
                    const minutes = String(ev.start.getMinutes()).padStart(2, '0')
                    const selectedHour = `${hours}:${minutes}`

                    const displayValue = hovered[ev.id] || rating[ev.id]

                    return (
                        <li key={ev.id} className="flex flex-col border-b border-zinc-200 mb-3">
                            <div className="p-2 rounded-md flex gap-2">
                                {
                                    ev.professional?.photo ?
                                        <Image
                                            src={ev.professional.photo}
                                            alt="Imagen profesional"
                                            width={80}
                                            height={80}
                                            className="object-cover h-20 w-20 rounded-full"
                                        />
                                        :
                                        <div className="flex items-center h-20 w-20 rounded-full bg-green-700 text-white text-2xl">
                                            {ev.professional?.name?.[0] ?? ''}
                                        </div>
                                }
                                <div className="flex flex-col text-sm">
                                    <p className="text-green-700">{ev.professional?.name}</p>
                                    <p>{ev.title}</p>
                                    <p>{formatDate({ date: ev.start, weekday: 'short', month: 'short' })} {formatTextHour(selectedHour)}</p>
                                </div>
                            </div>
                            <ul className={
                                clsx(
                                    "flex my-1",
                                    {
                                        "opacity-25 pointer-events-none": isLoading
                                    }
                                )
                            }>
                                {
                                    Array.from({ length: 5 }, (_, index) => (
                                        <li
                                            key={index}
                                            className="p-1"
                                            onClick={() => handleRate(ev.id, index + 1)}
                                            onMouseEnter={() => {
                                                setHovered(prev => ({
                                                    ...prev,
                                                    [ev.id]: index + 1
                                                }))
                                            }}
                                            onMouseLeave={() => {
                                                setHovered(prev => ({
                                                    ...prev,
                                                    [ev.id]: 0
                                                }))
                                            }}
                                        >

                                            {
                                                index + 1 <= displayValue ?
                                                    <MdStar
                                                        size={28}
                                                        className="text-amber-300 cursor-pointer"
                                                    />
                                                    :
                                                    <MdStarOutline
                                                        size={28}
                                                        className="text-amber-300 cursor-pointer"
                                                    />
                                            }
                                        </li>

                                    ))
                                }
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </Modal>
    )
}